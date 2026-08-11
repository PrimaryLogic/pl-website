/**
 * All page copy lives here so messaging can be revised without touching layout.
 *
 * NOTE ON NUMBERS: every performance figure below is intentionally left as an
 * em-dash placeholder. Nothing on this page should assert a result Primary
 * Logic has not measured. Fill these in from real data before launch.
 */

export const PLACEHOLDER_METRIC = "—";

/**
 * TODO(unverified): this address was assumed, not confirmed. Every demo
 * request on the page routes here — point it at a real inbox, or replace
 * EmailCapture's handler with a real endpoint, before this ships.
 */
export const CONTACT_EMAIL = "hello@primarylogic.com";

export const nav = {
  wordmark: "Primary Logic",
  links: [{ label: "Healthcare", href: "/healthcare" }],
  cta: { label: "Book a demo", href: "#contact" },
};

export const hero = {
  eyebrow: "Coordination staff, delivered as software",
  /** Rotated by the typewriter. `accent` is the colored tail of line one. */
  phrases: [
    { lead: "Agents that ", accent: "answer every call.", second: "Before the voicemail does." },
    { lead: "Agents that ", accent: "finish the intake.", second: "Without a single callback." },
    { lead: "Agents that ", accent: "chase the refill.", second: "Before the patient lapses." },
  ],
  body: "Primary Logic runs patient outreach across voice, SMS, and email — with one shared memory behind all three. Every conversation picks up exactly where the last one ended.",
  highlight: "Fewer dropped patients. Fuller schedules.",
  emailPlaceholder: "you@practice.com",
};

export const challenge = {
  eyebrow: "The problem",
  heading: "The patient didn't leave. They just stopped hearing from you.",
  intro:
    "A referral arrives, a form goes out, a refill comes due. Each one needs a person to notice it and follow through the same day. When nobody does, the patient quietly goes somewhere else — and the practice never sees the moment it happened.",
  items: [
    {
      title: "Callbacks arrive too late",
      body: "A referral goes cold in hours, not days. By the time a coordinator works down the list, the patient has already booked elsewhere.",
    },
    {
      title: "Intake forms stall out",
      body: "Paperwork sent and never returned is the quietest failure in the practice. No one is assigned to notice, so no one does.",
    },
    {
      title: "Follow-up has no memory",
      body: "Voice, text, and portal messages each start from zero. The patient repeats themselves until they stop replying at all.",
    },
  ],
  closing:
    "None of this is a demand problem. It's a coverage problem — and coverage is the part software can actually fix.",
};

export const journey = {
  eyebrow: "In flight",
  heading: "Every patient, mid-conversation",
  patients: [
    {
      name: "Elena Ruiz",
      detail: "47 · Tucson, AZ",
      track: "New referral",
      status: "Intake in progress",
      tone: "accent" as const,
      agent: "Ava · warm, unhurried",
    },
    {
      name: "Marcus Bell",
      detail: "68 · Phoenix, AZ",
      track: "Rx follow-up",
      status: "Refill confirmed",
      tone: "green" as const,
      agent: "Ross · plain-spoken",
    },
    {
      name: "Priya Nair",
      detail: "34 · Mesa, AZ",
      track: "Insurance verification",
      status: "Awaiting payer",
      tone: "amber" as const,
      agent: "Nina · precise, efficient",
    },
    {
      name: "Daniel Okafor",
      detail: "52 · Chandler, AZ",
      track: "Missed appointment",
      status: "Rebooked",
      tone: "green" as const,
      agent: "Ava · warm, unhurried",
    },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  heading: "From referral to first appointment",
  subheading: "Your coordination team, written down",
  description:
    "Every agent shares one patient record. Context carries across the call, the text, and the email without anyone re-reading a chart.",
  steps: [
    {
      title: "Referral lands, outreach starts",
      body: "The agent reaches out within minutes — not on the next open slot in someone's afternoon.",
    },
    {
      title: "Identity and coverage confirmed",
      body: "Demographics, payer, and eligibility captured inside the conversation itself.",
    },
    {
      title: "Forms walked through live",
      body: "Consent and intake sent by text, completed while the patient is still on the line.",
    },
    {
      title: "Clean handoff to your staff",
      body: "A finished record and a booked appointment, instead of a stack of callbacks.",
    },
  ],
  differentiators: [
    {
      title: "One memory, every channel",
      body: "No cold opens and no repeated questions.",
    },
    {
      title: "Dropped call, kept thread",
      body: "The conversation resumes over text exactly where it stopped.",
    },
    {
      title: "Clinical questions escalate",
      body: "Anything outside scope routes to licensed staff immediately.",
    },
  ],
};

export const config = {
  filename: "coordinator.config.ts",
  metrics: [
    { label: "Contact rate", value: PLACEHOLDER_METRIC },
    { label: "Form completion", value: PLACEHOLDER_METRIC },
    { label: "Appointments booked", value: PLACEHOLDER_METRIC },
  ],
  caption: "Figures pending measurement against a live patient panel.",
};

export const capabilities = {
  eyebrow: "Capabilities",
  heading: "Patient coordination becomes programmable",
  intro:
    "Everything a great coordinator does by hand — written once, then running every hour your office is closed.",
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
      title: "Built for HIPAA from the first line",
      body: "Identity verification before disclosure, a full audit trail after, and minimum necessary access throughout.",
    },
  ],
};

export const orchestration = {
  eyebrow: "One patient, one thread",
  heading: "The whole sequence, coordinated",
  patient: {
    name: "Elena Ruiz",
    detail: "47 · Tucson, AZ",
    tags: ["Medicare Advantage", "Cardiology referral", "Prefers Spanish"],
  },
  agent: {
    name: "Ava",
    traits: ["Warm", "Unhurried", "Bilingual"],
  },
  timeline: [
    { channel: "Email", action: "Introduction and consent link", at: "t + 0" },
    { channel: "SMS", action: "Nudge with a one-tap form", at: "t + 2 min" },
    { channel: "Voice", action: "Live intake on reply", at: "t + 9 min" },
    { channel: "SMS", action: "Appointment confirmation", at: "t + 24 hr" },
    { channel: "Email", action: "Pre-visit checklist", at: "weekly until visit" },
  ],
};

export const economics = {
  eyebrow: "The economics",
  heading: "Coverage costs less than acquisition",
  intro:
    "The cheapest patient to book is the one who already called you. Recovering the panel you've paid to acquire beats bidding for a new one — and the gap widens as you scale.",
  rows: [
    {
      label: "Paid acquisition",
      note: "Cost per booked patient climbs with spend. You're buying net-new attention every month.",
      cost: PLACEHOLDER_METRIC,
      trend: "Rises at scale",
      width: "100%",
      tone: "faint" as const,
    },
    {
      label: "Outsourced call center",
      note: "Cost scales in a straight line with headcount. The hundredth patient costs what the first one did.",
      cost: PLACEHOLDER_METRIC,
      trend: "Flat at scale",
      width: "58%",
      tone: "amber" as const,
    },
    {
      label: "Primary Logic",
      note: "Fixed platform cost. Per-patient cost falls as volume rises.",
      cost: PLACEHOLDER_METRIC,
      trend: "Falls at scale",
      width: "30%",
      tone: "accent" as const,
    },
  ],
  caption:
    "Bar lengths are illustrative of the shape of each cost curve, not measured figures.",
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
