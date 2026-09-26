import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-4 mt-8 first:mt-0">
      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap">
        {title}
      </h2>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  );
}

export default function Slate({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-700 mx-auto px-14 py-12">
      {orderSections(data, {
        personal: (
          <>
            {/* Quiet slate header */}
            <header className="pb-6 border-b border-slate-200 mb-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{info.fullName}</h1>
              {info.jobTitle && (
                <p className="text-base font-semibold text-slate-500 mt-1">{info.jobTitle}</p>
              )}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-slate-500">
                {info.email && <span>{info.email}</span>}
                {info.phone && <span>{info.phone}</span>}
                {info.location && <span>{info.location}</span>}
                {info.website && <span>{info.website}</span>}
              </div>
            </header>

            {data.summary && (
              <section>
                <SectionHeader title="Summary" />
                <p className="text-sm leading-relaxed">{data.summary}</p>
              </section>
            )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section>
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[15px] font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-xs font-semibold text-slate-400 whitespace-nowrap ml-3">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed flex gap-2">
                        <span className="text-slate-300">–</span>
                        <span>{line}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section>
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-700 rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
          {/* Theme appears sparingly: one accent line */}
          <div className="mt-4 h-0.5 w-16" style={{ backgroundColor: 'var(--theme-color)' }} />
        </section>
        ),

        education: data.education.length > 0 && (
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-sm text-slate-500">{edu.school}</p>
                </div>
                <span className="text-xs font-semibold text-slate-400">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-slate-400">({proj.link})</span>}
                </div>
                <p className="text-sm mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm">
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-500"> · {cert.issuer}</span>}
                </p>
                <span className="text-xs font-semibold text-slate-400">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
        ),


        references: data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold text-slate-900">{ref.name}</p>
                <p className="text-xs text-slate-500">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-xs text-slate-400 mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
        ),
      },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
        <section key={section.id}>
          <SectionHeader title={section.title} />
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  {item.date && <span className="text-xs font-semibold text-slate-400">{item.date}</span>}
                </div>
                {item.subtitle && <p className="text-sm italic text-slate-500">{item.subtitle}</p>}
                {item.description && <p className="text-sm mt-1">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
          ))
      )}
    </div>
  );
}
