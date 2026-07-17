import React from 'react';
import { ResumeData } from '@/app/page';

export default function MinimalistSplit({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans flex bg-white text-gray-900 min-h-[1056px] w-full max-w-[816px] mx-auto shadow-sm">
      <div className="w-[35%] p-10 flex flex-col justify-between" style={{ backgroundColor: 'var(--theme-color)' }}>
        <div className="text-white space-y-10">
          <div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-black">{data.personalInfo.fullName?.charAt(0)}</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight leading-tight mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-sm font-medium opacity-90">{data.personalInfo.jobTitle}</p>
          </div>

          <div className="space-y-3 text-sm opacity-90 font-medium">
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
            {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
          </div>

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest mb-4 opacity-70">Skills</h2>
              <div className="flex flex-col gap-2 text-sm font-bold">
                {data.skills.map(skill => (
                  <div key={skill.id} className="bg-white/10 px-3 py-2 rounded-lg">{skill.name}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-[65%] p-10 space-y-10">
        {data.summary && (
          <section>
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Profile</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Experience</h2>
            <div className="space-y-8">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-xs font-bold text-gray-400">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'var(--theme-color)' }}>{exp.company}</div>
                  <ul className="mt-3 list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
                    {exp.description.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Education</h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                  <div className="text-sm text-gray-600">{edu.school}</div>
                  <div className="text-xs font-bold text-gray-400 mt-1">{edu.graduationYear}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      
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