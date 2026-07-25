import React from 'react';
import type { ResumeData } from '@/app/page';

type PremiumVariant = {
  name: string;
  accent: string;
  muted: string;
  font: string;
  layout: 'classic' | 'sidebar' | 'band' | 'memo' | 'split';
  heading: string;
  sectionLabel: string;
};

const variants: Record<string, PremiumVariant> = {
  Atelier: {
    name: 'Atelier',
    accent: '#7c3aed',
    muted: '#f5f3ff',
    font: 'font-serif',
    layout: 'classic',
    heading: 'tracking-[-0.06em] text-[52px] leading-[0.9]',
    sectionLabel: 'text-[10px] uppercase tracking-[0.32em] font-black'
  },
  Beacon: {
    name: 'Beacon',
    accent: '#0f766e',
    muted: '#ecfdf5',
    font: 'font-sans',
    layout: 'sidebar',
    heading: 'tracking-[-0.04em] text-[46px] leading-[0.92]',
    sectionLabel: 'text-[10px] uppercase tracking-[0.28em] font-black'
  },
  BoardroomPro: {
    name: 'Boardroom Pro',
    accent: '#111827',
    muted: '#f3f4f6',
    font: 'font-serif',
    layout: 'memo',
    heading: 'tracking-[-0.05em] text-[50px] leading-[0.9]',
    sectionLabel: 'text-[9px] uppercase tracking-[0.35em] font-black'
  },
  Clarity: {
    name: 'Clarity',
    accent: '#2563eb',
    muted: '#eff6ff',
    font: 'font-sans',
    layout: 'classic',
    heading: 'tracking-[-0.055em] text-[48px] leading-[0.92]',
    sectionLabel: 'text-[10px] uppercase tracking-[0.3em] font-black'
  },
  Consultant: {
    name: 'Consultant',
    accent: '#b45309',
    muted: '#fffbeb',
    font: 'font-sans',
    layout: 'memo',
    heading: 'tracking-[-0.04em] text-[44px] leading-[0.95]',
    sectionLabel: 'text-[9px] uppercase tracking-[0.32em] font-black'
  },
  Horizon: {
    name: 'Horizon',
    accent: '#0369a1',
    muted: '#e0f2fe',
    font: 'font-sans',
    layout: 'band',
    heading: 'tracking-[-0.045em] text-[48px] leading-[0.92]',
    sectionLabel: 'text-[10px] uppercase tracking-[0.28em] font-black'
  },
  LegalModern: {
    name: 'Legal Modern',
    accent: '#4338ca',
    muted: '#eef2ff',
    font: 'font-serif',
    layout: 'split',
    heading: 'tracking-[-0.04em] text-[46px] leading-[0.94]',
    sectionLabel: 'text-[9px] uppercase tracking-[0.34em] font-black'
  },
  Nordic: {
    name: 'Nordic',
    accent: '#475569',
    muted: '#f8fafc',
    font: 'font-sans',
    layout: 'split',
    heading: 'tracking-[-0.06em] text-[52px] leading-[0.9]',
    sectionLabel: 'text-[10px] uppercase tracking-[0.34em] font-black'
  },
  Operator: {
    name: 'Operator',
    accent: '#dc2626',
    muted: '#fef2f2',
    font: 'font-sans',
    layout: 'sidebar',
    heading: 'tracking-[-0.05em] text-[44px] leading-[0.92]',
    sectionLabel: 'text-[10px] uppercase tracking-[0.26em] font-black'
  },
  PortfolioATS: {
    name: 'Portfolio ATS',
    accent: '#0891b2',
    muted: '#ecfeff',
    font: 'font-sans',
    layout: 'band',
    heading: 'tracking-[-0.05em] text-[46px] leading-[0.92]',
    sectionLabel: 'text-[10px] uppercase tracking-[0.3em] font-black'
  }
};

const cleanLine = (line: string) => line.replace(/^[•\-\u2022]\s*/, '').trim();

function SectionTitle({ children, variant }: { children: React.ReactNode; variant: PremiumVariant }) {
  return (
    <h2 className={`${variant.sectionLabel} mb-4`} style={{ color: variant.accent }}>
      {children}
    </h2>
  );
}

function ContactBlock({ data, compact = false }: { data: ResumeData; compact?: boolean }) {
  const items = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website
  ].filter(Boolean);

  return (
    <div className={compact ? 'space-y-1.5 text-[10px]' : 'flex flex-wrap gap-x-4 gap-y-1 text-[10px]'}>
      {items.map((item) => (
        <span key={item} className="font-bold uppercase tracking-[0.16em] text-gray-500 break-all">
          {item}
        </span>
      ))}
    </div>
  );
}

function ExperienceSection({ data, variant }: { data: ResumeData; variant: PremiumVariant }) {
  if (!data.experience.length) return null;

  return (
    <section className="mb-7">
      <SectionTitle variant={variant}>Experience</SectionTitle>
      <div className="space-y-5">
        {data.experience.map((exp) => (
          <article key={exp.id} className="break-inside-avoid">
            <div className="flex justify-between gap-5 items-baseline">
              <div>
                <h3 className="text-[16px] font-black leading-tight text-gray-950">{exp.role}</h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] mt-1" style={{ color: variant.accent }}>
                  {exp.company}
                </p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 shrink-0">
                {[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}
              </p>
            </div>
            <ul className="mt-3 space-y-1.5">
              {exp.description.split('\n').map(cleanLine).filter(Boolean).map((line, index) => (
                <li key={index} className="flex gap-2.5 text-[12px] leading-relaxed text-gray-700">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: variant.accent }} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function EducationSection({ data, variant }: { data: ResumeData; variant: PremiumVariant }) {
  if (!data.education.length) return null;

  return (
    <section className="mb-7 break-inside-avoid">
      <SectionTitle variant={variant}>Education</SectionTitle>
      <div className="space-y-3">
        {data.education.map((edu) => (
          <div key={edu.id}>
            <p className="text-[13px] font-black text-gray-950 leading-tight">{edu.degree}</p>
            <p className="text-[11px] text-gray-500 mt-1">{[edu.school, edu.graduationYear].filter(Boolean).join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ data, variant }: { data: ResumeData; variant: PremiumVariant }) {
  if (!data.skills.length) return null;

  return (
    <section className="mb-7 break-inside-avoid">
      <SectionTitle variant={variant}>Core Skills</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill) => (
          <span
            key={skill.id}
            className="rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-gray-700"
            style={{ backgroundColor: variant.muted, borderColor: `${variant.accent}22` }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ data, variant }: { data: ResumeData; variant: PremiumVariant }) {
  if (!data.showProjects || !data.projects.length) return null;

  return (
    <section className="mb-7">
      <SectionTitle variant={variant}>Selected Projects</SectionTitle>
      <div className="space-y-4">
        {data.projects.map((project) => (
          <article key={project.id} className="break-inside-avoid">
            <div className="flex justify-between gap-3">
              <h3 className="text-[13px] font-black text-gray-950">{project.name}</h3>
              {project.link && <span className="text-[10px] text-gray-400">{project.link}</span>}
            </div>
            <p className="text-[12px] leading-relaxed text-gray-700 mt-1">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection({ data, variant }: { data: ResumeData; variant: PremiumVariant }) {
  if (!data.showCertifications || !data.certifications.length) return null;

  return (
    <section className="mb-7 break-inside-avoid">
      <SectionTitle variant={variant}>Certifications</SectionTitle>
      <div className="space-y-2.5">
        {data.certifications.map((certification) => (
          <div key={certification.id}>
            <p className="text-[12px] font-black text-gray-950">{certification.name}</p>
            <p className="text-[10px] text-gray-500">
              {[certification.issuer, certification.date].filter(Boolean).join(' - ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CustomSections({ data, variant }: { data: ResumeData; variant: PremiumVariant }) {
  if (!data.customSections?.length) return null;

  return (
    <>
      {data.customSections.map((section) => (
        <section key={section.id} className="mb-7">
          <SectionTitle variant={variant}>{section.title}</SectionTitle>
          <div className="space-y-3">
            {section.items.map((item) => (
              <article key={item.id} className="break-inside-avoid">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-[13px] font-black text-gray-950">{item.title}</h3>
                    {item.subtitle && <p className="text-[11px] font-bold text-gray-500">{item.subtitle}</p>}
                  </div>
                  {item.date && <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">{item.date}</p>}
                </div>
                {item.description && <p className="text-[12px] leading-relaxed text-gray-700 mt-1">{item.description}</p>}
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function ReferencesSection({ data, variant }: { data: ResumeData; variant: PremiumVariant }) {
  if (!data.showReferences || !data.references.length) return null;

  return (
    <section className="mb-7 break-inside-avoid">
      <SectionTitle variant={variant}>References</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        {data.references.map((reference) => (
          <div key={reference.id}>
            <p className="text-[12px] font-black text-gray-950">{reference.name}</p>
            <p className="text-[10px] text-gray-500">{[reference.title, reference.company].filter(Boolean).join(' at ')}</p>
            <p className="text-[10px] text-gray-400">{reference.contact}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MainSections({ data, variant }: { data: ResumeData; variant: PremiumVariant }) {
  return (
    <>
      <ExperienceSection data={data} variant={variant} />
      <ProjectsSection data={data} variant={variant} />
      <CustomSections data={data} variant={variant} />
      <ReferencesSection data={data} variant={variant} />
    </>
  );
}

function SideSections({ data, variant }: { data: ResumeData; variant: PremiumVariant }) {
  return (
    <>
      <SkillsSection data={data} variant={variant} />
      <EducationSection data={data} variant={variant} />
      <CertificationsSection data={data} variant={variant} />
    </>
  );
}

function PremiumTemplate({ data, variant }: { data: ResumeData; variant: PremiumVariant }) {
  const summary = data.summary?.trim();
  const accentStyle = { color: variant.accent };

  if (variant.layout === 'sidebar') {
    return (
      <div className={`w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-950 shadow-xl print:shadow-none ${variant.font} mx-auto flex`}>
        <aside className="w-[2.45in] p-[0.5in] text-white" style={{ backgroundColor: variant.accent }}>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] opacity-70 mb-10">{variant.name}</p>
          <h1 className={`${variant.heading} font-black mb-4 text-white`}>{data.personalInfo.fullName}</h1>
          <p className="text-[15px] font-bold leading-snug opacity-90 mb-8">{data.personalInfo.jobTitle}</p>
          <div className="h-px bg-white/30 mb-8" />
          <ContactBlock data={data} compact />
        </aside>
        <div className="flex-1 p-[0.55in]">
          {summary && <p className="text-[13px] leading-relaxed text-gray-700 mb-8 border-l-4 pl-5" style={{ borderColor: variant.accent }}>{summary}</p>}
          <MainSections data={data} variant={variant} />
          <SideSections data={data} variant={variant} />
        </div>
      </div>
    );
  }

  if (variant.layout === 'band') {
    return (
      <div className={`w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-950 shadow-xl print:shadow-none ${variant.font} mx-auto`}>
        <header className="px-[0.7in] pt-[0.62in] pb-[0.38in] text-white" style={{ backgroundColor: variant.accent }}>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] opacity-70 mb-5">{variant.name}</p>
          <h1 className={`${variant.heading} font-black text-white`}>{data.personalInfo.fullName}</h1>
          <div className="flex justify-between gap-8 items-end mt-5">
            <p className="text-[16px] font-bold">{data.personalInfo.jobTitle}</p>
            <ContactBlock data={data} />
          </div>
        </header>
        <div className="p-[0.65in]">
          {summary && <p className="text-[13px] leading-relaxed text-gray-700 mb-8">{summary}</p>}
          <div className="grid grid-cols-[1fr_2.35in] gap-10">
            <div><MainSections data={data} variant={variant} /></div>
            <aside><SideSections data={data} variant={variant} /></aside>
          </div>
        </div>
      </div>
    );
  }

  if (variant.layout === 'memo') {
    return (
      <div className={`w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-950 shadow-xl print:shadow-none p-[0.68in] ${variant.font} mx-auto`}>
        <div className="flex justify-between items-start border-b-2 pb-8 mb-8" style={{ borderColor: variant.accent }}>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-5" style={accentStyle}>{variant.name}</p>
            <h1 className={`${variant.heading} font-black`}>{data.personalInfo.fullName}</h1>
            <p className="text-[16px] font-bold mt-3" style={accentStyle}>{data.personalInfo.jobTitle}</p>
          </div>
          <ContactBlock data={data} compact />
        </div>
        {summary && <p className="text-[13px] leading-relaxed text-gray-700 mb-8 bg-gray-50 p-5 border-l-4" style={{ borderColor: variant.accent }}>{summary}</p>}
        <div className="grid grid-cols-[1fr_2.25in] gap-10">
          <div><MainSections data={data} variant={variant} /></div>
          <aside><SideSections data={data} variant={variant} /></aside>
        </div>
      </div>
    );
  }

  if (variant.layout === 'split') {
    return (
      <div className={`w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-950 shadow-xl print:shadow-none p-[0.62in] ${variant.font} mx-auto`}>
        <header className="grid grid-cols-[1fr_2.25in] gap-10 mb-9">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-5" style={accentStyle}>{variant.name}</p>
            <h1 className={`${variant.heading} font-black`}>{data.personalInfo.fullName}</h1>
          </div>
          <div className="border-l pl-7" style={{ borderColor: `${variant.accent}55` }}>
            <p className="text-[16px] font-black mb-5" style={accentStyle}>{data.personalInfo.jobTitle}</p>
            <ContactBlock data={data} compact />
          </div>
        </header>
        {summary && <p className="text-[13px] leading-relaxed text-gray-700 mb-8">{summary}</p>}
        <div className="grid grid-cols-[1fr_2.25in] gap-10">
          <div><MainSections data={data} variant={variant} /></div>
          <aside><SideSections data={data} variant={variant} /></aside>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white text-gray-950 shadow-xl print:shadow-none p-[0.68in] ${variant.font} mx-auto`}>
      <header className="mb-8">
        <div className="h-2 w-24 mb-8" style={{ backgroundColor: variant.accent }} />
        <h1 className={`${variant.heading} font-black`}>{data.personalInfo.fullName}</h1>
        <div className="flex justify-between gap-8 items-start mt-5">
          <p className="text-[16px] font-black" style={accentStyle}>{data.personalInfo.jobTitle}</p>
          <ContactBlock data={data} />
        </div>
      </header>
      {summary && <p className="text-[13px] leading-relaxed text-gray-700 mb-8">{summary}</p>}
      <div className="grid grid-cols-[1fr_2.25in] gap-10">
        <div><MainSections data={data} variant={variant} /></div>
        <aside><SideSections data={data} variant={variant} /></aside>
      </div>
    </div>
  );
}

export const Atelier = ({ data }: { data: ResumeData }) => <PremiumTemplate data={data} variant={variants.Atelier} />;
export const Beacon = ({ data }: { data: ResumeData }) => <PremiumTemplate data={data} variant={variants.Beacon} />;
export const BoardroomPro = ({ data }: { data: ResumeData }) => <PremiumTemplate data={data} variant={variants.BoardroomPro} />;
export const Clarity = ({ data }: { data: ResumeData }) => <PremiumTemplate data={data} variant={variants.Clarity} />;
export const Consultant = ({ data }: { data: ResumeData }) => <PremiumTemplate data={data} variant={variants.Consultant} />;
export const Horizon = ({ data }: { data: ResumeData }) => <PremiumTemplate data={data} variant={variants.Horizon} />;
export const LegalModern = ({ data }: { data: ResumeData }) => <PremiumTemplate data={data} variant={variants.LegalModern} />;
export const Nordic = ({ data }: { data: ResumeData }) => <PremiumTemplate data={data} variant={variants.Nordic} />;
export const Operator = ({ data }: { data: ResumeData }) => <PremiumTemplate data={data} variant={variants.Operator} />;
export const PortfolioATS = ({ data }: { data: ResumeData }) => <PremiumTemplate data={data} variant={variants.PortfolioATS} />;
