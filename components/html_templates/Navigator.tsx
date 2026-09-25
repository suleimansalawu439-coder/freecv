import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-9 first:mt-0">
      <div className="w-3 h-3 rotate-45 shrink-0" style={{ backgroundColor: 'var(--theme-color)' }} />
      <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">{title}</h2>
      <div className="flex-1 border-t-2 border-dashed border-slate-300" />
    </div>
  );
}

export default function Navigator({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-900 mx-auto px-14 py-12">
      {/* Route header */}
      <header className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-4 h-4 rounded-full border-4 shrink-0"
            style={{ borderColor: 'var(--theme-color)' }}
          />
          <div className="flex-1 border-t-2 border-dashed border-slate-300" />
          <div
            className="w-4 h-4 rotate-45 shrink-0"
            style={{ backgroundColor: 'var(--theme-color)' }}
          />
        </div>
        <h1 className="text-4xl font-black tracking-tight">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base font-bold mt-1" style={{ color: 'var(--theme-color)' }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-slate-600 mt-3">{contactItems.join('  →  ')}</p>
        )}
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="Route Overview" />
          <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionHeader title="Career Route" />
          <div className="relative pl-8">
            <div
              className="absolute left-[7px] top-2 bottom-2 w-0.5"
              style={{ backgroundColor: 'var(--theme-color)' }}
            />
            <div className="space-y-7">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} className="relative">
                  <div
                    className="absolute -left-8 top-1 w-4 h-4 rounded-full border-[3px] bg-white"
                    style={{ borderColor: 'var(--theme-color)' }}
                  />
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-black">
                      <span className="font-mono text-xs mr-2" style={{ color: 'var(--theme-color)' }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {exp.role}
                    </h3>
                    <span className="text-xs font-bold text-slate-500 whitespace-nowrap ml-3">
                      {exp.startDate} → {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-600 mb-2">{exp.company}</p>
                  <ul className="space-y-1">
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
              ))}
            </div>
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionHeader title="Capabilities" />
          <p className="text-sm leading-loose text-slate-800">
            {data.skills.map((s, i) => (
              <React.Fragment key={s.id}>
                <span className="font-semibold">{s.name}</span>
                {i < data.skills.length - 1 && <span className="text-slate-400">  →  </span>}
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
              <div key={edu.id} className="flex gap-4 items-baseline">
                <div
                  className="w-2.5 h-2.5 rotate-45 shrink-0 mt-1"
                  style={{ backgroundColor: 'var(--theme-color)' }}
                />
                <div className="flex-1 flex justify-between items-baseline">
                  <div>
                    <p className="text-sm font-bold">{edu.degree}</p>
                    <p className="text-sm text-slate-600">{edu.school}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{edu.graduationYear}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Expeditions" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
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
          <SectionHeader title="Checkpoints" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-600"> · {cert.issuer}</span>}
                </p>
                <span className="text-xs font-bold text-slate-500">{cert.date}</span>
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
                  <p className="text-sm font-bold">{item.title}</p>
                  {item.date && <span className="text-xs font-bold text-slate-500">{item.date}</span>}
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
                <p className="text-sm font-bold">{ref.name}</p>
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
