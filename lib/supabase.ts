import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const mockClient = (table: string) => {
  const mockStore: Record<string, any[]> = (globalThis as any).__mockSupabaseStore || ((globalThis as any).__mockSupabaseStore = {});
  if (!mockStore[table]) mockStore[table] = [];

  const getMockData = () => {
    if (mockStore[table] && mockStore[table].length > 0) {
      return mockStore[table];
    }
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
          { id: 1, site_name: 'Cvyon', maintenance_mode: false }
        ];
      case 'candidates':
        return mockStore['candidates'] || [];
      case 'candidate_profiles':
        return mockStore['candidate_profiles'] || [];
      default:
        return mockStore[table] || [];
    }
  };

  const chainable: any = {
    eq: (col: string, val: any) => {
      return {
        ...chainable,
        then: (resolve: (val: { data: any[], error: null }) => void) => {
          const list = getMockData().filter((item: any) => item[col] === val);
          resolve({ data: list, error: null });
        },
        maybeSingle: () => {
          const list = getMockData().filter((item: any) => item[col] === val);
          return Promise.resolve({ data: list[0] || null, error: null });
        },
        single: () => {
          const list = getMockData().filter((item: any) => item[col] === val);
          return Promise.resolve({ data: list[0] || null, error: null });
        }
      };
    },
    order: () => chainable,
    limit: () => chainable,
    select: () => chainable,
    maybeSingle: () => Promise.resolve({ data: getMockData()[0] || null, error: null }),
    single: () => Promise.resolve({ data: getMockData()[0] || null, error: null }),
    then: (resolve: (val: { data: any[], error: null }) => void) => resolve({ data: getMockData(), error: null }),
    catch: (resolve: (err: unknown) => void) => resolve(null)
  };

  return {
    insert: async (data: any) => {
      const items = Array.isArray(data) ? data : [data];
      const inserted = items.map((it: any) => ({ id: it.id || `mock_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`, created_at: new Date().toISOString(), ...it }));
      mockStore[table].push(...inserted);
      return { data: inserted, error: null };
    },
    upsert: (data: any, options?: any) => {
      const items = Array.isArray(data) ? data : [data];
      const conflictKey = options?.onConflict;
      const saved: any[] = [];
      for (const it of items) {
        const key = conflictKey ? it[conflictKey] : (it.id || it.email || it.key);
        const idx = mockStore[table].findIndex((x: any) => {
          if (conflictKey && conflictKey in it) return x[conflictKey] === it[conflictKey];
          return (key && (x.id === key || x.email === key || x.key === key));
        });
        const record = { id: it.id || `mock_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`, created_at: new Date().toISOString(), ...it };
        if (idx >= 0) {
          mockStore[table][idx] = { ...mockStore[table][idx], ...record };
          saved.push(mockStore[table][idx]);
        } else {
          mockStore[table].push(record);
          saved.push(record);
        }
      }
      return {
        select: (_fields?: string) => ({
          maybeSingle: () => Promise.resolve({ data: saved[0] || null, error: null }),
          single: () => Promise.resolve({ data: saved[0] || null, error: null }),
          then: (resolve: (val: { data: any[], error: null }) => void) => resolve({ data: saved, error: null })
        }),
        then: (resolve: (val: { data: any[], error: null }) => void) => resolve({ data: saved, error: null })
      };
    },
    select: () => chainable,
    update: (updates: any) => ({
      eq: (col: string, val: any) => {
        mockStore[table] = mockStore[table].map((item: any) => item[col] === val ? { ...item, ...updates } : item);
        return Promise.resolve({ data: null, error: null });
      }
    }),
    delete: () => ({
      eq: (col: string, val: any) => {
        mockStore[table] = mockStore[table].filter((item: any) => item[col] !== val);
        return Promise.resolve({ data: null, error: null });
      }
    }),
    rpc: async () => ({ data: null, error: null })
  };
};

// Global singleton references to prevent client connection churn in serverless environments
const globalForSupabase = globalThis as unknown as {
  supabaseClient?: SupabaseClient<any>;
  supabaseAdminClient?: SupabaseClient<any>;
};

// Client for public inserts
export const supabase: SupabaseClient<any> = globalForSupabase.supabaseClient || (
  supabaseUrl && supabaseAnonKey
    ? createClient<any>(supabaseUrl, supabaseAnonKey)
    : { 
        from: mockClient,
        auth: {
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          getUser: async () => ({ data: { user: null }, error: null }),
          signInWithOAuth: async () => ({ data: null, error: null }),
          signOut: async () => ({ error: null })
        }
      } as unknown as SupabaseClient<any>
);

// Server-side admin client to bypass RLS
const isRealAdmin = !!(supabaseUrl && supabaseServiceKey);
export const supabaseAdmin: SupabaseClient<any> = globalForSupabase.supabaseAdminClient || (
  isRealAdmin
    ? createClient<any>(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
    : { from: mockClient, rpc: async () => ({ data: null, error: null }) } as unknown as SupabaseClient<any>
);

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabaseClient = supabase;
  globalForSupabase.supabaseAdminClient = supabaseAdmin;
}

/** True when supabaseAdmin is connected to a real database, false when using mock */
export const isSupabaseConfigured = isRealAdmin;

// Warn loudly on server-side when using mock clients or throw in production runtime
if (typeof window === 'undefined' && !isRealAdmin) {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build') {
    console.error('CRITICAL: Supabase service role key or URL is missing in production!');
  } else {
    console.warn('\n⚠️  [supabase] RUNNING WITH MOCK CLIENT — no database writes will persist!');
    console.warn('   Set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in env.\n');
  }
}

