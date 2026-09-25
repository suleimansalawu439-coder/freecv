import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase';
import { authenticateRecruiter } from '@/lib/recruiter-auth';

export const dynamic = 'force-dynamic';

/** GET /api/recruiter/searches — list the recruiter's JD searches (newest first). */
export async function GET(req: Request) {
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const auth = await authenticateRecruiter(req);
  if (!auth.ok) return auth.response;
  const { recruiter } = auth.auth;

  try {
    const { data, error } = await supabaseAdmin
      .from('jd_searches')
      .select('id, job_title, extracted_json, counts_json, saved, created_at')
      .eq('recruiter_id', recruiter.id)
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return NextResponse.json({ searches: data || [] });
  } catch (e: any) {
    logger.error('searches', 'recruiter/searches GET error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/** PATCH /api/recruiter/searches { id, saved } — save/unsave a search. */
export async function PATCH(req: Request) {
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const auth = await authenticateRecruiter(req);
  if (!auth.ok) return auth.response;
  const { recruiter } = auth.auth;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const id = String(body?.id || '').trim();
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  if (typeof body?.saved !== 'boolean') {
    return NextResponse.json({ error: 'saved must be a boolean' }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('jd_searches')
      .update({ saved: body.saved })
      .eq('id', id)
      .eq('recruiter_id', recruiter.id)
      .select('id, saved')
      .single();
    if (error || !data) {
      return NextResponse.json({ error: 'Search not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, id: data.id, saved: data.saved });
  } catch (e: any) {
    logger.error('searches', 'recruiter/searches PATCH error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
