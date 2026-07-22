import React from 'react';
import { ResumeData } from '@/app/page';

export default function AcademicJournal({ data }: { data: ResumeData }) {
  return (
    <div className="font-serif p-16 bg-white text-black min-h-[1056px] w-full max-w-[816px] mx-auto shadow-sm">
      <header className="text-center mb-10 pb-6 border-b border-gray-300">
        <h1 className="text-4xl font-bold mb-4">{data.personalInfo.fullName}</h1>
        <p className="text-lg italic mb-4">{data.personalInfo.jobTitle}</p>
        <p className="text-sm text-gray-700">
          {data.personalInfo.email} {data.personalInfo.phone && ` • ${data.personalInfo.phone}`} {data.personalInfo.location && ` • ${data.personalInfo.location}`}
        </p>
      </header>

      {data.summary && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-center mb-4">Abstract</h2>
          <p className="text-sm leading-relaxed text-justify px-8">
            {data.summary}
          </p>
        </section>
      )}

      <div className="columns-2 gap-10 mt-10">
        {data.experience.length > 0 && (
          <section className="mb-8 break-inside-avoid">
            <h2 className="text-base font-bold uppercase border-b border-black pb-1 mb-4" style={{ color: 'var(--theme-color)' }}>I. Professional Appointments</h2>
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <h3 className="font-bold text-sm">{exp.role}</h3>
                  <div className="text-sm italic">{exp.company} ({exp.startDate} - {exp.endDate})</div>
                  <p className="text-sm leading-relaxed mt-2 text-justify whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-8 break-inside-avoid">
            <h2 className="text-base font-bold uppercase border-b border-black pb-1 mb-4" style={{ color: 'var(--theme-color)' }}>II. Education</h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="font-bold text-sm">{edu.degree}</div>
                  <div className="text-sm">{edu.school}, {edu.graduationYear}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="mb-8 break-inside-avoid">
            <h2 className="text-base font-bold uppercase border-b border-black pb-1 mb-4" style={{ color: 'var(--theme-color)' }}>III. Technical Skills</h2>
            <ul className="list-disc list-outside ml-4 space-y-1 text-sm">
              {data.skills.map(skill => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
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