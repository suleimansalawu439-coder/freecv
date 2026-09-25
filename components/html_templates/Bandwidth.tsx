import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">{title}</h2>
  );
}

export default function Bandwidth({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 px-[0.9in] py-[0.8in] mx-auto">
      {/* Header with full-width progress-like bar */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-1">{info.fullName}</h1>
        {info.jobTitle && <p className="text-base text-gray-600 mb-4">{info.jobTitle}</p>}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div className="h-full w-[92%] rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
        </div>
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500">{contactItems.join('  ·  ')}</p>
        )}
      </header>

      {data.summary && (
        <section className="mb-7">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {data.experience.map((exp, ei) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-2">{exp.company}</p>
                {exp.description && (
                  <ul className="space-y-1 pl-4 list-disc marker:text-gray-300 mb-3">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <li key={i} className="text-sm leading-relaxed text-gray-700">
                          {line}
                        </li>
                      ))}
                  </ul>
                )}
                {/* Tenure bar */}
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: 'var(--theme-color)',
                      width: `${88 - (ei % 4) * 12}%`,
                      opacity: 0.55,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Skills" />
          <div className="space-y-3">
            {data.skills.map((skill, i) => (
              <div key={skill.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: 'var(--theme-color)',
                      width: `${62 + ((i * 37) % 34)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                </div>
                <span className="text-xs text-gray-500">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm text-gray-800">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                </p>
                <span className="text-xs text-gray-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) => (
        <section key={section.id} className="mb-7">
          <SectionHeader title={section.title} />
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  {item.date && <span className="text-xs text-gray-500">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                {item.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="References" />
          <div className="space-y-3">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                <p className="text-sm text-gray-600">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-xs text-gray-500">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
