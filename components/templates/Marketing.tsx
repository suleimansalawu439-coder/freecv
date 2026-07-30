import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Marketing({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-gray-800">
      
      <div className="flex gap-8 mb-10 items-center border-b-4 border-[var(--theme-color)] pb-8">
        <div className="w-24 h-24 bg-[var(--theme-color)] rounded-2xl flex-shrink-0 flex items-center justify-center rotate-3 shadow-lg">
           <span className="text-4xl font-black text-white tracking-tighter -rotate-3">
             {data.personalInfo.fullName.split(' ').map(n => n[0]).join('')}
           </span>
        </div>
        <div className="flex-1">
          <h1 className="text-5xl font-black tracking-tight mb-1 text-gray-900">{data.personalInfo.fullName}</h1>
          <p className="text-xl font-bold text-[var(--theme-color)] uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-gray-500 mt-3">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
            {data.personalInfo.website && <span>• {data.personalInfo.website}</span>}
          </div>
        </div>
      </div>

      {data.summary && (
        <div className="mb-10">
          <p className="text-base font-medium leading-relaxed text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-[var(--theme-color)]">/</span> Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map(exp => (
              <div key={exp.id} className="relative">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-xs font-bold text-[var(--theme-color)] bg-gray-50 px-3 py-1 rounded-full">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed text-gray-600 flex gap-3">
                      <span className="text-[var(--theme-color)] font-black">›</span>
                      <span>{line}</span>
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
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-[var(--theme-color)]">/</span> Campaigns & Projects
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {data.projects.map(proj => (
              <div key={proj.id} className="bg-white border-2 border-gray-100 p-5 rounded-xl hover:border-[var(--theme-color)] transition-colors">
                <h3 className="text-base font-bold text-gray-900 mb-1">{proj.name}</h3>
                {proj.link && <p className="text-xs text-[var(--theme-color)] font-medium mb-2 break-all">{proj.link}</p>}
                <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8 mt-auto pt-8 border-t border-gray-200">
        <div className={data.showCertifications ? "col-span-1" : "col-span-2"}>
          {data.education.length > 0 && (
            <div>
              <h2 className="text-base font-black text-gray-900 mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-xs text-gray-600 mt-1">{edu.school}</p>
                    <p className="text-xs font-bold text-[var(--theme-color)] mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {data.showCertifications && data.certifications.length > 0 && (
          <div className="col-span-1">
            <h2 className="text-base font-black text-gray-900 mb-4">Certifications</h2>
            <div className="space-y-4">
              {data.certifications.map(cert => (
                <div key={cert.id}>
                  <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{cert.issuer}</p>
                  <p className="text-xs font-bold text-[var(--theme-color)] mt-1">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

{data.showReferences && data.references.length > 0 && (
          <div className="col-span-1">
            <h2 className="text-base font-black text-gray-900 mb-4">References</h2>
            <div className="space-y-4">
              {data.references.map(ref => (
                <div key={ref.id}>
                  <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{ref.title} at {ref.company}</p>
                  <p className="text-xs font-bold text-[var(--theme-color)] mt-1">{ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}\n
          {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
            section.items.length > 0 && (
              <div key={section.id} className="mb-6">
                <h2 className="text-base font-black text-gray-900 mb-4">{section.title}</h2>
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
              <h2 className="text-base font-black text-gray-900 mb-4">Core Skills</h2>
              <div className="flex flex-col gap-2">
                {data.skills.map(s => (
                  <span key={s.id} className="text-xs font-bold text-gray-700">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
