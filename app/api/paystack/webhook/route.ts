import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { generateInvoicePdfBuffer } from '@/lib/invoice-generator';

// Webhooks use node crypto (+ the invoice buffer), so they must run on nodejs.
export const runtime = 'nodejs';

/* ------------------------------------------------------------------ *
 *  FX to USD (approx). Reconcile exact cash against Paystack + bank.
 *  Stored per-row as fx_to_usd so historical numbers never drift when
 *  you update this table later.
 * ------------------------------------------------------------------ */
const FX: Record<string, number> = {
  USD: 1, NGN: 1 / 1550, GBP: 1.27, EUR: 1.08, KES: 0.0077,
  ZAR: 0.055, GHS: 0.065, INR: 0.012, CAD: 0.73, AUD: 0.66,
};
const fxFor = (cur?: string) => FX[(cur || 'USD').toUpperCase()] ?? 1;
const planName = (d: any) => d?.plan?.name || d?.plan || d?.subscription?.plan?.name || 'pro';

/* ------------------------------------------------------------------ *
 *  Idempotency: "claim" an event id before doing any work.
 *  - first time  -> insert succeeds -> returns true  -> we process
 *  - duplicate   -> unique violation -> returns false -> we skip
 *  - table error -> log + proceed (never block a real payment on infra)
 *  webhook_events.event_id is UNIQUE, so the second insert throws 23505.
 * ------------------------------------------------------------------ */
async function claim(eventId: string): Promise<boolean> {
  try {
    await supabaseAdmin.from('webhook_events').insert({ event_id: eventId, event_type: 'claimed' });
    return true;
  } catch (e: any) {
    const msg = (e?.message || e?.code || '').toString().toLowerCase();
    if (msg.includes('duplicate') || msg.includes('unique') || msg.includes('23505')) return false;
    console.warn('[webhook] claim error, proceeding anyway:', e?.message);
    return true;
  }
}

/* Resolve the recruiter for this event: metadata first, then customer code. */
async function resolveRecruiterId(d: any): Promise<string | null> {
  const metaId = d?.metadata?.recruiter_id;
  if (metaId) return String(metaId);
  const custCode = d?.customer?.customer_code;
  if (custCode) {
    const { data } = await supabaseAdmin
      .from('recruiters').select('id').eq('paystack_customer_code', custCode).limit(1);
    if (data?.[0]?.id) return String(data[0].id);
  }
  return null;
}

/* Remember the customer code on the recruiter so renewals resolve without metadata. */
async function rememberCustomerCode(recruiterId: string, d: any) {
  const custCode = d?.customer?.customer_code;
  if (!custCode) return;
  try {
    await supabaseAdmin.from('recruiters')
      .update({ paystack_customer_code: custCode }).eq('id', recruiterId);
  } catch (e: any) {
    console.warn('[webhook] customer-code save skipped:', e?.message);
  }
}

/* Create-or-activate the subscription row (terms). Money columns are best-effort. */
async function upsertSubscription(subscriptionCode: string, recruiterId: string, d: any) {
  const periodEnd = d?.next_payment_date || d?.subscription?.next_payment_date
    || new Date(Date.now() + 30 * 864e5).toISOString();
  // core columns (always exist) — strict
  await supabaseAdmin.from('subscriptions').upsert({
    recruiter_id: recruiterId,
    paystack_subscription_code: subscriptionCode,
    status: 'active',
    tier: planName(d),
    current_period_end: periodEnd,
    paid_at: new Date().toISOString(),
  }, { onConflict: 'paystack_subscription_code' });
  // money columns (added by the business-layer migration) — best-effort
  const amount = d?.amount ?? d?.subscription?.amount;
  if (amount != null) {
    const cur = d?.currency || d?.subscription?.currency || 'NGN';
    try {
      await supabaseAdmin.from('subscriptions').update({
        amount_minor: Number(amount), currency: cur, plan: planName(d),
        fx_to_usd: fxFor(cur), paid_at: new Date().toISOString(),
      }).eq('paystack_subscription_code', subscriptionCode);
    } catch (e: any) {
      console.warn('[webhook] sub money-cols update skipped (run business-layer migration?):', e?.message);
    }
  }
}

/* Record the actual cash movement. Unique index on ref prevents double-cash. */
async function recordCash(reference: string, recruiterId: string | null, amount: number, currency: string) {
  if (!reference || amount == null) return;
  try {
    await supabaseAdmin.from('revenue_ledger').insert({
      source: 'subscription', ref: reference, recruiter_id: recruiterId,
      amount_minor: Number(amount), currency: currency || 'NGN',
      fx_to_usd: fxFor(currency), status: 'settled',
      period_start: new Date().toISOString(),
    });
  } catch (e: any) {
    console.warn('[webhook] revenue_ledger insert skipped:', e?.message);
  }
}

/* Email a PDF invoice via Brevo. Fully best-effort + permissively typed so a
 * signature mismatch in invoice-generator can NEVER break the build or the webhook. */
async function emailInvoice(d: any, reference: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const email = d?.customer?.email;
  if (!apiKey || !email) return;
  try {
    const gen = generateInvoicePdfBuffer as unknown as (opts: any) => Promise<any>;
    const pdfBuffer = await gen({
      reference, amount: d?.amount, currency: d?.currency || 'NGN',
      email, company: d?.customer?.business_name || d?.metadata?.company_name || '',
      date: new Date().toISOString(),
    });
    if (!pdfBuffer) return;
    await fetch('https://api.brevo.com/v3/transactional/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { email: process.env.BREVO_SENDER_EMAIL || 'noreply@cvyon.com', name: 'Cvyon' },
        to: [{ email, name: d?.customer?.first_name || '' }],
        subject: `Your Cvyon invoice (${reference})`,
        htmlContent: `<p>Hi there,</p><p>Thank you for your subscription. Please find your invoice attached.</p><p>The Cvyon Team</p>`,
        attachment: [{ name: `Invoice-${reference}.pdf`, content: pdfBuffer.toString('base64') }],
      }),
    });
    console.log('[webhook] invoice emailed to', email);
  } catch (err) {
    console.error('[webhook] invoice email failed (non-fatal):', (err as any)?.message);
  }
}

/* ================================================================== */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');
    if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

    const secret = process.env.PAYSTACK_SECRET_KEY as string;
    if (!secret) { console.error('[webhook] PAYSTACK_SECRET_KEY is not set'); return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 }); }

    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
    if (hash !== signature) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });

    const event = JSON.parse(rawBody);
    console.log('[webhook] Paystack event:', event.event);
    const d = event.data || {};

    switch (event.event) {
      /* ---- a subscription was created (terms + first amount) ---- */
      case 'subscription.create': {
        const subscriptionCode = d?.subscription_code;
        if (!subscriptionCode) break;
        if (!(await claim(`sub_create:${subscriptionCode}`))) break;       // idempotent
        const recruiterId = await resolveRecruiterId(d);
        if (recruiterId) {
          await rememberCustomerCode(recruiterId, d);
          await upsertSubscription(subscriptionCode, recruiterId, d);
        } else {
          console.warn('[webhook] subscription.create: could not resolve recruiter for', subscriptionCode);
        }
        break;
      }

      /* ---- a charge succeeded (the real cash; first charge OR renewal) ---- */
      case 'charge.success': {
        const reference = d?.reference;
        if (!reference) break;
        if (!(await claim(reference))) break;                              // idempotent
        const recruiterId = await resolveRecruiterId(d);
        if (recruiterId) await rememberCustomerCode(recruiterId, d);

        // record the cash (unique index on ref => never double-counted)
        await recordCash(reference, recruiterId, d?.amount, d?.currency || 'NGN');

        // if this charge belongs to a subscription, (re)activate + extend it
        const subscriptionCode = d?.subscription?.subscription_code || d?.subscription_code;
        if (subscriptionCode && recruiterId) {
          await upsertSubscription(subscriptionCode, recruiterId, d);
        } else if (subscriptionCode && !recruiterId) {
          // renewal where metadata is gone but the sub row exists: extend by code
          const amount = d?.amount, cur = d?.currency || 'NGN';
          try {
            await supabaseAdmin.from('subscriptions').update({
              status: 'active', paid_at: new Date().toISOString(),
              current_period_end: d?.subscription?.next_payment_date || new Date(Date.now() + 30 * 864e5).toISOString(),
              amount_minor: amount != null ? Number(amount) : undefined,
              currency: amount != null ? cur : undefined,
              fx_to_usd: amount != null ? fxFor(cur) : undefined,
            }).eq('paystack_subscription_code', subscriptionCode);
          } catch (e: any) {
            console.warn('[webhook] renewal extend skipped:', e?.message);
          }
        }

        await emailInvoice(d, reference);
        break;
      }

      /* ---- subscription cancelled / disabled ---- */
      case 'subscription.disable': {
        const subscriptionCode = d?.subscription_code;
        if (!subscriptionCode) break;
        await supabaseAdmin.from('subscriptions')
          .update({ status: 'canceled' }).eq('paystack_subscription_code', subscriptionCode);
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('[webhook] Paystack webhook error:', error);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
  }
}