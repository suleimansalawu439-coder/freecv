import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections, getOrderedSectionIds } from '@/lib/template-sections';

export default function Tribunal({ data }: { data: ResumeData }) {
  // Section numbers ("01", "02", …) follow the rendered display order, so they
  // stay consecutive when the user reorders or hides sections. The identity
  // header itself is unnumbered; only the Profile (summary) section takes a
  // number, mirroring the original behavior.
  const sectionNums: Record<string, string> = (() => {
    const rendered = getOrderedSectionIds(data).filter((id) => {
      switch (id) {
        case 'personal': return !!data.summary;
        case 'experience': return data.experience.length > 0;
        case 'education': return data.education.length > 0;
        case 'skills': return data.skills.length > 0;
        case 'projects': return data.showProjects && data.projects.length > 0;
        case 'certifications': return data.showCertifications && data.certifications.length > 0;
        case 'references': return data.showReferences && data.references.length > 0;
        default: return false;
      }
    });
    const map: Record<string, string> = {};
    rendered.forEach((id, n) => { map[id] = String(n + 1).padStart(2, '0'); });
    return map;
  })();
  const customBase = Object.keys(sectionNums).length;

  const SectionHeader = ({ num, title }: { num: string; title: string }) => {
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
      {orderSections(data, {
        personal: (
          <>
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
          <SectionHeader num={sectionNums.personal} title="Profile" />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section className="mb-8">
          <SectionHeader num={sectionNums.experience} title="Experience" />
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
        ),

        education: data.education.length > 0 && (
        <section className="mb-8">
          <SectionHeader num={sectionNums.education} title="Education" />
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="font-bold text-black">{edu.degree}</div>
              <div className="text-sm text-gray-700">
                {[edu.school, edu.graduationYear].filter(Boolean).join(' · ')}
              </div>
            </div>
          ))}
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section className="mb-8">
          <SectionHeader num={sectionNums.skills} title="Skills" />
          {data.skills.map((skill) => (
            <div key={skill.id} className="flex items-baseline mb-1.5">
              <span className="text-sm text-black">{skill.name}</span>
              <span className="flex-1 border-b border-dotted border-gray-400 mx-3" />
            </div>
          ))}
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <SectionHeader num={sectionNums.projects} title="Projects" />
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="font-bold text-black text-sm">{proj.name}</div>
              {proj.description && <p className="text-sm text-gray-700 mt-0.5">{proj.description}</p>}
              {proj.link && <div className="font-mono text-xs text-gray-500">{proj.link}</div>}
            </div>
          ))}
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <SectionHeader num={sectionNums.certifications} title="Certifications" />
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="font-bold text-sm text-black">{cert.name}</div>
              <div className="text-sm text-gray-700">
                {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
              </div>
            </div>
          ))}
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-8">
          <SectionHeader num={sectionNums.references} title="References" />
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
        ),
      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section, k) => (
          <section key={section.id} className="mb-8">
            <SectionHeader num={String(customBase + k + 1).padStart(2, '0')} title={section.title} />
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
        ))
      )}
    </div>
  );
}
