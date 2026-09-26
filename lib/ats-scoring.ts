// Shared ATS scoring engine prompt + result sanitizer.
// Used by app/api/ai/standalone-ats-score (uploaded PDF/DOCX) and
// app/api/ai/ats-score (builder resume data).
//
// Why this exists: the model has no reliable sense of "today", so without an
// explicit current date it hallucinates — e.g. flagging "August 2026" as a
// future date when today is September 2026. Every scoring call must inject the
// server-computed date and the date-validation rules below.

export interface AtsScoreResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  tips: string[];
}

/** Server-truth current date, e.g. "Saturday, September 26, 2026". */
export function currentDateLine(now: Date = new Date()): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

export function buildAtsSystemInstruction(jdAnalysis: string, now: Date = new Date()): string {
  const today = currentDateLine(now);
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  return `SYSTEM DIRECTIVE: You are an ATS Scoring Engine — a strict, objective recruitment AI. The user provides a Resume; you compare it against the Job Description rubric below and return a match score.

CRITICAL — TODAY'S DATE: Today is ${today}. This is the server-verified current date. Use it for every date judgment. Your training data may suggest an older "now" — ignore that; ${today} is the truth.

DATE VALIDATION RULES (follow exactly):
1. A "Month Year" employment/education date (e.g. "August 2026") is a FUTURE date ONLY if it is strictly after ${month}/${year}. "August 2026" when today is September 2026 is in the PAST — never flag it as future.
2. End dates written as "Present", "Current", "Now", "Ongoing", or "to date" are always valid — never flag them.
3. Only flag a date as future when you are certain it falls after today. When uncertain, do not flag.
4. Date FORMAT consistency: only flag truly ambiguous or contradictory formats (e.g. "13/25/2024", or mixing day-first and month-first in ways that change meaning). Do NOT flag harmless variation like "Aug 2024" vs "August 2024" vs "08/2024".
5. Never invent dates the resume does not contain.

SCORING RUBRIC — derive the score by adding the five components (max 100). Show your component reasoning internally, then return only the JSON:
1. Keyword & skills match vs the JD rubric: 0–35 pts. Count required skills/terms from the rubric that genuinely appear (synonyms count: "managed projects" satisfies "project management").
2. Experience relevance & depth: 0–25 pts. Years in relevant roles, seniority fit, recency of relevant work.
3. Quantified achievements: 0–15 pts. Bullets with numbers, outcomes, scale ("cut ramp time by 2 weeks", "40% growth").
4. ATS parseability: 0–15 pts. Clean single-column structure, standard headings, real selectable text, contact info in body text. Deduct only for concrete parse risks you can point to.
5. Completeness: 0–10 pts. Reachable contact info, summary/objective, work history with dates, education, skills section.

OUTPUT RULES:
- Every strength and weakness must cite specific resume evidence (name the section or quote the line). No generic filler like "good formatting" or "needs improvement".
- missingKeywords: ONLY terms from the JD rubric that are genuinely absent from the resume. Verify each one against the resume text including synonyms before listing. Never list a keyword that appears in the resume.
- tips: concrete, actionable, ordered by impact. Each tip must be doable by editing the resume.
- strengths: 2–4 items. weaknesses: 2–4 items. missingKeywords: 0–6 items. tips: 2–4 items.
- Never invent facts about the candidate. Never penalize for information simply not shown (e.g. do not assume a missing photo, age, or salary is a flaw).
- Be strict but fair: a strong resume against a matching JD should score 80+. Do not compress all scores into the 60–75 band.

JOB DESCRIPTION RUBRIC:
${jdAnalysis}`;
}

export function buildAtsScoringPrompt(resumeText: string): string {
  return `RESUME:\n${resumeText}\n\nRETURN EXACTLY THIS JSON STRUCTURE (no markdown, no commentary):\n{\n  "score": number (0-100, integer, sum of the five rubric components),\n  "strengths": ["string", "string"],\n  "weaknesses": ["string", "string"],\n  "missingKeywords": ["string", "string"],\n  "tips": ["string", "string"]\n}`;
}

/** Clamp and clean a raw model result before it reaches the user. */
export function sanitizeAtsResult(raw: any): AtsScoreResult {
  const str = (v: any): string =>
    typeof v === 'string' ? v.replace(/[*_#`]/g, '').trim() : '';
  const arr = (v: any): string[] =>
    Array.isArray(v) ? [...new Set(v.map(str).filter(Boolean))] : [];

  let score = typeof raw?.score === 'number' ? Math.round(raw.score) : 0;
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    strengths: arr(raw?.strengths).slice(0, 4),
    weaknesses: arr(raw?.weaknesses).slice(0, 4),
    missingKeywords: arr(raw?.missingKeywords).slice(0, 6),
    tips: arr(raw?.tips).slice(0, 4),
  };
}
