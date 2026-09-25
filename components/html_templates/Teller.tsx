import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-baseline justify-between border-b-2 border-slate-900 mb-4 mt-8 first:mt-0 pb-1">
      <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">{title}</h2>
    </div>
  );
}

export default function Teller({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-900 mx-auto px-14 py-12">
      {/* Crisp finance header */}
      <header className="flex justify-between items-start pb-6 border-b-4" style={{ borderColor: 'var(--theme-color)' }}>
        <div>
          <h1 className="text-4xl font-black tracking-tight">{info.fullName}</h1>
          {info.jobTitle && (
            <p className="text-base font-bold mt-1" style={{ color: 'var(--theme-color)' }}>
              {info.jobTitle}
            </p>
          )}
        </div>
        <div className="text-right text-xs leading-relaxed text-slate-600 font-medium">
          {info.email && <p>{info.email}</p>}
          {info.phone && <p className="font-bold text-slate-900">{info.phone}</p>}
          {info.location && <p>{info.location}</p>}
          {info.website && <p>{info.website}</p>}
        </div>
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="Professional Summary" />
          <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionHeader title="Professional Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-black">{exp.role}</h3>
                  <span className="text-sm font-black tabular-nums" style={{ color: 'var(--theme-color)' }}>
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-600 mb-2">{exp.company}</p>
                <ul className="space-y-1.5">
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li key={i} className="text-sm text-slate-700 leading-relaxed flex gap-2">
                        <span className="font-black" style={{ color: 'var(--theme-color)' }}>▸</span>
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
          <SectionHeader title="Core Competencies" />
          <p className="text-sm leading-loose text-slate-800">
            {data.skills.map((s, i) => (
              <React.Fragment key={s.id}>
                <span className="font-bold">{s.name}</span>
                {i < data.skills.length - 1 && <span className="text-slate-400 font-normal">  •  </span>}
              </React.Fragment>
            ))}
          </p>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-black">{edu.degree}</p>
                  <p className="text-sm text-slate-600">{edu.school}</p>
                </div>
                <span className="text-sm font-black tabular-nums text-slate-900">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Selected Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-black">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-slate-500">({proj.link})</span>}
                </div>
                <p className="text-sm text-slate-700 mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications & Licenses" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm">
                  <span className="font-black">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-600 font-medium"> · {cert.issuer}</span>}
                </p>
                <span className="text-sm font-black tabular-nums">{cert.date}</span>
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
                  <p className="text-sm font-black">{item.title}</p>
                  {item.date && <span className="text-sm font-black tabular-nums">{item.date}</span>}
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
                <p className="text-sm font-black">{ref.name}</p>
                <p className="text-xs text-slate-600">
                  {ref.title}
                  {ref.company && ` · ${ref.company}`}
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
