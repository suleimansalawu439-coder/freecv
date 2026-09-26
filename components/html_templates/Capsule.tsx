import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

export default function Capsule({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const SectionHead = ({ title }: { title: string }) => (
    <h2
      className="text-[11px] font-bold uppercase tracking-wider text-gray-800 pb-1.5 mb-2.5 border-b-2"
      style={{ borderColor: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto">
      {/* Full-width header */}
      {orderSections(data, {
        personal: (
      <header className="px-8 pt-8 pb-5 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pi.fullName}</h1>
        {pi.jobTitle && (
          <p className="text-sm font-medium text-gray-600 mt-1" style={{ color: 'var(--theme-color)' }}>
            {pi.jobTitle}
          </p>
        )}
        {contacts.length > 0 && (
          <p className="text-xs text-gray-500 mt-1.5">{contacts.join(' · ')}</p>
        )}
      </header>
        ),
      })}

      {/* Even 50/50 body */}
      <div className="flex gap-7 px-8 pb-8">
        {/* LEFT column */}
        <div className="w-1/2 space-y-5">
          {orderSections(data, {
            experience: data.experience.length > 0 && (
            <section>
              <SectionHead title="Experience" />
              <div className="space-y-4">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                      {(exp.startDate || exp.endDate) && (
                        <span className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                      )}
                    </div>
                    {exp.company && (
                      <p className="text-[13px] font-medium" style={{ color: 'var(--theme-color)' }}>{exp.company}</p>
                    )}
                    {exp.description && (
                      <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[13px] text-gray-700">
                        {exp.description.split(/\n|\r\n/).filter(l => l.trim()).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
            ),

            projects: data.showProjects && data.projects.length > 0 && (
            <section>
              <SectionHead title="Projects" />
              <div className="space-y-3">
                {data.projects.map(p => (
                  <div key={p.id}>
                    <p className="text-sm font-bold text-gray-900">{p.name}</p>
                    {p.link && <p className="text-xs text-gray-500">{p.link}</p>}
                    {p.description && <p className="text-[13px] text-gray-700 mt-0.5">{p.description}</p>}
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
                <SectionHead title={section.title} />
                <div className="space-y-3">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline gap-2">
                        <p className="text-sm font-bold text-gray-900">{item.title}</p>
                        {item.date && <span className="text-xs text-gray-500 whitespace-nowrap">{item.date}</span>}
                      </div>
                      {item.subtitle && <p className="text-[13px] text-gray-600 italic">{item.subtitle}</p>}
                      {item.description && <p className="text-[13px] text-gray-700 mt-0.5">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        {/* RIGHT column */}
        <div className="w-1/2 space-y-5">
          {orderSections(data, {
            personal: data.summary && (
            <section>
              <SectionHead title="Summary" />
              <p className="text-[13px] leading-relaxed text-gray-700">{data.summary}</p>
            </section>
            ),

            skills: data.skills.length > 0 && (
            <section>
              <SectionHead title="Skills" />
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {data.skills.map(s => (
                  <p key={s.id} className="text-[13px] text-gray-700">
                    <span className="mr-1.5" style={{ color: 'var(--theme-color)' }}>•</span>{s.name}
                  </p>
                ))}
              </div>
            </section>
            ),

            education: data.education.length > 0 && (
            <section>
              <SectionHead title="Education" />
              <div className="space-y-3">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                    {edu.school && <p className="text-[13px] text-gray-600">{edu.school}</p>}
                    {edu.graduationYear && <p className="text-xs text-gray-500 mt-0.5">{edu.graduationYear}</p>}
                  </div>
                ))}
              </div>
            </section>
            ),

            certifications: data.showCertifications && data.certifications.length > 0 && (
            <section>
              <SectionHead title="Certifications" />
              <div className="space-y-2">
                {data.certifications.map(c => (
                  <div key={c.id}>
                    <p className="text-sm font-bold text-gray-900">{c.name}</p>
                    {(c.issuer || c.date) && (
                      <p className="text-xs text-gray-500">{[c.issuer, c.date].filter(Boolean).join(' · ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
            ),

            references: data.showReferences && data.references.length > 0 && (
            <section>
              <SectionHead title="References" />
              <div className="space-y-2.5">
                {data.references.map(r => (
                  <div key={r.id}>
                    <p className="text-sm font-bold text-gray-900">{r.name}</p>
                    {(r.title || r.company) && (
                      <p className="text-[13px] text-gray-600">{r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</p>
                    )}
                    {r.contact && <p className="text-xs text-gray-500">{r.contact}</p>}
                  </div>
                ))}
              </div>
            </section>
            ),
          })}
        </div>
      </div>
    </div>
  );
}
