import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Forge({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contact = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean).join('  •  ');

  return (
    <div className="font-sans w-full max-w-[816px] mx-auto bg-white text-neutral-900 min-h-[1056px] p-12">
      {/* Header */}
      <header className="mb-8">
        <div className="w-24 border-t-8 border-[var(--theme-color)] mb-5" />
        <h1 className="text-5xl font-black uppercase tracking-tight leading-none">{pi.fullName}</h1>
        {pi.jobTitle && (
          <p className="text-xl font-bold uppercase tracking-wide mt-2 text-neutral-600">{pi.jobTitle}</p>
        )}
        {contact && <p className="text-sm mt-2 text-neutral-600">{contact}</p>}
        {data.summary && (
          <p className="mt-5 text-base leading-relaxed border-l-4 border-[var(--theme-color)] pl-4">
            {data.summary}
          </p>
        )}
      </header>

      {/* Certifications & Licenses hero strip */}
      {data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section
          className="-mx-12 px-12 py-8 mb-10"
          style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 10%, white)' }}
        >
          <h2 className="text-2xl font-black uppercase tracking-tight mb-5">Certifications &amp; Licenses</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.certifications.map(cert => (
              <div key={cert.id} className="bg-white border-2 border-[var(--theme-color)] p-4">
                <div className="font-black uppercase tracking-tight leading-snug">{cert.name}</div>
                {cert.issuer && <div className="text-sm text-neutral-600 mt-1">{cert.issuer}</div>}
                {cert.date && <div className="text-xs font-bold text-neutral-500 mt-1">{cert.date}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tight border-b-4 border-[var(--theme-color)] pb-2 mb-6">
            Work Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-lg font-black uppercase tracking-tight">{exp.role}</h3>
                  <span className="text-sm font-bold text-neutral-500 whitespace-nowrap">
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' – ' : ''}
                    {exp.endDate}
                  </span>
                </div>
                <div className="font-bold text-[var(--theme-color)]">{exp.company}</div>
                {exp.description && (
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills as ticket tags */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tight border-b-4 border-[var(--theme-color)] pb-2 mb-6">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
              <span
                key={skill.id}
                className="text-sm font-bold uppercase tracking-wide border-2 border-[var(--theme-color)] px-3 py-1"
                style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 8%, white)' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tight border-b-4 border-[var(--theme-color)] pb-2 mb-6">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <div>
                  <div className="font-black uppercase tracking-tight">{edu.degree}</div>
                  <div className="text-sm text-neutral-600">{edu.school}</div>
                </div>
                {edu.graduationYear && (
                  <div className="text-sm font-bold text-neutral-500 whitespace-nowrap">{edu.graduationYear}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tight border-b-4 border-[var(--theme-color)] pb-2 mb-6">
            Projects
          </h2>
          <div className="space-y-5">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="font-black uppercase tracking-tight">{proj.name}</h3>
                {proj.link && <div className="text-sm text-[var(--theme-color)] font-bold">{proj.link}</div>}
                {proj.description && (
                  <p className="mt-1 text-sm leading-relaxed text-neutral-700 whitespace-pre-line">
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
        <section className="mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tight border-b-4 border-[var(--theme-color)] pb-2 mb-6">
            References
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {data.references.map(ref => (
              <div key={ref.id} className="border-l-4 border-[var(--theme-color)] pl-4">
                <h3 className="font-black uppercase tracking-tight">{ref.name}</h3>
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
      )}

      {/* Custom sections */}
      {data.customSections &&
        data.customSections.map(
          section =>
            section.items &&
            section.items.length > 0 && (
              <section key={section.id} className="mb-10">
                <h2 className="text-2xl font-black uppercase tracking-tight border-b-4 border-[var(--theme-color)] pb-2 mb-6">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-4">
                        <div className="font-black uppercase tracking-tight">{item.title}</div>
                        {item.date && (
                          <div className="text-sm font-bold text-neutral-500 whitespace-nowrap">{item.date}</div>
                        )}
                      </div>
                      {item.subtitle && <div className="text-sm text-neutral-600">{item.subtitle}</div>}
                      {item.description && (
                        <p className="mt-1 text-sm leading-relaxed text-neutral-700 whitespace-pre-line">
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
