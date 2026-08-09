import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const token = (req.headers.get('Authorization') || '').replace('Bearer ', '');
    const { data: ud, error: ue } = await supabase.auth.getUser(token);
    if (ue || !ud?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const company = (req.headers.get('x-company-name') || ud.user.user_metadata?.company_name || '').trim() || 'Recruiter';
    const { data: existing } = await supabaseAdmin.from('recruiters').select('id').eq('user_id', ud.user.id).single();
    if (existing) return NextResponse.json({ ok: true, created: false });

    const { error } = await supabaseAdmin.from('recruiters').upsert(
      { user_id: ud.user.id, company_name: company },
      { onConflict: 'user_id', ignoreDuplicates: true }
    );
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, created: true });
  } catch (e: any) {
    logger.error('ensure', 'recruiter/ensure error', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}