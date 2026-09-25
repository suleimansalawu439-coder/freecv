import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span
        className="text-[10px] leading-none shrink-0"
        style={{ color: 'var(--theme-color)' }}
      >
        ◆
      </span>
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900">{title}</h2>
    </div>
  );
}

function bullets(description: string): string[] {
  return (description || '').split(/\n|\r?\n/).filter((l) => l.trim());
}

function dateRange(start: string, end: string): string {
  return [start, end].filter(Boolean).join(' — ');
}

export default function Vector({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto p-[0.85in] font-sans text-gray-900">
      {/* Header — theme triangle accent + name */}
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <span
            className="text-2xl leading-none shrink-0"
            style={{ color: 'var(--theme-color)' }}
          >
            ▲
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-left">
            {info.fullName}
          </h1>
        </div>
        {info.jobTitle && <p className="text-base text-gray-600 mt-2">{info.jobTitle}</p>}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500 mt-1.5">{contactItems.join('  ·  ')}</p>
        )}
      </header>

      {data.summary && (
        <section className="mb-7">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="border-l-2 pl-5"
                style={{ borderColor: 'var(--theme-color)' }}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                  {dateRange(exp.startDate, exp.endDate) && (
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {dateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <p
                    className="text-sm font-medium mb-1.5"
                    style={{ color: 'var(--theme-color)' }}
                  >
                    {exp.company}
                  </p>
                )}
                {exp.description && (
                  <ul className="space-y-1">
                    {bullets(exp.description).map((line, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-700">
                        <span className="text-gray-400 shrink-0">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
              >
                <span className="leading-none" style={{ color: 'var(--theme-color)' }}>
                  •
                </span>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  {edu.graduationYear && (
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {edu.graduationYear}
                    </span>
                  )}
                </div>
                {edu.school && <p className="text-sm text-gray-600">{edu.school}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                  {proj.link && (
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-sm leading-relaxed text-gray-700">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Certifications" />
          <div className="space-y-2.5">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                  {cert.issuer && <p className="text-sm text-gray-600">{cert.issuer}</p>}
                </div>
                {cert.date && (
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div
                key={ref.id}
                className="border-l-2 pl-3"
                style={{ borderColor: 'var(--theme-color)' }}
              >
                <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                <p className="text-xs text-gray-600">
                  {ref.title}
                  {ref.company ? ` @ ${ref.company}` : ''}
                </p>
                {ref.contact && <p className="text-xs text-gray-500 mt-0.5">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {(data.customSections || []).map(
        (section) =>
          section.items &&
          section.items.length > 0 && (
            <section key={section.id} className="mb-7">
              <SectionHeader title={section.title} />
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-bold text-gray-900">{item.title}</p>
                      {item.date && (
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {item.date}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <p className="text-sm italic text-gray-600">{item.subtitle}</p>
                    )}
                    {item.description && (
                      <p className="text-sm leading-relaxed text-gray-700 mt-0.5">
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
