import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-sm font-bold uppercase tracking-[0.25em] text-gray-900 mt-12 mb-7">
      {children}
    </h2>
  );
}

function MarginRow({ margin, children }: { margin?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-6 mb-8">
      <div className="text-right">
        {margin && <p className="font-serif text-xs italic text-gray-400 leading-relaxed pt-1">{margin}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function Gutter({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-gray-900 px-20 py-16 mx-auto">
      <header className="mb-6 ml-[154px]">
        {info.fullName && (
          <h1 className="text-4xl font-normal tracking-tight leading-tight">{info.fullName}</h1>
        )}
        {info.jobTitle && (
          <p className="text-lg italic text-gray-600 mt-2">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-sm text-gray-500 mt-3">{contact.join('   ·   ')}</p>
        )}
      </header>

      {data.summary && (
        <section>
          <SectionTitle>Profile</SectionTitle>
          <div className="grid grid-cols-[130px_1fr] gap-6">
            <div />
            <p className="text-[15px] text-gray-800 leading-[1.9]">{data.summary}</p>
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionTitle>Experience</SectionTitle>
          {data.experience.map((exp) => (
            <MarginRow
              key={exp.id}
              margin={
                (exp.startDate || exp.endDate)
                  ? `${exp.startDate}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate}`
                  : undefined
              }
            >
              <h3 className="font-serif text-lg font-bold leading-snug">{exp.role}</h3>
              {exp.company && <p className="text-sm text-gray-600 italic mt-1">{exp.company}</p>}
              {exp.description && (
                <ul className="mt-2.5 space-y-1.5 list-disc pl-5">
                  {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                    <li key={i} className="text-[15px] text-gray-700 leading-[1.85]">{line.trim()}</li>
                  ))}
                </ul>
              )}
            </MarginRow>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <SectionTitle>Education</SectionTitle>
          {data.education.map((edu) => (
            <MarginRow key={edu.id} margin={edu.graduationYear || undefined}>
              {edu.school && <p className="font-serif text-base font-bold">{edu.school}</p>}
              {edu.degree && <p className="text-sm text-gray-600 italic mt-0.5">{edu.degree}</p>}
            </MarginRow>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="grid grid-cols-[130px_1fr] gap-6">
            <div className="text-right">
              <p className="font-serif text-xs italic text-gray-400 pt-1">{data.skills.length} areas</p>
            </div>
            <p className="font-serif text-[15px] text-gray-800 leading-[2]">
              {data.skills.map((s) => s.name).join('  ·  ')}
            </p>
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionTitle>Projects</SectionTitle>
          {data.projects.map((proj) => (
            <MarginRow key={proj.id} margin={proj.link || undefined}>
              <h3 className="font-serif text-base font-bold">{proj.name}</h3>
              {proj.description && (
                <p className="text-[15px] text-gray-700 mt-1.5 leading-[1.85]">{proj.description}</p>
              )}
            </MarginRow>
          ))}
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionTitle>Certifications</SectionTitle>
          {data.certifications.map((cert) => (
            <MarginRow key={cert.id} margin={cert.date || undefined}>
              <p className="font-serif text-[15px] text-gray-800">
                <span className="font-bold">{cert.name}</span>
                {cert.issuer && <span className="italic text-gray-600">, {cert.issuer}</span>}
              </p>
            </MarginRow>
          ))}
        </section>
      )}

      {data.customSections.map((section) =>
        section.items && section.items.length > 0 ? (
          <section key={section.id}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.items.map((item) => (
              <MarginRow key={item.id} margin={item.date || undefined}>
                {item.title && <h3 className="font-serif text-base font-bold">{item.title}</h3>}
                {item.subtitle && <p className="text-sm text-gray-600 italic mt-0.5">{item.subtitle}</p>}
                {item.description && (
                  <p className="text-[15px] text-gray-700 mt-1.5 leading-[1.85]">{item.description}</p>
                )}
              </MarginRow>
            ))}
          </section>
        ) : null
      )}

      {data.showReferences && data.references.length > 0 && (
        <section>
          <SectionTitle>References</SectionTitle>
          <div className="grid grid-cols-[130px_1fr] gap-6">
            <div />
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <p className="font-serif text-[15px] font-bold">{ref.name}</p>
                  {(ref.title || ref.company) && (
                    <p className="text-sm text-gray-600 italic">
                      {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                    </p>
                  )}
                  {ref.contact && <p className="text-sm text-gray-400">{ref.contact}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
