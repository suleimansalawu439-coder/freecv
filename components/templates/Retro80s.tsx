import React from 'react';
import { ResumeData } from '@/app/page';

export default function Retro80s({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#1A1A3A] text-[#FFE9FF] font-sans w-[8.5in] min-h-[11in] shadow-[0_0_60px_rgba(255,0,255,0.1)] print:shadow-none p-[0.75in] flex flex-col border-2 border-[#FF00FF] print:border-none mx-auto print:bg-white print:text-black">
      <div className="border-b-2 border-[#00FFFF] pb-6 mb-6 flex justify-between items-end print:border-black">
        <div>
          <h1 className="text-[44px] font-black tracking-tight leading-[0.9] text-[#FF00FF] print:text-black">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-bold text-[#00FFFF] mt-2 print:text-gray-700">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#FF00FF]/70 text-right print:text-gray-600">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#FFE9FF] border-l-4 border-[#FF00FF] pl-4 mb-8 print:text-black print:border-black">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-[0.3em] mb-5 print:text-black">EXPERIENCE</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-4 border-[#FF00FF] pl-4 print:border-black">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-black text-[#FFE9FF] print:text-black">{exp.role}</h3>
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#00FFFF] print:text-gray-600">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#FF00FF] mb-2 print:text-gray-800">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#FFE9FF] leading-relaxed flex gap-2 print:text-black">
                      <span className="text-[#00FFFF] print:text-black">⚡</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-2 border-[#FF00FF] pt-8 print:border-black">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-[0.3em] mb-4 print:text-black">EDUCATION</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 border-l-2 border-[#FF00FF] pl-3 print:border-black">
                <p className="text-md font-black text-[#FFE9FF] print:text-black">{edu.degree}</p>
                <p className="text-[10px] font-bold text-[#FF00FF] print:text-gray-700">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-[0.3em] mb-4 print:text-black">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-black uppercase tracking-wider text-[#FF00FF] border border-[#00FFFF] px-2 py-0.5 rounded print:text-black print:border-black">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.showProjects && data.projects.length > 0 && (
        <div className="mt-8 border-t-2 border-[#FF00FF] pt-8 print:border-black">
          <h2 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-[0.3em] mb-5 print:text-black">PROJECTS</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="border border-[#FF00FF]/30 p-3 rounded print:border-gray-300">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-black text-[#FFE9FF] print:text-black">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#00FFFF] print:text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#FFE9FF]/80 print:text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t-2 border-[#FF00FF] pt-8 print:border-black">
          <h2 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-[0.3em] mb-5 print:text-black">REFERENCES</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-black text-[#FFE9FF] print:text-black">{ref.name}</p>
                <p className="text-xs text-[#FF00FF] print:text-gray-700">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#00FFFF] print:text-gray-500">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}