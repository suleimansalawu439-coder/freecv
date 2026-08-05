"use client";

import React, { useState, useMemo } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { calculateAtsScore, AtsScoreResult } from '@/lib/ats-engine';
import { useResumeStore } from '@/store/useResumeStore';
import Link from 'next/link';

export function LiveAtsScore() {
  const [isOpen, setIsOpen] = useState(false);
  const data = useResumeStore((s) => s.data);

  const atsResult: AtsScoreResult = useMemo(() => {
    return calculateAtsScore(data || {});
  }, [data]);

  const { score, grade, breakdown, highlights, suggestions } = atsResult;

  // Grade color scheme
  const getGradeBadge = (g: string) => {
    switch (g) {
      case 'A+':
      case 'A':
        return 'bg-[#10B981] text-white border-[#141312]';
      case 'B':
        return 'bg-[#3B82F6] text-white border-[#141312]';
      case 'C':
        return 'bg-[#F59E0B] text-black border-[#141312]';
      default:
        return 'bg-[#EF4444] text-white border-[#141312]';
    }
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-[#10B981]';
    if (s >= 65) return 'text-[#3B82F6]';
    if (s >= 50) return 'text-[#F59E0B]';
    return 'text-[#EF4444]';
  };

  return (
    <div className="relative inline-block text-left z-30">
      {/* Live ATS Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#FFFDF8] hover:bg-white border-2 border-[#141312] px-3 py-1.5 transition-all shadow-[2px_2px_0_#141312] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        title="Click to view real-time ATS scoring breakdown"
      >
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={16} className={getScoreColor(score)} />
          <span className="fm text-[11px] font-bold tracking-wider text-[#141312]">
            ATS <span className={getScoreColor(score)}>{score}/100</span>
          </span>
        </div>
        <span className={`fm text-[9px] font-black px-1.5 py-0.5 border border-[#141312] ${getGradeBadge(grade)}`}>
          {grade}
        </span>
        {isOpen ? <ChevronUp size={14} className="text-[#141312]" /> : <ChevronDown size={14} className="text-[#141312]" />}
      </button>

      {/* Breakdown Popover Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FFFDF8] border-[3px] border-[#141312] p-5 shadow-[5px_5px_0_#141312] z-50 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#141312]/20 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#2233FF]" />
                <h4 className="fh font-extrabold text-sm text-[#141312]">Live ATS Readiness</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="fm text-xs font-bold text-[#141312]/60">Grade</span>
                <span className={`fm text-xs font-black px-2 py-0.5 border-2 border-[#141312] ${getGradeBadge(grade)}`}>
                  {grade} ({score}%)
                </span>
              </div>
            </div>

            {/* Section Breakdown Bars */}
            <div className="space-y-3 mb-5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#141312]/60 fm">
                Section Scores
              </div>

              {/* Contact Info */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#141312] mb-1">
                  <span>Contact Info</span>
                  <span className="fm">{breakdown.contactInfo.score}/{breakdown.contactInfo.max}</span>
                </div>
                <div className="w-full h-2 bg-[#E8E7E1] border border-[#141312]">
                  <div
                    className="h-full bg-[#141312] transition-all duration-300"
                    style={{ width: `${(breakdown.contactInfo.score / breakdown.contactInfo.max) * 100}%` }}
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#141312] mb-1">
                  <span>Professional Summary</span>
                  <span className="fm">{breakdown.summary.score}/{breakdown.summary.max}</span>
                </div>
                <div className="w-full h-2 bg-[#E8E7E1] border border-[#141312]">
                  <div
                    className="h-full bg-[#141312] transition-all duration-300"
                    style={{ width: `${(breakdown.summary.score / breakdown.summary.max) * 100}%` }}
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#141312] mb-1">
                  <span>Work Experience & Metrics</span>
                  <span className="fm">{breakdown.experience.score}/{breakdown.experience.max}</span>
                </div>
                <div className="w-full h-2 bg-[#E8E7E1] border border-[#141312]">
                  <div
                    className="h-full bg-[#141312] transition-all duration-300"
                    style={{ width: `${(breakdown.experience.score / breakdown.experience.max) * 100}%` }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#141312] mb-1">
                  <span>Skills & Keywords</span>
                  <span className="fm">{breakdown.skills.score}/{breakdown.skills.max}</span>
                </div>
                <div className="w-full h-2 bg-[#E8E7E1] border border-[#141312]">
                  <div
                    className="h-full bg-[#141312] transition-all duration-300"
                    style={{ width: `${(breakdown.skills.score / breakdown.skills.max) * 100}%` }}
                  />
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#141312] mb-1">
                  <span>Education</span>
                  <span className="fm">{breakdown.education.score}/{breakdown.education.max}</span>
                </div>
                <div className="w-full h-2 bg-[#E8E7E1] border border-[#141312]">
                  <div
                    className="h-full bg-[#141312] transition-all duration-300"
                    style={{ width: `${(breakdown.education.score / breakdown.education.max) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Suggestions or Highlights */}
            {suggestions.length > 0 ? (
              <div className="mb-4 bg-[#FFF0EE] border-2 border-[#D8362A] p-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#D8362A] mb-1.5">
                  <AlertTriangle size={14} />
                  <span>Immediate Improvements</span>
                </div>
                <ul className="text-xs text-[#141312] space-y-1 pl-4 list-disc">
                  {suggestions.slice(0, 3).map((sugg, idx) => (
                    <li key={idx}>{sugg}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mb-4 bg-[#E8F8F0] border-2 border-[#10B981] p-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#10B981] mb-1">
                  <CheckCircle2 size={14} />
                  <span>Excellent ATS Optimization!</span>
                </div>
                <p className="text-xs text-[#141312]">
                  Your resume has strong contact structure, quantifiable bullet points, and core keywords.
                </p>
              </div>
            )}

            {/* Link to Full ATS Grader */}
            <div className="pt-2 border-t border-[#141312]/20 flex justify-between items-center">
              <Link
                href="/ats-grader"
                target="_blank"
                className="fm text-xs font-bold text-[#2233FF] hover:underline flex items-center gap-1"
              >
                Detailed ATS Grader <ArrowUpRight size={13} />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="fm text-xs font-bold text-[#141312] border border-[#141312] px-2.5 py-1 hover:bg-[#141312] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
