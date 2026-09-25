import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-center text-sm italic font-serif text-gray-800 mb-5 tracking-wide">
      — {title} —
    </h2>
  );
}

export default function Sonnet({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-gray-900 mx-auto px-[1.1in] py-[1in]">
      {/* Header — centered, verse-like */}
      <header className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-3 tracking-wide">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base italic text-gray-600 mb-4">{info.jobTitle}</p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-500 leading-relaxed">
            {contactItems.join('\u2003·\u2003')}
          </p>
        )}
      </header>

      {data.summary && (
        <section className="mb-14">
          <SectionHeader title="Profile" />
          <p className="text-[15px] leading-[2] text-center italic text-gray-800 max-w-[5.2in] mx-auto">
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-14">
          <SectionHeader title="Experience" />
          <div className="space-y-10">
            {data.experience.map((exp) => (
              <div key={exp.id} className="text-center">
                <h3 className="text-lg font-bold mb-1">{exp.role}</h3>
                <p className="text-sm italic text-gray-600 mb-1">{exp.company}</p>
                <p className="text-xs text-gray-500 mb-4 tracking-widest">{exp.startDate} — {exp.endDate}</p>
                {exp.description && (
                  <ul className="space-y-2 max-w-[5.2in] mx-auto">
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-[15px] leading-[1.9] text-gray-800">
                        {line.trim()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-14">
          <SectionHeader title="Education" />
          <div className="space-y-6 text-center">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-[15px] font-bold">{edu.degree}</p>
                <p className="text-sm italic text-gray-600">{edu.school}</p>
                <p className="text-xs text-gray-500 tracking-widest mt-1">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-14">
          <SectionHeader title="Skills" />
          <p className="text-[15px] leading-[2.2] text-center text-gray-800">
            {data.skills.map((s) => s.name).join('\u2003·\u2003')}
          </p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-14">
          <SectionHeader title="Projects" />
          <div className="space-y-8 text-center">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-[15px] font-bold mb-2">{proj.name}</h3>
                <p className="text-[15px] leading-[1.9] text-gray-800 max-w-[5.2in] mx-auto">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-14">
          <SectionHeader title="Certifications" />
          <div className="space-y-4 text-center">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <p className="text-[15px] font-bold">{cert.name}</p>
                <p className="text-sm italic text-gray-600">{cert.issuer} · {cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section className="mb-14">
          <SectionHeader title="References" />
          <div className="space-y-6 text-center">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-[15px] font-bold">{ref.name}</p>
                <p className="text-sm italic text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs text-gray-500 mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections.map((section) =>
        section.items.length > 0 ? (
          <section key={section.id} className="mb-14">
            <SectionHeader title={section.title} />
            <div className="space-y-8 text-center">
              {section.items.map((item) => (
                <div key={item.id}>
                  <h3 className="text-[15px] font-bold mb-1">{item.title}</h3>
                  {item.subtitle && <p className="text-sm italic text-gray-600">{item.subtitle}</p>}
                  {item.date && <p className="text-xs text-gray-500 tracking-widest mt-1">{item.date}</p>}
                  {item.description && (
                    <p className="text-[15px] leading-[1.9] text-gray-800 max-w-[5.2in] mx-auto mt-2">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
