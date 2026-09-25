import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Vellum({ data }: { data: ResumeData }) {
  const { personalInfo } = data;
  const contactParts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(Boolean);

  const lines = (description: string) =>
    description ? description.split(/\n|\r\n/).filter((l) => l.trim()) : [];

  // Fine double rule (two 1px lines with a 3px gap)
  const DoubleRule = () => (
    <div>
      <div className="border-t border-[#111]" />
      <div className="mt-[3px] border-t border-[#111]" />
    </div>
  );

  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-12 mb-6">
      <div className="flex items-center gap-6">
        <div className="flex-1 border-t border-[#111]" />
        <h2 className="font-serif text-sm font-normal uppercase tracking-[0.35em] text-[#111] text-center">
          {children}
        </h2>
        <div className="flex-1 border-t border-[#111]" />
      </div>
    </div>
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto px-16 py-14 font-serif text-[#111] leading-relaxed">
      {/* Header — engraved title block */}
      <header className="text-center">
        <DoubleRule />
        <div className="py-8">
          <h1 className="text-4xl font-normal uppercase tracking-[0.3em] text-[#111]">
            {personalInfo.fullName}
          </h1>
          {personalInfo.jobTitle && (
            <p className="mt-4 text-sm uppercase tracking-[0.25em] text-[#111]/80">
              {personalInfo.jobTitle}
            </p>
          )}
          {contactParts.length > 0 && (
            <p className="mt-4 text-[13px] tracking-[0.08em] text-[#111]/70">{contactParts.join('  ·  ')}</p>
          )}
        </div>
        <DoubleRule />
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mt-10">
          <p className="text-[15px] leading-[1.9] text-[#111]/90 text-center italic">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section>
          <SectionHeader>Experience</SectionHeader>
          <div>
            {data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className={idx < data.experience.length - 1 ? 'border-b border-gray-200 pb-6 mb-6' : ''}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[16px] font-bold text-[#111]">{exp.role}</h3>
                  <span className="text-[12px] tracking-[0.15em] uppercase text-[#111]/70 whitespace-nowrap">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-[14px] italic text-[#111]/80 mt-1 mb-3">{exp.company}</p>
                <ul className="space-y-1.5">
                  {lines(exp.description).map((line, i) => (
                    <li key={i} className="flex text-[14px] leading-[1.75] text-[#111]/85">
                      <span className="mr-3">·</span>
                      <span>{line.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section>
          <SectionHeader>Education</SectionHeader>
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-[15px] font-bold text-[#111]">{edu.degree}</h3>
                  <p className="text-[14px] italic text-[#111]/80">{edu.school}</p>
                </div>
                {edu.graduationYear && (
                  <span className="text-[12px] tracking-[0.15em] uppercase text-[#111]/70 whitespace-nowrap">
                    {edu.graduationYear}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills — fine inline comma list */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <SectionHeader>Skills</SectionHeader>
          <p className="text-center text-[14px] tracking-[0.1em] text-[#111]/90 leading-loose">
            {data.skills.map((skill) => skill.name).join(', ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <section>
          <SectionHeader>Projects</SectionHeader>
          <div className="space-y-5">
            {data.projects.map((project) => (
              <div key={project.id} className="text-center">
                <h3 className="text-[15px] font-bold text-[#111]">{project.name}</h3>
                {project.link && <p className="text-[13px] italic text-[#111]/70">{project.link}</p>}
                {project.description && (
                  <p className="text-[14px] text-[#111]/85 leading-[1.75] mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader>Certifications</SectionHeader>
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-[15px] font-bold text-[#111]">{cert.name}</h3>
                  {cert.issuer && <p className="text-[14px] italic text-[#111]/80">{cert.issuer}</p>}
                </div>
                {cert.date && (
                  <span className="text-[12px] tracking-[0.15em] uppercase text-[#111]/70 whitespace-nowrap">
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {data.showReferences && data.references && data.references.length > 0 && (
        <section>
          <SectionHeader>References</SectionHeader>
          <div className="grid grid-cols-2 gap-8">
            {data.references.map((ref) => (
              <div key={ref.id} className="text-center">
                <h3 className="text-[15px] font-bold text-[#111]">{ref.name}</h3>
                <p className="text-[14px] italic text-[#111]/80">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-[13px] text-[#111]/70">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom sections */}
      {data.customSections &&
        data.customSections.map(
          (section) =>
            section.items &&
            section.items.length > 0 && (
              <section key={section.id}>
                <SectionHeader>{section.title}</SectionHeader>
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-[15px] font-bold text-[#111]">{item.title}</h3>
                        {item.date && (
                          <span className="text-[12px] tracking-[0.15em] uppercase text-[#111]/70 whitespace-nowrap">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && <p className="text-[14px] italic text-[#111]/80">{item.subtitle}</p>}
                      {item.description && (
                        <p className="text-[14px] text-[#111]/85 leading-[1.75] mt-1">{item.description}</p>
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
