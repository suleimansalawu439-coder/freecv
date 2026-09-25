import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MATCH_ELIGIBILITY,
  MATCH_MIN_SCORE,
  anonymizeProfile,
  buildFtsQuery,
  extractJDKeywords,
  scoreCandidate,
  tierFor,
  type ExtractedJD,
  type MatchPoolRow,
} from '../lib/recruiter-match';

const jd = (): ExtractedJD => ({
  title: 'Senior Backend Engineer',
  mustHaveSkills: ['Node.js', 'PostgreSQL', 'TypeScript'],
  niceToHaveSkills: ['Docker', 'AWS'],
  minYears: 3,
  maxYears: 6,
  location: 'Lagos',
  ai: false,
});

const profile = (over: Partial<MatchPoolRow> = {}): MatchPoolRow => ({
  id: 'p1',
  current_title: 'Senior Backend Engineer',
  summary: 'Backend engineer with 5 years building APIs.',
  city: 'Lagos',
  country: 'Nigeria',
  experience_years: 5,
  skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
  completeness_score: 80,
  ...over,
});

// --- Consent guarantee: the match pool is opt-in only. This test pins the
// eligibility contract used by the /match route AND the match_candidate_ranks
// RPC. If consent_recruiter_share is ever flipped off (the one-tap opt-out in
// /api/user/consent), the profile immediately leaves the pool — no code path
// queries candidates without this filter.
test('match eligibility requires opt-in consent and no soft-delete', () => {
  assert.equal(MATCH_ELIGIBILITY.consent_recruiter_share, true);
  assert.equal(MATCH_ELIGIBILITY.deleted_at, null);
});

test('keyword fallback extracts skills, years range and location', () => {
  const jdText = `Senior Backend Engineer — Lagos
We need 3-5 years of experience with Node.js, PostgreSQL and Docker.
Nice to have: AWS. Location: Lagos (on-site).`;
  const out = extractJDKeywords(jdText, 'Senior Backend Engineer');
  assert.equal(out.ai, false);
  assert.equal(out.title, 'Senior Backend Engineer');
  assert.ok(out.mustHaveSkills.includes('Node.js'));
  assert.ok(out.mustHaveSkills.includes('PostgreSQL'));
  assert.equal(out.minYears, 3);
  assert.equal(out.maxYears, 5);
  assert.equal(out.location, 'Lagos');
});

test('keyword fallback handles "5+ years" and Remote', () => {
  const out = extractJDKeywords('Looking for a designer with 5+ years experience. Fully remote role.', 'Designer');
  assert.equal(out.minYears, 5);
  assert.equal(out.location, 'Remote');
});

test('keyword fallback never throws on garbage input', () => {
  const out = extractJDKeywords('', '');
  assert.equal(out.ai, false);
  assert.ok(Array.isArray(out.mustHaveSkills));
});

test('strong candidate scores excellent with skill/experience/location reasons', () => {
  const { score, reasons } = scoreCandidate(profile(), jd(), 0.9);
  const tier = tierFor(score);
  assert.equal(tier, 'excellent');
  assert.ok(reasons.some((r) => r === '3/3 required skills'), JSON.stringify(reasons));
  assert.ok(reasons.some((r) => r.includes('5 yrs experience (required 3–6)')), JSON.stringify(reasons));
  assert.ok(reasons.some((r) => r.includes('location match')), JSON.stringify(reasons));
});

test('weak candidate is excluded below the minimum score', () => {
  const weak = profile({
    current_title: 'Barista',
    skills: ['Espresso', 'Latte Art'],
    experience_years: 1,
    city: 'Kano',
  });
  const { score } = scoreCandidate(weak, jd(), 0.1);
  assert.ok(score < MATCH_MIN_SCORE, `expected < ${MATCH_MIN_SCORE}, got ${score}`);
  assert.equal(tierFor(score), null);
});

test('partial candidate lands in moderate/strong, never invents reasons', () => {
  const partial = profile({ skills: ['Node.js'], experience_years: 2, city: 'Abuja' });
  const { score, reasons } = scoreCandidate(partial, jd(), 0.4);
  const tier = tierFor(score);
  assert.ok(tier === 'moderate' || tier === 'strong', `score ${score}`);
  assert.ok(reasons.some((r) => r === '1/3 required skills'));
});

test('missing must-have skills in JD still yields a sane score (no division by zero)', () => {
  const noSkills = jd();
  noSkills.mustHaveSkills = [];
  noSkills.niceToHaveSkills = [];
  const { score } = scoreCandidate(profile(), noSkills, null);
  assert.ok(score > 0 && score <= 100);
});

test('tier boundaries', () => {
  assert.equal(tierFor(75), 'excellent');
  assert.equal(tierFor(74), 'strong');
  assert.equal(tierFor(55), 'strong');
  assert.equal(tierFor(54), 'moderate');
  assert.equal(tierFor(35), 'moderate');
  assert.equal(tierFor(34), null);
});

test('anonymized profile exposes no PII', () => {
  const anon = anonymizeProfile(profile(), ['Node.js']);
  const keys = Object.keys(anon);
  for (const banned of ['name', 'fullName', 'email', 'phone', 'photo']) {
    assert.ok(!keys.some((k) => k.toLowerCase().includes(banned.toLowerCase())), `PII key leaked: ${banned}`);
  }
  const dumped = JSON.stringify(anon);
  assert.ok(!dumped.includes('Adaeze') && !dumped.includes('@'));
  assert.equal(anon.currentTitle, 'Senior Backend Engineer');
  assert.ok(anon.topSkills[0] === 'Node.js'); // matched skills first
  assert.ok(anon.topSkills.length <= 8);
});

test('buildFtsQuery combines title and skills', () => {
  const q = buildFtsQuery(jd());
  assert.ok(q.includes('Senior Backend Engineer'));
  assert.ok(q.includes('PostgreSQL'));
});
