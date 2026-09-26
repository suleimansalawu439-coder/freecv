import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function HairlineRule() {
  return (
    <div className="space-y-[3px]">
      <div className="border-t border-[var(--theme-color)]" />
      <div className="border-t border-[var(--theme-color)]" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-bold uppercase tracking-[0.3em] text-center text-[var(--theme-color)] mb-5">
      {children}
    </h2>
  );
}

export default function Counsel({ data }: { data: ResumeData }) {
  const p = data.personalInfo;
  const contactLine = [p.email, p.phone, p.location, p.website].filter(Boolean).join('  |  ');

  return (
    <div className="font-serif w-full max-w-[816px] mx-auto bg-white text-[#1a1a1a] min-h-[1056px] px-20 py-14">
      {orderSections(data, {
        personal: (
          <header className="text-center mb-8">
        <h1 className="text-5xl font-bold tracking-wide leading-tight mb-3">{p.fullName}</h1>
        <p className="text-xl italic text-gray-700 mb-4">{p.jobTitle}</p>
        {contactLine && <p className="text-sm text-gray-500">{contactLine}</p>}
          </header>
        ),
      })}

      <HairlineRule />

      <div className="mt-8 space-y-8">
        {orderSections(data, {
          personal: data.summary && (
          <section>
            <SectionTitle>Professional Summary</SectionTitle>
            <p className="text-base leading-relaxed text-gray-800 text-justify">{data.summary}</p>
          </section>
        ),

          experience: data.experience && data.experience.length > 0 && (
          <section>
            <SectionTitle>Professional Experience</SectionTitle>
            <div className="space-y-7">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-bold">{exp.role}</h3>
                    <span className="text-sm italic text-gray-500 shrink-0">
                      {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                    </span>
                  </div>
                  <div className="text-base italic text-gray-600 mb-1">{exp.company}</div>
                  {exp.description && (
                    <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-line text-justify">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ),

          education: data.education && data.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-5">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="font-bold text-base">{edu.degree}</div>
                    <div className="text-sm italic text-gray-600">{edu.school}</div>
                  </div>
                  {edu.graduationYear && (
                    <div className="text-sm italic text-gray-500 shrink-0">{edu.graduationYear}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ),

          skills: data.skills && data.skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <p className="text-sm leading-relaxed text-gray-800 text-center">
              {data.skills.map((s) => s.name).join('  •  ')}
            </p>
          </section>
        ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <section>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-5">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-lg font-bold">{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} className="text-sm text-gray-500 underline break-all">{proj.link}</a>
                  )}
                  {proj.description && (
                    <p className="text-sm leading-relaxed text-gray-800 mt-1 whitespace-pre-line text-justify">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <div className="space-y-4">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="font-bold text-base">{cert.name}</div>
                    <div className="text-sm italic text-gray-600">{cert.issuer}</div>
                  </div>
                  {cert.date && <div className="text-sm italic text-gray-500 shrink-0">{cert.date}</div>}
                </div>
              ))}
            </div>
          </section>
        ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <section>
            <SectionTitle>References</SectionTitle>
            <div className="space-y-4">
              {data.references.map((ref) => (
                <div key={ref.id} className="text-center">
                  <div className="font-bold text-base">{ref.name}</div>
                  <div className="text-sm italic text-gray-600">
                    {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                  </div>
                  {ref.contact && <div className="text-sm text-gray-500">{ref.contact}</div>}
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
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <p className="text-sm font-bold">{item.title}</p>
                          {item.subtitle && <p className="text-sm italic text-gray-600">{item.subtitle}</p>}
                        </div>
                        {item.date && <p className="text-sm italic text-gray-500 shrink-0">{item.date}</p>}
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-800 mt-1 whitespace-pre-line text-justify">
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

      <div className="mt-10">
        <HairlineRule />
      </div>
    </div>
  );
}
