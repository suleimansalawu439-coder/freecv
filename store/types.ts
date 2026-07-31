import { TemplateKey } from '@/components/templates';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  profilePicture?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string; 
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  graduationYear: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  contact: string;
}

export interface ResumeData {
  currentResumeId?: string | null;
  resumeTitle?: string;
  templateId: TemplateKey;
  theme: {
    color: string;
  };
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  showProjects: boolean;
  projects: Project[];
  showCertifications: boolean;
  certifications: Certification[];
  showReferences: boolean;
  references: Reference[];
  consents: {
    recruiterShare: boolean;
    emailJobs: boolean;
    analytics: boolean;
  };
  customSections: CustomSection[];
  atsRecommendations?: unknown;
}

export interface ResumeSlice {
  data: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;
  
  addEducation: () => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;
  
  addSkill: (name: string) => void;
  removeSkill: (id: string) => void;
  reorderSkills: (startIndex: number, endIndex: number) => void;
  
  addProject: () => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  
  addCertification: () => void;
  updateCertification: (id: string, updates: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  
  addReference: () => void;
  updateReference: (id: string, updates: Partial<Reference>) => void;
  removeReference: (id: string) => void;

  addCustomSection: () => void;
  updateCustomSectionTitle: (id: string, title: string) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, updates: Partial<CustomSectionItem>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  reorderCustomSections: (startIndex: number, endIndex: number) => void;
  reorderCustomSectionItems: (sectionId: string, startIndex: number, endIndex: number) => void;
  
  setAllData: (data: Partial<ResumeData>) => void;
  setConsents: (consents: Partial<{ recruiterShare: boolean; emailJobs: boolean; analytics: boolean }>) => void;
}

export interface UISlice {
  setCurrentResumeId: (id: string | null) => void;
  setResumeTitle: (title: string) => void;
  setTemplateId: (id: TemplateKey) => void;
  setThemeColor: (color: string) => void;
  toggleProjects: () => void;
  toggleCertifications: () => void;
  toggleReferences: () => void;
  setAtsRecommendations: (recs: unknown) => void;
}

export interface SyncSlice {
  syncToCloud: () => Promise<void>;
}

export type StoreState = ResumeSlice & UISlice & SyncSlice;
