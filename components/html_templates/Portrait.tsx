import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--theme-color)] mb-4">
      {children}
    </h2>
  );
}

export default function Portrait({ data }: { data: ResumeData }) {
  const p = data.personalInfo;

  return (
    <div className="font-sans w-full max-w-[816px] mx-auto bg-white text-[#1a1a1a] min-h-[1056px] grid grid-cols-12">
      {/* Left rail */}
      <aside className="col-span-4 bg-[#f3f4f6] px-8 py-12 space-y-10">
        {p.profilePicture && (
          <img
            src={p.profilePicture}
            alt=""
            className="w-full aspect-square object-cover rounded-lg"
          />
        )}

        <section>
          <SectionTitle>Contact</SectionTitle>
          <ul className="space-y-2 text-sm font-medium text-gray-700 break-words">
            {p.email && <li>{p.email}</li>}
            {p.phone && <li>{p.phone}</li>}
            {p.location && <li>{p.location}</li>}
            {p.website && <li className="break-all">{p.website}</li>}
          </ul>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <ul className="space-y-2">
              {data.skills.map((skill) => (
                <li key={skill.id} className="text-sm font-semibold text-gray-800">
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-5">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-sm">{edu.degree}</div>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                  {edu.graduationYear && (
                    <div className="text-xs font-bold text-gray-400 mt-1">{edu.graduationYear}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main column */}
      <div className="col-span-8 px-12 py-12 space-y-10">
        <header>
          <h1 className="text-5xl font-extrabold tracking-tight leading-none mb-2">{p.fullName}</h1>
          <p className="text-xl font-medium text-[var(--theme-color)]">{p.jobTitle}</p>
        </header>

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
                  <h3 className="text-xl font-extrabold leading-tight mb-1">{exp.role}</h3>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <span className="text-sm font-bold text-[var(--theme-color)]">{exp.company}</span>
                    <span className="text-xs font-bold text-gray-500 shrink-0">
                      {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                    </span>
                  </div>
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
                  <h3 className="text-lg font-extrabold leading-tight">{proj.name}</h3>
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

        {data.showReferences && data.references && data.references.length > 0 && (
          <section>
            <SectionTitle>References</SectionTitle>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref) => (
                <div key={ref.id}>
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
              <section key={section.id}>
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
