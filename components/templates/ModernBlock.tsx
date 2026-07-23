import React from 'react';
import { ResumeData } from '@/app/page';

export default function ModernBlock({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-gray-900 box-border border-x-[0.5in] border-white">
      
      <div className="bg-zinc-900 text-white p-10 pt-16 mb-8 rounded-b-3xl">
        <h1 className="text-5xl font-black tracking-tight mb-2 uppercase">{data.personalInfo.fullName}</h1>
        <p className="text-xl font-bold text-zinc-400 uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-zinc-800 text-xs font-bold tracking-wider text-zinc-300">
          {data.personalInfo.email && <span className="bg-zinc-800 px-3 py-1.5 rounded">{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="bg-zinc-800 px-3 py-1.5 rounded">{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="bg-zinc-800 px-3 py-1.5 rounded">{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span className="bg-zinc-800 px-3 py-1.5 rounded">{data.personalInfo.website}</span>}
        </div>
      </div>

      <div className="px-10 pb-10 flex-1 flex flex-col">
        {data.summary && (
          <div className="mb-10">
            <p className="text-base font-semibold leading-relaxed text-gray-600 bg-zinc-50 p-6 rounded-2xl">{data.summary}</p>
          </div>
        )}

        <div className="flex gap-10">
          
          <div className="w-[60%] flex flex-col gap-10">
            {data.experience.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-4 h-4 bg-zinc-900 rounded-sm"></span> Experience
                </h2>
                <div className="space-y-8">
                  {data.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-lg font-bold">{exp.role}</h3>
                        <span className="text-xs font-bold text-white bg-zinc-900 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-sm font-bold text-zinc-500 mb-3 uppercase tracking-wider">{exp.company}</p>
                      <ul className="space-y-2">
                        {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                          <li key={i} className="text-sm leading-relaxed text-zinc-700 flex gap-3">
                            <span className="text-zinc-400 font-bold">›</span>
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
              <div>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-4 h-4 bg-zinc-300 rounded-sm"></span> Projects
                </h2>
                <div className="space-y-4">
                  {data.projects.map(proj => (
                    <div key={proj.id} className="bg-zinc-50 p-5 rounded-2xl">
                      <h3 className="text-base font-bold text-zinc-900 mb-1">{proj.name}</h3>
                      {proj.link && <p className="text-[10px] font-bold text-zinc-500 mb-2">{proj.link}</p>}
                      <p className="text-sm text-zinc-600 leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-[40%] flex flex-col gap-10">
            {data.education.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-4 h-4 bg-zinc-900 rounded-sm"></span> Education
                </h2>
                <div className="space-y-4">
                  {data.education.map(edu => (
                    <div key={edu.id} className="border-l-4 border-zinc-900 pl-4 py-1">
                      <p className="text-sm font-bold text-zinc-900">{edu.degree}</p>
                      <p className="text-xs font-bold text-zinc-500 mt-1 uppercase tracking-wider">{edu.school}</p>
                      <p className="text-xs font-bold text-zinc-400 mt-1">{edu.graduationYear}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.showCertifications && data.certifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-4 h-4 bg-zinc-300 rounded-sm"></span> Certifications
                </h2>
                <div className="space-y-4">
                  {data.certifications.map(cert => (
                    <div key={cert.id} className="border-l-4 border-zinc-300 pl-4 py-1">
                      <p className="text-sm font-bold text-zinc-900">{cert.name}</p>
                      <p className="text-xs font-bold text-zinc-500 mt-1 uppercase tracking-wider">{cert.issuer}</p>
                      <p className="text-xs font-bold text-zinc-400 mt-1">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

{data.showReferences && data.references.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-4 h-4 bg-zinc-300 rounded-sm"></span>References</h2>
                <div className="space-y-4">
                  {data.references.map(ref => (
                    <div key={ref.id} className="border-l-4 border-zinc-300 pl-4 py-1">
                      <p className="text-sm font-bold text-zinc-900">{ref.name}</p>
                      <p className="text-xs font-bold text-zinc-500 mt-1 uppercase tracking-wider">{ref.title} at {ref.company}</p>
                      <p className="text-xs font-bold text-zinc-400 mt-1">{ref.contact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.skills.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-4 h-4 bg-zinc-900 rounded-sm"></span> Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map(s => (
                    <span key={s.id} className="text-xs font-bold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200">{s.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
