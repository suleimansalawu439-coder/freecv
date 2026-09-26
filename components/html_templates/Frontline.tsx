import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2
      className="text-base font-black uppercase tracking-wider text-white px-4 py-2 mb-4 mt-8 first:mt-0"
      style={{ backgroundColor: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );
}

export default function Frontline({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-900 mx-auto">
      {/* Bold direct header */}
      {orderSections(data, {
        personal: (
      <header className="px-12 pt-12 pb-8" style={{ backgroundColor: 'var(--theme-color)' }}>
        <h1 className="text-5xl font-black tracking-tight text-white uppercase">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-xl font-bold text-white/90 mt-2">{info.jobTitle}</p>
        )}
        {contactItems.length > 0 && (
          <p className="text-sm font-semibold text-white/80 mt-3">{contactItems.join('   |   ')}</p>
        )}
      </header>
        ),
      })}

      <div className="px-12 py-8">
        {orderSections(data, {
          personal: data.summary && (
          <section>
            <SectionHeader title="Mission Statement" />
            <p className="text-[15px] font-medium leading-relaxed text-slate-800 border-l-4 pl-4"
              style={{ borderColor: 'var(--theme-color)' }}>
              {data.summary}
            </p>
          </section>
          ),

          experience: data.experience.length > 0 && (
          <section>
            <SectionHeader title="Service Record" />
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-2 border-slate-200">
                  <div className="flex justify-between items-center px-4 py-2 bg-slate-900">
                    <h3 className="text-sm font-black text-white uppercase">{exp.role}</h3>
                    <span className="text-xs font-bold text-white">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-sm font-black mb-2" style={{ color: 'var(--theme-color)' }}>
                      {exp.company}
                    </p>
                    <ul className="space-y-1.5">
                      {exp.description
                        .split(/\n|\r?\n/)
                        .filter((l) => l.trim())
                        .map((line, i) => (
                          <li key={i} className="text-sm text-slate-700 leading-relaxed flex gap-2">
                            <span className="font-black">✓</span>
                            <span>{line}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
          ),

          skills: data.skills.length > 0 && (
          <section>
            <SectionHeader title="Key Strengths" />
            <div className="grid grid-cols-2 gap-2">
              {data.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 font-bold text-sm"
                >
                  <span style={{ color: 'var(--theme-color)' }}>■</span>
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
          ),

          education: data.education.length > 0 && (
          <section>
            <SectionHeader title="Training & Education" />
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <p className="text-sm font-black">{edu.degree}</p>
                    <p className="text-sm text-slate-600 font-medium">{edu.school}</p>
                  </div>
                  <span className="text-sm font-black">{edu.graduationYear}</span>
                </div>
              ))}
            </div>
          </section>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
          <section>
            <SectionHeader title="Certifications" />
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <p className="text-sm">
                    <span className="font-black">{cert.name}</span>
                    {cert.issuer && <span className="font-medium text-slate-600"> · {cert.issuer}</span>}
                  </p>
                  <span className="text-sm font-black">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionHeader title="Operations & Projects" />
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

          references: data.showReferences && data.references.length > 0 && (
          <section>
            <SectionHeader title="References" />
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref) => (
                <div key={ref.id}>
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
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
          <section key={section.id}>
            <SectionHeader title={section.title} />
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-black">{item.title}</p>
                    {item.date && <span className="text-sm font-black">{item.date}</span>}
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
    </div>
  );
}
