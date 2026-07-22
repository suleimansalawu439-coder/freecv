import React from 'react';
import { ResumeData } from '@/app/page';

export default function EditorialMagazine({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#FDFCFA] text-[#1A1410] font-serif w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border border-[#E8DDD4] print:border-none mx-auto">
      <div className="border-b-4 border-[#1A1410] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[52px] font-bold tracking-tight leading-[0.9] text-[#1A1410]">{data.personalInfo.fullName}</h1>
          <p className="text-lg italic text-[#8A7A6A] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A7A6A] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed text-[#3A322A] border-l-4 border-[#1A1410] pl-5 mb-8 italic">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-5">Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#D4C8BC] pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold text-[#1A1410]">{exp.role}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7A6A]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8A7A6A] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#3A322A] leading-relaxed flex gap-2">
                      <span className="text-[#8A7A6A]">—</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-2 border-[#E8DDD4] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-4">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#1A1410]">{edu.degree}</p>
                <p className="text-[11px] text-[#8A7A6A]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-4">Skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[11px] font-bold uppercase tracking-wider text-[#3A322A] border-b border-[#D4C8BC] pb-0.5">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t-2 border-[#E8DDD4] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-5">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="p-3 border border-[#E8DDD4] bg-[#F5F0EB]/50">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#1A1410]">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#8A7A6A]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#3A322A]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t-2 border-[#E8DDD4] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-5">References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold text-[#1A1410]">{ref.name}</p>
                <p className="text-xs text-[#8A7A6A]">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#8A7A6A] italic">{ref.contact}</p>
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