import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-5 mt-9 mb-5">
      <div className="flex-1 border-t border-black" />
      <h2 className="font-serif text-[13px] font-bold uppercase tracking-[0.32em] whitespace-nowrap">{title}</h2>
      <div className="flex-1 border-t border-black" />
    </div>
  );
}

export default function Masthead({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-black font-serif px-[0.8in] pt-[0.65in] pb-[0.8in] mx-auto">
      {/* Newspaper nameplate */}
      <header className="text-center">
        <div className="border-t-[3px] border-black" />
        <div className="border-t border-black mt-[3px]" />
        <h1 className="text-[46px] leading-tight font-bold mt-7 mb-2 tracking-tight">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-[13px] uppercase tracking-[0.4em] mb-4">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-700">{contact.join('  ·  ')}</p>
        )}
        <div className="mt-7 border-b-[3px] border-black" />
        <div className="border-b border-black mt-[3px]" />
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="Profile" />
          <p className="text-[13.5px] leading-[1.75] text-justify">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[15px] font-bold">{exp.role}</h3>
                  <span className="text-[12px] italic whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-[13px] italic mb-2">{exp.company}</p>
                <ul className="list-disc ml-5 space-y-1 text-[13px] leading-relaxed">
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
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-[14px] font-bold">{edu.degree}</p>
                  <p className="text-[13px] italic">{edu.school}</p>
                </div>
                <p className="text-[12px] italic whitespace-nowrap">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionHeader title="Skills" />
          <p className="text-center text-[13.5px] leading-relaxed">{data.skills.map(s => s.name).join(', ')}</p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[14px] font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[12px] italic">{proj.link}</span>}
                </div>
                <p className="text-[13px] leading-relaxed">{proj.description}</p>
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
              <div key={cert.id} className="flex justify-between text-[13px]">
                <span><span className="font-bold">{cert.name}</span>{cert.issuer && <span className="italic"> — {cert.issuer}</span>}</span>
                <span className="italic whitespace-nowrap">{cert.date}</span>
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
              <div key={ref.id} className="text-center">
                <p className="text-[14px] font-bold">{ref.name}</p>
                <p className="text-[12.5px] italic">{ref.title}{ref.company && `, ${ref.company}`}</p>
                {ref.contact && <p className="text-[12px]">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections && data.customSections.map(section => (
        section.items && section.items.length > 0 && (
          <section key={section.id}>
            <SectionHeader title={section.title} />
            <div className="space-y-4">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[14px] font-bold">{item.title}</h3>
                    {item.date && <span className="text-[12px] italic whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-[13px] italic">{item.subtitle}</p>}
                  {item.description && <p className="text-[13px] leading-relaxed mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}
