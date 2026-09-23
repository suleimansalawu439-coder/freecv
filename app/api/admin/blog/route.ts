import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
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
    const { title, content, meta_description, is_published, header_image } = body;
    const slug = slugify(body.slug || title || '');
    if (!title || !String(title).trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    if (!slug) {
      return NextResponse.json({ error: 'Could not derive a valid slug from title' }, { status: 400 });
    }
    if (!content || !String(content).trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const { data: existing } = await supabaseAdmin
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();
    if (existing?.id) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }

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
