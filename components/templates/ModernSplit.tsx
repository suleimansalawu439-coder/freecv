import React from 'react';
import { ResumeData } from '@/app/page';

export default function ModernSplit({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none flex font-sans mx-auto lg:mx-0 shrink-0 text-gray-800">
      
      {/* Left Column (35%) */}
      <div className="w-[35%] bg-gray-50 p-8 flex flex-col border-r border-gray-200">
        <h1 className="text-3xl font-black tracking-tight mb-2 uppercase leading-tight text-black">{data.personalInfo.fullName}</h1>
        <p className="text-sm font-bold text-[var(--theme-color)] mb-8 uppercase tracking-wider">{data.personalInfo.jobTitle}</p>

        <div className="flex flex-col gap-4 text-xs font-medium text-gray-600 mb-10">
          {data.personalInfo.email && <span className="break-all">{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span className="break-all">{data.personalInfo.website}</span>}
        </div>

        {data.education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-black uppercase tracking-widest text-black mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <p className="text-sm font-bold text-black">{edu.degree}</p>
                  <p className="text-xs text-gray-600 mt-1">{edu.school}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-black uppercase tracking-widest text-black mb-4">Certifications</h2>
            <div className="space-y-4">
              {data.certifications.map(cert => (
                <div key={cert.id}>
                  <p className="text-sm font-bold text-black">{cert.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{cert.issuer}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

{data.showReferences && data.references.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-black uppercase tracking-widest text-black mb-4">References</h2>
            <div className="space-y-4">
              {data.references.map(ref => (
                <div key={ref.id}>
                  <p className="text-sm font-bold text-black">{ref.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{ref.title} at {ref.company}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-black mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold bg-white border border-gray-200 px-2 py-1 rounded text-gray-700">{s.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column (65%) */}
      <div className="w-[65%] p-8 flex flex-col bg-white">
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-black mb-4">Profile</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-black mb-6">Experience</h2>
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-[var(--theme-color)] border-2 border-white box-content" />
                  <div className="border-l-2 border-gray-100 pl-5 pb-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold text-black">{exp.role}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0 ml-4">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-sm font-semibold text-[var(--theme-color)] mb-2">{exp.company}</p>
                    <ul className="space-y-1.5">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-sm text-gray-600 leading-relaxed list-disc ml-4">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.showProjects && data.projects.length > 0 && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-black mb-6">Projects</h2>
            <div className="space-y-6">
              {data.projects.map(proj => (
                <div key={proj.id} className="relative">
                  <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-gray-300 border-2 border-white box-content" />
                  <div className="border-l-2 border-gray-100 pl-5 pb-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold text-black">{proj.name}</h3>
                      {proj.link && <span className="text-[10px] font-medium text-gray-400">{proj.link}</span>}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mt-1">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
