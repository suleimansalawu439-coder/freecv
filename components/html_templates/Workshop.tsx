import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SidebarHead({ title }: { title: string }) {
  return <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FEF3C7]/70 mb-4">{title}</h2>;
}

function MainHead({ title }: { title: string }) {
  return <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#92400e] mb-5">{title}</h2>;
}

export default function Workshop({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills } = data;
  const hasCustomSections = data.customSections && data.customSections.length > 0;
  const showEducationInMain = !hasCustomSections;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 flex">
      {/* Left sidebar — warm craft identity */}
      <aside className="w-[30%] min-w-[30%] bg-[#92400e] text-[#FEF3C7] px-7 py-9 flex flex-col gap-9">
        <div>
          <SidebarHead title="Contact" />
          <div className="space-y-2.5 text-sm font-medium break-words">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <SidebarHead title="Tools & Skills" />
            <ul className="space-y-2">
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-start gap-2 text-sm font-medium">
                  <span className="text-[#FEF3C7] leading-5">▪</span>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <SidebarHead title="Process" />
          {hasCustomSections ? (
            <div className="space-y-5">
              {data.customSections!.map(
                (section) =>
                  section.items.length > 0 && (
                    <div key={section.id}>
                      <div className="text-xs font-bold uppercase tracking-wider mb-2">{section.title}</div>
                      <div className="space-y-2.5">
                        {section.items.map((item) => (
                          <div key={item.id}>
                            <div className="text-sm font-semibold">{item.title}</div>
                            {item.subtitle && <div className="text-xs text-[#FEF3C7]/70">{item.subtitle}</div>}
                            {item.date && <div className="text-xs text-[#FEF3C7]/70">{item.date}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            education.length > 0 && (
              <div className="space-y-3.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="text-sm font-semibold">{edu.degree}</div>
                    <div className="text-xs text-[#FEF3C7]/70">{edu.school}</div>
                    {edu.graduationYear && <div className="text-xs text-[#FEF3C7]/70">{edu.graduationYear}</div>}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </aside>

      {/* Main column */}
      <main className="w-[70%] px-10 py-9 space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#451a03] leading-tight">
            {personalInfo.fullName}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-lg font-semibold text-[#92400e] mt-1.5">{personalInfo.jobTitle}</p>
          )}
        </header>

        {summary && (
          <section>
            <MainHead title="Summary" />
            <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <MainHead title="Experience" />
            <div className="space-y-5">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="border border-[#F0DDB8] border-l-4 border-l-[#92400e] rounded-md p-5 bg-white shadow-sm break-inside-avoid"
                >
                  <h3 className="font-bold text-[#451a03]">{exp.role}</h3>
                  <div className="text-sm font-medium text-gray-600 mt-0.5 mb-2">
                    {exp.company}
                    <span className="text-gray-400 font-normal">
                      {'  ·  '}
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
                    {exp.description
                      .split(/\n|\r?\n/)
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {showEducationInMain && education.length > 0 && (
          <section>
            <MainHead title="Education" />
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm text-[#451a03]">{edu.degree}</h3>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                  {edu.graduationYear && <div className="text-xs font-semibold text-gray-500 mt-1">{edu.graduationYear}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects && data.projects.length > 0 && (
          <section>
            <MainHead title="Projects" />
            <div className="space-y-5">
              {data.projects.map((project) => (
                <div key={project.id} className="border-l-4 border-l-[#92400e] pl-4 break-inside-avoid">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-bold text-[#451a03]">{project.name}</h3>
                    {project.link && <span className="text-sm font-medium text-[#92400e] shrink-0">{project.link}</span>}
                  </div>
                  {project.description && <p className="text-sm text-gray-600 mt-1">{project.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications && data.certifications.length > 0 && (
          <section>
            <MainHead title="Certifications" />
            <div className="space-y-2.5">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <span className="font-bold text-[#451a03]">{cert.name}</span>
                  {(cert.issuer || cert.date) && (
                    <span className="text-gray-500">
                      {' — '}
                      {cert.issuer}
                      {cert.issuer && cert.date ? ', ' : ''}
                      {cert.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <section className="break-inside-avoid">
            <MainHead title="References" />
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref) => (
                <div key={ref.id} className="border-l-2 border-l-[#92400e] pl-4">
                  <h3 className="font-bold text-[#451a03]">{ref.name}</h3>
                  <div className="text-sm text-gray-600">
                    {ref.title}
                    {ref.title && ref.company ? ' @ ' : ''}
                    {ref.company}
                  </div>
                  {ref.contact && <div className="text-sm text-gray-500 mt-1">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
