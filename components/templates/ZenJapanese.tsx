import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function ZenJapanese({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#FDF8F0] text-[#2C2A24] font-sans w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border border-[#D4C8B8] print:border-none mx-auto">
      <div className="border-b border-[#D4C8B8] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[36px] font-light tracking-[0.1em] leading-[0.9] text-[#2C2A24]">{data.personalInfo.fullName}</h1>
          <p className="text-md font-light text-[#6A5A4A] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[8px] font-light uppercase tracking-[0.3em] text-[#8A7A6A] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[13px] leading-relaxed text-[#4A3A2A] border-l-2 border-[#8A7A6A] pl-4 mb-8 italic">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[8px] font-light text-[#8A7A6A] uppercase tracking-[0.4em] mb-5">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-light text-[#2C2A24]">{exp.role}</h3>
                  <span className="text-[8px] font-light uppercase tracking-[0.2em] text-[#8A7A6A]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[9px] font-light uppercase tracking-[0.15em] text-[#8A7A6A] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[12px] text-[#4A3A2A] leading-relaxed">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#D4C8B8] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[8px] font-light text-[#8A7A6A] uppercase tracking-[0.4em] mb-4">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-light text-[#2C2A24]">{edu.degree}</p>
                <p className="text-[9px] text-[#8A7A6A] font-light">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[8px] font-light text-[#8A7A6A] uppercase tracking-[0.4em] mb-4">skills</h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {data.skills.map(s => (
                <span key={s.id} className="text-[9px] font-light uppercase tracking-wider text-[#6A5A4A]">
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