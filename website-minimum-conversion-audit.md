# Primary Logic: Minimum Conversion Audit

Date: 2026-08-13

## Verdict

The page does not need another section-rich redesign. Its visual hierarchy, problem framing, interactive referral journey, FAQ, and one-field contact form are already doing their jobs.

The commercial story is inconsistent in three places:

1. The intended invoice event is an incremental **kept appointment**, while the page promises a **booked patient**.
2. The intended model is outcome-based, while the economics section calls Primary Logic a **fixed-cost agent** and then shows a price that it disclaims as pricing.
3. The agent's persistence is explained only through the successful journey; the declined, unreachable, and clinical-escalation states are absent.

Fix only those three things.

## Change 1: Put the contract in the hero

The first screen should state the audience, operating promise, invoice event, and data required for the first conversation.

**Eyebrow**

> OUTCOME-BASED REFERRAL CONVERSION FOR MULTI-SITE DERMATOLOGY GROUPS

If the beachhead is no longer dermatology, replace the final phrase with `MULTI-SITE SPECIALTY GROUPS`. Do not use the broader word `healthcare`.

**Headline**

> Turn unconverted referrals into kept appointments.

**Body**

> Give Primary Logic every eligible referral your team has not converted. The agent persists across voice, SMS, email, forms, payer workflows, and your EHR until the patient books, declines, reaches the agreed contact limit, or requires clinical escalation.

**Outcome line**

> Pay only for verified incremental appointments that are kept.

**CTA**

> Talk through my referral economics

**Microcopy**

> Bring your monthly referral volume and current kept-appointment rate. No patient data required.

Use this vocabulary everywhere:

- Operational milestone: `appointment booked`.
- Customer value and invoice event: `incremental appointment kept`.
- Pricing model: `variable and outcome-based`.

Remove `fixed-cost agent`, `per converted patient`, and any use of `conversion` that does not define its terminal state.

## Change 2: Add terminal states below the existing journey

Keep the interactive patient journey. It is the page's strongest product explanation. Add one compact block below it so the operator can see how unresolved and unsafe cases end.

**Heading**

> Every referral ends in a known state.

**Body**

> Primary Logic persists across voice, SMS, email, forms, and EHR work queues. Every attempt, response, and handoff is written back to the EHR. The agent closes a referral only as:

- Appointment booked.
- Patient declined.
- Unreachable after the agreed contact sequence.
- Clinical escalation required.
- Operationally disqualified or blocked by customer capacity.

**Closing line**

> Booking ends the coordination workflow. The EHR's kept-appointment status determines billing.

This answers three material objections without adding a feature grid: whether the agent contacts patients indefinitely, whether it makes clinical decisions, and whether unresolved work disappears.

## Change 3: Replace the comparison chart with contract math

The current `$55 per converted patient` card is not usable because the page simultaneously says it is not pricing. It also compares unlike alternatives without showing how incrementality is measured.

Replace the entire comparison card with:

**Eyebrow**

> OUTCOME-BASED PRICING

**Heading**

> Pay only for verified lift.

**Body**

> Before launch, we agree on the eligible referral cohort, baseline or holdout, attribution window, exclusions, and the EHR status that counts as kept. You are billed only for incremental kept appointments above that baseline.

| Illustrative month | Value |
| --- | ---: |
| Eligible referrals | 10,000 |
| Baseline kept rate | 45% |
| Primary Logic kept rate | 50% |
| Verified incremental kept appointments | 500 |
| Illustrative outcome fee | $100 each |
| Monthly fee | $50,000 |
| Contribution per kept appointment | $500 |
| Incremental contribution | $250,000 |
| Gross benefit-to-fee ratio | 5.0x |

**Footnote**

> Illustrative. The outcome fee is set by annual volume and workflow complexity. Measurement uses an agreed baseline or contemporaneous holdout. Declined, unreachable, no-show, clinically escalated, and excluded referrals are not billed.

Do not publish `$100` until the company is prepared to sell at that price. A visible number followed by `not pricing` reduces credibility more than omitting the number.

## Leave unchanged

- Visual system, typography, spacing, restrained color palette, and page length.
- `Every dropped patient is lost revenue.`
- Stalled-patient cards.
- Interactive referral journey and EHR writeback story.
- One-field email form.
- BAA and PHI reassurance.
- Problem -> mechanism -> economics -> objections -> CTA sequence.
- Explicit labels for illustrative data.

Do not add an integration-logo wall, generic AI statistics, feature grid, long security section, testimonial placeholders, or multiple competing CTAs.

## Page-step health

1. **Hero — Good design; commercial promise incomplete.** The value is legible, but the page hides the outcome contract and stops at booking rather than a kept visit.
2. **Challenge — Healthy.** The stalled-patient states make the operational problem concrete without excess explanation.
3. **Product journey — Strongest section.** The successful path is clear; non-happy terminal states and billing verification are the only missing concepts.
4. **Economics — Blocking.** Fixed-cost, pay-per-conversion, and non-pricing language conflict. Replace this module rather than adding another one.
5. **FAQ and CTA — Healthy foundation.** The EHR, patient-communication, and BAA answers address real objections; the CTA should ask for the two numbers needed to qualify the opportunity.

## Evidence limits

This audit covers the rendered desktop landing page and its current source copy. It does not validate customer results, pricing legality, HIPAA compliance, integration readiness, form delivery, keyboard navigation, screen-reader behavior, or mobile reflow. Outcome-based pricing tied to federally reimbursable activity requires specialist healthcare counsel before publication or contracting.
