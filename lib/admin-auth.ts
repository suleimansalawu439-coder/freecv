import { cookies, headers } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth';

/**
 * Requires admin authentication from cookie or Authorization header.
 * Throws an Error with 'UNAUTHORIZED' if token is missing or invalid.
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  let token = cookieStore.get('admin_session')?.value;

  // Fallback to Bearer token in Authorization header
  if (!token) {
    const reqHeaders = await headers();
    const authHeader = reqHeaders.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7).trim();
    }
  }

  if (!token) throw new Error('UNAUTHORIZED');

  const isValid = await verifyAdminToken(token);
  if (!isValid) throw new Error('UNAUTHORIZED');

  return { role: 'admin' as const, authorized: true };
}

/**
 * Returns a JSON Response with standard Unauthorized payload.
 */
export function adminFail(status = 401, message = 'Unauthorized') {
  return Response.json({ error: message }, { status });
}