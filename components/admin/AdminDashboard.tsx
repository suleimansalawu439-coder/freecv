"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Users, BarChart, Settings, LogOut, Monitor, Smartphone, Tablet, Search, Moon, Sun, FileJson, FileSpreadsheet, FileText, LayoutDashboard, Calendar } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatsData {
  summary: { totalEvents: number; uniqueSessions: number; started: number; previewed: number; downloads: number; optIns: number; todayEvents: number; };
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'talent_pool' | 'settings'>('dashboard');
  const [timeframe, setTimeframe] = useState<'24h'|'7d'|'14d'|'30d'|'6m'|'1y'|'all'>('30d');
  const [stats, setStats] = useState<StatsData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const isWithinTimeframe = (dateString: string, tf: string) => {
    if (tf === 'all') return true;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    switch(tf) {
      case '24h': return diffDays <= 1;
      case '7d': return diffDays <= 7;
      case '14d': return diffDays <= 14;
      case '30d': return diffDays <= 30;
      case '6m': return diffDays <= 180;
      case '1y': return diffDays <= 365;
      default: return true;
    }
  };

  useEffect(() => {
    if (!analytics) return;

    // Filter analytics based on timeframe
    const filteredAnalytics = analytics.filter((e:any) => isWithinTimeframe(e.created_at, timeframe));
    const filteredCandidatesDb = candidates?.filter((c:any) => isWithinTimeframe(c.opted_in_at, timeframe)) || [];

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    let summary = { 
      totalEvents: filteredAnalytics.length, 
      uniqueSessions: new Set(filteredAnalytics.map((e:any) => e.session_id)).size, 
      started: 0, 
      previewed: 0, 
      downloads: 0, 
      optIns: filteredCandidatesDb.length, // use exact candidate DB rows for accurate count
      todayEvents: 0 
    };
    
    let countryMap: Record<string, number> = {};
    let deviceMap = { desktop: 0, mobile: 0, tablet: 0 };
    let browserMap: Record<string, number> = {};
    let osMap: Record<string, number> = {};
    let referrerMap: Record<string, number> = {};
    let templateMap: Record<string, number> = {};
    let dailyUniqueMap: Record<string, Set<string>> = {};
    
    filteredAnalytics.forEach((e:any) => {
      if (e.event_type === 'milestone_started') summary.started++;
      if (e.event_type === 'milestone_previewed') summary.previewed++;
      if (e.event_type === 'milestone_downloaded') summary.downloads++;
      
      const dateStr = e.created_at.split('T')[0];
      if (dateStr === todayStr) summary.todayEvents++;
      
      // For daily trend, use unique visitors per day
      if (!dailyUniqueMap[dateStr]) dailyUniqueMap[dateStr] = new Set();
      dailyUniqueMap[dateStr].add(e.session_id);
      
      if (e.country) countryMap[e.country] = (countryMap[e.country] || 0) + 1;
      if (e.device_type) deviceMap[e.device_type as keyof typeof deviceMap]++;
      if (e.browser) browserMap[e.browser] = (browserMap[e.browser] || 0) + 1;
      if (e.os) osMap[e.os] = (osMap[e.os] || 0) + 1;
      if (e.referrer) referrerMap[e.referrer] = (referrerMap[e.referrer] || 0) + 1;
      if (e.template_id) templateMap[e.template_id] = (templateMap[e.template_id] || 0) + 1;
    });

    const dailyTrend = Object.entries(dailyUniqueMap)
      .map(([date, set]) => ({ date, count: set.size }))
      .sort((a, b) => a.date.localeCompare(b.date));

    setStats({
      summary,
      topCountries: Object.entries(countryMap).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count).slice(0, 10),
      deviceCounts: deviceMap,
      topBrowsers: Object.entries(browserMap).map(([browser, count]) => ({ browser, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      topOS: Object.entries(osMap).map(([os, count]) => ({ os, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      topReferrers: Object.entries(referrerMap).map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      topTemplates: Object.entries(templateMap).map(([template, count]) => ({ template, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      dailyTrend,
      recentActivity: filteredAnalytics.slice(0, 20)
    });
  }, [analytics, candidates, timeframe]);

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'analytics', label: 'Analytics', icon: BarChart },
    { key: 'talent_pool', label: 'Talent Pool', icon: Users },
    { key: 'settings', label: 'Settings', icon: Settings }
  ] as const;

  const filteredCandidates = candidates?.filter((c:any) => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Export Functions ---
  const exportJSON = () => {
    const formattedData = filteredCandidates?.map((c: any) => ({
      candidate_id: c.id,
      name: c.name,
      email: c.email,
      job_title: c.job_title,
      location: c.location,
      geo_country: c.country || 'Unknown',
      device: c.device_type || 'Unknown',
      opted_in_date: c.opted_in_at,
      cv_content: c.resume_data
    }));
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formattedData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "candidates_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const exportCSV = () => {
    if (!filteredCandidates || filteredCandidates.length === 0) return;
    const headers = ['Name', 'Email', 'Job Title', 'Location', 'Opt-in Date'];
    const csvRows = [headers.join(',')];
    
    filteredCandidates.forEach((c:any) => {
      const values = [
        `"${c.name || ''}"`,
        `"${c.email || ''}"`,
        `"${c.job_title || ''}"`,
        `"${c.location || ''}"`,
        `"${new Date(c.opted_in_at).toLocaleDateString()}"`
      ];
      csvRows.push(values.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'candidates_export.csv');
    a.click();
  };

  const exportPDF = async () => {
    const jsPDFModule = (await import('jspdf')).default;
    const autoTableModule = (await import('jspdf-autotable')).default;
    
    const doc = new jsPDFModule();
    doc.text("FreeCV Candidate Export", 14, 15);
    
    const tableColumn = ["Name", "Email", "Job Title", "Location", "Opt-in Date"];
    const tableRows: any[] = [];
    
    filteredCandidates?.forEach((c:any) => {
      const row = [
        c.name || 'N/A',
        c.email,
        c.job_title || 'N/A',
        c.location || 'N/A',
        new Date(c.opted_in_at).toLocaleDateString()
      ];
      tableRows.push(row);
    });

    autoTableModule(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.save(`candidates_export.pdf`);
  };

  return (
    <div className={cn("min-h-screen font-sans flex transition-colors", isDarkMode ? "bg-[#050505] text-gray-100" : "bg-[#FAFAFA] text-gray-900")}>
      
      {/* Sidebar */}
      <div className={cn("w-64 border-r flex flex-col shrink-0 transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
        <div className={cn("p-6 border-b transition-colors", isDarkMode ? "border-gray-800" : "border-gray-100")}>
          <h1 className="text-xl font-bold tracking-tight flex items-center justify-between">
            FreeCV Admin
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {isDarkMode ? <Sun size={18} className="text-gray-400" /> : <Moon size={18} className="text-gray-400" />}
            </button>
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
                  ? (isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900")
                  : (isDarkMode ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")
              )}
            >
              <Icon size={18} className={cn(activeTab === key ? (isDarkMode ? "text-white" : "text-gray-900") : "text-gray-400")} />
              {label}
            </button>
          ))}
        </nav>
        
        <div className={cn("p-4 border-t transition-colors", isDarkMode ? "border-gray-800" : "border-gray-200")}>
          <button 
            onClick={handleLogout} 
            className={cn("w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors", isDarkMode ? "text-gray-400 hover:text-red-400 hover:bg-red-950/30" : "text-gray-600 hover:text-red-600 hover:bg-red-50")}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cn("flex-1 flex flex-col h-screen overflow-hidden", isDarkMode ? "bg-[#050505]" : "bg-[#FAFAFA]")}>
        <header className={cn("h-16 border-b flex items-center justify-between px-8 shrink-0 transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
          <h2 className="text-lg font-semibold">
            {navItems.find(n => n.key === activeTab)?.label}
          </h2>

          {/* Timeframe Filter */}
          {(activeTab === 'dashboard' || activeTab === 'analytics') && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as any)}
                className={cn(
                  "text-sm rounded-lg border py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer",
                  isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                )}
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="14d">Last 14 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last 1 Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
          )}
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            
            {activeTab === 'dashboard' && stats && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Colorful High-Level Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Total Visits Card */}
                  <div className="rounded-2xl p-6 shadow-md text-white bg-gradient-to-br from-indigo-500 to-purple-600 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-indigo-100 text-sm font-medium tracking-wide uppercase">Total Visits</p>
                      <BarChart size={20} className="text-indigo-200" />
                    </div>
                    <h3 className="text-4xl font-extrabold">{stats.summary.totalEvents.toLocaleString()}</h3>
                    <p className="text-xs text-indigo-200 mt-2">Events logged in {timeframe}</p>
                  </div>
                  
                  {/* Unique Visitors Card */}
                  <div className="rounded-2xl p-6 shadow-md text-white bg-gradient-to-br from-emerald-400 to-teal-500 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-teal-50 text-sm font-medium tracking-wide uppercase">Unique Visitors</p>
                      <Users size={20} className="text-teal-100" />
                    </div>
                    <h3 className="text-4xl font-extrabold">{stats.summary.uniqueSessions.toLocaleString()}</h3>
                    <p className="text-xs text-teal-100 mt-2">Distinct sessions in {timeframe}</p>
                  </div>

                  {/* Total Opt-ins Card */}
                  <div className="rounded-2xl p-6 shadow-md text-white bg-gradient-to-br from-amber-400 to-orange-500 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-amber-50 text-sm font-medium tracking-wide uppercase">Total Opt-ins</p>
                      <FileJson size={20} className="text-amber-100" />
                    </div>
                    <h3 className="text-4xl font-extrabold">{stats.summary.optIns.toLocaleString()}</h3>
                    <p className="text-xs text-amber-100 mt-2">Database opt-ins in {timeframe}</p>
                  </div>

                  {/* Conversion Rate Card */}
                  <div className="rounded-2xl p-6 shadow-md text-white bg-gradient-to-br from-rose-400 to-pink-600 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-rose-100 text-sm font-medium tracking-wide uppercase">Conversion Rate</p>
                      <Settings size={20} className="text-rose-200" />
                    </div>
                    <h3 className="text-4xl font-extrabold">
                      {stats.summary.uniqueSessions > 0 ? ((stats.summary.optIns / stats.summary.uniqueSessions) * 100).toFixed(1) : '0.0'}%
                    </h3>
                    <p className="text-xs text-rose-200 mt-2">Opt-ins / Unique Visitors</p>
                  </div>
                </div>
                
                {/* Secondary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                      <h3 className="text-lg font-bold mb-4">Quick Insights</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                          <span className={cn(isDarkMode ? "text-gray-400" : "text-gray-600")}>Resumes Started</span>
                          <span className="font-bold text-lg">{stats.summary.started.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                          <span className={cn(isDarkMode ? "text-gray-400" : "text-gray-600")}>Resumes Previewed</span>
                          <span className="font-bold text-lg">{stats.summary.previewed.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className={cn(isDarkMode ? "text-gray-400" : "text-gray-600")}>Resumes Downloaded</span>
                          <span className="font-bold text-lg">{stats.summary.downloads.toLocaleString()}</span>
                        </div>
                      </div>
                   </div>
                   
                   <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                      <h3 className="text-lg font-bold mb-4">Daily Unique Visitors Trend</h3>
                      <div className="h-48 flex items-end gap-2">
                        {stats.dailyTrend.map((day, idx) => {
                          const maxCount = Math.max(...stats.dailyTrend.map(d => d.count), 1);
                          const height = (day.count / maxCount) * 100;
                          return (
                            <div key={idx} className="flex-1 flex flex-col justify-end group relative">
                              <div className={cn("w-full rounded-t-sm transition-all relative", isDarkMode ? "bg-blue-500/80 group-hover:bg-blue-400" : "bg-blue-500 group-hover:bg-blue-600")} style={{ height: `${height}%` }}>
                                <div className={cn("absolute -top-8 left-1/2 -translate-x-1/2 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10", isDarkMode ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white")}>
                                  {day.count} visitors
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && stats && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Daily Trend Expanded */}
                  <div className={cn("border rounded-xl p-6 shadow-sm lg:col-span-2 transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                    <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                      <BarChart size={18} className="text-indigo-500" />
                      Daily Unique Visitors Trend
                    </h3>
                    <div className="h-64 flex items-end gap-2">
                      {stats.dailyTrend.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">No data for selected timeframe</div>
                      ) : stats.dailyTrend.map((day, idx) => {
                        const maxCount = Math.max(...stats.dailyTrend.map(d => d.count), 1);
                        const height = (day.count / maxCount) * 100;
                        return (
                          <div key={idx} className="flex-1 flex flex-col justify-end group relative min-w-[12px]">
                            <div className={cn("w-full rounded-t-sm transition-all relative", isDarkMode ? "bg-indigo-500/80 group-hover:bg-indigo-400" : "bg-indigo-400 group-hover:bg-indigo-500")} style={{ height: `${height}%` }}>
                              <div className={cn("absolute -top-8 left-1/2 -translate-x-1/2 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10", isDarkMode ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white")}>
                                {day.count} visitors
                              </div>
                            </div>
                            {stats.dailyTrend.length <= 30 && (
                              <div className="text-[10px] text-gray-400 mt-2 text-center truncate">{day.date.split('-').slice(1).join('/')}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Device Usage */}
                  <div className={cn("border rounded-xl p-6 shadow-sm flex flex-col transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                    <h3 className="text-base font-semibold mb-4">Device Usage</h3>
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                      <div className={cn("flex items-center justify-between p-3 rounded-lg border border-l-4 border-l-emerald-500", isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-r-gray-100 border-y-gray-100")}>
                        <div className="flex items-center gap-3"><Monitor size={18} className="text-emerald-500" /><span className="text-sm font-medium">Desktop</span></div>
                        <span className="font-bold">{stats.deviceCounts.desktop}</span>
                      </div>
                      <div className={cn("flex items-center justify-between p-3 rounded-lg border border-l-4 border-l-amber-500", isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-r-gray-100 border-y-gray-100")}>
                        <div className="flex items-center gap-3"><Smartphone size={18} className="text-amber-500" /><span className="text-sm font-medium">Mobile</span></div>
                        <span className="font-bold">{stats.deviceCounts.mobile}</span>
                      </div>
                      <div className={cn("flex items-center justify-between p-3 rounded-lg border border-l-4 border-l-purple-500", isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-r-gray-100 border-y-gray-100")}>
                        <div className="flex items-center gap-3"><Tablet size={18} className="text-purple-500" /><span className="text-sm font-medium">Tablet</span></div>
                        <span className="font-bold">{stats.deviceCounts.tablet}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Top Countries */}
                  <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                    <h3 className="text-sm font-semibold mb-4 text-emerald-500">Top Countries</h3>
                    <div className="space-y-3">
                      {stats.topCountries.length === 0 ? <p className="text-sm text-gray-500">No data</p> : stats.topCountries.map((c, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2"><span className="text-base">{getFlag(c.country)}</span><span className={isDarkMode ? "text-gray-300 truncate max-w-[100px]" : "text-gray-600 truncate max-w-[100px]"}>{c.country}</span></div>
                          <span className="font-bold text-gray-400">{c.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Referrers */}
                  <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                    <h3 className="text-sm font-semibold mb-4 text-amber-500">Top Referrers</h3>
                    <div className="space-y-3">
                      {stats.topReferrers.length === 0 ? <p className="text-sm text-gray-500">No data</p> : stats.topReferrers.map((r, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className={isDarkMode ? "text-gray-300 truncate max-w-[120px]" : "text-gray-600 truncate max-w-[120px]"}>{r.source || 'Direct'}</span>
                          <span className="font-bold text-gray-400">{r.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Browsers */}
                  <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                    <h3 className="text-sm font-semibold mb-4 text-purple-500">Top Browsers</h3>
                    <div className="space-y-3">
                      {stats.topBrowsers.length === 0 ? <p className="text-sm text-gray-500">No data</p> : stats.topBrowsers.map((b, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{b.browser || 'Unknown'}</span>
                          <span className="font-bold text-gray-400">{b.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Templates */}
                  <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                    <h3 className="text-sm font-semibold mb-4 text-rose-500">Top Templates</h3>
                    <div className="space-y-3">
                      {stats.topTemplates.length === 0 ? <p className="text-sm text-gray-500">No data</p> : stats.topTemplates.map((t, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className={isDarkMode ? "text-gray-300 truncate max-w-[120px]" : "text-gray-600 truncate max-w-[120px]"}>{t.template || 'N/A'}</span>
                          <span className="font-bold text-gray-400">{t.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'talent_pool' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className={cn("flex justify-between items-center p-4 rounded-xl border shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search talent by name, email, job..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className={cn("w-full border rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all", isDarkMode ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" : "bg-gray-50 border-gray-200 text-gray-900")}
                    />
                  </div>
                  
                  {/* Export Options */}
                  <div className="flex items-center gap-2">
                    <button onClick={exportJSON} title="Export to JSON" className={cn("p-2 rounded-lg border transition-colors flex items-center gap-2 text-sm font-medium", isDarkMode ? "border-gray-700 hover:bg-gray-800 text-emerald-400" : "border-gray-200 hover:bg-gray-50 text-emerald-600")}>
                      <FileJson size={16} /> JSON
                    </button>
                    <button onClick={exportCSV} title="Export to CSV" className={cn("p-2 rounded-lg border transition-colors flex items-center gap-2 text-sm font-medium", isDarkMode ? "border-gray-700 hover:bg-gray-800 text-amber-400" : "border-gray-200 hover:bg-gray-50 text-amber-600")}>
                      <FileSpreadsheet size={16} /> CSV
                    </button>
                    <button onClick={exportPDF} title="Export to PDF" className={cn("p-2 rounded-lg border transition-colors flex items-center gap-2 text-sm font-medium", isDarkMode ? "border-gray-700 hover:bg-gray-800 text-purple-400" : "border-gray-200 hover:bg-gray-50 text-purple-600")}>
                      <FileText size={16} /> PDF
                    </button>
                  </div>
                </div>

                <div className={cn("border rounded-xl overflow-hidden shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                  <table className="w-full text-left text-sm">
                    <thead className={cn("border-b text-xs font-semibold uppercase tracking-wider", isDarkMode ? "bg-gray-900 border-gray-800 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-500")}>
                      <tr>
                        <th className="px-6 py-4">Candidate</th>
                        <th className="px-6 py-4">Job Title</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Opt-in Date</th>
                        <th className="px-6 py-4">Resume Payload</th>
                      </tr>
                    </thead>
                    <tbody className={cn("divide-y", isDarkMode ? "divide-gray-800" : "divide-gray-100")}>
                      {filteredCandidates?.map((candidate:any) => (
                        <tr key={candidate.id} className={cn("transition-colors", isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50")}>
                          <td className="px-6 py-4">
                            <div className="font-medium">{candidate.name || 'Anonymous'}</div>
                            <div className={cn("text-xs mt-0.5", isDarkMode ? "text-gray-400" : "text-gray-500")}>{candidate.email}</div>
                          </td>
                          <td className={cn("px-6 py-4", isDarkMode ? "text-gray-300" : "text-gray-700")}>{candidate.job_title || 'Not specified'}</td>
                          <td className="px-6 py-4">{candidate.location || '-'}</td>
                          <td className={cn("px-6 py-4", isDarkMode ? "text-gray-400" : "text-gray-500")}>{new Date(candidate.opted_in_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            {candidate.resume_data ? (
                              <button 
                                onClick={() => setSelectedCandidate(candidate)}
                                className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-colors", isDarkMode ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50" : "bg-blue-50 text-blue-600 hover:bg-blue-100")}
                              >
                                View CV Data
                              </button>
                            ) : (
                              <span className={cn("px-2 py-1 text-xs font-semibold rounded-md", isDarkMode ? "bg-gray-800 text-gray-500" : "bg-gray-100 text-gray-400")}>No Data</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {(!filteredCandidates || filteredCandidates.length === 0) && (
                        <tr>
                          <td colSpan={5} className={cn("px-6 py-12 text-center", isDarkMode ? "text-gray-500 bg-gray-900/50" : "text-gray-500 bg-gray-50")}>
                            No candidates found in the Talent Pool.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl animate-in fade-in duration-500 space-y-6">
                <div className={cn("border rounded-xl p-6 shadow-sm space-y-4 transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                  <h3 className={cn("text-base font-semibold border-b pb-4 mb-4", isDarkMode ? "border-gray-800 text-white" : "border-gray-100 text-gray-900")}>Feature Flags</h3>
                  {featureFlags?.map((flag:any) => (
                    <div key={flag.id} className="flex items-center justify-between py-2">
                      <div>
                        <div className="font-medium text-sm">{flag.key}</div>
                        <div className={cn("text-xs mt-1", isDarkMode ? "text-gray-400" : "text-gray-500")}>{flag.description}</div>
                      </div>
                      <div className={cn("px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full", flag.is_enabled ? (isDarkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-100 text-emerald-700") : (isDarkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"))}>
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

      {/* CV Preview Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={cn("w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden", isDarkMode ? "bg-[#0A0A0A] border border-gray-800" : "bg-white border border-gray-200")}>
            <div className={cn("p-6 border-b flex justify-between items-center shrink-0", isDarkMode ? "border-gray-800" : "border-gray-100")}>
              <div>
                <h3 className="text-xl font-bold">{selectedCandidate.name || 'Anonymous'}</h3>
                <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>{selectedCandidate.email} • {selectedCandidate.job_title}</p>
              </div>
              <button 
                onClick={() => setSelectedCandidate(null)}
                className={cn("p-2 rounded-full transition-colors", isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500")}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              {selectedCandidate.resume_data?.summary && (
                <div>
                  <h4 className={cn("text-sm font-bold uppercase tracking-wider mb-2", isDarkMode ? "text-gray-500" : "text-gray-400")}>Professional Summary</h4>
                  <p className="text-sm leading-relaxed">{selectedCandidate.resume_data.summary}</p>
                </div>
              )}

              {selectedCandidate.resume_data?.experience && selectedCandidate.resume_data.experience.length > 0 && (
                <div>
                  <h4 className={cn("text-sm font-bold uppercase tracking-wider mb-3", isDarkMode ? "text-gray-500" : "text-gray-400")}>Experience</h4>
                  <div className="space-y-4">
                    {selectedCandidate.resume_data.experience.map((exp: any, i: number) => (
                      <div key={i} className={cn("p-4 rounded-xl border", isDarkMode ? "bg-gray-900/50 border-gray-800" : "bg-gray-50 border-gray-100")}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold">{exp.role}</div>
                            <div className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-600")}>{exp.company}</div>
                          </div>
                          <div className={cn("text-xs font-medium px-2 py-1 rounded-md", isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white border text-gray-600")}>
                            {exp.startDate} - {exp.endDate || 'Present'}
                          </div>
                        </div>
                        <p className={cn("text-sm whitespace-pre-wrap mt-2", isDarkMode ? "text-gray-300" : "text-gray-700")}>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedCandidate.resume_data?.education && selectedCandidate.resume_data.education.length > 0 && (
                <div>
                  <h4 className={cn("text-sm font-bold uppercase tracking-wider mb-3", isDarkMode ? "text-gray-500" : "text-gray-400")}>Education</h4>
                  <div className="space-y-3">
                    {selectedCandidate.resume_data.education.map((edu: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-medium">{edu.degree}</span>
                          <span className={cn("ml-2", isDarkMode ? "text-gray-400" : "text-gray-500")}>at {edu.school}</span>
                        </div>
                        <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>{edu.graduationYear}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedCandidate.resume_data?.skills && selectedCandidate.resume_data.skills.length > 0 && (
                <div>
                  <h4 className={cn("text-sm font-bold uppercase tracking-wider mb-3", isDarkMode ? "text-gray-500" : "text-gray-400")}>Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.resume_data.skills.map((skill: any, i: number) => (
                      <span key={i} className={cn("px-3 py-1 text-xs font-medium rounded-full", isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700")}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {(!selectedCandidate.resume_data?.experience?.length && !selectedCandidate.resume_data?.summary && !selectedCandidate.resume_data?.skills?.length) && (
                <div className={cn("text-center py-8 text-sm italic", isDarkMode ? "text-gray-500" : "text-gray-400")}>
                  This candidate only provided basic contact information.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
