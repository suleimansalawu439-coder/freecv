"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, X, Plus, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { templates } from "@/components/templates";
import { Anton, Courier_Prime, Sora } from "next/font/google";
import type { ResumeData } from "@/store/useResumeStore";

const scream = Anton({ subsets: ["latin"], weight: ["400"], display: "swap" });
const typed = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const fine = Sora({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

const RED = "#E23127";
const YELLOW = "#FFD21E";
const INK = "#111111";

const SAMPLE: any = {
  templateId: "Marketing", theme: { color: RED },
  personalInfo: { fullName: "Ngozi Adeyemi", jobTitle: "Growth Marketing Lead", email: "ngozi@cvyon.com", phone: "+234 800 000 0000", location: "Abuja, NG", website: "ngozi.co" },
  summary: "Growth lead, 7 yrs scaling B2B pipelines. Drove 3.2× qualified pipeline and cut CAC 41% across two markets.",
  experience: [{ id: "1", company: "Flutterwave", role: "Growth Marketing Lead", startDate: "2021", endDate: "Present", description: "Built the lifecycle engine from zero.\n3.2× qualified pipeline in 4 quarters.\nCut blended CAC 41%." }],
  education: [{ id: "1", school: "University of Ibadan", degree: "B.Sc. Economics", graduationYear: "2016" }],
  skills: [{ id: "1", name: "Lifecycle" }, { id: "2", name: "SEO" }, { id: "3", name: "HubSpot" }, { id: "4", name: "Analytics" }],
  showProjects: false, projects: [], showCertifications: false, certifications: [], showReferences: false, references: [], customSections: [],
  consents: { recruiterShare: false, emailJobs: false, analytics: false },
};
const POLAROIDS: [string, string, number][] = [["Marketing", "Brand", -3], ["ElegantEditorial", "Editorial", 2], ["SwissGrid", "Grid", -2], ["Diplomat", "Diplomat", 3], ["ExecutiveSplit", "Split", -1], ["TypographyFirst", "Type", 2]];

const DEMANDS = [
  ["01", "We will never charge you to download your own work."],
  ["02", "No watermark will ever touch your résumé. It's yours."],
  ["03", "No account, no card, no “trial” to get your PDF."],
  ["04", "Your data is yours — export it or erase it in one click."],
];
const SHAME = [
  ["“Start your 7-day free trial”", "auto-renews $44.95 — buried in the fine print"],
  ["“Free to build your résumé”", "“$2.99 to actually download it”"],
  ["“Only $4.99 today!”", "becomes $119.88/yr the moment you forget"],
];

function Reveal({ children, delay = 0, className = "" }: any) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } }), { threshold: 0.16 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} data-reveal className={className} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
function Mini({ k, color, scale = 0.235, w = 192, h = 250 }: { k: string; color: string; scale?: number; w?: number; h?: number }) {
  return (<div className="relative overflow-hidden bg-white" style={{ width: w, height: h }}><div className="absolute top-0 left-0 origin-top-left" style={{ width: 816, transform: `scale(${scale})`, ["--theme-color" as any]: color }}><img src={`/thumbnails/${k}.webp`} alt={`${k} Template`} className="w-full h-full object-cover" /></div></div>);
}

const NAV = [
  { href: "#manifesto", label: "manifesto" }, { href: "#shame", label: "wall of shame" }, { href: "#grader", label: "the grader" }, { href: "#wall", label: "the wall" },
];

export default function LandingD() {
  return (
    <div className={cn("cv-d relative min-h-screen overflow-x-hidden text-[#111111]", fine.className, scream.className, typed.className)}
      style={{ background: "#F6F4EE", ["--red" as any]: RED, ["--yel" as any]: YELLOW, ["--ink" as any]: INK, ["--fs" as any]: scream.style.fontFamily, ["--ft" as any]: typed.style.fontFamily, ["--ff" as any]: fine.style.fontFamily }}>
      <style>{`
        .cv-d{font-family:var(--ff)} .cv-d .fs{font-family:var(--fs)} .cv-d .ft{font-family:var(--ft)}
        .cv-d .halftone{background-image:radial-gradient(#11111116 1.3px,transparent 1.6px);background-size:10px 10px}
        .cv-d [data-reveal]{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)} .cv-d [data-reveal].in{opacity:1;transform:none}
        .cv-d .swipe{background-image:linear-gradient(var(--yel),var(--yel));background-repeat:no-repeat;background-position:0 78%;background-size:0% 42%;transition:background-size .6s cubic-bezier(.2,.7,.2,1) .15s} .cv-d .in .swipe{background-size:100% 42%}
        .cv-d .strike{position:relative} .cv-d .strike::after{content:"";position:absolute;left:-6%;right:-6%;top:50%;height:.14em;background:var(--red);transform:rotate(-7deg) scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.2,.7,.2,1) .2s} .cv-d .in .strike::after{transform:rotate(-7deg) scaleX(1)}
        .cv-d .stamp{opacity:0;transform:scale(2.6) rotate(var(--r,-10deg));transition:opacity .12s,transform .42s cubic-bezier(.18,1.5,.4,1)} .cv-d .in .stamp{opacity:1;transform:scale(1) rotate(var(--r,-10deg))}
        .cv-d .mq{display:flex;width:max-content;animation:cvdmq 22s linear infinite} @keyframes cvdmq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .cv-d .wob{transition:transform .25s} .cv-d .wob:hover{transform:rotate(0deg) scale(1.04)!important}
        .cv-d .torn{clip-path:polygon(0 0,100% 0,100% 92%,96% 96%,92% 91%,88% 97%,83% 92%,78% 97%,72% 92%,66% 97%,60% 92%,54% 97%,48% 92%,42% 97%,36% 92%,30% 97%,24% 92%,18% 97%,12% 92%,6% 97%,0 93%)}
        .cv-d .ul{background-image:linear-gradient(var(--ink),var(--ink));background-position:0 100%;background-repeat:no-repeat;background-size:0% 2px;transition:background-size .35s} .cv-d .ul:hover{background-size:100% 2px}
        @media (prefers-reduced-motion:reduce){.cv-d .mq{animation:none!important}.cv-d .swipe{background-size:100% 42%}.cv-d .strike::after{transform:rotate(-7deg) scaleX(1)}.cv-d .stamp{opacity:1;transform:rotate(var(--r,-10deg))}}
      `}</style>

      {/* STRIKE-NOTICE RIBBON */}
      <header className="sticky top-0 z-50 border-b-2 border-[#111111] bg-[#F6F4EE]/92 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-7 w-7 -rotate-3 place-items-center bg-[#E23127] fs text-base text-white">C</span>
            <span className="fs text-xl tracking-tight">CVYON</span>
            <span className="ft hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]/55 sm:inline">· notice to all job seekers · est. 2026</span>
          </div>
          <nav className="hidden items-center gap-7 ft text-[11px] font-semibold lowercase md:flex">
            {NAV.map((n) => (<a key={n.href} href={n.href} className="ul text-[#111111]/70 hover:text-[#111111]">{n.label}</a>))}
          </nav>
          <Link href="/" className="group flex items-center gap-2 bg-[#111111] px-4 py-2 ft text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#E23127]">Take it free <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </header>

      <main>
        {/* OPENER — the argument IS the hero */}
        <section className="halftone relative overflow-hidden border-b-2 border-[#111111]">
          <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-14 lg:px-8 lg:pt-20">
            <div className="ft mb-6 inline-flex -rotate-1 items-center gap-2 border-2 border-[#111111] bg-[#FFD21E] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]"><Megaphone size={13} /> a free résumé builder · on your side</div>
            <h1 className="fs text-[19vw] leading-[0.82] tracking-tight sm:text-[15vw] lg:text-[12rem]">
              <span className="block">THEY CHARGE</span>
              <span className="block">YOU TO BE</span>
              <span className="relative block">
                <span className="relative z-10">SEEN<span className="text-[#E23127]">.</span></span>
              </span>
            </h1>
            {/* colliding struck price + FREE */}
            <div className="relative mt-2 flex flex-wrap items-end gap-x-6 gap-y-2">
              <Reveal className="inline-block"><span className="strike fs inline-block text-5xl text-[#111111]/35 sm:text-7xl">$29.99/mo</span></Reveal>
              <span className="fs inline-block -rotate-2 bg-[#E23127] px-4 py-1 text-5xl text-white sm:text-7xl">FREE</span>
              <span className="ft mb-2 inline-block rotate-2 border-2 border-[#111111] bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest">no paywall · no watermark · no card</span>
            </div>
            <p className="ft mt-8 max-w-xl text-[15px] leading-relaxed text-[#111111]/70">
              The résumé builders with the big ad budgets bait you with “free,” then lock your PDF behind a subscription. We built the opposite: a genuinely free, AI-graded, ATS-friendly builder — funded by recruiters who opt in, never by you.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="group inline-flex items-center justify-center gap-2 bg-[#111111] px-7 py-4 ft text-sm font-bold uppercase tracking-widest text-white transition-transform hover:-translate-y-0.5">Build my résumé <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></Link>
              <a href="#manifesto" className="inline-flex items-center justify-center gap-2 border-2 border-[#111111] px-7 py-4 ft text-sm font-bold uppercase tracking-widest transition-colors hover:bg-[#111111] hover:text-white">Read the manifesto</a>
            </div>
          </div>
          <div className="torn h-6 w-full bg-[#F6F4EE]" />
        </section>

        {/* CHANT MARQUEE */}
        <div className="border-b-2 border-[#111111] bg-[#E23127] py-3 text-white">
          <div className="mq fs text-2xl tracking-tight">
            {[0, 1].map((d) => (<div key={d} className="flex shrink-0 items-center">{["FREE", "FREE", "FREE", "FREE", "FREE", "FREE"].map((t, i) => (<span key={i} className="flex items-center"><span className="px-6">{t}</span><span className="text-[#FFD21E]">✊</span></span>))}</div>))}
          </div>
        </div>

        {/* MANIFESTO */}
        <section id="manifesto" className="scroll-mt-24 mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <Reveal><div className="ft mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#E23127]">§ the manifesto</div>
            <h2 className="fs max-w-3xl text-4xl leading-[0.95] tracking-tight sm:text-6xl">Four demands. Non-negotiable.</h2></Reveal>
          <div className="mt-12 space-y-10">
            {DEMANDS.map(([n, t], i) => (
              <Reveal key={n} delay={i * 80}>
                <div className={cn("grid grid-cols-1 items-start gap-4 border-t-2 border-[#111111] pt-8 md:grid-cols-12", i % 2 === 1 && "md:text-right")}>
                  <span className="fs text-6xl leading-none text-[#E23127] md:col-span-2">{n}</span>
                  <p className={cn("fs text-3xl leading-[1.02] tracking-tight sm:text-5xl md:col-span-10", i % 2 === 1 ? "md:[direction:rtl]" : "")}>
                    <span className="swipe">{t}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WALL OF SHAME */}
        <section id="shame" className="scroll-mt-24 border-y-2 border-[#111111] bg-[#111111] text-[#F6F4EE]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
            <Reveal><div className="ft mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#FFD21E]">§ wall of shame</div>
              <h2 className="fs max-w-3xl text-4xl leading-[0.95] tracking-tight sm:text-6xl">The fine print, dragged into the light.</h2></Reveal>
            <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3">
              {SHAME.map(([head, fine], i) => (
                <Reveal key={head} delay={i * 90}>
                  <div className="relative rotate-[-1.5deg] border-2 border-[#F6F4EE]/30 bg-[#1a1a1a] p-6 transition-transform hover:rotate-0" style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
                    <div className="stamp absolute -right-3 -top-4 z-10 -rotate-12 border-4 border-[#E23127] px-3 py-1 fs text-lg text-[#E23127]" style={{ ["--r" as any]: `${i % 2 ? 9 : -11}deg` }}>BULLSHIT</div>
                    <div className="ft mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6F4EE]/45">the pitch</div>
                    <p className="fs text-2xl leading-tight tracking-tight text-[#F6F4EE]/85 line-through decoration-[#E23127]/70 decoration-2">{head}</p>
                    <div className="my-4 h-px w-full bg-[#F6F4EE]/20" />
                    <div className="ft mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD21E]">the reality</div>
                    <p className="ft text-sm leading-relaxed text-[#F6F4EE]/70">{fine}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* GRADER */}
        <section id="grader" className="scroll-mt-24 mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative border-2 border-[#111111] bg-white p-6 shadow-[10px_10px_0_0_#E23127] sm:p-8">
                <div className="stamp absolute right-5 top-5 z-10 grid h-20 w-20 place-items-center rounded-full border-4 border-[#0E8A4B] text-center text-[#0E8A4B]" style={{ ["--r" as any]: "12deg" }}><div><div className="fs text-lg leading-none">PASS</div><div className="ft text-[8px] font-bold tracking-widest">ATS 92</div></div></div>
                <div className="ft mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">the grader · live</div>
                <div className="flex items-center gap-6">
                  <div className="relative grid h-28 w-28 place-items-center border-2 border-[#111111]"><svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="#11111118" strokeWidth="8" /><circle cx="50" cy="50" r="42" fill="none" stroke="#0E8A4B" strokeWidth="8" strokeLinecap="square" strokeDasharray="264" strokeDashoffset={264 * 0.08} /></svg><span className="fs text-3xl">92</span></div>
                  <div><div className="fs text-2xl tracking-tight">Excellent match</div><div className="ft mt-1 text-sm text-[#111111]/60">Highly qualified for this role.</div></div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="border-2 border-[#111111] p-4"><div className="ft mb-2 text-[10px] font-bold uppercase tracking-widest text-[#0E8A4B]">+ strengths</div><ul className="space-y-1 text-sm">{["Strong action verbs", "Measurable impact"].map((s) => (<li key={s} className="flex gap-2"><Check size={14} className="mt-0.5 text-[#0E8A4B]" /> {s}</li>))}</ul></div>
                  <div className="border-2 border-[#111111] p-4"><div className="ft mb-2 text-[10px] font-bold uppercase tracking-widest text-[#E23127]">! add these</div><ul className="space-y-1 text-sm">{["Kubernetes", "CI/CD pipelines"].map((s) => (<li key={s} className="flex gap-2"><Plus size={14} className="mt-0.5 text-[#E23127]" /> {s}</li>))}</ul></div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="ft mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#E23127]">§ the grader</div>
              <h2 className="fs text-4xl leading-[0.95] tracking-tight sm:text-6xl">We grade you free. They charge <Reveal className="inline-block"><span className="strike inline-block text-[#111111]/40">$30</span></Reveal>.</h2>
              <p className="mt-5 max-w-md text-[#111111]/70">Paste the job you want. Cvyon scores your résumé the way the screening bots will — then shows, plainly, how to close the gap. The exact feature the paid tools put behind a subscription.</p>
              <Link href="/" className="mt-7 inline-flex items-center gap-2 bg-[#111111] px-6 py-3.5 ft text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#E23127]">Try the grader <ArrowUpRight size={15} /></Link>
            </Reveal>
          </div>
        </section>

        {/* POLAROID WALL */}
        <section id="wall" className="scroll-mt-24 border-t-2 border-[#111111] bg-[#efece4] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <Reveal><div className="ft mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#E23127]">§ the wall</div><h2 className="fs text-4xl leading-[0.95] tracking-tight sm:text-6xl">Eighteen layouts, taped to the wall.</h2></Reveal>
              <Link href="/" className="ft flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#111111]/60 ul">see all 18 <ArrowRight size={14} /></Link>
            </div>
            <div className="mt-12 flex gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:overflow-visible">
              {POLAROIDS.map(([k, n, r], i) => (
                <Reveal key={k} delay={i * 60} className="shrink-0">
                  <figure className="wob relative bg-white p-3 pb-10 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.4)]" style={{ transform: `rotate(${r}deg)` }}>
                    <span className="absolute left-1/2 top-0 z-10 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-2 bg-[#FFD21E]/70" />
                    <Mini k={k} color={RED} />
                    <figcaption className="ft absolute bottom-2 left-0 w-full text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111]/55">{n}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WALL OF US + RECEIPT */}
        <section className="border-t-2 border-[#111111] bg-[#F6F4EE] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="ft mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#E23127]">§ wall of us</div>
              <h2 className="fs max-w-xl text-4xl leading-[0.95] tracking-tight sm:text-6xl">What we'll never do to you.</h2>
              <div className="mt-9 flex flex-wrap gap-3">
                {[["No paywall", -3], ["No watermark", 2], ["No dark patterns", -1], ["No fake urgency", 3], ["No selling your data", -2], ["One-click delete", 1], ["Free AI, all of it", -3], ["Recruiters fund it", 2]].map(([t, r], i) => (
                  <span key={t as string} className="wob inline-flex items-center gap-2 border-2 border-[#111111] bg-white px-4 py-2.5 ft text-sm font-bold shadow-[3px_3px_0_0_#111111]" style={{ transform: `rotate(${r}deg)` }}>
                    <span className={cn("grid h-4 w-4 place-items-center", i % 3 === 0 ? "bg-[#E23127] text-white" : i % 3 === 1 ? "bg-[#FFD21E]" : "bg-[#111111] text-white")}><Check size={11} /></span>{t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <div className="rotate-1 border-2 border-[#111111] bg-white p-7 shadow-[8px_8px_0_0_#111111]">
                <div className="flex items-center justify-between border-b-2 border-dashed border-[#111111]/40 pb-4">
                  <span className="fs text-2xl tracking-tight">CVYON</span><span className="ft text-[10px] font-bold uppercase tracking-widest text-[#111111]/50">receipt</span>
                </div>
                <div className="ft mt-4 space-y-2 text-[13px]">
                  {[["Résumé builder", "$0.00"], ["AI ATS grader", "$0.00"], ["PDF + Word export", "$0.00"], ["Watermark removal", "$0.00"], ["Account to download", "$0.00"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between"><span className="text-[#111111]/70">{k}</span><span className="font-bold">{v}</span></div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t-2 border-[#111111] pt-4 fs text-2xl tracking-tight"><span>TOTAL DUE FROM YOU</span><span className="text-[#0E8A4B]">$0.00</span></div>
                <div className="mt-3 ft text-[12px] text-[#111111]/60">PAID BY: recruiters who opt-in to the talent pool.<br />STATUS: <span className="font-bold text-[#0E8A4B]">settled · forever</span></div>
                <div className="stamp mt-5 inline-block -rotate-6 border-4 border-[#0E8A4B] px-4 py-1.5 fs text-xl text-[#0E8A4B]" style={{ ["--r" as any]: "-6deg" }}>FREE FOREVER</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden border-t-2 border-[#111111] bg-[#E23127] text-white">
          <div className="mx-auto max-w-[1240px] px-5 py-24 text-center lg:px-8 lg:py-32">
            <Reveal>
              <div className="ft mb-6 inline-flex -rotate-1 items-center gap-2 border-2 border-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]"><Megaphone size={13} /> last call</div>
              <h2 className="fs text-6xl leading-[0.86] tracking-tight sm:text-8xl lg:text-[10rem]">TAKE IT.<br />IT'S YOURS.</h2>
              <p className="mx-auto mt-6 max-w-md ft text-white/80">Build, grade, and download a résumé that gets past the bots — free, in minutes. No card. No catch. No fine print.</p>
              <Link href="/" className="group mt-9 inline-flex items-center gap-2 bg-[#FFD21E] px-9 py-4 ft text-base font-bold uppercase tracking-widest text-[#111111] transition-transform hover:-translate-y-0.5">Start building free <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link>
            </Reveal>
          </div>
          <div className="torn h-6 w-full -scale-y-100 bg-[#F6F4EE]" />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t-2 border-[#111111] bg-[#F6F4EE] px-5 pb-8 pt-14 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-2 gap-8 border-b-2 border-[#111111] pb-10 md:grid-cols-4">
            {[["product", ["Builder", "Templates", "ATS Grader", "Cover Letter"]], ["company", ["Career Blog", "Recruiter Portal", "Why free"]], ["legal", ["Privacy & GDPR", "Manage Data", "Terms"]], ["elsewhere", ["X / Twitter", "LinkedIn", "GitHub"]]].map(([h, items]) => (
              <div key={h as string}><div className="ft mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">{h}</div><ul className="space-y-2 text-sm">{(items as string[]).map((it) => (<li key={it}><a href="/" className="ul">{it}</a></li>))}</ul></div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
            <span className="fs text-2xl tracking-tight">CVYON</span>
            <span className="ft text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]/55">printed in the open · no VC money · built for $10 · © 2026</span>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-[#111111] bg-[#F6F4EE] p-3 md:hidden">
        <Link href="/" className="flex items-center justify-center gap-2 bg-[#E23127] py-3.5 ft text-sm font-bold uppercase tracking-widest text-white">Take it free <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}