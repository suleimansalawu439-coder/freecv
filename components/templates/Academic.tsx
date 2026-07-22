import React from 'react';
import { ResumeData } from '@/app/page';

export default function Academic({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-black leading-relaxed">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-1">{data.personalInfo.fullName}</h1>
        <p className="text-sm font-medium mb-2">Curriculum Vitae</p>
        <div className="text-xs space-y-0.5">
          {data.personalInfo.jobTitle && <p>{data.personalInfo.jobTitle}</p>}
          <div className="flex justify-center gap-2">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
          </div>
          <div className="flex justify-center gap-2">
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            {data.personalInfo.website && <span>| {data.personalInfo.website}</span>}
          </div>
        </div>
      </div>

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">Education</h2>
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id} className="grid grid-cols-[100px_1fr] gap-4">
                <span className="text-sm">{edu.graduationYear}</span>
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">Academic & Professional Appointments</h2>
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id} className="grid grid-cols-[100px_1fr] gap-4">
                <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
                <div>
                  <p className="text-sm font-bold">{exp.role}</p>
                  <p className="text-sm italic mb-1">{exp.company}</p>
                  <ul className="pl-4 list-disc">
                    {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm">{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">Research & Projects</h2>
          <div className="space-y-4 pl-[116px]">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <p className="text-sm font-bold">{proj.name} {proj.link && <span className="font-normal text-xs text-blue-800">[{proj.link}]</span>}</p>
                <p className="text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">Certifications & Awards</h2>
          <div className="space-y-2 pl-[116px]">
            {data.certifications.map(cert => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm font-bold">{cert.name} <span className="font-normal text-gray-700">({cert.issuer})</span></p>
                <span className="text-sm">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

{data.showReferences && data.references.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">References</h2>
          <div className="space-y-2 pl-[116px]">
            {data.references.map(ref => (
              <div key={ref.id} className="flex justify-between items-baseline">
                <p className="text-sm font-bold">{ref.name} <span className="font-normal text-gray-700">({ref.title} at {ref.company})</span></p>
                <span className="text-sm">{ref.contact}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">Technical Proficiencies</h2>
          <p className="text-sm pl-[116px]">{data.skills.map(s => s.name).join(', ')}</p>
        </div>
      )}

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
