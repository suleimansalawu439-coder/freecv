import React from 'react';
import { ResumeData } from '@/app/page';

export default function Boardroom({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#1e3a5f';
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-xl print:shadow-none flex font-sans mx-auto lg:mx-0 shrink-0 text-[#2A2A2A]">
      {/* Dark Sidebar */}
      <aside className="w-[2.8in] bg-[#1A1A1A] text-[#E0E0E0] p-[0.6in] pt-[0.75in] flex flex-col print:bg-[#1A1A1A] print:text-[#E0E0E0]" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' } as React.CSSProperties}>
        {/* Photo */}
        {data.personalInfo.profilePicture && (
          <img
            src={data.personalInfo.profilePicture}
            alt="Profile"
            className="w-full aspect-square object-cover mb-8"
            style={{ border: `2px solid ${c}` }}
          />
        )}

        {/* Name & Title */}
        <div className="mb-8">
          <h1 className="text-xl font-bold tracking-wide uppercase leading-tight text-white mb-2">
            {data.personalInfo.fullName}
          </h1>
          <div className="w-8 h-0.5 mb-2" style={{ backgroundColor: c }} />
          <p className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: c }}>
            {data.personalInfo.jobTitle}
          </p>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#666] mb-4">Contact</h3>
          <div className="space-y-2.5 text-[10px]">
            {data.personalInfo.email && (
              <div><span className="text-[8px] uppercase tracking-wider block mb-0.5" style={{ color: c }}>Email</span>{data.personalInfo.email}</div>
            )}
            {data.personalInfo.phone && (
              <div><span className="text-[8px] uppercase tracking-wider block mb-0.5" style={{ color: c }}>Phone</span>{data.personalInfo.phone}</div>
            )}
            {data.personalInfo.location && (
              <div><span className="text-[8px] uppercase tracking-wider block mb-0.5" style={{ color: c }}>Location</span>{data.personalInfo.location}</div>
            )}
            {data.personalInfo.website && (
              <div><span className="text-[8px] uppercase tracking-wider block mb-0.5" style={{ color: c }}>Web</span>{data.personalInfo.website}</div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#666] mb-4">Expertise</h3>
            <div className="space-y-2">
              {data.skills.map(s => (
                <div key={s.id} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 shrink-0" style={{ backgroundColor: c }} />
                  <span className="text-[10px] font-medium">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#666] mb-4">Education</h3>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <p className="text-[11px] font-semibold text-white leading-tight">{edu.degree}</p>
                  <p className="text-[10px] text-[#999] mt-0.5">{edu.school}</p>
                  <p className="text-[9px] font-semibold mt-0.5" style={{ color: c }}>{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.showCertifications && data.certifications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#666] mb-4">Certifications</h3>
            <div className="space-y-3">
              {data.certifications.map(cert => (
                <div key={cert.id}>
                  <p className="text-[10px] font-semibold text-white">{cert.name}</p>
                  <p className="text-[9px] text-[#999]">{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.showReferences && data.references.length > 0 && (
          <div>
            <h3 className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#666] mb-4">References</h3>
            <div className="space-y-3">
              {data.references.map(ref => (
                <div key={ref.id}>
                  <p className="text-[10px] font-semibold text-white">{ref.name}</p>
                  <p className="text-[9px] text-[#999]">{ref.title} at {ref.company}</p>
                  <p className="text-[9px] text-[#777]">{ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-[0.75in] pt-[0.75in]">
        {/* Summary */}
        {data.summary && (
          <div className="mb-10 pb-8 border-b border-gray-100">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: c }}>Profile</h2>
            <p className="text-[11.5px] leading-[1.85] text-[#555]">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] mb-6" style={{ color: c }}>Experience</h2>
            <div className="space-y-7">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative pl-5 border-l-2 border-gray-100">
                  <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                  <div className="flex justify-between items-baseline mb-1.5">
                    <h3 className="text-[14px] font-bold text-[#1A1A1A]">{exp.role}</h3>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-[#AAA] shrink-0 ml-4">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: c }}>
                    {exp.company}
                  </p>
                  <ul className="space-y-1.5">
                    {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                      <li key={i} className="text-[11px] leading-[1.7] text-[#555] flex gap-2.5">
                        <span className="mt-[6px] w-[3px] h-[3px] rounded-full bg-[#CCC] shrink-0" />
                        <span className="flex-1">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.showProjects && data.projects.length > 0 && (
          <section>
            <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] mb-6" style={{ color: c }}>Projects</h2>
            <div className="space-y-5">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="text-[13px] font-bold">{proj.name}</h3>
                    {proj.link && <span className="text-[9px] text-[#AAA]">{proj.link}</span>}
                  </div>
                  <p className="text-[11px] text-[#555] leading-[1.7]">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
