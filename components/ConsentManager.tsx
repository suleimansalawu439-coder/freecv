"use client";

import React, { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Shield, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ConsentManager() {
  const { data, setConsents } = useResumeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(true);

  // Check if they've seen the consent manager before
  useEffect(() => {
    const seen = localStorage.getItem('cvyon-consent-seen');
    if (!seen) {
      setHasSeen(false);
      setIsOpen(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cvyon-consent-seen', 'true');
    setHasSeen(true);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    setConsents({ recruiterShare: true, emailJobs: true, analytics: true });
    handleSave();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-4 z-40 print:hidden">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border shadow-sm px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#141312] hover:text-black hover:border-gray-300 transition-all"
        >
          <Shield size={12} /> Privacy Settings
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-[400] print:hidden max-w-[360px] w-[calc(100vw-2rem)]">
      <div className="bg-[#141312] text-[#E8E7E1] rounded-none border-[3px] border-[#141312] hs-v w-full shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FF4326] text-[#E8E7E1] border-[3px] border-[#141312] hs rounded-xl">
                <Shield size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#141312]">Privacy Preferences</h2>
                <p className="text-xs font-bold uppercase tracking-wider text-[#141312] mt-1">Manage your data</p>
              </div>
            </div>
            {hasSeen && (
              <button onClick={() => setIsOpen(false)} className="p-2 bg-[#E8E7E1] hover:bg-[#FF4326] hover:text-white border-[2px] border-[#141312] rounded-full transition-colors text-[#141312]">
                <X size={16} />
              </button>
            )}
          </div>

          <p className="text-sm text-[#141312] mb-8 leading-relaxed">
            We value your privacy. We use your data to improve the builder, power AI features, and optionally connect you with top recruiters. You have full control over what you share.
          </p>

          <div className="space-y-4">
            {/* Essential */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-[3px] border-[#141312] bg-[#E8E7E1]">
              <div className="mt-0.5">
                <div className="w-5 h-5 rounded bg-[#141312] flex items-center justify-center text-white">
                  <Check size={12} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#141312]">Essential Data (Required)</h3>
                <p className="text-xs text-[#141312] mt-1">Required to save your resume locally and provide core builder functionality.</p>
              </div>
            </div>

            {/* AI Processing */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-[3px] border-[#141312] bg-[#E8E7E1] hs-c">
              <div className="mt-0.5">
                <div className="w-5 h-5 rounded bg-[#2233FF] text-[#E8E7E1] flex items-center justify-center text-white">
                  <Check size={12} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#141312]">AI Processing (Required for AI features)</h3>
                <p className="text-xs text-[#141312] mt-1">Required to use the ATS Grader, AI Rewriter, and Smart Skills. Data is processed securely.</p>
              </div>
            </div>

            {/* Talent Pool */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-[3px] border-[#141312] bg-[#E8E7E1] hs-v">
              <button
                onClick={() => setConsents({ ...data.consents, recruiterShare: !data.consents.recruiterShare })}
                className={cn("mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors", data.consents.recruiterShare ? 'bg-[#FF4326] border-[#141312] border-[3px] text-[#E8E7E1]' : 'border-gray-300 text-transparent')}
              >
                <Check size={12} />
              </button>
              <div>
                <h3 className="font-bold text-sm text-[#141312]">Talent Pool & Recruiters</h3>
                <p className="text-xs text-[#141312] mt-1">Allow verified recruiters to find your profile and contact you with job opportunities.</p>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-[3px] border-[#141312] bg-[#E8E7E1] hs">
              <button
                onClick={() => setConsents({ ...data.consents, analytics: !data.consents.analytics })}
                className={cn("mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors", data.consents.analytics ? 'bg-[#141312] border-[#141312] border-[3px] text-[#E8E7E1]' : 'border-gray-300 text-transparent')}
              >
                <Check size={12} />
              </button>
              <div>
                <h3 className="font-bold text-sm text-[#141312]">Usage Analytics</h3>
                <p className="text-xs text-[#141312] mt-1">Help us improve by sharing anonymous usage data (e.g. templates used, completion time).</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-[3px] border-[#141312] bg-[#E8E7E1] hs">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#E8E7E1] text-[#141312] border-[3px] border-[#141312] hs hover:bg-[#FFE14D] transition-colors"
            >
              Save Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#141312] text-[#E8E7E1] border-[3px] border-[#141312] hs-c hover:bg-[#2233FF]"
            >
              Accept All
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <a href="/privacy" target="_blank" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-[#141312] underline">
              View Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
