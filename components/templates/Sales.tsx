import React from 'react';
import { ResumeData } from '@/app/page';

export default function Sales({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-gray-900 border-t-[12px] border-[var(--theme-color)]">
      
      <div className="flex justify-between items-end mb-8 border-b-2 border-gray-100 pb-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-gray-900 mb-2 uppercase">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-bold text-[var(--theme-color)] uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-right text-xs font-semibold text-gray-500 space-y-1">
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          {data.personalInfo.website && <p>{data.personalInfo.website}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-8">
          <p className="text-sm font-bold leading-relaxed text-gray-700 bg-gray-50 p-4 border-l-4 border-[var(--theme-color)]">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-black uppercase tracking-wider text-[var(--theme-color)] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--theme-color)] rounded-full"></span> Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-black text-gray-900">{exp.role}</h3>
                  <span className="text-xs font-bold text-white bg-[var(--theme-color)] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm font-bold text-[var(--theme-color)] mb-3">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed text-gray-700 flex gap-3">
                      <span className="text-[var(--theme-color)] font-bold">✓</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 mb-8">
        {data.showProjects && data.projects.length > 0 && (
          <div>
            <h2 className="text-lg font-black uppercase tracking-wider text-[var(--theme-color)] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--theme-color)] rounded-full"></span> Key Initiatives
            </h2>
            <div className="space-y-4">
              {data.projects.map(proj => (
                <div key={proj.id} className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{proj.name}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {data.education.length > 0 && (
          <div className={!data.showProjects ? "col-span-2" : ""}>
            <h2 className="text-lg font-black uppercase tracking-wider text-[var(--theme-color)] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--theme-color)] rounded-full"></span> Education
            </h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline border-b border-gray-100 pb-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                  </div>
                  <p className="text-sm font-bold text-[var(--theme-color)]">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-8 mt-auto">
        {data.showCertifications && data.certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-black uppercase tracking-wider text-[var(--theme-color)] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--theme-color)] rounded-full"></span> Certifications
            </h2>
            <div className="space-y-2">
              {data.certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{cert.name}</p>
                  <p className="text-xs font-bold text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

{data.showReferences && data.references.length > 0 && (
          <div>
            <h2 className="text-lg font-black uppercase tracking-wider text-[var(--theme-color)] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--theme-color)] rounded-full"></span>References</h2>
            <div className="space-y-2">
              {data.references.map(ref => (
                <div key={ref.id} className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{ref.name}</p>
                  <p className="text-xs font-bold text-gray-500">{ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div className={!data.showCertifications ? "col-span-2" : ""}>
            <h2 className="text-lg font-black uppercase tracking-wider text-[var(--theme-color)] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--theme-color)] rounded-full"></span> Core Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-xs font-bold text-emerald-800 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 shadow-sm">{s.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>

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
