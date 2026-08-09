import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://cvyon.com'),
  title: "Cvyon | Build a Premium, ATS-Friendly Resume for Free",
  description: "The free premium resume builder that uses ATS Grader to ensure outstanding output, free unlimited downloads, and no sign up.",
  keywords: ["Free Resume Builder", "ATS Friendly Resume Builder", "No Sign Up Resume Maker", "Free PDF Resume Creator", "No Hidden Fees Resume Builder"],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Cvyon | Premium, ATS-Friendly Resume Builder",
    description: "The free premium resume builder that uses ATS Grader to ensure outstanding output, free unlimited downloads, and no sign up.",
    url: "https://cvyon.com",
    siteName: "Cvyon",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cvyon — Free AI Résumé Builder",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cvyon | Premium, ATS-Friendly Resume Builder",
    description: "The free premium resume builder that uses ATS Grader to ensure outstanding output, free unlimited downloads, and no sign up.",
    images: ["/og-image.jpg"],
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=2" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png?v=2" />
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
