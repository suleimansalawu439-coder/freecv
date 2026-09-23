import { MetadataRoute } from 'next'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

const baseUrl = 'https://cvyon.com';

const staticRoutes: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/build', priority: 0.9 },
  { path: '/ats-grader', priority: 0.8 },
  { path: '/cover-letter', priority: 0.8 },
  { path: '/recruiter', priority: 0.8 },
  { path: '/recruiter/signup', priority: 0.6 },
  { path: '/recruiter/login', priority: 0.5 },
  { path: '/pricing', priority: 0.7 },
  { path: '/blog', priority: 0.8 },
  { path: '/developers', priority: 0.6 },
  { path: '/support', priority: 0.6 },
  { path: '/privacy', priority: 0.5 },
  { path: '/terms', priority: 0.5 },
  { path: '/manage-data', priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: r.priority,
  }));

  // Dynamic blog article URLs (only when a real database is configured —
  // never emit the local mock fixture's sample URLs).
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .select('slug, updated_at, created_at')
        .eq('is_published', true);
      if (!error && Array.isArray(data)) {
        for (const post of data) {
          if (!post?.slug) continue;
          routes.push({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updated_at
              ? new Date(post.updated_at)
              : post.created_at
                ? new Date(post.created_at)
                : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
          });
        }
      }
    } catch {
      // Sitemap must never fail the build because the CMS is unreachable.
    }
  }

  return routes;
}
