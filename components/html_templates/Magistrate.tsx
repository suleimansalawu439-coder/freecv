import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-xs font-bold uppercase tracking-[0.3em] text-black mb-5">
      {children}
    </h2>
  );
}

export default function Magistrate({ data }: { data: ResumeData }) {
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  const lines = (d?: string) => (d || '').split(/\n|\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto p-[0.85in] font-serif text-black">
      {orderSections(data, {
        personal: (
          <>
            {/* Header */}
            <header className="text-center">
              <p className="text-[10px] tracking-[0.45em] text-gray-500 mb-4">CURRICULUM VITAE</p>
              {data.personalInfo.fullName && (
                <h1 className="text-3xl font-bold uppercase tracking-[0.2em] text-black leading-tight">
                  {data.personalInfo.fullName}
                </h1>
              )}
              {data.personalInfo.jobTitle && (
                <p className="mt-2 text-sm italic text-black">{data.personalInfo.jobTitle}</p>
              )}
              {contact.length > 0 && (
                <p className="mt-3 text-xs text-black">{contact.join(' · ')}</p>
              )}
            </header>

            {/* Summary */}
            {data.summary && (
              <section className="mt-10">
                <SectionTitle>Profile</SectionTitle>
                <p className="text-sm leading-relaxed text-black text-center">{data.summary}</p>
              </section>
            )}
          </>
        ),

        experience: data.experience.length > 0 && (
          <section className="mt-10">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id} className="flex gap-5">
                  <div className="w-28 shrink-0 text-right">
                    <div className="text-xs font-bold text-black leading-snug">
                      {exp.startDate && <div>{exp.startDate}</div>}
                      {exp.endDate && <div>– {exp.endDate}</div>}
                    </div>
                  </div>
                  <div className="flex-1">
                    {exp.role && (
                      <h3 className="font-bold text-sm text-black">{exp.role}</h3>
                    )}
                    {exp.company && (
                      <p className="text-sm text-black">{exp.company}</p>
                    )}
                    {lines(exp.description).length > 0 && (
                      <ul className="mt-2 list-disc list-outside ml-5 space-y-1 text-sm text-black">
                        {lines(exp.description).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ),

        education: data.education.length > 0 && (
          <section className="mt-10">
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id} className="text-center">
                  <h3 className="font-bold text-sm text-black">{edu.degree}</h3>
                  <p className="text-sm text-black">{edu.school}</p>
                  {edu.graduationYear && (
                    <p className="text-xs text-black mt-0.5">{edu.graduationYear}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ),

        skills: data.skills.length > 0 && (
          <section className="mt-10">
            <SectionTitle>Skills</SectionTitle>
            <ol className="space-y-1.5 max-w-md mx-auto">
              {data.skills.map((skill, i) => (
                <li key={skill.id} className="text-sm text-black flex gap-3">
                  <span className="font-bold shrink-0">{i + 1}.</span>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ol>
          </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
          <section className="mt-10">
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-4">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-sm text-black">{proj.name}</h3>
                    {proj.link && (
                      <span className="text-xs text-black ml-4">{proj.link}</span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-sm text-black mt-1">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
          <section className="mt-10">
            <SectionTitle>Certifications</SectionTitle>
            <ul className="space-y-2 text-sm text-black text-center">
              {data.certifications.map(cert => (
                <li key={cert.id}>
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span> — {cert.issuer}</span>}
                  {cert.date && <span>, {cert.date}</span>}
                </li>
              ))}
            </ul>
          </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
          <section className="mt-10">
            <SectionTitle>References</SectionTitle>
            <div className="space-y-4">
              {data.references.map(ref => (
                <div key={ref.id} className="text-center">
                  <h3 className="font-bold text-sm text-black">{ref.name}</h3>
                  {(ref.title || ref.company) && (
                    <p className="text-sm text-black">
                      {ref.title}{ref.title && ref.company ? ' — ' : ''}{ref.company}
                    </p>
                  )}
                  {ref.contact && <p className="text-sm text-black">{ref.contact}</p>}
                </div>
              ))}
            </div>
          </section>
        ),
      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <section key={section.id} className="mt-10">
            <SectionTitle>{section.title}</SectionTitle>
            <div className="space-y-4">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-sm text-black">{item.title}</h3>
                    {item.date && <span className="text-xs text-black ml-4 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm italic text-black">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-sm text-black mt-1 whitespace-pre-wrap">{item.description}</p>
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
