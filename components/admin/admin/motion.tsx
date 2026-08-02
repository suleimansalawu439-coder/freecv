"use client";
import React, { useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...i: ClassValue[]) { return twMerge(clsx(i)); }

export const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
export const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Linear 0..1 progress that starts when the element scrolls into view. */
export function useDrawIn<T extends Element = HTMLElement>(duration = 900) {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        if (reduceMotion()) { setP(1); return; }
        const s = performance.now();
        const tick = (t: number) => { const x = Math.min(1, (t - s) / duration); setP(x); if (x < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }), { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, [duration]);
  return { ref, p };
}

export function CountUp({ to, prefix = "", suffix = "", decimals = 0, duration = 1100 }:
  { to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const { ref, p } = useDrawIn<HTMLSpanElement>(duration);
  const v = to * easeOutCubic(p);
  return (
    <span ref={ref}>
      {prefix}{v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}

export function Reveal({ children, delay = 0, className = "" }:
  { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("adm-in"); io.unobserve(el); } }), { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={cn("adm-reveal", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}