"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { RisoPage } from "@/components/riso/RisoChrome";
import { ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function RecruiterLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) router.push("/recruiter/dashboard");
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Signed in");
      router.push("/recruiter/dashboard");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Sign in failed");
    } finally { setLoading(false); }
  };

  const handleOAuth = async (provider: 'google' | 'linkedin_oidc') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: "https://cvyon.com/recruiter/dashboard" }
    });
    if (error) { toast.error(error.message); setLoading(false); }
  };


  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://cvyon.com/recruiter",
      });
      if (error) throw error;
      toast.success("Password reset link sent to your email");
      setIsReset(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to send reset link");
    } finally { setLoading(false); }
  };

  return (
    <RisoPage pageName="recruiter_login">
      <div className="mx-auto flex max-w-md flex-col px-0 py-4">
        <div className="fm mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#2233FF]">§ recruiter sign in</div>
        <h1 className="fd text-4xl leading-[0.95] tracking-tight sm:text-5xl">Welcome back.</h1>
        <p className="mt-3 text-[#141312]/65">Sign in to search the opt‑in talent pool.</p>

        <div className="riso-card mt-8 space-y-6 p-7">
          {!isReset && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleOAuth('google')} className="riso-btn bg-white text-[#141312] border-[3px] border-[#141312] hover:bg-[#141312] hover:text-white transition-colors flex items-center justify-center gap-2">
                  Google
                </button>
                <button onClick={() => handleOAuth('linkedin_oidc')} className="riso-btn bg-white text-[#141312] border-[3px] border-[#141312] hover:bg-[#141312] hover:text-white transition-colors flex items-center justify-center gap-2">
                  LinkedIn
                </button>
              </div>
              
              <div className="flex items-center gap-4 before:h-px before:flex-1 before:bg-[#141312]/20 after:h-px after:flex-1 after:bg-[#141312]/20">
                <span className="fm text-[10px] uppercase tracking-widest text-[#141312]/50">or email</span>
              </div>
            </>
          )}

          {isReset ? (
            <form onSubmit={handleReset} className="space-y-5">
              <h2 className="text-xl font-bold tracking-tight mb-2">Reset Password</h2>
              <p className="text-sm text-[#141312]/70 mb-4">Enter your email and we'll send you a link to reset your password.</p>
              <div>
                <label className="riso-label">Work email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="riso-input mt-2" placeholder="you@company.com" />
              </div>
              <button type="submit" disabled={loading} className="riso-btn w-full">
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Send link"} <ArrowRight size={16} />
              </button>
              <button type="button" onClick={() => setIsReset(false)} className="text-sm font-bold text-[#141312]/60 hover:text-[#141312] underline-offset-4 hover:underline w-full text-center">
                Back to sign in
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="riso-label">Work email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="riso-input mt-2" placeholder="you@company.com" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label className="riso-label">Password</label>
                  <button type="button" onClick={() => setIsReset(true)} className="text-xs font-bold text-[#2233FF] hover:underline underline-offset-2">Forgot?</button>
                </div>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="riso-input mt-2" placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading} className="riso-btn w-full">
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign in"} <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-[#141312]/60">
          No account? <Link href="/recruiter/signup" className="font-bold text-[#FF4326] underline-offset-4 hover:underline">Create one</Link>
        </p>
      </div>
    </RisoPage>
  );
}