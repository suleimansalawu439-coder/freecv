import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

// Ember carries its own warm identity — the accent is fixed terracotta,
// deliberately independent of the user's theme color.
const EMBER = '#c2410c';
const EMBER_TINT = '#c2410c1f'; // ~12% terracotta
const EMBER_DEEP = '#7c2d12';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="font-serif italic text-xl font-bold mb-2" style={{ color: EMBER }}>
        {children}
      </h2>
      <div className="h-px w-full bg-gray-200" />
    </div>
  );
}

export default function Ember({ data }: { data: ResumeData }) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none mx-auto lg:mx-0 shrink-0 font-sans text-gray-900 px-[0.9in] py-[0.7in] flex flex-col">
      {/* Masthead */}
      <header className="text-center mb-8">
        <h1 className="font-serif text-5xl font-bold tracking-tight leading-none mb-3 text-gray-900">
          {data.personalInfo.fullName}
        </h1>
        {data.personalInfo.jobTitle && (
          <p
            className="font-serif italic text-lg mb-4"
            style={{ color: EMBER }}
          >
            {data.personalInfo.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500 font-medium">
            {contactItems.map((item, i) => (
              <span key={i}>
                {item}
                {i < contactItems.length - 1 && <span className="mx-2">·</span>}
              </span>
            ))}
          </p>
        )}
      </header>

      {/* Pull-quote summary */}
      {data.summary && (
        <blockquote
          className="border-l-4 pl-6 py-1 mb-10"
          style={{ borderColor: EMBER }}
        >
          <p className="font-serif italic text-xl leading-relaxed text-gray-800">{data.summary}</p>
        </blockquote>
      )}

      {data.skills.length > 0 && (
        <section className="mb-10">
          <SectionHeading>Capabilities</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-bold px-4 py-2 rounded-full"
                style={{ backgroundColor: EMBER_TINT, color: EMBER_DEEP }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-10">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-7">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-serif text-lg font-bold text-gray-900">{exp.role}</h3>
                  <span className="font-serif italic text-sm text-gray-500 whitespace-nowrap ml-6">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-3" style={{ color: EMBER }}>
                  {exp.company}
                </p>
                <ul className="space-y-1.5 text-sm text-gray-700 leading-relaxed">
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="font-bold" style={{ color: EMBER }}>
                          ◆
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-10">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-serif text-base font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-600 italic">{edu.school}</p>
                </div>
                <span className="font-serif italic text-sm text-gray-500 whitespace-nowrap ml-6">
                  {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-10">
          <SectionHeading>Selected Work</SectionHeading>
          <div className="space-y-5">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-serif text-base font-bold text-gray-900 mb-1">
                  {proj.name}
                  {proj.link && (
                    <span className="font-sans text-xs font-normal italic text-gray-500">
                      {' '}
                      — {proj.link}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-10">
          <SectionHeading>Certifications</SectionHeading>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-sm">
                <p>
                  <strong className="font-serif font-bold text-gray-900">{cert.name}</strong>
                  {cert.issuer && <span className="text-gray-600 italic">, {cert.issuer}</span>}
                </p>
                {cert.date && (
                  <span className="font-serif italic text-sm text-gray-500 whitespace-nowrap ml-6">
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-10">
          <SectionHeading>References</SectionHeading>
          <div className="grid grid-cols-2 gap-6">
            {data.references.map((ref) => (
              <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: EMBER }}>
                <h3 className="font-serif text-base font-bold text-gray-900">{ref.name}</h3>
                <p className="text-xs text-gray-600 italic mt-1">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-xs text-gray-500 mt-1">{ref.contact}</p>}
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
              <section key={section.id} className="mb-10">
                <SectionHeading>{section.title}</SectionHeading>
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-serif text-base font-bold text-gray-900">{item.title}</h3>
                        {item.date && (
                          <span className="font-serif italic text-sm text-gray-500 whitespace-nowrap ml-6">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-sm italic text-gray-600">{item.subtitle}</p>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap leading-relaxed">
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
  );
}
