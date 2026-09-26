import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const labelClass = 'text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--theme-color)] mb-6';

export default function Atelier({ data }: { data: ResumeData }) {
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="font-sans px-20 py-24 bg-white text-[#1c1c1c] min-h-[1056px] w-full max-w-[816px] mx-auto">
      {/* Header */}
      {orderSections(data, {
        personal: (
          <>
      <header className="mb-20">
        {data.personalInfo.profilePicture && (
          <img
            src={data.personalInfo.profilePicture}
            alt="Profile"
            className="w-24 h-24 object-cover grayscale mb-10"
          />
        )}
        <h1 className="text-6xl font-light tracking-wide leading-tight mb-4">{data.personalInfo.fullName}</h1>
        {data.personalInfo.jobTitle && (
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-gray-500">{data.personalInfo.jobTitle}</p>
        )}
        {contactItems.length > 0 && (
          <div className="mt-8 space-y-1">
            {contactItems.map((item, i) => (
              <div key={i} className="text-xs tracking-[0.15em] text-gray-400">{item}</div>
            ))}
          </div>
        )}
        <div className="mt-12 h-px w-full bg-[var(--theme-color)] opacity-30" />
      </header>

      {/* Profile */}
      {data.summary && (
        <section className="mb-20">
          <h2 className={labelClass}>Profile</h2>
          <p className="text-base font-light leading-[2]">{data.summary}</p>
          <div className="mt-14 h-px w-full bg-[var(--theme-color)] opacity-30" />
        </section>
      )}
          </>
        ),

        experience: data.experience && data.experience.length > 0 && (
        <section className="mb-20">
          <h2 className={labelClass}>Experience</h2>
          <div className="space-y-12">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-6">
                  <h3 className="text-xl font-light tracking-wide">{exp.role}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-[10px] tracking-[0.25em] text-gray-400 whitespace-nowrap">
                      {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mt-2">{exp.company}</div>
                )}
                {exp.description && (
                  <p className="text-sm font-light text-gray-500 whitespace-pre-line leading-[1.9] mt-3">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-14 h-px w-full bg-[var(--theme-color)] opacity-30" />
        </section>
        ),

        projects: data.showProjects && data.projects && data.projects.length > 0 && (
        <section className="mb-20">
          <h2 className={labelClass}>Projects</h2>
          <div className="space-y-10">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="text-xl font-light tracking-wide">{proj.name}</h3>
                {proj.link && (
                  <a href={proj.link} className="text-xs tracking-[0.15em] text-[var(--theme-color)] break-all">{proj.link}</a>
                )}
                {proj.description && (
                  <p className="text-sm font-light text-gray-500 mt-2 whitespace-pre-line leading-[1.9]">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-14 h-px w-full bg-[var(--theme-color)] opacity-30" />
        </section>
        ),

        education: data.education && data.education.length > 0 && (
        <section className="mb-20">
          <h2 className={labelClass}>Education</h2>
          <div className="space-y-8">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="text-base font-light tracking-wide">{edu.degree}</div>
                <div className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-2">
                  {edu.school}{edu.school && edu.graduationYear ? ' — ' : ''}{edu.graduationYear}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 h-px w-full bg-[var(--theme-color)] opacity-30" />
        </section>
        ),

        skills: data.skills && data.skills.length > 0 && (
        <section className="mb-20">
          <h2 className={labelClass}>Skills</h2>
          <p className="text-sm font-light tracking-[0.2em] leading-[2.2]">
            {data.skills.map(skill => skill.name).join(' · ')}
          </p>
          <div className="mt-14 h-px w-full bg-[var(--theme-color)] opacity-30" />
        </section>
        ),

        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section className="mb-20">
          <h2 className={labelClass}>Certifications</h2>
          <div className="space-y-8">
            {data.certifications.map(cert => (
              <div key={cert.id}>
                <div className="text-base font-light tracking-wide">{cert.name}</div>
                <div className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-2">
                  {cert.issuer}{cert.issuer && cert.date ? ' — ' : ''}{cert.date}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 h-px w-full bg-[var(--theme-color)] opacity-30" />
        </section>
        ),

        references: data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-20">
          <h2 className={labelClass}>References</h2>
          <div className="space-y-8">
            {data.references.map(ref => (
              <div key={ref.id}>
                <div className="text-base font-light tracking-wide">{ref.name}</div>
                {(ref.title || ref.company) && (
                  <div className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-2">
                    {ref.title}{ref.title && ref.company ? ' — ' : ''}{ref.company}
                  </div>
                )}
                {ref.contact && <div className="text-xs tracking-[0.15em] text-gray-400 mt-1">{ref.contact}</div>}
              </div>
            ))}
          </div>
          <div className="mt-14 h-px w-full bg-[var(--theme-color)] opacity-30" />
        </section>
        ),
      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <section key={section.id} className="mb-20">
            <h2 className={labelClass}>{section.title}</h2>
            <div className="space-y-10">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-6">
                    <p className="text-xl font-light tracking-wide">{item.title}</p>
                    {item.date && (
                      <p className="text-[10px] tracking-[0.25em] text-gray-400 whitespace-nowrap">{item.date}</p>
                    )}
                  </div>
                  {item.subtitle && <p className="text-xs italic text-gray-500 mt-2">{item.subtitle}</p>}
                  {item.description && <p className="text-sm font-light text-gray-500 mt-2 whitespace-pre-line leading-[1.9]">{item.description}</p>}
                </div>
              ))}
            </div>
            <div className="mt-14 h-px w-full bg-[var(--theme-color)] opacity-30" />
          </section>
        ))
      )}

    </div>
  );
}
