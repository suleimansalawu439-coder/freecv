import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

// Maitre — hospitality / service resume.
// Warm, elegant and welcoming: centered header with name + job title,
// hairline rules, venues shown prominently with the role beneath,
// certifications as a visible badge row, skills as service tags.
// Accent: headings, badges, hairline rules.

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-300" aria-hidden="true" />
        <h2
          className="text-xl font-serif font-bold uppercase tracking-[0.25em]"
          style={{ color: 'var(--theme-color)' }}
        >
          {children}
        </h2>
        <div className="h-px flex-1 bg-neutral-300" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function Maitre({ data }: { data: ResumeData }) {
  const { personalInfo } = data;

  return (
    <div className="w-full max-w-[816px] mx-auto bg-[#fdfbf7] text-neutral-900 font-sans p-12 min-h-[1056px]">
      <header className="text-center">
        {personalInfo.profilePicture && (
          <img
            src={personalInfo.profilePicture}
            alt={`Portrait of ${personalInfo.fullName}`}
            className="w-28 h-28 rounded-full object-cover mx-auto mb-6"
            style={{ border: '3px solid var(--theme-color)' }}
          />
        )}
        <h1 className="font-serif text-5xl font-bold tracking-tight">{personalInfo.fullName}</h1>
        {personalInfo.jobTitle && (
          <p className="text-xl italic mt-3 text-neutral-700">{personalInfo.jobTitle}</p>
        )}

        <div className="flex items-center gap-4 mt-8 mb-8">
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--theme-color)' }} aria-hidden="true" />
          <div className="w-2 h-2 rotate-45" style={{ backgroundColor: 'var(--theme-color)' }} aria-hidden="true" />
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--theme-color)' }} aria-hidden="true" />
        </div>

        <div className="text-sm font-medium text-neutral-700 flex flex-wrap justify-center gap-x-3 gap-y-1">
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
      </header>

      <div className="space-y-12 mt-12">
        {data.summary && (
          <section>
            <SectionTitle>Profile</SectionTitle>
            <p className="text-base leading-relaxed text-center max-w-2xl mx-auto italic">
              {data.summary}
            </p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-9">
              {data.experience.map((exp) => (
                <div key={exp.id} className="text-center max-w-2xl mx-auto">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="text-2xl font-serif font-bold flex-1 text-left">
                      {exp.company}
                    </h3>
                    <p className="text-sm font-semibold text-neutral-500">
                      {exp.startDate}
                      {exp.endDate ? ` \u2013 ${exp.endDate}` : ''}
                    </p>
                  </div>
                  <p className="text-lg font-medium mt-1 text-left">{exp.role}</p>
                  <div
                    className="w-10 h-0.5 my-3"
                    style={{ backgroundColor: 'var(--theme-color)' }}
                    aria-hidden="true"
                  />
                  {exp.description && (
                    <p className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line text-left">
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
            <SectionTitle>Certifications</SectionTitle>
            <div className="flex flex-wrap justify-center gap-3">
              {data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="border-2 rounded-full px-5 py-2.5 text-center"
                  style={{ borderColor: 'var(--theme-color)' }}
                >
                  <p className="text-sm font-bold" style={{ color: 'var(--theme-color)' }}>
                    {cert.name}
                  </p>
                  {(cert.issuer || cert.date) && (
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {cert.issuer}
                      {cert.issuer && cert.date ? ' \u00B7 ' : ''}
                      {cert.date}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-wrap justify-center gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-sm font-medium bg-neutral-100 border border-neutral-300 px-3 py-1.5"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <section>
            <SectionTitle>Selected Work</SectionTitle>
            <div className="space-y-7 max-w-2xl mx-auto">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-serif text-lg font-bold">{project.name}</h3>
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
            <div className="space-y-5 max-w-2xl mx-auto">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-center">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {data.references.map((ref) => (
                <div key={ref.id} className="text-center">
                  <h3 className="font-bold text-base">{ref.name}</h3>
                  {(ref.title || ref.company) && (
                    <p className="text-sm text-neutral-600">
                      {ref.title}
                      {ref.title && ref.company ? ', ' : ''}
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
                  <div className="space-y-4 max-w-2xl mx-auto">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline gap-4">
                          <h3 className="text-base font-bold">{item.title}</h3>
                          {item.date && (
                            <p className="text-sm font-semibold text-neutral-500 shrink-0">
                              {item.date}
                            </p>
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
