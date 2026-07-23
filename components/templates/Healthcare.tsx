import React from 'react';
import { ResumeData } from '@/app/page';

export default function Healthcare({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-[#f8fafc] shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-slate-800">
      
      <div className="text-center mb-8 pb-6 border-b border-slate-300">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">{data.personalInfo.fullName}</h1>
        <p className="text-base font-semibold text-sky-700 uppercase tracking-widest mb-4">{data.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-sky-800 mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-sky-800 mb-4 border-b border-sky-100 pb-2">Clinical / Professional Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-semibold text-slate-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm font-semibold text-sky-700 mb-2">{exp.company}</p>
                <ul className="space-y-1.5 pl-4 list-disc marker:text-sky-400">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed text-slate-700">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-sky-800 mb-4 border-b border-sky-100 pb-2">Research & Projects</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="text-base font-bold text-slate-900 inline mr-2">{proj.name}:</h3>
                <span className="text-sm text-slate-700 leading-relaxed">{proj.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-10 mt-auto">
        <div>
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-sky-800 mb-4 border-b border-sky-100 pb-2">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-sm text-slate-600 mt-1">{edu.school}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {data.showCertifications && data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-sky-800 mb-4 border-b border-sky-100 pb-2">Licenses & Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{cert.name}</p>
                      <p className="text-xs text-slate-600">{cert.issuer}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-500">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-sky-800 mb-4 border-b border-sky-100 pb-2">References</h2>
              <div className="space-y-3">
                {data.references.map(ref => (
                  <div key={ref.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{ref.name}</p>
                      <p className="text-xs text-slate-600">{ref.title} at {ref.company}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-500">{ref.contact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-sky-800 mb-4 border-b border-sky-100 pb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(s => (
                  <span key={s.id} className="text-xs font-semibold bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
