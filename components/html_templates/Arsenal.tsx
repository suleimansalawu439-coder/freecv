import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <h2
        className="text-sm font-black uppercase tracking-[0.2em] whitespace-nowrap"
        style={{ color: 'var(--theme-color)' }}
      >
        {children}
      </h2>
      <div className="h-[3px] flex-1 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
    </div>
  );
}

export default function Arsenal({ data }: { data: ResumeData }) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  // Flatten every experience bullet into one "Selected Achievements" list.
  const achievements = data.experience.flatMap((exp) =>
    exp.description
      .split(/\n|\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none mx-auto lg:mx-0 shrink-0 font-sans text-gray-900 px-[0.9in] py-[0.7in] flex flex-col">
      {/* Top: name + contact */}
      <header className="mb-8">
        <div className="flex justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight leading-none mb-2">
              {data.personalInfo.fullName}
            </h1>
            {data.personalInfo.jobTitle && (
              <p className="text-base font-bold" style={{ color: 'var(--theme-color)' }}>
                {data.personalInfo.jobTitle}
              </p>
            )}
          </div>
          {contactItems.length > 0 && (
            <div className="text-right text-xs text-gray-600 font-medium space-y-1 shrink-0">
              {contactItems.map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </div>
          )}
        </div>
        {data.summary && (
          <p className="text-sm leading-relaxed text-gray-700 mt-5">{data.summary}</p>
        )}
      </header>

      {/* Core Competencies FIRST */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <SectionTitle>Core Competencies</SectionTitle>
          <div className="grid grid-cols-3 gap-2">
            {data.skills.map((skill) => (
              <div
                key={skill.id}
                className="text-xs font-bold px-3 py-2.5 rounded-lg text-center border border-gray-200 bg-gray-50 text-gray-900"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Selected Achievements — flattened bullets */}
      {achievements.length > 0 && (
        <section className="mb-8">
          <SectionTitle>Selected Achievements</SectionTitle>
          <ul className="space-y-2 text-sm text-gray-800 leading-relaxed">
            {achievements.map((line, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-black shrink-0" style={{ color: 'var(--theme-color)' }}>
                  ▸
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Brief Employment History — one line each */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <SectionTitle>Employment History</SectionTitle>
          <div className="space-y-2">
            {data.experience.map((exp) => (
              <div key={exp.id} className="flex justify-between items-baseline text-sm gap-4">
                <p className="text-gray-900">
                  <strong className="font-bold">{exp.company}</strong>
                  {exp.role && <span className="text-gray-600"> — {exp.role}</span>}
                </p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-8">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <p className="text-sm text-gray-900">
                  <strong className="font-bold">{edu.degree}</strong>
                  <span className="text-gray-600"> — {edu.school}</span>
                </p>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                  {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
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
        <section className="mb-8">
          <SectionTitle>Certifications</SectionTitle>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-sm gap-4">
                <p className="text-gray-900">
                  <strong className="font-bold">{cert.name}</strong>
                  {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                </p>
                {cert.date && (
                  <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-8">
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
              <section key={section.id} className="mb-8">
                <SectionTitle>{section.title}</SectionTitle>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-4">
                        <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                        {item.date && (
                          <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
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
  );
}
