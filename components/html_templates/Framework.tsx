import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white break-inside-avoid">
      <h2
        className="text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b"
        style={{ color: 'var(--theme-color)', borderColor: 'var(--theme-color)' }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function Framework({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  const skillGroups: { label: string; items: typeof data.skills }[] = [];
  const groupSize = 4;
  for (let i = 0; i < data.skills.length; i += groupSize) {
    skillGroups.push({
      label: `Group ${String.fromCharCode(65 + i / groupSize)}`,
      items: data.skills.slice(i, i + groupSize),
    });
  }

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto">
      {/* Full-width header */}
      {orderSections(data, {
        personal: (
      <header className="bg-white border-b border-gray-200 px-[0.9in] py-10 mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-1">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base font-medium mb-3" style={{ color: 'var(--theme-color)' }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500">{contactItems.join('  ·  ')}</p>
        )}
      </header>
        ),
      })}

      <div className="px-[0.9in] pb-[0.8in] grid grid-cols-2 gap-6 items-start">
        {orderSections(data, {
          personal: data.summary && (
          <Card title="Profile">
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </Card>
          ),

          skills: data.skills.length > 0 && (
          <Card title="Skills">
            <div className="space-y-4">
              {skillGroups.map((group, gi) => (
                <div key={gi}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill.id}
                        className="text-xs font-medium bg-gray-100 text-gray-800 px-2.5 py-1.5 rounded-md"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          ),

          experience: data.experience.length > 0 && (
          <div className="col-span-2 grid grid-cols-2 gap-6 items-start">
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="border border-gray-200 rounded-lg p-6 bg-white break-inside-avoid"
              >
                <div className="mb-2">
                  <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                  <p className="text-sm font-medium" style={{ color: 'var(--theme-color)' }}>
                    {exp.company}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {exp.startDate} — {exp.endDate}
                  </p>
                </div>
                {exp.description && (
                  <ul className="space-y-1 pl-4 list-disc marker:text-gray-300">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <li key={i} className="text-[13px] leading-relaxed text-gray-700">
                          {line}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          ),

          education: data.education.length > 0 && (
          <Card title="Education">
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </Card>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
          <Card title="Projects">
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                  {proj.link && <p className="text-xs text-gray-500 mb-1">{proj.link}</p>}
                  <p className="text-[13px] text-gray-700 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </Card>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
          <Card title="Certifications">
            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                  <p className="text-xs text-gray-500">
                    {cert.issuer}
                    {cert.date && ` · ${cert.date}`}
                  </p>
                </div>
              ))}
            </div>
          </Card>
          ),

          references: data.showReferences && data.references.length > 0 && (
          <Card title="References">
            <div className="space-y-3">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                  <p className="text-xs text-gray-500">
                    {ref.title}
                    {ref.company && `, ${ref.company}`}
                  </p>
                </div>
              ))}
            </div>
          </Card>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
          <Card key={section.id} title={section.title}>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  {item.subtitle && <p className="text-sm text-gray-600">{item.subtitle}</p>}
                  {item.date && <p className="text-xs text-gray-500">{item.date}</p>}
                  {item.description && (
                    <p className="text-[13px] text-gray-700 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
            ))
        )}
      </div>
    </div>
  );
}
