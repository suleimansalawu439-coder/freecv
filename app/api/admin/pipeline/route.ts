import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';
export const dynamic = 'force-dynamic';
export async function GET() {
  try { await requireAdmin(); } catch { return adminFail(); }
  const { data, error } = await supabaseAdmin.from('sales_pipeline').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pipeline: data || [] });
}
export async function POST(req: Request) {
  try { await requireAdmin(); } catch { return adminFail(); }
  const b = await req.json();
  if (!b.company_name) return NextResponse.json({ error: 'company_name required' }, { status: 400 });
  const { error } = await supabaseAdmin.from('sales_pipeline').insert({ stage: 'lead', ...b });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}