import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const WARM = '#78716c';
const WARM_LINE = '#e7e2dc';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-base font-normal uppercase tracking-[0.22em] mt-14 mb-8" style={{ color: WARM }}>
      {children}
    </h2>
  );
}

export default function Calm({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-stone-800 p-[1.25in] mx-auto">
      {orderSections(data, {
        personal: (
          <>
      <header className="mb-6">
        {info.fullName && (
          <h1 className="text-4xl font-normal tracking-wide text-stone-900 leading-snug">{info.fullName}</h1>
        )}
        {info.jobTitle && (
          <p className="text-lg mt-4 font-normal" style={{ color: WARM }}>{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-sm text-stone-400 mt-5 leading-loose">{contact.join('   ·   ')}</p>
        )}
      </header>

      <div className="border-t" style={{ borderColor: WARM_LINE }} />

      {data.summary && (
        <section>
          <SectionTitle>Profile</SectionTitle>
          <p className="text-[15px] text-stone-700 leading-[2.1]">{data.summary}</p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section>
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-12">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="text-xl font-normal text-stone-900 leading-snug">{exp.role}</h3>
                <p className="text-sm mt-2.5" style={{ color: WARM }}>
                  {exp.company}
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-stone-400">
                      {'   ·   '}{exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                    </span>
                  )}
                </p>
                {exp.description && (
                  <ul className="mt-4 space-y-2.5">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-[15px] text-stone-700 leading-[2]">
                        {line.trim()}
                      </li>
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
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-8">
            {data.education.map((edu) => (
              <div key={edu.id}>
                {edu.school && <p className="text-[15px] text-stone-900">{edu.school}</p>}
                <p className="text-sm text-stone-500 mt-1.5 leading-relaxed">
                  {edu.degree}
                  {edu.graduationYear && <span>{'   ·   '}{edu.graduationYear}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="space-y-3">
            {data.skills.map((skill) => (
              <p key={skill.id} className="text-[15px] text-stone-700 leading-relaxed pl-6 relative">
                <span className="absolute left-0 top-2.5 w-2 h-px" style={{ backgroundColor: WARM }} />
                {skill.name}
              </p>
            ))}
          </div>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-10">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-lg font-normal text-stone-900">
                  {proj.name}
                  {proj.link && <span className="text-sm text-stone-400"> — {proj.link}</span>}
                </h3>
                {proj.description && (
                  <p className="text-[15px] text-stone-700 mt-3 leading-[2]">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionTitle>Certifications</SectionTitle>
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-[15px] text-stone-700 leading-relaxed">
                <span className="text-stone-900">{cert.name}</span>
                {cert.issuer && <span className="text-stone-500"> — {cert.issuer}</span>}
                {cert.date && <span className="text-stone-400">{'   ·   '}{cert.date}</span>}
              </p>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section>
          <SectionTitle>References</SectionTitle>
          <div className="space-y-8">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-[15px] text-stone-900">{ref.name}</p>
                {(ref.title || ref.company) && (
                  <p className="text-sm text-stone-500 mt-1">
                    {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}
                  </p>
                )}
                {ref.contact && <p className="text-sm text-stone-400 mt-1">{ref.contact}</p>}
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
            <SectionTitle>{section.title}</SectionTitle>
            <div className="space-y-8">
              {section.items.map((item) => (
                <div key={item.id}>
                  {item.title && <h3 className="text-lg font-normal text-stone-900">{item.title}</h3>}
                  {(item.subtitle || item.date) && (
                    <p className="text-sm text-stone-500 mt-1.5">
                      {item.subtitle}{item.subtitle && item.date ? '   ·   ' : ''}{item.date}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-[15px] text-stone-700 mt-3 leading-[2]">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
