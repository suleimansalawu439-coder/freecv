import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function QuoteHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-xl font-normal text-gray-900 mt-12 mb-6 pl-5 border-l-4"
      style={{ borderColor: 'var(--theme-color)' }}>
      {children}
    </h2>
  );
}

export default function Pullquote({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-gray-900 px-16 py-14 mx-auto">
      <header className="text-center mb-4">
        {info.fullName && (
          <h1 className="text-4xl font-normal tracking-tight">{info.fullName}</h1>
        )}
        {info.jobTitle && (
          <p className="text-lg italic text-gray-600 mt-2">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-sm text-gray-500 mt-3">{contact.join('   ·   ')}</p>
        )}
      </header>

      {data.summary && (
        <figure className="my-10 px-8 text-center">
          <div className="font-serif text-6xl leading-none" style={{ color: 'var(--theme-color)' }}>
            &ldquo;
          </div>
          <blockquote className="font-serif text-2xl italic leading-[1.6] text-gray-800 -mt-4">
            {data.summary}
          </blockquote>
          <div className="w-16 h-0.5 mx-auto mt-6" style={{ backgroundColor: 'var(--theme-color)' }} />
        </figure>
      )}

      {data.experience.length > 0 && (
        <section>
          <QuoteHead>Experience</QuoteHead>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-6">
                  <h3 className="font-serif text-lg font-bold">{exp.role}</h3>
                  <span className="text-sm text-gray-400 italic whitespace-nowrap">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                  </span>
                </div>
                {exp.company && <p className="text-sm text-gray-600 italic mt-0.5">{exp.company}</p>}
                {exp.description && (
                  <ul className="mt-2.5 space-y-1.5 list-disc pl-5">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-[15px] text-gray-700 leading-[1.85]">{line.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <QuoteHead>Skills</QuoteHead>
          <div className="flex flex-wrap gap-2.5">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="font-serif text-sm px-4 py-1.5 rounded-full bg-gray-100 text-gray-800"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <QuoteHead>Education</QuoteHead>
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline gap-6">
                <div>
                  {edu.school && <p className="font-serif text-base font-bold">{edu.school}</p>}
                  {edu.degree && <p className="text-sm text-gray-600 italic">{edu.degree}</p>}
                </div>
                {edu.graduationYear && (
                  <span className="text-sm text-gray-400 italic whitespace-nowrap">{edu.graduationYear}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <QuoteHead>Projects</QuoteHead>
          <div className="space-y-6">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-serif text-base font-bold">
                  {proj.name}
                  {proj.link && <span className="font-normal text-sm text-gray-400"> — {proj.link}</span>}
                </h3>
                {proj.description && (
                  <p className="text-[15px] text-gray-700 mt-1.5 leading-[1.85]">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <QuoteHead>Certifications</QuoteHead>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <p key={cert.id} className="font-serif text-[15px] text-gray-800">
                <span className="font-bold">{cert.name}</span>
                {cert.issuer && <span className="italic text-gray-600">, {cert.issuer}</span>}
                {cert.date && <span className="text-gray-400"> — {cert.date}</span>}
              </p>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items && section.items.length > 0 ? (
          <section key={section.id}>
            <QuoteHead>{section.title}</QuoteHead>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-6">
                    {item.title && <h3 className="font-serif text-base font-bold">{item.title}</h3>}
                    {item.date && <span className="text-sm text-gray-400 italic whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm text-gray-600 italic mt-0.5">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-[15px] text-gray-700 mt-1.5 leading-[1.85]">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}

      {data.showReferences && data.references.length > 0 && (
        <section>
          <QuoteHead>References</QuoteHead>
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
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
        </section>
      )}
    </div>
  );
}
