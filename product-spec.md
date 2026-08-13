# Primary Logic — Product Specification

**The outcome harness: a long-horizon agent runtime that pursues one measurable outcome per case, across any vertical, priced per completed outcome.**

Internal build doc. v0.1 — 2026-08-13. Owner: founding team. Status: pre-build.

---

## 1. Product thesis

Primary Logic builds a long-horizon agent harness — modeled on Takeoff's architecture — that pursues discrete, verifiable outcomes on behalf of businesses: a kept specialty appointment, a funded refi, a signed PI retainer. Signals arrive (webhook, inbox, fax, CSV, phone), a deterministic decision engine selects the next bounded task, a scheduler wakes work minutes to weeks out, and channel subagents (voice, SMS, email, portals) execute it — each interaction logged as the next signal. The customer pays a fixed fee per completed outcome and nothing else; we absorb all cost of pursuit. The wedge is friction inversion: integration is an email address, a webhook, or a CSV; no exclusivity, no change management, no deep system integration required to act; outcomes are verified in the customer's own system of record, and billed pilots run head-to-head against the status quo. One runtime, many lanes — a new vertical is configuration and policy, not new code.

---

## 2. The seven core components

### 2.1 Signal bus

**Responsibility.** Ingest everything the world sends us — webhooks, inbound email, fax (via fax-to-email/API), CSV drops, telephony events (inbound calls, SMS, voicemail), portal-scrape results — normalize each into a typed **Signal**, and append it to exactly one case's timeline (or open a new case, or park it unmatched).

**Key design decisions.**
- Every signal is immutable and append-only. The signal log *is* the source of truth; everything else is a projection.
- Normalization is two-stage: (1) raw capture (store the original payload/recording/attachment untouched, always), (2) typed extraction into `{case_ref, signal_type, channel, payload, occurred_at, received_at, source_id}`. Extraction may use an LLM (e.g., parsing a faxed referral PDF) but the raw artifact is retained for re-extraction.
- Case matching is deterministic first (exact IDs, phone, email), fuzzy second, human third. Unmatched signals go to a triage queue — never dropped, never auto-guessed onto a case.
- Idempotency at the door: every inbound carries a dedup key (provider message ID, file hash + row index, call SID). Replays are no-ops.

**MVP.** Email inbox ingestion, CSV upload (SFTP or manual), Twilio (or equiv) call/SMS webhooks, one generic inbound webhook endpoint per customer. Fax via a fax-to-email provider.
**Later.** Direct EHR/LOS/CRM event feeds, portal-event watchers, streaming connectors, self-serve source configuration.

### 2.2 Case memory

**Responsibility.** One durable record per pursued outcome. Holds identity (who we're contacting, on whose behalf, for what outcome), the full interaction history, extracted facts ("patient prefers Spanish, works nights, free Tuesdays"), promises made in both directions ("we said we'd call back Thursday"; "she said she'd check with her spouse"), constraints (consent status, do-not-call windows, channel opt-outs), and current state.

**Key design decisions.**
- Case memory is a **projection over the signal log plus engine decisions** — rebuildable from history. Facts and promises are structured entries with provenance (which signal/interaction produced them), not a free-text blob.
- The LLM writes to memory only through typed extraction steps ("extract commitments from this transcript") whose outputs are reviewed by schema validation, not prose.
- Promises are first-class: each has a due time and automatically becomes a scheduled task. Breaking a promise we made is a policy violation the engine must not allow.
- Retention/deletion per lane policy (HIPAA minimums for healthcare; contractual for others).

**MVP.** Postgres: `cases`, `signals`, `interactions`, `facts`, `promises`, `decisions` tables. Case view = a query.
**Later.** Semantic retrieval over long histories, cross-case learnings (aggregated, de-identified), memory compaction for very long-lived cases.

### 2.3 Deterministic decision engine

**Responsibility.** The policy layer. Given a case's state + a triggering event (signal arrived, timer fired), select exactly one next action — or a terminal state — plus side effects (schedule follow-up, update state, escalate). This is the component that makes behavior predictable, auditable, and improvable.

**Key design decisions.**
- The engine is **code, not a prompt**. Policies are explicit: state machine + rules ("no contact before 8am recipient-local", "max 2 voice attempts per week", "after 3 unreachable cycles, switch channel; after N, mark unreachable"). The LLM never chooses *what* to do next; it operates *inside* bounded steps the engine dispatches ("conduct this scheduling call within this script frame", "draft this SMS under 320 chars covering points A/B/C", "classify this reply as reschedule/decline/question").
- Every decision is logged: `{case_id, trigger, state_before, rule(s) fired, action chosen, state_after, policy_version}`. Auditable answer to "why did the system do X" in one query.
- Policies are versioned per lane. A case records which policy version made each decision.
- Guardrail checks (consent, quiet hours, frequency caps, opt-out) run as a mandatory gate *between* the engine's choice and the channel subagent's execution — defense in depth, so a policy bug can't dial a revoked number.
- When the engine can't classify a situation (rule conflict, LLM step returns low-confidence, out-of-frame reply), the deterministic answer is **escalate**, never improvise.

**MVP.** A per-lane state machine + rules table, evaluated in a single worker. Hand-written policies for lane 1.
**Later.** Policy DSL/config UI, simulation harness (replay historical signals against a candidate policy), A/B policy assignment.

### 2.4 Scheduler

**Responsibility.** Hold future work — minutes to weeks out — and wake the decision engine on timer or on signal. Agents are summoned by the world; nothing long-running.

**Key design decisions.**
- Tasks are durable rows, not in-memory timers: `{case_id, wake_at, reason, created_by_decision_id}`. A crash loses nothing.
- One active next-task per case (see invariant, §3). New signals cancel/supersede the pending timer through the engine, not around it.
- Wake execution honors contact-policy windows (a task due at 2am recipient-local defers to the window opening).
- Everything is at-least-once + idempotent; the engine re-derives the right action from current state at wake time, so a stale task fires harmlessly.

**MVP.** Postgres table + polling worker (every 30–60s). This scales far beyond pilot volume.
**Later.** Priority tiers, per-customer rate shaping, burst smoothing for campaign-style CSV drops, a proper queue if volume demands it.

### 2.5 Channel subagents

**Responsibility.** Execute one bounded interaction on one channel and report the result as a new signal. Four channels: voice (outbound + inbound), SMS, email, web-form/portal operation (e.g., booking into a scheduling portal, checking a lender portal status).

**Key design decisions.**
- A subagent receives a **task frame**: objective, allowed script/talking points, facts it may use, facts it must not disclose, hard limits (max duration, forbidden topics, escalation triggers), and the structured result schema it must return.
- Every interaction produces: raw artifact (recording, message body, screen trace) + structured result (`outcome_of_interaction`, extracted commitments, sentiment/flags) + cost. All three land on the signal bus.
- Voice agent must handle: identification/consent language, voicemail detection and lane-appropriate voicemail scripts, live transfer to the customer's front desk / loan officer when the human on the line wants it, and immediate graceful exit + flag on anything out-of-frame (clinical questions, legal advice, distress).
- Inbound is first-class from day one: the callback to our number, the SMS reply, the email response are where outcomes actually close. Inbound routes through the same engine — the subagent handles the live exchange within its frame; state changes go through decisions.
- Portal operation is scripted browser automation with LLM assistance for variability, always producing a screen trace; portals that break are an escalation, not a retry loop.

**MVP.** Outbound + inbound voice (one vendor stack), SMS two-way, templated email. Portal operation semi-manual: ops human executes, logs result into the console (which emits the signal).
**Later.** Automated portal operation, richer email threads, additional channels (WhatsApp, patient-portal messaging) per lane demand.

### 2.6 Outcome verifier + grader

**Responsibility.** Detect the terminal event, verify it **in the customer's own system of record**, grade the path that got there, and produce invoice-grade evidence.

**Key design decisions.**
- Verification source is customer-side by definition: their EHR schedule report, their LOS funding record, their signed-retainer log. We reconcile our claimed outcomes against a periodic export (CSV/report/read-only view) from *their* system. We never invoice off our own telemetry.
- Terminal events: `outcome_completed` (billable), `declined`, `unreachable`, `ineligible`, `withdrawn_by_customer`, plus `escalated_closed`. Each requires specified evidence.
- Grading: every closed case gets a machine grade — outcome, time-to-outcome, attempts by channel, cost of pursuit, policy-compliance flags, interaction-quality scores (rubric-based LLM eval of transcripts, sampled + human-audited). Grades roll up per policy version per lane (§9).
- Invoice = list of verified outcomes + per-case evidence link (customer-side record reference + our case history). Disputes resolve by looking at their system, which is the whole point.

**MVP.** Weekly customer-report reconciliation (they email/drop a schedule export; we match), manual-assisted matching UI, per-case evidence page, basic grade capture.
**Later.** Automated report pulls, near-real-time verification where feeds exist, automated quality scoring at 100% coverage, dispute workflow.

### 2.7 Exception queue + ops console

**Responsibility.** The human layer. Everything the engine escalates lands in one queue for our ops team; the customer gets a read-only console: case list, states, timelines, transcripts, upcoming actions.

**Key design decisions.**
- Escalations are typed (compliance-hold, unmatched-signal, out-of-frame-conversation, verification-mismatch, portal-failure, customer-request) with per-type SLAs. Ops resolution actions are themselves signals — the engine resumes deterministically after a human acts.
- Ops humans act *through* the console (which emits decisions/signals), never by side-channel edits to the DB. Same audit trail as the machine.
- Customer console is read-only in v1 but not an afterthought: it is the trust surface that makes "no integration" acceptable. Customer sees exactly what we did and said on every case, plus a pause/recall control per case (the one write we allow: `withdrawn_by_customer`).
- The exception queue doubles as the labeling surface: every human resolution is training/eval data for policy improvement.

**MVP.** Internal ops queue + case detail view; customer console = the same case views, scoped and read-only, plus case recall.
**Later.** Customer-configurable alerts, digest reports, commenting, SSO.

---

## 3. Case lifecycle

```
ingested → qualifying → active ⇄ waiting ⇄ escalated → terminal
```

| State | Meaning |
|---|---|
| `ingested` | Signal(s) created the case; not yet validated |
| `qualifying` | Eligibility/consent/data-completeness checks running (auto or ops) |
| `active` | An interaction is executing right now |
| `waiting` | A scheduled task is pending (the normal resting state) |
| `escalated` | Human owns the next move; machine paused |
| **Terminal:** | |
| `completed` | Outcome verified in customer's system — billable |
| `declined` | Contacted person affirmatively said no |
| `unreachable` | Contact policy exhausted across channels |
| `ineligible` | Failed qualification (bad data, no consent basis, out of scope) |
| `withdrawn` | Customer recalled the case |
| `escalated_closed` | Human closed it outside normal terminals (with reason) |

**The invariant.** At every moment, every case has exactly **one state**, exactly **one pending next action** (a scheduled task, an in-flight interaction, or an exception-queue item) **or is terminal**, and exactly **one append-only history** that explains every transition. If a case ever has zero next actions and isn't terminal, that's a bug and a monitor catches it (the "orphaned case" alarm — this is the single most important alert in the system).

---

## 4. Lane configuration model

A lane = one vertical outcome type. **A new lane must be config + policies + scripts, not code.** If launching lane 3 requires touching the runtime, that's a runtime bug.

| Varies per lane (config) | Shared (runtime) |
|---|---|
| Outcome definition + evidence spec (what counts as `completed`, what proves it) | Signal bus, ingestion adapters |
| Intake mapping (which fields, which sources, case-matching keys) | Case memory schema + projection |
| Qualification rules (eligibility, consent basis, data minimums) | Decision engine + scheduler mechanics |
| Contact policy (channels, sequencing, frequency caps, quiet hours, attempt budget) | Channel subagent execution + guardrail gate |
| Scripts + task frames per interaction type (call scripts, SMS/email templates, allowed/forbidden topics) | Verification/reconciliation machinery |
| Compliance profile (TCPA basis, HIPAA yes/no, recording rules, state-specific rules) | Exception queue + consoles |
| Verification source + reconciliation cadence | Grading, logging, audit |
| Fee per outcome + invoicing terms | Billing pipeline |
| Escalation triggers + routing (who at the customer, for what) | |

**Lane packs (initial):**
1. **Healthcare tail referrals** — outcome: kept specialty visit; evidence: appointment marked arrived/checked-in in the practice's schedule export; intake: CSV/fax/inbox copy of aged, unworked referrals.
2. **Lending recapture** — outcome: funded loan (or, as an intermediate billable if negotiated, completed application); evidence: LOS funding report; intake: abandoned-application / payoff-triggered lists.
3. **Legal intake (PI)** — outcome: signed retainer; evidence: firm's signed-case log; intake: lead-form and after-hours call overflow. Firms already price per signed case — cleanest pricing fit.

---

## 5. Compliance layer

Cross-cutting gate between decision and execution, plus lane-specific profiles. Compliance is a *precondition of the pricing model* — one TCPA class action erases years of per-outcome fees.

- **Consent + contact basis.** Every case records its contact-permission basis at qualification (existing business/provider relationship, prior express consent from application, customer attestation in the order form). No basis → `ineligible`, never "try anyway." Customer contracts warrant the basis for the lists they hand us.
- **Contact policy (TCPA and kin).** Enforced mechanically: quiet hours in recipient-local time, per-channel frequency caps, national + internal DNC screening before any dial/text, branded caller ID, honoring reassigned-number checks for texting. The guardrail gate re-checks at send time regardless of what the engine decided.
- **Opt-out / revocation.** Any channel, any phrasing. STOP and its cousins are handled deterministically; ambiguous revocations are classified and default to opt-out. Revocation applies across channels immediately, is stored on the case *and* on a person-level suppression list, and survives case closure and re-ingestion.
- **Recording + disclosure.** Two-party-consent states get the disclosure line; recording policy per lane and state; recordings stored encrypted with lane-appropriate retention.
- **HIPAA (healthcare lane).** We are a Business Associate: BAA with every practice, minimum-necessary PHI in intake mapping, encryption at rest/in transit, access logging, subcontractor BAAs (telephony, LLM, storage vendors must sign or be kept out of the PHI path), breach procedure. Scripts are administrative-only.
- **Administrative-only boundary.** Agents schedule, remind, collect logistics, and route. They never give clinical, legal, or financial advice. Boundary enforced three ways: script frames (LLM instruction), classifier watching transcripts (detection), and a hard escalation rule (any out-of-frame question → warm handoff or "someone from the office will call you" + escalate).
- **Human gates.** Ambiguity always resolves to a human: unclear consent, distressed or confused contacts, identity doubts, disputes. The deterministic engine's fallback action is `escalate`, and that's a feature.
- **Audit log.** Every decision, guardrail evaluation (pass *and* block), interaction artifact, and human action — immutable, queryable per case. This is also the sales artifact: we can show any customer exactly what happened on any case.

---

## 6. Build sequence

**Do not build the general harness first.** Launch lane 1 on the minimum runtime that honors the invariant (§3); extract the harness when lane 2 forces the config boundary. The architecture above is the *destination*; weeks 0–90 build the narrowest slice of it that closes kept visits.

| Days | Milestone |
|---|---|
| **0–15** | Lane-1 skeleton: Postgres schema (cases/signals/decisions/tasks/promises), CSV + inbox ingestion, hand-written lane-1 state machine, scheduler worker, guardrail gate with quiet hours/DNC/opt-out. SMS two-way live. Ops queue as a bare internal list. Orphaned-case alarm on day one. |
| **15–30** | Voice up (outbound + inbound on one vendor), call scripts + task frames for the referral-scheduling conversation, voicemail handling, warm-transfer to practice. First design-partner practice signed (BAA + per-kept-visit order form). Feed-in-a-day proven literally: their referral export flowing same-day. |
| **30–60** | First real cases end-to-end. Weekly schedule-export reconciliation + evidence pages + first invoice. Read-only customer console v0 (case list, timeline, transcripts, recall button). Tighten policies from live transcripts; grade every closed case by hand. Target: first verified kept visits billed; 2–3 practices live. |
| **60–90** | Lane 2 (lending recapture) design partner signed. Extracting the harness = moving lane-1 hard-coding into the lane-config model (§4) *as required by* lane 2's differences, no earlier and no further. Policy versioning live. Grading rollups per policy version. Target: lane 2 first contacts out; lane 1 unit economics known (cost of pursuit vs fee per kept visit). |

Exit criteria for calling the runtime a "harness": lane 2 launched without runtime code changes beyond its ingestion adapter.

---

## 7. MVP cut lines — explicitly out of v1

- **EHR/LOS/CRM writeback.** We read exports; we never write into customer systems. Booking happens by operating their existing front door (phone/portal) like a great human scheduler would.
- **Customer dashboard beyond the read-only console + case recall.** No customer-configurable anything.
- **Self-serve onboarding.** Every customer is hand-onboarded; the "feed in a day" is us doing the day.
- **Agent framework / platform for others.** We are not selling the harness, APIs, or SDKs. No moat-building.
- **Seats, subscriptions, or any pricing besides per-outcome.** One fee, one meter.
- **Automated portal operation** (ops-assisted in v1), **automated verification feeds** (weekly export reconciliation in v1), **A/B policy testing** (single evolving policy per lane in v1).
- **More than 2 lanes before day 90.** Legal intake waits until the harness extraction is proven.
- **Multi-language voice** beyond English + Spanish (Spanish only if lane-1 partners need it, SMS-first).
- **SOC 2 certification** (posture yes, audit later).

---

## 8. Key technical choices to make (flagged, not decided)

| Area | Decision to make | Leading options / notes |
|---|---|---|
| Telephony + voice | Build voice agent on a platform vs assemble (telephony + STT + LLM + TTS) | Twilio/Telnyx as substrate; Retell/Vapi/LiveKit-style voice-agent layer vs owning the pipeline. Criteria: BAA availability, latency, barge-in quality, transfer reliability, per-minute cost vs per-outcome economics. Decide by day 15. |
| LLM usage per step type | Which model tier per bounded step | Cheap/fast for classification + extraction; strong model for live voice turns and drafting; rubric eval model for grading. All calls carry `{case_id, decision_id, step_type}` for cost + audit attribution. BAA-covered endpoints for the PHI path. |
| Evented persistence | How literally event-sourced | Leading: plain Postgres, `signals` + `decisions` as append-only tables, state as a normal column updated in the same transaction (poor man's event sourcing). Avoid heavyweight ES frameworks. Revisit only on real scale. |
| Idempotency + dedup | Uniform scheme across ingestion, tasks, and outbound sends | Dedup keys at ingestion (§2.1); task execution guarded by decision-id; outbound sends get an idempotency key so a retried worker can't double-text. Person-level identity resolution (same human, two cases) needs a rule by lane 2. |
| Observability | What we watch from day one | Orphaned-case alarm (§3), guardrail-block rate, escalation rate by type, time-in-state distributions, per-case cost of pursuit, channel success rates, reconciliation mismatch rate. Plain metrics + structured logs; no vendor decision needed yet. |
| Job execution | Worker model | Single polling worker + Postgres `SELECT ... FOR UPDATE SKIP LOCKED` is enough for a long time. Flag: don't adopt a workflow engine until the scheduler table demonstrably can't. |

---

## 9. Grading + learning loop

Every closed case emits a grade (§2.6). The loop that turns grades into better lanes:

1. **Collect.** Per case: outcome, path (sequence of decisions + interactions), attempts/channel mix, elapsed time, cost of pursuit, guardrail events, transcript quality scores, human-escalation resolutions.
2. **Roll up per policy version per lane.** The unit of learning is the *policy version*, because the engine is deterministic: same policy + same signals = same behavior, so cohort differences are attributable.
3. **Mine.** Weekly policy review (a human ritual, not a pipeline, in v1): where do cases stall (time-in-state), which script frames produce declines vs reschedules, what do escalation resolutions keep teaching us, which contact sequences reach people. LLM-assisted transcript mining proposes findings; humans accept them.
4. **Change.** Findings become policy edits — a rule change, a script revision, a re-sequenced contact plan — shipped as a new policy version. New cases get the new version; grading continues per version.
5. **Later:** replay/simulation (candidate policy vs historical signal logs) before shipping; per-lane A/B assignment; cross-lane pattern library ("promise-then-confirm sequences outperform" travels from healthcare to lending as a policy suggestion, never as automatic behavior).

The learning asset is the graded corpus: every interaction ever, labeled by whether the outcome landed. It compounds per lane and it's why the same runtime gets cheaper per outcome over time — which is the whole margin story under fixed per-outcome pricing.

---

## 10. Open questions

1. **Lane-1 fee level and floor.** What per-kept-visit fee clears a practice's approval instantly while covering worst-case cost of pursuit? Do we need a minimum case-batch size to make a pilot worth running?
2. **Verification friction in practice.** Will small practices reliably send a weekly schedule export? If that's the integration that actually fails, what's the fallback (our confirmation call to the patient post-visit? front-desk attestation?) and is it invoice-grade?
3. **Attribution disputes.** Patient we contacted books through a channel we never touched — billable? Define the attribution window and rule per lane before the first contract, not the first dispute.
4. **Voice quality bar.** Is current voice-agent tech good enough for elderly/low-tech populations in lane 1, or does v1 lean SMS-first with voice for confirmation only? Decide from the first 100 calls, not from opinion.
5. **Tail-referral data quality.** Aged referrals may have dead phones and moved patients. What ineligibility rate makes a batch uneconomical, and do we price-protect against it (customer warrants data freshness? we filter and only accept qualifiable cases)?
6. **Lending lane consent basis.** Abandoned applicants gave consent to the lender — does it cleanly extend to us as service provider, per counsel? This gates lane 2's contact policy and may reshape its sequencing (email-first?).
7. **Person-level vs case-level identity.** Same patient, two referrals; same borrower, two products. When do we need real identity resolution and what does opt-out mean across their cases? (Suppression list partially answers this — is it enough?)
8. **Ops leverage curve.** What escalation rate can 2–4 people absorb at 500 / 2,000 / 10,000 active cases, and which escalation type do we automate first?
9. **Takeoff→Sierra shadow.** Sierra will presumably up-market Takeoff's playbook. Is "mid-market, feed-in-a-day, no exclusivity" durable positioning or a timing window — and does the answer change lane priority?
10. **Intermediate billables.** Lending's outcome (funded loan) is far from our influence's edge (completed application). Do we bill an intermediate event at a lower fee, and does that dilute the "pay for outcomes" story?
