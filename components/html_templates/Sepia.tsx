import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const SEPIA_DARK = '#4a3728';
const SEPIA = '#8b6f47';
const SEPIA_LIGHT = '#f5efe3';
const SEPIA_LINE = '#d9c9a8';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 mt-8 first:mt-0">
      <h2
        className="font-serif text-sm font-bold uppercase tracking-[0.25em]"
        style={{ color: SEPIA_DARK }}
      >
        {title}
      </h2>
      <div className="mt-2 h-px" style={{ backgroundColor: SEPIA_LINE }} />
    </div>
  );
}

export default function Sepia({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div
      className="w-[8.5in] min-w-[8.5in] min-h-[11in] font-serif mx-auto px-16 py-12"
      style={{ backgroundColor: '#fdfbf6', color: SEPIA_DARK }}
    >
      {orderSections(data, {
        personal: (
          <>
            {/* Sepia header */}
            <header className="text-center pb-6 mb-2 border-b" style={{ borderColor: SEPIA_LINE }}>
              <p
                className="text-[11px] uppercase tracking-[0.35em] mb-3"
                style={{ color: SEPIA }}
              >
                Curriculum Vitae
              </p>
              <h1 className="text-4xl font-bold tracking-wide">{info.fullName}</h1>
              {info.jobTitle && (
                <p className="text-base italic mt-2" style={{ color: SEPIA }}>
                  {info.jobTitle}
                </p>
              )}
              {contactItems.length > 0 && (
                <p className="text-xs mt-3" style={{ color: SEPIA }}>
                  {contactItems.join('  ·  ')}
                </p>
              )}
            </header>

            {data.summary && (
              <section>
                <SectionHeader title="Profile" />
                <p
                  className="text-sm leading-relaxed px-5 py-4 italic border-l-2"
                  style={{ backgroundColor: SEPIA_LIGHT, borderColor: SEPIA }}
                >
                  {data.summary}
                </p>
              </section>
            )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section>
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <span className="text-sm italic" style={{ color: SEPIA }}>
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-2" style={{ color: SEPIA }}>
                  {exp.company}
                </p>
                <ul className="space-y-1.5">
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed flex gap-2">
                        <span style={{ color: SEPIA }}>❧</span>
                        <span>{line}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm italic" style={{ color: SEPIA }}>
                    {edu.school}
                  </p>
                </div>
                <span className="text-sm italic" style={{ color: SEPIA }}>
                  {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section>
          <SectionHeader title="Skills" />
          <p className="text-sm leading-loose">
            {data.skills.map((s, i) => (
              <React.Fragment key={s.id}>
                <span>{s.name}</span>
                {i < data.skills.length - 1 && (
                  <span style={{ color: SEPIA }}>  ·  </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && (
                    <span className="text-xs italic" style={{ color: SEPIA }}>
                      ({proj.link})
                    </span>
                  )}
                </div>
                <p className="text-sm mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && (
                    <span className="italic" style={{ color: SEPIA }}>
                      {' '}
                      · {cert.issuer}
                    </span>
                  )}
                </p>
                <span className="text-sm italic" style={{ color: SEPIA }}>
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </section>
        ),


        references: data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs italic" style={{ color: SEPIA }}>
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-xs mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
        ),
      },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
        <section key={section.id}>
          <SectionHeader title={section.title} />
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{item.title}</p>
                  {item.date && (
                    <span className="text-sm italic" style={{ color: SEPIA }}>
                      {item.date}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <p className="text-sm italic" style={{ color: SEPIA }}>
                    {item.subtitle}
                  </p>
                )}
                {item.description && <p className="text-sm mt-1">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
          ))
      )}

      <footer className="mt-10 pt-4 border-t text-center" style={{ borderColor: SEPIA_LINE }}>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-20" style={{ backgroundColor: SEPIA_LINE }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: SEPIA }} />
          <div className="h-px w-20" style={{ backgroundColor: SEPIA_LINE }} />
        </div>
      </footer>
    </div>
  );
}
