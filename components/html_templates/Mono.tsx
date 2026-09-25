import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl font-bold text-black mb-5 tracking-tight">{children}</h2>
  );
}

export default function Mono({ data }: { data: ResumeData }) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none mx-auto lg:mx-0 shrink-0 font-sans text-black px-[0.9in] py-[0.7in] flex flex-col">
      {/* Masthead */}
      <header className="mb-8">
        <h1 className="font-serif text-5xl font-black tracking-tight leading-none mb-3">
          {data.personalInfo.fullName}
        </h1>
        {data.personalInfo.jobTitle && (
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-700 mb-4">
            {data.personalInfo.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-600 font-medium">
            {contactItems.map((item, i) => (
              <span key={i}>
                {item}
                {i < contactItems.length - 1 && <span className="mx-3 text-gray-300">/</span>}
              </span>
            ))}
          </p>
        )}
      </header>

      {data.summary && (
        <section className="border-t-4 border-black pt-6 mb-8">
          <p className="font-serif text-lg leading-relaxed italic text-gray-900">{data.summary}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="border-t-4 border-black pt-6 mb-8">
          <SectionHeading>Expertise</SectionHeading>
          <p className="text-sm leading-loose text-gray-900">
            {data.skills.map((skill, i) => (
              <span key={skill.id}>
                <strong className="font-bold">{skill.name}</strong>
                {i < data.skills.length - 1 && <span className="text-gray-400"> / </span>}
              </span>
            ))}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="border-t-4 border-black pt-6 mb-8">
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-7">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-serif text-lg font-bold">{exp.role}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap ml-6">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-700 mb-3">
                  {exp.company}
                </p>
                <ul className="space-y-1.5 text-sm text-gray-800 leading-relaxed">
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="font-black">—</span>
                        <span>{line}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="border-t-4 border-black pt-6 mb-8">
          <SectionHeading>Education</SectionHeading>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-serif text-base font-bold">{edu.degree}</h3>
                  <p className="text-sm text-gray-700">{edu.school}</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap ml-6">
                  {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="border-t-4 border-black pt-6 mb-8">
          <SectionHeading>Projects</SectionHeading>
          <div className="space-y-5">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-serif text-base font-bold mb-1">
                  {proj.name}
                  {proj.link && (
                    <span className="font-sans text-xs font-normal text-gray-500"> ({proj.link})</span>
                  )}
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="border-t-4 border-black pt-6 mb-8">
          <SectionHeading>Certifications</SectionHeading>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-sm">
                <p>
                  <strong className="font-bold">{cert.name}</strong>
                  {cert.issuer && <span className="text-gray-700">, {cert.issuer}</span>}
                </p>
                {cert.date && (
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap ml-6">
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references && data.references.length > 0 && (
        <section className="border-t-4 border-black pt-6 mb-8">
          <SectionHeading>References</SectionHeading>
          <div className="grid grid-cols-2 gap-6">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <h3 className="font-serif text-base font-bold">{ref.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mt-1">
                  {ref.title}
                  {ref.company && ` · ${ref.company}`}
                </p>
                {ref.contact && <p className="text-xs text-gray-600 mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections &&
        data.customSections.length > 0 &&
        data.customSections.map(
          (section) =>
            section.items.length > 0 && (
              <section key={section.id} className="border-t-4 border-black pt-6 mb-8">
                <SectionHeading>{section.title}</SectionHeading>
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-serif text-base font-bold">{item.title}</h3>
                        {item.date && (
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap ml-6">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-sm italic text-gray-700">{item.subtitle}</p>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-800 mt-1 whitespace-pre-wrap leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
        )}
    </div>
  );
}
