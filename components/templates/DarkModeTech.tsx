import React from 'react';
import { ResumeData } from '@/app/page';

export default function DarkModeTech({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#06b6d4'; // default cyan-500
  return (
    <div className="w-[8.5in] min-h-[11in] bg-gray-900 p-[0.75in] font-mono text-gray-300 mx-auto shadow-xl print:shadow-none print:border-none border border-gray-800">
      <div className="border-b pb-8 mb-10" style={{ borderColor: c }}>
        <div className="flex items-center gap-6">
          {data.personalInfo.profilePicture && (
            <img src={data.personalInfo.profilePicture} alt="Profile" className="w-24 h-24 rounded-xl object-cover border-2" style={{ borderColor: c }} />
          )}
          <div>
            <h1 className="text-5xl font-black mb-3" style={{ color: c }}>
              {data.personalInfo.fullName}
            </h1>
            <p className="text-lg font-medium" style={{ color: c }}>{data.personalInfo.jobTitle}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mb-10 text-xs bg-gray-800/50 p-4 rounded-lg border" style={{ borderColor: c }}>
        {data.personalInfo.email && (
          <span className="flex items-center gap-2">
            <span style={{ color: c }}>✉</span>
            {data.personalInfo.email}
          </span>
        )}
        {data.personalInfo.phone && (
          <span className="flex items-center gap-2">
            <span style={{ color: c }}>✆</span>
            {data.personalInfo.phone}
          </span>
        )}
        {data.personalInfo.location && (
          <span className="flex items-center gap-2">
            <span style={{ color: c }}>⌂</span>
            {data.personalInfo.location}
          </span>
        )}
        {data.personalInfo.website && (
          <span className="flex items-center gap-2">
            <span style={{ color: c }}>⚑</span>
            {data.personalInfo.website}
          </span>
        )}
      </div>

      {data.summary && (
        <div className="mb-10 p-6 bg-gray-800/20 border-l-4 rounded-r-lg" style={{ borderColor: c }}>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-8 uppercase tracking-wider flex items-center gap-3" style={{ color: c }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: c }} />
            Work Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-8 border-l-2" style={{ borderColor: c }}>
                <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: c }} />
                <div className="bg-gray-800/30 p-5 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="text-sm" style={{ color: c }}>{exp.company}</p>
                    </div>
                    <span className="text-xs bg-gray-800 px-3 py-1 rounded border border-gray-700" style={{ color: c }}>
                      {exp.startDate} → {exp.endDate}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.split('\n').filter(l => l.trim()).map((line, j) => (
                      <li key={j} className="text-sm flex gap-3">
                        <span style={{ color: c }}>›</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider" style={{ color: c }}>Skills</h2>
            <div className="space-y-3">
              {data.skills.map((s, i) => (
                <div key={s.id} className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-white">{s.name}</span>
                    <span className="text-xs" style={{ color: c }}>{Math.max(50, 90 - (i * 5))}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.max(50, 90 - (i * 5))}%`, backgroundColor: c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider" style={{ color: c }}>Education</h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id} className="bg-gray-800/30 p-5 rounded-lg border border-gray-700">
                  <p className="text-sm font-bold text-white mb-2">{edu.degree}</p>
                  <p className="text-xs text-gray-400 mb-2">{edu.school}</p>
                  <p className="text-xs font-mono" style={{ color: c }}>{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}