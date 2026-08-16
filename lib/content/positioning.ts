/**
 * Homepage (/) copy, written for the buyer: a CEO, owner, or managing partner
 * who is graded on revenue and has twenty seconds.
 *
 * Vocabulary (keep it to three words): "demand" is what comes in, "job" is the
 * work in between, "outcome" is what the customer pays for.
 *
 * CLAIM RULE: no metric about our own results ships. Industry figures are
 * third-party and cited inline. Every example is labeled as an example.
 */

export type VerticalKey = "dental" | "legal" | "lending";

export type CaseBeat = {
  day: string;
  time: string;
  /** Who is acting. "system" rows are events from the customer's own software. */
  actor: "us" | "them" | "system";
  channel: "Text" | "Call" | "Email" | "Your system";
  text: string;
  /** Short note under the beat, e.g. a hand-off. */
  note?: string;
  /** The verified finish; rendered as the terminal stamp. */
  terminal?: boolean;
};

export type VerticalStory = {
  key: VerticalKey;
  tab: string;
  audience: string;
  /** Plain name for the customer's software, e.g. "Your schedule". */
  systemLabel: string;
  outcome: string;
  outcomeShort: string;
  verifiedIn: string;
  queue: string;
  headline: { lead: string; accent: string };
  /** Panel title for the example, e.g. "From referral to kept visit". */
  exampleTitle: string;
  person: string;
  personLabel: string;
  span: string;
  beats: CaseBeat[];
  href: string;
};

export const verticals: VerticalStory[] = [
  {
    key: "dental",
    tab: "Healthcare",
    audience: "Dental groups and DSOs",
    systemLabel: "Your schedule",
    outcome: "Kept treatment visit",
    outcomeShort: "kept visit",
    verifiedIn: "your practice schedule",
    queue: "diagnosed treatment that never got scheduled",
    headline: { lead: "Patients who said yes to treatment", accent: "and never came back." },
    exampleTitle: "From unscheduled treatment to a kept visit",
    person: "Luis",
    personLabel: "a dental patient",
    span: "Day 1 to Day 9",
    href: "/healthcare",
    beats: [
      { day: "Day 1", time: "8:14 am", actor: "system", channel: "Your system", text: "Implant consult diagnosed 34 days ago. Still unscheduled." },
      { day: "Day 1", time: "8:17 am", actor: "us", channel: "Text", text: "Hi Luis — Dr. Patel’s office. We have Tuesday 9:40 or Thursday 2:15 for your consult. Reply 1 or 2 and I’ll hold it." },
      { day: "Day 1", time: "12:41 pm", actor: "them", channel: "Text", text: "Thursday works. Which office is that?" },
      { day: "Day 1", time: "4:00 pm", actor: "us", channel: "Call", text: "Called at the time Luis asked for. Confirmed the office, booked Thursday. Sent reminders on Day 4 and Day 8.", note: "Financing question → your coordinator." },
      { day: "Day 9", time: "10:18 am", actor: "system", channel: "Your system", text: "Appointment marked arrived in your schedule.", terminal: true },
    ],
  },
  {
    key: "legal",
    tab: "Legal",
    audience: "Personal-injury and mass-tort firms",
    systemLabel: "Your case system",
    outcome: "Signed retainer",
    outcomeShort: "signed retainer",
    verifiedIn: "your case management system",
    queue: "qualified claimants who went quiet before signing",
    headline: { lead: "Claimants who qualified", accent: "and never signed." },
    exampleTitle: "From unsigned retainer to signed engagement",
    person: "Cameron",
    personLabel: "an injury claimant",
    span: "Day 1 to Day 5",
    href: "/legal",
    beats: [
      { day: "Day 1", time: "8:40 am", actor: "system", channel: "Your system", text: "Consult done four days ago. Retainer still unsigned." },
      { day: "Day 1", time: "12:30 pm", actor: "us", channel: "Call", text: "Reached Cameron and resent the agreement link.", note: "Fee question → your intake attorney." },
      { day: "Day 1", time: "1:11 pm", actor: "us", channel: "Email", text: "Your attorney’s answer, in their words, with a fresh signature link in the same thread." },
      { day: "Day 4", time: "5:45 pm", actor: "us", channel: "Text", text: "Still unsigned, so a short reminder — at the evening time Cameron said works — with the link and your firm’s direct line." },
      { day: "Day 5", time: "9:14 am", actor: "system", channel: "Your system", text: "Signed retainer recorded in your case system.", terminal: true },
    ],
  },
  {
    key: "lending",
    tab: "Lending",
    audience: "Credit unions, fintech lenders, and home-improvement finance",
    systemLabel: "Your loan system",
    outcome: "Funded loan",
    outcomeShort: "funded loan",
    verifiedIn: "your loan origination system",
    queue: "applications that stalled mid-file",
    headline: { lead: "Borrowers who applied", accent: "and never funded." },
    exampleTitle: "From stalled application to funded loan",
    person: "Dana",
    personLabel: "a stalled borrower",
    span: "Day 1 to Day 16",
    href: "/lending",
    beats: [
      { day: "Day 1", time: "7:30 am", actor: "system", channel: "Your system", text: "Application waiting on two pay stubs for 11 days." },
      { day: "Day 1", time: "9:10 am", actor: "us", channel: "Text", text: "Hi Dana — your file is two pay stubs from complete. Here’s the secure upload link and exactly what’s needed." },
      { day: "Day 3", time: "3:46 pm", actor: "them", channel: "Text", text: "The files are on my work computer. Can someone call after 6?" },
      { day: "Day 3", time: "6:15 pm", actor: "us", channel: "Call", text: "Called at 6:15 and walked Dana through the upload. Documents arrived Day 6; closing confirmed Day 9.", note: "Rate question → your loan officer." },
      { day: "Day 16", time: "2:09 pm", actor: "system", channel: "Your system", text: "Loan funded — recorded in your loan system.", terminal: true },
    ],
  },
];

export const hero = {
  heading: "Turn missed demand into completed outcomes.",
  body:
    "Primary Logic works the after-hours, overflow, and aged leads your team can’t get to — staying with the work until it’s done, across days or months.",
  primaryCta: { label: "Start a pilot", href: "#pilot" },
  secondaryCta: { label: "See how it works", href: "#how" },
  form: { button: "Start a pilot", placeholder: "Work email" },
  caseLabel: "Example",
};

export const leak = {
  eyebrow: "The problem",
  heading: "You already paid for the demand. Nobody’s paid to finish it.",
  body:
    "Your team works the best opportunities first — that’s the right call. The rest waits: after-hours inquiries, overflow, aged leads, and the jobs that need weeks of persistence. That’s where paid-for revenue quietly dies.",
  moments: [
    { title: "The inquiry arrives", body: "After hours, or while everyone’s busy. It waits until morning — or forever." },
    { title: "Follow-up stops", body: "Two attempts, then nothing, the moment it gets hard." },
    { title: "Revenue stalls", body: "No one owns the final outcome, so nobody notices when it never happens." },
  ],
  stats: [
    { figure: "30–60%", label: "of diagnosed dental treatment is never scheduled", source: "Practice-management case-acceptance benchmarks" },
    { figure: "40%", label: "of law firms answered a prospective client’s call", source: "Clio Legal Trends Report, 2024 secret-shopper study" },
    { figure: "10×", label: "more likely to reach a lead within 5 minutes than after 30", source: "Lead Response Management study, MIT / InsideSales" },
  ],
};

export const how = {
  eyebrow: "How it works",
  heading: "We take the job, and we don’t put it down.",
  body:
    "One owner, one next move. We call, text, and email in your name. Anything that needs a license or a judgment call goes to your team. We stop only when the result shows up in your system.",
  steps: [
    { title: "Something happens", body: "A new lead, a reply, a document arriving, a status change — or nothing at all after a promised time. Any of these puts the job back in motion." },
    { title: "We decide the next move", body: "One action, chosen from the rules you approved: what we may say, when we may reach out, and what goes to your team." },
    { title: "We do it, at the right time", body: "The call at the time they asked for. The reminder the day before. Every touch on the record." },
    { title: "We keep going until it’s done", body: "Whatever comes back decides the next step. A job ends only one of four ways: done, declined, unreachable, or handed to you." },
  ],
  contrast: {
    heading: "Not a chatbot. Not an AI receptionist.",
    columns: { a: "An assistant", b: "Primary Logic" },
    rows: [
      { a: "Handles one conversation, then hands off", b: "Owns the job for days or weeks, across phone, text, and email" },
      { a: "Waits for someone to ask", b: "Acts when something changes — or when nothing does" },
      { a: "Measured on activity", b: "Measured on outcomes: visits kept, retainers signed, loans funded" },
      { a: "Priced per seat or per minute", b: "Priced per verified outcome" },
    ],
  },
};

export const setup = {
  eyebrow: "Getting started",
  heading: "Nothing to install. Your systems stay exactly as they are.",
  body:
    "Your CRM, practice-management, or loan system already knows how to send leads to a vendor. That’s all we need. Progress and the final result are written back where your team already looks.",
  yours: {
    title: "Your side",
    tag: "About an hour",
    items: [
      "Send us a copy of the queue — from your CRM, a nightly export, or a forwarded inbox",
      "Approve the caller ID, email sender, and scripts we use in your name",
      "Tell us what we may say, what we may promise, and what goes to your team",
    ],
  },
  ours: {
    title: "Our side",
    tag: "Everything else",
    items: [
      "Remember every call, text, and email for the life of the job",
      "Work the phone, text, and email — and the third parties: front desks, e-sign, document collection",
      "Schedule, remind, retry, and escalate",
      "Write progress and the outcome back into your system",
      "Keep a full record of every touch",
    ],
  },
  footnote: "We work under your name and the consent your customers already gave you — and report back the same way a human vendor would.",
};

export const pricing = {
  eyebrow: "Pricing",
  heading: "Budget it like ad spend, not software.",
  body:
    "You pay a fixed fee per completed outcome, plus the direct cost of calls and messages. Every dollar is tied to a completed outcome, so the budget only grows when revenue does.",
  compare: {
    columns: ["", "Seat software", "Primary Logic"],
    rows: [
      ["You pay for", "Seats × months", "Completed outcomes"],
      ["You pay when", "Up front", "After your system confirms it"],
      ["Unfinished work costs", "You still pay", "$0"],
      ["Budget grows with", "Headcount", "Results"],
    ],
  },
  billable: {
    title: "Billable",
    body: "One thing: a completion your own system confirms — a kept visit, a signed retainer, a funded loan.",
  },
  free: {
    title: "$0",
    body: "Declined. Never reached. Handed to your team. Stuck on your end. All $0.",
  },
  note: "The fee per outcome is fixed before launch, based on what a completion is worth to you. Your system decides what’s billable — not our dashboard.",
};

export const controls = {
  eyebrow: "Guardrails",
  heading: "We do the follow-through. Your team makes the judgment calls.",
  items: [
    { title: "Anything that needs a license goes to your team", body: "Rates, legal advice, clinical questions. The line is set before we start." },
    { title: "We only promise what you approve", body: "These appointment slots, this document list, this reschedule policy — nothing else." },
    { title: "Your name, your consent", body: "We call and email as your service provider, under the consent your customers already gave you." },
    { title: "Everything’s on the record", body: "Every call, text, email, and hand-off. Read any of it, any time." },
  ],
};

export const lanes = {
  eyebrow: "Where we run",
  heading: "Same approach, three industries.",
  cards: [
    { key: "dental" as VerticalKey, title: "Dental groups & DSOs", outcome: "Kept treatment visit", body: "Patients who were diagnosed but never scheduled, worked through to the visit itself.", href: "/healthcare", action: "See dental" },
    { key: "legal" as VerticalKey, title: "Personal injury & mass tort", outcome: "Signed retainer", body: "After-hours and overflow claimants, worked from first contact to signature. Legal judgment stays with the lawyer.", href: "/legal", action: "See legal" },
    { key: "lending" as VerticalKey, title: "Consumer lending", outcome: "Funded loan", body: "Home-equity, home-improvement, personal, and auto-refi files, chased to funding. Quoting stays with your licensed officers.", href: "/lending", action: "See lending" },
  ],
};

export const pilot = {
  eyebrow: "The pilot",
  heading: "Give us the demand no one is working.",
  body:
    "Start with the queue your team already wrote off — after-hours, overflow, aged, stalled. It takes nothing from your team, and any revenue we recover is revenue you weren’t getting.",
  steps: [
    { title: "Pick one queue", body: "One you already measure and already lose. Your current process keeps running." },
    { title: "We learn how you work", body: "About two weeks: we listen to your calls, learn your scripts and rules, and agree on what goes to your team." },
    { title: "Run it side by side", body: "We work part of the queue, you keep the rest. Compare on your own dashboard." },
    { title: "Pay per completion", body: "Only outcomes your system confirms are billed. If nothing completes, the pilot cost you nothing." },
  ],
  form: { button: "Start a pilot", placeholder: "Work email" },
};
