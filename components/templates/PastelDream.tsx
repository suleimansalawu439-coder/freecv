import React from 'react';
import { ResumeData } from '@/app/page';

export default function PastelDream({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#4A3F3A] font-sans w-[8.5in] min-h-[11in] shadow-[0_20px_60px_rgba(212,168,160,0.15)] print:shadow-none p-[0.75in] flex flex-col rounded-2xl print:rounded-none mx-auto">
      <div className="border-b-2 border-[#F0E0D4] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[44px] font-bold tracking-tight leading-[0.9] text-[#4A3F3A]">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-[#D4A8A0] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#C4B8B0] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed text-[#6A5F5A] bg-[#FDF6F0] rounded-2xl p-5 mb-8">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#D4A8A0] uppercase tracking-[0.3em] mb-5">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="bg-[#FDF6F0] rounded-2xl p-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#4A3F3A]">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#D4A8A0]">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C4B8B0] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#6A5F5A] leading-relaxed flex gap-2">
                      <span className="text-[#D4A8A0]">✦</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-2 border-[#F0E0D4] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#D4A8A0] uppercase tracking-[0.3em] mb-4">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 bg-[#FDF6F0] rounded-xl p-3">
                <p className="text-md font-bold text-[#4A3F3A]">{edu.degree}</p>
                <p className="text-[10px] text-[#C4B8B0]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#D4A8A0] uppercase tracking-[0.3em] mb-4">skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#6A5F5A] bg-[#FDF6F0] px-3 py-1 rounded-full">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t-2 border-[#F0E0D4] pt-8">
          <h2 className="text-[9px] font-bold text-[#D4A8A0] uppercase tracking-[0.3em] mb-5">projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="bg-[#FDF6F0] rounded-xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#4A3F3A]">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#D4A8A0]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#6A5F5A]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t-2 border-[#F0E0D4] pt-8">
          <h2 className="text-[9px] font-bold text-[#D4A8A0] uppercase tracking-[0.3em] mb-5">references</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="bg-[#FDF6F0] rounded-xl p-4">
                <p className="text-sm font-bold text-[#4A3F3A]">{ref.name}</p>
                <p className="text-xs text-[#D4A8A0]">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#C4B8B0]">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    \n
      {/* CUSTOM SECTIONS */}
      {data.customSections && data.customSections.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          {data.customSections.map(section => (
            <div key={section.id} className="mb-6 last:mb-0">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300 mb-4 font-sans">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold leading-tight">{item.title}</h3>
                      {item.date && <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-gray-400 shrink-0 ml-4">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-xs font-bold text-gray-500 mb-1 font-sans uppercase tracking-wider">{item.subtitle}</p>}
                    {item.description && (
                      <div className="text-xs text-gray-700 leading-relaxed mt-1">
                        {item.description.split('\n').filter(l => l.trim()).map((line, i) => (
                          <div key={i} className="flex gap-2 mb-1"><span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" /><span>{line}</span></div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}\n</div>
  );
}