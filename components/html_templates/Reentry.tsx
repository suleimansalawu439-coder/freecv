import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Reentry({ data }: { data: ResumeData }) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="font-sans p-16 bg-white text-[#2d2a26] min-h-[1056px] w-full max-w-[816px] mx-auto">
      {/* Header */}
      <header className="mb-12 text-center">
        {data.personalInfo.profilePicture && (
          <img
            src={data.personalInfo.profilePicture}
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full mx-auto mb-6"
          />
        )}
        <h1 className="text-5xl font-bold tracking-tight mb-3">{data.personalInfo.fullName}</h1>
        {data.personalInfo.jobTitle && (
          <p className="text-lg font-medium text-gray-500">{data.personalInfo.jobTitle}</p>
        )}
        {contactItems.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-5 text-sm text-gray-500">
            {contactItems.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        )}
      </header>

      {/* Profile — the lead section */}
      {data.summary && (
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--theme-color)] mb-5">Profile</h2>
          <p className="text-lg leading-relaxed">{data.summary}</p>
          <div className="mt-6 h-[3px] w-24 bg-[var(--theme-color)]" />
        </section>
      )}

      {/* Strengths */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--theme-color)] mb-5">Strengths</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
              <span
                key={skill.id}
                className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 bg-stone-50"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--theme-color)] mb-5">Experience</h2>
          <div className="space-y-8">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-lg font-bold">{exp.role}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">
                      {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                    </span>
                  )}
                </div>
                {exp.company && <div className="text-sm font-medium text-gray-500 mb-2">{exp.company}</div>}
                {exp.description && (
                  <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--theme-color)] mb-5">Projects</h2>
          <div className="space-y-6">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="text-base font-bold">{proj.name}</h3>
                {proj.link && (
                  <a href={proj.link} className="text-sm font-semibold text-[var(--theme-color)] break-all">{proj.link}</a>
                )}
                {proj.description && (
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      {(data.education && data.education.length > 0) ||
      (data.showCertifications && data.certifications && data.certifications.length > 0) ? (
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--theme-color)] mb-5">
            Education & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.education && data.education.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Education</h3>
                <div className="space-y-4">
                  {data.education.map(edu => (
                    <div key={edu.id}>
                      <div className="font-bold text-sm">{edu.degree}</div>
                      <div className="text-sm text-gray-500">{edu.school}</div>
                      {edu.graduationYear && <div className="text-xs text-gray-400 font-semibold mt-1">{edu.graduationYear}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.showCertifications && data.certifications && data.certifications.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Certifications</h3>
                <div className="space-y-4">
                  {data.certifications.map(cert => (
                    <div key={cert.id}>
                      <div className="font-bold text-sm">{cert.name}</div>
                      <div className="text-sm text-gray-500">
                        {cert.issuer}{cert.issuer && cert.date ? ' • ' : ''}{cert.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* References */}
      {data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--theme-color)] mb-5">References</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.references.map(ref => (
              <div key={ref.id} className="border-l-2 pl-4 border-[var(--theme-color)]">
                <h3 className="font-bold text-base">{ref.name}</h3>
                {(ref.title || ref.company) && (
                  <div className="text-sm text-gray-500 font-medium mb-1">
                    {ref.title}{ref.title && ref.company ? ' @ ' : ''}{ref.company}
                  </div>
                )}
                {ref.contact && <div className="text-sm text-gray-400">{ref.contact}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom sections */}
      {data.customSections && data.customSections.map(section => (
        section.items && section.items.length > 0 && (
          <section key={section.id} className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[var(--theme-color)] mb-5">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      {item.subtitle && <p className="text-sm italic text-gray-500">{item.subtitle}</p>}
                    </div>
                    {item.date && <p className="text-xs font-semibold text-gray-400 whitespace-nowrap">{item.date}</p>}
                  </div>
                  {item.description && <p className="text-sm text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}
