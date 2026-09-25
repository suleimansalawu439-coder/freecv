import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export default function Quarto({ data }: { data: ResumeData }) {
  const { personalInfo } = data;
  const contactParts = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(Boolean);

  const lines = (description: string) =>
    description ? description.split(/\n|\r\n/).filter((l) => l.trim()) : [];

  const theme = { color: 'var(--theme-color)' };

  const ChapterHead = ({ numeral, title }: { numeral: string; title: string }) => (
    <div className="mt-12 mb-6">
      <h2 className="font-serif text-2xl text-gray-900">
        <span className="text-sm font-bold tracking-[0.2em] mr-3" style={theme}>
          {numeral}.
        </span>
        <span className="text-3xl font-bold" style={theme}>
          {title.charAt(0)}
        </span>
        <span className="font-bold">{title.slice(1)}</span>
      </h2>
    </div>
  );

  const DropCapSummary = ({ text }: { text: string }) => {
    const first = text.charAt(0);
    const rest = text.slice(1);
    return (
      <p className="text-[15px] leading-[1.9] text-gray-800">
        <span className="float-left text-5xl font-bold font-serif leading-[0.85] pr-2 pt-1" style={theme}>
          {first}
        </span>
        {rest}
      </p>
    );
  };

  let chapterIndex = 0;
  const nextNumeral = () => ROMAN[chapterIndex++] || '';

  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white mx-auto px-14 py-14 font-serif leading-loose text-gray-800">
      {/* Title page */}
      <header className="text-center mb-4">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">{personalInfo.fullName}</h1>
        {personalInfo.jobTitle && (
          <p className="mt-3 text-lg italic text-gray-600">{personalInfo.jobTitle}</p>
        )}
        {contactParts.length > 0 && (
          <p className="mt-4 text-[13px] text-gray-600">{contactParts.join('  ·  ')}</p>
        )}
        <div className="mt-8 mx-auto w-24 border-t-2" style={{ borderColor: 'var(--theme-color)' }} />
      </header>

      {/* Preface — summary with drop cap */}
      {data.summary && (
        <section className="mt-10">
          <DropCapSummary text={data.summary} />
        </section>
      )}

      {/* Experience — Chapter I */}
      {data.experience && data.experience.length > 0 && (
        <section>
          <ChapterHead numeral={nextNumeral()} title="Experience" />
          <div className="space-y-7">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                <p className="text-[14px] text-gray-600">
                  <span className="italic">{exp.company}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-[13px]">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </p>
                <ul className="mt-2 space-y-1.5">
                  {lines(exp.description).map((line, i) => (
                    <li key={i} className="flex text-[14px] leading-[1.8] text-gray-800">
                      <span className="mr-3" style={theme}>❧</span>
                      <span>{line.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education — Chapter II */}
      {data.education && data.education.length > 0 && (
        <section>
          <ChapterHead numeral={nextNumeral()} title="Education" />
          <div className="space-y-5">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-[16px] font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-[14px] text-gray-600">
                  <span className="italic">{edu.school}</span>
                  {edu.graduationYear && <span className="mx-2 text-gray-400">|</span>}
                  {edu.graduationYear && <span className="text-[13px]">{edu.graduationYear}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills — Chapter III */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <ChapterHead numeral={nextNumeral()} title="Skills" />
          <p className="text-[14px] leading-loose text-gray-800">
            {data.skills.map((skill) => skill.name).join('  ·  ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <section>
          <ChapterHead numeral={nextNumeral()} title="Projects" />
          <div className="space-y-5">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-[16px] font-bold text-gray-900">
                  {project.name}
                  {project.link && <span className="font-normal italic text-gray-500 text-[14px]"> — {project.link}</span>}
                </h3>
                {project.description && (
                  <p className="text-[14px] text-gray-800 leading-[1.8] mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.showCertifications && data.certifications && data.certifications.length > 0 && (
        <section>
          <ChapterHead numeral={nextNumeral()} title="Certifications" />
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-[16px] font-bold text-gray-900">{cert.name}</h3>
                <p className="text-[14px] text-gray-600">
                  {cert.issuer && <span className="italic">{cert.issuer}</span>}
                  {cert.issuer && cert.date && <span className="mx-2 text-gray-400">|</span>}
                  {cert.date && <span className="text-[13px]">{cert.date}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {data.showReferences && data.references && data.references.length > 0 && (
        <section>
          <ChapterHead numeral={nextNumeral()} title="References" />
          <div className="grid grid-cols-2 gap-6">
            {data.references.map((ref) => (
              <div key={ref.id}>
                <h3 className="text-[16px] font-bold text-gray-900">{ref.name}</h3>
                <p className="text-[14px] italic text-gray-600">
                  {ref.title}
                  {ref.company && `, ${ref.company}`}
                </p>
                {ref.contact && <p className="text-[13px] text-gray-600">{ref.contact}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom sections */}
      {data.customSections &&
        data.customSections.map(
          (section) =>
            section.items &&
            section.items.length > 0 && (
              <section key={section.id}>
                <ChapterHead numeral={nextNumeral()} title={section.title} />
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <h3 className="text-[16px] font-bold text-gray-900">{item.title}</h3>
                      <p className="text-[14px] text-gray-600">
                        {item.subtitle && <span className="italic">{item.subtitle}</span>}
                        {item.subtitle && item.date && <span className="mx-2 text-gray-400">|</span>}
                        {item.date && <span className="text-[13px]">{item.date}</span>}
                      </p>
                      {item.description && (
                        <p className="text-[14px] text-gray-800 leading-[1.8] mt-1">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
        )}
    </div>
  );
}
