import React from 'react';
import { ResumeData } from '@/app/page';

export default function Monochrome({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-mono mx-auto lg:mx-0 shrink-0 text-black border-4 border-black">
      
      <div className="text-center mb-10">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">{data.personalInfo.fullName}</h1>
        <p className="text-sm font-bold uppercase tracking-widest bg-black text-white inline-block px-4 py-1 mb-6">{data.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase border-y-2 border-black py-2">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-black uppercase tracking-widest mb-2 border-b-2 border-black pb-1">Profile</h2>
          <p className="text-sm leading-relaxed font-medium">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-b-2 border-black pb-1">Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold uppercase">{exp.role}</h3>
                  <span className="text-xs font-bold shrink-0 ml-4 bg-gray-100 px-2 py-0.5">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-sm font-bold mb-2 underline">{exp.company}</p>
                <ul className="space-y-1 pl-4 list-[square]">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed">
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
          <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-b-2 border-black pb-1">Projects</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold uppercase">{proj.name}</h3>
                  {proj.link && <span className="text-[10px] text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 mt-auto pt-6 border-t-2 border-black">
        <div>
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest mb-3 border-b-2 border-black pb-1">Education</h2>
              <div className="space-y-3">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold uppercase">{edu.degree}</p>
                    <p className="text-xs mt-1">{edu.school}</p>
                    <p className="text-xs font-bold mt-1 bg-gray-100 inline-block px-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest mb-3 border-b-2 border-black pb-1">Certifications</h2>
              <div className="space-y-2">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold uppercase">{cert.name}</p>
                    <p className="text-xs">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest mb-3 border-b-2 border-black pb-1">References</h2>
              <div className="space-y-2">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold uppercase">{ref.name}</p>
                    <p className="text-xs">{ref.title} at {ref.company} • {ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest mb-3 border-b-2 border-black pb-1">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(s => (
                  <span key={s.id} className="text-xs font-bold uppercase border border-black px-2 py-1">{s.name}</span>
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
