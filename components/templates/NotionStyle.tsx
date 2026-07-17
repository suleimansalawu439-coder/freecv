import React from 'react';
import { ResumeData } from '@/app/page';

export default function NotionStyle({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans p-16 bg-white text-gray-800 min-h-[1056px] w-full max-w-[816px] mx-auto shadow-sm">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Cover / Icon area concept */}
        <div className="text-6xl mb-4">📄</div>
        <h1 className="text-5xl font-bold tracking-tight text-black mb-1">{data.personalInfo.fullName || 'Untitled'}</h1>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 border-b pb-6 mb-8">
          <div className="flex items-center gap-1"><span className="font-medium bg-gray-100 px-2 rounded">Role</span> {data.personalInfo.jobTitle}</div>
          {data.personalInfo.email && <div className="flex items-center gap-1"><span className="font-medium bg-gray-100 px-2 rounded">Email</span> {data.personalInfo.email}</div>}
          {data.personalInfo.location && <div className="flex items-center gap-1"><span className="font-medium bg-gray-100 px-2 rounded">Loc</span> {data.personalInfo.location}</div>}
        </div>

        {data.summary && (
          <div className="text-base leading-relaxed mb-8">
            {data.summary}
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2"><span className="text-gray-400">#</span> Experience</h2>
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id} className="pl-4 border-l-2 border-gray-200 hover:border-[var(--theme-color)] transition-colors">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{exp.role}</h3>
                    <span className="text-sm text-gray-400">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-sm font-medium text-[var(--theme-color)] mb-2">@ {exp.company}</div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700">
                    {exp.description.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other sections would follow same Notion aesthetic */}
        <div className="grid grid-cols-2 gap-8">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2"><span className="text-gray-400">#</span> Education</h2>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id} className="bg-gray-50 p-3 rounded border border-gray-100">
                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                    <div className="text-sm text-gray-600">{edu.school}</div>
                    <div className="text-xs text-gray-400 mt-1">{edu.graduationYear}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold border-b pb-2 mb-4 flex items-center gap-2"><span className="text-gray-400">#</span> Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <span key={skill.id} className="bg-[var(--theme-color)] bg-opacity-10 text-[var(--theme-color)] px-2 py-1 rounded text-xs font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      
        {data.showReferences && data.references && data.references.length > 0 && (
          <section className="mt-8 break-inside-avoid">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 opacity-80" style={{ color: 'var(--theme-color)' }}>References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.references.map(ref => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <h3 className="font-bold text-lg">{ref.name}</h3>
                  <div className="text-sm opacity-80 font-medium mb-1">{ref.position} @ {ref.company}</div>
                  <div className="text-sm opacity-70 flex flex-col gap-1">
                    {ref.email && <span>E: {ref.email}</span>}
                    {ref.phone && <span>P: {ref.phone}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
  
</div>
    </div>
  );
}