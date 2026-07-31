"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { templates } from "@/components/templates";
import { Fraunces, Figtree, Spline_Sans_Mono } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600", "900"], style: ["normal", "italic"], display: "swap" });
const bodyF = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const mono = Spline_Sans_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const SAMPLE: any = {
  templateId: "Elegant", theme: { color: "#E2B45C" },
  personalInfo: { fullName: "Amara Okafor", jobTitle: "Senior Software Engineer", email: "amara@cvyon.com", phone: "+234 800 000 0000", location: "Lagos, Nigeria", website: "amara.dev" },
  summary: "Backend engineer with 6+ years building scalable APIs and payment systems. Shipped services handling 4M+ daily requests at 99.98% uptime.",
  experience: [{ id: "1", company: "Paystack", role: "Senior Software Engineer", startDate: "2022", endDate: "Present", description: "Led migration of the payouts service to event-driven architecture.\nCut p99 latency 38% across checkout.\nMentored 4 engineers through promotion." }],
  education: [{ id: "1", school: "University of Lagos", degree: "B.Sc. Computer Science", graduationYear: "2018" }],
  skills: [{ id: "1", name: "TypeScript" }, { id: "2", name: "Node.js" }, { id: "3", name: "PostgreSQL" }, { id: "4", name: "AWS" }],
  showProjects: false, projects: [], showCertifications: false, certifications: [], showReferences: false, references: [], customSections: [],
  consents: { recruiterShare: false, emailJobs: false, analytics: false },
};
const PLATES: [string, string][] = [["Elegant", "Elegant"], ["Diplomat", "Diplomat"], ["ElegantEditorial", "Editorial"], ["TypographyFirst", "Type‑First"], ["Classic", "Classic"], ["Executive", "Executive"]];

function Counter({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
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
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } }), { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} data-reveal className={className} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
function Mini({ k, color, scale = 0.235 }: { k: string; color: string; scale?: number }) {
  const Tmpl = (templates as any)[k];
  return (<div className="relative overflow-hidden bg-white" style={{ width: 200, height: 259 }}><div className="absolute top-0 left-0 origin-top-left" style={{ width: 816, transform: `scale(${scale})`, ["--theme-color" as any]: color }}><Tmpl data={SAMPLE} /></div></div>);
}

export default function LandingGallery() {
  return (
    <div className={cn("cv-gal relative min-h-screen overflow-x-hidden", bodyF.className, display.className, mono.className)}
      style={{ background: "#15111C", color: "#F2ECE1", ["--gold" as any]: "#E2B45C", ["--sage" as any]: "#8FA890", ["--line" as any]: "#2C2536", ["--muted" as any]: "#A99FB0", ["--fd" as any]: display.style.fontFamily, ["--fb" as any]: bodyF.style.fontFamily, ["--fm" as any]: mono.style.fontFamily }}>
      <style>{`
        .cv-gal{font-family:var(--fb)} .cv-gal .fd{font-family:var(--fd)} .cv-gal .fm{font-family:var(--fm)}
        .cv-gal .grain{position:fixed;inset:0;pointer-events:none;z-index:60;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .cv-gal [data-reveal]{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)} .cv-gal [data-reveal].in{opacity:1;transform:none}
        .cv-gal .drift{animation:gdrift 22s ease-in-out infinite} @keyframes gdrift{0%,100%{transform:translate(0,0)}50%{transform:translate(-2%,3%)}}
        .cv-gal .floaty{animation:gfloat 7s ease-in-out infinite} @keyframes gfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        .cv-gal .ul{background-image:linear-gradient(var(--gold),var(--gold));background-position:0 100%;background-repeat:no-repeat;background-size:0% 1px;transition:background-size .4s} .cv-gal .ul:hover{background-size:100% 1px}
        .cv-gal .plate{transition:transform .5s cubic-bezier(.2,.7,.2,1),box-shadow .5s} .cv-gal .plate:hover{transform:translateY(-8px)}
        @media (prefers-reduced-motion:reduce){.cv-gal .drift,.cv-gal .floaty{animation:none!important}}
      `}</style>
      <div className="grain" />

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[#15111C]/90">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-5 lg:px-8">
          <Link href="/landing-b" className="fd text-2xl italic tracking-tight">Cvyon</Link>
          <nav className="hidden items-center gap-9 text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--muted)] md:flex">
            <a href="#funding" className="ul hover:text-[#F2ECE1]">Funding</a><a href="#grader" className="ul hover:text-[#F2ECE1]">Grader</a><a href="#collection" className="ul hover:text-[#F2ECE1]">Collection</a><a href="#begin" className="ul hover:text-[#F2ECE1]">Begin</a>
          </nav>
          <Link href="/" className="group flex items-center gap-2 border border-[var(--gold)] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-[#15111C]">Begin — free <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1180px] px-5 lg:px-8">
        {/* vertical index line */}
        <div className="pointer-events-none absolute left-5 top-0 hidden h-full w-px bg-[var(--line)] lg:left-8 lg:block" />

        {/* HERO */}
        <section className="relative grid grid-cols-1 gap-14 border-b border-[var(--line)] py-16 lg:grid-cols-12 lg:py-28">
          <div className="drift pointer-events-none absolute -right-10 top-10 select-none fd text-[26vw] leading-none text-transparent lg:text-[20rem]" style={{ WebkitTextStroke: "1px #2C2536" }}>free</div>
          <Reveal className="relative lg:col-span-7">
            <div className="fm mb-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]"><span className="h-px w-10 bg-[var(--gold)]" /> 001 — the builder</div>
            <h1 className="fd text-[13vw] leading-[0.92] tracking-[-0.01em] sm:text-6xl lg:text-[4.6rem]">A résumé worth <em className="italic text-[var(--gold)]">reading</em> — built to survive the screeners.</h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[var(--muted)]">A free, AI‑graded, ATS‑friendly builder. Beautiful in the browser, faithful on paper, and yours to download as PDF or Word — with no paywall waiting at the door.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/" className="group inline-flex w-fit items-center gap-2 bg-[var(--gold)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#15111C] transition-transform hover:scale-[1.02]">Build my résumé <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
              <a href="#collection" className="ul inline-flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-[#F2ECE1]">View the collection <ArrowUpRight size={15} /></a>
            </div>
          </Reveal>

          {/* HERO PLATE */}
          <Reveal delay={140} className="relative lg:col-span-5">
            <div className="floaty mx-auto w-fit">
              <div className="p-2" style={{ border: "1px solid var(--gold)" }}>
                <div className="overflow-hidden bg-white" style={{ width: 248, height: 321 }}>
                  <div className="origin-top-left" style={{ width: 816, transform: "scale(0.304)", ["--theme-color" as any]: "#E2B45C" }}>
                    <img src="/thumbnails/Elegant.png" alt="Elegant Template" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 border-t border-[var(--line)] pt-3 fm text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                <span>Plate I — ‘Elegant’, rendered live</span><span className="flex items-center gap-1.5 text-[var(--sage)]"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--sage)]" /> no watermark</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FUNDING — wall text */}
        <section id="funding" className="scroll-mt-24 grid grid-cols-1 gap-10 border-b border-[var(--line)] py-20 lg:grid-cols-12 lg:py-28">
          <Reveal className="lg:col-span-3"><div className="fm text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">002 — why it's free</div></Reveal>
          <div className="lg:col-span-9">
            <Reveal><h2 className="fd max-w-3xl text-3xl leading-[1.15] sm:text-4xl">Cvyon is free because the people who pay are <em className="italic text-[var(--gold)]">recruiters</em> — and only ever with your explicit, reversible permission. The candidate side has no paywall, no watermark, and no locked feature. Not today, not after a “trial.”</h2></Reveal>
            <Reveal delay={120}><blockquote className="mt-12 border-l-2 border-[var(--gold)] pl-7 fd text-3xl italic leading-snug text-[#F2ECE1] sm:text-4xl">“You are not the product being sold.”</blockquote></Reveal>
            <Reveal delay={200} className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
              {[["Build & download", "Every template, every AI feature, every export — free."], ["Opt in, maybe", "Recruiters find you only if you choose to. Granular consent."], ["Recruiters fund it", "Their subscriptions keep the candidate side free forever."]].map(([t, d]) => (
                <div key={t} className="bg-[#15111C] p-7"><div className="fd mb-3 text-lg italic text-[var(--gold)]">{t}</div><p className="text-sm leading-relaxed text-[var(--muted)]">{d}</p></div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* GRADER — reading room */}
        <section id="grader" className="scroll-mt-24 grid grid-cols-1 items-center gap-14 border-b border-[var(--line)] py-20 lg:grid-cols-2 lg:py-28">
          <Reveal>
            <div className="border border-[var(--line)] bg-[#1B1622] p-8 sm:p-10" style={{ borderTop: "2px solid var(--gold)" }}>
              <div className="fm mb-7 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]"><Sparkles size={13} className="text-[var(--gold)]" /> the reading room</div>
              <div className="flex items-center gap-7">
                <div className="relative grid h-32 w-32 place-items-center rounded-full border border-[var(--line)]">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="#2C2536" strokeWidth="3" /><circle cx="50" cy="50" r="44" fill="none" stroke="#E2B45C" strokeWidth="3" strokeLinecap="round" strokeDasharray="276" strokeDashoffset={276 * (1 - 92 / 100)} /></svg>
                  <span className="fd text-4xl"><Counter to={92} /></span>
                </div>
                <div><div className="fd text-2xl italic">Excellent match</div><div className="mt-1 text-sm text-[var(--muted)]">Highly qualified for this role.</div></div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-[var(--line)] p-5"><div className="fm mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--sage)]">strengths</div><ul className="space-y-1.5 text-sm text-[var(--muted)]">{["Strong action verbs", "Measurable impact"].map((s) => (<li key={s} className="flex gap-2"><Plus size={13} className="mt-1 text-[var(--sage)]" /> {s}</li>))}</ul></div>
                <div className="border border-[var(--line)] p-5"><div className="fm mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">add these</div><ul className="space-y-1.5 text-sm text-[var(--muted)]">{["Kubernetes", "CI/CD pipelines"].map((s) => (<li key={s} className="flex gap-2"><Plus size={13} className="mt-1 text-[var(--gold)]" /> {s}</li>))}</ul></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="fm mb-6 text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">003 — the grader</div>
            <h2 className="fd text-4xl leading-[1.05] sm:text-5xl">A grader that reads like a <em className="italic text-[var(--gold)]">second pair of eyes</em>.</h2>
            <p className="mt-6 max-w-md text-[var(--muted)]">Paste the job you want. Cvyon scores your résumé the way an applicant‑tracking system would — then shows, plainly, how to close the gap.</p>
            <ul className="mt-8 space-y-5">
              {[["A score out of 100", "Strict, objective, against the real description."], ["The missing keywords", "Named, not guessed — the terms screeners scan for."], ["One‑click rewrite", "Executive, creative, or technical register."]].map(([t, d], i) => (
                <li key={t} className="flex gap-5 border-t border-[var(--line)] pt-5"><span className="fd text-xl italic text-[var(--gold)]">{["i", "ii", "iii"][i]}</span><div><div className="text-lg font-semibold">{t}</div><div className="text-sm text-[var(--muted)]">{d}</div></div></li>
              ))}
            </ul>
            <Link href="/" className="mt-9 inline-flex items-center gap-2 border border-[var(--gold)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-[#15111C]">Try the grader <ArrowUpRight size={15} /></Link>
          </Reveal>
        </section>

        {/* COLLECTION — gallery walk */}
        <section id="collection" className="scroll-mt-24 border-b border-[var(--line)] py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><div className="fm mb-4 text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">004 — the collection</div><h2 className="fd text-4xl leading-[1.02] sm:text-5xl">Eighteen plates, hung for you to walk.</h2></div>
            <span className="fm text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">drag · scroll</span>
          </div>
          <div className="mt-12 flex gap-8 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PLATES.map(([k, n], i) => (
              <Reveal key={k} delay={i * 70} className="shrink-0">
                <figure className="plate">
                  <div className="p-2" style={{ border: "1px solid var(--line)" }}><Mini k={k} color="#E2B45C" /></div>
                  <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-[var(--line)] pt-3 fm text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]"><span className="text-[#F2ECE1]">{n}</span><span className="text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* METHOD */}
        <section className="border-b border-[var(--line)] py-20 lg:py-28">
          <div className="fm mb-12 text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">005 — the method</div>
          {[["I", "Write or import", "Start from a blank page, or upload an old PDF and let the AI lift every detail into place."], ["II", "Grade against the role", "Paste the description for a strict score, the missing terms, and a one‑click rewrite."], ["III", "Download, freely", "Export a polished PDF or an editable Word file. No card. No account. No catch."]].map(([n, t, d], i) => (
            <Reveal key={n}>
              <div className="group grid grid-cols-1 items-baseline gap-4 border-t border-[var(--line)] py-9 md:grid-cols-12">
                <span className="fd text-5xl italic text-[var(--line)] transition-colors group-hover:text-[var(--gold)] md:col-span-2">{n}</span>
                <h3 className="fd text-2xl italic md:col-span-4">{t}</h3>
                <p className="text-[var(--muted)] md:col-span-6">{d}</p>
              </div>
            </Reveal>
          ))}
        </section>

        {/* HONEST NUMBERS */}
        <section className="border-b border-[var(--line)] py-20 lg:py-24">
          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {[["0", "paywalls"], ["0", "locked features"], ["18", "free templates"], ["∞", "free downloads"]].map(([v, l], i) => (
              <Reveal key={l} delay={i * 80} className="text-center lg:text-left">
                <div className="fd text-6xl text-[var(--gold)] sm:text-7xl">{v}</div>
                <div className="fm mt-3 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{l}</div>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 text-center fm text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">We'll publish real visitor figures the day we have them — never a fabricated count.</p>
        </section>

        {/* FINAL CTA */}
        <section id="begin" className="scroll-mt-24 py-24 lg:py-32">
          <Reveal>
            <div className="border border-[var(--line)] bg-[#1B1622] p-10 lg:p-16" style={{ borderTop: "2px solid var(--gold)" }}>
              <div className="fm mb-6 text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">the last room</div>
              <h2 className="fd max-w-2xl text-5xl leading-[0.98] sm:text-6xl">Make something <em className="italic text-[var(--gold)]">worth reading</em>.</h2>
              <p className="mt-6 max-w-md text-[var(--muted)]">Build, grade, and download a résumé that gets past the bots — free, in minutes.</p>
              <Link href="/" className="group mt-9 inline-flex items-center gap-2 bg-[var(--gold)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#15111C] transition-transform hover:scale-[1.02]">Start building free <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--line)] px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-2 gap-10 border-b border-[var(--line)] pb-12 md:grid-cols-4">
            {[["Product", ["Builder", "Templates", "ATS Grader", "Cover Letter"]], ["Company", ["Career Blog", "Recruiter Portal", "Why free"]], ["Legal", ["Privacy & GDPR", "Manage Data", "Terms"]], ["Elsewhere", ["X / Twitter", "LinkedIn", "GitHub"]]].map(([h, items]) => (
              <div key={h as string}><div className="fm mb-5 text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">{h}</div><ul className="space-y-2.5 text-sm text-[var(--muted)]">{(items as string[]).map((it) => (<li key={it}><a href="/" className="ul hover:text-[#F2ECE1]">{it}</a></li>))}</ul></div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-5 pt-8 sm:flex-row sm:items-center">
            <span className="fd text-3xl italic">Cvyon</span>
            <span className="fm text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">© 2026 — premium & forever free</span>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[#15111C]/95 p-3 md:hidden">
        <Link href="/" className="flex items-center justify-center gap-2 bg-[var(--gold)] py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#15111C]">Begin — free <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}