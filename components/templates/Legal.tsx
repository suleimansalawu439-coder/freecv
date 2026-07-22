import React from 'react';
import { ResumeData } from '@/app/page';

export default function Legal({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-black leading-snug">
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase mb-1">{data.personalInfo.fullName}</h1>
        <p className="text-sm uppercase tracking-widest mb-3">{data.personalInfo.jobTitle}</p>
        <p className="text-sm flex justify-center gap-x-4 flex-wrap">
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        </p>
      </div>

      <div className="w-full h-px bg-black mb-6" />

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase mb-2">Education</h2>
          <div className="space-y-3">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold inline mr-2">{edu.school},</p>
                  <p className="text-sm inline">{edu.degree}</p>
                </div>
                <p className="text-sm">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase mb-3">Experience</h2>
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-sm font-bold">{exp.company}</p>
                  <p className="text-sm">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="text-sm italic mb-1">{exp.role}</p>
                <p className="text-sm text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase mb-3">Representative Matters / Publications</h2>
          <div className="space-y-3">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <p className="text-sm font-bold inline mr-2">{proj.name}:</p>
                <span className="text-sm text-justify">{proj.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase mb-3">Bar Admissions & Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map(cert => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm">{cert.name}</p>
                <p className="text-sm">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

{data.showReferences && data.references.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase mb-3">References</h2>
          <div className="space-y-2">
            {data.references.map(ref => (
              <div key={ref.id} className="flex justify-between items-baseline">
                <p className="text-sm">{ref.name}</p>
                <p className="text-sm">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase mb-2">Additional Information</h2>
          <p className="text-sm">
            <span className="font-bold mr-2">Skills:</span>
            {data.skills.map(s => s.name).join(', ')}
          </p>
        </div>
      )}

    \n
      {/* CUSTOM SECTIONS */}
      {data.customSections && data.customSections.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          {data.customSections.map(section => (
            <div key={section.id} className="mb-6 last:mb-0">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300 mb-4 font-sans">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold leading-tight">{item.title}</h3>
                      {item.date && <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-gray-400 shrink-0 ml-4">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-xs font-bold text-gray-500 mb-1 font-sans uppercase tracking-wider">{item.subtitle}</p>}
                    {item.description && (
                      <div className="text-xs text-gray-700 leading-relaxed mt-1">
                        {item.description.split('\n').filter(l => l.trim()).map((line, i) => (
                          <div key={i} className="flex gap-2 mb-1"><span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" /><span>{line}</span></div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}\n</div>
  );
}
