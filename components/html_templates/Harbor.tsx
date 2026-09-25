import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Harbor({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 flex mx-auto font-sans">
      {/* Left sidebar — theme color, name at top */}
      <aside
        className="w-[30%] shrink-0 text-white px-8 py-10"
        style={{ backgroundColor: 'var(--theme-color)' }}
      >
        <h1 className="text-3xl font-bold leading-tight mb-2">{info.fullName}</h1>
        {info.jobTitle && <p className="text-sm font-medium text-white/85 mb-8">{info.jobTitle}</p>}

        <div className="space-y-2 text-[13px] text-white/90 mb-10 break-words">
          {info.email && <p>{info.email}</p>}
          {info.phone && <p>{info.phone}</p>}
          {info.location && <p>{info.location}</p>}
          {info.website && <p>{info.website}</p>}
        </div>

        {data.skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs font-semibold bg-white/15 border border-white/25 px-2.5 py-1.5 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.customSections.map((section) => (
          <div key={section.id} className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <p className="text-[13px] font-bold">{item.title}</p>
                  {item.subtitle && <p className="text-xs text-white/80">{item.subtitle}</p>}
                  {item.date && <p className="text-xs text-white/70">{item.date}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}

        {data.showReferences && data.references.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4">
              References
            </h2>
            <div className="space-y-3">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <p className="text-[13px] font-bold">{ref.name}</p>
                  <p className="text-xs text-white/80">
                    {ref.title}
                    {ref.company && `, ${ref.company}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main column — timeline experience */}
      <main className="flex-1 px-10 py-10 min-w-0">
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Profile
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              Experience
            </h2>
            <div className="relative pl-6 border-l-2 border-gray-200">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative mb-7 last:mb-0">
                  <span
                    className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: 'var(--theme-color)' }}
                  />
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

        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.graduationYear}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Projects
            </h2>
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
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Certifications
            </h2>
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
      </main>
    </div>
  );
}
