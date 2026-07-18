const fs = require('fs');
const path = require('path');

const templatesDir = path.join('c:/xampp/htdocs/freecv/components/templates');

// 1. Delete templates
const toDelete = [
  'PopArt.tsx',
  'Gothic.tsx',
  'FuturisticSciFi.tsx',
  'Retro80s.tsx',
  'BrutalistDark.tsx',
  'Cyberpunk.tsx',
  'DarkKnight.tsx',
  'Glassmorphism.tsx',
  'Neumorphic.tsx',
  'Retro.tsx'
];

toDelete.forEach(file => {
  const fp = path.join(templatesDir, file);
  if (fs.existsSync(fp)) {
    fs.unlinkSync(fp);
    console.log('Deleted ' + file);
  }
});

// 2. Add new templates
const newTemplates = {
  SwissMinimal: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function SwissMinimal({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-gray-900 font-sans w-[8.5in] min-h-[11in] shadow-lg print:shadow-none p-[0.75in] flex flex-col mx-auto print:border-none border border-gray-200">
      <div className="border-b border-gray-200 pb-8 mb-8">
        <h1 className="text-[42px] font-black tracking-tight leading-[0.9] uppercase">{data.personalInfo.fullName}</h1>
        <p className="text-sm font-medium text-gray-400 tracking-wide mt-2">{data.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 mt-3">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>
      
      {data.summary && <p className="text-[13px] leading-relaxed text-gray-600 border-l-2 border-gray-200 pl-5 mb-8">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-5">Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[12px] text-gray-600 leading-relaxed flex gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 shrink-0" />{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-gray-200 pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-4">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-sm font-bold">{edu.degree}</p>
                <p className="text-[10px] text-gray-400">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{s.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-5">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="border border-gray-200 p-3 rounded">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-gray-400">{proj.link}</span>}
                </div>
                <p className="text-xs text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-5">References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-gray-500">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-gray-400">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  CyberDark: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function CyberDark({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#0F0F1A] text-gray-200 font-mono w-[8.5in] min-h-[11in] shadow-[0_0_60px_rgba(0,255,255,0.05)] print:shadow-none p-[0.75in] flex flex-col border border-[#1A1A2E] print:border-none mx-auto print:bg-white print:text-black">
      <div className="border-b border-[#1A1A2E] pb-8 mb-8 print:border-black">
        <h1 className="text-[44px] font-black tracking-tight leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 print:text-black print:bg-none print:bg-transparent">{data.personalInfo.fullName}</h1>
        <p className="text-sm text-cyan-400/70 tracking-wide mt-2 print:text-gray-700">{data.personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 mt-3 print:text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>
      
      {data.summary && <p className="text-[13px] leading-relaxed text-gray-400 border-l-2 border-cyan-500/30 pl-5 mb-8 italic print:text-black print:border-black">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em] mb-5 print:text-black">// Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#1A1A2E] pl-4 print:border-black">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-white print:text-black">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400/50 print:text-gray-600">{exp.startDate} → {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400/60 mb-2 print:text-gray-800">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[12px] text-gray-400 leading-relaxed flex gap-2 print:text-black">
                      <span className="text-cyan-400 print:text-black">›</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#1A1A2E] pt-8 print:border-black">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em] mb-4 print:text-black">// Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-sm font-bold text-white print:text-black">{edu.degree}</p>
                <p className="text-[10px] text-gray-500 print:text-gray-700">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em] mb-4 print:text-black">// Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-purple-300/70 border border-[#1A1A2E] px-2 py-0.5 rounded print:border-black print:text-black">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-[#1A1A2E] pt-8 print:border-black">
          <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em] mb-5 print:text-black">// Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="border border-[#1A1A2E] p-3 rounded print:border-gray-300">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-white print:text-black">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-cyan-400/50 print:text-gray-500">{proj.link}</span>}
                </div>
                <p className="text-xs text-gray-400 print:text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t border-[#1A1A2E] pt-8 print:border-black">
          <h2 className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.3em] mb-5 print:text-black">// References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold text-white print:text-black">{ref.name}</p>
                <p className="text-xs text-purple-400/60 print:text-gray-700">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-cyan-400/50 print:text-gray-500">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  EditorialMagazine: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function EditorialMagazine({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#FDFCFA] text-[#1A1410] font-serif w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border border-[#E8DDD4] print:border-none mx-auto">
      <div className="border-b-4 border-[#1A1410] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[52px] font-bold tracking-tight leading-[0.9] text-[#1A1410]">{data.personalInfo.fullName}</h1>
          <p className="text-lg italic text-[#8A7A6A] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A7A6A] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed text-[#3A322A] border-l-4 border-[#1A1410] pl-5 mb-8 italic">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-5">Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#D4C8BC] pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold text-[#1A1410]">{exp.role}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7A6A]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8A7A6A] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#3A322A] leading-relaxed flex gap-2">
                      <span className="text-[#8A7A6A]">—</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-2 border-[#E8DDD4] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-4">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#1A1410]">{edu.degree}</p>
                <p className="text-[11px] text-[#8A7A6A]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-4">Skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[11px] font-bold uppercase tracking-wider text-[#3A322A] border-b border-[#D4C8BC] pb-0.5">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t-2 border-[#E8DDD4] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-5">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="p-3 border border-[#E8DDD4] bg-[#F5F0EB]/50">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#1A1410]">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#8A7A6A]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#3A322A]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t-2 border-[#E8DDD4] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A7A6A] uppercase tracking-[0.3em] mb-5">References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold text-[#1A1410]">{ref.name}</p>
                <p className="text-xs text-[#8A7A6A]">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#8A7A6A] italic">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  Brutalist: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function Brutalist({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#1A1A1A] font-mono w-[8.5in] min-h-[11in] shadow-[8px_8px_0px_rgba(0,0,0,0.15)] print:shadow-none p-[0.75in] flex flex-col border-4 border-black print:border-none mx-auto">
      <div className="border-b-4 border-black pb-6 mb-6 flex justify-between items-end print:border-b-2">
        <div>
          <h1 className="text-[48px] font-black tracking-tight leading-[0.9] uppercase">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-bold text-[#FF0040] mt-2 print:text-black">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed border-l-4 border-[#FF0040] pl-4 mb-8 font-bold print:border-black">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] border-b-2 border-black pb-2 mb-4">EXPERIENCE</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-4 border-black pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-black">{exp.role}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 print:bg-transparent print:text-black print:px-0">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider mt-1 mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] leading-relaxed flex gap-2">
                      <span className="font-black text-[#FF0040] print:text-black">→</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-4 border-black pt-8 print:border-t-2">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] border-b-2 border-black pb-2 mb-4">EDUCATION</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 border-l-2 border-black pl-3">
                <p className="text-md font-black">{edu.degree}</p>
                <p className="text-[11px] font-bold">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] border-b-2 border-black pb-2 mb-4">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider border-2 border-black px-2 py-0.5">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t-4 border-black pt-8 print:border-t-2">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] border-b-2 border-black pb-2 mb-4">PROJECTS</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="border-2 border-black p-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-black">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] font-bold bg-black text-white px-1 print:bg-transparent print:text-black">{proj.link}</span>}
                </div>
                <p className="text-xs font-bold">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t-4 border-black pt-8 print:border-t-2">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] border-b-2 border-black pb-2 mb-4">REFERENCES</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-black">{ref.name}</p>
                <p className="text-xs font-bold text-[#FF0040] print:text-black">{ref.title} @ {ref.company}</p>
                <p className="text-xs font-bold">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  PastelDream: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function PastelDream({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#4A3F3A] font-sans w-[8.5in] min-h-[11in] shadow-[0_20px_60px_rgba(212,168,160,0.15)] print:shadow-none p-[0.75in] flex flex-col rounded-2xl print:rounded-none mx-auto">
      <div className="border-b-2 border-[#F0E0D4] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[44px] font-bold tracking-tight leading-[0.9] text-[#4A3F3A]">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-[#D4A8A0] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#C4B8B0] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed text-[#6A5F5A] bg-[#FDF6F0] rounded-2xl p-5 mb-8">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#D4A8A0] uppercase tracking-[0.3em] mb-5">experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="bg-[#FDF6F0] rounded-2xl p-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#4A3F3A]">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#D4A8A0]">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C4B8B0] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#6A5F5A] leading-relaxed flex gap-2">
                      <span className="text-[#D4A8A0]">✦</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t-2 border-[#F0E0D4] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#D4A8A0] uppercase tracking-[0.3em] mb-4">education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 bg-[#FDF6F0] rounded-xl p-3">
                <p className="text-md font-bold text-[#4A3F3A]">{edu.degree}</p>
                <p className="text-[10px] text-[#C4B8B0]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#D4A8A0] uppercase tracking-[0.3em] mb-4">skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#6A5F5A] bg-[#FDF6F0] px-3 py-1 rounded-full">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t-2 border-[#F0E0D4] pt-8">
          <h2 className="text-[9px] font-bold text-[#D4A8A0] uppercase tracking-[0.3em] mb-5">projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="bg-[#FDF6F0] rounded-xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#4A3F3A]">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#D4A8A0]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#6A5F5A]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t-2 border-[#F0E0D4] pt-8">
          <h2 className="text-[9px] font-bold text-[#D4A8A0] uppercase tracking-[0.3em] mb-5">references</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="bg-[#FDF6F0] rounded-xl p-4">
                <p className="text-sm font-bold text-[#4A3F3A]">{ref.name}</p>
                <p className="text-xs text-[#D4A8A0]">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#C4B8B0]">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  CorporateBlue: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function CorporateBlue({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#1A2A3A] font-sans w-[8.5in] min-h-[11in] shadow-lg print:shadow-none p-[0.75in] flex flex-col mx-auto">
      <div className="bg-[#1A3A5A] text-white -mx-[0.75in] -mt-[0.75in] px-[0.75in] pt-[0.75in] pb-6 mb-8 print:mx-0 print:mt-0 print:px-[0.75in] print:pt-[0.75in]">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-[44px] font-bold tracking-tight leading-[0.9]">{data.personalInfo.fullName}</h1>
            <p className="text-lg text-[#C8A86A] mt-2">{data.personalInfo.jobTitle}</p>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#B0C0D0] text-right">
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
            {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
          </div>
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed text-[#3A4A5A] border-l-4 border-[#C8A86A] pl-5 mb-8">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#8A9AAB] uppercase tracking-[0.3em] mb-5 border-b border-[#E0E5EC] pb-2">Professional Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#1A3A5A]">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#C8A86A]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A9AAB] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#3A4A5A] leading-relaxed flex gap-2">
                      <span className="text-[#C8A86A]">•</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#E0E5EC] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A9AAB] uppercase tracking-[0.3em] mb-4">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#1A3A5A]">{edu.degree}</p>
                <p className="text-[10px] text-[#8A9AAB]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A9AAB] uppercase tracking-[0.3em] mb-4">Core Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#1A3A5A] bg-[#F5F7FA] px-3 py-1 rounded border border-[#E0E5EC]">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-[#E0E5EC] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A9AAB] uppercase tracking-[0.3em] mb-5 border-b border-[#E0E5EC] pb-2">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="bg-[#F5F7FA] p-3 rounded border border-[#E0E5EC]">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#1A3A5A]">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#C8A86A]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#3A4A5A]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t border-[#E0E5EC] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A9AAB] uppercase tracking-[0.3em] mb-5 border-b border-[#E0E5EC] pb-2">References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold text-[#1A3A5A]">{ref.name}</p>
                <p className="text-xs text-[#C8A86A]">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#8A9AAB]">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  CreativeAsymmetrical: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function CreativeAsymmetrical({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-[#1A1A1A] font-sans w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col relative mx-auto">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E84A5F] rounded-bl-[100px] print:rounded-none print:w-full print:h-2 print:top-0 print:left-0" />
      <div className="relative z-10 flex justify-between items-end mb-8 border-b-2 border-[#E8E0D8] pb-6">
        <div>
          <h1 className="text-[44px] font-black tracking-tight leading-[0.9]">{data.personalInfo.fullName}</h1>
          <p className="text-lg font-medium text-[#E84A5F] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#B0A090] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed text-[#4A4040] bg-[#FAF8F5] p-5 rounded-lg mb-8 border-l-8 border-[#E84A5F] print:bg-transparent print:border-l-4">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#B0A090] uppercase tracking-[0.3em] mb-5">Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="relative pl-6">
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#E84A5F] print:bg-transparent print:border-2 print:border-[#E84A5F]" />
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#E84A5F]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#B0A090] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#4A4040] leading-relaxed flex gap-2">
                      <span className="text-[#E84A5F]">◆</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#E8E0D8] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#B0A090] uppercase tracking-[0.3em] mb-4">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3 border-l-4 border-[#E84A5F] pl-3">
                <p className="text-md font-bold">{edu.degree}</p>
                <p className="text-[10px] text-[#B0A090]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#B0A090] uppercase tracking-[0.3em] mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[10px] font-bold uppercase tracking-wider text-[#4A4040] bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#E8E0D8] print:bg-transparent">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-[#E8E0D8] pt-8">
          <h2 className="text-[9px] font-bold text-[#B0A090] uppercase tracking-[0.3em] mb-5">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="bg-[#FAF8F5] p-4 rounded-xl border-b-4 border-[#E84A5F] print:bg-transparent">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#E84A5F]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#4A4040]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t border-[#E8E0D8] pt-8">
          <h2 className="text-[9px] font-bold text-[#B0A090] uppercase tracking-[0.3em] mb-5">References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold">{ref.name}</p>
                <p className="text-xs text-[#E84A5F]">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#B0A090]">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`,
  RetroVintage: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function RetroVintage({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#FDF8F0] text-[#3A2A1A] font-serif w-[8.5in] min-h-[11in] shadow-xl print:shadow-none p-[0.75in] flex flex-col border border-[#D4C4B0] mx-auto print:border-none">
      <div className="border-b-2 border-[#D4C4B0] pb-6 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-[44px] font-bold tracking-tight leading-[0.9] text-[#3A2A1A]">{data.personalInfo.fullName}</h1>
          <p className="text-lg italic text-[#8A6A4A] mt-2">{data.personalInfo.jobTitle}</p>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A6A4A] text-right">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </div>
      
      {data.summary && <p className="text-[14px] leading-relaxed text-[#5A4A3A] border-l-4 border-[#8A6A4A] pl-5 mb-8 italic">{data.summary}</p>}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[9px] font-bold text-[#8A6A4A] uppercase tracking-[0.3em] mb-5">Experience</h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-[#D4C4B0] pl-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-[#3A2A1A]">{exp.role}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6A4A]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8A6A4A] mb-2">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.split('\\n').filter(l => l.trim()).map((l, i) => (
                    <li key={i} className="text-[13px] text-[#5A4A3A] leading-relaxed flex gap-2">
                      <span className="text-[#8A6A4A]">•</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-12 border-t border-[#D4C4B0] pt-8">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A6A4A] uppercase tracking-[0.3em] mb-4">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-md font-bold text-[#3A2A1A]">{edu.degree}</p>
                <p className="text-[11px] text-[#8A6A4A]">{edu.school}, {edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-[9px] font-bold text-[#8A6A4A] uppercase tracking-[0.3em] mb-4">Skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.skills.map(s => (
                <span key={s.id} className="text-[11px] font-bold uppercase tracking-wider text-[#5A4A3A] border-b border-[#D4C4B0] pb-0.5">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {data.showProjects && data.projects && data.projects.length > 0 && (
        <div className="mt-8 border-t border-[#D4C4B0] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A6A4A] uppercase tracking-[0.3em] mb-5">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map(proj => (
              <div key={proj.id} className="p-3 border-2 border-dashed border-[#D4C4B0]">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#3A2A1A]">{proj.name}</h3>
                  {proj.link && <span className="text-[9px] text-[#8A6A4A]">{proj.link}</span>}
                </div>
                <p className="text-xs text-[#5A4A3A]">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.showReferences && data.references && data.references.length > 0 && (
        <div className="mt-8 border-t border-[#D4C4B0] pt-8">
          <h2 className="text-[9px] font-bold text-[#8A6A4A] uppercase tracking-[0.3em] mb-5">References</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map(ref => (
              <div key={ref.id} className="mb-2">
                <p className="text-sm font-bold text-[#3A2A1A]">{ref.name}</p>
                <p className="text-xs text-[#8A6A4A] italic">{ref.title} @ {ref.company}</p>
                <p className="text-xs text-[#8A6A4A]">{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`
};

Object.entries(newTemplates).forEach(([name, content]) => {
  fs.writeFileSync(path.join(templatesDir, name + '.tsx'), content);
  console.log('Created ' + name + '.tsx');
});

// Update ArtDeco to Grey/Gold
const artDecoPath = path.join(templatesDir, 'ArtDeco.tsx');
if (fs.existsSync(artDecoPath)) {
  let artDeco = fs.readFileSync(artDecoPath, 'utf8');
  // currently uses bg-[#0D0D0D]
  artDeco = artDeco.replace(/bg-\\[#0D0D0D\\]/g, 'bg-[#2A2A2A]');
  // optionally change text from #C8B88A to gold, but #D4AF37 is gold.
  // wait, the prompt says "grey background and gold text". So grey bg #2A2A2A and text #D4AF37 or #F0E6D2. It's already mostly gold.
  // let's change text-[#C8B88A] to text-[#F2F2F2] or keep gold.
  // "grey background and gold text"
  artDeco = artDeco.replace(/text-\\[#C8B88A\\]/g, 'text-[#D4AF37]');
  fs.writeFileSync(artDecoPath, artDeco);
  console.log('Updated ArtDeco.tsx');
}

// 3. Rebuild index.ts
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx') && f !== 'index.ts');
const imports = files.map(f => {
  const name = f.replace('.tsx', '');
  return "import " + name + " from './" + name + "';";
}).join('\\n');

const exportsList = files.map(f => {
  const name = f.replace('.tsx', '');
  return "  " + name + ",";
}).join('\\n');

const indexContent = imports + "\\n\\nexport const templates: Record<string, React.FC<any>> = {\\n" + exportsList + "\\n};\\n\\nexport type TemplateKey = keyof typeof templates;\\n";


fs.writeFileSync(path.join(templatesDir, 'index.ts'), indexContent);
console.log('Regenerated index.ts');
