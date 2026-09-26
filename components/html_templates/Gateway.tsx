import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-[0.18em] mb-3 flex items-center gap-2">
      <span className="w-4 h-[3px] bg-gray-900 inline-block" />
      {title}
    </h2>
  );
}

export default function Gateway({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-[0.85in] py-[0.75in]">
      {/* Header */}
      {orderSections(data, {
        personal: (
      <header className="mb-6">
        <h1 className="text-[28px] font-bold mb-1">{info.fullName}</h1>
        {info.jobTitle && <p className="text-[15px] font-medium text-gray-700 mb-2">{info.jobTitle}</p>}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-600">{contactItems.join('  ·  ')}</p>
        )}
      </header>
        ),
      })}

      {orderSections(data, {
        personal: data.summary && (
        <section className="mb-6 border-2 border-gray-900 p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
        ),

        experience: data.experience.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[15px] font-bold">{exp.role}</h3>
                  <span className="text-xs text-gray-600">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-sm italic text-gray-700 mb-1">{exp.company}</p>
                {exp.description && (
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed">{line.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Education" />
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm text-gray-700">{edu.school}</p>
                </div>
                <p className="text-xs text-gray-600">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Skills" />
          <p className="text-sm leading-relaxed">{data.skills.map((s) => s.name).join(' · ')}</p>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Projects" />
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <p className="text-sm font-bold">{proj.name}{proj.link ? <span className="font-normal text-gray-600"> ({proj.link})</span> : ''}</p>
                <p className="text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Certifications" />
          <div className="space-y-1">
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-sm">
                <span className="font-bold">{cert.name}</span> — {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
              </p>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-3">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs text-gray-600">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
        ),
      },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
          <section key={section.id} className="mb-6">
            <SectionHeader title={section.title} />
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    {item.date && <span className="text-xs text-gray-600">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm italic text-gray-700">{item.subtitle}</p>}
                  {item.description && <p className="text-sm leading-relaxed">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
          ))
      )}
    </div>
  );
}
