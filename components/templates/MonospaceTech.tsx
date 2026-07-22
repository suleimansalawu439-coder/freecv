import React from 'react';
import { ResumeData } from '@/app/page';

export default function MonospaceTech({ data }: { data: ResumeData }) {
  return (
    <div className="font-mono p-12 bg-white text-gray-900 min-h-[1056px] w-full max-w-[816px] mx-auto border-[12px] border-gray-100">
      <header className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-tight">{data.personalInfo.fullName}</h1>
          <p className="text-sm bg-black text-white inline-block px-2 py-1 mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-right text-xs space-y-1">
          <div>{data.personalInfo.email}</div>
          <div>{data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
        </div>
      </header>

      {data.summary && (
        <section className="mb-8">
          <div className="text-xs font-bold bg-gray-200 inline-block px-2 py-1 mb-2">{'<SUMMARY>'}</div>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-8">
          <div className="text-xs font-bold bg-gray-200 inline-block px-2 py-1 mb-4">{'<EXPERIENCE>'}</div>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="grid grid-cols-4 gap-4 border-l-2 border-[var(--theme-color)] pl-4">
                <div className="col-span-1 text-xs text-gray-500">{exp.startDate} - {exp.endDate}</div>
                <div className="col-span-3">
                  <h3 className="font-bold text-base">{exp.role} <span className="text-[var(--theme-color)]">@ {exp.company}</span></h3>
                  <ul className="list-square list-inside mt-2 space-y-1 text-sm text-gray-700">
                    {exp.description.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8 border-t-2 border-black pt-6">
        {data.skills.length > 0 && (
          <section>
            <div className="text-xs font-bold bg-gray-200 inline-block px-2 py-1 mb-4">{'<SKILLS>'}</div>
            <div className="flex flex-wrap gap-2 text-xs">
              {data.skills.map(skill => (
                <span key={skill.id} className="border border-gray-300 px-2 py-1">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <div className="text-xs font-bold bg-gray-200 inline-block px-2 py-1 mb-4">{'<EDUCATION>'}</div>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="font-bold text-sm">{edu.degree}</div>
                  <div className="text-xs">{edu.school}</div>
                  <div className="text-xs text-gray-500 mt-1">{edu.graduationYear}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      
        {data.showReferences && data.references && data.references.length > 0 && (
          <section className="mt-8 break-inside-avoid">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 opacity-80" style={{ color: 'var(--theme-color)' }}>References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.references.map(ref => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <h3 className="font-bold text-lg">{ref.name}</h3>
                  <div className="text-sm opacity-80 font-medium mb-1">{ref.title} @ {ref.company}</div>
                  <div className="text-sm opacity-70 flex flex-col gap-1">
                    {ref.contact && <span>{ref.contact}</span>}
                    
                  </div>
                </div>
              ))}
            </div>
          </section>
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