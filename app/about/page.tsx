import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Cvyon — The Free ATS Résumé Builder",
  description: "Learn why Cvyon provides a premium, AI-powered résumé builder and ATS grader for free. No paywalls, no watermarks, completely funded by transparent recruitment.",
  alternates: { canonical: "https://cvyon.com/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#E8E7E1] text-[#141312] selection:bg-[#FF4326] selection:text-white pb-20">
      <nav className="border-b-2 border-[#141312] px-6 py-4 flex items-center justify-between sticky top-0 bg-[#E8E7E1] z-50">
        <Link href="/" className="font-black text-xl tracking-tighter hover:text-[#FF4326] transition-colors">CVYON</Link>
        <Link href="/build" className="text-sm font-bold uppercase tracking-widest border-2 border-[#141312] px-4 py-2 hover:bg-[#141312] hover:text-[#E8E7E1] transition-all">Build Free</Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 mt-16 md:mt-24">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
          Premium Tools.<br />
          <span className="text-[#FF4326]">Forever Free.</span>
        </h1>
        
        <div className="prose prose-lg text-[#141312]/80 space-y-6 text-lg md:text-xl font-medium leading-relaxed">
          <p>
            The job market is harder than it has been in a decade. Candidates send hundreds of applications into the void, hoping to bypass automated Applicant Tracking Systems (ATS) that ruthlessly filter out qualified talent due to formatting errors or keyword mismatches.
          </p>
          <p>
            Yet, the industry standard for résumé builders is to lure candidates in with a "free builder," only to lock their completed PDF behind a sudden $29/month paywall right when they click download.
          </p>
          <h2 className="text-3xl font-black text-[#141312] uppercase tracking-tighter mt-12 mb-6">Our Mission</h2>
          <p>
            At Cvyon, we believe that optimizing your career shouldn't cost you a week's groceries. We built a world-class, AI-powered ATS Grader and Resume Builder that generates pristine, ATS-parsable PDFs and Word documents. 
          </p>
          <p className="font-bold text-[#141312]">
            No watermarks. No required sign-ups. No hidden paywalls.
          </p>

          <h2 className="text-3xl font-black text-[#141312] uppercase tracking-tighter mt-12 mb-6">How We Keep It Free</h2>
          <p>
            If you aren't paying, how do we keep the servers running? 
          </p>
          <p>
            <strong>Transparent Recruitment.</strong> When you download your resume, you have the option to opt-in to our talent network. If you choose to opt-in, verified recruiters can discover your profile and reach out with relevant opportunities. The recruiters pay for sourcing tools—which fully subsidizes the infrastructure that keeps the builder free for you and millions of other candidates. 
          </p>
          <p>
            If you choose <em>not</em> to opt-in, that's completely fine too. Your data remains on your device, and you still get to download your resume for free. 
          </p>

          <div className="bg-white border-[3px] border-[#141312] shadow-[6px_6px_0_#141312] p-8 mt-12 mb-12">
            <h3 className="text-xl font-black uppercase tracking-wider mb-6">What You Get</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2233FF]" /> 18 ATS-Optimized Templates (Grid, Swiss, Corporate)</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2233FF]" /> AI ATS Grader & Keyword Matcher</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2233FF]" /> One-Click LinkedIn Import</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2233FF]" /> PDF and DOCX Export</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2233FF]" /> Strict GDPR Compliance & Data Ownership</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/build" className="bg-[#141312] text-white px-8 py-4 font-black uppercase tracking-widest text-lg hover:-translate-y-1 hover:shadow-[0_10px_0_#FF4326] transition-all">
            Start Building
          </Link>
        </div>
      </main>
    </div>
  );
}
