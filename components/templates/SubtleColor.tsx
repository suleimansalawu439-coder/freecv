import React from 'react';
import { ResumeData } from '@/app/page';

export default function SubtleColor({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-[#fdfbf9] shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-slate-700 box-border border-l-[20px] border-[#d8c3a5]">
      
      <div className="mb-10 pl-4 border-l-4 border-[#e85a4f]">
        <h1 className="text-5xl font-black tracking-tight mb-2 text-[#3e4444]">{data.personalInfo.fullName}</h1>
        <p className="text-lg font-bold tracking-widest uppercase text-[#e85a4f]">{data.personalInfo.jobTitle}</p>
        
        <div className="flex gap-x-6 gap-y-2 flex-wrap mt-4 text-xs font-semibold text-[#8e9b9b]">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      <div className="flex gap-10 mt-auto flex-1">
        
        {/* Left Column */}
        <div className="w-[60%] flex flex-col gap-8">
          {data.summary && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8e9b9b] mb-3">Profile</h2>
              <p className="text-sm font-medium leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8e9b9b] mb-4">Experience</h2>
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold text-[#3e4444]">{exp.role}</h3>
                      <span className="text-[10px] font-bold text-[#e85a4f] bg-[#e85a4f]/10 px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ml-4">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-sm font-bold text-[#8e9b9b] mb-2">{exp.company}</p>
                    <ul className="space-y-1.5">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-sm leading-relaxed flex gap-3 text-[#555]">
                          <span className="text-[#d8c3a5] text-lg leading-none">•</span>
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
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8e9b9b] mb-4">Projects</h2>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id} className="bg-white p-4 rounded-xl border border-[#eae7dc]">
                    <h3 className="text-sm font-bold text-[#3e4444] mb-1">{proj.name}</h3>
                    {proj.link && <p className="text-[10px] font-semibold text-[#8e9b9b] mb-2">{proj.link}</p>}
                    <p className="text-sm leading-relaxed text-[#555]">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[40%] flex flex-col gap-8">
          
          {data.education.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8e9b9b] mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-[#3e4444]">{edu.degree}</p>
                    <p className="text-xs font-bold text-[#8e9b9b] mt-1">{edu.school}</p>
                    <p className="text-[10px] font-black text-[#e85a4f] mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8e9b9b] mb-4">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold text-[#3e4444]">{cert.name}</p>
                    <p className="text-xs font-bold text-[#8e9b9b] mt-1">{cert.issuer}</p>
                    <p className="text-[10px] font-black text-[#e85a4f] mt-0.5">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8e9b9b] mb-4">References</h2>
              <div className="space-y-3">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold text-[#3e4444]">{ref.name}</p>
                    <p className="text-xs font-bold text-[#8e9b9b] mt-1">{ref.title} at {ref.company}</p>
                    <p className="text-[10px] font-black text-[#e85a4f] mt-0.5">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8e9b9b] mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(s => (
                  <span key={s.id} className="text-[11px] font-bold text-[#3e4444] bg-[#eae7dc] px-3 py-1.5 rounded-lg">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
