import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionPill({ title }: { title: string }) {
  return (
    <span
      className="inline-block text-xs font-bold uppercase tracking-widest text-white rounded-full px-4 py-1.5"
      style={{ backgroundColor: 'var(--theme-color)' }}
    >
      {title}
    </span>
  );
}

export default function Studio({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills } = data;
  const disciplineTags: string[] = [
    ...(personalInfo.jobTitle ? personalInfo.jobTitle.split(/\s+/).filter(Boolean) : []),
    ...skills.slice(0, 4).map((s) => s.name),
  ];
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(
    Boolean
  ) as string[];

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 px-12 py-10">
      {/* Header */}
      {orderSections(data, {
        personal: (
          <header className="mb-9">
            <h1 className="text-5xl font-extrabold tracking-tight leading-none mb-4">{personalInfo.fullName}</h1>
            {disciplineTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {disciplineTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold uppercase tracking-wider text-white rounded-full px-3 py-1"
                    style={{ backgroundColor: 'var(--theme-color)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {contacts.length > 0 && <div className="text-sm text-gray-500 font-medium">{contacts.join('  •  ')}</div>}
          </header>
        ),
      })}


      <main className="space-y-8">
        {orderSections(data, {
          personal: summary && (
          <section>
            <div className="mb-4">
              <SectionPill title="Profile" />
            </div>
            <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
          </section>
          ),

          experience: experience.length > 0 && (
          <section>
            <div className="mb-5">
              <SectionPill title="Experience" />
            </div>
            <div className="space-y-7">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                  <div className="flex justify-between items-baseline mt-0.5 mb-2">
                    <span className="text-sm font-semibold" style={{ color: 'var(--theme-color)' }}>
                      {exp.company}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          ),

          projects: data.showProjects && data.projects && data.projects.length > 0 && (
          <section>
            <div className="mb-5">
              <SectionPill title="Projects" />
            </div>
            <div className="space-y-5">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <span className="text-sm font-medium shrink-0" style={{ color: 'var(--theme-color)' }}>
                        {project.link}
                      </span>
                    )}
                  </div>
                  {project.description && <p className="text-sm text-gray-600 mt-1">{project.description}</p>}
                </div>
              ))}
            </div>
          </section>
          ),

          education: education.length > 0 && (
          <section>
            <div className="mb-5">
              <SectionPill title="Education" />
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                  {edu.graduationYear && <div className="text-xs font-semibold text-gray-500 mt-1">{edu.graduationYear}</div>}
                </div>
              ))}
            </div>
          </section>
          ),

          skills: skills.length > 0 && (
          <section>
            <div className="mb-4">
              <SectionPill title="Skills" />
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-sm font-semibold border rounded-full px-3.5 py-1.5"
                  style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
          ),

          certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section>
            <div className="mb-4">
              <SectionPill title="Certifications" />
            </div>
            <div className="space-y-2.5">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <span className="font-bold text-gray-900">{cert.name}</span>
                  {(cert.issuer || cert.date) && (
                    <span className="text-gray-500">
                      {' — '}
                      {cert.issuer}
                      {cert.issuer && cert.date ? ', ' : ''}
                      {cert.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <section className="break-inside-avoid">
            <div className="mb-4">
              <SectionPill title="References" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref) => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <h3 className="font-bold text-gray-900">{ref.name}</h3>
                  <div className="text-sm text-gray-600">
                    {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </div>
                  {ref.contact && <div className="text-sm text-gray-500 mt-1">{ref.contact}</div>}
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
                  <div className="mb-4">
                    <SectionPill title={section.title} />
                  </div>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline gap-4">
                          <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                          {item.date && <span className="text-xs font-semibold text-gray-500 shrink-0">{item.date}</span>}
                        </div>
                        {item.subtitle && <div className="text-sm italic text-gray-600">{item.subtitle}</div>}
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
            ))
        )}

      </main>
    </div>
  );
}
