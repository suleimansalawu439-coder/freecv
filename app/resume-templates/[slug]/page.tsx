import Link from 'next/link';
import { notFound } from 'next/navigation';
import { jobPages } from '@/lib/seo-job-data';
import type { Metadata } from 'next';

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
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shadow-lg shadow-blue-500/30"
          >
            Build Your {job.title} Resume — Free
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Resume Preview */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-white">Sample Resume Data</h2>
            
            <div className="bg-white text-gray-900 rounded-lg shadow-2xl p-8 transform transition-transform hover:scale-[1.01] duration-300">
              <div className="border-b-2 border-gray-200 pb-6 mb-6">
                <h3 className="text-3xl font-bold uppercase tracking-wider text-gray-800">
                  {sampleData.fullName}
                </h3>
                <p className="text-xl text-blue-600 font-medium mt-1">
                  {sampleData.jobTitle}
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-2 uppercase tracking-wide">
                  Professional Summary
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {sampleData.summary}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
                  Core Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sampleData.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-medium border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
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
                href="/"
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
