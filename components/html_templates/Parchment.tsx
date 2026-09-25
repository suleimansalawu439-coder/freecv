import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const INK = '#5b4632';
const INK_SOFT = '#7a6549';
const CREAM = '#faf5ea';
const RULE = '#d8c9a8';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold uppercase tracking-[0.25em] font-serif mb-2" style={{ color: INK }}>
        {title}
      </h2>
      <div className="h-px" style={{ backgroundColor: RULE }} />
      <div className="h-px mt-px" style={{ backgroundColor: RULE }} />
    </div>
  );
}

export default function Parchment({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] font-serif mx-auto px-[1in] py-[0.85in]" style={{ backgroundColor: CREAM, color: INK }}>
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-wide mb-2">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-sm italic mb-3" style={{ color: INK_SOFT }}>{info.jobTitle}</p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs" style={{ color: INK_SOFT }}>{contactItems.join('  ·  ')}</p>
        )}
        <div className="mt-5">
          <div className="h-px" style={{ backgroundColor: RULE }} />
          <div className="h-[3px] mt-[3px]" style={{ backgroundColor: RULE }} />
        </div>
      </header>

      {data.summary && (
        <section className="mb-7">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed italic">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Experience" />
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <span className="text-xs italic" style={{ color: INK_SOFT }}>{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-sm italic mb-2" style={{ color: INK_SOFT }}>{exp.company}</p>
                {exp.description && (
                  <ul className="space-y-1">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed flex gap-2">
                        <span className="mt-0.5" style={{ color: INK_SOFT }}>–</span>
                        <span>{line.trim()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm italic" style={{ color: INK_SOFT }}>{edu.school}</p>
                </div>
                <p className="text-xs italic" style={{ color: INK_SOFT }}>{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Skills" />
          <p className="text-sm leading-loose">
            {data.skills.map((s) => s.name).join('  ·  ')}
          </p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-xs italic" style={{ color: INK_SOFT }}>({proj.link})</span>}
                </div>
                <p className="text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-sm">
                <p><span className="font-bold">{cert.name}</span> <span className="italic" style={{ color: INK_SOFT }}>— {cert.issuer}</span></p>
                <p className="text-xs italic" style={{ color: INK_SOFT }}>{cert.date}</p>
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
              <div key={ref.id} className="border-l pl-3" style={{ borderColor: RULE }}>
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs italic" style={{ color: INK_SOFT }}>{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs" style={{ color: INK_SOFT }}>{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items.length > 0 ? (
          <section key={section.id} className="mb-7">
            <SectionHeader title={section.title} />
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    {item.date && <span className="text-xs italic" style={{ color: INK_SOFT }}>{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm italic mb-1" style={{ color: INK_SOFT }}>{item.subtitle}</p>}
                  {item.description && <p className="text-sm leading-relaxed">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
