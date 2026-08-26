import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAdmin(); } catch { return adminFail(); }

  try {
    const body = await request.json();
    const { title, slug, content, meta_description, is_published, header_image } = body;
    const resolvedParams = await params;

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update({ title, slug, content, meta_description, is_published, header_image })
      .eq('id', resolvedParams.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAdmin(); } catch { return adminFail(); }

  try {
    const resolvedParams = await params;
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', resolvedParams.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
