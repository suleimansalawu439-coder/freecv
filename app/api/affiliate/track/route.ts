import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Estimated CPC in USD cents by candidate country. Reconcile against your
// CareerJet publisher reports for actuals; structure stays identical.
const CPC_CENTS: Record<string, number> = {
  US: 65, GB: 55, CA: 50, AU: 50, IE: 48, NL: 45, DE: 45, SG: 45, FR: 40, AE: 40,
  ZA: 12, IN: 10, EG: 9, NG: 8, KE: 8, GH: 7, RW: 6, TZ: 6, UG: 6, CM: 6,
};
const DEFAULT_CPC = 12;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const job_url: string = body?.job_url || '';
    if (!job_url) return NextResponse.json({ error: 'job_url required' }, { status: 400 });

    const country = String(req.headers.get('x-vercel-ip-country') || body?.country || '').toUpperCase().slice(0, 2);
    const cpcCents = CPC_CENTS[country] ?? DEFAULT_CPC;
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || '';

    const { error } = await supabaseAdmin.from('job_clicks').insert({
      job_url,
      job_title: body?.job_title || '',
      company: body?.company || '',
      cpc_value: cpcCents / 100,                 // schema is NUMERIC dollars
      country: country || 'UNKNOWN',
      location: body?.location || country || 'Unknown',
      user_ip: ip,
      user_agent: req.headers.get('user-agent') || '',
    });
    if (error) { console.error('job_clicks insert error', error); return NextResponse.json({ error: 'Failed to record click' }, { status: 500 }); }

    return NextResponse.json({ success: true, country: country || 'UNKNOWN', cpc_minor: cpcCents });
  } catch (err: any) {
    console.error('jobs/track error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}