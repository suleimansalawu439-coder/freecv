import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin, adminFail } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try { await requireAdmin(); } catch { return adminFail(); }

  const [jobClicksRes, affClicksRes, affPartnersRes] = await Promise.allSettled([
    supabaseAdmin.from('job_clicks').select('*').order('created_at', { ascending: false }).limit(2000),
    supabaseAdmin.from('affiliate_clicks').select('*').order('created_at', { ascending: false }).limit(1000),
    supabaseAdmin.from('affiliates').select('*').order('created_at', { ascending: false }),
  ]);

  const all = (jobClicksRes.status === 'fulfilled' && !jobClicksRes.value.error) ? (jobClicksRes.value.data || []) : [];
  const referralClicks = (affClicksRes.status === 'fulfilled' && !affClicksRes.value.error) ? (affClicksRes.value.data || []) : [];
  const affiliatePartners = (affPartnersRes.status === 'fulfilled' && !affPartnersRes.value.error) ? (affPartnersRes.value.data || []) : [];

  const now = Date.now();
  const inDays = (n: number) => all.filter((c: any) => now - new Date(c.created_at).getTime() < n * 864e5);
  const cents = (rows: any[]) => rows.reduce((s: number, c: any) => s + Math.round((Number(c.cpc_value) || 0) * 100), 0);

  const last7 = inDays(7);
  const last30 = inDays(30);
  const c7 = cents(last7);
  const c30 = cents(last30);
  const cAll = cents(all);

  const byCountry: Record<string, { clicks: number; cents: number }> = {};
  all.forEach((c: any) => {
    const k = c.country || 'US';
    (byCountry[k] ||= { clicks: 0, cents: 0 }).clicks++;
    byCountry[k].cents += Math.round((Number(c.cpc_value) || 0) * 100);
  });

  const byJob: Record<string, any> = {};
  all.forEach((c: any) => {
    const k = c.job_url || `${c.job_title}-${c.company}`;
    if (!byJob[k]) {
      byJob[k] = {
        title: c.job_title || '—',
        company: c.company || '—',
        country: c.country || '',
        clicks: 0,
        cents: 0
      };
    }
    byJob[k].clicks++;
    byJob[k].cents += Math.round((Number(c.cpc_value) || 0) * 100);
  });

  const usd = (c: number) => (c / 100).toFixed(2);

  return NextResponse.json({
    totals: { clicks: all.length, cents: cAll, usd: usd(cAll) },
    last30: { clicks: last30.length, cents: c30, usd: usd(c30) },
    last7: { clicks: last7.length, cents: c7, usd: usd(c7) },
    projectedMonthly: { cents: Math.round((c7 / Math.max(1, 7)) * 30), usd: usd(Math.round((c7 / Math.max(1, 7)) * 30)) },
    byCountry: Object.entries(byCountry).map(([country, v]) => ({
      country,
      clicks: v.clicks,
      cents: v.cents,
      usd: usd(v.cents),
      avgCpc: v.clicks > 0 ? `$${(v.cents / v.clicks / 100).toFixed(2)}` : '$0.00'
    })).sort((a, b) => b.cents - a.cents),
    topJobs: Object.values(byJob).sort((a: any, b: any) => b.clicks - a.clicks).slice(0, 15),
    recent: all.slice(0, 500).map((c: any) => ({
      id: c.id,
      user_name: c.user_name || 'Candidate',
      user_email: c.user_email || '—',
      device_type: c.device_type || 'desktop',
      job_title: c.job_title || 'Opportunity',
      company: c.company || '—',
      job_url: c.job_url,
      country: c.country || 'US',
      city: c.city || c.location || '—',
      cpc_value: Number(c.cpc_value) || 0,
      cpc_minor: Math.round((Number(c.cpc_value) || 0) * 100),
      created_at: c.created_at,
    })),
    referrals: {
      totalClicks: referralClicks.length,
      partnersCount: affiliatePartners.length,
      recentClicks: referralClicks.slice(0, 100),
      partners: affiliatePartners,
    },
  });
}