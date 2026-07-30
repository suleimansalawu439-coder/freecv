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
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border shadow-sm px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-600 hover:text-black hover:border-gray-300 transition-all"
        >
          <Shield size={12} /> Privacy Settings
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[400] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 print:hidden">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Shield size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Privacy Preferences</h2>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-1">Manage your data</p>
              </div>
            </div>
            {hasSeen && (
              <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                <X size={16} />
              </button>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            We value your privacy. We use your data to improve the builder, power AI features, and optionally connect you with top recruiters. You have full control over what you share.
          </p>

          <div className="space-y-4">
            {/* Essential */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200 bg-gray-50">
              <div className="mt-0.5">
                <div className="w-5 h-5 rounded bg-gray-300 flex items-center justify-center text-white">
                  <Check size={12} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">Essential Data (Required)</h3>
                <p className="text-xs text-gray-500 mt-1">Required to save your resume locally and provide core builder functionality.</p>
              </div>
            </div>

            {/* AI Processing */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-purple-100 bg-purple-50/30">
              <div className="mt-0.5">
                <div className="w-5 h-5 rounded bg-purple-500 flex items-center justify-center text-white">
                  <Check size={12} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-purple-900">AI Processing (Required for AI features)</h3>
                <p className="text-xs text-purple-700/70 mt-1">Required to use the ATS Grader, AI Rewriter, and Smart Skills. Data is processed securely.</p>
              </div>
            </div>

            {/* Talent Pool */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-blue-100 bg-blue-50/50">
              <button
                onClick={() => setConsents({ ...data.consents, recruiterShare: !data.consents.recruiterShare })}
                className={cn("mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors", data.consents.recruiterShare ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-transparent')}
              >
                <Check size={12} />
              </button>
              <div>
                <h3 className="font-bold text-sm text-blue-900">Talent Pool & Recruiters</h3>
                <p className="text-xs text-blue-700/70 mt-1">Allow verified recruiters to find your profile and contact you with job opportunities.</p>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100">
              <button
                onClick={() => setConsents({ ...data.consents, analytics: !data.consents.analytics })}
                className={cn("mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors", data.consents.analytics ? 'bg-black border-black text-white' : 'border-gray-300 text-transparent')}
              >
                <Check size={12} />
              </button>
              <div>
                <h3 className="font-bold text-sm text-gray-900">Usage Analytics</h3>
                <p className="text-xs text-gray-500 mt-1">Help us improve by sharing anonymous usage data (e.g. templates used, completion time).</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs border-2 border-gray-200 hover:border-black transition-colors"
            >
              Save Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-black text-white hover:bg-gray-800 transition-colors shadow-lg"
            >
              Accept All
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <a href="/privacy" target="_blank" className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-gray-600 underline">
              View Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
