import React from 'react';
import { ResumeData } from '@/app/page';

export default function TypographyFirst({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-black">
      
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-normal tracking-tight mb-4 italic">{data.personalInfo.fullName}</h1>
        <p className="text-sm font-bold uppercase tracking-[0.2em] mb-6">{data.personalInfo.jobTitle}</p>
        <p className="text-xs font-sans text-gray-600 flex justify-center gap-6 flex-wrap">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </p>
      </div>

      {data.summary && (
        <div className="mb-12 border-y py-6 border-black">
          <p className="text-lg leading-relaxed text-center font-serif">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-normal italic mb-6">Experience.</h2>
          <div className="space-y-8">
            {data.experience.map(exp => (
              <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest">{exp.company}</p>
                  <p className="text-xs font-sans text-gray-500 mt-2">{exp.startDate} - {exp.endDate}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">{exp.role}</h3>
                  <ul className="space-y-2">
                    {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed font-sans text-gray-800">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-normal italic mb-6">Projects.</h2>
          <div className="space-y-6">
            {data.projects.map(proj => (
              <div key={proj.id} className="grid grid-cols-[1fr_3fr] gap-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest">{proj.name}</h3>
                  {proj.link && <p className="text-xs font-sans text-gray-500 mt-2">{proj.link}</p>}
                </div>
                <p className="text-sm leading-relaxed font-sans text-gray-800">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-[1fr_3fr] gap-6 mt-auto">
        <h2 className="text-2xl font-normal italic">Details.</h2>
        <div className="grid grid-cols-2 gap-8">
          {data.education.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Education</h3>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-base font-bold">{edu.degree}</p>
                    <p className="text-sm italic mt-1">{edu.school}</p>
                    <p className="text-xs font-sans text-gray-500 mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            {data.showCertifications && data.certifications.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Certifications</h3>
                <div className="space-y-3">
                  {data.certifications.map(cert => (
                    <div key={cert.id}>
                      <p className="text-sm font-bold">{cert.name}</p>
                      <p className="text-xs font-sans text-gray-500 mt-1">{cert.issuer} ({cert.date})</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

{data.showReferences && data.references.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">References</h3>
                <div className="space-y-3">
                  {data.references.map(ref => (
                    <div key={ref.id}>
                      <p className="text-sm font-bold">{ref.name}</p>
                      <p className="text-xs font-sans text-gray-500 mt-1">{ref.title} at {ref.company} ({ref.contact})</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {data.skills.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Skills</h3>
                <p className="text-sm font-sans leading-relaxed text-gray-800">
                  {data.skills.map(s => s.name).join(' • ')}
                </p>
              </div>
            )}
          </div>
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
