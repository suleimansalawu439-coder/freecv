import React from 'react';
import { ResumeData } from '@/app/page';

export default function Magazine({ data }: { data: ResumeData }) {
  return (
    <div className="font-serif p-12 bg-[#fdfbf7] text-gray-900 min-h-[1056px] w-full max-w-[816px] mx-auto shadow-sm">
      <header className="border-y-4 border-black py-8 mb-10 text-center relative">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden opacity-5">
          <span className="text-[200px] font-black tracking-tighter leading-none">{data.personalInfo.fullName?.charAt(0)}</span>
        </div>
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 relative z-10">{data.personalInfo.fullName}</h1>
        <div className="flex justify-center items-center gap-4 text-sm font-sans uppercase tracking-widest font-bold">
          <span>{data.personalInfo.jobTitle}</span>
          <span className="w-2 h-2 bg-[var(--theme-color)] rounded-full"></span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      {data.summary && (
        <section className="mb-12 column-count-1">
          <p className="text-xl leading-relaxed text-gray-800 text-justify">
            <span className="float-left text-7xl font-black text-[var(--theme-color)] leading-[0.8] pr-2 pt-2">
              {data.summary.charAt(0)}
            </span>
            {data.summary.slice(1)}
          </p>
        </section>
      )}

      <div className="columns-2 gap-12">
        {data.experience.length > 0 && (
          <section className="break-inside-avoid mb-10">
            <h2 className="text-2xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-tight">Professional <br/> Experience</h2>
            <div className="space-y-8">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <h3 className="text-lg font-black leading-tight mb-1">{exp.role}</h3>
                  <div className="text-sm font-sans font-bold text-[var(--theme-color)] uppercase tracking-wider mb-2">
                    {exp.company} | {exp.startDate}–{exp.endDate}
                  </div>
                  <p className="text-sm leading-relaxed text-justify">
                    {exp.description.replace(/\n/g, ' ')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="break-inside-avoid mb-10">
            <h2 className="text-2xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-tight">Academic <br/> Background</h2>
            <div className="space-y-6">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <h3 className="text-base font-black leading-tight mb-1">{edu.degree}</h3>
                  <div className="text-sm font-sans text-gray-600 mb-1">{edu.school}</div>
                  <div className="text-xs font-sans font-bold text-[var(--theme-color)] uppercase tracking-widest">{edu.graduationYear}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="break-inside-avoid mb-10">
            <h2 className="text-2xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-tight">Core <br/> Competencies</h2>
            <div className="flex flex-wrap gap-2 font-sans">
              {data.skills.map(skill => (
                <span key={skill.id} className="text-xs font-bold uppercase tracking-wider bg-black text-white px-3 py-1.5 rounded-full">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer className="border-t border-gray-300 mt-12 pt-6 flex justify-between font-sans text-xs uppercase tracking-widest text-gray-500 font-bold">
        <span>{data.personalInfo.email}</span>
        <span>{data.personalInfo.phone}</span>
        <span>{data.personalInfo.website}</span>
      </footer>
    
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