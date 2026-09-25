import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-gray-900 mb-5">
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

export default function Headland({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto flex">
      {/* Sidebar: theme name block + white body */}
      <aside className="w-[35%] shrink-0 flex flex-col">
        <div className="px-8 py-10" style={{ backgroundColor: 'var(--theme-color)' }}>
          <h1 className="text-[28px] font-black text-white leading-tight mb-2">{info.fullName}</h1>
          {info.jobTitle && (
            <p className="text-[13px] font-semibold text-white/85 uppercase tracking-[0.12em]">
              {info.jobTitle}
            </p>
          )}
        </div>

        <div className="px-8 py-9 flex-1">
          <div className="mb-8">
            <SidebarTitle>Contact</SidebarTitle>
            <div className="space-y-2 text-[13px] text-gray-700">
              {info.email && <div className="break-words">{info.email}</div>}
              {info.phone && <div>{info.phone}</div>}
              {info.location && <div>{info.location}</div>}
              {info.website && <div className="break-words">{info.website}</div>}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div className="mb-8">
              <SidebarTitle>Skills</SidebarTitle>
              {data.skills.map((s, i) => (
                <div key={s.id} className="mb-3">
                  <p className="text-[13px] font-semibold text-gray-800 mb-1">{s.name}</p>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${66 + ((i * 43) % 30)}%`,
                        backgroundColor: 'var(--theme-color)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.education.length > 0 && (
            <div className="mb-8">
              <SidebarTitle>Education</SidebarTitle>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[13px] font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-[13px] text-gray-500">{edu.school}</p>
                    {edu.graduationYear && (
                      <p className="text-xs text-gray-400 mt-0.5">{edu.graduationYear}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div className="mb-8">
              <SidebarTitle>Certifications</SidebarTitle>
              <div className="space-y-3">
                {data.certifications.map((c) => (
                  <div key={c.id}>
                    <p className="text-[13px] font-bold text-gray-900">{c.name}</p>
                    {c.issuer && <p className="text-[13px] text-gray-500">{c.issuer}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main with quote-style summary */}
      <main className="w-[65%] px-11 py-10">
        {data.summary && (
          <section className="mb-9">
            <div
              className="border-l-4 pl-6 py-1"
              style={{ borderColor: 'var(--theme-color)' }}
            >
              <p className="text-[15px] italic leading-relaxed text-gray-600">“{data.summary}”</p>
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-9">
            <MainTitle>Experience</MainTitle>
            <div className="space-y-7">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[16px] font-bold text-gray-900">{exp.role}</h3>
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
        )}

        {data.showProjects && data.projects.length > 0 && (
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
        )}

        {data.showReferences && data.references.length > 0 && (
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
        )}

        {data.customSections.map(
          (section) =>
            section.items &&
            section.items.length > 0 && (
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
            )
        )}
      </main>
    </div>
  );
}
