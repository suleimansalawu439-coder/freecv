import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: 'var(--theme-color)' }}
      />
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900">{title}</h2>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

export default function Deploy({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 px-[0.9in] py-[0.8in] mx-auto">
      {orderSections(data, {
        personal: (
          <>
            {/* Header — status dot + name */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="relative flex w-3.5 h-3.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex w-3.5 h-3.5 rounded-full bg-green-500" />
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{info.fullName}</h1>
        </div>
        <div className="flex items-center gap-3 ml-[26px]">
          {info.jobTitle && <p className="text-base text-gray-600">{info.jobTitle}</p>}
          <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
            Available for opportunities
          </span>
        </div>
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500 mt-3 ml-[26px]">{contactItems.join('  ·  ')}</p>
        )}
      </header>

      {data.summary && (
        <section className="mb-7">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Experience" />
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="pl-4 border-l-[3px]"
                style={{ borderColor: 'var(--theme-color)' }}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-2">{exp.company}</p>
                {exp.description && (
                  <ul className="space-y-1 pl-4 list-disc marker:text-gray-300">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <li key={i} className="text-sm leading-relaxed text-gray-700">
                          {line}
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
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-medium text-gray-800 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      ),

        education: data.education.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="pl-4 border-l-[3px]"
                style={{ borderColor: 'var(--theme-color)' }}
              >
                <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                <p className="text-sm text-gray-600">
                  {edu.school}
                  {edu.graduationYear && (
                    <span className="text-gray-500"> · {edu.graduationYear}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
      ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div
                key={proj.id}
                className="pl-4 border-l-[3px]"
                style={{ borderColor: 'var(--theme-color)' }}
              >
                <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                {proj.link && <p className="text-xs text-gray-500 mb-1">{proj.link}</p>}
                <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm text-gray-800">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                </p>
                <span className="text-xs text-gray-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-7">
          <SectionHeader title="References" />
          <div className="space-y-3">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                <p className="text-sm text-gray-600">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-xs text-gray-500">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      ),
      },
        (data.customSections || []).map((section) => (
          <section key={section.id} className="mb-7">
            <SectionHeader title={section.title} />
            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="pl-4 border-l-[3px]"
                  style={{ borderColor: 'var(--theme-color)' }}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                    {item.date && <span className="text-xs text-gray-500">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
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
