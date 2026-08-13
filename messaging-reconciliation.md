# Messaging Decisions × Alison Deans — Reconciliation

Date: 2026-08-12
Inputs: `Primary Logic Website — Messaging Decisions`; Alison Deans / Metropolis Dermatology, 2026-07-10; `primary-logic-dermatology-demand-deck.pptx` (2026-08-12).

> **Read §7 first.** The demand deck postdates the messaging MD and settles the wedge and pricing questions that §2–§3 spend most of their length on. §3's recommendation is superseded; its reasoning about the EHR competitor (§6) is not.

---

## Read this first

**The MD is right in tone and wrong in scope.** Its guardrails and its "remove work" framing are Alison's correction, correctly absorbed. Its wedge is not the wedge her transcript supports.

**One decision gates the rest:** which coordination surface we sell first. Wedge → conversion event → comparison set → pilot metrics all fall out of it, and none of the MD's six open questions can be closed before it. My recommendation is in §3.

**Two caveats that keep this honest:**

1. **Some of Alison's feedback is already obsolete.** She was reacting to *Ambrosia* — "care loop," "expert labels," "training data," "making the model better," clinical decision support, physician equity. Several of her sharpest lines target a pitch this site no longer makes. Credit where due (§1) before critique (§2).
2. **n = 1.** One multi-location California group on Modernizing Medicine, one operator. Everything below is a stated assumption about the market, not a finding about it.

---

## 1. Already resolved — the MD absorbed her core correction

Alison's #1 correction was: *focus on the unpaid coordination surrounding clinical judgment, not on automating the judgment physicians consider their job.* The MD's entire "Work Removed" section is that correction, executed. This is the most important line in the document and it is right.

Also cleanly resolved:

| Alison's pushback | MD's answer |
|---|---|
| Product was not legible — "which work disappears?" | "Work Removed" enumerates seven concrete surfaces |
| Story sounded model-first | No model, training-data, or labeling language anywhere |
| CDS is not the obvious first wedge | Explicitly out of scope; clinical questions route to staff |
| No second window | "Works through the systems your practice already uses" |
| Adoption needs honesty about integration cost | "Do not describe as zero change unless operationally true" |
| Exception must reach a human | "Make human escalation explicit" |

**Guardrail scorecard: 6 of 8 hold up unchanged.** One conflicts with her evidence (#3, "lead with completed patient intake" — see §2.1). One under-reaches (#7, dedupe SMS/text — the real problem is that channels lead at all; see §2.3).

---

## 2. Still biting — four gaps

### 2.1 The wedge — the headline disagreement

The MD leads with **patient intake and coordination**: referral → contacted → intake form → booked. Alison's stated highest-value first loop is **care readiness and medication execution** for the panel already on the schedule: pre-visit agenda capture, expectation-setting against a 10-minute slot, labs and attestations complete, prior auth and biologics moving, tailored after-visit instructions, follow-up closed.

These are not two different products — it's the same machinery (outreach, evidence collection, exception routing, EHR write-back) pointed at a different patient population. The MD's "intake-form follow-up" and "missing-information collection" genuinely overlap her pre-visit readiness work. The divergence is in **which economic story we tell**: front-of-funnel conversion (growth) versus already-scheduled-panel execution (cost, capacity, clinical risk).

**The discriminating evidence is the asymmetry of what she volunteered.** Unprompted, she described: two medical assistants paired with every provider; staff reviewing future schedules hunting missing prerequisites; prior authorization; documented treatment failure; TB testing; outside labs; time-sensitive isotretinoin attestations where a missed window interrupts a patient's access to medication. Her summary of it — *"the work practices do not get paid for but must pay humans to perform"* — is the sharpest ROI sentence in the transcript.

She never raised referral conversion as a pain. But she was never asked, and the meeting was about a clinical-model pitch — so **treat this as weak evidence and do not lean on it.** It establishes only that the one operator we have talked to at length has an acute, staffed, named problem elsewhere, and that the MD picked its wedge without recording why.

The argument that actually decides this is competitive, not anecdotal. See §6.

### 2.2 Revenue cycle is an unrecorded third option

Alison confirmed RCM as a valuable AI surface, and gave the reason it beats everything else on legibility: it *"converts completed care into collected revenue rather than asking the practice to believe in a future model advantage."*

Her transcript therefore contains **three ranked candidate surfaces** — care readiness, medication execution, revenue cycle. The MD enumerates a fourth and documents no comparison against these. Whatever we choose, the rationale should exist in writing.

### 2.3 "More messages is not the solution"

Her exact constraint: patients ignore repeated outreach; *"more messages are not the solution; execution and exception handling are."*

The current hero is an omnichannel-outreach pitch — "orchestrates every patient touchpoint across voice, SMS, and email." The MD keeps that shape ("communicates with patients across voice, SMS, and email"). To an operator who already runs secure messaging and already watches patients ignore it, a channel list reads as *reminder tool*, which is the category she ruled out.

The differentiator she handed us is the sequence, not the channels: **knows the patient's plan → recognizes missing evidence → resolves the routine step → escalates the exception.** Channels are a spec line. They should not be in the headline.

Note also: she named encrypted patient communication as a hard requirement. The MD's privacy section is correct that we must not claim HIPAA compliance before verification — but "don't claim" is not "don't address." An ops buyer asks about secure messaging on the first call. We need a factual statement of what is true today, or the page loses them before economics.

### 2.4 Two omissions the MD does not cover at all

**Differentiation vs. the EHR.** Metropolis runs Modernizing Medicine, which is shipping its own AI. Her instruction: *explain what it does better than the EHR, not merely differently.* The MD has no differentiation section, and the live page compares Primary Logic against **Paid Ads** and **BPO Teams**. Paid Ads is not an alternative the ops buyer considers; BPO is. The real comparison set is mapped in §6 — and it is the reason the wedge recommendation in §3 changed.

**Clinician legibility.** Her test: *a practice leader should be able to stand in front of clinicians and explain how this makes their jobs easier.* The MD is written entirely for the economic buyer. She also warned that workflow change is emotional and that "preserved clinical judgment and professional identity" belongs in the offer — the MD has this only as a guardrail ("separate administrative from clinical"), not as a value proposition.

Her one free gift here: **the AI scribe is the benchmark clinicians already understand.** Anchoring to it — *the scribe removed the documentation work; we remove the coordination work around the visit* — is the fastest legibility shortcut available, and the MD doesn't use it.

---

## 3. Recommendation

**Lead with pre-visit readiness and medication execution. Keep intake as the entry point, not the promise.**

**Retract the reason I gave first.** "She never raised referral conversion" is the weakest available argument — she wasn't asked, and the meeting was about a clinical-model pitch. Absence of evidence proves nothing here. The real reason is competitive, and it is in §6:

> **The incumbent EHR is shipping the MD's exact wedge to this exact buyer, this year.** ModMed's Front Office Assistant is described as automating "patient messaging, scheduling, and intake coordination," with staff reviewing summaries and approving AI-driven workflows. That is the MD's wedge *and* the MD's escalation model — bundled into software Metropolis already pays for, with no new vendor review, no new BAA, and no new integration.

Nothing in a comparison module survives the question "why wouldn't I just use the one my EHR is adding?" when the honest answer is "you probably would."

**The case for intake is real, and it isn't what's wrong.** It has a definable conversion event, needs far lighter integration, tells a growth story rather than a headcount-reduction story, and carries much lower clinical risk than a missed iPLEDGE window. Every one of those is a genuine advantage. They are advantages in a square ModMed is about to occupy.

**Where readiness differentiates — draw this line precisely, because everything rests on it.** ModMed's two announced assistants split cleanly: Front Office Assistant handles messaging, scheduling, and intake coordination. Clinical Assistant *summarizes* a patient's history before the visit — it tells the provider what is known. **Neither one chases what is missing.** Detecting that a TB test was never drawn, that an iPLEDGE window closes Thursday, or that a PA is stalled at step therapy — then resolving it and routing the exception — is not on either roadmap. That gap is the entire product.

**Do not soften this into "every patient arrives ready."** That framing spans new and established patients and sounds appealing, but it is broader than either candidate — the opposite of a wedge. One machine (know the plan → detect missing evidence → resolve → escalate) pointed at **one population first.** Established patients on complex therapy is the choice.

**Consequences to plan for:**
- Pay-per-converted-intake does not survive the switch. An approved prior authorization has no conversion event. This needs a second pricing unit — per completed readiness task, or per resolved exception.
- Deeper integration. Reading labs, med history, and clinical notes is a longer security review than reading a schedule. That cost is real, and it is also the moat once crossed.
- Clinical risk goes up. Alison's own routing model already answers this: two human gates, exception → staff approval → therapy started.

**Timing tailwind, noted but not overweighted:** 2026 rules compress payer PA decisions to 7 calendar days standard / 72 hours expedited, with public reporting from March 31, 2026. As the payer side speeds up, the practice-side prerequisite work becomes the bottleneck — the thing we would be selling.

This is still one interview. If there is contrary evidence — pipeline, other operator calls, inbound demand for intake — it should beat this, and it belongs in writing next to the wedge decision.

---

## 4. The MD's six open questions, against her transcript

She partially answers four.

| # | Question | What the transcript gives us |
|---|---|---|
| 1 | What event triggers payment? | **Gated on the wedge.** Answerable for intake, not for prior auth. Decide scope first. |
| 2 | Which EHRs are supported? | Modernizing Medicine is the named system — and simultaneously the competitive threat. Answering this question and §2.4 is the same work. |
| 3 | What can we read and write? | Unanswered. She asked it directly and got no answer; treat as a known credibility gap. |
| 4 | Which communications stay with clinical staff? | Her routing model, verbatim: *plan → task identified → patient prompted → evidence received → exception routed → clinician or staff approval → therapy started → adherence tracked.* Two human gates, both explicit. Use this structure. |
| 5 | Verified privacy/security posture? | Unanswered, and she flags encrypted communication as a hard constraint. Blocks launch. |
| 6 | Baseline and pilot metrics? | Her implied set, better than intake counts: % of visits arriving ready; staff hours spent chasing prerequisites; time-to-therapy-start on biologics; missed attestation windows; avoidable follow-up visits and messages. |

---

## 5. Live defects in the economics module

The MD's Economics section reads as hypothetical. It isn't — both items it flags are real bugs in the shipped component.

1. **Wrong description on a tab.** [CostComparison.tsx:12](components/economics/CostComparison.tsx:12) and [CostComparison.tsx:28](components/economics/CostComparison.tsx:28) carry the *identical* string. The Primary Logic pitch — "Fixed, performance-aligned cost. Lower CAC that improves with volume instead of inflating like paid media" — is pasted into the **Paid Ads** tab, where it describes the competitor as having our advantages. This is the MD's "each tab displays the correct description," and it is currently on the live page.
2. **Rotation ignores the reader.** The 4200 ms interval at [CostComparison.tsx:38](components/economics/CostComparison.tsx:38) never pauses on click, hover, or focus. A reader who selects a tab is rotated away from it, mid-sentence. This is the MD's "gives buyers enough time to read."

Separately, per §2.4: the three-way comparison set itself (Paid Ads / BPO Teams / Primary Logic) is aimed at a growth buyer, not the operator the MD names as the primary audience.

---

## 6. The real alternatives

Not a vendor list — the buyer's actual decision tree. Two of these squares are contested very differently, which is what decides the wedge.

### The incumbent: status quo staff labor

Not a tier. **This is what we are actually replacing.** Two medical assistants per provider at Metropolis, reviewing future schedules and chasing prerequisites. Already budgeted, already trusted, politically expensive to cut. Alison's own case against it is the one to use: turnover and human error make it unreliable.

### Contesting the intake wedge

| Alternative | Why it's hard to beat |
|---|---|
| **The EHR itself** — ModMed Front Office Assistant, plus the April 2026 Bonsai Health acquisition (patient reactivation, AI self-scheduling) | Bundled. No new vendor, BAA, integration, or line item. Ships to our buyer this year. |
| **Intake / engagement point solutions** — Phreesia (intake, check-in, payments), Luma Health (scheduling, referrals, reminders; 70+ EHRs), Artera (2026 KLAS #1, enterprise messaging), Klara (two-way messaging, explicitly strong in dermatology), Weave (VoIP + text, small practices) | Established, ranked, deeply integrated. A commoditizing category. |
| **AI front-desk / voice agents** | Well-funded cohort moving fast at the same square. |

**Verdict: crowded, and the incumbent is entering it.** Three sources of competition, one of them free-with-your-EHR.

### Contesting the readiness / medication-execution wedge

| Alternative | Why it doesn't close the gap |
|---|---|
| **Manufacturer hub services** — the non-obvious one, and the most dangerous. Biologic manufacturers provide hub and nurse-navigator programs covering PA, patient assistance, and REMS onboarding. **Free to the practice.** | Per-drug and manufacturer-specific. No coverage of labs, iPLEDGE, or cross-drug work; no EHR write-back; no single exception queue. Solves one molecule, not the panel. |
| **Offshore PA staffing / BPO** — advertised as low as ~$6/hour | **This is the price floor**, and it is brutal for any labor-replacement pricing story. Beat it on reliability, not cost. |
| **PA / benefits automation vendors** — Develop Health, Cohere, Infinitus, Anterior | Largely aimed at payers and health systems, not independent specialty groups. Solves PA, not readiness. |
| **ModMed Clinical Assistant** | Summarizes history. Does not chase missing evidence. |

**Verdict: contested, but nobody owns the cross-cutting surface** — "is this patient ready for what is planned, and if not, who is fixing it." That is the opening.

### What the comparison module should become

Replace Paid Ads / BPO Teams / Primary Logic with the comparison the ops buyer actually runs: **staff doing it today · the EHR's own AI · Primary Logic.** Keep BPO if a fourth column fits — it's a legitimate alternative. Paid Ads is not, and it is aimed at a buyer the MD doesn't claim.

### Sourcing caveat — read before any of this goes on a public page

- ModMed's assistants are **roadmap, not shipped**: "expected to be available in the second half of 2026." Roadmaps slip. WebFetch truncated on ModMed's own pages, so this rests on search snippets and needs direct confirmation. The Bonsai acquisition (April 2026) is a closed transaction and is firmer.
- "Up to 60% reduction in front-office work" is ModMed's own marketing. Do not repeat it as fact.
- The dermatology PA figures that make this wedge look attractive — ~$83,200/year per practice, a median 39 PA requests per physician per week, derm at the bottom of specialty approval rates — come from **PA-services vendors' blogs**. Directionally useful for an internal argument. Not citable on our site without a primary source.
- No competitor claim should reach the page without verification against the vendor's current material. Comparative claims about named companies carry legal exposure the MD's own guardrails already anticipate.

---

## 7. The demand deck supersedes parts of this document

`primary-logic-dermatology-demand-deck.pptx` (2026-08-12) postdates the MD and resolves several things it left open. Where they conflict, **the deck is the current thinking and the MD is stale.** Read this section before acting on §3.

### What the deck settles

**Open question #1 — the payment trigger — is answered, with three events, not one.** Slide 6 defines: *recovered appointment* (a cancelled slot refilled and the visit completed), *completed conversion* (demand through intake to completed care), and *approved authorization* (administrative approval secured so treatment can start).

**This makes me wrong in §3.** I wrote that "an approved prior authorization has no conversion event" and that pricing was therefore gated on the wedge decision. The deck defines exactly that event. Retract the claim and the gating argument with it.

**The wedge is resolved by not choosing one.** Slide 4's loop runs demand/referral → match and schedule → refill cancellations → collect intake and photos → run auth and follow-up → update EHR and confirm visit. That spans the MD's intake wedge *and* Alison's readiness/medication-execution wedge in a single motion.

I warned in §3 against broadening into "every patient arrives ready." The deck goes broader still — and makes it work by a route I did not consider: **each step carries its own billable outcome, and slide 5 deploys one at a time** ("Pick one measurable constraint: unbooked demand, cancellations, incomplete intake, or stuck authorizations"). The wedge becomes a per-customer *deployment* choice rather than a company-wide *positioning* choice. That is a better answer than mine.

**Positioning is materially stronger than what is live on the site.** The deck already does most of what §2 asks for:

| §2 gap | Deck's answer |
|---|---|
| Clinical/administrative boundary | "Primary Logic fits when the constraint is administrative execution—not clinical judgment" (slide 3); "keep clinical decisions with clinic staff" (slide 5) |
| No second window | "Works on top of the EHR"; "No migration"; "Your existing EHR remains the system of record" (slide 4) |
| Comparison set | Slide 3 is a hiring decision: staff · BPO · Primary Logic — much closer to the real alternatives than Paid Ads |
| Growth vs. layoff story | "Capture more revenue without adding administrative staff" — added headcount avoided, not existing headcount cut. Threads the needle |

**The site is now the weakest of the three artifacts.** It still says "coordination team," leads on referral conversion, and compares against Paid Ads. Rebuild the site toward the deck, not toward the MD.

### What the deck still does not answer

**The EHR competitor — and slide 2 makes it worse.** Slide 2's pull quote is *"My EHR wastes so much of my time."* That frames the EHR as the villain. For a ModMed practice, the vendor's answer to that exact complaint ships in H2 2026 (§6). The deck has no response to "why not just use my EHR's own AI," and slide 3's three options should probably be four. This is the single biggest remaining gap, and it is Alison's explicit instruction, still unmet.

**"AI employee" vs. the MD's "AI agent" — a live conflict.** The deck says "AI employee" throughout; MD guardrail #2 says "AI agent." The deck's choice is defensible and arguably better: slide 3's entire frame is a hiring decision, and "employee" is what makes per-outcome pricing legible against per-seat and per-hour. It is also the bolder claim — "employee" implies judgment and autonomy, which sits awkwardly beside "not clinical judgment." **Pick one and make the site and deck match.** They currently do not.

**Three distinct motions in one loop.** Cancellation backfill, new-patient intake, and prior authorization are different buyers, different data access, and different failure modes. Fine in a deck with a human present to scope it. A website is unattended — slide 5's "pick one leak" is the right frame for the page.

**Unchanged from §4:** what Primary Logic can read and write (Q3), and verified privacy/security posture (Q5). Neither artifact answers these, and Q5 still blocks launch.

---

## 8. Ranked next actions

**Blocking — decide before any copy changes**
1. Wedge: readiness/medication execution vs. front-of-funnel intake vs. revenue cycle. Write down the rationale.
2. Conversion event, downstream of (1). If the wedge moves, the pricing unit moves.
3. Verified privacy/security posture, and what we can say about encrypted communication today.

**Fix now — independent of the wedge decision**
4. Correct the duplicated Paid Ads description.
5. Pause tab rotation on interaction.
6. Strip the two absolutes on the live page ("every patient, every time"; "every patient touchpoint") — MD guardrail #4, currently violated in the hero.

**Next, once the wedge is set**
7. Rebuild the comparison set per §6: **staff doing it today · the EHR's own AI · Primary Logic**, optionally keeping BPO. Drop Paid Ads. Verify every competitor claim against current vendor material first.
8. Demote channels from headline to spec; lead with plan → missing evidence → resolve → escalate.
9. Add a clinician-facing block using the AI-scribe anchor, and state plainly that clinical judgment is untouched.
10. Replace the pilot metrics with Alison's set (§4, Q6).

**Open**
11. Answer "what can Primary Logic read and write" — she asked it directly and we still don't have it in writing.
