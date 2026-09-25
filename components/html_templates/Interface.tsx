import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function DotRating({ level }: { level: number }) {
  return (
    <span className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: i <= level ? 'var(--theme-color)' : 'rgba(0,0,0,0.12)',
          }}
        />
      ))}
    </span>
  );
}

export default function Interface({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const initials = info.fullName
    ? info.fullName
        .split(' ')
        .map((w) => w.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 flex mx-auto">
      {/* Left sidebar — light tint */}
      <aside
        className="w-[30%] shrink-0 px-8 py-10"
        style={{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 8%, white)' }}
      >
        {initials && (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-8"
            style={{ backgroundColor: 'var(--theme-color)' }}
          >
            {initials}
          </div>
        )}

        <div className="space-y-2 text-[13px] text-gray-700 mb-10 break-words">
          {info.email && <p>{info.email}</p>}
          {info.phone && <p>{info.phone}</p>}
          {info.location && <p>{info.location}</p>}
          {info.website && <p>{info.website}</p>}
        </div>

        {data.skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">
              Skills
            </h2>
            <div className="space-y-3">
              {data.skills.map((skill, i) => (
                <div key={skill.id}>
                  <p className="text-[13px] font-medium text-gray-800 mb-1.5">{skill.name}</p>
                  <DotRating level={3 + ((i * 37) % 3)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-[13px] font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-[13px] text-gray-600">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.showReferences && data.references.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">
              References
            </h2>
            <div className="space-y-3">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <p className="text-[13px] font-bold text-gray-900">{ref.name}</p>
                  <p className="text-xs text-gray-600">
                    {ref.title}
                    {ref.company && `, ${ref.company}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main column */}
      <main className="flex-1 px-10 py-10 min-w-0">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-1">
            {info.fullName}
          </h1>
          {info.jobTitle && (
            <p className="text-base font-medium" style={{ color: 'var(--theme-color)' }}>
              {info.jobTitle}
            </p>
          )}
        </header>

        {data.summary && (
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
              Profile
            </h2>
            <div className="h-px bg-gray-200 mb-4" />
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
              Experience
            </h2>
            <div className="h-px bg-gray-200 mb-5" />
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: 'var(--theme-color)' }}
                  >
                    {exp.company}
                  </p>
                  {exp.description && (
                    <ul className="space-y-1 pl-4 list-disc marker:text-gray-300">
                      {exp.description
                        .split(/\n|\r?\n/)
                        .filter((l) => l.trim())
                        .map((line, i) => (
                          <li key={i} className="text-sm leading-relaxed text-gray-700">
                            {line}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
              Projects
            </h2>
            <div className="h-px bg-gray-200 mb-5" />
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
              Certifications
            </h2>
            <div className="h-px bg-gray-200 mb-5" />
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <p className="text-sm text-gray-800">
                    <span className="font-bold">{cert.name}</span>
                    {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                  </p>
                  <span className="text-xs text-gray-500">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections.map((section) => (
          <section key={section.id} className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
              {section.title}
            </h2>
            <div className="h-px bg-gray-200 mb-5" />
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                    {item.date && <span className="text-xs text-gray-500">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                  {item.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
