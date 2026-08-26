import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import DOMPurify from 'isomorphic-dompurify';
import { ArrowLeft, Calendar } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

// Generate dynamic metadata for SEO + OpenGraph
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data: post } = await supabaseAdmin
    .from('blog_posts')
    .select('title, meta_description, header_image')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const description = post.meta_description || `Read ${post.title} on the Cvyon Career Hub.`;

  return {
    title: `${post.title} | Cvyon Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      ...(post.header_image ? {
        images: [{ url: post.header_image, width: 1200, height: 630, alt: post.title }],
      } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      ...(post.header_image ? { images: [post.header_image] } : {}),
    },
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
        <article className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Header Image */}
          {post.header_image && (
            <div className="w-full aspect-[2/1] relative">
              <img
                src={post.header_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content with proper HTML rendering */}
          <div className="p-8 sm:p-12">
            <div 
              className="blog-content text-gray-800 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} 
            />
          </div>
        </article>
      </main>

      {/* Blog content styles - since @tailwindcss/typography is not installed */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content h1 { font-size: 2rem; font-weight: 800; margin: 1.5em 0 0.5em; line-height: 1.2; color: #111; }
        .blog-content h2 { font-size: 1.5rem; font-weight: 700; margin: 1.5em 0 0.5em; line-height: 1.3; color: #111; }
        .blog-content h3 { font-size: 1.25rem; font-weight: 600; margin: 1.25em 0 0.5em; line-height: 1.4; color: #222; }
        .blog-content p { margin: 1em 0; }
        .blog-content ul { list-style-type: disc; padding-left: 1.5em; margin: 1em 0; }
        .blog-content ol { list-style-type: decimal; padding-left: 1.5em; margin: 1em 0; }
        .blog-content li { margin: 0.25em 0; }
        .blog-content a { color: #2563eb; text-decoration: underline; }
        .blog-content a:hover { color: #1d4ed8; }
        .blog-content blockquote { border-left: 4px solid #e5e7eb; padding-left: 1em; margin: 1em 0; color: #6b7280; font-style: italic; }
        .blog-content strong { font-weight: 700; }
        .blog-content em { font-style: italic; }
        .blog-content code { background: #f3f4f6; padding: 0.2em 0.4em; border-radius: 0.25rem; font-size: 0.875em; font-family: monospace; }
        .blog-content pre { background: #1f2937; color: #f9fafb; padding: 1em; border-radius: 0.5rem; overflow-x: auto; margin: 1em 0; }
        .blog-content pre code { background: none; padding: 0; color: inherit; }
        .blog-content img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1em 0; }
        .blog-content hr { border: none; border-top: 1px solid #e5e7eb; margin: 2em 0; }
      `}} />
    </div>
  );
}
