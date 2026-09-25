import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-8 first:mt-0">
      <h2 className="text-base font-bold text-slate-900 whitespace-nowrap">{title}</h2>
      <div className="flex-1 h-0.5 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
    </div>
  );
}

export default function Tutor({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-800 mx-auto px-14 py-12">
      {/* Warm approachable header */}
      <header className="mb-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-lg font-semibold mt-1" style={{ color: 'var(--theme-color)' }}>
            {info.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-sm text-slate-600">
          {info.email && <span>{info.email}</span>}
          {info.phone && <span>{info.phone}</span>}
          {info.location && <span>{info.location}</span>}
          {info.website && <span>{info.website}</span>}
        </div>
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="About Me" />
          <p className="text-[15px] leading-relaxed text-slate-700">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionHeader title="Teaching Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="flex gap-4">
                <div
                  className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: 'var(--theme-color)' }}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[15px] font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-slate-500">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">{exp.company}</p>
                  <ul className="space-y-1.5">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed">
                          {line}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
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
                  <p className="text-[15px] font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-sm text-slate-600">{edu.school}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionHeader title="Skills & Subjects" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-sm font-semibold px-4 py-1.5 rounded-full border-2"
                style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />
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
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[15px] font-bold text-slate-900">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-slate-500">({proj.link})</span>}
                </div>
                <p className="text-sm text-slate-700 mt-1">{proj.description}</p>
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
                  <p className="text-[15px] font-bold text-slate-900">{item.title}</p>
                  {item.date && <span className="text-xs font-semibold text-slate-500">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-sm italic text-slate-600">{item.subtitle}</p>}
                {item.description && <p className="text-sm text-slate-700 mt-1">{item.description}</p>}
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
              <div key={ref.id}>
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
