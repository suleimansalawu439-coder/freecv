import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Brief({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const BriefHead = ({ title }: { title: string }) => (
    <h2 className="text-xs font-bold uppercase tracking-wide text-gray-800 pb-1.5 mb-3 border-b border-gray-200">
      {title}
    </h2>
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-8 py-8">
      {/* Name + clean contact row */}
      <header className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pi.fullName}</h1>
        {pi.jobTitle && <p className="text-sm font-medium text-gray-600 mt-1">{pi.jobTitle}</p>}
        {contacts.length > 0 && (
          <p className="text-xs text-gray-500 mt-1.5">{contacts.join(' · ')}</p>
        )}
      </header>

      {/* Executive summary box */}
      {data.summary && (
        <div className="bg-slate-100 rounded-r-md p-4 mb-6" style={{ borderLeft: '3px solid var(--theme-color)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Executive Summary</p>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6">
          <BriefHead title="Experience" />
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                  )}
                </div>
                {exp.company && <p className="text-[13px] font-medium text-gray-600">{exp.company}</p>}
                {exp.description && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-[13px] text-gray-700">
                    {exp.description.split(/\n|\r\n/).filter(l => l.trim()).slice(0, 3).map((line, i) => (
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
        <section className="mb-6">
          <BriefHead title="Skills" />
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
        <section className="mb-6">
          <BriefHead title="Education" />
          <div className="space-y-2.5">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline gap-2">
                <div>
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  {edu.school && <p className="text-[13px] text-gray-600">{edu.school}</p>}
                </div>
                {edu.graduationYear && <span className="text-xs text-gray-500 whitespace-nowrap">{edu.graduationYear}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-6">
          <BriefHead title="Projects" />
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
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <BriefHead title="Certifications" />
          <div className="space-y-1.5">
            {data.certifications.map(c => (
              <p key={c.id} className="text-[13px] text-gray-700">
                <span className="font-bold text-gray-900">{c.name}</span>
                {(c.issuer || c.date) && <span className="text-gray-500"> — {[c.issuer, c.date].filter(Boolean).join(', ')}</span>}
              </p>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-6">
          <BriefHead title="References" />
          <div className="space-y-2.5">
            {data.references.map(r => (
              <div key={r.id}>
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
          <section key={section.id} className="mb-6">
            <BriefHead title={section.title} />
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
        ) : null
      )}
    </div>
  );
}
