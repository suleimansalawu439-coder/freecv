import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const BLUE = '#1d4ed8';

function dateRange(startDate?: string, endDate?: string) {
  const parts = [startDate, endDate].filter(Boolean);
  return parts.length > 0 ? parts.join(' \u2192 ') : null;
}

export default function Draft({ data }: { data: ResumeData }) {
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
      body: <p className="font-mono text-sm leading-relaxed text-gray-700">{data.summary}</p>,
    });
  }

  if (data.experience && data.experience.length > 0) {
    sections.push({
      title: 'Experience',
      body: (
        <div className="space-y-6">
          {data.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-bold text-gray-900">{exp.role}</h3>
                {dateRange(exp.startDate, exp.endDate) && (
                  <span
                    className="font-mono text-xs whitespace-nowrap"
                    style={{ color: BLUE }}
                  >
                    {dateRange(exp.startDate, exp.endDate)}
                  </span>
                )}
              </div>
              {exp.company && (
                <div className="font-mono text-xs uppercase tracking-widest text-gray-500 mt-0.5">
                  {exp.company}
                </div>
              )}
              {exp.description && (
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {exp.description.split(/\n|\r?\n/).filter(Boolean).map((line, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-mono" style={{ color: BLUE }}>
                        {'\u2013'}
                      </span>
                      <span>{line.trim()}</span>
                    </li>
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
            <div key={edu.id} className="flex items-baseline justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                {edu.school && (
                  <div className="font-mono text-xs uppercase tracking-widest text-gray-500">
                    {edu.school}
                  </div>
                )}
              </div>
              {edu.graduationYear && (
                <span className="font-mono text-xs whitespace-nowrap" style={{ color: BLUE }}>
                  {edu.graduationYear}
                </span>
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
              className="font-mono text-xs border border-blue-200 text-blue-900 px-3 py-1.5 rounded"
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
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-bold text-gray-900 text-sm">{project.name}</h3>
                {project.link && (
                  <span
                    className="font-mono text-xs whitespace-nowrap truncate"
                    style={{ color: BLUE }}
                  >
                    {project.link}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="font-mono text-xs text-gray-700 mt-1 leading-relaxed">
                  {project.description}
                </p>
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
            <div key={cert.id} className="flex items-baseline justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                {cert.issuer && (
                  <div className="font-mono text-xs text-gray-500">{cert.issuer}</div>
                )}
              </div>
              {cert.date && (
                <span className="font-mono text-xs whitespace-nowrap" style={{ color: BLUE }}>
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
        <div className="grid grid-cols-2 gap-4">
          {data.references.map(ref => (
            <div key={ref.id} className="border border-blue-200 rounded p-3">
              <div className="font-bold text-gray-900 text-sm">{ref.name}</div>
              <div className="font-mono text-xs text-gray-500">
                {[ref.title, ref.company].filter(Boolean).join(' @ ')}
              </div>
              {ref.contact && (
                <div className="font-mono text-xs mt-1" style={{ color: BLUE }}>
                  {ref.contact}
                </div>
              )}
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
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                    {item.date && (
                      <span className="font-mono text-xs whitespace-nowrap" style={{ color: BLUE }}>
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <div className="font-mono text-xs text-gray-500">{item.subtitle}</div>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-700 mt-1">{item.description}</p>
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
    <div
      className="font-sans w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 px-12 py-12"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(29,78,216,0.05) 0, rgba(29,78,216,0.05) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, rgba(29,78,216,0.05) 0, rgba(29,78,216,0.05) 1px, transparent 1px, transparent 24px)',
      }}
    >
      {/* Blueprint header */}
      <header className="mb-12">
        {data.personalInfo.fullName && (
          <h1 className="font-mono text-4xl font-bold uppercase tracking-wide text-gray-900">
            {data.personalInfo.fullName}
          </h1>
        )}
        <div className="h-px w-full mt-4 mb-4" style={{ backgroundColor: BLUE }} />
        {data.personalInfo.jobTitle && (
          <p className="font-mono text-sm uppercase tracking-widest" style={{ color: BLUE }}>
            {data.personalInfo.jobTitle}
          </p>
        )}
        {contact.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-gray-600">
            {contact.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        )}
      </header>

      {/* Numbered spec-sheet sections */}
      <div className="space-y-10">
        {sections.map((s, i) => (
          <section key={s.title}>
            <h2
              className="font-mono text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: BLUE }}
            >
              {String(i + 1).padStart(2, '0')} / {s.title}
            </h2>
            {s.body}
          </section>
        ))}
      </div>
    </div>
  );
}
