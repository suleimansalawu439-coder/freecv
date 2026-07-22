import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Original Data Fetches
  const { data: candidates, error: candidatesError } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .order('opted_in_at', { ascending: false });

  if (candidatesError) console.error('Error fetching candidates:', candidatesError);

  const { data: analytics, error: analyticsError } = await supabaseAdmin
    .from('analytics_events')
    .select('*')
    .order('created_at', { ascending: false });

  if (analyticsError) console.error('Error fetching analytics:', analyticsError);

  const { data: blogPosts, error: blogPostsError } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (blogPostsError) console.error('Error fetching blog posts:', blogPostsError);

  const { data: subscribers, error: subscribersError } = await supabaseAdmin
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  if (subscribersError) console.error('Error fetching subscribers:', subscribersError);

  // New Features Data Fetches
  const { data: aiLogs } = await supabaseAdmin.from('ai_usage_logs').select('*').order('created_at', { ascending: false });
  const { data: exportLogs } = await supabaseAdmin.from('export_logs').select('*').order('created_at', { ascending: false });
  const { data: seoPages } = await supabaseAdmin.from('seo_pages').select('*').order('views', { ascending: false });
  const { data: siteSettings } = await supabaseAdmin.from('site_settings').select('*').single();
  const { data: featureFlags } = await supabaseAdmin.from('feature_flags').select('*').order('key');

  return (
    <AdminDashboard 
      candidates={candidates || []} 
      analytics={analytics || []} 
      initialBlogPosts={blogPosts || []}
      subscribers={subscribers || []}
      aiLogs={aiLogs || []}
      exportLogs={exportLogs || []}
      seoPages={seoPages || []}
      siteSettings={siteSettings || {}}
      featureFlags={featureFlags || []}
    />
  );
}
