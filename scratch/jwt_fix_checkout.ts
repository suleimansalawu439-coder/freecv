import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';
import * as jose from 'jose';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

async function getUser() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.getAll().find(c => c.name.includes('-auth-token'));
  if (!authCookie) return null;
  try {
    const parsed = JSON.parse(authCookie.value);
    const token = parsed[0] || parsed.access_token;
    if (!token) return null;
    const secretStr = process.env.SUPABASE_JWT_SECRET || 'super-secret-jwt-token-with-at-least-32-characters-long';
    const secret = secretStr.startsWith('v1,') 
      ? jose.base64url.decode(secretStr.split(',')[1]) 
      : new TextEncoder().encode(secretStr);
      
    const { payload } = await jose.jwtVerify(token, secret);
    return payload.sub;
  } catch (e) {
    return null;
  }
}
