import React from 'react';
import { ResumeData } from '@/app/page';

export default function Timeline({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-slate-800">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">{data.personalInfo.fullName}</h1>
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--theme-color)] mb-4">{data.personalInfo.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-sm leading-relaxed text-slate-600">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 text-center mb-8">Professional Journey</h2>
          <div className="relative border-l-2 border-gray-100 ml-3 md:ml-[150px]">
            {data.experience.map((exp, idx) => (
              <div key={exp.id} className="mb-8 pl-8 relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-4 border-[var(--theme-color)] rounded-full"></div>
                
                {/* Date for desktop, placed absolutely to the left */}
                <div className="hidden md:block absolute -left-[160px] top-1 text-right w-[130px]">
                  <span className="text-xs font-bold text-[var(--theme-color)]">{exp.startDate} - {exp.endDate}</span>
                </div>

                {/* Mobile Date */}
                <div className="md:hidden mb-1">
                  <span className="text-xs font-bold text-[var(--theme-color)]">{exp.startDate} - {exp.endDate}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                <p className="text-sm font-semibold text-slate-500 mb-3">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed text-slate-600 list-disc ml-4">
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
        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 text-center mb-8">Projects</h2>
          <div className="grid grid-cols-2 gap-6 pl-3 md:pl-[150px]">
            {data.projects.map(proj => (
              <div key={proj.id} className="bg-slate-50 p-5 rounded-xl">
                <h3 className="text-sm font-bold text-slate-900 mb-1">{proj.name}</h3>
                {proj.link && <p className="text-[10px] text-[var(--theme-color)] mb-2">{proj.link}</p>}
                <p className="text-sm leading-relaxed text-slate-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-8 pl-3 md:pl-[150px] mt-auto">
        {data.education.length > 0 && (
          <div className="flex-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">Education</h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <p className="text-sm font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-xs font-medium text-slate-500 mt-1">{edu.school}</p>
                  <p className="text-[10px] font-bold text-[var(--theme-color)] mt-1">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <div className="flex-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">Certifications</h2>
            <div className="space-y-4">
              {data.certifications.map(cert => (
                <div key={cert.id}>
                  <p className="text-sm font-bold text-slate-900">{cert.name}</p>
                  <p className="text-xs font-medium text-slate-500 mt-1">{cert.issuer}</p>
                  <p className="text-[10px] font-bold text-[var(--theme-color)] mt-1">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

{data.showReferences && data.references.length > 0 && (
          <div className="flex-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">References</h2>
            <div className="space-y-4">
              {data.references.map(ref => (
                <div key={ref.id}>
                  <p className="text-sm font-bold text-slate-900">{ref.name}</p>
                  <p className="text-xs font-medium text-slate-500 mt-1">{ref.title} at {ref.company}</p>
                  <p className="text-[10px] font-bold text-[var(--theme-color)] mt-1">{ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="flex-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">{s.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
