import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

export default function Mentor({ data }: { data: ResumeData }) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="font-sans p-16 bg-white text-[#33302b] min-h-[1056px] w-full max-w-[816px] mx-auto">
      {orderSections(data, {
        personal: (
          <>
            {/* Header */}
            <header className="mb-12 pb-10 border-b-4 border-[var(--theme-color)]">
              <div className="flex items-center gap-8">
                {data.personalInfo.profilePicture && (
                  <img
                    src={data.personalInfo.profilePicture}
                    alt="Profile"
                    className="w-28 h-28 object-cover rounded-full shrink-0"
                  />
                )}
                <div>
                  <h1 className="text-5xl font-bold tracking-tight mb-2">{data.personalInfo.fullName}</h1>
                  {data.personalInfo.jobTitle && (
                    <p className="text-lg font-medium text-[var(--theme-color)]">{data.personalInfo.jobTitle}</p>
                  )}
                </div>
              </div>
              {contactItems.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-6 text-sm text-gray-500">
                  {contactItems.map((item, i) => (
                    <span key={i}>{item}</span>
                  ))}
                </div>
              )}
            </header>

            {/* Profile */}
            {data.summary && (
              <section className="mb-12">
                <h2 className="text-base font-bold text-[var(--theme-color)] mb-4">Profile</h2>
                <p className="text-base leading-relaxed italic text-gray-600">{data.summary}</p>
              </section>
            )}
          </>
        ),

        education: data.education && data.education.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-[var(--theme-color)] mb-4">Education</h2>
            <div className="space-y-5">
              {data.education.map(edu => (
                <div key={edu.id} className="border-l-4 border-[var(--theme-color)] pl-5">
                  <div className="font-bold text-lg">{edu.degree}</div>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                  {edu.graduationYear && <div className="text-xs text-gray-400 font-bold mt-1">{edu.graduationYear}</div>}
                </div>
              ))}
            </div>
          </section>
        ),

        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-[var(--theme-color)] mb-4">Credentials</h2>
            <div className="space-y-4">
              {data.certifications.map(cert => (
                <div key={cert.id} className="flex items-start gap-4 border border-gray-200 rounded-lg px-5 py-4">
                  <span className="mt-1 w-3 h-3 rounded-full bg-[var(--theme-color)] shrink-0" />
                  <div>
                    <div className="font-bold text-base">{cert.name}</div>
                    <div className="text-sm text-gray-600">
                      {cert.issuer}{cert.issuer && cert.date ? ' • ' : ''}{cert.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ),

        experience: data.experience && data.experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-[var(--theme-color)] mb-4">Experience</h2>
            <div className="space-y-8">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-lg font-bold">{exp.role}</h3>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-xs font-bold text-gray-400 whitespace-nowrap">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                      </span>
                    )}
                  </div>
                  {exp.company && <div className="text-sm font-semibold text-gray-500 mb-2">{exp.company}</div>}
                  {exp.description && (
                    <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ),

        skills: data.skills && data.skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-[var(--theme-color)] mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(skill => (
                <span
                  key={skill.id}
                  className="text-sm font-medium px-4 py-2 rounded-full border-2 border-[var(--theme-color)] text-[var(--theme-color)]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        ),

        projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-[var(--theme-color)] mb-4">Projects</h2>
            <div className="space-y-5">
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
        ),

        references: data.showReferences && data.references && data.references.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-[var(--theme-color)] mb-4">References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.references.map(ref => (
                <div key={ref.id} className="border-l-4 pl-4 border-[var(--theme-color)]">
                  <h3 className="font-bold text-base">{ref.name}</h3>
                  {(ref.title || ref.company) && (
                    <div className="text-sm text-gray-600 font-medium mb-1">
                      {ref.title}{ref.title && ref.company ? ' @ ' : ''}{ref.company}
                    </div>
                  )}
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
          <section key={section.id} className="mb-12">
            <h2 className="text-base font-bold text-[var(--theme-color)] mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      {item.subtitle && <p className="text-sm italic text-gray-500">{item.subtitle}</p>}
                    </div>
                    {item.date && <p className="text-xs font-bold text-gray-400 whitespace-nowrap">{item.date}</p>}
                  </div>
                  {item.description && <p className="text-sm text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
