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
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Free Professional Resume Templates
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose from our collection of ATS-friendly templates tailored specifically for your industry and role. Build a standout resume in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobPages.map((job) => (
            <Link 
              key={job.slug} 
              href={`/resume-templates/${job.slug}`}
              className="group block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-800 transition-all duration-300"
            >
              <h2 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">
                {job.title}
              </h2>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                {job.metaDescription}
              </p>
              <div className="flex items-center text-blue-500 font-medium text-sm group-hover:text-blue-400">
                View Templates 
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
