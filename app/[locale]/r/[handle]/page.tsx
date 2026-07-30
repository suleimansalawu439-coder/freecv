import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { templates, TemplateKey } from '@/components/templates';
import type { Metadata } from 'next';

type Props = {
  params: { handle: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await supabaseAdmin
    .from('public_resumes')
    .select('data')
    .eq('handle', params.handle)
    .single();

  if (!data) return { title: 'Resume Not Found | Cvyon' };

  const name = data.data?.personalInfo?.fullName || 'Candidate';
  const role = data.data?.personalInfo?.jobTitle || 'Professional';

  return {
    title: `${name} - ${role} Resume | Cvyon`,
    description: `View the professional resume of ${name}.`,
    openGraph: {
      title: `${name} - ${role}`,
      description: data.data?.summary?.substring(0, 160) || `View ${name}'s resume on Cvyon.`,
      url: `https://cvyon.com/r/${params.handle}`,
      siteName: 'Cvyon',
      type: 'profile'
    }
  };
}

export default async function PublicResumePage({ params }: Props) {
  // Fetch resume data
  const { data: record, error } = await supabaseAdmin
    .from('public_resumes')
    .select('data')
    .eq('handle', params.handle)
    .single();

  if (error || !record || !record.data) {
    notFound();
  }

  // Increment view count asynchronously
  supabaseAdmin.rpc('increment_resume_views', { resume_handle: params.handle }).then().catch(() => {});

  const resumeData = record.data;
  const templateId = (resumeData.templateId as TemplateKey) || 'Executive';
  const SelectedTemplate = templates[templateId] || templates.Executive;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 selection:bg-black selection:text-white">
      {/* Read-only view of the resume */}
      <div className="w-[816px] max-w-full bg-white shadow-2xl overflow-hidden shrink-0">
        <SelectedTemplate data={resumeData} />
      </div>

      {/* Discrete Built with Cvyon footer */}
      <footer className="mt-12 text-center text-sm font-medium text-gray-500 pb-10">
        Built free with <a href="/" className="font-bold text-black hover:underline">Cvyon</a>. Create yours in minutes.
      </footer>
    </div>
  );
}
