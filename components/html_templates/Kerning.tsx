import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function TrackedHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans text-xs font-bold uppercase tracking-[0.35em] text-gray-900 mt-12 mb-6">
      {children}
    </h2>
  );
}

export default function Kerning({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 px-16 py-14 mx-auto">
      <header className="mb-4">
        {info.fullName && (
          <h1 className="text-4xl font-bold uppercase tracking-[0.3em] leading-tight">{info.fullName}</h1>
        )}
        {info.jobTitle && (
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500 mt-4">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-4 leading-loose">
            {contact.join('   ·   ')}
          </p>
        )}
      </header>

      <div className="h-px bg-gray-900 mt-8" />

      {data.summary && (
        <section>
          <TrackedHead>Profile</TrackedHead>
          <p className="text-sm text-gray-700 leading-[1.9] tracking-wide">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <TrackedHead>Experience</TrackedHead>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-6">
                  <h3 className="text-base font-bold uppercase tracking-[0.12em]">{exp.role}</h3>
                  <span className="text-xs uppercase tracking-[0.18em] text-gray-400 whitespace-nowrap">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                  </span>
                </div>
                {exp.company && (
                  <p className="text-sm uppercase tracking-[0.18em] text-gray-500 mt-1.5">{exp.company}</p>
                )}
                {exp.description && (
                  <ul className="mt-3 space-y-1.5 list-disc pl-5">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm text-gray-700 leading-[1.85] tracking-wide">{line.trim()}</li>
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
          <TrackedHead>Education</TrackedHead>
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline gap-6">
                <div>
                  {edu.school && (
                    <p className="text-sm font-bold uppercase tracking-[0.12em]">{edu.school}</p>
                  )}
                  {edu.degree && <p className="text-sm text-gray-600 mt-1 tracking-wide">{edu.degree}</p>}
                </div>
                {edu.graduationYear && (
                  <span className="text-xs uppercase tracking-[0.18em] text-gray-400 whitespace-nowrap">
                    {edu.graduationYear}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <TrackedHead>Skills</TrackedHead>
          <p className="text-sm uppercase tracking-[0.22em] text-gray-800 leading-[2.4]">
            {data.skills.map((s) => s.name).join('   ·   ')}
          </p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <TrackedHead>Projects</TrackedHead>
          <div className="space-y-6">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-sm font-bold uppercase tracking-[0.12em]">
                  {proj.name}
                  {proj.link && <span className="font-normal normal-case tracking-normal text-gray-400"> — {proj.link}</span>}
                </h3>
                {proj.description && (
                  <p className="text-sm text-gray-700 mt-2 leading-[1.85] tracking-wide">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <TrackedHead>Certifications</TrackedHead>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-sm text-gray-800 tracking-wide">
                <span className="font-bold uppercase tracking-[0.1em]">{cert.name}</span>
                {cert.issuer && <span className="text-gray-500"> — {cert.issuer}</span>}
                {cert.date && <span className="text-gray-400"> · {cert.date}</span>}
              </p>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items && section.items.length > 0 ? (
          <section key={section.id}>
            <TrackedHead>{section.title}</TrackedHead>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-6">
                    {item.title && (
                      <h3 className="text-sm font-bold uppercase tracking-[0.12em]">{item.title}</h3>
                    )}
                    {item.date && (
                      <span className="text-xs uppercase tracking-[0.18em] text-gray-400 whitespace-nowrap">{item.date}</span>
                    )}
                  </div>
                  {item.subtitle && <p className="text-sm text-gray-500 mt-1 tracking-wide">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-sm text-gray-700 mt-2 leading-[1.85] tracking-wide">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}

      {data.showReferences && data.references.length > 0 && (
        <section>
          <TrackedHead>References</TrackedHead>
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold uppercase tracking-[0.12em]">{ref.name}</p>
                {(ref.title || ref.company) && (
                  <p className="text-sm text-gray-500 mt-0.5 tracking-wide">
                    {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                  </p>
                )}
                {ref.contact && <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mt-0.5">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
