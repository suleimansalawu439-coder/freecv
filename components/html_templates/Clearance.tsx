import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Clearance({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
      <span
        className="text-[9px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full"
        style={{ backgroundColor: 'var(--theme-color)' }}
      >
        {title}
      </span>
    </h2>
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-[0.85in] py-[0.75in]">
      {/* Badge-like header */}
      <header className="mb-6 flex items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-bold leading-tight mb-2">{info.fullName}</h1>
          {contactItems.length > 0 && (
            <p className="text-xs text-gray-600">{contactItems.join('  ·  ')}</p>
          )}
        </div>
        {info.jobTitle && (
          <span
            className="text-xs font-bold uppercase tracking-widest text-white px-4 py-2.5 rounded-full whitespace-nowrap"
            style={{ backgroundColor: 'var(--theme-color)' }}
          >
            {info.jobTitle}
          </span>
        )}
      </header>

      {data.summary && (
        <section className="mb-6">
          <SectionHeader title="Summary" />
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[15px] font-bold">{exp.role}</h3>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ color: 'var(--theme-color)', backgroundColor: 'color-mix(in srgb, var(--theme-color) 10%, white)' }}
                  >
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">{exp.company}</p>
                {exp.description && (
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed">{line.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Education" />
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline border-b border-gray-100 pb-2">
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm text-gray-700">{edu.school}</p>
                </div>
                <p className="text-xs text-gray-600">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Projects" />
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id} className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-bold mb-1">{proj.name}{proj.link ? <span className="font-normal text-gray-600"> — {proj.link}</span> : ''}</p>
                <p className="text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Certifications" />
          <div className="flex flex-wrap gap-2">
            {data.certifications.map((cert) => (
              <span key={cert.id} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100">
                {cert.name}{cert.issuer ? ` · ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-3">
            {data.references.map((ref) => (
              <div key={ref.id} className="border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs text-gray-600">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items.length > 0 ? (
          <section key={section.id} className="mb-6">
            <SectionHeader title={section.title} />
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    {item.date && <span className="text-xs text-gray-600">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm text-gray-700">{item.subtitle}</p>}
                  {item.description && <p className="text-sm leading-relaxed">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
