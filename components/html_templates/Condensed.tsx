import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionLabel({ title }: { title: string }) {
  return (
    <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2 border-b pb-1 text-[var(--theme-color)] border-[var(--theme-color)]">
      {title}
    </h2>
  );
}

function DateRange({ start, end }: { start: string; end: string }) {
  if (!start && !end) return null;
  return (
    <span className="text-[11px] text-gray-500 whitespace-nowrap">
      {start}
      {start && end ? ' – ' : ''}
      {end}
    </span>
  );
}

export default function Condensed({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactBits = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="font-sans bg-white text-[#1a1a1a] min-h-[1056px] w-full max-w-[816px] mx-auto px-12 py-10 leading-snug">
      {orderSections(data, {
        personal: (
          <>
            {/* Header */}
      <header className="mb-5">
        <h1 className="text-3xl font-bold leading-tight">{info.fullName}</h1>
        {info.jobTitle && <p className="text-sm font-medium text-gray-500 mt-0.5">{info.jobTitle}</p>}
        {contactBits.length > 0 && (
          <p className="text-xs text-gray-600 mt-1">{contactBits.join('  ·  ')}</p>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-5">
          <SectionLabel title="Summary" />
          <p className="text-xs leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section className="mb-5">
          <SectionLabel title="Experience" />
          <div className="space-y-2.5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <p className="text-[13px] font-bold leading-tight">
                    {exp.role}
                    {exp.company && <span className="font-normal text-gray-600"> @ {exp.company}</span>}
                  </p>
                  <DateRange start={exp.startDate} end={exp.endDate} />
                </div>
                {exp.description && (
                  <p className="text-xs text-gray-600 leading-snug mt-0.5 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ),

        education: data.education.length > 0 && (
        <section className="mb-5">
          <SectionLabel title="Education" />
          <div className="space-y-1.5">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <p className="text-xs">
                  <span className="font-bold">{edu.degree}</span>
                  {edu.school && <span className="text-gray-600"> — {edu.school}</span>}
                </p>
                {edu.graduationYear && (
                  <span className="text-[11px] text-gray-500 whitespace-nowrap">{edu.graduationYear}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      ),

        skills: data.skills.length > 0 && (
        <section className="mb-5">
          <SectionLabel title="Skills" />
          <p className="text-xs text-gray-700 leading-relaxed">
            {data.skills.map((s) => s.name).join(', ')}
          </p>
        </section>
      ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-5">
          <SectionLabel title="Projects" />
          <div className="space-y-1.5">
            {data.projects.map((proj) => (
              <div key={proj.id} className="flex justify-between items-baseline gap-4">
                <p className="text-xs">
                  <span className="font-bold">{proj.name}</span>
                  {proj.description && <span className="text-gray-600"> — {proj.description}</span>}
                </p>
                {proj.link && (
                  <a href={proj.link} className="text-[11px] text-[var(--theme-color)] whitespace-nowrap">
                    Link
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-5">
          <SectionLabel title="Certifications" />
          <div className="space-y-1">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline gap-4">
                <p className="text-xs">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                </p>
                {cert.date && (
                  <span className="text-[11px] text-gray-500 whitespace-nowrap">{cert.date}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-5">
          <SectionLabel title="References" />
          <div className="space-y-1">
            {data.references.map((ref) => (
              <p key={ref.id} className="text-xs">
                <span className="font-bold">{ref.name}</span>
                {(ref.title || ref.company) && (
                  <span className="text-gray-600">
                    {' '}
                    — {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </span>
                )}
                {ref.contact && <span className="text-gray-500"> · {ref.contact}</span>}
              </p>
            ))}
          </div>
        </section>
      ),
      },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
              <section key={section.id} className="mb-5">
                <SectionLabel title={section.title} />
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-baseline gap-4">
                      <p className="text-xs">
                        <span className="font-bold">{item.title}</span>
                        {item.subtitle && <span className="text-gray-600"> — {item.subtitle}</span>}
                        {item.description && (
                          <span className="text-gray-600"> · {item.description}</span>
                        )}
                      </p>
                      {item.date && (
                        <span className="text-[11px] text-gray-500 whitespace-nowrap">{item.date}</span>
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
