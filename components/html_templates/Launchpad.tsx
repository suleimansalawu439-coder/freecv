import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="flex items-center gap-3 mb-4">
      <span className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--theme-color)]">
        {title}
      </span>
      <span className="flex-1 h-0.5 bg-[var(--theme-color)] opacity-25" />
    </h2>
  );
}

export default function Launchpad({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactBits = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="font-sans bg-white text-[#1a1a1a] min-h-[1056px] w-full max-w-[816px] mx-auto">
      {/* Accent header band */}
      <header
        className="px-12 py-10 text-white"
        style={{ backgroundColor: 'var(--theme-color)' }}
      >
        {info.profilePicture && (
          <img
            src={info.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white/40"
          />
        )}
        <h1 className="text-4xl font-bold tracking-tight">{info.fullName}</h1>
        {info.jobTitle && <p className="text-lg opacity-90 mt-1">{info.jobTitle}</p>}
        {contactBits.length > 0 && (
          <p className="text-sm opacity-80 mt-2">{contactBits.join('  ·  ')}</p>
        )}
      </header>

      <div className="px-12 py-8 space-y-8">
        {/* Summary */}
        {data.summary && (
          <section>
            <SectionTitle title="About Me" />
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {/* Education FIRST — hero section */}
        {data.education.length > 0 && (
          <section>
            <SectionTitle title="Education" />
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="border-l-4 pl-4 py-1"
                  style={{ borderColor: 'var(--theme-color)' }}
                >
                  <h3 className="text-lg font-bold leading-tight">{edu.degree}</h3>
                  {edu.school && (
                    <p className="text-sm font-medium text-gray-600">{edu.school}</p>
                  )}
                  {edu.graduationYear && (
                    <p className="text-xs font-bold text-[var(--theme-color)] mt-1">
                      {edu.graduationYear}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionTitle title="Projects" />
            <div className="grid grid-cols-2 gap-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <h3 className="text-sm font-bold mb-1">{proj.name}</h3>
                  {proj.description && (
                    <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
                  )}
                  {proj.link && (
                    <a href={proj.link} className="text-xs text-[var(--theme-color)] font-medium mt-1 inline-block">
                      View project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience (internships) */}
        {data.experience.length > 0 && (
          <section>
            <SectionTitle title="Experience" />
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-base font-bold leading-tight">{exp.role}</h3>
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {exp.startDate}
                      {exp.startDate && exp.endDate ? ' – ' : ''}
                      {exp.endDate}
                    </p>
                  </div>
                  {exp.company && (
                    <p className="text-sm font-medium text-[var(--theme-color)]">{exp.company}</p>
                  )}
                  {exp.description && (
                    <p className="text-sm text-gray-600 leading-relaxed mt-1 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <SectionTitle title="Skills" />
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs font-semibold bg-gray-100 px-3 py-1.5 rounded-full text-gray-700"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.showCertifications && data.certifications.length > 0 && (
          <section>
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
          <section>
            <SectionTitle title="References" />
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <h3 className="text-sm font-bold">{ref.name}</h3>
                  {(ref.title || ref.company) && (
                    <p className="text-xs text-gray-500">
                      {ref.title}
                      {ref.title && ref.company ? ' @ ' : ''}
                      {ref.company}
                    </p>
                  )}
                  {ref.contact && <p className="text-xs text-gray-400 mt-0.5">{ref.contact}</p>}
                </div>
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
                <section key={section.id}>
                  <SectionTitle title={section.title} />
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline gap-4">
                          <h3 className="text-sm font-bold">{item.title}</h3>
                          {item.date && (
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {item.date}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <p className="text-xs italic text-gray-500">{item.subtitle}</p>
                        )}
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )
          )}
      </div>
    </div>
  );
}
