import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-900 mt-10 mb-5 leading-relaxed">
      {children}
    </h2>
  );
}

export default function Lucid({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 px-16 py-14 mx-auto leading-relaxed">
      <header>
        {info.fullName && (
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 leading-tight">{info.fullName}</h1>
        )}
        {info.jobTitle && (
          <p className="text-lg text-gray-600 mt-3 leading-snug">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">{contact.join('   ·   ')}</p>
        )}
      </header>

      {data.summary && (
        <section>
          <SectionTitle>Profile</SectionTitle>
          <p className="text-sm text-gray-700 leading-loose">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionTitle>Professional Experience</SectionTitle>
          <div className="space-y-7">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-6">
                  <h3 className="text-base font-bold text-gray-900 leading-snug">{exp.role}</h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                  </span>
                </div>
                {exp.company && (
                  <p className="text-sm font-medium text-gray-700 mt-1 leading-relaxed">{exp.company}</p>
                )}
                {exp.description && (
                  <ul className="mt-2.5 space-y-1.5 list-disc pl-5">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm text-gray-700 leading-relaxed">{line.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline gap-6">
                <div>
                  {edu.school && <p className="text-sm font-bold text-gray-900 leading-relaxed">{edu.school}</p>}
                  {edu.degree && <p className="text-sm text-gray-600 leading-relaxed">{edu.degree}</p>}
                </div>
                {edu.graduationYear && (
                  <span className="text-sm text-gray-500 whitespace-nowrap">{edu.graduationYear}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="grid grid-cols-3 gap-x-8 gap-y-3">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-sm text-gray-800 border-b border-gray-200 pb-2.5 leading-relaxed">
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-5">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                </div>
                {proj.description && (
                  <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionTitle>Certifications</SectionTitle>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline gap-6">
                <p className="text-sm text-gray-800 leading-relaxed">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                </p>
                {cert.date && <span className="text-sm text-gray-500 whitespace-nowrap">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items && section.items.length > 0 ? (
          <section key={section.id}>
            <SectionTitle>{section.title}</SectionTitle>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-6">
                    {item.title && <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>}
                    {item.date && <span className="text-sm text-gray-500 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm italic text-gray-600 mt-0.5">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}

      {data.showReferences && data.references.length > 0 && (
        <section>
          <SectionTitle>References</SectionTitle>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                {(ref.title || ref.company) && (
                  <p className="text-sm text-gray-600">
                    {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                  </p>
                )}
                {ref.contact && <p className="text-sm text-gray-500">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
