import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase';
import { authenticateRecruiter } from '@/lib/recruiter-auth';

export const dynamic = 'force-dynamic';

/** GET /api/recruiter/credits -> { balance, packs } */
export async function GET(req: Request) {
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  const auth = await authenticateRecruiter(req);
  if (!auth.ok) return auth.response;
  const { recruiter } = auth.auth;

  try {
    const [{ data: creditRow }, { data: packs }] = await Promise.all([
      supabaseAdmin.from('recruiter_credits').select('balance').eq('recruiter_id', recruiter.id).single(),
      supabaseAdmin
        .from('credit_packs')
        .select('id, name, credits, price_kobo, currency')
        .eq('active', true)
        .order('credits', { ascending: true }),
    ]);
    return NextResponse.json({
      balance: creditRow?.balance ?? 0,
      packs: packs || [],
    });
  } catch (e: any) {
    logger.error('credits', 'recruiter/credits error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
