import Link from 'next/link';
import { notFound } from 'next/navigation';
import { jobPages } from '@/lib/seo-job-data';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { templates as resumeTemplates, type TemplateKey } from '@/components/templates';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return jobPages.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobPages.find((j) => j.slug === slug);
  
  if (!job) {
    return {
      title: 'Not Found | FreeCV',
    };
  }
  
  return {
    title: job.metaTitle,
    description: job.metaDescription,
  };
}

export default async function JobTemplatePage({ params }: Props) {
  const { slug } = await params;
  const job = jobPages.find((j) => j.slug === slug);
  
  if (!job) {
    notFound();
  }

  const { sampleData } = job;

  // Convert sampleData to ResumeData format for the templates
  const resumeData = {
    personalInfo: {
      fullName: sampleData.fullName,
      jobTitle: sampleData.jobTitle,
      email: 'hello@example.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      website: 'linkedin.com/in/sample',
      profilePicture: ''
    },
    summary: sampleData.summary,
    experience: [
      { id: '1', company: 'Leading Tech Corp', role: sampleData.jobTitle, startDate: '2020-01', endDate: 'Present', description: '• Spearheaded major initiatives resulting in 30% growth.\n• Managed cross-functional teams to deliver on time.\n• Implemented industry best practices across the board.' },
      { id: '2', company: 'Global Solutions Inc.', role: `Junior ${sampleData.jobTitle}`, startDate: '2017-06', endDate: '2019-12', description: '• Assisted in the development of core products.\n• Reduced process inefficiencies by 15%.\n• Collaborated with senior stakeholders on key projects.' }
    ],
    education: [
      { id: '1', school: 'State University', degree: 'Bachelor of Science', graduationYear: '2017' }
    ],
    skills: sampleData.skills.map((s, i) => ({ id: String(i), name: s })),
    projects: [],
    certifications: [],
    references: [],
    hasOptedIn: false,
    templateId: 'Executive',
    theme: { color: '#2563eb' },
    showProjects: false,
    showCertifications: false,
    showReferences: false,
    customSections: []
  };

  const featuredTemplates: Array<{ key: TemplateKey; name: string; category: string; color: string }> = [
    { key: 'Executive', name: 'Executive', category: 'ATS Executive', color: '#2563eb' },
    { key: 'SwissDesign', name: 'Swiss Design', category: 'Modern Professional', color: '#0f766e' },
    { key: 'CorporateBlue', name: 'Corporate', category: 'Leadership', color: '#111827' },
    { key: 'TechPro', name: 'Tech Pro', category: 'Technical', color: '#0369a1' },
    { key: 'Classic', name: 'Classic', category: 'Structured', color: '#ef4444' }
  ];

  const builderHref = (templateId: TemplateKey) => ({
    pathname: '/',
    query: {
      source: 'seo',
      jobTitle: sampleData.jobTitle,
      template: templateId,
      skills: sampleData.skills.join('|'),
      summary: sampleData.summary
    }
  });

  return (
    <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden font-sans selection:bg-white selection:text-black">
      {/* Premium Background Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0"></div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <Link href="/" className="text-2xl font-black tracking-tighter uppercase text-white hover:text-gray-300 transition-colors">
          FreeCV
        </Link>
        <Link href="/resume-templates" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
          All Templates
        </Link>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-blue-400 mb-6">
            100% ATS-Friendly Templates
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{job.title}</span> Resume Templates
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
            Land your next interview with a resume perfectly tailored for a {job.title}. Start with our free, pre-written examples.
          </p>
          <Link 
            href={builderHref('Executive')}
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-500 rounded-full transition-all duration-300 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.7)] hover:scale-105"
          >
            Build Your Resume — Free
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content - Resume Templates Grid */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black tracking-tight text-white">Choose Your Layout</h2>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredTemplates.map((tpl) => {
                const TemplatePreview = resumeTemplates[tpl.key];

                return (
                <div key={tpl.key} className="group bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1 block">{tpl.category}</span>
                      <h3 className="text-xl font-bold text-white tracking-tight">{tpl.name}</h3>
                    </div>
                    <Link href={builderHref(tpl.key)} className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-gray-200 transition-all transform translate-x-4 group-hover:translate-x-0 duration-300">
                      Select
                    </Link>
                  </div>
                  
                  <div className="p-8 flex justify-center bg-[#0a0a0a]">
                    <div
                      className="w-[816px] bg-white text-black transform scale-[0.35] sm:scale-[0.45] origin-top shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm pointer-events-none transition-transform duration-500 group-hover:scale-[0.37] sm:group-hover:scale-[0.47]"
                      style={{ '--theme-color': tpl.color } as CSSProperties}
                    >
                      <TemplatePreview data={{...resumeData, templateId: tpl.key, theme: { color: tpl.color }}} />
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Sidebar - Skills & Tips */}
          <div className="lg:col-span-4 space-y-8 sticky top-8">
            <div className="bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
              <h3 className="text-lg font-black text-white mb-2 tracking-tight">
                Highly Sought Skills
              </h3>
              <p className="text-sm text-gray-400 mb-6 font-medium">
                Include these on your {job.title} resume if you have experience with them:
              </p>
              <div className="flex flex-wrap gap-2">
                {sampleData.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600/20 to-emerald-600/10 border border-blue-500/20 backdrop-blur-xl rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Ready to build?</h3>
                <p className="text-sm text-blue-200 mb-8 font-medium">
                  Create a customized, ATS-friendly resume in minutes. No credit card required.
                </p>
                <Link 
                  href={builderHref('Executive')}
                  className="block w-full px-6 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl"
                >
                  Start Building
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
