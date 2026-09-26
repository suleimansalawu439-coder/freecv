import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

// Clarity — accessibility-first, high-contrast resume.
// Black (#000) text on white, large base type, extra section spacing,
// bold clear headings, and underlined links. The accent color is used
// ONLY decoratively (on rules/markers) — all information remains fully
// readable in grayscale. No color-dependent meaning anywhere.

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold uppercase tracking-wide mb-6 flex items-center gap-3 text-black">
      <span
        className="inline-block w-3 h-3 shrink-0"
        style={{ backgroundColor: 'var(--theme-color)' }}
        aria-hidden="true"
      />
      {children}
    </h2>
  );
}

export default function Clarity({ data }: { data: ResumeData }) {
  const { personalInfo } = data;

  return (
    <div className="w-full max-w-[816px] mx-auto bg-white text-black font-sans p-14 min-h-[1056px]">
      {orderSections(data, {
        personal: (
          <>
      <header className="flex items-start gap-8">
        {personalInfo.profilePicture && (
          <img
            src={personalInfo.profilePicture}
            alt={`Portrait of ${personalInfo.fullName}`}
            className="w-32 h-32 rounded-full object-cover shrink-0 border-4 border-black"
          />
        )}
        <div>
          <h1 className="text-5xl font-bold tracking-tight leading-tight text-black">
            {personalInfo.fullName}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-2xl font-semibold mt-2 text-black">{personalInfo.jobTitle}</p>
          )}
        </div>
      </header>

      {/* Decorative accent rule — purely decorative, no meaning carried by color */}
      <div
        className="h-1.5 w-28 my-6"
        style={{ backgroundColor: 'var(--theme-color)' }}
        aria-hidden="true"
      />

      <div className="text-lg leading-relaxed font-medium flex flex-wrap gap-x-4 gap-y-1">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.location && <span>{personalInfo.location}</span>}
        {personalInfo.website && (
          <a href={personalInfo.website} className="underline font-bold text-black">
            {personalInfo.website}
          </a>
        )}
      </div>
          </>
        ),
      })}

      <div className="space-y-14 mt-14">
        {orderSections(data, {
          personal: data.summary && (
          <section>
            <SectionTitle>Profile</SectionTitle>
            <p className="text-lg leading-relaxed">{data.summary}</p>
          </section>
          ),

          experience: data.experience && data.experience.length > 0 && (
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-10 last:mb-0">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-black">{exp.role}</h3>
                    <p className="text-lg font-bold text-black">
                      {exp.startDate}
                      {exp.endDate ? ` \u2013 ${exp.endDate}` : ''}
                    </p>
                  </div>
                  <p className="text-xl font-semibold mb-2 text-black">{exp.company}</p>
                  {exp.description && (
                    <p className="text-lg leading-relaxed whitespace-pre-line text-black">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          skills: data.skills && data.skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-lg font-semibold border-2 border-black px-4 py-1.5 text-black"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <section>
            <SectionTitle>Projects</SectionTitle>
            <div>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-bold text-black">{project.name}</h3>
                  {project.description && (
                    <p className="text-lg leading-relaxed whitespace-pre-line mt-1 text-black">
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-lg underline font-semibold break-all text-black"
                    >
                      {project.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          education: data.education && data.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-bold text-black">{edu.degree}</h3>
                  <p className="text-lg text-black">{edu.school}</p>
                  {edu.graduationYear && (
                    <p className="text-base font-semibold mt-1 text-black">{edu.graduationYear}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <ul className="space-y-4">
              {data.certifications.map((cert) => (
                <li key={cert.id} className="text-lg text-black">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span> \u2014 {cert.issuer}</span>}
                  {cert.date && <span className="font-semibold"> ({cert.date})</span>}
                </li>
              ))}
            </ul>
          </section>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <section>
            <SectionTitle>References</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.references.map((ref) => (
                <div key={ref.id} className="border-l-4 border-black pl-5">
                  <h3 className="text-xl font-bold text-black">{ref.name}</h3>
                  {(ref.title || ref.company) && (
                    <p className="text-lg font-medium text-black">
                      {ref.title}
                      {ref.title && ref.company ? ' \u2014 ' : ''}
                      {ref.company}
                    </p>
                  )}
                  {ref.contact && <p className="text-lg text-black">{ref.contact}</p>}
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
                  <div className="space-y-6">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex flex-wrap justify-between items-baseline gap-2">
                          <h3 className="text-xl font-bold text-black">{item.title}</h3>
                          {item.date && <p className="text-lg font-bold text-black">{item.date}</p>}
                        </div>
                        {item.subtitle && (
                          <p className="text-lg italic text-black">{item.subtitle}</p>
                        )}
                        {item.description && (
                          <p className="text-lg leading-relaxed whitespace-pre-line mt-1 text-black">
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
    </div>
  );
}
