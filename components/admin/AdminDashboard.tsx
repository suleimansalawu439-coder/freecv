"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Users, BarChart, Settings, LogOut, Monitor, Smartphone, Tablet, Search, Moon, Sun, FileJson, FileSpreadsheet, FileText, LayoutDashboard, Calendar, Building2, HelpCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import DOMPurify from 'isomorphic-dompurify';
import BlogManager from './BlogManager';
import SupportManager from './SupportManager';
import RecruiterManager from './RecruiterManager';

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
  variants?: { variant: string; views: number; downloads: number; rate: number; }[];
  cohorts?: { source: string; started: number; downloaded: number; rate: number; }[];
  dailyTrend: { date: string; count: number; isForecast?: boolean }[];
  combinedTrend?: { date: string; count: number; isForecast?: boolean }[];
  recentActivity: any[];
  topIndustries?: { industry: string; count: number }[];
  topColors?: { color: string; count: number }[];
  downloadFormats?: { pdf: number; docx: number };
  aiUsage?: { totalRequests: number; atsScans: number };
  avgResumeLength?: number;
  skippedSections?: { section: string; count: number }[];
  dropoffFunnel?: { pageViews: number; started: number; previewed: number; downloaded: number };
}

const COUNTRY_FLAGS: Record<string, string> = {
  'Nigeria': '🇳🇬', 'United States': '🇺🇸', 'United Kingdom': '🇬🇧', 'Canada': '🇨🇦',
  'Germany': '🇩🇪', 'France': '🇫🇷', 'India': '🇮🇳', 'Australia': '🇦🇺', 'Brazil': '🇧🇷',
  'Japan': '🇯🇵', 'South Africa': '🇿🇦', 'Kenya': '🇰🇪', 'Ghana': '🇬🇭', 'Egypt': '🇪🇬'
};
function getFlag(country: string): string { return COUNTRY_FLAGS[country] || '🌍'; }

export default function AdminDashboard({ candidates, analytics, aiLogs, siteSettings, featureFlags, recruiters, blogPosts, tickets }: any) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'talent_pool' | 'recruiters' | 'blog' | 'support' | 'settings'>('dashboard');
  const [timeframe, setTimeframe] = useState<'24h'|'7d'|'14d'|'30d'|'6m'|'1y'|'all'>('30d');
  const [stats, setStats] = useState<StatsData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [billingSettings, setBillingSettings] = useState({ amount: 990000, currency: 'NGN' });
  const [isSavingBilling, setIsSavingBilling] = useState(false);


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
    fetch('/api/admin/settings').then(res => res.json()).then(data => {
      if (data.billing) {
        setBillingSettings(data.billing);
      }
    }).catch(console.error);
    
    if (!analytics) return;

    // Filter analytics based on timeframe
    const filteredAnalytics = analytics.filter((e:any) => isWithinTimeframe(e.created_at, timeframe));
    const filteredCandidatesDb = candidates?.filter((c:any) => isWithinTimeframe(c.updated_at || c.opted_in_at, timeframe)) || [];

    // Process candidates for industries
    filteredCandidatesDb.forEach((c:any) => {
      const industry = c.title_category || 'Other';
      industryMap[industry] = (industryMap[industry] || 0) + 1;
    });

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
    let variantMap: Record<string, { views: number, downloads: number }> = {};
    let industryMap: Record<string, number> = {};
    let colorMap: Record<string, number> = {};
    let formatMap = { pdf: 0, docx: 0 };
    let skippedSectionsMap: Record<string, number> = {};
    let totalLength = 0;
    let lengthCount = 0;
    
    // Funnel mapping
    let funnel = { pageViews: 0, started: 0, previewed: 0, downloaded: 0 };
    
    
    filteredAnalytics.forEach((e:any) => {
      // Funnel tracking
      if (e.event_type === 'page_view') funnel.pageViews++;
      if (e.event_type === 'milestone_started') funnel.started++;
      if (e.event_type === 'milestone_previewed') funnel.previewed++;
      if (e.event_type === 'milestone_downloaded') funnel.downloaded++;
      
      // Metadata processing
      if (e.event_type === 'milestone_downloaded' && e.metadata) {
        if (e.metadata.format === 'pdf') formatMap.pdf++;
        if (e.metadata.format === 'docx') formatMap.docx++;
        
        if (e.metadata.themeColor) {
          colorMap[e.metadata.themeColor] = (colorMap[e.metadata.themeColor] || 0) + 1;
        }
        
        if (typeof e.metadata.resume_length === 'number') {
          totalLength += e.metadata.resume_length;
          lengthCount++;
        }
        
        if (Array.isArray(e.metadata.skipped_sections)) {
          e.metadata.skipped_sections.forEach((sec: string) => {
            skippedSectionsMap[sec] = (skippedSectionsMap[sec] || 0) + 1;
          });
        }
      }
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
      if (e.variant_assignment) {
        if (!variantMap[e.variant_assignment]) variantMap[e.variant_assignment] = { views: 0, downloads: 0 };
        if (e.event_type === 'page_view' || e.event_type === 'milestone_started') variantMap[e.variant_assignment].views++;
        if (e.event_type === 'milestone_downloaded') variantMap[e.variant_assignment].downloads++;
      }
    });

    // Compute cohort retention by referrer
    let cohortMap: Record<string, { started: Set<string>, downloaded: Set<string> }> = {};
    filteredAnalytics.forEach((e:any) => {
      const source = e.referrer || 'Direct';
      if (!cohortMap[source]) cohortMap[source] = { started: new Set(), downloaded: new Set() };
      
      if (e.event_type === 'milestone_started') cohortMap[source].started.add(e.session_id);
      if (e.event_type === 'milestone_downloaded') cohortMap[source].downloaded.add(e.session_id);
    });

    const cohorts = Object.entries(cohortMap).map(([source, data]) => ({
      source,
      started: data.started.size,
      downloaded: data.downloaded.size,
      rate: data.started.size > 0 ? (data.downloaded.size / data.started.size) * 100 : 0
    })).sort((a, b) => b.started - a.started).slice(0, 5);

    const dailyTrend = Object.entries(dailyUniqueMap)
      .map(([date, set]) => ({ date, count: set.size }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Simple linear regression for predictive forecasting
    let forecastTrend: { date: string, count: number, isForecast: boolean }[] = [];
    if (dailyTrend.length > 2) {
      const n = dailyTrend.length;
      let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
      dailyTrend.forEach((d, i) => {
        sumX += i;
        sumY += d.count;
        sumXY += i * d.count;
        sumXX += i * i;
      });
      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      
      const lastDate = new Date(dailyTrend[n-1].date);
      for (let i = 0; i < 7; i++) { // Project 7 days
        lastDate.setDate(lastDate.getDate() + 1);
        const projectedCount = Math.max(0, Math.round(slope * (n + i) + intercept));
        forecastTrend.push({ date: lastDate.toISOString().split('T')[0], count: projectedCount, isForecast: true });
      }
    }
    const combinedTrend = [...dailyTrend.map(d => ({ ...d, isForecast: false })), ...forecastTrend];

    setStats({
      summary,
      topCountries: Object.entries(countryMap).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count).slice(0, 10),
      deviceCounts: deviceMap,
      topBrowsers: Object.entries(browserMap).map(([browser, count]) => ({ browser, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      topOS: Object.entries(osMap).map(([os, count]) => ({ os, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      topReferrers: Object.entries(referrerMap).map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      topTemplates: Object.entries(templateMap).map(([template, count]) => ({ template, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      variants: Object.entries(variantMap).map(([variant, data]) => ({ variant, views: Math.max(data.views, 1), downloads: data.downloads, rate: (data.downloads / Math.max(data.views, 1)) * 100 })).sort((a, b) => b.rate - a.rate),
      cohorts,
      dailyTrend,
      combinedTrend,
      recentActivity: filteredAnalytics.slice(0, 20),
      topIndustries: Object.entries(industryMap).map(([industry, count]) => ({ industry, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      topColors: Object.entries(colorMap).map(([color, count]) => ({ color, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      downloadFormats: formatMap,
      avgResumeLength: lengthCount > 0 ? Math.round(totalLength / lengthCount) : 0,
      skippedSections: Object.entries(skippedSectionsMap).map(([section, count]) => ({ section, count })).sort((a, b) => b.count - a.count).slice(0, 5),
      dropoffFunnel: funnel,
      aiUsage: {
        totalRequests: typeof aiLogs !== 'undefined' ? aiLogs.filter((l:any) => isWithinTimeframe(l.created_at, timeframe)).length : 0,
        atsScans: typeof aiLogs !== 'undefined' ? aiLogs.filter((l:any) => l.endpoint?.includes('ats') && isWithinTimeframe(l.created_at, timeframe)).length : 0
      }
    });
  }, [analytics, candidates, aiLogs, timeframe]);

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'analytics', label: 'Analytics', icon: BarChart },
    { key: 'talent_pool', label: 'Talent Pool', icon: Users },
    { key: 'recruiters', label: 'Recruiters', icon: Building2 },
    { key: 'blog', label: 'Blog CMS', icon: FileText },
    { key: 'support', label: 'Helpdesk', icon: HelpCircle },
    { key: 'settings', label: 'Settings', icon: Settings }
  ] as const;

  const filteredCandidates = candidates?.filter((c:any) => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.skills && c.skills.some((s:string) => s.toLowerCase().includes(searchTerm.toLowerCase()))) ||
    c.current_title?.toLowerCase().includes(searchTerm.toLowerCase())
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
    doc.text("Cvyon Candidate Export", 14, 15);
    
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
            Cvyon Admin
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
                      {(stats.combinedTrend || stats.dailyTrend).map((day, idx) => {
                          const maxCount = Math.max(...(stats.combinedTrend || stats.dailyTrend).map(d => d.count), 1);
                          const height = (day.count / maxCount) * 100;
                          return (
                            <div key={idx} className="flex-1 flex flex-col justify-end group relative">
                              <div className={cn("w-full rounded-t-sm transition-all relative", day.isForecast ? (isDarkMode ? "bg-gray-800 border border-dashed border-gray-600" : "bg-gray-100 border border-dashed border-gray-300") : (isDarkMode ? "bg-blue-500/80 group-hover:bg-blue-400" : "bg-blue-500 group-hover:bg-blue-600"))} style={{ height: `${height}%` }}>
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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Daily Trend Expanded */}
                  <div className={cn("border rounded-xl p-6 shadow-sm lg:col-span-2 transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                    <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                      <BarChart size={18} className="text-indigo-500" />
                      Daily Unique Visitors Trend
                    </h3>
                    <div className="h-64 flex items-end gap-2">
                      {(stats.combinedTrend || stats.dailyTrend).length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">No data for selected timeframe</div>
                      ) : (stats.combinedTrend || stats.dailyTrend).map((day, idx) => {
                        const maxCount = Math.max(...(stats.combinedTrend || stats.dailyTrend).map(d => d.count), 1);
                        const height = (day.count / maxCount) * 100;
                        return (
                          <div key={idx} className="flex-1 flex flex-col justify-end group relative min-w-[12px]">
                            <div className={cn("w-full rounded-t-sm transition-all relative", day.isForecast ? (isDarkMode ? "bg-gray-800 border border-dashed border-gray-600" : "bg-gray-100 border border-dashed border-gray-300") : (isDarkMode ? "bg-indigo-500/80 group-hover:bg-indigo-400" : "bg-indigo-400 group-hover:bg-indigo-500"))} style={{ height: `${height}%` }}>
                              <div className={cn("absolute -top-8 left-1/2 -translate-x-1/2 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10", isDarkMode ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white")}>
                                {day.count} visitors
                              </div>
                            </div>
                            {(stats.combinedTrend || stats.dailyTrend).length <= 30 && (
                              <div className="text-[10px] text-gray-400 mt-2 text-center truncate">{day.date.split('-').slice(1).join('/')}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* A/B Testing Variants */}
                  <div className={cn("border rounded-xl p-6 shadow-sm flex flex-col transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                    <h3 className="text-base font-semibold mb-4">A/B Testing Variants (Conv. Rate)</h3>
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                      {stats.variants?.length === 0 ? <p className="text-sm text-gray-500">No variant data</p> : stats.variants?.map((v:any, i:number) => (
                        <div key={i} className={cn("flex items-center justify-between p-3 rounded-lg border", i === 0 ? (isDarkMode ? "bg-emerald-900/20 border-emerald-800/50" : "bg-emerald-50 border-emerald-100") : (isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-100"))}>
                          <div>
                            <div className="flex items-center gap-2"><span className="text-sm font-medium">{v.variant}</span>{i === 0 && <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500 text-white rounded font-bold">WINNER</span>}</div>
                            <div className={cn("text-[10px] mt-0.5", isDarkMode ? "text-gray-400" : "text-gray-500")}>{v.downloads} dl / {v.views} views</div>
                          </div>
                          <span className="font-bold text-lg">{v.rate.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cohort Retention */}
                  <div className={cn("border rounded-xl p-6 shadow-sm flex flex-col transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                    <h3 className="text-base font-semibold mb-4">Cohort Retention (Start → DL)</h3>
                    <div className="space-y-3 flex-1 flex flex-col">
                      {stats.cohorts?.length === 0 ? <p className="text-sm text-gray-500">No cohort data</p> : stats.cohorts?.map((c:any, i:number) => (
                        <div key={i} className={cn("flex items-center justify-between p-2 rounded-lg border", isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-100")}>
                          <div className="w-1/2">
                            <div className="text-sm font-medium truncate" title={c.source}>{c.source}</div>
                            <div className={cn("text-[10px] mt-0.5", isDarkMode ? "text-gray-400" : "text-gray-500")}>{c.downloaded}/{c.started} converted</div>
                          </div>
                          <div className="w-1/2 flex items-center justify-end gap-2">
                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden flex"><div className="h-full bg-blue-500" style={{ width: `${c.rate}%` }}></div></div>
                            <span className="font-bold text-xs w-10 text-right">{c.rate.toFixed(0)}%</span>
                          </div>
                        </div>
                      ))}
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
                  
                  {/* New BI Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 col-span-full">
                    {/* Top Industries */}
                    <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                      <h3 className="text-sm font-semibold mb-4 text-cyan-500">Top Industries</h3>
                      <div className="space-y-3">
                        {stats.topIndustries?.length === 0 ? <p className="text-sm text-gray-500">No data</p> : stats.topIndustries?.map((ind, i) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <span className={isDarkMode ? "text-gray-300 truncate max-w-[120px]" : "text-gray-600 truncate max-w-[120px]"}>{ind.industry}</span>
                            <span className="font-bold text-gray-400">{ind.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Funnel Metrics */}
                    <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                      <h3 className="text-sm font-semibold mb-4 text-orange-500">Drop-off Funnel</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs"><span className="text-gray-400">Page Views</span><span className="font-bold">{stats.dropoffFunnel?.pageViews}</span></div>
                        <div className="w-full h-1 bg-gray-800 rounded-full"><div className="h-full bg-orange-500 rounded-full" style={{width: '100%'}}></div></div>
                        
                        <div className="flex justify-between text-xs mt-2"><span className="text-gray-400">Started</span><span className="font-bold">{stats.dropoffFunnel?.started}</span></div>
                        <div className="w-full h-1 bg-gray-800 rounded-full"><div className="h-full bg-orange-400 rounded-full" style={{width: stats.dropoffFunnel?.pageViews ? `${(stats.dropoffFunnel.started/stats.dropoffFunnel.pageViews)*100}%` : '0%'}}></div></div>

                        <div className="flex justify-between text-xs mt-2"><span className="text-gray-400">Previewed</span><span className="font-bold">{stats.dropoffFunnel?.previewed}</span></div>
                        <div className="w-full h-1 bg-gray-800 rounded-full"><div className="h-full bg-orange-300 rounded-full" style={{width: stats.dropoffFunnel?.pageViews ? `${(stats.dropoffFunnel.previewed/stats.dropoffFunnel.pageViews)*100}%` : '0%'}}></div></div>

                        <div className="flex justify-between text-xs mt-2"><span className="text-gray-400">Downloaded</span><span className="font-bold">{stats.dropoffFunnel?.downloaded}</span></div>
                        <div className="w-full h-1 bg-gray-800 rounded-full"><div className="h-full bg-orange-200 rounded-full" style={{width: stats.dropoffFunnel?.pageViews ? `${(stats.dropoffFunnel.downloaded/stats.dropoffFunnel.pageViews)*100}%` : '0%'}}></div></div>
                      </div>
                    </div>

                    {/* AI Usage */}
                    <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                      <h3 className="text-sm font-semibold mb-4 text-violet-500">AI Usage</h3>
                      <div className="space-y-4 flex flex-col justify-center h-full pb-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-violet-400">{stats.aiUsage?.totalRequests}</div>
                          <div className="text-xs text-gray-500 uppercase mt-1">Total AI Requests</div>
                        </div>
                        <div className="text-center border-t border-gray-800 pt-4">
                          <div className="text-2xl font-bold text-violet-300">{stats.aiUsage?.atsScans}</div>
                          <div className="text-xs text-gray-500 uppercase mt-1">Job Descriptions Analyzed</div>
                        </div>
                      </div>
                    </div>

                    {/* Document Stats */}
                    <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                      <h3 className="text-sm font-semibold mb-4 text-pink-500">Document Stats</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Avg. Length</span>
                          <span className="font-bold">{stats.avgResumeLength} chars</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">PDFs Generated</span>
                          <span className="font-bold">{stats.downloadFormats?.pdf || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">DOCX Generated</span>
                          <span className="font-bold">{stats.downloadFormats?.docx || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary BI Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-full">
                    {/* Top Colors */}
                    <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                      <h3 className="text-sm font-semibold mb-4 text-indigo-400">Top Theme Colors</h3>
                      <div className="flex flex-wrap gap-4">
                        {stats.topColors?.length === 0 ? <p className="text-sm text-gray-500">No data</p> : stats.topColors?.map((c, i) => (
                          <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-full border border-gray-600 shadow" style={{backgroundColor: c.color}}></div>
                            <span className="text-xs text-gray-400">{c.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skipped Sections */}
                    <div className={cn("border rounded-xl p-6 shadow-sm transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                      <h3 className="text-sm font-semibold mb-4 text-rose-400">Most Skipped Sections</h3>
                      <div className="space-y-3">
                        {stats.skippedSections?.length === 0 ? <p className="text-sm text-gray-500">No data</p> : stats.skippedSections?.map((s, i) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{s.section}</span>
                            <span className="font-bold text-gray-400">{s.count} skips</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

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
                        <th className="px-6 py-4">Role & Industry</th>
                        <th className="px-6 py-4">Experience</th>
                        <th className="px-6 py-4">Top Skills</th>
                        <th className="px-6 py-4">Strength</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className={cn("divide-y", isDarkMode ? "divide-gray-800" : "divide-gray-100")}>
                      {filteredCandidates?.map((candidate:any) => (
                        <tr key={candidate.id} className={cn("transition-colors", isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50")}>
                          <td className="px-6 py-4">
                            <div className="font-medium">{candidate.full_name || candidate.name || 'Anonymous'}</div>
                            <div className={cn("text-xs mt-0.5", isDarkMode ? "text-gray-400" : "text-gray-500")}>{candidate.city ? candidate.city + ', ' : ''}{candidate.country || 'Unknown'}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={cn("font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}>{candidate.current_title || candidate.job_title || 'Not specified'}</div>
                            <div className={cn("text-[10px] mt-0.5 uppercase tracking-wider", isDarkMode ? "text-blue-400" : "text-blue-600")}>{candidate.title_category || 'Other'}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium">{candidate.experience_years ? `${candidate.experience_years} years` : '-'}</div>
                            <div className={cn("text-[10px] mt-0.5 text-gray-500")}>{candidate.employment_status || ''}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {(candidate.skills || []).slice(0, 3).map((s:string, i:number) => (
                                <span key={i} className={cn("px-1.5 py-0.5 text-[10px] rounded", isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600")}>{s}</span>
                              ))}
                              {(candidate.skills?.length || 0) > 3 && <span className="px-1.5 py-0.5 text-[10px] text-gray-500">+{candidate.skills.length - 3}</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {candidate.completeness_score ? (
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden flex"><div className="h-full bg-blue-500" style={{ width: `${candidate.completeness_score}%` }}></div></div>
                                <span className="text-xs font-bold">{candidate.completeness_score}%</span>
                              </div>
                            ) : '-'}
                          </td>
                          <td className="px-6 py-4">
                            {candidate.resume_data ? (
                              <button 
                                onClick={() => setSelectedCandidate(candidate)}
                                className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap", isDarkMode ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50" : "bg-blue-50 text-blue-600 hover:bg-blue-100")}
                              >
                                View CV
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

            {activeTab === 'recruiters' && (
              <RecruiterManager recruiters={recruiters} isDarkMode={isDarkMode} />
            )}

            {activeTab === 'blog' && (
              <BlogManager blogPosts={blogPosts} isDarkMode={isDarkMode} />
            )}

            {activeTab === 'support' && (
              <SupportManager tickets={tickets} isDarkMode={isDarkMode} />
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
                
                {/* Billing Settings */}
                <div className={cn("border rounded-xl p-6 shadow-sm space-y-4 transition-colors", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
                  <h3 className={cn("text-base font-semibold border-b pb-4 mb-4", isDarkMode ? "border-gray-800 text-white" : "border-gray-100 text-gray-900")}>Billing Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Currency</label>
                      <input 
                        type="text" 
                        value={billingSettings.currency} 
                        onChange={e => setBillingSettings({ ...billingSettings, currency: e.target.value })}
                        className={cn("w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-200")} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Amount (in smallest unit, e.g. kobo/cents)</label>
                      <input 
                        type="number" 
                        value={billingSettings.amount} 
                        onChange={e => setBillingSettings({ ...billingSettings, amount: parseInt(e.target.value) || 0 })}
                        className={cn("w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-200")} 
                      />
                      <p className="text-xs mt-1 text-gray-500">For example, 990000 = 9,900.00</p>
                    </div>
                    <button 
                      onClick={async () => {
                        setIsSavingBilling(true);
                        try {
                          await fetch('/api/admin/settings', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ key: 'billing', value: billingSettings })
                          });
                          alert('Billing settings saved successfully!');
                        } catch (err) {
                          alert('Failed to save billing settings');
                        }
                        setIsSavingBilling(false);
                      }}
                      disabled={isSavingBilling}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                      {isSavingBilling ? 'Saving...' : 'Save Billing Settings'}
                    </button>
                  </div>
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
                <div className="mb-6">
                  <h4 className={cn("text-sm font-bold uppercase tracking-wider mb-2", isDarkMode ? "text-gray-500" : "text-gray-400")}>Professional Summary</h4>
                  <p className={cn("text-sm leading-relaxed", isDarkMode ? "text-gray-300" : "text-gray-700")} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedCandidate.resume_data.summary) }}></p>
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
                            {DOMPurify.sanitize(exp.startDate)} - {DOMPurify.sanitize(exp.endDate || 'Present')}
                          </div>
                        </div>
                        <p className={cn("text-sm whitespace-pre-wrap mt-2", isDarkMode ? "text-gray-300" : "text-gray-700")} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.description) }}></p>
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
