import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';

/* Server-side column pick for recruiters PATCH. Mirrors the client-side
   RECRUITER_EDIT_COLS whitelist in components/admin/tabs.tsx and the live
   public.recruiters columns — PostgREST rejects the whole update if the body
   carries the nested `subscriptions` array or any non-column key. */
const RECRUITER_PATCH_COLS = [
  'company_name', 'contact_name', 'contact_email', 'phone', 'website',
  'location', 'country', 'company_size', 'industry', 'notes', 'status',
];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAdmin(); } catch { return adminFail(); }
  const { id } = await params; const b = await req.json();
  const update: Record<string, unknown> = {};
  for (const k of RECRUITER_PATCH_COLS) if (k in b) update[k] = b[k];
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No editable fields provided' }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from('recruiters').update(update).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}