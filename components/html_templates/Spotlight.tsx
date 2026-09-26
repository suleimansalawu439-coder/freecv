import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mt-9 mb-5">
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ backgroundColor: 'var(--theme-color)', boxShadow: '0 0 10px var(--theme-color)' }}
      />
      <h2 className="text-[13px] font-black uppercase tracking-[0.22em]">{title}</h2>
      <div className="flex-1 border-t border-gray-200" />
    </div>
  );
}

export default function Spotlight({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 font-sans mx-auto">
      {/* Dark band with spotlight bar */}
      {orderSections(data, {
        personal: (
          <header className="relative bg-[#14181f] px-[0.85in] pt-12 pb-10 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 90% at 30% 20%, rgba(255,255,255,0.09), transparent)' }}
            />
            <div className="relative">
              <h1 className="text-[42px] leading-tight font-black text-white tracking-tight">{info.fullName}</h1>
              {info.jobTitle && (
                <p className="text-[15px] font-semibold text-white/80 mt-2">{info.jobTitle}</p>
              )}
              {contact.length > 0 && (
                <p className="text-[12.5px] text-white/60 mt-3">{contact.join('  ·  ')}</p>
              )}
            </div>
            <div
              className="absolute bottom-0 left-0 h-1.5 w-full"
              style={{ backgroundColor: 'var(--theme-color)' }}
            />
          </header>
        ),
      })}

      <div className="px-[0.85in] pb-[0.85in]">
        {orderSections(data, {
          personal: data.summary && data.summary.length > 0 && (
          <section>
            <SectionHeader title="Profile" />
            <p className="text-[14px] leading-[1.75] text-gray-700">{data.summary}</p>
          </section>
          ),

          experience: data.experience.length > 0 && (
          <section>
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
          <section>
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
          <section>
            <SectionHeader title="Skills" />
            <div className="grid grid-cols-2 gap-x-10 gap-y-3">
              {data.skills.map((skill, i) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <span className="text-[13.5px] font-semibold">{skill.name}</span>
                  <span className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map(d => (
                      <span
                        key={d}
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: d < (3 + (i % 3)) ? 'var(--theme-color)' : '#e5e7eb',
                          boxShadow: d < (3 + (i % 3)) ? '0 0 6px var(--theme-color)' : undefined,
                        }}
                      />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
          <section>
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
          <section>
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
          ),
        },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
            <section key={section.id}>
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
    </div>
  );
}
