import React from 'react';
import { ResumeData } from '@/app/page';

export default function ElegantSerif({ data }: { data: ResumeData }) {
  return (
    <div className="font-serif p-16 bg-[#faf9f6] text-[#2c3e50] min-h-[1056px] w-full max-w-[816px] mx-auto shadow-sm">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-normal tracking-wide mb-3" style={{ color: 'var(--theme-color)' }}>{data.personalInfo.fullName}</h1>
        <p className="text-lg uppercase tracking-[0.2em] text-gray-500 mb-6">{data.personalInfo.jobTitle}</p>
        <div className="flex justify-center items-center gap-4 text-xs font-sans tracking-widest uppercase text-gray-400">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <><span>|</span><span>{data.personalInfo.phone}</span></>}
          {data.personalInfo.location && <><span>|</span><span>{data.personalInfo.location}</span></>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-lg italic leading-relaxed text-gray-600">"{data.summary}"</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-center text-sm font-sans font-bold uppercase tracking-[0.3em] border-y border-gray-300 py-2 mb-8">Professional Experience</h2>
          <div className="space-y-8">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-end mb-1">
                  <h3 className="text-xl font-medium" style={{ color: 'var(--theme-color)' }}>{exp.role}</h3>
                  <span className="text-xs font-sans text-gray-500 uppercase tracking-widest">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-sm font-sans font-bold uppercase tracking-wider mb-3 text-gray-800">{exp.company}</div>
                <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-12">
        {data.education.length > 0 && (
          <section>
            <h2 className="text-center text-sm font-sans font-bold uppercase tracking-[0.3em] border-y border-gray-300 py-2 mb-6">Education</h2>
            <div className="space-y-6">
              {data.education.map(edu => (
                <div key={edu.id} className="text-center">
                  <h3 className="text-base font-medium mb-1" style={{ color: 'var(--theme-color)' }}>{edu.degree}</h3>
                  <div className="text-sm font-sans text-gray-600">{edu.school}</div>
                  <div className="text-xs font-sans text-gray-400 mt-1 uppercase tracking-widest">{edu.graduationYear}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h2 className="text-center text-sm font-sans font-bold uppercase tracking-[0.3em] border-y border-gray-300 py-2 mb-6">Skills</h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-700">
              {data.skills.map(skill => (
                <span key={skill.id}>{skill.name}</span>
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
  
</div>
    </div>
  );
}