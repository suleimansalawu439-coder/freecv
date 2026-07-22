"use client";

import React, { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Plus, 
  Trash2, 
  Download,
  X,
  Eye,
  Layout,
  FolderOpen,
  Award,
  Users,
  Paintbrush,
  Sparkles,
  Loader2,
  Linkedin,
  GripVertical
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { trackEvent } from '@/lib/analytics';
import { supabase } from '@/lib/supabase';

import { templates, TemplateKey } from '@/components/templates';
import NewsletterCapture from '@/components/NewsletterCapture';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  contact: string;
}

export interface ResumeData {
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
  hasOptedIn: boolean;
}

// --- Store ---
interface ResumeStore {
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
  setHasOptedIn: (optedIn: boolean) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;
  reorderSkills: (startIndex: number, endIndex: number) => void;
  setAllData: (data: Partial<ResumeData>) => void;
}

const initialData: ResumeData = {
  templateId: 'Executive',
  theme: { color: '#2563eb' },
  personalInfo: {
    fullName: "Jane Doe",
    jobTitle: "Senior Product Designer",
    email: "jane@freecv.dev",
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
  hasOptedIn: false
};

const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initialData,
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

      setHasOptedIn: (optedIn) => set((state) => ({ data: { ...state.data, hasOptedIn: optedIn } })),

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
    { name: 'freecv-storage' }
  )
);

// --- Components ---

const Input = ({ label, ...props }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">{label}</label>
    <input 
      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
      {...props}
    />
  </div>
);

const Textarea = ({ label, ...props }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">{label}</label>
    <textarea 
      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none min-h-[100px] resize-y custom-scrollbar"
      {...props}
    />
  </div>
);

const SectionHeader = ({ icon: Icon, title, description, onRemove }: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6">
    <div className="flex items-center gap-4">
      <div className="p-2.5 bg-black rounded-xl text-white shadow-lg shadow-black/10 w-fit shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 leading-tight">{title}</h3>
        <p className="text-xs text-gray-500 font-medium">{description}</p>
      </div>
    </div>
    {onRemove && (
      <button onClick={onRemove} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
        Remove Section
      </button>
    )}
  </div>
);

const Card = ({ children, className }: any) => (
  <div className={cn("bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm mb-6", className)}>
    {children}
  </div>
);

// --- Main Page ---

export default function FreeCVApp() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { 
    data: storeData, setTemplateId, setThemeColor, updatePersonalInfo, updateSummary, 
    addExperience, updateExperience, removeExperience, 
    addEducation, updateEducation, removeEducation, 
    addSkill, removeSkill,
    toggleProjects, addProject, updateProject, removeProject,
    toggleCertifications, addCertification, updateCertification, removeCertification,
    toggleReferences, addReference, updateReference, removeReference, setHasOptedIn,
    reorderExperience, reorderEducation, reorderSkills, setAllData
  } = useResumeStore();
  
  const data = {
    ...storeData,
    projects: storeData.projects || [],
    certifications: storeData.certifications || [],
    references: storeData.references || [],
    hasOptedIn: storeData.hasOptedIn || false
  };

  const [skillInput, setSkillInput] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isOptInModalOpen, setIsOptInModalOpen] = useState(false);

  // AI Generation State
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatingExpId, setGeneratingExpId] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    if (type === 'experience') {
      reorderExperience(source.index, destination.index);
    } else if (type === 'education') {
      reorderEducation(source.index, destination.index);
    } else if (type === 'skills') {
      reorderSkills(source.index, destination.index);
    }
  };

  const handleLinkedInImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsImporting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/ai/parse-linkedin', {
        method: 'POST',
        body: formData
      });
      
      const resData = await res.json();
      if (res.ok) {
        setAllData(resData);
      } else {
        throw new Error(resData.error || 'Failed to parse LinkedIn PDF');
      }
    } catch (err: any) {
      alert("LinkedIn Import failed: " + err.message);
    }
    setIsImporting(false);
    // Reset file input
    e.target.value = '';
  };


  const handleGenerateSummary = async () => {
    if (!data.personalInfo.jobTitle) {
      alert("Please enter a Job Title in the Personal Info section first so the AI knows what to write about.");
      return;
    }
    setIsGeneratingSummary(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'summary', jobTitle: data.personalInfo.jobTitle })
      });
      const resData = await res.json();
      if (res.ok && resData.text) {
        updateSummary(resData.text);
      } else {
        throw new Error(resData.error || 'Failed to generate');
      }
    } catch (err: any) {
      alert("AI Generation failed: " + err.message);
    }
    setIsGeneratingSummary(false);
  };

  const handleGenerateExperience = async (expId: string, role: string, company: string) => {
    const jobTitleToUse = role || data.personalInfo.jobTitle;
    if (!jobTitleToUse) {
      alert("Please enter a Role for this experience (or a global Job Title) so the AI knows what to write.");
      return;
    }
    setGeneratingExpId(expId);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'experience', jobTitle: jobTitleToUse, company })
      });
      const resData = await res.json();
      if (res.ok && resData.text) {
        updateExperience(expId, { description: resData.text });
      } else {
        throw new Error(resData.error || 'Failed to generate');
      }
    } catch (err: any) {
      alert("AI Generation failed: " + err.message);
    }
    setGeneratingExpId(null);
  };

  useEffect(() => { 
    setIsHydrated(true); 
    trackEvent('milestone_started');
  }, []);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim()) {
      addSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  const triggerPrint = () => {
    // Reset scroll positions so print starts from top
    const panel = document.getElementById('preview-panel');
    if (panel) panel.scrollTop = 0;
    window.scrollTo(0, 0);
    
    // Add 'printing' class to force-show the preview panel via CSS
    document.body.classList.add('printing');
    
    // Small delay to let the browser recalculate layout
    setTimeout(() => {
      window.print();
      // Clean up after print dialog closes
      document.body.classList.remove('printing');
    }, 150);
  };

  const handleDownload = () => {
    trackEvent('milestone_downloaded', data.templateId);
    if (!data.hasOptedIn) {
      setIsOptInModalOpen(true);
    } else {
      triggerPrint();
    }
  };

  const handleOptIn = async (optIn: boolean) => {
    if (optIn) {
      trackEvent('milestone_opted_in', data.templateId);
      setHasOptedIn(true);
      await supabase.from('candidates').insert([{
        email: data.personalInfo.email || `anon-${crypto.randomUUID()}@freecv.dev`,
        full_name: data.personalInfo.fullName || 'Anonymous',
        job_title: data.personalInfo.jobTitle || 'Unknown',
        resume_data: data,
        template_id: data.templateId
      }]);
    }
    setIsOptInModalOpen(false);
    triggerPrint();
  };

  if (!isHydrated) return null;

  const SelectedTemplate = templates[data.templateId] || templates.Executive;

  return (
    <main className="flex h-screen w-full bg-[#FAFAFA] overflow-hidden font-sans text-gray-900 selection:bg-black selection:text-white print:block print:h-auto print:overflow-visible">
      
      {/* EDITOR PANEL */}
      <section className="w-full lg:w-[45%] h-full overflow-y-auto border-r border-gray-200 bg-white print:hidden px-6 py-8 lg:px-10 lg:py-12 custom-scrollbar flex-shrink-0 relative">
        <div className="max-w-xl mx-auto pb-24 lg:pb-0">
          
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase">FreeCV</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Premium & Forever Free</p>
            </div>
            <button 
              onClick={handleDownload}
              className="hidden lg:flex group items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20"
            >
              <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              Download PDF
            </button>
          </header>

          {/* Template Gallery Prominent Button */}
          <div className="mb-12">
            <button 
              onClick={() => setIsGalleryOpen(true)}
              className="w-full relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl font-bold flex items-center justify-between group shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-white/10 to-transparent transform translate-x-full group-hover:-translate-x-full duration-1000"></div>
              <div className="flex items-center gap-4 sm:gap-5 relative z-10">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner border border-white/20">
                  <Layout className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg sm:text-xl tracking-tight leading-none mb-1">Template Gallery</span>
                  <span className="hidden sm:block text-xs text-gray-400 font-medium tracking-wide uppercase">Select from {Object.keys(templates).length} Premium Layouts</span>
                  <span className="sm:hidden text-[10px] text-gray-400 font-medium uppercase">{Object.keys(templates).length} Layouts</span>
                </div>
              </div>
              <div className="relative z-10 bg-white text-black p-2.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-black shadow-lg group-hover:bg-blue-500 group-hover:text-white transition-colors flex items-center gap-2">
                <span className="hidden sm:inline">Change Design</span>
                <Paintbrush size={16} className="block sm:hidden" />
              </div>
            </button>
          </div>

          {/* Theme Color Picker */}
          <SectionHeader icon={Paintbrush} title="Theme Accent" description="Select a global accent color." />
          <Card>
            <div className="flex flex-wrap gap-3">
              {['#000000', '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c', '#0d9488', '#475569'].map((hex) => (
                <button
                  key={hex}
                  onClick={() => setThemeColor(hex)}
                  className={cn(
                    "w-10 h-10 rounded-full shadow-sm border-2 transition-transform",
                    data.theme?.color === hex ? "border-black scale-110" : "border-transparent hover:scale-105"
                  )}
                  style={{ backgroundColor: hex }}
                  aria-label={`Select color ${hex}`}
                />
              ))}
              <div className="relative">
                <input
                  type="color"
                  value={data.theme?.color || '#2563eb'}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-10 h-10 rounded-full cursor-pointer opacity-0 absolute inset-0 z-10"
                />
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full shadow-sm border-2 flex items-center justify-center text-xl font-bold bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500",
                    !['#000000', '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c', '#0d9488', '#475569'].includes(data.theme?.color || '') ? "border-black scale-110" : "border-transparent"
                  )}
                >
                  <span className="text-white drop-shadow-md">+</span>
                </div>
              </div>
            </div>
          </Card>

          <DragDropContext onDragEnd={onDragEnd}>
          
          {/* LinkedIn Import */}
          <div className="mb-12 relative overflow-hidden bg-[#0A66C2] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl shadow-[#0A66C2]/20 flex flex-col sm:flex-row items-center gap-6 justify-between group">
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/20 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                <Linkedin className="text-[#0A66C2] w-8 h-8" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">Import from LinkedIn</h3>
                <p className="text-blue-100 text-sm font-medium">Save hours of typing. Upload your LinkedIn PDF to auto-fill everything.</p>
              </div>
            </div>
            <div className="relative z-10 shrink-0 w-full sm:w-auto">
              <input 
                type="file" 
                accept="application/pdf"
                onChange={handleLinkedInImport}
                disabled={isImporting}
                className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed z-20 w-full"
                title="Upload LinkedIn Profile PDF"
              />
              <button disabled={isImporting} className="w-full sm:w-auto bg-white text-[#0A66C2] px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0">
                {isImporting ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {isImporting ? 'Importing magic...' : 'Upload PDF'}
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <SectionHeader icon={User} title="Personal Identity" description="Who are you and what do you do?" />
          <Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={data.personalInfo.fullName} onChange={(e:any) => updatePersonalInfo({ fullName: e.target.value })} placeholder="Jane Doe" />
              <Input label="Job Title" value={data.personalInfo.jobTitle} onChange={(e:any) => updatePersonalInfo({ jobTitle: e.target.value })} placeholder="Senior Designer" />
              <Input label="Email" value={data.personalInfo.email} onChange={(e:any) => updatePersonalInfo({ email: e.target.value })} />
              <Input label="Phone" value={data.personalInfo.phone} onChange={(e:any) => updatePersonalInfo({ phone: e.target.value })} />
              <Input label="Location" value={data.personalInfo.location} onChange={(e:any) => updatePersonalInfo({ location: e.target.value })} />
              <Input label="Website/Portfolio" value={data.personalInfo.website} onChange={(e:any) => updatePersonalInfo({ website: e.target.value })} />
              <div className="col-span-1 sm:col-span-2 mt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1 block mb-1.5">Profile Picture (Optional)</label>
                <div className="flex items-center gap-4">
                  {data.personalInfo.profilePicture && (
                    <img src={data.personalInfo.profilePicture} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-gray-200 shrink-0 shadow-sm" />
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updatePersonalInfo({ profilePicture: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                    />
                  </div>
                  {data.personalInfo.profilePicture && (
                    <button 
                      onClick={() => updatePersonalInfo({ profilePicture: undefined })}
                      className="text-xs text-red-500 font-bold hover:bg-red-50 px-3 py-2 rounded-lg transition-colors shrink-0"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center ml-1 mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Professional Summary</label>
                <button 
                  onClick={handleGenerateSummary}
                  disabled={isGeneratingSummary}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-full transition-colors disabled:opacity-50"
                >
                  {isGeneratingSummary ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  {isGeneratingSummary ? 'Writing...' : 'Generate with AI'}
                </button>
              </div>
              <textarea 
                className="mt-1.5 w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none min-h-[100px] resize-none"
                value={data.summary}
                onChange={(e) => updateSummary(e.target.value)}
              />
            </div>
          </Card>

          {/* Work Experience */}
          <div className="flex justify-between items-center mb-6">
            <SectionHeader icon={Briefcase} title="Professional Experience" description="Showcase your career milestones" />
            <button onClick={addExperience} className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-lg transition-colors shrink-0">
              <Plus size={18} />
            </button>
          </div>
          <Droppable droppableId="experience" type="experience">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {data.experience.map((exp, index) => (
                  <Draggable key={exp.id} draggableId={exp.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="mb-6 relative group"
                      >
                        <div 
                          {...provided.dragHandleProps}
                          className="absolute left-[-16px] top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                        >
                          <GripVertical size={20} />
                        </div>
                        <Card className="mb-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input label="Company" value={exp.company} onChange={(e:any) => updateExperience(exp.id, { company: e.target.value })} />
                <Input label="Role" value={exp.role} onChange={(e:any) => updateExperience(exp.id, { role: e.target.value })} />
                <Input label="Start Date" value={exp.startDate} onChange={(e:any) => updateExperience(exp.id, { startDate: e.target.value })} />
                <Input label="End Date" value={exp.endDate} onChange={(e:any) => updateExperience(exp.id, { endDate: e.target.value })} />
              </div>
              <div className="mb-2">
                <div className="flex justify-between items-center ml-1 mb-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Accomplishments (New line per point)</label>
                  <button 
                    onClick={() => handleGenerateExperience(exp.id, exp.role, exp.company)}
                    disabled={generatingExpId === exp.id}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-full transition-colors disabled:opacity-50"
                  >
                    {generatingExpId === exp.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    {generatingExpId === exp.id ? 'Writing...' : 'Generate with AI'}
                  </button>
                </div>
                <textarea 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none min-h-[100px] resize-none"
                  value={exp.description}
                  onChange={(e:any) => updateExperience(exp.id, { description: e.target.value })}
                />
              </div>
              <button 
                onClick={() => removeExperience(exp.id)} 
                className="w-full mt-6 bg-red-50 text-red-600 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
              >
                <Trash2 size={16} /> Delete Experience
              </button>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Education */}
          <div className="flex justify-between items-center mb-6">
            <SectionHeader icon={GraduationCap} title="Education" description="Where did you learn your craft?" />
            <button onClick={addEducation} className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-lg transition-colors shrink-0">
              <Plus size={18} />
            </button>
          </div>
          <Droppable droppableId="education" type="education">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {data.education.map((edu, index) => (
                  <Draggable key={edu.id} draggableId={edu.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="mb-6 relative group"
                      >
                        <div 
                          {...provided.dragHandleProps}
                          className="absolute left-[-16px] top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                        >
                          <GripVertical size={20} />
                        </div>
                        <Card className="mb-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1 sm:col-span-2">
                  <Input label="School/University" value={edu.school} onChange={(e:any) => updateEducation(edu.id, { school: e.target.value })} />
                </div>
                <Input label="Degree" value={edu.degree} onChange={(e:any) => updateEducation(edu.id, { degree: e.target.value })} />
                <Input label="Graduation Year" value={edu.graduationYear} onChange={(e:any) => updateEducation(edu.id, { graduationYear: e.target.value })} />
              </div>
              <button 
                onClick={() => removeEducation(edu.id)} 
                className="w-full mt-6 bg-red-50 text-red-600 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
              >
                <Trash2 size={16} /> Delete Education
              </button>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Skills */}
          <SectionHeader icon={Wrench} title="Skill Arsenal" description="What tools do you master?" />
          <Card>
            <form onSubmit={handleAddSkill} className="flex gap-2 mb-6">
              <input 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                placeholder="Add a skill (e.g. TypeScript, AWS)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider">Add</button>
            </form>
            <Droppable droppableId="skills" type="skills" direction="horizontal">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-wrap gap-3">
                  {data.skills.map((s, index) => (
                    <Draggable key={s.id} draggableId={s.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="relative flex items-center"
                        >
                          <div 
                            {...provided.dragHandleProps}
                            className="absolute left-[-8px] text-gray-300 hover:text-black cursor-grab active:cursor-grabbing z-10"
                          >
                            <GripVertical size={14} />
                          </div>
                          <span className="group flex items-center gap-2 bg-gray-100 border border-gray-200 pl-6 pr-2 py-2 rounded-full text-sm font-bold text-gray-700 transition-all">
                  {s.name}
                  <button onClick={() => removeSkill(s.id)} className="p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <X size={14} />
                  </button>
                </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Card>

          {/* Projects Section */}
          {data.showProjects && (
            <>
              <div className="flex justify-between items-center mb-6">
                <SectionHeader icon={FolderOpen} title="Projects" description="Showcase your key projects" onRemove={toggleProjects} />
                <button onClick={addProject} className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-lg transition-colors shrink-0">
                  <Plus size={18} />
                </button>
              </div>
              {(data.projects || []).map((proj) => (
                <Card key={proj.id}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <Input label="Project Name" value={proj.name} onChange={(e:any) => updateProject(proj.id, { name: e.target.value })} />
                    <Input label="Link / URL" value={proj.link} onChange={(e:any) => updateProject(proj.id, { link: e.target.value })} />
                  </div>
                  <Input label="Description" value={proj.description} onChange={(e:any) => updateProject(proj.id, { description: e.target.value })} />
                  <button 
                    onClick={() => removeProject(proj.id)} 
                    className="w-full mt-6 bg-red-50 text-red-600 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
                  >
                    <Trash2 size={16} /> Delete Project
                  </button>
                </Card>
              ))}
            </>
          )}

          {/* Certifications Section */}
          {data.showCertifications && (
            <>
              <div className="flex justify-between items-center mb-6">
                <SectionHeader icon={Award} title="Certifications" description="Official recognitions" onRemove={toggleCertifications} />
                <button onClick={addCertification} className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-lg transition-colors shrink-0">
                  <Plus size={18} />
                </button>
              </div>
              {(data.certifications || []).map((cert) => (
                <Card key={cert.id}>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <Input label="Certification Name" value={cert.name} onChange={(e:any) => updateCertification(cert.id, { name: e.target.value })} />
                    <Input label="Issuer" value={cert.issuer} onChange={(e:any) => updateCertification(cert.id, { issuer: e.target.value })} />
                    <Input label="Date Earned" value={cert.date} onChange={(e:any) => updateCertification(cert.id, { date: e.target.value })} />
                  </div>
                  <button 
                    onClick={() => removeCertification(cert.id)} 
                    className="w-full mt-6 bg-red-50 text-red-600 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
                  >
                    <Trash2 size={16} /> Delete Certification
                  </button>
                </Card>
              ))}
            </>
          )}

          {/* References Section */}
          {data.showReferences && (
            <>
              <div className="flex justify-between items-center mb-6">
                <SectionHeader icon={Users} title="References" description="People who vouch for you" onRemove={toggleReferences} />
                <button onClick={addReference} className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-lg transition-colors shrink-0">
                  <Plus size={18} />
                </button>
              </div>
              {(data.references || []).map((ref) => (
                <Card key={ref.id}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <Input label="Name" value={ref.name} onChange={(e:any) => updateReference(ref.id, { name: e.target.value })} />
                    <Input label="Title" value={ref.title} onChange={(e:any) => updateReference(ref.id, { title: e.target.value })} />
                    <Input label="Company" value={ref.company} onChange={(e:any) => updateReference(ref.id, { company: e.target.value })} />
                    <Input label="Contact (Email/Phone)" value={ref.contact} onChange={(e:any) => updateReference(ref.id, { contact: e.target.value })} />
                  </div>
                  <button 
                    onClick={() => removeReference(ref.id)} 
                    className="w-full mt-6 bg-red-50 text-red-600 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
                  >
                    <Trash2 size={16} /> Delete Reference
                  </button>
                </Card>
              ))}
            </>
          )}

          {/* Add New Sections Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-gray-200 flex-wrap">
            {!data.showProjects && (
              <button onClick={toggleProjects} className="flex-1 min-w-[200px] py-4 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-100 rounded-2xl font-bold text-sm text-gray-600 hover:text-black flex items-center justify-center gap-2 transition-all">
                <Plus size={18} /> Add Projects
              </button>
            )}
            {!data.showCertifications && (
              <button onClick={toggleCertifications} className="flex-1 min-w-[200px] py-4 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-100 rounded-2xl font-bold text-sm text-gray-600 hover:text-black flex items-center justify-center gap-2 transition-all">
                <Plus size={18} /> Add Certifications
              </button>
            )}
            {!data.showReferences && (
              <button onClick={toggleReferences} className="flex-1 min-w-[200px] py-4 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-100 rounded-2xl font-bold text-sm text-gray-600 hover:text-black flex items-center justify-center gap-2 transition-all">
                <Plus size={18} /> Add References
              </button>
            )}
          </div>

          {/* Marketing Engine / Newsletter Capture */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <NewsletterCapture source="main_editor" />
          </div>

          </DragDropContext>
        </div>
      </section>

      {/* MOBILE FAB (Floating Action Button) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 print:hidden w-full max-w-sm px-6">
        <button 
          onClick={() => {
            trackEvent('milestone_previewed', data.templateId);
            setIsPreviewOpen(true);
          }}
          className="w-full bg-black text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-2xl flex items-center justify-center gap-3 border-[6px] border-white active:scale-95 transition-transform"
        >
          <Eye size={18} /> Preview Resume
        </button>
      </div>

      {/* PREVIEW PANEL (Desktop standard, Mobile Modal) */}
      <section 
        id="preview-panel"
        className={cn(
        "flex-1 h-full overflow-y-auto overflow-x-auto bg-[#E5E7EB] p-0 lg:p-12 print:p-0 print:bg-white flex lg:justify-center items-start custom-scrollbar print-safe-container",
        isPreviewOpen ? "fixed inset-0 z-50 flex-col" : "hidden lg:flex"
      )}>
        
        {/* Mobile Modal Actions */}
        {isPreviewOpen && (
          <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 lg:hidden print:hidden border-t border-gray-200">
            <button onClick={() => setIsPreviewOpen(false)} className="flex-1 bg-gray-100 text-black py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-colors active:bg-gray-200">
              <X size={16} /> Edit
            </button>
            <button onClick={handleDownload} className="flex-1 bg-black text-white py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest flex justify-center items-center gap-2 active:scale-95 transition-transform">
              <Download size={16} /> Download
            </button>
          </div>
        )}

        <div className={cn(
          "mx-auto lg:mx-0 shrink-0 shadow-2xl print:shadow-none bg-white transition-all origin-top print-safe-content",
          isPreviewOpen ? "mb-32 mt-4" : ""
        )}
        style={{
          ...(isPreviewOpen ? { transform: 'scale(min(1, calc(100vw / 860)))' } : {}),
          '--theme-color': data.theme?.color || '#2563eb'
        } as React.CSSProperties}
        >
          <SelectedTemplate data={data} />
        </div>

      </section>

      {/* TEMPLATE GALLERY MODAL (LIVE MINIATURES) */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col print:hidden">
          <div className="p-6 lg:p-8 border-b border-gray-200 flex justify-between items-center bg-white z-10 shadow-sm relative">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight leading-none">Template Gallery</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2">See your exact resume in {Object.keys(templates).length} premium styles</p>
            </div>
            <button onClick={() => setIsGalleryOpen(false)} className="p-4 bg-gray-100 hover:bg-black hover:text-white rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar bg-gray-50">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[1600px] mx-auto">
              {(Object.keys(templates) as TemplateKey[]).map((key) => {
                const isActive = data.templateId === key;
                const Tmpl = templates[key];
                return (
                  <button 
                    key={key}
                    onClick={() => {
                      setTemplateId(key);
                      setIsGalleryOpen(false);
                    }}
                    className={cn(
                      "flex flex-col text-left group bg-white border-4 rounded-3xl overflow-hidden transition-all relative",
                      isActive ? "border-blue-600 shadow-2xl scale-[1.02]" : "border-transparent hover:border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1"
                    )}
                    style={{ contentVisibility: 'auto', containIntrinsicSize: '300px 400px' }}
                  >
                    <div className="aspect-[8.5/11] bg-[#e5e7eb] w-full relative overflow-hidden flex justify-center pointer-events-none">
                      <div 
                        className="origin-top transform scale-[0.16] sm:scale-[0.20] md:scale-[0.22] lg:scale-[0.25] xl:scale-[0.22] 2xl:scale-[0.25] w-[816px] bg-white absolute top-0 shadow-xl"
                        style={{ '--theme-color': data.theme?.color || '#2563eb' } as React.CSSProperties}
                      >
                        <Tmpl data={data} />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>
                    {isActive && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-10 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Active
                      </div>
                    )}
                    <div className="p-4 border-t border-gray-100 bg-white z-10 w-full flex items-center justify-between">
                      <div className="truncate pr-2">
                        <h3 className="font-bold text-sm lg:text-base leading-tight truncate">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* OPT-IN MODAL */}
      {isOptInModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl transform transition-all">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Briefcase size={32} />
            </div>
            <h2 className="text-2xl font-black mb-3 leading-tight">Looking for your next role?</h2>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              Make your resume visible to verified startups and tech companies hiring right now. We'll add you to our exclusive Talent Pool.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleOptIn(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-sm transition-colors flex justify-center items-center gap-2"
              >
                Yes, make me visible & Download
              </button>
              <button 
                onClick={() => handleOptIn(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-4 rounded-xl font-bold text-sm transition-colors"
              >
                No thanks, just download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @page { size: letter; margin: 0; }
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .custom-scrollbar { scrollbar-width: none; }
          .custom-scrollbar::-webkit-scrollbar { display: none; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}} />
    </main>
  );
}
