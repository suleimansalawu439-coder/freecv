import { NextResponse } from 'next/server';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    // 1. Strict Brute Force Protection
    const rateLimit = await checkRateLimit(request, {
      ...RATE_LIMITS.ADMIN_LOGIN,
      identifier: 'ip'
    });
    if (rateLimit) return rateLimit;

    const { email, password } = await request.json().catch(() => ({}));
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password required' }, { status: 400 });
    }

    const adminEmails = (process.env.ADMIN_EMAILS || 'hamis@cvyon.com').split(',').map(e => e.trim().toLowerCase());
    if (!adminEmails.includes(email.toLowerCase())) {
      // Fake rejection for non-admins to prevent email enumeration
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return NextResponse.json({ success: false, error: error?.message || 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

