import React from 'react';
import { ResumeData } from '@/app/page';

export default function BrutalistDark({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans p-10 bg-black text-white min-h-[1056px] w-full max-w-[816px] mx-auto border-8 border-white print:bg-black print:text-white print:border-black print:p-0">
      <div className="print:p-10 print:bg-black h-full">
        <header className="border-b-8 border-white pb-6 mb-10">
          <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-4 break-words" style={{ color: 'var(--theme-color)' }}>{data.personalInfo.fullName}</h1>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-black uppercase bg-white text-black inline-block px-4 py-2">{data.personalInfo.jobTitle}</p>
            <div className="text-right text-sm font-bold uppercase space-y-1">
              <div>{data.personalInfo.email}</div>
              <div>{data.personalInfo.phone}</div>
              <div>{data.personalInfo.location}</div>
            </div>
          </div>
        </header>

        {data.summary && (
          <section className="mb-10 bg-[var(--theme-color)] text-black p-6 border-4 border-white transform rotate-1">
            <p className="text-xl font-bold uppercase leading-tight">{data.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 gap-10">
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-4xl font-black uppercase border-b-4 border-white pb-2 mb-6">Experience</h2>
              <div className="space-y-8">
                {data.experience.map(exp => (
                  <div key={exp.id} className="border-4 border-white p-6 relative">
                    <div className="absolute -top-4 -right-4 bg-[var(--theme-color)] text-black font-black px-4 py-2 text-xl border-4 border-white transform rotate-3">
                      {exp.startDate} - {exp.endDate}
                    </div>
                    <h3 className="text-3xl font-black uppercase mb-2 leading-none">{exp.role}</h3>
                    <div className="text-xl font-bold uppercase mb-4 text-gray-400">{exp.company}</div>
                    <ul className="list-square list-inside space-y-2 text-lg font-medium">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-10">
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-3xl font-black uppercase border-b-4 border-white pb-2 mb-6">Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {data.skills.map(skill => (
                    <span key={skill.id} className="bg-white text-black font-black uppercase text-sm px-3 py-2 border-2 border-transparent hover:border-[var(--theme-color)] transition-all">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section>
                <h2 className="text-3xl font-black uppercase border-b-4 border-white pb-2 mb-6">Edu</h2>
                <div className="space-y-6">
                  {data.education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="font-black text-xl uppercase leading-none mb-1 text-[var(--theme-color)]">{edu.degree}</h3>
                      <div className="text-lg font-bold uppercase">{edu.school}</div>
                      <div className="text-sm font-bold text-gray-500 mt-1">{edu.graduationYear}</div>
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
                  <div className="text-sm opacity-80 font-medium mb-1">{ref.position} @ {ref.company}</div>
                  <div className="text-sm opacity-70 flex flex-col gap-1">
                    {ref.email && <span>E: {ref.email}</span>}
                    {ref.phone && <span>P: {ref.phone}</span>}
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