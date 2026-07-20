import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Auth check
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    if (!session?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all analytics events
    const { data: events, error } = await supabaseAdmin
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const allEvents: any[] = events || [];
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    // --- Summary Stats ---
    const totalEvents = allEvents.length;
    const uniqueSessions = new Set(allEvents.map(e => e.session_id)).size;
    const downloads = allEvents.filter(e => e.event_type === 'milestone_downloaded').length;
    const optIns = allEvents.filter(e => e.event_type === 'milestone_opted_in').length;
    const todayEvents = allEvents.filter(e => e.created_at?.startsWith(todayStr)).length;
    const started = allEvents.filter(e => e.event_type === 'milestone_started').length;
    const previewed = allEvents.filter(e => e.event_type === 'milestone_previewed').length;

    // --- Geographic Breakdown (Top 15) ---
    const countryCounts: Record<string, number> = {};
    allEvents.forEach(e => {
      if (e.country) countryCounts[e.country] = (countryCounts[e.country] || 0) + 1;
    });
    const topCountries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([country, count]) => ({ country, count }));

    // --- Device Breakdown ---
    const deviceCounts: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 };
    allEvents.forEach(e => {
      const dt = e.device_type?.toLowerCase() || 'unknown';
      if (dt in deviceCounts) deviceCounts[dt]++;
    });

    // --- Browser Breakdown ---
    const browserCounts: Record<string, number> = {};
    allEvents.forEach(e => {
      if (e.browser) browserCounts[e.browser] = (browserCounts[e.browser] || 0) + 1;
    });
    const topBrowsers = Object.entries(browserCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([browser, count]) => ({ browser, count }));

    // --- OS Breakdown ---
    const osCounts: Record<string, number> = {};
    allEvents.forEach(e => {
      if (e.os) osCounts[e.os] = (osCounts[e.os] || 0) + 1;
    });
    const topOS = Object.entries(osCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([os, count]) => ({ os, count }));

    // --- Referrer Breakdown ---
    const referrerCounts: Record<string, number> = {};
    allEvents.forEach(e => {
      const ref = e.referrer || 'direct';
      referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
    });
    const topReferrers = Object.entries(referrerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([source, count]) => ({ source, count }));

    // --- Template Popularity ---
    const templateCounts: Record<string, number> = {};
    allEvents.forEach(e => {
      if (e.template_id) templateCounts[e.template_id] = (templateCounts[e.template_id] || 0) + 1;
    });
    const topTemplates = Object.entries(templateCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([template, count]) => ({ template, count }));

    // --- 30-Day Trend ---
    const trend: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      trend[d.toISOString().split('T')[0]] = 0;
    }
    allEvents.forEach(e => {
      const day = e.created_at?.split('T')[0];
      if (day && day in trend) trend[day]++;
    });
    const dailyTrend = Object.entries(trend).map(([date, count]) => ({ date, count }));

    // --- Recent Activity (last 50) ---
    const recentActivity = allEvents.slice(0, 50).map(e => ({
      event_type: e.event_type,
      template_id: e.template_id,
      country: e.country,
      city: e.city,
      device_type: e.device_type,
      browser: e.browser,
      os: e.os,
      referrer: e.referrer,
      created_at: e.created_at,
    }));

    return NextResponse.json({
      summary: {
        totalEvents,
        uniqueSessions,
        started,
        previewed,
        downloads,
        optIns,
        todayEvents,
      },
      topCountries,
      deviceCounts,
      topBrowsers,
      topOS,
      topReferrers,
      topTemplates,
      dailyTrend,
      recentActivity,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
