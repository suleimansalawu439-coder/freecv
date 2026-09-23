import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

// Valor — military-to-civilian transition resume.
// Authoritative, clean and respectful: header with name, "Service Record"
// (role, organization, dates, description), "Decorations & Certifications"
// as a prominent list, "Transferable Skills", Education.
// Accent: section titles, rules, award list markers. No gimmicks.

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2
        className="text-base font-black uppercase tracking-[0.22em]"
        style={{ color: 'var(--theme-color)' }}
      >
        {children}
      </h2>
      <div className="mt-2 border-b-2 border-black" aria-hidden="true" />
      <div className="h-0.5 w-24 bg-[var(--theme-color)]" aria-hidden="true" />
    </div>
  );
}

export default function Valor({ data }: { data: ResumeData }) {
  const { personalInfo } = data;

  return (
    <div className="w-full max-w-[816px] mx-auto bg-white text-neutral-900 font-sans p-12 min-h-[1056px]">
      <header className="flex items-center gap-8">
        {personalInfo.profilePicture && (
          <img
            src={personalInfo.profilePicture}
            alt={`Portrait of ${personalInfo.fullName}`}
            className="w-28 h-28 object-cover rounded-full shrink-0 border-2 border-black"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-black uppercase tracking-wide leading-tight">
            {personalInfo.fullName}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-lg font-bold mt-1 text-neutral-700">{personalInfo.jobTitle}</p>
          )}
          <div className="text-sm font-medium text-neutral-600 flex flex-wrap gap-x-3 gap-y-1 mt-3">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && (
              <a
                href={personalInfo.website}
                className="underline font-semibold"
                style={{ color: 'var(--theme-color)' }}
              >
                {personalInfo.website}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Strong double rule */}
      <div className="mt-8 mb-12" aria-hidden="true">
        <div className="h-1.5 bg-black" />
        <div className="h-0.5 mt-1 bg-[var(--theme-color)]" />
      </div>

      <div className="space-y-12">
        {data.summary && (
          <section>
            <SectionTitle>Profile</SectionTitle>
            <p className="text-base leading-relaxed">{data.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section>
            <SectionTitle>Service Record</SectionTitle>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-sm font-bold text-neutral-600">
                      {exp.startDate}
                      {exp.endDate ? ` \u2013 ${exp.endDate}` : ''}
                    </p>
                  </div>
                  <p className="text-base font-semibold uppercase tracking-wide text-neutral-700 mt-0.5">
                    {exp.company}
                  </p>
                  {exp.description && (
                    <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section>
            <SectionTitle>Decorations &amp; Certifications</SectionTitle>
            <ul className="space-y-4">
              {data.certifications.map((cert) => (
                <li key={cert.id} className="flex gap-4 items-start">
                  <span
                    className="text-lg font-black leading-6 shrink-0"
                    style={{ color: 'var(--theme-color)' }}
                    aria-hidden="true"
                  >
                    {'\u2605'}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                      <h3 className="text-base font-bold">{cert.name}</h3>
                      {cert.date && (
                        <p className="text-sm font-bold text-neutral-600">{cert.date}</p>
                      )}
                    </div>
                    {cert.issuer && <p className="text-sm text-neutral-600">{cert.issuer}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section>
            <SectionTitle>Transferable Skills</SectionTitle>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex gap-3 items-start">
                  <span
                    className="inline-block w-2.5 h-2.5 mt-1.5 shrink-0"
                    style={{ backgroundColor: 'var(--theme-color)' }}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold">{skill.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <section>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-base font-bold">{project.name}</h3>
                  {project.description && (
                    <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line mt-1">
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-sm font-semibold underline mt-1 inline-block break-all"
                      style={{ color: 'var(--theme-color)' }}
                    >
                      {project.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-5">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-base font-bold">{edu.degree}</h3>
                  <p className="text-sm text-neutral-600">
                    {edu.school}
                    {edu.graduationYear ? ` \u00B7 ${edu.graduationYear}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <section>
            <SectionTitle>References</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.references.map((ref) => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <h3 className="font-bold text-base">{ref.name}</h3>
                  {(ref.title || ref.company) && (
                    <p className="text-sm text-neutral-600">
                      {ref.title}
                      {ref.title && ref.company ? ' \u2014 ' : ''}
                      {ref.company}
                    </p>
                  )}
                  {ref.contact && <p className="text-sm text-neutral-600">{ref.contact}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections &&
          data.customSections.map(
            (section) =>
              section.items &&
              section.items.length > 0 && (
                <section key={section.id}>
                  <SectionTitle>{section.title}</SectionTitle>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline gap-4">
                          <h3 className="text-base font-bold">{item.title}</h3>
                          {item.date && (
                            <p className="text-sm font-bold text-neutral-600 shrink-0">{item.date}</p>
                          )}
                        </div>
                        {item.subtitle && (
                          <p className="text-sm italic text-neutral-600">{item.subtitle}</p>
                        )}
                        {item.description && (
                          <p className="text-sm text-neutral-700 whitespace-pre-line mt-1">
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
