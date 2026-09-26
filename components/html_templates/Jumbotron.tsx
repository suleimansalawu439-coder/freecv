import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-black uppercase tracking-[0.18em] mb-6">{title}</h2>
  );
}

export default function Jumbotron({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 font-sans px-[0.9in] pt-[0.85in] pb-[0.9in] mx-auto">
      {/* Oversized left name */}
      {orderSections(data, {
        personal: (
      <header className="mb-12">
        <h1 className="text-[64px] leading-[1.02] font-black tracking-tight">{info.fullName}</h1>
        <div className="h-[6px] w-28 mt-5 mb-6" style={{ backgroundColor: 'var(--theme-color)' }} />
        {info.jobTitle && (
          <p className="text-xl font-bold mb-3">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-sm text-gray-600">{contact.join('  ·  ')}</p>
        )}
      </header>
        ),
      })}

      {orderSections(data, {
        personal: data.summary && (
        <section className="mb-12">
          <SectionHeader title="Profile" />
          <p className="text-[15px] leading-[1.9] text-gray-700 max-w-[6.2in]">{data.summary}</p>
        </section>
        ),

        experience: data.experience.length > 0 && (
        <section className="mb-12">
          <SectionHeader title="Experience" />
          <div className="space-y-10">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-[17px] font-bold">{exp.role}</h3>
                  <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-[15px] font-semibold mb-3" style={{ color: 'var(--theme-color)' }}>{exp.company}</p>
                <ul className="space-y-2 text-[14.5px] leading-[1.75] text-gray-700">
                  {exp.description.split(/\n|\r?\n/).filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-black" style={{ color: 'var(--theme-color)' }}>—</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
        <section className="mb-12">
          <SectionHeader title="Education" />
          <div className="space-y-6">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-[16px] font-bold">{edu.degree}</p>
                  <p className="text-[14px] text-gray-600">{edu.school}</p>
                </div>
                <p className="text-sm font-semibold text-gray-500 whitespace-nowrap">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section className="mb-12">
          <SectionHeader title="Skills" />
          <p className="text-[15px] font-bold leading-[2]">{data.skills.map(s => s.name).join('   ·   ')}</p>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-12">
          <SectionHeader title="Projects" />
          <div className="space-y-8">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-[16px] font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-sm text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-[14.5px] leading-[1.75] text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-12">
          <SectionHeader title="Certifications" />
          <div className="space-y-4">
            {data.certifications.map(cert => (
              <div key={cert.id} className="flex justify-between text-[14.5px]">
                <span><span className="font-bold">{cert.name}</span>{cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}</span>
                <span className="text-gray-500 font-semibold whitespace-nowrap">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-12">
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-8">
            {data.references.map(ref => (
              <div key={ref.id}>
                <p className="text-[16px] font-bold">{ref.name}</p>
                <p className="text-[14px] text-gray-600">{ref.title}{ref.company && ` · ${ref.company}`}</p>
                {ref.contact && <p className="text-[13px] text-gray-500 mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
        ),
      },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section) => (
          <section key={section.id} className="mb-12">
            <SectionHeader title={section.title} />
            <div className="space-y-8">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-[16px] font-bold">{item.title}</h3>
                    {item.date && <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-[14px] text-gray-600 mb-2">{item.subtitle}</p>}
                  {item.description && <p className="text-[14.5px] leading-[1.75] text-gray-700">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
          ))
      )}
    </div>
  );
}
