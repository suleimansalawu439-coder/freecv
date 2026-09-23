import type { Metadata } from 'next';

// Route-level metadata for the recruiter funnel (client-component pages can't
// export metadata themselves in Next 16). No canonical here: this layout also
// wraps /recruiter/login, /recruiter/signup, and /recruiter/dashboard, and a
// shared canonical would be wrong for those subpages.
export const metadata: Metadata = {
  title: 'Cvyon for Recruiters — Search the opt-in talent pool',
  description:
    'Recruiters pay for access to Cvyon\u2019s opt-in talent pool. Buy 30 days of search and contact access via Paystack — one-time, no subscription.',
};

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
