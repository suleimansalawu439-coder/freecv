import React from 'react';
import { ResumeData } from '@/app/page';

export default function SwissDesign({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#dc2626'; // default red-600
  return (
    <div className="w-[8.5in] min-h-[11in] bg-white p-[0.75in] font-sans mx-auto shadow-xl print:shadow-none print:border-none border border-gray-200">
      <div className="grid grid-cols-12 gap-6 h-full">
        <div className="col-span-12 border-b-2 border-gray-900 pb-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-6xl font-black uppercase tracking-tight leading-none mb-4">
                {data.personalInfo.fullName}
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-16 h-1" style={{ backgroundColor: c }} />
                <p className="text-lg font-medium uppercase tracking-wider">{data.personalInfo.jobTitle}</p>
              </div>
            </div>
            {data.personalInfo.profilePicture && (
              <img src={data.personalInfo.profilePicture} alt="Profile" className="w-28 h-28 object-cover grayscale" />
            )}
          </div>
        </div>

        <div className="col-span-4 space-y-8">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">01. Contact</h2>
            <div className="space-y-4 text-sm">
              {data.personalInfo.email && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                  <p className="font-medium">{data.personalInfo.email}</p>
                </div>
              )}
              {data.personalInfo.phone && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Phone</p>
                  <p className="font-medium">{data.personalInfo.phone}</p>
                </div>
              )}
              {data.personalInfo.location && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Location</p>
                  <p className="font-medium">{data.personalInfo.location}</p>
                </div>
              )}
              {data.personalInfo.website && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Website</p>
                  <p className="font-medium">{data.personalInfo.website}</p>
                </div>
              )}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">02. Skills</h2>
              <div className="space-y-3">
                {data.skills.map(s => (
                  <div key={s.id} className="flex items-center gap-3">
                    <div className="w-2 h-2" style={{ backgroundColor: c }} />
                    <span className="text-sm font-medium">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">03. Education</h2>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-4">
                  <p className="text-sm font-bold uppercase">{edu.degree}</p>
                  <p className="text-xs text-gray-600 mt-1">{edu.school}</p>
                  <p className="text-xs font-bold mt-1" style={{ color: c }}>{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-8">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-8">04. Experience</h2>
          <div className="space-y-10">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-8 border-l-2 border-gray-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 rounded-full" style={{ borderColor: c }} />
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-xl font-bold uppercase">{exp.role}</h3>
                  <span className="text-xs font-bold bg-gray-100 px-3 py-1">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wider">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, j) => (
                    <li key={j} className="text-sm leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {data.summary && (
            <div className="mt-12 p-8 bg-gray-50">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4">05. Profile</h2>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </div>
          )}
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