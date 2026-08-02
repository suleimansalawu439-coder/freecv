"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, BarChart3, Users, Building2, DollarSign, Target, Wallet,
  Headphones, FileText, Settings as Cog, LogOut,
} from "lucide-react";
import { AdminThemeProvider, useAdminTheme, ThemeToggle } from "./admin/theme";
import { AdminMotion } from "./admin/ui";
import {
  OverviewTab, AnalyticsTab, TalentTab, RecruitersTab, RevenueTab,
  ExpensesTab, PipelineTab, SupportTab, BlogTab, SettingsTab,
} from "./tabs";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "talent", label: "Talent Pool", icon: Users },
  { id: "recruiters", label: "Recruiters", icon: Building2 },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "pipeline", label: "Pipeline", icon: Target },
  { id: "expenses", label: "Expenses", icon: Wallet },
  { id: "support", label: "Support", icon: Headphones },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "settings", label: "Settings", icon: Cog },
] as const;

type Props = { candidates: any[]; analytics: any[]; aiLogs: any[]; siteSettings: any; featureFlags: any[]; recruiters?: any[]; blogPosts?: any[]; tickets?: any[]; affiliates?: any[] };

function Shell(props: Props) {
  const { t } = useAdminTheme(); const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("overview");
  const [email, setEmail] = useState("");
  const [overview, setOverview] = useState<any>(null);
  React.useEffect(() => { supabase.auth.getUser().then((u) => setEmail(u.data.user?.email || "")); fetch("/api/admin/overview").then((r) => r.json()).then(setOverview).catch(() => {}); }, []);

  const logout = async () => { await supabase.auth.signOut().catch(() => {}); router.push("/admin/login"); router.refresh(); };

  // Pipeline "Convert" hands off to recruiter onboarding (open recruiters tab + prefill would need lifting state;
  // simplest correct behaviour: jump to recruiters tab where the onboard modal lives).
  const onConvert = () => setTab("recruiters");

  const render = () => {
    switch (tab) {
      case "overview": return <OverviewTab candidates={props.candidates} analytics={props.analytics} aiLogs={props.aiLogs} />;
      case "analytics": return <AnalyticsTab analytics={props.analytics} />;
      case "talent": return <TalentTab candidates={props.candidates} />;
      case "recruiters": return <RecruitersTab />;
      case "revenue": return <RevenueTab />;
      case "pipeline": return <PipelineTab onConvert={onConvert} />;
      case "expenses": return <ExpensesTab />;
      case "support": return <SupportTab />;
      case "blog": return <BlogTab posts={props.blogPosts || []} />;
      case "settings": return <SettingsTab siteSettings={props.siteSettings} featureFlags={props.featureFlags} overview={overview} />;
    }
  };

  return (
    <div className="relative min-h-screen transition-colors duration-300" style={{ background: t.bg, color: t.text, fontFamily: "var(--fb, system-ui)" }}>
      <AdminMotion />
      {/* layered ambient background: faint grid + grain */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: `linear-gradient(${t.grid} 1px,transparent 1px),linear-gradient(90deg,${t.grid} 1px,transparent 1px)`, backgroundSize: "32px 32px" }} />
      <div className="riso-grain" />
      {/* top sheen */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 h-px" style={{ background: `linear-gradient(90deg,transparent,${t.verm},transparent)` }} />

      <header className="sticky top-0 z-40 border-b-2 backdrop-blur" style={{ borderColor: t.border, background: `${t.bg}dd` }}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <div className="flex items-baseline gap-2"><span className="fd text-xl tracking-tight">CVYON</span><span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: t.muted }}>admin</span></div>
          <div className="flex items-center gap-3">
            {email && <span className="hidden font-mono text-[11px] sm:inline" style={{ color: t.muted }}>{email}</span>}
            <ThemeToggle />
            <button onClick={logout} aria-label="Log out" className="grid h-9 w-9 place-items-center rounded-md border" style={{ borderColor: t.border, color: t.muted }}><LogOut size={15} /></button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-5 pb-3 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)}
              className="flex shrink-0 items-center gap-2 rounded-md border-2 px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors"
              style={tab === tb.id ? { borderColor: t.borderStrong, background: t.surface, color: t.text } : { borderColor: "transparent", color: t.muted }}>
              <tb.icon size={14} /> {tb.label}
            </button>))}
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-[1400px] px-5 py-8 lg:px-8">
        <div key={tab}>{render()}</div>
      </main>
    </div>
  );
}

export default function AdminDashboard(props: Props) {
  return <AdminThemeProvider><Shell {...props} /></AdminThemeProvider>;
}