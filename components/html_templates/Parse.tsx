import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Parse({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-black mx-auto px-[0.85in] py-[0.75in]">
      {/* Header — plain, left aligned */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{info.fullName}</h1>
        {info.jobTitle && <p className="text-sm mb-2">{info.jobTitle}</p>}
        <div className="text-xs space-y-0.5">
          {info.email && <p>{info.email}</p>}
          {info.phone && <p>{info.phone}</p>}
          {info.location && <p>{info.location}</p>}
          {info.website && <p>{info.website}</p>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-2">Summary</h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-2">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <p className="text-sm"><span className="font-bold">{exp.role}</span>{exp.company ? `, ${exp.company}` : ''}</p>
                <p className="text-xs text-gray-600 mb-1">{exp.startDate} - {exp.endDate}</p>
                {exp.description && (
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed">{line.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-2">Education</h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-sm"><span className="font-bold">{edu.degree}</span>{edu.school ? `, ${edu.school}` : ''}</p>
                {edu.graduationYear && <p className="text-xs text-gray-600">{edu.graduationYear}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-2">Skills</h2>
          <p className="text-sm leading-relaxed">{data.skills.map((s) => s.name).join(', ')}</p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-2">Projects</h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <p className="text-sm font-bold">{proj.name}{proj.link ? ` (${proj.link})` : ''}</p>
                <p className="text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-2">Certifications</h2>
          <div className="space-y-1">
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-sm">
                <span className="font-bold">{cert.name}</span>
                {cert.issuer ? `, ${cert.issuer}` : ''}{cert.date ? ` (${cert.date})` : ''}
              </p>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-2">References</h2>
          <div className="space-y-2">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs">{ref.title}{ref.company ? `, ${ref.company}` : ''}{ref.contact ? ` — ${ref.contact}` : ''}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items.length > 0 ? (
          <section key={section.id} className="mb-6">
            <h2 className="text-sm font-bold mb-2">{section.title}</h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <p className="text-sm font-bold">{item.title}{item.date ? ` (${item.date})` : ''}</p>
                  {item.subtitle && <p className="text-xs text-gray-600">{item.subtitle}</p>}
                  {item.description && <p className="text-sm leading-relaxed">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
