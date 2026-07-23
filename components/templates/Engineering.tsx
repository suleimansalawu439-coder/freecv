import React from 'react';
import { ResumeData } from '@/app/page';

export default function Engineering({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[0.75in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-gray-900 border-x-[8px] border-blue-800 box-border">
      
      <div className="border-b-[3px] border-blue-800 pb-4 mb-6">
        <h1 className="text-4xl font-black uppercase tracking-tight text-blue-900 mb-1">{data.personalInfo.fullName}</h1>
        <p className="text-lg font-bold text-gray-600 uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
        
        <div className="mt-3 flex gap-4 text-xs font-bold text-gray-500">
          {data.personalInfo.email && <span className="bg-gray-100 px-2 py-1 rounded">{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="bg-gray-100 px-2 py-1 rounded">{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="bg-gray-100 px-2 py-1 rounded">{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span className="bg-gray-100 px-2 py-1 rounded">{data.personalInfo.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6">
          <p className="text-sm font-medium leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-black uppercase tracking-widest text-blue-800 border-b-2 border-gray-200 mb-4 pb-1">Experience</h2>
          <div className="space-y-5">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <span className="text-xs font-bold bg-gray-50 text-blue-800 px-2 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm font-bold text-gray-600 mb-2">{exp.company}</p>
                <ul className="space-y-1.5 pl-4 list-[square] marker:text-blue-800">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed">{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-black uppercase tracking-widest text-blue-800 border-b-2 border-gray-200 mb-4 pb-1">Projects</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[10px] text-[var(--theme-color)] font-bold">{proj.link}</span>}
                </div>
                <p className="text-sm text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 mt-auto pt-4 border-t-2 border-gray-200">
        <div>
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-blue-800 border-b-2 border-gray-200 mb-3 pb-1">Education</h2>
              <div className="space-y-3">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold">{edu.degree}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{edu.school}</p>
                    <p className="text-xs font-bold text-blue-800 mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div>
          {data.showCertifications && data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-blue-800 border-b-2 border-gray-200 mb-3 pb-1">Certifications</h2>
              <div className="space-y-2">
                {data.certifications.map(cert => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <p className="text-sm font-bold">{cert.name}</p>
                    <p className="text-xs font-bold text-gray-500">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-blue-800 border-b-2 border-gray-200 mb-3 pb-1">References</h2>
              <div className="space-y-2">
                {data.references.map(ref => (
                  <div key={ref.id} className="flex justify-between items-baseline">
                    <p className="text-sm font-bold">{ref.name}</p>
                    <p className="text-xs font-bold text-gray-500">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-blue-800 border-b-2 border-gray-200 mb-3 pb-1">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map(s => (
                  <span key={s.id} className="text-[10px] font-bold bg-gray-800 text-white px-2 py-1 rounded">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
