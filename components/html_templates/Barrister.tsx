import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-4 mt-8 first:mt-0">
      <h2 className="font-serif text-base font-bold uppercase tracking-[0.3em] text-neutral-900">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-2 mt-2">
        <div className="h-px w-16 bg-neutral-400" />
        <div className="w-1.5 h-1.5 rotate-45 bg-neutral-800" />
        <div className="h-px w-16 bg-neutral-400" />
      </div>
    </div>
  );
}

export default function Barrister({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-neutral-900 mx-auto px-16 py-12">
      {/* Formal centered header */}
      {orderSections(data, {
        personal: (
          <>
      <header className="text-center border-b-2 border-neutral-900 pb-6 mb-2">
        <h1 className="text-4xl font-bold tracking-wide uppercase">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-sm italic mt-2 text-neutral-700">{info.jobTitle}</p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs mt-3 text-neutral-600">{contactItems.join('  ·  ')}</p>
        )}
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-neutral-800 text-justify">{data.summary}</p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section>
          <SectionHeader title="Professional Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <span className="text-sm italic text-neutral-600">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold uppercase tracking-wide text-neutral-700 mb-2">
                  {exp.company}
                </p>
                <ul className="space-y-1.5">
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li key={i} className="text-sm text-neutral-800 leading-relaxed text-justify">
                        <span className="mr-2">—</span>
                        {line}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm italic text-neutral-700">{edu.school}</p>
                </div>
                <span className="text-sm italic text-neutral-600">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Admissions & Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span className="italic text-neutral-700">, {cert.issuer}</span>}
                </p>
                <span className="text-sm italic text-neutral-600">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section>
          <SectionHeader title="Areas of Practice" />
          <p className="text-sm leading-loose text-center text-neutral-800">
            {data.skills.map((s, i) => (
              <React.Fragment key={s.id}>
                <span className="font-semibold">{s.name}</span>
                {i < data.skills.length - 1 && <span className="text-neutral-400">  ·  </span>}
              </React.Fragment>
            ))}
          </p>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Notable Matters" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-sm font-bold">{proj.name}</h3>
                <p className="text-sm text-neutral-800 mt-1 text-justify">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader title="References" />
          <p className="text-sm italic text-center text-neutral-600">
            Available upon request.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {data.references.map((ref) => (
              <div key={ref.id} className="text-center">
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs italic text-neutral-700">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-xs text-neutral-600 mt-1">{ref.contact}</p>}
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
          <SectionHeader title={section.title} />
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{item.title}</p>
                  {item.date && <span className="text-sm italic text-neutral-600">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-sm italic text-neutral-700">{item.subtitle}</p>}
                {item.description && (
                  <p className="text-sm text-neutral-800 mt-1 text-justify">{item.description}</p>
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
