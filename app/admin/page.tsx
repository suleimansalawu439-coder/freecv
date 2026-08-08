import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminToken } from '@/lib/auth';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // server-side guard — /admin is never public
  const token = (await cookies()).get('admin_session')?.value;
  let ok = false;
  if (token) {
    try {
      ok = !!(await verifyAdminToken(token));
    } catch {
      ok = false;
    }
  }
  if (!ok) redirect('/admin/login');

  // Resilient candidate fetching that safely handles any column naming variation
  const fetchCandidates = async () => {
    try {
      const res = await supabaseAdmin.from('candidates').select('*').order('opted_in_at', { ascending: false });
      if (!res.error && res.data) return res.data;
    } catch {}
    try {
      const res = await supabaseAdmin.from('candidates').select('*').order('updated_at', { ascending: false });
      if (!res.error && res.data) return res.data;
    } catch {}
    try {
      const res = await supabaseAdmin.from('candidates').select('*');
      if (!res.error && res.data) return res.data;
    } catch {}
    return [];
  };

  const fetchProfiles = async () => {
    try {
      const res = await supabaseAdmin.from('candidate_profiles').select('*').order('updated_at', { ascending: false });
      if (!res.error && res.data) return res.data;
    } catch {}
    try {
      const res = await supabaseAdmin.from('candidate_profiles').select('*');
      if (!res.error && res.data) return res.data;
    } catch {}
    return [];
  };

  const [candidatesList, profilesList, analytics, aiLogs, siteSettings, featureFlags, blogPosts, appSettingsRes, jobClicksRes] = await Promise.all([
    fetchCandidates(),
    fetchProfiles(),
    supabaseAdmin.from('analytics_events').select('*').order('created_at', { ascending: false }).limit(5000),
    supabaseAdmin.from('ai_usage_logs').select('*').order('created_at', { ascending: false }).limit(3000),
    supabaseAdmin.from('site_settings').select('*').maybeSingle(),
    supabaseAdmin.from('feature_flags').select('*').order('key'),
    supabaseAdmin.from('blog_posts').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('app_settings').select('*'),
    supabaseAdmin.from('job_clicks').select('*').order('created_at', { ascending: false }).limit(3000),
  ]);

  const candidatesData = candidatesList || [];
  const profilesData = profilesList || [];

  // Parse app_settings into a clean key-value object
  const appSettings: Record<string, any> = {};
  if (appSettingsRes?.data) {
    appSettingsRes.data.forEach((item: any) => {
      appSettings[item.key] = item.value;
    });
  }

  // Combine candidates and candidate_profiles seamlessly so 100% of candidates appear
  const profileMap = new Map<string, any>(profilesData.map((p: any) => [p.id, p]));
  const seenIds = new Set<string>();

  const mergedCandidates: any[] = candidatesData.map((c: any) => {
    seenIds.add(c.id);
    const prof = profileMap.get(c.id);
    return {
      id: c.id,
      email: c.email || '',
      full_name: c.full_name || c.name || prof?.full_name || (c.email ? c.email.split('@')[0] : 'Candidate'),
      current_title: c.job_title || c.current_title || prof?.current_title || 'Professional',
      title_category: prof?.title_category || c.industry || '',
      country: c.country || prof?.country || 'Unknown',
      city: c.city || prof?.city || c.location || '',
      location: c.location || prof?.city || c.city || '',
      device_type: c.device_type || prof?.device_type || 'desktop',
      experience_years: c.experience_years ?? prof?.experience_years ?? 0,
      skills: (Array.isArray(prof?.skills) && prof.skills.length > 0) ? prof.skills : (c.skills || []),
      completeness_score: prof?.completeness_score || (c.skills?.length ? 85 : 70),
      consent_recruiter_share: prof?.consent_recruiter_share ?? true,
      consent_email_jobs: prof?.consent_email_jobs ?? true,
      consent_analytics: prof?.consent_analytics ?? true,
      opted_in_at: c.opted_in_at || c.created_at || prof?.consent_at || prof?.created_at,
      created_at: c.created_at || c.opted_in_at || prof?.created_at,
      updated_at: c.updated_at || prof?.updated_at,
      resume_data: c.resume_data || prof?.resume_data,
    };
  });

  // Include any orphan profiles from candidate_profiles
  profilesData.forEach((p: any) => {
    if (!seenIds.has(p.id)) {
      seenIds.add(p.id);
      mergedCandidates.push({
        id: p.id,
        email: p.email || '',
        full_name: p.full_name || 'Candidate',
        current_title: p.current_title || 'Professional',
        title_category: p.title_category || '',
        country: p.country || 'Unknown',
        city: p.city || '',
        location: p.city || '',
        device_type: p.device_type || 'desktop',
        experience_years: p.experience_years ?? 0,
        skills: p.skills || [],
        completeness_score: p.completeness_score || 80,
        consent_recruiter_share: p.consent_recruiter_share ?? true,
        consent_email_jobs: p.consent_email_jobs ?? true,
        consent_analytics: p.consent_analytics ?? true,
        opted_in_at: p.consent_at || p.created_at,
        created_at: p.created_at,
        updated_at: p.updated_at,
        resume_data: p.resume_data,
      });
    }
  });

  // Sort strictly newest-to-oldest
  mergedCandidates.sort((a, b) => {
    const timeA = new Date(a.opted_in_at || a.created_at || 0).getTime();
    const timeB = new Date(b.opted_in_at || b.created_at || 0).getTime();
    return timeB - timeA;
  });

  return (
    <AdminDashboard
      candidates={mergedCandidates}
      analytics={analytics.data || []}
      aiLogs={aiLogs.data || []}
      siteSettings={siteSettings.data || {}}
      featureFlags={featureFlags.data || []}
      blogPosts={blogPosts.data || []}
      appSettings={appSettings}
      jobClicks={jobClicksRes.data || []}
    />
  );
}