import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="uppercase text-xs font-bold tracking-[0.2em] text-[#111111] border-b border-black pb-1 mb-4">
      {title}
    </h2>
  );
}

export default function Consul({ data }: { data: ResumeData }) {
  const contactBits = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location, data.personalInfo.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto p-[0.85in] font-sans text-[#111111]">
      {orderSections(data, {
        personal: (
          <>
            {/* Header — huge name + one-baseline title/contact row */}
      <header className="mb-10">
        {data.personalInfo.fullName && (
          <h1 className="text-5xl font-black tracking-tight text-[#111111] leading-none">
            {data.personalInfo.fullName}
          </h1>
        )}
        {(data.personalInfo.jobTitle || contactBits.length > 0) && (
          <div className="flex flex-wrap items-baseline gap-x-3 text-sm mt-4">
            {data.personalInfo.jobTitle && (
              <span className="font-bold text-[#111111]">{data.personalInfo.jobTitle}</span>
            )}
            {contactBits.map((bit, i) => (
              <span key={i} className="text-gray-600">
                {i > 0 || data.personalInfo.jobTitle ? '· ' : ''}{bit}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Profile */}
      {data.summary && (
        <section className="mb-8">
          <SectionHeader title="Profile" />
          <p className="text-sm leading-relaxed text-gray-800">{data.summary}</p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Experience" />
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-baseline gap-4">
                <div className="font-bold text-[#111111]">{exp.role}</div>
                {exp.company && (
                  <div className="text-sm font-semibold text-gray-800 text-right uppercase tracking-wide whitespace-nowrap">
                    {exp.company}
                  </div>
                )}
              </div>
              {(exp.startDate || exp.endDate) && (
                <div className="text-xs text-gray-500 mt-0.5">
                  {exp.startDate}{exp.startDate && exp.endDate ? ' – ' : ''}{exp.endDate}
                </div>
              )}
              {exp.description && (
                <ul className="mt-2 space-y-1.5">
                  {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                    <li key={i} className="flex text-sm text-gray-800 leading-relaxed">
                      <span className="mr-2 text-gray-500">•</span>
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
          <SectionHeader title="Education" />
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline gap-4">
                <div className="font-bold text-[#111111]">{edu.degree}</div>
                {edu.school && (
                  <div className="text-sm font-semibold text-gray-800 text-right uppercase tracking-wide whitespace-nowrap">
                    {edu.school}
                  </div>
                )}
              </div>
              {edu.graduationYear && <div className="text-xs text-gray-500 mt-0.5">{edu.graduationYear}</div>}
            </div>
          ))}
        </section>
      ),

        skills: data.skills.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Skills" />
          <div className="grid grid-cols-3 gap-x-6 gap-y-2">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-sm text-gray-800">{skill.name}</div>
            ))}
          </div>
        </section>
      ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Projects" />
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="font-bold text-sm text-[#111111]">{proj.name}</div>
              {proj.description && <p className="text-sm text-gray-800 mt-0.5">{proj.description}</p>}
              {proj.link && <div className="text-sm text-gray-500">{proj.link}</div>}
            </div>
          ))}
        </section>
      ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Certifications" />
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <div className="font-bold text-sm text-[#111111]">{cert.name}</div>
                {cert.date && <div className="text-xs text-gray-500">{cert.date}</div>}
              </div>
              {cert.issuer && <div className="text-sm text-gray-800">{cert.issuer}</div>}
            </div>
          ))}
        </section>
      ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="References" />
          {data.references.map((ref) => (
            <div key={ref.id} className="mb-2">
              <div className="font-bold text-sm text-[#111111]">{ref.name}</div>
              <div className="text-sm text-gray-800">
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
          .map((section) => (
          <section key={section.id} className="mb-8">
            <SectionHeader title={section.title} />
            {section.items.map((item) => (
              <div key={item.id} className="mb-3">
                <div className="flex justify-between items-baseline gap-4">
                  <div className="font-bold text-sm text-[#111111]">{item.title}</div>
                  {item.date && <div className="text-xs text-gray-500 whitespace-nowrap">{item.date}</div>}
                </div>
                {item.subtitle && <div className="text-sm text-gray-800">{item.subtitle}</div>}
                {item.description && <p className="text-sm text-gray-800 mt-0.5">{item.description}</p>}
              </div>
            ))}
          </section>
          ))
      )}
    </div>
  );
}
