"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { RisoPage, RisoSectionLabel } from "@/components/riso/RisoChrome";
import { ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } }), { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-reveal className={className} style={{ transitionDelay: `${delay}ms` }}>
      <style>{`.cv-rv[data-reveal]{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}.cv-rv.in{opacity:1;transform:none}@media(prefers-reduced-motion:reduce){.cv-rv[data-reveal]{opacity:1;transform:none}}`}</style>
      <div className="cv-rv" data-reveal style={{ transitionDelay: `${delay}ms` }}>{children}</div>
    </div>
  );
}

export default function RecruiterPortal() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        router.push("/recruiter/dashboard");
      }
    });
  }, [router]);

  return (
    <RisoPage pageName="recruiter_landing" ticker={true}>
      <section className="relative grid grid-cols-1 gap-12 py-6 lg:grid-cols-12 lg:items-center">
        <div className="dots absolute inset-0 -z-0 opacity-60" style={{ backgroundImage: "radial-gradient(#14131222 1.2px,transparent 1.2px)", backgroundSize: "22px 22px" }} />
        <Reveal className="relative lg:col-span-7">
          <RisoSectionLabel color="#FF4326">recruiter access · est. 2026</RisoSectionLabel>
          <h1 className="fd text-[13vw] leading-[0.86] tracking-tight sm:text-6xl lg:text-[4.6rem]">
            Source talent that <span className="relative inline-block"><span className="relative z-10">asked</span><span className="absolute inset-x-[-4px] bottom-1 z-0 h-[0.42em] bg-[#FFE14D]" /></span> to be found.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#141312]/70">
            Every candidate in Cvyon's pool explicitly opted in to recruiter contact. Filter by role, skill and country, read a completeness score, and reach them directly — no scraping, no guesswork, no noise.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/recruiter/login" className="riso-btn">Sign in <ArrowUpRight size={16} /></Link>
            <Link href="/recruiter/signup" className="riso-btn riso-btn-ghost">Create account</Link>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative lg:col-span-5">
          <div className="riso-card p-7">
            <div className="fm mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#141312]/50">what you actually get</div>
            <ol>
              {[
                ["Consent-verified pool", "Only candidates who ticked “recruiters may contact me.”"],
                ["Structured & scored", "Skills, experience, location and a 0–100 completeness score."],
                ["Direct contact", "Email candidates straight from the card — no middleman markup."],
                ["Search that scales", "Filter by title and country across the whole opt-in pool."],
              ].map(([t, d], i) => (
                <li key={t} className={cn("flex gap-4 border-t-2 border-[#141312]/15 py-4", i === 3 && "border-b-2")}>
                  <span className="fd text-2xl leading-none text-[#FF4326]">{String(i + 1).padStart(2, "0")}</span>
                  <div><div className="fh font-extrabold">{t}</div><div className="mt-0.5 text-sm text-[#141312]/60">{d}</div></div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <Reveal delay={160}>
        <div className="mt-12 grid grid-cols-2 border-[3px] border-[#141312] bg-white sm:grid-cols-4">
          {[["0", "paywalls for candidates"], ["100%", "opt-in pool"], ["18", "résumé layouts"], ["GDPR", "consent-first"]].map(([v, l], i) => (
            <div key={l} className={cn("p-6", i % 2 === 0 && "border-r-2 border-[#141312]", i < 2 && "border-b-2 border-[#141312] sm:border-b-0", i === 1 && "sm:border-r-2")}>
              <div className="fd text-3xl tracking-tight text-[#141312]">{v}</div>
              <div className="fm mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#141312]/55">{l}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </RisoPage>
  );
}