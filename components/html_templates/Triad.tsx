import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

/** Append an alpha channel to a hex color (handles #rgb and #rrggbb). */
function withAlpha(hex: string | undefined, alpha: string): string {
  const fallback = '#2563eb';
  const h = (hex || fallback).replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return `#${full}${alpha}`;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
      style={{ color: 'var(--theme-color)' }}
    >
      {children}
    </h2>
  );
}

export default function Triad({ data }: { data: ResumeData }) {
  const bandBg = withAlpha(data.theme?.color, '14'); // theme color at ~8% opacity
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none mx-auto lg:mx-0 shrink-0 font-sans text-gray-900 flex flex-col">
      {/* Zone 1 — white header */}
      <div className="px-[0.9in] pt-[0.7in] pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight leading-none mb-2">
          {data.personalInfo.fullName}
        </h1>
        {data.personalInfo.jobTitle && (
          <p className="text-lg font-medium mb-4" style={{ color: 'var(--theme-color)' }}>
            {data.personalInfo.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500 font-medium">
            {contactItems.map((item, i) => (
              <span key={i}>
                {item}
                {i < contactItems.length - 1 && <span className="mx-2 text-gray-300">•</span>}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Zone 2 — tinted band: summary + skills */}
      {(data.summary || data.skills.length > 0) && (
        <div className="px-[0.9in] py-8" style={{ backgroundColor: bandBg }}>
          {data.summary && (
            <div className="mb-6">
              <SectionTitle>Summary</SectionTitle>
              <p className="text-sm leading-relaxed text-gray-800">{data.summary}</p>
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <SectionTitle>Skills</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-800"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Zone 3 — white main zone */}
      <div className="px-[0.9in] py-8 space-y-8 flex-1">
        {data.experience.length > 0 && (
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-4">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold mb-2" style={{ color: 'var(--theme-color)' }}>
                    {exp.company}
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
                    <div className="text-sm text-gray-600">{edu.school}</div>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-4">
                    {edu.graduationYear}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-bold text-sm text-gray-900">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline text-sm">
                  <div>
                    <span className="font-bold text-gray-900">{cert.name}</span>
                    {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                  </div>
                  {cert.date && (
                    <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-4">
                      {cert.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <section>
            <SectionTitle>References</SectionTitle>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <h3 className="font-bold text-sm text-gray-900">{ref.name}</h3>
                  <div className="text-xs text-gray-600 font-medium">
                    {ref.title}
                    {ref.company && ` @ ${ref.company}`}
                  </div>
                  {ref.contact && <div className="text-xs text-gray-500 mt-1">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map(
            (section) =>
              section.items.length > 0 && (
                <section key={section.id}>
                  <SectionTitle>{section.title}</SectionTitle>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                          {item.date && (
                            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-4">
                              {item.date}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-sm italic text-gray-600">{item.subtitle}</div>
                        )}
                        {item.description && (
                          <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )
          )}
      </div>
    </div>
  );
}
