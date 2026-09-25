import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const GOLD = '#a8842c';
const CHARCOAL = '#2f3437';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px flex-1" style={{ backgroundColor: GOLD }} />
      <h2 className="text-xs font-bold uppercase tracking-[0.35em] font-serif" style={{ color: GOLD }}>
        {title}
      </h2>
      <div className="h-px flex-1" style={{ backgroundColor: GOLD }} />
    </div>
  );
}

export default function Gilt({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif mx-auto px-[0.9in] py-[0.8in]" style={{ color: CHARCOAL }}>
      {/* Header */}
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-16" style={{ backgroundColor: GOLD }} />
          <div className="w-2 h-2 rotate-45" style={{ backgroundColor: GOLD }} />
          <div className="h-px w-16" style={{ backgroundColor: GOLD }} />
        </div>
        <h1 className="text-4xl font-bold tracking-wide mb-2">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-sm uppercase tracking-[0.3em] mb-3" style={{ color: GOLD }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-600">{contactItems.join('  ·  ')}</p>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-7">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-center italic px-6">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Experience" />
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-sm italic mb-2 text-gray-700">{exp.company}</p>
                {exp.description && (
                  <ul className="space-y-1">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed flex gap-2">
                        <span className="text-xs mt-1" style={{ color: GOLD }}>◆</span>
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

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm italic text-gray-700">{edu.school}</p>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>
                  {edu.graduationYear}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2 justify-center">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 border"
                style={{ borderColor: GOLD, color: CHARCOAL, backgroundColor: '#fdf9ef' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-xs italic text-gray-500">({proj.link})</span>}
                </div>
                <p className="text-sm leading-relaxed text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-sm">
                <p><span className="font-bold">{cert.name}</span> <span className="italic text-gray-600">— {cert.issuer}</span></p>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>{cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {data.showReferences && data.references.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id} className="border-l-2 pl-3" style={{ borderColor: GOLD }}>
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs italic text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs text-gray-600">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom sections */}
      {data.customSections.map((section) =>
        section.items.length > 0 ? (
          <section key={section.id} className="mb-7">
            <SectionHeader title={section.title} />
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    {item.date && (
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>{item.date}</span>
                    )}
                  </div>
                  {item.subtitle && <p className="text-sm italic text-gray-700 mb-1">{item.subtitle}</p>}
                  {item.description && <p className="text-sm leading-relaxed text-gray-700">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
