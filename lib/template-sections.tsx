import React from 'react';
import {
  DEFAULT_SECTION_ORDER,
  type ResumeData,
  type ResumeSectionId,
} from '@/store/types';

/**
 * Shared section ordering/visibility for all resume templates
 * (components/html_templates/* and components/templates/*).
 *
 * Templates receive the full ResumeData (which carries the user's
 * `sectionOrder` + `sectionVisibility` from the builder editor) and render
 * their named section blocks through `orderSections`, so every template
 * honors the user's custom order and hidden sections without each template
 * reimplementing the logic.
 *
 * Section id mapping (must match the editor in app/build/page.tsx):
 * - 'personal'      → identity header + professional summary
 * - 'experience'    → work experience
 * - 'education'     → education
 * - 'skills'        → skills
 * - 'projects'      → projects (also gated by data.showProjects)
 * - 'certifications'→ certifications (also gated by data.showCertifications)
 * - 'references'    → references (also gated by data.showReferences)
 * - 'cover-letter'  → editor-only; never rendered into resume output
 *
 * `customSections` are not part of the editor's order/visibility model. Each
 * template renders them via the `after` parameter of the `orderSections()` call
 * for the layout region where the original template design placed custom
 * content — in single-column templates that is after all ordered sections, but
 * in multi-region templates they stay anchored to the original custom-content
 * region (e.g. a sidebar "Process" area or a full-width block below the
 * columns), preserving the template's visual design. Numbered templates also
 * route customs through `after` so section numbers continue consecutively.
 */

/** Section ids that can appear in resume output. 'cover-letter' is editor-only. */
export const OUTPUT_SECTION_IDS: readonly ResumeSectionId[] = [
  'personal',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'references',
];

/** Missing keys default to visible (matches the editor contract). */
export function isSectionVisible(data: ResumeData, id: string): boolean {
  return data?.sectionVisibility?.[id] !== false;
}

/**
 * Visible output section ids in the user's order.
 * Falls back to DEFAULT_SECTION_ORDER when the stored order is missing/empty;
 * silently drops unknown ids and 'cover-letter'; appends any output section
 * missing from a stale stored order so nothing ever disappears.
 */
export function getOrderedSectionIds(data: ResumeData): ResumeSectionId[] {
  const raw = data?.sectionOrder;
  const order: string[] =
    Array.isArray(raw) && raw.length > 0 ? [...raw] : [...DEFAULT_SECTION_ORDER];
  const seen = new Set<string>();
  const out: ResumeSectionId[] = [];
  const push = (id: string) => {
    if (id === 'cover-letter') return;
    if (!(OUTPUT_SECTION_IDS as readonly string[]).includes(id)) return;
    if (seen.has(id)) return;
    seen.add(id);
    if (isSectionVisible(data, id)) out.push(id as ResumeSectionId);
  };
  order.forEach(push);
  OUTPUT_SECTION_IDS.forEach(push);
  return out;
}

/**
 * A section block is either static JSX, or a function receiving its 0-based
 * position among the *rendered* sections (for templates that number sections,
 * e.g. "I. Experience", "II. Education").
 *
 * IMPORTANT for numbered templates: keep the data-presence condition OUTSIDE
 * the function, e.g.
 *   experience: data.experience.length > 0 && ((i: number) => (<section>…{ROMAN[i]}…</section>))
 * so empty sections are filtered before indices are assigned and numbering
 * stays consecutive. A function that itself returns null/false still consumes
 * its index.
 */
export type SectionBlock =
  | React.ReactNode
  | ((index: number) => React.ReactNode);

/**
 * Render a template's named section blocks in the user's order, skipping
 * hidden sections and blocks that evaluate to null/false.
 *
 * Call once per layout container: single-column templates make one call with
 * all their sections; sidebar templates make one call per container (aside,
 * main) with only the sections that live in that container. The user's
 * relative order is preserved within each container, and the template's
 * visual design is otherwise untouched.
 *
 * `after`: optional extra blocks rendered after the ordered sections with
 * continuing indices (used by templates that number sections, so custom
 * sections continue the same counter; other templates pass their custom
 * sections here too). Like `blocks`, entries evaluating to null/false are
 * skipped; unlike `blocks`, they take no visibility filtering.
 */
export function orderSections(
  data: ResumeData,
  blocks: Partial<Record<ResumeSectionId, SectionBlock>>,
  after: SectionBlock[] = [],
): React.ReactNode {
  const rendered: { id: string; block: SectionBlock }[] = [];
  for (const id of getOrderedSectionIds(data)) {
    const block = blocks[id];
    if (block === undefined || block === null || block === false) continue;
    rendered.push({ id, block });
  }
  after.forEach((block, k) => {
    if (block === undefined || block === null || block === false) return;
    rendered.push({ id: `after-${k}`, block });
  });
  return rendered.map(({ id, block }, index) => {
    const node = typeof block === 'function' ? block(index) : block;
    if (node === undefined || node === null || node === false) return null;
    return <React.Fragment key={id}>{node}</React.Fragment>;
  });
}
