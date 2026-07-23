import React from 'react';
import { ResumeData } from '@/app/page';

export default function Designer({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-[#fdfbf7] shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-gray-900">
      
      <div className="flex mb-16">
        <div className="w-1/3">
          <h1 className="text-4xl font-bold tracking-tighter leading-none mb-4">{data.personalInfo.fullName.split(' ').join('\n')}</h1>
          <p className="text-sm font-medium text-pink-500 uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="w-2/3 pl-8 border-l-2 border-pink-200 flex flex-col justify-center gap-1.5 text-sm">
          {data.personalInfo.email && <p><strong>E</strong> {data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p><strong>T</strong> {data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p><strong>L</strong> {data.personalInfo.location}</p>}
          {data.personalInfo.website && <p><strong>W</strong> {data.personalInfo.website}</p>}
        </div>
      </div>

      <div className="flex gap-12">
        
        {/* Left Column */}
        <div className="w-1/3 flex flex-col gap-10">
          {data.summary && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">About</h2>
              <p className="text-xs leading-relaxed font-medium">{data.summary}</p>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold">{edu.degree}</p>
                    <p className="text-xs text-gray-600 mt-1">{edu.school}</p>
                    <p className="text-[10px] text-pink-500 font-bold mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(s => (
                  <span key={s.id} className="text-[10px] font-bold bg-pink-50 text-pink-600 px-2 py-1 rounded-md">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-2/3 flex flex-col gap-10">
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 border-b border-gray-200 pb-2">Experience</h2>
              <div className="space-y-8">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold">{exp.role}</h3>
                      <span className="text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-sm font-semibold text-pink-500 mb-3">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                          <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-pink-300 rounded-full"></span>
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
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 border-b border-gray-200 pb-2">Projects</h2>
              <div className="grid grid-cols-2 gap-6">
                {data.projects.map(proj => (
                  <div key={proj.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="text-sm font-bold mb-1">{proj.name}</h3>
                    {proj.link && <p className="text-[10px] text-pink-500 mb-2">{proj.link}</p>}
                    <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 border-b border-gray-200 pb-2">Certifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold">{cert.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 border-b border-gray-200 pb-2">References</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold">{ref.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{ref.title} at {ref.company}</p>
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
