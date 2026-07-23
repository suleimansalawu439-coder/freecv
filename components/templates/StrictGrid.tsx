import React from 'react';
import { ResumeData } from '@/app/page';

export default function StrictGrid({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[0.75in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-black border-[4px] border-black box-border">
      
      {/* Top Header Row */}
      <div className="grid grid-cols-[3fr_2fr] border-b-[4px] border-black">
        <div className="p-4 border-r-[4px] border-black">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-bold uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="p-4 text-xs font-bold uppercase tracking-widest flex flex-col justify-center space-y-1">
          {data.personalInfo.email && <p>E: {data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>P: {data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>L: {data.personalInfo.location}</p>}
          {data.personalInfo.website && <p>W: {data.personalInfo.website}</p>}
        </div>
      </div>

      {/* Summary Row */}
      {data.summary && (
        <div className="border-b-[4px] border-black p-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 border-b-2 border-black inline-block pb-0.5">Summary</h2>
          <p className="text-sm font-semibold text-justify">{data.summary}</p>
        </div>
      )}

      {/* Main Grid Content */}
      <div className="grid grid-cols-[1fr_1fr_1fr] flex-1">
        
        {/* Col 1 & 2: Experience & Projects */}
        <div className="col-span-2 border-r-[4px] border-black flex flex-col">
          {data.experience.length > 0 && (
            <div className="p-4 border-b-[4px] border-black">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b-2 border-black inline-block pb-0.5">Experience</h2>
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-black uppercase">{exp.role}</h3>
                      <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 shrink-0 ml-4">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wider mb-2">{exp.company}</p>
                    <ul className="space-y-1 pl-4 list-square">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-[11px] font-bold leading-relaxed">
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
            <div className="p-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b-2 border-black inline-block pb-0.5">Projects</h2>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-black uppercase">{proj.name}</h3>
                      {proj.link && <p className="text-[9px] font-bold underline">{proj.link}</p>}
                    </div>
                    <p className="text-[11px] font-bold leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Col 3: Edu, Certs, Skills */}
        <div className="col-span-1 flex flex-col">
          {data.education.length > 0 && (
            <div className="p-4 border-b-[4px] border-black">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b-2 border-black inline-block pb-0.5">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-black uppercase">{edu.degree}</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider mt-1">{edu.school}</p>
                    <p className="text-[10px] font-black bg-black text-white px-1 inline-block mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div className="p-4 border-b-[4px] border-black">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b-2 border-black inline-block pb-0.5">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-xs font-black uppercase leading-tight">{cert.name}</p>
                    <p className="text-[10px] font-bold uppercase mt-1">{cert.issuer}</p>
                    <p className="text-[10px] font-black bg-gray-200 px-1 inline-block mt-1">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div className="p-4 border-b-[4px] border-black">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b-2 border-black inline-block pb-0.5">References</h2>
              <div className="space-y-3">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-xs font-black uppercase leading-tight">{ref.name}</p>
                    <p className="text-[10px] font-bold uppercase mt-1">{ref.title} at {ref.company}</p>
                    <p className="text-[10px] font-black bg-gray-200 px-1 inline-block mt-1">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div className="p-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b-2 border-black inline-block pb-0.5">Skills</h2>
              <div className="flex flex-col gap-1.5 text-[11px] font-black uppercase tracking-wider">
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
