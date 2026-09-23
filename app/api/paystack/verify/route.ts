import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@/utils/supabase/server';
import { processPaystackEvent } from '@/app/api/paystack/webhook/route';

// Use Node.js runtime for cookie handling with Supabase auth
export const runtime = 'nodejs';

/**
 * POST /api/paystack/verify { reference }
 * Verifies a Paystack transaction reference server-side and activates the
 * recruiter's access immediately. Called from the recruiter dashboard when
 * Paystack redirects back with ?reference=... — a safety net so activation
 * never depends solely on the webhook arriving.
 */
export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: recruiter } = await supabaseAdmin
      .from('recruiters')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!recruiter) {
      return NextResponse.json({ error: 'Recruiter profile not found' }, { status: 404 });
    }

    const { reference } = await req.json().catch(() => ({}));
    if (!reference || typeof reference !== 'string') {
      return NextResponse.json({ error: 'Missing transaction reference' }, { status: 400 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      logger.error('verify', 'PAYSTACK_SECRET_KEY is not set');
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { 'Authorization': `Bearer ${secret}` } }
    );
    const result = await response.json();

    if (!result?.status || result?.data?.status !== 'success') {
      return NextResponse.json(
        { ok: false, error: result?.message || 'Transaction not successful' },
        { status: 402 }
      );
    }

    const data = result.data;
    // Only the payer (or the recruiter named in metadata) may activate via this reference.
    const metaUserId = data?.metadata?.user_id;
    const customerEmail = data?.customer?.email;
    if (metaUserId !== user.id && customerEmail !== user.email) {
      logger.warn('verify', 'reference ownership mismatch for', reference);
      return NextResponse.json({ error: 'Transaction does not belong to this account' }, { status: 403 });
    }

    await processPaystackEvent({ event: 'charge.success', data });

    return NextResponse.json({ ok: true, active: true });
  } catch (error: any) {
    logger.error('verify', 'Paystack verify error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
