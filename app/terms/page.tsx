import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Cvyon',
  description:
    'The terms governing your use of Cvyon\u2019s free resume builder, AI features, and recruiter talent pool.',
  alternates: { canonical: 'https://cvyon.com/terms' },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-black mb-8">Terms of Service</h1>

        <div className="prose prose-blue max-w-none">
          <p>Last Updated: September 2026</p>

          <h2>1. The Service</h2>
          <p>
            Cvyon (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides a free online resume builder, cover-letter
            builder, ATS grader, and related career tools at cvyon.com (the
            &ldquo;Service&rdquo;). The core resume builder is free to use and does not
            require an account. By accessing or using the Service, you agree to
            these Terms.
          </p>

          <h2>2. Your Content</h2>
          <p>
            You retain full ownership of the resumes, cover letters, and other
            materials you create with Cvyon (&ldquo;Your Content&rdquo;). By using the
            Service you grant us a limited, worldwide license to store, process,
            and display Your Content solely to operate the Service — for example
            to render your resume, generate PDF/DOCX exports, and run the AI
            features you request. We do not sell Your Content.
          </p>

          <h2>3. AI Features</h2>
          <p>
            Features such as AI rewriting, ATS scoring, and resume import are
            powered by third-party AI providers (currently Google Gemini). When
            you use these features, the content you submit is processed by that
            provider under their terms. AI output is generated automatically and
            may be inaccurate — always review it before sending it to employers.
          </p>

          <h2>4. Talent Pool &amp; Recruiter Sharing</h2>
          <p>
            Cvyon offers an optional talent pool that lets verified recruiters
            discover candidates. You are <strong>never</strong> added to the
            talent pool by default: sharing happens only if you explicitly opt in
            through the consent controls in the builder or your{' '}
            <Link href="/settings" className="text-blue-600 underline">settings</Link>.
            You can withdraw that consent at any time from the same place, or
            via the <Link href="/manage-data" className="text-blue-600 underline">data management</Link> page.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Upload content you do not own or have no right to use;</li>
            <li>Submit false, misleading, or impersonating information;</li>
            <li>Attempt to disrupt, scrape at abusive rates, or gain unauthorized access to the Service;</li>
            <li>Use the Service for unlawful purposes or to send spam.</li>
          </ul>

          <h2>6. Accounts</h2>
          <p>
            Some features (saving resumes online, recruiter accounts) require an
            account. You are responsible for keeping your credentials
            confidential and for activity under your account. We may suspend
            accounts that violate these Terms.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            The Cvyon name, design, templates&apos; layout code, and all site
            content other than Your Content remain our property or that of our
            licensors. You may not copy or redistribute the Service&apos;s
            underlying code or designs except as the Service itself allows
            (e.g. exporting your own resume).
          </p>

          <h2>8. No Employment Guarantee</h2>
          <p>
            Cvyon helps you present yourself well; it does not guarantee
            interviews, job offers, or any employment outcome. ATS scores and AI
            suggestions are guidance, not professional career advice.
          </p>

          <h2>9. Disclaimers &amp; Limitation of Liability</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; without warranties of any kind.
            To the maximum extent permitted by law, Cvyon is not liable for any
            indirect, incidental, or consequential damages arising from your use
            of the Service. Our total liability is limited to the amount you
            paid us for the Service (the core builder is free, so: zero).
          </p>

          <h2>10. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Material changes will be
            announced on the site, and continued use of the Service after changes
            take effect constitutes acceptance.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about these Terms? Reach us via the{' '}
            <Link href="/support" className="text-blue-600 underline">support page</Link>{' '}
            or at hello@cvyon.com.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            This is a plain-language summary of our terms prepared for launch.
            If Cvyon grows to handle significant revenue or sensitive data flows,
            these terms should be reviewed by qualified legal counsel.
          </p>
        </div>
      </div>
    </div>
  );
}
