import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Tribunal({ data }: { data: ResumeData }) {
  let sectionNum = 0;
  const nextNum = () => String(++sectionNum).padStart(2, '0');

  const SectionHeader = ({ title }: { title: string }) => {
    const num = nextNum();
    return (
      <h2 className="uppercase text-xs font-bold tracking-widest mb-4">
        <span className="text-gray-400 mr-2">{num}</span>
        <span className="text-black">{title}</span>
      </h2>
    );
  };

  const contactBits = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location, data.personalInfo.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto p-[0.85in] font-sans text-gray-900">
      {/* Header */}
      <header className="mb-10">
        {data.personalInfo.fullName && (
          <h1 className="text-3xl font-bold text-black">{data.personalInfo.fullName}</h1>
        )}
        {data.personalInfo.jobTitle && (
          <p className="text-sm text-gray-600 mt-1">{data.personalInfo.jobTitle}</p>
        )}
        {contactBits.length > 0 && (
          <div className="flex justify-between text-sm text-gray-500 mt-3 border-t border-gray-200 pt-3">
            {contactBits.map((bit, i) => (
              <span key={i}>{bit}</span>
            ))}
          </div>
        )}
      </header>

      {/* Profile — 01 */}
      {data.summary && (
        <section className="mb-8">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}

      {/* Experience — 02 */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Experience" />
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-black">{exp.role}</div>
                {(exp.startDate || exp.endDate) && (
                  <div className="font-mono text-xs text-gray-500 whitespace-nowrap">
                    {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                  </div>
                )}
              </div>
              {exp.company && <div className="text-sm text-gray-700 mt-0.5">{exp.company}</div>}
              {exp.description && (
                <ul className="mt-2 space-y-1.5">
                  {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                    <li key={i} className="flex text-sm text-gray-700 leading-relaxed">
                      <span className="mr-2 text-gray-400">•</span>
                      <span>{line.trim()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education — 03 */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Education" />
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="font-bold text-black">{edu.degree}</div>
              <div className="text-sm text-gray-700">
                {[edu.school, edu.graduationYear].filter(Boolean).join(' · ')}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills — 04, dot leaders */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Skills" />
          {data.skills.map((skill) => (
            <div key={skill.id} className="flex items-baseline mb-1.5">
              <span className="text-sm text-black">{skill.name}</span>
              <span className="flex-1 border-b border-dotted border-gray-400 mx-3" />
            </div>
          ))}
        </section>
      )}

      {/* Projects — 05 */}
      {data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Projects" />
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="font-bold text-black text-sm">{proj.name}</div>
              {proj.description && <p className="text-sm text-gray-700 mt-0.5">{proj.description}</p>}
              {proj.link && <div className="font-mono text-xs text-gray-500">{proj.link}</div>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications — 06 */}
      {data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Certifications" />
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="font-bold text-sm text-black">{cert.name}</div>
              <div className="text-sm text-gray-700">
                {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* References — 07 */}
      {data.showReferences && data.references.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="References" />
          {data.references.map((ref) => (
            <div key={ref.id} className="mb-2">
              <div className="font-bold text-sm text-black">{ref.name}</div>
              <div className="text-sm text-gray-700">
                {[ref.title, ref.company].filter(Boolean).join(' · ')}
              </div>
              {ref.contact && <div className="text-sm text-gray-500">{ref.contact}</div>}
            </div>
          ))}
        </section>
      )}

      {/* Custom sections — 08+ */}
      {data.customSections.map((section) =>
        section.items && section.items.length > 0 ? (
          <section key={section.id} className="mb-8">
            <SectionHeader title={section.title} />
            {section.items.map((item) => (
              <div key={item.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-sm text-black">{item.title}</div>
                  {item.date && <div className="font-mono text-xs text-gray-500">{item.date}</div>}
                </div>
                {item.subtitle && <div className="text-sm text-gray-700">{item.subtitle}</div>}
                {item.description && <p className="text-sm text-gray-700 mt-0.5">{item.description}</p>}
              </div>
            ))}
          </section>
        ) : null
      )}
    </div>
  );
}
