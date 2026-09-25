import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHead({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="w-3 h-3 rounded-[3px] shrink-0" style={{ backgroundColor: 'var(--theme-color)' }} />
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">{title}</h2>
    </div>
  );
}

const SWATCHES = [
  { label: 'Primary', opacity: 1 },
  { label: 'Soft', opacity: 0.55 },
  { label: 'Mist', opacity: 0.25 },
];

export default function Palette({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills } = data;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(
    Boolean
  ) as string[];

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 px-12 py-10">
      {/* Header */}
      <header className="mb-9">
        <h1 className="text-5xl font-extrabold tracking-tight leading-none">{personalInfo.fullName}</h1>
        {personalInfo.jobTitle && (
          <p className="text-xl font-semibold mt-2" style={{ color: 'var(--theme-color)' }}>
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Color story */}
        <div className="flex gap-7 mt-6 mb-6">
          {SWATCHES.map((sw) => (
            <div key={sw.label} className="flex flex-col items-center gap-1.5">
              <div
                className="w-12 h-12 rounded-lg"
                style={{ backgroundColor: 'var(--theme-color)', opacity: sw.opacity }}
              />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">{sw.label}</span>
            </div>
          ))}
        </div>

        {contacts.length > 0 && <div className="text-sm text-gray-500 font-medium">{contacts.join('  •  ')}</div>}
      </header>

      <main className="space-y-8">
        {summary && (
          <section>
            <SectionHead title="Profile" />
            <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <SectionHead title="Experience" />
            <div className="space-y-7">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-6">
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-gray-500 shrink-0">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold mt-0.5" style={{ color: 'var(--theme-color)' }}>
                    {exp.company}
                  </div>
                  <ul className="list-disc list-outside ml-4 mt-2.5 space-y-1 text-sm text-gray-600">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <section>
            <SectionHead title="Projects" />
            <div className="space-y-5">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <span className="text-sm font-medium shrink-0" style={{ color: 'var(--theme-color)' }}>
                        {project.link}
                      </span>
                    )}
                  </div>
                  {project.description && <p className="text-sm text-gray-600 mt-1">{project.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <SectionHead title="Education" />
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                  {edu.graduationYear && <div className="text-xs font-semibold text-gray-500 mt-1">{edu.graduationYear}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <SectionHead title="Skills" />
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="flex items-center gap-2 rounded-full pl-2.5 pr-4 py-1.5 text-sm font-semibold text-gray-900"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 12%, white)' }}
                >
                  <span className="w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ backgroundColor: 'var(--theme-color)' }} />
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section>
            <SectionHead title="Certifications" />
            <div className="space-y-2.5">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <span className="font-bold text-gray-900">{cert.name}</span>
                  {(cert.issuer || cert.date) && (
                    <span className="text-gray-500">
                      {' — '}
                      {cert.issuer}
                      {cert.issuer && cert.date ? ', ' : ''}
                      {cert.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <section className="break-inside-avoid">
            <SectionHead title="References" />
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref) => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <h3 className="font-bold text-gray-900">{ref.name}</h3>
                  <div className="text-sm text-gray-600">
                    {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </div>
                  {ref.contact && <div className="text-sm text-gray-500 mt-1">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map(
            (section) =>
              section.items.length > 0 && (
                <section key={section.id}>
                  <SectionHead title={section.title} />
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline gap-4">
                          <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                          {item.date && <span className="text-xs font-semibold text-gray-500 shrink-0">{item.date}</span>}
                        </div>
                        {item.subtitle && <div className="text-sm italic text-gray-600">{item.subtitle}</div>}
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )
          )}
      </main>
    </div>
  );
}
