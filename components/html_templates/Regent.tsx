import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const CHARCOAL = '#1f2937';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center mb-5">
      <div className="flex-1 border-t border-gray-300" />
      <h2
        className="mx-5 text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap"
        style={{ color: CHARCOAL }}
      >
        {children}
      </h2>
      <div className="flex-1 border-t border-gray-300" />
    </div>
  );
}

export default function Regent({ data }: { data: ResumeData }) {
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  const lines = (d?: string) => (d || '').split(/\n|\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto p-[0.85in] font-sans text-gray-900">
      {/* Experience */}
      {orderSections(data, {
        personal: (
          <>
            {/* Header */}
            <header className="text-center">
              {data.personalInfo.fullName && (
                <h1 className="font-serif text-4xl font-bold" style={{ color: CHARCOAL }}>
                  {data.personalInfo.fullName}
                </h1>
              )}
              {data.personalInfo.jobTitle && (
                <p className="mt-2 text-base font-medium" style={{ color: 'var(--theme-color)' }}>
                  {data.personalInfo.jobTitle}
                </p>
              )}
              {contact.length > 0 && (
                <p className="mt-3 text-xs text-gray-500">{contact.join(' · ')}</p>
              )}
              <div className="mt-6 border-t border-b border-gray-800 h-1.5" />
            </header>

            {/* Summary */}
            {data.summary && (
              <section className="mt-8">
                <SectionTitle>Profile</SectionTitle>
                <p className="text-sm leading-relaxed text-gray-700 text-center">{data.summary}</p>
              </section>
            )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section className="mt-8">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                  </span>
                </div>
                {exp.company && (
                  <p className="italic text-sm text-gray-700 mt-0.5">{exp.company}</p>
                )}
                {lines(exp.description).length > 0 && (
                  <ul className="mt-2 list-disc list-outside ml-5 space-y-1 text-sm text-gray-700">
                    {lines(exp.description).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
          // Education
        <section className="mt-8">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id}>
                <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-700">{edu.school}</p>
                {edu.graduationYear && (
                  <p className="text-xs text-gray-500 mt-0.5">{edu.graduationYear}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
          // Skills
        <section className="mt-8">
          <SectionTitle>Skills</SectionTitle>
          <p className="text-sm font-bold text-gray-800 text-center leading-relaxed">
            {data.skills.map(s => s.name).join(', ')}
          </p>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
          // Projects
        <section className="mt-8">
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm text-gray-900">{proj.name}</h3>
                  {proj.link && (
                    <span className="text-xs ml-4" style={{ color: 'var(--theme-color)' }}>{proj.link}</span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
          // Certifications
        <section className="mt-8">
          <SectionTitle>Certifications</SectionTitle>
          <ul className="space-y-2 text-sm text-gray-700">
            {data.certifications.map(cert => (
              <li key={cert.id}>
                <span className="font-bold text-gray-900">{cert.name}</span>
                {cert.issuer && <span> — {cert.issuer}</span>}
                {cert.date && <span>, {cert.date}</span>}
              </li>
            ))}
          </ul>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
          // References
        <section className="mt-8">
          <SectionTitle>References</SectionTitle>
          <div className="space-y-4">
            {data.references.map(ref => (
              <div key={ref.id}>
                <h3 className="font-bold text-sm text-gray-900">{ref.name}</h3>
                {(ref.title || ref.company) && (
                  <p className="text-sm text-gray-700">
                    {ref.title}{ref.title && ref.company ? ' — ' : ''}{ref.company}
                  </p>
                )}
                {ref.contact && <p className="text-sm text-gray-500">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
        ),
      },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
          <section key={section.id} className="mt-8">
            <SectionTitle>{section.title}</SectionTitle>
            <div className="space-y-4">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                    {item.date && <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm italic text-gray-700">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
          ))
      )}

      {/* Custom Sections */}
    </div>
  );
}
