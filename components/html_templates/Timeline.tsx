import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--theme-color)] inline-block">
        {title}
      </h2>
      <div className="w-10 h-0.5 bg-[var(--theme-color)] mx-auto mt-2" />
    </div>
  );
}

export default function Timeline({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactBits = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="font-sans bg-white text-[#1a1a1a] min-h-[1056px] w-full max-w-[816px] mx-auto px-12 py-10">
      {/* Centered header */}
      <header className="text-center mb-10">
        {info.profilePicture && (
          <img
            src={info.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[var(--theme-color)]"
          />
        )}
        <h1 className="text-4xl font-bold tracking-tight">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base font-medium text-[var(--theme-color)] mt-1">{info.jobTitle}</p>
        )}
        {contactBits.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">{contactBits.join('  ·  ')}</p>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-10 text-center max-w-2xl mx-auto">
          <SectionTitle title="Summary" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}

      {/* Experience timeline — date rail with dots */}
      {data.experience.length > 0 && (
        <section className="mb-10">
          <SectionTitle title="Experience" />
          <div className="relative pl-10 max-w-2xl mx-auto">
            <div className="absolute left-[9px] top-1 bottom-1 w-[2px] bg-[var(--theme-color)] opacity-50" />
            <div className="space-y-7">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-[38px] top-1 w-4 h-4 rounded-full bg-[var(--theme-color)] ring-4 ring-white" />
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-color)] mb-1">
                    {exp.startDate}
                    {exp.startDate && exp.endDate ? ' – ' : ''}
                    {exp.endDate}
                  </p>
                  <h3 className="text-lg font-bold leading-tight">{exp.role}</h3>
                  {exp.company && (
                    <p className="text-sm font-medium text-gray-500 mb-1">{exp.company}</p>
                  )}
                  {exp.description && (
                    <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-10">
          <SectionTitle title="Education" />
          <div className="space-y-4 max-w-2xl mx-auto">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="text-base font-bold">{edu.degree}</h3>
                {edu.school && <p className="text-sm text-gray-500">{edu.school}</p>}
                {edu.graduationYear && (
                  <p className="text-xs font-bold text-[var(--theme-color)] mt-0.5">
                    {edu.graduationYear}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills as tags */}
      {data.skills.length > 0 && (
        <section className="mb-10">
          <SectionTitle title="Skills" />
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-medium border border-[var(--theme-color)] text-[var(--theme-color)] px-3 py-1 rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-10">
          <SectionTitle title="Projects" />
          <div className="space-y-4 max-w-2xl mx-auto">
            {data.projects.map((proj) => (
              <div key={proj.id} className="text-center">
                <h3 className="text-base font-bold">{proj.name}</h3>
                {proj.description && (
                  <p className="text-sm text-gray-600 mt-0.5">{proj.description}</p>
                )}
                {proj.link && (
                  <a href={proj.link} className="text-xs text-[var(--theme-color)]">
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
        <section className="mb-10">
          <SectionTitle title="Certifications" />
          <div className="space-y-3 max-w-2xl mx-auto">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="text-center">
                <h3 className="text-sm font-bold">{cert.name}</h3>
                {(cert.issuer || cert.date) && (
                  <p className="text-xs text-gray-500">
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
        <section className="mb-10">
          <SectionTitle title="References" />
          <div className="space-y-3 max-w-2xl mx-auto">
            {data.references.map((ref) => (
              <div key={ref.id} className="text-center">
                <h3 className="text-sm font-bold">{ref.name}</h3>
                {(ref.title || ref.company) && (
                  <p className="text-xs text-gray-500">
                    {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </p>
                )}
                {ref.contact && <p className="text-xs text-gray-400">{ref.contact}</p>}
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
              <section key={section.id} className="mb-10">
                <SectionTitle title={section.title} />
                <div className="space-y-4 max-w-2xl mx-auto">
                  {section.items.map((item) => (
                    <div key={item.id} className="text-center">
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      {item.subtitle && (
                        <p className="text-xs italic text-gray-500">{item.subtitle}</p>
                      )}
                      {item.date && (
                        <p className="text-xs font-bold text-[var(--theme-color)]">{item.date}</p>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
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
