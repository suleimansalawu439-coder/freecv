import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Helper to check bearer token
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or invalid Bearer token' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  // We'll require a valid B2B_API_KEY for now. 
  const b2bKey = process.env.B2B_API_KEY;
  if (!b2bKey) {
    return NextResponse.json({ error: 'Server misconfiguration: missing B2B_API_KEY' }, { status: 500 });
  }

  if (token !== b2bKey) {
    return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
  }

  const url = new URL(req.url);
  const skill = url.searchParams.get('skill');
  const limit = parseInt(url.searchParams.get('limit') || '10');

  let query = supabaseAdmin
    .from('candidate_profiles')
    .select('id, full_name, current_title, skills, country, experience_years')
    .eq('consent_recruiter_share', true)
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
