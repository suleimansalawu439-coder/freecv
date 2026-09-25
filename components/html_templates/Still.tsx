import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mt-10 mb-5 text-center">
      <h2 className="font-serif text-[12px] uppercase tracking-[0.35em] text-gray-500">{title}</h2>
      <div className="flex justify-center mt-3">
        <div className="w-10 border-t border-gray-300" />
      </div>
    </div>
  );
}

export default function Still({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-800 font-serif px-[1.1in] pt-[0.9in] pb-[1in] mx-auto text-center">
      <header>
        <h1 className="text-[36px] leading-tight font-normal tracking-wide">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-[13.5px] italic text-gray-500 mt-2">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-[12px] text-gray-500 mt-4 leading-loose">{contact.join('   ·   ')}</p>
        )}
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="Profile" />
          <p className="text-[13.5px] leading-[1.85] text-gray-600 max-w-[5.6in] mx-auto">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionHeader title="Experience" />
          <div className="space-y-8">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <h3 className="text-[15px] font-semibold">{exp.role}</h3>
                <p className="text-[13px] italic text-gray-500 mt-1">{exp.company}</p>
                <p className="text-[12px] text-gray-400 mt-1">{exp.startDate} — {exp.endDate}</p>
                <div className="mt-3 space-y-1.5 text-[13px] leading-[1.7] text-gray-600 max-w-[5.8in] mx-auto">
                  {exp.description.split(/\n|\r?\n/).filter(l => l.trim()).map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-6">
            {data.education.map(edu => (
              <div key={edu.id}>
                <p className="text-[14px] font-semibold">{edu.degree}</p>
                <p className="text-[12.5px] italic text-gray-500 mt-1">{edu.school}</p>
                <p className="text-[12px] text-gray-400 mt-1">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionHeader title="Skills" />
          <p className="text-[13px] leading-[2] text-gray-600 max-w-[5.8in] mx-auto">{data.skills.map(s => s.name).join('   ·   ')}</p>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
          <div className="space-y-7">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="text-[14px] font-semibold">{proj.name}</h3>
                {proj.link && <p className="text-[11.5px] italic text-gray-400 mt-1">{proj.link}</p>}
                <p className="text-[13px] leading-[1.7] text-gray-600 mt-2 max-w-[5.8in] mx-auto">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />
          <div className="space-y-3">
            {data.certifications.map(cert => (
              <div key={cert.id} className="text-[13px] text-gray-600">
                <p><span className="font-semibold text-gray-800">{cert.name}</span></p>
                {cert.issuer && <p className="italic text-gray-500">{cert.issuer}</p>}
                <p className="text-gray-400 text-[12px]">{cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader title="References" />
          <div className="space-y-6">
            {data.references.map(ref => (
              <div key={ref.id}>
                <p className="text-[14px] font-semibold">{ref.name}</p>
                <p className="text-[12px] italic text-gray-500">{ref.title}{ref.company && `, ${ref.company}`}</p>
                {ref.contact && <p className="text-[11.5px] text-gray-400">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections && data.customSections.map(section => (
        section.items && section.items.length > 0 && (
          <section key={section.id}>
            <SectionHeader title={section.title} />
            <div className="space-y-7">
              {section.items.map(item => (
                <div key={item.id}>
                  <h3 className="text-[14px] font-semibold">{item.title}</h3>
                  {item.subtitle && <p className="text-[12.5px] italic text-gray-500 mt-1">{item.subtitle}</p>}
                  {item.date && <p className="text-[12px] text-gray-400 mt-1">{item.date}</p>}
                  {item.description && <p className="text-[13px] leading-[1.7] text-gray-600 mt-2 max-w-[5.8in] mx-auto">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}
