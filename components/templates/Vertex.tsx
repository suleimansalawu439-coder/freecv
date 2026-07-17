import React from 'react';
import { ResumeData } from '@/app/page';

export default function Vertex({ data }: { data: ResumeData }) {
  return (
    <div className="font-mono p-8 sm:p-10 text-zinc-900 bg-white min-h-[1056px] w-full max-w-[816px] mx-auto shadow-sm">

      <header className="bg-gray-50 p-8 rounded-2xl mb-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-lg text-[var(--theme-color)] font-semibold mb-6 uppercase tracking-wider">{data.personalInfo.jobTitle || 'Your Profession'}</p>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-zinc-900 opacity-80">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>| {data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>| {data.personalInfo.website}</span>}
        </div>
      </header>
  

      <div className="space-y-8">
        {data.summary && (
          <section>
            <h2 className="text-sm font-black text-white bg-[var(--theme-color)] px-4 py-2 uppercase tracking-widest inline-block mb-6 rounded-r-lg -ml-8">Profile</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h2 className="text-sm font-black text-white bg-[var(--theme-color)] px-4 py-2 uppercase tracking-widest inline-block mb-6 rounded-r-lg -ml-8">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base text-zinc-900">{exp.role}</h3>
                    <span className="text-xs font-bold text-[var(--theme-color)] uppercase tracking-wider">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-500 mb-2">{exp.company}</div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700">
                    {exp.description.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} className="pl-1">{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-black text-white bg-[var(--theme-color)] px-4 py-2 uppercase tracking-widest inline-block mb-6 rounded-r-lg -ml-8">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-sm text-zinc-900">{edu.degree}</h3>
                    <div className="text-sm text-gray-600">{edu.school}</div>
                    <div className="text-xs text-gray-400 mt-1">{edu.graduationYear}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-black text-white bg-[var(--theme-color)] px-4 py-2 uppercase tracking-widest inline-block mb-6 rounded-r-lg -ml-8">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-xs font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.showProjects && data.projects.length > 0 && (
          <section>
            <h2 className="text-sm font-black text-white bg-[var(--theme-color)] px-4 py-2 uppercase tracking-widest inline-block mb-6 rounded-r-lg -ml-8">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 bg-opacity-30">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-sm">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-[var(--theme-color)] truncate ml-2">{proj.link}</span>}
                  </div>
                  <p className="text-xs text-gray-600">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-black text-white bg-[var(--theme-color)] px-4 py-2 uppercase tracking-widest inline-block mb-6 rounded-r-lg -ml-8">Certifications</h2>
            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900">{cert.name}</h3>
                    <div className="text-xs text-gray-500">{cert.issuer}</div>
                  </div>
                  <div className="text-xs font-medium text-[var(--theme-color)] bg-white px-2 py-1 rounded border border-gray-200">
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references.length > 0 && (
          <section>
            <h2 className="text-sm font-black text-white bg-[var(--theme-color)] px-4 py-2 uppercase tracking-widest inline-block mb-6 rounded-r-lg -ml-8">References</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <div className="font-bold text-sm">{ref.name}</div>
                  <div className="text-xs text-gray-600">{ref.title} at {ref.company}</div>
                  <div className="text-xs text-[var(--theme-color)] mt-1">{ref.contact}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
