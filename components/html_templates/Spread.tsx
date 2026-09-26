import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function FeatureHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-3xl font-normal text-gray-900 mt-14 mb-7 tracking-tight">
      {children}
    </h2>
  );
}

export default function Spread({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);
  const summaryFirst = data.summary ? data.summary.charAt(0) : '';
  const summaryRest = data.summary ? data.summary.slice(1) : '';

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-gray-900 mx-auto">
      {/* Full-width feature header */}
      {orderSections(data, {
        personal: (
          <header className="px-16 pt-16 pb-12 bg-gray-50 border-b border-gray-200">
            {info.fullName && (
              <h1 className="text-6xl font-normal tracking-tight leading-[1.05]">{info.fullName}</h1>
            )}
            {info.jobTitle && (
              <p className="text-2xl italic text-gray-600 mt-4">{info.jobTitle}</p>
            )}
            {contact.length > 0 && (
              <p className="text-sm text-gray-500 mt-6 tracking-wide">{contact.join('   ·   ')}</p>
            )}
          </header>
        ),
      })}

      <div className="px-16 py-4">
        {orderSections(data, {
          personal: data.summary && data.summary.length > 0 && (
          <section className="mt-10">
            <p className="text-lg text-gray-800 leading-[1.95]">
              <span
                className="float-left text-7xl font-bold leading-[0.85] mr-3 mt-1"
                style={{ color: 'var(--theme-color)' }}
              >
                {summaryFirst}
              </span>
              {summaryRest}
            </p>
            <div className="clear-both" />
          </section>
          ),

          experience: data.experience.length > 0 && (
          <section>
            <FeatureHead>Experience</FeatureHead>
            <div className="space-y-9">
              {data.experience.map((exp) => (
                <article key={exp.id} className="border-l-2 pl-6"
                  style={{ borderColor: 'var(--theme-color)' }}>
                  <div className="flex justify-between items-baseline gap-6">
                    <h3 className="font-serif text-xl font-bold">{exp.role}</h3>
                    <span className="text-sm text-gray-400 whitespace-nowrap italic">
                      {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                    </span>
                  </div>
                  {exp.company && (
                    <p className="text-sm font-semibold mt-1 tracking-wide" style={{ color: 'var(--theme-color)' }}>
                      {exp.company}
                    </p>
                  )}
                  {exp.description && (
                    <ul className="mt-3 space-y-1.5 list-disc pl-5">
                      {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                        <li key={i} className="text-[15px] text-gray-700 leading-[1.85]">{line.trim()}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>
          ),

          skills: data.skills.length > 0 && (
          <section>
            <FeatureHead>Skills</FeatureHead>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="font-serif text-base px-6 py-2.5 rounded-full border border-gray-300 text-gray-800"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
          ),

          education: data.education.length > 0 && (
          <section>
            <FeatureHead>Education</FeatureHead>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline gap-6">
                  <div>
                    {edu.school && <p className="font-serif text-lg font-bold">{edu.school}</p>}
                    {edu.degree && <p className="text-sm text-gray-600 mt-0.5 italic">{edu.degree}</p>}
                  </div>
                  {edu.graduationYear && (
                    <span className="text-sm text-gray-400 whitespace-nowrap italic">{edu.graduationYear}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
          <section>
            <FeatureHead>Selected Work</FeatureHead>
            <div className="grid grid-cols-2 gap-x-10 gap-y-8">
              {data.projects.map((proj) => (
                <article key={proj.id}>
                  <h3 className="font-serif text-lg font-bold">
                    {proj.name}
                    {proj.link && <span className="font-normal text-sm text-gray-400"> — {proj.link}</span>}
                  </h3>
                  {proj.description && (
                    <p className="text-[15px] text-gray-700 mt-2 leading-[1.85]">{proj.description}</p>
                  )}
                </article>
              ))}
            </div>
          </section>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
          <section>
            <FeatureHead>Certifications</FeatureHead>
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
          ),


          references: data.showReferences && data.references.length > 0 && (
          <section className="pb-14">
            <FeatureHead>References</FeatureHead>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <p className="font-serif text-base font-bold">{ref.name}</p>
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
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
            <section key={section.id}>
              <FeatureHead>{section.title}</FeatureHead>
              <div className="space-y-7">
                {section.items.map((item) => (
                  <article key={item.id}>
                    {item.title && <h3 className="font-serif text-lg font-bold">{item.title}</h3>}
                    {(item.subtitle || item.date) && (
                      <p className="text-sm text-gray-500 italic mt-0.5">
                        {item.subtitle}{item.subtitle && item.date ? '  ·  ' : ''}{item.date}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-[15px] text-gray-700 mt-2 leading-[1.85]">{item.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
            ))
        )}
      </div>
    </div>
  );
}
