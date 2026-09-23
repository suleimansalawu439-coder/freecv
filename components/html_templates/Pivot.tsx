import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const CLUSTER_LABELS = ['Technical', 'Leadership', 'Domain'];

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 pb-2 border-b-2 border-[var(--theme-color)]">
      {title}
    </h2>
  );
}

export default function Pivot({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactBits = [info.email, info.phone, info.location, info.website].filter(Boolean);

  // Split skills into three clusters (no invented skills — names only)
  const third = Math.ceil(data.skills.length / 3);
  const clusters = CLUSTER_LABELS.map((label, i) => ({
    label,
    items: data.skills.slice(i * third, (i + 1) * third),
  })).filter((c) => c.items.length > 0);

  return (
    <div className="font-sans bg-white text-[#1a1a1a] min-h-[1056px] w-full max-w-[816px] mx-auto px-12 py-10">
      {/* Header */}
      <header className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-bold tracking-tight">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base font-medium text-[var(--theme-color)] mt-1">{info.jobTitle}</p>
        )}
        {contactBits.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">{contactBits.join('  ·  ')}</p>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8">
          <SectionTitle title="Summary" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}

      {/* Core Competencies — skills-first */}
      {clusters.length > 0 && (
        <section className="mb-8">
          <SectionTitle title="Core Competencies" />
          <div className="grid grid-cols-3 gap-6">
            {clusters.map((cluster) => (
              <div key={cluster.label}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--theme-color)] mb-2 pb-1 border-b border-gray-200">
                  {cluster.label}
                </h3>
                <ul className="space-y-1.5">
                  {cluster.items.map((skill) => (
                    <li key={skill.id} className="text-sm text-gray-700">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work History — one line each, no descriptions */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <SectionTitle title="Work History" />
          <div className="space-y-2">
            {data.experience.map((exp) => (
              <div key={exp.id} className="flex justify-between items-baseline gap-4">
                <p className="text-sm">
                  <span className="font-bold">{exp.role}</span>
                  {exp.company && <span className="text-gray-600"> — {exp.company}</span>}
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  {exp.startDate}
                  {exp.startDate && exp.endDate ? ' – ' : ''}
                  {exp.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <SectionTitle title="Education" />
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <p className="text-sm">
                  <span className="font-bold">{edu.degree}</span>
                  {edu.school && <span className="text-gray-600"> — {edu.school}</span>}
                </p>
                {edu.graduationYear && (
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {edu.graduationYear}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <SectionTitle title="Projects" />
          <div className="space-y-2">
            {data.projects.map((proj) => (
              <p key={proj.id} className="text-sm">
                <span className="font-bold">{proj.name}</span>
                {proj.description && <span className="text-gray-600"> — {proj.description}</span>}
                {proj.link && (
                  <a href={proj.link} className="text-[var(--theme-color)] ml-2 text-xs">
                    Link
                  </a>
                )}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <SectionTitle title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline gap-4">
                <p className="text-sm">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                </p>
                {cert.date && (
                  <span className="text-xs text-gray-500 whitespace-nowrap">{cert.date}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {data.showReferences && data.references.length > 0 && (
        <section className="mb-8">
          <SectionTitle title="References" />
          <div className="space-y-2">
            {data.references.map((ref) => (
              <p key={ref.id} className="text-sm">
                <span className="font-bold">{ref.name}</span>
                {(ref.title || ref.company) && (
                  <span className="text-gray-600">
                    {' '}
                    — {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </span>
                )}
                {ref.contact && <span className="text-gray-500"> · {ref.contact}</span>}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Custom sections */}
      {data.customSections &&
        data.customSections.length > 0 &&
        data.customSections.map(
          (section) =>
            section.items.length > 0 && (
              <section key={section.id} className="mb-8">
                <SectionTitle title={section.title} />
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-baseline gap-4">
                      <p className="text-sm">
                        <span className="font-bold">{item.title}</span>
                        {item.subtitle && <span className="text-gray-600"> — {item.subtitle}</span>}
                        {item.description && (
                          <span className="text-gray-600"> · {item.description}</span>
                        )}
                      </p>
                      {item.date && (
                        <span className="text-xs text-gray-500 whitespace-nowrap">{item.date}</span>
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
