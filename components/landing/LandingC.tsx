"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, X, Activity, Cpu, ScanLine, Crosshair, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { templates } from "@/components/templates";
import { Chakra_Petch, Sora, JetBrains_Mono } from "@/lib/fonts";
import type { ResumeData } from "@/store/useResumeStore";

const disp = Chakra_Petch({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
const body = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });

const INK = "#101418";
const COB = "#1447E6";
const PASS = "#0E8A4B";
const FAIL = "#D8362A";

const SAMPLE: any = {
  templateId: "TechPro", theme: { color: COB },
  personalInfo: { fullName: "Amara Okafor", jobTitle: "Backend Engineer", email: "amara@cvyon.com", phone: "+234 800 000 0000", location: "Lagos, NG", website: "amara.dev" },
  summary: "Backend engineer, 6+ years on payments + distributed systems. Shipped services at 4M req/day, 99.98% uptime.",
  experience: [{ id: "1", company: "Paystack", role: "Senior Backend Engineer", startDate: "2022", endDate: "Present", description: "Re-architected payouts to event-driven.\nCut p99 latency 38%.\nMentored 4 engineers." }],
  education: [{ id: "1", school: "University of Lagos", degree: "B.Sc. Computer Science", graduationYear: "2018" }],
  skills: [{ id: "1", name: "Go" }, { id: "2", name: "PostgreSQL" }, { id: "3", name: "Kafka" }, { id: "4", name: "AWS" }],
  showProjects: false, projects: [], showCertifications: false, certifications: [], showReferences: false, references: [], customSections: [],
  consents: { recruiterShare: false, emailJobs: false, analytics: false },
};
const SHEET: [string, string][] = [["TechPro", "Mono"], ["SwissDesign", "Grid"], ["CorporateBlue", "Corp"], ["MinimalistSplit", "Split"], ["ModernGradient", "Soft"], ["Classic", "Serif"]];

const LOG = [
  "> cvyon build v1.0.0 — booting inspector…",
  "> parsing specimen: amara_okafor.pdf",
  "> section[experience] ………… OK",
  "> section[skills] …………… OK (4 canonical)",
  "> keyword_density …………… 0.81  PASS",
  "> action_verb_ratio ………… 0.74  PASS",
  "> paywall_gate ……………… NONE  ✓",
  "> watermark_layer …………… NONE  ✓",
  "> ats_match ………………… 92/100",
  "> verdict: SHIP_IT — no fee attached",
];

function useTyping(lines: string[], speed = 22) {
  const [out, setOut] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOut(lines); return; }
        let li = 0, ci = 0; const acc: string[] = [];
        const tick = () => {
          if (li >= lines.length) return;
          acc[li] = (acc[li] || "") + lines[li][ci];
          setOut([...acc]); ci++;
          if (ci >= lines[li].length) { li++; ci = 0; }
          setTimeout(tick, li === 0 && ci === 0 ? 240 : speed);
        };
        tick();
      }
    }), { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, [lines, speed]);
  return { out, ref };
}
function Reveal({ children, delay = 0, className = "" }: any) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } }), { threshold: 0.18 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} data-reveal className={className} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
function Mini({ k, color, scale = 0.235, w = 192, h = 250 }: { k: string; color: string; scale?: number; w?: number; h?: number }) {
  return (<div className="relative overflow-hidden bg-white" style={{ width: w, height: h }}><div className="absolute top-0 left-0 origin-top-left" style={{ width: 816, transform: `scale(${scale})`, ["--theme-color" as any]: color }}><img src={`/thumbnails/${k}.webp`} alt={`${k} Template`} className="w-full h-full object-cover" /></div></div>);
}
function Crop({ className = "" }: { className?: string }) {
  return (<span className={cn("pointer-events-none absolute h-3 w-3", className)}><span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-[#101418]/40" /><span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-[#101418]/40" /></span>);
}

const NAV = [
  { href: "#pipeline", label: "pipeline" }, { href: "#qc", label: "qc grader" }, { href: "#sheet", label: "specimens" }, { href: "#spec", label: "the spec" },
];

export default function LandingC() {
  const log = useTyping(LOG);
  return (
    <div className={cn("cv-c relative min-h-screen overflow-x-hidden text-[#101418]", body.className, disp.className, mono.className)}
      style={{ background: "#ECEFF3", ["--ink" as any]: INK, ["--cob" as any]: COB, ["--pass" as any]: PASS, ["--fail" as any]: FAIL, ["--fd" as any]: disp.style.fontFamily, ["--fb" as any]: body.style.fontFamily, ["--fm" as any]: mono.style.fontFamily }}>
      <style>{`
        .cv-c{font-family:var(--fb)} .cv-c .fd{font-family:var(--fd)} .cv-c .fm{font-family:var(--fm)}
        .cv-c .grid-paper{background-color:#ECEFF3;background-image:linear-gradient(#1447E612 1px,transparent 1px),linear-gradient(90deg,#1447E612 1px,transparent 1px);background-size:26px 26px}
        .cv-c .halftone{background-image:radial-gradient(#1014181a 1px,transparent 1.4px);background-size:9px 9px}
        .cv-c [data-reveal]{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)} .cv-c [data-reveal].in{opacity:1;transform:none}
        .cv-c .scan{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--cob),transparent);box-shadow:0 0 14px 2px #1447E666;animation:cvscan 3.4s ease-in-out infinite}
        @keyframes cvscan{0%{top:6%;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:94%;opacity:0}}
        .cv-c .draw path{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.1s ease .2s} .cv-c .in .draw path{stroke-dashoffset:0}
        .cv-c .stamp{opacity:0;transform:scale(2.4) rotate(var(--r,-12deg));transition:opacity .12s,transform .42s cubic-bezier(.18,1.5,.4,1)} .cv-c .in .stamp{opacity:1;transform:scale(1) rotate(var(--r,-12deg))}
        .cv-c .mq{display:flex;width:max-content;animation:cvcmq 30s linear infinite} @keyframes cvcmq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .cv-c .blink{animation:cvcb 1s steps(2,start) infinite} @keyframes cvcb{50%{opacity:.12}}
        .cv-c .ul{background-image:linear-gradient(var(--ink),var(--ink));background-position:0 100%;background-repeat:no-repeat;background-size:0% 2px;transition:background-size .35s} .cv-c .ul:hover{background-size:100% 2px}
        .cv-c .caret::after{content:"_";animation:cvcb 1s steps(2,start) infinite;color:var(--cob)}
        @media (prefers-reduced-motion:reduce){.cv-c .scan,.cv-c .mq,.cv-c .blink,.cv-c .caret::after{animation:none!important}.cv-c .stamp{opacity:1;transform:rotate(var(--r,-12deg))}.cv-c .draw path{stroke-dashoffset:0}}
      `}</style>

      {/* UTILITY BAR */}
      <header className="sticky top-0 z-50 border-b-2 border-[#101418] bg-[#ECEFF3]/92 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center bg-[#101418] fd text-sm font-bold text-[#ECEFF3]">C</span>
            <span className="fd text-lg font-bold tracking-tight">CVYON</span>
            <span className="fm hidden items-center gap-1.5 text-[10px] font-medium text-[#101418]/55 sm:flex"><span className="blink inline-block h-1.5 w-1.5 rounded-full bg-[#0E8A4B]" /> system online · 0 paywalls</span>
          </div>
          <nav className="hidden items-center gap-7 fm text-[11px] font-medium lowercase tracking-wide md:flex">
            {NAV.map((n) => (<a key={n.href} href={n.href} className="ul text-[#101418]/70 hover:text-[#101418]">{n.label}</a>))}
          </nav>
          <Link href="/" className="group flex items-center gap-2 border-2 border-[#101418] bg-[#101418] px-4 py-2 fm text-[11px] font-bold uppercase tracking-widest text-[#ECEFF3] transition-colors hover:bg-[#1447E6] hover:border-[#1447E6]">Run build <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </header>

      <main className="grid-paper relative">
        {/* OPENER — INSPECTION BAY */}
        <section className="relative mx-auto max-w-[1280px] px-5 pb-16 pt-12 lg:px-8 lg:pt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Title block / headline */}
            <div className="lg:col-span-5">
              <div className="fm mb-6 inline-flex items-center gap-2 border-2 border-[#101418] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]">
                <Crosshair size={12} className="text-[#1447E6]" /> inspection bay 01
              </div>
              <h1 className="fd text-[15vw] font-bold leading-[0.9] tracking-tight sm:text-6xl lg:text-[4.4rem]">
                Your résumé,<br />under the<br /><span className="relative inline-block text-[#1447E6]">microscope<span className="absolute -right-3 top-1 h-2 w-2 rounded-full bg-[#D8362A]" /></span>.
              </h1>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-[#101418]/70">
                A free builder that puts your résumé on the inspection table and grades it the way the screening bots will — then tells you, in plain measurements, how to pass. No paywall at the door.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/" className="group flex items-center justify-center gap-2 border-2 border-[#101418] bg-[#1447E6] px-6 py-3.5 fd text-sm font-bold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5">Build my résumé <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
                <a href="#qc" className="flex items-center justify-center gap-2 border-2 border-[#101418] bg-white px-6 py-3.5 fd text-sm font-bold uppercase tracking-wider transition-colors hover:bg-[#101418] hover:text-white">See the grader</a>
              </div>
              {/* mini spec strip */}
              <div className="mt-9 grid grid-cols-3 border-2 border-[#101418] fm text-[10px] font-bold uppercase tracking-wider">
                {[["18", "specimens"], ["100%", "free AI"], ["0", "paywalls"]].map(([v, l], i) => (
                  <div key={l} className={cn("px-3 py-3", i < 2 && "border-r-2 border-[#101418]")}>
                    <div className="fd text-2xl leading-none text-[#101418]">{v}</div><div className="mt-1 text-[#101418]/55">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live specimen on the table */}
            <Reveal delay={120} className="lg:col-span-7">
              <div className="relative">
                {/* leader-line callouts layer */}
                <svg className="draw pointer-events-none absolute inset-0 z-20 hidden h-full w-full lg:block" viewBox="0 0 600 460" fill="none" preserveAspectRatio="none">
                  <path d="M430 70 H520 V40" stroke={PASS} strokeWidth="1.5" pathLength={1} />
                  <path d="M430 210 H540 V250" stroke={COB} strokeWidth="1.5" pathLength={1} />
                  <path d="M150 380 H70 V420" stroke={FAIL} strokeWidth="1.5" pathLength={1} />
                </svg>
                <div className="absolute right-0 top-2 z-30 hidden -translate-y-full lg:block"><span className="fm inline-block border-2 border-[#0E8A4B] bg-white px-2 py-1 text-[10px] font-bold text-[#0E8A4B]">ATS 92 · PASS</span></div>
                <div className="absolute right-0 top-[52%] z-30 hidden lg:block"><span className="fm inline-block translate-y-1/2 border-2 border-[#1447E6] bg-white px-2 py-1 text-[10px] font-bold text-[#1447E6]">keyword density OK</span></div>
                <div className="absolute left-0 bottom-2 z-30 hidden -translate-y-0 lg:block"><span className="fm inline-block border-2 border-[#D8362A] bg-white px-2 py-1 text-[10px] font-bold text-[#D8362A] line-through">paywall: none</span></div>

                <div className="relative mx-auto w-fit border-2 border-[#101418] bg-white p-3 shadow-[10px_10px_0_0_#101418]">
                  <Crop className="-left-1 -top-1" /><Crop className="-right-1 -top-1 rotate-90" /><Crop className="-bottom-1 -left-1 -rotate-90" /><Crop className="-bottom-1 -right-1 rotate-180" />
                  <div className="relative overflow-hidden" style={{ width: 268, height: 348 }}>
                    <div className="scan z-10" />
                    <div className="origin-top-left" style={{ width: 816, transform: "scale(0.328)", ["--theme-color" as any]: COB }}>
                      {(() => {
                        const TechPro = (templates as any).TechPro;
                        return <TechPro data={SAMPLE} />;
                      })()}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t-2 border-dashed border-[#101418]/30 pt-2 fm text-[9px] uppercase tracking-widest text-[#101418]/55">
                    <span>specimen · techpro · a4</span><span className="flex items-center gap-1 text-[#0E8A4B]"><Activity size={11} /> live</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* build-log console */}
          <Reveal delay={200} className="mt-12">
            <div ref={log.ref} className="mx-auto max-w-3xl border-2 border-[#101418] bg-[#101418] shadow-[8px_8px_0_0_#1447E6]">
              <div className="flex items-center justify-between border-b-2 border-[#101418] bg-[#1447E6] px-4 py-2 fm text-[10px] font-bold uppercase tracking-widest text-white">
                <span className="flex items-center gap-2"><Cpu size={13} /> inspector · stdout</span><span className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/40" /><span className="h-2 w-2 rounded-full bg-white/40" /><span className="h-2 w-2 rounded-full bg-white" /></span>
              </div>
              <div className="min-h-[180px] p-4 fm text-[12px] leading-relaxed text-[#9fe6bf]">
                {log.out.map((l, i) => (<div key={i} className={cn(l.includes("PASS") && "text-[#7fe0a6]", l.includes("NONE") && "text-[#7fe0a6]", l.includes("92/100") && "text-white", l.includes("verdict") && "text-[#FFE14D]")}>{l}</div>))}
                <span className="caret" />
              </div>
            </div>
          </Reveal>
        </section>

        {/* MARQUEE — crossed-out rejection reasons */}
        <div className="border-y-2 border-[#101418] bg-[#101418] py-3 text-[#ECEFF3]">
          <div className="mq fm text-[12px] font-bold uppercase tracking-[0.2em]">
            {[0, 1].map((d) => (<div key={d} className="flex shrink-0 items-center">{["“pay to download”", "“start your free trial”", "“watermark on free tier”", "“card required”", "“auto-renews $119.88”"].map((t, i) => (<span key={i} className="flex items-center"><span className="px-6 line-through decoration-[#D8362A] decoration-2 opacity-70">{t}</span><span className="text-[#1447E6]">✕</span></span>))}</div>))}
          </div>
        </div>

        {/* PIPELINE */}
        <section id="pipeline" className="scroll-mt-24 mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">
          <Reveal><div className="fm mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1447E6]">§ the inspection pipeline</div>
            <h2 className="fd max-w-2xl text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">Three stations. Zero friction. One verdict.</h2></Reveal>
          <div className="relative mt-14">
            <div className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-px bg-[#101418]/20 md:block" />
            {[
              ["01", "INTAKE", "Build or import", "Type it in, or drop your old PDF — the AI extracts every line onto the table.", "left"],
              ["02", "MEASURE", "Grade against the role", "Paste the job. We measure keyword density, action verbs, and impact — strictly.", "right"],
              ["03", "RELEASE", "Download, free", "Export a crisp PDF or an editable Word doc. No account. No card. No gate.", "left"],
            ].map(([n, code, t, d, side], i) => (
              <Reveal key={n} delay={i * 90}>
                <div className={cn("relative mb-10 grid grid-cols-1 items-center gap-6 md:grid-cols-12", side === "right" && "md:[direction:rtl]")}>
                  <div className="md:col-span-2 md:[direction:ltr]"><span className="relative z-10 grid h-14 w-14 place-items-center border-2 border-[#101418] bg-white fd text-2xl font-bold shadow-[4px_4px_0_0_#101418]">{n}</span></div>
                  <div className="md:col-span-10 md:[direction:ltr]">
                    <div className="border-2 border-[#101418] bg-white p-6 shadow-[6px_6px_0_0_#101418] sm:p-8">
                      <div className="fm mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1447E6]">station · {code}</div>
                      <h3 className="fd text-2xl font-bold tracking-tight sm:text-3xl">{t}</h3>
                      <p className="mt-2 max-w-lg text-[#101418]/65">{d}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* QC GRADER */}
        <section id="qc" className="scroll-mt-24 border-y-2 border-[#101418] bg-white">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <Reveal>
              <div className="relative border-2 border-[#101418] bg-[#ECEFF3] p-6 shadow-[8px_8px_0_0_#101418] sm:p-8">
                <div className="stamp absolute right-5 top-5 z-10 grid h-20 w-20 place-items-center rounded-full border-4 border-[#0E8A4B] text-center text-[#0E8A4B]" style={{ ["--r" as any]: "-14deg" }}>
                  <div><div className="fd text-lg font-bold leading-none">PASS</div><div className="fm text-[8px] font-bold tracking-widest">ATS 92</div></div>
                </div>
                <div className="fm mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#101418]/55"><ScanLine size={13} className="text-[#1447E6]" /> qc readout</div>
                <div className="flex items-center gap-6">
                  <div className="relative grid h-28 w-28 place-items-center border-2 border-[#101418] bg-white">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="#10141818" strokeWidth="8" /><circle cx="50" cy="50" r="42" fill="none" stroke={PASS} strokeWidth="8" strokeLinecap="square" strokeDasharray="264" strokeDashoffset={264 * 0.08} /></svg>
                    <span className="fd text-3xl font-bold">92</span>
                  </div>
                  <div><div className="fd text-xl font-bold">Excellent match</div><div className="mt-1 text-sm text-[#101418]/60">Highly qualified for this role.</div></div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="border-2 border-[#101418] bg-white p-4"><div className="fm mb-2 text-[10px] font-bold uppercase tracking-widest text-[#0E8A4B]">+ within spec</div><ul className="space-y-1 text-sm">{["Strong action verbs", "Measurable impact"].map((s) => (<li key={s} className="flex gap-2"><Check size={14} className="mt-0.5 text-[#0E8A4B]" /> {s}</li>))}</ul></div>
                  <div className="border-2 border-[#101418] bg-white p-4"><div className="fm mb-2 text-[10px] font-bold uppercase tracking-widest text-[#D8362A]">! out of spec</div><ul className="space-y-1 text-sm">{["Kubernetes", "CI/CD pipelines"].map((s) => (<li key={s} className="flex gap-2"><Plus size={14} className="mt-0.5 text-[#D8362A]" /> {s}</li>))}</ul></div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="fm mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1447E6]">§ the qc grader</div>
              <h2 className="fd text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">A grader that reads like a <span className="relative inline-block"><span className="relative z-10">caliper</span><span className="absolute inset-x-[-3px] bottom-1 z-0 h-[0.42em] bg-[#1447E6]/25" /></span>, not a guess.</h2>
              <p className="mt-5 max-w-md text-[#101418]/70">Paste the job. Cvyon measures your résumé the way an applicant-tracking system would — then prints the exact deltas, with the price tag removed.</p>
              <div className="mt-7 border-2 border-[#101418] fm text-[12px]">
                {[["ATS score /100", "included", "✓"], ["Missing keywords, named", "included", "✓"], ["AI rewrite (3 tones)", "included", "✓"], ["Monthly subscription", "$29.99", "✕"]].map(([k, v, m], i) => (
                  <div key={k} className={cn("flex items-center justify-between px-4 py-3", i < 3 && "border-b-2 border-[#101418]")}>
                    <span className="text-[#101418]/70">{k}</span>
                    <span className={cn("font-bold", m === "✓" ? "text-[#0E8A4B]" : "text-[#D8362A] line-through")}>{v}</span>
                  </div>
                ))}
              </div>
              <Link href="/" className="mt-7 inline-flex items-center gap-2 border-2 border-[#101418] bg-[#101418] px-6 py-3.5 fd text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1447E6] hover:border-[#1447E6]">Run the grader <ArrowUpRight size={15} /></Link>
            </Reveal>
          </div>
        </section>

        {/* CONTACT SHEET */}
        <section id="sheet" className="scroll-mt-24 mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal><div className="fm mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1447E6]">§ the specimens</div><h2 className="fd text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">Eighteen layouts,<br />on the contact sheet.</h2></Reveal>
            <Link href="/" className="fm flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#101418]/60 ul">develop all 18 <ArrowRight size={14} /></Link>
          </div>
          <div className="mt-10 flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SHEET.map(([k, n], i) => (
              <Reveal key={k} delay={i * 60} className="shrink-0">
                <figure className="group border-2 border-[#101418] bg-white shadow-[6px_6px_0_0_#101418] transition-transform hover:-translate-y-1">
                  <div className="relative border-b-2 border-[#101418] bg-[#ECEFF3] p-3"><span className="fm absolute right-3 top-3 text-[10px] font-bold text-[#101418]/50">{String(i + 1).padStart(2, "0")}</span><Mini k={k} color={COB} /></div>
                  <figcaption className="flex items-center justify-between px-4 py-3 fm text-[10px] font-bold uppercase tracking-[0.16em]"><span>{n}</span><ArrowUpRight size={14} className="text-[#1447E6] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TRANSPARENCY SPEC TABLE */}
        <section id="spec" className="scroll-mt-24 border-t-2 border-[#101418] bg-[#101418] text-[#ECEFF3]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
            <Reveal className="lg:col-span-5">
              <div className="fm mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1447E6]">§ the spec sheet</div>
              <h2 className="fd text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">The line items, measured side by side.</h2>
              <p className="mt-5 max-w-md text-[#ECEFF3]/65">We don't hide the economics behind a “free trial.” Here is exactly what you pay — and what the others charge — line by line.</p>
              {/* funding flow */}
              <div className="mt-8 border-2 border-[#ECEFF3]/25 p-5 fm text-[11px] uppercase tracking-wider">
                <div className="mb-3 text-[#ECEFF3]/50">how the loop closes</div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-[#ECEFF3]/40 px-3 py-1.5">you build free</span><span className="text-[#1447E6]">→</span>
                  <span className="border border-[#ECEFF3]/40 px-3 py-1.5">opt in (maybe)</span><span className="text-[#1447E6]">→</span>
                  <span className="border border-[#1447E6] px-3 py-1.5 text-[#1447E6]">recruiters pay</span><span className="text-[#1447E6]">→</span>
                  <span className="border border-[#0E8A4B] px-3 py-1.5 text-[#0E8A4B]">stays free</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7">
              <div className="border-2 border-[#ECEFF3]/25 fm text-[12px]">
                <div className="grid grid-cols-[1.6fr_1fr_1fr] border-b-2 border-[#ECEFF3]/25 bg-[#1447E6] px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white"><span>line item</span><span className="text-center">them</span><span className="text-center">cvyon</span></div>
                {[
                  ["Build a résumé", "$0", "$0", 1, 1],
                  ["Download the PDF", "$20–$120/yr", "$0", 0, 1],
                  ["Watermark on output", "yes", "no", 0, 1],
                  ["Account to download", "required", "never", 0, 1],
                  ["AI ATS grader", "$29/mo", "$0", 0, 1],
                  ["Delete your data", "email support", "one click", 0, 1],
                ].map(([k, them, us, tm, um], i) => (
                  <div key={k as string} className={cn("grid grid-cols-[1.6fr_1fr_1fr] items-center px-4 py-3.5", i < 5 && "border-b border-[#ECEFF3]/15")}>
                    <span className="text-[#ECEFF3]/80">{k}</span>
                    <span className={cn("text-center font-bold", tm ? "text-[#ECEFF3]/50" : "text-[#D8362A] line-through")}>{them}</span>
                    <span className="text-center font-bold text-[#0E8A4B]">{us}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 fm text-center text-[10px] uppercase tracking-widest text-[#ECEFF3]/45">no fabricated “10,000+ users” — a real counter goes live the day we earn it.</p>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA — intake tray */}
        <section className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <div className="relative border-2 border-[#101418] bg-white p-10 shadow-[12px_12px_0_0_#1447E6] lg:p-16">
              <Crop className="-left-1 -top-1" /><Crop className="-right-1 -top-1 rotate-90" /><Crop className="-bottom-1 -left-1 -rotate-90" /><Crop className="-bottom-1 -right-1 rotate-180" />
              <div className="fm mb-5 inline-flex items-center gap-2 border-2 border-[#101418] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"><Crosshair size={12} className="text-[#1447E6]" /> submit your specimen</div>
              <h2 className="fd max-w-2xl text-5xl font-bold leading-[0.92] tracking-tight sm:text-7xl">Put it on the table. See what the bots see.</h2>
              <p className="mt-5 max-w-md text-[#101418]/65">Build, grade, and download a résumé that passes inspection — free, in minutes.</p>
              <Link href="/" className="group mt-9 inline-flex items-center gap-2 border-2 border-[#101418] bg-[#1447E6] px-8 py-4 fd text-base font-bold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5">Start the build <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t-2 border-[#101418] bg-[#ECEFF3] px-5 pb-8 pt-14 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-2 gap-8 border-b-2 border-[#101418] pb-10 md:grid-cols-4">
            {[["product", ["Builder", "Specimens", "QC Grader", "Cover Letter"]], ["company", ["Career Blog", "Recruiter Portal", "Why free"]], ["legal", ["Privacy & GDPR", "Manage Data", "Terms"]], ["elsewhere", ["X / Twitter", "LinkedIn", "GitHub"]]].map(([h, items]) => (
              <div key={h as string}><div className="fm mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#101418]/50">{h}</div><ul className="space-y-2 text-sm">{(items as string[]).map((it) => (<li key={it}><a href="/" className="ul">{it}</a></li>))}</ul></div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
            <span className="fm text-[11px] font-bold uppercase tracking-[0.18em] text-[#101418]/50">© 2026 Cvyon — rev 1.0 · premium & forever free</span>
            <span className="fm flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]"><Crosshair size={13} className="text-[#1447E6]" /> inspected in the open</span>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-[#101418] bg-[#ECEFF3] p-3 md:hidden">
        <Link href="/" className="flex items-center justify-center gap-2 border-2 border-[#101418] bg-[#1447E6] py-3.5 fd text-sm font-bold uppercase tracking-wider text-white">Run the build <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}