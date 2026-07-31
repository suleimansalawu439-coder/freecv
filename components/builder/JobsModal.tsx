"use client";
import React, { useEffect, useState } from "react";
import { X, MapPin, Briefcase, ArrowUpRight, Loader2, Globe } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { trackEvent } from "@/lib/analytics";

type Job = { id: string; title: string; company: string; location: string; salary?: string; match?: string; link: string; description?: string; remote?: boolean };

function JobCard({ job }: { job: Job }) {
  return (
    <a href={job.link} target="_blank" rel="noopener noreferrer"
       onClick={() => trackEvent('affiliate_job_click', job.id)}
       className="group flex items-start justify-between gap-4 border-[3px] border-[#141312] bg-white p-5 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[5px_5px_0_#141312]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Briefcase size={15} className="shrink-0 text-[#2233FF]" />
          <h3 className="truncate text-base font-extrabold tracking-tight text-[#141312]">{job.title}</h3>
          {job.remote && (
            <span className="inline-flex items-center gap-1 border-2 border-[#2233FF] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#2233FF]">
              <Globe size={10} /> Remote
            </span>
          )}
        </div>
        <div className="mt-1 text-sm font-semibold text-[#141312]/80">{job.company}</div>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-wider text-[#141312]/55" style={{ fontFamily: 'var(--fm)' }}>
          <span className="flex items-center gap-1"><MapPin size={12} /> {job.location || 'Remote'}</span>
          {job.salary && <span>{job.salary}</span>}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="border-2 border-[#0E8A4B] px-2 py-1 text-[11px] font-black text-[#0E8A4B]" style={{ fontFamily: 'var(--fm)' }}>{job.match}</span>
        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#141312]/50 group-hover:text-[#FF4326]" style={{ fontFamily: 'var(--fm)' }}>View <ArrowUpRight size={13} /></span>
      </div>
    </a>
  );
}

export function JobsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { data } = useResumeStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setJobs([]);
    const userSkills = data.skills.map(s => s.name).join(', ') || 'Software Engineer';
    const userTitle = data.personalInfo.jobTitle || 'Professional';
    const userLocation = data.personalInfo.location || '';
    trackEvent('jobs_modal_viewed', 'affiliate_funnel');
    fetch('/api/affiliate/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills: userSkills, jobTitle: userTitle, location: userLocation }),
    })
      .then(res => res.json())
      .then(res => { if (res.success && res.data) setJobs(res.data); })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [isOpen, data]);

  if (!isOpen) return null;
  const local = jobs.filter(j => !j.remote);
  const remote = jobs.filter(j => j.remote);

  return (
    <div className="fixed inset-0 z-[300] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center print:hidden" onClick={onClose}>
      <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto border-[3px] border-[#141312] bg-[#E8E7E1] shadow-[8px_8px_0_#141312] sm:rounded-none rounded-t-3xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b-[3px] border-[#141312] bg-[#141312] px-6 py-4 text-[#E8E7E1]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFE14D]" style={{ fontFamily: 'var(--fm)' }}>résumé downloaded ✓</div>
            <h2 className="text-xl font-black tracking-tight" style={{ fontFamily: 'var(--fd)' }}>Jobs matched to your profile</h2>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-[#E8E7E1]/55" style={{ fontFamily: 'var(--fm)' }}>
              {local.length} near you · {remote.length} remote · via CareerJet
            </p>
          </div>
          <button aria-label="Close" onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center border-2 border-[#E8E7E1] transition-colors hover:border-[#FF4326] hover:bg-[#FF4326]"><X size={18} /></button>
        </div>

        <div className="space-y-6 p-6">
          {loading && (
            <div className="flex flex-col items-center gap-3 py-14 text-[#141312]/60">
              <Loader2 size={28} className="animate-spin text-[#2233FF]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--fm)' }}>matching roles…</span>
            </div>
          )}

          {!loading && jobs.length === 0 && (
            <div className="py-14 text-center">
              <p className="text-lg font-extrabold" style={{ fontFamily: 'var(--fh)' }}>No matches right now.</p>
              <p className="mt-1 text-sm text-[#141312]/60">Check back soon — new roles land daily.</p>
            </div>
          )}

          {!loading && local.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#141312]/55" style={{ fontFamily: 'var(--fm)' }}>
                <MapPin size={12} /> In your location
              </div>
              <div className="space-y-3">{local.map(job => <JobCard key={job.id} job={job} />)}</div>
            </div>
          )}

          {!loading && remote.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2233FF]" style={{ fontFamily: 'var(--fm)' }}>
                <Globe size={12} /> Remote / work from anywhere
              </div>
              <div className="space-y-3">{remote.map(job => <JobCard key={job.id} job={job} />)}</div>
            </div>
          )}

          <p className="pt-1 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-[#141312]/40" style={{ fontFamily: 'var(--fm)' }}>
            roles via CareerJet · matched from your skills & location
          </p>
        </div>
      </div>
    </div>
  );
}