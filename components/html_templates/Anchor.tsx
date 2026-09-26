import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-sm font-bold uppercase tracking-[0.22em] mb-5 pb-2 border-b"
      style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
    >
      {children}
    </h2>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xs font-bold uppercase tracking-[0.25em] mb-5"
      style={{ color: 'var(--theme-color)' }}
    >
      {children}
    </h2>
  );
}

export default function Anchor({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const initials = info.fullName
    ? info.fullName.split(' ').map((w) => w.charAt(0)).slice(0, 2).join('')
    : '';

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-gray-900 mx-auto flex">
      {/* Elegant bordered sidebar */}
      <aside
        className="w-[35%] shrink-0 px-9 py-12 border-r-2"
        style={{ borderColor: 'var(--theme-color)' }}
      >
        {orderSections(data, {
          personal: (
            <>
        {initials ? (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-10 border-2"
            style={{ borderColor: 'var(--theme-color)' }}
          >
            <span className="text-xl font-bold" style={{ color: 'var(--theme-color)' }}>
              {initials}
            </span>
          </div>
        ) : null}

        <div className="mb-10">
          <SidebarTitle>Contact</SidebarTitle>
          <div className="space-y-2.5 text-sm text-gray-700">
            {info.email && <div className="break-words">{info.email}</div>}
            {info.phone && <div>{info.phone}</div>}
            {info.location && <div>{info.location}</div>}
            {info.website && <div className="break-words">{info.website}</div>}
          </div>
        </div>
            </>
          ),

          skills: data.skills.length > 0 && (
          <div className="mb-10">
            <SidebarTitle>Skills</SidebarTitle>
            <ul className="divide-y divide-gray-200">
              {data.skills.map((s) => (
                <li key={s.id} className="py-2 text-sm text-gray-800">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
          ),

          education: data.education.length > 0 && (
          <div className="mb-10">
            <SidebarTitle>Education</SidebarTitle>
            <div className="space-y-5">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-sm italic text-gray-600">{edu.school}</p>
                  {edu.graduationYear && (
                    <p className="text-xs text-gray-500 mt-1">{edu.graduationYear}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
          <div className="mb-10">
            <SidebarTitle>Certifications</SidebarTitle>
            <div className="space-y-4">
              {data.certifications.map((c) => (
                <div key={c.id}>
                  <p className="text-sm font-bold text-gray-900">{c.name}</p>
                  {c.issuer && <p className="text-sm italic text-gray-600">{c.issuer}</p>}
                  {c.date && <p className="text-xs text-gray-500 mt-1">{c.date}</p>}
                </div>
              ))}
            </div>
          </div>
          ),
        })}
      </aside>

      {/* Generous main column */}
      <main className="w-[65%] px-12 py-12">
        {orderSections(data, {
          personal: (
            <>
        <header className="mb-10">
          <h1 className="text-5xl font-bold leading-tight mb-3 text-gray-900">
            {info.fullName}
          </h1>
          {info.jobTitle && (
            <p className="text-xl italic text-gray-600">{info.jobTitle}</p>
          )}
        </header>

        {data.summary && (
          <section className="mb-10">
            <SectionTitle>Profile</SectionTitle>
            <p className="text-[15px] leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}
            </>
          ),

          experience: data.experience.length > 0 && (
          <section className="mb-10">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-7">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-base italic text-gray-600 mb-2">{exp.company}</p>
                  {exp.description && (
                    <ul className="space-y-1.5 pl-5 list-disc">
                      {exp.description
                        .split(/\n|\r\n/)
                        .filter((l) => l.trim())
                        .map((line, i) => (
                          <li key={i} className="text-[15px] leading-relaxed text-gray-700">
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
          <section className="mb-10">
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-5">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <h3 className="text-base font-bold text-gray-900">
                    {p.name}
                    {p.link && (
                      <span className="text-sm font-normal italic text-gray-500"> — {p.link}</span>
                    )}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-gray-700 mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
          ),

          references: data.showReferences && data.references.length > 0 && (
          <section className="mb-10">
            <SectionTitle>References</SectionTitle>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((r) => (
                <div key={r.id}>
                  <p className="text-sm font-bold text-gray-900">{r.name}</p>
                  <p className="text-sm italic text-gray-600">
                    {r.title}
                    {r.company ? `, ${r.company}` : ''}
                  </p>
                  {r.contact && <p className="text-sm text-gray-600">{r.contact}</p>}
                </div>
              ))}
            </div>
          </section>
          ),
        },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
            <section key={section.id} className="mb-10">
              <SectionTitle>{section.title}</SectionTitle>
              <div className="space-y-5">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                      {item.date && (
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                          {item.date}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <p className="text-sm italic text-gray-600 mb-1">{item.subtitle}</p>
                    )}
                    {item.description && (
                      <p className="text-[15px] leading-relaxed text-gray-700">
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
