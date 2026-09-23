import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold uppercase tracking-widest text-[var(--theme-color)] mb-6">
      {children}
    </h2>
  );
}

export default function Caliber({ data }: { data: ResumeData }) {
  const p = data.personalInfo;
  const contactLine = [p.email, p.phone, p.location, p.website].filter(Boolean).join('  •  ');

  return (
    <div className="font-sans w-full max-w-[816px] mx-auto bg-white text-[#1a1a1a] min-h-[1056px] px-16 py-14">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight leading-none mb-3 text-[var(--theme-color)]">
          {p.fullName}
        </h1>
        <p className="text-xl font-semibold text-gray-700 mb-3">{p.jobTitle}</p>
        {contactLine && <p className="text-sm text-gray-500 font-medium">{contactLine}</p>}
      </header>

      {data.summary && (
        <section className="mb-12">
          <p className="text-xl leading-relaxed font-medium text-gray-800">{data.summary}</p>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="mb-12">
          <SectionTitle>Skills</SectionTitle>
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <div className="text-sm font-semibold text-gray-800 mb-2">{skill.name}</div>
                {/* Uniform bars: visual rhythm only, not a proficiency rating */}
                <div className="h-1.5 w-full bg-gray-200 rounded">
                  <div className="h-1.5 w-full bg-[var(--theme-color)] rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="mb-12">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-10">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="text-2xl font-bold leading-tight mb-1">{exp.role}</h3>
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <span className="text-base font-semibold text-[var(--theme-color)]">{exp.company}</span>
                  <span className="text-sm font-semibold text-gray-500 shrink-0">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="mb-12">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="font-bold text-base">{edu.degree}</div>
                <div className="text-sm text-gray-600">{edu.school}</div>
                {edu.graduationYear && (
                  <div className="text-xs font-bold text-gray-400 mt-1">{edu.graduationYear}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects && data.projects.length > 0 && (
        <section className="mb-12">
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-6">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-lg font-bold leading-tight">{proj.name}</h3>
                {proj.link && (
                  <a href={proj.link} className="text-sm text-gray-500 underline break-all">{proj.link}</a>
                )}
                {proj.description && (
                  <p className="text-sm leading-relaxed text-gray-700 mt-1 whitespace-pre-line">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section className="mb-12">
          <SectionTitle>Certifications</SectionTitle>
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <div className="font-bold text-base">{cert.name}</div>
                <div className="text-sm text-gray-600">{cert.issuer}</div>
                {cert.date && <div className="text-xs font-bold text-gray-400 mt-1">{cert.date}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-12">
          <SectionTitle>References</SectionTitle>
          <div className="grid grid-cols-2 gap-6">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <h3 className="font-bold text-base">{ref.name}</h3>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  {ref.title}{ref.title && ref.company ? ' @ ' : ''}{ref.company}
                </div>
                {ref.contact && <div className="text-sm text-gray-500">{ref.contact}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections && data.customSections.length > 0 && data.customSections.map(
        (section) =>
          section.items && section.items.length > 0 && (
            <section key={section.id} className="mb-12">
              <SectionTitle>{section.title}</SectionTitle>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline gap-4">
                      <div>
                        <p className="text-sm font-bold">{item.title}</p>
                        {item.subtitle && <p className="text-sm italic text-gray-600">{item.subtitle}</p>}
                      </div>
                      {item.date && <p className="text-sm font-bold shrink-0">{item.date}</p>}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{item.description}</p>
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
