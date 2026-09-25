import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const NAVY = '#16294d';
const NAVY_LINE = '#2c4370';
const NAVY_SOFT = '#edf1f8';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 mt-8 first:mt-0">
      <div className="flex items-center gap-3">
        <h2
          className="font-serif text-lg font-bold tracking-wide whitespace-nowrap"
          style={{ color: NAVY }}
        >
          {title}
        </h2>
        <div className="flex-1 h-0.5" style={{ backgroundColor: NAVY }} />
        <div className="w-2 h-2 rotate-45" style={{ backgroundColor: NAVY }} />
      </div>
    </div>
  );
}

export default function Navy({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-slate-800 mx-auto px-14 py-12">
      {/* Classic navy masthead */}
      <header
        className="text-white px-10 py-9 mb-2 rounded"
        style={{ backgroundColor: NAVY }}
      >
        <div className="border-2 border-white/30 px-6 py-5">
          <h1 className="text-4xl font-bold tracking-wide text-center">{info.fullName}</h1>
          {info.jobTitle && (
            <p className="text-base uppercase tracking-[0.3em] text-center mt-2 text-white/80">
              {info.jobTitle}
            </p>
          )}
          {contactItems.length > 0 && (
            <p className="text-xs text-center mt-3 text-white/70">
              {contactItems.join('   ·   ')}
            </p>
          )}
        </div>
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed italic px-5 py-4" style={{ backgroundColor: NAVY_SOFT }}>
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionHeader title="Professional Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold" style={{ color: NAVY }}>
                    {exp.role}
                  </h3>
                  <span className="text-sm font-semibold" style={{ color: NAVY_LINE }}>
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">
                  {exp.company}
                </p>
                <ul className="space-y-1.5">
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed flex gap-2">
                        <span style={{ color: NAVY }}>▸</span>
                        <span>{line}</span>
                      </li>
                    ))}
                </ul>
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
                  <p className="text-sm font-bold" style={{ color: NAVY }}>
                    {edu.degree}
                  </p>
                  <p className="text-sm italic text-slate-600">{edu.school}</p>
                </div>
                <span className="text-sm font-semibold" style={{ color: NAVY_LINE }}>
                  {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionHeader title="Core Competencies" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: NAVY }} />
                <span className="text-sm">{skill.name}</span>
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
                  <h3 className="text-sm font-bold" style={{ color: NAVY }}>
                    {proj.name}
                  </h3>
                  {proj.link && <span className="text-xs text-slate-500">({proj.link})</span>}
                </div>
                <p className="text-sm mt-1">{proj.description}</p>
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
                  <span className="font-bold" style={{ color: NAVY }}>
                    {cert.name}
                  </span>
                  {cert.issuer && <span className="text-slate-600"> · {cert.issuer}</span>}
                </p>
                <span className="text-sm font-semibold" style={{ color: NAVY_LINE }}>
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
                  <p className="text-sm font-bold" style={{ color: NAVY }}>
                    {item.title}
                  </p>
                  {item.date && (
                    <span className="text-sm font-semibold" style={{ color: NAVY_LINE }}>
                      {item.date}
                    </span>
                  )}
                </div>
                {item.subtitle && <p className="text-sm italic text-slate-600">{item.subtitle}</p>}
                {item.description && <p className="text-sm mt-1">{item.description}</p>}
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
              <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: NAVY }}>
                <p className="text-sm font-bold" style={{ color: NAVY }}>
                  {ref.name}
                </p>
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

      <footer className="mt-10 flex items-center gap-3">
        <div className="flex-1 h-0.5" style={{ backgroundColor: NAVY }} />
        <div className="w-2 h-2 rotate-45" style={{ backgroundColor: NAVY }} />
        <div className="flex-1 h-0.5" style={{ backgroundColor: NAVY }} />
      </footer>
    </div>
  );
}
