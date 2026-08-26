import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try { await requireAdmin(); } catch { return adminFail(); }

  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try { await requireAdmin(); } catch { return adminFail(); }

  try {
    const body = await request.json();
    const { title, slug, content, meta_description, is_published, header_image } = body;

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([{ title, slug, content, meta_description, is_published, header_image }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
