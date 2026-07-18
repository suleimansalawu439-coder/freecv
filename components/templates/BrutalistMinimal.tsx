import React from 'react';
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
              {exp.description.split('\n').filter(l => l.trim()).map((line, j) => (
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
}