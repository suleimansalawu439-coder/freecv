import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mt-10 mb-6">
      <span className="text-[13px] font-black" style={{ color: 'var(--theme-color)' }}>{num}</span>
      <h2 className="text-[15px] font-black uppercase tracking-[0.2em]">{title}</h2>
      <div className="flex-1 border-t border-gray-200" />
    </div>
  );
}

export default function Podium({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-900 font-sans px-[0.9in] pt-[0.75in] pb-[0.85in] mx-auto">
      {/* Tiered centered header */}
      <header className="text-center mb-4">
        <h1 className="text-[44px] leading-tight font-black tracking-tight">{info.fullName}</h1>
        {info.jobTitle && (
          <div className="mt-4 mb-4">
            <span
              className="inline-block text-white text-[13px] font-bold uppercase tracking-[0.2em] px-6 py-2 rounded-full"
              style={{ backgroundColor: 'var(--theme-color)' }}
            >
              {info.jobTitle}
            </span>
          </div>
        )}
        {contact.length > 0 && (
          <p className="text-[13px] text-gray-600">{contact.join('  ·  ')}</p>
        )}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-10 h-2 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
          <div className="w-10 h-2 rounded-full bg-gray-200" />
          <div className="w-10 h-2 rounded-full bg-gray-200" />
        </div>
      </header>

      {data.summary && (
        <section>
          <SectionHeader num="01" title="Profile" />
          <p className="text-[14px] leading-[1.8] text-gray-700 text-center max-w-[6in] mx-auto">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <SectionHeader num="02" title="Experience" />
          <div className="space-y-6">
            {data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className={idx === 0 ? 'border-2 rounded-xl p-6' : 'border border-gray-200 rounded-xl p-6'}
                style={idx === 0 ? { borderColor: 'var(--theme-color)' } : undefined}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={idx === 0 ? 'text-[17px] font-black' : 'text-[15px] font-bold'}>{exp.role}</h3>
                  <span className="text-[12.5px] font-semibold text-gray-500 whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-[13.5px] font-semibold mb-3" style={{ color: 'var(--theme-color)' }}>{exp.company}</p>
                <ul className="space-y-1 text-[13.5px] leading-relaxed text-gray-700 list-disc ml-5">
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
          <SectionHeader num="03" title="Education" />
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline border border-gray-200 rounded-xl px-6 py-4">
                <div>
                  <p className="text-[14.5px] font-bold">{edu.degree}</p>
                  <p className="text-[13px] text-gray-600">{edu.school}</p>
                </div>
                <p className="text-[12.5px] font-semibold text-gray-500 whitespace-nowrap">{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <SectionHeader num="04" title="Skills" />
          <div className="space-y-3">
            {data.skills.map((skill, i) => (
              <div key={skill.id}>
                <div className="flex justify-between text-[13px] font-semibold mb-1">
                  <span>{skill.name}</span>
                  <span className="text-gray-400">#{i + 1}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.max(35, 100 - i * 7)}%`, backgroundColor: 'var(--theme-color)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <section>
          <SectionHeader num="05" title="Projects" />
          <div className="space-y-5">
            {data.projects.map(proj => (
              <div key={proj.id} className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[14.5px] font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[12px] text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-[13.5px] leading-relaxed text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showCertifications && data.certifications.length > 0 && (
        <section>
          <SectionHeader num="06" title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map(cert => (
              <div key={cert.id} className="flex justify-between text-[13.5px] border border-gray-200 rounded-xl px-6 py-3">
                <span><span className="font-bold">{cert.name}</span>{cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}</span>
                <span className="text-gray-500 font-semibold whitespace-nowrap">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.showReferences && data.references.length > 0 && (
        <section>
          <SectionHeader num="07" title="References" />
          <div className="grid grid-cols-2 gap-5">
            {data.references.map(ref => (
              <div key={ref.id} className="border border-gray-200 rounded-xl p-5">
                <p className="text-[14.5px] font-bold">{ref.name}</p>
                <p className="text-[12.5px] text-gray-600">{ref.title}{ref.company && `, ${ref.company}`}</p>
                {ref.contact && <p className="text-[12px] text-gray-500 mt-1">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.customSections && data.customSections.map((section, si) => (
        section.items && section.items.length > 0 && (
          <section key={section.id}>
            <SectionHeader num={String(si + 8).padStart(2, '0')} title={section.title} />
            <div className="space-y-5">
              {section.items.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-6">
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
        )
      ))}
    </div>
  );
}
