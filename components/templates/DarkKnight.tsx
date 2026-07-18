import React from 'react';
import { ResumeData } from '@/app/page';

export default function DarkKnight({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans p-0 bg-[#050505] text-gray-300 min-h-[1056px] w-full max-w-[816px] mx-auto overflow-hidden relative print:bg-[#050505] print:text-gray-300">
      {/* Decorative neon accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--theme-color)] blur-[150px] opacity-20 rounded-full mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--theme-color)] blur-[150px] opacity-10 rounded-full mix-blend-screen pointer-events-none translate-y-1/4 -translate-x-1/4"></div>
      
      <div className="p-12 relative z-10 flex flex-col h-full">
        <header className="border-b border-gray-800 pb-8 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-xl text-[var(--theme-color)] font-bold tracking-widest uppercase">{data.personalInfo.jobTitle}</p>
          </div>
          <div className="text-right text-xs font-mono text-gray-500 space-y-1">
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          </div>
        </header>

        {data.summary && (
          <section className="mb-10">
            <p className="text-lg leading-relaxed text-gray-400 font-light border-l-2 border-[var(--theme-color)] pl-6">
              {data.summary}
            </p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2 space-y-10">
            {data.experience.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[var(--theme-color)]"></span> Experience
                </h2>
                <div className="space-y-8">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="group">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-[var(--theme-color)] transition-colors">{exp.role}</h3>
                        <span className="text-xs font-mono text-gray-500">{exp.startDate} — {exp.endDate}</span>
                      </div>
                      <div className="text-sm text-gray-400 mb-3 font-medium">{exp.company}</div>
                      <ul className="list-none space-y-2 text-sm text-gray-400">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-[var(--theme-color)] mt-1 opacity-50">▹</span>
                            <span className="leading-relaxed">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="col-span-1 space-y-10">
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[var(--theme-color)]"></span> Skills
                </h2>
                <div className="flex flex-col gap-2">
                  {data.skills.map(skill => (
                    <div key={skill.id} className="text-sm text-gray-400 border border-gray-800 rounded px-3 py-2 bg-gray-900/50">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {data.education.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[var(--theme-color)]"></span> Edu
                </h2>
                <div className="space-y-4">
                  {data.education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-sm text-white">{edu.degree}</h3>
                      <div className="text-xs text-[var(--theme-color)] mt-1 mb-1">{edu.school}</div>
                      <div className="text-xs text-gray-600 font-mono">{edu.graduationYear}</div>
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
  
</div>
    </div>
  );
}