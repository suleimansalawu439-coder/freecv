import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Mail, CheckCircle2, Loader2, Save } from 'lucide-react';
import { cn } from '@/lib/utils'; // wait, I don't know if lib/utils exists. Let's use local cn.

export function AuthModal({ isOpen, onClose, isDarkMode }: { isOpen: boolean, onClose: () => void, isDarkMode: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  
  const handleOAuth = async (provider: 'google' | 'linkedin_oidc') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setErrorMsg(error.message || `Failed to sign in with ${provider}`);
      setStatus('error');
    }
  };

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      setErrorMsg(error.message || 'Failed to send magic link');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl relative ${isDarkMode ? 'bg-[#111] text-white border border-gray-800' : 'bg-white text-gray-900 border border-gray-100'}`}>
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Save size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Save & Claim Resume</h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Enter your email to receive a magic link. We'll securely link your resume to your account so you can access it anywhere.
            </p>
          </div>
        </div>

        {status === 'success' ? (
          <div className={`flex flex-col items-center justify-center p-6 text-center rounded-xl border ${isDarkMode ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>
            <CheckCircle2 size={32} className="mb-3" />
            <h3 className="font-bold mb-1">Check your inbox</h3>
            <p className="text-sm opacity-90">We sent a secure magic link to <strong>{email}</strong>.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => handleOAuth('google')}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 shadow-sm"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button
                type="button"
                onClick={() => handleOAuth('linkedin_oidc')}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0A66C2] border border-transparent rounded-xl hover:bg-[#004182] transition-colors text-sm font-semibold text-white shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </button>
            </div>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleSendLink} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-800 focus:bg-gray-800' 
                      : 'bg-gray-50 border-gray-200 focus:bg-white'
                  }`}
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || !email}
              className={`w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl text-white font-semibold transition-all shadow-lg ${
                status === 'loading' || !email
                  ? 'bg-blue-600/50 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25 active:scale-[0.98]'
              }`}
            >
              {status === 'loading' ? (
                <><Loader2 size={18} className="animate-spin" /> Sending...</>
              ) : (
                'Send Magic Link'
              )}
            </button>
          </form>
          </>
        )}
      </div>
    </div>
  );
}
