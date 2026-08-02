import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function GET() {
  try { await requireAdmin(); } catch { return adminFail(); }
  const { data, error } = await supabaseAdmin.from('recruiters').select('*, subscriptions(*)').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ recruiters: data || [] });
}

export async function POST(req: Request) {
  let admin: any; try { admin = await requireAdmin(); } catch { return adminFail(); }
  const b = await req.json();
  if (!b.email || !b.company_name) return NextResponse.json({ error: 'email + company_name required' }, { status: 400 });

  const tempPassword = b.password || crypto.randomBytes(9).toString('base64url');
  // 1. auth user (confirmed, so they can log in immediately)
  const { data: user, error: uErr } = await supabaseAdmin.auth.admin.createUser({
    email: b.email, password: tempPassword, email_confirm: true,
    user_metadata: { company_name: b.company_name, onboarded_by: admin.email || 'admin' },
  });
  if (uErr || !user?.user) return NextResponse.json({ error: uErr?.message || 'user create failed' }, { status: 500 });

  // 2. recruiter row with firmographics
  const { error: rErr } = await supabaseAdmin.from('recruiters').upsert({
    user_id: user.user.id,
    company_name: b.company_name,
    contact_name: b.contact_name || '', contact_email: b.contact_email || b.email,
    phone: b.phone || '', website: b.website || '', location: b.location || '', country: b.country || '',
    company_size: b.company_size || '', industry: b.industry || '', notes: b.notes || '',
    status: b.status || 'active', onboarded_by: admin.email || 'admin',
  }, { onConflict: 'user_id' });
  if (rErr) return NextResponse.json({ error: rErr.message }, { status: 500 });

  // 3. optional comp / trial subscription
  if (b.grant_subscription) {
    await supabaseAdmin.from('subscriptions').insert({
      recruiter_id: (await supabaseAdmin.from('recruiters').select('id').eq('user_id', user.user.id).single()).data?.id,
      paystack_subscription_code: `manual_${crypto.randomBytes(6).toString('hex')}`,
      status: 'active', tier: b.grant_subscription.tier || 'pro',
      amount_minor: b.grant_subscription.amount_minor || 0, currency: b.grant_subscription.currency || 'USD',
      fx_to_usd: b.grant_subscription.fx_to_usd || 1, plan: b.grant_subscription.tier || 'pro',
      current_period_end: new Date(Date.now() + (b.grant_subscription.days || 30) * 864e5).toISOString(),
      paid_at: new Date().toISOString(),
    });
  }
  return NextResponse.json({ ok: true, email: b.email, temp_password: tempPassword });
}