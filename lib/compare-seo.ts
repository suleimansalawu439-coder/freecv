// SEO data for "free alternative" comparison landing pages (app/alternatives/[slug]).
// Copy is hand-written and honest: only verifiable dimensions are compared,
// no specific competitor prices are stated (they change), no invented metrics,
// no fake testimonials or review scores.

export interface CompareSeoEntry {
  slug: string;
  competitor: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  verdict: string;
  rows: { label: string; cvyon: string; competitor: string }[];
  switchReasons: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const compareSeoEntries: CompareSeoEntry[] = [
  {
    slug: "zety-alternative",
    competitor: "Zety",
    pageTitle: "Free Zety Alternative",
    metaTitle: "Free Zety Alternative — Download Your Resume Free | Cvyon",
    metaDescription:
      "Looking for a free Zety alternative? Cvyon gives you 180 free templates, no sign-up, no paywall at download, and a free ATS grader.",
    intro:
      "Zety's templates look sharp — nobody disputes that. The frustration starts at the end: you spend an hour perfecting your resume, click download, and hit the paywall. If you want the same polished result without a subscription standing between you and your own resume, Cvyon is the free alternative built for exactly that moment.",
    verdict:
      "If you love Zety's designs but not its download paywall, Cvyon is the straightforward swap: 180 templates, free unlimited downloads, no account required, and a built-in ATS grader Zety doesn't offer.",
    rows: [
      {
        label: "Price to download your resume",
        cvyon: "Free — unlimited downloads, no payment step, ever",
        competitor: "Paid subscription required to download",
      },
      {
        label: "Sign-up required",
        cvyon: "None — build and download without an account",
        competitor: "Account required",
      },
      {
        label: "Watermark on free downloads",
        cvyon: "None",
        competitor: "Free versions carry a watermark",
      },
      {
        label: "Built-in ATS score",
        cvyon: "Yes — free ATS grader included",
        competitor: "No built-in ATS score",
      },
      {
        label: "Template library",
        cvyon: "180 templates, all free",
        competitor: "Smaller free selection",
      },
      {
        label: "AI writing help",
        cvyon: "Yes — AI bullet rewriting, summaries, and ATS scoring",
        competitor: "Varies by plan",
      },
    ],
    switchReasons: [
      {
        title: "No paywall at the finish line",
        body: "The classic Zety experience is building your whole resume and discovering the download costs money. On Cvyon the download button just works — free, unlimited, no card, no trial countdown.",
      },
      {
        title: "No account, no email capture",
        body: "You don't need to hand over an email address to use Cvyon. Open the builder, pick from 180 templates, and download. Your resume stays yours.",
      },
      {
        title: "Know your ATS score before you apply",
        body: "Cvyon includes a free ATS grader that scores your resume the way applicant tracking systems see it — then tells you exactly what to fix. It's the check most builders charge extra for, or don't offer at all.",
      },
    ],
    faqs: [
      {
        q: "Is Cvyon really free, or is there a catch at download?",
        a: "Really free. There is no premium tier, no trial, and no payment step — the download button works the same on your first resume as your fiftieth.",
      },
      {
        q: "Do I need to create an account to use Cvyon?",
        a: "No. Unlike Zety, Cvyon doesn't require sign-up. Build and download without an account; your data stays in your browser.",
      },
      {
        q: "Can I move my half-finished Zety resume to Cvyon?",
        a: "There is no one-click import from Zety, but rebuilding takes minutes: pick one of 180 templates, paste your content in, and download. Most people finish faster than their original Zety build because there's no upsell flow slowing them down.",
      },
      {
        q: "Will a Cvyon resume pass applicant tracking systems?",
        a: "Cvyon's templates use single-column layouts, standard headings, and real selectable text — the combination parsers handle best. Run your finished resume through the free ATS grader to confirm your score before applying.",
      },
    ],
  },
  {
    slug: "resume-io-alternative",
    competitor: "Resume.io",
    pageTitle: "Free Resume.io Alternative",
    metaTitle: "Free Resume.io Alternative — Build & Download Free | Cvyon",
    metaDescription:
      "A free Resume.io alternative with 180 templates, no sign-up, no download paywall, and a built-in ATS grader. Build yours in minutes.",
    intro:
      "Resume.io made resume building feel easy — and then put the download behind a subscription. If you got all the way through their builder only to discover your resume costs money to take home, you're not alone. Cvyon is the free alternative: the same smooth builder experience, 180 templates, and a download button that doesn't ask for your card.",
    verdict:
      "Choose Cvyon over Resume.io if you want your resume without a subscription: free unlimited downloads, no account needed, 180 templates, and a free ATS grader built in.",
    rows: [
      {
        label: "Price to download your resume",
        cvyon: "Free — unlimited downloads, no payment step, ever",
        competitor: "Paid subscription required to download",
      },
      {
        label: "Sign-up required",
        cvyon: "None — build and download without an account",
        competitor: "Account required",
      },
      {
        label: "Watermark on free downloads",
        cvyon: "None",
        competitor: "Free versions carry a watermark",
      },
      {
        label: "Built-in ATS score",
        cvyon: "Yes — free ATS grader included",
        competitor: "No built-in ATS score",
      },
      {
        label: "Template library",
        cvyon: "180 templates, all free",
        competitor: "Smaller free selection",
      },
      {
        label: "AI writing help",
        cvyon: "Yes — AI bullet rewriting, summaries, and ATS scoring",
        competitor: "Varies by plan",
      },
    ],
    switchReasons: [
      {
        title: "Your resume shouldn't require a subscription",
        body: "Resume.io's free tier lets you build but not download — the part you actually need. Cvyon has no tiers at all: build it, download it, done.",
      },
      {
        title: "Skip the account creation",
        body: "No email, no password, no “complete your profile” screens. Cvyon opens straight into the builder and your work stays in your browser.",
      },
      {
        title: "A bigger template library, all unlocked",
        body: "180 templates across every style — corporate, creative, minimal, ATS-maximized — and every single one is free. No locked “premium” designs.",
      },
    ],
    faqs: [
      {
        q: "Is Cvyon really free compared to Resume.io?",
        a: "Yes. Resume.io requires a paid subscription to download your resume; Cvyon lets you download unlimited resumes for free with no payment step anywhere.",
      },
      {
        q: "Do I need an account?",
        a: "No. Cvyon works without sign-up — your resume data stays in your own browser rather than on someone's servers.",
      },
      {
        q: "How do I transfer my Resume.io resume to Cvyon?",
        a: "Copy your text over into one of Cvyon's 180 templates — it takes a few minutes. There isn't an automatic importer, but the builder is fast enough that most people finish in one sitting.",
      },
      {
        q: "Does Cvyon help with ATS optimization?",
        a: "Yes — every template is built ATS-friendly (single column, standard headings, selectable text), and the free ATS grader scores your resume and flags exactly what to fix before you apply.",
      },
    ],
  },
  {
    slug: "novoresume-alternative",
    competitor: "NovoResume",
    pageTitle: "Free NovoResume Alternative",
    metaTitle: "Free NovoResume Alternative — No Sign-Up Needed | Cvyon",
    metaDescription:
      "A free NovoResume alternative: 180 templates, no sign-up, unlimited free downloads, and a free ATS grader. Start building now.",
    intro:
      "NovoResume earned its reputation with clean, modern templates — and a free tier that only goes so far. If you've hit the limits of what you can do without paying, or you'd rather not create yet another account for a one-time task, Cvyon is the free alternative: 180 templates, zero sign-up, and downloads that are actually free.",
    verdict:
      "If NovoResume's free tier feels like a demo, Cvyon is the full product: 180 free templates, unlimited downloads, no account, and a built-in ATS grader.",
    rows: [
      {
        label: "Price to download your resume",
        cvyon: "Free — unlimited downloads, no payment step, ever",
        competitor: "Paid subscription required to download",
      },
      {
        label: "Sign-up required",
        cvyon: "None — build and download without an account",
        competitor: "Account required",
      },
      {
        label: "Watermark on free downloads",
        cvyon: "None",
        competitor: "Free versions carry a watermark",
      },
      {
        label: "Built-in ATS score",
        cvyon: "Yes — free ATS grader included",
        competitor: "No built-in ATS score",
      },
      {
        label: "Template library",
        cvyon: "180 templates, all free",
        competitor: "Smaller free selection",
      },
      {
        label: "AI writing help",
        cvyon: "Yes — AI bullet rewriting, summaries, and ATS scoring",
        competitor: "Varies by plan",
      },
    ],
    switchReasons: [
      {
        title: "The free tier is the whole product",
        body: "NovoResume's free plan is a taste; the features most people need sit behind premium. Cvyon has no premium — all 180 templates and unlimited downloads are free from the start.",
      },
      {
        title: "No account for a one-time task",
        body: "Building a resume isn't a relationship — you shouldn't need an account for it. Cvyon skips sign-up entirely.",
      },
      {
        title: "Check your ATS score free",
        body: "Cvyon's built-in ATS grader scores your resume like an applicant tracking system would and tells you what to fix. It's included, not upsold.",
      },
    ],
    faqs: [
      {
        q: "Is Cvyon completely free, unlike NovoResume's premium plans?",
        a: "Yes — there are no plans at all. Every template and every download is free, with no payment step and no feature gates.",
      },
      {
        q: "Can I use Cvyon without signing up?",
        a: "Yes. Open the builder and start — no email, no password, no account. Your data stays in your browser.",
      },
      {
        q: "How many templates does Cvyon have?",
        a: "180, covering corporate, creative, minimal, and ATS-optimized styles — all free, none locked behind a paywall.",
      },
      {
        q: "Will my Cvyon resume work with applicant tracking systems?",
        a: "The templates are designed ATS-friendly: single-column layouts, standard section headings, and real selectable text. Verify with the free ATS grader before you submit.",
      },
    ],
  },
];

export function getCompareSeoEntry(slug: string): CompareSeoEntry | undefined {
  return compareSeoEntries.find((e) => e.slug === slug);
}
