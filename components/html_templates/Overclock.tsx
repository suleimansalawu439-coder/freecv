import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2
      className="text-base font-black italic uppercase tracking-wide mb-4"
      style={{ color: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );
}

export default function Overclock({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 px-[0.9in] py-[0.8in] mx-auto overflow-hidden">
      {/* Huge italic bold name, slightly skewed */}
      <header className="mb-8">
        <h1
          className="text-6xl font-black italic tracking-tight text-gray-900 leading-none mb-3"
          style={{ transform: 'skewX(-4deg)' }}
        >
          {info.fullName}
        </h1>
        {info.jobTitle && (
          <p
            className="text-lg font-bold italic"
            style={{ color: 'var(--theme-color)', transform: 'skewX(-4deg)' }}
          >
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500 mt-3 italic">{contactItems.join('  ·  ')}</p>
        )}
      </header>

      {data.summary && (
        <section className="mb-8">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-gray-700 italic">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {data.experience.map((exp, ei) => (
              <div key={exp.id} className={ei % 2 === 1 ? 'ml-8' : ''}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold italic text-gray-900">{exp.role}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4 italic">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p
                  className="text-sm font-bold italic mb-2"
                  style={{ color: 'var(--theme-color)' }}
                >
                  {exp.company}
                </p>
                {exp.description && (
                  <ul className="space-y-1 pl-4 list-disc marker:text-gray-300">
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
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-bold italic text-white px-3 py-1.5 rounded"
                style={{ backgroundColor: 'var(--theme-color)', transform: 'skewX(-8deg)' }}
              >
                <span className="inline-block" style={{ transform: 'skewX(8deg)' }}>
                  {skill.name}
                </span>
              </span>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu, ei) => (
              <div
                key={edu.id}
                className={`flex justify-between items-baseline ${ei % 2 === 1 ? 'ml-8' : ''}`}
              >
                <div>
                  <p className="text-sm font-bold italic text-gray-900">{edu.degree}</p>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                </div>
                <span className="text-xs text-gray-500 italic">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj, pi) => (
              <div key={proj.id} className={pi % 2 === 1 ? 'ml-8' : ''}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold italic text-gray-900">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm text-gray-800">
                  <span className="font-bold italic">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                </p>
                <span className="text-xs text-gray-500 italic">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) => (
        <section key={section.id} className="mb-8">
          <SectionHeader title={section.title} />
          <div className="space-y-4">
            {section.items.map((item, ii) => (
              <div key={item.id} className={ii % 2 === 1 ? 'ml-8' : ''}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold italic text-gray-900">{item.title}</h3>
                  {item.date && <span className="text-xs text-gray-500 italic">{item.date}</span>}
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
        <section className="mb-8">
          <SectionHeader title="References" />
          <div className="space-y-3">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold italic text-gray-900">{ref.name}</p>
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
