import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xs font-black uppercase tracking-widest border-b border-gray-200 pb-2 mb-6"
      style={{ color: 'var(--theme-color)' }}
    >
      {children}
    </h2>
  );
}

function dateRange(startDate?: string, endDate?: string) {
  const parts = [startDate, endDate].filter(Boolean);
  return parts.length > 0 ? parts.join(' \u2014 ') : null;
}

export default function Canvas({ data }: { data: ResumeData }) {
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="font-sans w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 px-12 py-12">
      {/* Header: oversized creative name + thick theme underline bar */}
      {orderSections(data, {
        personal: (
      <header className="mb-12">
        {data.personalInfo.fullName && (
          <h1 className="text-6xl font-black tracking-tight text-black leading-none">
            {data.personalInfo.fullName}
          </h1>
        )}
        <div className="h-2 w-28 mt-5" style={{ backgroundColor: 'var(--theme-color)' }} />
        {data.personalInfo.jobTitle && (
          <p className="text-xl font-bold mt-4" style={{ color: 'var(--theme-color)' }}>
            {data.personalInfo.jobTitle}
          </p>
        )}
        {contact.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
            {contact.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        )}
      </header>
        ),
      })}

      {/* Disciplined body */}
      <div className="space-y-10">
        {orderSections(data, {
          personal: data.summary && (
          <section>
            <SectionTitle>Summary</SectionTitle>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-7">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    {dateRange(exp.startDate, exp.endDate) && (
                      <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                        {dateRange(exp.startDate, exp.endDate)}
                      </span>
                    )}
                  </div>
                  {exp.company && (
                    <div className="text-sm font-semibold text-gray-700">{exp.company}</div>
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
          </section>
          ),

          education: data.education && data.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                  {edu.graduationYear && (
                    <div className="text-xs font-bold text-gray-500 mt-1">{edu.graduationYear}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          skills: data.skills && data.skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(skill => (
                <span
                  key={skill.id}
                  className="text-white text-sm font-semibold px-4 py-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--theme-color)' }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <section>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-5">
              {data.projects.map(project => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline gap-4">
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
                    <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-gray-600">
                      {project.description.split(/\n|\r?\n/).filter(Boolean).map((line, i) => (
                        <li key={i}>{line.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <div className="space-y-3">
              {data.certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-baseline gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                    {cert.issuer && <div className="text-sm text-gray-600">{cert.issuer}</div>}
                  </div>
                  {cert.date && (
                    <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {cert.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <section>
            <SectionTitle>References</SectionTitle>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map(ref => (
                <div
                  key={ref.id}
                  className="border-l-4 pl-4"
                  style={{ borderColor: 'var(--theme-color)' }}
                >
                  <div className="font-bold text-gray-900 text-sm">{ref.name}</div>
                  <div className="text-sm text-gray-600">
                    {[ref.title, ref.company].filter(Boolean).join(' \u00B7 ')}
                  </div>
                  {ref.contact && <div className="text-xs text-gray-500 mt-1">{ref.contact}</div>}
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
                <SectionTitle>{section.title}</SectionTitle>
                <div className="space-y-4">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-4">
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
              </section>
          ))
        )}

      </div>
    </div>
  );
}
