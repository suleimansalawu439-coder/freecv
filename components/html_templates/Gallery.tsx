import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHead({ title }: { title: string }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-500 text-center mb-8">{title}</h2>
  );
}

export default function Gallery({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills } = data;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(
    Boolean
  ) as string[];

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-black px-16 py-14">
      {/* Header */}
      <header className="text-center mb-2">
        <h1 className="text-5xl font-bold tracking-tight">{personalInfo.fullName}</h1>
        {personalInfo.jobTitle && (
          <p className="text-xl italic text-gray-600 mt-3">{personalInfo.jobTitle}</p>
        )}
      </header>

      {contacts.length > 0 && (
        <p className="text-center text-[13px] text-gray-500 mb-14">{contacts.join('  ·  ')}</p>
      )}

      <main className="space-y-12">
        {summary && (
          <section>
            <SectionHead title="Profile" />
            <p className="text-[15px] leading-loose text-gray-800 text-center max-w-[620px] mx-auto">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <SectionHead title="Experience" />
            <div className="space-y-10">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-6">
                    <h3 className="text-lg font-bold">{exp.role}</h3>
                    <span className="text-xs text-gray-500 shrink-0 tracking-wide">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="italic text-gray-700 mt-1">{exp.company}</p>
                  <ul className="list-disc list-outside ml-5 mt-4 space-y-2.5 text-[15px] text-gray-800 leading-loose">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <section>
            <SectionHead title="Selected Work" />
            <div className="space-y-8">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline gap-6">
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    {project.link && <span className="text-xs text-gray-500 shrink-0">{project.link}</span>}
                  </div>
                  {project.description && (
                    <p className="text-[15px] text-gray-800 leading-loose mt-2">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <SectionHead title="Education" />
            <div className="space-y-8 text-center">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-lg font-bold">{edu.degree}</h3>
                  <p className="italic text-gray-700 mt-1">{edu.school}</p>
                  {edu.graduationYear && <p className="text-xs text-gray-500 tracking-wide mt-1.5">{edu.graduationYear}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <SectionHead title="Capabilities" />
            <div className="grid grid-cols-2 gap-x-10 gap-y-3 max-w-[560px] mx-auto">
              {skills.map((skill) => (
                <div key={skill.id} className="text-[15px] text-gray-800 text-center">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section>
            <SectionHead title="Certifications" />
            <div className="space-y-4 text-center">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-[15px] font-bold">{cert.name}</p>
                  {(cert.issuer || cert.date) && (
                    <p className="text-sm italic text-gray-600 mt-0.5">
                      {cert.issuer}
                      {cert.issuer && cert.date ? ', ' : ''}
                      {cert.date}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <section className="break-inside-avoid">
            <SectionHead title="References" />
            <div className="grid grid-cols-2 gap-10 max-w-[600px] mx-auto">
              {data.references.map((ref) => (
                <div key={ref.id} className="text-center">
                  <h3 className="font-bold">{ref.name}</h3>
                  <p className="text-sm italic text-gray-600 mt-1">
                    {ref.title}
                    {ref.title && ref.company ? ', ' : ''}
                    {ref.company}
                  </p>
                  {ref.contact && <p className="text-sm text-gray-500 mt-1">{ref.contact}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections &&
          data.customSections.length > 0 &&
          data.customSections.map(
            (section) =>
              section.items.length > 0 && (
                <section key={section.id}>
                  <SectionHead title={section.title} />
                  <div className="space-y-8">
                    {section.items.map((item) => (
                      <div key={item.id} className="text-center">
                        <div className="flex justify-center items-baseline gap-4">
                          <h3 className="text-lg font-bold">{item.title}</h3>
                          {item.date && <span className="text-xs text-gray-500 tracking-wide">{item.date}</span>}
                        </div>
                        {item.subtitle && <p className="italic text-gray-700 mt-1">{item.subtitle}</p>}
                        {item.description && (
                          <p className="text-[15px] text-gray-800 leading-loose mt-2 max-w-[560px] mx-auto whitespace-pre-wrap">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )
          )}
      </main>
    </div>
  );
}
