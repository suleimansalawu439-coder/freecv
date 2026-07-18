import React from 'react';
import { ResumeData } from '@/app/page';

export default function SwissMinimal({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-900 font-sans w-[8.5in] min-h-[11in] shadow-lg print:shadow-none p-[0.75in] flex flex-col mx-auto print:border-none border border-gray-200">
      <div className="border-b border-gray-200 pb-8 mb-8">
        <h1 className="text-[42px] font-black tracking-tight leading-[0.9] uppercase">{data.personalInfo.fullName}</h1>
        <p className="text-sm font-medium text-gray-400 tracking-wide mt-2">{data.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 mt-3">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>
      
      {data.summary && <p className="text-[13px] leading-relaxed text-gray-600 border-l-2 border-gray-200 pl-5 mb-8">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-5">Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[12px] text-gray-600 leading-relaxed flex gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 shrink-0" />{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-gray-200 pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-4">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-sm font-bold">{edu.degree}</p>
                <p className="text-[10px] text-gray-400">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{s.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-5">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="border border-gray-200 p-3 rounded">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-gray-400">{proj.link}</span>}
                </div>
                <p className="text-xs text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-5">References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-gray-500">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-gray-400">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}