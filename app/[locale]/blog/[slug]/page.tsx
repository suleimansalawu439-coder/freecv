import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { ArrowLeft, Calendar } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data: post } = await supabaseAdmin
    .from('blog_posts')
    .select('title, meta_description')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Cvyon Blog`,
    description: post.meta_description || `Read ${post.title} on the Cvyon Career Hub.`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data: post } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!post || !post.is_published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-black selection:text-white pb-24">
      {/* Header */}
      <header className="bg-black text-white pt-24 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-bold tracking-widest text-xs uppercase mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <Calendar size={14} />
            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-6 mt-[-40px] relative z-20">
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl prose prose-gray max-w-none">
          {/* We render the content as raw HTML since the editor supports plain text/HTML */}
          <div 
            className="text-gray-800 leading-relaxed space-y-6 text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>
    </div>
  );
}
