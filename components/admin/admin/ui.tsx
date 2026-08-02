"use client";
import React, { useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAdminTheme } from "./theme";
import { X } from "lucide-react";

export function cn(...i: ClassValue[]) { return twMerge(clsx(i)); }

/* ---- motion ---- */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("adm-in"); io.unobserve(el); } }), { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={cn("adm-reveal", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
export function CountUp({ to, prefix = "", suffix = "", decimals = 0 }: { to: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [n, setN] = useState(0); const ref = useRef<HTMLSpanElement>(null); const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
        const s = performance.now();
        const tick = (t: number) => { const p = Math.min(1, (t - s) / 1000); setN(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }), { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}

/* ---- surfaces ---- */
export function Card({ children, className = "", hover = false, style }: { children: React.ReactNode; className?: string; hover?: boolean; style?: React.CSSProperties }) {
  const { t } = useAdminTheme();
  return (
    <div
      className={cn("rounded-lg border transition-all duration-200", hover && "adm-hover", className)}
      style={{ background: t.surface, borderColor: t.border, boxShadow: t.shadow, ...style }}
    >{children}</div>
  );
}
export function SectionLabel({ children, color }: { children: React.ReactNode; color?: string }) {
  const { t } = useAdminTheme();
  return <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: color || t.cob }}>§ {children}</div>;
}
export function Kpi({ label, value, sub, accent, icon }: { label: string; value: React.ReactNode; sub?: string; accent?: string; icon?: React.ReactNode }) {
  const { t } = useAdminTheme();
  return (
    <Card hover className="p-5">
      <div className="flex items-start justify-between">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: t.muted }}>{label}</div>
        {icon && <span style={{ color: accent || t.faint }}>{icon}</span>}
      </div>
      <div className="fd mt-2 text-3xl tracking-tight" style={{ color: accent || t.text }}>{value}</div>
      {sub && <div className="mt-1 font-mono text-[11px]" style={{ color: t.faint }}>{sub}</div>}
    </Card>
  );
}
export function Bar({ label, value, max, color }: { label: string; value: number; max: number; color?: string }) {
  const { t } = useAdminTheme(); const pct = max ? Math.round((value / max) * 100) : 0;
  const [w, setW] = useState(0);
  useEffect(() => { const id = setTimeout(() => setW(pct), 60); return () => clearTimeout(id); }, [pct]);
  return (
    <div>
      <div className="mb-1 flex justify-between font-mono text-[11px] font-bold uppercase tracking-wider">
        <span className="truncate pr-2" style={{ color: t.text }}>{label}</span><span style={{ color: t.muted }}>{value}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-sm" style={{ background: t.surface2 }}>
        <div className="h-full rounded-sm transition-[width] duration-700 ease-out" style={{ width: `${w}%`, background: color || t.cob }} />
      </div>
    </div>
  );
}
export function Pill({ children, color, bg }: { children: React.ReactNode; color?: string; bg?: string }) {
  const { t } = useAdminTheme();
  return <span className="inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider"
    style={{ color: color || t.muted, borderColor: color || t.border, background: bg || "transparent" }}>{children}</span>;
}

/* ---- controls ---- */
export function Btn({ children, onClick, variant = "primary", disabled, type = "button", className = "" }:
  { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "ghost" | "danger"; disabled?: boolean; type?: "button" | "submit"; className?: string }) {
  const { t } = useAdminTheme();
  const base = "inline-flex items-center justify-center gap-2 rounded-md border-2 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest transition-all active:translate-y-px disabled:opacity-50";
  const styles =
    variant === "danger" ? { background: t.fail, borderColor: t.fail, color: "#fff" } :
    variant === "ghost" ? { background: "transparent", borderColor: t.border, color: t.text } :
    { background: t.text, borderColor: t.text, color: t.bg };
  return <button type={type} onClick={onClick} disabled={disabled} className={cn(base, className)} style={styles}>{children}</button>;
}
export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  const { t } = useAdminTheme();
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: t.muted }}>{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px]" style={{ color: t.faint }}>{hint}</span>}
    </label>
  );
}
const inputStyle = (t: any): React.CSSProperties => ({ background: t.bgAlt, borderColor: t.border, color: t.text });
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { t } = useAdminTheme();
  return <input {...props} className={cn("w-full rounded-md border px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--ring)]", props.className)}
    style={{ ...inputStyle(t), ["--ring" as any]: t.ring }} />;
}
export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { t } = useAdminTheme();
  return <textarea {...props} className={cn("w-full rounded-md border px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--ring)]", props.className)}
    style={{ ...inputStyle(t), ["--ring" as any]: t.ring }} />;
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { t } = useAdminTheme();
  return <select {...props} className={cn("w-full rounded-md border px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--ring)]", props.className)}
    style={{ ...inputStyle(t), ["--ring" as any]: t.ring }} />;
}
export function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  const { t } = useAdminTheme();
  return (
    <button type="button" onClick={() => onChange(!on)} aria-pressed={on}
      className="relative h-6 w-11 shrink-0 rounded-full border-2 transition-colors"
      style={{ borderColor: t.border, background: on ? t.pass : t.surface2 }}>
      <span className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all" style={{ left: on ? 22 : 2 }} />
    </button>
  );
}

/* ---- overlays ---- */
export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) {
  const { t } = useAdminTheme();
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k); const p = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = p; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={cn("adm-pop max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border-2 sm:rounded-xl", wide ? "sm:max-w-3xl" : "sm:max-w-lg")}
        style={{ background: t.bg, borderColor: t.borderStrong, boxShadow: t.shadow }}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 px-6 py-4" style={{ borderColor: t.border, background: t.surface }}>
          <h3 className="fd text-lg tracking-tight" style={{ color: t.text }}>{title}</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-md border" style={{ borderColor: t.border, color: t.muted }}><X size={16} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const { t } = useAdminTheme();
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k); const p = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = p; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="adm-drawer flex h-full w-full max-w-xl flex-col border-l-2"
        style={{ background: t.bg, borderColor: t.borderStrong }}>
        <div className="flex items-center justify-between border-b-2 px-6 py-4" style={{ borderColor: t.border, background: t.surface }}>
          <h3 className="fd truncate text-lg tracking-tight" style={{ color: t.text }}>{title}</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-md border" style={{ borderColor: t.border, color: t.muted }}><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

/* ---- table + misc ---- */
export function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  const { t } = useAdminTheme();
  return (
    <div className="overflow-x-auto rounded-lg border" style={{ borderColor: t.border }}>
      <table className="w-full text-left text-sm">
        <thead><tr style={{ background: t.surface2 }}>
          {head.map((h) => <th key={h} className="whitespace-nowrap px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: t.muted }}>{h}</th>)}
        </tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
export function Row({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const { t } = useAdminTheme();
  return <tr onClick={onClick} className={cn("border-t transition-colors", onClick && "cursor-pointer")}
    style={{ borderColor: t.border, background: "transparent" }}
    onMouseEnter={(e) => (e.currentTarget.style.background = t.surface2)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>{children}</tr>;
}
export function Cell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { t } = useAdminTheme();
  return <td className={cn("px-4 py-3", className)} style={{ color: t.text }}>{children}</td>;
}
export function EmptyState({ icon, title, hint }: { icon?: React.ReactNode; title: string; hint?: string }) {
  const { t } = useAdminTheme();
  return <div className="py-16 text-center">{icon && <div className="mb-3 flex justify-center" style={{ color: t.faint }}>{icon}</div>}
    <p className="fd text-lg" style={{ color: t.text }}>{title}</p>{hint && <p className="mt-1 text-sm" style={{ color: t.muted }}>{hint}</p>}</div>;
}
export function Spinner({ size = 22 }: { size?: number }) {
  const { t } = useAdminTheme();
  return <span className="inline-block animate-spin rounded-full border-2 border-t-transparent" style={{ width: size, height: size, borderColor: t.cob, borderTopColor: "transparent" }} />;
}

/* ---- global motion css (mount once via the shell) ---- */
export function AdminMotion() {
  return <style>{`
    .adm-reveal{opacity:0;transform:translateY(18px);transition:opacity .6s cubic-bezier(.2,.7,.2,1),transform .6s cubic-bezier(.2,.7,.2,1)}
    .adm-reveal.adm-in{opacity:1;transform:none}
    .adm-hover:hover{transform:translateY(-2px)}
    .adm-pop{animation:admpop .28s cubic-bezier(.2,.8,.2,1) both}
    @keyframes admpop{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}
    .adm-drawer{animation:admdraw .3s cubic-bezier(.2,.7,.2,1) both}
    @keyframes admdraw{from{transform:translateX(100%)}to{transform:none}}
    @media (prefers-reduced-motion:reduce){.adm-reveal,.adm-hover,.adm-pop,.adm-drawer{animation:none!important;transition:none!important;opacity:1!important;transform:none!important}}
  `}</style>;
}