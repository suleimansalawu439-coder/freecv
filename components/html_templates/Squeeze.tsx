import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

export default function Squeeze({ data }: { data: ResumeData }) {
  const pi = data.personalInfo;
  const contactBits = [pi.email, pi.phone, pi.location, pi.website].filter(Boolean);

  const SectionHead = ({ title }: { title: string }) => (
    <h2 className="text-xs font-bold uppercase tracking-wider mt-4 mb-1" style={{ color: 'var(--theme-color)' }}>
      {title}
    </h2>
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto">
      <div className="h-[3px]" style={{ backgroundColor: 'var(--theme-color)' }} />
      <div className="px-8 py-6">
        {orderSections(data, {
          personal: (
            <>
              {/* Inline one-line header */}
              <div className="text-[15px] leading-snug">
                <span className="font-bold text-gray-900">{pi.fullName}</span>
                {pi.jobTitle && <span className="text-gray-700"> | {pi.jobTitle}</span>}
                {contactBits.length > 0 && <span className="text-gray-500"> | {contactBits.join(' · ')}</span>}
              </div>

              {data.summary && (
                <section>
                  <SectionHead title="Summary" />
                  <p className="text-[13px] leading-snug text-gray-700">{data.summary}</p>
                </section>
              )}
            </>
          ),

          experience: data.experience.length > 0 && (
          <section>
            <SectionHead title="Experience" />
            <div className="space-y-2">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-3">
                    <p className="text-[13px] leading-snug">
                      <span className="font-bold text-gray-900">{exp.role}</span>
                      {exp.company && <span className="text-gray-600"> — {exp.company}</span>}
                    </p>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                    )}
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-[13px] text-gray-700">
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

          education: data.education.length > 0 && (
          <section>
            <SectionHead title="Education" />
            <div className="space-y-1">
              {data.education.map(edu => (
                <p key={edu.id} className="text-[13px] text-gray-700">
                  <span className="font-bold text-gray-900">{edu.degree}</span>
                  {edu.school && <span> — {edu.school}</span>}
                  {edu.graduationYear && <span className="text-gray-500">, {edu.graduationYear}</span>}
                </p>
              ))}
            </div>
          </section>
          ),

          skills: data.skills.length > 0 && (
          <section>
            <SectionHead title="Skills" />
            <p className="text-[13px] text-gray-700">{data.skills.map(s => s.name).join(', ')}</p>
          </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionHead title="Projects" />
            <div className="space-y-1">
              {data.projects.map(p => (
                <p key={p.id} className="text-[13px] text-gray-700">
                  <span className="font-bold text-gray-900">{p.name}</span>
                  {p.link && <span className="text-gray-500"> — {p.link}</span>}
                  {p.description && <span> — {p.description}</span>}
                </p>
              ))}
            </div>
          </section>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
          <section>
            <SectionHead title="Certifications" />
            <div className="space-y-1">
              {data.certifications.map(c => (
                <p key={c.id} className="text-[13px] text-gray-700">
                  {[c.name, c.issuer, c.date].filter(Boolean).join(' — ')}
                </p>
              ))}
            </div>
          </section>
          ),

          references: data.showReferences && data.references.length > 0 && (
          <section>
            <SectionHead title="References" />
            <div className="space-y-1">
              {data.references.map(r => (
                <p key={r.id} className="text-[13px] text-gray-700">
                  <span className="font-bold text-gray-900">{r.name}</span>
                  {(r.title || r.company) && (
                    <span> — {r.title}{r.title && r.company ? ' @ ' : ''}{r.company}</span>
                  )}
                  {r.contact && <span className="text-gray-500"> · {r.contact}</span>}
                </p>
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
              <div className="space-y-1.5">
                {section.items.map(item => (
                  <div key={item.id}>
                    <p className="text-[13px] leading-snug">
                      <span className="font-bold text-gray-900">{item.title}</span>
                      {item.subtitle && <span className="text-gray-600"> — {item.subtitle}</span>}
                      {item.date && <span className="text-xs text-gray-500"> ({item.date})</span>}
                    </p>
                    {item.description && <p className="text-[13px] text-gray-700 mt-0.5">{item.description}</p>}
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
