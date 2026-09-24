import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ONE-TIME USE ONLY: secure import endpoint for the 6 launch articles.
// Protected by a Bearer token in CVYON_BLOG_IMPORT_TOKEN (Vercel env).
// This file is deleted immediately after the import runs.

function slugify(input: string): string {
  return String(input || '')
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function authorized(request: Request): boolean {
  const token = process.env.CVYON_BLOG_IMPORT_TOKEN;
  if (!token) return false;
  const header = request.headers.get('authorization') || '';
  return header === `Bearer ${token}`;
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

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
      return NextResponse.json({ error: 'A post with this slug already exists', slug }, { status: 409 });
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([{ title, slug, content, meta_description, is_published, header_image }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, slug, id: data.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
