import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';
import * as jose from 'jose';

export const runtime = 'edge';

async function getUser() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const authCookie = allCookies.find(c => c.name.includes('-auth-token'));
  
  if (!authCookie) return null;
  
  try {
    const parsed = JSON.parse(authCookie.value);
    const token = parsed[0] || parsed.access_token;
    if (!token) return null;

    let secretStr = process.env.SUPABASE_JWT_SECRET || 'super-secret-jwt-token-with-at-least-32-characters-long';
    const isBase64 = !secretStr.includes('-') && secretStr.length > 50;
    const secret = isBase64 ? Uint8Array.from(atob(secretStr), c => c.charCodeAt(0)) : new TextEncoder().encode(secretStr);
    
    const { payload } = await jose.jwtVerify(token, secret);
    return { id: payload.sub, email: payload.email as string };
  } catch (e) {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUser();
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

    return NextResponse.json({ url: result.data.authorization_url });
  } catch (error: any) {
    console.error('Paystack checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
