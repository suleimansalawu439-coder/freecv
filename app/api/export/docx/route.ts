import { NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
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

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  references: Reference[];
  customSections?: CustomSection[];
}

export async function POST(request: Request) {
  try {
    const data: ResumeData = await request.json();
    
    if (!data.personalInfo) {
      return NextResponse.json({ error: 'Invalid resume data' }, { status: 400 });
    }

    const { personalInfo, summary, experience, education, skills, projects, certifications, references, customSections } = data as ResumeData;
    const children = [];

    // Header
    if (personalInfo.fullName) {
      children.push(new Paragraph({
        text: personalInfo.fullName,
        heading: HeadingLevel.TITLE,
      }));
    }
    if (personalInfo.jobTitle) {
      children.push(new Paragraph({
        text: personalInfo.jobTitle,
        heading: HeadingLevel.HEADING_2,
      }));
    }

    // Contact Info
    const contactInfo = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(Boolean).join(' | ');
    if (contactInfo) {
      children.push(new Paragraph({
        children: [new TextRun(contactInfo)]
      }));
    }

    // Summary
    if (summary) {
      children.push(new Paragraph({ text: 'Professional Summary', heading: HeadingLevel.HEADING_1 }));
      children.push(new Paragraph({ text: summary }));
    }

    // Experience
    if (experience && experience.length > 0) {
      children.push(new Paragraph({ text: 'Experience', heading: HeadingLevel.HEADING_1 }));
      experience.forEach(exp => {
        children.push(new Paragraph({
          children: [
            new TextRun({ text: `${exp.role} at ${exp.company}`, bold: true }),
            new TextRun({ text: ` | ${exp.startDate} - ${exp.endDate}`, italics: true }),
          ]
        }));
        if (exp.description) {
          exp.description.split('\n').forEach(line => {
            if (line.trim()) {
              children.push(new Paragraph({
                text: line.replace(/^[-\*]\s*/, '').trim(),
                bullet: { level: 0 }
              }));
            }
          });
        }
      });
    }

    // Education
    if (education && education.length > 0) {
      children.push(new Paragraph({ text: 'Education', heading: HeadingLevel.HEADING_1 }));
      education.forEach(edu => {
        children.push(new Paragraph({
          children: [
            new TextRun({ text: `${edu.degree}, ${edu.school}`, bold: true }),
            new TextRun({ text: ` | Class of ${edu.graduationYear}`, italics: true }),
          ]
        }));
      });
    }

    // Skills
    if (skills && skills.length > 0) {
      children.push(new Paragraph({ text: 'Skills', heading: HeadingLevel.HEADING_1 }));
      const skillsText = skills.map(s => s.name).join(', ');
      children.push(new Paragraph({ text: skillsText }));
    }

    // Projects
    if (projects && projects.length > 0) {
      children.push(new Paragraph({ text: 'Projects', heading: HeadingLevel.HEADING_1 }));
      projects.forEach(proj => {
        children.push(new Paragraph({
          children: [
            new TextRun({ text: proj.name, bold: true }),
            proj.link ? new TextRun({ text: ` (${proj.link})`, italics: true }) : new TextRun(''),
          ]
        }));
        if (proj.description) {
          children.push(new Paragraph({ text: proj.description }));
        }
      });
    }

    // Certifications
    if (certifications && certifications.length > 0) {
      children.push(new Paragraph({ text: 'Certifications', heading: HeadingLevel.HEADING_1 }));
      certifications.forEach(cert => {
        children.push(new Paragraph({
          children: [
            new TextRun({ text: cert.name, bold: true }),
            new TextRun({ text: ` | ${cert.issuer} (${cert.date})`, italics: true }),
          ]
        }));
      });
    }

    // References
    if (references && references.length > 0) {
      children.push(new Paragraph({ text: 'References', heading: HeadingLevel.HEADING_1 }));
      references.forEach(ref => {
        children.push(new Paragraph({
          children: [
            new TextRun({ text: ref.name, bold: true }),
            new TextRun({ text: `, ${ref.title} at ${ref.company}` }),
            new TextRun({ text: ` - ${ref.contact}`, italics: true }),
          ]
        }));
      });
    }

    // Custom Sections
    if (customSections && customSections.length > 0) {
      customSections.forEach(section => {
        children.push(new Paragraph({ text: section.title, heading: HeadingLevel.HEADING_1 }));
        if (section.items && section.items.length > 0) {
          section.items.forEach(item => {
            children.push(new Paragraph({
              children: [
                new TextRun({ text: item.title, bold: true }),
                item.subtitle ? new TextRun({ text: `, ${item.subtitle}`, italics: true }) : new TextRun(''),
                item.date ? new TextRun({ text: ` | ${item.date}` }) : new TextRun(''),
              ]
            }));
            if (item.description) {
              children.push(new Paragraph({ text: item.description }));
            }
          });
        }
      });
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: children,
      }],
    });

    const buffer = await Packer.toBuffer(doc);

    return new Response(buffer as any, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=resume.docx'
      }
    });
  } catch (error: any) {
    console.error('Docx Export Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate word document' }, { status: 500 });
  }
}
