import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default async function AdminBlogPage() {
  const { data: posts } = await supabaseAdmin.from('blog_posts').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Blog CMS</h1>
          <p className="text-gray-500">Manage career advice articles and SEO content.</p>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-lg">
          <Plus size={18} /> New Post
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Title</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Published</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post: any) => (
                <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold">{post.title}</p>
                    <p className="text-xs text-gray-500">/{post.slug}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${post.is_published ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit size={16} /></button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!posts || posts.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500 text-sm">No blog posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
