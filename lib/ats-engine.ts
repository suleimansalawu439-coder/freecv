import type { ResumeData } from '@/store/types';

export interface AtsScoreResult {
  score: number; // 0 to 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  breakdown: {
    contactInfo: { score: number; max: number; status: 'good' | 'fair' | 'poor'; details: string };
    summary: { score: number; max: number; status: 'good' | 'fair' | 'poor'; details: string };
    experience: { score: number; max: number; status: 'good' | 'fair' | 'poor'; details: string };
    skills: { score: number; max: number; status: 'good' | 'fair' | 'poor'; details: string };
    education: { score: number; max: number; status: 'good' | 'fair' | 'poor'; details: string };
  };
  metrics: {
    actionVerbCount: number;
    actionVerbRatio: number; // 0 to 100%
    quantifiableMetricCount: number;
    weakPhrasesFound: string[];
    clichesFound: string[];
    totalWordCount: number;
    bulletCount: number;
    hardSkillsRatio: number;
  };
  highlights: string[];
  suggestions: string[];
  penalties: string[];
}

/* ------------------------------------------------------------------ *
 *  Curated Power Action Verbs by Industry Category (120+ Verbs)
 * ------------------------------------------------------------------ */
export const ACTION_VERBS = new Set([
  // Leadership & Strategy
  'spearheaded', 'orchestrated', 'championed', 'directed', 'pioneered',
  'mobilized', 'governed', 'mentored', 'empowered', 'restructured',
  'transformed', 'steered', 'headed', 'cultivated', 'established',
  'forecasted', 'formulated', 'aligned', 'supervised', 'advised',
  
  // Technical & Engineering
  'architected', 'engineered', 'developed', 'built', 'implemented',
  'programmed', 'automated', 'deployed', 'designed', 'configured',
  'refactored', 'integrated', 'migrated', 'modeled', 'debugged',
  'virtualized', 'containerized', 'benchmarked', 'prototyped', 'authored',
  'administered', 'standardized', 'secured', 'authenticated', 'provisioned',

  // Growth, Optimization & Scaling
  'accelerated', 'optimized', 'streamlined', 'maximized', 'boosted',
  'amplified', 'scaled', 'enhanced', 'reduced', 'decreased',
  'eliminated', 'curtailed', 'minimized', 'expedited', 'consolidated',
  'modernized', 'revamped', 'overhauled', 'upgraded', 'simplified',

  // Execution, Sales & Commercial Impact
  'delivered', 'generated', 'achieved', 'surpassed', 'secured',
  'produced', 'negotiated', 'launched', 'published', 'captured',
  'acquired', 'converted', 'closed', 'monetized', 'retained',
  'expanded', 'won', 'marketed', 'capitalized', 'outperformed',

  // Research, Data & Quality
  'analyzed', 'audited', 'evaluated', 'synthesized', 'identified',
  'discovered', 'calculated', 'assessed', 'quantified', 'validated',
  'resolved', 'diagnosed', 'researched', 'tracked', 'measured'
]);

/* ------------------------------------------------------------------ *
 *  Weak Passive Phrases to Penalize
 * ------------------------------------------------------------------ */
const WEAK_PHRASES = [
  'responsible for',
  'duties included',
  'helped with',
  'helped to',
  'assisted with',
  'assisted in',
  'worked on',
  'part of a team that',
  'tasked with',
  'handled daily',
  'involved in',
  'tried to',
  'attempted to',
  'worked with'
];

/* ------------------------------------------------------------------ *
 *  Clichés & Unsupported Fluff
 * ------------------------------------------------------------------ */
const CLICHES = [
  'hard worker',
  'hard-working',
  'team player',
  'out of the box',
  'out-of-the-box',
  'go-getter',
  'detail-oriented',
  'detail oriented',
  'self-starter',
  'results-driven',
  'results driven',
  'synergy',
  'think outside the box',
  'people person',
  'fast learner',
  'dynamic individual',
  'highly motivated'
];

/* ------------------------------------------------------------------ *
 *  Placeholder strings to penalize
 * ------------------------------------------------------------------ */
const PLACEHOLDERS = [
  'lorem ipsum',
  'dolor sit amet',
  'company name',
  'your title',
  'job title here',
  'enter description',
  'your name here',
  'sample text',
  'university name'
];

/* ------------------------------------------------------------------ *
 *  Multi-Pattern Quantifiable Metrics Regex
 * ------------------------------------------------------------------ */
const METRIC_PATTERNS = [
  /\b\d+(\.\d+)?\s*%/i, // Percentages: 25%, 99.9%
  /\b(\$|€|£|¥|₦|CAD|USD|EUR|GBP|NGN)\s*\d+([\d,.]*)\s*(k|m|b|million|billion|thousand)?\b/i, // Currency: $120k, ₦50M
  /\b\d+([\d,.]*)\s*(USD|EUR|GBP|NGN|dollars?|naira|euros?)\b/i,
  /\b\d+(\.\d+)?\s*x\b/i, // Multipliers: 2x, 10x, 3.5x
  /\b\d+[\d,.]*\+?\s*(users|clients|customers|students|patients|subscribers|transactions|downloads|views|visitors|endpoints|servers|microservices|requests|orders|leads)\b/i,
  /\b(reduced|saved|cut|decreased|accelerated|increased|grew|boosted)\s+(by\s+)?(\$|€|£|₦)?\d+[\d,.]*\s*(%|k|m|million|hours?|days?|ms|seconds?|weeks?|months?)?\b/i,
  /\b(team of \d+|\d+\+?\s*(engineers|developers|reps|direct reports|members|specialists))\b/i,
  /\b\d+[\d,.]*\s*(k|m|million|billion)\s*(arr|mrr|gmv|pipeline|revenue|budget)\b/i,
];

/* Extract clean bullet lines from experience text */
function extractBullets(text: string): string[] {
  if (!text) return [];
  const lines = text
    .split(/\r?\n|•|\*|(?<=[.!?])\s+(?=[A-Z])/)
    .map(line => line.replace(/^[\s\-\*\•\d\.\)]+/, '').trim())
    .filter(line => line.length > 5);
  return lines.length > 0 ? lines : [text.trim()];
}

/**
 * Enterprise-Grade ATS Resume Scorer
 * Evaluates 5 core pillars with strict weights, power verb ratios, metrics detection,
 * passive phrasing deductions, and formatting compliance.
 */
export function calculateAtsScore(resume: Partial<ResumeData>): AtsScoreResult {
  const highlights: string[] = [];
  const suggestions: string[] = [];
  const penalties: string[] = [];

  const rawText = JSON.stringify(resume || {}).toLowerCase();

  // Global Check: Placeholder / Dummy data check
  let placeholderCount = 0;
  for (const ph of PLACEHOLDERS) {
    if (rawText.includes(ph)) placeholderCount++;
  }
  if (placeholderCount > 0) {
    penalties.push(`Found ${placeholderCount} default/placeholder text fragment(s) (e.g. "Lorem Ipsum" or "Company Name").`);
  }

  // ------------------------------------------------------------------
  // 1. Contact & Professional Identity (Max: 15 pts)
  // ------------------------------------------------------------------
  let contactScore = 0;
  const p = resume.personalInfo || {} as any;
  const fullName = (p.fullName || '').trim();
  const jobTitle = (p.jobTitle || '').trim();
  const email = (p.email || '').trim().toLowerCase();
  const phone = (p.phone || '').trim();
  const location = (p.location || '').trim();
  const website = (p.website || '').trim();

  // Full name check (2+ words, not test/admin)
  if (fullName.split(/\s+/).length >= 2 && !fullName.toLowerCase().includes('test')) {
    contactScore += 3;
  } else if (fullName.length > 0) {
    contactScore += 1.5;
    suggestions.push('Include your complete First and Last name in contact info.');
  } else {
    suggestions.push('Add your full name.');
  }

  // Job title / Headline check
  if (jobTitle.length >= 3 && !jobTitle.toLowerCase().includes('title')) {
    contactScore += 3;
  } else {
    suggestions.push('Specify a clear target Job Title matching your desired ATS role.');
  }

  // Email check
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !email.includes('example.com') && !email.includes('test.com')) {
    contactScore += 3;
  } else if (email.includes('@')) {
    contactScore += 2;
  } else {
    suggestions.push('Add a valid, professional email address.');
  }

  // Phone check (digits + symbols)
  if (phone.replace(/[^\d]/g, '').length >= 7) {
    contactScore += 3;
  } else {
    suggestions.push('Include a standardized contact phone number with country/area code.');
  }

  // Location and Web link
  if (location.length >= 3) contactScore += 1.5;
  if (website.length >= 4 || website.includes('linkedin.com') || website.includes('github.com')) {
    contactScore += 1.5;
    highlights.push('Online professional portfolio or LinkedIn URL detected.');
  } else {
    suggestions.push('Add your LinkedIn, GitHub, or portfolio website URL.');
  }

  const contactStatus: 'good' | 'fair' | 'poor' =
    contactScore >= 13 ? 'good' : contactScore >= 9 ? 'fair' : 'poor';

  // ------------------------------------------------------------------
  // 2. Professional Summary & Narrative (Max: 15 pts)
  // ------------------------------------------------------------------
  let summaryScore = 0;
  const summary = (resume.summary || '').trim();
  const summaryWords = summary.split(/\s+/).filter(Boolean);
  const wordCount = summaryWords.length;

  const clichesFound: string[] = [];
  for (const c of CLICHES) {
    if (summary.toLowerCase().includes(c)) clichesFound.push(c);
  }

  if (wordCount >= 35 && wordCount <= 130) {
    summaryScore += 8;
    highlights.push(`Summary length is optimal (${wordCount} words) for ATS parsing.`);
  } else if (wordCount >= 20 && wordCount < 35) {
    summaryScore += 5;
    suggestions.push('Expand your summary to 35-100 words highlighting your core value proposition.');
  } else if (wordCount > 130) {
    summaryScore += 4;
    suggestions.push('Condense your summary to under 130 words; overly long blocks reduce ATS keyword density.');
  } else if (wordCount > 0) {
    summaryScore += 2;
    suggestions.push('Summary is too brief (< 20 words). Provide a structured overview of your career and skills.');
  } else {
    suggestions.push('Add a targeted Professional Summary to improve keyword indexation.');
  }

  // Check for domain relevance & power phrasing in summary
  if (wordCount > 15) {
    let summaryActionVerbs = 0;
    for (const word of summary.toLowerCase().split(/[\s,.;:!?]+/)) {
      if (ACTION_VERBS.has(word)) summaryActionVerbs++;
    }
    if (summaryActionVerbs >= 2) {
      summaryScore += 7;
    } else if (summaryActionVerbs === 1) {
      summaryScore += 4;
    } else {
      summaryScore += 2;
      suggestions.push('Infuse your summary with high-impact power words (e.g. Architected, Accelerated, Spearheaded).');
    }
  }

  // Deduct for clichés in summary
  if (clichesFound.length > 0) {
    const penalty = Math.min(4, clichesFound.length * 1.5);
    summaryScore = Math.max(0, summaryScore - penalty);
    penalties.push(`Found generic cliché phrases: "${clichesFound.join('", "')}". Replace with measurable proof.`);
  }

  const summaryStatus: 'good' | 'fair' | 'poor' =
    summaryScore >= 12 ? 'good' : summaryScore >= 7 ? 'fair' : 'poor';

  // ------------------------------------------------------------------
  // 3. Work Experience, Power Verbs & Quantified Results (Max: 35 pts)
  // ------------------------------------------------------------------
  let expScore = 0;
  const exps = resume.experience || [];
  let totalBullets = 0;
  let bulletsWithActionVerbs = 0;
  let bulletsWithMetrics = 0;
  const weakPhrasesFound: string[] = [];
  let totalExpWordCount = 0;

  if (exps.length > 0) {
    // 1. Role structure and completeness (up to 7 pts)
    let structuredRoles = 0;
    for (const exp of exps) {
      if (exp.role && exp.company && (exp.startDate || exp.endDate)) structuredRoles++;
    }
    if (structuredRoles >= 2) expScore += 7;
    else if (structuredRoles >= 1) expScore += 4.5;
    else suggestions.push('Ensure each work experience has a clear Role, Company, and Date range.');

    // 2. Deep Bullet Analysis
    for (const exp of exps) {
      const desc = exp.description || '';
      const descWords = desc.split(/\s+/).filter(Boolean);
      totalExpWordCount += descWords.length;

      // Check weak phrases in description
      for (const wp of WEAK_PHRASES) {
        if (desc.toLowerCase().includes(wp) && !weakPhrasesFound.includes(wp)) {
          weakPhrasesFound.push(wp);
        }
      }

      const bullets = extractBullets(desc);
      for (const bullet of bullets) {
        totalBullets++;
        const bulletWords = bullet.toLowerCase().split(/[\s,.;:!?]+/).filter(Boolean);
        
        // Check if starts with Action Verb (within first 3 words)
        const leadingWords = bulletWords.slice(0, 3);
        const hasLeadingVerb = leadingWords.some(w => ACTION_VERBS.has(w));
        if (hasLeadingVerb) {
          bulletsWithActionVerbs++;
        }

        // Check if contains Quantifiable Metric
        const hasMetric = METRIC_PATTERNS.some(regex => regex.test(bullet));
        if (hasMetric) {
          bulletsWithMetrics++;
        }
      }
    }

    // Evaluate Action Verb Ratio (Max 12 pts)
    const verbRatio = totalBullets > 0 ? (bulletsWithActionVerbs / totalBullets) : 0;
    if (verbRatio >= 0.7 && bulletsWithActionVerbs >= 3) {
      expScore += 12;
      highlights.push(`Excellent active voice: ${Math.round(verbRatio * 100)}% of bullet points begin with strong action verbs.`);
    } else if (verbRatio >= 0.4 || bulletsWithActionVerbs >= 2) {
      expScore += 7;
      suggestions.push('Start every bullet point with a powerful past-tense action verb (e.g. Engineered, Spearheaded, Accelerated).');
    } else if (bulletsWithActionVerbs >= 1) {
      expScore += 3.5;
      suggestions.push('Too few action verbs. Replace passive statements with direct achievement verbs.');
    } else {
      suggestions.push('No strong action verbs detected in experience bullets.');
    }

    // Evaluate Quantifiable Metrics & Business Scale (Max 12 pts)
    if (bulletsWithMetrics >= 3) {
      expScore += 12;
      highlights.push(`High quantitative rigor: ${bulletsWithMetrics} measurable metrics and outcomes detected.`);
    } else if (bulletsWithMetrics === 2) {
      expScore += 8;
      suggestions.push('Add 1-2 more quantifiable outcomes (%, $, user scale, time saved) to maximize ATS ranking.');
    } else if (bulletsWithMetrics === 1) {
      expScore += 4;
      suggestions.push('Quantify your achievements with numbers (e.g., "grew revenue by 35%", "reduced load times by 400ms").');
    } else {
      suggestions.push('Zero quantifiable metrics found. Top ATS scores require numerical proof of impact.');
    }

    // Bullet depth & STAR formula bonus (Max 4 pts)
    if (totalBullets >= 4 && totalExpWordCount >= 60) {
      expScore += 4;
    } else if (totalBullets >= 2) {
      expScore += 2;
    } else {
      suggestions.push('Provide at least 3-4 detailed bullet points per role following the STAR (Situation-Task-Action-Result) format.');
    }

    // Deduct for weak phrases
    if (weakPhrasesFound.length > 0) {
      const deduction = Math.min(8, weakPhrasesFound.length * 2);
      expScore = Math.max(0, expScore - deduction);
      penalties.push(`Passive phrases detected: "${weakPhrasesFound.join('", "')}". Replace with direct active verbs.`);
    }
  } else {
    suggestions.push('Add at least one professional work experience or technical project.');
  }

  const expStatus: 'good' | 'fair' | 'poor' =
    expScore >= 27 ? 'good' : expScore >= 16 ? 'fair' : 'poor';

  // ------------------------------------------------------------------
  // 4. Skills Architecture & Hard Skills Density (Max: 20 pts)
  // ------------------------------------------------------------------
  let skillsScore = 0;
  const skills = resume.skills || [];
  const skillNames = skills.map(s => (s.name || '').trim()).filter(Boolean);
  const uniqueSkills = Array.from(new Set(skillNames.map(s => s.toLowerCase())));

  // Check volume
  if (uniqueSkills.length >= 8 && uniqueSkills.length <= 25) {
    skillsScore += 8;
    highlights.push(`Strong keyword breadth: ${uniqueSkills.length} distinct skills indexed.`);
  } else if (uniqueSkills.length >= 4) {
    skillsScore += 5;
    suggestions.push('Add 8-15 specific technical tools, frameworks, and domain skills to match ATS filters.');
  } else if (uniqueSkills.length > 0) {
    skillsScore += 2;
    suggestions.push('List at least 6+ relevant hard skills.');
  } else {
    suggestions.push('Add a dedicated skills section with tools and core competencies.');
  }

  // Check skill specificity (detect if skills are specific vs trivial 1-character entries)
  let validSkillLengthCount = 0;
  for (const s of uniqueSkills) {
    if (s.length >= 2 && !CLICHES.includes(s)) validSkillLengthCount++;
  }

  const hardSkillRatio = uniqueSkills.length > 0 ? (validSkillLengthCount / uniqueSkills.length) : 0;
  if (hardSkillRatio >= 0.8 && uniqueSkills.length >= 6) {
    skillsScore += 8;
  } else if (hardSkillRatio >= 0.5) {
    skillsScore += 4;
  }

  // Cross-reference skills inside Experience / Summary text
  let skillsMentionedInBody = 0;
  const fullBodyText = `${summary} ${exps.map(e => e.description).join(' ')}`.toLowerCase();
  for (const skill of uniqueSkills) {
    if (fullBodyText.includes(skill)) skillsMentionedInBody++;
  }
  if (skillsMentionedInBody >= 3) {
    skillsScore += 4;
    highlights.push('Key skills are reinforced naturally within your work experience bullets.');
  } else if (uniqueSkills.length >= 5) {
    suggestions.push('Demonstrate how you applied your listed skills directly inside your experience bullet points.');
  }

  const skillsStatus: 'good' | 'fair' | 'poor' =
    skillsScore >= 16 ? 'good' : skillsScore >= 9 ? 'fair' : 'poor';

  // ------------------------------------------------------------------
  // 5. Education, Certifications & Depth (Max: 15 pts)
  // ------------------------------------------------------------------
  let eduScore = 0;
  const edus = resume.education || [];
  const certs = resume.certifications || [];
  const projects = resume.projects || [];
  const customSections = resume.customSections || [];

  if (edus.length > 0) {
    const firstEdu = edus[0];
    if (firstEdu.school && firstEdu.degree && firstEdu.graduationYear) {
      eduScore += 10;
      highlights.push('Education entry contains complete degree, institution, and graduation year.');
    } else if (firstEdu.school && firstEdu.degree) {
      eduScore += 7;
      suggestions.push('Include your graduation year in the education section.');
    } else if (firstEdu.school || firstEdu.degree) {
      eduScore += 4;
      suggestions.push('Complete both degree title and school name.');
    }
  } else {
    suggestions.push('Add your educational credentials, degree, or highest qualification.');
  }

  // Bonus for Certifications, Projects, or Custom Sections (Up to 5 pts)
  if (certs.length > 0 || projects.length > 0 || customSections.length > 0) {
    eduScore += 5;
    highlights.push('Supplemental sections (certifications/projects) provide strong competitive edge.');
  } else {
    suggestions.push('Consider adding certifications or standout projects to boost overall profile strength.');
  }

  const eduStatus: 'good' | 'fair' | 'poor' =
    eduScore >= 12 ? 'good' : eduScore >= 7 ? 'fair' : 'poor';

  // ------------------------------------------------------------------
  // Total Score Calculation & Grade Calibration
  // ------------------------------------------------------------------
  let calculatedScore = Math.round(contactScore + summaryScore + expScore + skillsScore + eduScore);

  // Apply placeholder penalties
  if (placeholderCount > 0) {
    calculatedScore = Math.max(0, calculatedScore - (placeholderCount * 6));
  }

  const finalScore = Math.max(0, Math.min(100, calculatedScore));

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'D';
  if (finalScore >= 90) grade = 'A+';
  else if (finalScore >= 80) grade = 'A';
  else if (finalScore >= 65) grade = 'B';
  else if (finalScore >= 50) grade = 'C';

  const totalWords = (summary + ' ' + exps.map(e => e.description).join(' ') + ' ' + skillNames.join(' ')).split(/\s+/).filter(Boolean).length;

  return {
    score: finalScore,
    grade,
    breakdown: {
      contactInfo: {
        score: Math.round(contactScore),
        max: 15,
        status: contactStatus,
        details: `${Math.round(contactScore)}/15 pts — Structure & verified channels`
      },
      summary: {
        score: Math.round(summaryScore),
        max: 15,
        status: summaryStatus,
        details: `${Math.round(summaryScore)}/15 pts — ${wordCount} words, narrative power`
      },
      experience: {
        score: Math.round(expScore),
        max: 35,
        status: expStatus,
        details: `${Math.round(expScore)}/35 pts — ${bulletsWithActionVerbs} action verbs, ${bulletsWithMetrics} metrics`
      },
      skills: {
        score: Math.round(skillsScore),
        max: 20,
        status: skillsStatus,
        details: `${Math.round(skillsScore)}/20 pts — ${uniqueSkills.length} keywords indexed`
      },
      education: {
        score: Math.round(eduScore),
        max: 15,
        status: eduStatus,
        details: `${Math.round(eduScore)}/15 pts — Credentials & depth`
      },
    },
    metrics: {
      actionVerbCount: bulletsWithActionVerbs,
      actionVerbRatio: totalBullets > 0 ? Math.round((bulletsWithActionVerbs / totalBullets) * 100) : 0,
      quantifiableMetricCount: bulletsWithMetrics,
      weakPhrasesFound,
      clichesFound,
      totalWordCount: totalWords,
      bulletCount: totalBullets,
      hardSkillsRatio: Math.round(hardSkillRatio * 100),
    },
    highlights,
    suggestions,
    penalties,
  };
}
