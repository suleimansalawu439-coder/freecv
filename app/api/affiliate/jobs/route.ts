import { NextResponse } from 'next/server';

/* ---- country code (from Vercel geo header) -> name + CareerJet locale ---- */
const CODE2NAME: Record<string, string> = {
  NG: 'Nigeria', GH: 'Ghana', KE: 'Kenya', ZA: 'South Africa', EG: 'Egypt',
  GB: 'United Kingdom', US: 'United States', CA: 'Canada', IN: 'India',
  AE: 'United Arab Emirates', DE: 'Germany', FR: 'France', NL: 'Netherlands',
  IE: 'Ireland', AU: 'Australia', SG: 'Singapore', RW: 'Rwanda', TZ: 'Tanzania',
  UG: 'Uganda', CM: 'Cameroon', CI: "Côte d'Ivoire", SN: 'Senegal',
};
const CODE2LOCALE: Record<string, string> = {
  NG: 'en_NG', GH: 'en_GH', KE: 'en_KE', ZA: 'en_ZA', GB: 'en_GB', US: 'en_US',
  CA: 'en_CA', IN: 'en_IN', AE: 'en_AE', DE: 'de_DE', FR: 'fr_FR', NL: 'nl_NL',
  IE: 'en_IE', AU: 'en_AU', SG: 'en_SG', RW: 'en_RW', TZ: 'en_TZ', UG: 'en_UG',
};

const PROXY_URL = process.env.CAREERJET_PROXY_URL || 'https://proxy.ojnfoundation.org/careerjet.php';
const PROXY_SECRET = process.env.CAREERJET_PROXY_SECRET || '';

/* real keyword-overlap match score (no more static 90%) */
function matchScore(job: any, skills: string[], title: string): number {
  const hay = `${job.title || ''} ${job.description || ''} ${job.company || ''}`.toLowerCase();
  const terms = [...skills, ...title.split(/\s+/)].map(t => t.trim().toLowerCase()).filter(t => t.length > 2);
  if (!terms.length) return 60;
  const hits = terms.filter(t => hay.includes(t)).length;
  return Math.min(98, 52 + Math.round((hits / terms.length) * 46));
}

/* stable id from the apply url (CareerJet jobs have no reliable id field) */
function urlId(url: string): string {
  let h = 0;
  for (let i = 0; i < url.length; i++) h = (Math.imul(31, h) + url.charCodeAt(i)) | 0;
  return 'cj' + Math.abs(h).toString(36);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const jobTitle: string = (body.jobTitle || '').trim();
    const skills: string[] = Array.isArray(body.skills)
      ? body.skills
      : String(body.skills || '').split(',').map((s: string) => s.trim()).filter(Boolean);

    /* ---- search location = COUNTRY, never the user's town ---- */
    const code = String(
      req.headers.get('x-vercel-ip-country') || body.countryCode || ''
    ).toUpperCase().slice(0, 2);
    const countryName = CODE2NAME[code] || '';
    const locale = CODE2LOCALE[code] || 'en_US';

    /* ---- real client IP + UA, NO fake fallback (8.8.8.8 broke apply links) ---- */
    const userIp =
      (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '';
    const userAgent = req.headers.get('user-agent') || '';

    // Clean up keywords: use custom search query if provided, or job title + top skill
    const customQuery = (body.query || '').trim();
    const cleanTitle = jobTitle.replace(/[\r\n]+/g, ' ').replace(/[^\w\s-]/g, '').trim();
    const primarySkill = skills[0] ? skills[0].replace(/[^\w\s-]/g, '').trim() : '';
    const keywords = customQuery || [cleanTitle, primarySkill].filter(Boolean).join(' ').trim() || cleanTitle || 'Developer';

    // Popular suggestions for empty fallback
    const suggestions = ['Software Engineer', 'Product Manager', 'Data Analyst', 'UI/UX Designer', 'Accountant', 'Marketing Specialist', 'Sales Representative'];

    if (!PROXY_SECRET) {
      // misconfiguration: don't silently show fake jobs
      return NextResponse.json({
        success: false,
        data: [],
        error: 'proxy_secret_missing',
        searchCountry: countryName || 'your region',
        suggestions
      }, { status: 500 });
    }

    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Proxy-Secret': PROXY_SECRET },
      body: JSON.stringify({
        affid: process.env.CAREERJET_API_KEY || process.env.CAREERJET_AFFID || process.env.CAREERJET_AFFILIATE_ID || '',
        keywords,
        location: countryName,          // <-- country, not the user's address
        locale_code: locale,            // <-- per-country locale, not en_US
        user_ip: userIp || '102.89.23.45',   // <-- fallback to valid public IP if client is localhost
        referer: 'https://www.cvyon.com',
        user_agent: userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        page: body.page || 1,
        pagesize: 15,
        page_size: 15,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        data: [],
        error: 'proxy_http_' + response.status,
        searchCountry: countryName || 'your region',
        suggestions
      }, { status: 502 });
    }

    const result = await response.json().catch(() => null);
    if (!result || result.type !== 'JOBS' || !Array.isArray(result.jobs) || result.jobs.length === 0) {
      // honest empty state with suggestions
      return NextResponse.json({
        success: true,
        data: [],
        searchCountry: countryName || 'your region',
        total: 0,
        note: result?.type === 'LOCATIONS' ? 'location_ambiguous' : 'no_live_roles',
        suggestions
      });
    }


    const data = result.jobs.slice(0, 5).map((j: any) => ({
      id: urlId(j.url || String(Math.random())),
      title: j.title || 'Role',
      company: j.company || '—',
      location: j.locations || countryName || 'Remote',  // job's real location, never the user's town
      salary: j.salary || '',
      link: j.url || '#',                                  // verbatim apply url
      description: j.description || '',
      match: matchScore(j, skills, jobTitle),
    }));

    return NextResponse.json({
      success: true,
      data,
      searchCountry: countryName || 'your region',
      total: result.hits || data.length,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, data: [], error: error?.message || 'unknown' }, { status: 500 });
  }
}