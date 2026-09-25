import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function Tile({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="bg-white border border-gray-200 rounded-lg p-5"
      style={{ borderTopWidth: 3, borderTopColor: 'var(--theme-color)' }}
    >
      <h2 className="text-xs font-black uppercase tracking-widest text-gray-800 mb-4 flex items-center">
        <span
          className="inline-block w-2 h-2 mr-2 shrink-0"
          style={{ backgroundColor: 'var(--theme-color)' }}
        />
        {title}
      </h2>
      {children}
    </section>
  );
}

function dateRange(startDate?: string, endDate?: string) {
  const parts = [startDate, endDate].filter(Boolean);
  return parts.length > 0 ? parts.join(' \u2014 ') : null;
}

export default function Mosaic({ data }: { data: ResumeData }) {
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  const hasEducation = !!(data.education && data.education.length > 0);
  const hasSkills = !!(data.skills && data.skills.length > 0);
  const hasCerts =
    !!(data.showCertifications && data.certifications && data.certifications.length > 0);
  const hasRefs =
    !!(data.showReferences && data.references && data.references.length > 0);
  const hasProjects =
    !!(data.showProjects && data.projects && data.projects.length > 0);

  const skillChips = hasSkills ? (
    <div className="flex flex-wrap gap-2">
      {data.skills.map(skill => (
        <span
          key={skill.id}
          className="text-xs font-bold px-3 py-1.5 rounded-md"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--theme-color) 12%, white)',
            color: 'var(--theme-color)',
          }}
        >
          {skill.name}
        </span>
      ))}
    </div>
  ) : null;

  const educationBody = hasEducation ? (
    <div className="space-y-4">
      {data.education.map(edu => (
        <div key={edu.id}>
          <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
          <div className="text-sm text-gray-600">{edu.school}</div>
          {edu.graduationYear && (
            <div
              className="text-xs font-bold mt-1"
              style={{ color: 'var(--theme-color)' }}
            >
              {edu.graduationYear}
            </div>
          )}
        </div>
      ))}
    </div>
  ) : null;

  return (
    <div className="font-sans w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 px-10 py-10">
      {/* Full-width header: name left, contact right */}
      <header className="flex items-start justify-between gap-8 mb-8">
        <div>
          {data.personalInfo.fullName && (
            <h1 className="text-5xl font-black tracking-tight text-gray-900 leading-none">
              {data.personalInfo.fullName}
            </h1>
          )}
          {data.personalInfo.jobTitle && (
            <p
              className="text-lg font-bold mt-2"
              style={{ color: 'var(--theme-color)' }}
            >
              {data.personalInfo.jobTitle}
            </p>
          )}
        </div>
        {contact.length > 0 && (
          <div className="text-right text-sm text-gray-600 space-y-1 shrink-0">
            {contact.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        )}
      </header>

      <div className="space-y-5">
        {/* Row 1: summary, full width */}
        {data.summary && (
          <Tile title="Summary">
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </Tile>
        )}

        {/* Row 2: experience, full width */}
        {data.experience && data.experience.length > 0 && (
          <Tile title="Experience">
            <div className="space-y-5">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-bold text-gray-900 text-sm">{exp.role}</h3>
                    {dateRange(exp.startDate, exp.endDate) && (
                      <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                        {dateRange(exp.startDate, exp.endDate)}
                      </span>
                    )}
                  </div>
                  {exp.company && (
                    <div
                      className="text-sm font-semibold"
                      style={{ color: 'var(--theme-color)' }}
                    >
                      {exp.company}
                    </div>
                  )}
                  {exp.description && (
                    <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-gray-600">
                      {exp.description.split(/\n|\r?\n/).filter(Boolean).map((line, i) => (
                        <li key={i}>{line.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Tile>
        )}

        {/* Row 3: education (55%) + skills (45%) */}
        {(hasEducation || hasSkills) && (
          <>
            {hasEducation && hasSkills ? (
              <div className="grid grid-cols-[55fr_45fr] gap-5">
                <Tile title="Education">{educationBody}</Tile>
                <Tile title="Skills">{skillChips}</Tile>
              </div>
            ) : hasEducation ? (
              <Tile title="Education">{educationBody}</Tile>
            ) : (
              <Tile title="Skills">{skillChips}</Tile>
            )}
          </>
        )}

        {/* Row 4: certifications (50%) + references (50%) */}
        {(hasCerts || hasRefs) && (
          <>
            {hasCerts && hasRefs ? (
              <div className="grid grid-cols-2 gap-5">
                <Tile title="Certifications">
                  <div className="space-y-3">
                    {data.certifications.map(cert => (
                      <div key={cert.id}>
                        <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                        {cert.issuer && (
                          <div className="text-sm text-gray-600">{cert.issuer}</div>
                        )}
                        {cert.date && (
                          <div
                            className="text-xs font-bold mt-1"
                            style={{ color: 'var(--theme-color)' }}
                          >
                            {cert.date}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Tile>
                <Tile title="References">
                  <div className="space-y-3">
                    {data.references.map(ref => (
                      <div key={ref.id}>
                        <div className="font-bold text-gray-900 text-sm">{ref.name}</div>
                        <div className="text-sm text-gray-600">
                          {[ref.title, ref.company].filter(Boolean).join(' \u00B7 ')}
                        </div>
                        {ref.contact && (
                          <div className="text-xs text-gray-500 mt-1">{ref.contact}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </Tile>
              </div>
            ) : hasCerts ? (
              <Tile title="Certifications">
                <div className="space-y-3">
                  {data.certifications.map(cert => (
                    <div key={cert.id} className="flex justify-between items-baseline gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                        {cert.issuer && (
                          <div className="text-sm text-gray-600">{cert.issuer}</div>
                        )}
                      </div>
                      {cert.date && (
                        <span
                          className="text-xs font-bold whitespace-nowrap"
                          style={{ color: 'var(--theme-color)' }}
                        >
                          {cert.date}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </Tile>
            ) : (
              <Tile title="References">
                <div className="grid grid-cols-2 gap-5">
                  {data.references.map(ref => (
                    <div key={ref.id}>
                      <div className="font-bold text-gray-900 text-sm">{ref.name}</div>
                      <div className="text-sm text-gray-600">
                        {[ref.title, ref.company].filter(Boolean).join(' \u00B7 ')}
                      </div>
                      {ref.contact && (
                        <div className="text-xs text-gray-500 mt-1">{ref.contact}</div>
                      )}
                    </div>
                  ))}
                </div>
              </Tile>
            )}
          </>
        )}

        {/* Projects, full width */}
        {hasProjects && (
          <Tile title="Projects">
            <div className="space-y-4">
              {data.projects.map(project => (
                <div key={project.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-bold text-gray-900 text-sm">{project.name}</h3>
                    {project.link && (
                      <span
                        className="text-xs font-semibold whitespace-nowrap"
                        style={{ color: 'var(--theme-color)' }}
                      >
                        {project.link}
                      </span>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Tile>
        )}

        {/* Custom sections, full width */}
        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map(section =>
            section.items && section.items.length > 0 ? (
              <Tile key={section.id} title={section.title}>
                <div className="space-y-4">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                        {item.date && (
                          <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <div className="text-sm text-gray-600 italic">{item.subtitle}</div>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Tile>
            ) : null
          )}
      </div>
    </div>
  );
}
