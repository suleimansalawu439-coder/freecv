import React from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';
import NewsletterCapture from '@/components/NewsletterCapture';

// If you want to use a markdown parser, you'd import it here.
// For now, we render raw text or simple HTML.

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data } = await supabase
    .from('blog_posts')
    .select('title, meta_description')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!data) return { title: 'Post Not Found' };

  return {
    title: `${data.title} | FreeCV Playbook`,
    description: data.meta_description,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!post || !post.is_published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 py-4 px-6 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/blog" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <button className="p-2 text-gray-400 hover:text-black transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-16">
          <time className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6 block">
            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            {post.title}
          </h1>
          {post.meta_description && (
            <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">
              {post.meta_description}
            </p>
          )}
        </header>

        {/* Content Body */}
        <article className="prose prose-lg prose-blue max-w-none mb-24 font-serif text-gray-800 leading-loose whitespace-pre-wrap">
          {post.content}
        </article>

        <hr className="border-gray-200 mb-24" />

        <NewsletterCapture source={`blog_post_${post.slug}`} />
      </main>
    </div>
  );
}
