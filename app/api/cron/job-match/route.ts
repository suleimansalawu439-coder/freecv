import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'edge';

const PROXY_URL = process.env.CAREERJET_PROXY_URL || 'https://proxy.ojnfoundation.org/careerjet.php';
const PROXY_SECRET = process.env.CAREERJET_PROXY_SECRET || '';
const BREVO_KEY = process.env.BREVO_API_KEY || '';
const AFF_TAG = process.env.CAREERJET_AFFILIATE_TAG || '';   // e.g. "t=12345"
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'noreply@cvyon.com';
const PER_RUN_CAP = 30;

const CODE2NAME: Record<string, string> = {
  NG: 'Nigeria', GH: 'Ghana', KE: 'Kenya', ZA: 'South Africa', GB: 'United Kingdom',
  US: 'United States', CA: 'Canada', IN: 'India', AE: 'United Arab Emirates',
  DE: 'Germany', FR: 'France', NL: 'Netherlands', IE: 'Ireland', AU: 'Australia',
  SG: 'Singapore', EG: 'Egypt', RW: 'Rwanda', TZ: 'Tanzania', UG: 'Uganda',
};
const CODE2LOCALE: Record<string, string> = {
  NG: 'en_NG', GH: 'en_GH', KE: 'en_KE', ZA: 'en_ZA', GB: 'en_GB', US: 'en_US',
  CA: 'en_CA', IN: 'en_IN', AE: 'en_AE', DE: 'de_DE', FR: 'fr_FR', NL: 'nl_NL',
};

const searchUrl = (kw: string, loc: string) =>
  `https://www.careerjet.com/search/jobs?keywords=${encodeURIComponent(kw)}&location=${encodeURIComponent(loc)}${AFF_TAG ? '&' + AFF_TAG : ''}`;

async function fetchJobs(keywords: string, countryName: string, locale: string) {
  if (!PROXY_SECRET) return [];
  try {
    const r = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Proxy-Secret': PROXY_SECRET },
      body: JSON.stringify({ keywords, location: countryName, locale_code: locale, user_ip: '', user_agent: 'Cvyon-JobMatch/1.0', page: 1, page_size: 3 }),
    });
    if (!r.ok) return [];
    const j = await r.json();
    return j?.type === 'JOBS' && Array.isArray(j.jobs) ? j.jobs.slice(0, 3) : [];
  } catch { return []; }
}

function emailHtml(name: string, title: string, countryName: string, jobs: any[]) {
  const rows = jobs.map((j: any) => `
    <tr><td style="padding:14px 0;border-bottom:2px solid #1413121a;">
      <div style="font-family:Arial,sans-serif;font-weight:800;font-size:15px;color:#141312;">${(j.title || 'Role').replace(/</g, '&lt;')}</div>
      <div style="font-family:Arial,sans-serif;font-size:13px;color:#141312aa;margin-top:2px;">${(j.company || '').replace(/</g, '&lt;')} · ${(j.locations || countryName || 'Remote').replace(/</g, '&lt;')}</div>
    </td></tr>`).join('');
  const cta = searchUrl(title || 'jobs', countryName || 'Remote');
  return `
  <div style="background:#E8E7E1;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" align="center" style="max-width:560px;width:100%;background:#fff;border:3px solid #141312;box-shadow:8px 8px 0 #141312;">
      <tr><td style="background:#141312;padding:20px 28px;">
        <span style="font-weight:900;font-size:22px;color:#E8E7E1;letter-spacing:-0.5px;">CVYON</span>
        <span style="font-family:monospace;font-size:10px;letter-spacing:3px;color:#FF4326;text-transform:uppercase;"> · your weekly matches</span>
      </td></tr>
      <tr><td style="padding:32px 28px;">
        <h1 style="margin:0 0 12px;font-size:24px;color:#141312;">${name ? name.split(' ')[0].replace(/</g,'&lt;') + ',' : ''} ${jobs.length} role${jobs.length === 1 ? '' : 's'} matched to you.</h1>
        <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#141312aa;">Based on your profile (${(title || 'your role').replace(/</g,'&lt;')} · ${(countryName || 'your region').replace(/</g,'&lt;')}), here are fresh openings worth a look.</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr><td style="background:#FF4326;border:3px solid #141312;box-shadow:5px 5px 0 #141312;">
            <a href="${cta}" style="display:inline-block;padding:13px 24px;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;text-decoration:none;color:#141312;">See all matched roles →</a>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="border-top:3px solid #141312;padding:18px 28px;background:#E8E7E1;">
        <p style="margin:0 0 6px;font-family:monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#14131299;">You get this because you opted in to job matches.</p>
        <p style="margin:0;font-size:11px;color:#14131277;"><a href="https://cvyon.com/manage-data" style="color:#2233FF;">Manage preferences / unsubscribe</a></p>
      </td></tr>
    </table>
  </div>`;
}

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('authorization');
    const qSecret = new URL(request.url).searchParams.get('secret');
    if (auth !== `Bearer ${process.env.CRON_SECRET}` && qSecret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. ONLY candidates who consented to job emails
    const { data: profiles, error: pErr } = await supabaseAdmin
      .from('candidate_profiles')
      .select('id, full_name, current_title, skills, country, candidates(email)')
      .eq('consent_email_jobs', true)
      .order('updated_at', { ascending: false })
      .limit(PER_RUN_CAP);
    if (pErr) throw pErr;
    if (!profiles?.length) return NextResponse.json({ message: 'No consented candidates; nothing to send.' });

    let sent = 0, skipped = 0;
    for (const p of profiles as any[]) {
      try {
        const email = p.candidates?.email;
        if (!email) { skipped++; continue; }
        const code = String(p.country || '').toUpperCase().slice(0, 2);
        const countryName = CODE2NAME[code] || p.country || 'Remote';
        const locale = CODE2LOCALE[code] || 'en_US';
        const title = p.current_title || 'Professional';
        const skills = (Array.isArray(p.skills) ? p.skills : []).slice(0, 6).join(' ');
        const keywords = `${title} ${skills}`.trim();

        const jobs = await fetchJobs(keywords, countryName, locale);
        if (!jobs.length) { skipped++; continue; }

        if (BREVO_KEY) {
          const r = await fetch('https://api.brevo.com/v3/transactional/email', {
            method: 'POST',
            headers: { 'api-key': BREVO_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sender: { email: SENDER_EMAIL, name: 'Cvyon' },
              to: [{ email, name: p.full_name || '' }],
              subject: `${jobs.length} ${title} role${jobs.length === 1 ? '' : 's'} matched to your profile`,
              htmlContent: emailHtml(p.full_name || '', title, countryName, jobs),
              tags: ['job-match'],
            }),
          });
          if (!r.ok) { console.warn('brevo send failed', email, r.status); skipped++; continue; }
        } else {
          console.warn('No BREVO_API_KEY; would send to', email);
        }

        // metric
        await supabaseAdmin.from('analytics_events').insert({
          event_type: 'job_match_email_sent', session_id: 'cron-job-match',
          country: code || 'UNKNOWN', metadata: { candidate_id: p.id, jobs: jobs.length },
        });
        sent++;
      } catch (e) { console.error('per-candidate error', e); skipped++; }
    }

    return NextResponse.json({ success: true, sent, skipped, considered: profiles.length });
  } catch (error: any) {
    console.error('job-match cron error', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}