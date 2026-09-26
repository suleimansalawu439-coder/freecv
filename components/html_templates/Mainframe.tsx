import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="border-y-2 border-gray-900 py-2 mb-4 mt-2">
      <h2 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-center text-gray-900">
        {title}
      </h2>
    </div>
  );
}

export default function Mainframe({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-mono text-gray-900 px-[0.9in] py-[0.8in] mx-auto">
      {orderSections(data, {
        personal: (
          <>
            {/* Centered bordered name */}
            <header className="mb-8 text-center">
              <div className="inline-block border-2 border-gray-900 px-8 py-5">
                <h1 className="text-3xl font-bold uppercase tracking-[0.15em]">{info.fullName}</h1>
                {info.jobTitle && (
                  <p className="text-sm mt-2 tracking-widest" style={{ color: 'var(--theme-color)' }}>
                    {info.jobTitle}
                  </p>
                )}
              </div>
              {contactItems.length > 0 && (
                <p className="text-xs text-gray-600 mt-4">{contactItems.join('  |  ')}</p>
              )}
            </header>

            {data.summary && (
              <section className="mb-6">
                <SectionHeader title="Profile" />
                <p className="text-[13px] leading-relaxed text-gray-800">{data.summary}</p>
              </section>
            )}
          </>
        ),

        experience: data.experience.length > 0 && (
          <section className="mb-6">
            <SectionHeader title="Experience" />
            <div className="border-2 border-gray-900 divide-y-2 divide-gray-900">
              {data.experience.map((exp) => (
                <div key={exp.id} className="p-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold uppercase tracking-wide">{exp.role}</h3>
                    <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                      [{exp.startDate} -- {exp.endDate}]
                    </span>
                  </div>
                  <p className="text-[13px] font-bold mb-2" style={{ color: 'var(--theme-color)' }}>
                    {exp.company}
                  </p>
                  {exp.description && (
                    <ul className="space-y-1">
                      {exp.description
                        .split(/\n|\r?\n/)
                        .filter((l) => l.trim())
                        .map((line, i) => (
                          <li key={i} className="text-[13px] leading-relaxed text-gray-800">
                            <span className="text-gray-400">&gt; </span>
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

        skills: data.skills.length > 0 && (
          <section className="mb-6">
            <SectionHeader title="Skills" />
            <div className="grid grid-cols-3 border-2 border-gray-900">
              {data.skills.map((skill, i) => (
                <div
                  key={skill.id}
                  className={`px-4 py-2.5 text-[13px] font-medium text-gray-900 ${
                    i % 3 !== 2 ? 'border-r-2 border-gray-900' : ''
                  } ${i < data.skills.length - (data.skills.length % 3 || 3) ? 'border-b-2 border-gray-900' : ''}`}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        ),

        education: data.education.length > 0 && (
          <section className="mb-6">
            <SectionHeader title="Education" />
            <div className="border-2 border-gray-900 divide-y-2 divide-gray-900">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-4 flex justify-between items-baseline">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide">{edu.degree}</p>
                    <p className="text-[13px] text-gray-700">{edu.school}</p>
                  </div>
                  <span className="text-xs text-gray-600">[{edu.graduationYear}]</span>
                </div>
              ))}
            </div>
          </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
          <section className="mb-6">
            <SectionHeader title="Projects" />
            <div className="border-2 border-gray-900 divide-y-2 divide-gray-900">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide">{proj.name}</h3>
                  {proj.link && <p className="text-xs text-gray-600 mt-1">{proj.link}</p>}
                  <p className="text-[13px] text-gray-800 leading-relaxed mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
          <section className="mb-6">
            <SectionHeader title="Certifications" />
            <div className="border-2 border-gray-900 divide-y-2 divide-gray-900">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="p-4 flex justify-between items-baseline">
                  <p className="text-[13px] text-gray-900">
                    <span className="font-bold uppercase">{cert.name}</span>
                    {cert.issuer && <span className="text-gray-700"> :: {cert.issuer}</span>}
                  </p>
                  <span className="text-xs text-gray-600">[{cert.date}]</span>
                </div>
              ))}
            </div>
          </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
          <section className="mb-6">
            <SectionHeader title="References" />
            <div className="border-2 border-gray-900 divide-y-2 divide-gray-900">
              {data.references.map((ref) => (
                <div key={ref.id} className="p-4">
                  <p className="text-[13px] font-bold uppercase tracking-wide">{ref.name}</p>
                  <p className="text-[13px] text-gray-700">
                    {ref.title}
                    {ref.company && ` :: ${ref.company}`}
                  </p>
                  {ref.contact && <p className="text-xs text-gray-600 mt-1">{ref.contact}</p>}
                </div>
              ))}
            </div>
          </section>
        ),
      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <section key={section.id} className="mb-6">
            <SectionHeader title={section.title} />
            <div className="border-2 border-gray-900 divide-y-2 divide-gray-900">
              {section.items.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold uppercase tracking-wide">{item.title}</h3>
                    {item.date && <span className="text-xs text-gray-600">[{item.date}]</span>}
                  </div>
                  {item.subtitle && <p className="text-[13px] text-gray-700">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-[13px] text-gray-800 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
