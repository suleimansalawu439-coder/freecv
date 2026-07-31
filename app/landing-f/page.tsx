import LandingF, { FAQS } from "@/components/landing/LandingF";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cvyon — Free AI Résumé Builder & ATS Grader (No Paywall)",
  description:
    "Free AI résumé builder & ATS grader. Score your résumé against any job, see what the screening bots read, and download PDF or Word — no paywall, no sign-up, no watermark.",
  keywords: [
    "free resume builder", "free résumé builder", "ATS resume checker", "ATS-friendly resume",
    "AI resume grader", "ATS score", "resume builder no sign up", "resume builder no paywall",
    "AI cover letter generator", "free CV maker", "ATS resume template", "resume parser",
  ],
  alternates: { canonical: "https://cvyon.com" },
  openGraph: {
    title: "Cvyon — Free AI Résumé Builder & ATS Grader",
    description:
      "Score your résumé against any job, see what the screening bots read, and download PDF or Word. No paywall, no sign-up, no watermark.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Cvyon",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description: metadata.description as string,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "AI ATS résumé grader with score out of 100",
        "18 ATS-friendly résumé templates",
        "PDF and DOCX export with no watermark",
        "AI cover-letter generator",
        "Résumé PDF import and parsing",
        "No account required to build or download",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    { "@type": "WebSite", name: "Cvyon", url: "https://cvyon.com" },
  ],
};

export default function Page() {
  return (
    <>
      <LandingF />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}