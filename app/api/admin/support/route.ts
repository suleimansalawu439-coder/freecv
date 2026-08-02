import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';
export const dynamic = 'force-dynamic';
export async function GET() {
  try { await requireAdmin(); } catch { return adminFail(); }
  const { data, error } = await supabaseAdmin.from('support_tickets').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tickets: data || [] });
}