import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">{title}</h2>
  );
}

export default function Gauge({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const initial = info.fullName?.charAt(0) || '';

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto flex">
      {/* Sidebar */}
      <aside className="w-[32%] relative shrink-0">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--theme-color)', filter: 'brightness(0.68)' }}
        />
        <div className="relative text-white p-8 space-y-8">
          <div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-5">
              <span className="text-2xl font-black">{initial}</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight leading-tight mb-1">{info.fullName}</h1>
            {info.jobTitle && <p className="text-sm font-medium opacity-90">{info.jobTitle}</p>}
          </div>

          <div className="space-y-2 text-sm opacity-90 font-medium">
            {info.email && <div className="break-all">{info.email}</div>}
            {info.phone && <div>{info.phone}</div>}
            {info.location && <div>{info.location}</div>}
            {info.website && <div className="break-all">{info.website}</div>}
          </div>

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-70">Skills</h2>
              <div className="space-y-3">
                {data.skills.map((skill, i) => {
                  const level = 60 + ((i * 37) % 36);
                  return (
                    <div key={skill.id}>
                      <div className="text-sm font-semibold mb-1.5">{skill.name}</div>
                      <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                        <div className="h-full rounded-full bg-white" style={{ width: `${level}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
            section.items.length > 0 && (
              <div key={section.id}>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-70">{section.title}</h2>
                <div className="space-y-2 text-sm font-medium opacity-90">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="font-semibold">{item.title}</div>
                      {item.subtitle && <div className="opacity-80 text-[13px]">{item.subtitle}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </aside>

      {/* Main column */}
      <main className="flex-1 p-10 space-y-8">
        {data.summary && (
          <section>
            <SectionHeader title="Profile" />
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <SectionHeader title="Experience" />
            <div className="space-y-7">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-xs font-semibold text-gray-400 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold mb-2" style={{ color: 'var(--theme-color)' }}>
                    {exp.company}
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
                    {exp.description.split(/\n|\r\n/).filter(l => l.trim()).map((line, i) => (
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
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                    <span className="text-xs font-semibold text-gray-400">{edu.graduationYear}</span>
                  </div>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionHeader title="Projects" />
            <div className="space-y-4">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                    {proj.link && <span className="text-xs font-semibold text-gray-400">{proj.link}</span>}
                  </div>
                  {proj.description && <p className="text-sm text-gray-600 mt-1">{proj.description}</p>}
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
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                    {cert.issuer && <div className="text-sm text-gray-600">{cert.issuer}</div>}
                  </div>
                  {cert.date && <span className="text-xs font-semibold text-gray-400">{cert.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.showReferences && data.references && data.references.length > 0 && (
          <section>
            <SectionHeader title="References" />
            <div className="grid grid-cols-2 gap-6">
              {data.references.map(ref => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <h3 className="font-bold text-gray-900">{ref.name}</h3>
                  <div className="text-sm text-gray-600">{ref.title} @ {ref.company}</div>
                  {ref.contact && <div className="text-sm text-gray-500">{ref.contact}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
