import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function TriHeader({ title }: { title: string }) {
  return (
    <h2
      className="text-[11px] font-black uppercase tracking-[0.18em] mb-4 pb-2 border-b-2"
      style={{ color: 'var(--theme-color)', borderColor: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );
}

export default function Trifold({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto flex flex-col">
      {/* Full-width header */}
      {orderSections(data, {
        personal: (
          <header className="px-10 pt-9 pb-6 text-center border-b border-gray-200">
            <h1 className="text-4xl font-black tracking-tight mb-1">{info.fullName}</h1>
            {info.jobTitle && (
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--theme-color)' }}>
                {info.jobTitle}
              </p>
            )}
            {contactItems.length > 0 && (
              <p className="text-xs text-gray-600">{contactItems.join('  ·  ')}</p>
            )}
          </header>
        ),
      })}

      {/* Summary full width */}
      {orderSections(data, {
        personal: data.summary && (
          <div className="px-10 pt-6 pb-2">
            <p className="text-[13px] leading-relaxed text-gray-700 text-center max-w-3xl mx-auto italic">
              {data.summary}
            </p>
          </div>
        ),
      })}

      {/* Three columns */}
      <div className="flex flex-1 px-10 py-6 gap-8">
        {/* Column 1: Experience + Projects */}
        <div className="w-[38%]">
          {orderSections(data, {
            experience: data.experience.length > 0 && (
              <section className="mb-6">
                <TriHeader title="Experience" />
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-5">
                    <h3 className="text-[13px] font-bold leading-snug">{exp.role}</h3>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--theme-color)' }}>
                      {exp.company}
                    </p>
                    <p className="text-[11px] text-gray-500 mb-1.5">{exp.startDate} – {exp.endDate}</p>
                    {exp.description && (
                      <ul className="list-disc list-outside ml-3.5 space-y-1">
                        {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                          <li key={i} className="text-xs leading-relaxed text-gray-700">{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            ),

            projects: data.showProjects && data.projects.length > 0 && (
              <section className="mb-6">
                <TriHeader title="Projects" />
                {data.projects.map((proj) => (
                  <div key={proj.id} className="mb-4">
                    <h3 className="text-[13px] font-bold">{proj.name}</h3>
                    <p className="text-xs text-gray-700 leading-relaxed mt-1">{proj.description}</p>
                  </div>
                ))}
              </section>
            ),
          })}
        </div>

        {/* Column 2: Skills + Certifications + Custom */}
        <div className="w-[31%]">
          {orderSections(data, {
            skills: data.skills.length > 0 && (
              <section className="mb-6">
                <TriHeader title="Skills" />
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-[11px] font-semibold px-2 py-1 rounded"
                      style={{ backgroundColor: 'var(--theme-color)', color: '#fff' }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            ),

            certifications: data.showCertifications && data.certifications.length > 0 && (
              <section className="mb-6">
                <TriHeader title="Certifications" />
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="mb-3">
                    <p className="text-xs font-bold">{cert.name}</p>
                    <p className="text-[11px] text-gray-600">{cert.issuer}</p>
                    <p className="text-[11px] text-gray-500">{cert.date}</p>
                  </div>
                ))}
              </section>
            ),
          },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
                <section key={section.id} className="mb-6">
                  <TriHeader title={section.title} />
                  {section.items.map((item) => (
                    <div key={item.id} className="mb-3">
                      <p className="text-xs font-bold">{item.title}</p>
                      {item.subtitle && <p className="text-[11px] text-gray-600">{item.subtitle}</p>}
                      {item.date && <p className="text-[11px] text-gray-500">{item.date}</p>}
                      {item.description && <p className="text-[11px] text-gray-700 leading-relaxed mt-1">{item.description}</p>}
                    </div>
                  ))}
                </section>
              ))
          )}
        </div>

        {/* Column 3: Education + References */}
        <div className="w-[31%]">
          {orderSections(data, {
            education: data.education.length > 0 && (
              <section className="mb-6">
                <TriHeader title="Education" />
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <p className="text-[13px] font-bold">{edu.degree}</p>
                    <p className="text-xs text-gray-600">{edu.school}</p>
                    <p className="text-[11px] font-bold" style={{ color: 'var(--theme-color)' }}>
                      {edu.graduationYear}
                    </p>
                  </div>
                ))}
              </section>
            ),

            references: data.showReferences && data.references.length > 0 && (
              <section className="mb-6">
                <TriHeader title="References" />
                {data.references.map((ref) => (
                  <div key={ref.id} className="mb-3">
                    <p className="text-xs font-bold">{ref.name}</p>
                    <p className="text-[11px] text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                    <p className="text-[11px] text-gray-500">{ref.contact}</p>
                  </div>
                ))}
              </section>
            ),
          })}
        </div>
      </div>
    </div>
  );
}
