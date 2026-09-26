import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function LadderHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-black uppercase tracking-[0.22em] mb-5" style={{ color: 'var(--theme-color)' }}>
      {title}
    </h2>
  );
}

export default function Ladder({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-12 py-10">
      {orderSections(data, {
        personal: (
          <>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex flex-col gap-1">
                  <div className="w-1 h-8" style={{ backgroundColor: 'var(--theme-color)' }} />
                  <div className="w-1 h-8" style={{ backgroundColor: 'var(--theme-color)', opacity: 0.6 }} />
                  <div className="w-1 h-8" style={{ backgroundColor: 'var(--theme-color)', opacity: 0.3 }} />
                </div>
                <div>
                  <h1 className="text-4xl font-black tracking-tight">{info.fullName}</h1>
                  {info.jobTitle && (
                    <p className="text-base font-bold mt-1" style={{ color: 'var(--theme-color)' }}>
                      {info.jobTitle}
                    </p>
                  )}
                </div>
              </div>
              {contactItems.length > 0 && (
                <p className="text-xs text-gray-600 mt-3">{contactItems.join('  •  ')}</p>
              )}
            </header>

            {data.summary && (
              <section className="mb-9">
                <LadderHeader title="Profile" />
                <p className="text-sm leading-relaxed text-gray-700 border-l-4 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  {data.summary}
                </p>
              </section>
            )}
          </>
        ),

        experience: data.experience.length > 0 && (
          <section className="mb-9">
            <LadderHeader title="Career Ladder" />
            <div className="flex">
              {/* Rails */}
              <div className="flex gap-2 mr-5 shrink-0">
                <div className="w-[3px] rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
                <div className="w-[3px] rounded-full" style={{ backgroundColor: 'var(--theme-color)', opacity: 0.35 }} />
              </div>
              {/* Rungs */}
              <div className="flex-1 space-y-5">
                {data.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="border border-gray-200 rounded-lg px-5 py-4 bg-white"
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold">{exp.role}</h3>
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 rounded whitespace-nowrap ml-4"
                        style={{ backgroundColor: 'var(--theme-color)', color: '#fff' }}
                      >
                        {exp.startDate} – {exp.endDate}
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
            </div>
          </section>
        ),

        skills: data.skills.length > 0 && (
          <section className="mb-9">
            <LadderHeader title="Skills" />
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.skills.map((s) => s.name).join('  ·  ')}
            </p>
          </section>
        ),

        education: data.education.length > 0 && (
          <section className="mb-9">
            <LadderHeader title="Education" />
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: 'var(--theme-color)' }} />
                  <div className="flex-1 flex justify-between items-baseline">
                    <div>
                      <p className="text-sm font-bold">{edu.degree}</p>
                      <p className="text-sm text-gray-600">{edu.school}</p>
                    </div>
                    <p className="text-xs font-bold" style={{ color: 'var(--theme-color)' }}>
                      {edu.graduationYear}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
          <section className="mb-9">
            <LadderHeader title="Projects" />
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
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
          <section className="mb-9">
            <LadderHeader title="Certifications" />
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{cert.name} <span className="font-normal text-gray-600">— {cert.issuer}</span></p>
                  <p className="text-xs font-semibold text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
          <section className="mb-9">
            <LadderHeader title="References" />
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
        ),
      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <section key={section.id} className="mb-9">
            <LadderHeader title={section.title} />
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
        ))
      )}
    </div>
  );
}
