import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Elegant({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1.2in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-gray-800 tracking-wide">
      
      <div className="text-center mb-8 border-y border-gray-300 py-6">
        <h1 className="text-3xl font-light tracking-[0.2em] mb-3 uppercase text-black">{data.personalInfo.fullName}</h1>
        <p className="text-sm tracking-[0.1em] text-gray-500 uppercase">{data.personalInfo.jobTitle}</p>
      </div>
      
      <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs font-sans tracking-wider text-gray-400 mb-10">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
      </div>

      {data.summary && (
        <div className="mb-10">
          <p className="text-sm leading-loose text-gray-600 text-center italic px-10">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-center text-gray-400 mb-6">Professional Experience</h2>
          <div className="space-y-8">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-base font-normal tracking-wide text-black">{exp.role}</h3>
                  <span className="text-xs font-sans text-gray-400 shrink-0 ml-4 tracking-widest uppercase">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-sm italic text-gray-500 mb-3">{exp.company}</p>
                <ul className="space-y-1.5">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-xs leading-relaxed font-sans text-gray-600 flex gap-4">
                      <span className="text-gray-300">•</span>
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
        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-center text-gray-400 mb-6">Selected Projects</h2>
          <div className="space-y-6">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-base font-normal tracking-wide text-black">{proj.name}</h3>
                  {proj.link && <span className="text-[10px] font-sans text-gray-400 tracking-widest">{proj.link}</span>}
                </div>
                <p className="text-xs leading-relaxed font-sans text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto grid grid-cols-3 gap-8">
        <div className={data.showCertifications ? "col-span-1" : "col-span-2"}>
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Education</h2>
              <div className="space-y-5">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm tracking-wide text-black mb-1">{edu.degree}</p>
                    <p className="text-xs italic text-gray-500 mb-1">{edu.school}</p>
                    <p className="text-xs font-sans text-gray-400">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {data.showCertifications && data.certifications.length > 0 && (
          <div className="col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Certifications</h2>
            <div className="space-y-5">
              {data.certifications.map(cert => (
                <div key={cert.id}>
                  <p className="text-sm tracking-wide text-black mb-1">{cert.name}</p>
                  <p className="text-xs italic text-gray-500 mb-1">{cert.issuer}</p>
                  <p className="text-xs font-sans text-gray-400">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

{data.showReferences && data.references.length > 0 && (
          <div className="col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">References</h2>
            <div className="space-y-5">
              {data.references.map(ref => (
                <div key={ref.id}>
                  <p className="text-sm tracking-wide text-black mb-1">{ref.name}</p>
                  <p className="text-xs italic text-gray-500 mb-1">{ref.title} at {ref.company}</p>
                  <p className="text-xs font-sans text-gray-400">{ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}\n
          {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
            section.items.length > 0 && (
              <div key={section.id} className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">{section.title}</h2>
                <div className="space-y-3">
                  {section.items.map(item => (
                    <div key={item.id} className="mb-2">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="text-sm font-bold">{item.title}</p>
                          {item.subtitle && <p className="text-sm italic">{item.subtitle}</p>}
                        </div>
                        {item.date && <p className="text-sm font-bold">{item.date}</p>}
                      </div>
                      {item.description && <p className="text-sm mt-1 whitespace-pre-wrap">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}


        <div className="col-span-1">
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Skills</h2>
              <div className="flex flex-col gap-2 font-sans text-xs text-gray-600 tracking-wider">
                {data.skills.map(s => (
                  <span key={s.id}>{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
