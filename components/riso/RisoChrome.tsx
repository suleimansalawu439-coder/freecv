"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// `cn` is defined LOCALLY on purpose — do NOT import it from "@/lib/utils".
// Some files in this repo define cn locally and some import it; importing it
// here would make RisoChrome (and every page that uses it) break if that
// export is ever missing. clsx + tailwind-merge are guaranteed installed.
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ------------------------------------------------------------------ *
 *  NAV LINKS — single source of truth.
 *  Edit ONLY here to rename/reorder routes; every page updates at once.
 *  NOTE: the codebase I can see has the grader at "/ats-grader". If your
 *  live routes are "/grader" and "/cover-letter", change the two hrefs
 *  below; if "/grader" 404s, set it to "/ats-grader". Cover letter lives
 *  as a tab inside the builder, so it points at "/build" by default.
 * ------------------------------------------------------------------ */
const NAV = [
  { href: "/", label: "Home" },
  { href: "/build", label: "Builder" },
  { href: "/grader", label: "ATS Grader" },
  { href: "/cover-letter", label: "Cover Letter" },
];

/* Best-effort page_view tracker. Uses a DYNAMIC import so that if
 * @/lib/analytics or its `trackEvent` export is ever missing/renamed,
 * this silently no-ops instead of breaking the build. */
export function usePageView(page: string) {
  useEffect(() => {
    let alive = true;
    import("@/lib/analytics")
      .then((m: any) => {
        if (alive && typeof m?.trackEvent === "function") {
          m.trackEvent("page_view", page);
        }
      })
      .catch(() => {
        /* analytics unavailable — tracking is non-critical, ignore */
      });
    return () => {
      alive = false;
    };
  }, [page]);
}

export function RisoTicker() {
  const items = [
    "NO PAYWALL",
    "NO WATERMARK",
    "NO SIGN-UP TO DOWNLOAD",
    "RECRUITERS FUND IT — NOT YOU",
    "18 TEMPLATES",
    "AI ATS GRADER /100",
    "PDF + DOCX",
  ];
  return (
    <div className="relative z-40 overflow-hidden border-b-[3px] border-[#141312] bg-[#141312] py-2 text-[#E8E7E1]">
      <div className="riso-ticker fm text-[11px] font-bold uppercase tracking-[0.25em]">
        {[0, 1].map((d) => (
          <div key={d} className="flex shrink-0 items-center">
            {items.map((t, i) => (
              <span key={i} className="flex items-center">
                <span className="px-5">{t}</span>
                <span className="text-[#FF4326]">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RisoNav() {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-[#141312] bg-[#E8E7E1]/95">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-light-no-background.png"
            alt="Cvyon"
            width={120}
            height={32}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-7 fm text-[11px] font-bold uppercase tracking-[0.18em] md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "transition-colors hover:text-[#FF4326]",
                pathname === n.href ? "text-[#FF4326]" : "text-[#141312]/70"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/build"
            className="riso-btn hs-sm hidden !px-4 !py-2.5 sm:inline-flex"
          >
            Build free <ArrowRight size={15} />
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center md:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-[#E8E7E1] md:hidden">
          <div className="flex items-center justify-between border-b-[3px] border-[#141312] px-5 py-4">
            <Image
              src="/logo-light-no-background.png"
              alt="Cvyon"
              width={120}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col px-5 pt-4">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "fd border-b-[3px] border-[#141312] py-5 text-3xl tracking-tight",
                  pathname === n.href ? "text-[#FF4326]" : ""
                )}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/build"
              onClick={() => setOpen(false)}
              className="riso-btn mt-8"
            >
              Build free <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function RisoFooter() {
  const cols: [string, string[]][] = [
    ["product", ["Builder", "ATS Grader", "Cover Letter", "Templates"]],
    ["company", ["Career Blog", "Recruiter Portal", "Why free"]],
    ["legal", ["Privacy & GDPR", "Manage Data", "Terms"]],
    ["elsewhere", ["X / Twitter", "LinkedIn", "GitHub"]],
  ];
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-[#141312] bg-[#E8E7E1] px-5 pb-8 pt-14 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-2 gap-8 border-b-2 border-[#141312] pb-10 md:grid-cols-4">
          {cols.map(([h, items]) => (
            <div key={h}>
              <div className="fm mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#141312]/50">
                {h}
              </div>
              <ul className="space-y-2 text-sm">
                {items.map((it) => (
                  <li key={it}>
                    <Link href="/" className="hover:text-[#FF4326]">
                      {it}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
          <span className="fm text-[11px] font-bold uppercase tracking-[0.18em] text-[#141312]/50">
            © 2026 Cvyon — built in the open · free for candidates, funded by recruiters
          </span>
        </div>
      </div>
      <div className="pointer-events-none mt-6 select-none text-center fd text-[20vw] leading-[0.8] tracking-tighter text-[#141312]/[0.05]">
        CVYON
      </div>
    </footer>
  );
}

export function RisoSectionLabel({
  children,
  color = "#2233FF",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      className="fm mb-4 text-[11px] font-bold uppercase tracking-[0.25em]"
      style={{ color }}
    >
      § {children}
    </div>
  );
}

/* Wrap any front page in this to get grain + nav + footer + page_view for free.
 * `ticker` adds the top marquee. `pageName` drives the page_view event. */
export function RisoPage({
  pageName,
  children,
  ticker = false,
}: {
  pageName: string;
  children: React.ReactNode;
  ticker?: boolean;
}) {
  usePageView(pageName);
  return (
    <div className="relative min-h-screen bg-[#E8E7E1] text-[#141312]">
      <div className="riso-grain" />
      {ticker && <RisoTicker />}
      <RisoNav />
      <main className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8">{children}</main>
      <RisoFooter />
    </div>
  );
}