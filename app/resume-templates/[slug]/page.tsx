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
    templateId: 'brutalist-minimal',
    theme: { color: 'blue' },
    showProjects: false,
    showCertifications: false,
    showReferences: false,
    customSections: []
  };

  const featuredTemplates: Array<{ key: TemplateKey; name: string; category: string; color: string }> = [
    { key: 'Clarity', name: 'Clarity', category: 'ATS Executive', color: '#2563eb' },
    { key: 'Beacon', name: 'Beacon', category: 'Modern Professional', color: '#0f766e' },
    { key: 'BoardroomPro', name: 'Boardroom Pro', category: 'Leadership', color: '#111827' },
    { key: 'Horizon', name: 'Horizon', category: 'Technical', color: '#0369a1' },
    { key: 'SwissGrid', name: 'Swiss Grid', category: 'Structured', color: '#ef4444' }
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
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Professional {job.title} Resume Templates
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Land your next interview with a resume tailored for a {job.title}. Use our free ATS-friendly templates and expert examples to get started.
          </p>
          <Link 
            href={builderHref('Clarity')}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shadow-lg shadow-blue-500/30"
          >
            Build Your {job.title} Resume — Free
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Resume Templates Grid */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Template</h2>
              <p className="text-gray-400 mb-8">We&apos;ve selected 5 distinct layouts perfectly suited for a {job.title}.</p>
              
              <div className="space-y-16">
                {featuredTemplates.map((tpl) => {
                  const TemplatePreview = resumeTemplates[tpl.key];

                  return (
                  <div key={tpl.key} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1 block">{tpl.category}</span>
                        <h3 className="text-2xl font-bold text-white">{tpl.name}</h3>
                      </div>
                      <Link href={builderHref(tpl.key)} className="px-5 py-2 bg-white text-black font-bold rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Use Template
                      </Link>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4 overflow-hidden flex justify-center aspect-[8.5/11]">
                      <div
                        className="w-[816px] bg-white text-black transform scale-[0.42] sm:scale-[0.62] origin-top shadow-2xl rounded-sm pointer-events-none"
                        style={{ '--theme-color': tpl.color } as CSSProperties}
                      >
                        <TemplatePreview data={{...resumeData, templateId: tpl.key, theme: { color: tpl.color }}} />
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </div>

          {/* Sidebar - Skills & Tips */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">
                Recommended Skills
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Make sure to include these highly sought-after skills on your {job.title} resume if you have experience with them:
              </p>
              <ul className="space-y-3">
                {sampleData.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300 text-sm">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-xl p-6 border border-blue-800/50">
              <h3 className="text-lg font-bold text-white mb-2">Ready to start?</h3>
              <p className="text-sm text-blue-200 mb-4">
                Create a customized, ATS-friendly resume in minutes. No credit card required.
              </p>
              <Link 
                href={builderHref('Clarity')}
                className="block w-full text-center px-4 py-2 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Start Building Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
