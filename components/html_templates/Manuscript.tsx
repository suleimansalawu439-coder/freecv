import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const SEPIA = '#4a3728';

export default function Manuscript({ data }: { data: ResumeData }) {
  const { personalInfo } = data;
  const contactParts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(Boolean);

  const lines = (description: string) =>
    description ? description.split(/\n|\r\n/).filter((l) => l.trim()) : [];

  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-10 mb-5">
      <h2 className="font-serif text-[15px] font-normal uppercase tracking-[0.3em] text-center" style={{ color: SEPIA }}>
        {children}
      </h2>
      <div className="mt-3 mx-auto w-full max-w-[420px] border-t" style={{ borderColor: SEPIA, opacity: 0.5 }} />
    </div>
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto px-14 py-14 font-serif" style={{ color: SEPIA }}>
      {/* Header */}
      <header className="text-center">
        <h1 className="text-[42px] leading-tight" style={{ color: SEPIA }}>
          {personalInfo.fullName}
        </h1>
        {personalInfo.jobTitle && (
          <p className="mt-2 text-[16px] italic" style={{ color: SEPIA, opacity: 0.85 }}>
            {personalInfo.jobTitle}
          </p>
        )}
        {contactParts.length > 0 && (
          <p className="mt-3 text-[13px]" style={{ color: SEPIA, opacity: 0.75 }}>
            {contactParts.join('  ·  ')}
          </p>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mt-8">
          <p className="text-[14px] leading-[1.9] text-justify italic" style={{ color: SEPIA }}>
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section>
          <SectionHeader>Experience</SectionHeader>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="text-[16px] font-bold" style={{ color: SEPIA }}>
                  {exp.role}
                </h3>
                <p className="text-[14px] mt-0.5">
                  <span className="italic">{exp.company}</span>
                  <span className="mx-2 opacity-60">—</span>
                  <span className="italic" style={{ color: SEPIA, opacity: 0.8 }}>
                    {exp.startDate} to {exp.endDate}
                  </span>
                </p>
                <ul className="mt-2 space-y-1.5">
                  {lines(exp.description).map((line, i) => (
                    <li key={i} className="flex text-[14px] leading-[1.85] text-justify">
                      <span className="mr-3">–</span>
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
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-[15px] font-bold" style={{ color: SEPIA }}>
                  {edu.degree}
                </h3>
                <p className="text-[14px]">
                  <span className="italic">{edu.school}</span>
                  {edu.graduationYear && (
                    <>
                      <span className="mx-2 opacity-60">—</span>
                      <span className="italic" style={{ opacity: 0.8 }}>
                        {edu.graduationYear}
                      </span>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills — inline, middot separated */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <SectionHeader>Skills</SectionHeader>
          <p className="text-[14px] leading-loose text-justify" style={{ color: SEPIA }}>
            {data.skills.map((skill, i) => (
              <React.Fragment key={skill.id}>
                <span>{skill.name}</span>
                {i < data.skills.length - 1 && <span className="opacity-50"> · </span>}
              </React.Fragment>
            ))}
          </p>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <section>
          <SectionHeader>Projects</SectionHeader>
          <div className="space-y-5">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-[15px] font-bold" style={{ color: SEPIA }}>
                  {project.name}
                  {project.link && (
                    <span className="font-normal italic text-[13px]" style={{ opacity: 0.7 }}>
                      {' '}— {project.link}
                    </span>
                  )}
                </h3>
                {project.description && (
                  <p className="text-[14px] leading-[1.85] text-justify mt-1">{project.description}</p>
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
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-[15px] font-bold" style={{ color: SEPIA }}>
                  {cert.name}
                </h3>
                <p className="text-[14px]">
                  {cert.issuer && <span className="italic">{cert.issuer}</span>}
                  {cert.issuer && cert.date && <span className="mx-2 opacity-60">—</span>}
                  {cert.date && (
                    <span className="italic" style={{ opacity: 0.8 }}>
                      {cert.date}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {data.showReferences && data.references && data.references.length > 0 && (
        <section>
          <SectionHeader>References</SectionHeader>
          <div className="grid grid-cols-2 gap-6">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <h3 className="text-[15px] font-bold" style={{ color: SEPIA }}>
                  {ref.name}
                </h3>
                <p className="text-[14px] italic">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && (
                  <p className="text-[13px]" style={{ opacity: 0.8 }}>
                    {ref.contact}
                  </p>
                )}
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
                      <h3 className="text-[15px] font-bold" style={{ color: SEPIA }}>
                        {item.title}
                      </h3>
                      <p className="text-[14px]">
                        {item.subtitle && <span className="italic">{item.subtitle}</span>}
                        {item.subtitle && item.date && <span className="mx-2 opacity-60">—</span>}
                        {item.date && (
                          <span className="italic" style={{ opacity: 0.8 }}>
                            {item.date}
                          </span>
                        )}
                      </p>
                      {item.description && (
                        <p className="text-[14px] leading-[1.85] text-justify mt-1">{item.description}</p>
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
