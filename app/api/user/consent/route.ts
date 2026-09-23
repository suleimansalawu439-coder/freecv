import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

const CONSENT_VERSION = 'v1.0';

/**
 * Verify the caller's Supabase session token and return their email.
 * The token is MANDATORY: consent records are personal data and must never
 * be read or mutated on the basis of an unauthenticated email parameter.
 */
async function getSessionEmail(req: Request): Promise<string | null> {
  const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    '';
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    '';
  if (!url || !anonKey) return null;
  try {
    const sb = createClient(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await sb.auth.getUser(token);
    if (error || !data?.user?.email) return null;
    return data.user.email;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const email = await getSessionEmail(req);
    if (!email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { data: cand } = await supabaseAdmin
      .from('candidates')
      .select('id, email, full_name, candidate_profiles(*)')
      .eq('email', email)
      .single();

    const profile = cand?.candidate_profiles?.[0] || cand?.candidate_profiles || null;

    // True opt-in: unknown/missing consent is treated as NOT granted.
    return NextResponse.json({
      success: true,
      candidate: cand || null,
      consents: {
        consent_recruiter_share: profile?.consent_recruiter_share ?? false,
        consent_email_jobs: profile?.consent_email_jobs ?? false,
        consent_analytics: profile?.consent_analytics ?? false,
      }
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const sessionEmail = await getSessionEmail(req);
    if (!sessionEmail) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const bodyEmail = String(body?.email || '').trim().toLowerCase();
    if (!bodyEmail || bodyEmail !== sessionEmail.toLowerCase()) {
      return NextResponse.json({ error: 'Email does not match the signed-in user' }, { status: 403 });
    }
    const okEmail = sessionEmail;
    const c = body?.consents || {};

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

    // True opt-in: omitted fields fall back to the stored value, and to FALSE
    // (never TRUE) when nothing was stored before.
    const patch = {
      consent_recruiter_share: c.consent_recruiter_share !== undefined
        ? Boolean(c.consent_recruiter_share)
        : (c.recruiterShare !== undefined ? Boolean(c.recruiterShare) : (existingProf?.consent_recruiter_share ?? false)),
      consent_email_jobs: c.consent_email_jobs !== undefined
        ? Boolean(c.consent_email_jobs)
        : (c.emailJobs !== undefined ? Boolean(c.emailJobs) : (existingProf?.consent_email_jobs ?? false)),
      consent_analytics: c.consent_analytics !== undefined
        ? Boolean(c.consent_analytics)
        : (c.analytics !== undefined ? Boolean(c.analytics) : (existingProf?.consent_analytics ?? false)),
      consent_version: CONSENT_VERSION,
      consent_at: now,
      updated_at: now,
    };

    // 3. Upsert candidate_profiles
    const { error: profErr } = await supabaseAdmin.from('candidate_profiles').upsert({
      id: cand.id,
      full_name: existingProf?.full_name || cand.full_name || '',
      current_title: existingProf?.current_title || cand.job_title || '',
      created_at: existingProf?.created_at || now,
      ...existingProf,
      ...patch,
    }, { onConflict: 'id' });

    if (profErr) {
      const { error: e2 } = await supabaseAdmin.from('candidate_profiles').update(patch).eq('id', cand.id);
      if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });
    }

    // 4. Update BOTH opted_in_at (legacy) AND consent_given_at (new reliable flag)
    // This ensures users who opt-in via settings appear correctly in admin dashboard
    if (patch.consent_recruiter_share === true) {
      const now = new Date().toISOString();

      // Update the new specific consent column
      await supabaseAdmin
        .from('candidates')
        .update({
          consent_given_at: now,
          opted_in_at: now, // Keep legacy sync
          updated_at: now
        })
        .eq('id', cand.id);
    }

    // 5. Audit log
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
    logger.error('consent', 'consent update error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
