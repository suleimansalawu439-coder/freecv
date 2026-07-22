import React from 'react';
import { ResumeData } from '@/app/page';

export default function MinimalistSerif({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1.2in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-gray-800">
      
      <div className="mb-12">
        <h1 className="text-4xl tracking-tight mb-2 text-black">{data.personalInfo.fullName}</h1>
        <p className="text-sm italic text-gray-500 mb-6">{data.personalInfo.jobTitle}</p>
        <div className="flex gap-x-6 gap-y-2 flex-wrap text-xs text-gray-400">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-10">
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 font-sans">Experience</h2>
          <div className="space-y-8">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base text-black">{exp.role}</h3>
                  <span className="text-xs italic text-gray-400 shrink-0 ml-4">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3 font-medium">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed text-gray-600 pl-4 relative">
                      <span className="absolute left-0 top-0 text-gray-300">-</span>
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
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 font-sans">Selected Projects</h2>
          <div className="space-y-6">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="text-sm text-black mb-1 font-bold">{proj.name} {proj.link && <span className="font-normal italic text-gray-400 ml-2">({proj.link})</span>}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-12 mt-auto">
        <div>
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 font-sans">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm text-black">{edu.degree}</p>
                    <p className="text-xs text-gray-500 italic mt-1">{edu.school}, {edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 font-sans">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-sm text-black">{cert.name}</p>
                    <p className="text-xs text-gray-500 italic mt-1">{cert.issuer}, {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 font-sans">References</h2>
              <div className="space-y-3">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-sm text-black">{ref.name}</p>
                    <p className="text-xs text-gray-500 italic mt-1">{ref.title} at {ref.company}, {ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div>
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 font-sans">Skills</h2>
              <div className="flex flex-col gap-1.5 text-sm text-gray-700">
                {data.skills.map(s => (
                  <span key={s.id}>{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
