"use client";

import React, { useState } from 'react';
import { Shield, Key, CreditCard, ExternalLink, Activity } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function RecruiterManager({ recruiters, isDarkMode }: { recruiters: any[], isDarkMode: boolean }) {
  const activeSubs = recruiters.filter(r => r.subscriptions?.some((s:any) => s.status === 'active')).length;
  const totalApiVolume = recruiters.reduce((sum, r) => sum + (r.api_calls_count || 0), 0);
  
  // Calculate MRR
  // For now, assuming $99 per active sub
  const currentMRR = activeSubs * 99;

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Recruiter Management</h2>
          <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>Manage B2B customers, API access, and billing.</p>
        </div>
      </div>

      {/* B2B Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={cn("p-6 rounded-xl border shadow-sm", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
          <div className={cn("text-sm font-medium mb-1", isDarkMode ? "text-gray-400" : "text-gray-500")}>Active B2B Subscriptions</div>
          <div className="text-3xl font-black">{activeSubs}</div>
        </div>
        <div className={cn("p-6 rounded-xl border shadow-sm", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
          <div className={cn("text-sm font-medium mb-1", isDarkMode ? "text-gray-400" : "text-gray-500")}>Monthly Recurring Revenue (MRR)</div>
          <div className="text-3xl font-black text-green-500">${currentMRR.toLocaleString()}</div>
        </div>
        <div className={cn("p-6 rounded-xl border shadow-sm", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
          <div className={cn("text-sm font-medium mb-1", isDarkMode ? "text-gray-400" : "text-gray-500")}>Total API Volume</div>
          <div className="text-3xl font-black">{totalApiVolume.toLocaleString()}</div>
        </div>
      </div>

      <div className={cn("rounded-xl border shadow-sm overflow-hidden", isDarkMode ? "bg-[#0A0A0A] border-gray-800" : "bg-white border-gray-200")}>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className={cn("text-xs uppercase font-semibold border-b", isDarkMode ? "bg-gray-900/50 text-gray-400 border-gray-800" : "bg-gray-50 text-gray-500 border-gray-200")}>
            <tr>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">API Usage</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className={cn("divide-y", isDarkMode ? "divide-gray-800" : "divide-gray-100")}>
            {recruiters.map((rec) => {
              const activeSub = rec.subscriptions?.find((s:any) => s.status === 'active');
              return (
                <tr key={rec.id} className={cn("transition-colors", isDarkMode ? "hover:bg-gray-900/30" : "hover:bg-gray-50")}>
                  <td className="px-6 py-4">
                    <div className="font-bold text-base">{rec.company_name}</div>
                    <div className={cn("text-xs flex items-center gap-1 mt-1", isDarkMode ? "text-gray-500" : "text-gray-400")}>
                      <Key size={12} /> {rec.api_key ? 'Key Generated' : 'No Key'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {activeSub ? (
                      <span className={cn("px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full", isDarkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-100 text-emerald-700")}>
                        Active Sub
                      </span>
                    ) : (
                      <span className={cn("px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full", isDarkMode ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700")}>
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Activity size={14} className="text-blue-500" />
                      <span className="font-mono">{rec.api_calls_count || 0} reqs</span>
                    </div>
                  </td>
                  <td className={cn("px-6 py-4", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    {new Date(rec.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors", isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900")}>
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
            {recruiters.length === 0 && (
              <tr>
                <td colSpan={5} className={cn("px-6 py-12 text-center", isDarkMode ? "text-gray-500 bg-gray-900/50" : "text-gray-500 bg-gray-50")}>
                  No recruiters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
