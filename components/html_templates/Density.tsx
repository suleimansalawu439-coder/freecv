import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[11px] font-bold uppercase tracking-[0.18em] pb-1 mb-3 border-b"
      style={{ color: 'var(--theme-color)', borderColor: 'var(--theme-color)' }}
    >
      {children}
    </h2>
  );
}

export default function Density({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none mx-auto lg:mx-0 shrink-0 font-sans text-gray-900 text-[11px] leading-snug px-[0.65in] py-[0.55in] flex flex-col">
      {/* Two-column header */}
      <header className="flex justify-between items-start gap-6 mb-3">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight leading-none mb-1">
            {data.personalInfo.fullName}
          </h1>
          {data.personalInfo.jobTitle && (
            <p className="text-[12px] font-bold" style={{ color: 'var(--theme-color)' }}>
              {data.personalInfo.jobTitle}
            </p>
          )}
        </div>
        <div className="text-right text-[10px] text-gray-600 font-medium space-y-0.5 shrink-0">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-3">
          <SectionTitle>Summary</SectionTitle>
          <p className="text-gray-800">{data.summary}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-3">
          <SectionTitle>Skills</SectionTitle>
          <div className="grid grid-cols-3 gap-x-6 gap-y-1">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-1.5 text-gray-800">
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--theme-color)' }}
                />
                <span className="font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-3">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <p className="font-bold text-gray-900">
                    {exp.role}
                    {exp.company && (
                      <span className="font-semibold" style={{ color: 'var(--theme-color)' }}>
                        {' '}
                        · {exp.company}
                      </span>
                    )}
                  </p>
                  <span className="text-[10px] font-semibold text-gray-500 whitespace-nowrap">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <ul className="mt-1 space-y-0.5 text-gray-700">
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-gray-400">•</span>
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
        <section className="mb-3">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-1">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <p className="text-gray-900">
                  <strong className="font-bold">{edu.degree}</strong>
                  <span className="text-gray-600"> — {edu.school}</span>
                </p>
                <span className="text-[10px] font-semibold text-gray-500 whitespace-nowrap">
                  {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-3">
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-2">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <p className="font-bold text-gray-900">
                  {proj.name}
                  {proj.link && (
                    <span className="font-normal text-gray-500"> ({proj.link})</span>
                  )}
                </p>
                <p className="text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-3">
          <SectionTitle>Certifications</SectionTitle>
          <div className="space-y-1">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline gap-4">
                <p className="text-gray-900">
                  <strong className="font-bold">{cert.name}</strong>
                  {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                </p>
                {cert.date && (
                  <span className="text-[10px] font-semibold text-gray-500 whitespace-nowrap">
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-3">
          <SectionTitle>References</SectionTitle>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="font-bold text-gray-900">{ref.name}</p>
                <p className="text-gray-600">
                  {ref.title}
                  {ref.company && ` @ ${ref.company}`}
                  {ref.contact && ` · ${ref.contact}`}
                </p>
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
              <section key={section.id} className="mb-3">
                <SectionTitle>{section.title}</SectionTitle>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-4">
                        <p className="font-bold text-gray-900">
                          {item.title}
                          {item.subtitle && (
                            <span className="font-normal italic text-gray-600">
                              {' '}
                              — {item.subtitle}
                            </span>
                          )}
                        </p>
                        {item.date && (
                          <span className="text-[10px] font-semibold text-gray-500 whitespace-nowrap">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
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
