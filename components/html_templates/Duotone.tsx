import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DARK = '#1e293b';

function SectionHeader({ title, dark }: { title: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-8 first:mt-0">
      <h2
        className="text-sm font-black uppercase tracking-widest px-3 py-1.5 text-white"
        style={{ backgroundColor: dark ? DARK : 'var(--theme-color)' }}
      >
        {title}
      </h2>
      <div className="flex-1 h-0.5" style={{ backgroundColor: dark ? DARK : 'var(--theme-color)' }} />
    </div>
  );
}

export default function Duotone({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-900 mx-auto px-14 py-12">
      {/* Duotone header: dark + theme */}
      {orderSections(data, {
        personal: (
          <>
            <header className="mb-2">
        <div className="flex items-stretch">
          <div className="px-8 py-8 flex-1" style={{ backgroundColor: DARK }}>
            <h1 className="text-4xl font-black tracking-tight text-white">{info.fullName}</h1>
            {info.jobTitle && (
              <p className="text-base font-bold mt-2" style={{ color: 'var(--theme-color)', filter: 'brightness(1.6)' }}>
                {info.jobTitle}
              </p>
            )}
          </div>
          <div
            className="w-40 px-5 py-8 text-white text-xs leading-relaxed font-medium"
            style={{ backgroundColor: 'var(--theme-color)' }}
          >
            {info.email && <p className="mb-1.5 break-all">{info.email}</p>}
            {info.phone && <p className="mb-1.5">{info.phone}</p>}
            {info.location && <p className="mb-1.5">{info.location}</p>}
            {info.website && <p className="break-all">{info.website}</p>}
          </div>
        </div>
        {contactItems.length === 0 && null}
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section>
          <SectionHeader title="Experience" dark />
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div
                key={exp.id}
                className="pl-4 border-l-4"
                style={{
                  borderColor: i % 2 === 0 ? 'var(--theme-color)' : DARK,
                }}
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-black">{exp.role}</h3>
                  <span
                    className="text-xs font-black px-2 py-1 text-white"
                    style={{ backgroundColor: i % 2 === 0 ? 'var(--theme-color)' : DARK }}
                  >
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-600 mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, j) => (
                      <li key={j} className="text-sm text-slate-700 leading-relaxed flex gap-2">
                        <span className="font-black" style={{ color: i % 2 === 0 ? 'var(--theme-color)' : DARK }}>
                          ▸
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ),

        skills: data.skills.length > 0 && (
        <section>
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={skill.id}
                className="text-xs font-bold px-3 py-1.5 text-white"
                style={{ backgroundColor: i % 2 === 0 ? 'var(--theme-color)' : DARK }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      ),

        education: data.education.length > 0 && (
        <section>
          <SectionHeader title="Education" dark />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-black">{edu.degree}</p>
                  <p className="text-sm text-slate-600 font-medium">{edu.school}</p>
                </div>
                <span className="text-xs font-black text-white px-2 py-1" style={{ backgroundColor: DARK }}>
                  {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </section>
      ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
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
      ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications" dark />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm">
                  <span className="font-black">{cert.name}</span>
                  {cert.issuer && <span className="font-medium text-slate-600"> · {cert.issuer}</span>}
                </p>
                <span className="text-xs font-black">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      ),

        references: data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id} className="border-l-4 pl-3" style={{ borderColor: DARK }}>
                <p className="text-sm font-black">{ref.name}</p>
                <p className="text-xs font-medium text-slate-600">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-xs text-slate-500 mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      ),
      },
        (data.customSections || []).map((section, si) => (
          <section key={section.id}>
            <SectionHeader title={section.title} dark={si % 2 === 1} />
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-black">{item.title}</p>
                    {item.date && <span className="text-xs font-black">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm italic text-slate-600">{item.subtitle}</p>}
                  {item.description && <p className="text-sm text-slate-700 mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
