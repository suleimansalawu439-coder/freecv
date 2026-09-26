import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { getOrderedSectionIds, orderSections } from '@/lib/template-sections';

function ZigHeader({ title, right }: { title: string; right: boolean }) {
  return (
    <h2
      className={`text-xs font-black uppercase tracking-[0.22em] mb-4 flex items-center gap-3 ${right ? 'flex-row-reverse text-right' : ''}`}
      style={{ color: 'var(--theme-color)' }}
    >
      <span className="inline-block w-8 h-[3px]" style={{ backgroundColor: 'var(--theme-color)' }} />
      <span>{title}</span>
    </h2>
  );
}

export default function Zigzag({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  // Alternate alignment: even index = left, odd index = right. The alignment
  // follows the rendered order (the user's section order, minus hidden or
  // empty sections), so the zigzag pattern stays intact when sections are
  // reordered or hidden. The centered header never alternates; only the
  // Profile summary takes the 'personal' slot, mirroring the original
  // counter behavior.
  const zagRight: Record<string, boolean> = (() => {
    const rendered = getOrderedSectionIds(data).filter((id) => {
      switch (id) {
        case 'personal':
          return !!data.summary;
        case 'experience':
          return data.experience.length > 0;
        case 'skills':
          return data.skills.length > 0;
        case 'education':
          return data.education.length > 0;
        case 'projects':
          return data.showProjects && data.projects.length > 0;
        case 'certifications':
          return data.showCertifications && data.certifications.length > 0;
        case 'references':
          return data.showReferences && data.references.length > 0;
        default:
          return false;
      }
    });
    const map: Record<string, boolean> = {};
    rendered.forEach((id, n) => {
      map[id] = n % 2 === 1;
    });
    return map;
  })();
  const customBase = Object.keys(zagRight).length;

  const alignCls = (right: boolean) => (right ? 'text-right' : 'text-left');
  const rowCls = (right: boolean) => (right ? 'flex-row-reverse text-right' : '');

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-12 py-10">
      {orderSections(
        data,
        {
          personal: (
            <>
      {/* Centered header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight mb-1">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base font-bold mb-3" style={{ color: 'var(--theme-color)' }}>
            {info.jobTitle}
          </p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-600">{contactItems.join('  •  ')}</p>
        )}
        <div className="mt-5 flex justify-center items-center gap-2">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
          <div className="w-3 h-3 rotate-45" style={{ backgroundColor: 'var(--theme-color)' }} />
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: 'var(--theme-color)' }} />
        </div>
      </header>

      {data.summary && (
        <section className={`mb-8 ${alignCls(zagRight.personal)}`}>
          <ZigHeader title="Profile" right={zagRight.personal} />
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}
            </>
          ),

          experience: data.experience.length > 0 && (
        <section className={`mb-8 ${alignCls(zagRight.experience)}`}>
          <ZigHeader title="Experience" right={zagRight.experience} />
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className={`flex justify-between items-baseline mb-1 ${rowCls(zagRight.experience)}`}>
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <span className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--theme-color)' }}>
                  {exp.company}
                </p>
                {exp.description && (
                  <ul className={`space-y-1 ${zagRight.experience ? 'list-none' : 'list-disc list-outside ml-4'}`}>
                    {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                      <li key={i} className="text-sm leading-relaxed text-gray-700">{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ),

          skills: data.skills.length > 0 && (
        <section className={`mb-8 ${alignCls(zagRight.skills)}`}>
          <ZigHeader title="Skills" right={zagRight.skills} />
          <div className={`flex flex-wrap gap-2 ${zagRight.skills ? 'justify-end' : ''}`}>
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                style={{ backgroundColor: 'var(--theme-color)' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      ),

          education: data.education.length > 0 && (
        <section className={`mb-8 ${alignCls(zagRight.education)}`}>
          <ZigHeader title="Education" right={zagRight.education} />
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className={`flex justify-between items-baseline ${rowCls(zagRight.education)}`}>
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                </div>
                <p className="text-xs font-bold" style={{ color: 'var(--theme-color)' }}>
                  {edu.graduationYear}
                </p>
              </div>
            ))}
          </div>
        </section>
      ),

          projects: data.showProjects && data.projects.length > 0 && (
        <section className={`mb-8 ${alignCls(zagRight.projects)}`}>
          <ZigHeader title="Projects" right={zagRight.projects} />
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className={`flex items-baseline gap-2 mb-1 ${rowCls(zagRight.projects)}`}>
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-xs text-gray-500">({proj.link})</span>}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className={`mb-8 ${alignCls(zagRight.certifications)}`}>
          <ZigHeader title="Certifications" right={zagRight.certifications} />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className={`flex justify-between items-baseline ${rowCls(zagRight.certifications)}`}>
                <p className="text-sm font-bold">{cert.name} <span className="font-normal text-gray-600">— {cert.issuer}</span></p>
                <p className="text-xs font-semibold text-gray-500">{cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      ),

          references: data.showReferences && data.references.length > 0 && (
        <section className={`mb-8 ${alignCls(zagRight.references)}`}>
          <ZigHeader title="References" right={zagRight.references} />
          <div className={`grid grid-cols-2 gap-4 ${zagRight.references ? 'text-right' : ''}`}>
            {data.references.map((ref) => (
              <div key={ref.id}>
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                <p className="text-xs text-gray-500">{ref.contact}</p>
              </div>
            ))}
          </div>
        </section>
      ),
        },
        (data.customSections || [])
          .filter((section) => section.items && section.items.length > 0)
          .map((section, si) => {
            const right = (customBase + si) % 2 === 1;
            return (
              <section key={section.id} className={`mb-8 ${alignCls(right)}`}>
                <ZigHeader title={section.title} right={right} />
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className={`flex justify-between items-baseline mb-1 ${rowCls(right)}`}>
                        <h3 className="text-sm font-bold">{item.title}</h3>
                        {item.date && <span className="text-xs font-semibold text-gray-500">{item.date}</span>}
                      </div>
                      {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                      {item.description && <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            );
          })
      )}
    </div>
  );
}
