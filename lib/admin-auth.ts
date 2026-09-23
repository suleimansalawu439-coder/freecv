import { createClient } from '@/utils/supabase/server';
import { isAdminEmail } from './admin-emails';

/**
 * Requires admin authentication.
 * Uses Supabase SSR client to verify the session.
 * Throws an Error with 'UNAUTHORIZED' if token is missing or invalid, or user is not admin.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('UNAUTHORIZED');

  if (!isAdminEmail(user.email)) {
    throw new Error('UNAUTHORIZED');
  }

  return { role: 'admin' as const, authorized: true, user };
}

/**
 * Returns a JSON Response with standard Unauthorized payload.
 */
export function adminFail(status = 401, message = 'Unauthorized') {
  return Response.json({ error: message }, { status });
}