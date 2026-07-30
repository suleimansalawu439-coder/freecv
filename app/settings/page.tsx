"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Shield, Download, Trash2, Mail, Lock, Settings as SettingsIcon, LogOut, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // if exists, otherwise I'll need to define it or use another

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
        return;
      }
      setUser(session.user);
      
      // Fetch profile based on email
      const { data } = await supabase
        .from('candidates')
        .select('id, email, candidate_profiles(consent_recruiter_share, consent_email_jobs, consent_analytics)')
        .eq('email', session.user.email)
        .single();
        
      if (data) {
        setProfile(data);
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleToggle = async (field: string, value: boolean) => {
    if (!profile) return;
    setSaving(true);
    
    // Call our secure endpoint or direct supabase if RLS allows (currently public insert only)
    // Actually we need an API endpoint to update because candidate_profiles is locked down for updates
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/api/user/consent', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          email: user.email,
          consents: {
            ...profile.candidate_profiles[0],
            [field]: value
          }
        })
      });
      if (res.ok) {
        setProfile({
          ...profile,
          candidate_profiles: [{ ...profile.candidate_profiles[0], [field]: value }]
        });
        setMsg('Preferences updated');
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Account Settings</h1>
            <p className="text-gray-500 mt-1">Manage your privacy preferences and data.</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black">
            <LogOut size={16} /> Sign out
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{user?.email}</div>
              <div className="text-sm text-gray-500">Cvyon Account</div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {msg && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                <CheckCircle2 size={16} /> {msg}
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Shield size={20} className="text-blue-600" /> Privacy & Consent
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div>
                    <div className="font-semibold text-gray-900">Share with Recruiters</div>
                    <div className="text-sm text-gray-500">Allow verified top companies to find your profile.</div>
                  </div>
                  <button 
                    onClick={() => handleToggle('consent_recruiter_share', !profile?.candidate_profiles?.[0]?.consent_recruiter_share)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${profile?.candidate_profiles?.[0]?.consent_recruiter_share ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${profile?.candidate_profiles?.[0]?.consent_recruiter_share ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div>
                    <div className="font-semibold text-gray-900">Job Match Emails</div>
                    <div className="text-sm text-gray-500">Receive emails when a recruiter has a match.</div>
                  </div>
                  <button 
                    onClick={() => handleToggle('consent_email_jobs', !profile?.candidate_profiles?.[0]?.consent_email_jobs)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${profile?.candidate_profiles?.[0]?.consent_email_jobs ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${profile?.candidate_profiles?.[0]?.consent_email_jobs ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div>
                    <div className="font-semibold text-gray-900">Analytics (Anonymous)</div>
                    <div className="text-sm text-gray-500">Help us improve Cvyon by sharing anonymous usage data.</div>
                  </div>
                  <button 
                    onClick={() => handleToggle('consent_analytics', !profile?.candidate_profiles?.[0]?.consent_analytics)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${profile?.candidate_profiles?.[0]?.consent_analytics ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${profile?.candidate_profiles?.[0]?.consent_analytics ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Lock size={20} className="text-gray-900" /> Data Portability & Deletion
              </h3>
              
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Download size={16} /> Download My Data
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                  <Trash2 size={16} /> Delete Account
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">Under GDPR and CCPA, you have the right to request an export of your data or complete erasure from our systems.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
