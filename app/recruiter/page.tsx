"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Search, Lock, CreditCard, Check, Building2, Users } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function RecruiterPortal() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const checkAuthAndSub = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      setUser(session.user);

      // Check recruiter status
      const { data: recruiter } = await supabase
        .from('recruiters')
        .select('*, subscriptions(*)')
        .eq('user_id', session.user.id)
        .single();
      
      if (recruiter && recruiter.subscriptions && recruiter.subscriptions.length > 0) {
        const activeSub = recruiter.subscriptions.find((s: any) => s.status === 'active');
        setSubscription(activeSub);
        if (activeSub) fetchCandidates();
      }
      setLoading(false);
    };
    checkAuthAndSub();
  }, []);

  const fetchCandidates = async (query = '') => {
    setIsSearching(true);
    try {
      let reqQuery = supabase
        .from('candidate_profiles') // Must read from candidate_profiles to check consent
        .select('*, candidates(*)')
        .eq('consent_recruiter_share', true)
        .limit(20);
      
      if (query) {
        // basic text search
        reqQuery = reqQuery.ilike('current_title', `%${query}%`);
      }
      const { data } = await reqQuery;
      if (data) setCandidates(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load candidates");
    } finally {
      setIsSearching(false);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please sign in or create an account first.");
      router.push("/recruiter/login");
      return;
    }
    try {
      const res = await fetch('/api/paystack/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to initialize checkout.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="text-blue-600" />
          <span className="font-bold text-xl tracking-tight">Cvyon <span className="text-blue-600">Recruiter</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Back to Builder</Link>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium bg-gray-100 px-3 py-1.5 rounded-lg">{user.email}</div>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  setUser(null);
                  router.push('/recruiter');
                }}
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/recruiter/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Log In</Link>
              <Link href="/recruiter/signup" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">Sign Up</Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 max-w-7xl mx-auto w-full space-y-8">
        
        {!subscription ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-16 max-w-3xl mx-auto text-center shadow-xl shadow-gray-200/50">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Unlock the Talent Pool</h1>
            <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">Get unlimited access to thousands of highly-structured, passive candidates. Instantly search, filter, and connect with top talent.</p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-10 max-w-md mx-auto border border-gray-100 text-left">
              <h3 className="font-bold text-gray-900 text-xl mb-4">Pro Recruiter Tier</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">$99</span>
                <span className="text-gray-500 font-medium">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700"><Check size={20} className="text-green-500" /> Unlimited Candidate Searches</li>
                <li className="flex items-center gap-3 text-gray-700"><Check size={20} className="text-green-500" /> Direct Email Access</li>
                <li className="flex items-center gap-3 text-gray-700"><Check size={20} className="text-green-500" /> B2B API Access Key</li>
                <li className="flex items-center gap-3 text-gray-700"><Check size={20} className="text-green-500" /> Automated AI Job Matching</li>
              </ul>
              <button 
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/30"
              >
                <CreditCard size={20} /> Subscribe Now
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Talent Search</h1>
                <p className="text-gray-500 mt-1">Search the database of opted-in candidates.</p>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by job title or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchCandidates(searchTerm)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Candidate</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Target Role</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Location</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Opted In</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                          {isSearching ? 'Searching...' : 'No candidates found. Try a different search.'}
                        </td>
                      </tr>
                    ) : (
                      candidates.map((c) => (
                        <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{c.name || 'Anonymous'}</div>
                            <div className="text-sm text-gray-500">{c.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {c.job_title || 'Generalist'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{c.country || 'Unknown'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{new Date(c.opted_in_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-right">
                            <a href={`mailto:${c.email}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800">Contact</a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
