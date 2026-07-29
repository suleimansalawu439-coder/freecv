import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function CorporateBlue({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#1A2A3A] font-sans w-[8.5in] min-h-[11in] shadow-lg print:shadow-none p-[0.75in] flex flex-col mx-auto">
      <div className="bg-[#1A3A5A] text-white -mx-[0.75in] -mt-[0.75in] px-[0.75in] pt-[0.75in] pb-6 mb-8 print:mx-0 print:mt-0 print:px-[0.75in] print:pt-[0.75in]">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-[44px] font-bold tracking-tight leading-[0.9]">{data.personalInfo.fullName}</h1>
            <p className="text-lg text-[#C8A86A] mt-2">{data.personalInfo.jobTitle}</p>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#B0C0D0] text-right">
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
            {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
          </div>
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed text-[#3A4A5A] border-l-4 border-[#C8A86A] pl-5 mb-8">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#8A9AAB] uppercase tracking-[0.3em] mb-5 border-b border-[#E0E5EC] pb-2">Professional Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#1A3A5A]">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#C8A86A]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A9AAB] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#3A4A5A] leading-relaxed flex gap-2">
                      <span className="text-[#C8A86A]">•</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#E0E5EC] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A9AAB] uppercase tracking-[0.3em] mb-4">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#1A3A5A]">{edu.degree}</p>
                <p className="text-[10px] text-[#8A9AAB]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A9AAB] uppercase tracking-[0.3em] mb-4">Core Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#1A3A5A] bg-[#F5F7FA] px-3 py-1 rounded border border-[#E0E5EC]">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-[#E0E5EC] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A9AAB] uppercase tracking-[0.3em] mb-5 border-b border-[#E0E5EC] pb-2">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="bg-[#F5F7FA] p-3 rounded border border-[#E0E5EC]">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#1A3A5A]">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#C8A86A]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#3A4A5A]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t border-[#E0E5EC] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A9AAB] uppercase tracking-[0.3em] mb-5 border-b border-[#E0E5EC] pb-2">References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold text-[#1A3A5A]">{ref.name}</p>
                <p className="text-xs text-[#C8A86A]">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#8A9AAB]">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}