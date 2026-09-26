import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections, getOrderedSectionIds, isSectionVisible } from '@/lib/template-sections';

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-8 first:mt-0">
      <span
        className="font-mono text-xs font-bold px-2 py-1 text-white"
        style={{ backgroundColor: 'var(--theme-color)' }}
      >
        {index}
      </span>
      <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-slate-700">
        {title}
      </h2>
      <div className="flex-1 h-px bg-slate-300" />
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 py-1">
      <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 w-24 shrink-0">
        {label}
      </span>
      <span className="text-sm text-slate-800">{value}</span>
    </div>
  );
}

export default function Engine({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  // Section numbers ("01", "02", …) follow the rendered display order, so they
  // stay consecutive when the user reorders or hides sections. References keeps
  // its signature "99" label and never consumes a sequence number; custom
  // sections continue the sequence from the original 07 base.
  const sectionNums: Record<string, string> = (() => {
    const rendered = getOrderedSectionIds(data).filter((id) => {
      switch (id) {
        case 'personal': return !!data.summary;
        case 'experience': return data.experience.length > 0;
        case 'skills': return data.skills.length > 0;
        case 'education': return data.education.length > 0;
        case 'projects': return data.showProjects && data.projects.length > 0;
        case 'certifications': return data.showCertifications && data.certifications.length > 0;
        case 'references': return false;
        default: return false;
      }
    });
    const map: Record<string, string> = {};
    rendered.forEach((id, n) => { map[id] = String(n + 1).padStart(2, '0'); });
    return map;
  })();
  const customBase = Object.keys(sectionNums).length;

  // Custom sections keep their original position: ahead of References (which
  // closes the document as "99"). If References is hidden or empty, they fall
  // back to rendering after all ordered sections.
  const customJSX = (data.customSections || []).map((section, si) => (
    <section key={section.id}>
      <SectionHeader index={String(customBase + si + 1).padStart(2, '0')} title={section.title} />
      <div className="space-y-3">
        {(section.items || []).map((item) => (
          <div key={item.id}>
            <div className="flex justify-between items-baseline">
              <p className="text-sm font-bold">{item.title}</p>
              {item.date && <span className="font-mono text-xs text-slate-500">{item.date}</span>}
            </div>
            {item.subtitle && <p className="text-sm italic text-slate-600">{item.subtitle}</p>}
            {item.description && <p className="text-sm text-slate-700 mt-1">{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  ));
  const refsWillRender =
    isSectionVisible(data, 'references') && data.showReferences && data.references.length > 0;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-slate-900 mx-auto px-14 py-12">
      {orderSections(data, {
        personal: (
          <>
            {/* Spec header */}
            <header className="mb-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-3">
                {'// Resume Specification'}
              </p>
              <h1 className="text-4xl font-black tracking-tight mb-1">{info.fullName}</h1>
              {info.jobTitle && (
                <p className="font-mono text-sm font-bold" style={{ color: 'var(--theme-color)' }}>
                  {info.jobTitle}
                </p>
              )}
              {contactItems.length > 0 && (
                <p className="text-xs text-slate-600 mt-3 font-mono">{contactItems.join('  |  ')}</p>
              )}
              <div className="mt-5 h-1 w-full bg-slate-200">
                <div className="h-1 w-1/3" style={{ backgroundColor: 'var(--theme-color)' }} />
              </div>
            </header>

            {data.summary && (
              <section>
                <SectionHeader index={sectionNums.personal} title="Profile" />
                <p className="text-sm leading-relaxed text-slate-700 border-l-2 border-slate-200 pl-4">
                  {data.summary}
                </p>
              </section>
            )}
          </>
        ),

        experience: data.experience.length > 0 && (
          <section>
            <SectionHeader index={sectionNums.experience} title="Experience" />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border border-slate-200">
                <div
                  className="px-4 py-2 flex justify-between items-baseline"
                  style={{ backgroundColor: 'var(--theme-color)' }}
                >
                  <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                  <span className="font-mono text-[11px] text-white/90">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <SpecRow label="Company" value={exp.company} />
                  {exp.description
                    .split(/\n|\r?\n/)
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <div key={i} className="flex gap-4 py-1">
                        <span className="font-mono text-[11px] text-slate-400 w-24 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm text-slate-700 leading-relaxed">{line}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
          <section>
            <SectionHeader index={sectionNums.skills} title="Technical Skills" />
          <div className="grid grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {data.skills.map((skill) => (
              <div key={skill.id} className="bg-white px-3 py-2">
                <span className="font-mono text-xs text-slate-800">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
          <section>
            <SectionHeader index={sectionNums.education} title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm text-slate-600">{edu.school}</p>
                </div>
                <span className="font-mono text-xs text-slate-500">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionHeader index={sectionNums.projects} title="Projects" />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="font-mono text-[11px] text-slate-500">[{proj.link}]</span>}
                </div>
                <p className="text-sm text-slate-700 mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
          <section>
            <SectionHeader index={sectionNums.certifications} title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <p className="text-sm">
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                </p>
                <span className="font-mono text-xs text-slate-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
        ),

        references: refsWillRender && (
          <>
            {customJSX}
            <section>
              <SectionHeader index="99" title="References" />
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id} className="border border-slate-200 px-4 py-3">
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-slate-600">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="font-mono text-[11px] text-slate-500 mt-1">{ref.contact}</p>}
              </div>
            ))}
            </div>
            </section>
          </>
        ),
      },
        refsWillRender ? [] : customJSX
      )}
    </div>
  );
}
