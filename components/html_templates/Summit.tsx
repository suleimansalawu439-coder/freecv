import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2
      className="text-xs font-black uppercase tracking-[0.2em] mb-4 pl-3 border-l-4"
      style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );
}

export default function Summit({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto">
      {/* Dark header band */}
      <header className="bg-[#1f2937] text-white px-12 py-12">
        <div className="w-16 h-1.5 mb-6" style={{ backgroundColor: 'var(--theme-color)' }} />
        <h1 className="text-5xl font-black tracking-tight leading-none mb-3">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-lg font-medium mb-4" style={{ color: 'var(--theme-color)' }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-300">
            {contactItems.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        )}
      </header>

      {/* Body */}
      <main className="px-12 py-10 space-y-9">
        {data.summary && (
          <section>
            <SectionHeader title="Summary" />
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <SectionHeader title="Experience" />
            <div className="space-y-7">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 text-base">{exp.role}</h3>
                    <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold mb-2" style={{ color: 'var(--theme-color)' }}>
                    {exp.company}
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
                    {exp.description.split(/\n|\r\n/).filter(l => l.trim()).map((line, i) => (
                      <li key={i}>{line}</li>
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
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                    <span className="text-xs font-semibold text-gray-500">{edu.graduationYear}</span>
                  </div>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <SectionHeader title="Skills" />
            <div className="flex flex-wrap gap-2">
              {data.skills.map(skill => (
                <span
                  key={skill.id}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-800"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionHeader title="Projects" />
            <div className="space-y-4">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                    {proj.link && <span className="text-xs font-semibold text-gray-500">{proj.link}</span>}
                  </div>
                  {proj.description && <p className="text-sm text-gray-600 mt-1">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <section>
            <SectionHeader title="Certifications" />
            <div className="space-y-3">
              {data.certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                    {cert.issuer && <div className="text-sm text-gray-600">{cert.issuer}</div>}
                  </div>
                  {cert.date && <span className="text-xs font-semibold text-gray-500">{cert.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
          section.items.length > 0 && (
            <section key={section.id}>
              <SectionHeader title={section.title} />
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                      {item.date && <span className="text-xs font-semibold text-gray-500">{item.date}</span>}
                    </div>
                    {item.subtitle && <div className="text-sm text-gray-600 italic">{item.subtitle}</div>}
                    {item.description && <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        ))}

        {data.showReferences && data.references && data.references.length > 0 && (
          <section>
            <SectionHeader title="References" />
            <div className="grid grid-cols-2 gap-6">
              {data.references.map(ref => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <h3 className="font-bold text-gray-900">{ref.name}</h3>
                  <div className="text-sm text-gray-600">{ref.title} @ {ref.company}</div>
                  {ref.contact && <div className="text-sm text-gray-500">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
