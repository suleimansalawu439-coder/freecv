"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, MapPin, Briefcase, ArrowUpRight, Loader2, Globe2, Sparkles } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useResumeStore } from "@/store/useResumeStore";
import { trackEvent } from "@/lib/analytics";

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

type Job = {
  id: string | number;
  title: string;
  company: string;
  location: string;
  salary?: string;
  link: string;
  description?: string;
  match?: number | string;
};

const normMatch = (m: number | string | undefined): number => {
  if (typeof m === "number") return m;
  if (typeof m === "string") return parseInt(m, 10) || 0;
  return 0;
};

export function JobsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const data = useResumeStore((s) => s.data);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<string>("your region");
  const [empty, setEmpty] = useState(false);
  const [errored, setErrored] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  // escape-to-close + body scroll lock while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [isOpen, onClose]);

  const fetchJobs = (queryOverride?: string) => {
    setLoading(true); setEmpty(false); setErrored(false);
    const skills = (data.skills || []).map((s) => s.name).filter(Boolean);
    const jobTitle = data.personalInfo.jobTitle || "";

    fetch("/api/affiliate/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skills,
        jobTitle,
        query: queryOverride !== undefined ? queryOverride : searchQuery
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        setCountry(res?.searchCountry || "your region");
        if (Array.isArray(res?.suggestions)) setSuggestions(res.suggestions);
        if (res?.success && Array.isArray(res.data) && res.data.length) {
          setJobs(res.data);
        } else {
          setJobs([]);
          setEmpty(true);
        }
      })
      .catch(() => setErrored(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!isOpen) return;
    setSearchQuery("");
    trackEvent("jobs_modal_opened", data.templateId);
    fetchJobs("");
  }, [isOpen, data.skills, data.personalInfo.jobTitle, data.templateId]);

  const handleJobClick = (job: Job) => {
    trackEvent("affiliate_job_clicked", undefined, { company: job.company, link: job.link });
    // server computes the geo-based CPC + country; we send candidate telemetry
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isMobile = /mobi|iphone|ipod|android.*mobile/i.test(ua);
    const isTablet = /ipad|tablet/i.test(ua);
    const device_type = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

    const payload = JSON.stringify({
      job_url: job.link || "",
      job_title: job.title || "",
      company: job.company || "",
      location: job.location || (country !== "your region" ? country : ""),
      user_name: data?.personalInfo?.fullName || "Candidate",
      user_email: data?.personalInfo?.email || "",
      device_type,
    });

    try {
      fetch("/api/jobs/visit", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: payload,
      }).catch(() => {});
    } catch {
      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        try {
          navigator.sendBeacon("/api/jobs/visit", new Blob([payload], { type: "application/json" }));
        } catch {}
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end justify-center bg-black/65 backdrop-blur-sm print:hidden sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Jobs matched to your profile"
    >
      <style>{`
        @keyframes jm-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes jm-bar{from{width:0}}
        @keyframes jm-sheen{0%{transform:translateX(-120%)}100%{transform:translateX(320%)}}
        .jm-card{animation:jm-rise .5s cubic-bezier(.2,.7,.2,1) both}
        .jm-barfill{animation:jm-bar .9s cubic-bezier(.2,.7,.2,1) both}
        .jm-sheen{animation:jm-sheen 2.6s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){.jm-card,.jm-barfill,.jm-sheen{animation:none!important}}
      `}</style>

      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden border-[3px] border-[#141312] bg-[#E8E7E1] shadow-[10px_10px_0_#141312] !rounded-t-3xl sm:!rounded-none"
      >
        {/* living top accent */}
        <div className="relative h-[3px] w-full overflow-hidden bg-[#141312]">
          <div className="jm-sheen absolute inset-y-0 left-0 w-1/3 bg-[#FF4326]" />
        </div>

        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b-[3px] border-[#141312] bg-[#141312] px-6 py-4 text-[#E8E7E1]">
          <div className="min-w-0">
            <div className="fm flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFE14D]">
              <Sparkles size={12} /> résumé downloaded ✓
            </div>
            <h2 className="fd mt-1 flex items-center gap-2 truncate text-xl tracking-tight sm:text-2xl">
              <Globe2 size={18} className="shrink-0 text-[#FF4326]" />
              {loading ? "Finding roles…" : empty || errored ? "Explore roles" : `Roles in ${country}`}
            </h2>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center border-2 border-[#E8E7E1] transition-colors hover:border-[#FF4326] hover:bg-[#FF4326]"
          >
            <X size={18} />
          </button>
        </div>

        {/* search bar */}
        <div className="border-b-2 border-[#141312] bg-white p-3 flex gap-2">
          <input
            type="text"
            placeholder={`Search roles in ${country}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") fetchJobs(); }}
            className="flex-1 px-3 py-1.5 border border-[#141312] text-xs fm focus:outline-none focus:ring-1 focus:ring-[#2233FF]"
          />
          <button
            onClick={() => fetchJobs()}
            className="px-4 py-1.5 bg-[#141312] text-white fm text-xs font-bold uppercase tracking-wider hover:bg-[#2233FF] transition-colors"
          >
            Search
          </button>
        </div>

        {/* body */}
        <div className="max-h-[calc(90vh-140px)] space-y-4 overflow-y-auto p-5 sm:p-6">
          {loading && (
            <div className="flex flex-col items-center gap-3 py-16 text-[#141312]/60">
              <Loader2 size={30} className="animate-spin text-[#2233FF]" />
              <span className="fm text-[11px] font-bold uppercase tracking-[0.2em]">matching real roles in {country}…</span>
            </div>
          )}

          {!loading && (empty || errored) && (
            <div className="border-[3px] border-dashed border-[#141312]/35 bg-white/40 p-6 text-center">
              <Briefcase size={34} className="mx-auto mb-3 text-[#141312]/25" />
              <p className="fh text-lg font-extrabold">No exact roles for this query right now.</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-[#141312]/60 mb-4">
                Try searching one of these popular roles in {country}:
              </p>
              {suggestions.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(sug);
                        fetchJobs(sug);
                      }}
                      className="px-3 py-1.5 bg-white border border-[#141312] text-xs font-bold fm hover:bg-[#2233FF] hover:text-white transition-colors hs-sm active:translate-y-0.5"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}


          {!loading && jobs.map((job, i) => {
            const match = normMatch(job.match);
            return (
              <a
                key={job.id}
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleJobClick(job)}
                onAuxClick={(e) => { if (e.button === 1) handleJobClick(job); }}
                style={{ animationDelay: `${i * 70}ms` }}
                className="jm-card group flex items-start justify-between gap-4 border-[3px] border-[#141312] bg-white p-5 shadow-[5px_5px_0_#141312] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Briefcase size={15} className="shrink-0 text-[#2233FF]" />
                    <h3 className="fh truncate text-base font-extrabold tracking-tight">{job.title}</h3>
                  </div>
                  <div className="mt-1 truncate text-sm font-semibold text-[#141312]/80">{job.company}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 fm text-[11px] uppercase tracking-wider text-[#141312]/55">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location || country}</span>
                    {job.salary ? <span>{job.salary}</span> : null}
                  </div>
                  {/* animated match bar */}
                  {match > 0 && (
                    <div className="mt-3 h-2 w-full border-2 border-[#141312] bg-[#E8E7E1]">
                      <div className="jm-barfill h-full bg-[#0E8A4B]" style={{ width: `${match}%` }} />
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  {match > 0 && (
                    <span className="border-2 border-[#0E8A4B] px-2 py-1 fm text-[11px] font-bold text-[#0E8A4B]">{match}%</span>
                  )}
                  <span className="flex items-center gap-1 fm text-[10px] font-bold uppercase tracking-widest text-[#141312]/50 transition-colors group-hover:text-[#FF4326]">
                    Apply <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            );
          })}

          {!loading && !empty && !errored && jobs.length > 0 && (
            <p className="pt-1 text-center fm text-[10px] uppercase tracking-[0.18em] text-[#141312]/40">
              live roles via CareerJet · matched to your skills & {country}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}