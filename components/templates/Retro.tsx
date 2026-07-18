import React from 'react';
import { ResumeData } from '@/app/page';

export default function Retro({ data }: { data: ResumeData }) {
  return (
    <div className="font-mono p-12 bg-[#ffe4c4] text-[#8b4513] min-h-[1056px] w-full max-w-[816px] mx-auto shadow-[inset_0_0_100px_rgba(139,69,19,0.1)] border-8 border-double border-[#8b4513]">
      <header className="text-center border-b-4 border-dashed border-[#8b4513] pb-8 mb-8 relative">
        <h1 className="text-5xl font-black uppercase tracking-widest mb-2" style={{ textShadow: '2px 2px 0 var(--theme-color)' }}>{data.personalInfo.fullName}</h1>
        <p className="text-xl font-bold uppercase tracking-[0.3em] bg-[#8b4513] text-[#ffe4c4] inline-block px-4 py-1">{data.personalInfo.jobTitle}</p>
      </header>
      <div className="space-y-8">
        {data.summary && (
          <section className="bg-[#fdf5e6] p-6 border-2 border-[#8b4513] shadow-[4px_4px_0_var(--theme-color)]">
            <p className="text-sm font-bold leading-loose uppercase">{data.summary}</p>
          </section>
        )}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-8">
            {data.experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2"><span className="text-[var(--theme-color)]">★</span> EXPERIENCE</h2>
                <div className="space-y-6">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="border-l-4 border-[var(--theme-color)] pl-4">
                      <h3 className="font-bold uppercase text-lg">{exp.role}</h3>
                      <div className="text-sm font-bold uppercase mb-2 bg-[var(--theme-color)] text-white inline-block px-2">{exp.company}</div>
                      <div className="text-xs font-bold uppercase mb-2">{exp.startDate} TO {exp.endDate}</div>
                      <ul className="list-disc list-outside ml-4 space-y-1 text-xs uppercase font-bold">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="space-y-8">
            {data.education.length > 0 && (
              <section>
                <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2"><span className="text-[var(--theme-color)]">★</span> EDUCATION</h2>
                <div className="space-y-4">
                  {data.education.map(edu => (
                    <div key={edu.id} className="border-b-2 border-dotted border-[#8b4513] pb-2">
                      <h3 className="font-bold uppercase">{edu.degree}</h3>
                      <div className="text-sm uppercase">{edu.school} // {edu.graduationYear}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2"><span className="text-[var(--theme-color)]">★</span> SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map(skill => (
                    <span key={skill.id} className="border-2 border-[#8b4513] px-2 py-1 text-xs font-bold uppercase bg-[var(--theme-color)] text-white shadow-[2px_2px_0_#8b4513]">
                      {skill.name}
                    </span>
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