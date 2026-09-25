import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function StackHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-black uppercase tracking-[0.22em] mb-4" style={{ color: 'var(--theme-color)' }}>
      {title}
    </h2>
  );
}

const cardCls = "bg-white rounded-xl border border-gray-200 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]";

export default function Stack({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-gray-50 font-sans text-gray-900 mx-auto px-12 py-10">
      {/* Header card */}
      <header className={`${cardCls} mb-6`} style={{ borderTopWidth: 4, borderTopColor: 'var(--theme-color)' }}>
        <h1 className="text-4xl font-black tracking-tight mb-1">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base font-bold mb-3" style={{ color: 'var(--theme-color)' }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-600">{contactItems.join('  •  ')}</p>
        )}
      </header>

      {data.summary && (
        <section className={`${cardCls} mb-6`}>
          <StackHeader title="Profile" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6">
          <div className="px-1 mb-3">
            <StackHeader title="Experience" />
          </div>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className={cardCls}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <span
                    className="text-[11px] font-bold text-white px-2.5 py-1 rounded-full whitespace-nowrap ml-4"
                    style={{ backgroundColor: 'var(--theme-color)' }}
                  >
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
      )}

      {data.skills.length > 0 && (
        <section className={`${cardCls} mb-6`}>
          <StackHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                style={{ backgroundColor: 'var(--theme-color)' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className={`${cardCls} mb-6`}>
          <StackHeader title="Education" />
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline pb-4 border-b border-gray-100 last:border-0 last:pb-0">
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
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-6">
          <div className="px-1 mb-3">
            <StackHeader title="Projects" />
          </div>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className={cardCls}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className={`${cardCls} mb-6`}>
          <StackHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm font-bold">{cert.name} <span className="font-normal text-gray-600">— {cert.issuer}</span></p>
                <p className="text-xs font-semibold text-gray-500">{cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className={`${cardCls} mb-6`}>
          <StackHeader title="References" />
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
      )}

      {data.customSections.map((section) => (
        <section key={section.id} className="mb-6">
          <div className="px-1 mb-3">
            <StackHeader title={section.title} />
          </div>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.id} className={cardCls}>
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
      ))}
    </div>
  );
}
