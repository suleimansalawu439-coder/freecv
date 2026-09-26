import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mt-8 mb-4">
      <h2 className="font-serif text-[12px] uppercase tracking-[0.3em] text-gray-800 mb-2">{title}</h2>
      <div className="border-t border-gray-300" />
    </div>
  );
}

export default function Paper({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 font-serif px-[1in] pt-[0.85in] pb-[1in] mx-auto">
      {orderSections(data, {
        personal: (
          <>
      <header className="mb-2">
        <h1 className="text-[38px] leading-tight font-normal tracking-wide">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-[14px] italic text-gray-600 mt-1">{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-[12px] text-gray-600 mt-3">{contact.join('  ·  ')}</p>
        )}
        <div className="border-t border-gray-300 mt-6" />
      </header>

      {data.summary && (
        <section>
          <SectionHeader title="Profile" />
          <p className="text-[13.5px] leading-[1.8] text-gray-700">{data.summary}</p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section>
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-b border-gray-100 pb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[15px] font-semibold">{exp.role}</h3>
                  <span className="text-[12px] text-gray-500 whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-[13px] italic text-gray-600 mb-2">{exp.company}</p>
                <ul className="space-y-1 text-[13px] leading-[1.7] text-gray-700 list-disc ml-5">
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
        <section>
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline border-b border-gray-100 pb-4">
                <div>
                  <p className="text-[14px] font-semibold">{edu.degree}</p>
                  <p className="text-[12.5px] italic text-gray-600">{edu.school}</p>
                </div>
                <p className="text-[12px] text-gray-500 whitespace-nowrap">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section>
          <SectionHeader title="Skills" />
          <p className="text-[13px] leading-[1.9] text-gray-700">{data.skills.map(s => s.name).join(',  ')}</p>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
          <div className="space-y-5">
            {data.projects.map(proj => (
              <div key={proj.id} className="border-b border-gray-100 pb-5">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[14px] font-semibold">{proj.name}</h3>
                  {proj.link && <span className="text-[11.5px] italic text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-[13px] leading-[1.7] text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map(cert => (
              <div key={cert.id} className="flex justify-between text-[13px] text-gray-700 border-b border-gray-100 pb-2">
                <span>{cert.name}{cert.issuer && <span className="italic text-gray-500">, {cert.issuer}</span>}</span>
                <span className="text-gray-500 whitespace-nowrap">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-6">
            {data.references.map(ref => (
              <div key={ref.id}>
                <p className="text-[14px] font-semibold">{ref.name}</p>
                <p className="text-[12px] italic text-gray-600">{ref.title}{ref.company && `, ${ref.company}`}</p>
                {ref.contact && <p className="text-[11.5px] text-gray-500">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
        ),

      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <section key={section.id}>
            <SectionHeader title={section.title} />
            <div className="space-y-5">
              {section.items.map(item => (
                <div key={item.id} className="border-b border-gray-100 pb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[14px] font-semibold">{item.title}</h3>
                    {item.date && <span className="text-[11.5px] text-gray-500 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-[12.5px] italic text-gray-600">{item.subtitle}</p>}
                  {item.description && <p className="text-[13px] leading-[1.7] text-gray-700 mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
