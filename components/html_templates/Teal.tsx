import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-2.5 h-2.5 rotate-45 shrink-0" style={{ backgroundColor: 'var(--theme-color)' }} />
      <h2 className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: 'var(--theme-color)' }}>
        {title}
      </h2>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

export default function Teal({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-14 py-12">
      {orderSections(data, {
        personal: (
          <>
      {/* Header: modern with geometric accent */}
      <header className="mb-10">
        <div className="flex items-start gap-5">
          <div
            className="w-14 h-14 shrink-0 flex items-center justify-center"
            style={{ backgroundColor: 'var(--theme-color)' }}
          >
            <span className="text-white text-2xl font-black">{info.fullName?.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight">{info.fullName}</h1>
            {info.jobTitle && (
              <p className="text-base font-semibold text-gray-600 mt-1">{info.jobTitle}</p>
            )}
          </div>
        </div>
        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-5 text-xs font-medium text-gray-500">
            {contactItems.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        )}
        <div className="mt-6 h-1 w-full rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-9">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}
          </>
        ),

        // Experience
        experience: data.experience.length > 0 && (
        <section className="mb-9">
          <SectionHeader title="Experience" />
          <div className="space-y-7">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-extrabold">{exp.role}</h3>
                  <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-bold mb-2" style={{ color: 'var(--theme-color)' }}>{exp.company}</p>
                {exp.description && (
                  <ul className="space-y-1.5">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed text-gray-700 flex gap-2">
                        <span className="font-bold" style={{ color: 'var(--theme-color)' }}>—</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        // Skills
        skills: data.skills.length > 0 && (
        <section className="mb-9">
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full border-2"
                style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
        ),

        // Education
        education: data.education.length > 0 && (
        <section className="mb-9">
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-extrabold">{edu.degree}</p>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                </div>
                <p className="text-xs font-bold px-2.5 py-1 rounded text-white" style={{ backgroundColor: 'var(--theme-color)' }}>
                  {edu.graduationYear}
                </p>
              </div>
            ))}
          </div>
        </section>
        ),

        // Projects
        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-9">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-sm font-extrabold">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        // Certifications
        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-9">
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

        // References
        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-9">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id} className="border-l-2 pl-3" style={{ borderColor: 'var(--theme-color)' }}>
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                <p className="text-xs text-gray-500">{ref.contact}</p>
              </div>
            ))}
          </div>
        </section>
        ),
        },
        // Custom sections
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
          <section key={section.id} className="mb-9">
            <SectionHeader title={section.title} />
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-extrabold">{item.title}</h3>
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
