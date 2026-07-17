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