import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function TandemHeader({ title, light = false }: { title: string; light?: boolean }) {
  return (
    <h2
      className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${light ? 'text-white' : ''}`}
      style={light ? undefined : { color: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );
}

export default function Tandem({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto flex flex-col">
      {/* Full-width header */}
      <header
        className="px-12 pt-10 pb-8 text-white"
        style={{ backgroundColor: 'var(--theme-color)' }}
      >
        <h1 className="text-4xl font-black tracking-tight mb-1">{info.fullName}</h1>
        {info.jobTitle && <p className="text-base font-semibold opacity-90 mb-3">{info.jobTitle}</p>}
        {contactItems.length > 0 && (
          <p className="text-xs opacity-80">{contactItems.join('  •  ')}</p>
        )}
      </header>

      {/* Tandem columns */}
      <div className="flex flex-1">
        {/* Left: career (wider) */}
        <div className="w-[64%] px-10 py-8">
          {data.summary && (
            <section className="mb-8">
              <TandemHeader title="Profile" />
              <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className="mb-8">
              <TandemHeader title="Experience" />
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold">{exp.role}</h3>
                      <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-3">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm font-semibold mb-2" style={{ color: 'var(--theme-color)' }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                          <li key={i} className="text-sm leading-relaxed text-gray-700">{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.showProjects && data.projects.length > 0 && (
            <section className="mb-8">
              <TandemHeader title="Projects" />
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-sm font-bold">{proj.name}</h3>
                      {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right: credentials stack (narrow, tinted) */}
        <div
          className="w-[36%] px-8 py-8"
          style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 7%, white)' }}
        >
          {data.skills.length > 0 && (
            <section className="mb-7">
              <TandemHeader title="Skills" />
              <div className="flex flex-col gap-2">
                {data.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="text-[13px] font-semibold bg-white px-3 py-2 rounded-lg shadow-sm"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section className="mb-7">
              <TandemHeader title="Education" />
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[13px] font-bold">{edu.degree}</p>
                    <p className="text-xs text-gray-600">{edu.school}</p>
                    <p className="text-xs font-bold" style={{ color: 'var(--theme-color)' }}>
                      {edu.graduationYear}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <section className="mb-7">
              <TandemHeader title="Certifications" />
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[13px] font-bold">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.showReferences && data.references.length > 0 && (
            <section className="mb-7">
              <TandemHeader title="References" />
              <div className="space-y-3">
                {data.references.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-[13px] font-bold">{ref.name}</p>
                    <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                    <p className="text-xs text-gray-500">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Custom sections */}
      {data.customSections.length > 0 && (
        <div className="px-10 pb-10">
          {data.customSections.map((section) => (
            <section key={section.id} className="mb-8">
              <TandemHeader title={section.title} />
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      {item.date && <span className="text-xs font-semibold text-gray-500">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                    {item.description && <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
