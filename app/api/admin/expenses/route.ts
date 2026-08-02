import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';
export const dynamic = 'force-dynamic';

export async function GET() {
  try { await requireAdmin(); } catch { return adminFail(); }
  const { data, error } = await supabaseAdmin.from('expenditures').select('*').order('spent_on', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ expenses: data || [] });
}
export async function POST(req: Request) {
  let admin: any; try { admin = await requireAdmin(); } catch { return adminFail(); }
  const b = await req.json();
  if (!b.category || b.amount_minor == null) return NextResponse.json({ error: 'category + amount_minor required' }, { status: 400 });
  const { error } = await supabaseAdmin.from('expenditures').insert({ ...b, created_by: admin.email || 'admin' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}