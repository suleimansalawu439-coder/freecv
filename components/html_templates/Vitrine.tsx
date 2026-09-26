import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="font-serif text-[15px] font-bold uppercase tracking-[0.24em] mb-5" style={{ color: 'var(--theme-color)' }}>{title}</h2>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-xl p-7 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {children}
    </div>
  );
}

export default function Vitrine({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 font-serif px-[0.85in] pt-[0.8in] pb-[0.85in] mx-auto">
      {/* Display name with theme backdrop circle */}
      {orderSections(data, {
        personal: (
          <header className="relative mb-10 overflow-visible">
            <div
              className="absolute -top-10 -left-10 w-56 h-56 rounded-full opacity-[0.12] pointer-events-none"
              style={{ backgroundColor: 'var(--theme-color)' }}
            />
            <div className="relative">
              <h1 className="text-[52px] leading-[1.05] font-bold tracking-tight">{info.fullName}</h1>
              {info.jobTitle && (
                <p className="text-[15px] italic mt-2" style={{ color: 'var(--theme-color)' }}>{info.jobTitle}</p>
              )}
              {contact.length > 0 && (
                <p className="text-[12.5px] text-gray-600 mt-3">{contact.join('   ·   ')}</p>
              )}
            </div>
          </header>
        ),
      })}

      <div className="space-y-6">
        {orderSections(data, {
          personal: data.summary && (
            <Card>
              <SectionHeader title="Profile" />
              <p className="text-[14px] leading-[1.8] text-gray-700 italic">{data.summary}</p>
            </Card>
          ),

          experience: data.experience.length > 0 && (
            <Card>
              <SectionHeader title="Experience" />
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id} className="border-l-2 pl-5" style={{ borderColor: 'var(--theme-color)' }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[15px] font-bold">{exp.role}</h3>
                      <span className="text-[12px] font-semibold text-gray-500 whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-[13.5px] italic text-gray-600 mb-2">{exp.company}</p>
                    <ul className="space-y-1 text-[13.5px] leading-relaxed text-gray-700">
                      {exp.description.split(/\n|\r?\n/).filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="flex gap-2"><span style={{ color: 'var(--theme-color)' }}>◆</span><span>{line}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          ),

          education: data.education.length > 0 && (
            <Card>
              <SectionHeader title="Education" />
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="text-[14.5px] font-bold">{edu.degree}</p>
                      <p className="text-[13px] italic text-gray-600">{edu.school}</p>
                    </div>
                    <p className="text-[12.5px] font-semibold text-gray-500 whitespace-nowrap">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </Card>
          ),

          skills: data.skills.length > 0 && (
            <Card>
              <SectionHeader title="Skills" />
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <span key={skill.id} className="text-[12.5px] font-semibold px-4 py-1.5 rounded-full border" style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </Card>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
            <Card>
              <SectionHeader title="Projects" />
              <div className="space-y-5">
                {data.projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[14.5px] font-bold">{proj.name}</h3>
                      {proj.link && <span className="text-[12px] italic text-gray-500">{proj.link}</span>}
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-gray-700">{proj.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
            <Card>
              <SectionHeader title="Certifications" />
              <div className="space-y-2">
                {data.certifications.map(cert => (
                  <div key={cert.id} className="flex justify-between text-[13.5px]">
                    <span><span className="font-bold">{cert.name}</span>{cert.issuer && <span className="italic text-gray-600"> — {cert.issuer}</span>}</span>
                    <span className="text-gray-500 font-semibold whitespace-nowrap">{cert.date}</span>
                  </div>
                ))}
              </div>
            </Card>
          ),

          references: data.showReferences && data.references.length > 0 && (
            <Card>
              <SectionHeader title="References" />
              <div className="grid grid-cols-2 gap-6">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-[14.5px] font-bold">{ref.name}</p>
                    <p className="text-[12.5px] italic text-gray-600">{ref.title}{ref.company && `, ${ref.company}`}</p>
                    {ref.contact && <p className="text-[12px] text-gray-500">{ref.contact}</p>}
                  </div>
                ))}
              </div>
            </Card>
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <Card key={section.id}>
                <SectionHeader title={section.title} />
                <div className="space-y-5">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-[14.5px] font-bold">{item.title}</h3>
                        {item.date && <span className="text-[12px] font-semibold text-gray-500 whitespace-nowrap">{item.date}</span>}
                      </div>
                      {item.subtitle && <p className="text-[13px] italic text-gray-600">{item.subtitle}</p>}
                      {item.description && <p className="text-[13.5px] leading-relaxed text-gray-700 mt-1">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </Card>
            ))
        )}
      </div>
    </div>
  );
}
