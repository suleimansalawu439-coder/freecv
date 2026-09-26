import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-black uppercase tracking-[0.22em] text-gray-900 mb-5 pb-3 border-b-2 border-gray-900">
      {children}
    </h2>
  );
}

export default function Marquee({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto">
      {orderSections(data, {
        personal: (
          <>
            {/* Giant name statement */}
            <header className="px-12 pt-12 pb-8">
              <h1 className="text-[56px] font-black tracking-tight leading-[1.05] uppercase mb-4">
                {info.fullName}
              </h1>
              {info.jobTitle && (
                <p className="text-lg font-bold uppercase tracking-[0.2em] text-gray-600">
                  {info.jobTitle}
                </p>
              )}
            </header>

            {/* Theme-colored contact bar */}
            {(info.email || info.phone || info.location || info.website) && (
              <div
                className="px-12 py-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px] font-semibold text-white"
                style={{ backgroundColor: 'var(--theme-color)' }}
              >
                {info.email && <span>{info.email}</span>}
                {info.phone && <span>{info.phone}</span>}
                {info.location && <span>{info.location}</span>}
                {info.website && <span>{info.website}</span>}
              </div>
            )}
          </>
        ),
      })}

      <main className="px-12 py-10">
        {orderSections(data, {
          personal: data.summary && (
            <section className="mb-9">
              <MainTitle>Profile</MainTitle>
              <p className="text-[14px] leading-relaxed text-gray-600">{data.summary}</p>
            </section>
          ),

          skills: data.skills.length > 0 && (
            <section className="mb-9">
              <MainTitle>Skills</MainTitle>
              <p className="text-[14px] leading-relaxed text-gray-700 font-medium">
                {data.skills.map((s) => s.name).join('  •  ')}
              </p>
            </section>
          ),

          experience: data.experience.length > 0 && (
            <section className="mb-9">
              <MainTitle>Experience</MainTitle>
              <div className="space-y-7">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-[16px] font-bold text-gray-900 mb-1">{exp.role}</h3>
                    <p className="text-[13px] font-bold text-gray-500 uppercase tracking-[0.1em] mb-2">
                      {exp.company} · {exp.startDate} – {exp.endDate}
                    </p>
                    {exp.description && (
                      <ul className="space-y-1.5 pl-4 list-disc">
                        {exp.description
                          .split(/\n|\r\n/)
                          .filter((l) => l.trim())
                          .map((line, i) => (
                            <li key={i} className="text-[14px] leading-relaxed text-gray-600">
                              {line}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ),

          education: data.education.length > 0 && (
            <section className="mb-9">
              <MainTitle>Education</MainTitle>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="text-[14px] font-bold text-gray-900">{edu.degree}</p>
                      <p className="text-[13px] text-gray-500">{edu.school}</p>
                    </div>
                    {edu.graduationYear && (
                      <span className="text-xs font-semibold text-gray-400 whitespace-nowrap ml-3">
                        {edu.graduationYear}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
            <section className="mb-9">
              <MainTitle>Projects</MainTitle>
              <div className="space-y-5">
                {data.projects.map((p) => (
                  <div key={p.id}>
                    <h3 className="text-[15px] font-bold text-gray-900">
                      {p.name}
                      {p.link && (
                        <span className="text-[13px] font-normal text-gray-400"> · {p.link}</span>
                      )}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-gray-600 mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
            <section className="mb-9">
              <MainTitle>Certifications</MainTitle>
              <div className="space-y-3">
                {data.certifications.map((c) => (
                  <div key={c.id} className="flex justify-between items-baseline">
                    <p className="text-[14px] font-semibold text-gray-800">
                      {c.name}
                      {c.issuer && <span className="font-normal text-gray-500"> — {c.issuer}</span>}
                    </p>
                    {c.date && <span className="text-[13px] text-gray-400 ml-3">{c.date}</span>}
                  </div>
                ))}
              </div>
            </section>
          ),

          references: data.showReferences && data.references.length > 0 && (
            <section className="mb-9">
              <MainTitle>References</MainTitle>
              <div className="grid grid-cols-2 gap-6">
                {data.references.map((r) => (
                  <div key={r.id}>
                    <p className="text-[14px] font-bold text-gray-900">{r.name}</p>
                    <p className="text-[13px] text-gray-500">
                      {r.title}
                      {r.company ? ` · ${r.company}` : ''}
                    </p>
                    {r.contact && <p className="text-[13px] text-gray-500">{r.contact}</p>}
                  </div>
                ))}
              </div>
            </section>
          ),
        },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
            <section key={section.id} className="mb-9">
              <MainTitle>{section.title}</MainTitle>
              <div className="space-y-5">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[15px] font-bold text-gray-900">{item.title}</h3>
                      {item.date && (
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-3">
                          {item.date}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <p className="text-[13px] italic text-gray-500 mt-0.5">{item.subtitle}</p>
                    )}
                    {item.description && (
                      <p className="text-[14px] leading-relaxed text-gray-600 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}
