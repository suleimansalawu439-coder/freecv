import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Executive({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[0.75in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0">
      <div className="border-b-4 border-black pb-8 mb-8 flex justify-between items-end">
        <div className="max-w-[65%]">
          <h1 className="text-5xl font-black tracking-tight leading-[0.9] mb-4 uppercase">{data.personalInfo.fullName}</h1>
          <p className="text-xl font-medium text-gray-500 italic font-sans">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-[10px] font-bold font-sans uppercase tracking-widest text-gray-400">
          {data.personalInfo.email && <div className="flex items-center gap-2"><span>{data.personalInfo.email}</span><Mail size={12} /></div>}
          {data.personalInfo.phone && <div className="flex items-center gap-2"><span>{data.personalInfo.phone}</span><Phone size={12} /></div>}
          {data.personalInfo.location && <div className="flex items-center gap-2"><span>{data.personalInfo.location}</span><MapPin size={12} /></div>}
          {data.personalInfo.website && <div className="flex items-center gap-2"><span>{data.personalInfo.website}</span><Globe size={12} /></div>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-8">
          <p className="text-sm leading-relaxed text-gray-700 italic border-l-2 border-gray-200 pl-6">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300 mb-6 font-sans">Professional History</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold">{exp.role}</h3>
                  <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-gray-400 shrink-0 ml-4">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-sm font-bold text-gray-500 mb-2 font-sans uppercase tracking-wider">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm text-gray-700 leading-relaxed flex gap-3">
                      <span className="mt-2 w-1 h-1 rounded-full bg-black shrink-0" />
                      <span className="flex-1">{line}</span>
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
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300 mb-6 font-sans">Projects</h2>
          <div className="space-y-5">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-base font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[10px] font-sans text-gray-400">{proj.link}</span>}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto grid grid-cols-2 gap-12 border-t border-gray-100 pt-8">
        <div>
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300 mb-4 font-sans">Formation</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold leading-tight">{edu.degree}</p>
                    <p className="text-xs text-gray-500 font-sans mt-0.5">{edu.school}{edu.school && edu.graduationYear ? ', ' : ''}{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          {data.showCertifications && data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300 mb-4 font-sans">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold leading-tight">{cert.name}</p>
                    <p className="text-xs text-gray-500 font-sans mt-0.5">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300 mb-4 font-sans">References</h2>
              <div className="space-y-3">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold leading-tight">{ref.name}</p>
                    <p className="text-xs text-gray-500 font-sans mt-0.5">{ref.title} at {ref.company} • {ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}\n
          {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
            section.items.length > 0 && (
              <div key={section.id} className="mb-6">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300 mb-4 font-sans">{section.title}</h2>
                <div className="space-y-3">
                  {section.items.map(item => (
                    <div key={item.id} className="mb-2">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="text-sm font-bold">{item.title}</p>
                          {item.subtitle && <p className="text-sm italic">{item.subtitle}</p>}
                        </div>
                        {item.date && <p className="text-sm font-bold">{item.date}</p>}
                      </div>
                      {item.description && <p className="text-sm mt-1 whitespace-pre-wrap">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300 mb-4 font-sans">Expertise</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {data.skills.map(s => (
                  <span key={s.id} className="text-[11px] font-bold font-sans uppercase tracking-wider">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
