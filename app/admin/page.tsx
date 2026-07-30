import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Original Data Fetches
  const { data: candidates, error: candidatesError } = await supabaseAdmin
    .from('candidate_profiles')
    .select('*')
    .order('updated_at', { ascending: false });

  if (candidatesError) console.error('Error fetching candidate profiles:', candidatesError);

  const { data: analytics, error: analyticsError } = await supabaseAdmin
    .from('analytics_events')
    .select('*')
    .order('created_at', { ascending: false });

  if (analyticsError) console.error('Error fetching analytics:', analyticsError);

  const { data: aiLogs } = await supabaseAdmin
    .from('ai_usage_logs')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: siteSettings } = await supabaseAdmin.from('site_settings').select('*').single();
  const { data: featureFlags } = await supabaseAdmin.from('feature_flags').select('*').order('key');

  return (
    <AdminDashboard 
      candidates={candidates || []} 
      analytics={analytics || []} 
      aiLogs={aiLogs || []}
      siteSettings={siteSettings || {}}
      featureFlags={featureFlags || []}
    />
  );
}
