"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export type Mode = "dark" | "light";

export interface Tokens {
  mode: Mode;
  bg: string; bgAlt: string; surface: string; surface2: string;
  border: string; borderStrong: string;
  text: string; muted: string; faint: string;
  verm: string; cob: string; sage: string; gold: string;
  pass: string; fail: string; hi: string;
  grid: string; shadow: string; ring: string;
}

export const T: Record<Mode, Tokens> = {
  dark: {
    mode: "dark",
    bg: "#141312", bgAlt: "#1a1816", surface: "#211e1b", surface2: "#2a2622",
    border: "#38322c", borderStrong: "#4a4239",
    text: "#F2ECE1", muted: "#A99F93", faint: "#6f665c",
    verm: "#FF5A3C", cob: "#6E8BFF", sage: "#9FC0A6", gold: "#EBC06A",
    pass: "#46C98A", fail: "#FF7A6B", hi: "#FFE14D",
    grid: "rgba(255,255,255,0.035)", shadow: "0 1px 0 #00000055, 0 10px 30px -18px #000",
    ring: "#6E8BFF",
  },
  light: {
    mode: "light",
    bg: "#E8E7E1", bgAlt: "#efece6", surface: "#ffffff", surface2: "#f4f1ea",
    border: "#d8d4ca", borderStrong: "#141312",
    text: "#141312", muted: "#5c554c", faint: "#8a8175",
    verm: "#FF4326", cob: "#2233FF", sage: "#3f7a5b", gold: "#b07d18",
    pass: "#0E8A4B", fail: "#D8362A", hi: "#d8a400",
    grid: "rgba(20,19,18,0.04)", shadow: "4px 4px 0 #141312",
    ring: "#2233FF",
  },
};

interface Ctx { mode: Mode; setMode: (m: Mode) => void; t: Tokens; }
const AdminThemeContext = createContext<Ctx | null>(null);
const KEY = "cvyon-admin-theme";

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("dark"); // default dark
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    if (saved === "light" || saved === "dark") setModeState(saved);
  }, []);
  const setMode = (m: Mode) => { setModeState(m); try { localStorage.setItem(KEY, m); } catch {} };
  return <AdminThemeContext.Provider value={{ mode, setMode, t: T[mode] }}>{children}</AdminThemeContext.Provider>;
}

export function useAdminTheme() {
  const c = useContext(AdminThemeContext);
  if (!c) throw new Error("useAdminTheme must be used within AdminThemeProvider");
  return c;
}

export function ThemeToggle() {
  const { mode, setMode, t } = useAdminTheme();
  return (
    <button
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="grid h-9 w-9 place-items-center rounded-md border transition-colors"
      style={{ borderColor: t.border, background: t.surface2, color: t.text }}
    >
      {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}