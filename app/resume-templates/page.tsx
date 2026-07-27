import Link from 'next/link';
import { jobPages } from '@/lib/seo-job-data';

export function generateMetadata() {
  return {
    title: 'Free Professional Resume Templates by Job Title | FreeCV',
    description: 'Browse our collection of free, professional resume templates tailored for specific job titles. Find the perfect template for your career.',
  };
}

export default function ResumeTemplatesPage() {
  return (
    <main className="min-h-screen bg-black text-gray-100 relative overflow-hidden font-sans selection:bg-white selection:text-black">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 z-0"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        
        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-tighter uppercase text-white hover:text-gray-300 transition-colors">
            FreeCV
          </Link>
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
            Back to Editor
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-blue-400 mb-6">
            100% Free & No Registration
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-tight">
            Templates tailored for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">your career.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Choose from our collection of ATS-friendly templates specifically designed for your industry and role. Build a standout resume in minutes.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobPages.map((job) => (
            <Link 
              key={job.slug} 
              href={`/resume-templates/${job.slug}`}
              className="group block p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/20 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-blue-500/10"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                {job.title}
              </h2>
              <p className="text-sm text-gray-400 mb-8 line-clamp-2 leading-relaxed">
                {job.metaDescription}
              </p>
              <div className="flex items-center text-white font-bold text-xs uppercase tracking-widest group-hover:text-blue-400">
                View Templates 
                <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
