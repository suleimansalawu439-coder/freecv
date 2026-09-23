// JSON-LD structured data for the landing-page FAQ section.
// Shape mirrors components/landing/LandingF_FAQS.ts: { q, a } entries.
export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqs || []).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Scrub '<' to neutralize any embedded HTML (XSS-safe JSON-LD).
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
