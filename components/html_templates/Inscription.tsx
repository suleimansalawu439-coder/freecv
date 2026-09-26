import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const STONE = '#57534a';
const STONE_LIGHT = '#8a857a';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-5">
      <h2 className="text-sm font-bold uppercase tracking-[0.45em] font-serif mb-3" style={{ color: STONE }}>
        {title}
      </h2>
      <div className="flex items-center justify-center gap-2">
        <div className="h-px w-24" style={{ backgroundColor: STONE_LIGHT }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: STONE_LIGHT }} />
        <div className="h-px w-24" style={{ backgroundColor: STONE_LIGHT }} />
      </div>
    </div>
  );
}

export default function Inscription({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif mx-auto px-[1in] py-[0.9in]" style={{ color: STONE }}>
      {/* Header — inscriptional caps */}
      {orderSections(data, {
        personal: (
      <header className="text-center mb-10">
        <p className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: STONE_LIGHT }}>
          Curriculum Vitae
        </p>
        <h1 className="text-[34px] leading-tight font-bold uppercase tracking-[0.22em] mb-4">
          {info.fullName}
        </h1>
        {info.jobTitle && (
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: STONE_LIGHT }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: STONE_LIGHT }}>
            {contactItems.join('   ·   ')}
          </p>
        )}
      </header>
        ),
      })}

      {orderSections(data, {
        personal: data.summary && (
        <section className="mb-8">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-center max-w-[5.5in] mx-auto">{data.summary}</p>
        </section>
        ),

        experience: data.experience.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="text-center">
                <h3 className="text-base font-bold uppercase tracking-[0.18em] mb-1">{exp.role}</h3>
                <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: STONE_LIGHT }}>
                  {exp.company} {exp.startDate || exp.endDate ? `· ${exp.startDate} – ${exp.endDate}` : ''}
                </p>
                {exp.description && (
                  <ul className="space-y-1 max-w-[5.5in] mx-auto text-left">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed flex gap-2 justify-center">
                        <span className="text-[10px] mt-1" style={{ color: STONE_LIGHT }}>◆</span>
                        <span className="flex-1">{line.trim()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Education" />
          <div className="space-y-4 text-center">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-sm font-bold uppercase tracking-[0.18em]">{edu.degree}</p>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: STONE_LIGHT }}>
                  {edu.school}{edu.graduationYear ? ` · ${edu.graduationYear}` : ''}
                </p>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Skills" />
          <p className="text-sm text-center uppercase tracking-[0.22em] leading-loose">
            {data.skills.map((s) => s.name).join('   ·   ')}
          </p>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Projects" />
          <div className="space-y-4 text-center">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] mb-1">{proj.name}</h3>
                <p className="text-sm leading-relaxed max-w-[5.5in] mx-auto">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Certifications" />
          <div className="space-y-2 text-center">
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-sm uppercase tracking-[0.14em]">
                <span className="font-bold">{cert.name}</span>
                <span style={{ color: STONE_LIGHT }}> — {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</span>
              </p>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4 text-center">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold uppercase tracking-[0.14em]">{ref.name}</p>
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: STONE_LIGHT }}>
                  {ref.title}{ref.company ? `, ${ref.company}` : ''}
                </p>
                {ref.contact && <p className="text-xs" style={{ color: STONE_LIGHT }}>{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
        ),
      },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
          <section key={section.id} className="mb-8">
            <SectionHeader title={section.title} />
            <div className="space-y-4 text-center">
              {section.items.map((item) => (
                <div key={item.id}>
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em] mb-1">{item.title}</h3>
                  {item.subtitle && <p className="text-xs uppercase tracking-[0.25em] mb-1" style={{ color: STONE_LIGHT }}>{item.subtitle}</p>}
                  {item.date && <p className="text-xs uppercase tracking-[0.25em] mb-1" style={{ color: STONE_LIGHT }}>{item.date}</p>}
                  {item.description && <p className="text-sm leading-relaxed max-w-[5.5in] mx-auto">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
          ))
      )}
    </div>
  );
}
