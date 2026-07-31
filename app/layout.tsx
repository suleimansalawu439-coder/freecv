import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cvyon | Build a Premium, ATS-Friendly Resume for Free",
  description: "Build a premium, ATS-friendly resume directly in your browser. Zero hidden fees, no sign up required, instant PDF download. 100% privacy with local storage.",
  keywords: ["Free Resume Builder", "ATS Friendly Resume Builder", "No Sign Up Resume Maker", "Free PDF Resume Creator", "No Hidden Fees Resume Builder"],
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

import { Toaster } from 'react-hot-toast';

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
      <body className="min-h-full flex flex-col">
        {children}
        <ConsentManager />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
