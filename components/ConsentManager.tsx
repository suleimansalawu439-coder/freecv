"use client";

import React, { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Shield, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ConsentManager() {
  const { data, setConsents } = useResumeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(true);

  useEffect(() => {
    const seen = localStorage.getItem('cvyon-consent-seen');
    if (!seen) {
      setHasSeen(false);
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (data.personalInfo.email && data.personalInfo.email.includes('@')) {
      const lastSynced = sessionStorage.getItem(`cvyon-synced-${data.personalInfo.email}`);
      if (!lastSynced) {
        fetch('/api/crm/optin', {
          method: 'POST',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then((r) => {
            if (r.ok) sessionStorage.setItem(`cvyon-synced-${data.personalInfo.email}`, 'true');
          })
          .catch((e) => console.warn('Consent deferred sync error', e));
      }
    }
  }, [data.personalInfo.email]);

  const syncConsent = (updatedConsents: any) => {
    if (data.personalInfo.email && data.personalInfo.email.includes('@')) {
      fetch('/api/crm/optin', {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, consents: updatedConsents }),
      }).catch((e) => console.warn('Consent sync error', e));
    }
  };

  const handleSave = () => {
    localStorage.setItem('cvyon-consent-seen', 'true');
    setHasSeen(true);
    setIsOpen(false);
    syncConsent(data.consents);
  };

  const handleAcceptAll = () => {
    const fullConsents = { recruiterShare: true, emailJobs: true, analytics: true };
    setConsents(fullConsents);
    localStorage.setItem('cvyon-consent-seen', 'true');
    setHasSeen(true);
    setIsOpen(false);
    syncConsent(fullConsents);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-3 left-3 z-40 print:hidden">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border shadow-sm px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-gray-700 hover:text-black transition-all hover:scale-105"
        >
          <Shield size={10} /> Privacy
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 left-3 z-[400] print:hidden max-w-[280px] w-full" role="dialog" aria-label="Privacy and Data Preferences">
      <div className="bg-white/95 backdrop-blur-md text-gray-800 rounded-xl border border-gray-200 shadow-xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-300">
        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5 text-[#141312]">
              <Shield size={12} className="text-[#FF4326]" />
              <h2 className="text-[11px] font-bold uppercase tracking-wider">Privacy & Data</h2>
            </div>
            {hasSeen && (
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close privacy preferences"
                className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <p className="text-[10px] text-gray-600 mb-3 leading-tight">
            We use your data for AI features and optionally connect you with recruiters. Manage your preferences.
          </p>

          <div className="space-y-1.5 mb-3" role="group" aria-label="Consent Options">
            {/* Essential & AI */}
            <div className="flex items-center gap-2 p-1.5 rounded-lg border border-gray-100 bg-gray-50" aria-disabled="true">
              <div className="w-3.5 h-3.5 rounded bg-gray-300 flex items-center justify-center text-white">
                <Check size={8} />
              </div>
              <span className="font-semibold text-[10px] text-gray-700">Essential & AI Processing (Required)</span>
            </div>

            {/* Talent Pool */}
            <div
              role="checkbox"
              aria-checked={data.consents.recruiterShare}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setConsents({ ...data.consents, recruiterShare: !data.consents.recruiterShare });
                }
              }}
              className="flex items-center gap-2 p-1.5 rounded-lg border border-gray-100 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors focus:outline-none focus:ring-1 focus:ring-[#FF4326]"
              onClick={() => setConsents({ ...data.consents, recruiterShare: !data.consents.recruiterShare })}
            >
              <div className={cn("w-3.5 h-3.5 rounded flex items-center justify-center transition-colors", data.consents.recruiterShare ? 'bg-[#FF4326] text-white' : 'border border-gray-300')}>
                {data.consents.recruiterShare && <Check size={8} />}
              </div>
              <span className="font-semibold text-[10px] text-gray-700">Talent Pool (Allow Recruiters)</span>
            </div>

            {/* Analytics */}
            <div
              role="checkbox"
              aria-checked={data.consents.analytics}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setConsents({ ...data.consents, analytics: !data.consents.analytics });
                }
              }}
              className="flex items-center gap-2 p-1.5 rounded-lg border border-gray-100 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors focus:outline-none focus:ring-1 focus:ring-[#141312]"
              onClick={() => setConsents({ ...data.consents, analytics: !data.consents.analytics })}
            >
              <div className={cn("w-3.5 h-3.5 rounded flex items-center justify-center transition-colors", data.consents.analytics ? 'bg-[#141312] text-white' : 'border border-gray-300')}>
                {data.consents.analytics && <Check size={8} />}
              </div>
              <span className="font-semibold text-[10px] text-gray-700">Anonymous Analytics</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 py-1.5 rounded-lg font-bold text-[9px] uppercase tracking-wider bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-1.5 rounded-lg font-bold text-[9px] uppercase tracking-wider bg-[#141312] text-white hover:bg-[#FF4326] transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
