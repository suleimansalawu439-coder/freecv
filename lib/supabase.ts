import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const mockClient = (table: string) => ({
  insert: async (data: any) => {
    console.warn(`[Supabase Mock] Insert into ${table}:`, data);
    return { data: null, error: null };
  },
  select: () => ({
    order: () => ({
      limit: async () => {
        console.warn(`[Supabase Mock] Select from ${table}`);
        return { data: [], error: null };
      }
    }),
    returns: () => ({
      then: (res: any) => res({ data: [], error: null }) // mock basic promise
    })
  })
});

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
