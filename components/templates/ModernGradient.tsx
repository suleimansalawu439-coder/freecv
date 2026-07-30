import React from 'react';
import { ResumeData } from '@/store/useResumeStore';

export default function ModernGradient({ data }: { data: ResumeData }) {
  const c = data.theme.color || '#4f46e5';
  
  // Create a gradient based on the selected color
  // In a real app we'd compute this, but here we just use the selected color and a slightly lighter version for the gradient effect
  return (
    <div className="w-[8.5in] min-h-[11in] bg-white p-[0.75in] font-sans mx-auto shadow-xl print:shadow-none print:border-none border border-gray-200">
      <div className="rounded-3xl p-10 text-white mb-10 shadow-xl" style={{ background: `linear-gradient(135deg, ${c}, ${c}CC)` }}>
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
                  {exp.description.split('\n').filter(l => l.trim()).map((line, j) => (
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
                    style={{ width: `${Math.max(50, 80 + (i % 3) * 7)}%`, backgroundColor: c }}
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

          {data.customSections && data.customSections.length > 0 && data.customSections.map(section => (
            section.items.length > 0 && (
              <div key={section.id}>
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs" style={{ backgroundColor: c }}>
                    ✨
                  </span>
                  {section.title}
                </h2>
                {section.items.map(item => (
                  <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="font-bold text-gray-900">{item.title}</p>
                      {item.date && <p className="text-xs font-medium" style={{ color: c }}>{item.date}</p>}
                    </div>
                    {item.subtitle && <p className="text-sm text-gray-600 mb-2">{item.subtitle}</p>}
                    {item.description && <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.description}</p>}
                  </div>
                ))}
              </div>
            )
          ))}

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
}