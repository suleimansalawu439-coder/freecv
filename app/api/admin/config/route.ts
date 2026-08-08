import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';
import { AdminConfigSchema, validatePayload } from '@/lib/validation';

export async function handleConfig(req: Request) {
  try { await requireAdmin(); } catch { return adminFail(); }
  const rawBody = await req.json().catch(() => ({}));
  const validation = validatePayload(AdminConfigSchema, rawBody);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const { target, key, value, id } = validation.data;
  const now = new Date().toISOString();

  try {
    if (target === 'app_settings') {
      if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 });
      const { error } = await supabaseAdmin
        .from('app_settings')
        .upsert({ key, value, updated_at: now }, { onConflict: 'key' });
      if (error) throw error;
    } else if (target === 'site_settings') {
      const { error } = await supabaseAdmin
        .from('site_settings')
        .upsert({ id: id || 1, ...value, updated_at: now }, { onConflict: 'id' });
      if (error) throw error;
    } else if (target === 'feature_flags') {
      if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 });
      const { error } = await supabaseAdmin
        .from('feature_flags')
        .upsert({ key, is_enabled: !!value, updated_at: now }, { onConflict: 'key' });
      if (error) throw error;
    } else {
      return NextResponse.json({ error: 'unknown target' }, { status: 400 });
    }
    return NextResponse.json({ ok: true, success: true });
  } catch (e: any) {
    console.error('[Admin Config Error]', e);
    return NextResponse.json({ error: e.message || 'Failed to update config' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  return handleConfig(req);
}

export async function POST(req: Request) {
  return handleConfig(req);
}