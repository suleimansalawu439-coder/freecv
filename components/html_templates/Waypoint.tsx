import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-black uppercase tracking-[0.16em] text-gray-900 mb-5">
      {children}
    </h2>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[11px] font-black uppercase tracking-[0.2em] mb-4"
      style={{ color: 'var(--theme-color)' }}
    >
      {children}
    </h2>
  );
}

export default function Waypoint({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto flex">
      {/* Light tint sidebar with career timeline */}
      <aside
        className="w-[28%] shrink-0 px-7 py-10"
        style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 9%, white)' }}
      >
        {orderSections(data, {
          personal: (
            <div className="mb-9">
              <SidebarTitle>Contact</SidebarTitle>
              <div className="space-y-2 text-[13px] text-gray-700">
                {info.email && <div className="break-words">{info.email}</div>}
                {info.phone && <div>{info.phone}</div>}
                {info.location && <div>{info.location}</div>}
                {info.website && <div className="break-words">{info.website}</div>}
              </div>
            </div>
          ),

          experience: data.experience.length > 0 && (
            <div className="mb-9">
              <SidebarTitle>Career Path</SidebarTitle>
              <div className="relative pl-5">
                <div
                  className="absolute left-[5px] top-1 bottom-1 w-[2px]"
                  style={{ backgroundColor: 'var(--theme-color)', opacity: 0.3 }}
                />
                <div className="space-y-5">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="relative">
                      <span
                        className="absolute -left-5 top-1 w-[12px] h-[12px] rounded-full border-[3px] bg-white"
                        style={{ borderColor: 'var(--theme-color)' }}
                      />
                      <p className="text-[13px] font-bold text-gray-900 leading-snug">{exp.role}</p>
                      <p className="text-xs text-gray-500">{exp.company}</p>
                      <p className="text-xs font-semibold text-gray-400 mt-0.5">
                        {exp.startDate} – {exp.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),

          skills: data.skills.length > 0 && (
            <div className="mb-9">
              <SidebarTitle>Skills</SidebarTitle>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s) => (
                  <span
                    key={s.id}
                    className="rounded px-2.5 py-1 text-[12px] font-medium text-gray-700 border"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--theme-color) 12%, white)',
                      borderColor: 'color-mix(in srgb, var(--theme-color) 25%, white)',
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ),

          education: data.education.length > 0 && (
            <div className="mb-9">
              <SidebarTitle>Education</SidebarTitle>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[13px] font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-[13px] text-gray-600">{edu.school}</p>
                    {edu.graduationYear && (
                      <p className="text-xs text-gray-400 mt-0.5">{edu.graduationYear}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ),
        })}
      </aside>

      {/* Main — expanded experience detail */}
      <main className="w-[72%] px-11 py-10">
        {orderSections(data, {
          personal: (
            <>
              <header className="mb-9">
                <h1 className="text-[40px] font-black tracking-tight leading-tight mb-2">
                  {info.fullName}
                </h1>
                {info.jobTitle && (
                  <p
                    className="text-base font-semibold"
                    style={{ color: 'var(--theme-color)' }}
                  >
                    {info.jobTitle}
                  </p>
                )}
              </header>

              {data.summary && (
                <section className="mb-9">
                  <MainTitle>Profile</MainTitle>
                  <p className="text-[14px] leading-relaxed text-gray-600">{data.summary}</p>
                </section>
              )}
            </>
          ),

          experience: data.experience.length > 0 && (
            <section className="mb-9">
              <MainTitle>Experience</MainTitle>
              <div className="space-y-8">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                      <span
                        className="text-[13px] font-bold whitespace-nowrap ml-4"
                        style={{ color: 'var(--theme-color)' }}
                      >
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-[14px] font-medium text-gray-500 mb-3">{exp.company}</p>
                    {exp.description && (
                      <ul className="space-y-2 pl-5 list-disc">
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
                          <span
                            className="text-[13px] font-bold whitespace-nowrap ml-4"
                            style={{ color: 'var(--theme-color)' }}
                          >
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-[14px] text-gray-500 mt-0.5">{item.subtitle}</p>
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
