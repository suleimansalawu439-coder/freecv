const fs = require('fs');
const path = require('path');

const templatesDir = path.join('c:/xampp/htdocs/freecv/components/templates');

const newTemplates = {
  DarkModeTech: `import React from 'react';
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
                    {exp.description.split('\\n').filter(l => l.trim()).map((line, j) => (
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
                    <div className="h-full rounded-full" style={{ width: \`\${Math.max(50, 90 - (i * 5))}%\`, backgroundColor: c }} />
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
}`,
  SwissDesign: `import React from 'react';
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
                  {exp.description.split('\\n').filter(l => l.trim()).map((line, j) => (
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
      </div>
    </div>
  );
}`,
  ModernGradient: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function ModernGradient({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#4f46e5';
  
  // Create a gradient based on the selected color
  // In a real app we'd compute this, but here we just use the selected color and a slightly lighter version for the gradient effect
  return (
    <div className="w-[8.5in] min-h-[11in] bg-white p-[0.75in] font-sans mx-auto shadow-xl print:shadow-none print:border-none border border-gray-200">
      <div className="rounded-3xl p-10 text-white mb-10 shadow-xl" style={{ background: \`linear-gradient(135deg, \${c}, \${c}CC)\` }}>
        <div className="flex items-center gap-6">
          {data.personalInfo.profilePicture ? (
            <img src={data.personalInfo.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold">
              {data.personalInfo.fullName.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-lg text-white/90">{data.personalInfo.jobTitle}</p>
          </div>
        </div>
      </div>

      {data.summary && (
        <div className="bg-gray-50 rounded-2xl p-6 mb-10 shadow-sm border-l-4" style={{ borderColor: c }}>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs" style={{ backgroundColor: c }}>
              💼
            </span>
            Work Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <p className="text-sm font-medium" style={{ color: c }}>{exp.company}</p>
                  </div>
                  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium" style={{ color: c }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.description.split('\\n').filter(l => l.trim()).map((line, j) => (
                    <li key={j} className="text-sm text-gray-600 flex gap-3">
                      <span className="mt-1" style={{ color: c }}>•</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs" style={{ backgroundColor: c }}>
              🛠
            </span>
            Skills
          </h2>
          <div className="space-y-3">
            {data.skills.map((s, i) => (
              <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-900">{s.name}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full opacity-80"
                    style={{ width: \`\${Math.max(50, 80 + (i % 3) * 7)}%\`, backgroundColor: c }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs" style={{ backgroundColor: c }}>
                🎓
              </span>
              Education
            </h2>
            {data.education.map(edu => (
              <div key={edu.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-4">
                <p className="font-bold text-gray-900 mb-1">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.school}</p>
                <p className="text-xs font-medium mt-2" style={{ color: c }}>{edu.graduationYear}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs" style={{ backgroundColor: c }}>
                📬
              </span>
              Contact
            </h2>
            <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
              {data.personalInfo.email && <p className="text-sm"><span className="font-bold text-gray-700">Email:</span> <span className="text-gray-600">{data.personalInfo.email}</span></p>}
              {data.personalInfo.phone && <p className="text-sm"><span className="font-bold text-gray-700">Phone:</span> <span className="text-gray-600">{data.personalInfo.phone}</span></p>}
              {data.personalInfo.location && <p className="text-sm"><span className="font-bold text-gray-700">Location:</span> <span className="text-gray-600">{data.personalInfo.location}</span></p>}
              {data.personalInfo.website && <p className="text-sm"><span className="font-bold text-gray-700">Website:</span> <span className="text-gray-600">{data.personalInfo.website}</span></p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  ElegantEditorial: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function ElegantEditorial({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#b45309'; // default amber-700
  return (
    <div className="w-[8.5in] min-h-[11in] bg-[#FDFBF7] p-[0.75in] font-serif mx-auto shadow-xl print:shadow-none print:border-none border border-gray-200">
      <div className="text-center mb-12">
        {data.personalInfo.profilePicture && (
          <img src={data.personalInfo.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto mb-6 shadow-md" style={{ border: \`2px solid \${c}\` }} />
        )}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px flex-1 opacity-50" style={{ background: \`linear-gradient(to right, transparent, \${c}, transparent)\` }} />
          <div style={{ color: c }}>✦</div>
          <div className="h-px flex-1 opacity-50" style={{ background: \`linear-gradient(to right, transparent, \${c}, transparent)\` }} />
        </div>
        <h1 className="text-5xl font-light italic text-gray-900 mb-2">
          {data.personalInfo.fullName}
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] font-medium" style={{ color: c }}>
          {data.personalInfo.jobTitle}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_2.5fr] gap-12">
        <div className="border-r pr-8" style={{ borderColor: \`\${c}33\` }}>
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ color: c, borderColor: \`\${c}4D\` }}>
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
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ color: c, borderColor: \`\${c}4D\` }}>
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
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ color: c, borderColor: \`\${c}4D\` }}>
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
                  {exp.description.split('\\n').filter(l => l.trim()).map((line, j) => (
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

      <div className="mt-16 pt-6 border-t text-center" style={{ borderColor: \`\${c}33\` }}>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px flex-1 opacity-50" style={{ background: \`linear-gradient(to right, transparent, \${c}, transparent)\` }} />
          <div className="text-xs" style={{ color: c }}>✦</div>
          <div className="h-px flex-1 opacity-50" style={{ background: \`linear-gradient(to right, transparent, \${c}, transparent)\` }} />
        </div>
      </div>
    </div>
  );
}`,
  BrutalistMinimal: `import React from 'react';
import { ResumeData } from '@/app/page';

export default function BrutalistMinimal({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#facc15'; // default yellow-400
  // Brutalist minimal usually uses bright neon colors for contrast against black and white
  return (
    <div className="w-[8.5in] min-h-[11in] bg-white p-[0.5in] font-mono border-4 border-black mx-auto shadow-xl print:shadow-none print:border-none">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative mb-8 pb-6 border-b-4 border-black">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              {data.personalInfo.fullName}
            </h1>
            <p className="text-lg font-bold uppercase tracking-widest inline-block px-2 py-1 border-2 border-black" style={{ backgroundColor: c }}>
              {data.personalInfo.jobTitle}
            </p>
          </div>
          {data.personalInfo.profilePicture && (
            <img src={data.personalInfo.profilePicture} alt="Profile" className="w-32 h-32 object-cover border-4 border-black shadow-[8px_8px_0_0_#000] rotate-3 grayscale" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10 text-xs font-bold uppercase tracking-wider relative z-10">
        {data.personalInfo.email && (
          <div className="border-2 border-black p-3 bg-white">
            <span className="block text-gray-500 mb-1">EMAIL</span>
            {data.personalInfo.email}
          </div>
        )}
        {data.personalInfo.phone && (
          <div className="border-2 border-black p-3 bg-white">
            <span className="block text-gray-500 mb-1">PHONE</span>
            {data.personalInfo.phone}
          </div>
        )}
        {data.personalInfo.location && (
          <div className="border-2 border-black p-3 bg-white">
            <span className="block text-gray-500 mb-1">LOCATION</span>
            {data.personalInfo.location}
          </div>
        )}
        {data.personalInfo.website && (
          <div className="border-2 border-black p-3 bg-white">
            <span className="block text-gray-500 mb-1">WEBSITE</span>
            {data.personalInfo.website}
          </div>
        )}
      </div>

      {data.summary && (
        <div className="mb-10 p-6 bg-black text-white relative z-10">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-3" style={{ color: c }}>Summary</h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      <div className="mb-10 relative z-10">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 bg-white inline-block pr-8">
          Work Experience
        </h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-8 pb-8 border-b-2 border-black last:border-0 bg-white/80 p-2">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-lg font-bold uppercase">{exp.role}</h3>
              <span className="text-xs font-bold px-2 py-1 border-2 border-black" style={{ backgroundColor: c }}>
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <p className="text-sm font-bold mb-3 uppercase">{exp.company}</p>
            <ul className="space-y-2">
              {exp.description.split('\\n').filter(l => l.trim()).map((line, j) => (
                <li key={j} className="text-sm leading-relaxed flex gap-3">
                  <span className="font-black" style={{ color: c }}>▸</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8 mt-auto relative z-10">
        <div className="bg-white/90 p-4 border-2 border-black shadow-[4px_4px_0_0_#000]">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2">
            Education
          </h2>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-4">
              <p className="text-sm font-bold uppercase">{edu.degree}</p>
              <p className="text-xs mt-1">{edu.school}</p>
              <p className="text-xs font-bold text-gray-500 mt-1">{edu.graduationYear}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/90 p-4 border-2 border-black shadow-[4px_4px_0_0_#000]">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(s => (
              <span key={s.id} className="px-3 py-2 text-xs font-bold uppercase tracking-wider skew-x-[-10deg] border-2 border-black shadow-[2px_2px_0_0_#000]" style={{ backgroundColor: c }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`
};

Object.entries(newTemplates).forEach(([name, content]) => {
  fs.writeFileSync(path.join(templatesDir, name + '.tsx'), content);
  console.log('Created ' + name + '.tsx');
});

// Update index.ts manually
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
