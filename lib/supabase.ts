import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const mockClient = (table: string) => {
  const getMockData = () => {
    switch (table) {
      case 'feature_flags':
        return [
          { key: 'docx_export', is_enabled: true, description: 'Enable DOCX Export' },
          { key: 'ai_rewriter', is_enabled: true, description: 'Enable AI Rewriter' },
          { key: 'linkedin_import', is_enabled: false, description: 'Enable LinkedIn Import' }
        ];
      case 'blog_posts':
        return [
          { id: '1', slug: 'how-to-write-resume', title: 'How to Write a Resume', is_published: true, created_at: new Date().toISOString() }
        ];
      case 'ai_usage_logs':
        return [
          { id: '1', feature: 'ats_score', prompt_tokens: 1500, completion_tokens: 200, created_at: new Date().toISOString() },
          { id: '2', feature: 'rewrite', prompt_tokens: 800, completion_tokens: 150, created_at: new Date().toISOString() }
        ];
      case 'seo_pages':
        return [
          { id: '1', slug: 'software-engineer', title: 'Software Engineer', views: 1250, created_at: new Date().toISOString() }
        ];
      case 'export_logs':
        return [
          { id: '1', format: 'pdf', template_id: 'Executive', created_at: new Date().toISOString() }
        ];
      case 'site_settings':
        return [
          { id: 1, site_name: 'FreeCV', maintenance_mode: false }
        ];
      default:
        return [];
    }
  };

  const chainable: any = {
    eq: () => chainable,
    order: () => chainable,
    limit: () => chainable,
    single: () => ({
      then: (resolve: any) => resolve({ data: getMockData()[0] || null, error: null })
    }),
    then: (resolve: any) => resolve({ data: getMockData(), error: null })
  };

  return {
    insert: async (data: any) => {
      console.warn(`[Supabase Mock] Insert into ${table}:`, data);
      return { data: null, error: null };
    },
    select: () => chainable,
    update: () => chainable,
    delete: () => chainable
  };
};

// Client for public inserts
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { from: mockClient } as any;

// Server-side admin client to bypass RLS
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : { from: mockClient } as any;
