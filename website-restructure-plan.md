# Website Restructure Plan — Primary Logic

**Date:** 2026-08-13
**Scope:** Planning only. No app/component/content files were edited.
**Strategy:** Pivot from a healthcare-only referral site to a horizontal long-horizon
agent-harness company. The current healthcare site moves to `/healthcare`; a new
horizontal site takes over `/`. Structure mirrors hiretakeoff.com's information
architecture; all copy below is original.

---

## 0. Current-state inventory (what exists today)

All of `/` is rendered by `components/HealthcarePage.tsx`:

| Order | Section | Component | Copy source | Current angle |
|---|---|---|---|---|
| — | Nav | `components/SiteNav.tsx` | `nav` in `lib/content.ts` | Wordmark + anchors (`#challenge`, `#product`, `#economics`) + "Get in touch" → `#contact` |
| 1 | Hero | `components/Hero.tsx` + `EmailCapture` | `hero` | "Turn referrals into booked patients." Whole-lane assignment framing ("Assign Primary Logic a complete eligible referral lane") |
| 2 | Challenge | `components/ChallengeSection.tsx` | `challenge` | Three stalled-patient cards (Robert/Jennifer/Marcus), "Every dropped patient is lost revenue." |
| 3 | Solution | `components/SolutionSection.tsx` + `components/CoordinationTimeline.tsx` | `solution`, `journey` | Six-step animated referral journey (Ellis Carter) + terminal-states card. Strong auditability/writeback language |
| 4 | Economics | `components/EconomicsSection.tsx` + `economics/OperatingComparison.tsx` + `economics/ValueQualification.tsx` | `economics` | "Buy tools—or transfer the job" 4-row comparison; pricing rules; static illustrative annual case |
| 5 | Answers | `components/AnswersSection.tsx` | `answers` | 3 FAQ cards (EHR, who talks to patients, PHI/BAA) |
| 6 | Final CTA | `components/FinalCta.tsx` + `EmailCapture` | `finalCta` | "Put every referral under one accountable operating system." |
| — | Footer | `components/SiteFooter.tsx` | `footer` | Wordmark + © + Privacy link only (Terms page exists but is unlinked) |

**Orphaned components** (exist, imported by nothing in the rendered tree):
`components/economics/Ledger.tsx`, `components/economics/CostComparison.tsx`,
`components/economics/EconomicsProvider.tsx`, `components/economics/SliderField.tsx`.
The interactive calculator (Provider + Ledger + SliderField) is fully working and
reusable; `CostComparison` is a static "illustrative month" table.

**Routes:**
- `/` → HealthcarePage
- `/healthcare` → `permanentRedirect("/")` (308 — note the cache risk in §5)
- `/contact` → StubPage placeholder ("Point this at a real inbox…"), noindex
- `/privacy-policy` → real drafted notice (healthcare/BAA-scoped), noindex
- `/terms-of-service` → placeholder, noindex
- `/api/demo-request` → POSTs `{email, practice, source}` to `DEMO_REQUEST_WEBHOOK_URL`
- `app/opengraph-image.tsx` → healthcare-themed OG ("Turn referrals into booked patients")
- `app/sitemap.ts` → only lists `/`
- `app/layout.tsx` metadata → healthcare-specific title/description, global

**Analytics** (`lib/analytics.ts`): `cta_click`, `detail_toggle`, `calculator_changed`,
`demo_form_started/submitted/succeeded/failed`, bridged via `dataLayer` + a
`primarylogic:analytics` CustomEvent. `AnalyticsBridge` listens for `[data-analytics]`.

### hiretakeoff.com structure as observed live on 2026-08-13

Fetched both pages; no Sierra/acquisition mention is live yet (acquired 2026-07-23,
site apparently unchanged). Structure we are mirroring (not copying):

- **Home:** hero ("agent runtime for long-horizon work" framing) → demo CTA →
  three concrete multi-day workflow demos (lending refi, healthcare verification,
  onboarding recovery) → **Runtime loop section**: SIGNAL → DECISION → TASK →
  INTERACTION as a cycling timeline → four verticals listed (mortgage refinance,
  coverage verification, customer onboarding, patient referral) → an "Impact"
  section that *invites case-study requests rather than publishing metrics* →
  repeat demo CTA → minimal footer. **No pricing on the page.**
- **/healthcare:** hero (patient-coordination team, voice/SMS/email) → challenge
  (contact rates, form abandonment, fragmented follow-up) → sample patient
  profiles → four-step process → capabilities list (incl. HIPAA) → an economics
  section comparing cost-per-patient vs Paid Ads and BPO → CTA.

Where we deliberately diverge from Takeoff: we DO put outcome pricing on the
homepage (it is our thesis, not a detail), and we do NOT use a Paid-Ads cost
comparison (demand generation is a different job; comparing against it is a
category error and reads as inflated).

---

## 1. New information architecture

### Route map

| Route | Status | Content |
|---|---|---|
| `/` | **NEW** | Horizontal harness site (spec in §2). New `components/home/*` tree |
| `/healthcare` | **CHANGED** | The current site, adapted per §3. Remove `permanentRedirect`; render adapted `HealthcarePage` |
| `/lending` | **OMIT for now** | See recommendation below |
| `/legal` | **OMIT for now** | See recommendation below |
| `/contact` | Keep (noindex) | Still a stub; decision-needed: wire to a real inbox or delete before launch |
| `/privacy-policy` | Keep | Generalize scope paragraph (§4) |
| `/terms-of-service` | Keep (placeholder) | Link it from the footer; legal copy still owed |
| `/api/demo-request` | Keep | Field rename `practice` → `organization` with back-compat (§4) |

**Lane-stub recommendation: do not ship `/lending` and `/legal` as routes yet.**
Reasons: (a) we have no pilots, demos, or proof in those lanes — a thin stub page
weakens the credibility the homepage builds; (b) every public route is a page we
must keep honest and maintained; (c) the homepage lanes section (§2.5) can present
lending and legal as "in pilot design — talk to us" cards whose CTA is the demo
form with a `lane` property, which captures the same intent with zero new surface.
Ship each lane page only when there is at least one running pilot to describe.
*(Flagged as Decision D1 in §5.)*

### Redirects

- **Remove** the `permanentRedirect("/")` in `app/healthcare/page.tsx` — the route
  now serves content. ⚠️ Risk note: 308s are cached by browsers indefinitely; any
  visitor who ever hit `/healthcare` pre-launch may keep being bounced to `/`.
  Traffic to date is presumably near-zero, so accept this — but never use
  `permanentRedirect` for provisional routing again; use `redirect()` (307).
- **No other redirects needed.** No existing URL disappears; `/` changes content
  in place. Section anchors on `/` (`#challenge`, `#product`, `#economics`,
  `#contact`) are reused or superseded on the new home page — no external links
  depend on them yet.

### Nav changes (`components/SiteNav.tsx`, `nav` in content)

Make the link set a prop (or per-page content export) instead of a single global:

- **On `/`:** `How it works` (`#loop`) · `Jobs we take` (`#jobs`) · `Pricing`
  (`#pricing`) · `Healthcare` (`/healthcare`) — CTA: **"Start a pilot"** → `#contact`.
- **On `/healthcare`:** `The challenge` (`#challenge`) · `How it works`
  (`#product`) · `Economics` (`#economics`) — plus a leading breadcrumb-style
  link `All lanes` → `/`. CTA unchanged label → **"Start a pilot"** → `#contact`.
- No dropdown lane-switcher yet — with one live lane it's ceremony. Revisit when
  a second lane page ships.

### Footer changes (`components/SiteFooter.tsx`, `footer` in content)

Add: `Healthcare` (`/healthcare`), `Terms` (`/terms-of-service` — page already
exists, currently unlinked), and a `mailto:` contact link using `CONTACT_EMAIL`.
Keep Privacy. *(Decision D2: confirm `hello@primarylogic.com` is a real monitored
inbox before linking it.)*

### Metadata / OG changes

- `app/layout.tsx`: replace global healthcare metadata with horizontal metadata
  (draft in §2.9). Keep the title template.
- `app/healthcare/page.tsx`: add a `metadata` export carrying the current
  healthcare title/description (moved, lightly edited per §3).
- `app/opengraph-image.tsx`: rebuild with horizontal copy (§2.9). Create
  `app/healthcare/opengraph-image.tsx` from the current healthcare OG design.
- `components/HealthcarePage.tsx` structured data currently says "The AI intake
  agent for dermatology practices" — stale even today. Replace: root gets an
  `Organization` schema for Primary Logic; healthcare page gets a `WebPage`
  schema with the referral description.
- `app/sitemap.ts`: add `/healthcare`.

---

## 2. Main site (`/`) — section-by-section spec

New page component `components/home/HomePage.tsx` composed of the sections below.
Copy lives in a new `lib/content/home.ts` (see §5 step 1). Reuse `Section`,
`Eyebrow`, `Heading`, `SiteNav`, `SiteFooter`, `EmailCapture`, `AnalyticsBridge`.
Voice: plain, confident, specific. No healthcare jargon on this page.

### 2.1 Hero — the harness thesis + outcome pricing in one screen

- **Purpose:** say what we are (agents that own long jobs end-to-end) and how we
  charge (per completed outcome only) before the first scroll.
- **Takeoff analogue:** their hero ("agent runtime" framing + demo CTA). We differ
  by putting the pricing doctrine in the hero itself.
- **Components:** adapt `Hero.tsx` pattern (headingLead/headingAccent + body +
  outcome line + compact `EmailCapture`). New file `components/home/HomeHero.tsx`.

**Draft copy**

> **H1:** Agents that carry a job **to the finish.**
> *(headingLead: "Agents that carry a job", headingAccent: "to the finish.")*
>
> **Body:** Primary Logic runs autonomous agents that own slow administrative
> work end to end — every call, text, email, and portal step, across days or
> weeks — until the job reaches a verified outcome in your own system.
>
> **Outcome line:** No seats. No subscriptions. A fixed fee per completed
> outcome, and failed attempts cost you nothing.
>
> **CTA:** compact EmailCapture, button label "Start a pilot".

### 2.2 The leak — problem framing

- **Purpose:** name the category of work we take: follow-through that dies in
  queues. Horizontal version of the current ChallengeSection.
- **Takeoff analogue:** their three concrete workflow demos. We compress to three
  cross-industry stalled-work cards, reusing the ChallengeSection card layout.
- **Components:** adapt `ChallengeSection.tsx` → `components/home/LeakSection.tsx`
  (same two-card-plus-arrow row pattern; swap patient rows for cross-industry rows).

**Draft copy**

> **Eyebrow (loss tone):** The leak
> **Heading:** Every pipeline leaks after the handoff.
> **Intro:** The first contact usually happens. It's the fourth follow-up on day
> eleven that doesn't. Work that needs weeks of persistence stalls in queues
> nobody owns — and quietly becomes lost revenue.
>
> **Rows (illustrative, labeled as such):**
> 1. *Refi lead, day 9* — "Rate quoted, application started" → "Stalled at income
>    docs. Two reminders sent, none since." *(chip: Lending)*
> 2. *Injury claimant, day 4* — "Qualified, retainer sent for signature" →
>    "Unsigned. No callback scheduled." *(chip: Legal intake)*
> 3. *Referred patient, day 12* — "Referral received, first pass done" →
>    "Unreached after two attempts. Nobody owns attempt three." *(chip: Healthcare)*
>
> **Card footnote:** Illustrative examples, not customer data.

### 2.3 The working loop — how it runs

- **Purpose:** our version of Takeoff's SIGNAL → DECISION → TASK → INTERACTION
  runtime section. Our loop names (original): **Watch → Decide → Act → Record.**
  The fourth stage is deliberately ours: writeback/verification in the customer's
  system is the differentiator that makes outcome billing auditable.
- **Anchor:** `#loop`.
- **Components:** new `components/home/LoopSection.tsx`. Simplest credible form:
  a four-step horizontal cycle (cards with arrows, loop-back arrow from Record to
  Watch). Optionally reuse the `CoordinationTimeline` interaction pattern later;
  do not block launch on animation. Below the loop, a generalized terminal-states
  card adapted from `SolutionSection`'s (same layout, new items).

**Draft copy**

> **Eyebrow:** How it runs
> **Heading:** One agent owns the job. A loop keeps it moving.
> **Intro:** A job isn't a ticket that waits for a human to pick it up. Each one
> is held by an agent that runs the same loop until the work is finished.
>
> **Watch** — The agent listens for anything that changes the job: an inbound
> reply, a portal status flip, a document arriving — or silence past a deadline,
> which is a signal too.
>
> **Decide** — It reads the job's full history and current state, then picks the
> single next move, checked against the playbook you approved. Anything outside
> the playbook escalates to your team.
>
> **Act** — It makes the call, sends the text or email, or works the portal.
> Multi-party, multi-channel, on schedule — for as many days as the job takes.
>
> **Record** — Every action and response lands in the job's auditable history,
> and completions are verified against your system of record before anything is
> billable. *(Copy note: do NOT say "written back to your system" — v1 explicitly
> excludes EHR/LOS/CRM writeback per product-spec.md §7; we read and reconcile,
> we don't write.)*
>
> **Terminal-states card:**
> **Heading:** Every job ends in a named state.
> **Body:** Nothing is abandoned silently. An agent closes a job only as:
> - Completed — the outcome you defined, verified in your system *(the only billable state)*
> - Declined — the person said no
> - Unreachable — after the full agreed contact sequence
> - Escalated — judgment your team reserved for itself
> - Blocked or disqualified — the job can't proceed on your side
>
> **Note:** Your system's status determines billing — not our dashboard.

### 2.4 What jobs we take — the qualification checklist

- **Purpose:** make the outcome checklist customer-legible: readers should be able
  to self-diagnose whether their leak is our kind of job.
- **Anchor:** `#jobs`.
- **Takeoff analogue:** none directly (their verticals list gestures at it). This
  section is our addition; it does the sales-qualification work.
- **Components:** new `components/home/JobsSection.tsx` — a five-item checklist
  (reuse the `bg-band` check-item styling from SolutionSection's terminal-state
  list), plus a short "how a job arrives" strip for the feed-in-a-day doctrine.

**Draft copy**

> **Eyebrow:** What we take
> **Heading:** A job is ours if it checks five boxes.
>
> 1. **It leaks.** The work exists today and measurably dies in a queue — not a
>    new motion you're hoping to invent.
> 2. **It's long.** Finishing takes days or weeks of sequenced follow-through
>    across several parties, not one call.
> 3. **It's administrative.** Persistence, sequencing, and paperwork. Licensed
>    and policy decisions stay with your team, by design.
> 4. **It ends somewhere you can verify.** A funded loan. A signed retainer. A
>    kept first visit. A status in *your* system, not a claim in ours.
> 5. **It's worth a fee.** Each completion is worth far more to you than we
>    charge for it — or we shouldn't take the job.
>
> **Feed strip (sub-section):**
> **Heading:** Change nothing. Send a copy.
> **Body:** Onboarding is a feed, not an integration project. Give us a copy of
> the leaking queue — a webhook, a forwarded email, or a nightly CSV — and keep
> operating exactly as you do today. Most feeds are live within a day.

### 2.5 Lanes — where we run

- **Purpose:** present verticals honestly: one live lane with a real page, two in
  pilot design, a named "later" list.
- **Takeoff analogue:** their four-vertical list.
- **Components:** new `components/home/LanesSection.tsx` — three cards + a
  "next" line. Healthcare card links to `/healthcare`; lending/legal cards' CTA
  is `#contact` (form records `lane` — see §4 analytics).

**Draft copy**

> **Eyebrow:** Lanes
> **Heading:** Same harness. Different finish lines.
> **Intro:** The loop doesn't change between industries — only the playbook, the
> parties, and the outcome we're paid on.
>
> **Card — Healthcare (Live · link: "See the healthcare lane →" `/healthcare`):**
> **Specialty referral conversion.** After your schedulers and scheduling
> software take their first pass, we work the referrals that didn't convert —
> paid only per kept first visit, verified in your EHR.
>
> **Card — Lending (In pilot design · CTA → #contact):**
> **Refi recapture and application rescue.** Rate-watch re-engagement and
> abandoned applications, worked to funded loans — the only outcome we'd bill.
>
> **Card — Legal intake (In pilot design · CTA → #contact):**
> **Signed retainers, not contact attempts.** Personal-injury intake followed
> through to a signed engagement, however many touches that takes.
>
> **Next line:** Next up: high-ticket local services, insurance, and enrollment.

### 2.6 Outcome pricing — the doctrine section

- **Purpose:** contrast per-completed-outcome pricing against seats, hours, and
  usage. This is the thesis; give it a full section.
- **Anchor:** `#pricing`.
- **Takeoff analogue:** none — their site omits pricing. Deliberate divergence.
- **Components:** new `components/home/PricingSection.tsx`, structurally an
  adaptation of `economics/OperatingComparison.tsx` (same accessible role=table
  grid, highlighted primary row) with generalized rows, plus the three-rule strip
  from `EconomicsSection`.

**Draft copy**

> **Eyebrow:** Outcome pricing
> **Heading:** You pay when the job completes. That's the whole model.
> **Intro:** Every other way of buying this work bills you for inputs — people,
> hours, licenses, messages — whether or not anything finishes. We can only
> invoice a completed outcome, so unfinished work is our cost, not yours.
>
> **Comparison table** *(columns: How you buy · What you pay for · What happens
> when work doesn't finish)*
> - **Seats** — Licenses for your team to do the work in — You still pay; the queue is still yours
> - **Hours (staff or BPO)** — Effort and attempts — You still pay; attempts were made
> - **Usage-based AI** — Every call, message, or "resolution" — You still pay, per attempt
> - **Primary Logic** *(highlighted, badge "Per outcome")* — Completed outcomes,
>   verified in your system — **You pay $0**
>
> **Three rules strip:**
> - **Billable:** A completion your own system confirms.
> - **$0:** Declined, unreachable, escalated, blocked, or disqualified jobs.
> - **Fixed first:** The per-outcome fee is set before launch, from the lane's
>   complexity and a conservative estimate of what a completion is worth to you.

### 2.7 Proof — honest placeholder (no public case studies yet)

- **Purpose:** we have no logos or measured metrics to publish. Do not fabricate.
  Sell the *structure of the bet* instead: billed head-to-head pilots.
- **Takeoff analogue:** their "Impact" section also declines to publish metrics
  and invites a conversation — validation that honesty here is viable.
- **Components:** new `components/home/PilotSection.tsx` — a four-step numbered
  strip. No metric tiles, no logo walls, no invented percentages.

**Draft copy**

> **Eyebrow:** Proof
> **Heading:** No case studies yet. A better offer instead.
> **Intro:** We're early, and we won't dress that up with borrowed logos or
> invented percentages. What we offer is a pilot structured so the proof shows up
> in your numbers, not ours.
>
> **Steps:**
> 1. **Pick one leaking lane.** A queue you already measure and already lose.
> 2. **Send a copy of the feed.** Webhook, forwarded email, or CSV. Your process
>    doesn't change; usually live within a day.
> 3. **Run it head-to-head.** Keep doing what you do today. We work the same
>    queue alongside — or just the tail you've written off.
> 4. **Pay per completion.** You verify each one in your own system before it's
>    billable. If nothing completes, the pilot cost you nothing.

### 2.8 Final CTA

- **Purpose:** conversion. **Recommendation: keep the `EmailCapture` →
  `/api/demo-request` flow as the single conversion action** (email + optional
  organization). It's built, spam-protected, and lower-friction than a calendar
  embed; a scheduling link can be added to the follow-up email instead.
  *(Decision D3 if a Cal/Calendly embed is preferred.)*
- **Components:** reuse `FinalCta.tsx` with new copy; button label "Start a pilot".

**Draft copy**

> **Heading:** Send us what's leaking.
> **Body:** A pilot starts with a copy of one feed and changes nothing about how
> you operate. Completions are verified in your system, billed per outcome —
> and if nothing completes, you owe nothing.

### 2.9 Metadata + OG for `/`

- **Title (default):** `Primary Logic | Agents That Finish the Job`
- **Description:** "Primary Logic runs autonomous agents that own multi-week
  administrative jobs end to end — voice, SMS, email, and portals — priced per
  completed outcome, verified in your own system."
- **OG image:** same visual system as current (`app/opengraph-image.tsx`), new
  copy — headline "Agents that carry a job to the finish", subline "Per completed
  outcome. Verified in your system. $0 for anything that doesn't finish.",
  bottom rail: `ONE OWNER` / `ONE NEXT MOVE` / `ONE VERIFIED OUTCOME`.
  Top-right label changes from `REFERRAL CONVERSION` to `OUTCOME OPERATIONS`.

---

## 3. `/healthcare` — change spec for the existing page

`app/healthcare/page.tsx` drops the redirect and renders the adapted
`HealthcarePage`. Copy moves to `lib/content/healthcare.ts`. The big shift:
**from "assign us the whole lane" (exclusive transfer) to "we convert the tail
your first pass couldn't finish" (second pass, per kept first visit, complement
to scheduling AI).**

⚠️ **Competitor rule:** the positioning is "keep your scheduling AI," but no
competitor (e.g., Assort) is ever named in page copy. Any future comparative or
named claim requires a verification flag before publication.

### 3.1 Hero (`hero`, `Hero.tsx`) — REWRITE

Current copy is whole-lane-transfer framing ("Assign Primary Logic a complete
eligible referral lane… We own every permitted administrative next step…"). Replace:

> **H1:** We convert the referrals **your first pass couldn't.**
> **Body:** Keep your schedulers and your scheduling software — they take the
> first pass. Primary Logic takes the second: the unreached patients, the
> abandoned intakes, the stalled authorizations. We work each one across voice,
> SMS, email, payer, and EHR until it reaches a kept first visit or another
> named terminal state.
> **Outcome line:** You pay per kept first visit, verified in your EHR.
> Everything else is $0.

Component unchanged; copy only.

### 3.2 Challenge (`challenge`, `ChallengeSection.tsx`) — MOSTLY SURVIVES

Cards (Robert/Jennifer/Marcus) survive as-is — they already depict tail cases.
Two copy edits:
- **Intro** gains the second-pass frame: "Your team and your tools make the first
  attempt. It's what happens after that first attempt fails that leaks: intake
  forms that never come back, referrals no one calls a third time, follow-ups
  with no owner."
- Heading "Every dropped patient is lost revenue." — **replace** (it matches
  Takeoff's live healthcare page phrasing too closely): → **"The referrals you've
  already paid for are the ones leaking."**

### 3.3 Solution (`solution`, `journey`, `SolutionSection.tsx`, `CoordinationTimeline.tsx`) — LIGHT EDITS

- Keep the heading pattern; strip "assigned"/ownership vocabulary. New heading:
  **"One owner, one next action, one auditable outcome for every referral we take."**
- Intro: keep the system-of-action / EHR-remains-system-of-record / clinical
  -decisions-route-to-your-team copy — it survives verbatim except "referral
  operation" phrasing may say "the referrals handed to us."
- **Terminal-states card: keep.** This language is good and now matches the
  homepage's generalized version. Only edit: "Every assigned referral ends in a
  known state." → "Every referral we take ends in a known state."; keep the
  billing note ("The EHR's kept first appointment status determines billing…").
- **CoordinationTimeline (Ellis Carter journey): keep unchanged.** It is the best
  asset on the site and is pass-agnostic. Optional one-line edit to step 1's
  `signal` to hint at second pass ("A referral arrives for Ellis after two
  unanswered scheduling attempts") — nice-to-have, not required. Keep the
  illustrative-data note and the dashboard stat disclaimer as-is.

### 3.4 Economics (`economics`, `EconomicsSection.tsx`, `economics/*`) — REFRAME

**OperatingComparison (keep component, edit rows):**
- Row "Access software or AI": keep — it is factual and non-disparaging (tools
  automate steps; someone still owns completion). Verify it can't be read as a
  swipe at a named category; current wording is fine.
- Row "Primary Logic": `purchase` changes from "An assigned referral lane
  operated through a verified terminal state" → **"The unconverted tail of your
  referral queue, worked to a verified terminal state"**. Badge "Job transferred"
  → **"Second pass"**.
- Section heading "Buy tools—or transfer the job." → **"Keep your stack. Hand
  off the tail."** Intro: "This isn't a rip-and-replace decision. Your team and
  your tools keep the first pass; the question is who owns a referral after that
  pass fails — and what they're paid for."
- The paid-media note ("Paid media is not included: it creates demand…") — keep;
  it is a scope clarification, not a cost comparison. **Do not add any
  cost-per-patient comparison against paid ads** (explicitly out, per doctrine).

**Pricing rules (in `EconomicsSection`):** the "Billable" rule changes with the
positioning. Current: "Every eligible kept first appointment verified in the
EHR." New:

> - **Billable:** A kept first visit, verified in your EHR, from a referral
>   handed to us after your first pass.
> - **$0:** Unreachable, declined, escalated, disqualified, or blocked referrals.
> - **Fixed first:** The per-visit fee is set before launch from lane complexity
>   and a conservative, finance-approved value per kept visit.

Section heading: "Pay for completed jobs—not attempts." → **"Every dollar maps
to a visit that was headed for a write-off."** Intro: "Because we only take
referrals after your first pass, every kept visit we bill is one you were
otherwise losing. There is no paying us for conversions you'd have gotten anyway."
*(This is the clean consequence of second-pass positioning — lead with it.)*

**ValueQualification (static annual case): retire in current form.** Its math
("every modeled kept outcome is billable, not only incremental lift") encodes the
whole-lane model and contradicts second-pass billing. Replace with the revived
interactive module below. If a static case is still wanted, rebuild it on tail
math (referrals surviving first pass × recovery scenario × fee).

**Revive the orphaned interactive calculator** (`EconomicsProvider` + `Ledger` +
`SliderField`) as the economics centerpiece, reframed to **cost per incremental
kept patient**:
- Inputs (relabel in content): monthly referrals; kept after your current first
  pass; modeled kept with Primary Logic working the tail *(scenario input, not a
  forecast — keep that hint)*; monthly coordination cost removed or avoided;
  contribution per incremental kept patient; fee per kept visit.
- Derived rows to feature: **incremental kept patients / month**, **fee per
  incremental kept patient** (annual fee ÷ incremental kept — the section's
  named number), incremental contribution, annual value retained.
- `lib/economics.ts` change: under second-pass billing, `annualOutcomeFee`
  becomes `additionalBooked * outcomeFee * 12` (billed on tail conversions we
  produce), not `modeledBooked * …`. Keep all clamping logic.
- **No Paid-Ads comparison anywhere in this module** (none exists today; keep it
  that way). `CostComparison.tsx` (illustrative month) may return as a small
  intro card with tail-based numbers, or stay retired — implementer's choice;
  default: stay retired.

### 3.5 Answers (`answers`, `AnswersSection.tsx`) — SURVIVES + 1 ADDITION

Existing three items (EHR, who talks to patients, PHI/BAA) survive verbatim —
they are lane-appropriate and well-drafted. Add a fourth card (grid handles 2×2
on md):

> **Q: We already use scheduling software or a scheduling AI. Do we need this?**
> **A:** Keep it — it makes the first pass cheaper. Primary Logic takes the
> second pass: the referrals that didn't convert on the first. Nothing in your
> stack changes, and we're only paid when one of those referrals becomes a kept
> first visit.

### 3.6 Final CTA (`finalCta`, `FinalCta.tsx`) — REWRITE

> **Heading:** Give us the referrals you've written off.
> **Body:** A pilot starts with a copy of your referral feed — webhook, email,
> or CSV — and changes nothing about how your team works today. Kept first
> visits are verified in your EHR before they're billable. If none are kept,
> you pay nothing.

### 3.7 Page metadata

Move current healthcare metadata out of `app/layout.tsx` into
`app/healthcare/page.tsx`: title "Specialty Referral Conversion" (template adds
"| Primary Logic"), description rewritten to second-pass framing. Add
`app/healthcare/opengraph-image.tsx` reusing the current OG design with the new
hero line; change its bottom-rail to `SECOND PASS` / `PER KEPT VISIT` /
`VERIFIED IN YOUR EHR`.

### Component disposition summary for `/healthcare`

| Component | Fate |
|---|---|
| `Hero`, `ChallengeSection`, `SolutionSection`, `CoordinationTimeline`, `AnswersSection`, `FinalCta`, `OperatingComparison` | **Reused**, copy edits only |
| `ValueQualification` | **Retired** (replaced by revived Ledger) |
| `EconomicsProvider`, `Ledger`, `SliderField` | **Revived** with reframed labels + fee math |
| `CostComparison` | Stays retired (default) |
| `EconomicsSection` | Edited to mount Provider + Ledger instead of ValueQualification |

---

## 4. Shared elements

### Nav (`components/SiteNav.tsx`)
Parameterize `links` and `cta` via props with defaults from content (per-page
link sets in §1). No lane dropdown yet. Wordmark keeps linking to `/`.

### Footer (`components/SiteFooter.tsx`)
Add Healthcare, Terms, and mailto links (§1). Rendered on both pages unchanged
otherwise.

### Demo-request flow (`components/EmailCapture.tsx`, `app/api/demo-request/route.ts`)
- `EmailCapture`: placeholder `name@practice.com` → `name@company.com`
  (healthcare page may override back via prop); full-variant field label
  "Practice name" → "Organization"; default `buttonLabel` "Get in touch" →
  "Start a pilot". Add optional `lane` prop posted with the body.
- API route: accept `organization` with `practice` as a back-compat alias; add
  optional `lane` (string, ≤40 chars) to the webhook payload; keep honeypot,
  size cap, and HTTPS-webhook validation exactly as-is. Webhook `type` stays
  `demo_request` (renaming it breaks the receiving end silently — leave it;
  Decision D4 if the receiver is also ours to change).
- Success message "…within one business day." — keep only if true (Decision D5).

### Analytics (`lib/analytics.ts`, `components/AnalyticsBridge.tsx`)
- Event names are already vendor-neutral and product-agnostic
  (`demo_form_*`, `cta_click`, `calculator_changed`) — **no renames needed**.
- Add a `page` ("home" | "healthcare") and optional `lane` property at call
  sites (EmailCapture `placement` already disambiguates form instances; extend
  placements: `hero-contact`, `contact-form` → keep, plus `lane-lending`,
  `lane-legal` if lane cards deep-link the form).
- The `primarylogic:analytics` CustomEvent name and `dataLayer` bridge stay.
- New home sections should set `data-analytics` ids on their CTAs:
  `nav-cta`, `hero-cta`, `lane-healthcare`, `lane-lending`, `lane-legal`,
  `pilot-cta`.

### Legal pages
- `privacy-policy`: scope paragraph is healthcare/BAA-specific. Generalize the
  first sentence and keep the healthcare sentences as a sub-case: "Information
  processed for a customer under a services agreement is governed by that
  agreement; for healthcare customers, protected health information is governed
  by the applicable business associate agreement." Rest survives (it already
  says "work email and organization information").
- `terms-of-service`: still placeholder; footer will now link it — acceptable
  pre-launch, but flag as an open legal deliverable (Decision D6).
- `contact`: still a stub and unlinked; either point it at
  `mailto:CONTACT_EMAIL` copy or leave noindexed as-is (default: leave).

### `lib/content.ts` split
Split into `lib/content/shared.ts` (CONTACT_EMAIL, footer, nav defaults),
`lib/content/home.ts` (all §2 copy), `lib/content/healthcare.ts` (adapted §3
copy). Keep the CLAIM RULE comment block at the top of each — it's doing real
work — and extend it: "No lane, customer, metric, or competitor claim ships
without evidence; competitors are never named."

---

## 5. Implementation sequencing (smallest risk first)

> Pre-step for the implementation session: per `AGENTS.md`, this repo runs a
> breaking-changes Next.js build — read the relevant guides in
> `node_modules/next/dist/docs/` (routing, metadata, redirects) before writing
> code, and keep the auto-generated AGENTS.md block committed.

1. **Content split (no visual change).** Create `lib/content/{shared,home,healthcare}.ts`;
   re-export current shapes so existing imports keep compiling; move `CONTACT_EMAIL`.
   Files: `lib/content.ts` → new tree, imports across `components/*`.
2. **Parameterize shells.** `components/SiteNav.tsx` (links/cta props),
   `components/SiteFooter.tsx` (new links), `components/EmailCapture.tsx`
   (labels, `lane` prop). Verify `/` renders identically with defaults.
3. **API back-compat.** `app/api/demo-request/route.ts`: accept
   `organization` + `lane`, keep `practice` alias. Deployable independently.
4. **Stand up `/healthcare` with current content.** Replace `permanentRedirect`
   in `app/healthcare/page.tsx` with `<HealthcarePage />` + moved metadata +
   `app/healthcare/opengraph-image.tsx`. `/` still shows the same page —
   duplicated temporarily, zero user-facing risk. Add `/healthcare` to
   `app/sitemap.ts`.
5. **Healthcare copy pivot (§3).** Edit `lib/content/healthcare.ts` (hero,
   challenge heading/intro, solution wording, answers +1, finalCta) and
   `OperatingComparison` row/badge strings.
6. **Economics reframe (§3.4).** Adjust `lib/economics.ts` fee math
   (`additionalBooked`-based fee), relabel fields/rows, mount
   `EconomicsProvider` + `Ledger` in `EconomicsSection`, retire
   `ValueQualification` from the tree (leave file or delete).
7. **Build the new home (§2).** `components/home/{HomePage,HomeHero,LeakSection,LoopSection,JobsSection,LanesSection,PricingSection,PilotSection}.tsx`
   + `lib/content/home.ts`. Develop behind the existing `/` untouched (e.g.,
   temporary `/preview-home` route or local-only), review, then…
8. **Swap `/`.** `app/page.tsx` renders `HomePage`; update `app/layout.tsx`
   metadata, `app/opengraph-image.tsx`, and the structured-data blocks
   (Organization on `/`, WebPage on `/healthcare`). Remove any preview route.
9. **Analytics pass.** Add `data-analytics` ids + `page`/`lane` properties;
   confirm `AnalyticsBridge` mounts on both pages.
10. **Legal + footer touch-ups.** Privacy scope paragraph, footer Terms link.
11. **QA.** `next build`; click every nav/footer anchor on both pages at mobile
    and desktop widths; reduced-motion pass on `CoordinationTimeline` and any
    new loop animation; OG images via `/opengraph-image` for both routes;
    submit the form end-to-end against a test webhook; Lighthouse spot-check.

### Decisions needed (do not guess during implementation)

- **D1:** Ship `/lending` + `/legal` stub routes? *Recommended: no — homepage
  cards only until a pilot exists.*
- **D2:** Confirm `hello@primarylogic.com` is real and monitored before adding
  the footer mailto (it already appears in error states and privacy page).
- **D3:** Conversion action stays EmailCapture/demo-request (recommended) vs
  adding a scheduling embed.
- **D4:** May the webhook payload `type`/fields change, i.e., do we control the
  receiver of `DEMO_REQUEST_WEBHOOK_URL`?
- **D5:** Is "within one business day" a promise we keep?
- **D6:** Terms of Service legal copy — still owed; footer now links to it.
- **D7:** Any public mention of complement-to-scheduling-AI positioning that
  names a vendor (e.g., Assort) is **blocked pending verification** — current
  plan names none in copy.
- **D8:** Illustrative $35 fee and calculator defaults — confirm they remain
  the numbers leadership wants displayed as illustrations.
