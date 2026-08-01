"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { RisoNav, RisoFooter } from "@/components/riso/RisoChrome";
import { ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function RecruiterLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Signed in");
      router.push("/recruiter");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Sign in failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="relative min-h-screen bg-[#E8E7E1] text-[#141312]">
      <div className="riso-grain" />
      <RisoNav />
      <main className="mx-auto flex max-w-md flex-col px-5 py-16 lg:px-8">
        <div className="fm mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#2233FF]">§ recruiter sign in</div>
        <h1 className="fd text-4xl leading-[0.95] tracking-tight sm:text-5xl">Welcome back.</h1>
        <p className="mt-3 text-[#141312]/65">Sign in to search the opt‑in talent pool.</p>

        <form onSubmit={handleLogin} className="riso-card mt-8 space-y-5 p-7">
          <div>
            <label className="riso-label">Work email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="riso-input mt-2" placeholder="you@company.com" />
          </div>
          <div>
            <label className="riso-label">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="riso-input mt-2" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="riso-btn w-full">
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign in"} <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#141312]/60">
          No account? <Link href="/recruiter/signup" className="font-bold text-[#FF4326] underline-offset-4 hover:underline">Create one</Link>
        </p>
      </main>
      <RisoFooter />
    </div>
  );
}