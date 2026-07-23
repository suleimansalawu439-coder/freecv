import React from 'react';
import { ResumeData } from '@/app/page';

export default function Compact({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[0.5in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-gray-900 leading-tight">
      
      <div className="flex justify-between items-end mb-3 border-b-2 border-gray-800 pb-2">
        <div>
          <h1 className="text-3xl font-black uppercase">{data.personalInfo.fullName}</h1>
          <p className="text-sm font-bold text-gray-600">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-right text-[10px] text-gray-500">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          {data.personalInfo.website && <p>{data.personalInfo.website}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-3">
          <p className="text-[11px] text-gray-700 leading-snug">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase bg-gray-200 px-2 py-0.5 mb-1.5">Experience</h2>
          <div className="space-y-2">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[11px] font-bold text-black">{exp.role} <span className="font-normal text-gray-600">at {exp.company}</span></h3>
                  <span className="text-[9px] text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <ul className="mt-0.5 pl-4 list-disc space-y-0.5">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-[10px] text-gray-700 leading-snug">
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
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase bg-gray-200 px-2 py-0.5 mb-1.5">Projects</h2>
          <div className="space-y-1.5">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[11px] font-bold text-black">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-[10px] text-gray-700 leading-snug">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-auto">
        {data.education.length > 0 && (
          <div className="flex-1">
            <h2 className="text-[11px] font-black uppercase bg-gray-200 px-2 py-0.5 mb-1.5">Education</h2>
            <div className="space-y-1.5">
              {data.education.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <p className="text-[11px] font-bold">{edu.degree}</p>
                    <p className="text-[9px] text-gray-600">{edu.school}</p>
                  </div>
                  <p className="text-[9px] text-gray-500">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <div className="flex-1">
            <h2 className="text-[11px] font-black uppercase bg-gray-200 px-2 py-0.5 mb-1.5">Certifications</h2>
            <div className="space-y-1.5">
              {data.certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <p className="text-[11px] font-bold">{cert.name}</p>
                    <p className="text-[9px] text-gray-600">{cert.issuer}</p>
                  </div>
                  <p className="text-[9px] text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

{data.showReferences && data.references.length > 0 && (
          <div className="flex-1">
            <h2 className="text-[11px] font-black uppercase bg-gray-200 px-2 py-0.5 mb-1.5">References</h2>
            <div className="space-y-1.5">
              {data.references.map(ref => (
                <div key={ref.id} className="flex justify-between items-baseline">
                  <div>
                    <p className="text-[11px] font-bold">{ref.name}</p>
                    <p className="text-[9px] text-gray-600">{ref.title} at {ref.company}</p>
                  </div>
                  <p className="text-[9px] text-gray-500">{ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="flex-1">
            <h2 className="text-[11px] font-black uppercase bg-gray-200 px-2 py-0.5 mb-1.5">Skills</h2>
            <p className="text-[10px] text-gray-700 leading-snug">
              {data.skills.map(s => s.name).join(' • ')}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
