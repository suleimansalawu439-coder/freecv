import { Suspense } from "react";
import LandingRiso from "@/components/landing/LandingRiso";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cvyon — Free Premium Résumé Builder & ATS Grader",
  description: "The free premium resume builder that uses ATS Grader to ensure outstanding output, free unlimited downloads, and no sign up.",
  alternates: { canonical: "https://cvyon.com" },
  openGraph: {
    title: "Cvyon — Free Premium Résumé Builder & ATS Grader",
    description: "The free premium resume builder that uses ATS Grader to ensure outstanding output, free unlimited downloads, and no sign up.",
    url: "https://cvyon.com",
    siteName: "Cvyon",
    type: "website",
    images: [{ url: "https://cvyon.com/og-image.jpg", width: 1200, height: 630, alt: "Cvyon — Free premium resume builder & ATS grader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cvyon — Free Premium Résumé Builder & ATS Grader",
    description: "The free premium resume builder that uses ATS Grader to ensure outstanding output, free unlimited downloads, and no sign up.",
    images: ["https://cvyon.com/og-image.jpg"],
  },
};

export default function Page() {
  return <LandingRiso />;
}