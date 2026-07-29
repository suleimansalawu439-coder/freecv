import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    })
  : null;

/**
 * Validates the rate limit for a given request.
 * Falls back to allowing the request if Upstash Redis is not configured.
 * @param req The incoming request
 * @param identifier Custom identifier (e.g. IP address or user ID)
 * @returns NextResponse if rate limited, null if allowed
 */
export async function checkRateLimit(req: Request, identifier: string = 'ip') {
  if (!ratelimit) return null; // Bypass if no redis configured
  
  let id = identifier;
  if (identifier === 'ip') {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    id = forwarded ? forwarded.split(',')[0] : (realIp || 'anonymous');
  }

  try {
    const { success, limit, reset, remaining } = await ratelimit.limit(id);
    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          }
        }
      );
    }
    return null;
  } catch (err) {
    console.error('Rate limiting error:', err);
    // Fail open if redis is down
    return null; 
  }
}
