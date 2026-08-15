import type { NavContent } from "./shared";

/**
 * Lending-lane copy.
 *
 * Claim rule: the page describes the operating model and an illustrative pilot,
 * never customer performance. A funded loan is the default billable event;
 * lane-specific compensation and contact policy remain subject to counsel.
 */

export const lendingNav: NavContent = {
  wordmark: "Primary Logic",
  links: [
    { label: "All lanes", href: "/" },
    { label: "Journey", href: "#journey" },
    { label: "Safety", href: "#guardrails" },
    { label: "Pricing", href: "#billing" },
  ],
  cta: { label: "Design a pilot", href: "#contact" },
};

export const hero = {
  eyebrow: "Consumer lending · selective pilot design",
  heading: "Start where the fee model is clean: funded loans, not follow-up activity.",
  body:
    "Start with HELOC, home-improvement, personal-loan, or auto-refi queues. We work the administrative steps across voice, SMS, email, and your existing portal until the file funds or reaches another named ending.",
  note:
    "The default billable event is a funded loan verified in your LOS. Mortgage quoting stays with a licensed MLO; no funded loan, no invoice.",
  caseFile: {
    id: "FILE 04-182",
    label: "Illustrative recovery trace",
    state: "Waiting on borrower documents",
    nextMove: "Promised-day reminder · 5:00 PM",
    lastSignal: "SMS reply · “I can send both on Friday”",
    guardrail: "Financial question routed to loan officer",
  },
};

export const leak = {
  eyebrow: "The leak",
  heading: "Demand you already paid for is going quiet inside the file.",
  intro:
    "The borrower started. Your team sourced the opportunity. The loan did not die from one clean rejection; it stalled between documents, calls, portals, and next steps nobody had time to keep owning. The first lane should be the one where outcome pricing is easiest to defend.",
  sources: [
    {
      number: "01",
      title: "Abandoned application",
      body: "A started file stops at income, identity, asset, or disclosure steps and ages out of the active queue.",
    },
    {
      number: "02",
      title: "Payoff-triggered recapture",
      body: "A past customer enters a lender-approved outreach list, but consistent follow-through competes with live production work.",
    },
    {
      number: "03",
      title: "Promise without a next move",
      body: "A borrower says “Friday,” the CRM gets a note, and no one owns the exact follow-up when Friday arrives.",
    },
  ],
  close:
    "This is a persistence gap. Your licensed team keeps the advice and judgment; Primary Logic keeps the administrative promises moving.",
};

export type JourneyStep = {
  day: string;
  channel: "System" | "SMS" | "Voice" | "Portal" | "LOS";
  title: string;
  body: string;
  state: string;
  policy: string;
};

export const journey = {
  eyebrow: "One file · sixteen days",
  heading: "The case keeps its memory, owner, and next move.",
  intro:
    "An illustrative borrower journey shows the operating model. Every signal changes state; every state has one durable next action; anything outside the approved frame routes to a human.",
  borrower: "Borrower 0482",
  file: "Refi application · illustrative",
  steps: [
    {
      day: "Day 1",
      channel: "System",
      title: "The stalled file becomes a case",
      body:
        "A nightly copy shows the application has been waiting on two income documents for eleven days. Contact basis and required fields pass before outreach is scheduled.",
      state: "qualified → waiting",
      policy: "Consent basis recorded before contact",
    },
    {
      day: "Day 1",
      channel: "SMS",
      title: "One concrete next step",
      body:
        "The borrower receives the lender-approved secure upload link and a plain description of the two missing documents. The message stays inside the administrative frame.",
      state: "waiting → active",
      policy: "Quiet hours, suppression, and frequency cap checked at send time",
    },
    {
      day: "Day 3",
      channel: "Voice",
      title: "The process question gets answered",
      body:
        "An evening call connects. The agent walks through where to upload; a question about the loan terms routes to the assigned loan officer. The borrower promises both documents Friday.",
      state: "active → escalated → waiting",
      policy: "Financial advice stays with the licensed team",
    },
    {
      day: "Day 5",
      channel: "Portal",
      title: "The promise wakes the case",
      body:
        "At the promised time, the agent sends the approved reminder. Both documents arrive through the lender’s portal and the file becomes a completed application the next morning.",
      state: "waiting → active → waiting",
      policy: "A completed application is not automatically billable",
    },
    {
      day: "Day 16",
      channel: "LOS",
      title: "The customer’s record closes the loop",
      body:
        "The funding report shows the loan funded. Reconciliation links the LOS record to the case history, creating invoice-grade evidence without requiring LOS writeback.",
      state: "waiting → completed",
      policy: "Funded in customer LOS · billable",
    },
  ] as JourneyStep[],
  footnote: "Illustrative workflow, not customer data, a transcript, or a performance claim.",
};

export const guardrails = {
  eyebrow: "Built for the boundary",
  heading: "The agent advances the file. Your licensed team owns the advice.",
  intro:
    "A lane-specific policy sits between every decision and every outbound action. If a case cannot satisfy the contact basis or the conversation leaves the approved administrative frame, the machine does not improvise.",
  items: [
    {
      title: "Consent is a gate",
      body: "Every case carries its contact-permission basis. No accepted basis means ineligible, not “try anyway.”",
    },
    {
      title: "Advice routes out",
      body: "Questions about rates, terms, suitability, licensing, or anything out of frame route to a loan officer with the case history attached.",
    },
    {
      title: "Opt-out ends outreach",
      body: "Revocation on any channel updates the person-level suppression record immediately and survives case closure or re-ingestion.",
    },
    {
      title: "Every action leaves evidence",
      body: "Decisions, guardrail passes and blocks, messages, recordings, portal traces, and human resolutions stay on one append-only timeline.",
    },
  ],
  evidence: {
    heading: "What the evidence page shows",
    rows: [
      { label: "Terminal state", value: "Completed · funded" },
      { label: "Customer proof", value: "LOS funding report reference" },
      { label: "Contact policy", value: "Passed at every outbound action" },
      { label: "Licensed handoff", value: "Loan officer · Day 3" },
      { label: "Invoice status", value: "Eligible after reconciliation" },
    ],
    note: "Primary Logic does not mark its own homework. Your LOS record decides whether the outcome is billable.",
  },
};

export const billing = {
  eyebrow: "Outcome pricing",
  heading: "One meter: a verified funded loan.",
  intro:
    "We agree the outcome, evidence, attribution window, and fixed fee before a pilot starts. Calls, texts, retries, elapsed days, and internal escalations are our delivery cost—not separate line items.",
  billable: {
    label: "Billable",
    title: "Funded in your LOS",
    body: "The case matches a funded-loan record in the customer’s system within the agreed attribution window.",
  },
  notBillable: [
    "Contact attempts, replies, or appointments",
    "A file that remains incomplete, declines, or withdraws",
    "An unreachable, suppressed, ineligible, or escalated case",
    "A completed application—unless it is separately negotiated as an intermediate outcome",
  ],
  legal:
    "Per-outcome compensation and outreach policy are lane gates, not footnotes. RESPA-adjacent and state licensing boundaries require counsel before any public pricing policy or live program.",
};

export const pilot = {
  eyebrow: "Head-to-head pilot",
  heading: "Give us a slice of the queue. Keep your current process running.",
  intro:
    "The pilot is designed to prove incremental funded outcomes with the least possible implementation burden. No replacement project, exclusivity, or software rollout.",
  steps: [
    {
      number: "01",
      title: "Define the finish line",
      body: "Agree the eligible inventory, contact basis, funded-loan evidence, attribution window, and counsel-approved fee.",
    },
    {
      number: "02",
      title: "Send a copy",
      body: "Forward a scheduled report or CSV of abandoned applications or approved recapture inventory. Your source systems stay in place.",
    },
    {
      number: "03",
      title: "Run beside the status quo",
      body: "Primary Logic owns follow-through on the pilot slice while your team keeps working exactly as it does today.",
    },
    {
      number: "04",
      title: "Reconcile in the LOS",
      body: "Compare outcomes against your funding report. Only matched funded loans enter the invoice evidence set.",
    },
  ],
  close: "If the funded outcomes are not there, the invoice is not there either.",
};

export const finalCta = {
  heading: "Put the stalled files back in motion.",
  body:
    "Bring an abandoned-application or recapture queue. We’ll map the funded outcome, guardrails, evidence, and head-to-head pilot around the process you already run.",
};
