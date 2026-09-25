import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 mt-8 first:mt-0">
      <h2 className="text-sm font-bold uppercase tracking-widest text-teal-800">{title}</h2>
      <div className="mt-2 h-px bg-teal-100" />
    </div>
  );
}

export default function Practitioner({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-800 mx-auto px-14 py-12">
      {/* Calm centered header */}
      <header className="text-center mb-4">
        <div
          className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold"
          style={{ backgroundColor: 'var(--theme-color)' }}
        >
          {info.fullName?.charAt(0)}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base font-medium mt-1" style={{ color: 'var(--theme-color)' }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-slate-500 mt-3">{contactItems.join('   ·   ')}</p>
        )}
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="About Me" />
          <p
            className="text-sm leading-relaxed bg-teal-50/60 rounded-xl px-5 py-4"
          >
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionHeader title="Clinical Experience" />
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-slate-50/70 rounded-xl px-5 py-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--theme-color)' }}>
                  {exp.company}
                </p>
                <ul className="space-y-1">
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li key={i} className="text-sm text-slate-600 leading-relaxed flex gap-2">
                        <span style={{ color: 'var(--theme-color)' }}>•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionHeader title="Clinical Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-semibold px-4 py-2 rounded-full text-white"
                style={{ backgroundColor: 'var(--theme-color)' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-sm text-slate-600">{edu.school}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Licenses & Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm">
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-600"> · {cert.issuer}</span>}
                </p>
                <span className="text-xs font-semibold text-slate-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Projects & Initiatives" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-slate-500">({proj.link})</span>}
                </div>
                <p className="text-sm text-slate-600 mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) => (
        <section key={section.id}>
          <SectionHeader title={section.title} />
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  {item.date && <span className="text-xs font-semibold text-slate-500">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-sm italic text-slate-600">{item.subtitle}</p>}
                {item.description && <p className="text-sm text-slate-600 mt-1">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}

      {data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id} className="bg-slate-50/70 rounded-xl px-4 py-3">
                <p className="text-sm font-bold text-slate-900">{ref.name}</p>
                <p className="text-xs text-slate-600">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-xs text-slate-500 mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
