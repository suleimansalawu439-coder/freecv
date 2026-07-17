import React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Fetch Candidates
  const { data: candidates, error: candidatesError } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .order('opted_in_at', { ascending: false });

  if (candidatesError) {
    console.error('Error fetching candidates:', candidatesError);
  }

  // Fetch Analytics
  const { data: analytics, error: analyticsError } = await supabaseAdmin
    .from('analytics_events')
    .select('*')
    .order('created_at', { ascending: false });

  if (analyticsError) {
    console.error('Error fetching analytics:', analyticsError);
  }

  // Fetch Blog Posts
  const { data: blogPosts, error: blogPostsError } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (blogPostsError) {
    console.error('Error fetching blog posts:', blogPostsError);
  }

  // Fetch Subscribers
  const { data: subscribers, error: subscribersError } = await supabaseAdmin
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  if (subscribersError) {
    console.error('Error fetching subscribers:', subscribersError);
  }

  return (
    <AdminDashboard 
      candidates={candidates || []} 
      analytics={analytics || []} 
      initialBlogPosts={blogPosts || []}
      subscribers={subscribers || []}
    />
  );
}
