import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

// Fixed warm identity — theme color is intentionally not used.
const ACCENT = '#ea580c';
const NAME_COLOR = '#7c2d12';

function WarmSectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold text-[#ea580c]">{title}</h2>
      <div className="mt-1.5 h-1 w-12 rounded-full bg-[#ea580c]" />
    </div>
  );
}

const splitLines = (text?: string) =>
  (text || '').split(/\n|\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0);

export default function Pedagogue({ data }: { data: ResumeData }) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-800 px-14 py-12">
      {orderSections(data, {
        personal: (
          <>
      {/* Header */}
      <header className="mb-10">
        {data.personalInfo.fullName && (
          <h1 className="text-4xl font-bold text-[#7c2d12] mb-2 tracking-tight">
            {data.personalInfo.fullName}
          </h1>
        )}
        {data.personalInfo.jobTitle && (
          <p className="text-lg font-semibold text-[#ea580c] mb-4">
            {data.personalInfo.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-[#9a3412]">
            {contactItems.map((item, i) => (
              <span key={i} className="font-medium">{item}</span>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-10">
          <WarmSectionHeader title="About me" />
          <p className="text-[15px] leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}
          </>
        ),

        education: data.education && data.education.length > 0 && (
        <section className="mb-10">
          <WarmSectionHeader title="Education" />
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="bg-orange-50/50 border border-orange-100 rounded-xl px-6 py-5"
              >
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                  {edu.graduationYear && (
                    <span className="text-xs font-bold text-[#ea580c] whitespace-nowrap">
                      {edu.graduationYear}
                    </span>
                  )}
                </div>
                {edu.school && (
                  <p className="text-sm text-gray-600 mt-1">{edu.school}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        experience: data.experience && data.experience.length > 0 && (
        <section className="mb-10">
          <WarmSectionHeader title="Experience" />
          <div className="space-y-7">
            {data.experience.map((exp) => {
              const lines = splitLines(exp.description);
              return (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-base font-bold text-gray-900">{exp.role}</h3>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">
                        {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                      </span>
                    )}
                  </div>
                  {exp.company && (
                    <p className="text-sm font-semibold text-[#ea580c] mb-2">{exp.company}</p>
                  )}
                  {lines.length > 0 && (
                    <ul className="space-y-1.5">
                      {lines.map((line, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
                          <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
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
        ),

        skills: data.skills && data.skills.length > 0 && (
        <section className="mb-10">
          <WarmSectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-sm font-medium px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-900"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section className="mb-10">
          <WarmSectionHeader title="Certifications" />
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex items-start gap-3">
                <span className="mt-[7px] w-2 h-2 rounded-full bg-[#ea580c] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                  {(cert.issuer || cert.date) && (
                    <p className="text-sm text-gray-500">
                      {cert.issuer}{cert.issuer && cert.date ? ' • ' : ''}{cert.date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        ),

        projects: data.showProjects && data.projects && data.projects.length > 0 && (
        <section className="mb-10">
          <WarmSectionHeader title="Projects" />
          <div className="space-y-5">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-base font-bold text-gray-900">{proj.name}</h3>
                {proj.link && (
                  <a href={proj.link} className="text-sm font-semibold text-[#ea580c] break-all">
                    {proj.link}
                  </a>
                )}
                {proj.description && (
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-line leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-10">
          <WarmSectionHeader title="References" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.references.map((ref) => (
              <div
                key={ref.id}
                className="bg-orange-50/50 border border-orange-100 rounded-xl px-5 py-4"
              >
                <h3 className="font-bold text-sm text-gray-900">{ref.name}</h3>
                {(ref.title || ref.company) && (
                  <p className="text-sm text-[#ea580c] font-medium mb-1">
                    {ref.title}{ref.title && ref.company ? ' • ' : ''}{ref.company}
                  </p>
                )}
                {ref.contact && <p className="text-sm text-gray-500">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
        ),

      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <section key={section.id} className="mb-10">
            <WarmSectionHeader title={section.title} />
            <div className="space-y-5">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.title}</p>
                      {item.subtitle && (
                        <p className="text-sm italic text-gray-500">{item.subtitle}</p>
                      )}
                    </div>
                    {item.date && (
                      <p className="text-xs font-semibold text-[#ea580c] whitespace-nowrap">
                        {item.date}
                      </p>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-line leading-relaxed">
                      {item.description}
                    </p>
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
