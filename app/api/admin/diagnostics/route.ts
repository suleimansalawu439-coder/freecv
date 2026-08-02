import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * Production diagnostic endpoint — admin-only.
 * Tests every critical dependency and reports what's healthy/broken.
 * Hit: GET /api/admin/diagnostics
 */
export async function GET() {
  // Auth gate
  const token = (await cookies()).get('admin_session')?.value;
  let authed = false;
  if (token) { try { authed = !!(await verifyAdminToken(token)); } catch { authed = false; } }
  if (!authed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const checks: Record<string, any> = {};

  // ---- 1. Environment variables present? ----
  checks.env = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    CAREERJET_PROXY_SECRET: !!process.env.CAREERJET_PROXY_SECRET,
    CAREERJET_PROXY_URL: process.env.CAREERJET_PROXY_URL || '(default: proxy.ojnfoundation.org)',
    CAREERJET_API_KEY: !!(process.env.CAREERJET_API_KEY || process.env.CAREERJET_AFFID),
    GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
    JWT_SECRET: !!process.env.JWT_SECRET,
    EMAIL_SERVICE_CONFIGURED: !!(process.env.BREVO_API_KEY || process.env.RESEND_API_KEY),
    PAYSTACK_CONFIGURED: !!process.env.PAYSTACK_SECRET_KEY,
  };

  // ---- 2. Supabase connectivity ----
  try {
    const { data, error, count } = await supabaseAdmin
      .from('candidate_profiles')
      .select('id', { count: 'exact', head: true });
    checks.supabase = {
      status: error ? 'ERROR' : 'OK',
      error: error?.message || null,
      candidate_profiles_count: count ?? 0,
    };
  } catch (e: any) {
    checks.supabase = { status: 'EXCEPTION', error: e.message };
  }

  // ---- 3. Candidates table ----
  try {
    const { error, count } = await supabaseAdmin
      .from('candidates')
      .select('id', { count: 'exact', head: true });
    checks.candidates_table = {
      status: error ? 'ERROR' : 'OK',
      error: error?.message || null,
      candidates_count: count ?? 0,
    };
  } catch (e: any) {
    checks.candidates_table = { status: 'EXCEPTION', error: e.message };
  }

  // ---- 4. Analytics events table ----
  try {
    const { error, count } = await supabaseAdmin
      .from('analytics_events')
      .select('id', { count: 'exact', head: true });
    checks.analytics = {
      status: error ? 'ERROR' : 'OK',
      error: error?.message || null,
      events_count: count ?? 0,
    };
  } catch (e: any) {
    checks.analytics = { status: 'EXCEPTION', error: e.message };
  }

  // ---- 5. CareerJet proxy reachability ----
  const proxyUrl = process.env.CAREERJET_PROXY_URL || 'https://proxy.ojnfoundation.org/careerjet.php';
  const proxySecret = process.env.CAREERJET_PROXY_SECRET || '';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const headerList = await headers();
    const clientIp =
      headerList.get('x-forwarded-for')?.split(',')[0].trim() ||
      headerList.get('x-real-ip') ||
      '102.89.23.45';

    const res = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Proxy-Secret': proxySecret,
      },
      body: JSON.stringify({
        affid: process.env.CAREERJET_API_KEY || process.env.CAREERJET_AFFID || process.env.CAREERJET_AFFILIATE_ID || '',
        keywords: 'software engineer',
        location: 'United States',
        locale_code: 'en_US',
        user_ip: clientIp,
        referer: 'https://www.cvyon.com',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        page: 1,
        page_size: 3,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const body = await res.text();
    let parsed: any = null;
    try { parsed = JSON.parse(body); } catch { /* not json */ }

    checks.careerjet_proxy = {
      status: res.ok ? 'OK' : 'HTTP_' + res.status,
      http_status: res.status,
      response_type: parsed?.type || null,
      jobs_count: Array.isArray(parsed?.jobs) ? parsed.jobs.length : 0,
      error: parsed?.error || null,
      raw_preview: body.slice(0, 300),
    };
  } catch (e: any) {
    checks.careerjet_proxy = {
      status: 'EXCEPTION',
      error: e.message || e.name,
    };
  }

  // ---- 6. Is supabaseAdmin a real client or mock? ----
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  checks.supabase_client = {
    is_real: !!(supabaseUrl && supabaseKey),
    is_mock: !(supabaseUrl && supabaseKey),
    url_present: !!supabaseUrl,
    key_present: !!supabaseKey,
  };

  // ---- 7. Test opt-in write (dry run — insert + verify candidate_profiles consent + immediate delete) ----
  try {
    const testEmail = `diag-${Date.now()}@test.cvyon.internal`;
    const { data: inserted, error: insErr } = await supabaseAdmin
      .from('candidates')
      .insert({ email: testEmail, name: 'DIAGNOSTIC_TEST', full_name: 'DIAGNOSTIC_TEST' })
      .select('id')
      .single();

    if (insErr) {
      checks.write_test = { status: 'INSERT_ERROR', error: insErr.message, code: insErr.code, details: insErr.details };
    } else {
      const { error: profErr } = await supabaseAdmin
        .from('candidate_profiles')
        .upsert({
          id: inserted.id,
          full_name: 'DIAGNOSTIC_TEST',
          current_title: 'Test Engineer',
          consent_recruiter_share: true,
          consent_email_jobs: true,
          consent_analytics: true,
        }, { onConflict: 'id' });

      // Verify searchability
      const { data: found } = await supabaseAdmin
        .from('candidate_profiles')
        .select('id, consent_recruiter_share')
        .eq('id', inserted.id)
        .eq('consent_recruiter_share', true)
        .single();

      // Clean up
      await supabaseAdmin.from('candidate_profiles').delete().eq('id', inserted.id);
      await supabaseAdmin.from('candidates').delete().eq('id', inserted.id);

      if (profErr || !found) {
        checks.write_test = {
          status: 'PROFILE_CONSENT_ERROR',
          error: profErr?.message || 'Candidate profile consent verification failed'
        };
      } else {
        checks.write_test = { status: 'OK', message: 'Candidate & consent_recruiter_share stamping verified successfully' };
      }
    }
  } catch (e: any) {
    checks.write_test = { status: 'EXCEPTION', error: e.message };
  }

  // ---- Summary ----
  const allOk =
    checks.supabase?.status === 'OK' &&
    checks.candidates_table?.status === 'OK' &&
    checks.careerjet_proxy?.status === 'OK' &&
    checks.supabase_client?.is_real === true &&
    checks.write_test?.status === 'OK';

  return NextResponse.json({
    overall: allOk ? 'ALL_HEALTHY' : 'ISSUES_DETECTED',
    timestamp: new Date().toISOString(),
    checks,
  }, { status: 200 });
}
