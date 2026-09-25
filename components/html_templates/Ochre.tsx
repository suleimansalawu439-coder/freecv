import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-bold tracking-wide" style={{ color: 'var(--theme-color)' }}>
        {title}
      </h2>
      <div className="mt-1.5 h-[3px] w-14 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
    </div>
  );
}

export default function Ochre({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div
      className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-stone-800 mx-auto px-14 py-12"
      style={{ fontFamily: "'Segoe UI', 'Trebuchet MS', Verdana, sans-serif" }}
    >
      {/* Header: warm and welcoming */}
      <header className="mb-9 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-lg font-semibold mb-4" style={{ color: 'var(--theme-color)' }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-stone-500">
            {contactItems.join('   ·   ')}
          </p>
        )}
        <div
          className="mx-auto mt-6 h-1.5 w-24 rounded-full"
          style={{ backgroundColor: 'var(--theme-color)' }}
        />
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8 rounded-2xl px-6 py-5" style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 8%, white)' }}>
          <SectionHeader title="About Me" />
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Work Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="rounded-xl border border-stone-200 px-5 py-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <span className="text-xs font-semibold text-stone-500 whitespace-nowrap ml-4">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--theme-color)' }}>
                  {exp.company}
                </p>
                {exp.description && (
                  <ul className="list-disc list-outside ml-4 space-y-1">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed text-stone-700">{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-semibold px-4 py-2 rounded-full"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--theme-color) 14%, white)',
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
      {data.education.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex items-center gap-4">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--theme-color)' }}
                />
                <div className="flex-1 flex justify-between items-baseline">
                  <div>
                    <p className="text-sm font-bold">{edu.degree}</p>
                    <p className="text-sm text-stone-600">{edu.school}</p>
                  </div>
                  <p className="text-xs font-semibold text-stone-500">{edu.graduationYear}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="rounded-xl border border-stone-200 px-5 py-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-stone-500">({proj.link})</span>}
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm font-bold">{cert.name} <span className="font-normal text-stone-600">· {cert.issuer}</span></p>
                <p className="text-xs font-semibold text-stone-500">{cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {data.showReferences && data.references.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id} className="rounded-xl border border-stone-200 px-5 py-4">
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-stone-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                <p className="text-xs text-stone-500">{ref.contact}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom sections */}
      {data.customSections.map((section) => (
        <section key={section.id} className="mb-8">
          <SectionHeader title={section.title} />
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.id} className="rounded-xl border border-stone-200 px-5 py-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  {item.date && <span className="text-xs font-semibold text-stone-500">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-sm text-stone-600 mb-1">{item.subtitle}</p>}
                {item.description && <p className="text-sm text-stone-700 leading-relaxed">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
