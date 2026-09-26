import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function MainSectionHeader({ title }: { title: string }) {
  return (
    <h2
      className="text-xs font-bold uppercase tracking-widest mb-4"
      style={{ color: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );
}

function RailSectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
      {title}
    </h2>
  );
}

function bullets(description: string): string[] {
  return (description || '').split(/\n|\r?\n/).filter((l) => l.trim());
}

function dateRange(start: string, end: string): string {
  return [start, end].filter(Boolean).join(' — ');
}

export default function Pixel({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto font-sans text-gray-900">
      {/* Full-width header */}
      {orderSections(data, {
        personal: (
      <header className="p-10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">{info.fullName}</h1>
        {info.jobTitle && <p className="text-base text-gray-600 mt-1.5">{info.jobTitle}</p>}
        {contactItems.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">{contactItems.join(' · ')}</p>
        )}
      </header>
        ),
      })}

      {/* Two-column body */}
      <div className="flex px-10 pb-10 items-stretch">
        {/* Left 70% */}
        <div className="w-[70%] pr-8">
        {orderSections(data, {
          personal: data.summary && (
            <section className="mb-7">
              <MainSectionHeader title="Profile" />
              <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
            </section>
          ),

            experience: data.experience.length > 0 && (
            <section className="mb-7">
              <MainSectionHeader title="Experience" />
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
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
                          <li
                            key={i}
                            className="flex gap-2 text-sm leading-relaxed text-gray-700"
                          >
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
            ),

            projects: data.showProjects && data.projects.length > 0 && (
            <section className="mb-7">
              <MainSectionHeader title="Projects" />
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                      {proj.link && (
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {proj.link}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-sm leading-relaxed text-gray-700">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
            ),

        },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
                <section key={section.id} className="mb-7">
                  <MainSectionHeader title={section.title} />
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
          ))
        )}
        </div>

        {/* Right 30% rail */}
        <aside className="w-[30%] bg-gray-50 p-6">
          {orderSections(data, {
            skills: data.skills.length > 0 && (
            <section className="mb-6">
              <RailSectionHeader title="Skills" />
              <div className="space-y-3">
                {data.skills.map((skill, i) => {
                  const pct = 65 + ((i * 7) % 31);
                  return (
                    <div key={skill.id}>
                      <p className="text-xs font-bold text-gray-800 mb-1">{skill.name}</p>
                      <div className="h-1.5 bg-gray-200 rounded overflow-hidden">
                        <div
                          className="h-full rounded"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: 'var(--theme-color)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            ),

            education: data.education.length > 0 && (
            <section className="mb-6">
              <RailSectionHeader title="Education" />
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-xs font-bold text-gray-800">{edu.degree}</p>
                    {edu.school && <p className="text-xs text-gray-600">{edu.school}</p>}
                    {edu.graduationYear && (
                      <p className="text-xs text-gray-500">{edu.graduationYear}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
            ),

            certifications: data.showCertifications && data.certifications.length > 0 && (
            <section className="mb-6">
              <RailSectionHeader title="Certifications" />
              <div className="space-y-2.5">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-xs font-bold text-gray-800">{cert.name}</p>
                    {cert.issuer && <p className="text-xs text-gray-600">{cert.issuer}</p>}
                    {cert.date && <p className="text-xs text-gray-500">{cert.date}</p>}
                  </div>
                ))}
              </div>
            </section>
            ),

            references: data.showReferences && data.references.length > 0 && (
            <section className="mb-6">
              <RailSectionHeader title="References" />
              <div className="space-y-3">
                {data.references.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-xs font-bold text-gray-800">{ref.name}</p>
                    <p className="text-xs text-gray-600">
                      {ref.title}
                      {ref.company ? ` @ ${ref.company}` : ''}
                    </p>
                    {ref.contact && <p className="text-xs text-gray-500">{ref.contact}</p>}
                  </div>
                ))}
              </div>
            </section>
            ),
          })}
        </aside>
      </div>
    </div>
  );
}
