import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

// Rainmaker — sales metrics-forward resume.
// Bold header with a "track record" strip (the summary as a lead paragraph),
// experience entries with role + company in large bold type and description
// lines given hanging-indent emphasis (metrics live in the user's own bullet
// text — never invented), skills as "Core Competencies" in a 2-col grid.
// Accent: header rule, KPI-style section labels, competency grid markers.

const BULLET_LEAD = /^[•\-*▪◦›→»]/;

function DescriptionLines({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const hasBullet = BULLET_LEAD.test(line.trimStart());
        return (
          <div key={i} className="flex gap-3 items-start">
            {!hasBullet && (
              <span
                className="font-black shrink-0 leading-relaxed"
                style={{ color: 'var(--theme-color)' }}
                aria-hidden="true"
              >
                {'\u25B8'}
              </span>
            )}
            <p className={`text-sm leading-relaxed text-neutral-700 ${hasBullet ? 'w-full' : 'flex-1'}`}>
              {line}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6">
      <span
        className="inline-block px-4 py-1.5 text-sm font-black uppercase tracking-[0.25em] text-white"
        style={{ backgroundColor: 'var(--theme-color)' }}
      >
        {children}
      </span>
    </h2>
  );
}

export default function Rainmaker({ data }: { data: ResumeData }) {
  const { personalInfo } = data;

  return (
    <div className="w-full max-w-[816px] mx-auto bg-white text-neutral-900 font-sans p-12 min-h-[1056px]">
      {orderSections(data, {
        personal: (
          <header>
            <div className="flex items-start gap-8">
              {personalInfo.profilePicture && (
                <img
                  src={personalInfo.profilePicture}
                  alt={`Portrait of ${personalInfo.fullName}`}
                  className="w-28 h-28 rounded-full object-cover shrink-0"
                />
              )}
              <div className="flex-1">
                <h1 className="text-6xl font-black tracking-tight leading-none">
                  {personalInfo.fullName}
                </h1>
                {personalInfo.jobTitle && (
                  <p className="text-xl font-bold mt-3 text-neutral-700">{personalInfo.jobTitle}</p>
                )}
              </div>
            </div>

            {/* Thick accent header rule */}
            <div className="h-1.5 mt-8 bg-[var(--theme-color)]" aria-hidden="true" />

            <div className="text-sm font-medium text-neutral-600 flex flex-wrap gap-x-3 gap-y-1 mt-4">
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

            {data.summary && (
              <div
                className="mt-8 border-l-4 pl-6 py-1"
                style={{ borderColor: 'var(--theme-color)' }}
              >
                <p className="text-xs font-black uppercase tracking-[0.3em] text-neutral-500 mb-2">
                  Track Record
                </p>
                <p className="text-lg leading-relaxed font-medium">{data.summary}</p>
              </div>
            )}
          </header>
        ),

        experience: data.experience && data.experience.length > 0 && (
        <section className="mt-12">
            <SectionLabel>Experience</SectionLabel>
            <div className="space-y-9">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="text-2xl font-black leading-tight">{exp.role}</h3>
                    <p
                      className="text-sm font-black"
                      style={{ color: 'var(--theme-color)' }}
                    >
                      {exp.startDate}
                      {exp.endDate ? ` \u2013 ${exp.endDate}` : ''}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-neutral-700 mt-0.5">{exp.company}</p>
                  {exp.description && (
                    <div className="mt-3">
                      <DescriptionLines text={exp.description} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          skills: data.skills && data.skills.length > 0 && (
          <section className="mt-12">
            <SectionLabel>Core Competencies</SectionLabel>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex gap-3 items-start">
                  <span
                    className="inline-block w-2.5 h-2.5 mt-1.5 rotate-45 shrink-0"
                    style={{ backgroundColor: 'var(--theme-color)' }}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-bold">{skill.name}</p>
                </div>
              ))}
            </div>
          </section>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <section className="mt-12">
            <SectionLabel>Projects</SectionLabel>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-base font-black">{project.name}</h3>
                  {project.description && (
                    <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line mt-1">
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-sm font-bold underline mt-1 inline-block break-all"
                      style={{ color: 'var(--theme-color)' }}
                    >
                      {project.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section className="mt-12">
            <SectionLabel>Certifications</SectionLabel>
            <div className="space-y-4">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline gap-4">
                  <div>
                    <h3 className="text-base font-black">{cert.name}</h3>
                    {cert.issuer && <p className="text-sm text-neutral-600">{cert.issuer}</p>}
                  </div>
                  {cert.date && (
                    <p className="text-sm font-bold text-neutral-600 shrink-0">{cert.date}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          education: data.education && data.education.length > 0 && (
          <section className="mt-12">
            <SectionLabel>Education</SectionLabel>
            <div className="space-y-5">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-base font-black">{edu.degree}</h3>
                  <p className="text-sm text-neutral-600">
                    {edu.school}
                    {edu.graduationYear ? ` \u00B7 ${edu.graduationYear}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </section>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <section className="mt-12">
            <SectionLabel>References</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.references.map((ref) => (
                <div
                  key={ref.id}
                  className="border-l-4 pl-4"
                  style={{ borderColor: 'var(--theme-color)' }}
                >
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
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
                <section key={section.id} className="mt-12">
                  <SectionLabel>{section.title}</SectionLabel>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline gap-4">
                          <h3 className="text-base font-black">{item.title}</h3>
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
            ))
        )}
    </div>
  );
}
