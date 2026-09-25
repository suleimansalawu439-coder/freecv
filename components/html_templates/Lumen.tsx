import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const THEME_VAR = 'var(--theme-color)';
const GLOW = { boxShadow: `0 0 24px ${THEME_VAR}33` } as React.CSSProperties;

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <span
        className="inline-block rounded-full bg-white px-5 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
        style={{ color: THEME_VAR, ...GLOW }}
      >
        {children}
      </span>
    </div>
  );
}

export default function Lumen({ data }: { data: ResumeData }) {
  const contactItems = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-12 flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-slate-800 leading-relaxed">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-1.5">{data.personalInfo.fullName}</h1>
        {data.personalInfo.jobTitle && (
          <p className="text-lg font-medium tracking-wide mb-4" style={{ color: THEME_VAR }}>
            {data.personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
          {contactItems.map((c, i) => <span key={i}>{c}</span>)}
          {data.personalInfo.website && (
            <a href={data.personalInfo.website} className="font-medium" style={{ color: THEME_VAR }}>
              {data.personalInfo.website}
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-9">
          <SectionHeader>Summary</SectionHeader>
          <p className="text-[15px] text-slate-500 leading-loose">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-9">
          <SectionHeader>Experience</SectionHeader>
          <div className="divide-y divide-gray-100">
            {data.experience.map(exp => (
              <div key={exp.id} className="py-5 first:pt-0 last:pb-0">
                <div className="flex justify-between items-baseline gap-4 mb-0.5">
                  <p className="text-base font-semibold text-slate-900">{exp.role}</p>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: THEME_VAR }}>{exp.company}</p>
                <ul className="space-y-1.5">
                  {exp.description.split(/\n|\r?\n/).filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm text-slate-600 flex gap-2.5">
                      <span className="text-slate-300">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-9">
          <SectionHeader>Education</SectionHeader>
          <div className="space-y-3">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{edu.degree}</p>
                  <p className="text-sm text-slate-500">{edu.school}</p>
                </div>
                {edu.graduationYear && (
                  <span className="text-xs text-slate-400 whitespace-nowrap">{edu.graduationYear}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills — glow chips */}
      {data.skills.length > 0 && (
        <div className="mb-9">
          <SectionHeader>Skills</SectionHeader>
          <div className="flex flex-wrap gap-2.5">
            {data.skills.map(s => (
              <span
                key={s.id}
                className="rounded-full bg-white border border-gray-100 px-4 py-1.5 text-xs font-medium shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
                style={{ color: THEME_VAR }}
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.showCertifications && data.certifications.length > 0 && (
        <div className="mb-9">
          <SectionHeader>Certifications</SectionHeader>
          <div className="space-y-3">
            {data.certifications.map(cert => (
              <div key={cert.id} className="flex justify-between items-baseline gap-4">
                <p className="text-sm font-semibold text-slate-900">
                  {cert.name}
                  {cert.issuer && <span className="font-normal text-slate-500"> · {cert.issuer}</span>}
                </p>
                {cert.date && <span className="text-xs text-slate-400 whitespace-nowrap">{cert.date}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-9">
          <SectionHeader>Projects</SectionHeader>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <p className="text-sm font-semibold text-slate-900">
                  {proj.name}
                  {proj.link && (
                    <a href={proj.link} className="font-normal text-xs ml-2" style={{ color: THEME_VAR }}>
                      {proj.link}
                    </a>
                  )}
                </p>
                {proj.description && <p className="text-sm text-slate-600 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {data.showReferences && data.references.length > 0 && (
        <div className="mb-9">
          <SectionHeader>References</SectionHeader>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {data.references.map(ref => (
              <div key={ref.id}>
                <p className="text-sm font-semibold text-slate-900">{ref.name}</p>
                <p className="text-xs text-slate-500">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs text-slate-400 mt-0.5">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom sections */}
      {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
        section.items.length > 0 && (
          <div key={section.id} className="mb-9">
            <SectionHeader>{section.title}</SectionHeader>
            <div className="space-y-3">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      {item.subtitle && <p className="text-sm text-slate-500">{item.subtitle}</p>}
                    </div>
                    {item.date && <span className="text-xs text-slate-400 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.description && <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
