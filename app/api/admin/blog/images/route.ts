import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

const BUCKET = 'blog-images';
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const PROJECT_URL = 'https://fmvhwqtizyjqzmqwhapa.supabase.co';

function publicUrl(path: string) {
  return `${PROJECT_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

function pathFromUrl(url: string): string | null {
  const marker = `/${BUCKET}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

async function postExists(post_id: string) {
  const { data } = await supabaseAdmin.from('blog_posts').select('id').eq('id', post_id).maybeSingle();
  return !!data?.id;
}

/** GET ?post_id= → list content images for a post */
export async function GET(request: Request) {
  try { await requireAdmin(); } catch { return adminFail(); }
  const { searchParams } = new URL(request.url);
  const post_id = searchParams.get('post_id');
  if (!post_id) return NextResponse.json({ error: 'post_id is required' }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from('blog_images')
    .select('*')
    .eq('post_id', post_id)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
  return NextResponse.json(data);
}

/** POST multipart: file, post_id, kind=header|content, caption? */
export async function POST(request: Request) {
  try { await requireAdmin(); } catch { return adminFail(); }

  try {
    const form = await request.formData();
    const file = form.get('file');
    const post_id = String(form.get('post_id') || '');
    const kind = String(form.get('kind') || 'content');
    const caption = String(form.get('caption') || '').slice(0, 300);

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'An image file is required' }, { status: 400 });
    }
    if (!post_id || !(await postExists(post_id))) {
      return NextResponse.json({ error: 'Valid post_id is required' }, { status: 400 });
    }
    if (kind !== 'header' && kind !== 'content') {
      return NextResponse.json({ error: 'kind must be header or content' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Image must be 5MB or smaller' }, { status: 400 });
    }
    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, WebP or GIF images are allowed' }, { status: 400 });
    }

    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : file.type === 'image/gif' ? 'gif' : 'jpg';
    const path = `${post_id}/${kind}-${crypto.randomUUID()}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error: upErr } = await supabaseAdmin.storage.from(BUCKET).upload(path, bytes, {
      contentType: file.type,
      upsert: false,
    });
    if (upErr) return NextResponse.json({ error: 'Upload failed' }, { status: 500 });

    const url = publicUrl(path);

    if (kind === 'header') {
      const { error: dbErr } = await supabaseAdmin
        .from('blog_posts')
        .update({ header_image: url })
        .eq('id', post_id);
      if (dbErr) {
        await supabaseAdmin.storage.from(BUCKET).remove([path]);
        return NextResponse.json({ error: 'Failed to save header image' }, { status: 500 });
      }
      return NextResponse.json({ kind: 'header', image_url: url });
    }

    const { data: existing } = await supabaseAdmin
      .from('blog_images')
      .select('sort_order')
      .eq('post_id', post_id)
      .order('sort_order', { ascending: false })
      .limit(1);
    const sort_order = (existing?.[0]?.sort_order ?? -1) + 1;

    const { data, error: dbErr } = await supabaseAdmin
      .from('blog_images')
      .insert([{ post_id, image_url: url, caption: caption || null, sort_order }])
      .select()
      .single();
    if (dbErr) {
      await supabaseAdmin.storage.from(BUCKET).remove([path]);
      return NextResponse.json({ error: 'Failed to save image record' }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

/** PUT { id, caption } → update caption */
export async function PUT(request: Request) {
  try { await requireAdmin(); } catch { return adminFail(); }
  try {
    const { id, caption } = await request.json();
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });
    const { data, error } = await supabaseAdmin
      .from('blog_images')
      .update({ caption: String(caption || '').slice(0, 300) || null })
      .eq('id', id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: 'Failed to update caption' }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to update caption' }, { status: 500 });
  }
}

/**
 * DELETE ?id= → delete a content image (row + storage object)
 * DELETE ?post_id=&kind=header → clear the post's header image
 */
export async function DELETE(request: Request) {
  try { await requireAdmin(); } catch { return adminFail(); }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const post_id = searchParams.get('post_id');
  const kind = searchParams.get('kind');

  try {
    if (id) {
      const { data: row } = await supabaseAdmin.from('blog_images').select('image_url').eq('id', id).maybeSingle();
      const { error } = await supabaseAdmin.from('blog_images').delete().eq('id', id);
      if (error) return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
      const p = row?.image_url ? pathFromUrl(row.image_url) : null;
      if (p) await supabaseAdmin.storage.from(BUCKET).remove([p]);
      return NextResponse.json({ ok: true });
    }

    if (post_id && kind === 'header') {
      const { data: post } = await supabaseAdmin.from('blog_posts').select('header_image').eq('id', post_id).maybeSingle();
      const { error } = await supabaseAdmin.from('blog_posts').update({ header_image: null }).eq('id', post_id);
      if (error) return NextResponse.json({ error: 'Failed to clear header image' }, { status: 500 });
      const p = post?.header_image ? pathFromUrl(post.header_image) : null;
      if (p) await supabaseAdmin.storage.from(BUCKET).remove([p]);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'id or (post_id + kind=header) is required' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
