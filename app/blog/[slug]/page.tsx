import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// TEMPORARY DIAGNOSTIC PAGE — will be reverted after root-causing the 500.
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let diag = 'query not attempted';
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('id, slug, title, is_published')
      .eq('slug', slug)
      .maybeSingle();
    diag = `error=${error ? error.message : 'none'} | data=${data ? 'FOUND slug=' + data.slug : 'null'}`;
  } catch (e: any) {
    diag = `THREW: ${e?.message || String(e)}`;
  }
  return (
    <div style={{ padding: 40, fontFamily: 'monospace' }}>
      <p>slug param: {slug}</p>
      <p>db result: {diag}</p>
    </div>
  );
}
