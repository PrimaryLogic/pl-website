/**
 * All page copy lives here so messaging can be revised without touching layout.
 *
 * NOTE ON NUMBERS: this page asserts no performance figures of its own. Every
 * number in the ledger is supplied by the reader, including the recovery
 * assumption. Keep it that way — a claim here would need real measurement
 * behind it.
 */

/**
 * TODO(unverified): this address was assumed, not confirmed. Every demo
 * request on the page routes here — point it at a real inbox, or replace
 * EmailCapture's handler with a real endpoint, before this ships.
 */
export const CONTACT_EMAIL = "hello@primarylogic.com";

export const nav = {
  wordmark: "Primary Logic",
  links: [
    { label: "The math", href: "#ledger" },
    { label: "How it works", href: "#sequence" },
  ],
  cta: { label: "Book a demo", href: "#contact" },
};

export const hero = {
  eyebrow: "Patient coverage for specialty practices",
  /** Split so the emphasis colour lives in content, not hardcoded in JSX. */
  heading: {
    lead: "You already paid for the patients who ",
    emphasis: "never finished intake",
    tail: ".",
  },
  body: "Referrals arrive, forms go out, refills come due — and each one needs a person to notice it the same day. Primary Logic covers those touchpoints across voice, SMS, and email, with one shared memory behind all three.",
  ledgerLead: "Start with what it's costing you. These are your numbers, not ours.",
};

/** Defaults so the ledger reads as a finding on first paint, not a blank form. */
export const ledger = {
  defaults: {
    inbound: 400,
    dropRate: 35,
    revenuePerPatient: 1200,
    acquisitionCost: 250,
    recoveryRate: 30,
  },
  fields: {
    inbound: { label: "Inbound patients each month", hint: "Referrals and new-patient calls" },
    dropRate: { label: "Share that never finish intake", hint: "Your current drop-off" },
    revenuePerPatient: {
      label: "Average first-year revenue per patient",
      hint: "Net collections, not billed charges",
    },
    acquisitionCost: {
      label: "What you spend to acquire one patient",
      hint: "Marketing and referral development",
    },
    recoveryRate: {
      label: "If coverage recovers",
      hint: "Your assumption — Primary Logic makes no claim here",
    },
  },
  rows: {
    lost: "Patients lost each month",
    monthly: "Revenue never realized, monthly",
    annual: "Revenue never realized, annually",
    total: "Recoverable each year",
  },
  sunkNote:
    "You spent this acquiring the patients you then lost. Recovering them doesn't refund it — it's what makes the loss expensive twice over.",
  sunkLabel: "Acquisition already spent, monthly",
};

export const leak = {
  eyebrow: "Where it goes",
  heading: "Three leaks, all of them a coverage problem",
  intro:
    "None of this is a demand problem. The patient arrived. What failed was the follow-through on the day it mattered.",
  items: [
    {
      title: "Callbacks arrive too late",
      body: "A referral goes cold in hours, not days. By the time a coordinator works down the list, the patient has already booked elsewhere.",
      when: "Hours",
    },
    {
      title: "Intake forms stall out",
      body: "Paperwork sent and never returned is the quietest failure in the practice. No one is assigned to notice, so no one does.",
      when: "Days",
    },
    {
      title: "Follow-up has no memory",
      body: "Voice, text, and portal messages each start from zero. The patient repeats themselves until they stop replying at all.",
      when: "Weeks",
    },
  ],
};

export const sequence = {
  eyebrow: "Coverage",
  heading: "From referral to first appointment",
  description:
    "Order matters here — each step depends on the one before it, and every agent works from the same patient record.",
  steps: [
    {
      title: "Referral lands, outreach starts",
      body: "The agent reaches out within minutes, not on the next open slot in someone's afternoon.",
      at: "Minutes",
    },
    {
      title: "Identity and coverage confirmed",
      body: "Demographics, payer, and eligibility captured inside the conversation itself.",
      at: "Same call",
    },
    {
      title: "Forms walked through live",
      body: "Consent and intake sent by text, completed while the patient is still on the line.",
      at: "Same call",
    },
    {
      title: "Clean handoff to your staff",
      body: "A finished record and a booked appointment, instead of a stack of callbacks.",
      at: "Same day",
    },
  ],
};

export const capabilities = {
  eyebrow: "What it covers",
  heading: "The work a coordinator does by hand",
  items: [
    {
      title: "Guided form completion",
      body: "The agent walks the patient through intake line by line, and resumes the session if they step away mid-form.",
    },
    {
      title: "Automatic re-engagement",
      body: "No-shows, unreturned forms, and lapsed refills each trigger their own follow-up cadence without anyone queueing it.",
    },
    {
      title: "Cross-channel orchestration",
      body: "Voice, SMS, and email draw on the same record and hand off to each other mid-thread.",
    },
    {
      title: "Escalation to licensed staff",
      body: "Clinical questions and billing disputes route to a person immediately, with the full thread attached.",
    },
  ],
};

export const orchestration = {
  eyebrow: "One patient, one thread",
  heading: "What coverage looks like on a single referral",
  patient: {
    name: "Elena Ruiz",
    detail: "47 · Tucson, AZ",
    tags: ["Medicare Advantage", "Cardiology referral", "Prefers Spanish"],
  },
  timeline: [
    { channel: "Email", action: "Introduction and consent link", at: "t + 0" },
    { channel: "SMS", action: "Nudge with a one-tap form", at: "t + 2 min" },
    { channel: "Voice", action: "Live intake on reply", at: "t + 9 min" },
    { channel: "SMS", action: "Appointment confirmation", at: "t + 24 hr" },
    { channel: "Email", action: "Pre-visit checklist", at: "Weekly until visit" },
  ],
  note: "Illustrative sequence. Cadence is configured per workflow.",
};

export const curves = {
  eyebrow: "Why coverage, and not more spend",
  heading: "The three ways to fill a schedule scale differently",
  intro:
    "Every practice can buy more patients, hire more callers, or cover the panel it already has. The difference isn't the starting price — it's what happens to cost per patient as volume goes up.",
  options: [
    {
      label: "Paid acquisition",
      shape: "rising" as const,
      body: "You're buying net-new attention every month, and the marginal patient costs more than the last one.",
      trend: "Cost per patient rises",
    },
    {
      label: "More coordinators",
      shape: "flat" as const,
      body: "Cost tracks headcount in a straight line. The hundredth patient costs what the first one did.",
      trend: "Cost per patient holds",
    },
    {
      label: "Coverage software",
      shape: "falling" as const,
      body: "Largely fixed cost against rising volume, applied to a panel you've already paid to acquire.",
      trend: "Cost per patient falls",
    },
  ],
  caption:
    "Curve shapes only — the vertical axis is deliberately unlabeled. Primary Logic's pricing is quoted per practice, not published here.",
};

export const finalCta = {
  heading: "Start with the patients you've already paid for",
  body: "Bring Primary Logic in on one workflow — referrals, intake, or refills — and watch the same panel convert differently.",
};

export const footer = {
  entity: "Primary Logic",
  links: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Contact Us", href: "/contact" },
  ],
};
