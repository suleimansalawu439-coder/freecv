import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-[13px] font-bold uppercase tracking-[0.22em] border-b-[1.5px] border-gray-900 pb-1 mb-3">
      {title}
    </h2>
  );
}

export default function Standard({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-[0.9in] py-[0.7in]">
      {/* Canonical centered header */}
      <header className="text-center mb-5 pb-4 border-b-2 border-gray-900">
        <h1 className="text-[26px] font-bold mb-1">{info.fullName}</h1>
        {info.jobTitle && <p className="text-sm font-semibold mb-2">{info.jobTitle}</p>}
        {contactItems.length > 0 && (
          <p className="text-xs">{contactItems.join('  |  ')}</p>
        )}
      </header>

      {data.summary && (
        <section className="mb-5">
          <SectionHeader title="Summary" />
          <p className="text-[13.5px] leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-5">
          <SectionHeader title="Work Experience" />
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[14px] font-bold">{exp.role}</h3>
                  <span className="text-xs whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[13px] italic mb-1">{exp.company}</p>
                {exp.description && (
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-[13.5px] leading-relaxed">{line.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-5">
          <SectionHeader title="Education" />
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <p className="text-[13.5px]"><span className="font-bold">{edu.degree}</span>, {edu.school}</p>
                <p className="text-xs whitespace-nowrap">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-5">
          <SectionHeader title="Skills" />
          <p className="text-[13.5px] leading-relaxed">{data.skills.map((s) => s.name).join(', ')}</p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-5">
          <SectionHeader title="Projects" />
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <p className="text-[13.5px] font-bold">{proj.name}{proj.link ? <span className="font-normal"> — {proj.link}</span> : ''}</p>
                <p className="text-[13.5px] leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-5">
          <SectionHeader title="Certifications" />
          <ul className="list-disc pl-5 space-y-1">
            {data.certifications.map((cert) => (
              <li key={cert.id} className="text-[13.5px]">
                <span className="font-bold">{cert.name}</span>, {cert.issuer}{cert.date ? ` — ${cert.date}` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-5">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-3">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-[13.5px] font-bold">{ref.name}</p>
                <p className="text-xs">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items.length > 0 ? (
          <section key={section.id} className="mb-5">
            <SectionHeader title={section.title} />
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[13.5px] font-bold">{item.title}</h3>
                    {item.date && <span className="text-xs whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-[13px] italic">{item.subtitle}</p>}
                  {item.description && <p className="text-[13.5px] leading-relaxed">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
