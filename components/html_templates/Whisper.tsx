import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-[10px] font-medium uppercase tracking-[0.35em] text-gray-400 mb-6 mt-14">{title}</h2>
  );
}

export default function Whisper({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-800 font-sans px-[1.4in] pt-[1.3in] pb-[1.3in] mx-auto">
      <header className="mb-4">
        <h1 className="text-[22px] font-light tracking-wide">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-[13px] font-light text-gray-500 mt-2">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-[11.5px] font-light text-gray-400 mt-4 leading-loose">{contact.join('   ·   ')}</p>
        )}
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="Profile" />
          <p className="text-[13.5px] font-light leading-[2] text-gray-600">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionHeader title="Experience" />
          <div className="space-y-10">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-[14.5px] font-normal">{exp.role}</h3>
                  <span className="text-[12px] font-light text-gray-400 whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-[13px] font-light text-gray-500 mb-3">{exp.company}</p>
                <ul className="space-y-2 text-[13px] font-light leading-[1.9] text-gray-600">
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
          <div className="space-y-8">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-[14px] font-normal">{edu.degree}</p>
                  <p className="text-[12.5px] font-light text-gray-500">{edu.school}</p>
                </div>
                <p className="text-[12px] font-light text-gray-400 whitespace-nowrap">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionHeader title="Skills" />
          <p className="text-[13px] font-light leading-[2.2] text-gray-600">{data.skills.map(s => s.name).join('   ·   ')}</p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
          <div className="space-y-8">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-[14px] font-normal">{proj.name}</h3>
                  {proj.link && <span className="text-[11.5px] font-light text-gray-400">{proj.link}</span>}
                </div>
                <p className="text-[13px] font-light leading-[1.9] text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />
          <div className="space-y-4">
            {data.certifications.map(cert => (
              <div key={cert.id} className="flex justify-between text-[13px] font-light text-gray-600">
                <span>{cert.name}{cert.issuer && <span className="text-gray-400"> — {cert.issuer}</span>}</span>
                <span className="text-gray-400 whitespace-nowrap">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader title="References" />
          <div className="space-y-8">
            {data.references.map(ref => (
              <div key={ref.id}>
                <p className="text-[14px] font-normal">{ref.name}</p>
                <p className="text-[12.5px] font-light text-gray-500">{ref.title}{ref.company && `, ${ref.company}`}</p>
                {ref.contact && <p className="text-[11.5px] font-light text-gray-400 mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections && data.customSections.map(section => (
        section.items && section.items.length > 0 && (
          <section key={section.id}>
            <SectionHeader title={section.title} />
            <div className="space-y-8">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-[14px] font-normal">{item.title}</h3>
                    {item.date && <span className="text-[12px] font-light text-gray-400 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-[12.5px] font-light text-gray-500">{item.subtitle}</p>}
                  {item.description && <p className="text-[13px] font-light leading-[1.9] text-gray-600 mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}
