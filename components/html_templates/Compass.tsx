import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

export default function Compass({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 flex mx-auto font-sans">
      {/* Left sidebar — navy */}
      <aside className="w-[28%] shrink-0 bg-blue-950 text-white px-7 py-10">
        {orderSections(data, {
          personal: (
            <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-4">
            Contact
          </h2>
          <div className="space-y-2 text-[13px] text-blue-50 break-words">
            {info.email && <p>{info.email}</p>}
            {info.phone && <p>{info.phone}</p>}
            {info.location && <p>{info.location}</p>}
            {info.website && <p>{info.website}</p>}
          </div>
            </div>
          ),

          skills: data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-4">
              Skills
            </h2>
            <div className="space-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-[13px] text-blue-50 mb-1.5">{skill.name}</p>
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map((d) => (
                      <span
                        key={d}
                        className={`w-2 h-2 rounded-full ${
                          d < 3 + (skill.name.length % 2) ? 'bg-white' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-4">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <p className="text-[13px] font-bold text-white">{item.title}</p>
                  {item.subtitle && <p className="text-xs text-blue-200">{item.subtitle}</p>}
                  {item.date && <p className="text-xs text-blue-300">{item.date}</p>}
                </div>
              ))}
            </div>
          </div>
          ))
        )}
      </aside>

      {/* Main column — minimal headers, colored company names */}
      <main className="flex-1 px-10 py-10 min-w-0">
        {orderSections(data, {
          personal: (
            <>
              <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-1">
            {info.fullName}
          </h1>
          {info.jobTitle && <p className="text-base text-gray-500">{info.jobTitle}</p>}
        </header>

        {data.summary && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Profile
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}
            </>
          ),

          experience: data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
              Experience
            </h2>
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
                    className="text-sm font-semibold mb-2"
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
        ),

          education: data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
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
        ),

          projects: data.showProjects && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
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
        ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
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
        ),

          references: data.showReferences && data.references.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              References
            </h2>
            <div className="space-y-3">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                  <p className="text-sm text-gray-600">
                    {ref.title}
                    {ref.company && `, ${ref.company}`}
                  </p>
                  {ref.contact && <p className="text-xs text-gray-500">{ref.contact}</p>}
                </div>
              ))}
            </div>
          </section>
          ),
        })}
      </main>
    </div>
  );
}
