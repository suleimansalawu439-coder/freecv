import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

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

  const sections: { title: string; body: React.ReactNode }[] = [];

  if (data.summary) {
    sections.push({
      title: 'Summary',
      body: <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>,
    });
  }

  if (data.experience && data.experience.length > 0) {
    sections.push({
      title: 'Experience',
      body: (
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
      ),
    });
  }

  if (data.education && data.education.length > 0) {
    sections.push({
      title: 'Education',
      body: (
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
      ),
    });
  }

  if (data.skills && data.skills.length > 0) {
    sections.push({
      title: 'Skills',
      body: (
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
      ),
    });
  }

  if (data.showProjects && data.projects && data.projects.length > 0) {
    sections.push({
      title: 'Projects',
      body: (
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
      ),
    });
  }

  if (data.showCertifications && data.certifications && data.certifications.length > 0) {
    sections.push({
      title: 'Certifications',
      body: (
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
      ),
    });
  }

  if (data.showReferences && data.references && data.references.length > 0) {
    sections.push({
      title: 'References',
      body: (
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
      ),
    });
  }

  if (data.customSections && data.customSections.length > 0) {
    data.customSections.forEach(section => {
      if (section.items && section.items.length > 0) {
        sections.push({
          title: section.title,
          body: (
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
          ),
        });
      }
    });
  }

  return (
    <div className="font-sans w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 px-12 py-12">
      {/* Header */}
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
            {contact.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        )}
      </header>

      {/* Layered tint blocks, alternating horizontal offset */}
      <div className="space-y-6">
        {sections.map((s, i) => (
          <section
            key={s.title}
            className={`rounded-xl p-7 ${i % 2 === 0 ? 'ml-0 mr-6' : 'ml-6 mr-0'}`}
            style={{ backgroundColor: TINT }}
          >
            <h2 className="text-base font-black tracking-tight text-gray-900">
              {s.title}
              <span
                className="block mt-2 h-1 w-20"
                style={{ backgroundColor: 'var(--theme-color)' }}
              />
              <span
                className="block mt-1 ml-10 h-1 w-12 opacity-40"
                style={{ backgroundColor: 'var(--theme-color)' }}
              />
            </h2>
            <div className="mt-5">{s.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
