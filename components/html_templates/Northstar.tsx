import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400 mb-5">
      {children}
    </h2>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[11px] font-black uppercase tracking-[0.22em] mb-4"
      style={{ color: 'var(--theme-color)' }}
    >
      {children}
    </h2>
  );
}

function StarBullet() {
  return (
    <span className="mr-2 text-sm leading-none" style={{ color: 'var(--theme-color)' }}>
      ★
    </span>
  );
}

export default function Northstar({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto flex">
      {/* Charcoal sidebar */}
      <aside className="w-[30%] shrink-0 bg-[#23272f] px-8 py-10 text-white">
        {orderSections(data, {
          personal: (
        <div className="mb-9">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-lg" style={{ color: 'var(--theme-color)' }}>
              ★
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/50">
              Contact
            </span>
          </div>
          <div className="space-y-2 text-[13px] text-white/85">
            {info.email && <div className="break-words">{info.email}</div>}
            {info.phone && <div>{info.phone}</div>}
            {info.location && <div>{info.location}</div>}
            {info.website && <div className="break-words">{info.website}</div>}
          </div>
        </div>
          ),

          skills: data.skills.length > 0 && (
          <div className="mb-9">
            <SidebarTitle>Skills</SidebarTitle>
            <div className="space-y-2">
              {data.skills.map((s) => (
                <div
                  key={s.id}
                  className="border border-white/15 rounded px-3 py-2 text-[13px] font-semibold text-white/90"
                >
                  <StarBullet />
                  {s.name}
                </div>
              ))}
            </div>
          </div>
          ),

          education: data.education.length > 0 && (
          <div className="mb-9">
            <SidebarTitle>Education</SidebarTitle>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex">
                  <StarBullet />
                  <div>
                    <p className="text-[13px] font-bold text-white">{edu.degree}</p>
                    <p className="text-[13px] text-white/70">{edu.school}</p>
                    {edu.graduationYear && (
                      <p className="text-xs text-white/45 mt-0.5">{edu.graduationYear}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
          <div className="mb-9">
            <SidebarTitle>Certifications</SidebarTitle>
            <div className="space-y-3">
              {data.certifications.map((c) => (
                <div key={c.id} className="flex">
                  <StarBullet />
                  <div>
                    <p className="text-[13px] font-bold text-white">{c.name}</p>
                    {c.issuer && <p className="text-[13px] text-white/70">{c.issuer}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          ),

        })}
      </aside>

      {/* Main with left rail */}
      <main className="w-[70%] px-10 py-10">
        {orderSections(data, {
          personal: (
            <>
        <header className="mb-8">
          <h1 className="text-4xl font-black tracking-tight mb-2">{info.fullName}</h1>
          {info.jobTitle && <p className="text-base text-gray-500 font-medium">{info.jobTitle}</p>}
        </header>

        {data.summary && (
          <section className="mb-8">
            <MainTitle>Profile</MainTitle>
            <p className="text-sm leading-relaxed text-gray-600">{data.summary}</p>
          </section>
        )}
            </>
          ),

          experience: data.experience.length > 0 && (
          <section className="mb-8">
            <MainTitle>Experience</MainTitle>
            <div
              className="border-l-2 pl-6 space-y-6"
              style={{ borderColor: 'var(--theme-color)' }}
            >
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <span
                    className="absolute -left-[31px] top-1 text-xs"
                    style={{ color: 'var(--theme-color)' }}
                  >
                    ★
                  </span>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[15px] font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-gray-400 whitespace-nowrap ml-3">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p className="text-[13px] font-medium text-gray-500 mb-1.5">{exp.company}</p>
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
          <section className="mb-8">
            <MainTitle>Projects</MainTitle>
            <div className="space-y-4">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <h3 className="text-[14px] font-bold text-gray-900">{p.name}</h3>
                  <p className="text-[13px] leading-relaxed text-gray-600 mt-0.5">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
          ),

          references: data.showReferences && data.references.length > 0 && (
          <section className="mb-8">
            <MainTitle>References</MainTitle>
            <div className="grid grid-cols-2 gap-5">
              {data.references.map((r) => (
                <div key={r.id}>
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
              <section key={section.id} className="mb-8">
                <MainTitle>{section.title}</MainTitle>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-[14px] font-bold text-gray-900">{item.title}</h3>
                        {item.date && (
                          <span className="text-xs text-gray-400 whitespace-nowrap ml-3">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-[13px] italic text-gray-500">{item.subtitle}</p>
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
