import React from 'react';
import { ResumeData } from '@/app/page';

export default function TechPro({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[0.75in] flex flex-col font-mono mx-auto lg:mx-0 shrink-0 text-gray-900">
      
      <div className="border-b-2 border-gray-900 pb-6 mb-6">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{'< '}{data.personalInfo.fullName}{' />'}</h1>
        <p className="text-sm font-semibold text-gray-600 mb-4">{data.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {data.personalInfo.email && <span>{'>'} email: {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{'>'} tel: {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{'>'} loc: {data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{'>'} web: {data.personalInfo.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6 bg-gray-50 p-4 border-l-4 border-gray-900">
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold bg-gray-900 text-white inline-block px-2 py-1 mb-4">{'[ EXPERIENCE ]'}</h2>
          <div className="space-y-5">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-900">{exp.role} @ {exp.company}</h3>
                  <span className="text-xs font-semibold text-gray-500 shrink-0 ml-4">[{exp.startDate} .. {exp.endDate}]</span>
                </div>
                <ul className="space-y-1 mt-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm text-gray-700 leading-relaxed flex gap-2">
                      <span className="text-gray-400">$</span>
                      <span className="flex-1">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold bg-gray-900 text-white inline-block px-2 py-1 mb-4">{'[ PROJECTS ]'}</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  {proj.name} {proj.link && <span className="text-xs text-[var(--theme-color)] ml-2">[{proj.link}]</span>}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">&gt; {proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 mt-auto border-t-2 border-gray-200 pt-6">
        <div>
          {data.education.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-bold bg-gray-900 text-white inline-block px-2 py-1 mb-3">{'[ EDUCATION ]'}</h2>
              <div className="space-y-3">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-xs text-gray-600 mt-1">{edu.school} [{edu.graduationYear}]</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold bg-gray-900 text-white inline-block px-2 py-1 mb-3">{'[ CERTIFICATIONS ]'}</h2>
              <div className="space-y-2">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.issuer} // {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-lg font-bold bg-gray-900 text-white inline-block px-2 py-1 mb-3">REFERENCES</h2>
              <div className="space-y-2">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                    <p className="text-xs text-gray-600">{ref.title} at {ref.company} // {ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold bg-gray-900 text-white inline-block px-2 py-1 mb-3">{'[ SKILLS ]'}</h2>
              <div className="flex flex-wrap gap-2 text-sm">
                {data.skills.map(s => (
                  <span key={s.id} className="bg-gray-100 px-2 py-0.5 border border-gray-300">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
