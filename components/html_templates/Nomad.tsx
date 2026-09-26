import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const REMOTE_HINT = /remote|distributed|wfh|work from home|telecommut|work-from-anywhere/i;

export default function Nomad({ data }: { data: ResumeData }) {
  const isRemote =
    REMOTE_HINT.test(data.personalInfo.location || '') || REMOTE_HINT.test(data.summary || '');

  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="font-sans p-16 bg-white text-[#1e293b] min-h-[1056px] w-full max-w-[816px] mx-auto">
      {orderSections(data, {
        personal: (
          <>
      {/* Header */}
      <header className="text-center mb-16">
        {data.personalInfo.profilePicture && (
          <img
            src={data.personalInfo.profilePicture}
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full mx-auto mb-6"
          />
        )}
        <h1 className="text-5xl font-extrabold tracking-tight mb-3">{data.personalInfo.fullName}</h1>
        {data.personalInfo.jobTitle && (
          <p className="text-lg font-medium text-gray-500 mb-1">{data.personalInfo.jobTitle}</p>
        )}
        {isRemote && (
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--theme-color)] mt-2">Remote</p>
        )}
        {contactItems.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-5 text-sm text-gray-500">
            {contactItems.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        )}
        <div className="w-16 h-[3px] bg-[var(--theme-color)] mx-auto mt-8" />
      </header>

      {/* Profile */}
      {data.summary && (
        <section className="mb-14">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--theme-color)] text-center mb-6">Profile</h2>
          <p className="text-base leading-loose text-center max-w-2xl mx-auto">{data.summary}</p>
        </section>
      )}
          </>
        ),

        skills: data.skills && data.skills.length > 0 && (
        <section className="mb-14">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--theme-color)] text-center mb-6">Remote Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills.map(skill => (
              <span
                key={skill.id}
                className="text-sm font-semibold px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-[var(--theme-color)]"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
        ),

        experience: data.experience && data.experience.length > 0 && (
        <section className="mb-14">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--theme-color)] text-center mb-8">Experience</h2>
          <div className="space-y-10 max-w-2xl mx-auto">
            {data.experience.map(exp => (
              <div key={exp.id} className="text-center">
                <div className="flex justify-center items-baseline gap-4 mb-1">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                </div>
                <div className="text-sm font-semibold text-gray-500">
                  {exp.company}
                  {(exp.startDate || exp.endDate) && (
                    <span> • {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}</span>
                  )}
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed mt-3 text-left">{exp.description}</p>
                )}
                <div className="w-8 h-px bg-[var(--theme-color)] mx-auto mt-8 opacity-40" />
              </div>
            ))}
          </div>
        </section>
        ),

        projects: data.showProjects && data.projects && data.projects.length > 0 && (
        <section className="mb-14">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--theme-color)] text-center mb-8">Projects</h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            {data.projects.map(proj => (
              <div key={proj.id} className="text-center">
                <h3 className="text-base font-bold">{proj.name}</h3>
                {proj.link && (
                  <a href={proj.link} className="text-sm font-semibold text-[var(--theme-color)] break-all">{proj.link}</a>
                )}
                {proj.description && (
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education && data.education.length > 0 && (
        <section className="mb-14">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--theme-color)] text-center mb-8">Education</h2>
          <div className="space-y-5 max-w-2xl mx-auto text-center">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="font-bold text-base">{edu.degree}</div>
                <div className="text-sm text-gray-500">{edu.school}</div>
                {edu.graduationYear && <div className="text-xs text-gray-400 font-bold mt-1">{edu.graduationYear}</div>}
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section className="mb-14">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--theme-color)] text-center mb-8">Certifications</h2>
          <div className="space-y-4 max-w-2xl mx-auto text-center">
            {data.certifications.map(cert => (
              <div key={cert.id}>
                <div className="font-bold text-sm">{cert.name}</div>
                <div className="text-sm text-gray-500">
                  {cert.issuer}{cert.issuer && cert.date ? ' • ' : ''}{cert.date}
                </div>
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references && data.references.length > 0 && (
        <section className="mb-14">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--theme-color)] text-center mb-8">References</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {data.references.map(ref => (
              <div key={ref.id} className="text-center">
                <h3 className="font-bold text-base">{ref.name}</h3>
                {(ref.title || ref.company) && (
                  <div className="text-sm text-gray-500 font-medium">
                    {ref.title}{ref.title && ref.company ? ' @ ' : ''}{ref.company}
                  </div>
                )}
                {ref.contact && <div className="text-sm text-gray-400">{ref.contact}</div>}
              </div>
            ))}
          </div>
        </section>
        ),

      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <section key={section.id} className="mb-14">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--theme-color)] text-center mb-8">{section.title}</h2>
            <div className="space-y-5 max-w-2xl mx-auto">
              {section.items.map(item => (
                <div key={item.id} className="text-center">
                  <div className="flex justify-center items-baseline gap-3 flex-wrap">
                    <p className="text-sm font-bold">{item.title}</p>
                    {item.date && <p className="text-xs font-bold text-gray-400">{item.date}</p>}
                  </div>
                  {item.subtitle && <p className="text-sm italic text-gray-500">{item.subtitle}</p>}
                  {item.description && <p className="text-sm text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
