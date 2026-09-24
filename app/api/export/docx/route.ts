import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  TabStopType,
} from 'docx';
import { checkRateLimit } from '@/lib/rate-limit';
import { apiError } from '@/lib/api-error';
import { sanitizeResumeData } from '@/lib/validation';

interface PersonalInfo {
  fullName: string; jobTitle: string; email: string; phone: string;
  location: string; website: string; profilePicture?: string;
}
interface Experience { id: string; company: string; role: string; startDate: string; endDate: string; description: string; }
interface Education { id: string; school: string; degree: string; graduationYear: string; }
interface Skill { id: string; name: string; }
interface Project { id: string; name: string; description: string; link: string; }
interface Certification { id: string; name: string; issuer: string; date: string; }
interface Reference { id: string; name: string; title: string; company: string; contact: string; }
interface CustomSectionItem { id: string; title: string; subtitle: string; date: string; description: string; }
interface CustomSection { id: string; title: string; items: CustomSectionItem[]; }

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Normalize any theme color input to a 6-digit hex string (no '#') for docx. */
function normalizeAccent(input: unknown): string {
  const fallback = '2563EB';
  if (typeof input !== 'string') return fallback;
  let hex = input.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    hex = hex.split('').map((c) => c + c).join('');
  }
  return /^[0-9a-fA-F]{6}$/.test(hex) ? hex.toUpperCase() : fallback;
}

/** Strip any stray HTML tags and collapse whitespace (descriptions are plain text with \n). */
function cleanText(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|ul|ol|h\d)>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/** Split a description into bullet lines (handles real newlines and literal \n). */
function toBulletLines(input: unknown): string[] {
  const text = cleanText(input);
  if (!text) return [];
  return text
    .split(/\\n|\r?\n/)
    .map((line) => line.replace(/^[-\u2022*\s]+/, '').trim())
    .filter(Boolean);
}

const INK = '141312'; // near-black, matches the Cvyon preview ink
const GRAY = '6B7280';

export async function POST(request: Request) {
  try {
    const rateLimitResponse = await checkRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const rawData: any = await request.json();

    // Sanitize the incoming payload (validation + XSS stripping). The builder
    // payload predates parts of the resume schema, so fall back to the raw
    // payload rather than 400-ing a legitimate export.
    let data: any;
    try {
      data = sanitizeResumeData(rawData) as any;
    } catch (zodError: any) {
      logger.warn('docx', 'Payload did not fully match resume schema; exporting raw payload:', zodError?.message);
      data = rawData;
    }

    if (!data?.personalInfo) {
      return NextResponse.json({ error: 'Invalid resume data' }, { status: 400 });
    }

    // Theme + visibility flags live on the raw builder payload (zod strips
    // unknown keys), so read them from there.
    const accent = normalizeAccent(rawData?.theme?.color ?? data?.themeColor);
    const showProjects = Boolean(rawData?.showProjects);
    const showCertifications = Boolean(rawData?.showCertifications);
    const showReferences = Boolean(rawData?.showReferences);

    const personalInfo: PersonalInfo = data.personalInfo;
    const summary: string = cleanText(data.summary);
    const experience: Experience[] = Array.isArray(data.experience) ? data.experience : [];
    const education: Education[] = Array.isArray(data.education) ? data.education : [];
    const skills: Skill[] = Array.isArray(data.skills) ? data.skills : [];
    const projects: Project[] = Array.isArray(data.projects) ? data.projects : [];
    const certifications: Certification[] = Array.isArray(data.certifications) ? data.certifications : [];
    const references: Reference[] = Array.isArray(data.references) ? data.references : [];
    const customSections: CustomSection[] = Array.isArray(data.customSections) ? data.customSections : [];

    const children: Paragraph[] = [];

    // -- Small builders ------------------------------------------------------
    const run = (text: string, opts: Record<string, unknown> = {}) =>
      new TextRun({ text, font: 'Calibri', ...opts });

    /** Section heading that mirrors the preview: uppercase, accent color, accent rule. */
    const sectionHeading = (title: string) =>
      new Paragraph({
        children: [run(title.toUpperCase(), { bold: true, color: accent, size: 22 })],
        spacing: { before: 320, after: 140 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: accent, space: 4 },
        },
      });

    const bodyPara = (text: string) =>
      new Paragraph({
        children: [run(text, { size: 20, color: INK })],
        spacing: { after: 120 },
      });

    const bulletPara = (text: string) =>
      new Paragraph({
        children: [run(text, { size: 20, color: INK })],
        bullet: { level: 0 },
        spacing: { after: 60 },
      });

    /** Right-aligned tab stop at the content width (7.1in for 0.7in margins). */
    const RIGHT_TAB = 10224;

    // -- Header: name / title / contact (mirrors the preview header) ---------
    const fullName = cleanText(personalInfo.fullName);
    const jobTitle = cleanText(personalInfo.jobTitle);
    if (fullName) {
      children.push(
        new Paragraph({
          children: [run(fullName, { bold: true, size: 44, color: INK })],
          spacing: { after: 60 },
        })
      );
    }
    if (jobTitle) {
      children.push(
        new Paragraph({
          children: [run(jobTitle, { bold: true, size: 26, color: accent })],
          spacing: { after: 80 },
        })
      );
    }

    const contactInfo = [
      personalInfo.email,
      personalInfo.phone,
      personalInfo.location,
      personalInfo.website,
    ]
      .map(cleanText)
      .filter(Boolean)
      .join('  |  ');
    if (contactInfo) {
      children.push(
        new Paragraph({
          children: [run(contactInfo, { size: 18, color: GRAY })],
          spacing: { after: 120 },
        })
      );
    }

    // Accent rule under the header, like the preview's header divider.
    children.push(
      new Paragraph({
        children: [],
        spacing: { after: 160 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 12, color: accent, space: 1 },
        },
      })
    );

    // -- Professional Summary -------------------------------------------------
    if (summary) {
      children.push(sectionHeading('Professional Summary'));
      children.push(bodyPara(summary));
    }

    // -- Experience ------------------------------------------------------------
    if (experience.length > 0) {
      children.push(sectionHeading('Experience'));
      experience.forEach((exp) => {
        const role = cleanText(exp.role);
        const company = cleanText(exp.company);
        const dates = [cleanText(exp.startDate), cleanText(exp.endDate)]
          .filter(Boolean)
          .join(' \u2013 ');
        const headlineRuns = [];
        if (role) headlineRuns.push(run(role, { bold: true, size: 22, color: INK }));
        if (company) {
          if (role) headlineRuns.push(run('  \u2014  ', { size: 22, color: GRAY }));
          headlineRuns.push(run(company, { bold: true, size: 22, color: INK }));
        }
        if (dates) {
          headlineRuns.push(run('\t', { size: 22 }));
          headlineRuns.push(run(dates, { italics: true, size: 19, color: GRAY }));
        }
        if (headlineRuns.length > 0) {
          children.push(
            new Paragraph({
              children: headlineRuns,
              tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
              spacing: { before: 140, after: 60 },
            })
          );
        }
        toBulletLines(exp.description).forEach((line) => children.push(bulletPara(line)));
      });
    }

    // -- Education ---------------------------------------------------------------
    if (education.length > 0) {
      children.push(sectionHeading('Education'));
      education.forEach((edu) => {
        const degree = cleanText(edu.degree);
        const school = cleanText(edu.school);
        const year = cleanText(edu.graduationYear);
        const eduHeadline = [degree, school].filter(Boolean).join(', ');
        const eduRuns = [];
        if (eduHeadline) eduRuns.push(run(eduHeadline, { bold: Boolean(degree), size: 22, color: INK }));
        if (year) {
          eduRuns.push(run('\t', { size: 22 }));
          eduRuns.push(run(year, { italics: true, size: 19, color: GRAY }));
        }
        if (eduRuns.length > 0) {
          children.push(
            new Paragraph({
              children: eduRuns,
              tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
              spacing: { before: 140, after: 60 },
            })
          );
        }
      });
    }

    // -- Skills --------------------------------------------------------------------
    const skillNames = skills.map((s) => cleanText(s.name)).filter(Boolean);
    if (skillNames.length > 0) {
      children.push(sectionHeading('Skills'));
      children.push(bodyPara(skillNames.join('  \u2022  ')));
    }

    // -- Projects ----------------------------------------------------------------------
    if (showProjects && projects.length > 0) {
      children.push(sectionHeading('Projects'));
      projects.forEach((proj) => {
        const name = cleanText(proj.name);
        const link = cleanText(proj.link);
        const desc = cleanText(proj.description);
        const projRuns = [];
        if (name) projRuns.push(run(name, { bold: true, size: 22, color: INK }));
        if (link) projRuns.push(run(`  (${link})`, { italics: true, size: 19, color: GRAY }));
        if (projRuns.length > 0) {
          children.push(
            new Paragraph({ children: projRuns, spacing: { before: 140, after: desc ? 40 : 60 } })
          );
        }
        if (desc) children.push(bodyPara(desc));
      });
    }

    // -- Certifications ----------------------------------------------------------------------
    if (showCertifications && certifications.length > 0) {
      children.push(sectionHeading('Certifications'));
      certifications.forEach((cert) => {
        const name = cleanText(cert.name);
        const issuer = cleanText(cert.issuer);
        const date = cleanText(cert.date);
        const meta = [issuer, date].filter(Boolean).join('  \u00b7  ');
        const certRuns = [];
        if (name) certRuns.push(run(name, { bold: true, size: 21, color: INK }));
        if (meta) certRuns.push(run(`  \u2014  ${meta}`, { size: 20, color: GRAY }));
        if (certRuns.length > 0) {
          children.push(new Paragraph({ children: certRuns, spacing: { after: 80 } }));
        }
      });
    }

    // -- References ----------------------------------------------------------------------
    if (showReferences && references.length > 0) {
      children.push(sectionHeading('References'));
      references.forEach((ref) => {
        const name = cleanText(ref.name);
        const title = cleanText(ref.title);
        const company = cleanText(ref.company);
        const contact = cleanText(ref.contact);
        const detail = [title, company].filter(Boolean).join(', ');
        const refRuns = [];
        if (name) refRuns.push(run(name, { bold: true, size: 21, color: INK }));
        if (detail) refRuns.push(run(`  \u2014  ${detail}`, { size: 20, color: INK }));
        if (contact) refRuns.push(run(`  \u00b7  ${contact}`, { italics: true, size: 19, color: GRAY }));
        if (refRuns.length > 0) {
          children.push(new Paragraph({ children: refRuns, spacing: { after: 80 } }));
        }
      });
    }

    // -- Custom sections ----------------------------------------------------------------------
    customSections.forEach((section) => {
      const title = cleanText(section.title);
      const items = Array.isArray(section.items) ? section.items : [];
      if (!title && items.length === 0) return;
      if (title) children.push(sectionHeading(title));
      items.forEach((item) => {
        const itemTitle = cleanText(item.title);
        const subtitle = cleanText(item.subtitle);
        const date = cleanText(item.date);
        const desc = cleanText(item.description);
        const itemRuns = [];
        if (itemTitle) itemRuns.push(run(itemTitle, { bold: true, size: 22, color: INK }));
        if (subtitle) itemRuns.push(run(`, ${subtitle}`, { italics: true, size: 20, color: INK }));
        if (date) {
          itemRuns.push(run('\t', { size: 22 }));
          itemRuns.push(run(date, { italics: true, size: 19, color: GRAY }));
        }
        if (itemRuns.length > 0) {
          children.push(
            new Paragraph({
              children: itemRuns,
              tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
              spacing: { before: 140, after: desc ? 40 : 60 },
            })
          );
        }
        if (desc) children.push(bodyPara(desc));
      });
    });

    const doc = new Document({
      creator: 'Cvyon',
      title: fullName ? `${fullName} Resume` : 'Resume',
      description: 'Resume generated with Cvyon \u2014 free resume builder',
      styles: {
        default: {
          document: {
            run: { font: 'Calibri', size: 20, color: INK },
            paragraph: { spacing: { line: 276 } },
          },
        },
      },
      sections: [
        {
          properties: {
            page: {
              margin: { top: 1008, bottom: 1008, left: 1008, right: 1008 },
            },
          },
          children,
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    const safeName =
      fullName.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_') || 'My';
    const safeRole =
      jobTitle.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_') || 'Resume';

    return new Response(buffer as any, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename=${safeName}_${safeRole}_Resume.docx`,
      },
    });
  } catch (error: any) {
    return apiError('docx', error);
  }
}
