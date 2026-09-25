import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase';
import { authenticateRecruiter } from '@/lib/recruiter-auth';
import { anonymizeProfile, MATCH_ELIGIBILITY } from '@/lib/recruiter-match';

export const dynamic = 'force-dynamic';

function profileIdFrom(req: Request, body: any): string {
  const fromBody = String(body?.profileId || '').trim();
  if (fromBody) return fromBody;
  try {
    return String(new URL(req.url).searchParams.get('profileId') || '').trim();
  } catch {
    return '';
  }
}

/** Only shortlist profiles the recruiter is allowed to see (consented, not deleted). */
async function eligibleProfile(profileId: string) {
  const { data } = await supabaseAdmin
    .from('candidate_profiles')
    .select('id, current_title, summary, city, country, experience_years, skills, completeness_score')
    .eq('id', profileId)
    .eq('consent_recruiter_share', MATCH_ELIGIBILITY.consent_recruiter_share)
    .is('deleted_at', MATCH_ELIGIBILITY.deleted_at)
    .single();
  return data;
}

/** GET /api/recruiter/shortlist — the recruiter's shortlisted candidates (anonymized). */
export async function GET(req: Request) {
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const auth = await authenticateRecruiter(req);
  if (!auth.ok) return auth.response;
  const { recruiter } = auth.auth;

  try {
    const { data, error } = await supabaseAdmin
      .from('shortlists')
      .select('candidate_profile_id, created_at, candidate_profiles(id, current_title, summary, city, country, experience_years, skills, completeness_score, consent_recruiter_share)')
      .eq('recruiter_id', recruiter.id)
      .order('created_at', { ascending: false })
      .limit(200);
    if (error) throw error;

    const items = (data || [])
      .map((row: any) => {
        const p = row.candidate_profiles;
        // Consent may have been revoked after shortlisting — drop silently.
        if (!p || p.consent_recruiter_share !== true) return null;
        return {
          profileId: row.candidate_profile_id,
          shortlistedAt: row.created_at,
          profile: anonymizeProfile(p, []),
        };
      })
      .filter(Boolean);
    return NextResponse.json({ shortlist: items });
  } catch (e: any) {
    logger.error('shortlist', 'recruiter/shortlist GET error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/** POST /api/recruiter/shortlist { profileId } — add to shortlist. */
export async function POST(req: Request) {
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const auth = await authenticateRecruiter(req);
  if (!auth.ok) return auth.response;
  const { recruiter } = auth.auth;

  const body = await req.json().catch(() => ({}));
  const profileId = profileIdFrom(req, body);
  if (!profileId) {
    return NextResponse.json({ error: 'profileId is required' }, { status: 400 });
  }

  try {
    const profile = await eligibleProfile(profileId);
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    const { error } = await supabaseAdmin
      .from('shortlists')
      .upsert(
        { recruiter_id: recruiter.id, candidate_profile_id: profileId },
        { onConflict: 'recruiter_id,candidate_profile_id', ignoreDuplicates: true }
      );
    if (error) throw error;
    return NextResponse.json({
      ok: true,
      profileId,
      profile: anonymizeProfile(profile, []),
    });
  } catch (e: any) {
    logger.error('shortlist', 'recruiter/shortlist POST error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/** DELETE /api/recruiter/shortlist { profileId } — remove from shortlist. */
export async function DELETE(req: Request) {
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const auth = await authenticateRecruiter(req);
  if (!auth.ok) return auth.response;
  const { recruiter } = auth.auth;

  const body = await req.json().catch(() => ({}));
  const profileId = profileIdFrom(req, body);
  if (!profileId) {
    return NextResponse.json({ error: 'profileId is required' }, { status: 400 });
  }

  try {
    const { error } = await supabaseAdmin
      .from('shortlists')
      .delete()
      .eq('recruiter_id', recruiter.id)
      .eq('candidate_profile_id', profileId);
    if (error) throw error;
    return NextResponse.json({ ok: true, profileId });
  } catch (e: any) {
    logger.error('shortlist', 'recruiter/shortlist DELETE error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
