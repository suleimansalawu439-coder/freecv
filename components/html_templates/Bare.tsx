import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function RunIn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="font-serif text-[15px] text-gray-900 leading-[1.9] mb-7">
      <span className="font-bold uppercase tracking-[0.14em] text-[13px]">{label}.&nbsp;&nbsp;</span>
      {children}
    </p>
  );
}

export default function Bare({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contact = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-serif text-gray-900 px-16 py-14 mx-auto">
      {orderSections(data, {
        personal: (
          <>
      <header className="mb-10">
        {info.fullName && (
          <h1 className="text-3xl font-bold tracking-tight text-black">{info.fullName}</h1>
        )}
        <p className="text-[15px] text-gray-700 mt-2 leading-relaxed">
          {[info.jobTitle, ...contact].filter(Boolean).join('  ·  ')}
        </p>
      </header>

      {data.summary && (
        <RunIn label="Profile">
          <span className="text-gray-800">{data.summary}</span>
        </RunIn>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <RunIn label="Experience">
          {data.experience.map((exp, idx) => (
            <span key={exp.id} className="text-gray-800">
              {idx > 0 && <span className="text-gray-400">{'  —  '}</span>}
              <span className="font-bold text-black">{exp.role}</span>
              {exp.company && <span>, {exp.company}</span>}
              {(exp.startDate || exp.endDate) && (
                <span className="text-gray-500">
                  {' '}({exp.startDate}{exp.startDate && exp.endDate ? '–' : ''}{exp.endDate})
                </span>
              )}
              {exp.description && (
                <span>
                  {': '}
                  {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((l) => l.trim()).join('; ')}
                </span>
              )}
            </span>
          ))}
        </RunIn>
        ),

        education: data.education.length > 0 && (
        <RunIn label="Education">
          {data.education.map((edu, idx) => (
            <span key={edu.id} className="text-gray-800">
              {idx > 0 && <span className="text-gray-400">{'  ·  '}</span>}
              {edu.degree && <span className="font-bold text-black">{edu.degree}</span>}
              {edu.degree && edu.school && <span>, </span>}
              {edu.school && <span>{edu.school}</span>}
              {edu.graduationYear && <span className="text-gray-500"> ({edu.graduationYear})</span>}
            </span>
          ))}
        </RunIn>
        ),

        skills: data.skills.length > 0 && (
        <RunIn label="Skills">
          <span className="text-gray-800">{data.skills.map((s) => s.name).join('; ')}</span>
        </RunIn>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <RunIn label="Projects">
          {data.projects.map((proj, idx) => (
            <span key={proj.id} className="text-gray-800">
              {idx > 0 && <span className="text-gray-400">{'  —  '}</span>}
              <span className="font-bold text-black">{proj.name}</span>
              {proj.link && <span className="text-gray-500"> ({proj.link})</span>}
              {proj.description && <span>: {proj.description}</span>}
            </span>
          ))}
        </RunIn>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <RunIn label="Certifications">
          {data.certifications.map((cert, idx) => (
            <span key={cert.id} className="text-gray-800">
              {idx > 0 && <span className="text-gray-400">{'  ·  '}</span>}
              <span className="font-bold text-black">{cert.name}</span>
              {cert.issuer && <span>, {cert.issuer}</span>}
              {cert.date && <span className="text-gray-500"> ({cert.date})</span>}
            </span>
          ))}
        </RunIn>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <RunIn label="References">
          {data.references.map((ref, idx) => (
            <span key={ref.id} className="text-gray-800">
              {idx > 0 && <span className="text-gray-400">{'  —  '}</span>}
              <span className="font-bold text-black">{ref.name}</span>
              {(ref.title || ref.company) && (
                <span>, {ref.title}{ref.title && ref.company ? ', ' : ''}{ref.company}</span>
              )}
              {ref.contact && <span className="text-gray-500"> ({ref.contact})</span>}
            </span>
          ))}
        </RunIn>
        ),
      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <RunIn key={section.id} label={section.title}>
            {section.items.map((item, idx) => (
              <span key={item.id} className="text-gray-800">
                {idx > 0 && <span className="text-gray-400">{'  —  '}</span>}
                {item.title && <span className="font-bold text-black">{item.title}</span>}
                {item.subtitle && <span>, {item.subtitle}</span>}
                {item.date && <span className="text-gray-500"> ({item.date})</span>}
                {item.description && <span>: {item.description}</span>}
              </span>
            ))}
          </RunIn>
        ))
      )}
    </div>
  );
}
