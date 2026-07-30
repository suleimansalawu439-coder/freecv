"use client";

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function NewsletterCapture({ source = 'blog' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) throw new Error('Failed to subscribe');
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-black text-white p-8 sm:p-12 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 blur-[100px] opacity-20 rounded-full"></div>
        <CheckCircle size={48} className="text-green-400 mb-6" />
        <h3 className="text-3xl font-black uppercase tracking-tight mb-2">You're In!</h3>
        <p className="text-gray-400 font-medium max-w-md">Thanks for subscribing. We'll send you the best career tips and premium templates straight to your inbox.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 blur-[100px] opacity-20 rounded-full pointer-events-none"></div>
      <div className="relative z-10">
        <Mail size={32} className="text-blue-400 mb-6" />
        <h3 className="text-3xl font-black uppercase tracking-tight mb-3">Get the Edge.</h3>
        <p className="text-gray-400 mb-8 max-w-lg font-medium leading-relaxed">
          Join ambitious professionals getting exclusive resume templates, career hacks, and hidden job market strategies delivered weekly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === 'loading'}
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Joining...' : <>Join <ArrowRight size={18} /></>}
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-500 text-center max-w-md mx-auto">
          By subscribing, you agree to our privacy policy. <br/>
          <a href="/manage-data" className="underline hover:text-gray-300">Manage your data preferences</a>.
        </p>
        {status === 'error' && <p className="text-red-400 text-sm font-bold mt-4">Something went wrong. Please try again.</p>}
      </div>
    </div>
  );
}
