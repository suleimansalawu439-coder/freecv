import React from 'react';
import { ResumeData } from '@/app/page';

export default function AvantGarde({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-[#000000] shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-white box-border">
      
      <div className="flex items-end gap-10 mb-12 border-b border-gray-800 pb-8">
        <div className="w-24 h-24 bg-white rounded-full flex-shrink-0 flex items-center justify-center">
           <span className="text-3xl font-black text-black tracking-tighter">
             {data.personalInfo.fullName.split(' ').map(n => n[0]).join('')}
           </span>
        </div>
        <div className="flex-1">
          <h1 className="text-6xl font-black tracking-tighter mb-2 uppercase leading-none">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-bold tracking-widest text-gray-400 uppercase">{data.personalInfo.jobTitle}</p>
        </div>
      </div>

      <div className="flex gap-12 flex-1">
        
        {/* Left Column (Narrow) */}
        <div className="w-[30%] flex flex-col gap-8">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3">Contact</h2>
            <div className="flex flex-col gap-2 text-xs font-medium text-gray-300">
              {data.personalInfo.email && <span className="break-all">{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
              {data.personalInfo.website && <span className="break-all">{data.personalInfo.website}</span>}
            </div>
          </div>

          {data.education.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold leading-tight">{edu.degree}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase">{edu.school}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3">Certs</h2>
              <div className="space-y-4">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold leading-tight">{cert.name}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase">{cert.issuer}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3">References</h2>
              <div className="space-y-4">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold leading-tight">{ref.name}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase">{ref.title} at {ref.company}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map(s => (
                  <span key={s.id} className="text-[10px] font-bold bg-white text-black px-2 py-0.5 uppercase tracking-wider">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Wide) */}
        <div className="w-[70%]">
          {data.summary && (
            <div className="mb-10">
              <p className="text-base leading-snug font-medium text-gray-300">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div className="mb-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 border-b border-gray-800 pb-2">Experience</h2>
              <div className="space-y-8">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold">{exp.role}</h3>
                      <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-wider">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-[13px] text-gray-300 leading-relaxed pl-4 relative">
                          <span className="absolute left-0 top-1.5 w-1 h-1 bg-white"></span>
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
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 border-b border-gray-800 pb-2">Projects</h2>
              <div className="space-y-6">
                {data.projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold">{proj.name}</h3>
                      {proj.link && <span className="text-[10px] font-medium text-gray-500">{proj.link}</span>}
                    </div>
                    <p className="text-[13px] text-gray-400 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; }
          .bg-\\[\\#000000\\] { background: black !important; color: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .text-white { color: white !important; }
        }
      `}} />
    </div>
  );
}
