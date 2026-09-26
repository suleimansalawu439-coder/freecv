import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-[13px] font-black uppercase tracking-[0.22em] mb-5 pb-2 border-b border-gray-200">{title}</h2>
  );
}

export default function Aperture({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);
  const initial = info.fullName?.charAt(0) || '';

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 font-sans px-[0.85in] pt-[0.7in] pb-[0.85in] mx-auto">
      {/* Photo + name with theme ring */}
      {orderSections(data, {
        personal: (
          <>
      <header className="flex items-center gap-8 mb-10">
        {info.profilePicture ? (
          <img
            src={info.profilePicture}
            alt={info.fullName}
            className="w-28 h-28 rounded-full object-cover ring-4 ring-offset-4 shrink-0"
            style={{ ['--tw-ring-color' as string]: 'var(--theme-color)' }}
          />
        ) : (
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center ring-4 ring-offset-4 shrink-0"
            style={{ backgroundColor: 'var(--theme-color)' }}
          >
            <span className="text-white text-4xl font-black">{initial}</span>
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-[40px] leading-tight font-black tracking-tight">{info.fullName}</h1>
          {info.jobTitle && (
            <p className="text-[16px] font-semibold mt-1" style={{ color: 'var(--theme-color)' }}>{info.jobTitle}</p>
          )}
          {contact.length > 0 && (
            <p className="text-[12.5px] text-gray-600 mt-2">{contact.join('  ·  ')}</p>
          )}
        </div>
      </header>

      {data.summary && (
        <section className="mb-8">
          <SectionHeader title="Profile" />
          <p className="text-[14px] leading-[1.75] text-gray-700">{data.summary}</p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[15px] font-bold">{exp.role}</h3>
                  <span className="text-[12.5px] font-semibold text-gray-500 whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
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
        ),

        education: data.education.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-[14.5px] font-bold">{edu.degree}</p>
                  <p className="text-[13px] text-gray-600">{edu.school}</p>
                </div>
                <p className="text-[12.5px] font-semibold text-gray-500 whitespace-nowrap">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
              <span
                key={skill.id}
                className="text-white text-[12.5px] font-semibold px-4 py-1.5 rounded-full"
                style={{ backgroundColor: 'var(--theme-color)' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Projects" />
          <div className="space-y-5">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[14.5px] font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[12px] text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-[13.5px] leading-relaxed text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map(cert => (
              <div key={cert.id} className="flex justify-between text-[13.5px]">
                <span><span className="font-bold">{cert.name}</span>{cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}</span>
                <span className="text-gray-500 font-semibold whitespace-nowrap">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-8">
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
        ),
      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <section key={section.id} className="mb-8">
            <SectionHeader title={section.title} />
            <div className="space-y-5">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[14.5px] font-bold">{item.title}</h3>
                    {item.date && <span className="text-[12px] font-semibold text-gray-500 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-[13px] text-gray-600">{item.subtitle}</p>}
                  {item.description && <p className="text-[13.5px] leading-relaxed text-gray-700 mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))
      )}

    </div>
  );
}
