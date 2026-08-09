import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.SUPABASE_URL || 
  '';

const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.SUPABASE_ANON_KEY || 
  process.env.SUPABASE_KEY || 
  '';

const supabaseServiceKey = 
  process.env.SUPABASE_SERVICE_ROLE_KEY || 
  process.env.SUPABASE_SERVICE_KEY || 
  process.env.SUPABASE_SECRET_KEY || 
  process.env.SUPABASE_SERVICE_ROLE || 
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || 
  '';

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

  const createFilterQuery = (dataList: any[]) => {
    let current = [...dataList];
    const builder: any = {
      eq: (col: string, val: any) => {
        current = current.filter((item: any) => item[col] === val);
        return builder;
      },
      ilike: (col: string, val: string) => {
        const needle = (val || '').replace(/%/g, '').toLowerCase();
        current = current.filter((item: any) => String(item[col] || '').toLowerCase().includes(needle));
        return builder;
      },
      textSearch: (_col: string, _query: string) => builder,
      order: (col: string, opts?: { ascending?: boolean }) => {
        const asc = opts?.ascending !== false;
        current.sort((a, b) => {
          const valA = a[col] ?? 0;
          const valB = b[col] ?? 0;
          return asc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
        });
        return builder;
      },
      limit: (n: number) => {
        current = current.slice(0, n);
        return builder;
      },
      range: (from: number, to: number) => {
        current = current.slice(from, to + 1);
        return builder;
      },
      select: (_cols = '*') => builder,
      maybeSingle: () => Promise.resolve({ data: current[0] || null, error: null }),
      single: () => Promise.resolve({ data: current[0] || null, error: null }),
      then: (resolve: (val: { data: any[], error: null, count: number }) => void) => {
        resolve({ data: current, error: null, count: current.length });
      },
      catch: (resolve: (err: unknown) => void) => resolve(null)
    };
    return builder;
  };

  return {
    insert: (data: any) => {
      const items = Array.isArray(data) ? data : [data];
      const inserted = items.map((it: any) => ({
        id: it.id || `mock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        created_at: it.created_at || new Date().toISOString(),
        ...it
      }));
      if (!mockStore[table]) mockStore[table] = [];
      mockStore[table].push(...inserted);

      return {
        select: (_fields?: string) => ({
          maybeSingle: () => Promise.resolve({ data: inserted[0] || null, error: null }),
          single: () => Promise.resolve({ data: inserted[0] || null, error: null }),
          then: (resolve: (val: { data: any[], error: null }) => void) => resolve({ data: inserted, error: null }),
          catch: (resolve: (err: unknown) => void) => resolve(null)
        }),
        maybeSingle: () => Promise.resolve({ data: inserted[0] || null, error: null }),
        single: () => Promise.resolve({ data: inserted[0] || null, error: null }),
        then: (resolve: (val: { data: any[], error: null }) => void) => resolve({ data: inserted, error: null }),
        catch: (resolve: (err: unknown) => void) => resolve(null)
      };
    },
    upsert: (data: any, options?: any) => {
      const items = Array.isArray(data) ? data : [data];
      const conflictKey = options?.onConflict;
      const saved: any[] = [];
      if (!mockStore[table]) mockStore[table] = [];

      for (const it of items) {
        const key = conflictKey ? it[conflictKey] : (it.id || it.email || it.key);
        const idx = mockStore[table].findIndex((x: any) => {
          if (conflictKey && conflictKey in it) return x[conflictKey] === it[conflictKey];
          return (key && (x.id === key || x.email === key || x.key === key));
        });
        const record = { id: it.id || `mock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`, created_at: new Date().toISOString(), ...it };
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
        maybeSingle: () => Promise.resolve({ data: saved[0] || null, error: null }),
        single: () => Promise.resolve({ data: saved[0] || null, error: null }),
        then: (resolve: (val: { data: any[], error: null }) => void) => resolve({ data: saved, error: null }),
        catch: (resolve: (err: unknown) => void) => resolve(null)
      };
    },
    select: (_cols = '*', opts?: { count?: string; head?: boolean }) => {
      const data = getMockData();
      if (opts?.head) {
        return {
          ...createFilterQuery([]),
          then: (resolve: (val: { data: null, error: null, count: number }) => void) => {
            resolve({ data: null, error: null, count: data.length });
          }
        };
      }
      return createFilterQuery(data);
    },
    update: (data: any) => {
      return {
        eq: (col: string, val: any) => {
          let updated: any[] = [];
          if (mockStore[table]) {
            mockStore[table] = mockStore[table].map((item: any) => {
              if (item[col] === val) {
                const res = { ...item, ...data, updated_at: new Date().toISOString() };
                updated.push(res);
                return res;
              }
              return item;
            });
          }
          return {
            then: (resolve: (val: { data: any[] | null, error: null }) => void) => resolve({ data: updated, error: null })
          };
        }
      };
    },
    delete: () => {
      return {
        eq: (col: string, val: any) => {
          if (val !== undefined && mockStore[table]) {
            mockStore[table] = mockStore[table].filter((item: any) => item[col] !== val);
          }
          return {
            then: (resolve: (val: { data: any[] | null, error: null }) => void) => resolve({ data: null, error: null })
          };
        }
      };
    },
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
const effectiveServiceKey = supabaseServiceKey || supabaseAnonKey;
const isRealAdmin = !!(supabaseUrl && supabaseServiceKey);
const isRealDb = !!(supabaseUrl && (supabaseServiceKey || supabaseAnonKey));

// Warn or throw when admin client falls back to anon key (RLS will block reads/updates)
if (typeof window === 'undefined' && supabaseUrl && !supabaseServiceKey && supabaseAnonKey) {
  const msg = '\n🔴 [supabase] CRITICAL WARNING: SUPABASE_SERVICE_ROLE_KEY is missing!\n' +
              '   supabaseAdmin is using the anon key, which means RLS policies will block SELECT/UPDATE on candidates.\n' +
              '   Set SUPABASE_SERVICE_ROLE_KEY in your environment variables.\n' +
              '   Find it in: Supabase Dashboard → Project Settings → API → service_role secret key\n';
  
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build') {
    throw new Error('CRITICAL: Supabase service role key is missing in production. Halting to prevent silent data loss.');
  } else {
    console.warn(msg);
  }
}

export const supabaseAdmin: SupabaseClient<any> = globalForSupabase.supabaseAdminClient || (
  isRealDb
    ? createClient<any>(supabaseUrl, effectiveServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
    : { from: mockClient, rpc: async () => ({ data: null, error: null }) } as unknown as SupabaseClient<any>
);

// Cache globally to prevent connection churn in ALL environments
globalForSupabase.supabaseClient = supabase;
globalForSupabase.supabaseAdminClient = supabaseAdmin;

/** True when supabaseAdmin or supabase is connected to a real database, false when using mock */
export const isSupabaseConfigured = isRealDb;

// Warn loudly on server-side when using mock clients or throw in production runtime
if (typeof window === 'undefined' && !isRealDb) {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build') {
    console.error('CRITICAL: Supabase service role key or URL is missing in production!');
  } else {
    console.warn('\n⚠️  [supabase] RUNNING WITH MOCK CLIENT — no database writes will persist!');
    console.warn('   Set NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY) in env.\n');
  }
}
