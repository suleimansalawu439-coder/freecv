"use client";

import React, { useState, useEffect } from 'react';
import { Users, BarChart, Settings, LogOut, FileText, Mail, Monitor, TrendingUp, Search, Smartphone, Tablet, ExternalLink } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  recentActivity: any[];
}

const COUNTRY_FLAGS: Record<string, string> = {
  'Nigeria': '🇳🇬', 'United States': '🇺🇸', 'United Kingdom': '🇬🇧', 'Canada': '🇨🇦',
  'Germany': '🇩🇪', 'France': '🇫🇷', 'India': '🇮🇳', 'Australia': '🇦🇺', 'Brazil': '🇧🇷',
  'Japan': '🇯🇵', 'South Africa': '🇿🇦', 'Kenya': '🇰🇪', 'Ghana': '🇬🇭', 'Egypt': '🇪🇬'
};
function getFlag(country: string): string { return COUNTRY_FLAGS[country] || '🌍'; }

export default function AdminDashboard({ candidates, analytics, siteSettings, featureFlags }: any) {
  const [activeTab, setActiveTab] = useState<'crm' | 'analytics' | 'config'>('analytics');
  const [stats, setStats] = useState<StatsData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Process Analytics Data
  useEffect(() => {
    if (!analytics || analytics.length === 0) return;
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    let summary = { totalEvents: analytics.length, uniqueSessions: new Set(analytics.map((e:any) => e.session_id)).size, started: 0, previewed: 0, downloads: 0, optIns: 0, todayEvents: 0 };
    let countryMap: Record<string, number> = {};
    let deviceMap = { desktop: 0, mobile: 0, tablet: 0 };
    let browserMap: Record<string, number> = {};
    let osMap: Record<string, number> = {};
    let referrerMap: Record<string, number> = {};
    let templateMap: Record<string, number> = {};
    let dateMap: Record<string, number> = {};
    
    analytics.forEach((e:any) => {
      if (e.event_type === 'milestone_started') summary.started++;
      if (e.event_type === 'milestone_previewed') summary.previewed++;
      if (e.event_type === 'milestone_downloaded') summary.downloads++;
      if (e.event_type === 'crm_optin_success') summary.optIns++;
      
      const dateStr = e.created_at.split('T')[0];
      if (dateStr === todayStr) summary.todayEvents++;
      dateMap[dateStr] = (dateMap[dateStr] || 0) + 1;
      
      if (e.country) countryMap[e.country] = (countryMap[e.country] || 0) + 1;
      if (e.device_type) deviceMap[e.device_type as keyof typeof deviceMap]++;
      if (e.browser) browserMap[e.browser] = (browserMap[e.browser] || 0) + 1;
      if (e.os) osMap[e.os] = (osMap[e.os] || 0) + 1;
      if (e.referrer) referrerMap[e.referrer] = (referrerMap[e.referrer] || 0) + 1;
      if (e.template_id) templateMap[e.template_id] = (templateMap[e.template_id] || 0) + 1;
    });

    setStats({
      summary,
      topCountries: Object.entries(countryMap).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count).slice(0, 10),
      deviceCounts: deviceMap,
      topBrowsers: Object.entries(browserMap).map(([browser, count]) => ({ browser, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      topOS: Object.entries(osMap).map(([os, count]) => ({ os, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      topReferrers: Object.entries(referrerMap).map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      topTemplates: Object.entries(templateMap).map(([template, count]) => ({ template, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      dailyTrend: Object.entries(dateMap).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)).slice(-14),
      recentActivity: analytics.slice(0, 20)
    });
  }, [analytics]);

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  const navItems = [
    { key: 'analytics', label: 'Analytics', icon: BarChart },
    { key: 'crm', label: 'Talent CRM', icon: Users },
    { key: 'config', label: 'Settings', icon: Settings }
  ] as const;

  const filteredCandidates = candidates?.filter((c:any) => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            FreeCV Admin
          </h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeTab === key 
                  ? "bg-gray-100 text-gray-900" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon size={18} className={cn(activeTab === key ? "text-gray-900" : "text-gray-400")} />
              {label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FAFAFA]">
        <header className="h-16 border-b border-gray-200 flex items-center px-8 bg-white shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">
            {navItems.find(n => n.key === activeTab)?.label}
          </h2>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'analytics' && stats && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Visits', value: stats.summary.uniqueSessions },
                    { label: 'Resumes Built', value: stats.summary.started },
                    { label: 'Downloads', value: stats.summary.downloads },
                    { label: 'CRM Opt-ins', value: stats.summary.optIns }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                      <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                      <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value.toLocaleString()}</h3>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Daily Trend */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm lg:col-span-2">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Traffic (Last 14 Days)</h3>
                    <div className="h-64 flex items-end gap-2">
                      {stats.dailyTrend.map((day, idx) => {
                        const maxCount = Math.max(...stats.dailyTrend.map(d => d.count), 1);
                        const height = (day.count / maxCount) * 100;
                        return (
                          <div key={idx} className="flex-1 flex flex-col justify-end group relative">
                            <div className="w-full bg-blue-100 rounded-t-sm group-hover:bg-blue-200 transition-colors relative" style={{ height: `${height}%` }}>
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                                {day.count} visits
                              </div>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-2 text-center truncate">{day.date.split('-').slice(1).join('/')}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Device Usage */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Device Usage</h3>
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3"><Monitor size={18} className="text-gray-500" /><span className="text-sm font-medium text-gray-700">Desktop</span></div>
                        <span className="font-bold text-gray-900">{stats.deviceCounts.desktop}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3"><Smartphone size={18} className="text-gray-500" /><span className="text-sm font-medium text-gray-700">Mobile</span></div>
                        <span className="font-bold text-gray-900">{stats.deviceCounts.mobile}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3"><Tablet size={18} className="text-gray-500" /><span className="text-sm font-medium text-gray-700">Tablet</span></div>
                        <span className="font-bold text-gray-900">{stats.deviceCounts.tablet}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Top Countries */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Countries</h3>
                    <div className="space-y-3">
                      {stats.topCountries.map((c, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2"><span className="text-base">{getFlag(c.country)}</span><span className="text-gray-600 truncate max-w-[100px]">{c.country}</span></div>
                          <span className="font-medium text-gray-900">{c.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Referrers */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Referrers</h3>
                    <div className="space-y-3">
                      {stats.topReferrers.map((r, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 truncate max-w-[120px]">{r.source || 'Direct'}</span>
                          <span className="font-medium text-gray-900">{r.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Browsers */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Browsers</h3>
                    <div className="space-y-3">
                      {stats.topBrowsers.map((b, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{b.browser || 'Unknown'}</span>
                          <span className="font-medium text-gray-900">{b.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Templates */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Templates</h3>
                    <div className="space-y-3">
                      {stats.topTemplates.map((t, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 truncate max-w-[120px]">{t.template || 'N/A'}</span>
                          <span className="font-medium text-gray-900">{t.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'crm' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search candidates by name, email, or job..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Candidate</th>
                        <th className="px-6 py-4">Job Title</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Opt-in Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredCandidates?.map((candidate:any) => (
                        <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{candidate.name || 'Anonymous'}</div>
                            <div className="text-gray-500 text-xs mt-0.5">{candidate.email}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{candidate.job_title || 'Not specified'}</td>
                          <td className="px-6 py-4">{candidate.location || '-'}</td>
                          <td className="px-6 py-4 text-gray-500">{new Date(candidate.opted_in_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                      {(!filteredCandidates || filteredCandidates.length === 0) && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-gray-500 bg-gray-50">
                            No candidates found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'config' && (
              <div className="max-w-2xl animate-in fade-in duration-500 space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-4 mb-4">Feature Flags</h3>
                  {featureFlags?.map((flag:any) => (
                    <div key={flag.id} className="flex items-center justify-between py-2">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{flag.key}</div>
                        <div className="text-gray-500 text-xs mt-1">{flag.description}</div>
                      </div>
                      <div className={cn("px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full", flag.is_enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600')}>
                        {flag.is_enabled ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
}
