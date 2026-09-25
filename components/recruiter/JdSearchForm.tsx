"use client";
import React, { useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import { runJdMatch, MatchResult, ApiError } from "@/lib/recruiter-api";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export interface JdInput {
  jobDescription: string;
  jobTitle: string;
  location: string;
}

/**
 * "Paste a job description → Find candidates" — the marketplace hero action.
 * Runs POST /api/recruiter/match and hands the exact API result to onResult.
 */
export function JdSearchForm({
  variant = "hero",
  defaultValues,
  onResult,
}: {
  variant?: "hero" | "panel";
  defaultValues?: Partial<JdInput>;
  onResult: (result: MatchResult, input: JdInput) => void;
}) {
  const [jobDescription, setJobDescription] = useState(defaultValues?.jobDescription || "");
  const [jobTitle, setJobTitle] = useState(defaultValues?.jobTitle || "");
  const [location, setLocation] = useState(defaultValues?.location || "");
  const [searching, setSearching] = useState(false);

  const submit = async () => {
    const jd = jobDescription.trim();
    if (jd.length < 30) {
      toast.error("Paste the full job description — a few sentences at least.");
      return;
    }
    setSearching(true);
    try {
      const result = await runJdMatch({
        jobDescription: jd,
        jobTitle: jobTitle.trim() || undefined,
        location: location.trim() || undefined,
        page: 1,
        pageSize: 30,
      });
      onResult(result, { jobDescription: jd, jobTitle: jobTitle.trim(), location: location.trim() });
    } catch (e: any) {
      const msg = e instanceof ApiError && e.code === "auth"
        ? "Sign in as a recruiter to search."
        : e?.message || "Search failed — try again.";
      toast.error(msg);
    } finally {
      setSearching(false);
    }
  };

  const hero = variant === "hero";

  return (
    <div className={cn(hero ? "" : "border-[3px] border-[#141312] bg-white hs p-5 sm:p-7")}>
      {!hero && (
        <div className="fm mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#141312]/50">
          § new JD search
        </div>
      )}
      <label className="fm mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#141312]/70">
        Paste a job description
      </label>
      <div className="relative">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={hero ? 7 : 6}
          placeholder={"e.g.\nSenior Backend Engineer — Lagos (hybrid).\nMust have: Node.js, PostgreSQL, 4+ years…\nNice to have: AWS, GraphQL…"}
          className="w-full resize-y border-[3px] border-[#141312] bg-white p-4 text-sm leading-relaxed text-[#141312] placeholder:text-[#141312]/35 outline-none transition-all focus:border-[#FF4326] min-h-[140px]"
        />
        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 fm text-[10px] font-bold uppercase tracking-widest text-[#141312]/30">
          <Sparkles size={12} /> AI-matched
        </span>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Job title (optional)"
          className="border-[3px] border-[#141312] bg-white px-4 py-3 text-sm text-[#141312] placeholder:text-[#141312]/35 outline-none transition-all focus:border-[#FF4326]"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (optional)"
          className="border-[3px] border-[#141312] bg-white px-4 py-3 text-sm text-[#141312] placeholder:text-[#141312]/35 outline-none transition-all focus:border-[#FF4326]"
        />
      </div>
      <button
        onClick={submit}
        disabled={searching}
        className={cn(
          "group mt-4 flex w-full items-center justify-center gap-2 border-[3px] border-[#141312] bg-[#FF4326] px-7 fh text-sm font-extrabold uppercase tracking-wider text-[#141312] hs transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0",
          hero ? "py-5 text-base" : "py-4",
        )}
      >
        {searching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} className="transition-transform group-hover:scale-110" />}
        {searching ? "Matching candidates…" : "Find candidates"}
      </button>
      <p className="mt-3 text-center fm text-[10px] uppercase tracking-[0.16em] text-[#141312]/50">
        free to search · counts shown before you spend a credit
      </p>
    </div>
  );
}
