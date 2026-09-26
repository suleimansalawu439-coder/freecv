import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const DARK = '#111827';

export default function Bichrome({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-900 mx-auto flex">
      {/* Dark sidebar with theme highlights */}
      <aside className="w-[32%] shrink-0 text-white px-8 py-10 flex flex-col" style={{ backgroundColor: DARK }}>
        {orderSections(data, {
          personal: (
            <>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white mb-6"
          style={{ backgroundColor: 'var(--theme-color)' }}
        >
          {info.fullName?.charAt(0)}
        </div>

        <div className="space-y-2 text-sm mb-8">
          {info.email && <p className="break-all text-slate-300">{info.email}</p>}
          {info.phone && <p className="text-slate-300">{info.phone}</p>}
          {info.location && <p className="text-slate-300">{info.location}</p>}
          {info.website && <p className="break-all text-slate-300">{info.website}</p>}
        </div>
            </>
          ),

          skills: data.skills.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xs font-black uppercase tracking-widest mb-4 pb-2 border-b"
              style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                  style={{ backgroundColor: 'var(--theme-color)' }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          ),

          education: data.education.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xs font-black uppercase tracking-widest mb-4 pb-2 border-b"
              style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-sm font-bold text-white">{edu.degree}</p>
                  <p className="text-xs text-slate-400">{edu.school}</p>
                  <p className="text-xs font-bold mt-1" style={{ color: 'var(--theme-color)' }}>
                    {edu.graduationYear}
                  </p>
                </div>
              ))}
            </div>
          </div>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xs font-black uppercase tracking-widest mb-4 pb-2 border-b"
              style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
            >
              Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm font-bold text-white">{cert.name}</p>
                  <p className="text-xs text-slate-400">
                    {cert.issuer}
                    {cert.date && ` · ${cert.date}`}
                  </p>
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
            <h2
              className="text-xs font-black uppercase tracking-widest mb-4 pb-2 border-b"
              style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
            >
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  {item.subtitle && <p className="text-xs italic text-slate-400">{item.subtitle}</p>}
                  {item.date && <p className="text-xs text-slate-400">{item.date}</p>}
                </div>
              ))}
            </div>
          </div>
          ))
        )}

      </aside>

      {/* Clean main column */}
      <main className="flex-1 px-10 py-10">
        {orderSections(data, {
          personal: (
            <>
        <header className="mb-2">
          <h1 className="text-4xl font-black tracking-tight">{info.fullName}</h1>
          {info.jobTitle && (
            <p className="text-lg font-bold mt-1" style={{ color: 'var(--theme-color)' }}>
              {info.jobTitle}
            </p>
          )}
          <div className="mt-4 h-1 w-20" style={{ backgroundColor: 'var(--theme-color)' }} />
        </header>

        {data.summary && (
          <section className="mt-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
              Profile
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
          </section>
        )}
            </>
          ),

          experience: data.experience.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold">{exp.role}</h3>
                    <span className="text-xs font-bold text-slate-400 whitespace-nowrap ml-3">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-bold mb-2" style={{ color: 'var(--theme-color)' }}>
                    {exp.company}
                  </p>
                  <ul className="space-y-1 list-disc pl-4">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter((l) => l.trim())
                      .map((line, i) => (
                        <li key={i} className="text-sm text-slate-600 leading-relaxed">
                          {line}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-sm font-bold">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-slate-500">({proj.link})</span>}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
          ),

          references: data.showReferences && data.references.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              References
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref) => (
                <div key={ref.id}>
                  <p className="text-sm font-bold">{ref.name}</p>
                  <p className="text-xs text-slate-600">
                    {ref.title}
                    {ref.company && `, ${ref.company}`}
                  </p>
                  {ref.contact && <p className="text-xs text-slate-500 mt-1">{ref.contact}</p>}
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
