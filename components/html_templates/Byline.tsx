import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mt-12 mb-6">
      <p className="font-serif text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">{kicker}</p>
      <h2 className="font-serif text-2xl font-normal text-gray-900">{title}</h2>
    </div>
  );
}

export default function Byline({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-gray-900 px-16 py-14 mx-auto">
      {orderSections(data, {
        personal: (
          <>
      <header className="border-b-2 border-gray-900 pb-8 mb-2">
        {info.location && (
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">
            {info.location}
          </p>
        )}
        {info.fullName && (
          <h1 className="text-5xl font-normal leading-tight tracking-tight text-gray-900">{info.fullName}</h1>
        )}
        {info.jobTitle && (
          <p className="text-xl italic text-gray-600 mt-3">{info.jobTitle}</p>
        )}
        <p className="text-sm text-gray-600 mt-4">
          <span className="font-bold">By {info.fullName || 'Staff Writer'}</span>
          {contact.length > 0 && <span className="text-gray-400">{'  ·  '}{contact.join('  ·  ')}</span>}
          {info.phone && <span className="text-gray-400">{'  ·  '}{info.phone}</span>}
        </p>
      </header>

      {data.summary && (
        <section>
          <SectionHead kicker="Lede" title="Profile" />
          <p className="text-[15px] text-gray-800 leading-[1.9] first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-[0.9]">
            {data.summary}
          </p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section>
          <SectionHead kicker="Career" title="Professional Experience" />
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <article key={exp.id}>
                <h3 className="font-serif text-lg font-bold text-gray-900">{exp.role}</h3>
                <p className="text-sm text-gray-500 mt-1 italic">
                  {exp.company}
                  {(exp.startDate || exp.endDate) && (
                    <span className="not-italic">
                      {' — '}{exp.startDate}{exp.startDate && exp.endDate ? ' to ' : ''}{exp.endDate}
                    </span>
                  )}
                </p>
                {exp.description && (
                  <div className="mt-2.5 space-y-2">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <p key={i} className="text-[15px] text-gray-800 leading-[1.85]">{line.trim()}</p>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
        <section>
          <SectionHead kicker="Schooling" title="Education" />
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id}>
                {edu.school && <p className="font-serif text-base font-bold text-gray-900">{edu.school}</p>}
                <p className="text-sm text-gray-600 mt-0.5 italic">
                  {edu.degree}
                  {edu.graduationYear && <span className="not-italic text-gray-400">{' — '}{edu.graduationYear}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section>
          <SectionHead kicker="Toolkit" title="Skills" />
          <p className="font-serif text-[15px] text-gray-800 leading-[2]">
            {data.skills.map((s) => s.name).join(', ')}
          </p>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHead kicker="Features" title="Projects" />
          <div className="space-y-7">
            {data.projects.map((proj) => (
              <article key={proj.id}>
                <h3 className="font-serif text-base font-bold text-gray-900">
                  {proj.name}
                  {proj.link && <span className="font-normal text-sm text-gray-400"> — {proj.link}</span>}
                </h3>
                {proj.description && (
                  <p className="text-[15px] text-gray-800 mt-2 leading-[1.85]">{proj.description}</p>
                )}
              </article>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHead kicker="Credentials" title="Certifications" />
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
        <section>
          <SectionHead kicker="Sources" title="References" />
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="font-serif text-[15px] font-bold text-gray-900">{ref.name}</p>
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
            <SectionHead kicker="Filed" title={section.title} />
            <div className="space-y-6">
              {section.items.map((item) => (
                <article key={item.id}>
                  {item.title && <h3 className="font-serif text-base font-bold text-gray-900">{item.title}</h3>}
                  {(item.subtitle || item.date) && (
                    <p className="text-sm text-gray-500 italic mt-0.5">
                      {item.subtitle}{item.subtitle && item.date ? ' — ' : ''}{item.date}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-[15px] text-gray-800 mt-2 leading-[1.85]">{item.description}</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
