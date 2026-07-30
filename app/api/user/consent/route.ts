import { NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, consents } = await req.json();

    // Verify session
    const authHeader = req.headers.get('Authorization');
    // For standard supabase auth, we can just grab it if we passed the session token
    // Actually, in the server route, we can just use supabase auth by extracting the token
    const token = authHeader?.split(' ')[1];
    let userEmail = email;

    if (token) {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      userEmail = user.email;
    }

    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update candidate_profiles using admin bypass since it's restricted
    // We need to update by email, but candidate_profiles is joined via candidate ID
    const { data: candidate } = await supabaseAdmin
      .from('candidates')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (!candidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    const { error } = await supabaseAdmin
      .from('candidate_profiles')
      .update({
        consent_recruiter_share: consents.consent_recruiter_share,
        consent_email_jobs: consents.consent_email_jobs,
        consent_analytics: consents.consent_analytics,
        updated_at: new Date().toISOString()
      })
      .eq('id', candidate.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Consent Update Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
