import React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Pricing — Cvyon Talent Network",
  description: "Access millions of high-intent, ATS-optimized candidates. Transparent pricing for modern recruiters.",
  alternates: { canonical: "https://cvyon.com/pricing" },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#E8E7E1] text-[#141312] selection:bg-[#FF4326] selection:text-white pb-20">
      <nav className="border-b-2 border-[#141312] px-6 py-4 flex items-center justify-between sticky top-0 bg-[#E8E7E1] z-50">
        <Link href="/" className="font-black text-xl tracking-tighter hover:text-[#FF4326] transition-colors">CVYON</Link>
        <Link href="/recruiter/login" className="text-sm font-bold uppercase tracking-widest border-2 border-[#141312] px-4 py-2 hover:bg-[#141312] hover:text-[#E8E7E1] transition-all">Sign In</Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 mt-16 md:mt-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
            Source the top 1%.<br />
            <span className="text-[#2233FF]">Skip the noise.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#141312]/70 max-w-2xl mx-auto font-medium">
            Our talent network consists of candidates actively optimizing their careers. No stale profiles, just high-intent professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Pay as you go */}
          <div className="bg-white border-[3px] border-[#141312] shadow-[8px_8px_0_#141312] p-8 flex flex-col hover:-translate-y-1 hover:shadow-[8px_12px_0_#141312] transition-all">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-2">Pay As You Go</h2>
            <p className="text-[#141312]/60 mb-6 font-medium">Perfect for boutique agencies and solo recruiters.</p>
            <div className="text-5xl font-black mb-8 tracking-tighter">$49<span className="text-lg text-[#141312]/60 font-bold uppercase tracking-widest"> / unlock</span></div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 font-medium"><Check className="text-[#FF4326] mt-0.5 shrink-0" size={20} /> Access to full ATS-parsed profiles</li>
              <li className="flex items-start gap-3 font-medium"><Check className="text-[#FF4326] mt-0.5 shrink-0" size={20} /> Download PDF/DOCX resumes</li>
              <li className="flex items-start gap-3 font-medium"><Check className="text-[#FF4326] mt-0.5 shrink-0" size={20} /> Direct contact email and phone</li>
              <li className="flex items-start gap-3 font-medium"><Check className="text-[#FF4326] mt-0.5 shrink-0" size={20} /> Advanced boolean search filtering</li>
            </ul>

            <Link href="/recruiter/signup?plan=payg" className="block text-center bg-[#141312] text-white py-4 font-black uppercase tracking-widest hover:bg-[#FF4326] transition-colors">
              Start Sourcing
            </Link>
          </div>

          {/* Enterprise */}
          <div className="bg-[#141312] text-white border-[3px] border-[#141312] shadow-[8px_8px_0_#2233FF] p-8 flex flex-col hover:-translate-y-1 hover:shadow-[8px_12px_0_#2233FF] transition-all relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#2233FF] text-white px-3 py-1 font-bold text-xs uppercase tracking-widest border-2 border-[#141312]">Best Value</div>
            <h2 className="text-2xl font-black uppercase tracking-wider mb-2">Enterprise</h2>
            <p className="text-white/60 mb-6 font-medium">For high-volume in-house talent teams.</p>
            <div className="text-5xl font-black mb-8 tracking-tighter">$499<span className="text-lg text-white/60 font-bold uppercase tracking-widest"> / month</span></div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 font-medium"><Check className="text-[#FFE14D] mt-0.5 shrink-0" size={20} /> 50 profile unlocks per month</li>
              <li className="flex items-start gap-3 font-medium"><Check className="text-[#FFE14D] mt-0.5 shrink-0" size={20} /> $29 per additional unlock</li>
              <li className="flex items-start gap-3 font-medium"><Check className="text-[#FFE14D] mt-0.5 shrink-0" size={20} /> ATS Integration (Greenhouse, Lever)</li>
              <li className="flex items-start gap-3 font-medium"><Check className="text-[#FFE14D] mt-0.5 shrink-0" size={20} /> Shared team folders & collaboration</li>
              <li className="flex items-start gap-3 font-medium"><Check className="text-[#FFE14D] mt-0.5 shrink-0" size={20} /> Priority support</li>
            </ul>

            <Link href="/recruiter/signup?plan=enterprise" className="block text-center bg-[#FFE14D] text-[#141312] py-4 font-black uppercase tracking-widest hover:bg-white transition-colors">
              Get Enterprise
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
