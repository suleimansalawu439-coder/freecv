"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
    <div className="min-h-screen bg-gray-50 text-gray-900 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-black mb-8">Privacy Policy & Consent Center</h1>
        
        <div className="prose prose-blue max-w-none">
          <p>Last Updated: July 2026</p>

          <h2>1. AI Data Processing Disclosure</h2>
          <p>
            By using Cvyon's AI features (such as ATS Scoring, Rewriting, and Import), you acknowledge that your resume content and job descriptions are processed by <strong>Google Gemini AI</strong>. 
            Google's API terms apply. Prompts sent via the API may be retained by Google for up to 30 days for abuse monitoring, but are <strong>not</strong> used to train Google's foundation models.
          </p>

          <h2>2. Your Rights (GDPR)</h2>
          <p>
            If you are an EU resident, you have the right to access, rectify, export, and erase your personal data.
            You can request full deletion or a data export using the tools below:
          </p>
          <div className="flex gap-4 my-6">
            <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm border border-red-200">Request Data Deletion</button>
            <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm border border-blue-200">Export My Data</button>
          </div>

          <h2>3. California Privacy Rights (CCPA/CPRA)</h2>
          <p>
            California residents have the right to opt-out of the "sale" or "sharing" of their personal information. If you joined the Cvyon Talent Pool, your data may be shared with recruiters.
          </p>
          
          <div className="bg-gray-100 p-6 rounded-xl my-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold mb-1">Do Not Sell My Personal Information</h3>
              <p className="text-sm text-gray-600">Opt out of sharing your resume with recruiters.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={doNotSell} onChange={handleDoNotSellChange} />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
            Email: <a href="mailto:dpo@cvyon.dev" className="text-blue-600 hover:underline">dpo@cvyon.dev</a>
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-blue-600 font-bold hover:underline">← Back to Cvyon</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
