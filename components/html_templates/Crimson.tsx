import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2
      className="text-sm font-black uppercase tracking-[0.18em] mb-4 pb-2 border-b-4"
      style={{ color: 'var(--theme-color)', borderColor: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );
}

export default function Crimson({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto">
      {/* Bold top band */}
      <div className="h-3 w-full" style={{ backgroundColor: 'var(--theme-color)' }} />

      <div className="px-12 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-black tracking-tight leading-none mb-3">{info.fullName}</h1>
          {info.jobTitle && (
            <p className="text-xl font-bold mb-4" style={{ color: 'var(--theme-color)' }}>
              {info.jobTitle}
            </p>
          )}
          {contactItems.length > 0 && (
            <p className="text-xs font-medium text-gray-600">
              {contactItems.join('  •  ')}
            </p>
          )}
        </header>

        {/* Summary */}
        {data.summary && (
          <section className="mb-8">
            <SectionHeader title="Profile" />
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <SectionHeader title="Experience" />
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold">{exp.role}</h3>
                    <span className="text-xs font-bold" style={{ color: 'var(--theme-color)' }}>
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">{exp.company}</p>
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

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <SectionHeader title="Skills" />
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs font-bold text-white px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--theme-color)' }}
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
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <p className="text-sm font-bold">{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.degree}</p>
                  </div>
                  <p className="text-xs font-bold" style={{ color: 'var(--theme-color)' }}>
                    {edu.graduationYear}
                  </p>
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

        {/* Certifications */}
        {data.showCertifications && data.certifications.length > 0 && (
          <section className="mb-8">
            <SectionHeader title="Certifications" />
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{cert.name} <span className="font-normal text-gray-600">— {cert.issuer}</span></p>
                  <p className="text-xs font-bold" style={{ color: 'var(--theme-color)' }}>{cert.date}</p>
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
                <div key={ref.id}>
                  <p className="text-sm font-bold">{ref.name}</p>
                  <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                  <p className="text-xs text-gray-500">{ref.contact}</p>
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
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    {item.date && (
                      <span className="text-xs font-bold" style={{ color: 'var(--theme-color)' }}>{item.date}</span>
                    )}
                  </div>
                  {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                  {item.description && <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
