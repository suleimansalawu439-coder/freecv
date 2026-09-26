import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function MainHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-xl font-normal text-gray-900 mt-10 mb-6">
      {children}
    </h2>
  );
}

function MarginHead({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif text-[11px] font-bold uppercase tracking-[0.22em] mb-4"
      style={{ color: 'var(--theme-color)' }}
    >
      {children}
    </h2>
  );
}

export default function Marginalia({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-gray-900 mx-auto">
      {orderSections(data, {
        personal: (
          <header className="px-14 pt-14 pb-8">
            {info.fullName && (
              <h1 className="text-4xl font-normal tracking-tight">{info.fullName}</h1>
            )}
            {info.jobTitle && (
              <p className="text-lg italic text-gray-600 mt-2">{info.jobTitle}</p>
            )}
            {contact.length > 0 && (
              <p className="text-sm text-gray-500 mt-3">{contact.join('   ·   ')}</p>
            )}
          </header>
        ),
      })}

      <div className="flex px-14 pb-14">
        {/* Main flow */}
        <main className="w-[68%] pr-10">
          {orderSections(data, {
            personal: data.summary && (
              <section className="mb-2">
                <MainHead>Profile</MainHead>
                <p className="text-[15px] text-gray-800 leading-[1.9]">{data.summary}</p>
              </section>
            ),

            experience: data.experience.length > 0 && (
              <section>
                <MainHead>Experience</MainHead>
                <div className="space-y-8">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline gap-6">
                        <h3 className="font-serif text-lg font-bold leading-snug">{exp.role}</h3>
                        <span className="text-sm text-gray-400 italic whitespace-nowrap">
                          {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                        </span>
                      </div>
                      {exp.company && <p className="text-sm text-gray-600 italic mt-0.5">{exp.company}</p>}
                      {exp.description && (
                        <ul className="mt-2.5 space-y-1.5 list-disc pl-5">
                          {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                            <li key={i} className="text-[15px] text-gray-700 leading-[1.85]">{line.trim()}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ),

            projects: data.showProjects && data.projects.length > 0 && (
              <section>
                <MainHead>Projects</MainHead>
                <div className="space-y-6">
                  {data.projects.map((proj) => (
                    <div key={proj.id}>
                      <h3 className="font-serif text-base font-bold">
                        {proj.name}
                        {proj.link && <span className="font-normal text-sm text-gray-400"> — {proj.link}</span>}
                      </h3>
                      {proj.description && (
                        <p className="text-[15px] text-gray-700 mt-1.5 leading-[1.85]">{proj.description}</p>
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
              <section key={section.id}>
                <MainHead>{section.title}</MainHead>
                <div className="space-y-6">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-6">
                        {item.title && <h3 className="font-serif text-base font-bold">{item.title}</h3>}
                        {item.date && <span className="text-sm text-gray-400 italic whitespace-nowrap">{item.date}</span>}
                      </div>
                      {item.subtitle && <p className="text-sm text-gray-600 italic mt-0.5">{item.subtitle}</p>}
                      {item.description && (
                        <p className="text-[15px] text-gray-700 mt-1.5 leading-[1.85]">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </main>

        {/* Margin notes */}
        <aside className="w-[32%] pl-8 border-l border-gray-200">
          {orderSections(data, {
            skills: data.skills.length > 0 && (
              <section className="mb-10">
                <MarginHead>Margin Notes — Skills</MarginHead>
                <div className="space-y-2.5">
                  {data.skills.map((skill) => (
                    <p key={skill.id} className="font-serif text-sm text-gray-700 pl-3 border-l-2 leading-snug"
                      style={{ borderColor: 'var(--theme-color)' }}>
                      {skill.name}
                    </p>
                  ))}
                </div>
              </section>
            ),

            education: data.education.length > 0 && (
              <section className="mb-10">
                <MarginHead>Education</MarginHead>
                <div className="space-y-5">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      {edu.school && <p className="font-serif text-sm font-bold text-gray-900">{edu.school}</p>}
                      {edu.degree && <p className="text-sm text-gray-600 italic mt-0.5">{edu.degree}</p>}
                      {edu.graduationYear && <p className="text-xs text-gray-400 mt-0.5">{edu.graduationYear}</p>}
                    </div>
                  ))}
                </div>
              </section>
            ),

            certifications: data.showCertifications && data.certifications.length > 0 && (
              <section className="mb-10">
                <MarginHead>Certifications</MarginHead>
                <div className="space-y-4">
                  {data.certifications.map((cert) => (
                    <div key={cert.id}>
                      <p className="font-serif text-sm font-bold text-gray-900">{cert.name}</p>
                      {cert.issuer && <p className="text-sm text-gray-600 italic">{cert.issuer}</p>}
                      {cert.date && <p className="text-xs text-gray-400">{cert.date}</p>}
                    </div>
                  ))}
                </div>
              </section>
            ),

            references: data.showReferences && data.references.length > 0 && (
              <section>
                <MarginHead>References</MarginHead>
                <div className="space-y-4">
                  {data.references.map((ref) => (
                    <div key={ref.id}>
                      <p className="font-serif text-sm font-bold text-gray-900">{ref.name}</p>
                      {(ref.title || ref.company) && (
                        <p className="text-sm text-gray-600 italic">
                          {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                        </p>
                      )}
                      {ref.contact && <p className="text-xs text-gray-400">{ref.contact}</p>}
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
