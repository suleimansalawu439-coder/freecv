import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2
      className="text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
      style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );
}

export default function Uplink({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto">
      {/* Top split: name block left, theme contact panel right */}
      {orderSections(data, {
        personal: (
          <header className="flex mb-8 min-h-[180px]">
            <div className="flex-1 px-[0.9in] py-10 flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">{info.fullName}</h1>
              {info.jobTitle && (
                <p className="text-base font-medium" style={{ color: 'var(--theme-color)' }}>
                  {info.jobTitle}
                </p>
              )}
            </div>
            <div
              className="w-[38%] px-8 py-10 text-white flex flex-col justify-center"
              style={{ backgroundColor: 'var(--theme-color)' }}
            >
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-white/80">
                Contact
              </h2>
              <div className="space-y-2 text-[13px] font-medium break-words">
                {info.email && <p>{info.email}</p>}
                {info.phone && <p>{info.phone}</p>}
                {info.location && <p>{info.location}</p>}
                {info.website && <p>{info.website}</p>}
              </div>
            </div>
          </header>
        ),
      })}

      <div className="px-[0.9in] pb-[0.8in]">
        {orderSections(data, {
          personal: data.summary && (
            <section className="mb-7">
              <SectionHeader title="Profile" />
              <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
            </section>
          ),

          experience: data.experience.length > 0 && (
            <section className="mb-7">
              <SectionHeader title="Experience" />
              <div className="space-y-5">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <p
                      className="text-sm font-medium mb-2"
                      style={{ color: 'var(--theme-color)' }}
                    >
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="space-y-1 pl-4 list-disc marker:text-gray-300">
                        {exp.description
                          .split(/\n|\r?\n/)
                          .filter((l) => l.trim())
                          .map((line, i) => (
                            <li key={i} className="text-sm leading-relaxed text-gray-700">
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
            <section
              className="mb-7 -mx-[0.9in] px-[0.9in] py-7"
              style={{ backgroundColor: 'var(--theme-color)' }}
            >
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-white">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs font-semibold text-white bg-white/15 border border-white/25 px-3 py-1.5 rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          ),

          education: data.education.length > 0 && (
            <section className="mb-7">
              <SectionHeader title="Education" />
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                      <p className="text-sm text-gray-600">{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-500">{edu.graduationYear}</span>
                  </div>
                ))}
              </div>
            </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
            <section className="mb-7">
              <SectionHeader title="Projects" />
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                      {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
            <section className="mb-7">
              <SectionHeader title="Certifications" />
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">{cert.name}</span>
                      {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                    </p>
                    <span className="text-xs text-gray-500">{cert.date}</span>
                  </div>
                ))}
              </div>
            </section>
          ),

          references: data.showReferences && data.references.length > 0 && (
            <section className="mb-7">
              <SectionHeader title="References" />
              <div className="space-y-3">
                {data.references.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                    <p className="text-sm text-gray-600">
                      {ref.title}
                      {ref.company && `, ${ref.company}`}
                    </p>
                    {ref.contact && <p className="text-xs text-gray-500">{ref.contact}</p>}
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
                <SectionHeader title={section.title} />
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                        {item.date && <span className="text-xs text-gray-500">{item.date}</span>}
                      </div>
                      {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                      {item.description && (
                        <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))
        )}
      </div>
    </div>
  );
}
