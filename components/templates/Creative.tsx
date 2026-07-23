import React from 'react';
import { ResumeData } from '@/app/page';

export default function Creative({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-[#faf8f5] shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-[#2a2a2a]">
      
      <div className="flex justify-between items-center mb-8 pb-8 border-b border-[#e0ddd5]">
        <div className="max-w-[50%]">
          <h1 className="text-5xl font-black tracking-tight mb-2 text-[#d35400]">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-bold tracking-widest uppercase text-[#7f8c8d]">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="flex flex-col items-end gap-2 text-sm font-medium text-[#7f8c8d]">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-10 relative">
          <span className="text-6xl text-[#d35400] opacity-20 absolute -top-4 -left-4 font-serif">"</span>
          <p className="text-sm leading-relaxed font-medium italic z-10 relative">{data.summary}</p>
        </div>
      )}

      <div className="flex gap-10 mt-auto flex-1">
        
        {/* Left Column */}
        <div className="w-[60%] flex flex-col gap-8">
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#d35400] mb-5">Experience</h2>
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <h3 className="text-lg font-bold">{exp.role}</h3>
                    <p className="text-sm font-semibold text-[#d35400] mb-1">{exp.company}</p>
                    <p className="text-xs font-bold text-[#7f8c8d] mb-2 uppercase tracking-wider">{exp.startDate} — {exp.endDate}</p>
                    <ul className="space-y-1.5">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-sm leading-relaxed flex gap-3 text-[#555]">
                          <span className="text-[#d35400]">•</span>
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
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#d35400] mb-5">Projects</h2>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id}>
                    <h3 className="text-base font-bold text-[#2a2a2a]">{proj.name}</h3>
                    {proj.link && <p className="text-xs text-[#7f8c8d] mb-1">{proj.link}</p>}
                    <p className="text-sm text-[#555] leading-relaxed mt-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[40%] flex flex-col gap-8 pl-10 border-l border-[#e0ddd5]">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#d35400] mb-5">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-base font-bold">{edu.degree}</p>
                    <p className="text-sm font-medium text-[#7f8c8d] mt-1">{edu.school}</p>
                    <p className="text-xs font-bold text-[#d35400] mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#d35400] mb-5">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold">{cert.name}</p>
                    <p className="text-xs text-[#7f8c8d] mt-1">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#d35400] mb-5">References</h2>
              <div className="space-y-3">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold">{ref.name}</p>
                    <p className="text-xs text-[#7f8c8d] mt-1">{ref.title} at {ref.company} • {ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#d35400] mb-5">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(s => (
                  <span key={s.id} className="text-xs font-bold bg-white text-[#d35400] px-3 py-1.5 rounded-full border border-[#e0ddd5] shadow-sm">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
