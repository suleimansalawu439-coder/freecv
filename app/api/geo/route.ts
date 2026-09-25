import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

// Strict IP-literal check (IPv4 or IPv6). The value is interpolated into the
// ip-api.com request path, so anything that isn't an IP literal is rejected
// outright rather than passed to the upstream service.
const IPV4_RE = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

function isIpLiteral(ip: string): boolean {
  if (IPV4_RE.test(ip)) return true;
  // IPv6: must contain colons and only hex digits, colons, dots (v4-mapped)
  return ip.includes(':') && /^[0-9a-fA-F:.]+$/.test(ip) && ip.length <= 45;
}

export async function GET(req: Request) {
  // Unauthenticated + outbound fetch per request: rate-limit to prevent
  // quota-exhaustion of the shared ip-api.com allowance (45 req/min free).
  const rateLimitResponse = await checkRateLimit(req, { limit: 30, windowMs: 60_000 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    // Prefer x-real-ip (set by Vercel's edge from the TCP peer); the
    // x-forwarded-for chain is client-spoofable.
    const ip = req.headers.get('x-real-ip')?.trim()
      || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('cf-connecting-ip')?.trim()
      || '';

    if (!ip || ip === '127.0.0.1' || ip === '::1' || !isIpLiteral(ip)) {
      return NextResponse.json({ country: '', city: '', ip: '' });
    }

    // Use ip-api.com (free, 45 requests/minute, no key needed)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success') {
        return NextResponse.json({
          country: data.country || '',
          city: data.city || '',
        });
      }
    }

    return NextResponse.json({ country: '', city: '' });
  } catch {
    return NextResponse.json({ country: '', city: '' });
  }
}
