import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { getOrderedSectionIds, orderSections } from '@/lib/template-sections';

export default function AcademicJournal({ data }: { data: ResumeData }) {
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  // The journal numbers its sections I., II., III., ... in reading order
  // (left column top-to-bottom, then right column top-to-bottom). The numbers
  // follow the rendered order, so they stay consecutive when the user reorders
  // or hides sections. The identity header and Abstract are never numbered.
  const sectionNums: Record<string, string> = (() => {
    const hasData = (id: string): boolean => {
      switch (id) {
        case 'experience':
          return data.experience.length > 0;
        case 'education':
          return data.education.length > 0;
        case 'skills':
          return data.skills.length > 0;
        case 'references':
          return data.showReferences && !!data.references && data.references.length > 0;
        default:
          return false;
      }
    };
    const ids = getOrderedSectionIds(data);
    const ordered = [
      ...ids.filter((id) => id === 'experience' && hasData(id)),
      ...ids.filter((id) => id !== 'experience' && hasData(id)),
    ];
    const map: Record<string, string> = {};
    ordered.forEach((id, n) => {
      map[id] = ROMAN[n];
    });
    return map;
  })();

  return (
    <div className="font-serif p-10 sm:p-16 bg-white text-black w-full h-full mx-auto shadow-sm">
      {orderSections(data, {
        personal: (
          <>
      <header className="text-center mb-10 pb-6 border-b border-gray-300">
        <h1 className="text-4xl font-bold mb-4">{data.personalInfo.fullName}</h1>
        <p className="text-lg italic mb-4">{data.personalInfo.jobTitle}</p>
        <p className="text-sm text-gray-700">
          {data.personalInfo.email} {data.personalInfo.phone && ` • ${data.personalInfo.phone}`} {data.personalInfo.location && ` • ${data.personalInfo.location}`}
        </p>
      </header>

      {data.summary && (
        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-center mb-4">Abstract</h2>
          <p className="text-sm leading-relaxed text-justify px-8">
            {data.summary}
          </p>
        </section>
      )}
          </>
        ),
      })}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {orderSections(data, {
            experience: data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-base font-bold uppercase border-b border-black pb-1 mb-4" style={{ color: 'var(--theme-color)' }}>{sectionNums.experience}. Professional Appointments</h2>
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <h3 className="font-bold text-sm">{exp.role}</h3>
                    <div className="text-sm italic">{exp.company} ({exp.startDate} - {exp.endDate})</div>
                    <p className="text-sm leading-relaxed mt-2 text-justify whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
            ),
          })}
        </div>

        <div>
          {orderSections(data, {
            education: data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-base font-bold uppercase border-b border-black pb-1 mb-4" style={{ color: 'var(--theme-color)' }}>{sectionNums.education}. Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold text-sm">{edu.degree}</div>
                    <div className="text-sm">{edu.school}, {edu.graduationYear}</div>
                  </div>
                ))}
              </div>
            </section>
          ),

            skills: data.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-base font-bold uppercase border-b border-black pb-1 mb-4" style={{ color: 'var(--theme-color)' }}>{sectionNums.skills}. Technical Skills</h2>
              <ul className="list-disc list-outside ml-4 space-y-1 text-sm">
                {data.skills.map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </section>
          ),

            references: data.showReferences && data.references && data.references.length > 0 && (
            <section className="mb-8">
              <h2 className="text-base font-bold uppercase border-b border-black pb-1 mb-4" style={{ color: 'var(--theme-color)' }}>{sectionNums.references}. References</h2>
              <div className="space-y-4">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <h3 className="font-bold text-sm">{ref.name}</h3>
                    <div className="text-sm italic mb-1">{ref.title} @ {ref.company}</div>
                    <div className="text-sm">
                      {ref.contact && <span>{ref.contact}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ),
          },
          (data.customSections || [])
            .filter((section) => section.items && section.items.length > 0)
            .map((section) => (
              <div key={section.id} className="mb-6">
                <h2 className="text-lg font-bold border-b mb-2">{section.title}</h2>
                <div className="space-y-3">
                  {section.items.map(item => (
                    <div key={item.id} className="mb-2">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="text-sm font-bold">{item.title}</p>
                          {item.subtitle && <p className="text-sm italic">{item.subtitle}</p>}
                        </div>
                        {item.date && <p className="text-sm font-bold">{item.date}</p>}
                      </div>
                      {item.description && <p className="text-sm mt-1 whitespace-pre-wrap">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}