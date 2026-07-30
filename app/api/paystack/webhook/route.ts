import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

// Webhooks require nodejs for the crypto library
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY as string;
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    console.log('Paystack Webhook received:', event.event);

    switch (event.event) {
      case 'subscription.create': {
        const { subscription_code, customer, status, next_payment_date } = event.data;
        // Metadata is attached to the initial transaction, maybe not directly to subscription payload
        // But we can look up by email or use customer metadata if passed

        // For simplicity, let's fetch the recruiter by email if it's in the payload
        const { data: candidates } = await supabaseAdmin.from('recruiters').select('id, user_id').limit(1);
        // Wait, realistically we need the recruiter ID. In the checkout session we passed metadata to the transaction.
        break;
      }
      
      case 'charge.success': {
        const { metadata, customer, plan, reference } = event.data;
        if (metadata && metadata.recruiter_id) {
          const recruiterId = metadata.recruiter_id;
          
          // Upsert the customer code
          await supabaseAdmin
            .from('recruiters')
            .update({ paystack_customer_code: customer.customer_code })
            .eq('id', recruiterId);

          // Find the active subscription
          const { data: sub } = await supabaseAdmin
            .from('subscriptions')
            .select('*')
            .eq('recruiter_id', recruiterId)
            .single();

          if (sub) {
            await supabaseAdmin
              .from('subscriptions')
              .update({ status: 'active', current_period_end: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString() })
              .eq('recruiter_id', recruiterId);
          } else {
            await supabaseAdmin
              .from('subscriptions')
              .insert({
                recruiter_id: recruiterId,
                paystack_subscription_code: reference, // Fallback if subscription_code isn't in charge
                status: 'active',
                current_period_end: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
              });
          }
        }
        break;
      }

      case 'subscription.disable': {
        const { subscription_code } = event.data;
        await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('paystack_subscription_code', subscription_code);
        break;
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
  }
}
