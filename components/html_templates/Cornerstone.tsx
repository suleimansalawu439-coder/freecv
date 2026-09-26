import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
      {children}
    </h2>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
      style={{ color: 'var(--theme-color)' }}
    >
      {children}
    </h2>
  );
}

export default function Cornerstone({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-gray-900 mx-auto flex">
      {/* Main (left) */}
      <main className="w-[70%] px-11 py-11">
        {orderSections(data, {
          personal: (
            <>
              <header className="mb-9">
          <h1 className="text-[44px] font-bold leading-tight mb-2">{info.fullName}</h1>
          {info.jobTitle && (
            <p className="text-lg italic text-gray-600">{info.jobTitle}</p>
          )}
        </header>

        {data.summary && (
          <section className="mb-8">
            <MainTitle>Profile</MainTitle>
            <p className="text-[14px] leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}
            </>
          ),

          experience: data.experience.length > 0 && (
          <section className="mb-8">
            <MainTitle>Professional Experience</MainTitle>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[16px] font-bold">{exp.role}</h3>
                    <span className="text-[13px] text-gray-500 whitespace-nowrap ml-4">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-[14px] italic text-gray-600 mb-2">{exp.company}</p>
                  {exp.description && (
                    <ul className="space-y-1.5 pl-5 list-disc">
                      {exp.description
                        .split(/\n|\r\n/)
                        .filter((l) => l.trim())
                        .map((line, i) => (
                          <li key={i} className="text-[14px] leading-relaxed text-gray-700">
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
                  <h3 className="text-[15px] font-bold">
                    {p.name}
                    {p.link && (
                      <span className="text-[13px] font-normal italic text-gray-500">
                        {' '}
                        ({p.link})
                      </span>
                    )}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-gray-700 mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        ),

          education: data.education.length > 0 && (
          <section className="mb-8">
            <MainTitle>Education</MainTitle>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <p className="text-[14px] font-bold">{edu.degree}</p>
                    <p className="text-[14px] italic text-gray-600">{edu.school}</p>
                  </div>
                  {edu.graduationYear && (
                    <p className="text-[13px] text-gray-500 whitespace-nowrap ml-4">
                      {edu.graduationYear}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
          <section className="mb-8">
            <MainTitle>Certifications</MainTitle>
            <div className="space-y-3">
              {data.certifications.map((c) => (
                <div key={c.id}>
                  <p className="text-[14px] font-bold">{c.name}</p>
                  <p className="text-[13px] italic text-gray-600">
                    {c.issuer}
                    {c.issuer && c.date ? ' · ' : ''}
                    {c.date}
                  </p>
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
                        <h3 className="text-[15px] font-bold">{item.title}</h3>
                        {item.date && (
                          <span className="text-[13px] text-gray-500 whitespace-nowrap ml-4">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-[14px] italic text-gray-600">{item.subtitle}</p>
                      )}
                      {item.description && (
                        <p className="text-[14px] leading-relaxed text-gray-700 mt-1">
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

      {/* Cream right sidebar */}
      <aside className="w-[30%] shrink-0 bg-[#faf5ea] px-8 py-11">
        {orderSections(data, {
          personal: (
            <div className="mb-9">
          <SidebarTitle>Contact</SidebarTitle>
          <div className="space-y-2 text-[13px] text-[#4a3f2c]">
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
            <p className="text-[13px] leading-[1.9] text-[#4a3f2c]">
              {data.skills.map((s) => s.name).join(' · ')}
            </p>
          </div>
          ),

          references: data.showReferences && data.references.length > 0 && (
          <div className="mb-9">
            <SidebarTitle>References</SidebarTitle>
            <div className="space-y-4">
              {data.references.map((r) => (
                <div key={r.id}>
                  <p className="text-[13px] font-bold text-[#2e2718]">{r.name}</p>
                  <p className="text-[13px] italic text-[#6b5d43]">
                    {r.title}
                    {r.company ? `, ${r.company}` : ''}
                  </p>
                  {r.contact && <p className="text-[13px] text-[#6b5d43]">{r.contact}</p>}
                </div>
              ))}
            </div>
            </div>
          ),
        })}
      </aside>
    </div>
  );
}
