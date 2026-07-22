import React from 'react';
import { ResumeData } from '@/app/page';

export default function ArtDeco({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#0D0D0D] text-[#C8B88A] font-serif w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border border-[#D4AF37]/40 print:border-none mx-auto print:bg-white print:text-black">
      <div className="border-b-2 border-[#D4AF37] pb-6 mb-6 flex justify-between items-end print:border-black">
        <div>
          <h1 className="text-[44px] font-bold tracking-tight leading-[0.9] text-[#D4AF37] print:text-black">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-[#C8B88A] mt-2 print:text-gray-700">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#C8B88A]/70 text-right print:text-gray-500">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#C8B88A]/80 border-l-4 border-[#D4AF37] pl-5 mb-8 italic print:text-black print:border-black">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#C8B88A]/60 uppercase tracking-[0.3em] mb-5 print:text-black">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#D4AF37] pl-4 print:border-black">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#D4AF37] print:text-black">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#C8B88A]/60 print:text-gray-600">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C8B88A]/50 mb-2 print:text-gray-800">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#C8B88A]/70 leading-relaxed flex gap-2 print:text-black">
                      <span className="text-[#D4AF37] print:text-black">◆</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#D4AF37]/30 pt-8 print:border-black">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#C8B88A]/60 uppercase tracking-[0.3em] mb-4 print:text-black">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#D4AF37] print:text-black">{edu.degree}</p>
                <p className="text-[10px] text-[#C8B88A]/60 print:text-gray-600">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#C8B88A]/60 uppercase tracking-[0.3em] mb-4 print:text-black">skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] border-b border-[#D4AF37]/40 pb-0.5 print:text-black print:border-black">
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