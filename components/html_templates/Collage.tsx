import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function dateRange(startDate?: string, endDate?: string) {
  const parts = [startDate, endDate].filter(Boolean);
  return parts.length > 0 ? parts.join(' \u2014 ') : null;
}

const TINT = 'color-mix(in srgb, var(--theme-color) 7%, white)';

export default function Collage({ data }: { data: ResumeData }) {
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  // Tint-block section wrapper — the alternating horizontal offset follows the
  // rendered-section index that orderSections passes to function blocks.
  const tinted = (index: number, title: React.ReactNode, body: React.ReactNode) => (
    <section
      className={`rounded-xl p-7 ${index % 2 === 0 ? 'ml-0 mr-6' : 'ml-6 mr-0'}`}
      style={{ backgroundColor: TINT }}
    >
      <h2 className="text-base font-black tracking-tight text-gray-900">
        {title}
        <span
          className="block mt-2 h-1 w-20"
          style={{ backgroundColor: 'var(--theme-color)' }}
        />
        <span
          className="block mt-1 ml-10 h-1 w-12 opacity-40"
          style={{ backgroundColor: 'var(--theme-color)' }}
        />
      </h2>
      <div className="mt-5">{body}</div>
    </section>
  );

  const sectionBlocks = {
    personal: (i: number) => (
      <div>
        <header className="mb-10">
          {data.personalInfo.fullName && (
            <h1 className="text-5xl font-black tracking-tight text-gray-900 leading-none">
              {data.personalInfo.fullName}
            </h1>
          )}
          {data.personalInfo.jobTitle && (
            <p
              className="text-lg font-bold mt-3"
              style={{ color: 'var(--theme-color)' }}
            >
              {data.personalInfo.jobTitle}
            </p>
          )}
          {contact.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
              {contact.map((c, ci) => (
                <span key={ci}>{c}</span>
              ))}
            </div>
          )}
        </header>
        {data.summary &&
          tinted(i, 'Summary', <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>)}
      </div>
    ),

    experience:
      data.experience && data.experience.length > 0
        ? (i: number) =>
            tinted(
              i,
              'Experience',
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline gap-4">
                      <h3 className="font-bold text-gray-900">{exp.role}</h3>
                      {dateRange(exp.startDate, exp.endDate) && (
                        <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                          {dateRange(exp.startDate, exp.endDate)}
                        </span>
                      )}
                    </div>
                    {exp.company && (
                      <div
                        className="text-sm font-semibold"
                        style={{ color: 'var(--theme-color)' }}
                      >
                        {exp.company}
                      </div>
                    )}
                    {exp.description && (
                      <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-gray-600">
                        {exp.description.split(/\n|\r?\n/).filter(Boolean).map((line, i) => (
                          <li key={i}>{line.trim()}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )
        : null,

    education:
      data.education && data.education.length > 0
        ? (i: number) =>
            tinted(
              i,
              'Education',
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                    <div className="text-sm text-gray-600">{edu.school}</div>
                    {edu.graduationYear && (
                      <div
                        className="text-xs font-bold mt-1"
                        style={{ color: 'var(--theme-color)' }}
                      >
                        {edu.graduationYear}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
        : null,

    skills:
      data.skills && data.skills.length > 0
        ? (i: number) =>
            tinted(
              i,
              'Skills',
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <span
                    key={skill.id}
                    className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-gray-200"
                    style={{ color: 'var(--theme-color)' }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )
        : null,

    projects:
      data.showProjects && data.projects && data.projects.length > 0
        ? (i: number) =>
            tinted(
              i,
              'Projects',
              <div className="space-y-4">
                {data.projects.map(project => (
                  <div key={project.id}>
                    <div className="flex justify-between items-baseline gap-4">
                      <h3 className="font-bold text-gray-900 text-sm">{project.name}</h3>
                      {project.link && (
                        <span
                          className="text-xs font-semibold whitespace-nowrap"
                          style={{ color: 'var(--theme-color)' }}
                        >
                          {project.link}
                        </span>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )
        : null,

    certifications:
      data.showCertifications && data.certifications && data.certifications.length > 0
        ? (i: number) =>
            tinted(
              i,
              'Certifications',
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id} className="flex justify-between items-baseline gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                      {cert.issuer && <div className="text-sm text-gray-600">{cert.issuer}</div>}
                    </div>
                    {cert.date && (
                      <span
                        className="text-xs font-bold whitespace-nowrap"
                        style={{ color: 'var(--theme-color)' }}
                      >
                        {cert.date}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )
        : null,

    references:
      data.showReferences && data.references && data.references.length > 0
        ? (i: number) =>
            tinted(
              i,
              'References',
              <div className="grid grid-cols-2 gap-5">
                {data.references.map(ref => (
                  <div key={ref.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="font-bold text-gray-900 text-sm">{ref.name}</div>
                    <div className="text-sm text-gray-600">
                      {[ref.title, ref.company].filter(Boolean).join(' \u00B7 ')}
                    </div>
                    {ref.contact && <div className="text-xs text-gray-500 mt-1">{ref.contact}</div>}
                  </div>
                ))}
              </div>
            )
        : null,
  };

  const customBlocks = (data.customSections || [])
    .filter((section) => section.items && section.items.length > 0)
    .map(
      (section) => (i: number) =>
        tinted(
          i,
          section.title,
          <div className="space-y-4">
            {section.items.map(item => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                  {item.date && (
                    <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {item.date}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <div className="text-sm text-gray-600 italic">{item.subtitle}</div>
                )}
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )
    );

  return (
    <div className="font-sans w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 px-12 py-12">
      {/* Layered tint blocks, alternating horizontal offset (identity header lives in the personal block) */}
      <div className="space-y-6">
        {orderSections(data, sectionBlocks, customBlocks)}
      </div>
    </div>
  );
}
