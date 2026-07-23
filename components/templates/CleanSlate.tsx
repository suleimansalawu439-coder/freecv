import React from 'react';
import { ResumeData } from '@/app/page';

export default function CleanSlate({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1.2in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-gray-800">
      
      <div className="mb-14">
        <h1 className="text-3xl font-medium tracking-tight mb-3 text-black">{data.personalInfo.fullName}</h1>
        <p className="text-sm text-gray-500 mb-6">{data.personalInfo.jobTitle}</p>
        <div className="flex gap-x-6 gap-y-2 flex-wrap text-[11px] text-gray-400">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      <div className="flex gap-16">
        
        {/* Left Col */}
        <div className="w-1/4 flex flex-col gap-12">
          
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-semibold">Skills</h2>
              <div className="flex flex-col gap-2 text-xs text-gray-600">
                {data.skills.map(s => (
                  <span key={s.id}>{s.name}</span>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2 className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-semibold">Education</h2>
              <div className="space-y-5">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-xs text-black font-medium">{edu.degree}</p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-snug">{edu.school}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-semibold">Certifications</h2>
              <div className="space-y-4">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-xs text-black font-medium">{cert.name}</p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-snug">{cert.issuer}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-semibold">References</h2>
              <div className="space-y-4">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-xs text-black font-medium">{ref.name}</p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-snug">{ref.title} at {ref.company}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Col */}
        <div className="w-3/4 flex flex-col gap-12">
          
          {data.summary && (
            <div>
              <p className="text-sm leading-loose text-gray-600 font-light">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div>
              <h2 className="text-[10px] uppercase tracking-widest text-gray-400 mb-6 font-semibold">Experience</h2>
              <div className="space-y-10">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-medium text-black">{exp.role}</h3>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-4">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-4">{exp.company}</p>
                    <ul className="space-y-2.5">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-xs leading-relaxed text-gray-600 font-light relative pl-4">
                          <span className="absolute left-0 top-0 text-gray-300">-</span>
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
            <div>
              <h2 className="text-[10px] uppercase tracking-widest text-gray-400 mb-6 font-semibold">Projects</h2>
              <div className="space-y-8">
                {data.projects.map(proj => (
                  <div key={proj.id}>
                    <h3 className="text-sm font-medium text-black mb-1">{proj.name}</h3>
                    {proj.link && <p className="text-[10px] text-[var(--theme-color)] mb-2">{proj.link}</p>}
                    <p className="text-xs leading-relaxed text-gray-600 font-light">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
