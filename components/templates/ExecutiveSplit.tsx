import React from 'react';
import { ResumeData } from '@/store/useResumeStore';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function ExecutiveSplit({ data }: { data: ResumeData }) {
  return (
    <div className="w-[8.5in] min-w-[8.5in] min-h-[11in] bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] print:shadow-none flex flex-col font-serif mx-auto lg:mx-0 shrink-0 text-black">
      
      {/* Header spanning full width */}
      <div className="p-[0.75in] pb-8 border-b-[6px] border-black text-center bg-gray-50">
        <h1 className="text-5xl font-black uppercase tracking-widest mb-3">{data.personalInfo.fullName}</h1>
        <p className="text-lg font-bold uppercase tracking-[0.3em] text-gray-600 mb-6">{data.personalInfo.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-xs font-sans font-bold uppercase tracking-wider text-gray-500">
          {data.personalInfo.email && <span className="flex items-center gap-2"><Mail size={12} /> {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="flex items-center gap-2"><Phone size={12} /> {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span className="flex items-center gap-2"><MapPin size={12} /> {data.personalInfo.location}</span>}
          {data.personalInfo.website && <span className="flex items-center gap-2"><Globe size={12} /> {data.personalInfo.website}</span>}
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Column */}
        <div className="w-[65%] p-[0.75in] pt-8 pr-8 flex flex-col">
          {data.summary && (
            <div className="mb-10">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 font-sans border-b-2 border-black pb-1 inline-block">Executive Profile</h2>
              <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div className="mb-10">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 font-sans border-b-2 border-black pb-1 inline-block">Professional Experience</h2>
              <div className="space-y-8">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold uppercase">{exp.company}</h3>
                      <span className="text-xs font-sans font-bold text-gray-500 uppercase">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-sm italic font-bold text-gray-700 mb-3">{exp.role}</p>
                    <ul className="space-y-2 pl-4 list-square marker:text-black">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="text-sm leading-relaxed">{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showProjects && data.projects.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 font-sans border-b-2 border-black pb-1 inline-block">Strategic Initiatives</h2>
              <div className="space-y-5">
                {data.projects.map(proj => (
                  <div key={proj.id}>
                    <h3 className="text-sm font-bold uppercase inline mr-2">{proj.name}:</h3>
                    <span className="text-sm leading-relaxed">{proj.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[35%] bg-gray-50 p-[0.75in] pt-8 pl-8 border-l border-gray-200 flex flex-col gap-10">
          
          {data.education.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 font-sans border-b-2 border-black pb-1 inline-block">Education</h2>
              <div className="space-y-5">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold uppercase">{edu.degree}</p>
                    <p className="text-xs italic text-gray-700 my-1">{edu.school}</p>
                    <p className="text-xs font-sans font-bold text-black">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.showCertifications && data.certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 font-sans border-b-2 border-black pb-1 inline-block">Credentials</h2>
              <div className="space-y-4">
                {data.certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="text-sm font-bold">{cert.name}</p>
                    <p className="text-xs text-gray-700 italic my-1">{cert.issuer}</p>
                    <p className="text-xs font-sans font-bold">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

{data.showReferences && data.references.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 font-sans border-b-2 border-black pb-1 inline-block">References</h2>
              <div className="space-y-4">
                {data.references.map(ref => (
                  <div key={ref.id}>
                    <p className="text-sm font-bold">{ref.name}</p>
                    <p className="text-xs text-gray-700 italic my-1">{ref.title} at {ref.company}</p>
                    <p className="text-xs font-sans font-bold">{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 font-sans border-b-2 border-black pb-1 inline-block">Expertise</h2>
              <div className="flex flex-col gap-2">
                {data.skills.map(s => (
                  <span key={s.id} className="text-sm font-bold uppercase tracking-wider">{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
