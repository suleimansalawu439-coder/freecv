import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
      <span className="w-2.5 h-2.5 bg-gray-900 inline-block" />
      {title}
    </h2>
  );
}

function Check({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      <span className="w-[9px] h-[9px] border-[1.5px] border-gray-900 mt-[5px] shrink-0 inline-block" />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function Checkpoint({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-[0.85in] py-[0.75in]">
      <header className="mb-6">
        <h1 className="text-[26px] font-bold mb-1">{info.fullName}</h1>
        {info.jobTitle && <p className="text-sm font-semibold text-gray-700 mb-2">{info.jobTitle}</p>}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-600">{contactItems.join('  ▪  ')}</p>
        )}
      </header>

      {data.summary && (
        <section className="mb-6">
          <SectionHeader title="Summary" />
          <Check><p className="text-sm leading-relaxed">{data.summary}</p></Check>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Experience" />
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <Check key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[15px] font-bold">{exp.role}</h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">{exp.company}</p>
                {exp.description && (
                  <div className="space-y-1.5 mt-1">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-[10px] mt-[3px]">▪</span>
                        <p className="text-sm leading-relaxed flex-1">{line.trim()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Check>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <Check key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm"><span className="font-bold">{edu.degree}</span> — {edu.school}</p>
                  <p className="text-xs text-gray-600">{edu.graduationYear}</p>
                </div>
              </Check>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Skills Checklist" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {data.skills.map((skill) => (
              <Check key={skill.id} className="items-start">
                <p className="text-sm font-medium">{skill.name}</p>
              </Check>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Projects" />
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <Check key={proj.id}>
                <p className="text-sm font-bold">{proj.name}{proj.link ? <span className="font-normal text-gray-600"> — {proj.link}</span> : ''}</p>
                <p className="text-sm leading-relaxed">{proj.description}</p>
              </Check>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <Check key={cert.id}>
                <p className="text-sm"><span className="font-bold">{cert.name}</span> — {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</p>
              </Check>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {data.references.map((ref) => (
              <Check key={ref.id}>
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs text-gray-600">{ref.contact}</p>}
              </Check>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items.length > 0 ? (
          <section key={section.id} className="mb-6">
            <SectionHeader title={section.title} />
            <div className="space-y-3">
              {section.items.map((item) => (
                <Check key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    {item.date && <span className="text-xs text-gray-600">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm text-gray-700">{item.subtitle}</p>}
                  {item.description && <p className="text-sm leading-relaxed">{item.description}</p>}
                </Check>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
