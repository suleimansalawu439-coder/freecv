"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, BarChart3, Users, Building2, Link2, Settings as SettingsIcon,
  Search, Download, Mail, ArrowUpRight, DollarSign, TrendingUp, Database, Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

type Props = { candidates: any[]; analytics: any[]; aiLogs: any[]; recruiters: any[] };

const usd = (cents: number) =>
  `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const groupBy = (arr: any[], key: string) =>
  arr.reduce((m: Record<string, number>, x) => { const k = x[key] || "Unknown"; m[k] = (m[k] || 0) + 1; return m; }, {});
const topN = (obj: Record<string, number>, n = 8) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n);

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("riso-card p-6", className)}>{children}</div>;
}
function Kpi({ label, value, sub, accent = "#141312" }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="riso-card p-5">
      <div className="fm text-[10px] font-bold uppercase tracking-[0.2em] text-[#141312]/50">{label}</div>
      <div className="fd mt-2 text-3xl tracking-tight" style={{ color: accent }}>{value}</div>
      {sub && <div className="fm mt-1 text-[11px] text-[#141312]/50">{sub}</div>}
    </div>
  );
}
function Bar({ label, value, max, color = "#2233FF" }: { label: string; value: number; max: number; color?: string }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex justify-between fm text-[11px] font-bold uppercase tracking-wider">
        <span className="truncate pr-2">{label}</span><span>{value}</span>
      </div>
      <div className="h-3 w-full border-2 border-[#141312] bg-white">
        <div className="h-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
function SectionTitle({ children, color = "#2233FF" }: { children: React.ReactNode; color?: string }) {
  return <div className="fm mb-4 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color }}>§ {children}</div>;
}

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "talent", label: "Talent Pool", icon: Users },
  { id: "recruiters", label: "Recruiters", icon: Building2 },
  { id: "affiliates", label: "Affiliates", icon: Link2 },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export default function AdminDashboard({ candidates, analytics, aiLogs, recruiters }: Props) {
  const [tab, setTab] = useState("overview");
  const [aff, setAff] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/affiliates").then(r => r.json()).then(setAff).catch(() => {});
  }, []);

  /* ---------- GROWTH ---------- */
  const growth = useMemo(() => {
    const sessions = new Set(analytics.map(a => a.session_id)).size;
    const started = analytics.filter(a => a.event_type === "milestone_started").length;
    const downloaded = analytics.filter(a => a.event_type === "milestone_downloaded").length;
    const optIns = candidates.length;
    return { sessions, started, downloaded, optIns, conv: sessions ? Math.round((optIns / sessions) * 100) : 0 };
  }, [analytics, candidates]);

  /* ---------- SUPPLY / POOL ---------- */
  const supply = useMemo(() => {
    const now = Date.now();
    const fresh = candidates.filter(c => c.created_at && now - new Date(c.created_at).getTime() < 90 * 864e5).length;
    const recruiterShare = candidates.filter(c => c.consent_recruiter_share).length;
    const avgComp = candidates.length ? Math.round(candidates.reduce((s, c) => s + (c.completeness_score || 0), 0) / candidates.length) : 0;
    return { total: candidates.length, fresh, recruiterShare, avgComp, countries: topN(groupBy(candidates, "country")), titles: topN(groupBy(candidates, "current_title")) };
  }, [candidates]);

  /* ---------- MACHINE ---------- */
  const machine = useMemo(() => {
    const requests = aiLogs.length;
    const cost = aiLogs.reduce((s, l) => s + (l.cost_estimate || 0), 0);
    const hits = aiLogs.filter(l => l.cache_hit).length;
    return { requests, cost, hitRate: requests ? Math.round((hits / requests) * 100) : 0 };
  }, [aiLogs]);

  /* ---------- REVENUE ---------- */
  const revenue = useMemo(() => {
    const activeSubs = recruiters.filter(r => (r.subscriptions || []).some((s: any) => s.status === "active")).length;
    return { activeSubs, totalRecruiters: recruiters.length };
  }, [recruiters]);

  /* ---------- ANALYTICS ---------- */
  const an = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 13; i >= 0; i--) days[new Date(Date.now() - i * 864e5).toISOString().slice(0, 10)] = 0;
    analytics.forEach(a => { const d = (a.created_at || "").slice(0, 10); if (d in days) days[d]++; });
    return {
      countries: topN(groupBy(analytics, "country")),
      devices: topN(groupBy(analytics, "device_type")),
      browsers: topN(groupBy(analytics, "browser")),
      templates: topN(groupBy(analytics, "template_id")),
      daily: Object.entries(days),
    };
  }, [analytics]);
  const maxDaily = Math.max(1, ...an.daily.map(([, v]) => v));

  /* ---------- TALENT POOL filters + export ---------- */
  const [tpQ, setTpQ] = useState("");
  const [tpCountry, setTpCountry] = useState("");
  const tpCountries = useMemo(() => Array.from(new Set(candidates.map(c => c.country).filter(Boolean))).sort() as string[], [candidates]);
  const filtered = useMemo(() => candidates.filter(c =>
    (!tpCountry || c.country === tpCountry) &&
    (!tpQ || `${c.full_name} ${c.current_title}`.toLowerCase().includes(tpQ.toLowerCase()))
  ), [candidates, tpQ, tpCountry]);

  const exportCSV = () => {
    if (!filtered.length) return;
    const headers = ["Name", "Title", "Country", "Experience", "Completeness", "Recruiter consent", "Opted in"];
    const rows = filtered.map(c => [c.full_name, c.current_title, c.country, c.experience_years, c.completeness_score, c.consent_recruiter_share ? "yes" : "no", c.created_at?.slice(0, 10)]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${(v ?? "").toString().replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "cvyon_talent_pool.csv"; a.click();
  };
  const exportJSON = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" }));
    a.download = "cvyon_talent_pool.json"; a.click();
  };

  /* ---------- SETTINGS (billing) ---------- */
  const [billAmt, setBillAmt] = useState("");
  const [billCur, setBillCur] = useState("NGN");
  const [saving, setSaving] = useState(false);
  const saveBilling = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "billing", value: { amount: Math.round(Number(billAmt) * 100), currency: billCur } }),
      });
      if (!res.ok) throw new Error();
      toast.success("Billing updated");
    } catch { toast.error("Save failed"); }
    finally { setSaving(false); }
  };

  return (
    <div className="relative min-h-screen bg-[#E8E7E1] text-[#141312]">
      <div className="riso-grain" />
      <header className="sticky top-0 z-40 border-b-[3px] border-[#141312] bg-[#E8E7E1]/95">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-baseline gap-2">
            <span className="fd text-2xl tracking-tight">CVYON</span>
            <span className="fm text-[10px] font-bold uppercase tracking-[0.2em] text-[#141312]/55">admin</span>
          </div>
          <a href="/" className="fm text-[11px] font-bold uppercase tracking-widest text-[#141312]/60 hover:text-[#FF4326]">← live site</a>
        </div>
        <nav className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-5 pb-3 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={cn("flex shrink-0 items-center gap-2 border-2 px-4 py-2 fm text-[11px] font-bold uppercase tracking-widest transition-colors",
                tab === t.id ? "border-[#141312] bg-[#141312] text-[#E8E7E1]" : "border-[#141312]/20 bg-white text-[#141312]/60 hover:border-[#141312]")}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 py-10 lg:px-8">
        {/* ================= OVERVIEW ================= */}
        {tab === "overview" && (
          <div className="space-y-10">
            <section>
              <SectionTitle color="#0E8A4B">revenue</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi label="Active subscriptions" value={String(revenue.activeSubs)} sub={`${revenue.totalRecruiters} recruiters total`} accent="#0E8A4B" />
                <Kpi label="Affiliate earnings (30d)" value={aff ? usd(aff.last30.cents) : "…"} sub="estimated from CPC" accent="#0E8A4B" />
                <Kpi label="Projected affiliate MRR" value={aff ? usd(aff.projectedMonthly.cents) : "…"} sub="last 7 days × 4.3" accent="#0E8A4B" />
                <Kpi label="Affiliate clicks (all)" value={aff ? String(aff.totals.clicks) : "…"} sub={aff ? `${usd(aff.totals.cents)} lifetime est.` : ""} />
              </div>
              <p className="fm mt-3 text-[10px] uppercase tracking-widest text-[#141312]/45">
                recruiter MRR needs plan amounts on subscriptions — add `amount`/`currency` per subscription to compute it precisely.
              </p>
            </section>

            <section>
              <SectionTitle>growth funnel</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Kpi label="Unique sessions" value={growth.sessions.toLocaleString()} />
                <Kpi label="Started" value={growth.started.toLocaleString()} />
                <Kpi label="Downloaded" value={growth.downloaded.toLocaleString()} />
                <Kpi label="Opted in" value={growth.optIns.toLocaleString()} accent="#2233FF" />
                <Kpi label="Opt‑in rate" value={`${growth.conv}%`} sub="opt‑ins ÷ sessions" accent="#FF4326" />
              </div>
            </section>

            <section>
              <SectionTitle color="#FF4326">talent pool health</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi label="Pool size" value={supply.total.toLocaleString()} />
                <Kpi label="Recruiter‑share consent" value={supply.recruiterShare.toLocaleString()} sub="visible to recruiters" accent="#2233FF" />
                <Kpi label="Fresh (<90d)" value={supply.fresh.toLocaleString()} />
                <Kpi label="Avg completeness" value={`${supply.avgComp}%`} accent="#0E8A4B" />
              </div>
            </section>

            <section>
              <SectionTitle color="#141312">machine</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-3">
                <Kpi label="AI requests" value={machine.requests.toLocaleString()} />
                <Kpi label="AI cost (est.)" value={`$${machine.cost.toFixed(2)}`} accent="#FF4326" />
                <Kpi label="Cache hit rate" value={`${machine.hitRate}%`} sub="JD‑level cache not yet built → ~0%" />
              </div>
            </section>
          </div>
        )}

        {/* ================= ANALYTICS ================= */}
        {tab === "analytics" && (
          <div className="space-y-10">
            <section>
              <SectionTitle>daily visits — last 14 days</SectionTitle>
              <Card>
                <div className="flex items-end gap-1.5" style={{ height: 160 }}>
                  {an.daily.map(([d, v]) => (
                    <div key={d} className="group flex flex-1 flex-col items-center justify-end gap-1">
                      <span className="fm text-[9px] font-bold opacity-0 group-hover:opacity-100">{v}</span>
                      <div className="w-full border-2 border-[#141312] bg-[#2233FF]" style={{ height: `${Math.max(2, (v / maxDaily) * 130)}px` }} />
                      <span className="fm text-[8px] text-[#141312]/40">{d.slice(5)}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
            <div className="grid gap-8 lg:grid-cols-2">
              <section>
                <SectionTitle>top countries</SectionTitle>
                <Card className="space-y-3">{an.countries.map(([k, v]) => <Bar key={k} label={k} value={v} max={an.countries[0]?.[1] || 1} />)}</Card>
              </section>
              <section>
                <SectionTitle>devices</SectionTitle>
                <Card className="space-y-3">{an.devices.map(([k, v]) => <Bar key={k} label={k} value={v} max={an.devices[0]?.[1] || 1} color="#FF4326" />)}</Card>
              </section>
              <section>
                <SectionTitle>browsers</SectionTitle>
                <Card className="space-y-3">{an.browsers.map(([k, v]) => <Bar key={k} label={k} value={v} max={an.browsers[0]?.[1] || 1} color="#0E8A4B" />)}</Card>
              </section>
              <section>
                <SectionTitle>templates used</SectionTitle>
                <Card className="space-y-3">{an.templates.map(([k, v]) => <Bar key={k} label={k} value={v} max={an.templates[0]?.[1] || 1} color="#141312" />)}</Card>
              </section>
            </div>
          </div>
        )}

        {/* ================= TALENT POOL ================= */}
        {tab === "talent" && (
          <div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <SectionTitle color="#FF4326">talent pool</SectionTitle>
                <p className="fm text-[11px] uppercase tracking-widest text-[#141312]/50">{filtered.length} of {candidates.length} candidates</p>
              </div>
              <div className="flex gap-2">
                <button onClick={exportCSV} className="riso-btn !px-4 !py-2.5 !text-xs"><Download size={14} /> CSV</button>
                <button onClick={exportJSON} className="riso-btn riso-btn-ghost !px-4 !py-2.5 !text-xs"><Download size={14} /> JSON</button>
              </div>
            </div>
            <div className="riso-card mt-6 flex flex-col gap-3 p-4 sm:flex-row">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#141312]/40" />
                <input value={tpQ} onChange={e => setTpQ(e.target.value)} placeholder="Search name or title" className="riso-input !pl-9" />
              </div>
              <select value={tpCountry} onChange={e => setTpCountry(e.target.value)} className="riso-input sm:w-56">
                <option value="">All countries</option>
                {tpCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="riso-card mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b-[3px] border-[#141312] fm text-[10px] uppercase tracking-widest text-[#141312]/55">
                  <tr>{["Name", "Title", "Country", "Exp", "Score", "Consent", "Opted in"].map(h => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filtered.slice(0, 100).map(c => (
                    <tr key={c.id} className="border-b border-[#141312]/10 hover:bg-[#141312]/[0.03]">
                      <td className="px-4 py-3 font-semibold">{c.full_name || "—"}</td>
                      <td className="px-4 py-3">{c.current_title || "—"}</td>
                      <td className="px-4 py-3">{c.country || "—"}</td>
                      <td className="px-4 py-3">{c.experience_years ?? "—"}</td>
                      <td className="px-4 py-3">{c.completeness_score ?? 0}%</td>
                      <td className="px-4 py-3">{c.consent_recruiter_share ? <span className="text-[#0E8A4B] font-bold">yes</span> : <span className="text-[#141312]/40">no</span>}</td>
                      <td className="px-4 py-3 fm text-[11px]">{c.created_at?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= RECRUITERS ================= */}
        {tab === "recruiters" && (
          <div>
            <SectionTitle color="#0E8A4B">recruiters</SectionTitle>
            <div className="riso-card overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b-[3px] border-[#141312] fm text-[10px] uppercase tracking-widest text-[#141312]/55">
                  <tr>{["Company", "Email", "Status", "Joined"].map(h => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {recruiters.map(r => {
                    const active = (r.subscriptions || []).some((s: any) => s.status === "active");
                    return (
                      <tr key={r.id} className="border-b border-[#141312]/10 hover:bg-[#141312]/[0.03]">
                        <td className="px-4 py-3 font-semibold">{r.company_name || "—"}</td>
                        <td className="px-4 py-3">{r.contact_email || r.email || "—"}</td>
                        <td className="px-4 py-3">{active ? <span className="border-2 border-[#0E8A4B] px-2 py-0.5 fm text-[10px] font-bold text-[#0E8A4B]">ACTIVE</span> : <span className="fm text-[10px] font-bold text-[#141312]/40">inactive</span>}</td>
                        <td className="px-4 py-3 fm text-[11px]">{r.created_at?.slice(0, 10)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= AFFILIATES ================= */}
        {tab === "affiliates" && (
          <div className="space-y-10">
            {!aff ? (
              <p className="fm text-[11px] uppercase tracking-widest text-[#141312]/50">loading affiliate data…</p>
            ) : (
              <>
                <section>
                  <SectionTitle color="#0E8A4B">affiliate revenue (estimated)</SectionTitle>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Kpi label="Clicks (all time)" value={aff.totals.clicks.toLocaleString()} />
                    <Kpi label="Earnings (30d)" value={usd(aff.last30.cents)} accent="#0E8A4B" />
                    <Kpi label="Earnings (7d)" value={usd(aff.last7.cents)} />
                    <Kpi label="Projected monthly" value={usd(aff.projectedMonthly.cents)} sub="7‑day run rate × 4.3" accent="#FF4326" />
                  </div>
                  <p className="fm mt-3 text-[10px] uppercase tracking-widest text-[#141312]/45">
                    estimates use geo‑CPC table — reconcile against CareerJet publisher reports for actuals.
                  </p>
                </section>

                <div className="grid gap-8 lg:grid-cols-2">
                  <section>
                    <SectionTitle>earnings by country</SectionTitle>
                    <Card className="space-y-3">
                      {aff.byCountry.slice(0, 10).map((c: any) => (
                        <div key={c.country}>
                          <div className="mb-1 flex justify-between fm text-[11px] font-bold uppercase tracking-wider">
                            <span>{c.country}</span><span>{usd(c.cents)} · {c.clicks} clicks</span>
                          </div>
                          <div className="h-3 w-full border-2 border-[#141312] bg-white">
                            <div className="h-full bg-[#0E8A4B]" style={{ width: `${(c.cents / (aff.byCountry[0]?.cents || 1)) * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </Card>
                  </section>
                  <section>
                    <SectionTitle>top jobs clicked</SectionTitle>
                    <Card className="space-y-3">
                      {aff.topJobs.map((j: any, i: number) => (
                        <div key={i} className="flex items-center justify-between border-b-2 border-[#141312]/10 pb-2 last:border-0">
                          <div className="min-w-0"><div className="truncate fh text-sm font-bold">{j.title}</div><div className="fm text-[10px] uppercase tracking-wider text-[#141312]/50">{j.company} · {j.country}</div></div>
                          <div className="shrink-0 text-right fm text-[11px] font-bold">{j.clicks} clicks<div className="text-[#0E8A4B]">{usd(j.cents)}</div></div>
                        </div>
                      ))}
                    </Card>
                  </section>
                </div>

                <section>
                  <SectionTitle>recent clicks</SectionTitle>
                  <Card className="overflow-x-auto p-0">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b-[3px] border-[#141312] fm text-[10px] uppercase tracking-widest text-[#141312]/55">
                        <tr>{["Job", "Company", "Country", "CPC", "When"].map(h => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {aff.recent.map((c: any) => (
                          <tr key={c.id} className="border-b border-[#141312]/10">
                            <td className="max-w-[220px] truncate px-4 py-3 font-semibold">{c.job_title || "—"}</td>
                            <td className="px-4 py-3">{c.company || "—"}</td>
                            <td className="px-4 py-3">{c.country}</td>
                            <td className="px-4 py-3 text-[#0E8A4B] font-bold">{usd(c.cpc_minor)}</td>
                            <td className="px-4 py-3 fm text-[11px]">{new Date(c.created_at).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                </section>
              </>
            )}
          </div>
        )}

        {/* ================= SETTINGS ================= */}
        {tab === "settings" && (
          <div className="max-w-xl">
            <SectionTitle>billing (recruiter subscription)</SectionTitle>
            <Card className="space-y-4">
              <p className="text-sm text-[#141312]/60">This is the amount Paystack charges recruiters. It also drives the price shown on the recruiter portal, so they always match.</p>
              <div>
                <label className="riso-label">Amount (major units — e.g. 9900 for ₦9,900)</label>
                <input value={billAmt} onChange={e => setBillAmt(e.target.value)} placeholder="9900" className="riso-input mt-2" />
              </div>
              <div>
                <label className="riso-label">Currency</label>
                <select value={billCur} onChange={e => setBillCur(e.target.value)} className="riso-input mt-2">
                  {["NGN", "USD", "GBP", "EUR", "KES", "ZAR", "GHS"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={saveBilling} disabled={saving} className="riso-btn">{saving ? "Saving…" : "Save billing"}</button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}