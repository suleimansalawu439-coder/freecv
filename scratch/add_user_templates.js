const fs = require('fs');
const path = require('path');

const templatesDir = path.join('c:/xampp/htdocs/freecv/components/templates');

const templates = {
  Retro80s: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function Retro80s({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#1A1A3A] text-[#FFE9FF] font-sans w-[8.5in] min-h-[11in] shadow-[0_0_60px_rgba(255,0,255,0.1)] print:shadow-none p-[0.75in] flex flex-col border-2 border-[#FF00FF] print:border-none mx-auto print:bg-white print:text-black">
      <div className="border-b-2 border-[#00FFFF] pb-6 mb-6 flex justify-between items-end print:border-black">
        <div>
          <h1 className="text-[44px] font-black tracking-tight leading-[0.9] text-[#FF00FF] print:text-black">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-bold text-[#00FFFF] mt-2 print:text-gray-700">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#FF00FF]/70 text-right print:text-gray-600">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#FFE9FF] border-l-4 border-[#FF00FF] pl-4 mb-8 print:text-black print:border-black">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-[0.3em] mb-5 print:text-black">EXPERIENCE</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-4 border-[#FF00FF] pl-4 print:border-black">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-black text-[#FFE9FF] print:text-black">{exp.role}</h3>
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#00FFFF] print:text-gray-600">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#FF00FF] mb-2 print:text-gray-800">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#FFE9FF] leading-relaxed flex gap-2 print:text-black">
                      <span className="text-[#00FFFF] print:text-black">⚡</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-2 border-[#FF00FF] pt-8 print:border-black">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-[0.3em] mb-4 print:text-black">EDUCATION</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 border-l-2 border-[#FF00FF] pl-3 print:border-black">
                <p className="text-md font-black text-[#FFE9FF] print:text-black">{edu.degree}</p>
                <p className="text-[10px] font-bold text-[#FF00FF] print:text-gray-700">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-[0.3em] mb-4 print:text-black">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-black uppercase tracking-wider text-[#FF00FF] border border-[#00FFFF] px-2 py-0.5 rounded print:text-black print:border-black">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.showProjects && data.projects.length > 0 && (
        <div className="mt-8 border-t-2 border-[#FF00FF] pt-8 print:border-black">
          <h2 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-[0.3em] mb-5 print:text-black">PROJECTS</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="border border-[#FF00FF]/30 p-3 rounded print:border-gray-300">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-black text-[#FFE9FF] print:text-black">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#00FFFF] print:text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#FFE9FF]/80 print:text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t-2 border-[#FF00FF] pt-8 print:border-black">
          <h2 className="text-[9px] font-black text-[#00FFFF] uppercase tracking-[0.3em] mb-5 print:text-black">REFERENCES</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-black text-[#FFE9FF] print:text-black">{ref.name}</p>
                <p className="text-xs text-[#FF00FF] print:text-gray-700">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#00FFFF] print:text-gray-500">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  HandDrawn: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function HandDrawn({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#FFFBF5] text-[#2A2A2A] font-sans w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border-2 border-[#8A7A6A] border-dashed print:border-none mx-auto">
      <div className="border-b-2 border-[#8A7A6A] border-dashed pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[44px] font-bold tracking-tight leading-[0.9] text-[#2A2A2A]">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-medium text-[#6A5A4A] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A7A6A] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#4A3A2A] border-l-2 border-[#8A7A6A] border-dashed pl-4 mb-8 italic">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-5">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#8A7A6A] border-dashed pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#2A2A2A]">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8A7A6A]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7A6A] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#4A3A2A] leading-relaxed flex gap-2">
                      <span className="text-[#8A7A6A]">✎</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-2 border-[#8A7A6A] border-dashed pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-4">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 border-l-2 border-[#8A7A6A] border-dashed pl-3">
                <p className="text-md font-bold text-[#2A2A2A]">{edu.degree}</p>
                <p className="text-[10px] text-[#8A7A6A]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-4">skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#6A5A4A] border border-[#8A7A6A] border-dashed px-2 py-0.5">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.showProjects && data.projects.length > 0 && (
        <div className="mt-8 border-t-2 border-[#8A7A6A] border-dashed pt-8">
          <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-5">projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="border border-[#8A7A6A] border-dashed p-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#2A2A2A]">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#8A7A6A]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#4A3A2A]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  FuturisticSciFi: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function FuturisticSciFi({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#0F1A2A] text-[#B0D0FF] font-mono w-[8.5in] min-h-[11in] shadow-[0_0_60px_rgba(74,154,255,0.1)] print:shadow-none p-[0.75in] flex flex-col border border-[#4A9AFF]/30 print:border-none mx-auto print:bg-white print:text-black">
      <div className="border-b border-[#4A9AFF]/40 pb-6 mb-6 flex justify-between items-end print:border-black">
        <div>
          <h1 className="text-[44px] font-black tracking-tight leading-[0.9] text-[#4A9AFF] print:text-black">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-[#B0D0FF] mt-2 print:text-gray-700">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#4A9AFF]/60 text-right print:text-gray-500">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#B0D0FF] border-l-2 border-[#4A9AFF] pl-4 mb-8 italic print:text-black print:border-black">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#4A9AFF] uppercase tracking-[0.3em] mb-5 print:text-black">// EXPERIENCE</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#4A9AFF]/50 pl-4 print:border-black">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#B0D0FF] print:text-black">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#4A9AFF]/60 print:text-gray-600">{exp.startDate} → {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#4A9AFF]/50 mb-2 print:text-gray-800">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#B0D0FF] leading-relaxed flex gap-2 print:text-black">
                      <span className="text-[#4A9AFF] print:text-black">▸</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#4A9AFF]/30 pt-8 print:border-black">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#4A9AFF] uppercase tracking-[0.3em] mb-4 print:text-black">// EDUCATION</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#B0D0FF] print:text-black">{edu.degree}</p>
                <p className="text-[10px] text-[#4A9AFF]/60 print:text-gray-700">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#4A9AFF] uppercase tracking-[0.3em] mb-4 print:text-black">// SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#4A9AFF] border border-[#4A9AFF]/40 px-2 py-0.5 rounded print:text-black print:border-black">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.showProjects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-[#4A9AFF]/30 pt-8 print:border-black">
          <h2 className="text-[9px] font-bold text-[#4A9AFF] uppercase tracking-[0.3em] mb-5 print:text-black">// PROJECTS</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="border border-[#4A9AFF]/30 p-3 print:border-gray-300">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#B0D0FF] print:text-black">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#4A9AFF] print:text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#B0D0FF]/80 print:text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  ZenJapanese: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function ZenJapanese({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#FDF8F0] text-[#2C2A24] font-sans w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border border-[#D4C8B8] print:border-none mx-auto">
      <div className="border-b border-[#D4C8B8] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[36px] font-light tracking-[0.1em] leading-[0.9] text-[#2C2A24]">{data.personalInfo.fullName}</h1>
          <p className="text-md font-light text-[#6A5A4A] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[8px] font-light uppercase tracking-[0.3em] text-[#8A7A6A] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[13px] leading-relaxed text-[#4A3A2A] border-l-2 border-[#8A7A6A] pl-4 mb-8 italic">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[8px] font-light text-[#8A7A6A] uppercase tracking-[0.4em] mb-5">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-light text-[#2C2A24]">{exp.role}</h3>
                  <span className="text-[8px] font-light uppercase tracking-[0.2em] text-[#8A7A6A]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[9px] font-light uppercase tracking-[0.15em] text-[#8A7A6A] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[12px] text-[#4A3A2A] leading-relaxed">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#D4C8B8] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[8px] font-light text-[#8A7A6A] uppercase tracking-[0.4em] mb-4">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-light text-[#2C2A24]">{edu.degree}</p>
                <p className="text-[9px] text-[#8A7A6A] font-light">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[8px] font-light text-[#8A7A6A] uppercase tracking-[0.4em] mb-4">skills</h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {data.skills.map(s => (
                <span key={s.id} className="text-[9px] font-light uppercase tracking-wider text-[#6A5A4A]">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
  Gothic: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function Gothic({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#0D0808] text-[#D4C4B0] font-serif w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border border-[#6A3A3A] print:border-none mx-auto print:bg-white print:text-black">
      <div className="border-b-2 border-[#6A3A3A] pb-6 mb-6 flex justify-between items-end print:border-black">
        <div>
          <h1 className="text-[44px] font-black tracking-tight leading-[0.9] text-[#D4C4B0] print:text-black">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-[#8A4A4A] mt-2 print:text-gray-700">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#6A3A3A] text-right print:text-gray-500">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#B0A090] border-l-4 border-[#8A4A4A] pl-5 mb-8 italic print:text-black print:border-black">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#8A4A4A] uppercase tracking-[0.3em] mb-5 print:text-black">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#6A3A3A] pl-4 print:border-black">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#D4C4B0] print:text-black">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8A4A4A] print:text-gray-600">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6A3A3A] mb-2 print:text-gray-800">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#B0A090] leading-relaxed flex gap-2 print:text-black">
                      <span className="text-[#8A4A4A] print:text-black">❧</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#6A3A3A] pt-8 print:border-black">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A4A4A] uppercase tracking-[0.3em] mb-4 print:text-black">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#D4C4B0] print:text-black">{edu.degree}</p>
                <p className="text-[10px] text-[#6A3A3A] print:text-gray-700">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A4A4A] uppercase tracking-[0.3em] mb-4 print:text-black">skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#B0A090] border-b border-[#6A3A3A] pb-0.5 print:text-black print:border-black">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
  PopArt: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function PopArt({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#FFF0D0] text-[#1A1A1A] font-sans w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border-4 border-[#FF4D4D] print:border-none mx-auto">
      <div className="border-b-4 border-[#FFB347] pb-6 mb-6 flex justify-between items-end print:border-black">
        <div>
          <h1 className="text-[44px] font-black tracking-tight leading-[0.9] uppercase text-[#FF4D4D] print:text-black">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-bold text-[#FFB347] mt-2 print:text-gray-600">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#FF6B6B] text-right print:text-black">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#1A1A1A] bg-[#FFD93D] p-4 rounded-lg mb-8 border-2 border-[#FF4D4D] print:bg-transparent print:border-none print:p-0">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF4D4D] mb-5 print:text-black">EXPERIENCE</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="bg-[#FFF8E7] border-2 border-[#FFB347] p-4 rounded-lg print:border-none print:bg-transparent print:p-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-black text-[#1A1A1A]">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFB347] print:text-gray-600">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#FF6B6B] mb-2 print:text-black">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#1A1A1A] leading-relaxed flex gap-2">
                      <span className="text-[#FF4D4D] print:text-black">★</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-4 border-[#FF4D4D] pt-8 print:border-t-2 print:border-black">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF4D4D] mb-4 print:text-black">EDUCATION</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 bg-[#FFF8E7] border-2 border-[#FFB347] p-3 rounded-lg print:border-none print:bg-transparent print:p-0">
                <p className="text-md font-black">{edu.degree}</p>
                <p className="text-[10px] font-bold text-[#FF6B6B] print:text-gray-600">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF4D4D] mb-4 print:text-black">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-black uppercase tracking-wider bg-[#FFD93D] border-2 border-[#FF4D4D] px-3 py-1 rounded-full print:border-none print:bg-transparent print:px-0">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
  BauhausModern: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function BauhausModern({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#1A1A1A] font-sans w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border-2 border-[#1A1A1A] print:border-none mx-auto">
      <div className="border-b-4 border-[#1A1A1A] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[44px] font-black tracking-tight leading-[0.9] uppercase">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-bold text-[#E03C31] mt-2 print:text-black">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed border-l-4 border-[#E03C31] pl-4 mb-8 font-medium print:border-black">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-black uppercase tracking-[0.3em] border-b-2 border-[#1A1A1A] pb-2 mb-4">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-4 border-[#1A1A1A] pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-black">{exp.role}</h3>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#1A1A1A] text-white px-2 py-0.5 print:bg-transparent print:text-black">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-[11px] font-black uppercase tracking-wider mt-1 mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] leading-relaxed flex gap-2">
                      <span className="font-black text-[#E03C31] print:text-black">→</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-4 border-[#1A1A1A] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] border-b-2 border-[#1A1A1A] pb-2 mb-4">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 border-l-2 border-[#1A1A1A] pl-3">
                <p className="text-md font-black">{edu.degree}</p>
                <p className="text-[11px] font-bold">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] border-b-2 border-[#1A1A1A] pb-2 mb-4">skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-black uppercase tracking-wider border-2 border-[#1A1A1A] px-2 py-0.5">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
  ArtDeco: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function ArtDeco({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#0D0D0D] text-[#C8B88A] font-serif w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border border-[#D4AF37]/40 print:border-none mx-auto print:bg-white print:text-black">
      <div className="border-b-2 border-[#D4AF37] pb-6 mb-6 flex justify-between items-end print:border-black">
        <div>
          <h1 className="text-[44px] font-bold tracking-tight leading-[0.9] text-[#D4AF37] print:text-black">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-[#C8B88A] mt-2 print:text-gray-700">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#C8B88A]/70 text-right print:text-gray-500">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#C8B88A]/80 border-l-4 border-[#D4AF37] pl-5 mb-8 italic print:text-black print:border-black">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#C8B88A]/60 uppercase tracking-[0.3em] mb-5 print:text-black">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#D4AF37] pl-4 print:border-black">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#D4AF37] print:text-black">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#C8B88A]/60 print:text-gray-600">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C8B88A]/50 mb-2 print:text-gray-800">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#C8B88A]/70 leading-relaxed flex gap-2 print:text-black">
                      <span className="text-[#D4AF37] print:text-black">◆</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#D4AF37]/30 pt-8 print:border-black">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#C8B88A]/60 uppercase tracking-[0.3em] mb-4 print:text-black">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#D4AF37] print:text-black">{edu.degree}</p>
                <p className="text-[10px] text-[#C8B88A]/60 print:text-gray-600">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#C8B88A]/60 uppercase tracking-[0.3em] mb-4 print:text-black">skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] border-b border-[#D4AF37]/40 pb-0.5 print:text-black print:border-black">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
  ModernClean: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function ModernClean({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#1E2024] font-sans w-[8.5in] min-h-[11in] shadow-lg print:shadow-none p-[0.75in] flex flex-col rounded-xl print:rounded-none mx-auto">
      <div className="border-b border-[#E4E7EB] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[40px] font-semibold tracking-tight leading-[0.9] text-[#1E2024]">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-normal text-[#7F8C8D] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#95A5A6] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#3D4045] border-l-3 border-[#2C3E50] pl-4 mb-8">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-semibold text-[#7F8C8D] uppercase tracking-[0.3em] mb-5">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-semibold text-[#1E2024]">{exp.role}</h3>
                  <span className="text-[9px] font-medium uppercase tracking-wider text-[#95A5A6]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-[#7F8C8D] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#3D4045] leading-relaxed flex gap-2">
                      <span className="text-[#2C3E50]">•</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#E4E7EB] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-semibold text-[#7F8C8D] uppercase tracking-[0.3em] mb-4">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-semibold text-[#1E2024]">{edu.degree}</p>
                <p className="text-[10px] text-[#7F8C8D]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-semibold text-[#7F8C8D] uppercase tracking-[0.3em] mb-4">skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-medium uppercase tracking-wider text-[#2C3E50] bg-[#F8F9FA] px-3 py-1 rounded border border-[#E4E7EB]">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`,
  NatureOrganic: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function NatureOrganic({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#FAF9F5] text-[#2B3A2A] font-sans w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col rounded-3xl print:rounded-none border border-[#DCE0D0] print:border-none mx-auto">
      <div className="border-b-2 border-[#DCE0D0] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[44px] font-bold tracking-tight leading-[0.9] text-[#2B3A2A]">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-[#4A7C59] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A9A7A] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && (
        <p className="text-[14px] leading-relaxed text-[#3A4A3A] bg-[#E8EDE0] rounded-2xl p-5 mb-8">
          {data.summary}
        </p>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#6A8A5A] uppercase tracking-[0.3em] mb-5">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="bg-[#E8EDE0] rounded-2xl p-5 border border-[#DCE0D0]">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#2B3A2A]">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#6A8A5A]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#4A7C59] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#3A4A3A] leading-relaxed flex gap-2">
                      <span className="text-[#4A7C59]">✿</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-2 border-[#DCE0D0] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#6A8A5A] uppercase tracking-[0.3em] mb-4">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#2B3A2A]">{edu.degree}</p>
                <p className="text-[10px] text-[#8A9A7A]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#6A8A5A] uppercase tracking-[0.3em] mb-4">skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#FAF9F5] bg-[#4A7C59] px-3 py-1 rounded-full shadow-sm">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`
};

Object.entries(templates).forEach(([name, content]) => {
  fs.writeFileSync(path.join(templatesDir, name + '.tsx'), content);
  console.log('Created ' + name + '.tsx');
});

const indexPath = path.join(templatesDir, 'index.ts');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

Object.keys(templates).forEach(name => {
  if (!indexContent.includes("import " + name + " from './" + name + "'")) {
    indexContent = "import " + name + " from './" + name + "';\\n" + indexContent;
  }
});

const objectMatch = indexContent.match(/export const templates: Record<string, React\\.FC<any>> = \\{[\\s\\S]*?\\};/);
if (objectMatch) {
  let exportBlock = objectMatch[0];
  Object.keys(templates).forEach(name => {
    if (!exportBlock.includes("  " + name + ",")) {
      exportBlock = exportBlock.replace('};', "  " + name + ",\\n};");
    }
  });
  indexContent = indexContent.replace(objectMatch[0], exportBlock);
}

fs.writeFileSync(indexPath, indexContent);
console.log('Updated index.ts');
