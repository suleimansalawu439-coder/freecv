import React from 'react';
import { ResumeData } from '@/app/page';

export default function CyberDark({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#0F0F1A] text-gray-200 font-mono w-[8.5in] min-h-[11in] shadow-[0_0_60px_rgba(0,255,255,0.05)] print:shadow-none p-[0.75in] flex flex-col border border-[#1A1A2E] print:border-none mx-auto print:bg-white print:text-black">
      <div className="border-b border-[#1A1A2E] pb-8 mb-8 print:border-black">
        <h1 className="text-[44px] font-black tracking-tight leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 print:text-black print:bg-none print:bg-transparent">{data.personalInfo.fullName}</h1>
        <p className="text-sm text-cyan-400/70 tracking-wide mt-2 print:text-gray-700">{data.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 mt-3 print:text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>
      
      {data.summary && <p className="text-[13px] leading-relaxed text-gray-400 border-l-2 border-cyan-500/30 pl-5 mb-8 italic print:text-black print:border-black">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em] mb-5 print:text-black">// Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#1A1A2E] pl-4 print:border-black">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-white print:text-black">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400/50 print:text-gray-600">{exp.startDate} → {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400/60 mb-2 print:text-gray-800">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[12px] text-gray-400 leading-relaxed flex gap-2 print:text-black">
                      <span className="text-cyan-400 print:text-black">›</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#1A1A2E] pt-8 print:border-black">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em] mb-4 print:text-black">// Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-sm font-bold text-white print:text-black">{edu.degree}</p>
                <p className="text-[10px] text-gray-500 print:text-gray-700">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em] mb-4 print:text-black">// Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-purple-300/70 border border-[#1A1A2E] px-2 py-0.5 rounded print:border-black print:text-black">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-[#1A1A2E] pt-8 print:border-black">
          <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em] mb-5 print:text-black">// Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="border border-[#1A1A2E] p-3 rounded print:border-gray-300">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-white print:text-black">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-cyan-400/50 print:text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-xs text-gray-400 print:text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t border-[#1A1A2E] pt-8 print:border-black">
          <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em] mb-5 print:text-black">// References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold text-white print:text-black">{ref.name}</p>
                <p className="text-xs text-purple-400/60 print:text-gray-700">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-cyan-400/50 print:text-gray-500">{ref.contact}</p>
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