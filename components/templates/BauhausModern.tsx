import React from 'react';
import { ResumeData } from '@/app/page';

export default function BauhausModern({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#1A1A1A] font-sans w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border-2 border-[#1A1A1A] print:border-none mx-auto">
      <div className="border-b-4 border-[#1A1A1A] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[44px] font-black tracking-tight leading-[0.9] uppercase">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-bold text-[#E03C31] mt-2 print:text-black">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed border-l-4 border-[#E03C31] pl-4 mb-8 font-medium print:border-black">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-black uppercase tracking-[0.3em] border-b-2 border-[#1A1A1A] pb-2 mb-4">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-4 border-[#1A1A1A] pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-black">{exp.role}</h3>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#1A1A1A] text-white px-2 py-0.5 print:bg-transparent print:text-black">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-[11px] font-black uppercase tracking-wider mt-1 mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] leading-relaxed flex gap-2">
                      <span className="font-black text-[#E03C31] print:text-black">→</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-4 border-[#1A1A1A] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] border-b-2 border-[#1A1A1A] pb-2 mb-4">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 border-l-2 border-[#1A1A1A] pl-3">
                <p className="text-md font-black">{edu.degree}</p>
                <p className="text-[11px] font-bold">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] border-b-2 border-[#1A1A1A] pb-2 mb-4">skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-black uppercase tracking-wider border-2 border-[#1A1A1A] px-2 py-0.5">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>\n
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
      )}
    </div>
  );
}