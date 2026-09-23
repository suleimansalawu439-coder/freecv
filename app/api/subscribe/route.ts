import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

const EmailSchema = z.string().trim().email().max(320);

export async function POST(request: Request) {
  try {
    const rateLimitResponse = await checkRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const { email, source } = await request.json();

    const emailCheck = EmailSchema.safeParse(email);
    if (!emailCheck.success) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    const cleanEmail = emailCheck.data;

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: cleanEmail, source: source || 'blog' }]);

    // Ignore unique constraint errors (if they are already subscribed, just return success)
    if (error && error.code !== '23505') {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
