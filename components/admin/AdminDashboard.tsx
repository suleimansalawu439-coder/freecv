"use client";

import React, { useState, useEffect } from 'react';
import { Users, BarChart, Settings, Download, Search, LogOut, FileText, Mail, Plus, Edit, Trash2, Globe, Smartphone, Monitor, Tablet, Activity, TrendingUp, RefreshCw, X } from 'lucide-react';

// --- Types ---
interface StatsData {
  summary: {
    totalEvents: number;
    uniqueSessions: number;
    started: number;
    previewed: number;
    downloads: number;
    optIns: number;
    todayEvents: number;
  };
  topCountries: { country: string; count: number }[];
  deviceCounts: { desktop: number; mobile: number; tablet: number };
  topBrowsers: { browser: string; count: number }[];
  topOS: { os: string; count: number }[];
  topReferrers: { source: string; count: number }[];
  topTemplates: { template: string; count: number }[];
  dailyTrend: { date: string; count: number }[];
  recentActivity: {
    event_type: string;
    template_id: string;
    country: string;
    city: string;
    device_type: string;
    browser: string;
    os: string;
    referrer: string;
    created_at: string;
  }[];
}

// --- Country flag emoji lookup ---
const COUNTRY_FLAGS: Record<string, string> = {
  'Nigeria': '🇳🇬', 'United States': '🇺🇸', 'United Kingdom': '🇬🇧', 'Canada': '🇨🇦',
  'Germany': '🇩🇪', 'France': '🇫🇷', 'India': '🇮🇳', 'Australia': '🇦🇺', 'Brazil': '🇧🇷',
  'Japan': '🇯🇵', 'South Africa': '🇿🇦', 'Kenya': '🇰🇪', 'Ghana': '🇬🇭', 'Egypt': '🇪🇬',
  'Netherlands': '🇳🇱', 'Spain': '🇪🇸', 'Italy': '🇮🇹', 'Mexico': '🇲🇽', 'China': '🇨🇳',
  'South Korea': '🇰🇷', 'Singapore': '🇸🇬', 'Indonesia': '🇮🇩', 'Philippines': '🇵🇭',
  'Pakistan': '🇵🇰', 'Bangladesh': '🇧🇩', 'Turkey': '🇹🇷', 'Russia': '🇷🇺',
  'Saudi Arabia': '🇸🇦', 'UAE': '🇦🇪', 'United Arab Emirates': '🇦🇪', 'Poland': '🇵🇱',
  'Sweden': '🇸🇪', 'Norway': '🇳🇴', 'Denmark': '🇩🇰', 'Finland': '🇫🇮',
  'Ireland': '🇮🇪', 'Portugal': '🇵🇹', 'Switzerland': '🇨🇭', 'Austria': '🇦🇹',
  'Belgium': '🇧🇪', 'New Zealand': '🇳🇿', 'Argentina': '🇦🇷', 'Colombia': '🇨🇴',
  'Chile': '🇨🇱', 'Peru': '🇵🇪', 'Tanzania': '🇹🇿', 'Uganda': '🇺🇬', 'Rwanda': '🇷🇼',
  'Ethiopia': '🇪🇹', 'Morocco': '🇲🇦', 'Tunisia': '🇹🇳', 'Cameroon': '🇨🇲',
  'Zimbabwe': '🇿🇼', 'Zambia': '🇿🇲', 'Senegal': '🇸🇳', 'Malaysia': '🇲🇾',
  'Thailand': '🇹🇭', 'Vietnam': '🇻🇳', 'Taiwan': '🇹🇼', 'Israel': '🇮🇱',
  'Czech Republic': '🇨🇿', 'Romania': '🇷🇴', 'Hungary': '🇭🇺', 'Ukraine': '🇺🇦',
  'Greece': '🇬🇷',
};

function getFlag(country: string): string {
  return COUNTRY_FLAGS[country] || '🌍';
}

// --- Device icon ---
function DeviceIcon({ type }: { type: string }) {
  switch (type?.toLowerCase()) {
    case 'mobile': return <Smartphone size={14} />;
    case 'tablet': return <Tablet size={14} />;
    default: return <Monitor size={14} />;
  }
}

// --- Event label formatting ---
function formatEvent(type: string): { label: string; color: string } {
  switch (type) {
    case 'milestone_started': return { label: 'Started', color: 'bg-blue-100 text-blue-700' };
    case 'milestone_previewed': return { label: 'Previewed', color: 'bg-purple-100 text-purple-700' };
    case 'milestone_downloaded': return { label: 'Downloaded', color: 'bg-green-100 text-green-700' };
    case 'milestone_opted_in': return { label: 'Opted In', color: 'bg-red-100 text-red-700' };
    default: return { label: type, color: 'bg-gray-100 text-gray-700' };
  }
}

// --- Horizontal Bar ---
function HBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// --- Stat Card ---
function StatCard({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div className={`bg-white p-5 rounded-2xl border border-gray-200 shadow-sm border-t-4 ${accent}`}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
}

// ============================
// MAIN DASHBOARD COMPONENT
// ============================
export default function AdminDashboard({
  candidates,
  analytics,
  initialBlogPosts = [],
  subscribers = [],
}: {
  candidates: any[];
  analytics: any[];
  initialBlogPosts?: any[];
  subscribers?: any[];
}) {
  const [activeTab, setActiveTab] = useState<'crm' | 'analytics' | 'autoblog' | 'marketing' | 'config'>('analytics');
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState<StatsData | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Autoblog CMS State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [postFormData, setPostFormData] = useState({ title: '', slug: '', meta_description: '', content: '', is_published: false });
  const [isSavingPost, setIsSavingPost] = useState(false);

  const fetchBlogPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      if (res.ok) {
        const data = await res.json();
        setBlogPosts(data);
      }
    } catch (err) {
      console.error('Failed to fetch blog posts', err);
    }
  };

  const handleOpenBlogModal = (post?: any) => {
    if (post) {
      setEditingPost(post);
      setPostFormData({
        title: post.title,
        slug: post.slug,
        meta_description: post.meta_description || '',
        content: post.content,
        is_published: post.is_published
      });
    } else {
      setEditingPost(null);
      setPostFormData({ title: '', slug: '', meta_description: '', content: '', is_published: false });
    }
    setIsBlogModalOpen(true);
  };

  const handleSavePost = async () => {
    if (!postFormData.title || !postFormData.slug || !postFormData.content) {
      alert("Title, slug, and content are required.");
      return;
    }
    setIsSavingPost(true);
    try {
      const url = editingPost ? `/api/admin/blog/${editingPost.id}` : '/api/admin/blog';
      const method = editingPost ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postFormData)
      });
      if (!res.ok) throw new Error('Failed to save post');
      await fetchBlogPosts();
      setIsBlogModalOpen(false);
    } catch (err: any) {
      alert(err.message);
    }
    setIsSavingPost(false);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');
      await fetchBlogPosts();
    } catch (err: any) {
      alert(err.message);
    }
  };


  // Fetch advanced stats from API
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
    setStatsLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const filteredCandidates = candidates.filter(c =>
    c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    if (candidates.length === 0) return;
    const headers = ['Name', 'Email', 'Job Title', 'Template', 'Country', 'Device', 'Opted In At'];
    const csvContent = [
      headers.join(','),
      ...candidates.map(c => [
        `"${c.full_name || ''}"`,
        `"${c.email || ''}"`,
        `"${c.job_title || ''}"`,
        `"${c.template_id || ''}"`,
        `"${c.country || ''}"`,
        `"${c.device_type || ''}"`,
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

  // Basic funnel from raw analytics (fallback if stats API hasn't loaded)
  const funnel = {
    started: analytics.filter(a => a.event_type === 'milestone_started').length,
    previewed: analytics.filter(a => a.event_type === 'milestone_previewed').length,
    downloaded: analytics.filter(a => a.event_type === 'milestone_downloaded').length,
    optedIn: analytics.filter(a => a.event_type === 'milestone_opted_in').length,
  };

  const s = stats?.summary;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-[#333]">
          <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">FreeCV</h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Command Center</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {([
            { key: 'analytics', icon: BarChart, label: 'Analytics' },
            { key: 'crm', icon: Users, label: 'Talent CRM' },
            { key: 'autoblog', icon: FileText, label: 'Autoblog CMS' },
            { key: 'marketing', icon: Mail, label: 'Marketing' },
            { key: 'config', icon: Settings, label: 'Settings' },
          ] as const).map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === key ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-[#222]'}`}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#333]">
          <button onClick={() => { document.cookie = "admin_session=; max-age=0; path=/"; window.location.href = "/admin/login"; }} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">

        {/* ==================== ANALYTICS TAB ==================== */}
        {activeTab === 'analytics' && (
          <div className="max-w-7xl mx-auto">
            <header className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Advanced Analytics</h2>
                <p className="text-gray-500 text-sm font-medium mt-1">Real-time visitor intelligence across all dimensions.</p>
              </div>
              <button
                onClick={fetchStats}
                disabled={statsLoading}
                className="bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#333] transition-colors shadow-lg disabled:opacity-50"
              >
                <RefreshCw size={14} className={statsLoading ? 'animate-spin' : ''} /> Refresh
              </button>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
              <StatCard label="Total Events" value={s?.totalEvents ?? funnel.started + funnel.previewed + funnel.downloaded + funnel.optedIn} accent="border-t-gray-800" />
              <StatCard label="Unique Visitors" value={s?.uniqueSessions ?? '—'} accent="border-t-blue-500" />
              <StatCard label="Started" value={s?.started ?? funnel.started} accent="border-t-sky-500" />
              <StatCard label="Previewed" value={s?.previewed ?? funnel.previewed} accent="border-t-purple-500" />
              <StatCard label="Downloaded" value={s?.downloads ?? funnel.downloaded} accent="border-t-green-500" />
              <StatCard label="Opted In" value={s?.optIns ?? funnel.optedIn} accent="border-t-[#ff3333]" />
              <StatCard label="Today" value={s?.todayEvents ?? '—'} accent="border-t-amber-500" />
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm mb-6">
              <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2"><TrendingUp size={16} /> Conversion Funnel</h3>
              <div className="space-y-3">
                {[
                  { label: 'Started → Preview', from: s?.started ?? funnel.started, to: s?.previewed ?? funnel.previewed, color: 'bg-purple-500' },
                  { label: 'Preview → Download', from: s?.previewed ?? funnel.previewed, to: s?.downloads ?? funnel.downloaded, color: 'bg-green-500' },
                  { label: 'Download → Opt-In', from: s?.downloads ?? funnel.downloaded, to: s?.optIns ?? funnel.optedIn, color: 'bg-[#ff3333]' },
                ].map((step) => (
                  <div key={step.label}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>{step.label}</span>
                      <span>{step.from ? Math.round((step.to / step.from) * 100) : 0}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${step.color}`} style={{ width: `${step.from ? (step.to / step.from) * 100 : 0}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Column Grid: Geography + Devices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

              {/* Geographic Breakdown */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2"><Globe size={16} /> Visitors by Country</h3>
                {stats?.topCountries && stats.topCountries.length > 0 ? (
                  <div className="space-y-2.5">
                    {stats.topCountries.map((c) => (
                      <div key={c.country} className="flex items-center gap-3">
                        <span className="text-lg w-7 text-center shrink-0">{getFlag(c.country)}</span>
                        <span className="text-sm font-medium w-32 truncate">{c.country}</span>
                        <div className="flex-1">
                          <HBar value={c.count} max={stats.topCountries[0]?.count || 1} color="bg-blue-500" />
                        </div>
                        <span className="text-xs font-bold text-gray-500 w-10 text-right">{c.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 py-8 text-center">No geographic data yet. Data will appear as visitors use the site.</p>
                )}
              </div>

              {/* Device + Browser + OS */}
              <div className="space-y-6">
                {/* Devices */}
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2"><Smartphone size={16} /> Device Types</h3>
                  {stats?.deviceCounts ? (
                    <div className="space-y-2.5">
                      {([
                        { label: 'Desktop', count: stats.deviceCounts.desktop, icon: <Monitor size={14} />, color: 'bg-indigo-500' },
                        { label: 'Mobile', count: stats.deviceCounts.mobile, icon: <Smartphone size={14} />, color: 'bg-emerald-500' },
                        { label: 'Tablet', count: stats.deviceCounts.tablet, icon: <Tablet size={14} />, color: 'bg-amber-500' },
                      ]).map(d => {
                        const total = stats.deviceCounts.desktop + stats.deviceCounts.mobile + stats.deviceCounts.tablet;
                        return (
                          <div key={d.label} className="flex items-center gap-3">
                            <span className="text-gray-500 w-5">{d.icon}</span>
                            <span className="text-sm font-medium w-20">{d.label}</span>
                            <div className="flex-1"><HBar value={d.count} max={total || 1} color={d.color} /></div>
                            <span className="text-xs font-bold text-gray-500 w-16 text-right">{d.count} ({total ? Math.round((d.count / total) * 100) : 0}%)</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 py-4 text-center">No device data yet.</p>
                  )}
                </div>

                {/* Browsers */}
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-wider mb-4">Browsers</h3>
                  {stats?.topBrowsers && stats.topBrowsers.length > 0 ? (
                    <div className="space-y-2">
                      {stats.topBrowsers.map(b => (
                        <div key={b.browser} className="flex items-center gap-3">
                          <span className="text-sm font-medium w-20 truncate">{b.browser}</span>
                          <div className="flex-1"><HBar value={b.count} max={stats.topBrowsers[0]?.count || 1} color="bg-purple-500" /></div>
                          <span className="text-xs font-bold text-gray-500 w-10 text-right">{b.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 py-4 text-center">No browser data yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Two-Column Grid: Traffic Sources + Template Popularity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

              {/* Traffic Sources */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2"><Activity size={16} /> Traffic Sources</h3>
                {stats?.topReferrers && stats.topReferrers.length > 0 ? (
                  <div className="space-y-2.5">
                    {stats.topReferrers.map(r => (
                      <div key={r.source} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-36 truncate font-mono">{r.source}</span>
                        <div className="flex-1"><HBar value={r.count} max={stats.topReferrers[0]?.count || 1} color="bg-sky-500" /></div>
                        <span className="text-xs font-bold text-gray-500 w-10 text-right">{r.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 py-8 text-center">No referrer data yet.</p>
                )}
              </div>

              {/* Template Popularity */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2">🎨 Template Popularity</h3>
                {stats?.topTemplates && stats.topTemplates.length > 0 ? (
                  <div className="space-y-2.5">
                    {stats.topTemplates.map((t, i) => (
                      <div key={t.template} className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-gray-400 w-5">#{i + 1}</span>
                        <span className="text-sm font-medium w-36 truncate">{t.template}</span>
                        <div className="flex-1"><HBar value={t.count} max={stats.topTemplates[0]?.count || 1} color="bg-rose-500" /></div>
                        <span className="text-xs font-bold text-gray-500 w-10 text-right">{t.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 py-8 text-center">No template usage data yet.</p>
                )}
              </div>
            </div>

            {/* 30-Day Trend Chart */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm mb-6">
              <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2"><TrendingUp size={16} /> 30-Day Trend</h3>
              {stats?.dailyTrend ? (
                <div className="flex items-end gap-[3px] h-32">
                  {stats.dailyTrend.map((d) => {
                    const maxVal = Math.max(...stats.dailyTrend.map(x => x.count), 1);
                    const height = (d.count / maxVal) * 100;
                    return (
                      <div key={d.date} className="flex-1 group relative">
                        <div
                          className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                          style={{ height: `${Math.max(height, 2)}%` }}
                        />
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          {d.date.slice(5)}: {d.count}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400 py-8 text-center">Loading trend data...</p>
              )}
              {stats?.dailyTrend && (
                <div className="flex justify-between mt-2 text-[9px] text-gray-400 font-medium">
                  <span>{stats.dailyTrend[0]?.date.slice(5)}</span>
                  <span>{stats.dailyTrend[stats.dailyTrend.length - 1]?.date.slice(5)}</span>
                </div>
              )}
            </div>

            {/* Live Activity Feed */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2"><Activity size={16} /> Live Activity Feed</h3>
              </div>
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 font-bold">Event</th>
                      <th className="px-4 py-3 font-bold">Template</th>
                      <th className="px-4 py-3 font-bold">Country</th>
                      <th className="px-4 py-3 font-bold">Device</th>
                      <th className="px-4 py-3 font-bold">Browser</th>
                      <th className="px-4 py-3 font-bold">Source</th>
                      <th className="px-4 py-3 font-bold">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                      stats.recentActivity.map((evt, i) => {
                        const { label, color } = formatEvent(evt.event_type);
                        return (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-2.5">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${color}`}>{label}</span>
                            </td>
                            <td className="px-4 py-2.5 text-xs font-medium text-gray-700">{evt.template_id || '—'}</td>
                            <td className="px-4 py-2.5 text-xs">
                              {evt.country ? <span>{getFlag(evt.country)} {evt.country}{evt.city ? `, ${evt.city}` : ''}</span> : <span className="text-gray-400">—</span>}
                            </td>
                            <td className="px-4 py-2.5">
                              <span className="flex items-center gap-1.5 text-xs text-gray-600">
                                <DeviceIcon type={evt.device_type} />
                                {evt.device_type || '—'}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-xs text-gray-600">{evt.browser || '—'}</td>
                            <td className="px-4 py-2.5 text-xs font-mono text-gray-500">{evt.referrer || '—'}</td>
                            <td className="px-4 py-2.5 text-[10px] text-gray-400 whitespace-nowrap">
                              {evt.created_at ? new Date(evt.created_at).toLocaleString() : '—'}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                          {statsLoading ? 'Loading activity feed...' : 'No activity recorded yet.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== CRM TAB ==================== */}
        {activeTab === 'crm' && (
          <div className="max-w-7xl mx-auto">
            <header className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Talent Pool</h2>
                <p className="text-gray-500 text-sm font-medium mt-1">{candidates.length} opted-in candidates.</p>
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
                    placeholder="Search by name, email, or job title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="px-5 py-4 font-bold">Candidate</th>
                      <th className="px-5 py-4 font-bold">Job Title</th>
                      <th className="px-5 py-4 font-bold">Template</th>
                      <th className="px-5 py-4 font-bold">Country</th>
                      <th className="px-5 py-4 font-bold">Device</th>
                      <th className="px-5 py-4 font-bold">Opted In</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCandidates.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center text-gray-400">No candidates found.</td>
                      </tr>
                    ) : (
                      filteredCandidates.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="font-bold text-black">{c.full_name || 'Anonymous'}</div>
                            <div className="text-gray-500 text-xs">{c.email}</div>
                          </td>
                          <td className="px-5 py-4 font-medium">{c.job_title || '—'}</td>
                          <td className="px-5 py-4"><span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">{c.template_id}</span></td>
                          <td className="px-5 py-4 text-xs">{c.country ? <span>{getFlag(c.country)} {c.country}</span> : '—'}</td>
                          <td className="px-5 py-4"><span className="flex items-center gap-1.5 text-xs text-gray-600"><DeviceIcon type={c.device_type} />{c.device_type || '—'}</span></td>
                          <td className="px-5 py-4 text-gray-500 text-xs">{c.opted_in_at ? new Date(c.opted_in_at).toLocaleDateString() : '—'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== AUTOBLOG TAB ==================== */}
        {activeTab === 'autoblog' && (
          <div className="max-w-6xl mx-auto">
            <header className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Autoblog CMS</h2>
                <p className="text-gray-500 text-sm font-medium mt-1">Manage programmatic SEO articles to drive traffic.</p>
              </div>
              <button
                onClick={() => handleOpenBlogModal()}
                className="bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#ff3333] transition-colors shadow-lg"
              >
                <Plus size={14} /> New Article
              </button>
            </header>

            {isBlogModalOpen && (
              <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
                <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                  <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-black uppercase tracking-tight">{editingPost ? 'Edit Article' : 'New Article'}</h2>
                    <button onClick={() => setIsBlogModalOpen(false)} className="text-gray-400 hover:text-black transition-colors"><X size={20} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Title</label>
                      <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-black outline-none transition-colors" value={postFormData.title} onChange={e => setPostFormData({...postFormData, title: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Slug</label>
                      <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:border-black outline-none transition-colors" value={postFormData.slug} onChange={e => setPostFormData({...postFormData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})} placeholder="my-awesome-post" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Meta Description</label>
                      <textarea className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-black outline-none transition-colors resize-none h-20" value={postFormData.meta_description} onChange={e => setPostFormData({...postFormData, meta_description: e.target.value})} placeholder="SEO description..." />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Content (HTML Supported)</label>
                      <textarea className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:border-black outline-none transition-colors resize-none h-64" value={postFormData.content} onChange={e => setPostFormData({...postFormData, content: e.target.value})} placeholder="<h1>Hello World</h1><p>Start writing...</p>" />
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <input type="checkbox" id="publish-toggle" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" checked={postFormData.is_published} onChange={e => setPostFormData({...postFormData, is_published: e.target.checked})} />
                      <label htmlFor="publish-toggle" className="text-sm font-bold cursor-pointer">Publish Immediately</label>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                    <button onClick={() => setIsBlogModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">Cancel</button>
                    <button onClick={handleSavePost} disabled={isSavingPost} className="flex-1 py-3 text-sm font-bold text-white bg-black hover:bg-[#ff3333] rounded-xl transition-colors disabled:opacity-50">
                      {isSavingPost ? 'Saving...' : 'Save Article'}
                    </button>
                  </div>
                </div>
              </div>
            )}

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
                            <button onClick={() => handleOpenBlogModal(post)} className="text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
                            <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
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

        {/* ==================== MARKETING TAB ==================== */}
        {activeTab === 'marketing' && (
          <div className="max-w-6xl mx-auto">
            <header className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Marketing Engine</h2>
                <p className="text-gray-500 text-sm font-medium mt-1">{subscribers.length} newsletter subscribers.</p>
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

        {/* ==================== CONFIG TAB ==================== */}
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
