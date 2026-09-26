import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function CascadeHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-black uppercase tracking-[0.24em] mb-4 flex items-center gap-2">
      <span className="inline-block w-6 h-[3px]" style={{ backgroundColor: 'var(--theme-color)' }} />
      <span style={{ color: 'var(--theme-color)' }}>{title}</span>
    </h2>
  );
}

export default function Cascade({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  // Waterfall: each section steps further right
  const indents = ['pl-0', 'pl-6', 'pl-12', 'pl-[4.5rem]', 'pl-24', 'pl-28', 'pl-32'];

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-12 py-10">
      {orderSections(data, {
        personal: (
      <header className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-1">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base font-bold mb-3" style={{ color: 'var(--theme-color)' }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-600">{contactItems.join('  •  ')}</p>
        )}
        <div className="mt-5 flex gap-1">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: `${28 - i * 3}px`,
                backgroundColor: 'var(--theme-color)',
                opacity: 1 - i * 0.12,
              }}
            />
          ))}
        </div>
      </header>
        ),
      })}

      {/* Waterfall sections */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ backgroundColor: 'var(--theme-color)', opacity: 0.25 }}
        />
        {orderSections(data, {
          personal: data.summary && (
            <section className={`mb-8 ${indents[0]}`}>
              <CascadeHeader title="Profile" />
              <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
            </section>
          ),

          experience: data.experience.length > 0 && (
            <section className={`mb-8 ${indents[1]}`}>
              <CascadeHeader title="Experience" />
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold">{exp.role}</h3>
                      <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-4">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm font-semibold mb-2" style={{ color: 'var(--theme-color)' }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                          <li key={i} className="text-sm leading-relaxed text-gray-700">{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ),

          skills: data.skills.length > 0 && (
            <section className={`mb-8 ${indents[2]}`}>
              <CascadeHeader title="Skills" />
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                    style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          ),

          education: data.education.length > 0 && (
            <section className={`mb-8 ${indents[3]}`}>
              <CascadeHeader title="Education" />
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.school} <span className="text-gray-400">·</span> <span className="font-semibold" style={{ color: 'var(--theme-color)' }}>{edu.graduationYear}</span></p>
                  </div>
                ))}
              </div>
            </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
            <section className={`mb-8 ${indents[4]}`}>
              <CascadeHeader title="Projects" />
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-sm font-bold">{proj.name}</h3>
                      {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
            <section className={`mb-8 ${indents[5]}`}>
              <CascadeHeader title="Certifications" />
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold">{cert.name} <span className="font-normal text-gray-600">— {cert.issuer} · {cert.date}</span></p>
                  </div>
                ))}
              </div>
            </section>
          ),

          references: data.showReferences && data.references.length > 0 && (
            <section className={`mb-8 ${indents[6]}`}>
              <CascadeHeader title="References" />
              <div className="grid grid-cols-2 gap-4">
                {data.references.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold">{ref.name}</p>
                    <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                    <p className="text-xs text-gray-500">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </section>
          ),
        },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section, si) => (
            <section key={section.id} className={`mb-8 ${indents[Math.min(6, 4 + si)]}`}>
              <CascadeHeader title={section.title} />
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      {item.date && <span className="text-xs font-semibold text-gray-500">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                    {item.description && <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
