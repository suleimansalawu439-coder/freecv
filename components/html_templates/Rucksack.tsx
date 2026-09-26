import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

export default function Rucksack({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const DenseHead = ({ title }: { title: string }) => (
    <h2 className="text-[11px] font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--theme-color)' }}>
      {title}
    </h2>
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto">
      {/* Spanning header */}
      {orderSections(data, {
        personal: (
          <header className="px-8 pt-7 pb-5 border-b border-gray-200">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pi.fullName}</h1>
            {pi.jobTitle && <p className="text-sm font-medium text-gray-600 mt-1">{pi.jobTitle}</p>}
            {contacts.length > 0 && (
              <p className="text-xs text-gray-500 mt-1.5">{contacts.join(' · ')}</p>
            )}
          </header>
        ),
      })}

      {/* 60/40 dense body */}
      <div className="flex gap-6 px-8 py-6">
        {/* LEFT 60% */}
        <div className="w-[60%] space-y-5">
          {orderSections(data, {
            personal: data.summary && (
              <section>
                <DenseHead title="Summary" />
                <p className="text-[13px] leading-snug text-gray-700">{data.summary}</p>
              </section>
            ),

            experience: data.experience.length > 0 && (
              <section>
                <DenseHead title="Experience" />
              <div className="space-y-3">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug">{exp.role}</h3>
                    {(exp.company || exp.startDate || exp.endDate) && (
                      <div className="flex justify-between items-baseline gap-2">
                        {exp.company && <p className="text-[13px] text-gray-600">{exp.company}</p>}
                        {(exp.startDate || exp.endDate) && (
                          <span className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                        )}
                      </div>
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
                <DenseHead title="Projects" />
              <div className="space-y-2.5">
                {data.projects.map(p => (
                  <div key={p.id}>
                    <p className="text-sm font-bold text-gray-900">
                      {p.name}
                      {p.link && <span className="font-normal text-xs text-gray-500"> — {p.link}</span>}
                    </p>
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
                  <DenseHead title={section.title} />
                  <div className="space-y-2.5">
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

        {/* RIGHT 40% */}
        <div className="w-[40%] space-y-5">
          {orderSections(data, {
            skills: data.skills.length > 0 && (
              <section>
                <DenseHead title="Skills" />
              <div>
                {data.skills.map((s, i) => (
                  <div key={s.id} className="mb-2.5">
                    <p className="text-xs text-gray-700 mb-1">{s.name}</p>
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div
                        className="h-1 rounded-full"
                        style={{ width: `${95 - (i % 4) * 12}%`, backgroundColor: 'var(--theme-color)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            ),

            education: data.education.length > 0 && (
              <section>
                <DenseHead title="Education" />
              <div className="space-y-2.5">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-[13px] font-bold text-gray-900 leading-snug">{edu.degree}</p>
                    {edu.school && <p className="text-xs text-gray-600 mt-0.5">{edu.school}</p>}
                    {edu.graduationYear && <p className="text-xs text-gray-500 mt-0.5">{edu.graduationYear}</p>}
                  </div>
                ))}
              </div>
            </section>
            ),

            certifications: data.showCertifications && data.certifications.length > 0 && (
              <section>
                <DenseHead title="Certifications" />
              <div className="space-y-2">
                {data.certifications.map(c => (
                  <div key={c.id}>
                    <p className="text-[13px] font-bold text-gray-900 leading-snug">{c.name}</p>
                    {(c.issuer || c.date) && (
                      <p className="text-xs text-gray-500 mt-0.5">{[c.issuer, c.date].filter(Boolean).join(' · ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
            ),

            references: data.showReferences && data.references.length > 0 && (
              <section>
                <DenseHead title="References" />
              <div className="space-y-2.5">
                {data.references.map(r => (
                  <div key={r.id}>
                    <p className="text-[13px] font-bold text-gray-900">{r.name}</p>
                    {(r.title || r.company) && (
                      <p className="text-xs text-gray-600 mt-0.5">{r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</p>
                    )}
                    {r.contact && <p className="text-xs text-gray-500 mt-0.5">{r.contact}</p>}
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
