import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4">
      {title}
    </h2>
  );
}

export default function Tenure({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-[0.85in] py-[0.75in]">
      <header className="mb-6">
        <h1 className="text-[26px] font-bold mb-1">{info.fullName}</h1>
        {info.jobTitle && <p className="text-sm font-semibold text-gray-700 mb-2">{info.jobTitle}</p>}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-600">{contactItems.join('  ·  ')}</p>
        )}
      </header>

      {data.summary && (
        <section className="mb-6">
          <SectionHeader title="Summary" />
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Experience" />
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id} className="flex gap-6">
                <div className="w-[1.35in] shrink-0">
                  <p className="text-[13px] font-bold leading-snug">{exp.startDate}</p>
                  <p className="text-[13px] font-bold leading-snug text-gray-500">{exp.endDate}</p>
                </div>
                <div className="flex-1 border-l-2 border-gray-200 pl-5">
                  <h3 className="text-[15px] font-bold">{exp.role}</h3>
                  <p className="text-sm font-medium text-gray-700 mb-1">{exp.company}</p>
                  {exp.description && (
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                        <li key={i} className="text-sm leading-relaxed">{line.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex gap-6">
                <div className="w-[1.35in] shrink-0">
                  <p className="text-[13px] font-bold">{edu.graduationYear}</p>
                </div>
                <div className="flex-1 border-l-2 border-gray-200 pl-5">
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm text-gray-700">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Skills" />
          <p className="text-sm leading-relaxed">{data.skills.map((s) => s.name).join(', ')}</p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="flex gap-6">
                <div className="w-[1.35in] shrink-0">
                  {proj.link && <p className="text-xs text-gray-600 break-words">{proj.link}</p>}
                </div>
                <div className="flex-1 border-l-2 border-gray-200 pl-5">
                  <p className="text-sm font-bold mb-1">{proj.name}</p>
                  <p className="text-sm leading-relaxed">{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Certifications" />
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex gap-6">
                <div className="w-[1.35in] shrink-0">
                  <p className="text-[13px] font-bold">{cert.date}</p>
                </div>
                <div className="flex-1 border-l-2 border-gray-200 pl-5">
                  <p className="text-sm"><span className="font-bold">{cert.name}</span> — {cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs text-gray-600">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items.length > 0 ? (
          <section key={section.id} className="mb-6">
            <SectionHeader title={section.title} />
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="w-[1.35in] shrink-0">
                    {item.date && <p className="text-[13px] font-bold">{item.date}</p>}
                  </div>
                  <div className="flex-1 border-l-2 border-gray-200 pl-5">
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    {item.subtitle && <p className="text-sm text-gray-700">{item.subtitle}</p>}
                    {item.description && <p className="text-sm leading-relaxed">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
