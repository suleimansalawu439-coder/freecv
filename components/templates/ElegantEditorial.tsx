import React from 'react';
import { ResumeData } from '@/app/page';

export default function ElegantEditorial({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#b45309'; // default amber-700
  return (
    <div className="w-[8.5in] min-h-[11in] bg-[#FDFBF7] p-[0.75in] font-serif mx-auto shadow-xl print:shadow-none print:border-none border border-gray-200">
      <div className="text-center mb-12">
        {data.personalInfo.profilePicture && (
          <img src={data.personalInfo.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto mb-6 shadow-md" style={{ border: `2px solid ${c}` }} />
        )}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 opacity-50" style={{ background: `linear-gradient(to right, transparent, ${c}, transparent)` }} />
          <div style={{ color: c }}>✦</div>
          <div className="h-px flex-1 opacity-50" style={{ background: `linear-gradient(to right, transparent, ${c}, transparent)` }} />
        </div>
        <h1 className="text-5xl font-light italic text-gray-900 mb-2">
          {data.personalInfo.fullName}
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] font-medium" style={{ color: c }}>
          {data.personalInfo.jobTitle}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_2.5fr] gap-12">
        <div className="border-r pr-8" style={{ borderColor: `${c}33` }}>
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ color: c, borderColor: `${c}4D` }}>
              Contact
            </h3>
            <div className="space-y-3 text-xs">
              <p className="leading-relaxed">{data.personalInfo.email}</p>
              <p className="leading-relaxed">{data.personalInfo.phone}</p>
              <p className="leading-relaxed">{data.personalInfo.location}</p>
              <p className="leading-relaxed">{data.personalInfo.website}</p>
            </div>
          </div>

          {data.skills.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ color: c, borderColor: `${c}4D` }}>
                Expertise
              </h3>
              <ul className="space-y-2">
                {data.skills.map(s => (
                  <li key={s.id} className="text-xs flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: c }} />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ color: c, borderColor: `${c}4D` }}>
                Education
              </h3>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-4">
                  <p className="text-xs font-bold italic">{edu.degree}</p>
                  <p className="text-xs text-gray-600 mt-1">{edu.school}</p>
                  <p className="text-xs font-bold mt-1" style={{ color: c }}>{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {data.summary && (
            <div className="mb-12 pl-6 border-l-2" style={{ borderColor: c }}>
              <p className="text-sm leading-relaxed italic text-gray-700">
                {data.summary}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-light italic text-gray-900 mb-8">
              Professional Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-10">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-xs italic" style={{ color: c }}>
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-4 italic">
                  {exp.company}
                </p>
                <ul className="space-y-2">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, j) => (
                    <li key={j} className="text-sm text-gray-700 leading-relaxed flex gap-2">
                      <span style={{ color: c }}>•</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 pt-6 border-t text-center" style={{ borderColor: `${c}33` }}>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px flex-1 opacity-50" style={{ background: `linear-gradient(to right, transparent, ${c}, transparent)` }} />
          <div className="text-xs" style={{ color: c }}>✦</div>
          <div className="h-px flex-1 opacity-50" style={{ background: `linear-gradient(to right, transparent, ${c}, transparent)` }} />
        </div>
      </div>\n
      {/* CUSTOM SECTIONS */}
      {data.customSections && data.customSections.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          {data.customSections.map(section => (
            <div key={section.id} className="mb-6 last:mb-0">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300 mb-4 font-sans">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold leading-tight">{item.title}</h3>
                      {item.date && <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-gray-400 shrink-0 ml-4">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-xs font-bold text-gray-500 mb-1 font-sans uppercase tracking-wider">{item.subtitle}</p>}
                    {item.description && (
                      <div className="text-xs text-gray-700 leading-relaxed mt-1">
                        {item.description.split('\n').filter(l => l.trim()).map((line, i) => (
                          <div key={i} className="flex gap-2 mb-1"><span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" /><span>{line}</span></div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}