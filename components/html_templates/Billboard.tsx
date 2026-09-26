import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[12px] font-black uppercase tracking-[0.24em] text-gray-400 mb-5 pb-2 border-b border-gray-200">
      {children}
    </h2>
  );
}

export default function Billboard({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto">
      {/* Full-bleed theme header block */}
      {orderSections(data, {
        personal: (
      <header
        className="px-12 pt-14 pb-12 text-white"
        style={{ backgroundColor: 'var(--theme-color)' }}
      >
        <h1 className="text-[52px] font-black tracking-tight leading-[1.05] mb-3">
          {info.fullName}
        </h1>
        {info.jobTitle && (
          <p className="text-xl font-semibold text-white/90 mb-5">{info.jobTitle}</p>
        )}
        <p className="text-[13px] font-medium text-white/85">
          {[info.email, info.phone, info.location, info.website].filter(Boolean).join('  ·  ')}
        </p>
      </header>
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
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span
                  key={s.id}
                  className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-gray-700 border border-gray-200 bg-gray-50"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </section>
          ),

          experience: data.experience.length > 0 && (
          <section className="mb-9">
            <MainTitle>Experience</MainTitle>
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gray-200" />
              <div className="space-y-7">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <span
                      className="absolute -left-6 top-1.5 w-[15px] h-[15px] rounded-full border-[3px] border-white shadow-sm"
                      style={{ backgroundColor: 'var(--theme-color)' }}
                    />
                    <div className="flex justify-between items-baseline mb-0.5">
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
