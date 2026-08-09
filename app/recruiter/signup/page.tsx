"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { RisoNav, RisoFooter } from "@/components/riso/RisoChrome";
import { ArrowRight, Loader2, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function RecruiterSignup() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const BANNED_DOMAINS = ["yopmail.com", "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com"];
    const domain = email.split('@')[1]?.toLowerCase();
    if (BANNED_DOMAINS.includes(domain)) {
      toast.error("Please use a permanent email address.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: {
          emailRedirectTo: "https://cvyon.com/recruiter",
          data: { company_name: company },
        },
      });
      if (error) throw error;
      setDone(true);
      toast.success("Check your email to confirm");
    } catch (err: any) {
      toast.error(err.message || "Sign up failed");
    } finally { setLoading(false); }
  };

  const handleOAuth = async (provider: 'google' | 'linkedin_oidc') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: "https://cvyon.com/recruiter" }
    });
    if (error) { toast.error(error.message); setLoading(false); }
  };

  return (
    <div className="relative min-h-screen bg-[#E8E7E1] text-[#141312]">
      <div className="riso-grain" />
      <RisoNav />
      <main className="mx-auto flex max-w-md flex-col px-5 py-16 lg:px-8">
        <div className="fm mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#2233FF]">§ create recruiter account</div>
        <h1 className="fd text-4xl leading-[0.95] tracking-tight sm:text-5xl">Start sourcing.</h1>
        <p className="mt-3 text-[#141312]/65">Free to create. Subscribe only when you're ready to search.</p>

        {done ? (
          <div className="riso-card mt-8 p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center border-[3px] border-[#0E8A4B] text-[#0E8A4B]"><Check size={20} /></span>
              <h2 className="fd text-2xl tracking-tight">Confirm your email</h2>
            </div>
            <p className="mt-4 text-[#141312]/70">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account — it lands right back here on Cvyon.</p>
            <Link href="/recruiter/login" className="riso-btn riso-btn-ghost mt-6 w-full">Go to sign in</Link>
          </div>
        ) : (
          <div className="riso-card mt-8 p-7 space-y-6">
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

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="riso-label">Company name</label>
                <input required value={company} onChange={e => setCompany(e.target.value)} className="riso-input mt-2" placeholder="Acme Talent" />
              </div>
              <div>
                <label className="riso-label">Work email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="riso-input mt-2" placeholder="you@company.com" />
              </div>
              <div>
                <label className="riso-label">Password</label>
                <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} className="riso-input mt-2" placeholder="At least 8 characters" />
              </div>
              <button type="submit" disabled={loading} className="riso-btn w-full">
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Create account"} <ArrowRight size={16} />
              </button>
              <p className="fm text-center text-[10px] uppercase tracking-[0.16em] text-[#141312]/45">by continuing you agree to our terms & privacy policy</p>
            </form>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-[#141312]/60">
          Already have an account? <Link href="/recruiter/login" className="font-bold text-[#FF4326] underline-offset-4 hover:underline">Sign in</Link>
        </p>
      </main>
      <RisoFooter />
    </div>
  );
}