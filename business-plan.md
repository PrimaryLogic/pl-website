# Primary Logic: Business Plan

Date: 2026-08-13
Version: 3.0 — long-horizon agent harness, value-aligned outcomes

> **Commercial rule:** Primary Logic charges a fixed fee per completed outcome, verified in the customer's own system. Nothing else — no seats, no subscriptions, no minimums that bite before value.

## 1. Company and offer

Primary Logic is a long-horizon agent harness: software agents that persist on an administrative case for days or weeks — calling, texting, emailing, filling portals — until it reaches a verified terminal state. The model is Takeoff's (acquired by Sierra, July 2026: 3 people, ~$10M ARR in 7 months, 5 verticals, outcome-priced), applied lane by lane with one harness and per-lane configuration.

The offer, in one line:

> Give us a copy of what's leaking. Change nothing. Pay only for what completes.

Friction inversion is the strategy. We remove every adoption cost that outcome vendors normally impose:

- Integration is a webhook, an email forward, or a CSV — feed-in-a-day.
- No exclusivity, no lane-transfer contract, no baseline negotiation, no deep integration.
- Outcomes are verified in the customer's own system of record; we invoice from their records.
- Pilots are billed and run head-to-head against the status quo on a slice of inventory.

There is no moat strategy. The only test: built something people want, will pay for, with minimal friction. Compounding advantages (per-lane playbooks, verified performance data) are welcome byproducts, not the plan.

## 2. The outcome selection checklist

This defines what we will and will not sell. An outcome qualifies only if all seven hold:

1. **Recorded completion event.** The customer's system already records the outcome (kept visit, funded loan, signed retainer). We never define or estimate it.
2. **Value ≥ 10× fee.** The outcome is worth at least ten times what we charge.
3. **Persistence gap, not persuasion gap.** Today's failure is administrative follow-through — nobody called back, nobody rescheduled — not judgment or convincing skeptics.
4. **Reachable via human channels.** Phone, SMS, email, portal. No API access required to do the work.
5. **Demand already paid for.** The customer spent to generate the case; we monetize recovery. Found money, not new spend.
6. **Volume.** Thousands of cases per customer per year, supporting 6–7 figure contracts.
7. **Per-outcome compensation is legal in that lane.** AKS in healthcare, RESPA-adjacent rules in lending — counsel review per lane before public contract policy.

Fail any filter, walk away — including from otherwise attractive customers.

## 3. Product in brief

One harness, configured per lane. A separate `product-spec.md` carries the full specification.

- **Core loop:** signal in (feed row, webhook, reply) → decision (next action or terminal state) → scheduled task → channel interaction (voice, SMS, email, portal) → new signal. Repeats over days or weeks until terminal.
- **Case memory:** every case carries full attempt, decision, and conversation history; nothing depends on a human remembering.
- **Verifier/grader:** matches claimed completions against the customer's system of record before anything is invoiced; also grades interaction quality.
- **Exception queue:** ambiguity, distress, clinical or legal content, or explicit opt-out routes to a human with full context. The agent does administrative work only — no clinical, legal, or financial judgment.
- **Auditable terminal states:** every case ends in exactly one known state (completed, declined, unreachable, ineligible, escalated, blocked). Only completion is billable.

## 4. ICP and buyers

Sell to the revenue owner — COO, VP growth, managing partner — never IT. Integration is too light to need IT's calendar.

### Lane 1: Healthcare specialty referrals (aged/unworked tail)

- **Who signs:** COO or VP patient access at a centralized multi-site specialty group.
- **Feed:** copy of the aged or unworked referral queue — CSV export or scheduled report. BAA and consent handled; nothing else asked.
- **Billable event:** kept first visit (not booked), verified from their scheduling system/EHR.
- **Fee hypothesis:** ~$100 per kept visit. Takeoff's public healthcare anchor was $55/converted patient; we charge per *kept* on tail inventory where every completion is incremental by construction.
- **Positioning:** second pass, not replacement. Assort Health ($1.2B valuation, $222M raised) shipped full referral-lifecycle "Referrals" in Aug 2026 at subscription prices — so: "keep your scheduling AI; we convert what it can't finish." Aged inventory is the wedge, not a disqualifier.
- **Legal flag:** federal anti-kickback and state fee-splitting/patient-brokering review before scale.

### Lane 2: Lending (refi recapture, application abandonment)

- **Who signs:** VP growth or head of production at a mid-market lender or IMB.
- **Feed:** abandoned applications and past-customer rate-watch lists.
- **Billable event:** funded loan, verified in the LOS.
- **Fee hypothesis:** per funded loan at 1–10% of gain-on-sale. Takeoff's proven lane, orphaned by the Sierra acquisition (Sierra will chase enterprise).
- **Legal flag:** RESPA-adjacent compensation rules; licensing boundaries on what unlicensed outreach may say.

### Lane 3: Legal intake (personal injury)

- **Who signs:** managing partner or intake director.
- **Feed:** unconverted leads and stalled intake files.
- **Billable event:** signed retainer, verified in the case management system.
- **Fee hypothesis:** per signed case. Firms already pay per signed case — per-outcome willingness is pre-proven.
- **Legal flag:** state bar rules on fee-sharing and solicitation; structure as marketing/administrative services.

**Later lanes:** high-ticket local services (solar, HVAC, dental, med spa, veterinary), insurance binding, enrollment funnels — same checklist, same harness.

### First five customers

Chosen by customer, not vertical: (1) founder access to the signer; (2) feed-in-a-day feasible; (3) outcome value ≥ $500; (4) willing to run a billed head-to-head pilot. Five customers passing these filters beat any top-down vertical thesis.

## 5. Business model and pricing

- Per-completed-outcome fee only. Anchored at 1–10% of outcome value, satisfying the ≥10× filter.
- Billed pilots — head-to-head on a slice or on aged inventory. If we complete nothing, the invoice is zero; the pilot is the product.
- The contract defines the billable event precisely: eligibility, attribution window, self-completion after contact, duplicates, reschedules, disputes, audit rights. This discipline carries over from v2.1 unchanged.
- Unit economics sketch: delivery cost per case is cents to a few dollars of voice and inference, spread over many attempts. At ~$100 per completion and plausible completion rates on tail inventory, target 60–80% gross margin. Measure per lane; do not assume software margins.

## 6. Sales motion

Founder-led. The pitch is the one-line offer; the close is a start date, not a contract negotiation.

1. Get the signer to hand over a copy of a leaking feed (aged referrals, abandoned applications, stalled intake).
2. Run a billed head-to-head pilot on a slice. They change nothing.
3. Invoice from their own records — completions they can verify in their own system.
4. Expand: more volume in the lane → adjacent outcomes for the same customer → new lanes on the same harness.

No pilot-to-contract conversion machinery: the pilot is production at production prices, just small.

## 7. Twelve-month proof milestones

Operating targets, not forecasts:

- **Months 0–3:** counsel-signed per-outcome structure for lanes 1–2; first 3 billed pilots live (feed received within one day of signature); first verified, invoiced completions.
- **Months 4–6:** 2 lanes live in production; 5 paid pilots run, ≥3 converted to ongoing production; per-lane delivery cost and completion rate measured, gross margin ≥ 60% in at least one lane.
- **Months 7–9:** third lane launched config-only — no new harness code, no per-customer engineering; first customer expanded to a second outcome.
- **Months 10–12:** first lane at $1M annualized run rate; ≥8 paying customers; harness demonstrably reused across 3 lanes.

## 8. Risks and honest unknowns

1. **Sierra Horizon runs the same thesis with far more money.** Acceptable under our test — the market is many lanes deep, Sierra will chase enterprise, and "people want it and pay" doesn't require being alone. But it caps nothing-special outcomes.
2. **Per-lane legality.** AKS, state brokering, RESPA-adjacent, bar rules. Any lane can die at counsel review; the checklist's filter 7 exists so we find out before selling.
3. **Completion rates and delivery costs on tail inventory are unknown.** Aged inventory may be aged because it's dead. Billed pilots price this risk at zero for us in revenue terms but not in cost terms.
4. **Assort and incumbents bundling "good enough" recovery** into subscriptions could squeeze the healthcare lane; the second-pass positioning is a hypothesis, not a fact.
5. **Working capital:** billing on completion (kept, funded, signed) means revenue lags work by weeks. Manageable at pilot scale; model it before the first $1M lane.
6. **Fee acceptance:** ~$100 per kept, per-funded-loan percentages, and per-retainer fees are hypotheses until five customers pay them twice.
