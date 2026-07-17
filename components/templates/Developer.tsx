import React from 'react';
import { ResumeData } from '@/app/page';

export default function Developer({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-[#0d1117] shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[0.75in] flex flex-col font-mono mx-auto lg:mx-0 shrink-0 text-[#c9d1d9] box-border">
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#58a6ff] mb-2">
          <span className="text-[#8b949e]">const</span> developer <span className="text-[#8b949e]">=</span> <span className="text-[#a5d6ff]">"{data.personalInfo.fullName}"</span>;
        </h1>
        <p className="text-sm text-[#79c0ff] mb-4">// {data.personalInfo.jobTitle}</p>
        
        <div className="text-xs text-[#8b949e] space-y-1">
          {data.personalInfo.email && <p>developer.<span className="text-[#d2a8ff]">email</span> = <span className="text-[#a5d6ff]">"{data.personalInfo.email}"</span>;</p>}
          {data.personalInfo.phone && <p>developer.<span className="text-[#d2a8ff]">phone</span> = <span className="text-[#a5d6ff]">"{data.personalInfo.phone}"</span>;</p>}
          {data.personalInfo.location && <p>developer.<span className="text-[#d2a8ff]">location</span> = <span className="text-[#a5d6ff]">"{data.personalInfo.location}"</span>;</p>}
          {data.personalInfo.website && <p>developer.<span className="text-[#d2a8ff]">website</span> = <span className="text-[#a5d6ff]">"{data.personalInfo.website}"</span>;</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-8">
          <p className="text-sm leading-relaxed text-[#8b949e]">/*<br/>  {data.summary.replace(/\n/g, '\n  ')}<br/>*/</p>
        </div>
      )}

      <div className="flex gap-8">
        <div className="w-[65%] flex flex-col gap-8">
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-[#ff7b72] mb-4">## Experience</h2>
              <div className="space-y-6 border-l border-[#30363d] pl-4">
                {data.experience.map(exp => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 bg-[#ff7b72] rounded-full" />
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-[#c9d1d9]">{exp.role}</h3>
                      <span className="text-xs text-[#8b949e] shrink-0 ml-4">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-[#79c0ff] mb-2">@{exp.company}</p>
                    <ul className="space-y-1">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-xs text-[#8b949e] leading-relaxed flex gap-2">
                          <span className="text-[#ff7b72]">{'>'}</span>
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
              <h2 className="text-lg font-bold text-[#79c0ff] mb-4">## Projects</h2>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id} className="bg-[#161b22] border border-[#30363d] p-4 rounded-md">
                    <h3 className="text-sm font-bold text-[#c9d1d9] mb-1">{proj.name}</h3>
                    {proj.link && <p className="text-[10px] text-[#58a6ff] mb-2">{proj.link}</p>}
                    <p className="text-xs text-[#8b949e] leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-[35%] flex flex-col gap-8">
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-[#d2a8ff] mb-4">## Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(s => (
                  <span key={s.id} className="text-xs bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-2 py-1 rounded">{s.name}</span>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-[#a5d6ff] mb-4">## Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="border-l-2 border-[#30363d] pl-3">
                    <p className="text-sm font-bold text-[#c9d1d9]">{edu.degree}</p>
                    <p className="text-xs text-[#8b949e] mt-1">{edu.school}</p>
                    <p className="text-[10px] text-[#8b949e] mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-[#3fb950] mb-4">## Certs</h2>
              <div className="space-y-4">
                {data.certifications.map(cert => (
                  <div key={cert.id} className="border-l-2 border-[#30363d] pl-3">
                    <p className="text-sm font-bold text-[#c9d1d9]">{cert.name}</p>
                    <p className="text-xs text-[#8b949e] mt-1">{cert.issuer}</p>
                    <p className="text-[10px] text-[#8b949e] mt-1">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-[#3fb950] mb-4">References</h2>
              <div className="space-y-4">
                {data.references.map(ref => (
                  <div key={ref.id} className="border-l-2 border-[#30363d] pl-3">
                    <p className="text-sm font-bold text-[#c9d1d9]">{ref.name}</p>
                    <p className="text-xs text-[#8b949e] mt-1">{ref.title} at {ref.company}</p>
                    <p className="text-[10px] text-[#8b949e] mt-1">{ref.contact}</p>
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
          .bg-\\[\\#0d1117\\] { background: #0d1117 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .text-\\[\\#c9d1d9\\] { color: #c9d1d9 !important; }
          .text-\\[\\#58a6ff\\] { color: #58a6ff !important; }
          .text-\\[\\#8b949e\\] { color: #8b949e !important; }
          .text-\\[\\#ff7b72\\] { color: #ff7b72 !important; }
          .text-\\[\\#79c0ff\\] { color: #79c0ff !important; }
          .text-\\[\\#d2a8ff\\] { color: #d2a8ff !important; }
          .text-\\[\\#a5d6ff\\] { color: #a5d6ff !important; }
          .bg-\\[\\#161b22\\] { background: #161b22 !important; }
          .bg-\\[\\#21262d\\] { background: #21262d !important; }
        }
      `}} />
    </div>
  );
}
