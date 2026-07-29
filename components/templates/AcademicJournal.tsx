import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function AcademicJournal({ data }: { data: ResumeData }) {
  return (
    <div className="font-serif p-10 sm:p-16 bg-white text-black w-full h-full mx-auto shadow-sm">
      <header className="text-center mb-10 pb-6 border-b border-gray-300">
        <h1 className="text-4xl font-bold mb-4">{data.personalInfo.fullName}</h1>
        <p className="text-lg italic mb-4">{data.personalInfo.jobTitle}</p>
        <p className="text-sm text-gray-700">
          {data.personalInfo.email} {data.personalInfo.phone && ` • ${data.personalInfo.phone}`} {data.personalInfo.location && ` • ${data.personalInfo.location}`}
        </p>
      </header>

      {data.summary && (
        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-center mb-4">Abstract</h2>
          <p className="text-sm leading-relaxed text-justify px-8">
            {data.summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {data.experience.length > 0 && (
            <section className="mb-8">
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
        </div>

        <div>
          {data.education.length > 0 && (
            <section className="mb-8">
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
            <section className="mb-8">
              <h2 className="text-base font-bold uppercase border-b border-black pb-1 mb-4" style={{ color: 'var(--theme-color)' }}>III. Technical Skills</h2>
              <ul className="list-disc list-outside ml-4 space-y-1 text-sm">
                {data.skills.map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </section>
          )}
        
          {data.showReferences && data.references && data.references.length > 0 && (
            <section className="mb-8">
              <h2 className="text-base font-bold uppercase border-b border-black pb-1 mb-4" style={{ color: 'var(--theme-color)' }}>IV. References</h2>
              <div className="space-y-4">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <h3 className="font-bold text-sm">{ref.name}</h3>
                    <div className="text-sm italic mb-1">{ref.title} @ {ref.company}</div>
                    <div className="text-sm">
                      {ref.contact && <span>{ref.contact}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}