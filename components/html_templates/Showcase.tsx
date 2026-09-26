import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

// Asymmetric offset label: accent dash + uppercase label sitting left of the content flow
function OffsetLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6 -ml-16 pl-16">
      <span className="block w-10 h-[3px] bg-[var(--theme-color)] shrink-0" />
      <h2 className="text-xs font-extrabold uppercase tracking-[0.35em] text-[var(--theme-color)]">
        {children}
      </h2>
    </div>
  );
}

export default function Showcase({ data }: { data: ResumeData }) {
  const p = data.personalInfo;
  const contactLine = [p.email, p.phone, p.location, p.website].filter(Boolean).join('  •  ');

  return (
    <div className="font-sans w-full max-w-[816px] mx-auto bg-white text-[#1a1a1a] min-h-[1056px] px-16 py-14">
      {orderSections(data, {
        personal: (
          <>
            <header className="mb-12">
              <div className="flex items-start justify-between gap-8">
                <div>
                  <h1 className="text-7xl font-black tracking-tighter leading-[0.95] mb-3">{p.fullName}</h1>
                  <p className="text-2xl font-medium text-gray-600">{p.jobTitle}</p>
                </div>
                {p.profilePicture && (
                  <img
                    src={p.profilePicture}
                    alt=""
                    className="w-32 h-32 rounded-2xl object-cover shrink-0"
                  />
                )}
              </div>
              {contactLine && <p className="text-sm font-medium text-gray-500 mt-5">{contactLine}</p>}
            </header>

            <div className="w-16 h-[3px] bg-[var(--theme-color)] mb-12" />
          </>
        ),
      })}

      {/* Projects FIRST */}
      {orderSections(data, {
        projects: data.showProjects && data.projects && data.projects.length > 0 && (
        <section className="mb-14">
          <OffsetLabel>Selected Work</OffsetLabel>
          <div className="space-y-8">
            {data.projects.map((proj) => (
              <div key={proj.id} className="border-l-[3px] border-[var(--theme-color)] pl-6">
                <h3 className="text-3xl font-black tracking-tight text-[var(--theme-color)] leading-none mb-1">
                  {proj.name}
                </h3>
                {proj.link && (
                  <a href={proj.link} className="text-sm font-medium text-gray-500 underline break-all">
                    {proj.link}
                  </a>
                )}
                {proj.description && (
                  <p className="text-base leading-relaxed text-gray-700 mt-2 whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        personal: data.summary && data.summary.length > 0 && (
        <section className="mb-14">
          <OffsetLabel>Profile</OffsetLabel>
          <p className="text-lg leading-relaxed text-gray-800 max-w-[60ch]">{data.summary}</p>
        </section>
        ),

        experience: data.experience && data.experience.length > 0 && (
        <section className="mb-14">
          <OffsetLabel>Experience</OffsetLabel>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-xs font-bold text-gray-400 pt-1.5 uppercase tracking-wider">
                  {exp.startDate}
                  <br />
                  {exp.endDate}
                </div>
                <div className="col-span-9">
                  <h3 className="text-xl font-extrabold leading-tight mb-1">{exp.role}</h3>
                  <div className="text-sm font-semibold text-[var(--theme-color)] mb-2">{exp.company}</div>
                  {exp.description && (
                    <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills && data.skills.length > 0 && (
        <section className="mb-14">
          <OffsetLabel>Skills</OffsetLabel>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-sm font-bold border-2 border-[var(--theme-color)] text-[var(--theme-color)] px-4 py-1.5 rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
        ),

        education: data.education && data.education.length > 0 && (
        <section className="mb-14">
          <OffsetLabel>Education</OffsetLabel>
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="font-extrabold text-base">{edu.degree}</div>
                <div className="text-sm text-gray-600">{edu.school}</div>
                {edu.graduationYear && (
                  <div className="text-xs font-bold text-gray-400 mt-1">{edu.graduationYear}</div>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section className="mb-14">
          <OffsetLabel>Certifications</OffsetLabel>
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <div className="font-extrabold text-base">{cert.name}</div>
                <div className="text-sm text-gray-600">{cert.issuer}</div>
                {cert.date && <div className="text-xs font-bold text-gray-400 mt-1">{cert.date}</div>}
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-14">
          <OffsetLabel>References</OffsetLabel>
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
        ),
      },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
            <section key={section.id} className="mb-14">
              <OffsetLabel>{section.title}</OffsetLabel>
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
          ))
      )}

    </div>
  );
}
