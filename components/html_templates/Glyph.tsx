import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

const iconProps = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const UserIcon = () => (
  <svg {...iconProps}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const BriefcaseIcon = () => (
  <svg {...iconProps}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
);
const GradCapIcon = () => (
  <svg {...iconProps}><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" /></svg>
);
const StarIcon = () => (
  <svg {...iconProps}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
const FolderIcon = () => (
  <svg {...iconProps}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
);
const AwardIcon = () => (
  <svg {...iconProps}><circle cx="12" cy="8" r="6" /><path d="M15.5 13 17 22l-5-3-5 3 1.5-9" /></svg>
);
const LayersIcon = () => (
  <svg {...iconProps}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
);

const tinyIconProps = { ...iconProps, width: 12, height: 12 };
const MailIcon = () => (
  <svg {...tinyIconProps}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
);
const PhoneIcon = () => (
  <svg {...tinyIconProps}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const MapPinIcon = () => (
  <svg {...tinyIconProps}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const GlobeIcon = () => (
  <svg {...tinyIconProps}><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);

function SectionHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <h2
      className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.18em] mb-5"
      style={{ color: 'var(--theme-color)' }}
    >
      <span className="inline-flex shrink-0">{icon}</span>
      <span>{title}</span>
      <span className="flex-1 h-px bg-gray-100" />
    </h2>
  );
}

export default function Glyph({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-16 py-14">
      {/* Header */}
      {orderSections(data, {
        personal: (
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light tracking-wide mb-2">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base font-medium text-gray-500 tracking-wide mb-5">{info.jobTitle}</p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-[13px] text-gray-500">
          {info.email && <span className="flex items-center gap-1.5"><MailIcon />{info.email}</span>}
          {info.phone && <span className="flex items-center gap-1.5"><PhoneIcon />{info.phone}</span>}
          {info.location && <span className="flex items-center gap-1.5"><MapPinIcon />{info.location}</span>}
          {info.website && <span className="flex items-center gap-1.5"><GlobeIcon />{info.website}</span>}
        </div>
      </header>
        ),
      })}

      <main className="space-y-10">
        {orderSections(data, {
          personal: data.summary && (
          <section>
            <SectionHeader title="Profile" icon={<UserIcon />} />
            <p className="text-[15px] leading-loose text-gray-600 font-light">{data.summary}</p>
          </section>
          ),

          experience: data.experience.length > 0 && (
          <section>
            <SectionHeader title="Experience" icon={<BriefcaseIcon />} />
            <div className="space-y-8">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2.5">{exp.company}</div>
                  <ul className="space-y-1.5 text-[14px] font-light text-gray-600">
                    {exp.description.split(/\n|\r\n/).filter(l => l.trim()).map((line, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--theme-color)' }} />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          ),

          education: data.education.length > 0 && (
          <section>
            <SectionHeader title="Education" icon={<GradCapIcon />} />
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900 text-[15px]">{edu.degree}</h3>
                    <span className="text-xs text-gray-400">{edu.graduationYear}</span>
                  </div>
                  <div className="text-sm font-light text-gray-500">{edu.school}</div>
                </div>
              ))}
            </div>
          </section>
          ),

          skills: data.skills.length > 0 && (
          <section>
            <SectionHeader title="Skills" icon={<StarIcon />} />
            <div className="space-y-3.5">
              {data.skills.map((skill, si) => {
                const level = 55 + ((si * 41) % 41);
                return (
                  <div key={skill.id} className="flex items-center gap-5">
                    <div className="w-44 text-sm font-medium text-gray-700 shrink-0">{skill.name}</div>
                    <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${level}%`, backgroundColor: 'var(--theme-color)' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          ),

          projects: data.showProjects && data.projects.length > 0 && (
          <section>
            <SectionHeader title="Projects" icon={<FolderIcon />} />
            <div className="space-y-5">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900 text-[15px]">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-gray-400">{proj.link}</span>}
                  </div>
                  {proj.description && <p className="text-[14px] font-light text-gray-600 mt-1.5">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
          ),

          certifications: data.showCertifications && data.certifications.length > 0 && (
          <section>
            <SectionHeader title="Certifications" icon={<AwardIcon />} />
            <div className="space-y-3.5">
              {data.certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-[15px]">{cert.name}</h3>
                    {cert.issuer && <div className="text-sm font-light text-gray-500">{cert.issuer}</div>}
                  </div>
                  {cert.date && <span className="text-xs text-gray-400">{cert.date}</span>}
                </div>
              ))}
            </div>
          </section>
          ),

          references: data.showReferences && data.references && data.references.length > 0 && (
          <section>
            <SectionHeader title="References" icon={<UserIcon />} />
            <div className="grid grid-cols-2 gap-8">
              {data.references.map(ref => (
                <div key={ref.id}>
                  <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                  <div className="text-sm font-light text-gray-500">{ref.title} @ {ref.company}</div>
                  {ref.contact && <div className="text-sm font-light text-gray-400">{ref.contact}</div>}
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
              <SectionHeader title={section.title} icon={<LayersIcon />} />
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-gray-900 text-[15px]">{item.title}</h3>
                      {item.date && <span className="text-xs text-gray-400">{item.date}</span>}
                    </div>
                    {item.subtitle && <div className="text-sm font-light text-gray-500 italic">{item.subtitle}</div>}
                    {item.description && <p className="text-[14px] font-light text-gray-600 mt-1.5 whitespace-pre-wrap">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
            ))
        )}
      </main>
    </div>
  );
}
