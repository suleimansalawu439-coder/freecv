import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

export default function OpEd({ data }: { data: ResumeData }) {
  const { personalInfo } = data;
  const contactParts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(Boolean);

  const lines = (description: string) =>
    description ? description.split(/\n|\r\n/).filter((l) => l.trim()) : [];

  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="border-b-2 border-[#1a1a1a] pb-2 mb-5 mt-10">
      <h2 className="font-serif text-xl font-bold text-[#1a1a1a] tracking-tight">{children}</h2>
    </div>
  );

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto p-12 font-serif text-gray-700 leading-relaxed">
      {orderSections(data, {
        personal: (
          <>
      {/* Masthead */}
      <header className="mb-2">
        {personalInfo.jobTitle && (
          <p
            className="text-xs font-bold uppercase tracking-[0.35em] mb-4"
            style={{ color: 'var(--theme-color)' }}
          >
            {personalInfo.jobTitle}
          </p>
        )}
        <h1 className="text-5xl font-black text-[#1a1a1a] leading-[1.05] tracking-tight">
          {personalInfo.fullName}
        </h1>
        {contactParts.length > 0 && (
          <p className="mt-4 text-sm text-gray-600 italic">{contactParts.join('  ·  ')}</p>
        )}
      </header>

      <div className="border-b-4 border-[#1a1a1a] mb-2" />

      {/* Summary — the lede */}
      {data.summary && (
        <section className="mt-8">
          <p className="text-[15px] leading-[1.75] text-gray-700 first-letter:font-bold first-letter:text-[#1a1a1a]">
            {data.summary}
          </p>
        </section>
      )}
          </>
        ),

        experience: data.experience && data.experience.length > 0 && (
        <section>
          <SectionHeader>Experience</SectionHeader>
          <div className="space-y-7">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-bold text-[#1a1a1a]">{exp.role}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-sm italic text-gray-600 mb-3">{exp.company}</p>
                <ul className="space-y-2">
                  {lines(exp.description).map((line, i) => (
                    <li key={i} className="flex text-[14px] leading-snug text-gray-700">
                      <span className="font-black text-[#1a1a1a] mr-3">—</span>
                      <span>{line.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education && data.education.length > 0 && (
        <section>
          <SectionHeader>Education</SectionHeader>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-[15px] font-bold text-[#1a1a1a]">{edu.degree}</h3>
                  <p className="text-sm italic text-gray-600">{edu.school}</p>
                </div>
                {edu.graduationYear && (
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">
                    {edu.graduationYear}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills && data.skills.length > 0 && (
        <section>
          <SectionHeader>Skills</SectionHeader>
          <p className="text-[14px] leading-loose text-gray-700">
            {data.skills.map((skill, i) => (
              <React.Fragment key={skill.id}>
                <span className="font-bold text-[#1a1a1a]">{skill.name}</span>
                {i < data.skills.length - 1 && <span className="text-gray-400">; </span>}
              </React.Fragment>
            ))}
          </p>
        </section>
        ),

        projects: data.showProjects && data.projects && data.projects.length > 0 && (
        <section>
          <SectionHeader>Projects</SectionHeader>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-[15px] font-bold text-[#1a1a1a]">
                  {project.name}
                  {project.link && <span className="font-normal italic text-gray-500 text-sm"> — {project.link}</span>}
                </h3>
                {project.description && (
                  <p className="text-[14px] text-gray-700 leading-relaxed mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader>Certifications</SectionHeader>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-[15px] font-bold text-[#1a1a1a]">{cert.name}</h3>
                  {cert.issuer && <p className="text-sm italic text-gray-600">{cert.issuer}</p>}
                </div>
                {cert.date && (
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references && data.references.length > 0 && (
        <section>
          <SectionHeader>References</SectionHeader>
          <div className="grid grid-cols-2 gap-6">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <h3 className="text-[15px] font-bold text-[#1a1a1a]">{ref.name}</h3>
                <p className="text-sm italic text-gray-600">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-sm text-gray-600">{ref.contact}</p>}
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
                <SectionHeader>{section.title}</SectionHeader>
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-[15px] font-bold text-[#1a1a1a]">{item.title}</h3>
                        {item.date && (
                          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && <p className="text-sm italic text-gray-600">{item.subtitle}</p>}
                      {item.description && (
                        <p className="text-[14px] text-gray-700 leading-relaxed mt-1">{item.description}</p>
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
