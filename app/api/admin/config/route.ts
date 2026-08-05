import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';

export async function PATCH(req: Request) {
  try { await requireAdmin(); } catch { return adminFail(); }
  const { target, key, value, id } = await req.json();
  try {
    if (target === 'app_settings') {
      if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 });
      const { error } = await supabaseAdmin.from('app_settings').upsert({ key, value }, { onConflict: 'key' });
      if (error) throw error;
    } else if (target === 'site_settings') {
      const { error } = await supabaseAdmin.from('site_settings').upsert({ id: id || 1, ...value, updated_at: new Date().toISOString() }, { onConflict: 'id' });
      if (error) throw error;
    } else if (target === 'feature_flags') {
      if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 });
      const { error } = await supabaseAdmin.from('feature_flags').update({ is_enabled: !!value }).eq('key', key);
      if (error) throw error;
    } else return NextResponse.json({ error: 'unknown target' }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}