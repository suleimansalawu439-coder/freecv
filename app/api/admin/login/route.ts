import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { signAdminToken } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    // 1. Strict Brute Force Protection (5 attempts per minute per IP)
    const rateLimit = await checkRateLimit(request, {
      limit: 5,
      windowMs: 60_000,
      identifier: 'ip'
    });
    if (rateLimit) return rateLimit;

    const { password } = await request.json().catch(() => ({}));
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ success: false, error: 'Server misconfiguration: missing ADMIN_PASSWORD' }, { status: 500 });
    }

    // 2. Timing-safe password comparison
    const passwordBuffer = Buffer.from(String(password || ''));
    const adminPasswordBuffer = Buffer.from(adminPassword);

    const isMatch = passwordBuffer.length === adminPasswordBuffer.length &&
      crypto.timingSafeEqual(passwordBuffer, adminPasswordBuffer);

    if (isMatch) {
      const token = await signAdminToken();
      
      const cookieStore = await cookies();
      cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

