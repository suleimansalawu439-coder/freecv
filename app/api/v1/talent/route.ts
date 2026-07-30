import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Create a new ratelimiter, that allows 100 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
});

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or invalid Bearer token' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  // 1. Look up the API key in the database
  const { data: recruiter, error: authError } = await supabaseAdmin
    .from('recruiters')
    .select('id, api_calls_count, subscriptions(status)')
    .eq('api_key', token)
    .single();

  if (authError || !recruiter) {
    return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
  }

  // 2. Verify active subscription
  const activeSub = recruiter.subscriptions?.find((s: any) => s.status === 'active');
  if (!activeSub) {
    return NextResponse.json({ error: 'Active subscription required to access the B2B API.' }, { status: 403 });
  }

  // 3. Rate Limiting via Upstash
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const { success, limit, reset, remaining } = await ratelimit.limit(recruiter.id);
    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        }
      );
    }
  }

  // 4. Process Request
  try {
    const url = new URL(req.url);
    const queryStr = url.searchParams.get('query');
    const country = url.searchParams.get('country');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const maxLimit = Math.min(limit, 100);

    let query = supabaseAdmin
      .from('candidate_profiles')
      .select('id, full_name, current_title, skills, country, experience_years, bio, expected_salary_min, expected_salary_max')
      .eq('consent_recruiter_share', true)
      .limit(maxLimit);

    if (queryStr) {
      query = query.ilike('current_title', `%${queryStr}%`);
    }
    if (country) {
      query = query.eq('country', country);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // 5. Increment API Call Count asynchronously (don't block the response)
    supabaseAdmin.rpc('increment_api_calls', { row_id: recruiter.id }).catch((e: any) => {
      // fallback if RPC doesn't exist, just use update
      supabaseAdmin
        .from('recruiters')
        .update({ api_calls_count: (recruiter.api_calls_count || 0) + 1 })
        .eq('id', recruiter.id)
        .then();
    });

    return NextResponse.json({
      success: true,
      meta: {
        total_returned: data.length,
        timestamp: new Date().toISOString()
      },
      data: data
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
