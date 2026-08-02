"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Users, DollarSign, TrendingUp, Briefcase, Headphones, FileText, Settings as Cog,
  BarChart3, LayoutDashboard, Plus, Search, Mail, Globe, Building2, ArrowRight, ArrowLeft,
  Inbox, CheckCircle2, Clock, AlertTriangle, Download, Trash2, Edit3, Link2, Wallet, Target,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAdminTheme } from "./admin/theme";
import {
  cn, Card, Kpi, Bar, SectionLabel, Pill, Btn, Field, Input, TextArea, Select, Switch,
  Modal, Drawer, Table, Row, Cell, EmptyState, Spinner, Reveal, CountUp,
} from "./admin/ui";

const api = (u: string, o?: RequestInit) => fetch(u, { ...o, headers: { "Content-Type": "application/json", ...(o?.headers || {}) } }).then((r) => r.json().then((j) => ({ ok: r.ok, status: r.status, ...j })));
const usd = (n: number) => `$${(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ============================ OVERVIEW ============================ */
export function OverviewTab({ candidates, analytics, aiLogs }: { candidates: any[]; analytics: any[]; aiLogs: any[] }) {
  const { t } = useAdminTheme();
  const [o, setO] = useState<any>(null);
  const load = () => api("/api/admin/overview").then(setO);
  useEffect(() => { load(); }, []);

  const funnel = useMemo(() => {
    const started = analytics.filter((a) => a.event_type === "milestone_started").length;
    const downloaded = analytics.filter((a) => a.event_type === "milestone_downloaded").length;
    const sessions = new Set(analytics.map((a) => a.session_id)).size;
    return { sessions, started, downloaded, optIns: candidates.length };
  }, [analytics, candidates]);

  return (
    <div className="space-y-8">
      <Reveal><SectionLabel color={t.pass}>business pulse · this month</SectionLabel></Reveal>
      {!o ? <Spinner /> : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Reveal><Kpi label="MRR (subs)" value={<CountUp to={o.blendedMonthly - o.affiliateRun} prefix="$" decimals={0} />} sub={`${o.recruitersActive} active seats`} accent={t.pass} icon={<DollarSign size={16} />} /></Reveal>
          <Reveal delay={60}><Kpi label="Affiliate (run-rate)" value={<CountUp to={o.affiliateRun} prefix="$" decimals={0} />} sub={`${o.affiliateThisMonth} actual MTD`} accent={t.gold} icon={<TrendingUp size={16} />} /></Reveal>
          <Reveal delay={120}><Kpi label="Spend MTD" value={<CountUp to={o.expensesThisMonth} prefix="$" decimals={0} />} sub={`AI ${usd(o.aiCostThisMonth)}`} accent={t.fail} icon={<Wallet size={16} />} /></Reveal>
          <Reveal delay={180}><Kpi label="Open pipeline" value={<CountUp to={o.pipelineOpen} />} sub="deals in flight" accent={t.cob} icon={<Target size={16} />} /></Reveal>
        </div>
      )}

      <Reveal delay={120}>
        <SectionLabel>growth funnel</SectionLabel>
        <Card className="grid grid-cols-2 gap-6 p-6 lg:grid-cols-4">
          {[["Sessions", funnel.sessions, t.cob], ["Started", funnel.started, t.sage], ["Downloaded", funnel.downloaded, t.gold], ["Opted in", funnel.optIns, t.verm]].map(([l, v, c], i, arr) => (
            <div key={l as string} className="relative">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: t.muted }}>{l}</div>
              <div className="fd mt-1 text-3xl" style={{ color: c as string }}><CountUp to={v as number} /></div>
              {i < arr.length - 1 && <ArrowRight size={14} className="absolute -right-3 top-4 hidden lg:block" style={{ color: t.faint }} />}
            </div>
          ))}
        </Card>
      </Reveal>

      {o && (
        <Reveal delay={160}>
          <SectionLabel color={t.gold}>operating summary</SectionLabel>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6"><div className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: t.muted }}>Talent pool</div>
              <div className="mt-3 space-y-3"><Bar label="Total candidates" value={o.candidates} max={Math.max(1, o.candidates)} color={t.cob} /><Bar label="Recruiter-consented" value={o.consented} max={Math.max(1, o.candidates)} color={t.pass} /></div></Card>
            <Card className="p-6"><div className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: t.muted }}>Pipeline by stage</div>
              <div className="mt-3 space-y-3">{Object.entries(o.pipelineStages || {}).map(([k, v]) => <Bar key={k} label={k} value={v as number} max={Math.max(1, ...Object.values(o.pipelineStages || {}) as number[])} color={t.gold} />)}{!Object.keys(o.pipelineStages || {}).length && <p className="text-sm" style={{ color: t.faint }}>No deals yet.</p>}</div></Card>
            <Card className="p-6"><div className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: t.muted }}>Attention</div>
              <div className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><span style={{ color: t.muted }}>Recruiters (active / total)</span><b style={{ color: t.text }}>{o.recruitersActive} / {o.recruitersTotal}</b></div><div className="flex justify-between"><span style={{ color: t.muted }}>Open support tickets</span><b style={{ color: o.openTickets ? t.fail : t.text }}>{o.openTickets}</b></div></div></Card>
          </div>
        </Reveal>
      )}
    </div>
  );
}

/* ============================ ANALYTICS ============================ */
export function AnalyticsTab({ analytics }: { analytics: any[] }) {
  const { t } = useAdminTheme();
  const data = useMemo(() => {
    const days: Record<string, number> = {}; for (let i = 13; i >= 0; i--) days[new Date(Date.now() - i * 864e5).toISOString().slice(0, 10)] = 0;
    analytics.forEach((a) => { const d = (a.created_at || "").slice(0, 10); if (d in days) days[d]++; });
    const grp = (k: string) => analytics.reduce((m: Record<string, number>, x) => { const v = x[k] || "Unknown"; m[v] = (m[v] || 0) + 1; return m; }, {});
    const top = (o: Record<string, number>) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 7);
    return { daily: Object.entries(days), countries: top(grp("country")), devices: top(grp("device_type")), templates: top(grp("template_id")) };
  }, [analytics]);
  const maxD = Math.max(1, ...data.daily.map(([, v]) => v));
  return (
    <div className="space-y-8">
      <Reveal><SectionLabel>daily visits · 14 days</SectionLabel>
        <Card className="p-6"><div className="flex h-40 items-end gap-1.5">{data.daily.map(([d, v]) => (
          <div key={d} className="group flex flex-1 flex-col items-center justify-end gap-1">
            <span className="font-mono text-[9px] opacity-0 group-hover:opacity-100" style={{ color: t.muted }}>{v}</span>
            <div className="w-full rounded-sm transition-all" style={{ height: `${Math.max(3, (v / maxD) * 130)}px`, background: t.cob }} />
            <span className="font-mono text-[8px]" style={{ color: t.faint }}>{d.slice(5)}</span>
          </div>))}</div></Card></Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal><Card className="p-6"><SectionLabel>top countries</SectionLabel><div className="space-y-3">{data.countries.map(([k, v]) => <Bar key={k} label={k} value={v} max={data.countries[0]?.[1] || 1} color={t.cob} />)}</div></Card></Reveal>
        <Reveal delay={80}><Card className="p-6"><SectionLabel color={t.verm}>devices</SectionLabel><div className="space-y-3">{data.devices.map(([k, v]) => <Bar key={k} label={k} value={v} max={data.devices[0]?.[1] || 1} color={t.verm} />)}</div></Card></Reveal>
        <Reveal delay={120}><Card className="p-6"><SectionLabel color={t.sage}>templates used</SectionLabel><div className="space-y-3">{data.templates.map(([k, v]) => <Bar key={k} label={k} value={v} max={data.templates[0]?.[1] || 1} color={t.sage} />)}</div></Card></Reveal>
      </div>
    </div>
  );
}

/* ============================ TALENT POOL ============================ */
export function TalentTab({ candidates }: { candidates: any[] }) {
  const { t } = useAdminTheme();
  const [q, setQ] = useState(""); const [country, setCountry] = useState("");
  const countries = useMemo(() => Array.from(new Set(candidates.map((c) => c.country).filter(Boolean))).sort() as string[], [candidates]);
  const filtered = useMemo(() => candidates.filter((c) => (!country || c.country === country) && (!q || `${c.full_name} ${c.current_title}`.toLowerCase().includes(q.toLowerCase()))), [candidates, q, country]);
  const exportCSV = () => {
    const rows = [["Name", "Title", "Country", "Exp", "Score", "Consent", "Opted"], ...filtered.map((c) => [c.full_name, c.current_title, c.country, c.experience_years, c.completeness_score, c.consent_recruiter_share ? "yes" : "no", (c.created_at || "").slice(0, 10)])];
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([rows.map((r) => r.map((v) => `"${(v ?? "").toString().replace(/"/g, '""')}"`).join(",")).join("\n")], { type: "text/csv" })); a.download = "talent_pool.csv"; a.click();
  };
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <Reveal><SectionLabel color={t.verm}>talent pool</SectionLabel><p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: t.muted }}>{filtered.length} of {candidates.length}</p></Reveal>
        <Btn variant="ghost" onClick={exportCSV}><Download size={14} /> Export CSV</Btn>
      </div>
      <Card className="flex flex-col gap-3 p-4 sm:flex-row">
        <div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: t.faint }} /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or title" className="!pl-9" /></div>
        <Select value={country} onChange={(e) => setCountry(e.target.value)} className="sm:w-52"><option value="">All countries</option>{countries.map((c) => <option key={c} value={c}>{c}</option>)}</Select>
      </Card>
      {filtered.length === 0 ? <Card><EmptyState icon={<Users size={32} />} title="No candidates match." /></Card> :
        <Table head={["Name", "Title", "Country", "Exp", "Score", "Consent", "Opted in"]}>{filtered.slice(0, 200).map((c) => (
          <Row key={c.id}><Cell className="font-semibold">{c.full_name || "—"}</Cell><Cell>{c.current_title || "—"}</Cell><Cell>{c.country || "—"}</Cell><Cell>{c.experience_years ?? "—"}</Cell><Cell>{c.completeness_score ?? 0}%</Cell>
            <Cell>{c.consent_recruiter_share ? <Pill color={t.pass}>yes</Pill> : <Pill>no</Pill>}</Cell><Cell><span className="font-mono text-[11px]" style={{ color: t.faint }}>{(c.created_at || "").slice(0, 10)}</span></Cell></Row>))}</Table>}
    </div>
  );
}

/* ============================ RECRUITERS (onboard + detail) ============================ */
const emptyRec = { email: "", company_name: "", contact_name: "", contact_email: "", phone: "", website: "", location: "", country: "", company_size: "", industry: "", notes: "", grant: false, days: 30, tier: "pro" };
export function RecruitersTab() {
  const { t } = useAdminTheme();
  const [recs, setRecs] = useState<any[]>([]); const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(""); const [onboard, setOnboard] = useState(false); const [form, setForm] = useState<any>(emptyRec);
  const [detail, setDetail] = useState<any>(null); const [edit, setEdit] = useState<any>(null); const [creds, setCreds] = useState<any>(null);
  const load = () => { setLoading(true); api("/api/admin/recruiters").then((j) => { setRecs(j.recruiters || []); setLoading(false); }); };
  useEffect(() => { load(); }, []);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));
  const submit = async () => {
    const r = await api("/api/admin/recruiters", { method: "POST", body: JSON.stringify({ ...form, grant_subscription: form.grant ? { tier: form.tier, days: Number(form.days), amount_minor: form.tier === "pro" ? 9900 : 4900, currency: "USD" } : undefined }) });
    if (!r.ok) return toast.error(r.error || "Onboard failed");
    toast.success("Recruiter onboarded"); setCreds({ email: form.email, pw: r.temp_password }); setForm(emptyRec); setOnboard(false); load();
  };
  const saveEdit = async () => { const r = await api(`/api/admin/recruiters/${edit.id}`, { method: "PATCH", body: JSON.stringify(edit) }); if (r.ok) { toast.success("Saved"); setDetail({ ...detail, ...edit }); setEdit(null); load(); } else toast.error(r.error); };
  const filtered = recs.filter((r) => `${r.company_name} ${r.contact_email} ${r.contact_name}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <Reveal><SectionLabel color={t.pass}>recruiters</SectionLabel><p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: t.muted }}>{recs.length} total · {recs.filter((r) => (r.subscriptions || []).some((s: any) => s.status === "active")).length} active</p></Reveal>
        <Btn onClick={() => setOnboard(true)}><Plus size={14} /> Onboard recruiter</Btn>
      </div>
      <Card className="p-4"><div className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: t.faint }} /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search company or contact" className="!pl-9" /></div></Card>
      {loading ? <Spinner /> : filtered.length === 0 ? <Card><EmptyState icon={<Building2 size={32} />} title="No recruiters yet." hint="Onboard your first design partner above." /></Card> :
        <Table head={["Company", "Contact", "Status", "Plan", "API", "Joined", ""]}>{filtered.map((r) => {
          const active = (r.subscriptions || []).some((s: any) => s.status === "active");
          return <Row key={r.id} onClick={() => setDetail(r)}>
            <Cell className="font-semibold">{r.company_name}</Cell>
            <Cell><div>{r.contact_name || "—"}</div><div className="font-mono text-[11px]" style={{ color: t.faint }}>{r.contact_email || r.email || "—"}</div></Cell>
            <Cell><Pill color={r.status === "churned" ? t.fail : active ? t.pass : t.gold}>{r.status === "churned" ? "churned" : active ? "active" : "pending"}</Pill></Cell>
            <Cell>{active ? <Pill color={t.cob}>{(r.subscriptions || []).find((s: any) => s.status === "active")?.tier || "—"}</Pill> : <span style={{ color: t.faint }}>—</span>}</Cell>
            <Cell className="font-mono text-[11px]">{r.api_calls_count || 0}</Cell>
            <Cell className="font-mono text-[11px]" style={{ color: t.faint }}>{(r.created_at || "").slice(0, 10)}</Cell>
            <Cell><button onClick={(e) => { e.stopPropagation(); setEdit({ ...r }); }} className="rounded p-1" style={{ color: t.muted }}><Edit3 size={14} /></button></Cell>
          </Row>; })}</Table>}

      {/* Onboard modal */}
      <Modal open={onboard} onClose={() => { setOnboard(false); setCreds(null); }} title="Onboard recruiter" wide>
        {creds ? (
          <div className="space-y-4">
            <div className="rounded-md border-2 p-4" style={{ borderColor: t.pass }}><CheckCircle2 style={{ color: t.pass }} className="mb-2" size={20} /><p className="fd text-lg" style={{ color: t.text }}>Account created</p>
              <p className="mt-1 text-sm" style={{ color: t.muted }}>Send these credentials to <b>{creds.email}</b> — the password is shown only once.</p></div>
            <Field label="Temporary password"><div className="flex gap-2"><Input readOnly value={creds.pw} /><Btn variant="ghost" onClick={() => { navigator.clipboard.writeText(creds.pw); toast.success("Copied"); }}>Copy</Btn></div></Field>
            <Btn onClick={() => setCreds(null)}>Done</Btn>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Login email *"><Input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="hire@company.com" /></Field>
            <Field label="Company name *"><Input value={form.company_name} onChange={(e) => set("company_name", e.target.value)} /></Field>
            <Field label="Contact name"><Input value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} /></Field>
            <Field label="Contact email"><Input value={form.contact_email} onChange={(e) => set("contact_email", e.target.value)} /></Field>
            <Field label="Phone"><Input value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
            <Field label="Website"><Input value={form.website} onChange={(e) => set("website", e.target.value)} /></Field>
            <Field label="Location"><Input value={form.location} onChange={(e) => set("location", e.target.value)} /></Field>
            <Field label="Country"><Input value={form.country} onChange={(e) => set("country", e.target.value)} /></Field>
            <Field label="Company size"><Select value={form.company_size} onChange={(e) => set("company_size", e.target.value)}><option value="">—</option>{["1-10", "11-50", "51-200", "201-1000", "1000+"].map((s) => <option key={s}>{s}</option>)}</Select></Field>
            <Field label="Industry"><Input value={form.industry} onChange={(e) => set("industry", e.target.value)} /></Field>
            <div className="sm:col-span-2 flex items-center justify-between rounded-md border p-3" style={{ borderColor: t.border }}><span className="text-sm" style={{ color: t.text }}>Grant a trial / comp subscription</span><Switch on={form.grant} onChange={(v) => set("grant", v)} /></div>
            {form.grant && <><Field label="Tier"><Select value={form.tier} onChange={(e) => set("tier", e.target.value)}><option value="pro">pro</option><option value="basic">basic</option></Select></Field><Field label="Days"><Input type="number" value={form.days} onChange={(e) => set("days", e.target.value)} /></Field></>}
            <div className="sm:col-span-2"><Field label="Notes"><TextArea rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)} /></Field></div>
            <div className="sm:col-span-2 flex justify-end gap-2"><Btn variant="ghost" onClick={() => setOnboard(false)}>Cancel</Btn><Btn onClick={submit}>Create account</Btn></div>
          </div>
        )}
      </Modal>

      {/* Detail drawer */}
      <Drawer open={!!detail} onClose={() => setDetail(null)} title={detail?.company_name || "Recruiter"}>
        {detail && !edit && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2"><Pill color={detail.status === "churned" ? t.fail : t.pass}>{detail.status}</Pill>{(detail.subscriptions || []).some((s: any) => s.status === "active") && <Pill color={t.cob}>subscribed</Pill>}{detail.country && <Pill><Globe size={11} /> {detail.country}</Pill>}</div>
            <div className="grid grid-cols-2 gap-4 text-sm">{[["Contact", detail.contact_name], ["Email", detail.contact_email || detail.email], ["Phone", detail.phone], ["Website", detail.website], ["Location", detail.location], ["Size", detail.company_size], ["Industry", detail.industry], ["Onboarded by", detail.onboarded_by]].map(([k, v]) => (
              <div key={k as string}><div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: t.muted }}>{k}</div><div className="mt-0.5 break-words" style={{ color: t.text }}>{(v as string) || "—"}</div></div>))}</div>
            {detail.notes && <div><div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: t.muted }}>Notes</div><p className="mt-1 whitespace-pre-wrap text-sm" style={{ color: t.text }}>{detail.notes}</p></div>}
            <div><div className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: t.muted }}>Subscriptions</div>
              {(detail.subscriptions || []).length === 0 ? <p className="text-sm" style={{ color: t.faint }}>None.</p> : (detail.subscriptions || []).map((s: any) => (
                <div key={s.id} className="mb-2 flex items-center justify-between rounded-md border p-3 text-sm" style={{ borderColor: t.border }}><span style={{ color: t.text }}>{s.tier} · {s.currency} {s.amount_minor ? (s.amount_minor / 100) : "—"}</span><Pill color={s.status === "active" ? t.pass : t.muted}>{s.status}</Pill></div>))}</div>
            <Btn variant="ghost" onClick={() => setEdit({ ...detail })}><Edit3 size={14} /> Edit details</Btn>
          </div>
        )}
        {edit && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Status"><Select value={edit.status || "active"} onChange={(e) => setEdit({ ...edit, status: e.target.value })}><option value="active">active</option><option value="pending">pending</option><option value="churned">churned</option></Select></Field>
            <Field label="Contact name"><Input value={edit.contact_name || ""} onChange={(e) => setEdit({ ...edit, contact_name: e.target.value })} /></Field>
            <Field label="Contact email"><Input value={edit.contact_email || ""} onChange={(e) => setEdit({ ...edit, contact_email: e.target.value })} /></Field>
            <Field label="Phone"><Input value={edit.phone || ""} onChange={(e) => setEdit({ ...edit, phone: e.target.value })} /></Field>
            <Field label="Website"><Input value={edit.website || ""} onChange={(e) => setEdit({ ...edit, website: e.target.value })} /></Field>
            <Field label="Location"><Input value={edit.location || ""} onChange={(e) => setEdit({ ...edit, location: e.target.value })} /></Field>
            <Field label="Company size"><Input value={edit.company_size || ""} onChange={(e) => setEdit({ ...edit, company_size: e.target.value })} /></Field>
            <Field label="Industry"><Input value={edit.industry || ""} onChange={(e) => setEdit({ ...edit, industry: e.target.value })} /></Field>
            <div className="sm:col-span-2"><Field label="Notes"><TextArea rows={3} value={edit.notes || ""} onChange={(e) => setEdit({ ...edit, notes: e.target.value })} /></Field></div>
            <div className="sm:col-span-2 flex justify-end gap-2"><Btn variant="ghost" onClick={() => setEdit(null)}>Cancel</Btn><Btn onClick={saveEdit}>Save</Btn></div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

/* ============================ REVENUE ============================ */
export function RevenueTab() {
  const { t } = useAdminTheme(); const [r, setR] = useState<any>(null);
  useEffect(() => { api("/api/admin/revenue").then(setR); }, []);
  if (!r) return <Spinner />;
  return (
    <div className="space-y-8">
      <Reveal><SectionLabel color={t.pass}>revenue · reconciled</SectionLabel></Reveal>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Reveal><Kpi label="MRR" value={<CountUp to={r.mrr} prefix="$" decimals={0} />} sub="recurring subscriptions" accent={t.pass} icon={<DollarSign size={16} />} /></Reveal>
        <Reveal delay={60}><Kpi label="ARR" value={<CountUp to={r.arr} prefix="$" decimals={0} />} sub="MRR × 12" accent={t.sage} icon={<TrendingUp size={16} />} /></Reveal>
        <Reveal delay={120}><Kpi label="Affiliate run-rate" value={<CountUp to={r.affiliateRun} prefix="$" decimals={0} />} sub={`${usd(r.affiliateMonth)} MTD · non-recurring`} accent={t.gold} icon={<Link2 size={16} />} /></Reveal>
        <Reveal delay={180}><Kpi label="Blended monthly" value={<CountUp to={r.blendedMonthly} prefix="$" decimals={0} />} sub={`net MTD ${usd(r.netMonth)}`} accent={t.cob} icon={<Wallet size={16} />} /></Reveal>
      </div>
      <Reveal delay={120}><Card className="p-4" style={{ borderColor: t.gold }}><p className="text-sm" style={{ color: t.muted }}><b style={{ color: t.gold }}>Reconciliation note:</b> {r.fxNote} Affiliate income is a CPC/CPA run-rate, not recurring — it's shown alongside MRR, never folded into it.</p></Card></Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal><Card className="p-6"><SectionLabel>active subscriptions</SectionLabel>{r.subBreakdown.length === 0 ? <p className="text-sm" style={{ color: t.faint }}>No active seats.</p> : <div className="space-y-2">{r.subBreakdown.map((s: any, i: number) => (
          <div key={i} className="flex items-center justify-between border-b py-2 text-sm" style={{ borderColor: t.border }}><span style={{ color: t.text }}>{s.company} <Pill>{s.tier}</Pill></span><b style={{ color: t.pass }}>{usd(s.usd)}</b></div>))}</div>}</Card></Reveal>
        <Reveal delay={80}><Card className="p-6"><SectionLabel color={t.gold}>affiliate by country (MTD)</SectionLabel>{r.affByCountry.length === 0 ? <p className="text-sm" style={{ color: t.faint }}>No clicks yet.</p> : <div className="space-y-3">{r.affByCountry.slice(0, 7).map((c: any) => <Bar key={c.country} label={`${c.country} · ${c.clicks}`} value={Math.round(c.usd * 100)} max={Math.max(1, Math.round(r.affByCountry[0].usd * 100))} color={t.gold} />)}</div>}</Card></Reveal>
      </div>
      <Reveal delay={120}><Card className="p-6"><SectionLabel>revenue ledger</SectionLabel>{r.ledger.length === 0 ? <p className="text-sm" style={{ color: t.faint }}>No ledger entries.</p> :
        <Table head={["Source", "Ref", "Amount", "Status", "When"]}>{r.ledger.map((l: any) => <Row key={l.id}><Cell><Pill>{l.source}</Pill></Cell><Cell className="font-mono text-[11px]">{(l.ref || "—").slice(0, 18)}</Cell><Cell style={{ color: t.pass }}>{l.currency} {l.amount_minor / 100}</Cell><Cell><Pill color={l.status === "settled" ? t.pass : t.gold}>{l.status}</Pill></Cell><Cell className="font-mono text-[11px]" style={{ color: t.faint }}>{(l.created_at || "").slice(0, 10)}</Cell></Row>)}</Table>}</Card></Reveal>
    </div>
  );
}

/* ============================ EXPENSES ============================ */
const CATS = ["servers", "ai_credits", "email", "ads", "hires", "services", "tooling", "other"];
const emptyExp = { category: "servers", vendor: "", description: "", amount_minor: 0, currency: "USD", spent_on: new Date().toISOString().slice(0, 10), recurring: false, period: "one_off" };
export function ExpensesTab() {
  const { t } = useAdminTheme(); const [rows, setRows] = useState<any[]>([]); const [add, setAdd] = useState(false); const [form, setForm] = useState<any>(emptyExp);
  const load = () => api("/api/admin/expenses").then((j) => setRows(j.expenses || []));
  useEffect(() => { load(); }, []);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));
  const submit = async () => { const r = await api("/api/admin/expenses", { method: "POST", body: JSON.stringify({ ...form, amount_minor: Math.round(Number(form.amount_minor) * 100) }) }); if (r.ok) { toast.success("Logged"); setAdd(false); setForm(emptyExp); load(); } else toast.error(r.error); };
  const del = async (id: string) => { const r = await api(`/api/admin/expenses/${id}`, { method: "DELETE" }); if (r.ok) { toast.success("Deleted"); load(); } };
  const total = rows.reduce((s, r) => s + (Number(r.amount_minor) || 0) * (Number(r.fx_to_usd) || 1) / 100, 0);
  const byCat = CATS.map((c) => ({ c, v: Math.round(rows.filter((r) => r.category === c).reduce((s, r) => s + (Number(r.amount_minor) || 0) * (Number(r.fx_to_usd) || 1) / 100, 0)) })).filter((x) => x.v > 0);
  const maxCat = Math.max(1, ...byCat.map((x) => x.v));
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <Reveal><SectionLabel color={t.fail}>expenditure</SectionLabel><p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: t.muted }}>all-time {usd(total)}</p></Reveal>
        <Btn onClick={() => setAdd(true)}><Plus size={14} /> Log expense</Btn>
      </div>
      <Reveal><Card className="p-6"><SectionLabel>by category</SectionLabel>{byCat.length === 0 ? <p className="text-sm" style={{ color: t.faint }}>Nothing logged yet.</p> : <div className="space-y-3">{byCat.map((x) => <Bar key={x.c} label={x.c} value={x.v} max={maxCat} color={t.fail} />)}</div>}</Card></Reveal>
      {rows.length === 0 ? <Card><EmptyState icon={<Wallet size={32} />} title="No expenses logged." hint="Track servers, AI credits, email, ads, hires, services." /></Card> :
        <Table head={["Date", "Category", "Vendor / Description", "Recurring", "Amount", ""]}>{rows.map((r) => <Row key={r.id}>
          <Cell className="font-mono text-[11px]" style={{ color: t.faint }}>{r.spent_on}</Cell><Cell><Pill>{r.category}</Pill></Cell>
          <Cell><div className="font-semibold">{r.vendor || "—"}</div><div className="text-xs" style={{ color: t.muted }}>{r.description}</div></Cell>
          <Cell>{r.recurring ? <Pill color={t.gold}>{r.period}</Pill> : <span style={{ color: t.faint }}>one-off</span>}</Cell>
          <Cell style={{ color: t.fail }}>{r.currency} {(Number(r.amount_minor) / 100).toLocaleString()}</Cell>
          <Cell><button onClick={() => del(r.id)} className="rounded p-1" style={{ color: t.fail }}><Trash2 size={14} /></button></Cell></Row>)}</Table>}
      <Modal open={add} onClose={() => setAdd(false)} title="Log expense">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category *"><Select value={form.category} onChange={(e) => set("category", e.target.value)}>{CATS.map((c) => <option key={c}>{c}</option>)}</Select></Field>
          <Field label="Amount *"><Input type="number" step="0.01" value={form.amount_minor} onChange={(e) => set("amount_minor", e.target.value)} /></Field>
          <Field label="Vendor"><Input value={form.vendor} onChange={(e) => set("vendor", e.target.value)} placeholder="Vercel, OpenAI, Brevo…" /></Field>
          <Field label="Currency"><Select value={form.currency} onChange={(e) => set("currency", e.target.value)}>{["USD", "NGN", "GBP", "EUR"].map((c) => <option key={c}>{c}</option>)}</Select></Field>
          <Field label="Date"><Input type="date" value={form.spent_on} onChange={(e) => set("spent_on", e.target.value)} /></Field>
          <Field label="Period"><Select value={form.period} onChange={(e) => set("period", e.target.value)}>{["one_off", "monthly", "quarterly", "yearly"].map((c) => <option key={c}>{c}</option>)}</Select></Field>
          <div className="sm:col-span-2 flex items-center justify-between rounded-md border p-3" style={{ borderColor: t.border }}><span className="text-sm" style={{ color: t.text }}>Recurring</span><Switch on={form.recurring} onChange={(v) => set("recurring", v)} /></div>
          <div className="sm:col-span-2"><Field label="Description"><TextArea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} /></Field></div>
          <div className="sm:col-span-2 flex justify-end gap-2"><Btn variant="ghost" onClick={() => setAdd(false)}>Cancel</Btn><Btn onClick={submit}>Log</Btn></div>
        </div>
      </Modal>
    </div>
  );
}

/* ============================ PIPELINE (kanban) ============================ */
const STAGES = [["lead", "Lead"], ["contacted", "Contacted"], ["qualified", "Potential client"], ["proposal", "Proposal"], ["customer", "Customer"], ["lost", "Lost"]] as const;
const emptyDeal = { company_name: "", contact_name: "", contact_email: "", source: "outbound", value_minor: 0, currency: "USD", owner: "", notes: "" };
export function PipelineTab({ onConvert }: { onConvert?: (company: string, email: string) => void }) {
  const { t } = useAdminTheme(); const [rows, setRows] = useState<any[]>([]); const [add, setAdd] = useState(false); const [form, setForm] = useState<any>(emptyDeal); const [drag, setDrag] = useState<string | null>(null);
  const load = () => api("/api/admin/pipeline").then((j) => setRows(j.pipeline || []));
  useEffect(() => { load(); }, []);
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));
  const submit = async () => { const r = await api("/api/admin/pipeline", { method: "POST", body: JSON.stringify({ ...form, value_minor: Math.round(Number(form.value_minor) || 0) }) }); if (r.ok) { toast.success("Added"); setAdd(false); setForm(emptyDeal); load(); } else toast.error(r.error); };
  const move = async (id: string, stage: string) => { await api(`/api/admin/pipeline/${id}`, { method: "PATCH", body: JSON.stringify({ stage, last_contact_at: new Date().toISOString() }) }); load(); };
  const colColor = (s: string) => s === "customer" ? t.pass : s === "lost" ? t.fail : s === "proposal" ? t.gold : s === "qualified" ? t.sage : s === "contacted" ? t.cob : t.muted;

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <Reveal><SectionLabel color={t.sage}>sales pipeline</SectionLabel><p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: t.muted }}>{rows.filter((r) => r.stage !== "lost" && r.stage !== "customer").length} open deals</p></Reveal>
        <Btn onClick={() => setAdd(true)}><Plus size={14} /> Add deal</Btn>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {STAGES.map(([key, label]) => { const items = rows.filter((r) => r.stage === key);
          return (
            <div key={key} className="w-72 shrink-0 rounded-lg border p-3" style={{ borderColor: t.border, background: t.bgAlt }}
              onDragOver={(e) => e.preventDefault()} onDrop={() => drag && move(drag, key)}>
              <div className="mb-3 flex items-center justify-between"><span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: colColor(key) }}>{label}</span><Pill>{items.length}</Pill></div>
              <div className="space-y-2">
                {items.map((d) => (
                  <div key={d.id} draggable onDragStart={() => setDrag(d.id)} className="adm-hover cursor-grab rounded-md border p-3 active:cursor-grabbing" style={{ borderColor: t.border, background: t.surface, boxShadow: t.shadow }}>
                    <div className="flex items-start justify-between gap-2"><span className="fd text-sm" style={{ color: t.text }}>{d.company_name}</span>{d.value_minor > 0 && <span className="font-mono text-[10px]" style={{ color: t.gold }}>{d.currency} {d.value_minor / 100}</span>}</div>
                    {d.contact_email && <div className="mt-0.5 truncate font-mono text-[10px]" style={{ color: t.faint }}>{d.contact_email}</div>}
                    <div className="mt-2 flex items-center gap-1">
                      <button onClick={() => { const i = STAGES.findIndex((s) => s[0] === d.stage); if (i > 0) move(d.id, STAGES[i - 1][0]); }} className="rounded p-1" style={{ color: t.muted }}><ArrowLeft size={12} /></button>
                      <button onClick={() => { const i = STAGES.findIndex((s) => s[0] === d.stage); if (i < STAGES.length - 1) move(d.id, STAGES[i + 1][0]); }} className="rounded p-1" style={{ color: t.muted }}><ArrowRight size={12} /></button>
                      {key === "qualified" && onConvert && <button onClick={() => onConvert(d.company_name, d.contact_email)} className="ml-auto rounded px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest" style={{ color: t.pass, border: `1px solid ${t.pass}` }}>Convert</button>}
                    </div>
                  </div>))}
                {items.length === 0 && <div className="rounded-md border border-dashed py-6 text-center font-mono text-[10px] uppercase tracking-widest" style={{ borderColor: t.border, color: t.faint }}>drop here</div>}
              </div>
            </div>); })}
      </div>
      <Modal open={add} onClose={() => setAdd(false)} title="Add deal">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company *"><Input value={form.company_name} onChange={(e) => set("company_name", e.target.value)} /></Field>
          <Field label="Source"><Select value={form.source} onChange={(e) => set("source", e.target.value)}>{["outbound", "inbound", "referral", "event"].map((s) => <option key={s}>{s}</option>)}</Select></Field>
          <Field label="Contact name"><Input value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} /></Field>
          <Field label="Contact email"><Input value={form.contact_email} onChange={(e) => set("contact_email", e.target.value)} /></Field>
          <Field label="Deal value"><Input type="number" value={form.value_minor} onChange={(e) => set("value_minor", e.target.value)} /></Field>
          <Field label="Owner"><Input value={form.owner} onChange={(e) => set("owner", e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="Notes"><TextArea rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)} /></Field></div>
          <div className="sm:col-span-2 flex justify-end gap-2"><Btn variant="ghost" onClick={() => setAdd(false)}>Cancel</Btn><Btn onClick={submit}>Add</Btn></div>
        </div>
      </Modal>
    </div>
  );
}

/* ============================ SUPPORT (two-pane inbox) ============================ */
const PRIO: Record<string, string> = { urgent: "#FF7A6B", high: "#EBC06A", normal: "#9FC0A6", low: "#6f665c" };
export function SupportTab() {
  const { t } = useAdminTheme(); const [rows, setRows] = useState<any[]>([]); const [sel, setSel] = useState<any>(null); const [reply, setReply] = useState(""); const [loading, setLoading] = useState(true);
  const load = () => { setLoading(true); api("/api/admin/support").then((j) => { setRows(j.tickets || []); setLoading(false); }); };
  useEffect(() => { load(); }, []);
  const open = rows.find((r) => r.id === sel?.id) || sel;
  const patch = async (p: any) => { const r = await api(`/api/admin/support/${open.id}`, { method: "PATCH", body: JSON.stringify(p) }); if (r.ok) { setSel({ ...open, ...p }); if (p.admin_reply !== undefined) setReply(""); load(); } else toast.error(r.error); };
  const statusColor = (s: string) => s === "closed" ? t.muted : s === "pending" ? t.gold : t.verm;
  return (
    <div className="space-y-4">
      <Reveal><SectionLabel color={t.verm}>help desk</SectionLabel><p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: t.muted }}>{rows.filter((r) => r.status !== "closed").length} open · {rows.filter((r) => r.priority === "urgent" || r.priority === "high").length} high priority</p></Reveal>
      {loading ? <Spinner /> : rows.length === 0 ? <Card><EmptyState icon={<Inbox size={32} />} title="Inbox zero." hint="Tickets submitted from /support land here." /></Card> :
        <Card className="grid grid-cols-1 overflow-hidden lg:grid-cols-[340px_1fr]" style={{ minHeight: 520 }}>
          {/* list */}
          <div className="max-h-[70vh] overflow-y-auto border-b lg:border-b-0 lg:border-r" style={{ borderColor: t.border }}>
            {rows.map((r) => (
              <button key={r.id} onClick={() => { setSel(r); setReply(r.admin_reply || ""); }} className="flex w-full items-start gap-3 border-b px-4 py-3 text-left transition-colors" style={{ borderColor: t.border, background: open?.id === r.id ? t.surface2 : "transparent" }}>
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: PRIO[r.priority || "normal"] }} />
                <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="truncate text-sm font-semibold" style={{ color: t.text }}>{r.subject || "(no subject)"}</span><Pill color={statusColor(r.status)}>{r.status}</Pill></div>
                  <div className="truncate font-mono text-[11px]" style={{ color: t.faint }}>{r.user_email}</div></div>
              </button>))}
          </div>
          {/* conversation */}
          <div className="flex flex-col">
            {open ? (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill color={statusColor(open.status)}>{open.status}</Pill>
                    <Pill color={PRIO[open.priority || "normal"]}>{open.priority}</Pill>
                    {open.category && <Pill>{open.category}</Pill>}
                    <span className="font-mono text-[11px]" style={{ color: t.faint }}>{open.user_email} · {(open.created_at || "").slice(0, 10)}</span>
                  </div>
                  <div className="rounded-md border p-4" style={{ borderColor: t.border, background: t.bgAlt }}><div className="mb-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: t.muted }}>customer</div><p className="whitespace-pre-wrap text-sm" style={{ color: t.text }}>{open.message}</p></div>
                  {open.admin_reply && <div className="rounded-md border p-4" style={{ borderColor: t.pass, background: t.surface }}><div className="mb-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: t.pass }}>admin reply</div><p className="whitespace-pre-wrap text-sm" style={{ color: t.text }}>{open.admin_reply}</p></div>}
                </div>
                <div className="space-y-3 border-t p-4" style={{ borderColor: t.border }}>
                  <div className="flex flex-wrap gap-2">
                    <Select value={open.status} onChange={(e) => patch({ status: e.target.value })} className="w-auto">{["open", "pending", "closed"].map((s) => <option key={s}>{s}</option>)}</Select>
                    <Select value={open.priority || "normal"} onChange={(e) => patch({ priority: e.target.value })} className="w-auto">{["low", "normal", "high", "urgent"].map((s) => <option key={s}>{s}</option>)}</Select>
                    <Input value={open.assignee || ""} onChange={(e) => patch({ assignee: e.target.value })} placeholder="Assignee" className="w-auto" />
                  </div>
                  <TextArea rows={3} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a reply…" />
                  <div className="flex justify-end gap-2"><Btn variant="ghost" onClick={() => patch({ status: "closed" })}>Close ticket</Btn><Btn disabled={!reply.trim()} onClick={() => patch({ admin_reply: reply, status: open.status === "open" ? "pending" : open.status })}>Send reply</Btn></div>
                </div>
              </>
            ) : <EmptyState icon={<Mail size={32} />} title="Select a ticket" />}
          </div>
        </Card>}
    </div>
  );
}

/* ============================ BLOG ============================ */
export function BlogTab({ posts }: { posts: any[] }) {
  const { t } = useAdminTheme(); const [add, setAdd] = useState(false); const [f, setF] = useState({ title: "", content: "", is_published: false });
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const submit = async () => { const r = await api("/api/admin/blog", { method: "POST", body: JSON.stringify({ ...f, slug: slugify(f.title) }) }); if (r.ok) { toast.success("Saved"); setAdd(false); setF({ title: "", content: "", is_published: false }); window.location.reload(); } else toast.error(r.error || "Save failed"); };
  return (
    <div className="space-y-5">
      <div className="flex justify-between"><Reveal><SectionLabel>blog / SEO</SectionLabel></Reveal><Btn onClick={() => setAdd(true)}><Plus size={14} /> New post</Btn></div>
      {posts.length === 0 ? <Card><EmptyState icon={<FileText size={32} />} title="No posts yet." /></Card> :
        <Table head={["Title", "Slug", "Status", "Date"]}>{posts.map((p) => <Row key={p.id}><Cell className="font-semibold">{p.title}</Cell><Cell className="font-mono text-[11px]" style={{ color: t.f }}>/{p.slug}</Cell><Cell>{p.is_published ? <Pill color={t.pass}>live</Pill> : <Pill>draft</Pill>}</Cell><Cell className="font-mono text-[11px]" style={{ color: t.faint }}>{(p.created_at || "").slice(0, 10)}</Cell></Row>)}</Table>}
      <Modal open={add} onClose={() => setAdd(false)} title="New post" wide>
        <div className="space-y-4"><Field label="Title"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></Field>
          <Field label="Content (HTML)"><TextArea rows={8} value={f.content} onChange={(e) => setF({ ...f, content: e.target.value })} /></Field>
          <div className="flex items-center justify-between rounded-md border p-3" style={{ borderColor: t.border }}><span className="text-sm" style={{ color: t.text }}>Publish now</span><Switch on={f.is_published} onChange={(v) => setF({ ...f, is_published: v })} /></div>
          <div className="flex justify-end gap-2"><Btn variant="ghost" onClick={() => setAdd(false)}>Cancel</Btn><Btn onClick={submit}>Save</Btn></div></div>
      </Modal>
    </div>
  );
}

/* ============================ SETTINGS (control room) ============================ */
export function SettingsTab({ siteSettings, featureFlags, overview }: { siteSettings: any; featureFlags: any[]; overview: any }) {
  const { t } = useAdminTheme();
  const [site, setSite] = useState({ site_name: siteSettings?.site_name || "Cvyon", meta_title: siteSettings?.meta_title || "", meta_description: siteSettings?.meta_description || "", maintenance_mode: !!siteSettings?.maintenance_mode });
  const [billing, setBilling] = useState({ amount: 99, currency: "NGN" });
  const [aiLimit, setAiLimit] = useState(50);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    api("/api/admin/config?read=1").catch(() => {}); // no-op read; values come from props/defaults
    fetch("/api/admin/settings-read").then((r) => r.ok ? r.json() : null).then((j) => {
      if (j?.billing) setBilling({ amount: j.billing.amount / 100, currency: j.billing.currency });
      if (j?.ai_budget_limit) setAiLimit(j.ai_budget_limit);
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);
  const saveSite = async () => { const r = await api("/api/admin/config", { method: "PATCH", body: JSON.stringify({ target: "site_settings", value: site }) }); r.ok ? toast.success("Site settings saved") : toast.error(r.error); };
  const saveBilling = async () => { const r = await api("/api/admin/config", { method: "PATCH", body: JSON.stringify({ target: "app_settings", key: "billing", value: { amount: Math.round(billing.amount * 100), currency: billing.currency } }) }); r.ok ? toast.success("Billing saved") : toast.error(r.error); };
  const saveAi = async () => { const r = await api("/api/admin/config", { method: "PATCH", body: JSON.stringify({ target: "app_settings", key: "ai_budget_limit", value: Number(aiLimit) }) }); r.ok ? toast.success("AI budget saved") : toast.error(r.error); };
  const toggleFlag = async (key: string, v: boolean) => { const r = await api("/api/admin/config", { method: "PATCH", body: JSON.stringify({ target: "feature_flags", key, value: v }) }); if (r.ok) toast.success(`${key} ${v ? "on" : "off"}`); };
  void loaded;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Reveal><Card className="p-6"><SectionLabel color={t.pass}>billing (recruiter subscription)</SectionLabel>
        <p className="mb-4 text-sm" style={{ color: t.muted }}>Drives the Paystack charge and the price shown on the recruiter portal — they can't disagree.</p>
        <div className="grid grid-cols-2 gap-4"><Field label="Amount (major units)"><Input type="number" value={billing.amount} onChange={(e) => setBilling({ ...billing, amount: Number(e.target.value) })} /></Field>
          <Field label="Currency"><Select value={billing.currency} onChange={(e) => setBilling({ ...billing, currency: e.target.value })}>{["NGN", "USD", "GBP", "EUR", "KES", "ZAR", "GHS"].map((c) => <option key={c}>{c}</option>)}</Select></Field></div>
        <div className="mt-4 flex justify-end"><Btn onClick={saveBilling}>Save billing</Btn></div></Card></Reveal>

      <Reveal delay={60}><Card className="p-6"><SectionLabel>site / branding</SectionLabel>
        <div className="space-y-4"><Field label="Site name"><Input value={site.site_name} onChange={(e) => setSite({ ...site, site_name: e.target.value })} /></Field>
          <Field label="Meta title"><Input value={site.meta_title} onChange={(e) => setSite({ ...site, meta_title: e.target.value })} /></Field>
          <Field label="Meta description"><TextArea rows={2} value={site.meta_description} onChange={(e) => setSite({ ...site, meta_description: e.target.value })} /></Field>
          <div className="flex items-center justify-between rounded-md border p-3" style={{ borderColor: t.border }}><span className="text-sm" style={{ color: t.text }}>Maintenance mode</span><Switch on={site.maintenance_mode} onChange={(v) => setSite({ ...site, maintenance_mode: v })} /></div>
          <div className="flex justify-end"><Btn onClick={saveSite}>Save site</Btn></div></div></Card></Reveal>

      <Reveal delay={120}><Card className="p-6"><SectionLabel color={t.fail}>AI budget guard</SectionLabel>
        <p className="mb-4 text-sm" style={{ color: t.muted }}>Spend this month: <b style={{ color: t.fail }}>{usd(overview?.aiCostThisMonth || 0)}</b>. Set a monthly ceiling the breaker enforces.</p>
        <Field label="Monthly limit (USD)"><Input type="number" value={aiLimit} onChange={(e) => setAiLimit(Number(e.target.value))} /></Field>
        <div className="mt-4 flex justify-end"><Btn onClick={saveAi}>Save limit</Btn></div></Card></Reveal>

      <Reveal delay={180}><Card className="p-6"><SectionLabel color={t.cob}>feature flags</SectionLabel>
        <div className="space-y-3">{(featureFlags || []).map((f: any) => (
          <div key={f.key} className="flex items-center justify-between rounded-md border p-3" style={{ borderColor: t.border }}><div><div className="text-sm font-semibold" style={{ color: t.text }}>{f.key}</div><div className="text-xs" style={{ color: t.muted }}>{f.description}</div></div><Switch on={!!f.is_enabled} onChange={(v) => toggleFlag(f.key, v)} /></div>))}
          {(!featureFlags || featureFlags.length === 0) && <p className="text-sm" style={{ color: t.faint }}>No flags.</p>}</div></Card></Reveal>

      <Reveal delay={120} className="lg:col-span-2"><Card className="p-6" style={{ borderColor: t.gold }}><SectionLabel color={t.gold}>email / SMTP</SectionLabel>
        <p className="text-sm" style={{ color: t.muted }}>Auth + transactional email send as <b style={{ color: t.text }}>Cvyon</b> via Brevo. Host <code>smtp-relay.brevo.com</code> · port <code>587</code> · sender <code>auth@cvyon.com</code> (must be a verified sender in Brevo). Configure in Supabase → Authentication → SMTP.</p></Card></Reveal>
    </div>
  );
}