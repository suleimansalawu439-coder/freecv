import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { ref_code, session_id, ip_address } = await request.json();

    if (!ref_code) {
      return NextResponse.json({ error: 'ref_code is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('affiliate_clicks')
      .insert([
        {
          ref_code,
          session_id: session_id || null,
          ip_address: ip_address || null,
        }
      ]);

    if (error) {
      console.error('Error logging affiliate click:', error);
      return NextResponse.json({ error: 'Failed to log click' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Affiliate tracking error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
