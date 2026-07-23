import React from 'react';
import { ResumeData } from '@/app/page';

export default function BoldHeader({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-black">
      
      <div className="mb-8">
        <h1 className="text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-4 text-[#ff3333] break-words">{data.personalInfo.fullName}</h1>
        <p className="text-2xl font-bold uppercase tracking-widest text-black mb-4 border-b-4 border-black pb-4">{data.personalInfo.jobTitle}</p>
        <div className="flex gap-x-6 gap-y-2 flex-wrap text-sm font-bold uppercase tracking-wider text-gray-500">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      <div className="flex gap-10">
        
        {/* Main Content (Left) */}
        <div className="w-[65%] flex flex-col gap-8">
          {data.summary && (
            <div>
              <p className="text-sm font-bold leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-black uppercase bg-black text-white px-3 py-1 inline-block mb-4">Experience</h2>
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <h3 className="text-lg font-black uppercase">{exp.role}</h3>
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-sm font-bold uppercase text-[#ff3333]">{exp.company}</span>
                      <span className="text-xs font-bold bg-gray-100 px-2 py-0.5">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-sm font-medium leading-relaxed flex gap-2">
                          <span className="text-[#ff3333] font-black">+</span>
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
              <h2 className="text-xl font-black uppercase bg-black text-white px-3 py-1 inline-block mb-4">Projects</h2>
              <div className="space-y-5">
                {data.projects.map(proj => (
                  <div key={proj.id} className="border-l-4 border-[#ff3333] pl-4">
                    <h3 className="text-base font-black uppercase mb-1">{proj.name}</h3>
                    {proj.link && <p className="text-[10px] font-bold text-gray-400 mb-2">{proj.link}</p>}
                    <p className="text-sm font-medium leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (Right) */}
        <div className="w-[35%] flex flex-col gap-8">
          
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xl font-black uppercase bg-black text-white px-3 py-1 inline-block mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-black uppercase">{edu.degree}</p>
                    <p className="text-sm font-bold text-[#ff3333] mt-1">{edu.school}</p>
                    <p className="text-xs font-bold bg-gray-100 inline-block px-1 mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-black uppercase bg-black text-white px-3 py-1 inline-block mb-4">Certs</h2>
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-sm font-black uppercase">{cert.name}</p>
                    <p className="text-xs font-bold text-[#ff3333] mt-1">{cert.issuer}</p>
                    <p className="text-[10px] font-bold text-gray-500 mt-0.5">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-xl font-black uppercase bg-black text-white px-3 py-1 inline-block mb-4">References</h2>
              <div className="space-y-3">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-sm font-black uppercase">{ref.name}</p>
                    <p className="text-xs font-bold text-[#ff3333] mt-1">{ref.title} at {ref.company}</p>
                    <p className="text-[10px] font-bold text-gray-500 mt-0.5">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-black uppercase bg-black text-white px-3 py-1 inline-block mb-4">Skills</h2>
              <div className="flex flex-col gap-2 text-sm font-bold uppercase">
                {data.skills.map(s => (
                  <span key={s.id} className="border-b-2 border-gray-100 pb-1">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
