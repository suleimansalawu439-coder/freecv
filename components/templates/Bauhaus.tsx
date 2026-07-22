import React from 'react';
import { ResumeData } from '@/app/page';

export default function Bauhaus({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans p-0 bg-[#fdf5e6] text-[#222] min-h-[1056px] w-full max-w-[816px] mx-auto relative overflow-hidden">
      {/* Bauhaus geometric elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[var(--theme-color)] rounded-full mix-blend-multiply opacity-80"></div>
      <div className="absolute top-20 left-24 w-24 h-24 bg-[#e63946] rounded-none mix-blend-multiply opacity-80"></div>
      <div className="absolute top-16 left-32 w-20 h-20 bg-[#457b9d] rounded-full mix-blend-multiply opacity-80"></div>

      <div className="relative z-10 pt-48 px-16 pb-16">
        <header className="mb-16">
          <h1 className="text-8xl font-black tracking-tighter leading-none mb-4 lowercase">{data.personalInfo.fullName}</h1>
          <p className="text-2xl font-bold tracking-widest uppercase border-l-8 border-[var(--theme-color)] pl-4">{data.personalInfo.jobTitle}</p>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-5 space-y-12">
            <section className="bg-black text-white p-8">
              <h2 className="text-lg font-black uppercase mb-4 text-[var(--theme-color)]">Info</h2>
              <div className="space-y-3 text-sm font-bold">
                <div>{data.personalInfo.email}</div>
                <div>{data.personalInfo.phone}</div>
                <div>{data.personalInfo.location}</div>
              </div>
            </section>

            {data.skills.length > 0 && (
              <section className="bg-white p-8 border-4 border-black">
                <h2 className="text-lg font-black uppercase mb-4 text-[#e63946]">Skills</h2>
                <div className="flex flex-col gap-2 font-bold uppercase text-xs">
                  {data.skills.map(skill => (
                    <div key={skill.id} className="border-b-2 border-black pb-1">{skill.name}</div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="col-span-7 space-y-12">
            {data.summary && (
              <section>
                <p className="text-xl font-bold leading-relaxed">{data.summary}</p>
              </section>
            )}

            {data.experience.length > 0 && (
              <section>
                <h2 className="text-3xl font-black uppercase mb-8 border-b-8 border-[#457b9d] inline-block pb-2">Work</h2>
                <div className="space-y-10">
                  {data.experience.map(exp => (
                    <div key={exp.id}>
                      <h3 className="text-2xl font-black uppercase">{exp.role}</h3>
                      <div className="text-lg font-bold text-[var(--theme-color)] mb-2">{exp.company} // {exp.startDate}-{exp.endDate}</div>
                      <p className="text-sm font-medium leading-relaxed whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
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