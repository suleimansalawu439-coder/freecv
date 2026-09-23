import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { verifyUserToken } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const email = await verifyUserToken(token);
    if (!email) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const supabase = supabaseAdmin;

    // SOFT-DELETE ONLY: set deleted_at instead of hard-deleting. The row stays
    // in the DB so admins can recover it; public/consent-facing RLS policies
    // already filter on deleted_at IS NULL.
    const now = new Date().toISOString();

    // Resolve ALL candidate row(s) by email, including already soft-deleted ones:
    // candidate_profiles links via candidate_profiles.id -> candidates.id, so a
    // profile's email is its parent candidate row's email.
    const { data: rows, error: lookupError } = await supabase
      .from('candidates')
      .select('id')
      .eq('email', email);

    if (lookupError) throw lookupError;

    const ids = (rows || []).map((r: { id: string }) => r.id);

    if (ids.length > 0) {
      const { error: profileError } = await supabase
        .from('candidate_profiles')
        .update({ deleted_at: now })
        .in('id', ids)
        .is('deleted_at', null);

      if (profileError) throw profileError;

      const { error: candidateError } = await supabase
        .from('candidates')
        .update({ deleted_at: now })
        .in('id', ids)
        .is('deleted_at', null);

      if (candidateError) throw candidateError;
    }

    return NextResponse.json({ success: true, message: 'Your data has been successfully deleted.' });
  } catch (error) {
    logger.error('delete', 'Delete User Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
