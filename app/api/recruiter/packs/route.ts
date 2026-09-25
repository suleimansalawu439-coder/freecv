import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/recruiter/packs -> { packs }
 * Public: active credit packs with current admin-set prices.
 * No auth, no sensitive data — powers the recruiter landing pricing section.
 */
export async function GET(req: Request) {
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { data: packs } = await supabaseAdmin
      .from('credit_packs')
      .select('id, name, credits, price_kobo, currency')
      .eq('active', true)
      .order('credits', { ascending: true });
    return NextResponse.json({ packs: packs || [] });
  } catch (e: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
