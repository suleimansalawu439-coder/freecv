import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="mb-4">
      <span
        className="text-xs font-bold uppercase tracking-widest px-2 py-1"
        style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 18%, white)' }}
      >
        {title}
      </span>
    </h2>
  );
}

export default function Cache({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 px-[0.9in] py-[0.7in] mx-auto">
      {/* Compact header: name left, contact right */}
      <header className="flex justify-between items-start gap-8 mb-7 pb-5 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{info.fullName}</h1>
          {info.jobTitle && (
            <p className="text-sm font-medium text-gray-600 mt-1">{info.jobTitle}</p>
          )}
        </div>
        <div className="text-right text-xs text-gray-600 space-y-1 shrink-0">
          {info.email && <p>{info.email}</p>}
          {info.phone && <p>{info.phone}</p>}
          {info.location && <p>{info.location}</p>}
          {info.website && <p>{info.website}</p>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-6">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-gray-900">
                    {exp.role}
                    <span className="font-medium text-gray-600"> · {exp.company}</span>
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-[13px] leading-relaxed text-gray-700 mt-1">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .join(' · ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-medium text-gray-800 px-2.5 py-1 rounded"
                style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 14%, white)' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Education" />
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <p className="text-sm text-gray-800">
                  <span className="font-bold">{edu.degree}</span>
                  <span className="text-gray-600"> · {edu.school}</span>
                </p>
                <span className="text-xs text-gray-500">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Projects" />
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-sm font-bold text-gray-900">
                  {proj.name}
                  {proj.link && <span className="font-normal text-xs text-gray-500"> · {proj.link}</span>}
                </h3>
                <p className="text-[13px] text-gray-700 leading-relaxed mt-0.5">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm text-gray-800">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-600"> · {cert.issuer}</span>}
                </p>
                <span className="text-xs text-gray-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) => (
        <section key={section.id} className="mb-6">
          <SectionHeader title={section.title} />
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-gray-900">
                    {item.title}
                    {item.subtitle && (
                      <span className="font-medium text-gray-600"> · {item.subtitle}</span>
                    )}
                  </h3>
                  {item.date && <span className="text-xs text-gray-500">{item.date}</span>}
                </div>
                {item.description && (
                  <p className="text-[13px] text-gray-700 leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="References" />
          <div className="space-y-2">
            {data.references.map((ref) => (
              <p key={ref.id} className="text-sm text-gray-800">
                <span className="font-bold">{ref.name}</span>
                <span className="text-gray-600">
                  {' '}
                  · {ref.title}
                  {ref.company && `, ${ref.company}`}
                </span>
              </p>
            ))}
          </div>
        </section>
      )}

      {contactItems.length === 0 && null}
    </div>
  );
}
