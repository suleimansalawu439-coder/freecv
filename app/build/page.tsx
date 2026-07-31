"use client";

import toast from 'react-hot-toast';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { temporal } from 'zundo';
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
  GripVertical,
  Moon,
  Sun,
  FileText,
  BarChart3,
  RefreshCw,
  Undo2,
  Redo2,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Upload,
  Save,
  Share2
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';
import { trackEvent } from '@/lib/analytics';
import { supabase } from '@/lib/supabase';

import { templates, TemplateKey } from '@/components/templates';
import { templates as htmlTemplates } from '@/components/html_templates';
import NewsletterCapture from '@/components/NewsletterCapture';
import { ImportResume } from '@/components/builder/ImportResume';
import { CoverLetterTab } from '@/components/builder/CoverLetterTab';
import { AuthModal } from '@/components/builder/AuthModal';

import dynamic from 'next/dynamic';
import { JobsModal } from '@/components/builder/JobsModal';
const PDFPreview = dynamic(() => import('@/components/builder/PDFPreview'), { ssr: false });
const PDFDownloadButton = dynamic(() => import('@/components/builder/PDFDownloadButton'), { ssr: false });


// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { useResumeStore, initialData, type ResumeData, type PersonalInfo, type Experience, type Education, type Skill, type Project, type Certification, type CustomSection, type CustomSectionItem, type Reference } from '@/store/useResumeStore';

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
      <div className="p-2.5 bg-[#141312] rounded-none text-[#E8E7E1] border-[3px] border-[#141312] hs-v shadow-black/10 w-fit shrink-0">
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
  <div className={cn("bg-white border-[3px] border-[#141312] hs rounded-none p-5 sm:p-6 mb-8 text-[#141312]", className)}>
    {children}
  </div>
);

const HTMLThumbnail = ({ Tmpl, data }: { Tmpl: any, data: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setScale(entries[0].contentRect.width / 816);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="aspect-[8.5/11] bg-white w-full relative overflow-hidden pointer-events-none">
      <div 
        className="absolute top-0 left-0 w-[816px] h-[1056px] origin-top-left bg-white" 
        style={{ transform: `scale(${scale})` }}
      >
        <Tmpl data={data} themeColor={data.theme?.color || '#2563eb'} />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
    </div>
  );
};

// --- Main Page ---

export default function FreeCVApp() {
  const [isHydrated, setIsHydrated] = useState(false);
  const onboardingAppliedRef = useRef(false);
  const previewViewportRef = useRef<HTMLElement | null>(null);
  const resumePageRef = useRef<HTMLDivElement | null>(null);
  const { 
    data: storeData, setTemplateId, setThemeColor, updatePersonalInfo, updateSummary, 
    addExperience, updateExperience, removeExperience, 
    addEducation, updateEducation, removeEducation, 
    addSkill, removeSkill,
    toggleProjects, addProject, updateProject, removeProject,
    toggleCertifications, addCertification, updateCertification, removeCertification,
    toggleReferences, addReference, updateReference, removeReference, setConsents,
    reorderExperience, reorderEducation, reorderSkills, setAllData, addCustomSection, updateCustomSectionTitle, removeCustomSection, addCustomSectionItem, updateCustomSectionItem, removeCustomSectionItem, reorderCustomSections, reorderCustomSectionItems
  } = useResumeStore();
  
  const data = useMemo(() => ({
    ...storeData,
    projects: storeData.projects || [],
    certifications: storeData.certifications || [],
    references: storeData.references || [],
    customSections: storeData.customSections || [],
    consents: storeData.consents || { recruiterShare: false, emailJobs: false, analytics: true }
  }), [storeData]);

  const [skillInput, setSkillInput] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [mobileZoom, setMobileZoom] = useState(false);
  const [mobilePreviewMetrics, setMobilePreviewMetrics] = useState({ scale: 1, width: 816, height: 1056 });
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isATSOpen, setIsATSOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatingExpId, setGeneratingExpId] = useState<string | null>(null);
  const [polishingExpId, setPolishingExpId] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ATS Grader
  const [atsJobDesc, setAtsJobDesc] = useState('');
  const [atsResult, setAtsResult] = useState<any>(null);
  const [isATSLoading, setIsATSLoading] = useState(false);

  // AI Rewriter
  const [isRewriterOpen, setIsRewriterOpen] = useState(false);
  const [rewriteTone, setRewriteTone] = useState('Executive');
  const [isRewriting, setIsRewriting] = useState(false);

  // Smart Skills
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');

  // Mobile Download Modal
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  
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

  const handlePolishExperience = async (id: string, currentText: string) => {
    if (!currentText.trim() || !data.personalInfo.jobTitle) {
      toast.error("Please enter a Job Title and some text to polish.");
      return;
    }
    try {
      setPolishingExpId(id);
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'polish', 
          jobTitle: data.personalInfo.jobTitle, 
          additionalContext: currentText 
        })
      });
      if (!res.ok) {
        const text = await res.text();
        let errMsg = '';
        try { const err = JSON.parse(text); errMsg = err.error || `API error: ${res.status}`; }
        catch(e) { errMsg = text.includes('An error') ? 'Request timed out.' : `API error: ${res.status}`; }
        throw new Error(errMsg);
      }
      const json = await res.json();
      if (json.text) {
        updateExperience(id, { description: json.text });
      } else if (json.error) {
        toast.error(json.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to polish text. Please try again.");
    } finally {
      setPolishingExpId(null);
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
      toast.error("LinkedIn Import failed: " + err.message);
    }
    setIsImporting(false);
    // Reset file input
    e.target.value = '';
  };


  const handleGenerateSummary = async () => {
    if (!data.personalInfo.jobTitle) {
      toast.error("Please enter a Job Title in the Personal Info section first so the AI knows what to write about.");
      return;
    }
    setIsGeneratingSummary(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'summary', jobTitle: data.personalInfo.jobTitle || 'Professional' })
      });
      if (!res.ok) {
        const text = await res.text();
        let errMsg = '';
        try { const err = JSON.parse(text); errMsg = err.error || `API error: ${res.status}`; }
        catch(e) { errMsg = text.includes('An error') ? 'Request timed out. Please try again.' : `API error: ${res.status}`; }
        throw new Error(errMsg);
      }
      const json = await res.json();
      if (json.text) {
        updateSummary(json.text);
      }
    } catch (err: any) {
      toast.error("AI Generation failed: " + err.message);
    }
    setIsGeneratingSummary(false);
  };

  const handleGenerateExperience = async (expId: string, role: string, company: string) => {
    const jobTitleToUse = role || data.personalInfo.jobTitle;
    if (!jobTitleToUse) {
      toast.error("Please enter a Role for this experience (or a global Job Title) so the AI knows what to write.");
      return;
    }
    setGeneratingExpId(expId);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'experience', jobTitle: jobTitleToUse, company })
      });
      if (!res.ok) {
        const text = await res.text();
        let errMsg = '';
        try { const err = JSON.parse(text); errMsg = err.error || `API error: ${res.status}`; }
        catch(e) { errMsg = text.includes('An error') ? 'Request timed out.' : `API error: ${res.status}`; }
        throw new Error(errMsg);
      }
      const json = await res.json();
      if (json.text) {
        updateExperience(expId, { description: json.text });
      }
    } catch (err: any) {
      toast.error("AI Generation failed: " + err.message);
    }
    setGeneratingExpId(null);
  };

  useEffect(() => { 
    setIsHydrated(true); 
    trackEvent('milestone_started');
    // Load dark mode preference
    const savedDark = localStorage.getItem('cvyon-dark-mode');
    if (savedDark === 'true') setIsDarkMode(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || onboardingAppliedRef.current) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('source') !== 'seo') return;

    const template = params.get('template') as TemplateKey | null;
    const jobTitle = params.get('jobTitle');
    const summary = params.get('summary');
    const skills = (params.get('skills') || '')
      .split('|')
      .map(skill => skill.trim())
      .filter(Boolean);

    const templateId = template && templates[template] ? template : data.templateId;
    const shouldReplaceDefaultSkills = data.skills.length === initialData.skills.length
      && data.skills.every((skill, index) => skill.name === initialData.skills[index]?.name);
    const nextSkills = skills.length > 0
      ? (shouldReplaceDefaultSkills
        ? skills.map((name, index) => ({ id: `seo-skill-${index}`, name }))
        : [
            ...data.skills,
            ...skills
              .filter(skill => !data.skills.some(existing => existing.name.toLowerCase() === skill.toLowerCase()))
              .map((name, index) => ({ id: `seo-skill-${Date.now()}-${index}`, name }))
          ])
      : data.skills;

    setAllData({
      templateId,
      personalInfo: {
        ...data.personalInfo,
        jobTitle: jobTitle || data.personalInfo.jobTitle
      },
      summary: summary && (!data.summary || data.summary === initialData.summary) ? summary : data.summary,
      skills: nextSkills
    });

    onboardingAppliedRef.current = true;
    window.history.replaceState({}, '', window.location.pathname);
  }, [isHydrated, data, setAllData]);

  useEffect(() => {
    if (!isHydrated || templates[data.templateId]) return;
    setTemplateId('Executive');
  }, [isHydrated, data.templateId, setTemplateId]);

  useEffect(() => {
    const updatePreviewMetrics = () => {
      const viewportWidth = previewViewportRef.current?.clientWidth || window.innerWidth;
      const pageWidth = resumePageRef.current?.offsetWidth || 816;
      const pageHeight = resumePageRef.current?.scrollHeight || 1056;
      const gutter = isPreviewOpen ? 32 : 0;
      const availableWidth = Math.max(320, viewportWidth - gutter);
      const fitScale = Math.min(1, availableWidth / pageWidth);
      const scale = isPreviewOpen && !mobileZoom ? fitScale : 1;

      setMobilePreviewMetrics({
        scale,
        width: Math.ceil(pageWidth * scale),
        height: Math.ceil(pageHeight * scale)
      });
    };

    updatePreviewMetrics();
    window.addEventListener('resize', updatePreviewMetrics);

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updatePreviewMetrics) : null;
    if (observer && resumePageRef.current) observer.observe(resumePageRef.current);
    if (observer && previewViewportRef.current) observer.observe(previewViewportRef.current);

    return () => {
      window.removeEventListener('resize', updatePreviewMetrics);
      observer?.disconnect();
    };
  }, [isHydrated, isPreviewOpen, mobileZoom, data]);

  // Undo/Redo keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        useResumeStore.temporal.getState().undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        useResumeStore.temporal.getState().redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('cvyon-dark-mode', String(next));
      return next;
    });
  }, []);

  // ATS Grader handler
  const handleATSGrade = async () => {
    if (!atsJobDesc.trim()) return;
    setIsATSLoading(true);
    setAtsResult(null);
    try {
      // Strip profilePicture to avoid massive base64 payload in prompt
      const resumePayload = { ...data, personalInfo: { ...data.personalInfo, profilePicture: undefined } };
      
      const res = await fetch('/api/ai/ats-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData: resumePayload, jobDescription: atsJobDesc })
      });
      if (!res.ok) {
        const text = await res.text();
        let errMsg = '';
        try { const err = JSON.parse(text); errMsg = err.error || `API error: ${res.status}`; }
        catch(e) { errMsg = text.includes('An error') ? 'The AI request timed out. Please try again.' : `API error: ${res.status}`; }
        throw new Error(errMsg);
      }
      const resData = await res.json();
      setAtsResult(resData);
      if (resData.score >= 85) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6']
        });
      }
    } catch (err: any) {
      toast.error('ATS Grading failed: ' + err.message);
    }
    setIsATSLoading(false);
  };

  // AI Rewriter handler
  const handleRewrite = async () => {
    setIsRewriting(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'rewrite',
          tone: rewriteTone,
          jobTitle: data.personalInfo.jobTitle,
          resumeData: {
            summary: data.summary,
            experience: data.experience.map(e => ({ id: e.id, description: e.description }))
          }
        })
      });
      if (!res.ok) {
        const text = await res.text();
        let errMsg = '';
        try { const err = JSON.parse(text); errMsg = err.error || `API error: ${res.status}`; }
        catch(e) { errMsg = text.includes('An error') ? 'Request timed out. Please try again.' : `API error: ${res.status}`; }
        throw new Error(errMsg);
      }
      const json = await res.json();
      if (json.summary) {
        updateSummary(json.summary);
        if (json.experience) {
          json.experience.forEach((exp: any) => {
            if (exp.id && exp.description) updateExperience(exp.id, { description: exp.description });
          });
        }
      }
    } catch (err: any) {
      toast.error('Rewrite failed: ' + err.message);
    }
    setIsRewriting(false);
    setIsRewriterOpen(false);
  };

  // Smart Skills handler
  const handleSuggestSkills = async () => {
    if (!data.personalInfo.jobTitle) return;
    setIsLoadingSkills(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'skills', jobTitle: data.personalInfo.jobTitle || 'Professional' })
      });
      if (!res.ok) {
        const text = await res.text();
        let errMsg = '';
        try { const err = JSON.parse(text); errMsg = err.error || `API error: ${res.status}`; }
        catch(e) { errMsg = text.includes('An error') ? 'Request timed out.' : `API error: ${res.status}`; }
        throw new Error(errMsg);
      }
      const json = await res.json();
      if (json.skills) {
        const existingNames = data.skills.map(s => s.name.toLowerCase());
        setSuggestedSkills(json.skills.filter((s: string) => !existingNames.includes(s.toLowerCase())));
      }
    } catch (err) {
      console.error('Skill suggestion failed', err);
    }
    setIsLoadingSkills(false);
  };

  // DOCX Export handler
  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishedUrl('');
    try {
      const res = await fetch('/api/resume/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to publish');
      setPublishedUrl(result.url);
      trackEvent('milestone_published_web', data.templateId);
    } catch (err: any) {
      toast.error('Publish failed: ' + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const getTelemetryMetadata = (format: 'pdf' | 'docx') => {
    let length = 0;
    if (data.summary) length += data.summary.length;
    data.experience.forEach(e => { length += (e.description?.length || 0); });
    
    const skipped_sections: string[] = [];
    if (!data.summary) skipped_sections.push('Summary');
    if (data.experience.length === 0) skipped_sections.push('Experience');
    if (data.education.length === 0) skipped_sections.push('Education');
    if (data.skills.length === 0) skipped_sections.push('Skills');

    return {
      format,
      themeColor: data.theme.color,
      resume_length: length,
      skipped_sections
    };
  };

  const handleDocxExport = async () => {
    try {
      const res = await fetch('/api/export/docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to generate DOCX');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeName = data.personalInfo.fullName.replace(/[^\w\s-]/g, '').trim() || 'My';
      const safeRole = data.personalInfo.jobTitle.replace(/[^\w\s-]/g, '').trim() || 'Resume';
      a.download = `${safeName}_${safeRole}_Resume.docx`.replace(/\s+/g, '_');
      a.click();
      URL.revokeObjectURL(url);
      trackEvent('milestone_downloaded', data.templateId, getTelemetryMetadata('docx'));
    } catch (err: any) {
      toast.error('DOCX export failed: ' + err.message);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim()) {
      addSkill(skillInput.trim());
      setSkillInput('');
    }
  };

  const triggerPrint = () => {
    // Save original title
    const originalTitle = document.title;
    
    // Set custom title for PDF filename (strip newlines to prevent \n showing in browser print footers)
    const safeName = data.personalInfo.fullName.replace(/[\r\n]+/g, ' ').replace(/[^\w\s-]/g, '').trim() || 'My';
    const safeRole = data.personalInfo.jobTitle.replace(/[\r\n]+/g, ' ').replace(/[^\w\s-]/g, '').trim() || 'Resume';
    document.title = `${safeName} - ${safeRole} - Resume`;

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
      document.title = originalTitle;
    }, 150);
  };

  const handleDownload = async () => {
    trackEvent('milestone_downloaded', data.templateId, getTelemetryMetadata('pdf'));
    
    // Register the CRM opt-in silently in the background
    if ((data.consents.recruiterShare || data.consents.emailJobs || data.consents.analytics) && data.personalInfo.email) {
      try {
        fetch('/api/crm/optin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(err => console.error('Silent CRM opt-in failed:', err));
      } catch (err) {
        console.error('Failed to trigger opt-in API', err);
      }
    }

    triggerPrint();
  };

  if (!isHydrated) return null;

  const SelectedTemplate = templates[data.templateId] || templates.Executive;

  return (
    <main className={cn("flex flex-col lg:flex-row min-h-screen w-full font-sans selection:bg-black selection:text-white print:block print:h-auto print:overflow-visible", isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-[#FAFAFA] text-gray-900')}>
      
      {/* EDITOR PANEL */}
      <section className={cn("w-full lg:w-[45%] border-r print:hidden px-6 py-8 lg:px-10 lg:py-12 flex-shrink-0 relative", isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200')}>
        <div className="max-w-xl mx-auto pb-24 lg:pb-0">
          
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase fd">Cvyon</h1>
              <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mt-1", isDarkMode ? 'text-gray-500' : 'text-gray-400')}>Premium & Forever Free</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => useResumeStore.temporal.getState().undo()} className={cn("p-2 rounded-lg transition-colors", isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500')} title="Undo (Ctrl+Z)">
                <Undo2 size={16} />
              </button>
              <button onClick={() => useResumeStore.temporal.getState().redo()} className={cn("p-2 rounded-lg transition-colors", isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500')} title="Redo (Ctrl+Y)">
                <Redo2 size={16} />
              </button>
              <button onClick={toggleDarkMode} className={cn("p-2 rounded-lg transition-colors", isDarkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-500')} title="Toggle Dark Mode">
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button 
                onClick={handleDownload}
                className="flex group items-center gap-2 bg-[#141312] text-[#E8E7E1] border-[3px] border-[#141312] rounded-none hover:bg-[#FF4326] hover:text-[#141312] hs px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20"
              >
                <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                PDF
              </button>
              <button 
                onClick={handleDocxExport}
                className="hidden lg:flex group items-center gap-2 bg-[#2233FF] text-[#E8E7E1] border-[3px] border-[#141312] rounded-none hover:bg-[#FF4326] hs px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-600/20"
              >
                <FileText size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                DOCX
              </button>
            </div>
          </header>
          {publishedUrl && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-green-800 font-bold text-sm">Your resume is live!</p>
                <a href={publishedUrl} target="_blank" rel="noreferrer" className="text-green-600 text-xs hover:underline mt-1 block">{publishedUrl}</a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(publishedUrl); toast.success('Copied!'); }} className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg shadow hover:bg-green-700">
                COPY LINK
              </button>
            </div>
          )}

          {/* AI Tools Bar */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setIsATSOpen(true)} className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border", isDarkMode ? 'bg-emerald-950 text-emerald-300 border-emerald-800 hover:bg-emerald-900' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100')}>
              <BarChart3 size={14} /> ATS Grader
            </button>
            <button onClick={() => setIsRewriterOpen(true)} className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border", isDarkMode ? 'bg-purple-950 text-purple-300 border-purple-800 hover:bg-purple-900' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100')}>
              <RefreshCw size={14} /> AI Rewriter
            </button>
          </div>

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
          
          <ImportResume />

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
              <div className={cn("col-span-1 sm:col-span-2 mt-2 flex items-center justify-between p-4 rounded-xl border", isDarkMode ? 'bg-blue-900/10 border-blue-900' : 'bg-blue-50 border-blue-100')}>
                <div>
                  <h4 className={cn("font-bold text-sm", isDarkMode ? 'text-blue-400' : 'text-blue-900')}>Make profile public</h4>
                  <p className={cn("text-xs", isDarkMode ? 'text-blue-500' : 'text-blue-700')}>Allow recruiters to find your resume on Cvyon.</p>
                </div>
                <button
                  onClick={() => setConsents({ ...data.consents, recruiterShare: !data.consents.recruiterShare })}
                  className={cn("w-12 h-6 rounded-full transition-colors relative flex-shrink-0", data.consents.recruiterShare ? 'bg-blue-600' : (isDarkMode ? 'bg-gray-700' : 'bg-gray-300'))}
                >
                  <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-transform", data.consents.recruiterShare ? 'translate-x-7' : 'translate-x-1')} />
                </button>
              </div>
              <div className="col-span-1 sm:col-span-2 mt-2 flex justify-center sm:justify-start">
                <div className="relative group cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => updatePersonalInfo({ profilePicture: reader.result as string });
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <div className={cn("w-24 h-24 rounded-full border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all", isDarkMode ? 'border-gray-700 hover:border-blue-500 bg-gray-800/50' : 'border-gray-300 hover:border-blue-500 bg-gray-50')}>
                    {data.personalInfo.profilePicture ? (
                      <img src={data.personalInfo.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload size={24} className={isDarkMode ? 'text-gray-500 mb-1' : 'text-gray-400 mb-1'} />
                        <span className={cn("text-[10px] font-bold uppercase tracking-wider text-center px-2", isDarkMode ? 'text-gray-500' : 'text-gray-400')}>Add Photo</span>
                      </>
                    )}
                  </div>
                  {data.personalInfo.profilePicture && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        updatePersonalInfo({ profilePicture: undefined });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm hover:bg-red-600"
                    >
                      <X size={14} />
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
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handlePolishExperience(exp.id, exp.description)}
                      disabled={polishingExpId === exp.id || !exp.description.trim()}
                      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-full transition-colors disabled:opacity-50"
                      title="Polish this text with AI"
                    >
                      {polishingExpId === exp.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                      {polishingExpId === exp.id ? 'Polishing...' : 'Polish'}
                    </button>
                    <button 
                      onClick={() => handleGenerateExperience(exp.id, exp.role, exp.company)}
                      disabled={generatingExpId === exp.id}
                      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-full transition-colors disabled:opacity-50"
                    >
                      {generatingExpId === exp.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                      {generatingExpId === exp.id ? 'Writing...' : 'Generate with AI'}
                    </button>
                  </div>
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
              <button type="submit" className="bg-[#141312] text-[#E8E7E1] border-[3px] border-[#141312] rounded-none hover:bg-[#FF4326] hover:text-[#141312] hs px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider">Add</button>
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

          {/* Smart Skill Suggestions */}
          <div className="mb-6">
            <button
              onClick={handleSuggestSkills}
              disabled={isLoadingSkills || !data.personalInfo.jobTitle}
              className={cn("flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all border disabled:opacity-40", isDarkMode ? 'bg-amber-950 text-amber-300 border-amber-800 hover:bg-amber-900' : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100')}
            >
              {isLoadingSkills ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {isLoadingSkills ? 'Finding skills...' : 'Suggest Skills with AI'}
            </button>
            {suggestedSkills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestedSkills.map((skill, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      addSkill(skill);
                      setSuggestedSkills(prev => prev.filter(s => s !== skill));
                    }}
                    className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border", isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-black')}
                  >
                    <Plus size={12} /> {skill}
                  </button>
                ))}
              </div>
            )}
          </div>

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

          
          {/* Custom Sections */}
          {data.customSections?.map((section: any, sectionIndex: number) => (
            <div key={section.id} className="mt-8">
              <div className="flex items-center justify-between mb-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <input 
                  type="text" 
                  value={section.title}
                  onChange={(e) => updateCustomSectionTitle(section.id, e.target.value)}
                  className="font-black uppercase tracking-widest text-lg bg-transparent border-none outline-none focus:ring-0 flex-1"
                />
                <button onClick={() => removeCustomSection(section.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
              </div>
              <Droppable droppableId={`custom-${section.id}`} type="custom-item">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                    {section.items.map((item: any, index: number) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} className={cn("bg-white border rounded-2xl p-4 sm:p-5 relative group transition-all", snapshot.isDragging ? 'shadow-2xl border-blue-500 scale-[1.02] z-50' : 'border-gray-200 hover:border-gray-300')}>
                            <div {...provided.dragHandleProps} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity p-2 cursor-grab active:cursor-grabbing hover:text-black">
                              <GripVertical size={16} />
                            </div>
                            <div className="pl-8">
                              <div className="flex justify-between items-start gap-4 mb-3">
                                <div className="flex-1 space-y-3">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Input label="Title" value={item.title} onChange={(e:any) => updateCustomSectionItem(section.id, item.id, { title: e.target.value })} placeholder="Project Name, Language, etc." />
                                    <Input label="Subtitle" value={item.subtitle} onChange={(e:any) => updateCustomSectionItem(section.id, item.id, { subtitle: e.target.value })} placeholder="Role, Level, etc." />
                                  </div>
                                  <Input label="Date/Info" value={item.date} onChange={(e:any) => updateCustomSectionItem(section.id, item.id, { date: e.target.value })} placeholder="2024, Fluent, etc." />
                                </div>
                                <button onClick={() => removeCustomSectionItem(section.id, item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 mt-6"><Trash2 size={16} /></button>
                              </div>
                              <div className="mt-3">
                                <label className={cn("block text-xs font-bold uppercase tracking-widest mb-2", isDarkMode ? 'text-gray-400' : 'text-gray-500')}>Description</label>
                                <textarea value={item.description} onChange={(e) => updateCustomSectionItem(section.id, item.id, { description: e.target.value })} className={cn("w-full rounded-xl border p-3 min-h-[80px] focus:ring-2 focus:ring-black focus:outline-none transition-all resize-y text-sm", isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200')} placeholder="Describe this item..." />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <button onClick={() => addCustomSectionItem(section.id)} className="w-full py-3 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-100 rounded-2xl font-bold text-sm text-gray-600 hover:text-black flex items-center justify-center gap-2 transition-all">
                      <Plus size={16} /> Add Item
                    </button>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
          
          <div className="mt-8">
            <button onClick={addCustomSection} className="w-full py-4 bg-blue-50 border-2 border-dashed border-blue-300 hover:border-blue-600 hover:bg-blue-100 rounded-2xl font-bold text-sm text-blue-600 flex items-center justify-center gap-2 transition-all shadow-sm">
              <Plus size={18} /> Create Custom Section
            </button>
          </div>


          {/* Cover Letter Generator */}
          <CoverLetterTab />

          {/* Marketing Engine / Newsletter Capture */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <NewsletterCapture source="main_editor" />
          </div>

          {/* Main Footer Links */}
          <footer className={cn("mt-12 pt-6 border-t flex flex-wrap gap-4 text-xs font-medium justify-center pb-8", isDarkMode ? "border-gray-800 text-gray-400" : "border-gray-200 text-gray-500")}>
            <Link href="/blog" className="hover:text-blue-500 transition-colors">Career Blog</Link>
            <span>&bull;</span>
            <Link href="/recruiter" className="hover:text-blue-500 transition-colors">Recruiter Portal</Link>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy & GDPR</Link>
            <span>&bull;</span>
            <Link href="/manage-data" className="hover:text-blue-500 transition-colors">Manage Data</Link>
          </footer>

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
          className="w-full bg-[#141312] text-[#E8E7E1] border-[3px] border-[#141312] rounded-none hover:bg-[#FF4326] hover:text-[#141312] hs px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-2xl flex items-center justify-center gap-3 border-[6px] border-white active:scale-95 transition-transform"
        >
          <Eye size={18} /> Preview Resume
        </button>
      </div>

      <section 
        ref={previewViewportRef}
        id="preview-panel"
        className={cn(
        "flex-1 bg-[#E5E7EB] p-0 lg:p-12 print:p-0 print:bg-white flex lg:justify-center items-start print-safe-container",
        isPreviewOpen && !mobileZoom ? "overflow-x-hidden justify-center" : "overflow-x-auto",
        isPreviewOpen ? "fixed inset-0 z-50 flex-col h-screen overflow-y-auto custom-scrollbar" : "hidden lg:flex"
      )}>
        
        {/* Mobile Modal Actions */}
        {isPreviewOpen && (
          <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex gap-2 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 lg:hidden print:hidden border-t border-gray-200">
            <button onClick={() => setIsPreviewOpen(false)} className="flex-1 bg-gray-100 text-black py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-colors active:bg-gray-200">
              <X size={16} /> Edit
            </button>
            <button onClick={() => setMobileZoom(!mobileZoom)} className="flex-1 bg-gray-100 text-black py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-colors active:bg-gray-200">
              {mobileZoom ? <ZoomOut size={16} /> : <ZoomIn size={16} />} Zoom
            </button>
            <PDFDownloadButton 
     TemplateComponent={SelectedTemplate} 
     data={data} 
     themeColor={data.theme?.color || '#2563eb'}
     onDownloadComplete={() => setIsJobsModalOpen(true)}
     className="flex-1 bg-[#141312] text-[#E8E7E1] border-[3px] border-[#141312] rounded-none hover:bg-[#FF4326] hover:text-[#141312] hs py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest flex justify-center items-center gap-2 active:scale-95 transition-transform" 
   />
          </div>
        )}

        <div
          className={cn(
            "preview-scale-frame shrink-0 transition-all print:block",
            isPreviewOpen ? "mb-32 mt-8 lg:mt-4 mx-auto" : "mx-auto lg:mx-0"
          )}
          style={isPreviewOpen ? {
            width: mobilePreviewMetrics.width,
            height: mobilePreviewMetrics.height
          } : undefined}
        >
          <div
            ref={resumePageRef}
            className="w-[816px] origin-top-left shrink-0 shadow-2xl print:shadow-none bg-white transition-transform print-safe-content"
            style={{
              transform: isPreviewOpen && mobilePreviewMetrics.scale !== 1 ? `scale(${mobilePreviewMetrics.scale})` : undefined,
              '--theme-color': data.theme?.color || '#2563eb'
            } as React.CSSProperties}
          >
            <PDFPreview TemplateComponent={SelectedTemplate} data={data} themeColor={data.theme?.color || '#2563eb'} />
          </div>
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
                    <HTMLThumbnail Tmpl={htmlTemplates[key as keyof typeof htmlTemplates]} data={data} />
                    {isActive && (
                      <div className="absolute top-4 right-4 bg-[#2233FF] text-[#E8E7E1] border-[3px] border-[#141312] rounded-none hover:bg-[#FF4326] hs px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-10 flex items-center gap-1">
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

      {/* ATS GRADER MODAL */}
      {isATSOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm overflow-y-auto print:hidden">
          <div className="min-h-screen px-4 flex items-center justify-center py-10">
            <div className={cn("rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl flex flex-col relative", isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900')}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-black leading-tight flex items-center gap-2"><BarChart3 className="text-emerald-500" /> ATS Resume Grader</h2>
                <p className={cn("text-sm mt-1", isDarkMode ? 'text-gray-400' : 'text-gray-500')}>Paste the job description below to see how well your resume matches.</p>
              </div>
              <button onClick={() => setIsATSOpen(false)} className={cn("p-2 rounded-full transition-colors", isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200')}>
                <X size={20} />
              </button>
            </div>
            
            <textarea
              className={cn("w-full border rounded-xl p-4 text-sm min-h-[150px] mb-4 focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-all", isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200')}
              placeholder="Paste the target job description here..."
              value={atsJobDesc}
              onChange={(e) => setAtsJobDesc(e.target.value)}
            />
            
            <button 
              onClick={handleATSGrade}
              disabled={isATSLoading || !atsJobDesc.trim()}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex justify-center items-center gap-2 mb-6 shadow-lg shadow-emerald-600/20"
            >
              {isATSLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {isATSLoading ? 'Analyzing Resume...' : 'Analyze & Grade Resume'}
            </button>

            {atsResult && (
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-8 border-gray-100">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="289.026" strokeDashoffset={289.026 * (1 - atsResult.score / 100)} className={atsResult.score >= 80 ? 'text-emerald-500' : atsResult.score >= 60 ? 'text-amber-500' : 'text-red-500'} strokeLinecap="round" />
                    </svg>
                    <span className="text-2xl font-black">{atsResult.score}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Match Score</h3>
                    <p className={cn("text-sm", isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
                      {atsResult.score >= 80 ? 'Excellent match! You are highly qualified.' : atsResult.score >= 60 ? 'Good match. Consider adding some missing keywords.' : 'Low match. Significant tailoring recommended.'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={cn("p-4 rounded-xl border", isDarkMode ? 'bg-emerald-950/30 border-emerald-900' : 'bg-emerald-50 border-emerald-100')}>
                    <h4 className="font-bold text-emerald-600 mb-2 flex items-center gap-2"><Plus size={16} /> Strengths</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {atsResult.strengths?.map((s:string, i:number) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div className={cn("p-4 rounded-xl border", isDarkMode ? 'bg-amber-950/30 border-amber-900' : 'bg-amber-50 border-amber-100')}>
                    <h4 className="font-bold text-amber-600 mb-2 flex items-center gap-2"><RefreshCw size={16} /> Missing Keywords</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {atsResult.missingKeywords?.map((k:string, i:number) => <li key={i}>{k}</li>)}
                    </ul>
                  </div>
                </div>

                <div className={cn("p-4 rounded-xl border", isDarkMode ? 'bg-blue-950/30 border-blue-900' : 'bg-blue-50 border-blue-100')}>
                  <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2"><Sparkles size={16} /> Actionable Tips</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {atsResult.tips?.map((t:string, i:number) => <li key={i}>{t}</li>)}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setIsATSOpen(false);
                    setIsRewriterOpen(true);
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex justify-center items-center gap-2 mt-4 shadow-lg shadow-purple-600/20"
                >
                  <RefreshCw size={14} /> Implement Recommendations with AI Rewriter
                </button>

                {atsResult.score >= 85 && (
                  <button
                    onClick={() => {
                      const text = `I just scored a ${atsResult.score}% on my resume using Cvyon! 🚀 Check out this free AI ATS Grader at cvyon.com`;
                      window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex justify-center items-center gap-2 mt-4 shadow-lg shadow-blue-500/20"
                  >
                    <Share2 size={14} /> Share Score to LinkedIn
                  </button>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      )}

      {/* AI REWRITER MODAL */}
      <JobsModal isOpen={isJobsModalOpen} onClose={() => setIsJobsModalOpen(false)} />

      {isRewriterOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm overflow-y-auto print:hidden">
          <div className="min-h-screen px-4 flex items-center justify-center py-10">
            <div className={cn("rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl transition-all relative", isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900')}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black leading-tight flex items-center gap-2"><RefreshCw className="text-purple-500" /> AI Rewriter</h2>
              <button onClick={() => setIsRewriterOpen(false)} className={cn("p-2 rounded-full transition-colors", isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200')}>
                <X size={20} />
              </button>
            </div>
            
            <p className={cn("text-sm mb-6", isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
              Instantly rewrite your Summary and Experience sections to match a specific tone or career level.
            </p>
            
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-500">Target Tone / Style</label>
              <div className="relative">
                <select
                  value={rewriteTone}
                  onChange={(e) => setRewriteTone(e.target.value)}
                  className={cn("w-full appearance-none rounded-xl px-4 py-3 pr-10 text-sm font-bold border transition-all focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer", isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200')}
                >
                  <option value="Executive">Executive & Strategic</option>
                  <option value="Creative">Creative & Dynamic</option>
                  <option value="Technical">Technical & Analytical</option>
                  <option value="Entry-Level">Entry-Level & Enthusiastic</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>

            <button 
              onClick={handleRewrite}
              disabled={isRewriting}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex justify-center items-center gap-2 shadow-lg shadow-purple-600/20"
            >
              {isRewriting ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {isRewriting ? 'Rewriting Resume...' : 'Rewrite Entire Resume'}
            </button>
          </div>
          </div>
        </div>
      )}

      {/* DOWNLOAD OPTIONS MODAL (MOBILE) */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-end justify-center print:hidden lg:hidden">
          <div className="bg-white w-full rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900">Download Options</h2>
              <button onClick={() => setIsDownloadModalOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-black transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={() => { setIsDownloadModalOpen(false); handleDownload(); }} className="w-full bg-[#141312] text-[#E8E7E1] border-[3px] border-[#141312] rounded-none hover:bg-[#FF4326] hover:text-[#141312] hs p-4 rounded-2xl flex items-center gap-4 active:scale-95 transition-transform">
                <div className="bg-white/20 p-2.5 rounded-xl"><Download size={20} /></div>
                <div className="text-left flex-1"><div className="font-bold uppercase tracking-wider text-sm">Download PDF</div><div className="text-xs text-white/70">Best for printing & sharing</div></div>
              </button>
              <button onClick={() => { setIsDownloadModalOpen(false); handleDocxExport(); }} className="w-full bg-[#2233FF] text-[#E8E7E1] border-[3px] border-[#141312] rounded-none hover:bg-[#FF4326] hs p-4 rounded-2xl flex items-center gap-4 active:scale-95 transition-transform mb-6">
                <div className="bg-white/20 p-2.5 rounded-xl"><FileText size={20} /></div>
                <div className="text-left flex-1"><div className="font-bold uppercase tracking-wider text-sm">Download Word (DOCX)</div><div className="text-xs text-white/70">Editable in Microsoft Word</div></div>
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
