"use client";

import React, { useState } from 'react';
import { Users, BarChart, Settings, Download, Search, LogOut, FileText, Mail, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminDashboard({ candidates, analytics, initialBlogPosts = [], subscribers = [] }: { candidates: any[], analytics: any[], initialBlogPosts?: any[], subscribers?: any[] }) {
  const [activeTab, setActiveTab] = useState<'crm' | 'analytics' | 'autoblog' | 'marketing' | 'config'>('crm');
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = candidates.filter(c => 
    c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    if (candidates.length === 0) return;
    const headers = ['Name', 'Email', 'Job Title', 'Template', 'Opted In At'];
    const csvContent = [
      headers.join(','),
      ...candidates.map(c => [
        `"${c.full_name || ''}"`, 
        `"${c.email || ''}"`, 
        `"${c.job_title || ''}"`, 
        `"${c.template_id || ''}"`, 
        `"${c.opted_in_at || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `freecv_talent_pool_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const funnel = {
    started: analytics.filter(a => a.event_type === 'milestone_started').length,
    previewed: analytics.filter(a => a.event_type === 'milestone_previewed').length,
    downloaded: analytics.filter(a => a.event_type === 'milestone_downloaded').length,
    optedIn: analytics.filter(a => a.event_type === 'milestone_opted_in').length,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-[#333]">
          <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">FreeCV</h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Command Center</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('crm')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'crm' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-[#222]'}`}
          >
            <Users size={18} /> Talent CRM
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'analytics' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-[#222]'}`}
          >
            <BarChart size={18} /> Analytics
          </button>
          <button 
            onClick={() => setActiveTab('autoblog')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'autoblog' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-[#222]'}`}
          >
            <FileText size={18} /> Autoblog CMS
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'marketing' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-[#222]'}`}
          >
            <Mail size={18} /> Marketing
          </button>
          <button 
            onClick={() => setActiveTab('config')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'config' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-[#222]'}`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-[#333]">
          <button onClick={() => { document.cookie = "admin_session=; max-age=0; path=/"; window.location.href = "/admin/login"; }} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        {activeTab === 'crm' && (
          <div className="max-w-6xl mx-auto">
            <header className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Talent Pool</h2>
                <p className="text-gray-500 text-sm font-medium mt-1">Manage and export opted-in candidates.</p>
              </div>
              <button 
                onClick={handleExportCSV}
                className="bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#ff3333] transition-colors shadow-lg"
              >
                <Download size={14} /> Export CSV
              </button>
            </header>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by name or job title..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-bold">Candidate</th>
                      <th className="px-6 py-4 font-bold">Job Title</th>
                      <th className="px-6 py-4 font-bold">Template</th>
                      <th className="px-6 py-4 font-bold">Opted In</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCandidates.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400">No candidates found.</td>
                      </tr>
                    ) : (
                      filteredCandidates.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-black">{c.full_name || 'Anonymous'}</div>
                            <div className="text-gray-500">{c.email}</div>
                          </td>
                          <td className="px-6 py-4 font-medium">{c.job_title || '—'}</td>
                          <td className="px-6 py-4"><span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-bold uppercase">{c.template_id}</span></td>
                          <td className="px-6 py-4 text-gray-500">{new Date(c.opted_in_at).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tight">High-Signal Analytics</h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Track conversion milestones across the platform.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm border-t-4 border-t-blue-500">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Started</p>
                <p className="text-4xl font-black">{funnel.started}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm border-t-4 border-t-purple-500">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Previewed</p>
                <p className="text-4xl font-black">{funnel.previewed}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm border-t-4 border-t-green-500">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Downloaded</p>
                <p className="text-4xl font-black">{funnel.downloaded}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm border-t-4 border-t-[#ff3333]">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Opted In</p>
                <p className="text-4xl font-black">{funnel.optedIn}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold mb-6">Conversion Funnel</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Started to Preview</span>
                    <span>{funnel.started ? Math.round((funnel.previewed / funnel.started) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: `${funnel.started ? (funnel.previewed / funnel.started) * 100 : 0}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Preview to Download</span>
                    <span>{funnel.previewed ? Math.round((funnel.downloaded / funnel.previewed) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${funnel.previewed ? (funnel.downloaded / funnel.previewed) * 100 : 0}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Download to Opt-In</span>
                    <span>{funnel.downloaded ? Math.round((funnel.optedIn / funnel.downloaded) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className="bg-[#ff3333] h-3 rounded-full" style={{ width: `${funnel.downloaded ? (funnel.optedIn / funnel.downloaded) * 100 : 0}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'autoblog' && (
          <div className="max-w-6xl mx-auto">
            <header className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Autoblog CMS</h2>
                <p className="text-gray-500 text-sm font-medium mt-1">Manage programmatic SEO articles to drive traffic.</p>
              </div>
              <button 
                onClick={() => alert('New Post Modal UI coming soon!')}
                className="bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#ff3333] transition-colors shadow-lg"
              >
                <Plus size={14} /> New Article
              </button>
            </header>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-bold">Title</th>
                      <th className="px-6 py-4 font-bold">Slug</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold">Created At</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {blogPosts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No blog posts found.</td>
                      </tr>
                    ) : (
                      blogPosts.map((post: any) => (
                        <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-black">{post.title}</td>
                          <td className="px-6 py-4 font-mono text-xs text-gray-500">{post.slug}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {post.is_published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{new Date(post.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button className="text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
                            <button className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="max-w-6xl mx-auto">
            <header className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Marketing Engine</h2>
                <p className="text-gray-500 text-sm font-medium mt-1">Newsletter subscribers and inbound leads.</p>
              </div>
              <button 
                className="bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-black/80 transition-colors shadow-lg"
              >
                <Download size={14} /> Export List
              </button>
            </header>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-bold">Email</th>
                      <th className="px-6 py-4 font-bold">Source</th>
                      <th className="px-6 py-4 font-bold">Subscribed At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {subscribers.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-gray-400">No subscribers yet.</td>
                      </tr>
                    ) : (
                      subscribers.map((sub: any) => (
                        <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-black">{sub.email}</td>
                          <td className="px-6 py-4">
                            <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-bold uppercase">{sub.source}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{new Date(sub.created_at).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="max-w-3xl mx-auto text-center py-24">
            <Settings size={48} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Site Configuration</h2>
            <p className="text-gray-500 mt-2">Global settings for the SEO engine will go here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
