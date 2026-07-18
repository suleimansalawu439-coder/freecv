import React from 'react';
import { ResumeData } from '@/app/page';

export default function Cyberpunk({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans p-10 bg-[#fce016] text-black min-h-[1056px] w-full max-w-[816px] mx-auto relative overflow-hidden print:bg-[#fce016]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-black rotate-45 translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--theme-color)] rotate-45 -translate-x-16 translate-y-16"></div>
      
      <header className="mb-12 relative z-10">
        <h1 className="text-7xl font-black uppercase tracking-tighter mix-blend-difference text-[#fce016]">{data.personalInfo.fullName}</h1>
        <div className="bg-black text-[#fce016] inline-block px-4 py-2 mt-2 font-black uppercase tracking-widest transform -skew-x-12">
          {data.personalInfo.jobTitle}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-x-12 gap-y-10 relative z-10">
        {data.summary && (
          <div className="col-span-2 bg-black p-6 text-[#fce016] border-l-8 border-[var(--theme-color)] transform skew-x-3">
            <p className="text-sm font-bold leading-relaxed uppercase transform -skew-x-3">{data.summary}</p>
          </div>
        )}

        <div className="space-y-10">
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-black uppercase bg-black text-white px-3 py-1 inline-block mb-6 transform skew-x-6">SYS.EXP_</h2>
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id} className="border-2 border-black p-4 relative bg-white/50">
                    <div className="absolute -top-3 -right-3 bg-[var(--theme-color)] text-black text-xs font-black px-2 py-1">{exp.startDate}-{exp.endDate}</div>
                    <h3 className="font-black text-lg uppercase">{exp.role}</h3>
                    <div className="text-sm font-bold uppercase mb-2 text-gray-700">@ {exp.company}</div>
                    <ul className="space-y-1 text-sm font-medium">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[var(--theme-color)] font-black">{'>'}</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-black uppercase bg-black text-white px-3 py-1 inline-block mb-6 transform skew-x-6">SYS.INFO_</h2>
            <div className="space-y-2 font-mono font-bold text-sm bg-black text-[#fce016] p-4">
              {data.personalInfo.email && <div>E: {data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>T: {data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div>L: {data.personalInfo.location}</div>}
            </div>
          </section>

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-black uppercase bg-black text-white px-3 py-1 inline-block mb-6 transform skew-x-6">SYS.SKILLS_</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <span key={skill.id} className="bg-black text-white font-bold uppercase text-xs px-2 py-1 transform -skew-x-12">
                    {skill.name}
                  </span>
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
  
</div>
    </div>
  );
}