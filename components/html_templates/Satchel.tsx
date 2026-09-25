import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Satchel({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const CardHead = ({ title }: { title: string }) => (
    <h2
      className="text-xs font-bold uppercase tracking-wider pb-2 mb-4 border-b border-gray-200"
      style={{ color: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-8 py-8">
      {/* Plain header */}
      <header className="mb-5 px-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pi.fullName}</h1>
        {pi.jobTitle && <p className="text-sm font-medium text-gray-600 mt-1">{pi.jobTitle}</p>}
        {contacts.length > 0 && (
          <p className="text-xs text-gray-500 mt-1.5">{contacts.join(' · ')}</p>
        )}
      </header>

      <div className="flex flex-col gap-4">
        {data.summary && (
          <section className="rounded-lg border border-gray-200 bg-slate-50/60 shadow-sm p-6">
            <CardHead title="Summary" />
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="rounded-lg border border-gray-200 bg-slate-50/60 shadow-sm p-6">
            <CardHead title="Experience" />
            <div className="divide-y divide-gray-200">
              {data.experience.map(exp => (
                <div key={exp.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                    )}
                  </div>
                  {exp.company && <p className="text-[13px] font-medium text-gray-600">{exp.company}</p>}
                  {exp.description && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-[13px] text-gray-700">
                      {exp.description.split(/\n|\r\n/).filter(l => l.trim()).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="rounded-lg border border-gray-200 bg-slate-50/60 shadow-sm p-6">
            <CardHead title="Skills" />
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map(s => (
                <span key={s.id} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="rounded-lg border border-gray-200 bg-slate-50/60 shadow-sm p-6">
            <CardHead title="Education" />
            <div className="divide-y divide-gray-200">
              {data.education.map(edu => (
                <div key={edu.id} className="py-2.5 first:pt-0 last:pb-0">
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  {edu.school && <p className="text-[13px] text-gray-600">{edu.school}</p>}
                  {edu.graduationYear && <p className="text-xs text-gray-500 mt-0.5">{edu.graduationYear}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects.length > 0 && (
          <section className="rounded-lg border border-gray-200 bg-slate-50/60 shadow-sm p-6">
            <CardHead title="Projects" />
            <div className="divide-y divide-gray-200">
              {data.projects.map(p => (
                <div key={p.id} className="py-2.5 first:pt-0 last:pb-0">
                  <p className="text-sm font-bold text-gray-900">
                    {p.name}
                    {p.link && <span className="font-normal text-xs text-gray-500"> — {p.link}</span>}
                  </p>
                  {p.description && <p className="text-[13px] text-gray-700 mt-0.5">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <section className="rounded-lg border border-gray-200 bg-slate-50/60 shadow-sm p-6">
            <CardHead title="Certifications" />
            <div className="divide-y divide-gray-200">
              {data.certifications.map(c => (
                <div key={c.id} className="py-2 first:pt-0 last:pb-0">
                  <p className="text-[13px] text-gray-700">
                    <span className="font-bold text-gray-900">{c.name}</span>
                    {(c.issuer || c.date) && (
                      <span className="text-gray-500"> — {[c.issuer, c.date].filter(Boolean).join(', ')}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references.length > 0 && (
          <section className="rounded-lg border border-gray-200 bg-slate-50/60 shadow-sm p-6">
            <CardHead title="References" />
            <div className="divide-y divide-gray-200">
              {data.references.map(r => (
                <div key={r.id} className="py-2.5 first:pt-0 last:pb-0">
                  <p className="text-sm font-bold text-gray-900">{r.name}</p>
                  {(r.title || r.company) && (
                    <p className="text-[13px] text-gray-600">{r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</p>
                  )}
                  {r.contact && <p className="text-xs text-gray-500 mt-0.5">{r.contact}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections.length > 0 && data.customSections.map(section =>
          section.items && section.items.length > 0 ? (
            <section key={section.id} className="rounded-lg border border-gray-200 bg-slate-50/60 shadow-sm p-6">
              <CardHead title={section.title} />
              <div className="divide-y divide-gray-200">
                {section.items.map(item => (
                  <div key={item.id} className="py-2.5 first:pt-0 last:pb-0">
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
          ) : null
        )}
      </div>
    </div>
  );
}
