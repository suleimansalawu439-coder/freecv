"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Check, Star, MoveRight, Crosshair, Cpu, ScanLine, Activity, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { templates } from "@/components/templates";
import { Chakra_Petch, Sora, JetBrains_Mono } from "next/font/google";
import { FAQS } from "./LandingF_FAQS";

const display = Chakra_Petch({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
const head = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap" });
const body = Sora({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

const SAMPLE: any = {
  templateId: "SwissDesign", theme: { color: "#FF4326" },
  personalInfo: { fullName: "Amara Okafor", jobTitle: "Backend Engineer", email: "amara@cvyon.com", phone: "+234 800 000 0000", location: "Lagos, NG", website: "amara.dev" },
  summary: "Backend engineer, 6+ years on payments + distributed systems. Shipped services at 4M req/day, 99.98% uptime.",
  experience: [{ id: "1", company: "Paystack", role: "Senior Backend Engineer", startDate: "2022", endDate: "Present", description: "Re-architected payouts to event-driven.\nCut p99 latency 38%.\nMentored 4 engineers." }],
  education: [{ id: "1", school: "University of Lagos", degree: "B.Sc. Computer Science", graduationYear: "2018" }],
  skills: [{ id: "1", name: "Go" }, { id: "2", name: "PostgreSQL" }, { id: "3", name: "Kafka" }, { id: "4", name: "AWS" }],
  showProjects: false, projects: [], showCertifications: false, certifications: [], showReferences: false, references: [], customSections: [],
  consents: { recruiterShare: false, emailJobs: false, analytics: false },
};
const GALLERY: [string, string][] = [["SwissDesign", "Swiss / Grid"], ["TechPro", "Mono / Dev"], ["Marketing", "Bold / Brand"], ["CorporateBlue", "Corporate"], ["MinimalistSplit", "Two-Tone"], ["ModernGradient", "Soft / Card"]];

const LOG = [
  "> cvyon inspector v1.0 — calibrating the lens…",
  "> loading specimen: your_resume.pdf",
  "> parsing sections ……… experience ✓  education ✓  skills ✓",
  "> measuring keyword density … 0.81  (target ≥ 0.70)  PASS",
  "> scanning action verbs ……… 14 strong, 0 weak",
  "> checking for filler ………… “hard worker” flagged → try “shipped”",
  "> cross-referencing the job post … 6 missing terms surfaced",
  "> paywall check ……………… none. always none.",
  "> watermark check …………… none. it is your document.",
  "> ats match ………………… 92 / 100",
  "> verdict: SHIP_IT — and it cost you $0.00",
];

const TICKER = ["NO PAYWALL AT THE DOWNLOAD", "NO WATERMARK ON YOUR WORK", "NO TRIAL THAT AUTO-RENEWS", "NO CARD TO SEE YOUR SCORE", "RECRUITERS FUND IT — NOT YOU", "18 LAYOUTS · ZERO LOCKED", "AI GRADER · /100 · FREE"];

const PROOF = ["No card, ever", "PDF + Word", "Scored in seconds", "18 layouts · all free"];

const PIPELINE: [string, string, string, string, string][] = [
  ["01", "INTAKE", "Write it, or import it.", "Start from a blank page or drop in your old PDF. The parser reads it the way a recruiter skims — and rebuilds every line into clean, structured fields you can actually edit.", "left"],
  ["02", "MEASURE", "Grade it against the real job.", "Paste the description you actually want. We score your résumé on the same axes the screening software uses — keyword match, action verbs, measurable impact — and name the exact terms you are missing.", "right"],
  ["03", "RELEASE", "Take it. It is yours.", "Export a print-perfect PDF or an editable Word file. No account to unlock it. No watermark to crop out. No subscription waiting in your inbox next month.", "left"],
];

const BOTS: [string, string, string][] = [
  ["01", "It reads text, not design.", "Parsers pull characters from a structured document. Text trapped inside images, columns read out of order, or icon-bullets can vanish on the way in. Every Cvyon layout is built so nothing disappears between you and the screen."],
  ["02", "It matches terms, not talent.", "The first pass is a keyword filter. If the role asks for “stakeholder management” and you wrote “client relations”, a person connects them — the software may not. The grader names exactly these gaps."],
  ["03", "It rewards evidence, not adjectives.", "“Hard-working team player” scores nothing. “Cut churn 18% across two quarters” scores. The rewrite nudges your bullets toward the second without putting words in your mouth."],
  ["04", "It is the first reader, not the last.", "Clearing the ATS gets you to a human being. Cvyon tunes for the bot without making the document unreadable to the person who actually decides."],
];

const SPEC: [string, string, string, number, number][] = [
  ["Build a résumé", "$0", "$0", 1, 1],
  ["Download the PDF", "$20–$120/yr", "$0", 0, 1],
  ["Watermark on your work", "yes", "never", 0, 1],
  ["Account to download", "required", "never", 0, 1],
  ["AI ATS grader", "$29/mo", "$0", 0, 1],
  ["See why you scored low", "locked", "shown", 0, 1],
  ["Delete your data", "email support", "one click", 0, 1],
];

const NAV = [
  { href: "#pipeline", label: "method" },
  { href: "#grader", label: "the grader" },
  { href: "#sheet", label: "layouts" },
  { href: "#funding", label: "why free" },
  { href: "#faq", label: "questions" },
];

function Counter({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0); const ref = useRef<HTMLSpanElement>(null); const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
        const s = performance.now();
        const tick = (t: number) => { const p = Math.min(1, (t - s) / duration); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }), { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}
function Reveal({ children, delay = 0, className = "" }: any) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } }), { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} data-reveal className={className} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
function Mini({ k, color, scale = 0.22, w = 178, h = 231 }: { k: string; color: string; scale?: number; w?: number; h?: number }) {
  return (
    <div className="relative overflow-hidden rounded-[2px] bg-white ring-1 ring-[#080B0F]/5" style={{ width: w, height: h }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width: 816, transform: `scale(${scale})`, ["--theme-color" as any]: color }}><img src={`/thumbnails/${k}.webp`} alt={`${k} Template`} className="w-full h-full object-cover" /></div>
    </div>
  );
}
function Crop({ className = "" }: { className?: string }) {
  return (<span className={cn("pointer-events-none absolute h-3 w-3", className)}><span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-[#101418]/40" /><span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-[#101418]/40" /></span>);
}
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

export default function LandingRiso() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const log = useTyping(LOG);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: +(-py * 7).toFixed(2), ry: +(px * 9).toFixed(2) });
  };
  return (
    <div className={cn("cv-riso relative min-h-screen overflow-x-hidden text-[#141312]", body.className, display.className, head.className, mono.className)}
      style={{ background: "#E8E7E1", ["--ink" as any]: "#141312", ["--verm" as any]: "#FF4326", ["--cob" as any]: "#2233FF", ["--hi" as any]: "#FFE14D", ["--fd" as any]: display.style.fontFamily, ["--fh" as any]: head.style.fontFamily, ["--fb" as any]: body.style.fontFamily, ["--fm" as any]: mono.style.fontFamily }}>
      <style>{`
        .cv-riso{font-family:var(--fb)} .cv-riso .fd{font-family:var(--fd)} .cv-riso .fh{font-family:var(--fh)} .cv-riso .fm{font-family:var(--fm)}
        .cv-riso .grain{position:fixed;inset:0;pointer-events:none;z-index:60;opacity:.06;mix-blend-mode:multiply;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .cv-riso .dots{background-image:radial-gradient(#14131222 1.2px,transparent 1.2px);background-size:22px 22px}
        .cv-riso .hs{box-shadow:7px 7px 0 var(--ink)} .cv-riso .hs-v{box-shadow:7px 7px 0 var(--verm)} .cv-riso .hs-c{box-shadow:6px 6px 0 var(--cob)}
        .cv-riso [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)} .cv-riso [data-reveal].in{opacity:1;transform:none}
        .cv-riso .mq{display:flex;width:max-content;animation:risomq 26s linear infinite} .cv-riso .mq2{animation-duration:34s;animation-direction:reverse}
        @keyframes risomq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .cv-riso .blink{animation:risoblink 1.1s steps(2,start) infinite} @keyframes risoblink{50%{opacity:.15}}
        .cv-riso .floaty{animation:risofloat 6s ease-in-out infinite} @keyframes risofloat{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-9px) rotate(-8deg)}}
        .cv-riso .ul{background-image:linear-gradient(var(--ink),var(--ink));background-position:0 100%;background-repeat:no-repeat;background-size:0% 2px;transition:background-size .35s} .cv-riso .ul:hover{background-size:100% 2px}
        @media (prefers-reduced-motion:reduce){.cv-riso .mq,.cv-riso .floaty,.cv-riso .blink{animation:none!important}}
      `}</style>
      <div className="grain" />

      {/* TICKER */}
      <div className="relative z-40 border-b-[3px] border-[#141312] bg-[#141312] py-2 text-[#E8E7E1] overflow-hidden">
        <div className="mq fm text-[11px] font-bold uppercase tracking-[0.25em]">
          {[0, 1].map((d) => (<div key={d} className="flex shrink-0 items-center">{TICKER.map((t, i) => (<span key={i} className="flex items-center"><span className="px-5">{t}</span><span className="text-[#FF4326]">◆</span></span>))}</div>))}
        </div>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b-[3px] border-[#141312] bg-[#E8E7E1]/95 backdrop-blur-0">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/landing-a" className="flex items-baseline gap-2">
            <span className="fd text-2xl leading-none tracking-tight">CVYON</span>
            <span className="fm hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#141312]/60 sm:inline">® free forever</span>
          </Link>
          <nav className="hidden items-center gap-7 fm text-[11px] font-bold uppercase tracking-[0.18em] md:flex">
            {NAV.map((n) => (<a key={n.href} href={n.href} className={n.href === '#funding' ? "ul hidden lg:hidden" : "ul"}>{n.label}</a>))}
          </nav>
          <Link href="/" className="group flex items-center gap-2 border-[3px] border-[#141312] bg-[#141312] px-4 py-2.5 fm text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8E7E1] hs transition-all hover:bg-[#FF4326] hover:border-[#FF4326]">
            Build free <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-5 lg:px-8">
        {/* HERO — the inspection bay */}
        <section className="dots relative grid grid-cols-1 gap-10 border-b-[3px] border-[#141312] py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <div className="fm mb-6 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em]">
              <span className="inline-flex items-center gap-2 border-[3px] border-[#141312] bg-white px-3 py-1.5 hs"><span className="blink inline-block h-2 w-2 rounded-full bg-[#FF4326]" /> the grader is live · free, forever</span>
              <span className="text-[#141312]/50">no card · no catch</span>
            </div>
            <h1 className="fd text-[15vw] leading-[0.86] tracking-[-0.02em] sm:text-7xl lg:text-[5.4rem]">
              The résumé builder<br />that shows<br /><span className="relative inline-block"><span className="relative z-10">its work.</span><span className="absolute inset-x-[-4px] bottom-1 z-0 h-[0.42em] bg-[#FFE14D]" /></span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#141312]/75">
              Paste the job you want. We score your résumé the way the screening software will — keyword by keyword, line by line — and we show you the gap. Then you take home a print-perfect PDF or an editable Word file. No account. No watermark. No trial that renews into a bill.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="group flex items-center justify-center gap-2 border-[3px] border-[#141312] bg-[#141312] px-7 py-4 fh text-sm font-extrabold uppercase tracking-wider text-[#E8E7E1] hs transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">Grade my résumé — free <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></Link>
              <a href="#grader" className="flex items-center justify-center gap-2 border-[3px] border-[#141312] bg-white px-7 py-4 fh text-sm font-extrabold uppercase tracking-wider hs transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">See a real score</a>
            </div>
            <div className="mt-9 flex flex-wrap gap-2 fm text-[10px] font-bold uppercase tracking-[0.16em]">
              {PROOF.map((c) => (<span key={c} className="border-2 border-[#141312] bg-white px-3 py-1.5">{c}</span>))}
            </div>
          </div>

          {/* HERO OBJECT */}
          <div className="relative lg:col-span-5" onMouseMove={onMove} onMouseLeave={() => setTilt({ rx: 0, ry: 0 })} style={{ perspective: 1100 }}>
            <div className="relative mx-auto w-fit" style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`, transition: "transform .25s ease-out" }}>
              <div className="relative border-[3px] border-[#141312] bg-white hs" style={{ width: 232, height: 302 }}>
                <div className="absolute -left-2 -top-3 z-20 h-9 w-16 rotate-[-18deg] rounded-[3px] border-2 border-[#141312]/40 bg-[#c9c9c9]" />
                <div className="h-full w-full overflow-hidden">
                  <div className="origin-top-left" style={{ width: 816, transform: "scale(0.284)", ["--theme-color" as any]: "#FF4326" }}>
                    {(() => {
                      const SwissDesign = (templates as any).SwissDesign;
                      return <SwissDesign data={SAMPLE} />;
                    })()}
                  </div>
                </div>
              </div>
              <div className="floaty absolute -right-5 top-6 z-20 grid h-20 w-20 place-items-center rounded-full border-[3px] border-[#141312] bg-[#FF4326] text-center text-[#E8E7E1] hs">
                <div><div className="fd text-2xl leading-none"><Counter to={92} /></div><div className="fm text-[8px] font-bold tracking-widest">ATS</div></div>
              </div>
              <div className="absolute -bottom-4 -left-4 z-20 border-[3px] border-[#141312] bg-[#2233FF] px-3 py-2 fm text-[9px] font-bold uppercase tracking-[0.15em] text-white hs-c">tightened · not invented</div>
            </div>
            <svg className="draw pointer-events-none absolute inset-0 z-20 hidden h-full w-full lg:block" viewBox="0 0 600 460" fill="none" preserveAspectRatio="none">
              <path d="M430 70 H520 V40" stroke="#0E8A4B" strokeWidth="1.5" pathLength={1} />
              <path d="M430 210 H540 V250" stroke="#2233FF" strokeWidth="1.5" pathLength={1} />
              <path d="M150 380 H70 V420" stroke="#D8362A" strokeWidth="1.5" pathLength={1} />
            </svg>
            <div className="absolute right-0 top-2 z-30 hidden -translate-y-full lg:block"><span className="fm inline-block border-2 border-[#0E8A4B] bg-white px-2 py-1 text-[10px] font-bold text-[#0E8A4B]">ATS 92 /100</span></div>
            <div className="absolute right-0 top-[52%] z-30 hidden lg:block"><span className="fm inline-block translate-y-1/2 border-2 border-[#2233FF] bg-white px-2 py-1 text-[10px] font-bold text-[#2233FF]">keywords · matched</span></div>
            <div className="absolute left-0 bottom-2 z-30 hidden lg:block"><span className="fm inline-block border-2 border-[#D8362A] bg-white px-2 py-1 text-[10px] font-bold text-[#D8362A] line-through">$29.99 /mo</span></div>
          </div>

          {/* BUILD-LOG CONSOLE */}
          <Reveal delay={200} className="lg:col-span-12">
            <div ref={log.ref} className="mx-auto max-w-3xl border-[3px] border-[#141312] bg-[#141312] shadow-[8px_8px_0_0_#1447E6]">
              <div className="flex items-center justify-between border-b-2 border-[#141312] bg-[#1447E6] px-4 py-2 fm text-[10px] font-bold uppercase tracking-widest text-white">
                <span className="flex items-center gap-2"><Cpu size={13} /> inspector · stdout</span><span className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/40" /><span className="h-2 w-2 rounded-full bg-white/40" /><span className="h-2 w-2 rounded-full bg-white" /></span>
              </div>
              <div className="min-h-[208px] p-4 fm text-[12px] leading-relaxed text-[#9fe6bf]">
                {log.out.map((l, i) => (<div key={i} className={cn(l.includes("PASS") && "text-[#7fe0a6]", l.includes("none") && "text-[#7fe0a6]", l.includes("92 / 100") && "text-white", l.includes("verdict") && "text-[#FFE14D]")}>{l}</div>))}
                <span className="caret" />
              </div>
            </div>
          </Reveal>
        </section>

        {/* PIPELINE */}
        <section id="pipeline" className="scroll-mt-24 py-20 lg:py-28">
          <Reveal><div className="fm mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1447E6]">§ the method</div>
            <h2 className="fd max-w-3xl text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">Three moves — from a blank page to a résumé that survives the first read.</h2></Reveal>
          <div className="relative mt-14">
            <div className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-px bg-[#141312]/20 md:block" />
            {PIPELINE.map(([n, code, t, d, side], i) => (
              <Reveal key={n} delay={i * 90}>
                <div className={cn("relative mb-10 grid grid-cols-1 items-center gap-6 md:grid-cols-12", side === "right" && "md:[direction:rtl]")}>
                  <div className="md:col-span-2 md:[direction:ltr]"><span className="relative z-10 grid h-14 w-14 place-items-center border-2 border-[#141312] bg-white fd text-2xl font-bold shadow-[4px_4px_0_0_#141312]">{n}</span></div>
                  <div className="md:col-span-10 md:[direction:ltr]">
                    <div className="border-2 border-[#141312] bg-white p-6 shadow-[6px_6px_0_0_#141312] sm:p-8">
                      <div className="fm mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1447E6]">station · {code}</div>
                      <h3 className="fd text-2xl font-bold tracking-tight sm:text-3xl">{t}</h3>
                      <p className="mt-2 max-w-lg text-[#141312]/65">{d}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHAT THE BOTS READ */}
        <section id="bots" className="scroll-mt-24 border-y-[3px] border-[#141312] bg-white py-20 lg:py-28">
          <Reveal><div className="fm mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF4326]">§ what the screening software actually reads</div>
            <h2 className="fd max-w-3xl text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">Four things the bots see — that most résumés get quietly wrong.</h2>
            <p className="mt-5 max-w-2xl text-[#141312]/65">Knowing how the first reader thinks is the whole game. Here is the short version, so you can build for it on purpose.</p></Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {BOTS.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 70}>
                <div className="group h-full border-[3px] border-[#141312] bg-[#E8E7E1] p-7 hs transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                  <div className="flex items-start gap-5">
                    <span className="fd text-5xl leading-none text-[#141312]/15 transition-colors group-hover:text-[#FF4326]">{n}</span>
                    <div>
                      <h3 className="fd text-xl font-bold leading-tight tracking-tight">{t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#141312]/65">{d}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* QC GRADER */}
        <section id="grader" className="scroll-mt-24 grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <Reveal>
            <div className="relative border-2 border-[#141312] bg-[#E8E7E1] p-6 shadow-[8px_8px_0_0_#141312] sm:p-8">
              <div className="stamp absolute right-5 top-5 z-10 grid h-20 w-20 place-items-center rounded-full border-4 border-[#0E8A4B] text-center text-[#0E8A4B]" style={{ ["--r" as any]: "-14deg" }}>
                <div><div className="fd text-lg font-bold leading-none">PASS</div><div className="fm text-[8px] font-bold tracking-widest">ATS 92</div></div>
              </div>
              <div className="fm mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#141312]/55"><ScanLine size={13} className="text-[#1447E6]" /> the readout</div>
              <div className="flex items-center gap-6">
                <div className="relative grid h-28 w-28 place-items-center border-2 border-[#141312] bg-white">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="#10141818" strokeWidth="8" /><circle cx="50" cy="50" r="42" fill="none" stroke="#0E8A4B" strokeWidth="8" strokeLinecap="square" strokeDasharray="264" strokeDashoffset={264 * 0.08} /></svg>
                  <span className="fd text-3xl font-bold">92</span>
                </div>
                <div><div className="fd text-xl font-bold">Excellent match</div><div className="mt-1 text-sm text-[#141312]/60">Highly qualified for this role.</div></div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="border-2 border-[#141312] bg-white p-4"><div className="fm mb-2 text-[10px] font-bold uppercase tracking-widest text-[#0E8A4B]">+ earned it</div><ul className="space-y-1 text-sm">{["Strong action verbs", "Measurable impact"].map((s) => (<li key={s} className="flex gap-2"><Check size={14} className="mt-0.5 text-[#0E8A4B]" /> {s}</li>))}</ul></div>
                <div className="border-2 border-[#141312] bg-white p-4"><div className="fm mb-2 text-[10px] font-bold uppercase tracking-widest text-[#D8362A]">! close the gap</div><ul className="space-y-1 text-sm">{["Kubernetes", "CI/CD pipelines"].map((s) => (<li key={s} className="flex gap-2"><Plus size={14} className="mt-0.5 text-[#D8362A]" /> {s}</li>))}</ul></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="fm mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1447E6]">§ the grader</div>
            <h2 className="fd text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">A grader that shows its work.</h2>
            <p className="mt-5 max-w-md text-[#141312]/70">Most tools hand you a number and a sales pitch. Cvyon hands you the rubric — the score, what earned it, and the exact gap. Then a one-click rewrite, if you want it closed.</p>
            <ul className="mt-7 space-y-4">
              {[["A score out of 100, with the maths.", "Not a vibes number. Weighted on keywords, verbs, and impact — shown, never hidden."], ["The missing keywords, by name.", "The exact terms the job post asks for that your résumé does not yet say."], ["A rewrite that keeps your voice.", "Executive, technical, or creative register — tightened, never invented."]].map(([t, d], i) => (
                <li key={t} className="flex gap-4 border-t-2 border-[#141312]/15 pt-4"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center border-2 border-[#141312] bg-[#141312] text-[#E8E7E1] fm text-[11px]">{["i", "ii", "iii"][i]}</span><div><div className="fh text-lg font-extrabold">{t}</div><div className="text-sm text-[#141312]/60">{d}</div></div></li>
              ))}
            </ul>
            <div className="mt-7 border-2 border-[#141312] fm text-[12px]">
              {[["ATS score /100", "included", "✓"], ["Missing keywords, named", "included", "✓"], ["AI rewrite, 3 registers", "included", "✓"], ["Monthly subscription", "$29.99", "✕"]].map(([k, v, m], i) => (
                <div key={k} className={cn("flex items-center justify-between px-4 py-3", i < 3 && "border-b-2 border-[#141312]")}>
                  <span className="text-[#141312]/70">{k}</span>
                  <span className={cn("font-bold", m === "✓" ? "text-[#0E8A4B]" : "text-[#D8362A] line-through")}>{v}</span>
                </div>
              ))}
            </div>
            <Link href="/" className="mt-7 inline-flex items-center gap-2 border-2 border-[#141312] bg-[#1447E6] px-6 py-3.5 fh text-sm font-extrabold uppercase tracking-wider text-white hs-c transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">Try the grader <ArrowUpRight size={15} /></Link>
          </Reveal>
        </section>

        {/* CONTACT SHEET */}
        <section id="sheet" className="scroll-mt-24 border-t-[3px] border-[#141312] py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal><div className="fm mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF4326]">§ the specimens</div><h2 className="fd text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">Eighteen layouts.<br />None of them locked.</h2>
              <p className="mt-4 max-w-xl text-[#141312]/65">A free, ATS-friendly résumé builder only matters if the layouts pass the parsers. Ours are built that way on purpose — real headings, real text, real structure, no text-as-image tricks that blind the bots.</p></Reveal>
            <span className="fm flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#141312]/60"><MoveRight size={15} /> scroll the bench</span>
          </div>
          <div className="mt-10 flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GALLERY.map(([k, n], i) => (
              <Reveal key={k} delay={i * 60} className="shrink-0">
                <div className="group border-[3px] border-[#141312] bg-white hs transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                  <div className="relative border-b-[3px] border-[#141312] bg-[#E8E7E1] p-3"><span className="fm absolute right-3 top-3 text-[10px] font-bold text-[#141312]/50">{String(i + 1).padStart(2, "0")}</span><Mini k={k} color="#FF4326" /></div>
                  <div className="flex items-center justify-between px-4 py-3 fm text-[10px] font-bold uppercase tracking-[0.16em]"><span>{n}</span><span className="text-[#141312]/50">ATS-safe</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TRANSPARENCY / FUNDING */}
        <section id="funding" className="scroll-mt-24 border-t-[3px] border-[#141312] bg-[#141312] text-[#E8E7E1]">
          <div className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:py-28">
            <Reveal className="lg:col-span-5">
              <div className="fm mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1447E6]">§ why a tool this good is free</div>
              <h2 className="fd text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">It is not a loss leader. It is not a trial.</h2>
              <p className="mt-5 max-w-md text-[#E8E7E1]/65">We run a different business — and we would rather you knew exactly how it pays the bills than be left to guess. So here is the receipt, line by line.</p>
              <div className="mt-8 border-2 border-[#E8E7E1]/25 p-5 fm text-[11px] uppercase tracking-wider">
                <div className="mb-3 text-[#E8E7E1]/50">how the loop closes</div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-[#E8E7E1]/40 px-3 py-1.5">you build free</span><span className="text-[#1447E6]">→</span>
                  <span className="border border-[#E8E7E1]/40 px-3 py-1.5">you opt in — maybe</span><span className="text-[#1447E6]">→</span>
                  <span className="border border-[#1447E6] px-3 py-1.5 text-[#1447E6]">recruiters pay</span><span className="text-[#1447E6]">→</span>
                  <span className="border border-[#0E8A4B] px-3 py-1.5 text-[#0E8A4B]">it stays free</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7">
              <div className="border-2 border-[#E8E7E1]/25 fm text-[12px]">
                <div className="grid grid-cols-[1.6fr_1fr_1fr] border-b-2 border-[#E8E7E1]/25 bg-[#1447E6] px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white"><span>line item</span><span className="text-center">them</span><span className="text-center">cvyon</span></div>
                {SPEC.map(([k, them, us, tm, um], i) => (
                  <div key={k} className={cn("grid grid-cols-[1.6fr_1fr_1fr] items-center px-4 py-3.5", i < SPEC.length - 1 && "border-b border-[#E8E7E1]/15")}>
                    <span className="text-[#E8E7E1]/80">{k}</span>
                    <span className={cn("text-center font-bold", tm ? "text-[#E8E7E1]/50" : "text-[#D8362A] line-through")}>{them}</span>
                    <span className="text-center font-bold text-[#0E8A4B]">{us}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 fm text-center text-[10px] uppercase tracking-widest text-[#E8E7E1]/45">no fabricated “10,000+ users” banner — a real counter goes live the day we earn it.</p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 py-20 lg:py-28">
          <Reveal><div className="fm mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#1447E6]">§ straight answers</div>
            <h2 className="fd max-w-3xl text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">The questions worth asking before you trust any résumé tool.</h2></Reveal>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 50}>
                  <div className="border-[3px] border-[#141312] bg-white hs">
                    <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
                      <span className="fd text-lg font-bold leading-tight tracking-tight sm:text-xl">{f.q}</span>
                      <span className={cn("grid h-7 w-7 shrink-0 place-items-center border-2 border-[#141312] transition-transform duration-300", open ? "rotate-45 bg-[#FF4326] text-white" : "bg-white text-[#141312]")}><Plus size={15} /></span>
                    </button>
                    <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                      <div className="overflow-hidden"><p className="px-5 pb-6 text-[15px] leading-relaxed text-[#141312]/70">{f.a}</p></div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden border-t-[3px] border-[#141312] py-20 lg:py-28">
          <div className="relative border-[3px] border-[#141312] bg-[#141312] p-10 text-[#E8E7E1] hs lg:p-16">
            <Crop className="-left-1 -top-1" /><Crop className="-right-1 -top-1 rotate-90" /><Crop className="-bottom-1 -left-1 -rotate-90" /><Crop className="-bottom-1 -right-1 rotate-180" />
            <div className="absolute right-6 top-6 rotate-[10deg] border-2 border-[#FF4326] px-3 py-1.5 fm text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF4326]">free · forever</div>
            <div className="fm mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#FFE14D]">last page</div>
            <h2 className="fd max-w-3xl text-5xl font-bold leading-[0.92] tracking-tight sm:text-7xl">Your next application deserves a résumé that survives the first read.</h2>
            <p className="mt-5 max-w-md text-[#E8E7E1]/65">Build it, grade it against the real job, and take it home — in minutes, for nothing, with nothing owed.</p>
            <Link href="/" className="group mt-9 inline-flex items-center gap-2 border-[3px] border-[#E8E7E1] bg-[#FF4326] px-8 py-4 fh text-base font-extrabold uppercase tracking-wider text-white hs-v transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">Start building — free <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link>
            <p className="mt-5 fm text-[11px] uppercase tracking-[0.2em] text-[#E8E7E1]/45">no card · no account required · no watermark · ever</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative overflow-hidden border-t-[3px] border-[#141312] bg-[#E8E7E1] px-5 pb-8 pt-14 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-2 gap-8 border-b-2 border-[#141312] pb-10 md:grid-cols-4">
            {[["product", ["Builder", "Layouts", "ATS Grader", "Cover Letter"]], ["company", ["Career Blog", "Recruiter Portal", "Why free"]], ["legal", ["Privacy & GDPR", "Manage Data", "Terms"]], ["elsewhere", ["X / Twitter", "LinkedIn", "GitHub"]]].map(([h, items]) => (
              <div key={h as string}><div className="fm mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#141312]/50">{h}</div><ul className="space-y-2 text-sm">{(items as string[]).map((it) => (<li key={it}><a href="/" className="ul">{it}</a></li>))}</ul></div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
            <span className="fm text-[11px] font-bold uppercase tracking-[0.18em] text-[#141312]/50">© 2026 Cvyon — built in the open · free for candidates, funded by recruiters</span>
            <span className="fm flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]"><Star size={13} className="fill-[#FF4326] text-[#FF4326]" /> made by people, for people</span>
          </div>
        </div>
        <div className="pointer-events-none mt-6 select-none text-center fd text-[20vw] leading-[0.8] tracking-tighter text-[#141312]/[0.05]">CVYON</div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-[#141312] bg-[#E8E7E1] p-3 md:hidden">
        <Link href="/" className="flex items-center justify-center gap-2 border-[3px] border-[#141312] bg-[#141312] py-3.5 fh text-sm font-extrabold uppercase tracking-wider text-[#E8E7E1]">Grade my résumé — free <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}