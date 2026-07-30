"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Invalid master password.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans p-6 text-white">
      <div className="w-full max-w-md">
        <div className="bg-[#111] border-2 border-[#333] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Brutalist accents */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#ff3333]" />
          <div className="absolute top-0 right-0 w-16 h-16 border-b-2 border-l-2 border-[#333] transform translate-x-8 -translate-y-8 rotate-45" />

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-none shadow-[4px_4px_0px_0px_rgba(255,51,51,1)]">
              <Lock size={24} className="stroke-[3]" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">System</h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">Admin Access Only</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Master Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border-2 border-[#333] px-5 py-4 text-white font-mono focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
                autoFocus
              />
            </div>

            {error && <p className="text-sm font-bold text-[#ff3333] uppercase">{error}</p>}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-black uppercase tracking-widest py-4 hover:bg-[#ff3333] hover:text-white transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Initialize Override'}
            </button>
          </form>
        </div>
        
        <p className="text-center text-[10px] font-mono text-gray-600 mt-8 uppercase tracking-widest">
          Cvyon Architecture © 2026
        </p>
      </div>
    </div>
  );
}
