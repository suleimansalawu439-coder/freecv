"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useResumeStore } from '@/store/useResumeStore';
import { useRouter } from 'next/navigation';
import { Plus, FileText, Copy, Trash2, Edit2, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function UserDashboard() {
  const router = useRouter();
  const [resumes, setResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const { setCurrentResumeId, setResumeTitle, setAllData } = useResumeStore();

  useEffect(() => {
    const fetchUserAndResumes = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
        return;
      }
      setUser(session.user);

      try {
        const res = await fetch('/api/user/resumes');
        if (res.ok) {
          const data = await res.json();
          setResumes(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserAndResumes();
  }, [router]);

  const handleCreateNew = async () => {
    try {
      // Empty resume payload
      const payload = {
        title: 'New Resume',
        resume_data: {} // In reality, we could use initialData from store
      };
      const res = await fetch('/api/user/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const newResume = await res.json();
        setResumes([newResume, ...resumes]);
        handleEdit(newResume);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (resume: any) => {
    setCurrentResumeId(resume.id);
    setResumeTitle(resume.title);
    if (resume.resume_data && Object.keys(resume.resume_data).length > 0) {
      setAllData(resume.resume_data);
    }
    router.push('/');
  };

  const handleDuplicate = async (resume: any) => {
    try {
      const payload = {
        title: `${resume.title} (Copy)`,
        resume_data: resume.resume_data
      };
      const res = await fetch('/api/user/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const newResume = await res.json();
        setResumes([newResume, ...resumes]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;
    try {
      const res = await fetch(`/api/user/resumes/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setResumes(resumes.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors">
              <ArrowLeft size={16} /> Back to Builder
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-gray-500 mt-1">Manage, edit, and duplicate your resumes.</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Plus size={18} />
            Create New
          </button>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-white border border-gray-200 border-dashed rounded-2xl p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-500 max-w-sm mb-6">Create your first resume to get started building your professional profile.</p>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Build Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map(resume => (
              <div key={resume.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col">
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">
                      <FileText size={24} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{resume.title}</h3>
                  <p className="text-xs text-gray-400 mb-6">Last updated: {new Date(resume.updated_at).toLocaleDateString()}</p>
                </div>
                
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(resume)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDuplicate(resume)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Duplicate"
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
