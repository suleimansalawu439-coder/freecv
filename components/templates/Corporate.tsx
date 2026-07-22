import React from 'react';
import { ResumeData } from '@/app/page';

export default function Corporate({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-[#333333]">
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-1 text-[#000000]">{data.personalInfo.fullName}</h1>
        <div className="w-12 h-[3px] bg-[#003366] mx-auto mb-3" />
        <p className="text-sm font-semibold uppercase tracking-widest text-[#555555] mb-4">{data.personalInfo.jobTitle}</p>
        <p className="text-xs font-sans text-[#666666] flex justify-center flex-wrap gap-x-3">
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.email && <span>• {data.personalInfo.email}</span>}
          {data.personalInfo.website && <span>• {data.personalInfo.website}</span>}
        </p>
      </div>

      {data.summary && (
        <div className="mb-6">
          <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#003366] border-b-2 border-[#003366] pb-1 mb-4">Professional Experience</h2>
          <div className="space-y-5">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-black">{exp.company}</h3>
                  <span className="text-xs font-sans font-semibold text-[#555555]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-sm font-semibold text-[#444444] mb-2 italic">{exp.role}</p>
                <ul className="space-y-1 pl-4 list-disc marker:text-[#003366]">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed text-[#333333]">
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
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#003366] border-b-2 border-[#003366] pb-1 mb-4">Key Projects</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold text-black">{proj.name}</h3>
                  {proj.link && <span className="text-[10px] font-sans text-[var(--theme-color)]">({proj.link})</span>}
                </div>
                <p className="text-sm leading-relaxed text-[#333333] text-justify">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 mt-auto">
        <div>
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#003366] border-b-2 border-[#003366] pb-1 mb-4">Education</h2>
              <div className="space-y-3">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-bold text-black">{edu.school}</p>
                      <p className="text-xs font-sans font-semibold text-[#555555]">{edu.graduationYear}</p>
                    </div>
                    <p className="text-sm text-[#444444] italic mt-0.5">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          {data.showCertifications && data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#003366] border-b-2 border-[#003366] pb-1 mb-4">Certifications</h2>
              <div className="space-y-2">
                {data.certifications.map(cert => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-black">{cert.name}</p>
                    <p className="text-xs font-sans text-[#555555]">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#003366] border-b-2 border-[#003366] pb-1 mb-4">References</h2>
              <div className="space-y-2">
                {data.references.map(ref => (
                  <div key={ref.id} className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-black">{ref.name}</p>
                    <p className="text-xs font-sans text-[#555555]">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#003366] border-b-2 border-[#003366] pb-1 mb-4">Core Competencies</h2>
              <p className="text-sm leading-relaxed text-[#333333]">
                {data.skills.map(s => s.name).join(', ')}
              </p>
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
