import React from 'react';
import { ResumeData } from '@/app/page';

export default function Gothic({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#0D0808] text-[#D4C4B0] font-serif w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border border-[#6A3A3A] print:border-none mx-auto print:bg-white print:text-black">
      <div className="border-b-2 border-[#6A3A3A] pb-6 mb-6 flex justify-between items-end print:border-black">
        <div>
          <h1 className="text-[44px] font-black tracking-tight leading-[0.9] text-[#D4C4B0] print:text-black">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-[#8A4A4A] mt-2 print:text-gray-700">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#6A3A3A] text-right print:text-gray-500">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#B0A090] border-l-4 border-[#8A4A4A] pl-5 mb-8 italic print:text-black print:border-black">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#8A4A4A] uppercase tracking-[0.3em] mb-5 print:text-black">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#6A3A3A] pl-4 print:border-black">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#D4C4B0] print:text-black">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8A4A4A] print:text-gray-600">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6A3A3A] mb-2 print:text-gray-800">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#B0A090] leading-relaxed flex gap-2 print:text-black">
                      <span className="text-[#8A4A4A] print:text-black">❧</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#6A3A3A] pt-8 print:border-black">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A4A4A] uppercase tracking-[0.3em] mb-4 print:text-black">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#D4C4B0] print:text-black">{edu.degree}</p>
                <p className="text-[10px] text-[#6A3A3A] print:text-gray-700">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A4A4A] uppercase tracking-[0.3em] mb-4 print:text-black">skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#B0A090] border-b border-[#6A3A3A] pb-0.5 print:text-black print:border-black">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}