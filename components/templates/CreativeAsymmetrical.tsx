import React from 'react';
import { ResumeData } from '@/app/page';

export default function CreativeAsymmetrical({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#1A1A1A] font-sans w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col relative mx-auto">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E84A5F] rounded-bl-[100px] print:rounded-none print:w-full print:h-2 print:top-0 print:left-0" />
      <div className="relative z-10 flex justify-between items-end mb-8 border-b-2 border-[#E8E0D8] pb-6">
        <div>
          <h1 className="text-[44px] font-black tracking-tight leading-[0.9]">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-medium text-[#E84A5F] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#B0A090] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed text-[#4A4040] bg-[#FAF8F5] p-5 rounded-lg mb-8 border-l-8 border-[#E84A5F] print:bg-transparent print:border-l-4">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#B0A090] uppercase tracking-[0.3em] mb-5">Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="relative pl-6">
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#E84A5F] print:bg-transparent print:border-2 print:border-[#E84A5F]" />
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#E84A5F]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#B0A090] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#4A4040] leading-relaxed flex gap-2">
                      <span className="text-[#E84A5F]">◆</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#E8E0D8] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#B0A090] uppercase tracking-[0.3em] mb-4">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 border-l-4 border-[#E84A5F] pl-3">
                <p className="text-md font-bold">{edu.degree}</p>
                <p className="text-[10px] text-[#B0A090]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#B0A090] uppercase tracking-[0.3em] mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#4A4040] bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#E8E0D8] print:bg-transparent">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-[#E8E0D8] pt-8">
          <h2 className="text-[9px] font-bold text-[#B0A090] uppercase tracking-[0.3em] mb-5">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="bg-[#FAF8F5] p-4 rounded-xl border-b-4 border-[#E84A5F] print:bg-transparent">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#E84A5F]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#4A4040]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t border-[#E8E0D8] pt-8">
          <h2 className="text-[9px] font-bold text-[#B0A090] uppercase tracking-[0.3em] mb-5">References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-[#E84A5F]">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#B0A090]">{ref.contact}</p>
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