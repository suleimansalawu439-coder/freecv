import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // We must use supabaseAdmin to update the recruiter's api_key,
    // assuming RLS might restrict it, but we also ensure the user_id matches
    
    // First, verify the recruiter belongs to this user
    const { data: recruiter, error: checkError } = await supabaseAdmin
      .from('recruiters')
      .select('id')
      .eq('user_id', session.user.id)
      .single();

    if (checkError || !recruiter) {
      return NextResponse.json({ error: 'Recruiter profile not found' }, { status: 404 });
    }

    // Regenerate key (gen_random_uuid())
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('recruiters')
      .update({ api_key: crypto.randomUUID() }) // Using Node's crypto
      .eq('id', recruiter.id)
      .select('api_key')
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ api_key: updated.api_key });
  } catch (error: any) {
    logger.error('api-key', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
