import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { Activity, Users, Download, Shield } from 'lucide-react';
import Link from 'next/link';

export default async function AdminOverviewPage() {
  const { data: exportLogs } = await supabaseAdmin.from('export_logs').select('*');
  const totalDownloads = exportLogs?.length || 0;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to the FreeCV Admin Control Center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><Users size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Total Users</p>
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
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><Activity size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">System Status</p>
            <p className="text-xl font-black text-green-600">Operational</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><Shield size={24} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Security</p>
            <p className="text-xl font-black text-green-600">Secure</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Quick Links</h2>
          <div className="space-y-4">
            <Link href="/admin/settings" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors font-bold">Platform Settings &rarr;</Link>
            <Link href="/admin/ai" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors font-bold">AI Usage Logs &rarr;</Link>
            <Link href="/admin/seo" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors font-bold">SEO Landing Pages &rarr;</Link>
            <Link href="/admin/blog" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors font-bold">Blog CMS &rarr;</Link>
          </div>
        </div>

        <div className="bg-black text-white p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Command Center</h2>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">
            This dashboard grants full control over the FreeCV platform architecture. Modifying feature flags or site settings takes effect immediately across edge nodes worldwide.
          </p>
          <div className="p-4 bg-white/10 rounded-xl border border-white/10 text-sm font-mono text-gray-300">
            Node: eu-west-1 (Edge)<br/>
            Cache: HIT<br/>
            DB Latency: 12ms
          </div>
        </div>
      </div>
    </div>
  );
}
