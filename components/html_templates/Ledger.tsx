import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

export default function Ledger({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const initials = info.fullName
    ? info.fullName
        .split(' ')
        .map((w) => w.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 flex mx-auto">
      {/* Left sidebar — dark slate */}
      <aside className="w-[32%] shrink-0 bg-slate-800 text-white px-8 py-10">
        {orderSections(data, {
          personal: (
            <>
              {/* Photo or initials */}
              <div className="mb-8 flex justify-center">
                {info.profilePicture ? (
                  <img
                    src={info.profilePicture}
                    alt={info.fullName}
                    className="w-24 h-24 rounded-full object-cover border-2 border-white/30"
                  />
                ) : initials ? (
                  <div className="w-24 h-24 rounded-full bg-white/15 flex items-center justify-center text-3xl font-bold">
                    {initials}
                  </div>
                ) : null}
              </div>

              <div className="space-y-2 text-[13px] text-slate-200 mb-10 break-words">
                {info.email && <p>{info.email}</p>}
                {info.phone && <p>{info.phone}</p>}
                {info.location && <p>{info.location}</p>}
                {info.website && <p>{info.website}</p>}
              </div>
            </>
          ),

          skills: data.skills.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
                Skills
              </h2>
              <div className="space-y-3">
                {data.skills.map((skill, i) => (
                  <div key={skill.id}>
                    <p className="text-[13px] font-medium text-white mb-1.5">{skill.name}</p>
                    <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${62 + ((i * 37) % 34)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),

          education: data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-[13px] font-bold text-white">{edu.degree}</p>
                    <p className="text-[13px] text-slate-300">{edu.school}</p>
                    <p className="text-xs text-slate-400">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          ),
        })}
      </aside>

      {/* Main column — serif headers */}
      <main className="flex-1 px-10 py-10 min-w-0 font-serif">
        {orderSections(data, {
          personal: (
            <>
              <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-1">{info.fullName}</h1>
                {info.jobTitle && (
                  <p className="text-lg text-gray-600 italic">{info.jobTitle}</p>
                )}
              </header>

              {data.summary && (
                <section className="mb-8">
                  <h2 className="font-serif text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                    Profile
                  </h2>
                  <p className="text-sm leading-relaxed text-gray-700 font-sans">{data.summary}</p>
                </section>
              )}
            </>
          ),

          experience: data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold text-gray-900">{exp.role}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4 font-sans">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm italic text-gray-600 mb-2 font-sans">{exp.company}</p>
                    {exp.description && (
                      <ul className="space-y-1 pl-4 list-disc marker:text-gray-300 font-sans">
                        {exp.description
                          .split(/\n|\r?\n/)
                          .filter((l) => l.trim())
                          .map((line, i) => (
                            <li key={i} className="text-sm leading-relaxed text-gray-700">
                              {line}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
            <section className="mb-8">
              <h2 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Projects
              </h2>
              <div className="space-y-4 font-sans">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{proj.name}</h3>
                      {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
            <section className="mb-8">
              <h2 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Certifications
              </h2>
              <div className="space-y-2 font-sans">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">{cert.name}</span>
                      {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                    </p>
                    <span className="text-xs text-gray-500">{cert.date}</span>
                  </div>
                ))}
              </div>
            </section>
          ),

          references: data.showReferences && data.references.length > 0 && (
            <section className="mb-8">
              <h2 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                References
              </h2>
              <div className="space-y-3 font-sans">
                {data.references.map((ref) => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                    <p className="text-sm text-gray-600">
                      {ref.title}
                      {ref.company && `, ${ref.company}`}
                    </p>
                    {ref.contact && <p className="text-xs text-gray-500">{ref.contact}</p>}
                  </div>
                ))}
              </div>
            </section>
          ),
        },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {section.title}
              </h2>
              <div className="space-y-4 font-sans">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                      {item.date && <span className="text-xs text-gray-500">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                    {item.description && (
                      <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}
