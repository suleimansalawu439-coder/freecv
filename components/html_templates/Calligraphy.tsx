import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function Calligraphy({ data }: { data: ResumeData }) {
  const { personalInfo } = data;
  const contactParts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(Boolean);

  const lines = (description: string) =>
    description ? description.split(/\n|\r\n/).filter((l) => l.trim()) : [];

  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-12 mb-6">
      <h2 className="font-serif italic text-[22px] text-gray-900 pb-2 border-b border-gray-300">
        {children}
      </h2>
    </div>
  );

  const name = personalInfo.fullName || '';

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto px-16 py-16 font-serif text-gray-800 leading-relaxed">
      {/* Header — swash name */}
      <header className="text-center">
        {name && (
          <h1 className="font-serif italic text-5xl text-gray-900 tracking-wide">
            <span className="text-6xl">{name.charAt(0)}</span>
            {name.slice(1)}
          </h1>
        )}
        {personalInfo.jobTitle && (
          <p className="mt-3 font-serif italic text-lg text-gray-500">{personalInfo.jobTitle}</p>
        )}
        {contactParts.length > 0 && (
          <p className="mt-4 text-[13px] italic text-gray-500">{contactParts.join('  ·  ')}</p>
        )}
        <div className="mt-8 mx-auto w-40 border-t border-gray-300" />
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mt-10">
          <p className="text-[15px] leading-[1.9] text-gray-700 italic text-center">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section>
          <SectionHeader>Experience</SectionHeader>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif italic font-bold text-[17px] text-gray-900">{exp.role}</h3>
                  <span className="text-[12px] italic text-gray-500 whitespace-nowrap">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mt-1">{exp.company}</p>
                <ul className="mt-3 space-y-1.5">
                  {lines(exp.description).map((line, i) => (
                    <li key={i} className="flex text-[14px] leading-[1.8] text-gray-700">
                      <span className="mr-3 text-gray-400">✦</span>
                      <span>{line.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section>
          <SectionHeader>Education</SectionHeader>
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-serif italic font-bold text-[16px] text-gray-900">{edu.degree}</h3>
                  <p className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mt-1">{edu.school}</p>
                </div>
                {edu.graduationYear && (
                  <span className="text-[12px] italic text-gray-500 whitespace-nowrap">{edu.graduationYear}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills — italic inline list */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <SectionHeader>Skills</SectionHeader>
          <p className="text-[14px] italic leading-loose text-gray-700 text-center">
            {data.skills.map((skill) => skill.name).join('   ·   ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <section>
          <SectionHeader>Projects</SectionHeader>
          <div className="space-y-5">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-serif italic font-bold text-[16px] text-gray-900">
                  {project.name}
                  {project.link && (
                    <span className="font-normal text-[13px] text-gray-500"> — {project.link}</span>
                  )}
                </h3>
                {project.description && (
                  <p className="text-[14px] text-gray-700 leading-[1.8] mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader>Certifications</SectionHeader>
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-serif italic font-bold text-[16px] text-gray-900">{cert.name}</h3>
                  {cert.issuer && <p className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mt-1">{cert.issuer}</p>}
                </div>
                {cert.date && (
                  <span className="text-[12px] italic text-gray-500 whitespace-nowrap">{cert.date}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {data.showReferences && data.references && data.references.length > 0 && (
        <section>
          <SectionHeader>References</SectionHeader>
          <div className="grid grid-cols-2 gap-8">
            {data.references.map((ref) => (
              <div key={ref.id} className="text-center">
                <h3 className="font-serif italic font-bold text-[16px] text-gray-900">{ref.name}</h3>
                <p className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mt-1">
                  {ref.title}
                  {ref.company && ` · ${ref.company}`}
                </p>
                {ref.contact && <p className="text-[13px] italic text-gray-500 mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom sections */}
      {data.customSections &&
        data.customSections.map(
          (section) =>
            section.items &&
            section.items.length > 0 && (
              <section key={section.id}>
                <SectionHeader>{section.title}</SectionHeader>
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-serif italic font-bold text-[16px] text-gray-900">{item.title}</h3>
                        {item.date && (
                          <span className="text-[12px] italic text-gray-500 whitespace-nowrap">{item.date}</span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-[12px] uppercase tracking-[0.25em] text-gray-500 mt-1">{item.subtitle}</p>
                      )}
                      {item.description && (
                        <p className="text-[14px] text-gray-700 leading-[1.8] mt-1">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
        )}
    </div>
  );
}
