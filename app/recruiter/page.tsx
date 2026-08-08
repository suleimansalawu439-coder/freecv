"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { RisoNav, RisoFooter, RisoSectionLabel, RisoTicker } from "@/components/riso/RisoChrome";
import {
  Search, Mail, MapPin, Briefcase, GraduationCap, ArrowUpRight,
  Loader2, Users, ShieldCheck, Check, Building2, X, Star, ArrowRight, Lock,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "isomorphic-dompurify";
import toast from "react-hot-toast";

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

function LinkedinIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

/* count-up KPI — animates when scrolled into view */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
        const s = performance.now();
        const tick = (t: number) => { const p = Math.min(1, (t - s) / 1100); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }), { threshold: 0.5 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

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
  const [user, setUser] = useState<any>(null);
  const [recruiter, setRecruiter] = useState<any>(null);
  const [sub, setSub] = useState<any>(null);
  const [billing, setBilling] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [selected, setSelected] = useState<any>(null);

  // auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    const { data: l } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user || null));
    return () => l.subscription.unsubscribe();
  }, []);

  // secure candidate search (service-role, consent-filtered, sub-gated)
  const load = async (q: string, ctry: string) => {
    setSearching(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (ctry) params.set("country", ctry);
      const res = await fetch(`/api/recruiter/search?${params.toString()}`, {
        headers: { Authorization: `Bearer ${session?.access_token || ""}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Search failed");
      const list = json.candidates || [];
      setCandidates(list);
      if (!ctry) setCountries(Array.from(new Set(list.map((c: any) => c.country).filter(Boolean))).sort() as string[]);
    } catch (e: any) {
      toast.error(e.message || "Failed to load candidates");
    } finally {
      setSearching(false);
    }
  };

  // on auth: ensure row exists, read own recruiter+sub (RLS scopes to self), load if active
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await fetch("/api/recruiter/ensure", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.access_token || ""}`,
          "x-company-name": user.user_metadata?.company_name || "",
        },
      }).catch(() => {});

      const { data: rec } = await supabase
        .from("recruiters").select("*, subscriptions(*)").eq("user_id", user.id).single();
      setRecruiter(rec || null);
      const active = (rec?.subscriptions || []).find((s: any) => s.status === "active");
      setSub(active || null);

      try {
        const { data: bs } = await supabase.from("app_settings").select("value").eq("key", "billing").single();
        setBilling(bs?.value || null);
      } catch {}

      if (active) await load("", "");
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // escape closes the detail drawer
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [selected]);

  const avgCompleteness = candidates.length
    ? Math.round(candidates.reduce((s, c) => s + (c.completeness_score || 0), 0) / candidates.length)
    : 0;

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const res = await fetch("/api/paystack/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, company: recruiter?.company_name }),
      });
      const data = await res.json();
      if (data.authorization_url) window.location.href = data.authorization_url;
      else toast.error(data.error || "Checkout failed");
    } catch { toast.error("Checkout failed"); }
    finally { setCheckingOut(false); }
  };

  const priceLabel = billing ? `${billing.currency} ${(Number(billing.amount) / 100).toLocaleString()}/mo` : "$99/mo";

  const shell = (ticker: boolean, children: React.ReactNode) => (
    <div className="relative min-h-screen bg-[#E8E7E1] text-[#141312]">
      <div className="riso-grain" />
      {ticker && <RisoTicker />}
      <RisoNav />
      <main className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">{children}</main>
      <RisoFooter />
    </div>
  );

  /* ============================ LOADING ============================ */
  if (loading) {
    return shell(false, (
      <div className="flex flex-col items-center gap-3 py-32 text-[#141312]/60">
        <Loader2 size={30} className="animate-spin text-[#2233FF]" />
        <span className="fm text-[11px] font-bold uppercase tracking-[0.2em]">loading…</span>
      </div>
    ));
  }

  /* ============================ SIGNED OUT ============================ */
  if (!user) {
    return shell(true, (
      <>
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

          {/* proof ledger — a vertical numbered list, not a card trio */}
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

        {/* honest stat strip */}
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
      </>
    ));
  }

  /* ============================ NO ACTIVE SUB ============================ */
  if (!sub) {
    return shell(false, (
      <div className="mx-auto max-w-xl py-6">
        <RisoSectionLabel color="#0E8A4B">your account</RisoSectionLabel>
        <h1 className="fd text-4xl tracking-tight sm:text-5xl">Unlock the talent pool.</h1>
        <p className="mt-4 text-[#141312]/70">Signed in as <span className="font-bold">{user.email}</span>. Subscribe to search and contact opted-in candidates.</p>

        <div className="riso-card mt-8 p-8">
          <div className="flex items-baseline justify-between border-b-[3px] border-[#141312] pb-5">
            <span className="fh text-xl font-extrabold">Recruiter Access</span>
            <span className="fd text-3xl tracking-tight">{priceLabel}</span>
          </div>
          <ul className="mt-6 space-y-3">
            {["Unlimited candidate search", "Filter by role, skill & country", "Completeness-scored profiles", "Direct email contact", "Full candidate detail view", "Cancel anytime"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm"><span className="grid h-5 w-5 place-items-center border-2 border-[#0E8A4B] text-[#0E8A4B]"><Check size={12} /></span> {f}</li>
            ))}
          </ul>
          <button onClick={handleCheckout} disabled={checkingOut} className="riso-btn mt-8 w-full">
            {checkingOut ? <Loader2 size={16} className="animate-spin" /> : "Subscribe with Paystack"} <ArrowRight size={16} />
          </button>
          <p className="fm mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-[#141312]/45">billed securely via Paystack · {priceLabel}</p>
        </div>
      </div>
    ));
  }

  /* ============================ ACTIVE — SEARCH COCKPIT ============================ */
  return shell(false, (
    <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <RisoSectionLabel color="#2233FF">talent pool</RisoSectionLabel>
          <h1 className="fd text-4xl tracking-tight sm:text-5xl">Find your next hire.</h1>
        </div>
        <div className="flex gap-3">
          <div className="riso-card px-5 py-3 text-center"><div className="fd text-2xl"><CountUp to={candidates.length} /></div><div className="fm text-[9px] font-bold uppercase tracking-widest text-[#141312]/50">matches</div></div>
          <div className="riso-card px-5 py-3 text-center"><div className="fd text-2xl"><CountUp to={avgCompleteness} suffix="%" /></div><div className="fm text-[9px] font-bold uppercase tracking-widest text-[#141312]/50">avg profile</div></div>
          <div className="riso-card px-5 py-3 text-center"><div className="fd text-2xl text-[#0E8A4B]">Active</div><div className="fm text-[9px] font-bold uppercase tracking-widest text-[#141312]/50">plan</div></div>
        </div>
      </div>

      {/* search + filters */}
      <div className="riso-card mt-8 flex flex-col gap-3 p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#141312]/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load(query, country)}
            placeholder="Search by job title (e.g. Software Engineer)"
            className="riso-input !pl-9"
          />
        </div>
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="riso-input sm:w-56">
          <option value="">All countries</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={() => load(query, country)} className="riso-btn">{searching ? "Searching…" : "Search"}</button>
        {(query || country) && (
          <button onClick={() => { setQuery(""); setCountry(""); load("", ""); }} className="riso-btn riso-btn-ghost !px-4">Clear</button>
        )}
      </div>

      {/* results */}
      {searching ? (
        <div className="flex items-center justify-center gap-3 py-24 text-[#141312]/60">
          <Loader2 size={24} className="animate-spin text-[#2233FF]" /> Searching the pool…
        </div>
      ) : candidates.length === 0 ? (
        <div className="riso-card mt-8 py-20 text-center">
          <Users size={40} className="mx-auto mb-3 text-[#141312]/30" />
          <p className="fh text-lg font-extrabold">No candidates match yet.</p>
          <p className="mt-1 text-sm text-[#141312]/60">Try a broader title or clear the country filter.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {candidates.map((c) => {
            const email = c.candidates?.email;
            const skills: string[] = Array.isArray(c.skills) ? c.skills.slice(0, 5) : [];
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className="riso-card group flex flex-col p-6 text-left transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="fh truncate text-lg font-extrabold tracking-tight group-hover:text-[#FF4326]">{c.full_name || "Candidate"}</h3>
                    <div className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-[#141312]/75">
                      <Briefcase size={13} className="text-[#2233FF]" /> {c.current_title || "—"}
                    </div>
                  </div>
                  <span className="shrink-0 border-2 border-[#0E8A4B] px-2 py-1 fm text-[11px] font-bold text-[#0E8A4B]">{c.completeness_score ?? 0}%</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 fm text-[11px] uppercase tracking-wider text-[#141312]/55">
                  {c.country && <span className="flex items-center gap-1"><MapPin size={12} /> {c.country}</span>}
                  {c.experience_years != null && <span>{c.experience_years} yrs exp</span>}
                  {c.highest_education && <span className="flex items-center gap-1"><GraduationCap size={12} /> {c.highest_education}</span>}
                </div>

                {skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.map((s: string) => <span key={s} className="riso-chip">{s}</span>)}
                  </div>
                )}

                <div className="mt-5 flex items-center gap-3 border-t-2 border-[#141312]/10 pt-4">
                  {email && (
                    <span
                      role="link"
                      onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${email}`; }}
                      className="riso-btn !px-4 !py-2.5 !text-xs"
                    >
                      <Mail size={14} /> Contact
                    </span>
                  )}
                  {c.linkedin_url && (
                    <span
                      role="link"
                      onClick={(e) => { e.stopPropagation(); window.open(c.linkedin_url, "_blank", "noopener"); }}
                      className="riso-btn riso-btn-ghost !px-4 !py-2.5 !text-xs"
                    >
                      <LinkedinIcon size={14} /> LinkedIn
                    </span>
                  )}
                  <span className="fm ml-auto flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#141312]/40 group-hover:text-[#FF4326]">
                    View profile <ArrowUpRight size={12} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ===================== CANDIDATE DETAIL MODAL (Centered on all screens) ===================== */}
      {selected && (() => {
        const rd = selected.resume_data || selected.candidates?.resume_data || {};
        const email = selected.candidates?.email;
        const skills: string[] = Array.isArray(selected.skills) ? selected.skills : (rd.skills || []).map((s: any) => s.name).filter(Boolean);
        return (
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md print:hidden overflow-y-auto animate-in fade-in duration-200" 
            onClick={() => setSelected(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col w-full max-w-2xl max-h-[90vh] rounded-2xl border-[3px] border-[#141312] bg-[#E8E7E1] shadow-[8px_8px_0px_0px_#141312] overflow-hidden my-auto animate-in zoom-in-95 duration-200"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 border-b-[3px] border-[#141312] bg-[#141312] px-6 py-5 text-[#E8E7E1] shrink-0">
                <div className="min-w-0">
                  <div className="fm text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFE14D]">candidate profile</div>
                  <h2 className="fd mt-1 truncate text-2xl tracking-tight">{selected.full_name || "Candidate"}</h2>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-[#E8E7E1]/70">
                    <Briefcase size={13} className="text-[#FF4326]" /> {selected.current_title || rd.personalInfo?.jobTitle || "—"}
                  </div>
                </div>
                <button 
                  aria-label="Close" 
                  onClick={() => setSelected(null)} 
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 border-[#E8E7E1] text-[#E8E7E1] hover:border-[#FF4326] hover:bg-[#FF4326] hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="flex-1 space-y-6 overflow-y-auto p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="border-2 border-[#0E8A4B] px-2.5 py-1 rounded fm text-[11px] font-bold text-[#0E8A4B] bg-[#0E8A4B]/10">
                    {selected.completeness_score ?? 0}% complete
                  </span>
                  {selected.country && <span className="riso-chip"><MapPin size={11} /> {selected.country}</span>}
                  {selected.experience_years != null && <span className="riso-chip">{selected.experience_years} yrs exp</span>}
                  {selected.highest_education && <span className="riso-chip"><GraduationCap size={11} /> {selected.highest_education}</span>}
                </div>

                {email && (
                  <div className="flex flex-wrap gap-3">
                    <a href={`mailto:${email}`} className="riso-btn !py-2.5 !text-xs font-bold"><Mail size={14} /> {email}</a>
                    {selected.linkedin_url && (
                      <a href={selected.linkedin_url} target="_blank" rel="noopener noreferrer" className="riso-btn riso-btn-ghost !py-2.5 !text-xs">
                        <LinkedinIcon size={14} /> LinkedIn
                      </a>
                    )}
                  </div>
                )}

                {rd.summary && (
                  <div>
                    <RisoSectionLabel>summary</RisoSectionLabel>
                    <p className="riso-card p-4 text-sm leading-relaxed text-[#141312]/80" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rd.summary) }} />
                  </div>
                )}

                {Array.isArray(rd.experience) && rd.experience.length > 0 && (
                  <div>
                    <RisoSectionLabel color="#2233FF">experience</RisoSectionLabel>
                    <div className="space-y-3">
                      {rd.experience.map((exp: any, i: number) => (
                        <div key={exp.id || i} className="riso-card p-4">
                          <div className="flex items-baseline justify-between gap-3">
                            <h4 className="fh font-extrabold">{exp.role}</h4>
                            <span className="shrink-0 fm text-[10px] uppercase tracking-widest text-[#141312]/50">{exp.startDate} — {exp.endDate}</span>
                          </div>
                          <div className="mt-0.5 text-sm font-semibold text-[#2233FF]">{exp.company}</div>
                          {exp.description && <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#141312]/70">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {Array.isArray(rd.education) && rd.education.length > 0 && (
                  <div>
                    <RisoSectionLabel color="#FF4326">education</RisoSectionLabel>
                    <div className="space-y-2">
                      {rd.education.map((ed: any, i: number) => (
                        <div key={ed.id || i} className="flex items-baseline justify-between gap-3 border-b-2 border-[#141312]/10 pb-2">
                          <div><div className="fh font-bold text-sm">{ed.degree}</div><div className="text-xs text-[#141312]/60">{ed.school}</div></div>
                          <span className="fm text-[11px] font-bold text-[#141312]/50">{ed.graduationYear}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <RisoSectionLabel>skills</RisoSectionLabel>
                    <div className="flex flex-wrap gap-1.5">{skills.map((s: string) => <span key={s} className="riso-chip">{s}</span>)}</div>
                  </div>
                )}

                {!rd.summary && !(rd.experience || []).length && !skills.length && (
                  <div className="riso-card py-8 text-center text-sm italic text-[#141312]/50">This candidate only provided basic contact information.</div>
                )}
              </div>

              {/* Modal Footer with Close Button */}
              <div className="flex items-center justify-between border-t-[3px] border-[#141312] bg-[#D8D7D1] px-6 py-4 shrink-0">
                <div className="fm text-xs text-[#141312]/60">Press ESC or click outside to close</div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="riso-btn !bg-[#141312] !text-[#E8E7E1] hover:!bg-[#FF4326] !px-6 !py-2 !text-xs font-bold cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  ));
}