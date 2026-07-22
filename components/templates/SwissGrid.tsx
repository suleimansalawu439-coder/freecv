import React from 'react';
import { ResumeData } from '@/app/page';

export default function SwissGrid({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans p-16 bg-[#f4f4f4] text-[#1a1a1a] min-h-[1056px] w-full max-w-[816px] mx-auto border-t-[20px] border-[var(--theme-color)]">
      <div className="grid grid-cols-12 gap-6 h-full">
        <header className="col-span-12 mb-12">
          <h1 className="text-7xl font-bold tracking-tighter leading-none mb-2">{data.personalInfo.fullName}</h1>
          <p className="text-2xl font-medium text-gray-500">{data.personalInfo.jobTitle}</p>
        </header>

        <div className="col-span-4 space-y-12 pr-6">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-color)] mb-4 border-b-2 border-black pb-1">Contact</h2>
            <ul className="space-y-2 text-sm font-medium">
              <li>{data.personalInfo.email}</li>
              <li>{data.personalInfo.phone}</li>
              <li>{data.personalInfo.location}</li>
            </ul>
          </section>

          {data.education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-color)] mb-4 border-b-2 border-black pb-1">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold text-sm">{edu.degree}</div>
                    <div className="text-sm text-gray-600">{edu.school}</div>
                    <div className="text-xs text-gray-400 font-bold mt-1">{edu.graduationYear}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-color)] mb-4 border-b-2 border-black pb-1">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <span key={skill.id} className="text-xs font-bold bg-white border border-gray-300 px-2 py-1">{skill.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-8 space-y-12">
          {data.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-color)] mb-4 border-b-2 border-black pb-1">Profile</h2>
              <p className="text-lg leading-relaxed font-medium">{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-color)] mb-4 border-b-2 border-black pb-1">Experience</h2>
              <div className="space-y-8">
                {data.experience.map(exp => (
                  <div key={exp.id} className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 text-xs font-bold text-gray-500 pt-1">{exp.startDate}<br/>{exp.endDate}</div>
                    <div className="col-span-3">
                      <h3 className="font-bold text-xl leading-tight mb-1">{exp.role}</h3>
                      <div className="text-sm font-medium text-gray-500 mb-3">{exp.company}</div>
                      <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      
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