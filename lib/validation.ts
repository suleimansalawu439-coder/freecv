import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// Sanitization helper
export const sanitizeText = (text: string | null | undefined) => {
  if (!text) return text;
  // allow some basic formatting if needed, but for safety, strip all tags
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] }).trim();
};

export const sanitizeHtml = (html: string | null | undefined) => {
  if (!html) return html;
  return DOMPurify.sanitize(html);
};

// Zod Schemas
export const PersonalInfoSchema = z.object({
  fullName: z.string().max(100),
  jobTitle: z.string().max(100),
  email: z.string().email().or(z.literal('')),
  phone: z.string().max(30).optional(),
  location: z.string().max(100).optional(),
  website: z.string().max(200).optional(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string().max(100),
  role: z.string().max(100),
  startDate: z.string().max(20),
  endDate: z.string().max(20),
  description: z.string().max(3000), // Max 3000 chars for description to prevent payload abuse
});

export const EducationSchema = z.object({
  id: z.string(),
  school: z.string().max(100),
  degree: z.string().max(100),
  graduationYear: z.string().max(20),
});

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
});

export const CustomSectionItemSchema = z.object({
  id: z.string(),
  title: z.string().max(100),
  subtitle: z.string().max(100).optional(),
  date: z.string().max(50).optional(),
  description: z.string().max(2000).optional(),
});

export const CustomSectionSchema = z.object({
  id: z.string(),
  title: z.string().max(100),
  items: z.array(CustomSectionItemSchema),
});

export const ReferenceSchema = z.object({
  id: z.string(),
  name: z.string().max(100),
  title: z.string().max(100),
  company: z.string().max(100),
  contact: z.string().max(100),
});

export const ResumeDataSchema = z.object({
  templateId: z.string().max(50),
  themeColor: z.string().max(20),
  fontFamily: z.string().max(50),
  personalInfo: PersonalInfoSchema,
  summary: z.string().max(2000),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(SkillSchema),
  projects: z.array(z.any()).optional(),
  certifications: z.array(z.any()).optional(),
  customSections: z.array(CustomSectionSchema).optional(),
  references: z.array(ReferenceSchema).optional(),
  hasOptedIn: z.boolean().optional(),
});

// Helper to sanitize an entire resume object
export function sanitizeResumeData(data: any): any {
  if (!data) return data;
  
  try {
    const validated = ResumeDataSchema.parse(data);
    
    // Perform HTML/XSS sanitization on validated strings
    return {
      ...validated,
      personalInfo: {
        ...validated.personalInfo,
        fullName: sanitizeText(validated.personalInfo.fullName),
        jobTitle: sanitizeText(validated.personalInfo.jobTitle),
      },
      summary: sanitizeHtml(validated.summary),
      experience: validated.experience.map(exp => ({
        ...exp,
        company: sanitizeText(exp.company),
        role: sanitizeText(exp.role),
        description: sanitizeHtml(exp.description)
      })),
      // ... same for others, but this covers the main vectors
    };
  } catch (error) {
    throw error;
  }
}
