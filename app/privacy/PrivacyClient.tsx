"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Archivo, Archivo_Black, DM_Sans, Space_Mono } from '@/lib/fonts';

const display = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap" });
const head = Archivo({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export default function PrivacyClient() {
  const [doNotSell, setDoNotSell] = useState(false);

  useEffect(() => {
    // CCPA Global Privacy Control check
    if (typeof navigator !== 'undefined' && 'globalPrivacyControl' in navigator) {
      if ((navigator as any).globalPrivacyControl) {
        setDoNotSell(true);
      }
    }
  }, []);

  const handleDoNotSellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoNotSell(e.target.checked);
    // In a real app, this would dispatch an API call to update the user's consent record
  };

  return (
    <div className={cn("cv-riso relative min-h-screen text-[#141312] bg-[#E8E7E1] overflow-x-hidden py-20 px-6", body.className)}
      style={{ ["--ink" as any]: "#141312", ["--verm" as any]: "#FF4326", ["--cob" as any]: "#2233FF", ["--hi" as any]: "#FFE14D", ["--fd" as any]: display.style.fontFamily, ["--fh" as any]: head.style.fontFamily, ["--fb" as any]: body.style.fontFamily, ["--fm" as any]: mono.style.fontFamily }}>
      <style>{`
        .cv-riso{font-family:var(--fb)} .cv-riso .fd{font-family:var(--fd)} .cv-riso .fh{font-family:var(--fh)} .cv-riso .fm{font-family:var(--fm)}
        .cv-riso .hs{box-shadow:7px 7px 0 var(--ink)} .cv-riso .hs-v{box-shadow:7px 7px 0 var(--verm)} .cv-riso .hs-c{box-shadow:6px 6px 0 var(--cob)}
        .cv-riso .hs-sm{box-shadow:5px 5px 0 var(--ink)}
        .cv-riso .riso-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border: 3px solid var(--ink); background-color: var(--ink); color: #E8E7E1; padding: 0.75rem 1.5rem; font-family: var(--fh); font-size: 0.875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 7px 7px 0 var(--ink); transition: all 0.2s; cursor: pointer; text-decoration: none; }
        .cv-riso .riso-btn:hover { transform: translate(2px, 2px); box-shadow: none; }
        .cv-riso .riso-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; box-shadow: 7px 7px 0 var(--ink); }
        .cv-riso .riso-btn-ghost { background-color: transparent; color: var(--ink); }
        .cv-riso .riso-card { border: 3px solid var(--ink); background-color: #ffffff; box-shadow: 7px 7px 0 var(--ink); }
        .cv-riso .riso-input { width: 100%; border: 3px solid var(--ink); background-color: #ffffff; padding: 0.75rem 1rem; font-family: var(--fm); font-size: 0.875rem; color: var(--ink); box-shadow: 4px 4px 0 var(--ink); transition: all 0.2s; outline: none; }
        .cv-riso .riso-input:focus { box-shadow: none; transform: translate(2px, 2px); border-color: var(--verm); }
        .cv-riso .riso-label { display: block; font-family: var(--fh); font-size: 0.875rem; font-weight: 800; color: var(--ink); }
        .cv-riso .riso-chip { display: inline-flex; align-items: center; gap: 0.25rem; border: 2px solid var(--ink); padding: 0.25rem 0.5rem; font-family: var(--fm); font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold; color: var(--ink); background: #ffffff; }
        .cv-riso .legal-prose h2 { font-family: var(--fh); font-size: 1.5rem; font-weight: 800; margin: 1.75em 0 0.75em; text-transform: uppercase; letter-spacing: -0.01em; }
        .cv-riso .legal-prose p { margin: 1em 0; color: #141312; }
        .cv-riso .legal-prose a { color: #2233FF; text-decoration: underline; }
        .cv-riso .legal-prose a:hover { color: #141312; }
      `}</style>

      <div className="max-w-3xl mx-auto riso-card p-10">
        <h1 className="fd text-4xl tracking-tight mb-8">Privacy Policy & Consent Center</h1>

        <div className="legal-prose">
          <p className="fm text-xs font-bold uppercase tracking-widest text-[#141312]/70">Last Updated: July 2026</p>

          <h2>1. AI Data Processing Disclosure</h2>
          <p>
            By using Cvyon's AI features (such as ATS Scoring, Rewriting, and Import), you acknowledge that your resume content and job descriptions are processed by <strong>Google Gemini AI</strong>.
            Google's API terms apply. Prompts sent via the API may be retained by Google for up to 30 days for abuse monitoring, but are <strong>not</strong> used to train Google's foundation models.
          </p>

          <h2>2. Your Rights (GDPR)</h2>
          <p>
            If you are an EU resident, you have the right to access, rectify, export, and erase your personal data.
            You can request an export or deletion of your data any time via support@cvyon.com.
          </p>
          <div className="flex gap-4 my-6">
            <button className="border-[3px] border-[#FF4326] bg-white text-[#FF4326] px-4 py-2 font-bold text-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px]">Request Data Deletion</button>
            <button className="border-[3px] border-[#2233FF] bg-white text-[#2233FF] px-4 py-2 font-bold text-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px]">Export My Data</button>
          </div>

          <h2>3. California Privacy Rights (CCPA/CPRA)</h2>
          <p>
            California residents have the right to opt-out of the "sale" or "sharing" of their personal information. If you joined the Cvyon Talent Pool, your data may be shared with recruiters.
          </p>

          <div className="bg-[#E8E7E1] border-[3px] border-[#141312] p-6 my-6 flex items-center justify-between">
            <div>
              <h3 className="fh font-extrabold mb-1">Do Not Sell My Personal Information</h3>
              <p className="text-sm text-[#141312]/70">Opt out of sharing your resume with recruiters.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={doNotSell} onChange={handleDoNotSellChange} />
              <div className="w-11 h-6 bg-[#141312]/20 peer-focus:outline-none border-[3px] border-[#141312] peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#141312] after:border-2 after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2233FF]"></div>
            </label>
          </div>

          <h2>4. Data Retention</h2>
          <p>
            We retain analytics events for 12 months. Inactive candidate profiles are automatically anonymized or deleted after 24 months of inactivity.
          </p>

          <h2>5. Data Protection Officer (DPO)</h2>
          <p>
            If you have any questions about this Privacy Policy, your rights, or how we handle your data, please contact our Data Protection Officer:
            <br /><br />
            <strong>Cvyon Privacy Team</strong><br />
            Email: <a href="mailto:support@cvyon.com">support@cvyon.com</a>
          </p>

          <div className="mt-12 pt-8 border-t-[3px] border-[#141312]">
            <Link href="/" className="fm text-sm font-bold uppercase tracking-widest text-[#2233FF] hover:text-[#141312]">← Back to Cvyon</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
