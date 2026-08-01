import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyUserToken } from '@/lib/auth';

const CONSENT_VERSION = 'v1.0';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email: string = body?.email || '';
    // your /settings page sends snake_case keys inside `consents`
    const c = body?.consents || {};
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    // verify caller owns this email (token optional: settings also passes session)
    const token = (req.headers.get('Authorization') || '').replace('Bearer ', '');
    let okEmail = email;
    if (token) {
      const verified = await verifyUserToken(token);
      if (!verified || verified.toLowerCase() !== email.toLowerCase()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      okEmail = verified;
    }

    const { data: cand } = await supabaseAdmin.from('candidates').select('id').eq('email', okEmail).single();
    if (!cand?.id) return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });

    const now = new Date().toISOString();
    const patch = {
      consent_recruiter_share: !!c.consent_recruiter_share,
      consent_email_jobs: !!c.consent_email_jobs,
      consent_analytics: c.consent_analytics !== undefined ? !!c.consent_analytics : true,
      consent_version: CONSENT_VERSION,
      consent_at: now,
      updated_at: now,
    };

    // upsert (row may not exist yet) on candidate_profiles.id == cand.id
    const { error } = await supabaseAdmin.from('candidate_profiles').upsert(
      { id: cand.id, full_name: '', ...patch },
      { onConflict: 'id', ignoreDuplicates: false }
    );
    if (error) {
      // if upsert unsupported by client version, fall back to update
      const { error: e2 } = await supabaseAdmin.from('candidate_profiles').update(patch).eq('id', cand.id);
      if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });
    }

    try {
      await supabaseAdmin.from('consent_logs').insert({
        session_id: req.headers.get('x-forwarded-for') || 'unknown',
        email: okEmail,
        consent_marketing: patch.consent_recruiter_share || patch.consent_email_jobs,
        consent_ai: true,
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        user_agent: req.headers.get('user-agent') || '',
      });
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('consent update error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}