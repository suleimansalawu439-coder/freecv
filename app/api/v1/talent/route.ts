import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Helper to check bearer token
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or invalid Bearer token' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  // In a real scenario, this token maps to an active recruiter subscription.
  // We'll mock the check by looking up a subscription if we treated the token as the sub ID.
  // For now, let's just do a dummy check or allow it if a dummy token '***REMOVED***' is used.
  if (token !== process.env.B2B_API_KEY && token !== '***REMOVED***') {
    return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
  }

  const url = new URL(req.url);
  const skill = url.searchParams.get('skill');
  const limit = parseInt(url.searchParams.get('limit') || '10');

  let query = supabaseAdmin
    .from('candidate_profiles')
    .select('id, full_name, current_title, skills, country, experience_years')
    .limit(limit);

  if (skill) {
    query = query.contains('skills', [skill]);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    meta: {
      total_returned: data.length,
      timestamp: new Date().toISOString()
    },
    candidates: data
  });
}
