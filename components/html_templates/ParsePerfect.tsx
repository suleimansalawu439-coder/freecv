import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function ParsePerfect({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contact = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean).join(' | ');

  const heading = 'text-lg font-bold uppercase border-b-2 pb-1 mb-4 text-black';

  return (
    <div className="font-sans w-full max-w-[816px] mx-auto bg-white text-black min-h-[1056px] p-12">
      {/* Name + contact line — plain black */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-black">{pi.fullName}</h1>
        {pi.jobTitle && <p className="text-base font-bold text-black mt-1">{pi.jobTitle}</p>}
        {contact && <p className="text-sm text-black mt-2">{contact}</p>}
      </header>

      {data.summary && (
        <section className="mb-7">
          <h2 className={heading} style={{ borderColor: 'var(--theme-color)' }}>
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-black">{data.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="mb-7">
          <h2 className={heading} style={{ borderColor: 'var(--theme-color)' }}>
            Work Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-base font-bold text-black">{exp.role}</h3>
                  <span className="text-sm text-black whitespace-nowrap">
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' - ' : ''}
                    {exp.endDate}
                  </span>
                </div>
                <div className="text-sm font-bold text-black">{exp.company}</div>
                {exp.description && (
                  <p className="mt-1 text-sm leading-relaxed text-black whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section className="mb-7">
          <h2 className={heading} style={{ borderColor: 'var(--theme-color)' }}>
            Certifications &amp; Licenses
          </h2>
          <div className="space-y-2">
            {data.certifications.map(cert => (
              <div key={cert.id} className="text-sm text-black">
                <span className="font-bold">{cert.name}</span>
                {cert.issuer && <span> - {cert.issuer}</span>}
                {cert.date && <span> ({cert.date})</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="mb-7">
          <h2 className={heading} style={{ borderColor: 'var(--theme-color)' }}>
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <div className="text-sm text-black">
                  <span className="font-bold">{edu.degree}</span>
                  {edu.school && <span> - {edu.school}</span>}
                </div>
                {edu.graduationYear && (
                  <div className="text-sm text-black whitespace-nowrap">{edu.graduationYear}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="mb-7">
          <h2 className={heading} style={{ borderColor: 'var(--theme-color)' }}>
            Skills
          </h2>
          <p className="text-sm leading-relaxed text-black">
            {data.skills.map(skill => skill.name).join(', ')}
          </p>
        </section>
      )}

      {data.showProjects && data.projects && data.projects.length > 0 && (
        <section className="mb-7">
          <h2 className={heading} style={{ borderColor: 'var(--theme-color)' }}>
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="text-base font-bold text-black">{proj.name}</h3>
                {proj.link && <div className="text-sm text-black">{proj.link}</div>}
                {proj.description && (
                  <p className="mt-1 text-sm leading-relaxed text-black whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-7">
          <h2 className={heading} style={{ borderColor: 'var(--theme-color)' }}>
            References
          </h2>
          <div className="space-y-3">
            {data.references.map(ref => (
              <div key={ref.id} className="text-sm text-black">
                <div className="font-bold">{ref.name}</div>
                <div>
                  {ref.title}
                  {ref.title && ref.company ? ', ' : ''}
                  {ref.company}
                  {ref.contact && ` | ${ref.contact}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections &&
        data.customSections.map(
          section =>
            section.items &&
            section.items.length > 0 && (
              <section key={section.id} className="mb-7">
                <h2 className={heading} style={{ borderColor: 'var(--theme-color)' }}>
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-4">
                        <div className="text-sm font-bold text-black">{item.title}</div>
                        {item.date && (
                          <div className="text-sm text-black whitespace-nowrap">{item.date}</div>
                        )}
                      </div>
                      {item.subtitle && <div className="text-sm text-black">{item.subtitle}</div>}
                      {item.description && (
                        <p className="mt-1 text-sm leading-relaxed text-black whitespace-pre-line">
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
