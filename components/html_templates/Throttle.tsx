import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Throttle({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const MicroHead = ({ title }: { title: string }) => (
    <h2 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--theme-color)' }}>
      {title}
    </h2>
  );

  const cell = 'border border-slate-200 rounded-lg p-3 bg-white';

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-600 mx-auto px-8 py-7">
      {/* Micro header */}
      <div className="flex justify-between items-baseline gap-4">
        <h1 className="text-lg font-bold text-slate-800 whitespace-nowrap">{pi.fullName}</h1>
        {contacts.length > 0 && (
          <p className="text-xs text-slate-500 text-right">{contacts.join(' · ')}</p>
        )}
      </div>
      <div className="border-b border-slate-300 mt-2 mb-5" />

      {data.summary && (
        <section className="mb-5">
          <MicroHead title="Summary" />
          <p className="text-[13px] leading-snug text-slate-600">{data.summary}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-5">
          <MicroHead title="Skills" />
          <div className="grid grid-cols-4 gap-1.5">
            {data.skills.map(s => (
              <div key={s.id} className="border border-slate-200 rounded px-2 py-1.5 text-xs font-medium text-slate-700 text-center">
                {s.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-5">
          <MicroHead title="Experience" />
          <div className="grid grid-cols-2 gap-3">
            {data.experience.map(exp => (
              <div key={exp.id} className={cell}>
                <h3 className="text-sm font-bold text-slate-800">{exp.role}</h3>
                {(exp.company || exp.startDate || exp.endDate) && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {exp.company}{exp.company && (exp.startDate || exp.endDate) ? ' · ' : ''}{exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}
                  </p>
                )}
                {exp.description && (
                  <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-slate-600">
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

      {data.education.length > 0 && (
        <section className="mb-5">
          <MicroHead title="Education" />
          <div className="grid grid-cols-2 gap-3">
            {data.education.map(edu => (
              <div key={edu.id} className={cell}>
                <p className="text-sm font-bold text-slate-800">{edu.degree}</p>
                {edu.school && <p className="text-xs text-slate-600 mt-0.5">{edu.school}</p>}
                {edu.graduationYear && <p className="text-xs text-slate-500 mt-0.5">{edu.graduationYear}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-5">
          <MicroHead title="Projects" />
          <div className="grid grid-cols-2 gap-3">
            {data.projects.map(p => (
              <div key={p.id} className={cell}>
                <p className="text-sm font-bold text-slate-800">{p.name}</p>
                {p.link && <p className="text-xs text-slate-500 mt-0.5">{p.link}</p>}
                {p.description && <p className="text-xs text-slate-600 mt-1">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-5">
          <MicroHead title="Certifications" />
          <div className="grid grid-cols-3 gap-3">
            {data.certifications.map(c => (
              <div key={c.id} className={cell}>
                <p className="text-xs font-bold text-slate-800">{c.name}</p>
                {(c.issuer || c.date) && (
                  <p className="text-xs text-slate-500 mt-0.5">{[c.issuer, c.date].filter(Boolean).join(' · ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-5">
          <MicroHead title="References" />
          <div className="grid grid-cols-2 gap-3">
            {data.references.map(r => (
              <div key={r.id} className={cell}>
                <p className="text-sm font-bold text-slate-800">{r.name}</p>
                {(r.title || r.company) && (
                  <p className="text-xs text-slate-600 mt-0.5">{r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</p>
                )}
                {r.contact && <p className="text-xs text-slate-500 mt-0.5">{r.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.length > 0 && data.customSections.map(section =>
        section.items && section.items.length > 0 ? (
          <section key={section.id} className="mb-5">
            <MicroHead title={section.title} />
            <div className="grid grid-cols-2 gap-3">
              {section.items.map(item => (
                <div key={item.id} className={cell}>
                  <p className="text-sm font-bold text-slate-800">{item.title}</p>
                  {(item.subtitle || item.date) && (
                    <p className="text-xs text-slate-500 mt-0.5">{[item.subtitle, item.date].filter(Boolean).join(' · ')}</p>
                  )}
                  {item.description && <p className="text-xs text-slate-600 mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
