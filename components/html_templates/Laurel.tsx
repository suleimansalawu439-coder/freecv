import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="font-serif italic text-lg text-center text-[#2f4f3e] mb-4">{title}</h2>
  );
}

export default function Laurel({ data }: { data: ResumeData }) {
  const contactBits = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location, data.personalInfo.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto p-[0.85in] font-serif text-[#1f2937]">
      {orderSections(data, {
        personal: (
          <>
            {/* Header */}
            <header className="mb-10 text-center">
              {data.personalInfo.fullName && (
                <h1 className="text-4xl font-bold text-[#1f2937]">{data.personalInfo.fullName}</h1>
              )}
              {data.personalInfo.jobTitle && (
                <div className="flex items-center justify-center gap-4 mt-3">
                  <div className="w-16 border-t border-[#2f4f3e]" />
                  <p className="text-lg italic" style={{ color: 'var(--theme-color)' }}>{data.personalInfo.jobTitle}</p>
                  <div className="w-16 border-t border-[#2f4f3e]" />
                </div>
              )}
              {contactBits.length > 0 && (
                <p className="text-sm text-slate-600 mt-3">{contactBits.join(' · ')}</p>
              )}
            </header>

            {/* Profile */}
            {data.summary && (
              <section className="mb-8">
                <SectionHeader title="Profile" />
                <p className="text-sm leading-relaxed text-[#374151]">{data.summary}</p>
              </section>
            )}
          </>
        ),

        experience: data.experience.length > 0 && (
          <section className="mb-8">
            <SectionHeader title="Experience" />
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-[#1f2937]">{exp.role}</div>
                  {(exp.startDate || exp.endDate) && (
                    <div className="text-sm text-slate-500 whitespace-nowrap">
                      {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                    </div>
                  )}
                </div>
                {exp.company && <div className="italic text-sm text-[#2f4f3e] mt-0.5">{exp.company}</div>}
                {exp.description && (
                  <ul className="mt-2 space-y-1.5">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="flex text-sm text-[#374151] leading-relaxed">
                        <span className="mr-2 text-[#2f4f3e]">•</span>
                        <span>{line.trim()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ),

        education: data.education.length > 0 && (
          <section className="mb-8">
            <SectionHeader title="Education" />
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="font-bold text-[#1f2937]">{edu.degree}</div>
                <div className="italic text-sm text-[#374151]">
                  {[edu.school, edu.graduationYear].filter(Boolean).join(' · ')}
                </div>
              </div>
            ))}
          </section>
        ),

        skills: data.skills.length > 0 && (
          <section className="mb-8">
            <SectionHeader title="Skills" />
            <p className="italic text-sm text-center text-[#374151] leading-relaxed">
              {data.skills.map((s) => s.name).join(', ')}
            </p>
          </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
          <section className="mb-8">
            <SectionHeader title="Projects" />
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="font-bold text-sm text-[#1f2937]">{proj.name}</div>
                {proj.description && <p className="text-sm text-[#374151] mt-0.5">{proj.description}</p>}
                {proj.link && <div className="italic text-sm text-slate-500">{proj.link}</div>}
              </div>
            ))}
          </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
          <section className="mb-8">
            <SectionHeader title="Certifications" />
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <div className="font-bold text-sm text-[#1f2937]">{cert.name}</div>
                <div className="italic text-sm text-[#374151]">
                  {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
                </div>
              </div>
            ))}
          </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
          <section className="mb-8">
            <SectionHeader title="References" />
            {data.references.map((ref) => (
              <div key={ref.id} className="mb-2">
                <div className="font-bold text-sm text-[#1f2937]">{ref.name}</div>
                <div className="italic text-sm text-[#374151]">
                  {[ref.title, ref.company].filter(Boolean).join(' · ')}
                </div>
                {ref.contact && <div className="text-sm text-slate-500">{ref.contact}</div>}
              </div>
            ))}
          </section>
        ),
      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <section key={section.id} className="mb-8">
            <SectionHeader title={section.title} />
            {section.items.map((item) => (
              <div key={item.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-sm text-[#1f2937]">{item.title}</div>
                  {item.date && <div className="text-sm text-slate-500">{item.date}</div>}
                </div>
                {item.subtitle && <div className="italic text-sm text-[#374151]">{item.subtitle}</div>}
                {item.description && <p className="text-sm text-[#374151] mt-0.5">{item.description}</p>}
              </div>
            ))}
          </section>
        ))
      )}
    </div>
  );
}
