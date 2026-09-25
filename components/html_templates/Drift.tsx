import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-slate-800 mt-12 mb-6">
      {children}
    </h2>
  );
}

export default function Drift({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-800 px-16 py-14 mx-auto">
      <header>
        {info.fullName && (
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">{info.fullName}</h1>
        )}
        {info.jobTitle && (
          <p className="text-lg text-slate-500 mt-2">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-sm text-slate-400 mt-3">{contact.join('   ·   ')}</p>
        )}
      </header>

      {data.summary && (
        <section>
          <SectionTitle>Profile</SectionTitle>
          <p className="text-sm text-slate-600 leading-relaxed max-w-[65ch]">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-6">
                  <h3 className="text-base font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-sm text-slate-400 whitespace-nowrap">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                  </span>
                </div>
                {exp.company && (
                  <p className="text-sm text-slate-500 mt-1">{exp.company}</p>
                )}
                {exp.description && (
                  <div className="mt-2 space-y-1.5">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <p key={i} className="text-sm text-slate-600 leading-relaxed max-w-[68ch]">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
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
                  {edu.school && <p className="text-sm font-bold text-slate-900">{edu.school}</p>}
                  {edu.degree && <p className="text-sm text-slate-500">{edu.degree}</p>}
                </div>
                {edu.graduationYear && (
                  <span className="text-sm text-slate-400 whitespace-nowrap">{edu.graduationYear}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionTitle>Skills</SectionTitle>
          <p className="text-sm text-slate-600 leading-loose max-w-[70ch]">
            {data.skills.map((s) => s.name).join('   ·   ')}
          </p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-6">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-sm font-bold text-slate-900">
                  {proj.name}
                  {proj.link && <span className="font-normal text-slate-400"> — {proj.link}</span>}
                </h3>
                {proj.description && (
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed max-w-[68ch]">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionTitle>Certifications</SectionTitle>
          <div className="space-y-2.5">
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">{cert.name}</span>
                {cert.issuer && <span> — {cert.issuer}</span>}
                {cert.date && <span className="text-slate-400"> · {cert.date}</span>}
              </p>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items && section.items.length > 0 ? (
          <section key={section.id}>
            <SectionTitle>{section.title}</SectionTitle>
            <div className="space-y-5">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-6">
                    {item.title && <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>}
                    {item.date && <span className="text-sm text-slate-400 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm text-slate-500 mt-0.5">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed max-w-[68ch]">{item.description}</p>
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
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold text-slate-900">{ref.name}</p>
                {(ref.title || ref.company) && (
                  <p className="text-sm text-slate-500">
                    {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                  </p>
                )}
                {ref.contact && <p className="text-sm text-slate-400">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
