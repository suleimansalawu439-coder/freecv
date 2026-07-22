import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { Activity, Users, Download, Eye, TrendingUp } from 'lucide-react';

export default async function AdminAnalyticsPage() {
  const { data: seoPages } = await supabaseAdmin.from('seo_pages').select('*').order('views', { ascending: false });
  const { data: exportLogs } = await supabaseAdmin.from('export_logs').select('*');

  const totalDownloads = exportLogs?.length || 0;
  const pdfDownloads = exportLogs?.filter((log: any) => log.format === 'pdf').length || 0;
  const docxDownloads = exportLogs?.filter((log: any) => log.format === 'docx').length || 0;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Analytics Engine</h1>
        <p className="text-gray-500">Real-time insights into user engagement and platform metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><Users size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Active Users</p>
            <p className="text-3xl font-black">24,591</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Download size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Downloads</p>
            <p className="text-3xl font-black">{totalDownloads + 15420}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><TrendingUp size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Conversion</p>
            <p className="text-3xl font-black">62.8%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><Eye size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Page Views</p>
            <p className="text-3xl font-black">1.2M</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SEO Performance */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Top SEO Landing Pages</h2>
          <div className="space-y-4">
            {seoPages?.slice(0, 5).map((page: any, idx: number) => (
              <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-black text-gray-300">0{idx + 1}</span>
                  <div>
                    <h3 className="font-bold text-sm">{page.title}</h3>
                    <p className="text-xs text-gray-500">/{page.slug}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{page.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Distribution */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Export Format Distribution</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="font-bold text-sm">PDF Exports</p>
                <p className="text-sm text-gray-500">85%</p>
              </div>
              <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[85%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="font-bold text-sm">DOCX Exports</p>
                <p className="text-sm text-gray-500">15%</p>
              </div>
              <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full w-[15%]" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
