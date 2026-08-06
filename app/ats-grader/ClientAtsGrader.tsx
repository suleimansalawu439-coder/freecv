"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, Loader2, Target, Lightbulb, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { trackEvent } from "@/lib/analytics";
import confetti from "canvas-confetti";
import { Archivo, Archivo_Black, DM_Sans, Space_Mono } from "@/lib/fonts";

const display = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap" });
const head = Archivo({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

interface AtsResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  tips: string[];
}

export default function ClientAtsGrader() {
  const router = useRouter();
  const setAtsRecommendations = useResumeStore(state => state.setAtsRecommendations);
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AtsResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    trackEvent('ats_grader_viewed');
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (f: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(f.type) && !f.name.endsWith('.docx') && !f.name.endsWith('.pdf')) {
      toast.error("Only PDF and DOCX files are supported.");
      return;
    }
    if (f.size > 4 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 4MB.");
      return;
    }
    setFile(f);
  };

  
  const handleFixResume = () => {
    if (result) {
      setAtsRecommendations({
        missingKeywords: result.missingKeywords,
        tips: result.tips
      });
      router.push('/build');
    }
  };
  
  const handleGrade = async () => {
    if (!file) {
      toast.error("Please upload your resume.");
      return;
    }
    if (!jd.trim()) {
      toast.error("Please paste the job description.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", jd);

    try {
      const res = await fetch("/api/ai/standalone-ats-score", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        let errMsg = "An error occurred.";
        try {
          const json = JSON.parse(text);
          errMsg = json.error || errMsg;
        } catch (e) {
          errMsg = text || errMsg;
        }
        throw new Error(errMsg);
      }

      const data: AtsResult = await res.json();
      setResult(data);
      trackEvent('ats_grader_completed', undefined, { score: data.score });

      if (data.score >= 80) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      } else {
        toast.success("Analysis complete. See your results below!");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("cv-riso relative min-h-screen text-[#141312] bg-[#E8E7E1] overflow-x-hidden", body.className)}
      style={{ ["--ink" as any]: "#141312", ["--verm" as any]: "#FF4326", ["--cob" as any]: "#2233FF", ["--hi" as any]: "#FFE14D", ["--fd" as any]: display.style.fontFamily, ["--fh" as any]: head.style.fontFamily, ["--fb" as any]: body.style.fontFamily, ["--fm" as any]: mono.style.fontFamily }}>
      <style>{`
        .cv-riso{font-family:var(--fb)} .cv-riso .fd{font-family:var(--fd)} .cv-riso .fh{font-family:var(--fh)} .cv-riso .fm{font-family:var(--fm)}
        .cv-riso .grain{position:fixed;inset:0;pointer-events:none;z-index:60;opacity:.06;mix-blend-mode:multiply;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .cv-riso .dots{background-image:radial-gradient(#14131222 1.2px,transparent 1.2px);background-size:22px 22px}
        .cv-riso .hs{box-shadow:7px 7px 0 var(--ink)} .cv-riso .hs-v{box-shadow:7px 7px 0 var(--verm)} .cv-riso .hs-c{box-shadow:6px 6px 0 var(--cob)}
      `}</style>
      <div className="grain" />
      <div className="absolute inset-0 dots pointer-events-none opacity-50 mix-blend-multiply" />

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b-[3px] border-[#141312] bg-[#E8E7E1]/95 backdrop-blur-0">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-light-no-background.png"
              alt="Cvyon"
              width={120}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
            <span className="fm hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF4326] sm:inline-block">ATS Grader</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="fm text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-[#FF4326]">
              Home
            </Link>
            <Link href="/build" className="group flex items-center gap-2 border-[3px] border-[#141312] bg-[#141312] px-4 py-2.5 fm text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8E7E1] hs transition-all hover:bg-[#FF4326] hover:border-[#FF4326]">
              Build Free
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-5 py-12 lg:py-20 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="fd text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
            Pass the <span className="text-[#FF4326]">bots.</span><br />
            Get the interview.
          </h1>
          <p className="fm text-sm sm:text-base font-bold uppercase tracking-wider text-[#141312]/70">
            Upload your resume (PDF/DOCX) and paste a job description. Our AI analyzes your match score exactly how an ATS would.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* LEFT: Upload & JD */}
          <div className="flex flex-col gap-8">
            <div className="bg-[#E8E7E1] border-[3px] border-[#141312] p-6 sm:p-8 hs-c flex flex-col h-full">
              <h2 className="fh text-xl font-black uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="bg-[#141312] text-[#E8E7E1] p-1.5"><FileText size={16} /></span>
                1. Resume
              </h2>
              
              <input type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
              <div 
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "flex-1 border-[3px] border-dashed border-[#141312]/30 flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all min-h-[200px]",
                  isDragging ? "bg-[#141312]/5 border-[#141312]" : "hover:bg-[#141312]/5",
                  file ? "bg-[#2233FF]/10 border-[#2233FF]" : ""
                )}
              >
                {file ? (
                  <>
                    <FileText size={48} className="text-[#2233FF] mb-4" />
                    <p className="fh font-bold text-lg truncate max-w-full">{file.name}</p>
                    <p className="fm text-xs mt-2 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB • Click to replace</p>
                  </>
                ) : (
                  <>
                    <UploadCloud size={48} className="text-[#141312]/50 mb-4" />
                    <p className="fh font-bold text-lg">Drag & Drop Resume</p>
                    <p className="fm text-xs mt-2 uppercase text-[#141312]/50">Supported: PDF, DOCX (Max 5MB)</p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-[#E8E7E1] border-[3px] border-[#141312] p-6 sm:p-8 hs flex flex-col">
              <h2 className="fh text-xl font-black uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="bg-[#141312] text-[#E8E7E1] p-1.5"><Target size={16} /></span>
                2. Job Target
              </h2>
              <textarea 
                placeholder="Paste the target job description here..."
                value={jd}
                onChange={e => setJd(e.target.value)}
                className="w-full min-h-[200px] border-[3px] border-[#141312] bg-[#E8E7E1] p-4 fh text-sm resize-y outline-none focus:bg-white transition-colors"
              />
            </div>

            <button 
              onClick={handleGrade}
              disabled={isLoading}
              className="group flex items-center justify-center gap-3 w-full border-[3px] border-[#141312] bg-[#FF4326] px-8 py-5 fh text-lg font-black uppercase tracking-wider text-[#E8E7E1] hs-v transition-all hover:-translate-y-1 hover:shadow-none disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? <><Loader2 className="animate-spin" size={24} /> Processing...</> : <><Sparkles size={24} /> Analyze Match</>}
            </button>
          </div>

          {/* RIGHT: Results */}
          <div className="bg-[#141312] border-[3px] border-[#141312] p-6 sm:p-8 text-[#E8E7E1] relative flex flex-col min-h-[500px]">
            {!result ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-50">
                <Target size={64} className="mb-6 opacity-30" />
                <p className="fh font-bold text-xl mb-2 uppercase">Awaiting Input</p>
                <p className="fm text-xs uppercase tracking-widest">Your AI-generated scorecard will appear here.</p>
              </div>
            ) : (
              <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center border-b-[3px] border-[#E8E7E1]/20 pb-8 mb-8">
                  <p className="fm text-xs font-bold uppercase tracking-widest text-[#FFE14D] mb-4">Match Score</p>
                  <div className="flex justify-center items-end gap-2 leading-none">
                    <span className={cn("fd text-8xl tracking-tighter", result.score >= 80 ? "text-[#00FF66]" : result.score >= 60 ? "text-[#FFE14D]" : "text-[#FF4326]")}>
                      {result.score}
                    </span>
                    <span className="fh text-3xl font-black text-[#E8E7E1]/50 pb-2">/100</span>
                  </div>
                </div>

                <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                  <div>
                    <h3 className="flex items-center gap-2 fm text-sm font-bold uppercase tracking-wider text-[#00FF66] mb-4">
                      <CheckCircle2 size={16} /> Strengths
                    </h3>
                    <ul className="space-y-3">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="flex gap-3 text-sm fh"><span className="text-[#00FF66] opacity-50">◆</span> {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 fm text-sm font-bold uppercase tracking-wider text-[#FF4326] mb-4">
                      <AlertCircle size={16} /> Weaknesses
                    </h3>
                    <ul className="space-y-3">
                      {result.weaknesses.map((w, i) => (
                        <li key={i} className="flex gap-3 text-sm fh"><span className="text-[#FF4326] opacity-50">◆</span> {w}</li>
                      ))}
                    </ul>
                  </div>

                  {result.missingKeywords.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 fm text-sm font-bold uppercase tracking-wider text-[#FFE14D] mb-4">
                        <Target size={16} /> Missing Keywords
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.missingKeywords.map((k, i) => (
                          <span key={i} className="px-3 py-1.5 border-[2px] border-[#FFE14D]/30 bg-[#FFE14D]/10 text-[#FFE14D] text-xs font-bold fh">{k}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.tips.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 fm text-sm font-bold uppercase tracking-wider text-[#2233FF] mb-4">
                        <Lightbulb size={16} /> Actionable Tips
                      </h3>
                      <ul className="space-y-3">
                        {result.tips.map((t, i) => (
                          <li key={i} className="flex gap-3 text-sm fh"><span className="text-[#2233FF] opacity-50">◆</span> {t}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="pt-8 mt-8 border-t-[3px] border-[#E8E7E1]/20 text-center">
                  <button onClick={handleFixResume} className="inline-block bg-[#E8E7E1] text-[#141312] px-6 py-3 fh font-black text-sm uppercase tracking-wider border-[3px] border-[#E8E7E1] hover:bg-[#FFE14D] hover:border-[#FFE14D] transition-colors">Fix my resume in Builder</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
