import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Diplomat({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#1e3a5f';
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-[#FDFDFC] shadow-xl print:shadow-none p-[0.85in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-[#1C1C1C]">
      {/* Centered Header with Photo */}
      <header className="text-center mb-8 pb-8 border-b" style={{ borderColor: `${c}30` }}>
        {data.personalInfo.profilePicture && (
          <img
            src={data.personalInfo.profilePicture}
            alt="Profile"
            className="w-[1.3in] h-[1.3in] rounded-full object-cover mx-auto mb-5 shadow-sm"
            style={{ border: `3px solid ${c}` }}
          />
        )}
        <h1 className="text-[32px] font-normal tracking-[0.15em] uppercase mb-2" style={{ color: c }}>
          {data.personalInfo.fullName}
        </h1>
        <p className="text-sm tracking-[0.25em] uppercase text-[#666] font-sans font-medium mb-5">
          {data.personalInfo.jobTitle}
        </p>
        <div className="flex justify-center items-center gap-6 text-[10px] font-sans text-[#777] tracking-wide">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.email && data.personalInfo.phone && <span style={{ color: c }}>|</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.phone && data.personalInfo.location && <span style={{ color: c }}>|</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.location && data.personalInfo.website && <span style={{ color: c }}>|</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8 text-center max-w-[5.5in] mx-auto">
          <p className="text-[11.5px] leading-[1.8] text-[#555] italic">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-center mb-6" style={{ color: c }}>
            Professional Experience
          </h2>
          <div className="w-12 h-px mx-auto mb-6" style={{ backgroundColor: c }} />
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <h3 className="text-[15px] font-semibold">{exp.role}</h3>
                  <span className="text-[9px] font-sans font-semibold uppercase tracking-wider text-[#999] shrink-0 ml-4">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-[11px] font-sans font-semibold uppercase tracking-wider mb-2" style={{ color: c }}>
                  {exp.company}
                </p>
                <ul className="space-y-1.5">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-[11.5px] leading-[1.7] text-[#444] flex gap-3">
                      <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: c }} />
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
          <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-center mb-6" style={{ color: c }}>
            Notable Projects
          </h2>
          <div className="w-12 h-px mx-auto mb-6" style={{ backgroundColor: c }} />
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-[13px] font-semibold">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] font-sans text-[#999]">{proj.link}</span>}
                </div>
                <p className="text-[11px] text-[#555] leading-[1.7]">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Grid: Education, Skills, Certifications, References */}
      <div className="mt-auto pt-8 border-t" style={{ borderColor: `${c}30` }}>
        <div className="grid grid-cols-3 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-4" style={{ color: c }}>Education</h2>
              <div className="space-y-3">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-[12px] font-semibold leading-tight">{edu.degree}</p>
                    <p className="text-[10px] text-[#777] mt-0.5">{edu.school}</p>
                    <p className="text-[10px] font-semibold mt-0.5" style={{ color: c }}>{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-4" style={{ color: c }}>Core Expertise</h2>
              <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                {data.skills.map(s => (
                  <span key={s.id} className="text-[10px] font-sans font-medium px-2 py-0.5 border" style={{ borderColor: `${c}40`, color: c }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications or References */}
          <div>
            {data.showCertifications && data.certifications.length > 0 && (
              <div className="mb-4">
                <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-4" style={{ color: c }}>Certifications</h2>
                <div className="space-y-2">
                  {data.certifications.map(cert => (
                    <div key={cert.id}>
                      <p className="text-[11px] font-semibold">{cert.name}</p>
                      <p className="text-[9px] text-[#777]">{cert.issuer} · {cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.showReferences && data.references.length > 0 && (
              <div>
                <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-4" style={{ color: c }}>References</h2>
                <div className="space-y-2">
                  {data.references.map(ref => (
                    <div key={ref.id}>
                      <p className="text-[11px] font-semibold">{ref.name}</p>
                      <p className="text-[9px] text-[#777]">{ref.title} at {ref.company}</p>
                      <p className="text-[9px] text-[#999]">{ref.contact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
