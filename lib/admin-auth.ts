import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/auth'; // returns the admin payload or null/throws

export async function requireAdmin() {
  const token = (await cookies()).get('admin_session')?.value;
  if (!token) throw new Error('UNAUTHORIZED');
  let payload: any = null;
  try { payload = await verifyAdminToken(token); } catch { payload = null; }
  if (!payload) throw new Error('UNAUTHORIZED');
  return payload as { id?: string; email?: string; role?: string };
}

// tiny helper so routes stay one-liners
export function adminFail(status = 401) {
  return Response.json({ error: 'Unauthorized' }, { status });
}