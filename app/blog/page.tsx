import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowRight, FileText } from 'lucide-react';
import NewsletterCapture from '@/components/NewsletterCapture';

export const revalidate = 3600; // Revalidate every hour

export default async function BlogIndex() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('title, slug, meta_description, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-gray-200 pt-24 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-black">Career <span className="text-blue-600">Playbook</span></h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Actionable advice, deep dives into ATS algorithms, and premium resume strategies to land your next role.</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 space-y-24">
        {(!posts || posts.length === 0) ? (
          <div className="text-center py-24 text-gray-400">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl font-bold">No articles published yet.</p>
            <p className="mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post: any) => (
              <article key={post.slug} className="group flex flex-col items-start bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all">
                <time className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
                <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {post.meta_description}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-black group-hover:text-blue-600 transition-colors"
                >
                  Read Article <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        )}

        <NewsletterCapture source="blog_index" />
      </main>
    </div>
  );
}
