import React from 'react';
import { ResumeData } from '@/app/page';

export default function Glassmorphism({ data }: { data: ResumeData }) {
  return (
    <div className="font-sans p-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white min-h-[1056px] w-full max-w-[816px] mx-auto print:bg-none print:bg-white print:text-black">
      <div className="h-full bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] print:border-none print:shadow-none print:bg-transparent">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-black tracking-tight mb-2 print:text-black">{data.personalInfo.fullName}</h1>
          <p className="text-xl font-bold bg-white/30 px-4 py-1 rounded-full inline-block backdrop-blur-sm print:bg-gray-100 print:text-black">{data.personalInfo.jobTitle}</p>
        </header>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 space-y-6">
            <div className="bg-white/10 p-5 rounded-2xl border border-white/20 print:bg-transparent print:border-gray-200">
              <h2 className="text-xs font-bold uppercase tracking-widest opacity-70 mb-3 print:text-gray-500">Contact</h2>
              <div className="space-y-2 text-sm font-medium">
                {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
                {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
              </div>
            </div>

            {data.skills.length > 0 && (
              <div className="bg-white/10 p-5 rounded-2xl border border-white/20 print:bg-transparent print:border-gray-200">
                <h2 className="text-xs font-bold uppercase tracking-widest opacity-70 mb-3 print:text-gray-500">Skills</h2>
                <div className="flex flex-col gap-2">
                  {data.skills.map(skill => (
                    <div key={skill.id} className="bg-white/20 px-3 py-1.5 rounded-lg text-sm font-bold print:bg-gray-100 print:text-black">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-2 space-y-8">
            {data.summary && (
              <div className="bg-white/10 p-6 rounded-2xl border border-white/20 print:bg-transparent print:border-gray-200">
                <p className="leading-relaxed text-sm font-medium print:text-black">{data.summary}</p>
              </div>
            )}

            {data.experience.length > 0 && (
              <div className="bg-white/10 p-6 rounded-2xl border border-white/20 print:bg-transparent print:border-gray-200">
                <h2 className="text-sm font-black uppercase tracking-widest mb-6 print:text-gray-500">Experience</h2>
                <div className="space-y-6">
                  {data.experience.map(exp => (
                    <div key={exp.id}>
                      <h3 className="text-lg font-bold print:text-black">{exp.role}</h3>
                      <div className="text-sm opacity-80 mb-2 font-bold print:text-gray-600">{exp.company} • {exp.startDate}-{exp.endDate}</div>
                      <ul className="list-disc list-outside ml-4 space-y-1 text-sm opacity-90 print:text-gray-800">
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      
        {data.showReferences && data.references && data.references.length > 0 && (
          <section className="mt-8 break-inside-avoid">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 opacity-80" style={{ color: 'var(--theme-color)' }}>References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.references.map(ref => (
                <div key={ref.id} className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-color)' }}>
                  <h3 className="font-bold text-lg">{ref.name}</h3>
                  <div className="text-sm opacity-80 font-medium mb-1">{ref.title} @ {ref.company}</div>
                  <div className="text-sm opacity-70 flex flex-col gap-1">
                    {ref.contact && <span>{ref.contact}</span>}
                    
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