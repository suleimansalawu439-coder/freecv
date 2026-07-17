import React from 'react';
import { ResumeData } from '@/app/page';

export default function Brutalist({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[0.75in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-black border-[12px] border-black box-border">
      
      <div className="border-b-[6px] border-black pb-6 mb-8 text-center">
        <h1 className="text-6xl font-black tracking-tighter uppercase mb-2 leading-none">{data.personalInfo.fullName}</h1>
        <p className="text-2xl font-bold uppercase tracking-widest bg-black text-white inline-block px-4 py-1">{data.personalInfo.jobTitle}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider">
          {data.personalInfo.email && <span className="border-2 border-black px-2 py-0.5">{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="border-2 border-black px-2 py-0.5">{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="border-2 border-black px-2 py-0.5">{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span className="border-2 border-black px-2 py-0.5">{data.personalInfo.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-8 border-4 border-black p-4">
          <p className="text-base font-bold uppercase leading-tight">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter bg-black text-white px-3 py-1 inline-block mb-4">EXPERIENCE</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-[6px] border-black pl-4">
                <div className="flex justify-between items-end mb-1">
                  <h3 className="text-xl font-black uppercase">{exp.role}</h3>
                  <span className="text-sm font-bold border-b-2 border-black shrink-0 ml-4">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-lg font-bold mb-3 uppercase underline decoration-2">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm font-semibold flex gap-3">
                      <span className="font-black text-xl leading-none">›</span>
                      <span className="flex-1 pt-0.5">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter bg-black text-white px-3 py-1 inline-block mb-4">PROJECTS</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="border-l-[6px] border-black pl-4">
                <h3 className="text-xl font-black uppercase mb-1">{proj.name} {proj.link && <span className="text-xs bg-black text-white px-1 ml-2">{proj.link}</span>}</h3>
                <p className="text-sm font-bold uppercase leading-tight">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto grid grid-cols-2 gap-8 border-t-[6px] border-black pt-6">
        <div>
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter bg-black text-white px-3 py-1 inline-block mb-4">EDUCATION</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="border-2 border-black p-3">
                    <p className="text-base font-black uppercase">{edu.degree}</p>
                    <p className="text-sm font-bold uppercase mt-1">{edu.school}</p>
                    <p className="text-xs font-bold uppercase bg-black text-white inline-block px-1 mt-2">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter bg-black text-white px-3 py-1 inline-block mb-4">CERTS</h2>
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id} className="border-2 border-black p-2">
                    <p className="text-sm font-black uppercase">{cert.name}</p>
                    <p className="text-xs font-bold uppercase mt-1">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter bg-black text-white px-3 py-1 inline-block mb-4">REFERENCES</h2>
              <div className="space-y-3">
                {data.references.map(ref => (
                  <div key={ref.id} className="border-2 border-black p-2">
                    <p className="text-sm font-black uppercase">{ref.name}</p>
                    <p className="text-xs font-bold uppercase mt-1">{ref.title} at {ref.company} • {ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter bg-black text-white px-3 py-1 inline-block mb-4">SKILLS</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(s => (
                  <span key={s.id} className="text-sm font-black uppercase border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
