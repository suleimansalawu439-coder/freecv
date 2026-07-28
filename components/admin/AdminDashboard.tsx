"use client";

import React, { useState, useEffect } from 'react';
import { Users, BarChart, Settings, LogOut, Download, Mail, Activity, Database, CheckCircle2, Monitor, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Types ---
interface StatsData {
  summary: {
    totalEvents: number;
    uniqueSessions: number;
    started: number;
    downloads: number;
    optIns: number;
    todayEvents: number;
  };
  topCountries: { country: string; count: number }[];
  deviceCounts: { desktop: number; mobile: number; tablet: number };
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
    
    let summary = { totalEvents: analytics.length, uniqueSessions: new Set(analytics.map((e:any) => e.session_id)).size, started: 0, downloads: 0, optIns: 0, todayEvents: 0 };
    let countryMap: Record<string, number> = {};
    let deviceMap = { desktop: 0, mobile: 0, tablet: 0 };
    
    analytics.forEach((e:any) => {
      if (e.event_type === 'milestone_started') summary.started++;
      if (e.event_type === 'milestone_downloaded') summary.downloads++;
      if (e.event_type === 'crm_optin_success') summary.optIns++;
      if (e.created_at.startsWith(todayStr)) summary.todayEvents++;
      
      if (e.country) countryMap[e.country] = (countryMap[e.country] || 0) + 1;
      if (e.device_type) deviceMap[e.device_type as keyof typeof deviceMap]++;
    });

    setStats({
      summary,
      topCountries: Object.entries(countryMap).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count).slice(0, 10),
      deviceCounts: deviceMap,
      dailyTrend: [],
      recentActivity: analytics.slice(0, 20)
    });
  }, [analytics]);

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  const navItems = [
    { key: 'analytics', label: 'Analytics & Traffic', icon: BarChart },
    { key: 'crm', label: 'Talent CRM', icon: Users },
    { key: 'config', label: 'Global Config', icon: Settings }
  ] as const;

  const filteredCandidates = candidates?.filter((c:any) => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 selection:bg-blue-500/30 font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none"></div>
      
      <div className="flex h-screen relative z-10">
        
        {/* Sidebar */}
        <div className="w-72 bg-white/[0.02] border-r border-white/5 backdrop-blur-3xl flex flex-col">
          <div className="p-8 pb-4">
            <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Database size={16} className="text-white" />
              </div>
              FreeCV <span className="text-blue-500">OS</span>
            </h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Mission Control</p>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-8">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group",
                  activeTab === key 
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)]" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={18} className={cn("transition-transform duration-300", activeTab === key ? "scale-110" : "group-hover:scale-110")} />
                {label}
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/5">
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors uppercase tracking-widest"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-transparent">
          <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.01] backdrop-blur-md shrink-0">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {navItems.find(n => n.key === activeTab)?.label}
            </h2>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> System Online
              </span>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            
            {activeTab === 'analytics' && stats && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Visits', value: stats.summary.uniqueSessions, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { label: 'Resumes Built', value: stats.summary.started, icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                    { label: 'Downloads', value: stats.summary.downloads, icon: Download, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                    { label: 'CRM Opt-ins', value: stats.summary.optIns, icon: Mail, color: 'text-amber-400', bg: 'bg-amber-400/10' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                          <stat.icon size={20} className="group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-white tracking-tight relative z-10 mb-1">
                        {stat.value.toLocaleString()}
                      </h3>
                      <p className="text-sm font-medium text-gray-500 relative z-10">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Global Reach */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold text-white mb-6">Global Reach</h3>
                    <div className="space-y-4">
                      {stats.topCountries.map((country, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <span className="text-2xl">{getFlag(country.country)}</span>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-300">{country.country}</span>
                              <span className="text-sm font-bold text-white">{country.count.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(country.count / stats.topCountries[0].count) * 100}%` }}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Devices */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Device Usage</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Monitor className="text-blue-400" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">Desktop</p>
                          <p className="text-xl font-bold text-white">{stats.deviceCounts.desktop}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Monitor className="text-emerald-400" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">Mobile</p>
                          <p className="text-xl font-bold text-white">{stats.deviceCounts.mobile}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'crm' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Talent Pool</h3>
                    <p className="text-gray-400 text-sm mt-1">Manage users who opted in to the CRM.</p>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search candidates..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
                  <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-white/[0.02] border-b border-white/5 text-xs uppercase tracking-widest text-gray-500 font-bold">
                      <tr>
                        <th className="px-6 py-4">Candidate</th>
                        <th className="px-6 py-4">Job Title</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Opt-in Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredCandidates?.map((candidate:any) => (
                        <tr key={candidate.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-white">{candidate.name || 'Anonymous'}</div>
                            <div className="text-gray-500 text-xs mt-0.5">{candidate.email}</div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-300">{candidate.job_title || 'Not specified'}</td>
                          <td className="px-6 py-4">{candidate.location || '-'}</td>
                          <td className="px-6 py-4">{new Date(candidate.opted_in_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                      {(!filteredCandidates || filteredCandidates.length === 0) && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
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
              <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">Global Configuration</h3>
                <p className="text-gray-400 text-sm mb-8">Manage feature flags and site-wide settings.</p>

                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-6">
                  {featureFlags?.map((flag:any) => (
                    <div key={flag.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <div className="font-bold text-white text-sm">{flag.key}</div>
                        <div className="text-gray-500 text-xs mt-1">{flag.description}</div>
                      </div>
                      <div className={cn("px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full", flag.is_enabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-800 text-gray-500 border border-gray-700')}>
                        {flag.is_enabled ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-6 mt-6 border-t border-white/5">
                    <p className="text-sm text-gray-500">
                      Configuration updates require database access. This is a read-only view.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
          </main>
        </div>
      </div>
    </div>
  );
}
