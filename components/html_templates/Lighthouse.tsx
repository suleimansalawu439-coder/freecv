import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-gray-900 mb-5 flex items-center gap-2.5">
      <span className="inline-block w-2 h-2 rotate-45" style={{ backgroundColor: 'var(--theme-color)' }} />
      {children}
    </h2>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-100/70 mb-4">
      {children}
    </h2>
  );
}

export default function Lighthouse({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const initials = info.fullName
    ? info.fullName.split(' ').map((w) => w.charAt(0)).slice(0, 2).join('')
    : '';

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto flex">
      {/* Deep teal sidebar with angled beam top */}
      <aside className="w-[32%] shrink-0 bg-[#0f766e] text-white flex flex-col">
        <div
          className="px-8 pt-10 pb-14 bg-[#0d5f59]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 72%)' }}
        >
          {initials ? (
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
              <span className="text-lg font-black">{initials}</span>
            </div>
          ) : null}
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-teal-100/70">
            Navigator
          </p>
        </div>

        <div className="px-8 pb-10 -mt-4">
          {orderSections(data, {
            personal: (
              <div className="mb-8">
                <SidebarTitle>Contact</SidebarTitle>
                <div className="space-y-2 text-[13px] text-white/85">
                  {info.email && <div className="break-words">{info.email}</div>}
                  {info.phone && <div>{info.phone}</div>}
                  {info.location && <div>{info.location}</div>}
                  {info.website && <div className="break-words">{info.website}</div>}
                </div>
              </div>
            ),

            skills: data.skills.length > 0 && (
              <div className="mb-8">
                <SidebarTitle>Skills</SidebarTitle>
                {data.skills.map((s, i) => (
                  <div key={s.id} className="mb-3">
                    <p className="text-[13px] font-semibold text-white mb-1">{s.name}</p>
                    <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${64 + ((i * 41) % 32)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ),

            education: data.education.length > 0 && (
              <div className="mb-8">
                <SidebarTitle>Education</SidebarTitle>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-[13px] font-bold text-white">{edu.degree}</p>
                      <p className="text-[13px] text-white/70">{edu.school}</p>
                      {edu.graduationYear && (
                        <p className="text-xs text-white/50 mt-0.5">{edu.graduationYear}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
          })}
        </div>
      </aside>

      {/* Main with cards */}
      <main className="w-[68%] px-10 py-10">
        {orderSections(data, {
          personal: (
            <>
              <header className="mb-8">
                <h1 className="text-4xl font-black tracking-tight mb-2">{info.fullName}</h1>
                {info.jobTitle && (
                  <p
                    className="text-sm font-bold uppercase tracking-[0.16em]"
                    style={{ color: 'var(--theme-color)' }}
                  >
                    {info.jobTitle}
                  </p>
                )}
              </header>

              {data.summary && (
                <section className="mb-7">
                  <MainTitle>Profile</MainTitle>
                  <p className="text-sm leading-relaxed text-gray-600">{data.summary}</p>
                </section>
              )}
            </>
          ),

          experience: data.experience.length > 0 && (
            <section className="mb-7">
              <MainTitle>Experience</MainTitle>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="border border-gray-200 rounded-xl p-5 border-l-4"
                    style={{ borderLeftColor: 'var(--theme-color)' }}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[15px] font-bold text-gray-900">{exp.role}</h3>
                      <span className="text-xs font-semibold text-gray-400 whitespace-nowrap ml-3">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p
                      className="text-[13px] font-semibold mb-2"
                      style={{ color: 'var(--theme-color)' }}
                    >
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="space-y-1 pl-4 list-disc">
                        {exp.description
                          .split(/\n|\r\n/)
                          .filter((l) => l.trim())
                          .map((line, i) => (
                            <li key={i} className="text-[13px] leading-relaxed text-gray-600">
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
            <section className="mb-7">
              <MainTitle>Projects</MainTitle>
              <div className="space-y-4">
                {data.projects.map((p) => (
                  <div key={p.id} className="border border-gray-200 rounded-xl p-5">
                    <h3 className="text-[14px] font-bold text-gray-900">
                      {p.name}
                      {p.link && (
                        <span className="text-xs font-normal text-gray-400"> · {p.link}</span>
                      )}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-gray-600 mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
            <section className="mb-7">
              <MainTitle>Certifications</MainTitle>
              <div className="space-y-2.5">
                {data.certifications.map((c) => (
                  <div key={c.id} className="flex justify-between items-baseline">
                    <p className="text-[13px] font-semibold text-gray-800">
                      {c.name}
                      {c.issuer && <span className="font-normal text-gray-500"> — {c.issuer}</span>}
                    </p>
                    {c.date && <span className="text-xs text-gray-400 ml-3">{c.date}</span>}
                  </div>
                ))}
              </div>
            </section>
          ),

          references: data.showReferences && data.references.length > 0 && (
            <section className="mb-7">
              <MainTitle>References</MainTitle>
              <div className="grid grid-cols-2 gap-4">
                {data.references.map((r) => (
                  <div key={r.id} className="border border-gray-200 rounded-xl p-4">
                    <p className="text-sm font-bold text-gray-900">{r.name}</p>
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
            <section key={section.id} className="mb-7">
              <MainTitle>{section.title}</MainTitle>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-xl p-5 border-l-4"
                    style={{ borderLeftColor: 'var(--theme-color)' }}
                  >
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[14px] font-bold text-gray-900">{item.title}</h3>
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
                      <p className="text-[13px] leading-relaxed text-gray-600 mt-1">
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
