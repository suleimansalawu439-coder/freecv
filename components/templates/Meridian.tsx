import React from 'react';
import { ResumeData } from '@/app/page';

export default function Meridian({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#0F172A';
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-xl print:shadow-none flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-[#1E293B]">
      {/* Thin colored bar */}
      <div className="w-full h-[5px]" style={{ backgroundColor: c }} />

      <div className="flex-1 p-[0.85in] pt-[0.65in] flex flex-col">
        {/* Header */}
        <header className="mb-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[34px] font-extrabold tracking-tight leading-none mb-2">
                {data.personalInfo.fullName}
              </h1>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: c }}>
                {data.personalInfo.jobTitle}
              </p>
            </div>
            <div className="text-right text-[9.5px] text-[#64748B] leading-relaxed mt-1">
              {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
              {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
              {data.personalInfo.website && <p className="font-semibold" style={{ color: c }}>{data.personalInfo.website}</p>}
            </div>
          </div>
          <div className="mt-5 h-px bg-[#E2E8F0]" />
        </header>

        {/* Summary */}
        {data.summary && (
          <section className="mb-9">
            <div className="flex items-start gap-5">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#CBD5E1] whitespace-nowrap w-[90px] shrink-0 pt-0.5">01</span>
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: c }}>Summary</h2>
                <p className="text-[11px] leading-[1.85] text-[#475569]">{data.summary}</p>
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-9">
            <div className="flex items-start gap-5">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#CBD5E1] whitespace-nowrap w-[90px] shrink-0 pt-0.5">02</span>
              <div className="flex-1">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: c }}>Experience</h2>
                <div className="space-y-7">
                  {data.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-[14px] font-bold">{exp.role}</h3>
                        <span className="text-[9px] font-semibold text-[#94A3B8] uppercase tracking-wider shrink-0 ml-4">
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      <p className="text-[10.5px] font-bold uppercase tracking-wider mb-3" style={{ color: c }}>{exp.company}</p>
                      <ul className="space-y-1.5">
                        {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                          <li key={i} className="text-[11px] leading-[1.75] text-[#475569] flex gap-2.5">
                            <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: c }} />
                            <span className="flex-1">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {data.showProjects && data.projects.length > 0 && (
          <section className="mb-9">
            <div className="flex items-start gap-5">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#CBD5E1] whitespace-nowrap w-[90px] shrink-0 pt-0.5">03</span>
              <div className="flex-1">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-5" style={{ color: c }}>Projects</h2>
                <div className="space-y-4">
                  {data.projects.map(proj => (
                    <div key={proj.id}>
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="text-[12.5px] font-bold">{proj.name}</h3>
                        {proj.link && <span className="text-[9px] text-[#94A3B8]">{proj.link}</span>}
                      </div>
                      <p className="text-[11px] text-[#475569] leading-[1.75]">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bottom: Education, Skills, Certifications, References */}
        <div className="mt-auto pt-7 border-t border-[#E2E8F0]">
          <div className="flex items-start gap-5">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#CBD5E1] whitespace-nowrap w-[90px] shrink-0 pt-0.5">
              {data.showProjects && data.projects.length > 0 ? '04' : '03'}
            </span>
            <div className="flex-1 grid grid-cols-3 gap-8">
              {/* Education */}
              {data.education.length > 0 && (
                <div>
                  <h2 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: c }}>Education</h2>
                  <div className="space-y-3">
                    {data.education.map(edu => (
                      <div key={edu.id}>
                        <p className="text-[11px] font-bold leading-tight">{edu.degree}</p>
                        <p className="text-[9.5px] text-[#94A3B8] mt-0.5">{edu.school}</p>
                        <p className="text-[9px] font-bold mt-0.5" style={{ color: c }}>{edu.graduationYear}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {data.skills.length > 0 && (
                <div>
                  <h2 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: c }}>Skills</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.map(s => (
                      <span
                        key={s.id}
                        className="text-[9px] font-semibold px-2.5 py-1 border"
                        style={{ borderColor: `${c}30`, color: c }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications & References */}
              <div>
                {data.showCertifications && data.certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: c }}>Certifications</h2>
                    <div className="space-y-2">
                      {data.certifications.map(cert => (
                        <div key={cert.id}>
                          <p className="text-[10px] font-bold">{cert.name}</p>
                          <p className="text-[8.5px] text-[#94A3B8]">{cert.issuer} · {cert.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {data.showReferences && data.references.length > 0 && (
                  <div>
                    <h2 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: c }}>References</h2>
                    <div className="space-y-2">
                      {data.references.map(ref => (
                        <div key={ref.id}>
                          <p className="text-[10px] font-bold">{ref.name}</p>
                          <p className="text-[8.5px] text-[#94A3B8]">{ref.title} at {ref.company}</p>
                          <p className="text-[8.5px] text-[#CBD5E1]">{ref.contact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>\n
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
      )}
    </div>
  );
}
