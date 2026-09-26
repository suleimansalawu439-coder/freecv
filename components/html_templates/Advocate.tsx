import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

function FormalSectionHeader({ numeral, title }: { numeral: string; title: string }) {
  return (
    <div className="mb-6">
      <div className="border-t border-black" />
      <h2 className="font-serif text-center uppercase tracking-[0.25em] text-[13px] font-bold text-black py-2.5">
        {numeral}.&nbsp;&nbsp;{title}
      </h2>
      <div className="border-b border-black" />
    </div>
  );
}

const splitLines = (text?: string) =>
  (text || '').split(/\n|\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0);

export default function Advocate({ data }: { data: ResumeData }) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-black font-serif px-16 py-14">
      {orderSections(data, {
        personal: (
          <>
      {/* Header */}
      <header className="mb-10">
        {data.personalInfo.fullName && (
          <h1 className="font-serif text-4xl uppercase tracking-wide text-center text-black mb-3">
            {data.personalInfo.fullName}
          </h1>
        )}
        {data.personalInfo.jobTitle && (
          <p className="font-serif italic text-lg text-center text-black mb-3">
            {data.personalInfo.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-center text-xs text-black">
            {contactItems.join(' · ')}
          </p>
        )}
        <div className="border-b-4 border-double border-black mt-6" />
      </header>

      {/* Professional Summary (unnumbered) */}
      {data.summary && (
        <section className="mb-10">
          <div className="mb-6">
            <div className="border-t border-black" />
            <h2 className="font-serif text-center uppercase tracking-[0.25em] text-[13px] font-bold text-black py-2.5">
              Professional Summary
            </h2>
            <div className="border-b border-black" />
          </div>
          <p className="font-serif text-sm text-black leading-relaxed text-justify">
            {data.summary}
          </p>
        </section>
        )}
          </>
        ),

        experience: data.experience && data.experience.length > 0 && ((i: number) => (
        <section className="mb-10">
          <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="Professional Experience" />
          <div className="space-y-7">
            {data.experience.map((exp) => {
              const lines = splitLines(exp.description);
              return (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-serif font-bold text-base text-black">{exp.role}</h3>
                    {(exp.startDate || exp.endDate) && (
                      <span className="font-serif text-xs text-black whitespace-nowrap">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                      </span>
                    )}
                  </div>
                  {exp.company && (
                    <p className="font-serif italic text-sm text-black mb-2">{exp.company}</p>
                  )}
                  {lines.length > 0 && (
                    <ul className="space-y-1.5">
                      {lines.map((line, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-black leading-relaxed">
                          <span className="shrink-0 text-[9px] mt-[4px]">▪</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
        )),

        education: data.education && data.education.length > 0 && ((i: number) => (
        <section className="mb-10">
          <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="Education" />
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <div>
                  <h3 className="font-serif font-bold text-base text-black">{edu.degree}</h3>
                  {edu.school && (
                    <p className="font-serif italic text-sm text-black">{edu.school}</p>
                  )}
                </div>
                {edu.graduationYear && (
                  <span className="font-serif text-xs text-black whitespace-nowrap">
                    {edu.graduationYear}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
        )),

        skills: data.skills && data.skills.length > 0 && ((i: number) => (
        <section className="mb-10">
          <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="Skills" />
          <p className="font-serif text-sm text-black leading-relaxed">
            {data.skills.map((skill) => skill.name).filter(Boolean).join('; ')}
          </p>
        </section>
        )),

        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && ((i: number) => (
        <section className="mb-10">
          <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="Certifications" />
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <p className="font-serif font-bold text-sm text-black">{cert.name}</p>
                {(cert.issuer || cert.date) && (
                  <p className="font-serif italic text-sm text-black">
                    {cert.issuer}{cert.issuer && cert.date ? ', ' : ''}{cert.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        )),

        projects: data.showProjects && data.projects && data.projects.length > 0 && ((i: number) => (
        <section className="mb-10">
          <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="Selected Projects" />
          <div className="space-y-5">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="font-serif font-bold text-base text-black">{proj.name}</h3>
                  {proj.link && (
                    <span className="font-serif text-xs text-black whitespace-nowrap break-all">
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="font-serif text-sm text-black mt-1 whitespace-pre-line leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        )),

        references: data.showReferences && data.references && data.references.length > 0 && ((i: number) => (
        <section className="mb-10">
          <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title="References" />
          <div className="space-y-4">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="font-serif font-bold text-sm text-black">{ref.name}</p>
                {(ref.title || ref.company) && (
                  <p className="font-serif italic text-sm text-black">
                    {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                  </p>
                )}
                {ref.contact && (
                  <p className="font-serif text-sm text-black">{ref.contact}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        )),
      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (i: number) => (
          <section key={section.id} className="mb-10">
            <FormalSectionHeader numeral={ROMAN_NUMERALS[i] ?? ''} title={section.title} />
            <div className="space-y-5">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <div>
                      <p className="font-serif font-bold text-sm text-black">{item.title}</p>
                      {item.subtitle && (
                        <p className="font-serif italic text-sm text-black">{item.subtitle}</p>
                      )}
                    </div>
                    {item.date && (
                      <p className="font-serif text-xs text-black whitespace-nowrap">{item.date}</p>
                    )}
                  </div>
                  {item.description && (
                    <p className="font-serif text-sm text-black mt-1 whitespace-pre-line leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )))
      }
    </div>
  );
}
