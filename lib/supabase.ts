import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const mockClient = (table: string) => {
  const chainable: any = {
    eq: () => chainable,
    order: () => chainable,
    limit: () => chainable,
    single: () => chainable,
    then: (resolve: any) => resolve({ data: [], error: null })
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
