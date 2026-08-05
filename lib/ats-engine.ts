import type { ResumeData } from '@/store/types';

export interface AtsScoreResult {
  score: number; // 0 to 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  breakdown: {
    contactInfo: { score: number; max: number; status: 'good' | 'fair' | 'poor' };
    summary: { score: number; max: number; status: 'good' | 'fair' | 'poor' };
    experience: { score: number; max: number; status: 'good' | 'fair' | 'poor' };
    skills: { score: number; max: number; status: 'good' | 'fair' | 'poor' };
    education: { score: number; max: number; status: 'good' | 'fair' | 'poor' };
  };
  highlights: string[];
  suggestions: string[];
}

const ACTION_VERBS = new Set([
  'achieved', 'accelerated', 'amplified', 'architected', 'automated', 'boosted',
  'built', 'championed', 'coordinated', 'created', 'decreased', 'delivered',
  'designed', 'developed', 'directed', 'drove', 'engineered', 'enhanced',
  'established', 'executed', 'expanded', 'generated', 'guided', 'headed',
  'implemented', 'improved', 'increased', 'initiated', 'innovated', 'launched',
  'led', 'managed', 'maximized', 'mentored', 'modernized', 'negotiated',
  'optimized', 'orchestrated', 'overhauled', 'pioneered', 'produced', 'reduced',
  'restructured', 'revamped', 'scaled', 'spearheaded', 'streamlined', 'transformed'
]);

const METRIC_REGEX = /\b(\d+[\d,.]*\%|\$\d+[\d,.]*|\d+\+\s*(users|clients|projects|million|k)|reduced.*by\s*\d+|increased.*by\s*\d+)\b/i;

export function calculateAtsScore(resume: Partial<ResumeData>): AtsScoreResult {
  const highlights: string[] = [];
  const suggestions: string[] = [];

  // 1. Contact Info (Max 20 pts)
  let contactScore = 0;
  const p = resume.personalInfo;
  if (p?.fullName?.trim()) contactScore += 4;
  if (p?.jobTitle?.trim()) contactScore += 4;
  if (p?.email && p.email.includes('@')) contactScore += 4;
  if (p?.phone?.trim()) contactScore += 4;
  if (p?.location?.trim() || p?.website?.trim()) contactScore += 4;

  if (contactScore === 20) {
    highlights.push('Contact information is complete and well-structured.');
  } else {
    suggestions.push('Complete your contact info (email, phone, location, and title) for ATS parsers.');
  }

  // 2. Professional Summary (Max 15 pts)
  let summaryScore = 0;
  const summary = resume.summary?.trim() || '';
  const wordCount = summary.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 25 && wordCount <= 120) {
    summaryScore = 15;
    highlights.push('Summary is concise and within the ideal ATS length (25-120 words).');
  } else if (wordCount > 0) {
    summaryScore = 8;
    suggestions.push('Aim for a summary between 25 and 120 words highlighting key accomplishments.');
  } else {
    suggestions.push('Add a professional summary to capture recruiter and ATS attention.');
  }

  // 3. Work Experience & Impact (Max 35 pts)
  let expScore = 0;
  const exps = resume.experience || [];
  if (exps.length > 0) {
    expScore += 10;
    let hasActionVerbs = false;
    let hasMetrics = false;

    for (const exp of exps) {
      const desc = exp.description || '';
      const words = desc.toLowerCase().split(/[\s,.;:!?]+/);
      for (const w of words) {
        if (ACTION_VERBS.has(w)) {
          hasActionVerbs = true;
          break;
        }
      }
      if (METRIC_REGEX.test(desc) || /\d+/.test(desc)) {
        hasMetrics = true;
      }
    }

    if (hasActionVerbs) {
      expScore += 15;
      highlights.push('Strong action verbs found across your experience section.');
    } else {
      suggestions.push('Start your bullet points with strong action verbs (e.g. Spearheaded, Accelerated, Automated).');
    }

    if (hasMetrics) {
      expScore += 10;
      highlights.push('Quantifiable metrics and measurable results detected in your experience.');
    } else {
      suggestions.push('Include measurable metrics (e.g., percentages, revenue, users scaled) to stand out.');
    }
  } else {
    suggestions.push('Add at least one professional work experience or relevant project.');
  }

  // 4. Skills (Max 20 pts)
  let skillsScore = 0;
  const skills = resume.skills || [];
  if (skills.length >= 6) {
    skillsScore = 20;
    highlights.push(`Comprehensive skill set listed (${skills.length} skills).`);
  } else if (skills.length >= 3) {
    skillsScore = 12;
    suggestions.push('Add 6 or more industry-specific technical and soft skills.');
  } else if (skills.length > 0) {
    skillsScore = 6;
    suggestions.push('List more relevant skills to match ATS job keyword queries.');
  } else {
    suggestions.push('Add a skills section with key competencies.');
  }

  // 5. Education (Max 10 pts)
  let eduScore = 0;
  const edus = resume.education || [];
  if (edus.length > 0 && edus[0].school && edus[0].degree) {
    eduScore = 10;
    highlights.push('Education details are clearly defined.');
  } else if (edus.length > 0) {
    eduScore = 5;
    suggestions.push('Include school name, degree, and graduation year.');
  } else {
    suggestions.push('Add your educational background or highest certification.');
  }

  const totalScore = Math.min(100, contactScore + summaryScore + expScore + skillsScore + eduScore);

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'D';
  if (totalScore >= 90) grade = 'A+';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 65) grade = 'B';
  else if (totalScore >= 50) grade = 'C';

  return {
    score: totalScore,
    grade,
    breakdown: {
      contactInfo: { score: contactScore, max: 20, status: contactScore >= 16 ? 'good' : contactScore >= 10 ? 'fair' : 'poor' },
      summary: { score: summaryScore, max: 15, status: summaryScore >= 12 ? 'good' : summaryScore >= 6 ? 'fair' : 'poor' },
      experience: { score: expScore, max: 35, status: expScore >= 28 ? 'good' : expScore >= 15 ? 'fair' : 'poor' },
      skills: { score: skillsScore, max: 20, status: skillsScore >= 16 ? 'good' : skillsScore >= 10 ? 'fair' : 'poor' },
      education: { score: eduScore, max: 10, status: eduScore >= 8 ? 'good' : 'fair' },
    },
    highlights,
    suggestions,
  };
}
