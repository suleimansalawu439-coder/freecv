import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const NAVY = '#1f2a44';
const GOLD = '#c9a227';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mt-9 mb-5">
      <h2 className="font-serif text-[14px] font-bold uppercase tracking-[0.28em] mb-2" style={{ color: NAVY }}>{title}</h2>
      <div className="h-[2px] w-full" style={{ backgroundColor: NAVY }} />
      <div className="h-[1px] w-full mt-[2px]" style={{ backgroundColor: GOLD }} />
    </div>
  );
}

export default function Flagship({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif mx-auto">
      {/* Navy band with gold rule */}
      {orderSections(data, {
        personal: (
      <header className="text-center px-[0.8in] pt-12 pb-10" style={{ backgroundColor: NAVY }}>
        <h1 className="text-[42px] leading-tight font-bold text-white tracking-wide">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-[13px] uppercase tracking-[0.4em] mt-3" style={{ color: GOLD }}>{info.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="text-[12px] text-white/85 mt-4 tracking-wide">{contact.join('  ·  ')}</p>
        )}
      </header>
        ),
      })}
      <div className="h-[3px]" style={{ backgroundColor: GOLD }} />

      <div className="px-[0.85in] pb-[0.8in] text-gray-900">
        {orderSections(data, {
          personal: data.summary && (
          <section>
            <SectionHeader title="Profile" />
            <p className="text-[14px] leading-[1.8] text-justify italic border-l-2 pl-5" style={{ borderColor: GOLD }}>{data.summary}</p>
          </section>
          ),

          experience: data.experience.length > 0 && (
          <section>
            <SectionHeader title="Professional Experience" />
            <div className="space-y-7">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[15.5px] font-bold">{exp.role}</h3>
                    <span className="text-[12.5px] font-semibold whitespace-nowrap" style={{ color: NAVY }}>{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-[13.5px] uppercase tracking-[0.12em] mb-2" style={{ color: GOLD }}>{exp.company}</p>
                  <ul className="list-disc ml-5 space-y-1 text-[13.5px] leading-relaxed text-gray-800">
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
                    <p className="text-[13px] italic text-gray-700">{edu.school}</p>
                  </div>
                  <p className="text-[12.5px] font-semibold whitespace-nowrap" style={{ color: NAVY }}>{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </section>
          ),

          skills: data.skills.length > 0 && (
          <section>
            <SectionHeader title="Areas of Expertise" />
            <p className="text-[13.5px] leading-[1.9]">{data.skills.map(s => s.name).join('  ·  ')}</p>
          </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionHeader title="Selected Projects" />
            <div className="space-y-5">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[14.5px] font-bold">{proj.name}</h3>
                    {proj.link && <span className="text-[12px] italic text-gray-600">{proj.link}</span>}
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-gray-800">{proj.description}</p>
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
                  <span><span className="font-bold">{cert.name}</span>{cert.issuer && <span className="italic text-gray-700">, {cert.issuer}</span>}</span>
                  <span className="font-semibold whitespace-nowrap" style={{ color: NAVY }}>{cert.date}</span>
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
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: GOLD }}>
                  <p className="text-[14.5px] font-bold">{ref.name}</p>
                  <p className="text-[12.5px] italic text-gray-700">{ref.title}{ref.company && `, ${ref.company}`}</p>
                  {ref.contact && <p className="text-[12px] text-gray-600">{ref.contact}</p>}
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
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[14.5px] font-bold">{item.title}</h3>
                      {item.date && <span className="text-[12.5px] font-semibold whitespace-nowrap" style={{ color: NAVY }}>{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-[13px] italic text-gray-700">{item.subtitle}</p>}
                    {item.description && <p className="text-[13.5px] leading-relaxed text-gray-800 mt-1">{item.description}</p>}
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
