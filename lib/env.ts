/**
 * Safe, centralized environment variable validator and accessor.
 * Validates required and optional configuration without leaking secret values.
 */

export interface EnvConfig {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  JWT_SECRET?: string;
  GEMINI_API_KEY?: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
  PAYSTACK_SECRET_KEY?: string;
  ADMIN_PASSWORD?: string;
}

export function getEnv(): EnvConfig {
  return {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  };
}

export function validateEnvironment(): { isValid: boolean; missing: string[] } {
  const requiredOnServer = ['JWT_SECRET', 'NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];
  const missing: string[] = [];

  for (const key of requiredOnServer) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0 && process.env.NODE_ENV !== 'test') {
    console.warn(`[Env Warning] Missing configuration keys: ${missing.join(', ')}`);
  }

  return {
    isValid: missing.length === 0,
    missing,
  };
}
