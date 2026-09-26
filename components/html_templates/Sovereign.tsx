import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

export default function Sovereign({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const hasPhoto = Boolean(pi.profilePicture);
  const contact = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean).join('  •  ');

  const railHeading =
    'text-sm font-bold uppercase tracking-[0.2em] text-[var(--theme-color)] border-b border-[var(--theme-color)] pb-2 mb-5';

  return (
    <div className="w-full max-w-[816px] mx-auto bg-white text-neutral-900 min-h-[1056px] p-12 font-sans">
      {/* Header — reflows with or without a photo */}
      {orderSections(data, {
        personal: (
          <>
            {hasPhoto ? (
              <header className="flex items-center gap-8 mb-10">
                <img
                  src={pi.profilePicture}
                  alt="Profile"
                  className="w-36 h-36 rounded-2xl object-cover shrink-0"
                />
                <div>
                  <h1 className="font-serif text-5xl font-bold tracking-tight text-[var(--theme-color)] leading-none">
                    {pi.fullName}
                  </h1>
                  {pi.jobTitle && (
                    <p className="text-xl font-semibold tracking-wide mt-3 text-neutral-600">{pi.jobTitle}</p>
                  )}
                </div>
              </header>
            ) : (
              <header className="text-center mb-10">
                <h1 className="font-serif text-5xl font-bold tracking-tight text-[var(--theme-color)] leading-none">
                  {pi.fullName}
                </h1>
                {pi.jobTitle && (
                  <p className="text-xl font-semibold tracking-wide mt-3 text-neutral-600">{pi.jobTitle}</p>
                )}
                {contact && <p className="text-sm text-neutral-500 mt-4">{contact}</p>}
              </header>
            )}

            <div className="w-full border-b-2 border-[var(--theme-color)] mb-10" />
          </>
        ),
      })}

      <div className="grid grid-cols-12 gap-10">
        {/* Main column */}
        <div className="col-span-8 space-y-10">
          {orderSections(data, {
            personal: data.summary && data.summary.length > 0 && (
              <section>
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-[var(--theme-color)] border-b border-[var(--theme-color)] pb-2 mb-5">
                  Executive Summary
                </h2>
                <p className="text-[15px] leading-loose text-neutral-700">{data.summary}</p>
              </section>
            ),

            experience: data.experience && data.experience.length > 0 && (
              <section>
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-[var(--theme-color)] border-b border-[var(--theme-color)] pb-2 mb-6">
                  Professional Experience
                </h2>
                <div className="space-y-8">
                  {data.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline gap-4">
                        <h3 className="text-lg font-bold">{exp.role}</h3>
                        <span className="text-sm text-neutral-500 whitespace-nowrap">
                          {exp.startDate}
                          {exp.startDate && exp.endDate ? ' – ' : ''}
                          {exp.endDate}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-neutral-600 mt-0.5">{exp.company}</div>
                      {exp.description && (
                        <p className="mt-2 text-sm leading-loose text-neutral-700 whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ),

            projects: data.showProjects && data.projects && data.projects.length > 0 && (
              <section>
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-[var(--theme-color)] border-b border-[var(--theme-color)] pb-2 mb-6">
                  Key Engagements
                </h2>
                <div className="space-y-6">
                  {data.projects.map(proj => (
                    <div key={proj.id}>
                      <h3 className="font-bold">{proj.name}</h3>
                      {proj.link && (
                        <div className="text-sm font-semibold text-[var(--theme-color)]">{proj.link}</div>
                      )}
                      {proj.description && (
                        <p className="mt-1 text-sm leading-loose text-neutral-700 whitespace-pre-line">
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ),

            references: data.showReferences && data.references && data.references.length > 0 && (
              <section>
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-[var(--theme-color)] border-b border-[var(--theme-color)] pb-2 mb-6">
                  References
                </h2>
                <div className="space-y-5">
                  {data.references.map(ref => (
                    <div key={ref.id} className="border-l-2 border-[var(--theme-color)] pl-4">
                      <h3 className="font-bold">{ref.name}</h3>
                      <div className="text-sm text-neutral-600">
                        {ref.title}
                        {ref.title && ref.company ? ' @ ' : ''}
                        {ref.company}
                      </div>
                      {ref.contact && <div className="text-sm text-neutral-600">{ref.contact}</div>}
                    </div>
                  ))}
                </div>
              </section>
            ),
          })}
        </div>

        {/* Rail */}
        <aside className="col-span-4 space-y-10">
          {orderSections(data, {
            personal: hasPhoto && contact && (
              <section>
                <h2 className={railHeading}>Contact</h2>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {pi.email && <li>{pi.email}</li>}
                  {pi.phone && <li>{pi.phone}</li>}
                  {pi.location && <li>{pi.location}</li>}
                  {pi.website && <li>{pi.website}</li>}
                </ul>
              </section>
            ),

            skills: data.skills && data.skills.length > 0 && (
              <section>
                <h2 className={railHeading}>Capabilities</h2>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {data.skills.map(skill => (
                    <li key={skill.id} className="flex items-start gap-2">
                      <span className="mt-[7px] w-1.5 h-1.5 shrink-0 bg-[var(--theme-color)]" />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ),

            education: data.education && data.education.length > 0 && (
              <section>
                <h2 className={railHeading}>Education</h2>
                <div className="space-y-5">
                  {data.education.map(edu => (
                    <div key={edu.id}>
                      <div className="text-sm font-bold">{edu.degree}</div>
                      <div className="text-sm text-neutral-600">{edu.school}</div>
                      {edu.graduationYear && (
                        <div className="text-xs font-semibold text-neutral-400 mt-1">{edu.graduationYear}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ),

            certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
              <section>
                <h2 className={railHeading}>Certifications</h2>
                <div className="space-y-5">
                  {data.certifications.map(cert => (
                    <div key={cert.id}>
                      <div className="text-sm font-bold">{cert.name}</div>
                      {cert.issuer && <div className="text-sm text-neutral-600">{cert.issuer}</div>}
                      {cert.date && (
                        <div className="text-xs font-semibold text-neutral-400 mt-1">{cert.date}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ),
          })}
        </aside>
      </div>

      {/* Custom sections */}
      {orderSections(data, {},
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
              <section key={section.id} className="mt-10">
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-[var(--theme-color)] border-b border-[var(--theme-color)] pb-2 mb-6">
                  {section.title}
                </h2>
                <div className="space-y-5">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-4">
                        <div className="font-bold">{item.title}</div>
                        {item.date && (
                          <div className="text-sm text-neutral-500 whitespace-nowrap">{item.date}</div>
                        )}
                      </div>
                      {item.subtitle && <div className="text-sm text-neutral-600">{item.subtitle}</div>}
                      {item.description && (
                        <p className="mt-1 text-sm leading-loose text-neutral-700 whitespace-pre-line">
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
