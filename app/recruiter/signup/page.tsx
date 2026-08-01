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
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: {
          emailRedirectTo: "https://cvyon.com/recruiter",   // confirmation lands on the portal
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
          <form onSubmit={handleSignup} className="riso-card mt-8 space-y-5 p-7">
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
        )}

        <p className="mt-6 text-center text-sm text-[#141312]/60">
          Already have an account? <Link href="/recruiter/login" className="font-bold text-[#FF4326] underline-offset-4 hover:underline">Sign in</Link>
        </p>
      </main>
      <RisoFooter />
    </div>
  );
}