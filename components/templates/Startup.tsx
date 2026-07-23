import React from 'react';
import { ResumeData } from '@/app/page';

export default function Startup({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none p-[0.75in] flex flex-col font-sans mx-auto lg:mx-0 shrink-0 text-gray-800">
      
      <div className="bg-[#f0fdf4] rounded-3xl p-8 mb-8 border-2 border-[#bbf7d0]">
        <h1 className="text-5xl font-black tracking-tight text-[#166534] mb-2">{data.personalInfo.fullName}</h1>
        <p className="text-lg font-bold text-[#22c55e] mb-6">{data.personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#166534]">
          {data.personalInfo.email && <span className="bg-white px-3 py-1 rounded-full border border-[#bbf7d0]">{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="bg-white px-3 py-1 rounded-full border border-[#bbf7d0]">{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="bg-white px-3 py-1 rounded-full border border-[#bbf7d0]">{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span className="bg-white px-3 py-1 rounded-full border border-[#bbf7d0]">{data.personalInfo.website}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-8 px-4">
          <p className="text-sm leading-relaxed font-medium text-gray-600">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-black text-[#166534] mb-5 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-sm">✦</span>
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-base font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-xs font-bold text-[#22c55e] bg-[#f0fdf4] px-2 py-1 rounded-lg shrink-0 ml-4">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-sm font-semibold text-gray-500 mb-3">{exp.company}</p>
                <ul className="space-y-1.5">
                  {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <li key={i} className="text-sm font-medium leading-relaxed flex gap-3 text-gray-600">
                      <span className="text-[#22c55e]">→</span>
                      <span className="flex-1">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.showProjects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-black text-[#166534] mb-5 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-sm">✦</span>
            Projects
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-1">{proj.name}</h3>
                {proj.link && <p className="text-xs text-[#22c55e] mb-2">{proj.link}</p>}
                <p className="text-xs font-medium text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 mt-auto">
        <div className={data.showCertifications ? "col-span-1" : "col-span-2"}>
          {data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-black text-[#166534] mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-[10px]">✦</span>
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map(edu => (
                  <div key={edu.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-xs font-semibold text-gray-500 mt-1">{edu.school}</p>
                    <p className="text-xs font-bold text-[#22c55e] mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {data.showCertifications && data.certifications.length > 0 && (
          <div className="col-span-1">
            <h2 className="text-lg font-black text-[#166534] mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-[10px]">✦</span>
              Certs
            </h2>
            <div className="space-y-3">
              {data.certifications.map(cert => (
                <div key={cert.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                  <p className="text-xs font-semibold text-gray-500 mt-1">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

{data.showReferences && data.references.length > 0 && (
          <div className="col-span-1">
            <h2 className="text-lg font-black text-[#166534] mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-[10px]">✦</span>References</h2>
            <div className="space-y-3">
              {data.references.map(ref => (
                <div key={ref.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-sm font-bold text-gray-900">{ref.name}</p>
                  <p className="text-xs font-semibold text-gray-500 mt-1">{ref.title} at {ref.company}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="col-span-1">
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-black text-[#166534] mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-[10px]">✦</span>
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map(s => (
                  <span key={s.id} className="text-[10px] font-bold text-[#166534] bg-[#f0fdf4] px-2 py-1 rounded-lg border border-[#bbf7d0]">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
