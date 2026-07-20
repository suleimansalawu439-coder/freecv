import React from 'react';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { ArrowRight, Calendar } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export const metadata = {
  title: 'FreeCV Blog - Career Advice & Resume Tips',
  description: 'Expert advice on resume building, job hunting, and career advancement to help you land your dream job.',
};

export default async function BlogIndex() {
  const { data: posts } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-black selection:text-white pb-24">
      {/* Header */}
      <header className="bg-black text-white pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Link href="/" className="inline-block text-gray-400 hover:text-white font-bold tracking-widest text-xs uppercase mb-8 transition-colors">
            ← Back to FreeCV
          </Link>
          <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tighter mb-4">The Career Hub</h1>
          <p className="text-gray-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
            Expert insights on resume optimization, interview prep, and landing your dream job in 2026.
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-5xl mx-auto px-6 mt-[-40px] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(!posts || posts.length === 0) ? (
            <div className="col-span-1 md:col-span-2 bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-xl">
              <p className="text-gray-500 font-medium">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                    <Calendar size={14} />
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 mb-8 flex-1 line-clamp-3">
                    {post.meta_description || post.content.substring(0, 150) + '...'}
                  </p>
                  <div className="flex items-center gap-2 text-black font-bold uppercase tracking-widest text-xs">
                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
