import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const WARM_DARK = '#78350f';
const WARM = '#b45309';

function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 inline-block mb-4">
      {children}
    </span>
  );
}

export default function Kindred({ data }: { data: ResumeData }) {
  const contactItems = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[0.9in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-slate-800 leading-relaxed">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-1" style={{ color: WARM_DARK }}>{data.personalInfo.fullName}</h1>
        {data.personalInfo.jobTitle && (
          <p className="text-lg font-semibold mb-3" style={{ color: WARM }}>{data.personalInfo.jobTitle}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-500">
          {contactItems.map((c, i) => <span key={i}>{c}</span>)}
          {data.personalInfo.website && (
            <a href={data.personalInfo.website} className="font-medium" style={{ color: WARM }}>
              {data.personalInfo.website}
            </a>
          )}
        </div>
      </div>

      {/* Summary — warm left-border quote */}
      {data.summary && (
        <div className="mb-7">
          <SectionPill>Summary</SectionPill>
          <blockquote className="border-l-4 border-amber-300 bg-amber-50/60 rounded-r-2xl pl-5 pr-4 py-3 text-sm text-slate-700 leading-relaxed">
            {data.summary}
          </blockquote>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-7">
          <SectionPill>Experience</SectionPill>
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id} className="bg-amber-50/40 rounded-2xl px-5 py-4">
                <div className="flex justify-between items-baseline gap-4">
                  <div>
                    <p className="text-base font-bold text-slate-900">{exp.role}</p>
                    <p className="text-sm font-semibold" style={{ color: WARM }}>{exp.company}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {exp.description.split(/\n|\r?\n/).filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm text-slate-700 flex gap-2">
                      <span className="text-amber-600">•</span>
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
        <div className="mb-7">
          <SectionPill>Education</SectionPill>
          <div className="space-y-3">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-sm text-slate-600">{edu.school}</p>
                </div>
                {edu.graduationYear && (
                  <span className="text-xs text-slate-500 whitespace-nowrap">{edu.graduationYear}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills — warm pills */}
      {data.skills.length > 0 && (
        <div className="mb-7">
          <SectionPill>Skills</SectionPill>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(s => (
              <span key={s.id} className="rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium px-3.5 py-1.5">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.showCertifications && data.certifications.length > 0 && (
        <div className="mb-7">
          <SectionPill>Certifications</SectionPill>
          <div className="space-y-2.5">
            {data.certifications.map(cert => (
              <div key={cert.id} className="border-l-2 border-amber-300 pl-4">
                <p className="text-sm font-bold text-slate-900">
                  {cert.name}
                  {cert.issuer && <span className="font-normal text-slate-600"> — {cert.issuer}</span>}
                </p>
                {cert.date && <p className="text-xs text-slate-500">{cert.date}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-7">
          <SectionPill>Projects</SectionPill>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <p className="text-sm font-bold text-slate-900">
                  {proj.name}
                  {proj.link && (
                    <a href={proj.link} className="font-normal text-xs ml-2" style={{ color: WARM }}>
                      {proj.link}
                    </a>
                  )}
                </p>
                {proj.description && <p className="text-sm text-slate-700 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {data.showReferences && data.references.length > 0 && (
        <div className="mb-7">
          <SectionPill>References</SectionPill>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="bg-amber-50/40 rounded-2xl px-4 py-3">
                <p className="text-sm font-bold text-slate-900">{ref.name}</p>
                <p className="text-xs text-slate-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs text-slate-500 mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom sections */}
      {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
        section.items.length > 0 && (
          <div key={section.id} className="mb-7">
            <SectionPill>{section.title}</SectionPill>
            <div className="space-y-3">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      {item.subtitle && <p className="text-sm text-amber-800/80">{item.subtitle}</p>}
                    </div>
                    {item.date && <span className="text-xs text-slate-500 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.description && <p className="text-sm text-slate-700 mt-1 whitespace-pre-wrap">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
