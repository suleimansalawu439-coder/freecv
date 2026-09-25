import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="flex items-center gap-2 mb-4">
      <span className="w-1.5 h-4" style={{ backgroundColor: 'var(--theme-color)' }} />
      <span className="uppercase text-xs font-bold tracking-widest text-slate-700">{title}</span>
    </h2>
  );
}

export default function Paragon({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto p-[0.85in] font-sans text-slate-800">
      {/* Header */}
      <header className="flex items-stretch gap-8 mb-10">
        <div className="flex-1">
          {data.personalInfo.fullName && (
            <h1 className="text-4xl font-bold text-[#334155] leading-tight">{data.personalInfo.fullName}</h1>
          )}
          {data.personalInfo.jobTitle && (
            <p className="text-lg text-slate-600 mt-1">{data.personalInfo.jobTitle}</p>
          )}
        </div>
        <div className="w-px bg-gray-300 self-stretch" />
        <div className="text-sm text-slate-600 space-y-1.5 pt-1">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </header>

      {/* Profile */}
      {data.summary && (
        <section className="mb-8">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
        </section>
      )}

      {/* Experience — reversed: company first */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Experience" />
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-slate-900">{exp.company}</div>
                {(exp.startDate || exp.endDate) && (
                  <div className="text-sm text-slate-500 whitespace-nowrap">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                  </div>
                )}
              </div>
              {exp.role && <div className="text-sm text-slate-700 mt-0.5">{exp.role}</div>}
              {exp.description && (
                <ul className="mt-2 space-y-1.5">
                  {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                    <li key={i} className="flex text-sm text-slate-700 leading-relaxed">
                      <span className="mr-2 text-slate-500">•</span>
                      <span>{line.trim()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Education" />
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-slate-900">{edu.degree}</div>
                {edu.graduationYear && <div className="text-sm text-slate-500">{edu.graduationYear}</div>}
              </div>
              {edu.school && <div className="text-sm text-slate-700">{edu.school}</div>}
            </div>
          ))}
        </section>
      )}

      {/* Skills — slash separated */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Skills" />
          <p className="font-bold text-sm text-slate-800 leading-relaxed">
            {data.skills.map((s) => s.name).join(' / ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Projects" />
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="font-bold text-slate-900 text-sm">{proj.name}</div>
              {proj.description && <p className="text-sm text-slate-700 mt-0.5">{proj.description}</p>}
              {proj.link && <div className="text-sm text-slate-500">{proj.link}</div>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Certifications" />
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-sm text-slate-900">{cert.name}</div>
                {cert.date && <div className="text-sm text-slate-500">{cert.date}</div>}
              </div>
              {cert.issuer && <div className="text-sm text-slate-700">{cert.issuer}</div>}
            </div>
          ))}
        </section>
      )}

      {/* References */}
      {data.showReferences && data.references.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="References" />
          {data.references.map((ref) => (
            <div key={ref.id} className="mb-2">
              <div className="font-bold text-sm text-slate-900">{ref.name}</div>
              <div className="text-sm text-slate-700">
                {[ref.title, ref.company].filter(Boolean).join(' · ')}
              </div>
              {ref.contact && <div className="text-sm text-slate-500">{ref.contact}</div>}
            </div>
          ))}
        </section>
      )}

      {/* Custom sections */}
      {data.customSections.map((section) =>
        section.items && section.items.length > 0 ? (
          <section key={section.id} className="mb-8">
            <SectionHeader title={section.title} />
            {section.items.map((item) => (
              <div key={item.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-sm text-slate-900">{item.title}</div>
                  {item.date && <div className="text-sm text-slate-500">{item.date}</div>}
                </div>
                {item.subtitle && <div className="text-sm text-slate-700">{item.subtitle}</div>}
                {item.description && <p className="text-sm text-slate-700 mt-0.5">{item.description}</p>}
              </div>
            ))}
          </section>
        ) : null
      )}
    </div>
  );
}
