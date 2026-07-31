import type { Metadata } from 'next';
import ClientAtsGrader from './ClientAtsGrader';

export const metadata: Metadata = {
  title: 'Free ATS Resume Grader & Match Checker | Cvyon',
  description: 'Upload your resume and paste a job description. Our AI analyzes your resume against the exact criteria ATS screening bots use. Get an instant score and actionable feedback.',
  openGraph: {
    title: 'Free ATS Resume Grader & Match Checker | Cvyon',
    description: 'Score your resume against any job description instantly for free.',
    url: 'https://cvyon.com/ats-grader',
    siteName: 'Cvyon',
    type: 'website',
    images: [{ url: 'https://cvyon.com/og-ats.png', width: 1200, height: 630, alt: 'Cvyon ATS Grader' }],
  },
};

export default function AtsGraderPage() {
  return <ClientAtsGrader />;
}
