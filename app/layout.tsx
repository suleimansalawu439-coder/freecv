import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cvyon | Build a Premium, ATS-Friendly Resume for Free",
  description: "Build a premium, ATS-friendly resume directly in your browser. Zero hidden fees, no sign up required, instant PDF download. 100% privacy with local storage.",
  keywords: ["Free Resume Builder", "ATS Friendly Resume Builder", "No Sign Up Resume Maker", "Free PDF Resume Creator", "No Hidden Fees Resume Builder"],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Cvyon | Premium, ATS-Friendly Resume Builder",
    description: "Create a beautiful, ATS-friendly resume without hidden fees. Instant PDF download, no sign up required.",
    url: "https://cvyon.com",
    siteName: "Cvyon",
    type: "website",
    images: [{ url: "https://cvyon.com/og-image.png", width: 1200, height: 630, alt: "Cvyon — free AI résumé builder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cvyon | Premium, ATS-Friendly Resume Builder",
    description: "Create a beautiful, ATS-friendly resume without hidden fees.",
    images: ["https://cvyon.com/og-image.png"],
  },
};

import { ConsentManager } from "@/components/ConsentManager";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from 'react-hot-toast';
import { AffiliateTracker } from "@/components/AffiliateTracker";
import { JsonLd } from "@/components/JsonLd";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans"
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;600;700;800;900&family=Chakra+Petch:wght@500;600;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;700&family=Sora:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <AuthProvider>
          {children}
          <ConsentManager />
          <Suspense fallback={null}>
            <AffiliateTracker />
          </Suspense>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
