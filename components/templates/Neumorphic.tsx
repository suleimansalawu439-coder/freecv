import React from 'react';
import { ResumeData } from '@/app/page';

export default function Neumorphic({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans p-10 bg-[#e0e5ec] text-gray-700 min-h-[1056px] w-full max-w-[816px] mx-auto print:bg-[#e0e5ec]">
      <div className="grid grid-cols-3 gap-8 h-full">
        {/* Sidebar */}
        <div className="col-span-1 space-y-8">
          <div className="p-6 rounded-3xl bg-[#e0e5ec] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-[#e0e5ec] shadow-[inset_6px_6px_10px_0_rgba(163,177,198,0.7),inset_-6px_-6px_10px_0_rgba(255,255,255,0.8)] flex items-center justify-center">
              <span className="text-3xl font-black text-[var(--theme-color)]">{data.personalInfo.fullName?.charAt(0)}</span>
            </div>
            <h1 className="text-xl font-black text-center text-gray-800 mb-1 leading-tight">{data.personalInfo.fullName}</h1>
            <p className="text-xs font-bold text-center text-[var(--theme-color)] uppercase tracking-wider">{data.personalInfo.jobTitle}</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#e0e5ec] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] space-y-4 text-xs font-medium">
            {data.personalInfo.email && <div className="flex flex-col"><span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Email</span>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div className="flex flex-col"><span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Phone</span>{data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div className="flex flex-col"><span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Location</span>{data.personalInfo.location}</div>}
            {data.personalInfo.website && <div className="flex flex-col"><span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Website</span>{data.personalInfo.website}</div>}
          </div>

          {data.skills.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#e0e5ec] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
              <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4">Skills</h2>
              <div className="flex flex-col gap-3">
                {data.skills.map(skill => (
                  <div key={skill.id} className="px-4 py-2 rounded-xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_0_rgba(163,177,198,0.5),inset_-4px_-4px_8px_0_rgba(255,255,255,0.6)] text-xs font-bold text-gray-600">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          {data.summary && (
            <div className="p-8 rounded-3xl bg-[#e0e5ec] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
              <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--theme-color)]"></div> Profile
              </h2>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div className="p-8 rounded-3xl bg-[#e0e5ec] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]">
              <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--theme-color)]"></div> Experience
              </h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--theme-color)] before:to-transparent">
                {data.experience.map(exp => (
                  <div key={exp.id} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#e0e5ec] shadow-[inset_2px_2px_4px_0_rgba(163,177,198,0.5),inset_-2px_-2px_4px_0_rgba(255,255,255,0.6)] border-2 border-[var(--theme-color)]"></div>
                    <h3 className="text-base font-black text-gray-800">{exp.role}</h3>
                    <div className="text-xs font-bold text-[var(--theme-color)] mb-2 uppercase tracking-wider">{exp.company} • {exp.startDate}-{exp.endDate}</div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-sm">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      
        {data.showReferences && data.references && data.references.length > 0 && (
          <section className="mt-8 break-inside-avoid">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 opacity-80" style={{ color: 'var(--theme-color)' }}>References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.references.map(ref => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <h3 className="font-bold text-lg">{ref.name}</h3>
                  <div className="text-sm opacity-80 font-medium mb-1">{ref.position} @ {ref.company}</div>
                  <div className="text-sm opacity-70 flex flex-col gap-1">
                    {ref.email && <span>E: {ref.email}</span>}
                    {ref.phone && <span>P: {ref.phone}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
  
</div>
    </div>
  );
}