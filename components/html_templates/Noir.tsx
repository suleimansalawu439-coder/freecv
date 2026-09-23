import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionLabel({ title }: { title: string }) {
  return (
    <h2 className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--theme-color)] mb-5">
      {title}
    </h2>
  );
}

export default function Noir({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactBits = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="font-sans bg-[#111111] text-[#f5f5f5] min-h-[1056px] w-full max-w-[816px] mx-auto px-16 py-16">
      {/* Editorial header */}
      <header className="mb-14">
        <h1 className="text-6xl font-light tracking-tight leading-[1.05]">{info.fullName}</h1>
        <div className="w-16 h-[3px] mt-7 mb-5 bg-[var(--theme-color)]" />
        {info.jobTitle && <p className="text-xl font-light text-[#d4d4d4]">{info.jobTitle}</p>}
        {contactBits.length > 0 && (
          <p className="text-sm text-[#a3a3a3] mt-3">{contactBits.join('  ·  ')}</p>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-12">
          <SectionLabel title="Profile" />
          <p className="text-lg font-light leading-relaxed text-[#e5e5e5] max-w-2xl">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-12">
          <SectionLabel title="Experience" />
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <p className="text-xs uppercase tracking-widest text-[#a3a3a3] mb-1.5">
                  {exp.startDate}
                  {exp.startDate && exp.endDate ? ' — ' : ''}
                  {exp.endDate}
                </p>
                <h3 className="text-2xl font-light">{exp.role}</h3>
                {exp.company && <p className="text-sm text-[#d4d4d4] mt-0.5">{exp.company}</p>}
                {exp.description && (
                  <p className="text-sm font-light leading-relaxed text-[#d4d4d4] mt-2 whitespace-pre-line max-w-2xl">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-12">
          <SectionLabel title="Education" />
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-xl font-light">{edu.degree}</h3>
                {edu.school && <p className="text-sm text-[#d4d4d4]">{edu.school}</p>}
                {edu.graduationYear && (
                  <p className="text-xs uppercase tracking-widest text-[#a3a3a3] mt-1">
                    {edu.graduationYear}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-12">
          <SectionLabel title="Skills" />
          <p className="text-base font-light leading-loose text-[#e5e5e5]">
            {data.skills.map((s) => s.name).join('  ·  ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-12">
          <SectionLabel title="Projects" />
          <div className="space-y-6">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-xl font-light">{proj.name}</h3>
                {proj.description && (
                  <p className="text-sm font-light text-[#d4d4d4] mt-1 leading-relaxed">
                    {proj.description}
                  </p>
                )}
                {proj.link && (
                  <a href={proj.link} className="text-xs text-[var(--theme-color)] mt-1 inline-block">
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-12">
          <SectionLabel title="Certifications" />
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-base font-light">{cert.name}</h3>
                {(cert.issuer || cert.date) && (
                  <p className="text-xs text-[#a3a3a3] mt-0.5">
                    {cert.issuer}
                    {cert.issuer && cert.date ? ' · ' : ''}
                    {cert.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {data.showReferences && data.references.length > 0 && (
        <section className="mb-12">
          <SectionLabel title="References" />
          <div className="space-y-4">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <h3 className="text-base font-light">{ref.name}</h3>
                {(ref.title || ref.company) && (
                  <p className="text-xs text-[#a3a3a3]">
                    {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </p>
                )}
                {ref.contact && <p className="text-xs text-[#737373] mt-0.5">{ref.contact}</p>}
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
              <section key={section.id} className="mb-12">
                <SectionLabel title={section.title} />
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-4">
                        <h3 className="text-base font-light">{item.title}</h3>
                        {item.date && (
                          <span className="text-xs text-[#a3a3a3] whitespace-nowrap">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-xs italic text-[#a3a3a3]">{item.subtitle}</p>
                      )}
                      {item.description && (
                        <p className="text-sm font-light text-[#d4d4d4] mt-1 whitespace-pre-line">
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
  );
}
