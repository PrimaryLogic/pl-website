# Design QA — homepage workflow panels

## Comparison target

- Source visual truth: `/var/folders/91/bfydngc93y77vflyq1h6rjth0000gn/T/codex-clipboard-65de5b0c-cd82-4542-afbb-b4fe4e6113c9.png`, together with the explicit correction that the healthcare workflow must show what happened instead of endpoint or JSON output.
- Source pixels: `2374 × 1256`.
- Earlier workflow-card direction supplied for context: `/var/folders/91/bfydngc93y77vflyq1h6rjth0000gn/T/codex-clipboard-edd37b97-3ec5-417e-8cf4-ebe9b0e13f0e.png`, `2920 × 1388`.
- Implementation route: `http://localhost:3000/`.
- Implementation screenshot: `design-qa-workflow-outcome.png`.
- Combined comparison evidence: `.design-audit/workflow-outcome-comparison.png`.
- Browser viewport: `1280 × 720` CSS px; implementation capture: `1280 × 720` pixels.
- Density normalization: both source and implementation were proportionally normalized to `720px` height and placed side by side. The implementation was captured at `1×` density.
- State: homepage, light theme, workflow panel region visible.

## Full-view comparison evidence

The combined comparison places the normalized source on the left and the browser-rendered implementation on the right. The new implementation preserves the three pastel stages, communication cards, and terminal-state strips while replacing the healthcare panel's dark endpoint/JSON block with a white, customer-readable result card.

Healthcare now shows the verified result directly: Luis arrived, the appointment was marked arrived, and the referral was matched and closed. Lending and legal retain their documented follow-up and signature-recovery scenes.

## Focused-region comparison evidence

No separate crop was required. The combined image keeps icons, transcript labels, message bubbles, evidence rows, outcome strips, and supporting copy legible enough for direct comparison.

## Required fidelity surfaces

- Fonts and typography: passed. Display headings remain product-native; compact mono metadata, participant labels, transcript copy, and outcome strips reproduce the target’s technical hierarchy without broken wrapping.
- Spacing and layout rhythm: passed. Panels are square at desktop, have centered content stacks, consistent gutters, and substantially more negative space than the old implementation. Text content below the panels aligns across the three-column grid.
- Colors and visual tokens: passed. Sand, sage, and blue stages match the reference’s color roles while green replaces red as the existing brand/state token. Contrast is clear on white and ink surfaces.
- Image quality and asset fidelity: passed. The source contains interface mockups rather than raster imagery. The implementation renders those interface surfaces natively and uses the project’s Phosphor icon family; there are no blurry screenshots, placeholder imagery, custom illustration SVGs, or raster scaling artifacts.
- Copy and content: passed. The healthcare result is expressed as plain-language operational evidence rather than developer telemetry. No endpoint, status code, JSON, customer, or performance claim was added.
- Icons and polish: passed. Voice, SMS, email, system evidence, and completed-outcome icons share one optical family and consistent sizing.
- Responsiveness and accessibility: passed at the available desktop viewport. The page has no horizontal overflow (`1280px` client and scroll width), desktop cards share equal dimensions, and the existing mobile snap rail remains intact. Visual content is real text rather than text embedded in images.

## Findings

No actionable P0/P1/P2 mismatches remain.

## Comparison history

### Pass 1 — passed

- Replaced three repetitive, evenly packed message lists with distinct transcript, evidence, and messaging compositions.
- Increased panel size to a square desktop stage, strengthened the palette, reduced surface repetition, and added outcome-specific terminal strips.
- Post-build combined evidence: `.design-audit/workflow-panels-comparison-pass1.png`.

### Pass 2 — passed

- Removed the healthcare endpoint, status code, and JSON-like result rows.
- Added a visually native verified-result card with a named outcome and two concise evidence lines.
- Post-build combined evidence: `.design-audit/workflow-outcome-comparison.png`.

## Browser verification

- All three panels rendered at equal `402.66px` desktop widths with no page overflow.
- Healthcare and lending detail links remained present.
- New result copy rendered once each; `/schedule-export` and the prior JSON text rendered zero times.
- Browser console errors checked after render: none.

## Follow-up polish

- P3: a future phone-sized visual target could drive a dedicated mobile art-direction pass beyond the existing snap rail.

final result: passed

---

# Design QA — Master-detail outcome journey synthesis

## Comparison target

- Source visual truth 1: `/var/folders/91/bfydngc93y77vflyq1h6rjth0000gn/T/codex-clipboard-7a0f3fff-f8fd-4f17-affa-5192f70504fa.png` (`2068 × 1578`).
- Source visual truth 2: `/var/folders/91/bfydngc93y77vflyq1h6rjth0000gn/T/codex-clipboard-5740bb92-c1aa-4890-8ecf-180e6486fe79.png` (`2046 × 1356`).
- Implementation route: `http://localhost:3000/`.
- Desktop overview: `/private/tmp/pl-home-combined-header.png` (`1280 × 720`, `1×`).
- Focused master-detail view: `/private/tmp/pl-home-combined-desktop.png` (`1280 × 720`, `1×`).
- Combined source/implementation evidence: `/private/tmp/pl-home-master-detail-comparison.png`.
- State: light theme, Healthcare selected, first moment selected, journey paused.

## Full-view comparison evidence

The comparison treats the two screenshots as complementary source material rather than independent sections. The detailed journey supplies the tab rail, case header, timeline, memory, decision, task, and interaction hierarchy. The three-card gallery supplies the human communication scenes and explicit completion evidence. The implementation combines them into one master-detail surface and removes the now-redundant preview gallery.

## Focused-region comparison evidence

The desktop focused capture shows the horizontal case timeline and the new selected-moment evidence panel together. Selecting a moment updates the transcript or system proof, the “What moved the case” summary, and the case-state strip. The terminal moment replaces the open-state strip with the named verified outcome.

## Required fidelity surfaces

- Visual hierarchy: passed. Use-case tabs choose the lane; the case headline frames the outcome; the timeline explains the work; the evidence panel proves the selected moment.
- Spacing and composition: passed. Desktop uses a stable `1.55fr / .72fr` master-detail split inside the existing inset stage. The evidence panel remains visually subordinate to the case headline but stronger than inactive timeline moments.
- Typography and color: passed. Existing Archivo, IBM Plex Sans, and IBM Plex Mono roles remain intact. Sage, sand, blue, lavender, ink, and neutral surfaces retain the site's established semantic roles.
- Content: passed. All examples reuse the site's existing illustrative healthcare, lending, and legal traces. The disclaimer remains visible, and no customer or performance claim was introduced.
- Interaction states: passed. Use-case tabs, previous/next controls, play/pause, direct moment selection, active-state styling, matching evidence, and verified terminal outcomes were exercised in the browser.
- Accessibility: passed. The selected evidence region is a labeled complementary landmark with `aria-live`; tabs, controls, moment buttons, focus states, and paused motion remain semantic and keyboard-addressable.
- Responsive behavior: passed. At desktop the timeline and evidence panel sit side by side. At phone sizes the evidence panel moves before the horizontally browsable timeline, preserving the proof-first reading order without document overflow.

## Responsive and browser verification

- `1280 × 720`: viewport and document widths both `1280px`; no page-level overflow.
- `390 × 844`: viewport and document widths both `390px`; evidence-first mobile composition rendered correctly. Evidence: `/private/tmp/pl-home-master-detail-mobile-390.png`.
- `320 × 740`: viewport and document widths both `320px`; the timeline remains contained in its own horizontal rail. Evidence: `/private/tmp/pl-home-master-detail-mobile-320.png`.
- Healthcare, Lending, and Legal intake each rendered their corresponding headline and data.
- The final healthcare moment rendered `Visit kept` as a verified outcome.
- Runtime logs contained only React DevTools and HMR informational messages; no browser errors.
- ESLint, TypeScript, and the optimized Next.js webpack build passed.

## Findings

No actionable P0/P1/P2 mismatches remain. The single-section synthesis is intentional: it removes duplicate storytelling while preserving both the long-horizon process and the human/system evidence that makes the outcome credible.

## Follow-up polish

No P3 follow-up is required for this pass.

final result: passed

---

# Design QA — Horizon-inspired outcome journey

## Comparison target

- Source visual truth: `/var/folders/91/bfydngc93y77vflyq1h6rjth0000gn/T/codex-clipboard-e4925123-2eec-4916-ae91-67c7ef668d95.png`.
- Source pixels: `2133 × 1957` at approximately `2×` density.
- Implementation route: `http://localhost:3000/`.
- Implementation screenshot: `/private/tmp/primary-logic-outcome-journey-implementation.png`.
- Full-view comparison evidence: `/private/tmp/primary-logic-horizon-comparison.png`.
- Focused comparison evidence: `/private/tmp/primary-logic-horizon-comparison-focus.png`.
- Browser viewport: `1067 × 977` CSS px; implementation capture: `1067 × 977` pixels at `1×` density.
- Density normalization: the source was downsampled to `1067px` wide. For the full-view comparison, the source uses a `1067 × 913` top crop and the implementation uses a `1067 × 913` crop beginning below the sticky site navigation, aligning the tab rail and showcase panel.
- State: light theme, Healthcare tab, middle timeline moment selected, timeline paused.

## Full-view comparison evidence

The combined comparison places the normalized Horizon reference on the left and the browser-rendered Primary Logic adaptation on the right. The implementation preserves the reference's core spatial model: a pill tab rail, inset tinted frame, white rounded stage, outcome header with transport controls, channels/systems metadata, a horizontal time spine, and vertically stacked work cards. It intentionally maps Sierra blue to Primary Logic sage and replaces six broad industries with the three lanes the current product can credibly describe.

## Focused-region comparison evidence

The focused comparison enlarges the header, metadata row, time markers, selected signal card, memory block, and adjacent timeline states. Text, icons, borders, shadows, card radii, selected-state emphasis, and horizontal peeking behavior are legible enough for direct comparison.

## Required fidelity surfaces

- Fonts and typography: passed. The implementation uses the site's Archivo display face, IBM Plex Sans body face, and IBM Plex Mono metadata face. It preserves the reference hierarchy while remaining native to Primary Logic; no broken wrapping or truncation appears at `1440px`, `1067px`, `390px`, or `320px`.
- Spacing and layout rhythm: passed. The tabs sit immediately below the hero form, followed by a pale frame and inset white stage. Desktop shows three-plus moments at the default viewport and all four at `1440px`; mobile collapses to a snap-scrolling single-card journey without page overflow.
- Colors and visual tokens: passed. Pale blue became brand sage, the selected timeline state uses Primary Logic green, and decision/task/interaction cards retain distinct blue, lavender, and sand roles. Foreground contrast remains clear on active surfaces while inactive moments recede.
- Image quality and asset fidelity: passed. The reference contains product-interface surfaces rather than raster artwork. The implementation renders those surfaces natively and uses the existing Phosphor icon family; it contains no placeholder imagery, custom SVGs, CSS illustrations, or stretched assets.
- Copy and content: passed. Healthcare, lending, and legal tabs reuse the homepage's existing illustrative case events rather than borrowing Sierra's proprietary workflow copy or inventing customer/performance claims. The workflow is explicitly labeled illustrative.
- Icons: passed. Arrow, play/pause, channel, system, memory, and completion icons share one family, consistent stroke weights, and practical control sizes.
- States and interactions: passed. Industry tabs, previous/next controls, play/pause, direct moment selection, active-state emphasis, auto-advance, and reduced-motion suppression are implemented. The active moment remains singular and scrolls horizontally without moving the page.
- Accessibility: passed. Tabs and panels have semantic roles, controls have explicit labels and focus rings, active moments expose `aria-current`, live motion can be paused, autoplay respects `prefers-reduced-motion`, and mobile tap targets are at least `38px` high.

## Findings

No actionable P0/P1/P2 mismatches remain. Brand and content deviations from the source are intentional: three credible Primary Logic lanes replace six generic industries, sage replaces Sierra blue, and real case events replace skeleton placeholders.

## Comparison history

### Pre-QA responsive correction

- Fixed the journey rail so selecting a moment scrolls only the horizontal container rather than moving the document vertically.
- Constrained moment columns to explicit responsive widths so real text wraps inside cards instead of expanding the track.

### Pass 1 — passed

- Compared the source and implementation at the same normalized desktop width and aligned middle-moment state.
- No P0/P1/P2 issue remained after the responsive correction.
- Post-fix evidence: `/private/tmp/primary-logic-horizon-comparison.png` and `/private/tmp/primary-logic-horizon-comparison-focus.png`.

## Responsive and browser verification

- Wide evidence: `/private/tmp/primary-logic-outcome-journey-wide-1440.png`; `1440px` viewport and document widths match with no page overflow.
- Mobile evidence: `/private/tmp/primary-logic-outcome-journey-mobile-390.png` and `/private/tmp/primary-logic-outcome-journey-mobile-cards-390.png`; tabs, controls, metadata, timeline, and cards remain usable.
- Compact-mobile evidence: `/private/tmp/primary-logic-outcome-journey-mobile-320.png`; `320px` viewport and document widths match with no page overflow.
- Healthcare and lending tabs were exercised, next-moment state changed exactly one active card, play/pause worked, and browser console errors were checked: none.

## Follow-up polish

No P3 follow-up is required for this pass.

final result: passed
