import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 pb-2 border-b-2 border-gray-900">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em]">{title}</h2>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <p className="text-xs">
      <span className="font-bold uppercase tracking-wider text-gray-900">{label}: </span>
      <span className="text-gray-700">{value}</span>
    </p>
  );
}

export default function Protocol({ data }: { data: ResumeData }) {
  const info = data.personalInfo;

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto px-[0.85in] py-[0.75in]">
      {orderSections(data, {
        personal: (
          <>
      {/* Header — protocol fields */}
      <header className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-1">Candidate Dossier</p>
        <h1 className="text-[26px] font-bold mb-1">{info.fullName}</h1>
        {info.jobTitle && <p className="text-sm font-semibold mb-3">{info.jobTitle}</p>}
        <div className="grid grid-cols-2 gap-x-8 gap-y-1">
          <Field label="Email" value={info.email} />
          <Field label="Phone" value={info.phone} />
          <Field label="Location" value={info.location} />
          <Field label="Website" value={info.website} />
        </div>
      </header>

      {data.summary && (
        <section className="mb-6">
          <SectionHeader title="Summary" />
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="grid grid-cols-2 gap-x-8 mb-1">
                  <p className="text-sm"><span className="font-bold uppercase tracking-wider text-xs">Role: </span><span className="font-bold text-sm">{exp.role}</span></p>
                  <p className="text-sm"><span className="font-bold uppercase tracking-wider text-xs">Tenure: </span><span className="text-sm">{exp.startDate} – {exp.endDate}</span></p>
                </div>
                <p className="text-sm mb-1"><span className="font-bold uppercase tracking-wider text-xs">Employer: </span><span className="text-sm">{exp.company}</span></p>
                {exp.description && (
                  <div className="mt-1">
                    <p className="font-bold uppercase tracking-wider text-xs mb-1">Duties & Achievements:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
                        <li key={i} className="text-sm leading-relaxed">{line.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        ),

        education: data.education.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-sm"><span className="font-bold uppercase tracking-wider text-xs">Degree: </span><span className="font-bold text-sm">{edu.degree}</span></p>
                <p className="text-sm"><span className="font-bold uppercase tracking-wider text-xs">Institution: </span><span className="text-sm">{edu.school}</span></p>
                {edu.graduationYear && <p className="text-sm"><span className="font-bold uppercase tracking-wider text-xs">Year: </span><span className="text-sm">{edu.graduationYear}</span></p>}
              </div>
            ))}
          </div>
        </section>
        ),

        skills: data.skills.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Skills Inventory" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            {data.skills.map((skill, i) => (
              <p key={skill.id} className="text-sm">
                <span className="font-bold uppercase tracking-wider text-xs text-gray-500">{String(i + 1).padStart(2, '0')}: </span>
                {skill.name}
              </p>
            ))}
          </div>
        </section>
        ),

        projects: data.showProjects && data.projects.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Projects" />
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <p className="text-sm"><span className="font-bold uppercase tracking-wider text-xs">Project: </span><span className="font-bold text-sm">{proj.name}</span></p>
                {proj.link && <p className="text-sm"><span className="font-bold uppercase tracking-wider text-xs">Link: </span><span className="text-sm">{proj.link}</span></p>}
                <p className="text-sm"><span className="font-bold uppercase tracking-wider text-xs">Detail: </span><span className="text-sm">{proj.description}</span></p>
              </div>
            ))}
          </div>
        </section>
        ),

        certifications: data.showCertifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="Certifications" />
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <p key={cert.id} className="text-sm">
                <span className="font-bold">{cert.name}</span>
                {cert.issuer ? <span> — <span className="font-bold uppercase tracking-wider text-xs">Issuer: </span>{cert.issuer}</span> : ''}
                {cert.date ? <span> · <span className="font-bold uppercase tracking-wider text-xs">Date: </span>{cert.date}</span> : ''}
              </p>
            ))}
          </div>
        </section>
        ),

        references: data.showReferences && data.references.length > 0 && (
        <section className="mb-6">
          <SectionHeader title="References" />
          <div className="space-y-3">
            {data.references.map((ref) => (
              <div key={ref.id} className="grid grid-cols-2 gap-x-8 gap-y-1">
                <Field label="Name" value={ref.name} />
                <Field label="Title" value={ref.title} />
                <Field label="Company" value={ref.company} />
                <Field label="Contact" value={ref.contact} />
              </div>
            ))}
          </div>
        </section>
        ),

      },
      (data.customSections || [])
        .filter((section) => section.items && section.items.length > 0)
        .map((section) => (
          <section key={section.id} className="mb-6">
            <SectionHeader title={section.title} />
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <Field label="Title" value={item.title} />
                  <Field label="Subtitle" value={item.subtitle} />
                  <Field label="Date" value={item.date} />
                  <Field label="Detail" value={item.description} />
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
