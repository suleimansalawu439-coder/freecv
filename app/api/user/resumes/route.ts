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
    // If it's a base64 encoded secret from the Supabase UI (no hyphens, typical for legacy JWT)
    const isBase64 = !secretStr.includes('-') && secretStr.length > 50;
    // Edge runtime compatible base64 decoding (Buffer is not available on Edge)
    const secret = isBase64 ? Uint8Array.from(atob(secretStr), c => c.charCodeAt(0)) : new TextEncoder().encode(secretStr);
    const { payload } = await jose.jwtVerify(token, secret);
    return payload.sub;
  } catch (e) {
    return null;
  }
}

export async function GET(req: Request) {
  const userId = await getUser();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('user_resumes')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const userId = await getUser();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { title, resume_data } = body;

    const { data, error } = await supabaseAdmin
      .from('user_resumes')
      .insert({
        user_id: userId,
        title: title || 'Untitled Resume',
        resume_data
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
