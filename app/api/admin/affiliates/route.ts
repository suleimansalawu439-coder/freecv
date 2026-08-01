import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = (await cookies()).get('admin_session')?.value;
  let authed = false;
  if (token) { try { authed = !!(await verifyAdminToken(token)); } catch { authed = false; } }
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data } = await supabaseAdmin.from('job_clicks').select('*').order('created_at', { ascending: false });
  const all = data || [];
  const now = Date.now();
  const inDays = (n: number) => all.filter((c: any) => now - new Date(c.created_at).getTime() < n * 864e5);
  const cents = (rows: any[]) => rows.reduce((s: number, c: any) => s + Math.round((Number(c.cpc_value) || 0) * 100), 0);

  const last7 = inDays(7), last30 = inDays(30);
  const c7 = cents(last7), c30 = cents(last30), cAll = cents(all);

  const byCountry: Record<string, { clicks: number; cents: number }> = {};
  all.forEach((c: any) => { const k = c.country || 'UNKNOWN'; (byCountry[k] ||= { clicks: 0, cents: 0 }).clicks++; byCountry[k].cents += Math.round((Number(c.cpc_value) || 0) * 100); });

  const byJob: Record<string, any> = {};
  all.forEach((c: any) => { const k = c.job_url || 'x'; (byJob[k] ||= { title: c.job_title || '—', company: c.company || '—', country: c.country || '', clicks: 0, cents: 0 }).clicks++; byJob[k].cents += Math.round((Number(c.cpc_value) || 0) * 100); });

  const usd = (c: number) => (c / 100).toFixed(2);
  return NextResponse.json({
    totals: { clicks: all.length, cents: cAll, usd: usd(cAll) },
    last30: { clicks: last30.length, cents: c30, usd: usd(c30) },
    last7: { clicks: last7.length, cents: c7, usd: usd(c7) },
    projectedMonthly: { cents: Math.round((c7 / 7) * 30), usd: usd(Math.round((c7 / 7) * 30)) },
    byCountry: Object.entries(byCountry).map(([country, v]) => ({ country, ...v, usd: usd(v.cents) })).sort((a, b) => b.cents - a.cents),
    topJobs: Object.values(byJob).sort((a: any, b: any) => b.clicks - a.clicks).slice(0, 10),
    recent: all.slice(0, 25).map((c: any) => ({ id: c.id, job_title: c.job_title, company: c.company, country: c.country, cpc_minor: Math.round((Number(c.cpc_value) || 0) * 100), created_at: c.created_at })),
  });
}