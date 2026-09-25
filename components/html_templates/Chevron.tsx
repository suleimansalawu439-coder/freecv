import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function RibbonHeader({ title }: { title: string }) {
  return (
    <div className="mb-5">
      <div
        className="inline-block px-7 py-1.5"
        style={{
          backgroundColor: 'var(--theme-color)',
          clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%, 14px 50%)',
        }}
      >
        <span className="text-xs font-black uppercase tracking-[0.22em] text-white pl-3">
          {title}
        </span>
      </div>
    </div>
  );
}

export default function Chevron({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-12 py-12">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight mb-2">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-lg font-semibold mb-3" style={{ color: 'var(--theme-color)' }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-500">
            {contactItems.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        )}
        <div
          className="mx-auto mt-5 h-1 w-24"
          style={{
            backgroundColor: 'var(--theme-color)',
            clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)',
          }}
        />
      </header>

      <main className="space-y-9">
        {data.summary && (
          <section>
            <RibbonHeader title="Profile" />
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <RibbonHeader title="Experience" />
            <div className="space-y-7">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-gray-400 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-600 mb-2">{exp.company}</div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
                    {exp.description.split(/\n|\r\n/).filter(l => l.trim()).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <RibbonHeader title="Education" />
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                    <span className="text-xs font-semibold text-gray-400">{edu.graduationYear}</span>
                  </div>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <RibbonHeader title="Skills" />
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {data.skills.map((skill, si) => {
                const level = 3 + ((si * 2 + 1) % 3);
                return (
                  <div key={skill.id}>
                    <div className="text-sm font-semibold text-gray-800 mb-1.5">{skill.name}</div>
                    <div className="flex gap-1.5">
                      {[0, 1, 2, 3, 4].map(i => (
                        <div
                          key={i}
                          className="w-9 h-2"
                          style={{ backgroundColor: i < level ? 'var(--theme-color)' : '#e5e7eb' }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {data.showProjects && data.projects.length > 0 && (
          <section>
            <RibbonHeader title="Projects" />
            <div className="space-y-4">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                    {proj.link && <span className="text-xs font-semibold text-gray-400">{proj.link}</span>}
                  </div>
                  {proj.description && <p className="text-sm text-gray-600 mt-1">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <section>
            <RibbonHeader title="Certifications" />
            <div className="space-y-3">
              {data.certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                    {cert.issuer && <div className="text-sm text-gray-600">{cert.issuer}</div>}
                  </div>
                  {cert.date && <span className="text-xs font-semibold text-gray-400">{cert.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
          section.items.length > 0 && (
            <section key={section.id}>
              <RibbonHeader title={section.title} />
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                      {item.date && <span className="text-xs font-semibold text-gray-400">{item.date}</span>}
                    </div>
                    {item.subtitle && <div className="text-sm text-gray-600 italic">{item.subtitle}</div>}
                    {item.description && <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        ))}

        {data.showReferences && data.references && data.references.length > 0 && (
          <section>
            <RibbonHeader title="References" />
            <div className="grid grid-cols-2 gap-6">
              {data.references.map(ref => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <h3 className="font-bold text-gray-900">{ref.name}</h3>
                  <div className="text-sm text-gray-600">{ref.title} @ {ref.company}</div>
                  {ref.contact && <div className="text-sm text-gray-500">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
