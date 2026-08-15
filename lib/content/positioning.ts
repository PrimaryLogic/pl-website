/**
 * Homepage (/) copy, written for the buyer: a CEO, owner, or managing partner
 * who is graded on revenue and has twenty seconds.
 *
 * Reading order mirrors the sales deck: the leak → one case, start to finish →
 * not an assistant → nothing to install → pay per outcome → controls → where we
 * run → how a pilot starts.
 *
 * CLAIM RULE: no metric about our own results ships. Industry figures are
 * third-party and cited inline. Every case story is labeled illustrative.
 */

export type VerticalKey = "dental" | "legal" | "lending";

export type CaseBeat = {
  day: string;
  time: string;
  /** Who is acting. "system" rows are events from the customer's own software. */
  actor: "us" | "them" | "system";
  channel: "Text" | "Call" | "Email" | "Your system";
  text: string;
  /** Short note under the beat, e.g. a handoff or a reason. */
  note?: string;
  /** The verified finish; rendered as the terminal stamp. */
  terminal?: boolean;
};

export type VerticalStory = {
  key: VerticalKey;
  tab: string;
  audience: string;
  outcome: string;
  outcomeShort: string;
  verifiedIn: string;
  queue: string;
  headline: { lead: string; accent: string };
  person: string;
  span: string;
  beats: CaseBeat[];
  href: string;
};

export const verticals: VerticalStory[] = [
  {
    key: "dental",
    tab: "Dental & DSOs",
    audience: "Dental groups and DSOs",
    outcome: "Kept treatment visit",
    outcomeShort: "kept visit",
    verifiedIn: "your practice schedule",
    queue: "diagnosed treatment that never got scheduled",
    headline: {
      lead: "Patients who said yes to treatment",
      accent: "and never came back.",
    },
    person: "Luis",
    span: "Day 1 → Day 9",
    href: "/healthcare",
    beats: [
      { day: "Day 1", time: "8:14 am", actor: "system", channel: "Your system", text: "Implant consult diagnosed 34 days ago. Still unscheduled. Case opens." },
      { day: "Day 1", time: "8:17 am", actor: "us", channel: "Text", text: "Hi Luis — Dr. Patel’s office. We have Tuesday 9:40 or Thursday 2:15 for your consult. Reply 1 or 2 and I’ll hold it." },
      { day: "Day 1", time: "12:41 pm", actor: "them", channel: "Text", text: "Thursday works. Which office is that?" },
      { day: "Day 1", time: "4:00 pm", actor: "us", channel: "Call", text: "Called at the time Luis asked for. Confirmed the location, booked Thursday in your schedule.", note: "A financing question came up → routed to your treatment coordinator." },
      { day: "Day 4", time: "6:10 pm", actor: "us", channel: "Text", text: "Intake form still open two days past the promised date. One gentle reminder with the link." },
      { day: "Day 8", time: "9:00 am", actor: "us", channel: "Text", text: "Day-before reminder: arrival time, directions, and how to reschedule." },
      { day: "Day 9", time: "10:18 am", actor: "system", channel: "Your system", text: "Appointment marked arrived in your practice schedule.", terminal: true },
    ],
  },
  {
    key: "legal",
    tab: "PI & mass tort",
    audience: "Personal-injury and mass-tort firms",
    outcome: "Signed retainer",
    outcomeShort: "signed retainer",
    verifiedIn: "your case management system",
    queue: "qualified claimants who went quiet before signing",
    headline: {
      lead: "Claimants who qualified",
      accent: "and never signed.",
    },
    person: "Cameron",
    span: "Day 1 → Day 5",
    href: "/legal",
    beats: [
      { day: "Day 1", time: "8:40 am", actor: "system", channel: "Your system", text: "Consult completed four days ago. Retainer agreement still unsigned. Case opens." },
      { day: "Day 1", time: "12:30 pm", actor: "us", channel: "Call", text: "Reached Cameron, resent the agreement link.", note: "A fee question came up → routed to your intake attorney. Nothing legal is answered by us." },
      { day: "Day 1", time: "1:11 pm", actor: "us", channel: "Email", text: "Your attorney’s answer, in their exact words, with a fresh signature link in the same thread." },
      { day: "Day 2", time: "6:00 pm", actor: "system", channel: "Your system", text: "Still unsigned past the review window. Silence is a signal — the next touch is scheduled for the evening Cameron said works." },
      { day: "Day 4", time: "5:45 pm", actor: "us", channel: "Text", text: "Quick reminder with the secure link and your firm’s direct line for any question." },
      { day: "Day 5", time: "9:12 am", actor: "them", channel: "Your system", text: "Cameron signs. E-sign event lands in your case system." },
      { day: "Day 5", time: "9:14 am", actor: "system", channel: "Your system", text: "Signed retainer verified in your case management system.", terminal: true },
    ],
  },
  {
    key: "lending",
    tab: "Consumer lending",
    audience: "Credit unions, fintech lenders, and home-improvement finance",
    outcome: "Funded loan",
    outcomeShort: "funded loan",
    verifiedIn: "your loan origination system",
    queue: "applications that stalled mid-file",
    headline: {
      lead: "Borrowers who applied",
      accent: "and never funded.",
    },
    person: "Dana",
    span: "Day 1 → Day 16",
    href: "/lending",
    beats: [
      { day: "Day 1", time: "7:30 am", actor: "system", channel: "Your system", text: "Application waiting on two pay stubs for 11 days. Case opens." },
      { day: "Day 1", time: "9:10 am", actor: "us", channel: "Text", text: "Hi Dana — your file is two pay stubs from complete. Here’s the secure upload link and exactly what’s needed." },
      { day: "Day 3", time: "3:46 pm", actor: "them", channel: "Text", text: "The files are on my work computer. Can someone call after 6?" },
      { day: "Day 3", time: "6:15 pm", actor: "us", channel: "Call", text: "Called at 6:15. Walked Dana through the upload.", note: "A rate question came up → routed to your loan officer. We never quote." },
      { day: "Day 6", time: "8:14 am", actor: "system", channel: "Your system", text: "Both documents received in the borrower portal. File returns to your review queue." },
      { day: "Day 9", time: "5:30 pm", actor: "us", channel: "Call", text: "Clear to close. Confirmed closing time and what to bring." },
      { day: "Day 16", time: "2:09 pm", actor: "system", channel: "Your system", text: "Loan funded — verified in your LOS funding report.", terminal: true },
    ],
  },
];

export const hero = {
  heading: "Turn missed demand into completed outcomes.",
  body:
    "Primary Logic completes jobs end to end, to directly drive your top line — staying with the work until it’s done, across days or months.",
  primaryCta: { label: "Start a pilot", href: "#pilot" },
  secondaryCta: { label: "See how it works", href: "#how" },
  proof: ["No seats", "No subscription", "$0 if it doesn’t complete"],
  form: { button: "Start a pilot", placeholder: "Work email" },
  caseLabel: "One case, illustrative",
};

export const leak = {
  eyebrow: "The problem",
  heading: "You already paid for the demand. Nobody’s paid to finish it.",
  body:
    "Your team works the best opportunities first — that’s the right call. The rest waits: after-hours inquiries, overflow, aged leads, and the cases that need weeks of persistence. That’s where paid-for revenue quietly dies.",
  moments: [
    { title: "The inquiry arrives", body: "After hours, or while everyone’s busy. It waits until morning — or forever." },
    { title: "Follow-up decays", body: "Two attempts, then the cadence breaks the moment the case gets hard." },
    { title: "Revenue stalls", body: "No one owns the final outcome, so nobody notices when it never happens." },
  ],
  stats: [
    {
      figure: "30–60%",
      label: "of diagnosed dental treatment is never scheduled",
      source: "Practice-management case-acceptance benchmarks",
    },
    {
      figure: "40%",
      label: "of law firms answered a prospective client’s call",
      source: "Clio Legal Trends Report, 2024 secret-shopper study",
    },
    {
      figure: "10×",
      label: "more likely to reach a lead at 5 minutes than at 30",
      source: "Lead Response Management study, MIT / InsideSales",
    },
  ],
};

export const how = {
  eyebrow: "How it works",
  heading: "We take a case, and we don’t put it down.",
  body:
    "Every case has one owner and one next move. We call, text, and email in your name; wait when waiting is right; hand off anything licensed or judgment-based to your people; and stop only when the outcome is verified in your system.",
  steps: [
    { title: "Something happens", body: "A new lead, a reply, a document arriving, a portal status change — or silence past a promised time. Any of these wakes the case." },
    { title: "We pick the next move", body: "One bounded action, chosen from the rules you approved: what we may say, when we may reach out, and what goes to your team." },
    { title: "We do it, at the right moment", body: "The call at 6:15 because that’s when they asked. The reminder the day before. Every touch logged." },
    { title: "The result feeds the next step", body: "Whatever comes back is recorded and becomes the next signal. The case closes only in a named state — completed, declined, unreachable, or handed to you." },
  ],
};

export const contrast = {
  eyebrow: "What this is — and isn’t",
  heading: "Assistants answer questions. We finish the job.",
  body: "The unit of work is the person and the result you want for them, not the call or message that happened today.",
  columns: { a: "An AI assistant or receptionist", b: "Primary Logic" },
  rows: [
    { a: "Handles one conversation, then hands off", b: "Owns the case for days or weeks, across every channel" },
    { a: "Waits for someone to ask", b: "Wakes up when something changes — including silence" },
    { a: "Measured on activity: calls answered, messages sent", b: "Measured on completion: visits kept, retainers signed, loans funded" },
    { a: "Priced per seat or per minute", b: "Priced per verified outcome" },
  ],
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
      "Point one existing vendor field at us — a webhook, a nightly export, or a forwarded inbox",
      "Approve the caller ID, email sender, and scripts we use in your name",
      "Tell us what we may say, what we may promise, and what goes to your team",
    ],
  },
  ours: {
    title: "Our side",
    tag: "Everything else",
    items: [
      "Case memory across every touch, for as long as it takes",
      "Phone, text, and email — plus the third parties: front desks, e-sign, document collection",
      "Scheduling, reminders, retries, and escalations",
      "Writing progress and the outcome back into your system",
      "Logging, review, and week-over-week improvement",
    ],
  },
  footnote: "We work where a human vendor would — under your brand, inside your consent — and report back the same way.",
};

export const pricing = {
  eyebrow: "Pricing",
  heading: "Budget it like ad spend, not software.",
  body:
    "You pay a fixed fee per completed outcome, plus the direct cost of calls and messages. A dollar out returns more than a dollar in, so the spend has no ceiling but the work itself.",
  compare: {
    columns: ["", "Seat software", "Primary Logic"],
    rows: [
      ["You pay for", "Seats × months", "Completed outcomes"],
      ["You pay when", "Before any value", "After your system confirms it"],
      ["Unfinished work costs", "The same", "$0"],
      ["Budget grows with", "Headcount", "Profitable outcomes"],
    ],
  },
  billable: {
    title: "Billable",
    body: "One thing: a completion your own system confirms — a kept visit, a signed retainer, a funded loan.",
  },
  free: {
    title: "$0",
    body: "Declined. Unreachable after the full agreed sequence. Handed to your team. Blocked on your side. Every one of these costs nothing.",
  },
  note: "The per-outcome fee is fixed before launch, from what a completion is worth to you. Your dashboard determines billing — not ours.",
};

export const controls = {
  eyebrow: "Guardrails",
  heading: "Autonomous where it should be. Human where it must be.",
  items: [
    { title: "Licensed moments go to your people", body: "Rates, legal advice, clinical questions — anything a license or judgment call covers is handed off, by rule, before launch." },
    { title: "Bounded promises", body: "We only commit to what you’ve approved: these appointment slots, this document list, this reschedule policy." },
    { title: "Your brand, your consent", body: "We call and email as your service provider, under the consent your customers already gave you." },
    { title: "Every touch on the record", body: "Calls, texts, emails, and handoffs are logged against the case. You can read any of it, any time." },
  ],
};

export const lanes = {
  eyebrow: "Where we run",
  heading: "Three places revenue leaks through the phone.",
  body: "The same engine, tuned to each industry’s workflow, rules, and finish line.",
  cards: [
    {
      key: "dental" as VerticalKey,
      title: "Dental groups & DSOs",
      outcome: "Kept treatment visit",
      body: "Diagnosed, unscheduled treatment worked through financing questions, intake, and the show-up itself.",
      verified: "Verified in your practice schedule",
      href: "/healthcare",
    },
    {
      key: "legal" as VerticalKey,
      title: "PI & mass-tort intake",
      outcome: "Signed retainer",
      body: "After-hours, overflow, and ghosted claimants worked from first contact to signature. Legal judgment stays with the lawyer.",
      verified: "Flat fee per signed case — never a share of fees",
      href: "/legal",
    },
    {
      key: "lending" as VerticalKey,
      title: "Consumer lending",
      outcome: "Funded loan",
      body: "HELOC, home-improvement, personal, and auto-refi files chased to funding. Quoting stays with your licensed officers.",
      verified: "Verified in your LOS",
      href: "/lending",
    },
  ],
};

export const pilot = {
  eyebrow: "The pilot",
  heading: "Give us the demand no one is working.",
  body:
    "Start with the queue your team already wrote off — after-hours, overflow, aged, stalled. It risks nothing, cannibalizes no one, and any revenue we recover provably didn’t exist before.",
  steps: [
    { title: "Pick one queue", body: "One you already measure and already lose. Your current process keeps running." },
    { title: "We learn how you work", body: "About two weeks: your calls, scripts, cadences, and rules become the playbook we run — with your handoffs built in." },
    { title: "Run it side by side", body: "A split test on your own funnel, read on your own dashboard." },
    { title: "Pay per completion", body: "Only outcomes your system confirms are billed. If nothing completes, the pilot cost you nothing." },
  ],
  summary: ["One queue", "One outcome", "One dashboard"],
  form: {
    button: "Start a pilot",
    placeholder: "Work email",
  },
};
