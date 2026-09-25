import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-[13px] font-bold mt-6 mb-2">{title}</h2>
  );
}

export default function Blank({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-black font-sans px-[0.9in] pt-[0.7in] pb-[0.8in] mx-auto">
      <header>
        <h1 className="text-[32px] leading-tight font-bold">{info.fullName}</h1>
        {info.jobTitle && <p className="text-[14px] font-semibold mt-1">{info.jobTitle}</p>}
        {contact.length > 0 && (
          <p className="text-[12.5px] mt-2">{contact.join('  ·  ')}</p>
        )}
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="Summary" />
          <p className="text-[13px] leading-[1.6]">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionHeader title="Experience" />
          <div className="space-y-3">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <p className="text-[13.5px]"><span className="font-bold">{exp.role}</span>, {exp.company} <span className="text-gray-600">({exp.startDate} – {exp.endDate})</span></p>
                <ul className="list-disc ml-5 mt-1 space-y-0.5 text-[12.5px] leading-[1.55]">
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
          <div className="space-y-1.5">
            {data.education.map(edu => (
              <p key={edu.id} className="text-[13px]">
                <span className="font-bold">{edu.degree}</span>, {edu.school} <span className="text-gray-600">({edu.graduationYear})</span>
              </p>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionHeader title="Skills" />
          <p className="text-[13px] leading-[1.6]">{data.skills.map(s => s.name).join(', ')}</p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
          <div className="space-y-3">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <p className="text-[13.5px]"><span className="font-bold">{proj.name}</span>{proj.link && <span className="text-gray-600"> ({proj.link})</span>}</p>
                <p className="text-[12.5px] leading-[1.55] mt-0.5">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />
          <div className="space-y-1">
            {data.certifications.map(cert => (
              <p key={cert.id} className="text-[13px]">
                <span className="font-bold">{cert.name}</span>{cert.issuer && ` — ${cert.issuer}`} <span className="text-gray-600">({cert.date})</span>
              </p>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader title="References" />
          <div className="space-y-2">
            {data.references.map(ref => (
              <p key={ref.id} className="text-[13px]">
                <span className="font-bold">{ref.name}</span> — {ref.title}{ref.company && `, ${ref.company}`}{ref.contact && ` · ${ref.contact}`}
              </p>
            ))}
          </div>
        </section>
      )}

      {data.customSections && data.customSections.map(section => (
        section.items && section.items.length > 0 && (
          <section key={section.id}>
            <SectionHeader title={section.title} />
            <div className="space-y-3">
              {section.items.map(item => (
                <div key={item.id}>
                  <p className="text-[13.5px]">
                    <span className="font-bold">{item.title}</span>
                    {item.subtitle && ` — ${item.subtitle}`}
                    {item.date && <span className="text-gray-600"> ({item.date})</span>}
                  </p>
                  {item.description && <p className="text-[12.5px] leading-[1.55] mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}
