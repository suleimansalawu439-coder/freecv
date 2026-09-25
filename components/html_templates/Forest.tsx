import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const FOREST = '#1d4a2c';
const FOREST_DEEP = '#122e1c';
const FOREST_SOFT = '#eef5ee';
const FOREST_LINE = '#c9dcc9';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-8 first:mt-0">
      <div className="w-2 h-6" style={{ backgroundColor: FOREST }} />
      <h2
        className="font-serif text-base font-bold uppercase tracking-widest"
        style={{ color: FOREST_DEEP }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: FOREST_LINE }} />
    </div>
  );
}

export default function Forest({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-800 mx-auto">
      {/* Deep green header */}
      <header className="px-14 pt-12 pb-10 text-white" style={{ backgroundColor: FOREST_DEEP }}>
        <p
          className="font-serif text-xs uppercase tracking-[0.35em] mb-3"
          style={{ color: FOREST_LINE }}
        >
          Professional Résumé
        </p>
        <h1 className="font-serif text-5xl font-bold tracking-tight">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="font-serif text-lg italic mt-2" style={{ color: FOREST_LINE }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs mt-4 text-white/80">{contactItems.join('   ·   ')}</p>
        )}
      </header>

      <div className="px-14 py-8">
        {data.summary && (
          <section>
            <SectionHeader title="Profile" />
            <p
              className="text-sm leading-relaxed px-5 py-4 rounded-lg"
              style={{ backgroundColor: FOREST_SOFT }}
            >
              {data.summary}
            </p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <SectionHeader title="Experience" />
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold" style={{ color: FOREST_DEEP }}>
                      {exp.role}
                    </h3>
                    <span className="text-xs font-bold px-2 py-1 text-white" style={{ backgroundColor: FOREST }}>
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p className="font-serif text-sm italic mb-2" style={{ color: FOREST }}>
                    {exp.company}
                  </p>
                  <ul className="space-y-1.5">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <li key={i} className="text-sm text-slate-700 leading-relaxed flex gap-2">
                          <span style={{ color: FOREST }}>◆</span>
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
            <SectionHeader title="Skills" />
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="font-serif text-sm px-4 py-1.5 rounded-full text-white"
                  style={{ backgroundColor: FOREST }}
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
                    <p className="text-sm font-bold" style={{ color: FOREST_DEEP }}>
                      {edu.degree}
                    </p>
                    <p className="font-serif text-sm italic" style={{ color: FOREST }}>
                      {edu.school}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-white px-2 py-1" style={{ backgroundColor: FOREST }}>
                    {edu.graduationYear}
                  </span>
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
                    <h3 className="text-sm font-bold" style={{ color: FOREST_DEEP }}>
                      {proj.name}
                    </h3>
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
            <SectionHeader title="Certifications" />
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <p className="text-sm">
                    <span className="font-bold" style={{ color: FOREST_DEEP }}>
                      {cert.name}
                    </span>
                    {cert.issuer && <span className="text-slate-600"> · {cert.issuer}</span>}
                  </p>
                  <span className="text-xs font-bold" style={{ color: FOREST }}>
                    {cert.date}
                  </span>
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
                    <p className="text-sm font-bold" style={{ color: FOREST_DEEP }}>
                      {item.title}
                    </p>
                    {item.date && (
                      <span className="text-xs font-bold" style={{ color: FOREST }}>
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <p className="font-serif text-sm italic" style={{ color: FOREST }}>
                      {item.subtitle}
                    </p>
                  )}
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
                <div
                  key={ref.id}
                  className="rounded-lg px-4 py-3"
                  style={{ backgroundColor: FOREST_SOFT }}
                >
                  <p className="text-sm font-bold" style={{ color: FOREST_DEEP }}>
                    {ref.name}
                  </p>
                  <p className="text-xs" style={{ color: FOREST }}>
                    {ref.title}
                    {ref.company && `, ${ref.company}`}
                  </p>
                  {ref.contact && <p className="text-xs text-slate-600 mt-1">{ref.contact}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
