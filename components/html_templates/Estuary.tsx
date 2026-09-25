import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-black uppercase tracking-[0.16em] text-gray-900 mb-3">
      {children}
    </h2>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80 mb-4">
      {children}
    </h2>
  );
}

export default function Estuary({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto flex">
      {/* Theme-colored left sidebar with white-text pills */}
      <aside
        className="w-[30%] shrink-0 px-8 py-10 text-white"
        style={{ backgroundColor: 'var(--theme-color)' }}
      >
        <div className="mb-9">
          <SidebarTitle>Contact</SidebarTitle>
          <div className="space-y-2 text-[13px] text-white/90">
            {info.email && <div className="break-words">{info.email}</div>}
            {info.phone && <div>{info.phone}</div>}
            {info.location && <div>{info.location}</div>}
            {info.website && <div className="break-words">{info.website}</div>}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="mb-9">
            <SidebarTitle>Skills</SidebarTitle>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <span
                  key={s.id}
                  className="rounded-full px-3 py-1 text-[12px] font-semibold text-white border border-white/40"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div className="mb-9">
            <SidebarTitle>Education</SidebarTitle>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[13px] font-bold text-white">{edu.degree}</p>
                  <p className="text-[13px] text-white/80">{edu.school}</p>
                  {edu.graduationYear && (
                    <p className="text-xs text-white/60 mt-0.5">{edu.graduationYear}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <div className="mb-9">
            <SidebarTitle>Certifications</SidebarTitle>
            <div className="space-y-3">
              {data.certifications.map((c) => (
                <div key={c.id}>
                  <p className="text-[13px] font-bold text-white">{c.name}</p>
                  {c.issuer && <p className="text-[13px] text-white/80">{c.issuer}</p>}
                  {c.date && <p className="text-xs text-white/60 mt-0.5">{c.date}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main with tinted section cards (dual-tint system) */}
      <main className="w-[70%] px-10 py-10">
        <header className="mb-8">
          <h1 className="text-[38px] font-black tracking-tight leading-tight mb-2">
            {info.fullName}
          </h1>
          {info.jobTitle && (
            <p
              className="text-[15px] font-bold"
              style={{ color: 'var(--theme-color)' }}
            >
              {info.jobTitle}
            </p>
          )}
        </header>

        {data.summary && (
          <section
            className="rounded-lg px-6 py-5 mb-6"
            style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 10%, white)' }}
          >
            <MainTitle>Profile</MainTitle>
            <p className="text-[14px] leading-relaxed text-gray-600">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section
            className="rounded-lg px-6 py-5 mb-6"
            style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 7%, white)' }}
          >
            <MainTitle>Experience</MainTitle>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[15px] font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-gray-400 whitespace-nowrap ml-3">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold text-gray-500 mb-1.5">{exp.company}</p>
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
        )}

        {data.showProjects && data.projects.length > 0 && (
          <section
            className="rounded-lg px-6 py-5 mb-6"
            style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 7%, white)' }}
          >
            <MainTitle>Projects</MainTitle>
            <div className="space-y-4">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <h3 className="text-[14px] font-bold text-gray-900">
                    {p.name}
                    {p.link && (
                      <span className="text-xs font-normal text-gray-400"> · {p.link}</span>
                    )}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-gray-600 mt-0.5">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references.length > 0 && (
          <section
            className="rounded-lg px-6 py-5 mb-6"
            style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 7%, white)' }}
          >
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
        )}

        {data.customSections.map(
          (section) =>
            section.items &&
            section.items.length > 0 && (
              <section
                key={section.id}
                className="rounded-lg px-6 py-5 mb-6"
                style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 7%, white)' }}
              >
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
            )
        )}
      </main>
    </div>
  );
}
