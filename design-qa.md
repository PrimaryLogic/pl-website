# Design QA: ICP messaging correction

- source visual truth: the accepted pre-change site at `artifacts/icp-minimal-audit-2026-08-13/`
- implementation evidence: `artifacts/implementation-icp-2026-08-13/`
- desktop viewport: 1111×977 CSS px at device scale factor 1
- responsive viewport: 390×844 CSS px at device scale factor 1
- states verified: hero, referral operating system at step 4, kept-first-visit terminal state, outcome economics, FAQ, privacy notice

## Same-input comparisons

- hero: `artifacts/implementation-icp-2026-08-13/compare-hero.png`
- product: `artifacts/implementation-icp-2026-08-13/compare-product.png`
- economics: `artifacts/implementation-icp-2026-08-13/compare-economics.png`

Each comparison places the 1111×977 source capture on the left and the matching 1111×977 implementation capture on the right. The page retains its accepted type system, palette, card treatment, navigation, CTA, and section rhythm. Only the operating-model story, state detail, buyer questions, and pricing logic changed.

## Findings

No actionable P0, P1, or P2 findings remain.

- Visual hierarchy: the hero now names the category first; the product section proves operating ownership; economics states the billable event without competing baseline math.
- Typography and spacing: longer copy stays within the existing reading widths at desktop and 390px. No clipping, overlap, or unintended horizontal overflow is visible.
- Product state: each journey step exposes owner, dependency, next action, and EHR writeback. Step 6 changes the banner to `Billable outcome` only after the EHR records the first visit as kept.
- Economics: assigned referrals, kept first appointments, fee per kept appointment, and total fee form one auditable calculation. Non-billable terminal states are explicit.
- Trust: the FAQ now covers handoff scope, exception handling, system control, human review, security review, and BAA timing. The linked privacy page contains a substantive website notice.
- Responsive behavior: hero, product dashboard, terminal-state card, and four-row economics example remain readable at 390×844. A missing mobile divider between the third and fourth economics rows was found and fixed.
- Accessibility and interaction: journey steps remain semantic buttons; playback controls retain accessible names and state; the selected step updates the live region; the browser console is clean.

## Verification

- `npm run lint`: passed
- `npx next build --webpack`: passed, including TypeScript and static generation
- browser console errors: none
- stale incremental-lift language and em dashes in live app copy: none

final result: passed
