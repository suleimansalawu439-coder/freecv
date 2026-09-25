import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const num = (i: number) => String(i + 1).padStart(2, '0');

export default function Docket({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contacts = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const DocketHead = ({ index, title }: { index: number; title: string }) => (
    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3">
      <span className="font-mono" style={{ color: 'var(--theme-color)' }}>{num(index)}</span>
      <span className="text-gray-400"> — </span>
      {title}
    </h2>
  );

  const NumberedRow = ({ index, children }: { index: number; children: React.ReactNode }) => (
    <div className="flex gap-4">
      <span className="w-10 shrink-0 font-mono text-sm font-bold" style={{ color: 'var(--theme-color)' }}>
        {num(index)}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-10 py-8">
      {/* Docket header */}
      <header className="mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{pi.fullName}</h1>
        {pi.jobTitle && <p className="text-sm text-gray-600 mt-0.5">{pi.jobTitle}</p>}
        {contacts.length > 0 && (
          <p className="text-xs text-gray-500 mt-1 font-mono">{contacts.join(' · ')}</p>
        )}
      </header>

      {data.summary && (
        <section className="mt-6">
          <DocketHead index={0} title="Profile" />
          <p className="text-[13px] leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mt-6">
          <DocketHead index={1} title="Experience" />
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <NumberedRow key={exp.id} index={i}>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-xs text-gray-500 font-mono whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                  )}
                </div>
                {exp.company && <p className="text-[13px] font-medium text-gray-700">{exp.company}</p>}
                {exp.description && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[13px] text-gray-700">
                    {exp.description.split(/\n|\r\n/).filter(l => l.trim()).map((line, j) => (
                      <li key={j}>{line}</li>
                    ))}
                  </ul>
                )}
              </NumberedRow>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mt-6">
          <DocketHead index={2} title="Education" />
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <NumberedRow key={edu.id} index={i}>
                <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                {edu.school && <p className="text-[13px] text-gray-700">{edu.school}</p>}
                {edu.graduationYear && <p className="text-xs text-gray-500 font-mono mt-0.5">{edu.graduationYear}</p>}
              </NumberedRow>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mt-6">
          <DocketHead index={3} title="Skills" />
          <p className="text-[13px] text-gray-700">{data.skills.map(s => s.name).join(', ')}</p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mt-6">
          <DocketHead index={4} title="Projects" />
          <div className="space-y-3">
            {data.projects.map((p, i) => (
              <NumberedRow key={p.id} index={i}>
                <p className="text-sm font-bold text-gray-900">
                  {p.name}
                  {p.link && <span className="font-normal text-xs text-gray-500 font-mono"> — {p.link}</span>}
                </p>
                {p.description && <p className="text-[13px] text-gray-700 mt-0.5">{p.description}</p>}
              </NumberedRow>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mt-6">
          <DocketHead index={5} title="Certifications" />
          <div className="space-y-2.5">
            {data.certifications.map((c, i) => (
              <NumberedRow key={c.id} index={i}>
                <p className="text-[13px] text-gray-700">
                  <span className="font-bold text-gray-900">{c.name}</span>
                  {c.issuer && <span> — {c.issuer}</span>}
                  {c.date && <span className="text-gray-500 font-mono">, {c.date}</span>}
                </p>
              </NumberedRow>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className="mt-6">
          <DocketHead index={6} title="References" />
          <div className="space-y-2.5">
            {data.references.map(r => (
              <div key={r.id}>
                <p className="text-sm font-bold text-gray-900">{r.name}</p>
                {(r.title || r.company) && (
                  <p className="text-[13px] text-gray-700">{r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</p>
                )}
                {r.contact && <p className="text-xs text-gray-500 font-mono mt-0.5">{r.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.length > 0 && data.customSections.map((section, si) =>
        section.items && section.items.length > 0 ? (
          <section key={section.id} className="mt-6">
            <DocketHead index={7 + si} title={section.title} />
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <NumberedRow key={item.id} index={i}>
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    {item.date && <span className="text-xs text-gray-500 font-mono whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-[13px] text-gray-700 italic">{item.subtitle}</p>}
                  {item.description && <p className="text-[13px] text-gray-700 mt-0.5">{item.description}</p>}
                </NumberedRow>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
