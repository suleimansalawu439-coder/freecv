import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function NightShift({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contact = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean).join('  •  ');

  return (
    <div className="font-sans w-full max-w-[816px] mx-auto bg-white text-neutral-800 min-h-[1056px] p-14">
      {/* Calm, trustworthy header */}
      <header className="text-center mb-12 pb-10 border-b-2 border-neutral-200">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">{pi.fullName}</h1>
        {pi.jobTitle && (
          <p className="text-lg font-semibold text-[var(--theme-color)] mt-2">{pi.jobTitle}</p>
        )}
        {contact && <p className="text-sm text-neutral-500 mt-3 leading-relaxed">{contact}</p>}
        {data.summary && (
          <p className="mt-6 text-base leading-loose text-neutral-700 max-w-[640px] mx-auto">{data.summary}</p>
        )}
      </header>

      {/* Certifications & Licenses first */}
      {data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--theme-color)] mb-6">Certifications &amp; Licenses</h2>
          <div className="grid grid-cols-2 gap-5">
            {data.certifications.map(cert => (
              <div
                key={cert.id}
                className="bg-neutral-50 border border-neutral-200 border-l-4 border-l-[var(--theme-color)] rounded-lg p-5"
              >
                <div className="font-bold text-neutral-900 leading-snug">{cert.name}</div>
                {cert.issuer && <div className="text-sm text-neutral-500 mt-1">{cert.issuer}</div>}
                {cert.date && <div className="text-xs font-semibold text-neutral-400 mt-2">{cert.date}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience — facility-forward */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--theme-color)] mb-6">Work Experience</h2>
          <div className="space-y-10">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-lg font-bold text-neutral-900">{exp.role}</h3>
                  <span className="text-sm text-neutral-500 whitespace-nowrap">
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' – ' : ''}
                    {exp.endDate}
                  </span>
                </div>
                <div className="text-base font-semibold text-[var(--theme-color)] mt-0.5">{exp.company}</div>
                {exp.description && (
                  <p className="mt-3 text-[15px] leading-loose text-neutral-600 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills as clinical tags */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--theme-color)] mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map(skill => (
              <span
                key={skill.id}
                className="text-sm font-semibold px-4 py-2 rounded-full"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--theme-color) 10%, white)',
                  color: 'var(--theme-color)',
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--theme-color)] mb-6">Education</h2>
          <div className="space-y-6">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <div>
                  <div className="font-bold text-neutral-900">{edu.degree}</div>
                  <div className="text-sm text-neutral-500 mt-0.5">{edu.school}</div>
                </div>
                {edu.graduationYear && (
                  <div className="text-sm text-neutral-400 font-semibold whitespace-nowrap">{edu.graduationYear}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--theme-color)] mb-6">Projects</h2>
          <div className="space-y-7">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="font-bold text-neutral-900">{proj.name}</h3>
                {proj.link && (
                  <div className="text-sm font-semibold text-[var(--theme-color)] mt-0.5">{proj.link}</div>
                )}
                {proj.description && (
                  <p className="mt-2 text-[15px] leading-loose text-neutral-600 whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--theme-color)] mb-6">References</h2>
          <div className="grid grid-cols-2 gap-6">
            {data.references.map(ref => (
              <div key={ref.id} className="border-l-2 border-[var(--theme-color)] pl-4">
                <h3 className="font-bold text-neutral-900">{ref.name}</h3>
                <div className="text-sm text-neutral-500 mt-0.5">
                  {ref.title}
                  {ref.title && ref.company ? ' @ ' : ''}
                  {ref.company}
                </div>
                {ref.contact && <div className="text-sm text-neutral-500">{ref.contact}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom sections */}
      {data.customSections &&
        data.customSections.map(
          section =>
            section.items &&
            section.items.length > 0 && (
              <section key={section.id} className="mb-12">
                <h2 className="text-xl font-bold text-[var(--theme-color)] mb-6">{section.title}</h2>
                <div className="space-y-6">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-4">
                        <div className="font-bold text-neutral-900">{item.title}</div>
                        {item.date && (
                          <div className="text-sm text-neutral-400 font-semibold whitespace-nowrap">{item.date}</div>
                        )}
                      </div>
                      {item.subtitle && <div className="text-sm text-neutral-500 mt-0.5">{item.subtitle}</div>}
                      {item.description && (
                        <p className="mt-2 text-[15px] leading-loose text-neutral-600 whitespace-pre-line">
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
