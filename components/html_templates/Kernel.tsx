import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      <span className="font-mono text-sm font-bold" style={{ color: 'var(--theme-color)' }}>
        $
      </span>
      <h2 className="font-mono text-sm font-bold text-gray-900">{title}</h2>
    </div>
  );
}

function bullets(description: string): string[] {
  return (description || '').split(/\n|\r?\n/).filter((l) => l.trim());
}

function dateRange(start: string, end: string): string {
  return [start, end].filter(Boolean).join(' – ');
}

export default function Kernel({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto p-[0.85in] font-sans text-gray-900">
      {/* Header — dark slate terminal bar */}
      {orderSections(data, {
        personal: (
      <header
        className="rounded-lg px-8 py-7 mb-8"
        style={{ backgroundColor: '#1f2937' }}
      >
        <div className="font-mono text-3xl font-bold">
          <span style={{ color: 'var(--theme-color)' }}>&gt; </span>
          <span className="text-white">{info.fullName}</span>
        </div>
        {info.jobTitle && (
          <p className="font-mono text-sm text-gray-300 mt-2">{info.jobTitle}</p>
        )}
        {contactItems.length > 0 && (
          <p className="font-mono text-xs text-gray-400 mt-1.5">
            {contactItems.join('  ·  ')}
          </p>
        )}
      </header>
        ),
      })}

      {orderSections(data, {
        personal: data.summary && (
        <section className="mb-7">
          <SectionHeader title="profile" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
        ),

        experience: data.experience.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="experience" />
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-sm font-bold text-gray-900 font-sans">{exp.role}</h3>
                  {dateRange(exp.startDate, exp.endDate) && (
                    <span className="font-mono text-xs text-gray-500 whitespace-nowrap ml-4">
                      {'// '}
                      {dateRange(exp.startDate, exp.endDate)}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <p className="text-sm text-gray-700 font-sans mb-1.5">{exp.company}</p>
                )}
                {exp.description && (
                  <ul className="space-y-1">
                    {bullets(exp.description).map((line, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm leading-relaxed text-gray-700 font-sans"
                      >
                        <span className="text-gray-400 shrink-0">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="font-mono text-xs bg-gray-100 border border-gray-200 rounded px-2.5 py-1 text-gray-800"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold text-gray-900 font-sans">{edu.degree}</p>
                  {edu.graduationYear && (
                    <span className="font-mono text-xs text-gray-500 whitespace-nowrap ml-4">
                      {'// '}
                      {edu.graduationYear}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <p className="text-sm text-gray-700 font-sans">{edu.school}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900 font-sans">{proj.name}</h3>
                  {proj.link && (
                    <span className="font-mono text-xs text-gray-500 whitespace-nowrap ml-4">
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-sm leading-relaxed text-gray-700 font-sans">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="certifications" />
          <div className="space-y-2.5">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold text-gray-900 font-sans">{cert.name}</p>
                  {cert.issuer && (
                    <p className="text-sm text-gray-700 font-sans">{cert.issuer}</p>
                  )}
                </div>
                {cert.date && (
                  <span className="font-mono text-xs text-gray-500 whitespace-nowrap ml-4">
                    {'// '}
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="references" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold text-gray-900 font-sans">{ref.name}</p>
                <p className="text-xs text-gray-700 font-sans">
                  {ref.title}
                  {ref.company ? ` @ ${ref.company}` : ''}
                </p>
                {ref.contact && (
                  <p className="font-mono text-xs text-gray-500 mt-0.5">{ref.contact}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),
      },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
            <section key={section.id} className="mb-7">
              <SectionHeader title={section.title.toLowerCase()} />
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-bold text-gray-900 font-sans">{item.title}</p>
                      {item.date && (
                        <span className="font-mono text-xs text-gray-500 whitespace-nowrap ml-4">
                          {'// '}
                          {item.date}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <p className="text-sm italic text-gray-700 font-sans">{item.subtitle}</p>
                    )}
                    {item.description && (
                      <p className="text-sm leading-relaxed text-gray-700 font-sans mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))
      )}
    </div>
  );
}
