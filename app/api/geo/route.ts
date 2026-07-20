import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = await headers();
    
    // Get the client IP from various headers (Vercel, Cloudflare, standard)
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim()
      || headersList.get('x-real-ip')
      || headersList.get('cf-connecting-ip')
      || '';

    if (!ip || ip === '127.0.0.1' || ip === '::1') {
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
