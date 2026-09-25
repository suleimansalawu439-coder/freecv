import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mt-9 mb-5">
      <div
        className="w-4 h-4 shrink-0"
        style={{ backgroundColor: 'var(--theme-color)', clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
      />
      <h2 className="text-[13px] font-black uppercase tracking-[0.22em]">{title}</h2>
      <div className="flex-1 border-t-2 border-gray-900" />
    </div>
  );
}

export default function Ensign({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 font-sans mx-auto">
      {/* Header with pennant */}
      <header className="px-[0.85in] pt-[0.7in] pb-8">
        <h1 className="text-[44px] leading-tight font-black tracking-tight">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-[15px] font-bold mt-1" style={{ color: 'var(--theme-color)' }}>{info.jobTitle}</p>
        )}
      </header>
      {/* Flag-like pennant carrying contact */}
      <div
        className="px-[0.85in] py-3.5 mb-2"
        style={{
          backgroundColor: 'var(--theme-color)',
          clipPath: 'polygon(0 0, 100% 0, 97.5% 100%, 0 100%)',
        }}
      >
        {contact.length > 0 && (
          <p className="text-white text-[12.5px] font-semibold tracking-wide">{contact.join('   ·   ')}</p>
        )}
      </div>

      <div className="px-[0.85in] pb-[0.85in]">
        {data.summary && (
          <section>
            <SectionHeader title="Profile" />
            <p className="text-[14px] leading-[1.75] text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <SectionHeader title="Experience" />
            <div className="space-y-5">
              {data.experience.map(exp => (
                <div key={exp.id} className="border-b border-gray-100 pb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[15px] font-bold">{exp.role}</h3>
                    <span className="text-[12.5px] font-bold text-gray-500 whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-[13.5px] font-semibold mb-2" style={{ color: 'var(--theme-color)' }}>{exp.company}</p>
                  <ul className="space-y-1 text-[13.5px] leading-relaxed text-gray-700 list-disc ml-5">
                    {exp.description.split(/\n|\r?\n/).filter(l => l.trim()).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <SectionHeader title="Education" />
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-[14.5px] font-bold">{edu.degree}</p>
                    <p className="text-[13px] text-gray-600">{edu.school}</p>
                  </div>
                  <p className="text-[12.5px] font-bold text-gray-500 whitespace-nowrap">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <SectionHeader title="Skills" />
            <div className="flex flex-wrap gap-2">
              {data.skills.map(skill => (
                <span
                  key={skill.id}
                  className="text-[12.5px] font-bold px-4 py-1.5 bg-gray-900 text-white rounded-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionHeader title="Projects" />
            <div className="space-y-5">
              {data.projects.map(proj => (
                <div key={proj.id} className="border-b border-gray-100 pb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[14.5px] font-bold">{proj.name}</h3>
                    {proj.link && <span className="text-[12px] text-gray-500">{proj.link}</span>}
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-gray-700">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showCertifications && data.certifications.length > 0 && (
          <section>
            <SectionHeader title="Certifications" />
            <div className="space-y-2">
              {data.certifications.map(cert => (
                <div key={cert.id} className="flex justify-between text-[13.5px] border-b border-gray-100 pb-2">
                  <span><span className="font-bold">{cert.name}</span>{cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}</span>
                  <span className="text-gray-500 font-bold whitespace-nowrap">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references.length > 0 && (
          <section>
            <SectionHeader title="References" />
            <div className="grid grid-cols-2 gap-6">
              {data.references.map(ref => (
                <div key={ref.id}>
                  <p className="text-[14.5px] font-bold">{ref.name}</p>
                  <p className="text-[12.5px] text-gray-600">{ref.title}{ref.company && `, ${ref.company}`}</p>
                  {ref.contact && <p className="text-[12px] text-gray-500">{ref.contact}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections && data.customSections.map(section => (
          section.items && section.items.length > 0 && (
            <section key={section.id}>
              <SectionHeader title={section.title} />
              <div className="space-y-5">
                {section.items.map(item => (
                  <div key={item.id} className="border-b border-gray-100 pb-5">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[14.5px] font-bold">{item.title}</h3>
                      {item.date && <span className="text-[12px] font-bold text-gray-500 whitespace-nowrap">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-[13px] text-gray-600">{item.subtitle}</p>}
                    {item.description && <p className="text-[13.5px] leading-relaxed text-gray-700 mt-1">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )
        ))}
      </div>
    </div>
  );
}
