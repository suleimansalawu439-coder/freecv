import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';


function slugify(input: string): string {
  return String(input || '')
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireAdmin(); } catch { return adminFail(); }

  try {
    const body = await request.json();
    const { title, content, meta_description, is_published, header_image } = body;
    const slug = body.slug !== undefined ? slugify(body.slug || title || '') : undefined;
    if (body.slug !== undefined && !slug) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
    }
    const resolvedParams = await params;

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update({ title, ...(slug !== undefined ? { slug } : {}), content, meta_description, is_published, header_image })
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
