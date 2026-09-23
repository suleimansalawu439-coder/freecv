import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

// Gigfolio — gig / freelance hybrid resume.
// Order: header, Profile, Client Engagements (experience framed as client
// work), Selected Work (projects with prominent links), Services (skills
// as tags), Education, Certifications. Accent: section titles, tags, rules.

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2
        className="text-lg font-extrabold uppercase tracking-[0.2em]"
        style={{ color: 'var(--theme-color)' }}
      >
        {children}
      </h2>
      <div className="h-0.5 mt-2 bg-[var(--theme-color)]" aria-hidden="true" />
    </div>
  );
}

export default function Gigfolio({ data }: { data: ResumeData }) {
  const { personalInfo } = data;

  return (
    <div className="w-full max-w-[816px] mx-auto bg-white text-neutral-900 font-sans p-12 min-h-[1056px]">
      {/* Accent top bar */}
      <div className="h-2 mb-10 bg-[var(--theme-color)]" aria-hidden="true" />

      <header className="flex items-start gap-8 mb-4">
        {personalInfo.profilePicture && (
          <img
            src={personalInfo.profilePicture}
            alt={`Portrait of ${personalInfo.fullName}`}
            className="w-28 h-28 rounded-xl object-cover shrink-0"
          />
        )}
        <div className="flex-1">
          <h1 className="text-6xl font-black tracking-tight leading-none">{personalInfo.fullName}</h1>
          {personalInfo.jobTitle && (
            <p className="text-xl font-bold mt-3" style={{ color: 'var(--theme-color)' }}>
              {personalInfo.jobTitle}
            </p>
          )}
        </div>
      </header>

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

      <div className="space-y-12 mt-12">
        {data.summary && (
          <section>
            <SectionTitle>Profile</SectionTitle>
            <p className="text-base leading-relaxed">{data.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section>
            <SectionTitle>Client Engagements</SectionTitle>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    <p className="text-xs font-bold text-neutral-500">
                      {exp.startDate}
                      {exp.endDate ? ` \u2013 ${exp.endDate}` : ''}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-widest mt-2 text-neutral-400">
                      Client
                    </p>
                    <p className="text-sm font-bold">{exp.company}</p>
                  </div>
                  <div className="col-span-9">
                    <h3 className="text-xl font-bold leading-tight">{exp.role}</h3>
                    {exp.description && (
                      <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line mt-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <section>
            <SectionTitle>Selected Work</SectionTitle>
            <div className="space-y-8">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-xl font-bold leading-tight">{project.name}</h3>
                  {project.description && (
                    <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line mt-2">
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className="inline-block text-sm font-bold underline mt-2 break-all"
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

        {data.skills && data.skills.length > 0 && (
          <section>
            <SectionTitle>Services</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-sm font-bold px-3 py-1.5 rounded-full text-white"
                  style={{ backgroundColor: 'var(--theme-color)' }}
                >
                  {skill.name}
                </span>
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

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <div className="space-y-4">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline gap-4">
                  <div>
                    <h3 className="text-base font-bold">{cert.name}</h3>
                    {cert.issuer && <p className="text-sm text-neutral-600">{cert.issuer}</p>}
                  </div>
                  {cert.date && (
                    <p className="text-sm font-bold text-neutral-500 shrink-0">{cert.date}</p>
                  )}
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
                      {ref.title && ref.company ? ' @ ' : ''}
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
                            <p className="text-sm font-bold text-neutral-500 shrink-0">{item.date}</p>
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
