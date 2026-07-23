import React from 'react';
import { ResumeData } from '@/app/page';

export default function Parchment({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#6B4C3B';
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-[#FAF7F2] shadow-xl print:shadow-none p-[0.8in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-[#2C2418]">
      {/* Header with Photo and Name */}
      <header className="flex items-start gap-7 mb-8 pb-8 border-b" style={{ borderColor: `${c}25` }}>
        {data.personalInfo.profilePicture && (
          <img
            src={data.personalInfo.profilePicture}
            alt="Profile"
            className="w-[1.2in] h-[1.5in] object-cover shrink-0"
            style={{ border: `1px solid ${c}40`, padding: '3px' }}
          />
        )}
        <div className="flex-1">
          <h1 className="text-[28px] font-normal tracking-[0.06em] mb-1" style={{ color: c }}>
            {data.personalInfo.fullName}
          </h1>
          <p className="text-[12px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8A7A6A] mb-5">
            {data.personalInfo.jobTitle}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[9.5px] font-sans text-[#8A7A6A]">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8 pl-5 border-l-[3px]" style={{ borderColor: `${c}50` }}>
          <p className="text-[11px] leading-[1.85] text-[#5A4A3A] italic">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-5">
            <h2 className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] whitespace-nowrap" style={{ color: c }}>Experience</h2>
            <div className="h-px flex-1" style={{ backgroundColor: `${c}20` }} />
          </div>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[14px] font-semibold">{exp.role}</h3>
                  <span className="text-[9px] font-sans font-medium uppercase tracking-wider text-[#AAA] shrink-0 ml-3">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-[10.5px] font-sans font-semibold uppercase tracking-wider mb-2" style={{ color: c }}>{exp.company}</p>
                <ul className="space-y-1.5">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-[11px] leading-[1.75] text-[#4A3A2A] flex gap-2.5">
                      <span className="mt-[7px] w-[4px] h-[4px] rounded-full shrink-0" style={{ backgroundColor: `${c}60` }} />
                      <span className="flex-1">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-5">
            <h2 className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] whitespace-nowrap" style={{ color: c }}>Projects</h2>
            <div className="h-px flex-1" style={{ backgroundColor: `${c}20` }} />
          </div>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-[12.5px] font-semibold">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] font-sans text-[#AAA]">{proj.link}</span>}
                </div>
                <p className="text-[11px] text-[#5A4A3A] leading-[1.75]">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom sections */}
      <div className="mt-auto grid grid-cols-3 gap-6 pt-7 border-t" style={{ borderColor: `${c}25` }}>
        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] mb-3" style={{ color: c }}>Education</h2>
            <div className="space-y-3">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <p className="text-[11px] font-semibold leading-tight">{edu.degree}</p>
                  <p className="text-[9.5px] text-[#8A7A6A] mt-0.5">{edu.school}</p>
                  <p className="text-[9.5px] font-semibold mt-0.5" style={{ color: c }}>{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] mb-3" style={{ color: c }}>Skills</h2>
            <div className="space-y-1.5">
              {data.skills.map(s => (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="text-[6px]" style={{ color: c }}>◆</span>
                  <span className="text-[10.5px]">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & References */}
        <div>
          {data.showCertifications && data.certifications.length > 0 && (
            <div className="mb-4">
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] mb-3" style={{ color: c }}>Certifications</h2>
              <div className="space-y-2">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-[10.5px] font-semibold">{cert.name}</p>
                    <p className="text-[9px] text-[#8A7A6A]">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] mb-3" style={{ color: c }}>References</h2>
              <div className="space-y-2">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-[10.5px] font-semibold">{ref.name}</p>
                    <p className="text-[9px] text-[#8A7A6A]">{ref.title} at {ref.company}</p>
                    <p className="text-[9px] text-[#AAA]">{ref.contact}</p>
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
