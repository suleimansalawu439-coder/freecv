// Resilient Font definitions for Cvyon
// Loaded via high-performance Google Fonts CDN link in layout.tsx to prevent build-time network failures

export interface FontDescriptor {
  className: string;
  variable: string;
  style: { fontFamily: string };
}

export const display: FontDescriptor = {
  className: "font-display",
  variable: "--fd",
  style: { fontFamily: "'Archivo Black', 'Chakra Petch', sans-serif" },
};

export const head: FontDescriptor = {
  className: "font-head",
  variable: "--fh",
  style: { fontFamily: "'Archivo', 'Chakra Petch', sans-serif" },
};

export const body: FontDescriptor = {
  className: "font-body",
  variable: "--fb",
  style: { fontFamily: "'DM Sans', 'Sora', sans-serif" },
};

export const mono: FontDescriptor = {
  className: "font-mono",
  variable: "--fm",
  style: { fontFamily: "'Space Mono', 'JetBrains Mono', monospace" },
};

export const disp: FontDescriptor = {
  className: "font-display",
  variable: "--fd",
  style: { fontFamily: "'Chakra Petch', 'Archivo Black', sans-serif" },
};

export const bodyF: FontDescriptor = {
  className: "font-body",
  variable: "--fb",
  style: { fontFamily: "'Sora', 'DM Sans', sans-serif" },
};

export const monoF: FontDescriptor = {
  className: "font-mono",
  variable: "--fm",
  style: { fontFamily: "'JetBrains Mono', 'Space Mono', monospace" },
};

// LandingD specific names
export const scream: FontDescriptor = {
  className: "font-display",
  variable: "--fs",
  style: { fontFamily: "'Anton', sans-serif" },
};

export const typed: FontDescriptor = {
  className: "font-mono",
  variable: "--ft",
  style: { fontFamily: "'Courier Prime', monospace" },
};

export const fine: FontDescriptor = {
  className: "font-body",
  variable: "--ff",
  style: { fontFamily: "'Sora', sans-serif" },
};

// Mock font functions for backwards compatibility with Next.js font call signatures
export const Archivo_Black = (..._args: any[]) => display;
export const Archivo = (..._args: any[]) => head;
export const DM_Sans = (..._args: any[]) => body;
export const Space_Mono = (..._args: any[]) => mono;
export const Chakra_Petch = (..._args: any[]) => disp;
export const Sora = (..._args: any[]) => bodyF;
export const JetBrains_Mono = (..._args: any[]) => monoF;
export const Anton = (..._args: any[]) => scream;
export const Courier_Prime = (..._args: any[]) => typed;
export const Fraunces = (..._args: any[]) => display;
export const Figtree = (..._args: any[]) => bodyF;
export const Spline_Sans_Mono = (..._args: any[]) => monoF;
