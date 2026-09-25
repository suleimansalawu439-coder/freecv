import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

const ALLOWED_CURRENCIES = ['USD', 'NGN', 'GHS', 'KES', 'ZAR'];

/** GET /api/admin/pricing -> all credit packs (including inactive) */
export async function GET() {
  try { await requireAdmin(); } catch { return adminFail(); }
  const { data, error } = await supabaseAdmin
    .from('credit_packs')
    .select('id, name, credits, price_kobo, currency, active, created_at')
    .order('credits', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ packs: data || [] });
}

/**
 * PUT /api/admin/pricing { id, name?, credits?, price_major?, currency?, active? }
 * price_major is in major units (dollars/naira); stored as minor units (cents/kobo).
 */
export async function PUT(req: Request) {
  try { await requireAdmin(); } catch { return adminFail(); }

  let body: any;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const id = String(body?.id || '').trim();
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const patch: Record<string, any> = {};
  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (!name) return NextResponse.json({ error: 'name cannot be empty' }, { status: 400 });
    patch.name = name;
  }
  if (body.credits !== undefined) {
    const credits = parseInt(body.credits, 10);
    if (!Number.isFinite(credits) || credits < 1 || credits > 10000) {
      return NextResponse.json({ error: 'credits must be between 1 and 10000' }, { status: 400 });
    }
    patch.credits = credits;
  }
  if (body.price_major !== undefined) {
    const major = Number(body.price_major);
    if (!Number.isFinite(major) || major < 0 || major > 1000000) {
      return NextResponse.json({ error: 'price must be a non-negative number' }, { status: 400 });
    }
    patch.price_kobo = Math.round(major * 100);
  }
  if (body.currency !== undefined) {
    const currency = String(body.currency).toUpperCase().trim();
    if (!ALLOWED_CURRENCIES.includes(currency)) {
      return NextResponse.json({ error: `currency must be one of: ${ALLOWED_CURRENCIES.join(', ')}` }, { status: 400 });
    }
    patch.currency = currency;
  }
  if (body.active !== undefined) patch.active = Boolean(body.active);

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('credit_packs')
    .update(patch)
    .eq('id', id)
    .select('id, name, credits, price_kobo, currency, active')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pack: data });
}
