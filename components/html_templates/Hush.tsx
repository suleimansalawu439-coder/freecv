import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mt-9 mb-4">
      <h2 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gray-500 mb-2">{title}</h2>
      <div className="border-t-2 border-dotted border-gray-200" />
    </div>
  );
}

export default function Hush({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-800 font-sans px-[1in] pt-[0.85in] pb-[1in] mx-auto">
      {orderSections(data, {
        personal: (
      <header className="flex justify-between items-start gap-8">
        <div>
          <h1 className="text-[36px] leading-tight font-bold tracking-tight">{info.fullName}</h1>
          {info.jobTitle && (
            <p className="text-[13.5px] font-medium text-gray-500 mt-1">{info.jobTitle}</p>
          )}
        </div>
        {contact.length > 0 && (
          <div className="text-right shrink-0 pt-1">
            {contact.map((c, i) => (
              <p key={i} className="text-[12px] text-gray-500 leading-relaxed">{c}</p>
            ))}
          </div>
        )}
      </header>
        ),
      })}

      {orderSections(data, {
        personal: data.summary && (
        <section>
          <SectionHeader title="Profile" />
          <p className="text-[13.5px] leading-[1.75] text-gray-600 bg-gray-50 rounded-xl px-5 py-4">{data.summary}</p>
        </section>
        ),

        experience: data.experience.length > 0 && (
        <section>
          <SectionHeader title="Experience" />
          <div className="space-y-7">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-b-2 border-dotted border-gray-100 pb-7">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[15px] font-bold">{exp.role}</h3>
                  <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-[13px] font-medium text-gray-500 mb-2">{exp.company}</p>
                <ul className="space-y-1 text-[13px] leading-[1.65] text-gray-600 list-disc ml-5">
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
          <div className="space-y-5">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline border-b-2 border-dotted border-gray-100 pb-5">
                <div>
                  <p className="text-[14px] font-bold">{edu.degree}</p>
                  <p className="text-[12.5px] text-gray-500">{edu.school}</p>
                </div>
                <p className="text-[12px] font-medium text-gray-400 whitespace-nowrap">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section>
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
              <span key={skill.id} className="text-[12.5px] font-medium text-gray-600 bg-gray-100 rounded-full px-4 py-1.5">{skill.name}</span>
            ))}
          </div>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader title="Projects" />
          <div className="space-y-6">
            {data.projects.map(proj => (
              <div key={proj.id} className="border-b-2 border-dotted border-gray-100 pb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[14px] font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[11.5px] font-medium text-gray-400">{proj.link}</span>}
                </div>
                <p className="text-[13px] leading-[1.65] text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader title="Certifications" />
          <div className="space-y-3">
            {data.certifications.map(cert => (
              <div key={cert.id} className="flex justify-between text-[13px] border-b-2 border-dotted border-gray-100 pb-3">
                <span className="text-gray-700"><span className="font-bold">{cert.name}</span>{cert.issuer && <span className="text-gray-500"> — {cert.issuer}</span>}</span>
                <span className="text-gray-400 whitespace-nowrap">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader title="References" />
          <div className="grid grid-cols-2 gap-5">
            {data.references.map(ref => (
              <div key={ref.id} className="bg-gray-50 rounded-xl px-5 py-4">
                <p className="text-[14px] font-bold">{ref.name}</p>
                <p className="text-[12px] text-gray-500">{ref.title}{ref.company && `, ${ref.company}`}</p>
                {ref.contact && <p className="text-[11.5px] text-gray-400 mt-1">{ref.contact}</p>}
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
            <div className="space-y-6">
              {section.items.map(item => (
                <div key={item.id} className="border-b-2 border-dotted border-gray-100 pb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[14px] font-bold">{item.title}</h3>
                    {item.date && <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-[12.5px] text-gray-500">{item.subtitle}</p>}
                  {item.description && <p className="text-[13px] leading-[1.65] text-gray-600 mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
          ))
      )}
    </div>
  );
}
