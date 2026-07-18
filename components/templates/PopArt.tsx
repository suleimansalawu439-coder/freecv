import React from 'react';
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
                  {exp.description.split('\n').filter(l => l.trim()).map((l, i) => (
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
}