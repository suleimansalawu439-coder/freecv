import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const token = (req.headers.get('Authorization') || '').replace('Bearer ', '');
    const { data: ud, error: ue } = await supabase.auth.getUser(token);
    if (ue || !ud?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: rec } = await supabaseAdmin.from('recruiters').select('*, subscriptions(*)').eq('user_id', ud.user.id).single();
    if (!rec) return NextResponse.json({ error: 'Recruiter account not found' }, { status: 403 });
    if (!(rec.subscriptions || []).some((s: any) => s.status === 'active')) return NextResponse.json({ error: 'No active subscription' }, { status: 402 });

    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';
    const country = url.searchParams.get('country') || '';

    let rq = supabaseAdmin.from('candidate_profiles').select('*, candidates(*)').eq('consent_recruiter_share', true);
    if (q) rq = rq.ilike('current_title', `%${q}%`);
    if (country) rq = rq.eq('country', country);
    rq = rq.order('completeness_score', { ascending: false, nullsFirst: false }).limit(60);

    const { data, error } = await rq;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ candidates: data || [] });
  } catch (e: any) {
    console.error('recruiter/search error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}