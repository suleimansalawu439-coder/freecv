"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, FileText, ArrowRight, Loader2, Copy, CheckCircle2, Navigation } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function CoverLetterPage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      trackEvent('cover_letter_start', tone);
      const res = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription, tone })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate');
      }
      
      setResult(data.coverLetter);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent('cover_letter_copied', tone);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#141312] selection:bg-[#2233FF] selection:text-white font-sans">
      {/* Brutalist Nav */}
      <nav className="border-b-[4px] border-[#141312] bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-light-no-background.png"
              alt="Cvyon"
              width={130}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>
          <div className="flex gap-4">
            <Link href="/build" className="hidden sm:flex bg-[#141312] text-[#E8E7E1] border-[3px] border-[#141312] hover:bg-[#FF4326] hover:text-[#141312] px-6 py-2.5 rounded-none font-bold uppercase tracking-wider text-sm transition-transform active:scale-95 hs shadow-[4px_4px_0_#141312] items-center gap-2">
              <FileText size={16} /> Resume Builder
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12 lg:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#2233FF] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border-[3px] border-[#141312] mb-6 shadow-[2px_2px_0_#141312]">
            <Sparkles size={14} /> 100% Free Tool
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            Instant Cover <br />
            <span className="text-[#2233FF]">Letters</span>
          </h1>
          <p className="text-xl font-medium text-gray-600 max-w-2xl mx-auto">
            Paste your resume and the job description. Our AI will write a highly tailored, conversion-optimized cover letter in 5 seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white border-[4px] border-[#141312] p-6 lg:p-8 shadow-[8px_8px_0_#141312] flex flex-col gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest mb-2 text-[#141312]">
                <FileText size={16} /> 1. Paste Your Resume
              </label>
              <textarea 
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your full resume text here..."
                className="w-full h-40 bg-[#F9FAFB] border-[3px] border-[#141312] p-4 text-sm font-medium focus:outline-none focus:ring-0 focus:bg-white transition-colors custom-scrollbar resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest mb-2 text-[#141312]">
                <Navigation size={16} /> 2. Paste Job Description
              </label>
              <textarea 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description you are applying for..."
                className="w-full h-40 bg-[#F9FAFB] border-[3px] border-[#141312] p-4 text-sm font-medium focus:outline-none focus:ring-0 focus:bg-white transition-colors custom-scrollbar resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest mb-2 text-[#141312]">
                3. Select Tone
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-white border-[3px] border-[#141312] p-4 text-sm font-bold uppercase tracking-wider focus:outline-none cursor-pointer appearance-none"
              >
                <option value="professional">Professional & Direct</option>
                <option value="confident">Confident & Bold</option>
                <option value="enthusiastic">Enthusiastic & Passionate</option>
                <option value="creative">Creative & Unconventional</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-100 border-[3px] border-red-500 text-red-700 p-4 font-bold text-sm">
                {error}
              </div>
            )}

            <button 
              onClick={handleGenerate}
              disabled={loading || !resumeText || !jobDescription}
              className="w-full bg-[#FF4326] text-white border-[4px] border-[#141312] py-5 font-black uppercase tracking-widest text-lg hover:bg-[#2233FF] hover:translate-y-1 hover:shadow-[0_0_0_#141312] shadow-[6px_6px_0_#141312] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 mt-2"
            >
              {loading ? (
                <><Loader2 size={24} className="animate-spin" /> Generating...</>
              ) : (
                <><Sparkles size={24} /> Generate Cover Letter</>
              )}
            </button>
          </div>

          {/* Result Output */}
          <div className="bg-[#141312] text-white border-[4px] border-[#141312] shadow-[8px_8px_0_#FF4326] p-6 lg:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800">
              <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                <FileText size={20} className="text-[#2233FF]" /> Your Cover Letter
              </h2>
              {result && (
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-[#2233FF] hover:bg-[#FF4326] px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors border-[2px] border-white shadow-[2px_2px_0_white]"
                >
                  {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              )}
            </div>

            {result ? (
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 text-gray-300 whitespace-pre-wrap font-medium leading-relaxed">
                {result}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-600 opacity-50">
                <FileText size={64} className="mb-4" />
                <p className="font-bold uppercase tracking-widest text-sm max-w-[200px]">
                  Your AI-generated cover letter will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
