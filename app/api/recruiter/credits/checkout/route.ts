import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase';
import { authenticateRecruiter } from '@/lib/recruiter-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST /api/recruiter/credits/checkout { packId }
 * Initializes a Paystack one-time charge for a credit pack.
 * The webhook credits the recruiter's ledger when payment succeeds
 * (metadata.kind === 'credit_pack'). Test mode only — never real charges.
 */
export async function POST(req: Request) {
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const auth = await authenticateRecruiter(req);
  if (!auth.ok) return auth.response;
  const { userId, email, recruiter } = auth.auth;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const packId = String(body?.packId || '').trim();
  if (!packId) {
    return NextResponse.json({ error: 'packId is required' }, { status: 400 });
  }

  try {
    const { data: pack } = await supabaseAdmin
      .from('credit_packs')
      .select('id, name, credits, price_kobo, currency')
      .eq('id', packId)
      .eq('active', true)
      .single();
    if (!pack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      logger.error('credits-checkout', 'PAYSTACK_SECRET_KEY is not set');
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://cvyon.com';
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email || recruiter.contact_email,
        amount: pack.price_kobo,
        currency: pack.currency || 'USD',
        callback_url: `${siteUrl}/recruiter/credits?verify=1`,
        metadata: {
          recruiter_id: recruiter.id,
          user_id: userId,
          pack_id: pack.id,
          kind: 'credit_pack',
        },
      }),
    });

    const result = await response.json();
    if (!result?.status || !result?.data?.authorization_url) {
      logger.error('credits-checkout', 'Paystack initialize failed', result?.message);
      return NextResponse.json(
        { error: result?.message || 'Failed to initialize payment' },
        { status: 502 }
      );
    }

    logger.info('credits-checkout', 'credit pack checkout initialized', {
      recruiter: recruiter.id,
      pack: pack.id,
      reference: result.data.reference,
    });
    return NextResponse.json({
      authorization_url: result.data.authorization_url,
      reference: result.data.reference,
      pack,
    });
  } catch (e: any) {
    logger.error('credits-checkout', 'recruiter/credits/checkout error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
