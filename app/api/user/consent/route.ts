import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyUserToken } from '@/lib/auth';

const CONSENT_VERSION = 'v1.0';

export async function GET(req: Request) {
  try {
    const token = (req.headers.get('Authorization') || '').replace('Bearer ', '');
    const url = new URL(req.url);
    const qEmail = url.searchParams.get('email') || '';

    let okEmail = qEmail;
    if (token) {
      const verified = await verifyUserToken(token);
      if (verified) okEmail = verified;
    }

    if (!okEmail) return NextResponse.json({ error: 'Email or valid token required' }, { status: 400 });

    const { data: cand } = await supabaseAdmin
      .from('candidates')
      .select('id, email, full_name, candidate_profiles(*)')
      .eq('email', okEmail)
      .single();

    const profile = cand?.candidate_profiles?.[0] || cand?.candidate_profiles || null;

    return NextResponse.json({
      success: true,
      candidate: cand || null,
      consents: {
        consent_recruiter_share: profile?.consent_recruiter_share ?? false,
        consent_email_jobs: profile?.consent_email_jobs ?? false,
        consent_analytics: profile?.consent_analytics ?? true,
      }
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email: string = body?.email || '';
    const c = body?.consents || {};
    if (!email || !email.includes('@')) return NextResponse.json({ error: 'Valid email required' }, { status: 400 });

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

    const now = new Date().toISOString();

    // 1. Find or create candidate row
    let { data: cand } = await supabaseAdmin.from('candidates').select('id, full_name, job_title').eq('email', okEmail).single();
    if (!cand?.id) {
      const { data: newCand, error: newErr } = await supabaseAdmin.from('candidates').upsert({
        email: okEmail,
        name: body.full_name || '',
        full_name: body.full_name || '',
        opted_in_at: now,
        updated_at: now,
      }, { onConflict: 'email' }).select('id, full_name, job_title').single();
      if (newErr || !newCand?.id) {
        return NextResponse.json({ error: 'Failed to initialize candidate record' }, { status: 500 });
      }
      cand = newCand;
    }

    // 2. Fetch existing profile if any
    const { data: existingProf } = await supabaseAdmin
      .from('candidate_profiles')
      .select('*')
      .eq('id', cand.id)
      .single();

    const patch = {
      consent_recruiter_share: c.consent_recruiter_share !== undefined
        ? Boolean(c.consent_recruiter_share)
        : (c.recruiterShare !== undefined ? Boolean(c.recruiterShare) : (existingProf?.consent_recruiter_share ?? false)),
      consent_email_jobs: c.consent_email_jobs !== undefined
        ? Boolean(c.consent_email_jobs)
        : (c.emailJobs !== undefined ? Boolean(c.emailJobs) : (existingProf?.consent_email_jobs ?? false)),
      consent_analytics: c.consent_analytics !== undefined
        ? Boolean(c.consent_analytics)
        : (c.analytics !== undefined ? Boolean(c.analytics) : (existingProf?.consent_analytics ?? true)),
      consent_version: CONSENT_VERSION,
      consent_at: now,
      updated_at: now,
    };

    // 3. Upsert candidate_profiles
    const { error: profErr } = await supabaseAdmin.from('candidate_profiles').upsert({
      id: cand.id,
      full_name: existingProf?.full_name || cand.full_name || '',
      current_title: existingProf?.current_title || cand.job_title || '',
      ...existingProf,
      ...patch,
    }, { onConflict: 'id' });

    if (profErr) {
      const { error: e2 } = await supabaseAdmin.from('candidate_profiles').update(patch).eq('id', cand.id);
      if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });
    }

    // 4. Audit log
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

    return NextResponse.json({ success: true, consents: patch });
  } catch (error: any) {
    console.error('consent update error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}