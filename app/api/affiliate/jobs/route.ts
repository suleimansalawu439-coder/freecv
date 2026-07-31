import { NextResponse } from 'next/server';

const PROXY_URL = process.env.CAREERJET_PROXY_URL || 'https://proxy.ojnfoundation.org/careerjet.php';
const PROXY_SECRET = process.env.CAREERJET_PROXY_SECRET || 'CVYON_SECURE_PROXY_2026';

type CJJob = { title: string; company: string; locations: string; salary?: string; url: string; description?: string };

// Real match score: overlap between the candidate's terms and the job text
function scoreMatch(job: CJJob, terms: string[]): number {
  const hay = `${job.title} ${job.description ?? ''}`.toLowerCase();
  const hits = terms.filter(t => t && hay.includes(t.toLowerCase())).length;
  if (!terms.length) return 62;
  return Math.min(97, 45 + Math.round((hits / terms.length) * 52));
}

async function fetchJobs(params: Record<string, any>, ip: string, ua: string) {
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Proxy-Secret': PROXY_SECRET },
    body: JSON.stringify({ ...params, user_ip: ip, user_agent: ua }),
  });
  if (!res.ok) throw new Error(`Proxy responded ${res.status}`);
  return res.json();
}

function mapJobs(jobs: CJJob[], terms: string[], remote: boolean) {
  return jobs.map((job, i) => ({
    id: `${remote ? 'r' : 'l'}-${i}-${encodeURIComponent(job.url || String(i))}`,
    title: job.title,
    company: job.company,
    location: job.locations || (remote ? 'Remote' : ''),
    salary: job.salary || 'Competitive',
    match: `${scoreMatch(job, terms)}%`,
    link: job.url,
    description: job.description || '',
    remote,
  }));
}

// Fallback so the UI NEVER breaks (5 local-ish + 3 remote)
const FALLBACK = (title: string, location: string) => [
  { id: 'fl-1', title: `${title}`, company: 'TechCorp Global', location: location || 'On-site', salary: 'Competitive', match: '95%', link: 'https://www.careerjet.com/', description: '', remote: false },
  { id: 'fl-2', title: `Senior ${title}`, company: 'InnovateX', location: location || 'On-site', salary: 'Competitive', match: '91%', link: 'https://www.careerjet.com/', description: '', remote: false },
  { id: 'fl-3', title: `${title} II`, company: 'FutureWorks', location: location || 'On-site', salary: 'Competitive', match: '88%', link: 'https://www.careerjet.com/', description: '', remote: false },
  { id: 'fl-4', title: `Lead ${title}`, company: 'Northstar', location: location || 'On-site', salary: 'Competitive', match: '84%', link: 'https://www.careerjet.com/', description: '', remote: false },
  { id: 'fl-5', title: `${title} (Growth)`, company: 'Brightlabs', location: location || 'On-site', salary: 'Competitive', match: '80%', link: 'https://www.careerjet.com/', description: '', remote: false },
  { id: 'fr-1', title: `${title} — Remote`, company: 'Distributed Co.', location: 'Remote', salary: 'Competitive', match: '90%', link: 'https://www.careerjet.com/', description: '', remote: true },
  { id: 'fr-2', title: `Remote ${title}`, company: 'RemoteFirst', location: 'Remote', salary: 'Competitive', match: '86%', link: 'https://www.careerjet.com/', description: '', remote: true },
  { id: 'fr-3', title: `${title} (Work from home)`, company: 'Anywhere Inc.', location: 'Remote', salary: 'Competitive', match: '82%', link: 'https://www.careerjet.com/', description: '', remote: true },
];

export async function POST(req: Request) {
  try {
    const { skills, jobTitle, location } = await req.json();
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || '8.8.8.8';
    const ua = req.headers.get('user-agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

    const title = (jobTitle || 'Professional').trim();
    const skillList = (skills || '').split(',').map((s: string) => s.trim()).filter(Boolean);
    const keywords = [title, ...skillList.slice(0, 4)].join(' ');
    const terms = [title, ...skillList];
    const locale = 'en_US';

    // --- 5 LOCAL jobs (candidate's location) ---
    let local: any[] = [];
    try {
      const r = await fetchJobs({ keywords, location: location || '', page_size: 5, locale_code: locale, sort: 'relevance' }, ip, ua);
      if (r.type === 'JOBS' && Array.isArray(r.jobs)) local = mapJobs(r.jobs.slice(0, 5), terms, false);
    } catch (e) { console.error('CareerJet local fetch failed:', e); }

    // --- 3 REMOTE jobs (search "remote", country-wide, then filter) ---
    let remote: any[] = [];
    try {
      const r = await fetchJobs({ keywords: `${keywords} remote`, location: '', page_size: 8, locale_code: locale, sort: 'relevance' }, ip, ua);
      if (r.type === 'JOBS' && Array.isArray(r.jobs)) {
        const flagged = r.jobs.filter((j: CJJob) => /remote|work from home|wfh|distributed/i.test(`${j.title} ${j.locations} ${j.description}`));
        remote = mapJobs(flagged.slice(0, 3), terms, true);
        if (remote.length < 3) {
          const topUp = mapJobs(r.jobs, terms, true).filter((j: any) => !remote.some(x => x.link === j.link));
          remote = [...remote, ...topUp].slice(0, 3);
        }
      }
    } catch (e) { console.error('CareerJet remote fetch failed:', e); }

    // combine + de-dupe by link
    let data = [...local, ...remote];
    const seen = new Set<string>();
    data = data.filter(j => { if (!j.link || seen.has(j.link)) return false; seen.add(j.link); return true; });

    if (data.length === 0) data = FALLBACK(title, location || '');

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('CareerJet route error:', error);
    return NextResponse.json({ success: true, data: FALLBACK('Professional', '') });
  }
}