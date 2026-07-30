import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { temporal } from 'zundo';
import { TemplateKey } from '@/components/templates';

// --- Types ---
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
}

// --- Store ---
interface ResumeStore {
  setCurrentResumeId: (id: string | null) => void;
  setResumeTitle: (title: string) => void;
  data: ResumeData;
  setTemplateId: (id: TemplateKey) => void;
  setThemeColor: (color: string) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (name: string) => void;
  removeSkill: (id: string) => void;
  toggleProjects: () => void;
  addProject: () => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  toggleCertifications: () => void;
  addCertification: () => void;
  updateCertification: (id: string, updates: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  toggleReferences: () => void;
  addReference: () => void;
  updateReference: (id: string, updates: Partial<Reference>) => void;
  removeReference: (id: string) => void;
  setConsents: (consents: Partial<{ recruiterShare: boolean; emailJobs: boolean; analytics: boolean }>) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;
  reorderSkills: (startIndex: number, endIndex: number) => void;
  setAllData: (data: Partial<ResumeData>) => void;
  addCustomSection: () => void;
  updateCustomSectionTitle: (id: string, title: string) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, updates: Partial<CustomSectionItem>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  reorderCustomSections: (startIndex: number, endIndex: number) => void;
  reorderCustomSectionItems: (sectionId: string, startIndex: number, endIndex: number) => void;
}

export const initialData: ResumeData = {
  currentResumeId: null,
  resumeTitle: "Untitled Resume",
  templateId: 'Executive',
  theme: { color: '#2563eb' },
  personalInfo: {
    fullName: "Jane Doe",
    jobTitle: "Senior Product Designer",
    email: "jane@cvyon.dev",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "janedoe.com",
  },
  summary: "Detail-oriented Product Designer with 6+ years of experience crafting premium digital experiences. Passionate about brutalist minimalism and accessible design systems.",
  experience: [
    {
      id: '1',
      company: "Acme Corp",
      role: "Lead UI Designer",
      startDate: "2022",
      endDate: "Present",
      description: "Led the redesign of the core SaaS platform.\nManaged a team of 3 designers.\nImplemented a new design system."
    }
  ],
  education: [
    {
      id: '1',
      school: "Rhode Island School of Design",
      degree: "BFA in Interaction Design",
      graduationYear: "2018"
    }
  ],
  skills: [
    { id: '1', name: "Figma" },
    { id: '2', name: "React" },
    { id: '3', name: "Tailwind" }
  ],
  showProjects: false,
  projects: [],
  showCertifications: false,
  certifications: [],
  showReferences: false,
  references: [],
  consents: {
    recruiterShare: false,
    emailJobs: false,
    analytics: true
  },
  customSections: []
};

export const useResumeStore = create<ResumeStore>()(
  temporal(
    persist(
      (set) => ({
        data: initialData,
        setCurrentResumeId: (id) => set((state) => ({ data: { ...state.data, currentResumeId: id } })),
        setResumeTitle: (title) => set((state) => ({ data: { ...state.data, resumeTitle: title } })),
        setTemplateId: (id) => set((state) => ({ data: { ...state.data, templateId: id } })),
        setThemeColor: (color) => set((state) => ({ data: { ...state.data, theme: { color } } })),
        updatePersonalInfo: (info) =>
          set((state) => ({
            data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } },
          })),
        updateSummary: (summary) =>
          set((state) => ({ data: { ...state.data, summary } })),
        
        addExperience: () => set((state) => ({
          data: {
            ...state.data,
            experience: [...state.data.experience, { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', description: '' }]
          }
        })),
        updateExperience: (id, updates) => set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map(exp => exp.id === id ? { ...exp, ...updates } : exp)
          }
        })),
        removeExperience: (id) => set((state) => ({
          data: { ...state.data, experience: state.data.experience.filter(exp => exp.id !== id) }
        })),

        addEducation: () => set((state) => ({
          data: {
            ...state.data,
            education: [...state.data.education, { id: crypto.randomUUID(), school: '', degree: '', graduationYear: '' }]
          }
        })),
        updateEducation: (id, updates) => set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map(edu => edu.id === id ? { ...edu, ...updates } : edu)
          }
        })),
        removeEducation: (id) => set((state) => ({
          data: { ...state.data, education: state.data.education.filter(edu => edu.id !== id) }
        })),

        addSkill: (name) => set((state) => ({
          data: { ...state.data, skills: [...state.data.skills, { id: crypto.randomUUID(), name }] }
        })),
        removeSkill: (id) => set((state) => ({
          data: { ...state.data, skills: state.data.skills.filter(s => s.id !== id) }
        })),

        toggleProjects: () => set((state) => ({ data: { ...state.data, showProjects: !state.data.showProjects, projects: state.data.projects || [] } })),
        addProject: () => set((state) => ({
          data: { ...state.data, projects: [...(state.data.projects || []), { id: crypto.randomUUID(), name: '', description: '', link: '' }] }
        })),
        updateProject: (id, updates) => set((state) => ({
          data: { ...state.data, projects: (state.data.projects || []).map(p => p.id === id ? { ...p, ...updates } : p) }
        })),
        removeProject: (id) => set((state) => ({
          data: { ...state.data, projects: (state.data.projects || []).filter(p => p.id !== id) }
        })),

        toggleCertifications: () => set((state) => ({ data: { ...state.data, showCertifications: !state.data.showCertifications, certifications: state.data.certifications || [] } })),
        addCertification: () => set((state) => ({
          data: { ...state.data, certifications: [...(state.data.certifications || []), { id: crypto.randomUUID(), name: '', issuer: '', date: '' }] }
        })),
        updateCertification: (id, updates) => set((state) => ({
          data: { ...state.data, certifications: (state.data.certifications || []).map(c => c.id === id ? { ...c, ...updates } : c) }
        })),
        removeCertification: (id) => set((state) => ({
          data: { ...state.data, certifications: (state.data.certifications || []).filter(c => c.id !== id) }
        })),

        toggleReferences: () => set((state) => ({ data: { ...state.data, showReferences: !state.data.showReferences, references: state.data.references || [] } })),
        addReference: () => set((state) => ({
          data: { ...state.data, references: [...(state.data.references || []), { id: crypto.randomUUID(), name: '', title: '', company: '', contact: '' }] }
        })),
        updateReference: (id, updates) => set((state) => ({
          data: { ...state.data, references: (state.data.references || []).map(r => r.id === id ? { ...r, ...updates } : r) }
        })),
        removeReference: (id) => set((state) => ({
          data: { ...state.data, references: (state.data.references || []).filter(r => r.id !== id) }
        })),

        setConsents: (consents) => set((state) => ({ data: { ...state.data, consents: { ...state.data.consents, ...consents } } })),
        addCustomSection: () => set((state) => ({
          data: { ...state.data, customSections: [...(state.data.customSections || []), { id: crypto.randomUUID(), title: 'Custom Section', items: [] }] }
        })),
        updateCustomSectionTitle: (id, title) => set((state) => ({
          data: { ...state.data, customSections: (state.data.customSections || []).map(s => s.id === id ? { ...s, title } : s) }
        })),
        removeCustomSection: (id) => set((state) => ({
          data: { ...state.data, customSections: (state.data.customSections || []).filter(s => s.id !== id) }
        })),
        addCustomSectionItem: (sectionId) => set((state) => ({
          data: { ...state.data, customSections: (state.data.customSections || []).map(s => s.id === sectionId ? { ...s, items: [...s.items, { id: crypto.randomUUID(), title: '', subtitle: '', date: '', description: '' }] } : s) }
        })),
        updateCustomSectionItem: (sectionId, itemId, updates) => set((state) => ({
          data: { ...state.data, customSections: (state.data.customSections || []).map(s => s.id === sectionId ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, ...updates } : i) } : s) }
        })),
        removeCustomSectionItem: (sectionId, itemId) => set((state) => ({
          data: { ...state.data, customSections: (state.data.customSections || []).map(s => s.id === sectionId ? { ...s, items: s.items.filter(i => i.id !== itemId) } : s) }
        })),
        reorderCustomSections: (startIndex, endIndex) => set((state) => {
          const result = Array.from(state.data.customSections || []);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { data: { ...state.data, customSections: result } };
        }),
        reorderCustomSectionItems: (sectionId, startIndex, endIndex) => set((state) => {
          const result = Array.from(state.data.customSections || []);
          const sectionIndex = result.findIndex(s => s.id === sectionId);
          if (sectionIndex === -1) return state;
          const newItems = Array.from(result[sectionIndex].items);
          const [removed] = newItems.splice(startIndex, 1);
          newItems.splice(endIndex, 0, removed);
          result[sectionIndex] = { ...result[sectionIndex], items: newItems };
          return { data: { ...state.data, customSections: result } };
        }),

        reorderExperience: (startIndex, endIndex) => set((state) => {
          const result = Array.from(state.data.experience);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { data: { ...state.data, experience: result } };
        }),
        reorderEducation: (startIndex, endIndex) => set((state) => {
          const result = Array.from(state.data.education);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { data: { ...state.data, education: result } };
        }),
        reorderSkills: (startIndex, endIndex) => set((state) => {
          const result = Array.from(state.data.skills);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { data: { ...state.data, skills: result } };
        }),
        setAllData: (newData) => set((state) => ({
          data: { ...state.data, ...newData }
        })),

      }),
      { name: 'cvyon-storage' }
    ),
    { limit: 50 }
  )
);

