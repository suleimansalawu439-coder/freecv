import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export interface RecruiterAuth {
  userId: string;
  email: string | null;
  recruiter: any;
}

/**
 * Shared recruiter auth: validates the Supabase Bearer token and resolves the
 * recruiter row. Same pattern as app/api/recruiter/search and /ensure.
 * Returns either { ok: true, auth } or { ok: false, response } (a 401/403).
 */
export async function authenticateRecruiter(
  req: Request
): Promise<{ ok: true; auth: RecruiterAuth } | { ok: false; response: NextResponse }> {
  const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!token) {
    return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  const { data: ud, error: ue } = await supabase.auth.getUser(token);
  if (ue || !ud?.user) {
    return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  const { data: rec } = await supabaseAdmin.from('recruiters').select('*').eq('user_id', ud.user.id).single();
  if (!rec) {
    return { ok: false, response: NextResponse.json({ error: 'Recruiter account not found' }, { status: 403 }) };
  }

  return {
    ok: true,
    auth: { userId: ud.user.id, email: ud.user.email ?? null, recruiter: rec },
  };
}
