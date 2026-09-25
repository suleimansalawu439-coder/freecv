import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-serif text-[11px] font-bold uppercase tracking-[0.28em] mb-3"
      style={{ color: 'var(--theme-color)' }}
    >
      {children}
    </p>
  );
}

export default function Column({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-gray-900 mx-auto flex flex-col">
      {/* Feature header */}
      <header className="px-14 pt-14 pb-10 border-b border-gray-200">
        <Kicker>Résumé</Kicker>
        {info.fullName && (
          <h1 className="text-5xl font-normal tracking-tight leading-tight">{info.fullName}</h1>
        )}
        {info.jobTitle && (
          <p className="text-xl italic text-gray-600 mt-3">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-sm text-gray-500 mt-4">{contact.join('   ·   ')}</p>
        )}
      </header>

      <div className="flex flex-1">
        {/* Main feature column */}
        <main className="w-[65%] px-14 py-10">
          {data.summary && (
            <section className="mb-10">
              <Kicker>Standfirst</Kicker>
              <p className="text-[15px] text-gray-800 leading-[1.9]">{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className="mb-10">
              <Kicker>Feature</Kicker>
              <h2 className="font-serif text-2xl font-normal mb-6">Experience</h2>
              <div className="space-y-8">
                {data.experience.map((exp) => (
                  <article key={exp.id}>
                    <h3 className="font-serif text-lg font-bold leading-snug">{exp.role}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-semibold" style={{ color: 'var(--theme-color)' }}>{exp.company}</span>
                      {(exp.startDate || exp.endDate) && (
                        <span>{'  ·  '}{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}</span>
                      )}
                    </p>
                    {exp.description && (
                      <ul className="mt-2.5 space-y-1.5 list-disc pl-5">
                        {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                          <li key={i} className="text-[15px] text-gray-700 leading-[1.8]">{line.trim()}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {data.showProjects && data.projects.length > 0 && (
            <section className="mb-10">
              <Kicker>Portfolio</Kicker>
              <h2 className="font-serif text-2xl font-normal mb-6">Projects</h2>
              <div className="space-y-6">
                {data.projects.map((proj) => (
                  <article key={proj.id}>
                    <h3 className="font-serif text-base font-bold">
                      {proj.name}
                      {proj.link && <span className="font-normal text-sm text-gray-400"> — {proj.link}</span>}
                    </h3>
                    {proj.description && (
                      <p className="text-[15px] text-gray-700 mt-1.5 leading-[1.8]">{proj.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {data.customSections.map((section) =>
            section.items && section.items.length > 0 ? (
              <section key={section.id} className="mb-10">
                <Kicker>More</Kicker>
                <h2 className="font-serif text-2xl font-normal mb-6">{section.title}</h2>
                <div className="space-y-6">
                  {section.items.map((item) => (
                    <article key={item.id}>
                      {item.title && <h3 className="font-serif text-base font-bold">{item.title}</h3>}
                      {(item.subtitle || item.date) && (
                        <p className="text-sm text-gray-500 mt-0.5">
                          {item.subtitle}{item.subtitle && item.date ? '  ·  ' : ''}{item.date}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-[15px] text-gray-700 mt-1.5 leading-[1.8]">{item.description}</p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ) : null
          )}
        </main>

        {/* Side notes column */}
        <aside className="w-[35%] px-8 py-10 border-l border-gray-200 bg-gray-50/60">
          {data.skills.length > 0 && (
            <section className="mb-10">
              <Kicker>Pull Skills</Kicker>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <p key={skill.id} className="font-serif text-lg leading-snug text-gray-900 border-l-2 pl-4"
                    style={{ borderColor: 'var(--theme-color)' }}>
                    {skill.name}
                  </p>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section className="mb-10">
              <Kicker>Schooling</Kicker>
              <div className="space-y-5">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    {edu.school && <p className="font-serif text-sm font-bold text-gray-900">{edu.school}</p>}
                    {edu.degree && <p className="text-sm text-gray-600 mt-0.5">{edu.degree}</p>}
                    {edu.graduationYear && <p className="text-xs text-gray-400 mt-0.5">{edu.graduationYear}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <section className="mb-10">
              <Kicker>Credentials</Kicker>
              <div className="space-y-4">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-serif text-sm font-bold text-gray-900">{cert.name}</p>
                    {cert.issuer && <p className="text-sm text-gray-600">{cert.issuer}</p>}
                    {cert.date && <p className="text-xs text-gray-400">{cert.date}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.showReferences && data.references.length > 0 && (
            <section>
              <Kicker>Sources</Kicker>
              <div className="space-y-4">
                {data.references.map((ref) => (
                  <div key={ref.id}>
                    <p className="font-serif text-sm font-bold text-gray-900">{ref.name}</p>
                    {(ref.title || ref.company) && (
                      <p className="text-sm text-gray-600">
                        {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                      </p>
                    )}
                    {ref.contact && <p className="text-xs text-gray-400">{ref.contact}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
