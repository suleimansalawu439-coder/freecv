"use client";

import React, { useEffect, useState } from 'react';
import { ExternalLink, Briefcase, MapPin, DollarSign, Clock, Search, Loader2 } from 'lucide-react';

interface Job {
  title: string;
  company: string;
  locations: string;
  url: string;
  salary: string;
  date: string;
  description: string;
}

export default function SmartJobMatches({ jobTitle }: { jobTitle?: string }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!jobTitle) return;

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs?keywords=${encodeURIComponent(jobTitle)}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        setError('Could not load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobTitle]);

  if (!jobTitle) return null;

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Briefcase size={20} className="text-blue-200" />
            Active {jobTitle} Roles
          </h3>
          <p className="text-blue-100 text-sm mt-1">We found these matches near you based on your resume.</p>
        </div>
        <div className="hidden sm:block p-3 bg-white/10 rounded-xl">
          <Search size={24} className="text-white" />
        </div>
      </div>

      <div className="p-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Loader2 size={32} className="animate-spin mb-4 text-blue-500" />
            <p className="text-sm font-bold uppercase tracking-widest">Scanning Job Boards...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500 text-sm font-medium">{error}</div>
        ) : jobs.length === 0 ? (
          <div className="py-8 text-center text-gray-500 text-sm font-medium">No active roles found in your area right now.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {jobs.map((job, i) => (
              <a 
                key={i} 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                  <ExternalLink size={16} className="text-gray-300 group-hover:text-blue-500 shrink-0" />
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500 mb-3">
                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-gray-700">
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {job.locations}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md">
                      <DollarSign size={12} /> {job.salary}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {job.date}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{job.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
        <a href="https://careerjet.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">
          Powered by CareerJet
        </a>
      </div>
    </div>
  );
}
