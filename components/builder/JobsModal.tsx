"use client";

import React, { useEffect, useState } from 'react';
import { X, Briefcase, MapPin, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { useResumeStore } from '@/store/useResumeStore';

interface JobsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JobsModal({ isOpen, onClose }: JobsModalProps) {
  const { data } = useResumeStore();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simulate fetching matching jobs based on Geo and Skills
      setLoading(true);
      const userSkills = data.skills.map(s => s.name).join(', ') || 'Software Engineer';
      const userTitle = data.personalInfo.jobTitle || 'Professional';
      const userLocation = data.personalInfo.address || 'Remote';
      
      // Actual API call to Affiliate Job Board
      fetch('/api/affiliate/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: userSkills,
          jobTitle: userTitle,
          location: userLocation
        })
      })
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setJobs(res.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
      
      trackEvent('jobs_modal_viewed', 'affiliate_funnel');
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm overflow-y-auto print:hidden flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border-[4px] border-[#141312]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
          <X size={20} />
        </button>
        
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#FF4326] rounded-2xl flex items-center justify-center border-[3px] border-[#141312] mb-4 transform -rotate-3 shadow-[4px_4px_0_#141312]">
            <Sparkles size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight leading-none text-[#141312] mb-2">Resume Downloaded!</h2>
          <p className="text-gray-600 font-medium">While you're here, check out these exclusive roles perfectly matching your new resume.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Loader2 size={32} className="animate-spin mb-4 text-[#2233FF]" />
            <p className="font-bold uppercase tracking-widest text-xs">Analyzing skills & location...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map(job => (
              <a 
                key={job.id} 
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('affiliate_job_clicked', job.company)}
                className="block group bg-white border-[3px] border-[#141312] p-5 hover:bg-[#F3F4F6] transition-colors relative"
              >
                {job.isPromoted && (
                  <span className="absolute top-0 right-0 bg-[#FF4326] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 border-b-[3px] border-l-[3px] border-[#141312]">
                    Promoted
                  </span>
                )}
                <div className="flex justify-between items-start mb-2 pr-20">
                  <h3 className="font-bold text-lg text-[#141312] group-hover:text-[#2233FF] transition-colors">{job.title}</h3>
                  <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    {job.match} Match
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">
                  <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.company}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                  <span className="text-[#141312] font-bold">{job.salary}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2233FF] group-hover:underline">
                  Apply Now <ExternalLink size={14} />
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-widest underline transition-colors">
            No thanks, just take me back to builder
          </button>
        </div>
      </div>
    </div>
  );
}
