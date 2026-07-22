import React from 'react';
import { ResumeData } from '@/app/page';

export default function Terminal({ data }: { data: ResumeData }) {
  return (
    <div className="font-mono p-10 bg-[#0c0c0c] text-[#00ff00] min-h-[1056px] w-full max-w-[816px] mx-auto shadow-sm print:bg-[#0c0c0c] print:text-[#00ff00]">
      <div className="border border-[#00ff00] p-6 h-full opacity-90">
        <div className="mb-8">
          <div className="text-xs opacity-50 mb-2">Last login: {new Date().toUTCString()} on ttys000</div>
          <div className="text-xl font-bold mb-1">
            <span className="text-[var(--theme-color)]">guest@freecv</span>:<span className="text-blue-400">~</span>$ whoami
          </div>
          <h1 className="text-4xl font-bold mt-2">{data.personalInfo.fullName?.toLowerCase().replace(/\s+/g, '_')}</h1>
          <div className="text-sm mt-2 opacity-80">{data.personalInfo.jobTitle}</div>
        </div>

        <div className="mb-6">
          <div className="text-xl font-bold mb-2">
            <span className="text-[var(--theme-color)]">guest@freecv</span>:<span className="text-blue-400">~</span>$ cat contact.txt
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm pl-4">
            {data.personalInfo.email && <div>EMAIL={data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>PHONE={data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div>LOCATION="{data.personalInfo.location}"</div>}
            {data.personalInfo.website && <div>WEB={data.personalInfo.website}</div>}
          </div>
        </div>

        {data.summary && (
          <div className="mb-6">
            <div className="text-xl font-bold mb-2">
              <span className="text-[var(--theme-color)]">guest@freecv</span>:<span className="text-blue-400">~</span>$ cat summary.md
            </div>
            <div className="text-sm leading-relaxed pl-4 border-l border-[#00ff00]/30 py-1">
              {data.summary}
            </div>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-6">
            <div className="text-xl font-bold mb-4">
              <span className="text-[var(--theme-color)]">guest@freecv</span>:<span className="text-blue-400">~/experience</span>$ ls -la
            </div>
            <div className="space-y-6 pl-4">
              {data.experience.map((exp, i) => (
                <div key={exp.id}>
                  <div className="text-[var(--theme-color)] font-bold">./{exp.company.toLowerCase().replace(/\s+/g, '_')}.sh</div>
                  <div className="text-xs opacity-70 mb-2">[{exp.startDate} - {exp.endDate}] ROLE: {exp.role}</div>
                  <ul className="list-none space-y-1 text-sm">
                    {exp.description.split('\n').filter(Boolean).map((line, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="opacity-50">&gt;</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-2 animate-pulse mt-8">
          <div className="w-3 h-5 bg-[#00ff00]"></div>
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