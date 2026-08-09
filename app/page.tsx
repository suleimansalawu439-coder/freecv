import { Suspense } from "react";
import LandingRiso from "@/components/landing/LandingRiso";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cvyon — Free AI Résumé Builder & ATS Grader",
  description: "Build, AI-grade, and download an ATS-friendly résumé for free. No paywall, no watermark, no sign-up.",
  alternates: { canonical: "https://cvyon.com" },
  openGraph: {
    title: "Cvyon — Free AI Résumé Builder & ATS Grader",
    description: "Score your résumé against any job, see what the screening bots read, and download PDF or Word. No paywall, no sign-up.",
    url: "https://cvyon.com",
    siteName: "Cvyon",
    type: "website",
    images: [{ url: "https://cvyon.com/og-image.png", width: 1200, height: 630, alt: "Cvyon — free AI résumé builder & ATS grader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cvyon — Free AI Résumé Builder & ATS Grader",
    description: "Score your résumé against any job and download it free. No paywall, no sign-up.",
    images: ["https://cvyon.com/og-image.png"],
  },
};

export default function Page() {
  return <LandingRiso />;
}