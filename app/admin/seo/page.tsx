import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { Database, Plus, Search, Globe, TrendingUp } from 'lucide-react';

export default async function AdminSEOPage() {
  const { data: pages } = await supabaseAdmin.from('seo_pages').select('*').order('views', { ascending: false });

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Dynamic SEO Pages</h1>
          <p className="text-gray-500">Manage programmatically generated landing pages.</p>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-lg">
          <Plus size={18} /> Add SEO Target
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Globe size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Total Pages</p>
            <p className="text-3xl font-black">{pages?.length || 20}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 md:col-span-2">
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><TrendingUp size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Total Organic Views</p>
            <p className="text-3xl font-black">1.2M</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold">SEO Database</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search keywords..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Target Keyword</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Slug</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Views</th>
              </tr>
            </thead>
            <tbody>
              {pages?.map((page: any) => (
                <tr key={page.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-sm">{page.title}</td>
                  <td className="p-4 text-sm text-gray-500">/{page.slug}</td>
                  <td className="p-4 font-bold text-right text-sm">{page.views?.toLocaleString() || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
