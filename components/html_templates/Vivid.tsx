import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-extrabold uppercase tracking-[0.25em] text-[var(--theme-color)] mb-4 pb-2 border-b-2 border-[var(--theme-color)]">
      {children}
    </h2>
  );
}

export default function Vivid({ data }: { data: ResumeData }) {
  const p = data.personalInfo;
  const contactLine = [p.email, p.phone, p.location, p.website].filter(Boolean).join('  •  ');

  return (
    <div className="font-sans w-full max-w-[816px] mx-auto bg-white text-[#1a1a1a] min-h-[1056px]">
      {/* Full-bleed accent header block */}
      <header className="bg-[var(--theme-color)] text-white px-16 py-14">
        <div className="flex items-center gap-8">
          {p.profilePicture && (
            <img
              src={p.profilePicture}
              alt=""
              className="w-28 h-28 rounded-full object-cover border-4 border-white/40 shrink-0"
            />
          )}
          <div>
            <h1 className="text-6xl font-extrabold tracking-tight leading-none mb-2">{p.fullName}</h1>
            <p className="text-2xl font-medium text-white/90">{p.jobTitle}</p>
          </div>
        </div>
        {contactLine && <p className="text-sm font-semibold text-white/85 mt-5">{contactLine}</p>}
      </header>

      <div className="grid grid-cols-12 gap-10 px-16 py-12">
        {/* Main column */}
        <div className="col-span-8 space-y-10">
          {data.summary && (
            <section>
              <SectionTitle>Profile</SectionTitle>
              <p className="text-base leading-relaxed text-gray-700">{data.summary}</p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section>
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-8">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <h3 className="text-xl font-extrabold leading-tight">{exp.role}</h3>
                      <span className="text-xs font-bold text-gray-500 shrink-0">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-[var(--theme-color)] mb-2">{exp.company}</div>
                    {exp.description && (
                      <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.showProjects && data.projects && data.projects.length > 0 && (
            <section>
              <SectionTitle>Projects</SectionTitle>
              <div className="space-y-6">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="text-xl font-extrabold text-[var(--theme-color)] leading-tight">{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} className="text-sm text-gray-500 underline break-all">{proj.link}</a>
                    )}
                    {proj.description && (
                      <p className="text-sm leading-relaxed text-gray-700 mt-1 whitespace-pre-line">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Rail */}
        <div className="col-span-4 space-y-10">
          {data.skills && data.skills.length > 0 && (
            <section>
              <SectionTitle>Skills</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs font-bold bg-[var(--theme-color)] text-white px-3 py-1.5 rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-5">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-extrabold text-sm">{edu.degree}</div>
                    <div className="text-sm text-gray-600">{edu.school}</div>
                    {edu.graduationYear && (
                      <div className="text-xs font-bold text-gray-400 mt-1">{edu.graduationYear}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.showCertifications && data.certifications && data.certifications.length > 0 && (
            <section>
              <SectionTitle>Certifications</SectionTitle>
              <div className="space-y-4">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-extrabold text-sm">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.issuer}</div>
                    {cert.date && <div className="text-xs font-bold text-gray-400 mt-1">{cert.date}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Full-width bottom sections */}
        {data.showReferences && data.references && data.references.length > 0 && (
          <section className="col-span-12">
            <SectionTitle>References</SectionTitle>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref) => (
                <div key={ref.id} className="border-l-4 pl-4 border-[var(--theme-color)]">
                  <h3 className="font-extrabold text-base">{ref.name}</h3>
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    {ref.title}{ref.title && ref.company ? ' @ ' : ''}{ref.company}
                  </div>
                  {ref.contact && <div className="text-sm text-gray-500">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections && data.customSections.length > 0 && data.customSections.map(
          (section) =>
            section.items && section.items.length > 0 && (
              <section key={section.id} className="col-span-12">
                <SectionTitle>{section.title}</SectionTitle>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <p className="text-sm font-extrabold">{item.title}</p>
                          {item.subtitle && <p className="text-sm italic text-gray-600">{item.subtitle}</p>}
                        </div>
                        {item.date && <p className="text-sm font-bold shrink-0">{item.date}</p>}
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
        )}
      </div>
    </div>
  );
}
