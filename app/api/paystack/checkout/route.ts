import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@/utils/supabase/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: recruiter } = await supabaseAdmin
      .from('recruiters')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!recruiter) {
      return NextResponse.json({ error: 'Recruiter profile not found' }, { status: 404 });
    }

    const { data: settings } = await supabaseAdmin
      .from('app_settings')
      .select('value')
      .eq('key', 'billing')
      .single();

    const billingSettings = settings?.value || { amount: 990000, currency: 'NGN' };

    // Call Paystack API
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        amount: billingSettings.amount,
        currency: billingSettings.currency,
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/recruiter`,
        metadata: {
          recruiter_id: recruiter.id,
          user_id: user.id
        }
      })
    });

    const result = await response.json();

    if (!result.status) {
      throw new Error(result.message || 'Failed to initialize Paystack transaction');
    }

    return NextResponse.json({ url: result.data.authorization_url, authorization_url: result.data.authorization_url });
  } catch (error: any) {
    logger.error('checkout', 'Paystack checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
