import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// In-memory sliding window store as fallback when Upstash is not configured
interface MemoryWindow {
  tokens: number[];
}
const memoryStore = new Map<string, MemoryWindow>();

// Periodic memory cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of memoryStore.entries()) {
      val.tokens = val.tokens.filter((t) => now - t < 60_000);
      if (val.tokens.length === 0) memoryStore.delete(key);
    }
  }, 300_000);
}

const upstashRedis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? Redis.fromEnv()
  : null;

export interface RateLimitOptions {
  limit?: number;
  windowMs?: number;
  identifier?: string;
}

export const RATE_LIMITS = {
  ADMIN_LOGIN: { limit: 5, windowMs: 60_000 } as RateLimitOptions,
  WEBHOOK: { limit: 100, windowMs: 60_000 } as RateLimitOptions,
  DEFAULT: { limit: 20, windowMs: 10_000 } as RateLimitOptions,
};

/**
 * Checks rate limit using Upstash Redis if configured, otherwise falls back to in-memory sliding window.
 */
export async function checkRateLimit(
  req: Request,
  options: RateLimitOptions = {}
): Promise<NextResponse | null> {
  const { limit = 20, windowMs = 10_000, identifier = 'ip' } = options;

  let id = identifier;
  if (identifier === 'ip') {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    id = forwarded ? forwarded.split(',')[0].trim() : (realIp || 'anonymous');
  }

  // 1. Try Upstash if configured
  if (upstashRedis) {
    try {
      const limiter = new Ratelimit({
        redis: upstashRedis,
        limiter: Ratelimit.slidingWindow(limit, `${Math.ceil(windowMs / 1000)} s`),
        prefix: '@cvyon/ratelimit',
      });
      const res = await limiter.limit(id);
      if (!res.success) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please slow down and try again later.' },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': res.limit.toString(),
              'X-RateLimit-Remaining': res.remaining.toString(),
              'X-RateLimit-Reset': res.reset.toString(),
              'Retry-After': Math.ceil((res.reset - Date.now()) / 1000).toString(),
            },
          }
        );
      }
      return null;
    } catch (err) {
      console.warn('[RateLimit] Upstash error, falling back to memory store:', err);
    }
  }

  // 2. In-memory sliding window fallback
  const now = Date.now();
  const userWindow = memoryStore.get(id) || { tokens: [] };
  // Keep only timestamps within window
  userWindow.tokens = userWindow.tokens.filter((t) => now - t < windowMs);

  if (userWindow.tokens.length >= limit) {
    const oldestToken = userWindow.tokens[0];
    const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - oldestToken)) / 1000));
    return NextResponse.json(
      { error: 'Too many requests. Please slow down and try again.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'Retry-After': retryAfterSec.toString(),
        },
      }
    );
  }

  userWindow.tokens.push(now);
  memoryStore.set(id, userWindow);
  return null;
}

