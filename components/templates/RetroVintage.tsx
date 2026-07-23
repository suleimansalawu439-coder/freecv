import React from 'react';
import { ResumeData } from '@/app/page';

export default function RetroVintage({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#FDF8F0] text-[#3A2A1A] font-serif w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border border-[#D4C4B0] mx-auto print:border-none">
      <div className="border-b-2 border-[#D4C4B0] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[44px] font-bold tracking-tight leading-[0.9] text-[#3A2A1A]">{data.personalInfo.fullName}</h1>
          <p className="text-lg italic text-[#8A6A4A] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A6A4A] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed text-[#5A4A3A] border-l-4 border-[#8A6A4A] pl-5 mb-8 italic">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#8A6A4A] uppercase tracking-[0.3em] mb-5">Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#D4C4B0] pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#3A2A1A]">{exp.role}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6A4A]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8A6A4A] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#5A4A3A] leading-relaxed flex gap-2">
                      <span className="text-[#8A6A4A]">•</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#D4C4B0] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A6A4A] uppercase tracking-[0.3em] mb-4">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#3A2A1A]">{edu.degree}</p>
                <p className="text-[11px] text-[#8A6A4A]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A6A4A] uppercase tracking-[0.3em] mb-4">Skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[11px] font-bold uppercase tracking-wider text-[#5A4A3A] border-b border-[#D4C4B0] pb-0.5">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-[#D4C4B0] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A6A4A] uppercase tracking-[0.3em] mb-5">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="p-3 border-2 border-dashed border-[#D4C4B0]">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#3A2A1A]">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#8A6A4A]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#5A4A3A]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t border-[#D4C4B0] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A6A4A] uppercase tracking-[0.3em] mb-5">References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold text-[#3A2A1A]">{ref.name}</p>
                <p className="text-xs text-[#8A6A4A] italic">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#8A6A4A]">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}