import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-black uppercase tracking-[0.22em] mb-4 flex items-center gap-3">
      <span style={{ color: 'var(--theme-color)' }}>{title}</span>
      <span className="flex-1 h-px bg-gray-200" />
    </h2>
  );
}

export default function Bifocal({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-12 py-10">
      {/* Header */}
      {orderSections(data, {
        personal: (
      <header className="mb-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight">{info.fullName}</h1>
            {info.jobTitle && (
              <p className="text-base font-bold mt-1" style={{ color: 'var(--theme-color)' }}>
                {info.jobTitle}
              </p>
            )}
          </div>
          {contactItems.length > 0 && (
            <div className="text-right text-xs text-gray-600 space-y-1 shrink-0 ml-8">
              {contactItems.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          )}
        </div>
      </header>
        ),
      })}

      {/* Duo-top: summary + skills side by side */}
      {(data.summary || data.skills.length > 0) && (
        <div className="flex gap-8 mb-8">
          {orderSections(data, {
            personal: data.summary && (
            <section className={`flex-1 ${data.skills.length > 0 ? 'w-[58%]' : 'w-full'}`}>
              <SectionHeader title="Profile" />
              <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
            </section>
            ),
            skills: data.skills.length > 0 && (
            <section className={data.summary ? 'w-[42%]' : 'w-full'}>
              <SectionHeader title="Skills" />
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs font-semibold px-2.5 py-1 rounded text-white"
                    style={{ backgroundColor: 'var(--theme-color)' }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
            ),
          })}
        </div>
      )}

      {orderSections(data, {
        experience: data.experience.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">{exp.company}</p>
                {exp.description && (
                  <ul className="list-disc list-outside ml-4 space-y-1">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed text-gray-700">{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                </div>
                <p className="text-xs font-bold" style={{ color: 'var(--theme-color)' }}>
                  {edu.graduationYear}
                </p>
              </div>
            ))}
          </div>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm font-bold">{cert.name} <span className="font-normal text-gray-600">— {cert.issuer}</span></p>
                <p className="text-xs font-semibold text-gray-500">{cert.date}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                <p className="text-xs text-gray-500">{ref.contact}</p>
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
          <SectionHeader title={section.title} />
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  {item.date && <span className="text-xs font-semibold text-gray-500">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                {item.description && <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
        ))
      )}

    </div>
  );
}
