import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { orderSections } from '@/lib/template-sections';

export default function Classic({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[1in] flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-black">
      
      {orderSections(data, {
        personal: (
          <>
            <div className="text-center mb-6 pb-4 border-b border-black">
        <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide">{data.personalInfo.fullName}</h1>
        <p className="text-base font-bold mb-3 uppercase tracking-widest text-gray-700">{data.personalInfo.jobTitle}</p>
        <p className="text-xs text-gray-800 flex justify-center flex-wrap gap-x-4">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>| {data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>| {data.personalInfo.website}</span>}
        </p>
      </div>

      {data.summary && (
        <div className="mb-6 text-center">
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}
          </>
        ),

        experience: data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest text-center border-b border-gray-300 mb-4 pb-1">Professional Experience</h2>
          <div className="space-y-5">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{exp.role}</h3>
                  <span className="text-sm font-bold">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-sm italic mb-2">{exp.company}</p>
                <ul className="space-y-1 pl-4 list-disc">
                  {exp.description.split(/\\n|\r?\n/).filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ),

        projects: data.showProjects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest text-center border-b border-gray-300 mb-4 pb-1">Projects</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-base font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-xs italic text-gray-500">({proj.link})</span>}
                </div>
                <p className="text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      })}

      <div className="grid grid-cols-2 gap-8 mt-auto">
        <div>
          {orderSections(data, {
            education: data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase tracking-widest text-center border-b border-gray-300 mb-4 pb-1">Education</h2>
              <div className="space-y-3">
                {data.education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="text-sm font-bold">{edu.school}</p>
                      <p className="text-sm italic">{edu.degree}</p>
                    </div>
                    <p className="text-sm font-bold">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
            ),
          })}
        </div>
        <div>
          {orderSections(data, {
            certifications: data.showCertifications && data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase tracking-widest text-center border-b border-gray-300 mb-4 pb-1">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map(cert => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="text-sm font-bold">{cert.name}</p>
                      <p className="text-sm italic">{cert.issuer}</p>
                    </div>
                    <p className="text-sm font-bold">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
            ),

            references: data.showReferences && data.references.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase tracking-widest text-center border-b border-gray-300 mb-4 pb-1">References</h2>
              <div className="space-y-3">
                {data.references.map(ref => (
                  <div key={ref.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="text-sm font-bold">{ref.name}</p>
                      <p className="text-sm italic">{ref.title} at {ref.company}</p>
                    </div>
                    <p className="text-sm font-bold">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
            ),

            skills: data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold uppercase tracking-widest text-center border-b border-gray-300 mb-4 pb-1">Skills</h2>
              <p className="text-sm leading-relaxed text-center">
                {data.skills.map(s => s.name).join(' • ')}
              </p>
            </div>
            ),
          },
            (data.customSections || [])
              .filter((section) => section.items && section.items.length > 0)
              .map((section) => (
              <div key={section.id} className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-widest text-center border-b border-gray-300 mb-4 pb-1">{section.title}</h2>
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
