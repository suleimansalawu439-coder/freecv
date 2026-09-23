import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Polyglot({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contact = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean).join('  •  ');

  const heading =
    'text-2xl font-bold text-[var(--theme-color)] border-b-2 border-[var(--theme-color)] pb-3 mb-8';

  return (
    <div className="font-sans w-full max-w-[816px] mx-auto bg-white text-neutral-900 min-h-[1056px] p-14 text-lg">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold leading-relaxed text-[var(--theme-color)]">{pi.fullName}</h1>
        {pi.jobTitle && <p className="text-xl font-bold mt-3 leading-relaxed">{pi.jobTitle}</p>}
        {contact && <p className="text-base text-neutral-600 mt-4 leading-loose">{contact}</p>}
      </header>

      {data.summary && (
        <section className="mb-12">
          <h2 className={heading}>Summary</h2>
          <p className="leading-[1.8] text-neutral-800">{data.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="mb-12">
          <h2 className={heading}>Work Experience</h2>
          <div className="space-y-10">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <h3 className="text-xl font-bold leading-relaxed">{exp.role}</h3>
                <div className="font-semibold text-neutral-700 leading-relaxed">{exp.company}</div>
                {(exp.startDate || exp.endDate) && (
                  <div className="text-base text-neutral-500 leading-relaxed">
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' – ' : ''}
                    {exp.endDate}
                  </div>
                )}
                {exp.description && (
                  <p className="mt-4 leading-[1.8] text-neutral-800 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section className="mb-12">
          <h2 className={heading}>Certifications &amp; Licenses</h2>
          <div className="space-y-6">
            {data.certifications.map(cert => (
              <div key={cert.id}>
                <div className="font-bold leading-relaxed">{cert.name}</div>
                {cert.issuer && <div className="text-neutral-700 leading-relaxed">{cert.issuer}</div>}
                {cert.date && <div className="text-base text-neutral-500 leading-relaxed">{cert.date}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="mb-12">
          <h2 className={heading}>Education</h2>
          <div className="space-y-8">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="font-bold leading-relaxed">{edu.degree}</div>
                <div className="text-neutral-700 leading-relaxed">{edu.school}</div>
                {edu.graduationYear && (
                  <div className="text-base text-neutral-500 leading-relaxed">{edu.graduationYear}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="mb-12">
          <h2 className={heading}>Skills</h2>
          <div className="flex flex-wrap gap-4">
            {data.skills.map(skill => (
              <span
                key={skill.id}
                className="text-base font-semibold border border-neutral-300 rounded px-4 py-2 leading-relaxed"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects && data.projects.length > 0 && (
        <section className="mb-12">
          <h2 className={heading}>Projects</h2>
          <div className="space-y-10">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="text-xl font-bold leading-relaxed">{proj.name}</h3>
                {proj.link && (
                  <div className="font-semibold text-[var(--theme-color)] leading-relaxed">{proj.link}</div>
                )}
                {proj.description && (
                  <p className="mt-4 leading-[1.8] text-neutral-800 whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-12">
          <h2 className={heading}>References</h2>
          <div className="space-y-8">
            {data.references.map(ref => (
              <div key={ref.id}>
                <h3 className="font-bold leading-relaxed">{ref.name}</h3>
                <div className="text-neutral-700 leading-relaxed">
                  {ref.title}
                  {ref.title && ref.company ? ' @ ' : ''}
                  {ref.company}
                </div>
                {ref.contact && <div className="text-neutral-700 leading-relaxed">{ref.contact}</div>}
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
              <section key={section.id} className="mb-12">
                <h2 className={heading}>{section.title}</h2>
                <div className="space-y-8">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="font-bold leading-relaxed">{item.title}</div>
                      {item.subtitle && (
                        <div className="text-neutral-700 leading-relaxed">{item.subtitle}</div>
                      )}
                      {item.date && (
                        <div className="text-base text-neutral-500 leading-relaxed">{item.date}</div>
                      )}
                      {item.description && (
                        <p className="mt-4 leading-[1.8] text-neutral-800 whitespace-pre-line">
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
