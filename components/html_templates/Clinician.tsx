import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const CLINICAL_BLUE = '#2563eb';
const CLINICAL_BLUE_DARK = '#1d4ed8';

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b border-blue-100" style={{ color: CLINICAL_BLUE_DARK }}>
      {children}
    </h2>
  );
}

export default function Clinician({ data }: { data: ResumeData }) {
  const contactItems = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none border-t-8 border-blue-600 p-[0.85in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-slate-800 leading-relaxed">

      {/* Header */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">{data.personalInfo.fullName}</h1>
        {data.personalInfo.jobTitle && (
          <p className="text-base font-semibold mb-2.5" style={{ color: CLINICAL_BLUE }}>{data.personalInfo.jobTitle}</p>
        )}
        <p className="text-xs text-slate-500">
          {contactItems.join(' · ')}
          {data.personalInfo.website && (
            <>
              {contactItems.length > 0 && ' · '}
              <a href={data.personalInfo.website} className="font-medium" style={{ color: CLINICAL_BLUE }}>
                {data.personalInfo.website}
              </a>
            </>
          )}
        </p>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <SectionHeader>Professional Summary</SectionHeader>
          <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Certifications — credential-forward */}
      {data.showCertifications && data.certifications.length > 0 && (
        <div className="mb-6">
          <SectionHeader>Certifications & Licenses</SectionHeader>
          <div className="space-y-3">
            {data.certifications.map(cert => (
              <div key={cert.id} className="border-l-2 border-blue-500 pl-4">
                <div className="flex justify-between items-baseline gap-4">
                  <p className="text-sm font-bold text-slate-900">
                    {cert.name}
                    {cert.issuer && <span className="font-normal text-slate-600"> · {cert.issuer}</span>}
                  </p>
                  {cert.date && <span className="text-xs text-slate-500 whitespace-nowrap">{cert.date}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <SectionHeader>Clinical & Technical Skills</SectionHeader>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {data.skills.map(s => (
              <li key={s.id} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-[10px] mt-0.5" style={{ color: CLINICAL_BLUE }}>▪</span>
                <span>{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <SectionHeader>Professional Experience</SectionHeader>
          <div className="space-y-5">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <p className="text-sm font-bold text-slate-900">{exp.role}</p>
                <div className="flex justify-between items-baseline gap-4 mb-1">
                  <p className="text-sm font-medium text-slate-600">{exp.company}</p>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
                </div>
                <ul className="space-y-1">
                  {exp.description.split(/\n|\r?\n/).filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm text-slate-700 flex gap-2">
                      <span className="text-slate-400">–</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <SectionHeader>Education</SectionHeader>
          <div className="space-y-3">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-sm text-slate-600">{edu.school}</p>
                </div>
                {edu.graduationYear && (
                  <span className="text-xs text-slate-500 whitespace-nowrap">{edu.graduationYear}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-6">
          <SectionHeader>Projects</SectionHeader>
          <div className="space-y-3">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <p className="text-sm font-bold text-slate-900">
                  {proj.name}
                  {proj.link && (
                    <a href={proj.link} className="font-normal text-xs ml-2" style={{ color: CLINICAL_BLUE }}>
                      {proj.link}
                    </a>
                  )}
                </p>
                {proj.description && <p className="text-sm text-slate-700 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {data.showReferences && data.references.length > 0 && (
        <div className="mb-6">
          <SectionHeader>References</SectionHeader>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {data.references.map(ref => (
              <div key={ref.id}>
                <p className="text-sm font-bold text-slate-900">{ref.name}</p>
                <p className="text-xs text-slate-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.contact && <p className="text-xs text-slate-500 mt-0.5">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom sections */}
      {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
        section.items.length > 0 && (
          <div key={section.id} className="mb-6">
            <SectionHeader>{section.title}</SectionHeader>
            <div className="space-y-3">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      {item.subtitle && <p className="text-sm italic text-slate-600">{item.subtitle}</p>}
                    </div>
                    {item.date && <span className="text-xs text-slate-500 whitespace-nowrap">{item.date}</span>}
                  </div>
                  {item.description && <p className="text-sm text-slate-700 mt-1 whitespace-pre-wrap">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
