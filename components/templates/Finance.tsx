import React from 'react';
import { ResumeData } from '@/app/page';

export default function Finance({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-[#1a1a1a]">
      
      <div className="text-center mb-6 pb-4 border-b-[3px] border-[#1a1a1a]">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">{data.personalInfo.fullName}</h1>
        <p className="text-sm font-bold uppercase tracking-widest text-[#4a4a4a] mb-4">{data.personalInfo.jobTitle}</p>
        <p className="text-xs text-[#4a4a4a] flex justify-center flex-wrap gap-x-3 font-sans">
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
          {data.personalInfo.email && <span>| {data.personalInfo.email}</span>}
          {data.personalInfo.website && <span>| {data.personalInfo.website}</span>}
        </p>
      </div>

      {data.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-2 pb-1">Executive Summary</h2>
          <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">Professional Experience</h2>
          <div className="space-y-5">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-base font-bold">{exp.company}</h3>
                  <span className="text-sm font-bold">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-sm font-bold text-[#4a4a4a] italic mb-2">{exp.role}</p>
                <ul className="space-y-1 pl-4 list-disc">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed text-[#1a1a1a]">
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
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">Selected Transactions / Projects</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="text-sm font-bold inline mr-2">{proj.name}:</h3>
                <span className="text-sm leading-relaxed text-[#1a1a1a]">{proj.description}</span>
                {proj.link && <span className="text-xs text-blue-800 ml-2 font-sans">[{proj.link}]</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">Education</h2>
            <div className="space-y-3">
              {data.education.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-bold mr-2">{edu.school}</span>
                    <span className="text-sm italic">{edu.degree}</span>
                  </div>
                  <span className="text-sm font-bold">{edu.graduationYear}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-8 mt-auto">
        {data.showCertifications && data.certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Licenses & Certifications</h2>
            <div className="space-y-2">
              {data.certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{cert.name}</p>
                  <p className="text-sm">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

{data.showReferences && data.references.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">References</h2>
            <div className="space-y-2">
              {data.references.map(ref => (
                <div key={ref.id} className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{ref.name}</p>
                  <p className="text-sm">{ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div className={data.showCertifications ? "" : "col-span-2"}>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Technical Skills</h2>
            <p className="text-sm leading-relaxed">
              {data.skills.map(s => s.name).join(', ')}
            </p>
          </div>
        )}
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
