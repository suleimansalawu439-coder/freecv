import React from 'react';
import { ResumeData } from '@/app/page';

export default function Precision({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#374151';
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-xl print:shadow-none p-[0.75in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-[#1F2937]">
      {/* Minimal Header */}
      <header className="mb-6 pb-5 border-b-[2px]" style={{ borderColor: c }}>
        <h1 className="text-[26px] font-extrabold tracking-tight uppercase leading-none mb-1">
          {data.personalInfo.fullName}
        </h1>
        <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#6B7280] mb-4">
          {data.personalInfo.jobTitle}
        </p>
        <div className="grid grid-cols-4 gap-2 text-[9px] font-medium text-[#6B7280]">
          {data.personalInfo.email && (
            <div className="border-l-[2px] pl-2" style={{ borderColor: `${c}40` }}>
              <span className="block text-[7px] font-bold uppercase tracking-wider mb-0.5" style={{ color: c }}>Email</span>
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="border-l-[2px] pl-2" style={{ borderColor: `${c}40` }}>
              <span className="block text-[7px] font-bold uppercase tracking-wider mb-0.5" style={{ color: c }}>Phone</span>
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="border-l-[2px] pl-2" style={{ borderColor: `${c}40` }}>
              <span className="block text-[7px] font-bold uppercase tracking-wider mb-0.5" style={{ color: c }}>Location</span>
              {data.personalInfo.location}
            </div>
          )}
          {data.personalInfo.website && (
            <div className="border-l-[2px] pl-2" style={{ borderColor: `${c}40` }}>
              <span className="block text-[7px] font-bold uppercase tracking-wider mb-0.5" style={{ color: c }}>Web</span>
              {data.personalInfo.website}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6 bg-[#F9FAFB] p-4 border border-[#E5E7EB]">
          <p className="text-[10.5px] leading-[1.8] text-[#4B5563]">{data.summary}</p>
        </div>
      )}

      {/* Experience - Table-like */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[9px] font-extrabold uppercase tracking-[0.3em] mb-4" style={{ color: c }}>Professional Experience</h2>
          <div className="border-t border-[#E5E7EB]">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-b border-[#E5E7EB] py-4 grid grid-cols-[130px_1fr] gap-4">
                <div className="text-[9px] font-mono text-[#9CA3AF] leading-relaxed pt-0.5">
                  <span className="block font-semibold" style={{ color: c }}>{exp.startDate}</span>
                  <span className="block">{exp.endDate}</span>
                </div>
                <div>
                  <h3 className="text-[13px] font-bold leading-tight mb-0.5">{exp.role}</h3>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: c }}>{exp.company}</p>
                  <ul className="space-y-1">
                    {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                      <li key={i} className="text-[10.5px] leading-[1.7] text-[#4B5563] flex gap-2">
                        <span className="text-[#D1D5DB] mt-0.5">—</span>
                        <span className="flex-1">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[9px] font-extrabold uppercase tracking-[0.3em] mb-4" style={{ color: c }}>Projects</h2>
          <div className="border-t border-[#E5E7EB]">
            {data.projects.map(proj => (
              <div key={proj.id} className="border-b border-[#E5E7EB] py-3">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-[12px] font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] font-mono text-[#9CA3AF]">{proj.link}</span>}
                </div>
                <p className="text-[10.5px] text-[#4B5563] leading-[1.7]">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Grid */}
      <div className="mt-auto grid grid-cols-[130px_1fr] gap-4 pt-5 border-t-[2px]" style={{ borderColor: c }}>
        {/* Left column: Education */}
        <div>
          {data.education.length > 0 && (
            <div className="mb-5">
              <h2 className="text-[8px] font-extrabold uppercase tracking-[0.25em] mb-3" style={{ color: c }}>Education</h2>
              <div className="space-y-3">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-[9px] font-mono font-semibold" style={{ color: c }}>{edu.graduationYear}</p>
                    <p className="text-[10px] font-bold leading-tight mt-0.5">{edu.degree}</p>
                    <p className="text-[9px] text-[#9CA3AF]">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Skills, Certifications, References */}
        <div className="grid grid-cols-3 gap-5">
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-[8px] font-extrabold uppercase tracking-[0.25em] mb-3" style={{ color: c }}>Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map(s => (
                  <span key={s.id} className="text-[9px] font-medium bg-[#F3F4F6] px-2 py-0.5 border border-[#E5E7EB]">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-[8px] font-extrabold uppercase tracking-[0.25em] mb-3" style={{ color: c }}>Certifications</h2>
              <div className="space-y-2">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-[10px] font-bold">{cert.name}</p>
                    <p className="text-[8px] text-[#9CA3AF]">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-[8px] font-extrabold uppercase tracking-[0.25em] mb-3" style={{ color: c }}>References</h2>
              <div className="space-y-2">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-[10px] font-bold">{ref.name}</p>
                    <p className="text-[8px] text-[#9CA3AF]">{ref.title} at {ref.company}</p>
                    <p className="text-[8px] text-[#D1D5DB]">{ref.contact}</p>
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
