"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { RisoPage, RisoSectionLabel } from "@/components/riso/RisoChrome";
import { ArrowRight, ArrowUpRight, ShieldCheck, Users, Search, Zap } from "lucide-react";

export default function RecruiterLanding() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) router.push("/recruiter/dashboard");
    });
  }, [router]);

  return (
    <RisoPage pageName="recruiter_landing" ticker={true}>
      {/* ─── HERO ─── */}
      <section className="dots relative grid grid-cols-1 gap-10 border-b-[3px] border-[#141312] py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <div className="fm mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em]">
            <span className="inline-flex items-center gap-2 border-[3px] border-[#141312] bg-white px-3 py-1.5 hs">
              <span className="blink inline-block h-2 w-2 rounded-full bg-[#FF4326]" />
              recruiter access
            </span>
            <span className="text-[#141312]/50">est. 2026</span>
          </div>
          <h1 className="fd text-[12vw] leading-[0.86] tracking-[-0.02em] sm:text-7xl lg:text-[5.4rem]">
            Source talent<br />that <span className="relative inline-block"><span className="relative z-10">asked</span><span className="absolute inset-x-[-4px] bottom-1 z-0 h-[0.42em] bg-[#FFE14D]" /></span> to<br />be found.
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-[#141312]/75">
            Every candidate in Cvyon&apos;s pool explicitly opted in to recruiter contact.
            Filter by role, skill and country, read a completeness score, and reach
            them directly — no scraping, no guesswork, no noise.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/recruiter/login"
              className="group flex items-center justify-center gap-2 border-[3px] border-[#141312] bg-[#141312] px-7 py-4 fh text-sm font-extrabold uppercase tracking-wider text-[#E8E7E1] hs transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Sign in <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/recruiter/signup"
              className="flex items-center justify-center gap-2 border-[3px] border-[#141312] bg-white px-7 py-4 fh text-sm font-extrabold uppercase tracking-wider hs transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Create account
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap gap-2 fm text-[10px] font-bold uppercase tracking-[0.16em]">
            {["consent-verified", "completeness scored", "direct contact", "GDPR-first"].map((c) => (
              <span key={c} className="border-2 border-[#141312] bg-white px-3 py-1.5">{c}</span>
            ))}
          </div>
        </div>

        {/* RIGHT COL — feature ledger */}
        <div className="relative lg:col-span-5">
          <div className="border-[3px] border-[#141312] bg-white hs p-7">
            <div className="fm mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#141312]/50">what you actually get</div>
            <ol>
              {[
                ["01", "Consent-verified pool", "Only candidates who ticked \u201crecruiters may contact me.\u201d", ShieldCheck],
                ["02", "Structured & scored", "Skills, experience, location and a 0\u2013100 completeness score.", Zap],
                ["03", "Direct contact", "Email candidates straight from the card — no middleman markup.", Users],
                ["04", "Search that scales", "Filter by title and country across the whole opt-in pool.", Search],
              ].map(([num, t, d, Icon]: any, i: number) => (
                <li key={t} className={`flex gap-4 border-t-2 border-[#141312]/15 py-4 ${i === 3 ? "border-b-2" : ""}`}>
                  <span className="fd text-2xl leading-none text-[#FF4326]">{num}</span>
                  <div>
                    <div className="fh font-extrabold">{t}</div>
                    <div className="mt-0.5 text-sm text-[#141312]/60">{d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── STAT STRIP ─── */}
      <div className="mt-12 grid grid-cols-2 border-[3px] border-[#141312] bg-white sm:grid-cols-4">
        {[
          ["0", "paywalls for candidates"],
          ["100%", "opt-in pool"],
          ["18", "résumé layouts"],
          ["GDPR", "consent-first"],
        ].map(([v, l], i) => (
          <div
            key={l}
            className={[
              "p-6",
              i % 2 === 0 ? "border-r-2 border-[#141312]" : "",
              i < 2 ? "border-b-2 border-[#141312] sm:border-b-0" : "",
              i === 1 ? "sm:border-r-2" : "",
            ].filter(Boolean).join(" ")}
          >
            <div className="fd text-3xl tracking-tight text-[#141312]">{v}</div>
            <div className="fm mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#141312]/55">{l}</div>
          </div>
        ))}
      </div>

      {/* ─── CTA BANNER ─── */}
      <section className="mt-16 border-[3px] border-[#141312] bg-[#141312] hs-v p-10 text-center text-[#E8E7E1] sm:p-14">
        <h2 className="fd text-4xl tracking-tight sm:text-5xl">Ready to hire?</h2>
        <p className="mx-auto mt-4 max-w-lg text-[#E8E7E1]/70">
          Create a free account, subscribe when you&apos;re ready, and start contacting
          opted-in candidates today.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/recruiter/signup"
            className="group flex items-center justify-center gap-2 border-[3px] border-[#E8E7E1] bg-[#E8E7E1] px-7 py-4 fh text-sm font-extrabold uppercase tracking-wider text-[#141312] transition-all hover:bg-[#FFE14D] hover:border-[#FFE14D]"
          >
            Create account <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/recruiter/login"
            className="flex items-center justify-center gap-2 border-[3px] border-[#E8E7E1]/40 px-7 py-4 fh text-sm font-extrabold uppercase tracking-wider text-[#E8E7E1] transition-all hover:border-[#E8E7E1]"
          >
            Sign in
          </Link>
        </div>
      </section>
    </RisoPage>
  );
}