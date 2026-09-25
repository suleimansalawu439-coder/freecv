import React from 'react';
import { ResumeData, Experience, Education, Skill, Project, Certification, Reference, CustomSection } from '@/store/useResumeStore';

function MirrorHeader({ title }: { title: string }) {
  return (
    <h2
      className="text-xs font-black uppercase tracking-[0.2em] mb-4 pb-2 border-b-2"
      style={{ color: 'var(--theme-color)', borderColor: 'var(--theme-color)' }}
    >
      {title}
    </h2>
  );
}

function ExpBlock({ exp }: { exp: Experience }) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-bold">{exp.role}</h3>
      <p className="text-xs font-semibold mb-1" style={{ color: 'var(--theme-color)' }}>
        {exp.company} <span className="text-gray-400 font-normal">· {exp.startDate} – {exp.endDate}</span>
      </p>
      {exp.description && (
        <ul className="list-disc list-outside ml-4 space-y-1">
          {exp.description.split(/\n|\r?\n/).filter((l) => l.trim()).map((line, i) => (
            <li key={i} className="text-[13px] leading-relaxed text-gray-700">{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EduBlock({ edu }: { edu: Education }) {
  return (
    <div className="mb-4">
      <p className="text-sm font-bold">{edu.degree}</p>
      <p className="text-[13px] text-gray-600">{edu.school}</p>
      <p className="text-xs font-semibold" style={{ color: 'var(--theme-color)' }}>{edu.graduationYear}</p>
    </div>
  );
}

function SkillPills({ skills }: { skills: Skill[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <span
          key={skill.id}
          className="text-[11px] font-semibold px-2.5 py-1 rounded border"
          style={{ borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
}

function ProjectBlock({ proj }: { proj: Project }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-bold">{proj.name}</h3>
      {proj.link && <p className="text-[11px] text-gray-500 mb-1">{proj.link}</p>}
      <p className="text-[13px] text-gray-700 leading-relaxed">{proj.description}</p>
    </div>
  );
}

function CertBlock({ cert }: { cert: Certification }) {
  return (
    <div className="mb-2">
      <p className="text-[13px] font-bold">{cert.name}</p>
      <p className="text-xs text-gray-600">{cert.issuer} · {cert.date}</p>
    </div>
  );
}

function RefBlock({ ref }: { ref: Reference }) {
  return (
    <div className="mb-3">
      <p className="text-[13px] font-bold">{ref.name}</p>
      <p className="text-xs text-gray-600">{ref.title}{ref.company ? `, ${ref.company}` : ''}</p>
      <p className="text-xs text-gray-500">{ref.contact}</p>
    </div>
  );
}

function CustomBlock({ section }: { section: CustomSection }) {
  return (
    <div className="mb-6">
      <MirrorHeader title={section.title} />
      {section.items.map((item) => (
        <div key={item.id} className="mb-4">
          <h3 className="text-sm font-bold">{item.title}</h3>
          {item.subtitle && <p className="text-xs text-gray-600 mb-1">{item.subtitle}</p>}
          {item.date && <p className="text-xs font-semibold mb-1" style={{ color: 'var(--theme-color)' }}>{item.date}</p>}
          {item.description && <p className="text-[13px] text-gray-700 leading-relaxed">{item.description}</p>}
        </div>
      ))}
    </div>
  );
}

export default function Split({ data }: { data: ResumeData }) {
  const info = data.personalInfo;
  const contactItems = [info.email, info.phone, info.location, info.website].filter(Boolean);

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white font-sans text-gray-900 mx-auto">
      {/* Full-width header */}
      <header className="px-12 pt-10 pb-6 border-b-4" style={{ borderColor: 'var(--theme-color)' }}>
        <h1 className="text-4xl font-black tracking-tight mb-1">{info.fullName}</h1>
        {info.jobTitle && (
          <p className="text-base font-bold mb-3" style={{ color: 'var(--theme-color)' }}>{info.jobTitle}</p>
        )}
        {contactItems.length > 0 && (
          <p className="text-xs text-gray-600">{contactItems.join('  •  ')}</p>
        )}
        {data.summary && (
          <p className="text-[13px] leading-relaxed text-gray-700 mt-4 max-w-3xl">{data.summary}</p>
        )}
      </header>

      {/* Even mirror split */}
      <div className="flex px-12 py-8 gap-10">
        {/* Left column: career */}
        <div className="w-1/2">
          {data.experience.length > 0 && (
            <section className="mb-6">
              <MirrorHeader title="Experience" />
              {data.experience.map((exp) => <ExpBlock key={exp.id} exp={exp} />)}
            </section>
          )}
          {data.showProjects && data.projects.length > 0 && (
            <section className="mb-6">
              <MirrorHeader title="Projects" />
              {data.projects.map((proj) => <ProjectBlock key={proj.id} proj={proj} />)}
            </section>
          )}
        </div>

        {/* Right column: credentials */}
        <div className="w-1/2">
          {data.skills.length > 0 && (
            <section className="mb-6">
              <MirrorHeader title="Skills" />
              <SkillPills skills={data.skills} />
            </section>
          )}
          {data.education.length > 0 && (
            <section className="mb-6">
              <MirrorHeader title="Education" />
              {data.education.map((edu) => <EduBlock key={edu.id} edu={edu} />)}
            </section>
          )}
          {data.showCertifications && data.certifications.length > 0 && (
            <section className="mb-6">
              <MirrorHeader title="Certifications" />
              {data.certifications.map((cert) => <CertBlock key={cert.id} cert={cert} />)}
            </section>
          )}
          {data.showReferences && data.references.length > 0 && (
            <section className="mb-6">
              <MirrorHeader title="References" />
              {data.references.map((ref) => <RefBlock key={ref.id} ref={ref} />)}
            </section>
          )}
        </div>
      </div>

      {/* Custom sections full width below */}
      {data.customSections.length > 0 && (
        <div className="px-12 pb-10">
          {data.customSections.map((section) => <CustomBlock key={section.id} section={section} />)}
        </div>
      )}
    </div>
  );
}
