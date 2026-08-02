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
  if (token) { try { ok = !!(await verifyAdminToken(token)); } catch { ok = false; } }
  if (!ok) redirect('/admin/login');

  const [candidates, analytics, aiLogs, siteSettings, featureFlags, blogPosts] = await Promise.all([
    supabaseAdmin.from('candidate_profiles').select('*').order('updated_at', { ascending: false }),
    supabaseAdmin.from('analytics_events').select('*').order('created_at', { ascending: false }).limit(5000),
    supabaseAdmin.from('ai_usage_logs').select('*').order('created_at', { ascending: false }).limit(3000),
    supabaseAdmin.from('site_settings').select('*').single(),
    supabaseAdmin.from('feature_flags').select('*').order('key'),
    supabaseAdmin.from('blog_posts').select('*').order('created_at', { ascending: false }),
  ]);

  return (
    <AdminDashboard
      candidates={candidates.data || []}
      analytics={analytics.data || []}
      aiLogs={aiLogs.data || []}
      siteSettings={siteSettings.data || {}}
      featureFlags={featureFlags.data || []}
      blogPosts={blogPosts.data || []}
    />
  );
}