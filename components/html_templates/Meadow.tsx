import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const SAGE = '#5f7161';
const SAGE_TINT = '#eef2ec';
const SAGE_LINE = '#d8e0d5';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-sm font-semibold uppercase tracking-[0.18em] mt-12 mb-6 pb-3 border-b"
      style={{ color: SAGE, borderColor: SAGE_LINE }}
    >
      {children}
    </h2>
  );
}

export default function Meadow({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-800 px-20 py-16 mx-auto leading-relaxed">
      {orderSections(data, {
        personal: (
          <>
            <header className="mb-4">
              {info.fullName && (
                <h1 className="text-4xl font-medium tracking-tight text-gray-900 leading-tight">{info.fullName}</h1>
              )}
              {info.jobTitle && (
                <p className="text-base mt-3 font-medium" style={{ color: SAGE }}>{info.jobTitle}</p>
              )}
              {contact.length > 0 && (
                <p className="text-sm text-gray-500 mt-4 leading-loose">{contact.join('   ·   ')}</p>
              )}
            </header>

            {data.summary && (
              <section>
                <SectionTitle>Profile</SectionTitle>
                <p className="text-[15px] text-gray-700 leading-loose">{data.summary}</p>
              </section>
            )}
          </>
        ),

        experience: data.experience.length > 0 && (
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-9">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-lg font-medium text-gray-900 leading-snug">{exp.role}</h3>
                  <p className="text-sm mt-1.5 text-gray-600">
                    {exp.company}
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-gray-400">
                        {'  ·  '}{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                      </span>
                    )}
                  </p>
                  {exp.description && (
                    <ul className="mt-3 space-y-2">
                      {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                        <li key={i} className="text-[15px] text-gray-700 leading-loose flex gap-3">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: SAGE }} />
                          <span>{line.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ),

        education: data.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  {edu.school && <p className="text-[15px] font-medium text-gray-900">{edu.school}</p>}
                  <p className="text-sm text-gray-600 mt-1">
                    {edu.degree}
                    {edu.graduationYear && <span className="text-gray-400">{'  ·  '}{edu.graduationYear}</span>}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ),

        skills: data.skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-sm text-gray-700 px-5 py-2.5 rounded-full leading-relaxed"
                  style={{ backgroundColor: SAGE_TINT, border: `1px solid ${SAGE_LINE}` }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-7">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-[15px] font-medium text-gray-900">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-gray-400">({proj.link})</span>}
                  </div>
                  {proj.description && (
                    <p className="text-[15px] text-gray-700 mt-2 leading-loose">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <div className="space-y-4">
              {data.certifications.map((cert) => (
                <p key={cert.id} className="text-[15px] text-gray-700 leading-relaxed">
                  <span className="font-medium text-gray-900">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-500"> — {cert.issuer}</span>}
                  {cert.date && <span className="text-gray-400">{'  ·  '}{cert.date}</span>}
                </p>
              ))}
            </div>
          </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
          <section>
            <SectionTitle>References</SectionTitle>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <p className="text-[15px] font-medium text-gray-900">{ref.name}</p>
                  {(ref.title || ref.company) && (
                    <p className="text-sm text-gray-600 mt-0.5">
                      {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                    </p>
                  )}
                  {ref.contact && <p className="text-sm text-gray-400 mt-0.5">{ref.contact}</p>}
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
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.id}>
                  {item.title && <h3 className="text-[15px] font-medium text-gray-900">{item.title}</h3>}
                  {(item.subtitle || item.date) && (
                    <p className="text-sm text-gray-500 mt-1">
                      {item.subtitle}{item.subtitle && item.date ? '  ·  ' : ''}{item.date}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-[15px] text-gray-700 mt-2 leading-loose">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
