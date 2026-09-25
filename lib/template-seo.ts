// SEO data for per-template landing pages (app/templates/[slug]).
// Each entry describes one resume template from components/html_templates.
// Copy is hand-written per template from the actual component code —
// no lorem ipsum, no invented metrics, no placeholder claims.

export interface TemplateSeoEntry {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bestFor: string[];
  designTraits: string[];
  atsNotes: string;
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const templateSeoEntries: TemplateSeoEntry[] = [
  {
    id: 'Academic',
    slug: 'academic',
    name: 'Academic',
    tagline: 'A formal, single-column CV for scholars, lecturers, and researchers.',
    description:
      'Academic keeps the traditional CV structure hiring committees expect: a centered serif header with a "Curriculum Vitae" masthead, a year-anchored education grid, and relaxed line spacing that stays comfortable across long publication and teaching lists. Everything runs in one column, so multi-page CVs stay orderly and easy to scan.',
    bestFor: [
      'University lecturers and professors',
      'PhD candidates and postdoctoral researchers',
      'Grant and fellowship applicants',
      'Research scientists',
      'Academic administrators',
    ],
    designTraits: [
      'Single-column serif layout with a centered "Curriculum Vitae" masthead',
      'Year-anchored education grid — graduation years sit in their own left column',
      'No photo slot, keeping the document strictly formal',
      'Wide margins and relaxed line spacing for long, multi-page CVs',
    ],
    atsNotes:
      'The single-column layout and standard serif type parse cleanly in applicant tracking systems. Keep your contact line text-based and never embed your publication list as an image, so every citation stays searchable.',
    faqs: [
      {
        q: 'Is the Academic template a real CV format or a one-page resume?',
        a: 'It is a true academic CV layout, built for multi-page documents with extended education, research, and teaching entries — not a squeezed one-pager.',
      },
      {
        q: 'Does it work for PhD and postdoc applications?',
        a: 'Yes. The year-anchored education grid puts degrees and dates front and center, and the single-column flow handles long research and teaching entries without breaking the layout.',
      },
      {
        q: 'Can I add a publications section?',
        a: 'Yes — add it as a custom section in the builder. The serif body text keeps long citation lists readable, and the single-column layout means nothing gets clipped or reflowed.',
      },
      {
        q: 'Will it hold up if my CV runs to three pages?',
        a: 'That is exactly what it is for. The generous spacing, consistent rules, and repeated structure stay clean across as many pages as you need.',
      },
    ],
    metaTitle: 'Academic CV Template — Free Serif CV Builder | Cvyon',
    metaDescription:
      'Build a formal academic CV free with Cvyon\'s Academic template — serif type, a year-anchored education grid, and a clean single-column layout for scholars.',
  },
  {
    id: 'AcademicJournal',
    slug: 'academic-journal',
    name: 'Academic Journal',
    tagline: 'A journal-styled CV with an "Abstract" profile and numbered sections.',
    description:
      'Academic Journal frames your career like a published paper: a centered serif masthead, your summary recast as an "Abstract", and a two-column body with roman-numeral section headings — I. Professional Appointments, II. Education, III. Technical Skills. It suits researchers and clinicians who want their record to read like a body of work.',
    bestFor: [
      'Researchers and laboratory scientists',
      'Medical residents and clinicians',
      'PhD candidates',
      'Policy analysts and think-tank staff',
      'Applicants for research posts',
    ],
    designTraits: [
      'Journal-style serif layout with an "Abstract" profile section',
      'Two-column body with roman-numeral section headings',
      'Justified body text beneath a centered masthead',
      'Optional numbered References section — strictly formal, no photo',
    ],
    atsNotes:
      'The roman-numeral headings are decorative; the underlying section text still reads in order. Put your most keyword-rich content first — the template already leads with Professional Appointments — because some parsers read the left column before the right.',
    faqs: [
      {
        q: 'Is the Academic Journal template only for people with journal publications?',
        a: 'No. "Abstract" is simply the profile heading — use it as a professional summary. Your publications, if any, go in a custom section like any other template.',
      },
      {
        q: 'Does the two-column body hurt ATS parsing?',
        a: 'Slightly, with older parsers that read columns sequentially. This layout orders appointments before education, which matches how academic applications are screened, so the important content is found first.',
      },
      {
        q: 'How is it different from the Academic template?',
        a: 'Academic is a traditional single-column CV; Academic Journal is more stylized — a journal-paper metaphor with an "Abstract", roman numerals, and a two-column body. Choose Journal for a distinctive research voice, Academic for maximum conservatism.',
      },
      {
        q: 'Can I include references?',
        a: 'Yes — there is a numbered References section that appears when you enable references in the builder.',
      },
    ],
    metaTitle: 'Academic Journal CV Template — Free | Cvyon',
    metaDescription:
      'A free journal-styled academic CV template: "Abstract" profile, roman-numeral sections, and a serif two-column layout. Build yours free on Cvyon.',
  },
  {
    id: 'Atelier',
    slug: 'atelier',
    name: 'Atelier',
    tagline: 'A gallery-grade minimalist layout for designers and visual creatives.',
    description:
      'Atelier treats your resume like exhibition wall text: an oversized light-weight name, widely tracked uppercase labels in the theme color, generous vertical whitespace, and a hairline rule between sections. An optional grayscale portrait keeps the focus on the work rather than the face.',
    bestFor: [
      'Graphic and brand designers',
      'Architects and interior designers',
      'Photographers and art directors',
      'UX and UI designers',
      'Creative directors',
    ],
    designTraits: [
      'Extreme whitespace with an oversized light-weight name',
      'Widely tracked uppercase section labels in the theme color',
      'Optional grayscale portrait — renders cleanly without one',
      'Hairline theme-color dividers separating each section',
    ],
    atsNotes:
      'The wide tracking and light type are stylistic choices over standard, parseable text. If you are applying through a strict ATS portal, export the PDF and confirm the text layer copies cleanly, and keep the theme color dark enough for strong contrast.',
    faqs: [
      {
        q: 'Is the light type readable when printed?',
        a: 'Yes — it is light but large, with high contrast on white paper. Choose a mid-to-dark theme color for the labels and rules rather than a pale one.',
      },
      {
        q: 'Is the photo required?',
        a: 'No. The portrait only appears if you upload one; without it the header is simply your name, title, and contact lines with even more breathing room.',
      },
      {
        q: 'How many pages should an Atelier resume be?',
        a: 'One to two. The generous whitespace is the point — compressing a long career into it defeats the design. Long careers fit the Condensed or Classic templates better.',
      },
      {
        q: 'Does it work for non-designers?',
        a: 'It works for any creative or taste-driven role — writers, stylists, gallery staff. For corporate or technical roles, a more conventional template will serve you better.',
      },
    ],
    metaTitle: 'Atelier Resume Template — Minimalist Designer CV | Cvyon',
    metaDescription:
      'A free minimalist resume template for designers and creatives — gallery-grade whitespace, tracked labels, optional grayscale portrait. Build free on Cvyon.',
  },
  {
    id: 'Caliber',
    slug: 'caliber',
    name: 'Caliber',
    tagline: 'Bold, high-contrast, and confident — a resume that leads with impact.',
    description:
      'Caliber is for people who want to be remembered: an extra-bold theme-colored name, oversized role titles, and uniform skill bars that create visual rhythm down the page. The single-column flow keeps the energy readable instead of chaotic.',
    bestFor: [
      'Sales professionals and account executives',
      'Marketing and growth leaders',
      'Operations managers',
      'Customer success managers',
      'Competitive corporate roles where presence matters',
    ],
    designTraits: [
      'Extra-bold oversized name set in the theme color',
      'Large role headings with generous section spacing',
      'Uniform skill bars — decorative visual rhythm, not proficiency ratings',
      'Single-column layout: bold but orderly',
    ],
    atsNotes:
      'The skill bars are purely decorative and are ignored by parsers; what matters is the skill-name text, which is plain and readable. The single-column structure and standard headings parse reliably.',
    faqs: [
      {
        q: 'Do the skill bars rate my proficiency?',
        a: 'No — every bar renders at full width as visual rhythm. Recruiters read the skill names; the bars simply give the section a confident, structured look.',
      },
      {
        q: 'Is Caliber too bold for conservative industries?',
        a: 'Pair it with a navy or charcoal theme color and it reads as confident rather than loud. For law or finance, Classic or Corporate Blue are safer bets.',
      },
      {
        q: 'Will the big headings push my resume to two pages?',
        a: 'The oversized type uses more vertical space than compact templates. If you need a strict one-pager, Condensed fits far more content per page.',
      },
    ],
    metaTitle: 'Caliber Resume Template — Bold & Confident | Cvyon',
    metaDescription:
      'A free bold resume template with an extra-bold name, oversized headings, and decorative skill bars. Single-column and ATS-friendly. Build free on Cvyon.',
  },
  {
    id: 'Classic',
    slug: 'classic',
    name: 'Classic',
    tagline: 'The timeless centered serif resume that never looks out of place.',
    description:
      'Classic is the traditional choice: a centered serif header with a rule underneath, uppercase section headings, bulleted experience entries, and education plus skills arranged in a tidy two-column footer. It looks right in law firms, banks, government offices — anywhere convention matters.',
    bestFor: [
      'Legal and compliance professionals',
      'Banking and insurance staff',
      'Government and civil service roles',
      'Administrative professionals',
      'Career changers who want a safe, credible look',
    ],
    designTraits: [
      'Centered serif header with an uppercase name and bottom rule',
      'Traditional bulleted experience entries',
      'Two-column footer for education, certifications, and skills',
      'No photo and no color dependence — pure black on white',
    ],
    atsNotes:
      'About as ATS-friendly as resumes get: a single-column body, standard headings, black serif text, and zero graphics. One of the safest choices for strict application portals.',
    faqs: [
      {
        q: 'Is Classic too old-fashioned for tech jobs?',
        a: 'For startups, choose a modern template like Minimalist Split or Forge. For enterprise, government, or finance roles, Classic is a feature — it signals you take the process seriously.',
      },
      {
        q: 'Can I add color to the Classic template?',
        a: 'Classic is intentionally black on white. If you want the same traditional structure with a color accent, try Counsel or Corporate Blue.',
      },
      {
        q: 'Does it support a second page?',
        a: 'Yes — the centered headings and rules repeat cleanly, and the two-column footer anchors the end of the document on the final page.',
      },
    ],
    metaTitle: 'Classic Resume Template — Timeless & ATS-Safe | Cvyon',
    metaDescription:
      'A free classic resume template: centered serif header, bulleted experience, and a tidy two-column footer. Maximum ATS safety. Build free on Cvyon.',
  },
  {
    id: 'Clarity',
    slug: 'clarity',
    name: 'Clarity',
    tagline: 'Accessibility-first: high contrast, large type, zero color-dependent meaning.',
    description:
      'Clarity was designed for maximum legibility: pure black text on white, a large base type size, bold unambiguous headings marked with a decorative accent square, underlined links, and wide section spacing. The accent color appears only on rules and markers, so nothing is lost if the resume is printed in grayscale.',
    bestFor: [
      'Healthcare professionals',
      'Teachers and trainers',
      'Anyone who wants maximum readability',
      'Government and NGO applications',
      'Experienced professionals who prefer plain, confident type',
    ],
    designTraits: [
      'Black-on-white high contrast with a large base type size',
      'Accent color used decoratively only — fully readable in grayscale',
      'Bold clear headings with square markers and underlined links',
      'Optional circular portrait; the header is clean without one',
    ],
    atsNotes:
      'Excellent for ATS: all meaning is carried by text rather than color, and the headings are standard words like Experience and Skills. The large type does not affect parsing — the underlying text layer is plain.',
    faqs: [
      {
        q: 'Is Clarity designed for low-vision readers?',
        a: 'It follows accessibility-first principles — strong contrast, generous type size, and wide spacing. It is comfortable for low-vision readers and easier for everyone else too.',
      },
      {
        q: 'Will the large type make my resume too long?',
        a: 'Clarity uses more space per line than compact templates. It suits one to two pages; if you must fit a long career on one page, use Condensed instead.',
      },
      {
        q: 'Does the accent color matter for ATS?',
        a: 'No. The accent appears only on decorative squares and rules — every word that matters is pure black text, which parsers read normally.',
      },
    ],
    metaTitle: 'Clarity Resume Template — Accessible & High-Contrast | Cvyon',
    metaDescription:
      'A free accessibility-first resume template: high contrast, large type, and decorative-only color. Readable by humans and ATS alike. Build free on Cvyon.',
  },
  {
    id: 'Condensed',
    slug: 'condensed',
    name: 'Condensed',
    tagline: 'Maximum content, minimum pages — small type, tight lines, total control.',
    description:
      'Condensed is built for long careers: compact 10–13px type, tight leading, small tracked section labels, and one-line-per-item entries that fit far more on a page than standard templates. Skills compress to a single comma-separated line, and dates tuck neatly to the right of every entry.',
    bestFor: [
      'Professionals with 15+ years of experience',
      'Consultants with many engagements',
      'Technical specialists with long skill lists',
      'Contractors with dense work histories',
      'Anyone who must fit everything on one page',
    ],
    designTraits: [
      'Compact 10–13px type with tight leading',
      'One-line entries with right-aligned dates',
      'Comma-separated single-line skills section',
      'Small tracked theme-color section labels with compact rules',
    ],
    atsNotes:
      'Dense but parseable: all text is real text and the headings are standard. Do not shrink the type below the defaults if a human will read it on screen — and never rasterize the PDF, or the small type becomes unsearchable.',
    faqs: [
      {
        q: 'Will recruiters dislike the small type?',
        a: 'It is compact, not microscopic, and the one-line entries scan quickly. Use it to land a genuine one-pager — two pages of Condensed defeats the purpose.',
      },
      {
        q: 'How much more fits compared to a standard template?',
        a: 'Roughly a third more content per page, thanks to the tighter leading and one-line entries. If your career still overflows, prioritize recent roles — no template fixes an unedited resume.',
      },
      {
        q: 'Is the small text still ATS-readable?',
        a: 'Yes. Parsers read the text layer, not the font size. The risk is only human readability, so keep the exported PDF digital rather than scanned.',
      },
    ],
    metaTitle: 'Condensed Resume Template — Fit More on One Page | Cvyon',
    metaDescription:
      'A free compact resume template for long careers: tight type, one-line entries, and single-line skills. Fit more on one page. Build free on Cvyon.',
  },
  {
    id: 'CorporateBlue',
    slug: 'corporate-blue',
    name: 'Corporate Blue',
    tagline: 'A navy-and-gold executive look for finance, consulting, and law.',
    description:
      'Corporate Blue opens with a full-bleed navy header band — your name in white, contact details tucked neatly to the right — then settles into a crisp single-column body with gold accents, pill-style skill tags, and a two-column education and skills section.',
    bestFor: [
      'Banking and finance professionals',
      'Management consultants',
      'Insurance and corporate legal staff',
      'Real estate executives',
      'Corporate administrators',
    ],
    designTraits: [
      'Full-bleed navy header band with a right-aligned contact block',
      'Navy-and-gold palette with pill-style skill tags',
      'Gold-accented section labels and bullet markers',
      'Two-column education and skills section',
    ],
    atsNotes:
      'The header band is a solid color block, so export as a digital PDF to keep the text selectable. The skill pills are bordered text rather than images, so they parse normally.',
    faqs: [
      {
        q: 'Can I change the navy color?',
        a: 'Yes — the theme color control recolors the header band, headings, and accents. The gold details stay fixed as a secondary accent.',
      },
      {
        q: 'Does the dark header band cause ATS problems?',
        a: 'Not when exported digitally: the white text on navy remains a real text layer. Avoid uploading a scanned or photographed copy, which can confuse OCR.',
      },
      {
        q: 'Is it suitable outside finance?',
        a: 'Yes for any corporate or client-facing role where polish matters. For creative fields, a template like Atelier or Marketing will fit the culture better.',
      },
    ],
    metaTitle: 'Corporate Blue Resume Template — Finance & Consulting | Cvyon',
    metaDescription:
      'A free navy-and-gold executive resume template with a full-bleed header band and skill pills. Built for finance and consulting. Build free on Cvyon.',
  },
  {
    id: 'Counsel',
    slug: 'counsel',
    name: 'Counsel',
    tagline: 'A brief-like serif resume with double hairline rules for legal minds.',
    description:
      'Counsel borrows the visual language of legal documents: a centered serif masthead, double hairline rules framing the body, theme-colored section titles in wide tracking, and justified body text with italic dates. Formal without feeling dated.',
    bestFor: [
      'Lawyers and attorneys',
      'Paralegals and legal assistants',
      'Compliance officers',
      'Judicial clerks',
      'Policy and regulatory professionals',
    ],
    designTraits: [
      'Double hairline rules framing the body, top and bottom',
      'Centered serif masthead with an italic job title',
      'Wide-tracked theme-colored section titles',
      'Justified body text with italic dates',
    ],
    atsNotes:
      'Justified text and hairline rules do not affect parsing. The headings use standard legal-resume wording such as Professional Experience and Education, which maps cleanly to ATS section detection.',
    faqs: [
      {
        q: 'Is Counsel only for lawyers?',
        a: 'It suits any field that values formality — compliance, public policy, and academia-adjacent roles all wear it well.',
      },
      {
        q: 'What is the difference between Counsel and Classic?',
        a: 'Both are traditional serif resumes. Counsel adds legal-document character — double hairline rules, justified text, and colored section titles — while Classic stays strictly black and white.',
      },
      {
        q: 'Can I list bar admissions and publications?',
        a: 'Yes — add them as custom sections. The justified serif body keeps long entries tidy, and the single-column flow handles multi-page documents.',
      },
    ],
    metaTitle: 'Counsel Resume Template — Legal & Formal | Cvyon',
    metaDescription:
      'A free legal-style resume template: serif type, double hairline rules, and justified text for lawyers and compliance professionals. Build free on Cvyon.',
  },
  {
    id: 'Diplomat',
    slug: 'diplomat',
    name: 'Diplomat',
    tagline: 'A refined, protocol-ready resume with a circular portrait and ornament dividers.',
    description:
      'Diplomat is composed like a formal introduction: a centered header with an optional circular portrait ringed in the theme color, a letter-spaced uppercase name, an italic summary, and a three-column footer for education, skills, and credentials.',
    bestFor: [
      'International relations professionals',
      'NGO and nonprofit staff',
      'Government and foreign service candidates',
      'Hospitality and luxury service roles',
      'Public-facing leadership positions',
    ],
    designTraits: [
      'Centered header with an optional circular portrait in a colored ring',
      'Letter-spaced uppercase name with a divider ornament',
      'Italic centered summary',
      'Three-column footer: education, skills, and credentials',
    ],
    atsNotes:
      'The portrait is optional — skip it for ATS-strict applications and the layout stays formal. Watch the three-column footer: older parsers can mis-order columns, so keep your critical keywords in the single-column body above it.',
    faqs: [
      {
        q: 'Should I include a photo on the Diplomat template?',
        a: 'Only where photos are customary, such as many international, NGO, and hospitality roles. Omit it for US corporate ATS pipelines, where photos are discouraged.',
      },
      {
        q: 'What is the default color?',
        a: 'A deep diplomatic navy, which you can change with the theme color control. The layout stays formal regardless of the accent you choose.',
      },
      {
        q: 'How is Diplomat different from Elegant?',
        a: 'Diplomat is more ceremonial — portrait ring, ornament divider, navy accents. Elegant is quieter and more minimal, with no photo emphasis.',
      },
    ],
    metaTitle: 'Diplomat Resume Template — Refined & Formal | Cvyon',
    metaDescription:
      'A free refined resume template with a circular portrait, ornament dividers, and a three-column footer. For NGO, government, and service roles. Build free.',
  },
  {
    id: 'Elegant',
    slug: 'elegant',
    name: 'Elegant',
    tagline: 'Quiet luxury: a light serif resume framed by fine double rules.',
    description:
      'Elegant whispers rather than shouts: a light-weight, letter-spaced name framed top and bottom by fine rules, muted gray tones, generous margins, and a three-column footer for education, skills, and references. It suits brands and roles where taste is the credential.',
    bestFor: [
      'Hospitality and luxury brand roles',
      'Communications and PR professionals',
      'Executive assistants',
      'Fashion and beauty industry',
      'Client-facing professional services',
    ],
    designTraits: [
      'Name framed by fine double horizontal rules',
      'Light serif type with wide letter-spacing',
      'Muted gray palette with generous whitespace',
      'Three-column footer for education, skills, and references',
    ],
    atsNotes:
      'The muted grays are dark enough for parsing, but keep body text at the default sizes — very light gray small text can drop out of OCR in scanned PDFs. Always submit the digital PDF, not a scan.',
    faqs: [
      {
        q: 'Is Elegant too subtle for applicant tracking systems?',
        a: 'No — the headings and body text are standard and parse normally. The subtlety is visual; the text layer underneath is completely conventional.',
      },
      {
        q: 'What roles suit Elegant best?',
        a: 'Roles where presentation is part of the job: hospitality, luxury retail, PR, executive assistance, and client-facing services.',
      },
      {
        q: 'Can I make it less gray?',
        a: 'The palette is intentionally muted. If you want warmth with more color, try Elegant Editorial or Diplomat instead.',
      },
    ],
    metaTitle: 'Elegant Resume Template — Quiet Luxury | Cvyon',
    metaDescription:
      'A free elegant resume template: light serif type, fine double rules, and muted tones for hospitality and luxury roles. Build free on Cvyon.',
  },
  {
    id: 'ElegantEditorial',
    slug: 'elegant-editorial',
    name: 'Elegant Editorial',
    tagline: 'A magazine-spread resume on warm paper for writers and editors.',
    description:
      'Elegant Editorial sets your resume like a magazine feature: warm cream paper, an italic light-weight headline name beneath a gradient rule with a diamond ornament, and a narrow sidebar for contact, skills, and education beside a roomy main column.',
    bestFor: [
      'Editors and copywriters',
      'Journalists and content strategists',
      'Publishing professionals',
      'Fashion and lifestyle brands',
      'Academics in the humanities',
    ],
    designTraits: [
      'Warm cream paper background with editorial serif type',
      'Gradient rules with a diamond ornament beneath the masthead',
      'Narrow sidebar for contact, skills, and education',
      'Optional circular portrait',
    ],
    atsNotes:
      'The diamond ornament and gradient rules are decorative and ignored by parsers. Note the reading order: some older parsers read the sidebar before the main column, so keeping skills in the sidebar — which this template does — actually helps keyword discovery.',
    faqs: [
      {
        q: 'Does the cream background cause printing problems?',
        a: 'No for digital PDFs. If you must print, use a good printer — on cheap black-and-white prints the cream renders as white, which is harmless.',
      },
      {
        q: 'Is it too decorative for serious applications?',
        a: 'For publishing, media, fashion, and the humanities it reads as fluent in the culture. For finance or government, choose Classic or Counsel.',
      },
      {
        q: 'How is it different from the Elegant template?',
        a: 'Elegant is minimal and monochrome; Elegant Editorial is warmer and more expressive — cream paper, ornaments, and a sidebar layout with an editorial voice.',
      },
    ],
    metaTitle: 'Elegant Editorial Resume Template — Writers | Cvyon',
    metaDescription:
      'A free editorial resume template on warm cream paper with a sidebar layout — for writers, editors, and publishing professionals. Build free on Cvyon.',
  },
  {
    id: 'Executive',
    slug: 'executive',
    name: 'Executive',
    tagline: "The authoritative serif standard — Cvyon's default for senior leaders.",
    description:
      'Executive is the boardroom classic: serif type, a thick 4px rule under the header, your name and title on the left with icon-accented contact details on the right, and a stately single-column flow. It is the default template for a reason — it signals seniority instantly and offends no one.',
    bestFor: [
      'C-suite executives and directors',
      'Senior managers',
      'Board and advisory candidates',
      'Finance and operations leaders',
      'Professionals with 10+ years of leadership experience',
    ],
    designTraits: [
      'Serif type with a thick 4px black rule under the header',
      'Split header: name and title on the left, icon contact list on the right',
      'Stately single-column layout with generous spacing',
      'Traditional section ordering with clear hierarchy',
    ],
    atsNotes:
      'The contact icons are vector glyphs beside plain text, so your details parse normally. A single-column serif body is ideal for ATS section detection — one of the safest layouts on Cvyon.',
    faqs: [
      {
        q: 'Do the contact icons confuse applicant tracking systems?',
        a: 'No. The icons are decorative glyphs next to plain text — parsers read your email, phone, and location as normal text.',
      },
      {
        q: 'Is Executive only for C-level candidates?',
        a: 'It suits any senior professional: directors, VPs, senior managers, and experienced individual contributors who want a commanding, traditional presence.',
      },
      {
        q: 'How is Executive different from Executive Split?',
        a: 'Executive is single-column and maximally conservative. Executive Split adds a two-column body and a full-width header band for leaders who need more room and a stronger visual statement.',
      },
      {
        q: 'Can a mid-career professional use it?',
        a: 'Yes, but the stately spacing favors longer careers. Mid-career candidates who want a tighter page should look at Caliber or Minimalist Split.',
      },
    ],
    metaTitle: 'Executive Resume Template — Senior Leaders | Cvyon',
    metaDescription:
      "A free executive resume template: serif type, a bold header rule, and a stately single-column layout. Cvyon's default for senior leaders. Build free.",
  },
  {
    id: 'ExecutiveSplit',
    slug: 'executive-split',
    name: 'Executive Split',
    tagline: 'A two-column executive layout with a commanding full-width header band.',
    description:
      'Executive Split gives senior candidates more room: a full-width header band with a 6px black rule and an icon contact row, then a 65/35 split — your Executive Profile and experience in the main column, supporting details in the sidebar. Company names lead each experience entry, with square bullets for achievements.',
    bestFor: [
      'Senior executives with long track records',
      'Directors and VPs',
      'Consultants with varied engagements',
      'Board candidates',
      'Leaders who want skills and highlights visible at a glance',
    ],
    designTraits: [
      'Full-width header band with a 6px black rule',
      '65/35 two-column body with an "Executive Profile" lead section',
      'Serif type with an icon-accented contact row',
      'Company-first experience entries with square bullets',
    ],
    atsNotes:
      'Two-column layouts can occasionally scramble reading order in older parsers. The main column carries your profile and experience, so keyword coverage survives; for maximum safety on strict portals, consider the single-column Executive instead.',
    faqs: [
      {
        q: 'What goes in the sidebar?',
        a: 'Supporting details — skills, education, certifications — while the main column carries your profile, experience, and achievements.',
      },
      {
        q: 'Is the two-column layout ATS-safe?',
        a: 'Modern systems handle it well. If you are applying through an older or very strict portal, the single-column Executive template is the safer choice.',
      },
      {
        q: 'How is it different from Minimalist Split?',
        a: 'Executive Split is traditional and serif with a header band; Minimalist Split is modern and sans with a solid color sidebar. Choose Split for gravitas, Minimalist for a contemporary edge.',
      },
    ],
    metaTitle: 'Executive Split Resume Template — Two-Column | Cvyon',
    metaDescription:
      'A free two-column executive resume template with a full-width header band and an Executive Profile section. For senior leaders. Build free on Cvyon.',
  },
  {
    id: 'Forge',
    slug: 'forge',
    name: 'Forge',
    tagline: 'An industrial-strength resume in heavy black type with bold color bars.',
    description:
      'Forge is built like it sounds: font-black uppercase headings, thick theme-color rules, a hero strip for certifications and licenses rendered as bordered cards, and ticket-style skill tags. It projects capability for hands-on, technical, and operational fields.',
    bestFor: [
      'Engineers and technicians',
      'Skilled trades and manufacturing',
      'Operations and logistics professionals',
      'IT infrastructure and support staff',
      'Project managers in industrial sectors',
    ],
    designTraits: [
      'Font-black uppercase headings with thick theme-color rules',
      'Certifications and licenses hero strip with bordered cards',
      'Ticket-style skill tags',
      'Single-column, high-density sans-serif layout',
    ],
    atsNotes:
      'All-caps headings parse fine — applicant tracking systems normalize case. The bordered credential cards are plain text in boxes, so every certification stays searchable. Keep the theme color dark enough that the exported PDF stays high-contrast.',
    faqs: [
      {
        q: 'Do all-caps headings hurt ATS parsing?',
        a: 'No. Parsers normalize case, so "WORK EXPERIENCE" reads the same as "Work Experience". The heavy type is purely visual.',
      },
      {
        q: 'What is the certifications hero strip?',
        a: 'When you enable certifications in the builder, they appear in bordered cards near the top — ideal for licensed trades, safety credentials, and technical certs that employers screen for first.',
      },
      {
        q: 'Is Forge suitable for software engineers?',
        a: 'Yes — the dense, structured layout suits technical resumes. If you want something less heavy, Tech Pro or Minimalist Split are calmer alternatives.',
      },
    ],
    metaTitle: 'Forge Resume Template — Engineering & Trades | Cvyon',
    metaDescription:
      'A free industrial resume template with heavy black type, bold color bars, and a certifications hero strip. For engineers and trades. Build free on Cvyon.',
  },
  {
    id: 'Founder',
    slug: 'founder',
    name: 'Founder',
    tagline: 'A startup-native resume with a "Thesis" and a "Ventures" section.',
    description:
      'Founder speaks startup: your summary becomes a "Thesis" set with a bold left border, projects become "Ventures", and the header pairs an optional photo with a confident single-column layout under a thick theme rule.',
    bestFor: [
      'Startup founders and co-founders',
      'Early startup hires',
      'Product managers',
      'Venture and accelerator applicants',
      'Entrepreneurs returning to employment',
    ],
    designTraits: [
      '"Thesis" summary with a bold left-border callout',
      '"Ventures" projects section',
      'Optional photo with a thick theme-color rule',
      'Clean sans-serif single-column layout',
    ],
    atsNotes:
      '"Thesis" and "Ventures" are stylish labels — naive section detectors look for "Summary" and "Projects", but all of your content is present as plain text and parses normally. Human readers in startup ecosystems will get it instantly.',
    faqs: [
      {
        q: 'Will recruiters understand the "Thesis" and "Ventures" labels?',
        a: 'In startup ecosystems, yes — they read as fluent. For traditional corporate applications, consider Executive or Classic with conventional headings.',
      },
      {
        q: 'I have failed startups — should I list them?',
        a: 'Yes. Founders are judged on what they shipped and learned. The Ventures section is designed for exactly this: name, link, and a concise description of each.',
      },
      {
        q: 'Is the photo required?',
        a: 'No — it only appears if you upload one. The header works equally well as pure type.',
      },
    ],
    metaTitle: 'Founder Resume Template — Startups | Cvyon',
    metaDescription:
      'A free founder resume template with a "Thesis" summary and "Ventures" section. Startup-native and confident. Build free on Cvyon.',
  },
  {
    id: 'Gigfolio',
    slug: 'gigfolio',
    name: 'Gigfolio',
    tagline: 'A freelancer-first resume with a giant name and portfolio energy.',
    description:
      'Gigfolio is built for people who sell their work: a bold top accent bar, an enormous 6xl black name, an optional rounded portrait, and a layout that gives projects and skills prime placement for client-facing credibility.',
    bestFor: [
      'Freelancers and independent contractors',
      'Designers and developers for hire',
      'Consultants',
      'Creatives with portfolio careers',
      'Gig workers applying to platforms and agencies',
    ],
    designTraits: [
      'Oversized 6xl black name beneath a bold accent bar',
      'Optional rounded portrait beside the masthead',
      'Project-forward section ordering',
      'Bold sans-serif with strong visual hierarchy',
    ],
    atsNotes:
      'Freelance-friendly and parser-friendly: single column, plain text, standard headings. When your audience is a client rather than an ATS, the big name and accent bar make the PDF memorable as an attachment.',
    faqs: [
      {
        q: 'How should freelancers list many short gigs?',
        a: 'Group them under one heading — e.g. "Independent Designer, 2021–Present" — with client highlights as bullets. Gigfolio\'s project-forward layout supports this well.',
      },
      {
        q: 'Is the huge name unprofessional?',
        a: 'For freelancers, name recognition is the product. For conservative corporate roles, choose a quieter template like Classic or Executive.',
      },
      {
        q: 'Can I link my portfolio?',
        a: 'Yes — add your website in the contact details and link individual projects in the projects section. Links render as real, clickable text in the PDF.',
      },
    ],
    metaTitle: 'Gigfolio Resume Template — Freelancers | Cvyon',
    metaDescription:
      'A free freelancer resume template with a bold accent bar, oversized name, and project-forward layout. For independents and creatives. Build free on Cvyon.',
  },
  {
    id: 'Launchpad',
    slug: 'launchpad',
    name: 'Launchpad',
    tagline: "The graduate's resume: education first, with a welcoming color header.",
    description:
      'Launchpad is designed for the start of a career: a colored header band with your photo and contact details, an "About Me" opener, and education promoted to the hero section with a highlighted left border — because your degree is your strongest card right now.',
    bestFor: [
      'Recent graduates',
      'Students and interns',
      'Career starters with limited experience',
      'Bootcamp graduates',
      'Entry-level applicants',
    ],
    designTraits: [
      'Colored header band with a circular photo',
      'Education promoted to the hero section with a highlight border',
      '"About Me" opener instead of a formal summary',
      'Friendly rounded type with clear section labels',
    ],
    atsNotes:
      'The education-first order is a genuine advantage with campus recruiting systems, which screen on degree and graduation date. The header band is a solid color block — export as a digital PDF so the text layer stays selectable.',
    faqs: [
      {
        q: 'I have no work experience — will my resume look empty?',
        a: 'The template is designed for exactly that: education, projects, and skills carry the page, and the "About Me" opener frames your direction. Add internships, coursework projects, and volunteer work.',
      },
      {
        q: 'Should graduates really put education first?',
        a: 'Yes, while your degree is your strongest credential. Once you have two to three years of experience, move experience first — templates like Caliber or Minimalist Split suit that stage.',
      },
      {
        q: 'Is the photo expected?',
        a: 'It is optional and renders only if you upload one. Include it where photos are customary; leave it out for ATS-heavy graduate schemes that discourage them.',
      },
    ],
    metaTitle: 'Launchpad Resume Template — Graduates | Cvyon',
    metaDescription:
      'A free graduate resume template with education first, an "About Me" opener, and a welcoming header band. For students and entry-level. Build free on Cvyon.',
  },
  {
    id: 'Maitre',
    slug: 'maitre',
    name: 'Maître',
    tagline: 'Warm, service-minded elegance on cream paper for hospitality careers.',
    description:
      "Maître brings hospitality polish: warm cream paper, a centered serif name with an italic title, a diamond-ornament divider in the theme color, and an optional circular portrait. Refined without stiffness — the resume equivalent of a well-set table.",
    bestFor: [
      'Hotel and restaurant professionals',
      'Chefs and culinary staff',
      'Event planners',
      'Customer experience roles',
      'Luxury retail staff',
    ],
    designTraits: [
      'Warm cream paper with a centered serif masthead',
      'Diamond-ornament divider in the theme color',
      'Optional circular portrait',
      'Italic titles with warm neutral tones',
    ],
    atsNotes:
      'The diamond ornament is decorative and ignored by parsers. Cream backgrounds are fine in digital PDFs; if a portal requires pure-white scans, the text contrast still holds up.',
    faqs: [
      {
        q: 'Is Maître only for restaurants?',
        a: 'It suits the whole service world — hotels, events, luxury retail, customer experience. The warmth reads as hospitality fluency.',
      },
      {
        q: 'Will the cream paper look odd printed in black and white?',
        a: 'No — it renders as white on monochrome printers, and the dark text stays crisp. For digital applications it stays a soft cream.',
      },
      {
        q: 'How is it different from Diplomat?',
        a: 'Both are formal and centered, but Maître is warmer and service-oriented — cream paper, italic titles — while Diplomat is cooler and more ceremonial.',
      },
    ],
    metaTitle: 'Maître Resume Template — Hospitality | Cvyon',
    metaDescription:
      'A free hospitality resume template on warm cream paper with a diamond divider and serif masthead. For hotels, restaurants, and events. Build free on Cvyon.',
  },
  {
    id: 'Marketing',
    slug: 'marketing',
    name: 'Marketing',
    tagline: 'A campaign-style resume with slash markers, pill dates, and project cards.',
    description:
      'Marketing looks like the work it sells: slash (/) section markers, pill-shaped date badges, and project cards in a two-column grid with rounded corners. A rotated monogram block anchors the header — this is a resume with a point of view.',
    bestFor: [
      'Marketing managers and specialists',
      'Social media managers',
      'Brand and content marketers',
      'Growth and SEO professionals',
      'PR and communications staff',
    ],
    designTraits: [
      'Slash (/) section markers with pill-shaped date badges',
      'Two-column project cards with rounded corners',
      'Rotated monogram block in the header',
      'Bold sans-serif with an energetic hierarchy',
    ],
    atsNotes:
      'The project cards sit in a two-column grid — keep project titles keyword-rich, since older parsers can read them out of order. The date pills are plain text and parse normally.',
    faqs: [
      {
        q: 'Is the Marketing template too playful for senior roles?',
        a: 'For senior marketing leadership it reads as on-brand. For CMO-level applications at conservative companies, Executive or Corporate Blue carry more weight.',
      },
      {
        q: 'How should I use the project cards?',
        a: 'Treat each card like a mini case study: campaign name, link, and one to two lines on the outcome. Metrics in the description — not invented, real ones — do the heavy lifting.',
      },
      {
        q: 'Does the two-column project grid hurt ATS?',
        a: 'Modern systems handle it. Keep each card\'s title descriptive on its own, so nothing important is lost if an older parser reads the grid out of order.',
      },
    ],
    metaTitle: 'Marketing Resume Template — Bold & Creative | Cvyon',
    metaDescription:
      'A free marketing resume template with slash markers, pill dates, and project cards. Campaign energy for marketers. Build free on Cvyon.',
  },
  {
    id: 'Mentor',
    slug: 'mentor',
    name: 'Mentor',
    tagline: 'An education-first resume for teachers, coaches, and trainers.',
    description:
      'Mentor leads with learning: after a clean photo header with a thick theme rule, education comes before experience, certifications become "Credentials" cards with dot markers, and the profile reads in a warm italic. Built for people whose job is helping others grow.',
    bestFor: [
      'Teachers and lecturers',
      'Tutors and coaches',
      'Corporate trainers',
      'Instructional designers',
      'Education administrators',
    ],
    designTraits: [
      'Education placed before experience',
      '"Credentials" cards with dot markers',
      'Photo header with a thick theme-color rule',
      'Warm italic profile text',
    ],
    atsNotes:
      'Education-first ordering matches how schools and training organizations screen. "Credentials" may not match an ATS filter literally looking for "Certifications", but the card text — name, issuer, date — parses as plain searchable text.',
    faqs: [
      {
        q: 'Should teachers put education before experience?',
        a: 'Generally yes — schools screen on qualifications first. Once your teaching record outweighs your degrees, any experience-first template works just as well.',
      },
      {
        q: 'What counts as a credential here?',
        a: 'Teaching licenses, coaching certifications, first-aid and safeguarding certs, trainer accreditations — anything an employer would verify. Each renders as a clear card with issuer and date.',
      },
      {
        q: 'Is the photo required?',
        a: 'No. It appears only if you upload one; the thick theme rule and header carry the design without it.',
      },
    ],
    metaTitle: 'Mentor Resume Template — Teachers & Coaches | Cvyon',
    metaDescription:
      'A free education-first resume template with credential cards for teachers, coaches, and trainers. Warm and professional. Build free on Cvyon.',
  },
  {
    id: 'MinimalistSplit',
    slug: 'minimalist-split',
    name: 'Minimalist Split',
    tagline: 'A bold sidebar resume: solid color column, crisp white content.',
    description:
      'Minimalist Split makes a confident first impression: a solid theme-color sidebar holding your name, contact details, and skills beside a clean white main column for experience and education. Modern, compact, and unmistakable in a stack of lookalike resumes.',
    bestFor: [
      'Tech professionals',
      'Designers',
      'Startup applicants',
      'One-page resume fans',
      'Anyone who wants to stand out in a stack',
    ],
    designTraits: [
      'Solid theme-color sidebar (35%) with name, contact, and skills',
      'Clean white main column for experience and education',
      'Initial-badge monogram in the sidebar',
      'High-contrast, compact one-page feel',
    ],
    atsNotes:
      'The sidebar is the tradeoff: it looks striking, but some older parsers read the sidebar before the main column, which can reorder your content. Modern systems handle it well; for strict portals, pair this look with a single-column template like Clarity or Classic.',
    faqs: [
      {
        q: 'Does the colored sidebar cause ATS problems?',
        a: 'With modern applicant tracking systems, no. Very old parsers can read the sidebar first, reordering your content — if you are worried, use a single-column template for that application.',
      },
      {
        q: 'Can I change the sidebar color?',
        a: 'Yes — the theme color control recolors the entire sidebar. Dark, saturated colors keep the white text crisp; avoid pale colors that wash out the text.',
      },
      {
        q: 'Is it really one page?',
        a: 'It is designed to feel like one page. Concise careers fit beautifully; long careers will flow to two pages, where the sidebar simply continues.',
      },
      {
        q: 'How is it different from Executive Split?',
        a: 'Minimalist Split is modern and sans with a solid color sidebar; Executive Split is traditional and serif with a header band and a white two-column body.',
      },
    ],
    metaTitle: 'Minimalist Split Resume Template — Modern Sidebar | Cvyon',
    metaDescription:
      'A free modern resume template with a bold color sidebar and clean white content column. For tech and startups. Build free on Cvyon.',
  },
  {
    id: "ModernGradient",
    slug: "modern-gradient",
    name: "Modern Gradient",
    tagline: "A vibrant, card-style resume with a colorful header and friendly, app-like sections.",
    description:
      "Modern Gradient opens with a rounded, full-color header card in your chosen accent color (indigo by default) and lays the rest of the page out as clean bordered cards. Section headers carry small emoji badges, experience entries sit in individual cards, and skills get visual progress bars. The result feels modern and approachable — more like a polished portfolio site than a paper form.",
    bestFor: [
      "software engineers and designers",
      "marketing and social media professionals",
      "startup job applicants",
      "recent graduates",
      "interns and early-career candidates",
      "creative tech roles",
    ],
    designTraits: [
      "rounded full-color header card with circular photo and initials fallback",
      "experience entries presented as individual bordered cards",
      "emoji badges on section headers",
      "skills shown with progress bars",
      "two-column bottom zone for skills, education and contact",
    ],
    atsNotes:
      "The reading order is a single top-to-bottom flow and all headings use standard labels like “Work Experience”, “Skills”, “Education” and “Contact”, which parsing software handles well. Two honest caveats: the emoji badges on the section headers and the skill progress bars are visual extras that older parsers may skip or misread — your words all come through as real text, so the substance is safe.",
    faqs: [
      {
        q: "Is Modern Gradient too colorful for traditional industries?",
        a: "It can be. The default indigo header is tasteful, but for banking, law or government roles you may prefer a plainer option like ParsePerfect or Swiss Minimal. For tech, startups and creative roles, the color is a plus.",
      },
      {
        q: "Do the skill bars mean anything to recruiters?",
        a: "They are visual emphasis only — there is no hidden data behind them. List the skills you genuinely have; the bars just make the section easy to scan.",
      },
      {
        q: "Can I change the header color?",
        a: "Yes. The accent color follows your Cvyon theme settings, so the same resume can be recolored to match different company brands or your personal site.",
      },
      {
        q: "Will the emoji badges hurt ATS parsing?",
        a: "The section titles themselves (“Work Experience”, “Skills”) are plain text, so parsers read them fine. Very old systems might render the emoji as blanks, but nothing is lost — no information lives only inside an icon.",
      },
    ],
    metaTitle: "Modern Gradient Resume Template — Free, ATS-Friendly | Cvyon",
    metaDescription:
      "Free Modern Gradient resume template: a colorful card-style design with skill bars, ideal for tech and startup roles. Build yours in minutes.",
  },
  {
    id: "NightShift",
    slug: "night-shift",
    name: "Night Shift",
    tagline: "Credentials first, experience second — a calm single-column resume for shift and clinical workers.",
    description:
      "Night Shift is built around one unusual choice: Certifications & Licenses comes before Work Experience, with each credential shown as a bordered card in a two-column grid. A centered header, pill-style skill tags and a tidy references grid keep everything easy to scan during a busy hiring round.",
    bestFor: [
      "nurses and midwives",
      "healthcare assistants and caregivers",
      "pharmacists and lab technicians",
      "security and facilities staff",
      "hospitality shift workers",
      "licensed or certified professionals",
    ],
    designTraits: [
      "centered single-column layout",
      "certifications-first section order in a two-column card grid",
      "pill-style skill tags",
      "muted gray palette with a themeable accent (blue by default)",
      "references laid out in a two-column grid",
    ],
    atsNotes:
      "Everything reads top to bottom in one column with real text and standard headings, which is exactly what applicant tracking systems parse best. The certification cards are simple bordered boxes, not images or graphics, so every credential is extracted as text. The only decorative elements are the card borders and pill backgrounds — content is never embedded in an image.",
    faqs: [
      {
        q: "Why do certifications come first in this template?",
        a: "Because in licensed fields — nursing, pharmacy, lab work — the credential is often the first screening filter. Putting it at the top answers the hiring manager's first question immediately.",
      },
      {
        q: "I do not have certifications. Should I still use it?",
        a: "You can, but you would be leaving the template's signature feature unused. If licenses are not central to your field, consider Polyglot or Modern Gradient instead.",
      },
      {
        q: "Does it work for non-healthcare shift work?",
        a: "Yes. The layout suits any role where credentials, clearances or shift availability matter — security, facilities, hospitality and manufacturing, for example.",
      },
      {
        q: "Is the centered header a problem for ATS?",
        a: "No. Centered text is still plain text in reading order, so parsers extract your name, title and contact details normally.",
      },
    ],
    metaTitle: "Night Shift Resume Template — Free, ATS-Friendly | Cvyon",
    metaDescription:
      "Free Night Shift resume template: certifications-first layout with card-style credentials. Ideal for nurses, caregivers and licensed professionals.",
  },
  {
    id: "Noir",
    slug: "noir",
    name: "Noir",
    tagline: "A dramatic dark-mode resume for people who want to be remembered.",
    description:
      "Noir inverts the usual resume: a near-black page with light text, an editorial header, and a single colored accent rule for contrast. The sections use magazine-style labels — Profile, Experience, Education, Skills, Projects, Certifications, References — arranged in one calm column with no photo.",
    bestFor: [
      "designers and art directors",
      "photographers and videographers",
      "creative directors",
      "portfolio-led creative roles",
      "direct applications and email submissions",
    ],
    designTraits: [
      "dark near-black page background with light text",
      "editorial header with a single accent rule",
      "magazine-style section labels",
      "single-column layout with no photo",
      "one restrained accent color against monochrome",
    ],
    atsNotes:
      "Honest assessment: Noir is the least ATS-safe template in this collection. Dark backgrounds can confuse some parsers and print poorly on office printers, so it is best for direct applications, email attachments and portfolio submissions where a human opens the file — not for uploading into large corporate applicant tracking systems. All text is real and selectable, so nothing is hidden, but parsing order and color contrast are not guaranteed in every system.",
    faqs: [
      {
        q: "Will Noir work if I upload it to a job portal?",
        a: "It will upload fine, but automated parsing of dark-background PDFs is less reliable than with a plain template. For portals, pair it with ParsePerfect, or submit Noir directly to the hiring manager by email.",
      },
      {
        q: "Will it print well?",
        a: "Not on a standard office printer — a black background eats toner and can look muddy. Noir is a screen-first template.",
      },
      {
        q: "Who is it really for?",
        a: "Creatives whose work is the application: designers, photographers, art directors. The dark canvas makes the resume itself part of the portfolio.",
      },
    ],
    metaTitle: "Noir Resume Template — Free, Dark & Bold | Cvyon",
    metaDescription:
      "Free Noir resume template: a striking dark-mode, editorial design. Best for designers and creatives applying directly — build yours in minutes.",
  },
  {
    id: "Nomad",
    slug: "nomad",
    name: "Nomad",
    tagline: "A remote-first resume that literally badges you as remote-ready.",
    description:
      "Nomad watches for remote signals: if your location or summary mentions remote work, a “Remote” badge appears under your name in the accent color. Skills get their own “Remote Stack” section rendered as clean tags, and the header keeps your photo, title and contact details in one confident row.",
    bestFor: [
      "remote software engineers",
      "digital marketers working remotely",
      "customer support specialists",
      "freelancers and contractors",
      "virtual assistants",
      "anyone targeting fully remote roles",
    ],
    designTraits: [
      "automatic “Remote” badge when remote work is mentioned",
      "“Remote Stack” tag-style skills section",
      "photo in the centered header",
      "single-column layout with a contact row",
      "themeable accent color (blue by default)",
    ],
    atsNotes:
      "Single column, standard section labels, real text throughout — parsers handle it cleanly. The “Remote” badge is plain text, not a graphic, so it is extracted like any other line. The tag-style skills are individual text elements, which most modern parsers read left to right without trouble.",
    faqs: [
      {
        q: "How does the Remote badge appear?",
        a: "If the word “remote” appears in your location field or summary, the template automatically adds a Remote line under your name. Leave it out and the badge stays hidden.",
      },
      {
        q: "Is it only for remote jobs?",
        a: "It shines for remote applications, but the layout works for any role — just skip the remote wording and the badge disappears.",
      },
      {
        q: "Will the badge help with keyword searches?",
        a: "It cannot hurt: “remote” appears as real text on the page, which is exactly what recruiter searches look for.",
      },
    ],
    metaTitle: "Nomad Resume Template — Free Remote-Work CV | Cvyon",
    metaDescription:
      "Free Nomad resume template: a remote-first design with an automatic Remote badge and Remote Stack skills. Ideal for remote job seekers.",
  },
  {
    id: "ParsePerfect",
    slug: "parse-perfect",
    name: "ParsePerfect",
    tagline: "The no-frills, parser-proof resume for maximum ATS compatibility.",
    description:
      "ParsePerfect is engineered for one job: getting through applicant tracking systems cleanly. Plain black Helvetica text, a single column, uppercase underlined section headings, and skills written as a simple comma-separated line — no icons, no graphics, no photo, nothing for a parser to trip on.",
    bestFor: [
      "large corporate applications",
      "government and civil service roles",
      "banking and finance",
      "any online job portal",
      "high-volume applications",
      "candidates who want zero formatting risk",
    ],
    designTraits: [
      "plain black text on white, no graphics",
      "single-column layout",
      "uppercase section headings with underline rules",
      "skills as a comma-separated text line",
      "no photo, no icons, no decorative elements",
    ],
    atsNotes:
      "This is the safest template in the collection for automated screening: one column, standard heading labels, a comma-separated skills line, and zero decorative graphics or text embedded in images. There is genuinely nothing here that requires special handling from a parser.",
    faqs: [
      {
        q: "Is it too plain for a human reader?",
        a: "It is plain by design, but also perfectly readable — clear hierarchy, comfortable line spacing and underlined headings. Many recruiters prefer this; the plainness signals you take the process seriously.",
      },
      {
        q: "Can I add a photo?",
        a: "ParsePerfect has no photo slot, deliberately — photos can confuse parsers and are discouraged in many markets. Use Portrait or Showcase if a photo matters to you.",
      },
      {
        q: "When should I choose ParsePerfect over Polyglot?",
        a: "When the application goes through an unknown or strict portal. If a human will definitely read it, Polyglot gives you the same structure with more warmth.",
      },
    ],
    metaTitle: "ParsePerfect Resume Template — Free, ATS-Friendly | Cvyon",
    metaDescription:
      "Free ParsePerfect resume template: the parser-proof, single-column design for job portals. Maximum ATS compatibility, zero formatting risk.",
  },
  {
    id: "Pivot",
    slug: "pivot",
    name: "Pivot",
    tagline: "Skills first, history second — the resume for career changers.",
    description:
      "Pivot leads with what you can do, not where you have been. Your skills are automatically grouped into three labeled clusters — Technical, Leadership and Domain — displayed side by side, so transferable strengths reach the reader before your work history. Only then does “Work History” appear, followed by education, projects and certifications.",
    bestFor: [
      "career changers",
      "professionals returning after a break",
      "military veterans entering civilian work",
      "bootcamp graduates",
      "consultants reframing experience",
      "internal role switchers",
    ],
    designTraits: [
      "skills-first layout with three labeled clusters (Technical, Leadership, Domain)",
      "work history placed after competencies",
      "single-column flow",
      "underlined section titles in the accent color",
      "clean, uncluttered spacing",
    ],
    atsNotes:
      "Single-column reading order with standard labels keeps parsing straightforward. One thing to know: your skills are visually grouped into three clusters, and some parsers may read them column by column rather than in your original list order — the words are all captured, just possibly out of sequence. For maximum keyword matching, keep the skill names themselves simple and standard.",
    faqs: [
      {
        q: "How are the three skill clusters decided?",
        a: "Your skills are split evenly into the Technical, Leadership and Domain groups in the order you list them, so put your most relevant skills first to land them in the right cluster.",
      },
      {
        q: "Will recruiters miss my job titles?",
        a: "No — Work History is still there with full details. It simply comes after your competencies, which is the right emphasis when your past titles do not match your target role.",
      },
      {
        q: "Is Pivot good for a complete industry switch?",
        a: "That is exactly its purpose: the competency-first structure lets a hiring manager see your transferable value before noticing the unfamiliar job titles.",
      },
    ],
    metaTitle: "Pivot Resume Template — Free Career-Change CV | Cvyon",
    metaDescription:
      "Free Pivot resume template: a skills-first design with clustered competencies for career changers. Reframe your experience with confidence.",
  },
  {
    id: "Polyglot",
    slug: "polyglot",
    name: "Polyglot",
    tagline: "A spacious, reader-friendly single column with room to breathe.",
    description:
      "Polyglot is the human-reader counterpart to ParsePerfect: the same honest single-column structure, but with a larger name, softer grays, generous whitespace and section headings in your accent color with underline rules. Skills appear as outlined tag pills that are easy to scan without looking busy.",
    bestFor: [
      "international applicants",
      "customer-facing roles",
      "project managers",
      "analysts and researchers",
      "nonprofit and NGO roles",
      "anyone who wants warmth without clutter",
    ],
    designTraits: [
      "spacious single-column layout",
      "large name with soft gray tones",
      "accent-colored underlined section headings",
      "skills as outlined tag pills",
      "generous whitespace and line spacing",
    ],
    atsNotes:
      "One column, real text, standard headings — parsing is clean. The outlined skill tags are text in bordered boxes, which modern parsers extract without issue. There is no photo, no iconography and no multi-column content, so it is a safe all-rounder for portals while remaining pleasant for human readers.",
    faqs: [
      {
        q: "How is Polyglot different from ParsePerfect?",
        a: "ParsePerfect is stripped to the bone for maximum parser safety; Polyglot keeps the same single-column structure but adds breathing room, color accents and tag-style skills for a friendlier read.",
      },
      {
        q: "Is it good for applications abroad?",
        a: "Yes — the clean, uncluttered layout travels well across hiring cultures, and there is no photo slot, which many European and North American employers prefer.",
      },
      {
        q: "Does the extra whitespace waste space?",
        a: "It uses space deliberately: the airy layout makes a dense career easy to scan, which is an advantage when a recruiter spends seconds on the first pass.",
      },
    ],
    metaTitle: "Polyglot Resume Template — Free, ATS-Friendly | Cvyon",
    metaDescription:
      "Free Polyglot resume template: a spacious single-column design with tag-style skills. A safe, readable choice for portals and humans alike.",
  },
  {
    id: "Portrait",
    slug: "portrait",
    name: "Portrait",
    tagline: "A photo-forward sidebar resume with a confident left rail.",
    description:
      "Portrait gives your photo pride of place in a left rail alongside your contact details, skills and education, while the main column carries your name, title, profile and experience. It reads like a speaker bio page — personal, polished and easy to skim.",
    bestFor: [
      "actors, models and performers",
      "hospitality and front-of-house roles",
      "real estate agents",
      "sales professionals",
      "personal trainers and coaches",
      "client-facing roles where a photo is expected",
    ],
    designTraits: [
      "left sidebar rail with photo, contact, skills and education",
      "main column for name, title, profile and experience",
      "section titles in the accent color",
      "photo-first layout",
      "two-column structure with a narrow rail",
    ],
    atsNotes:
      "Be aware that the two-column sidebar layout is harder for some applicant tracking systems to parse in the right order — sidebar content can be read out of sequence. Portrait is ideal for direct applications and email submissions where a person reads it; for job portals, choose a single-column template like ParsePerfect or Polyglot. The photo itself is an image file, so it is invisible to parsers by design.",
    faqs: [
      {
        q: "Is a photo on a resume a good idea?",
        a: "It depends on your market: expected in hospitality, real estate and entertainment in many countries, discouraged in US corporate hiring. Use Portrait where photos are the norm.",
      },
      {
        q: "What if I do not upload a photo?",
        a: "The rail still works — contact, skills and education fill the space — but the template's signature look is photo-led, so consider Showcase's subtler layout instead.",
      },
      {
        q: "Will the sidebar confuse recruiters?",
        a: "No — humans read sidebars naturally. The caution is only about automated parsers, which is why we recommend it for direct applications.",
      },
    ],
    metaTitle: "Portrait Resume Template — Free Photo CV | Cvyon",
    metaDescription:
      "Free Portrait resume template: a photo-forward sidebar design for client-facing roles. Ideal for real estate, hospitality and sales.",
  },
  {
    id: "Rainmaker",
    slug: "rainmaker",
    name: "Rainmaker",
    tagline: "A metrics-forward resume for closers who sell on numbers.",
    description:
      "Rainmaker is built for salespeople: your summary becomes a “Track Record” callout with an accent border, section titles render as bold colored chips, and every bullet gets a hanging indent with a marker that draws the eye down the line — perfect for quota figures and revenue lines. Experience, Core Competencies, Projects, Certifications, Education and References follow in a single confident column, with an optional photo up top.",
    bestFor: [
      "account executives and sales reps",
      "business development managers",
      "real estate agents",
      "recruiters",
      "insurance and financial advisors",
      "any quota-carrying role",
    ],
    designTraits: [
      "“Track Record” summary callout with accent border",
      "section titles as colored label chips",
      "hanging-indent bullets with accent markers",
      "optional photo in the header",
      "single-column, high-contrast layout",
    ],
    atsNotes:
      "The reading order is a clean single column with standard section labels, so the text parses well. The colored label chips and bullet markers are decorative — your words are all real text. Write your metrics as plain numbers in the bullet text (for example, “Exceeded quota by 132%”) rather than relying on any visual, and parsers will capture them exactly.",
    faqs: [
      {
        q: "How should I write my numbers in this template?",
        a: "As plain text inside your bullets — revenue, quota attainment, pipeline size. The template's job is to make those lines visually prominent; the figures themselves should read naturally in a sentence.",
      },
      {
        q: "Is it too aggressive for non-sales roles?",
        a: "The design language is sales-coded. For account management or customer success it still works; for engineering or finance, pick something quieter.",
      },
      {
        q: "Does the photo help or hurt?",
        a: "It is optional and common in fields like real estate and insurance. In markets where photos are discouraged, simply leave it out — the layout stands on its own.",
      },
    ],
    metaTitle: "Rainmaker Resume Template — Free Sales CV | Cvyon",
    metaDescription:
      "Free Rainmaker resume template: a metrics-forward sales design with a Track Record callout. Built for closers who sell on numbers.",
  },
  {
    id: "Reentry",
    slug: "reentry",
    name: "Reentry",
    tagline: "A narrative-first resume for professionals coming back.",
    description:
      "Reentry is designed for the return: your Profile section leads the page with an accent rule beneath it, telling your story before any dates appear. A “Strengths” section of soft pill tags follows, then Experience, Projects, and a combined “Education & Certifications” section that showcases fresh upskilling. Warm neutrals keep the tone encouraging, never apologetic.",
    bestFor: [
      "parents returning to work",
      "caregivers re-entering the workforce",
      "professionals after a sabbatical",
      "career restarters",
      "freelancers going permanent",
      "anyone with an employment gap to own confidently",
    ],
    designTraits: [
      "Profile section leads before experience, with accent rule",
      "“Strengths” pill-tag skills section",
      "combined “Education & Certifications” section",
      "warm neutral palette",
      "optional photo in the header",
    ],
    atsNotes:
      "Single column, standard-enough headings and real text throughout — parsers cope well. Two labels to be aware of: “Strengths” is usually mapped to Skills by most systems, and the combined “Education & Certifications” heading is slightly non-standard but still contains the keywords parsers look for. Nothing is hidden in graphics.",
    faqs: [
      {
        q: "How do I address my career gap in this template?",
        a: "Use the leading Profile section to state your return directly and positively — one or two sentences on what you bring now. The layout puts that story ahead of your dates on purpose.",
      },
      {
        q: "Should I list freelance or volunteer work during the gap?",
        a: "Yes — put it in Experience or Projects. Reentry's structure treats all relevant work equally, which is exactly the point.",
      },
      {
        q: "Will recruiters see the gap as a weakness?",
        a: "A confident, well-framed return reads as maturity, not weakness. The Profile-first layout helps you control that narrative from the first line.",
      },
    ],
    metaTitle: "Reentry Resume Template — Free Return-to-Work CV | Cvyon",
    metaDescription:
      "Free Reentry resume template: a narrative-first design for professionals returning to work. Lead with your story, not your dates.",
  },
  {
    id: "Showcase",
    slug: "showcase",
    name: "Showcase",
    tagline: "Work first, biography second — a portfolio-led resume.",
    description:
      "Showcase flips the conventional order: “Selected Work” — your projects — comes before your profile, because for portfolio careers the work is the argument. A right-aligned photo, a full-width accent bar and dash-marked labels give it a gallery feel, while experience, skills, education and the rest follow in a single column.",
    bestFor: [
      "UI/UX and product designers",
      "software developers",
      "writers and content creators",
      "photographers",
      "architects",
      "portfolio-driven applicants",
    ],
    designTraits: [
      "projects (“Selected Work”) placed before the profile",
      "photo right-aligned in the header",
      "full-width accent bar divider",
      "dash-marked section labels",
      "single-column body",
    ],
    atsNotes:
      "Single column with real text, so parsing is straightforward — but note the unusual section order: some older systems expect Experience before Projects, and here Projects lead. The content is all captured; only the sequence differs. For strict portal applications where order matters, consider a conventional template and link your portfolio in the header instead.",
    faqs: [
      {
        q: "Should projects really come before my experience?",
        a: "If your strongest proof is what you built rather than where you worked — yes. Hiring managers for design and dev roles often look at work samples first.",
      },
      {
        q: "How do I link my portfolio?",
        a: "Put your portfolio URL in the website field so it appears in the header, and add live links to individual projects in their descriptions.",
      },
      {
        q: "Is the photo required?",
        a: "No — it sits right-aligned in the header and is entirely optional. The layout works with or without it.",
      },
    ],
    metaTitle: "Showcase Resume Template — Free Portfolio CV | Cvyon",
    metaDescription:
      "Free Showcase resume template: a portfolio-led design with Selected Work first. Ideal for designers, developers and creatives.",
  },
  {
    id: "Sovereign",
    slug: "sovereign",
    name: "Sovereign",
    tagline: "An executive two-column resume with boardroom presence.",
    description:
      "Sovereign speaks the language of senior leadership: your summary becomes an “Executive Summary”, experience becomes “Professional Experience”, and projects become “Key Engagements”. The main column carries the narrative while a side rail holds Contact, Capabilities, Education and Certifications — and the header adapts, showing your photo or a centered name block.",
    bestFor: [
      "C-suite and VP candidates",
      "directors and senior managers",
      "management consultants",
      "board and advisory roles",
      "senior public-sector leaders",
      "executives in finance and industry",
    ],
    designTraits: [
      "two-column layout: narrative main column plus side rail",
      "executive vocabulary: “Executive Summary”, “Key Engagements”, “Capabilities”",
      "header adapts to photo or centered name block",
      "underlined accent section headings",
      "restrained, formal spacing",
    ],
    atsNotes:
      "The two-column layout is the trade-off here: it looks authoritative to a human reader, but some applicant tracking systems read sidebars out of order. Sovereign is best for executive search, referrals and direct applications. If you are applying through a portal, export a single-column version (ParsePerfect or Polyglot) for the upload and send Sovereign to the human.",
    faqs: [
      {
        q: "Is two columns okay for executive resumes?",
        a: "For human readers — recruiters, boards, search firms — yes, it is standard. For automated portals, keep a single-column backup.",
      },
      {
        q: "What goes in “Key Engagements”?",
        a: "Board roles, major transformations, flagship client work — the projects section renamed for senior scope. Treat it as your highlight reel.",
      },
      {
        q: "Should executives include a photo?",
        a: "Sovereign supports both: upload one for markets where it is expected, or leave it out for the centered name block where it is not.",
      },
    ],
    metaTitle: "Sovereign Resume Template — Free Executive CV | Cvyon",
    metaDescription:
      "Free Sovereign resume template: an executive two-column design with an Executive Summary. Built for directors, VPs and C-suite candidates.",
  },
  {
    id: "SwissDesign",
    slug: "swiss-design",
    name: "Swiss Design",
    tagline: "Numbered sections and grid discipline, in the International Style.",
    description:
      "Swiss Design borrows from the International Typographic Style: sections are numbered — 01. Contact, 02. Skills, 03. Education, 04. Experience — contact details come as labeled pairs, skills get dot markers, and a slim vertical color bar sits beside your job title. A 67/33 grid keeps the sidebar and main column in strict proportion.",
    bestFor: [
      "designers who respect the grid",
      "architects",
      "engineers",
      "product managers",
      "academics",
      "European and international applications",
    ],
    designTraits: [
      "numbered section headers (01., 02., 03. …)",
      "labeled contact pairs (Email, Phone, Location, Website)",
      "dot markers on skills",
      "vertical accent bar beside the job title",
      "strict two-column grid with optional photo",
    ],
    atsNotes:
      "The numbered headings (“01. Contact”) are slightly non-standard labels, though the keywords Contact, Skills, Education and Experience are all present in the text for parsers to find. The grid is a true two-column layout, so sidebar content may be read out of sequence by older systems — fine for direct applications, less ideal for strict portals.",
    faqs: [
      {
        q: "Will recruiters understand the numbered sections?",
        a: "Yes — the numbers are a style choice, but the words Contact, Skills, Education and Experience are right there. It reads clearly to humans.",
      },
      {
        q: "Is it good for applications in Europe?",
        a: "Very. The structured, photo-optional layout suits continental European hiring norms, and the design pedigree signals craft.",
      },
      {
        q: "How is Swiss Design different from Swiss Grid?",
        a: "Swiss Design is the more rigorous of the two: numbered sections, labeled contact pairs and a vertical accent bar. Swiss Grid is softer, with a gray page and badge-style skills.",
      },
    ],
    metaTitle: "Swiss Design Resume Template — Free, Minimal | Cvyon",
    metaDescription:
      "Free Swiss Design resume template: numbered sections and strict grid discipline in the International Style. Ideal for designers and engineers.",
  },
  {
    id: "SwissGrid",
    slug: "swiss-grid",
    name: "Swiss Grid",
    tagline: "A calm gray grid with a colored top band and tidy side rail.",
    description:
      "Swiss Grid sets your resume on a light-gray page under a slim colored top border, then divides it into a two-column grid: the left rail holds Contact, Education and badge-style skills, while the right column carries your Profile, Experience and References. It is structured without feeling corporate.",
    bestFor: [
      "analysts and researchers",
      "project coordinators",
      "operations managers",
      "administrators",
      "consultants",
      "organized generalists",
    ],
    designTraits: [
      "light-gray page with a colored top border band",
      "two-column grid: side rail plus main column",
      "skills as badge-style tags",
      "underlined accent section headings",
      "no photo — text-only header",
    ],
    atsNotes:
      "Same two-column caveat as its Swiss siblings: great for human readers, but the side rail can be read out of order by older applicant tracking systems. Everything is real text with standard headings, and there are no graphics to lose — just consider a single-column template for strict portal uploads.",
    faqs: [
      {
        q: "How is Swiss Grid different from Swiss Design?",
        a: "Swiss Grid uses a gray page, a top border band and badge skills with a simpler header; Swiss Design uses numbered sections, labeled contact pairs and a vertical accent bar. Grid is softer, Design is more rigorous.",
      },
      {
        q: "Can I use it without a photo?",
        a: "It has no photo slot at all — the header is text-only, which suits markets where photos are discouraged.",
      },
      {
        q: "Does the gray background print okay?",
        a: "The page is a very light gray, so it prints cleanly on most printers. If you are worried, print one test copy first.",
      },
    ],
    metaTitle: "Swiss Grid Resume Template — Free, Minimal | Cvyon",
    metaDescription:
      "Free Swiss Grid resume template: a calm two-column grid on a light-gray page. Structured and scannable for analysts and coordinators.",
  },
  {
    id: "SwissMinimal",
    slug: "swiss-minimal",
    name: "Swiss Minimal",
    tagline: "The quietest resume in the collection — nothing but the words.",
    description:
      "Swiss Minimal strips everything back: your name, a single contact row, an unboxed summary, and flat sections for Experience, Education, Skills, Projects and References. No sidebars, no badges, no color blocks — just typography and whitespace doing the work.",
    bestFor: [
      "minimalists",
      "writers and editors",
      "academics",
      "legal professionals",
      "finance professionals",
      "anyone who distrusts decoration",
    ],
    designTraits: [
      "text-only header with a single contact row",
      "unboxed, borderless summary",
      "flat single-column sections",
      "no badges, sidebars or color blocks",
      "generous whitespace",
    ],
    atsNotes:
      "Excellent for parsing: one column, standard headings, real text, no graphics and no photo. This is among the safest choices for applicant tracking systems while still looking intentional and refined to a human reader.",
    faqs: [
      {
        q: "Is it too boring?",
        a: "Boring is a feature here — in law, finance and academia, restraint reads as confidence. The whitespace keeps it elegant rather than empty.",
      },
      {
        q: "Swiss Minimal vs ParsePerfect — which for ATS?",
        a: "Both are excellent. ParsePerfect is the stricter parser-first choice; Swiss Minimal is its more refined sibling with slightly more typographic polish.",
      },
      {
        q: "Can I add any color?",
        a: "The template keeps color to a minimum by design. If you want accent color with the same calm structure, look at Polyglot.",
      },
    ],
    metaTitle: "Swiss Minimal Resume Template — Free, ATS-Friendly | Cvyon",
    metaDescription:
      "Free Swiss Minimal resume template: the quietest single-column design, with nothing but the words. Excellent ATS safety for any profession.",
  },
  {
    id: "TechPro",
    slug: "tech-pro",
    name: "TechPro",
    tagline: "A terminal-styled resume that speaks fluent developer.",
    description:
      "TechPro renders your resume like a terminal session: Courier monospace throughout, your name wrapped as `< Your Name />`, contact lines prefixed with `>` labels (`> email:`, `> tel:`, `> loc:`, `> web:`), and section headings in bracket badges like `[ EXPERIENCE ]` and `[ SKILLS ]`. It is a love letter to engineering culture.",
    bestFor: [
      "software engineers",
      "DevOps and SRE engineers",
      "data engineers",
      "backend developers",
      "open-source contributors",
      "startup engineering roles",
    ],
    designTraits: [
      "Courier monospace typeface throughout",
      "name styled as `< Name />`",
      "terminal-style contact lines (`> email:`)",
      "bracket-badge section headings (`[ EXPERIENCE ]`)",
      "single-column, high-contrast layout",
    ],
    atsNotes:
      "Monospace Courier is perfectly readable to parsers — the font is not the issue. The risk is the unconventional labels: `[ EXPERIENCE ]` and `> email:` prefixes are non-standard, and some strict parsers look for exact heading matches. Most modern systems handle it, but if a portal is known to be fussy, keep ParsePerfect as your upload copy and send TechPro to the hiring manager.",
    faqs: [
      {
        q: "Will non-technical recruiters get it?",
        a: "The styling is a wink to engineers; the content is still a normal resume. For mixed audiences it works, but for HR-heavy processes consider Polyglot.",
      },
      {
        q: "Does the monospace font hurt readability?",
        a: "No — Courier is highly legible, and the spacing keeps it clean. It is a stylistic choice, not a compromise.",
      },
      {
        q: "Is it good for non-developer tech roles?",
        a: "Product managers, designers and data analysts in tech companies can pull it off too — the terminal aesthetic signals you belong in engineering culture.",
      },
    ],
    metaTitle: "TechPro Resume Template — Free Developer CV | Cvyon",
    metaDescription:
      "Free TechPro resume template: a terminal-styled, monospace design for developers. Stand out in engineering hiring — build yours in minutes.",
  },
  {
    id: "Timeline",
    slug: "timeline",
    name: "Timeline",
    tagline: "Your career as a visual timeline, with a rail through every role.",
    description:
      "Timeline draws a vertical accent rail down your experience section, marking each role with a dot and setting its dates in the accent color — your career progression becomes visible at a glance. A centered header with an optional photo ring opens the page, followed by Summary, Experience, Education, Skills, Projects, Certifications and References in one column.",
    bestFor: [
      "professionals with steady progression",
      "project managers",
      "consultants",
      "operations leaders",
      "anyone with a clear upward trajectory",
      "visual thinkers",
    ],
    designTraits: [
      "vertical timeline rail with dots through experience",
      "dates set in the accent color",
      "centered header with optional photo ring",
      "single-column section flow",
      "themeable accent color (blue by default)",
    ],
    atsNotes:
      "The rail and dots are pure decoration — the text reads as a normal single column, which parsers handle well. Dates are real text in the accent color, not graphics. The one visual element to know about is the rail itself; it carries no information, so nothing is lost if a parser ignores it.",
    faqs: [
      {
        q: "Does the timeline hide employment gaps?",
        a: "No — and it should not. The rail makes chronology visible, which rewards steady progression. If you have gaps to reframe, Reentry or Pivot suit you better.",
      },
      {
        q: "What if I only have one or two roles?",
        a: "The timeline still works, but its impact grows with more entries. With a short history, consider Modern Gradient or Polyglot.",
      },
      {
        q: "Can I change the rail color?",
        a: "Yes — the rail, dots and dates all follow your Cvyon theme accent color.",
      },
    ],
    metaTitle: "Timeline Resume Template — Free, ATS-Friendly | Cvyon",
    metaDescription:
      "Free Timeline resume template: a visual career timeline with an accent rail. Ideal for professionals with steady, upward progression.",
  },
  {
    id: "TypographyFirst",
    slug: "typography-first",
    name: "Typography First",
    tagline: "A serif editorial resume where the type does the talking.",
    description:
      "Typography First is set in Times-Roman with a 32-point name and section headings that end in periods — “Experience.”, “Projects.”, “Details.” — like chapter titles. Experience runs in a two-column grid with company and dates on the left, role and bullets on the right, and supporting material gathers under a “Details.” sub-grid. It reads like a well-set page, because it is one.",
    bestFor: [
      "writers and editors",
      "journalists",
      "academics",
      "lawyers",
      "publishers",
      "communications professionals",
    ],
    designTraits: [
      "Times-Roman serif typeface",
      "32pt name with period-terminated headings",
      "two-column experience grid (company and dates left, role and bullets right)",
      "“Details.” sub-grid for education and certifications",
      "print-like editorial spacing",
    ],
    atsNotes:
      "Serif fonts parse just as well as sans-serif — the typeface is not an ATS concern. The two-column experience grid means role and dates sit side by side, which most modern parsers read correctly in row order, though very old systems could misalign them. Headings like “Experience.” include the standard keyword despite the period, so section detection works.",
    faqs: [
      {
        q: "Is a serif font professional enough?",
        a: "For editorial, legal and academic fields it is the expected choice — serifs signal tradition and care. For tech startups, a sans-serif template may fit the culture better.",
      },
      {
        q: "What goes under “Details.”?",
        a: "Education, certifications and other supporting credentials, arranged in a compact sub-grid so they do not compete with your experience.",
      },
      {
        q: "Does the two-column experience layout risk ATS issues?",
        a: "Slightly, with very old systems. Modern parsers read the rows in order, and for direct applications it is a non-issue.",
      },
    ],
    metaTitle: "Typography First Resume Template — Free | Cvyon",
    metaDescription:
      "Free Typography First resume template: an editorial serif design with chapter-style headings. Ideal for writers, editors and academics.",
  },
  {
    id: "Valor",
    slug: "valor",
    name: "Valor",
    tagline: "A disciplined resume that translates military service for civilian hiring.",
    description:
      "Valor was made for veterans: your experience section is titled “Service Record”, skills become a “Transferable Skills” grid, and award-style markers keep achievements crisp. A double rule under the header — thick black over a thin accent line — gives it a formal, ceremonial feel, with an optional photo and zero gimmicks.",
    bestFor: [
      "military veterans",
      "service leavers",
      "reservists",
      "defense contractors",
      "law enforcement and security",
      "anyone translating service into civilian roles",
    ],
    designTraits: [
      "“Service Record” and “Transferable Skills” section labels",
      "double-rule header (thick black plus thin accent)",
      "award-style achievement markers",
      "optional photo",
      "formal single-column layout, no gimmicks",
    ],
    atsNotes:
      "Single column, real text, no graphics — parsing is clean. The distinctive labels are worth knowing about: “Service Record” contains your employment history and “Transferable Skills” your skills, which human readers in veteran-friendly programs understand immediately; fully automated keyword scans looking for the literal heading “Work Experience” are the only edge case, and most modern parsers match on content too.",
    faqs: [
      {
        q: "How do I translate my military role titles?",
        a: "Use the Service Record entries to pair each service role with its civilian equivalent in plain language — the template's formal tone supports that translation.",
      },
      {
        q: "Should I list awards and commendations?",
        a: "Yes — the award markers are designed for exactly that. Keep them concise and translate any jargon.",
      },
      {
        q: "Is Valor only for military veterans?",
        a: "It was designed for them, but the disciplined, formal style also suits law enforcement, security and emergency-services backgrounds.",
      },
    ],
    metaTitle: "Valor Resume Template — Free Veteran CV | Cvyon",
    metaDescription:
      "Free Valor resume template: a disciplined design with Service Record and Transferable Skills sections. Built for veterans entering civilian work.",
  },
  {
    id: "Vivid",
    slug: "vivid",
    name: "Vivid",
    tagline: "A full-color header block that makes your name impossible to miss.",
    description:
      "Vivid opens with a full-bleed colored header block — your photo, name, title and contact line in white on your accent color — then drops into a two-column body: Profile, Experience and Projects in the main column, Skills, Education and Certifications in the side column, with References to close. It is the boldest layout in the collection.",
    bestFor: [
      "marketers and brand professionals",
      "designers",
      "event planners",
      "media and entertainment",
      "startup generalists",
      "anyone who wants maximum visual impact",
    ],
    designTraits: [
      "full-bleed colored header block with photo",
      "white-on-accent name and contact line",
      "two-column body: main narrative plus side rail",
      "accent-colored company names",
      "bold, high-saturation first impression",
    ],
    atsNotes:
      "The two-column body is the trade-off: striking for humans, but side-rail content can be read out of order by older applicant tracking systems. The header block is a solid color with real white text — not an image — so your name and contact details extract normally. Use Vivid for direct applications and keep a single-column alternative for strict portals.",
    faqs: [
      {
        q: "Is Vivid too loud for corporate roles?",
        a: "For conservative industries, yes — choose Sovereign or Swiss Minimal. For creative, marketing and startup roles, the boldness is the point.",
      },
      {
        q: "Can I tone down the header color?",
        a: "Yes — the accent follows your Cvyon theme, so a deep navy or charcoal keeps the structure while quieting the impact.",
      },
      {
        q: "Does the colored header affect ATS parsing?",
        a: "No — it is a solid color fill behind real text, not an image. Your name and contact details parse normally.",
      },
    ],
    metaTitle: "Vivid Resume Template — Free, Bold & Colorful | Cvyon",
    metaDescription:
      "Free Vivid resume template: a bold full-color header block with a two-column body. Maximum visual impact for creatives and marketers.",
  },
  {
    id: "ZenJapanese",
    slug: "zen-japanese",
    name: "Zen Japanese",
    tagline: "Quiet, balanced minimalism in warm earthy tones.",
    description:
      "Zen Japanese takes its cues from Japanese stationery: warm dark-brown ink, beige hairline borders, a soft taupe accent, and section titles set in lowercase — “experience”, “education”, “skills”. Generous whitespace and a left-bordered summary give the page a calm, deliberate rhythm.",
    bestFor: [
      "designers",
      "wellness and hospitality professionals",
      "educators",
      "nonprofit workers",
      "minimalists",
      "applicants to Japanese or design-led companies",
    ],
    designTraits: [
      "warm earthy palette: brown ink, beige borders, taupe accent",
      "lowercase section titles",
      "generous whitespace and quiet rhythm",
      "accent left-border on the summary",
      "minimal single-column layout",
    ],
    atsNotes:
      "Single column, real text, standard section words — parsing is clean despite the lowercase styling, since parsers are generally case-insensitive. No photo, no graphics, no columns to misread. An honest, safe choice for portals that still feels distinctive to human readers.",
    faqs: [
      {
        q: "Will lowercase headings confuse ATS software?",
        a: "No — applicant tracking systems match headings case-insensitively, and the words experience, education and skills are all present.",
      },
      {
        q: "Is it appropriate outside Japan?",
        a: "Absolutely. The aesthetic is universal minimalism; the name nods to the inspiration, but the design works in any market that values restraint.",
      },
      {
        q: "Can I change the taupe accent?",
        a: "Yes — like every template, the accent follows your Cvyon theme color while the warm neutrals stay as the base.",
      },
    ],
    metaTitle: "Zen Japanese Resume Template — Free Minimal CV | Cvyon",
    metaDescription:
      "Free Zen Japanese resume template: quiet, balanced minimalism in warm earthy tones with lowercase headings. A calm, distinctive choice.",
  },
  {
    id: "Summit",
    slug: "summit",
    name: "Summit",
    tagline: "A commanding dark header band over a clean, readable body.",
    description:
      "Summit opens with a full-width dark header block carrying your name in large white type, your title, and a single contact line — then drops into a bright, airy body where every section starts with a theme-colored left border. The contrast gives your name real presence on the page while keeping the reading experience effortless for recruiters and ATS parsers alike.",
    bestFor: [
      "Managers and team leads",
      "Sales and business development professionals",
      "Operations and project managers",
      "Consultants",
      "Anyone who wants a strong first impression without a dark full-page design",
    ],
    designTraits: [
      "Full-width dark header band with reversed white name type",
      "Theme-color accent bar under the header",
      "Left-bordered section headers in the accent color",
      "Skills as wrapped pill tags",
      "Single-column body for clean ATS parsing",
    ],
    atsNotes:
      "The header is a solid color fill behind real text, not an image, so your name and contact details parse normally. The single-column body with standard section headings keeps parsing straightforward.",
    faqs: [
      {
        q: "Can I change the dark header color?",
        a: "The header uses a deep charcoal base with your Cvyon theme color as the accent bar, so picking a navy or forest theme shifts the accent while the header stays commanding.",
      },
      {
        q: "Does the dark header affect ATS parsing?",
        a: "No — it is a solid fill behind real selectable text, not an image. Parsers read your name and contact line normally.",
      },
      {
        q: "Is Summit good for senior roles?",
        a: "Yes. The strong header reads as confident and executive, while the clean body keeps long experience histories scannable.",
      },
    ],
    metaTitle: "Summit Resume Template — Free Dark Header CV | Cvyon",
    metaDescription:
      "Free Summit resume template: a bold dark header band with your name in white over a clean single-column body. Confident, readable, ATS-friendly.",
  },
  {
    id: "Gauge",
    slug: "gauge",
    name: "Gauge",
    tagline: "A sidebar resume with visual skill proficiency bars.",
    description:
      "Gauge pairs a theme-colored sidebar with a crisp white main column. Your contact details, skills — each with a horizontal proficiency bar — and extra sections live in the sidebar, while your summary, experience, and education get the full width they deserve on the right. It is the classic two-column resume done with discipline: dense where it should be, spacious where it counts.",
    bestFor: [
      "Software developers and engineers",
      "Designers with tool-heavy skill sets",
      "Data analysts",
      "IT professionals",
      "Anyone with a long skills inventory to show off",
    ],
    designTraits: [
      "Theme-colored left sidebar with white text",
      "Horizontal skill proficiency bars",
      "Circular initial avatar mark",
      "Wide right column for experience and education",
      "Custom sections supported in the sidebar",
    ],
    atsNotes:
      "Two-column layouts can challenge older parsers: keep your most critical keywords (job titles, employers) in the main column, and export a PDF to check the reading order. The text itself is fully selectable and real.",
    faqs: [
      {
        q: "How are the skill bar levels determined?",
        a: "The bars give each skill a visual weight so recruiters can scan your strengths at a glance. Order your skills with the strongest first for the best effect.",
      },
      {
        q: "Will the sidebar confuse applicant tracking systems?",
        a: "Modern parsers handle two-column resumes well, and all text is real and selectable. If a portal is very old, the single-column templates are the safest fallback.",
      },
      {
        q: "Can I add more sections to the sidebar?",
        a: "Yes — custom sections you add in the builder appear in the sidebar, keeping the main column focused on experience.",
      },
    ],
    metaTitle: "Gauge Resume Template — Free Sidebar CV with Skill Bars | Cvyon",
    metaDescription:
      "Free Gauge resume template: a theme-colored sidebar with skill proficiency bars beside a clean main column. Perfect for developers and designers.",
  },
  {
    id: "Rail",
    slug: "rail",
    name: "Rail",
    tagline: "A thin accent rail with a timeline experience section.",
    description:
      "Rail is minimalism with a spine: a slim theme-colored bar runs down the left edge of the page while your experience unfolds as a dot timeline — each role anchored to the rail with a marker, dates, and clean bullets. Your name sits huge at the top with wide letter-spaced section titles. It reads as calm and confident, with just enough structure to guide the eye down your career story.",
    bestFor: [
      "Professionals with a clear career progression",
      "Project managers",
      "Academics and researchers",
      "Marketing professionals",
      "Minimalists who want one distinctive visual idea",
    ],
    designTraits: [
      "Slim vertical accent rail on the left edge",
      "Experience rendered as a dot timeline",
      "Oversized name with generous whitespace",
      "Letter-spaced uppercase section titles",
      "Single-column layout throughout",
    ],
    atsNotes:
      "Fully single-column with standard headings, so parsing is clean. The timeline dots are pure decoration — dates sit in text next to each role, exactly where parsers expect them.",
    faqs: [
      {
        q: "Does the timeline format hurt ATS parsing?",
        a: "No. The dots are decorative CSS; every role, company, and date is plain text in a normal single-column flow.",
      },
      {
        q: "Is Rail good for long work histories?",
        a: "Yes — the timeline structure actually helps long histories stay scannable, since each role is visually separated along the rail.",
      },
      {
        q: "Can I change the rail color?",
        a: "Yes, the rail follows your Cvyon theme color, so it adapts to any accent you choose.",
      },
    ],
    metaTitle: "Rail Resume Template — Free Timeline CV | Cvyon",
    metaDescription:
      "Free Rail resume template: a slim accent rail with your experience as a clean dot timeline. Minimal, elegant, and ATS-friendly.",
  },
  {
    id: "Chevron",
    slug: "chevron",
    name: "Chevron",
    tagline: "Geometric ribbon headers with block skill ratings.",
    description:
      "Chevron gives every section a ribbon-style header — a theme-colored chevron marker carrying the section title in white — so the page has a rhythmic, engineered feel from top to bottom. Skills get a five-segment block rating instead of plain text, and the body stays a disciplined single column. It is professional with personality: structured enough for finance, distinctive enough for tech.",
    bestFor: [
      "Engineers and technical professionals",
      "Analysts and finance professionals",
      "IT and operations staff",
      "Consultants",
      "Candidates who want structure with a modern edge",
    ],
    designTraits: [
      "Chevron/ribbon section headers in the accent color",
      "Five-segment block skill ratings",
      "Single-column professional body",
      "Clean sans typography",
      "Strong repeated geometric motif",
    ],
    atsNotes:
      "Section titles are real text inside the ribbon shapes, so parsers read them normally. The block ratings are decorative; skill names are plain text alongside them.",
    faqs: [
      {
        q: "Do the ribbon headers confuse ATS software?",
        a: "No — the header text is real and selectable, and the words Experience, Education, and Skills are all present as normal text.",
      },
      {
        q: "What do the skill blocks mean?",
        a: "They are a visual rating from one to five segments, giving recruiters a quick read on your relative strengths. List your strongest skills first.",
      },
      {
        q: "Is Chevron too flashy for conservative industries?",
        a: "It reads as engineered rather than flashy — the geometry is disciplined, and the body is a classic single column. It works well in finance and consulting.",
      },
    ],
    metaTitle: "Chevron Resume Template — Free Geometric CV | Cvyon",
    metaDescription:
      "Free Chevron resume template: ribbon section headers and block skill ratings in a disciplined single column. Modern structure, professional feel.",
  },
  {
    id: "Glyph",
    slug: "glyph",
    name: "Glyph",
    tagline: "Airy icon-led minimalism with generous whitespace.",
    description:
      "Glyph lets small, elegant line icons do the talking: each section opens with a hand-drawn style icon, and your contact details sit in one centered row with tiny glyphs instead of labels. The layout is deliberately airy — abundant whitespace, minimal color, small bar meters for skills. Nothing shouts; everything is easy to find. It is the resume equivalent of a well-designed app screen.",
    bestFor: [
      "Designers and creatives",
      "Product managers",
      "Marketing professionals",
      "Tech workers who like clean interfaces",
      "Anyone whose resume needs to breathe",
    ],
    designTraits: [
      "Line icons for every section heading",
      "Single centered icon contact row",
      "Abundant whitespace, minimal color",
      "Small horizontal bar meters for skills",
      "Restrained accent color used sparingly",
    ],
    atsNotes:
      "The icons are decorative SVGs; all headings and contact details are real text. Single-column flow with standard section words keeps parsing clean.",
    faqs: [
      {
        q: "Will the icons break ATS parsing?",
        a: "No — icons are decorative and every heading and contact detail exists as real text. Parsers ignore the artwork and read the words.",
      },
      {
        q: "Is Glyph too minimal for experienced candidates?",
        a: "The whitespace is deliberate, not empty — multi-role histories fit fine, and the clean structure keeps long resumes scannable.",
      },
      {
        q: "Can I add more color?",
        a: "The design is intentionally restrained, but your theme color appears in section titles and skill meters — pick a bolder theme for more presence.",
      },
    ],
    metaTitle: "Glyph Resume Template — Free Minimal Icon CV | Cvyon",
    metaDescription:
      "Free Glyph resume template: airy icon-led minimalism with line icons, a centered contact row, and skill meters. Clean, modern, ATS-friendly.",
  },
  {
    id: "Triad",
    slug: "triad",
    name: "Triad",
    tagline: "Three calm color zones for instant scannability.",
    description:
      "Triad divides the page into three horizontal zones: a white header with your name and contact, a softly tinted band holding your summary and skill pills, and a white main zone for experience and education. The zoning does the organizing work — a recruiter's eye lands on exactly the right band in seconds — without a single heavy border or box. Small uppercase section headers in your theme color tie it together.",
    bestFor: [
      "Generalists and multi-disciplinary professionals",
      "Customer service and operations staff",
      "Administrators",
      "Recent graduates with internships to show",
      "Anyone who wants clear visual organization",
    ],
    designTraits: [
      "Three horizontal zones with subtle tinting",
      "Tinted summary + skills band",
      "Skill pills in the middle zone",
      "Small uppercase theme-colored headers",
      "Borderless, calm separation",
    ],
    atsNotes:
      "The zones are background tints behind real text in a single-column flow, so parsers read straight through. Standard section headings throughout.",
    faqs: [
      {
        q: "Do the background tints affect printing?",
        a: "The tint is very light (about 8% of your theme color), so it prints cleanly and never obscures text.",
      },
      {
        q: "Is Triad ATS-safe?",
        a: "Yes — single-column flow, real text, standard headings. The zoning is purely visual.",
      },
      {
        q: "Can I change the tint color?",
        a: "The tint derives from your Cvyon theme color, so changing the theme re-tints the band automatically.",
      },
    ],
    metaTitle: "Triad Resume Template — Free Color-Zoned CV | Cvyon",
    metaDescription:
      "Free Triad resume template: three subtle color zones organize your header, summary/skills, and experience. Calm, scannable, ATS-friendly.",
  },
  {
    id: "Mono",
    slug: "mono",
    name: "Mono",
    tagline: "A pure black-and-white typographic statement.",
    description:
      "Mono uses zero color — distinction comes entirely from type. Your name sets huge in serif, section titles pair serif headlines with a neutral sans body, and thick black rules separate each section. Skills run as a bold slash-separated inline list; dates align hard right. It is the most print-reliable template on Cvyon: no color to misprint, no graphics to pixelate, just typography doing all the work.",
    bestFor: [
      "Writers, editors, and journalists",
      "Lawyers and legal professionals",
      "Academics",
      "Executives in traditional industries",
      "Anyone applying through portals that mangle color",
    ],
    designTraits: [
      "Pure black, white, and gray — no color at all",
      "Oversized serif name and headings",
      "Thick black section rules",
      "Slash-separated inline skills list",
      "Right-aligned dates",
    ],
    atsNotes:
      "As clean as parsing gets: single column, black text, standard headings, no graphics, no color tricks. An excellent choice for the strictest ATS portals.",
    faqs: [
      {
        q: "Can I add color to Mono?",
        a: "Mono intentionally ignores the theme color — that is the point. If you want color, any of the other 50+ templates will oblige.",
      },
      {
        q: "Is black-and-white too plain?",
        a: "Plain is the strategy: the oversized type and heavy rules give it real presence, and it prints perfectly everywhere, every time.",
      },
      {
        q: "Is Mono good for creative roles?",
        a: "For writing, editing, and editorial design — absolutely. For visual design portfolios, a template with more color may show range better.",
      },
    ],
    metaTitle: "Mono Resume Template — Free Black & White CV | Cvyon",
    metaDescription:
      "Free Mono resume template: a pure black-and-white typographic statement with serif headlines and bold rules. Maximum print reliability, zero color risk.",
  },
  {
    id: "Ember",
    slug: "ember",
    name: "Ember",
    tagline: "Warm editorial styling with a terracotta soul.",
    description:
      "Ember has its own warm identity: terracotta section headings in serif italic, hairline rules between sections, and your summary set as a pull-quote with a terracotta left border. Skills appear as warm-tinted chips, and your contact details center beneath your name with middot separators. It reads like a magazine profile — soft, human, and memorable — while keeping every section exactly where recruiters expect it.",
    bestFor: [
      "Marketing and brand professionals",
      "Content creators and writers",
      "Hospitality and customer experience staff",
      "Nonprofit workers",
      "Creatives who want warmth without chaos",
    ],
    designTraits: [
      "Fixed terracotta accent with serif italic headings",
      "Pull-quote style summary",
      "Hairline rules between sections",
      "Warm-tinted skill chips",
      "Centered middot contact row",
    ],
    atsNotes:
      "Single-column layout with standard section words; the serif italic styling does not affect parsing. All text is real and selectable.",
    faqs: [
      {
        q: "Can I change the terracotta color?",
        a: "Ember keeps its fixed warm identity by design — the terracotta is part of the template's character. Other templates follow your theme color if you want control.",
      },
      {
        q: "Is the pull-quote summary ATS-safe?",
        a: "Yes — it is a normal paragraph with a decorative left border. Parsers read it as regular text.",
      },
      {
        q: "Is Ember professional enough for corporate roles?",
        a: "The structure is classic single-column; only the styling is warm. It suits brand, marketing, hospitality, and people-facing roles best.",
      },
    ],
    metaTitle: "Ember Resume Template — Free Warm Editorial CV | Cvyon",
    metaDescription:
      "Free Ember resume template: warm terracotta serif headings, pull-quote summary, and skill chips in an editorial single column. Human, memorable, ATS-friendly.",
  },
  {
    id: "Arsenal",
    slug: "arsenal",
    name: "Arsenal",
    tagline: "Skills-first layout built for career changers.",
    description:
      "Arsenal leads with what you can do, not where you have been. A Core Competencies grid of skill pills opens the resume, followed by Selected Achievements — every bullet from your experience, flattened into one punchy list — then a compact one-line-per-role Employment History and your education. It is the functional resume done right: built for career changers, generalists, and anyone whose skills outshine their job titles.",
    bestFor: [
      "Career changers",
      "Generalists and multi-skilled professionals",
      "Freelancers consolidating varied work",
      "Returners to the workforce",
      "Technical staff pivoting industries",
    ],
    designTraits: [
      "Core Competencies skill grid first",
      "Flattened achievements list from all roles",
      "One-line employment history",
      "Skills-led rather than chronology-led",
      "Clean single-column flow",
    ],
    atsNotes:
      "Functional layouts need care with parsers: Arsenal keeps company names and dates as real text in the employment history, and standard headings throughout. Include a chronological work history (it is there) so parsers can build your timeline.",
    faqs: [
      {
        q: "Is a skills-first resume risky for ATS?",
        a: "Pure functional resumes can be. Arsenal hedges: it leads with skills but still includes a real employment history with companies and dates, which is what parsers need.",
      },
      {
        q: "Who should use Arsenal?",
        a: "Career changers, freelancers, and generalists — anyone whose strongest story is competency, not a tidy chronological ladder.",
      },
      {
        q: "Where do my job bullets go?",
        a: "Every bullet from your experience entries is gathered into Selected Achievements automatically, so nothing you wrote is lost.",
      },
    ],
    metaTitle: "Arsenal Resume Template — Free Skills-First CV | Cvyon",
    metaDescription:
      "Free Arsenal resume template: a skills-first functional layout with a competencies grid, achievements list, and compact work history. Built for career changers.",
  },
  {
    id: "Density",
    slug: "density",
    name: "Density",
    tagline: "Maximum content on one page, engineered cleanly.",
    description:
      "Density is built for candidates with a lot to say: compact 11px type, tight disciplined spacing, a two-column header, skills in a three-column grid, and experience rows that fit role, company, and dates on single lines. The density comes from spacing discipline, not clutter — every section still breathes, and theme-colored headers with bottom borders keep the structure obvious. One page, everything on it, nothing cramped.",
    bestFor: [
      "Senior engineers with long skill lists",
      "Experienced professionals condensing 10+ years",
      "Technical specialists",
      "Consultants with many engagements",
      "Anyone told their resume must be one page",
    ],
    designTraits: [
      "Compact 11px type with tight spacing",
      "Two-column header (name left, contact right)",
      "Three-column skills grid",
      "Single-line role/company/date rows",
      "Theme-colored headers with bottom borders",
    ],
    atsNotes:
      "Single-column body with standard headings; the compact sizing does not affect parsing since all text remains real and selectable. Keep font sizes readable — Density already optimizes this for you.",
    faqs: [
      {
        q: "Will recruiters find small text hard to read?",
        a: "Density uses 11px body text — the same size many professional resumes use — with strong headers and spacing so nothing feels cramped.",
      },
      {
        q: "Can Density handle a very long work history?",
        a: "That is its purpose: single-line role rows and compact bullets fit far more per page than standard templates while staying clean.",
      },
      {
        q: "Is it ATS-friendly?",
        a: "Yes — single-column flow, real text, standard section headings throughout.",
      },
    ],
    metaTitle: "Density Resume Template — Free Compact One-Page CV | Cvyon",
    metaDescription:
      "Free Density resume template: a compact high-density one-pager with tight disciplined spacing. Fit more on one page without looking cramped.",
  },
];

export function getTemplateSeoEntry(slug: string): TemplateSeoEntry | undefined {
  return templateSeoEntries.find((e) => e.slug === slug);
}
