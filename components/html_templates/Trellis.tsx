import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-semibold tracking-[0.14em] uppercase text-[#5c6b58] mb-5">
      {children}
    </h2>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[11px] font-bold uppercase tracking-[0.18em] mb-4"
      style={{ color: 'var(--theme-color)' }}
    >
      {children}
    </h2>
  );
}

export default function Trellis({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-800 mx-auto flex">
      {/* Sage tint sidebar */}
      <aside className="w-[28%] shrink-0 bg-[#e9efe7] px-7 py-10">
        <div className="mb-9">
          <SidebarTitle>Contact</SidebarTitle>
          <div className="space-y-2 text-[13px] text-[#3c443a]">
            {info.email && <div className="break-words">{info.email}</div>}
            {info.phone && <div>{info.phone}</div>}
            {info.location && <div>{info.location}</div>}
            {info.website && <div className="break-words">{info.website}</div>}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="mb-9">
            <SidebarTitle>Skills</SidebarTitle>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span
                  key={s.id}
                  className="bg-white/70 border border-[#c9d4c5] rounded-full px-3 py-1 text-[12px] font-medium text-[#3c443a]"
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
            <div className="space-y-5">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[13px] font-bold text-[#2e352c]">{edu.degree}</p>
                  <p className="text-[13px] text-[#5a6557]">{edu.school}</p>
                  {edu.graduationYear && (
                    <p className="text-xs text-[#7a8577] mt-0.5">{edu.graduationYear}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <div className="mb-9">
            <SidebarTitle>Certifications</SidebarTitle>
            <div className="space-y-4">
              {data.certifications.map((c) => (
                <div key={c.id}>
                  <p className="text-[13px] font-bold text-[#2e352c]">{c.name}</p>
                  {c.issuer && <p className="text-[13px] text-[#5a6557]">{c.issuer}</p>}
                  {c.date && <p className="text-xs text-[#7a8577] mt-0.5">{c.date}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Airy main */}
      <main className="w-[72%] px-12 py-12">
        <header className="mb-10">
          <h1 className="text-[42px] font-bold tracking-tight text-[#242b23] leading-tight mb-2">
            {info.fullName}
          </h1>
          {info.jobTitle && (
            <p className="text-lg text-[#5a6557] font-medium">{info.jobTitle}</p>
          )}
        </header>

        {data.summary && (
          <section className="mb-10">
            <MainTitle>Profile</MainTitle>
            <p className="text-[14px] leading-[1.9] text-gray-600">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-10">
            <MainTitle>Experience</MainTitle>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-[16px] font-bold text-[#242b23] mb-0.5">{exp.role}</h3>
                  <p className="text-[13px] text-[#5a6557] mb-2">
                    {exp.company}
                    <span className="text-[#8a9487]">
                      {' '}
                      · {exp.startDate} – {exp.endDate}
                    </span>
                  </p>
                  {exp.description && (
                    <ul className="space-y-1.5 pl-4 list-disc marker:text-[#9aa794]">
                      {exp.description
                        .split(/\n|\r\n/)
                        .filter((l) => l.trim())
                        .map((line, i) => (
                          <li key={i} className="text-[14px] leading-[1.8] text-gray-600">
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
          <section className="mb-10">
            <MainTitle>Projects</MainTitle>
            <div className="space-y-6">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <h3 className="text-[15px] font-bold text-[#242b23]">
                    {p.name}
                    {p.link && (
                      <span className="text-[13px] font-normal text-[#7a8577]"> · {p.link}</span>
                    )}
                  </h3>
                  <p className="text-[14px] leading-[1.8] text-gray-600 mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references.length > 0 && (
          <section className="mb-10">
            <MainTitle>References</MainTitle>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((r) => (
                <div key={r.id}>
                  <p className="text-[14px] font-bold text-[#242b23]">{r.name}</p>
                  <p className="text-[13px] text-[#5a6557]">
                    {r.title}
                    {r.company ? ` · ${r.company}` : ''}
                  </p>
                  {r.contact && <p className="text-[13px] text-[#7a8577]">{r.contact}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections.map(
          (section) =>
            section.items &&
            section.items.length > 0 && (
              <section key={section.id} className="mb-10">
                <MainTitle>{section.title}</MainTitle>
                <div className="space-y-6">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <h3 className="text-[15px] font-bold text-[#242b23]">{item.title}</h3>
                      {(item.subtitle || item.date) && (
                        <p className="text-[13px] text-[#5a6557] mt-0.5">
                          {item.subtitle}
                          {item.subtitle && item.date ? ' · ' : ''}
                          {item.date}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-[14px] leading-[1.8] text-gray-600 mt-1">
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
