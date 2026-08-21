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

import { PILOT_MAILTO } from "./shared";

export type VerticalKey = "dental" | "legal" | "lending";

export type ActorKind = "us" | "person" | "system";

export type CaseAction = {
  /** Who acts. "us" = Primary Logic, "person" = the patient/claimant/borrower,
   *  "system" = the customer's software. */
  kind: ActorKind;
  /** Pill text, e.g. "Primary Logic", "Luis", "Front desk", "PMS". */
  actor: string;
  /** Small channel tag, e.g. "SMS", "Phone", "Email", "Workflow", "Hand-off". */
  channel: string;
  text: string;
  /** Optional two-line exchange rendered as chat bubbles. */
  transcript?: Array<{ who: "agent" | "person"; text: string }>;
};

export type CaseStep = {
  /** Time label above the rail: "Day 1", "+3 hours", "Day 9". */
  when: string;
  /** Clock time within the day, e.g. "9:40 am". */
  time?: string;
  /** System chip on the signal card, e.g. "PMS". */
  system?: string;
  /** What happened — the trigger for this column. */
  signal: string;
  /** What we remember going into this step. */
  memory?: string;
  actions: CaseAction[];
  /** Present on the final column only. */
  outcome?: { system: string; label: string };
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
  /** Panel title for the example, e.g. "From referral to kept visit". */
  exampleTitle: string;
  /** One line under the title: who we coordinate, until what. */
  exampleBody: string;
  /** "For healthcare providers" etc. */
  forLabel: string;
  channels: Array<"Phone" | "SMS" | "Email" | "Web chat">;
  systems: string[];
  person: string;
  personLabel: string;
  span: string;
  steps: CaseStep[];
  href: string;
};

export const verticals: VerticalStory[] = [
  {
    key: "dental",
    tab: "Healthcare",
    audience: "Physician practices and specialty groups",
    outcome: "Paid patient balance",
    outcomeShort: "paid balance",
    verifiedIn: "your practice ledger",
    queue: "patient balances headed to collections",
    headline: { lead: "Patients who owe a balance", accent: "and stopped opening the reminders." },
    forLabel: "For healthcare providers",
    channels: ["SMS", "Phone", "Email"],
    systems: ["EHR/PM", "Patient messaging"],
    exampleTitle: "Get Maya’s 74-day-old balance explained and paid.",
    exampleBody: "Primary Logic explains the balance and collects it in your system, before it hits collections.",
    person: "Maya",
    personLabel: "a dermatology patient",
    span: "Day 1 to Day 16",
    href: "/healthcare",
    steps: [
      {
        when: "Day 1",
        time: "10:15 am",
        system: "EHR/PM",
        signal: "$186 balance, 74 days old; three automated reminders, no reply",
        memory: "Statement on file: date of service, charges, insurance adjustment, reason code — deductible.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Checks consent, reads the reason code, explains the balance in plain language" },
          { kind: "person", actor: "Patient", channel: "SMS", text: "", transcript: [
            { who: "agent", text: "Hi Maya — Dr. Chen’s office. Your $186 from the March 3 visit is the part your plan applied to your deductible, not a missed payment. Want me to walk you through it?" },
            { who: "person", text: "Wait, I thought my insurance covered that?" },
          ] },
        ],
      },
      {
        when: "Day 1",
        time: "10:19 am",
        system: "SMS",
        signal: "Maya asks why insurance didn’t pay",
        memory: "Claim adjudicated: billed $598, allowed $186, insurer paid $0, $186 applied to deductible.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Answers from the statement and your approved payment-plan policy" },
          { kind: "person", actor: "Patient", channel: "SMS", text: "", transcript: [
            { who: "agent", text: "Your insurer processed the claim. The allowed amount was $186, it paid $0 because your deductible isn’t met yet, and the $186 was applied to your deductible — so it’s your responsibility. Full statement is in your portal. You can pay today or split it into two payments of $93." },
            { who: "person", text: "Ok that makes sense. Can I split it?" },
          ] },
          { kind: "system", actor: "EHR/PM", channel: "Workflow", text: "Sets up the two-payment plan on the account" },
        ],
      },
      {
        when: "Day 2",
        time: "12:40 pm",
        system: "Portal",
        signal: "Maya pays the first $93 through the secure link",
        memory: "Maya replies during the day and prefers SMS.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Confirms the payment posted, schedules the second reminder" },
          { kind: "person", actor: "Patient", channel: "SMS", text: "", transcript: [
            { who: "agent", text: "Got it — $93 posted to your account. The second $93 is due April 15; I’ll text you the link a few days before." },
            { who: "person", text: "perfect, thank you!!" },
          ] },
          { kind: "system", actor: "EHR/PM", channel: "Workflow", text: "Posts the payment to the ledger" },
        ],
      },
      {
        when: "Day 16",
        time: "6:05 pm",
        system: "Portal",
        signal: "Second payment comes in on the reminder",
        memory: "Maya prefers SMS, daytime, and a split plan — saved for next time.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Verifies the balance is zero and closes the account" },
          { kind: "person", actor: "Patient", channel: "SMS", text: "", transcript: [
            { who: "agent", text: "That’s the last one, Maya — your balance is $0. Receipt is in your portal." },
            { who: "person", text: "yay. thanks for explaining it" },
          ] },
          { kind: "system", actor: "EHR/PM", channel: "Workflow", text: "Marks the balance paid in full" },
        ],
        outcome: { system: "EHR/PM", label: "Balance paid in full, posted to the ledger" },
      },
    ],
  },
  {
    key: "legal",
    tab: "Legal",
    audience: "Personal-injury and mass-tort firms",
    outcome: "Signed retainer",
    outcomeShort: "signed retainer",
    verifiedIn: "your case management system",
    queue: "qualified claimants who went quiet before signing",
    headline: { lead: "Claimants who qualified", accent: "and never signed." },
    forLabel: "For law firms",
    channels: ["Phone", "SMS", "Email"],
    systems: ["CMS", "E-sign"],
    exampleTitle: "Get Cameron’s injury-case retainer signed.",
    exampleBody: "Primary Logic works the claimant, the fee questions, and e-sign until the retainer is signed.",
    person: "Cameron",
    personLabel: "an injury claimant",
    span: "Day 1 to Day 2",
    href: "/legal",
    steps: [
      {
        when: "Day 1",
        time: "10:05 am",
        system: "CMS",
        signal: "Consult done a week ago, retainer still unsigned",
        memory: "Matter, consult notes, and retainer version attached.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Checks conflicts and consent, calls Cameron" },
          { kind: "person", actor: "Claimant", channel: "Phone", text: "", transcript: [
            { who: "agent", text: "Hi Cameron — I’ve resent the agreement. Anything holding you up?" },
            { who: "person", text: "Just a question about how the fee works." },
            { who: "agent", text: "It’s a contingency fee — you pay nothing unless the case resolves in your favor. I’ll send the firm’s one-page summary with the agreement." },
          ] },
        ],
      },
      {
        when: "Day 1",
        time: "12:30 pm",
        system: "CMS",
        signal: "Fee explained, agreement re-sent",
        memory: "The firm’s approved fee summary is on file.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Sends the approved fee summary with a fresh signature link" },
          { kind: "person", actor: "Claimant", channel: "Email", text: "", transcript: [
            { who: "agent", text: "Here’s the firm’s fee summary and a fresh link to sign — takes about a minute." },
            { who: "person", text: "Thanks, that clears it up. I’ll look tonight." },
          ] },
          { kind: "system", actor: "E-sign", channel: "Workflow", text: "Issues a fresh signature link" },
        ],
      },
      {
        when: "Day 2",
        time: "7:15 pm",
        system: "E-sign",
        signal: "Agreement opened, not signed",
        memory: "Cameron reads messages in the evening.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Sends the evening reminder" },
          { kind: "person", actor: "Claimant", channel: "SMS", text: "", transcript: [
            { who: "agent", text: "Your agreement is ready to sign — link below. Takes about a minute." },
            { who: "person", text: "Signing now." },
          ] },
        ],
      },
      {
        when: "Day 2",
        time: "7:32 pm",
        system: "E-sign",
        signal: "Signature complete",
        memory: "Cameron prefers evening SMS; the fee wording is saved for the next claimant.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Verifies the signature and files it to the matter" },
          { kind: "system", actor: "CMS", channel: "Workflow", text: "Records the signed retainer" },
        ],
        outcome: { system: "CMS", label: "Signed retainer" },
      },
    ],
  },
  {
    key: "lending",
    tab: "Lending",
    audience: "Credit unions, fintech lenders, and home-improvement finance",
    outcome: "Funded loan",
    outcomeShort: "funded loan",
    verifiedIn: "your loan origination system",
    queue: "applications that stalled mid-file",
    headline: { lead: "Borrowers who applied", accent: "and never funded." },
    forLabel: "For lenders",
    channels: ["Phone", "Email"],
    systems: ["CRM", "LOS"],
    exampleTitle: "Get Dana’s stalled home-equity loan funded.",
    exampleBody: "Primary Logic works the borrower and the documents, reading only what’s on the file, until the loan funds.",
    person: "Dana",
    personLabel: "a stalled borrower",
    span: "Day 1 to Day 10",
    href: "/lending",
    steps: [
      {
        when: "Day 1",
        time: "9:15 am",
        system: "LOS",
        signal: "Application stalled 14 days, two pay stubs missing",
        memory: "File, missing items, and loan officer attached.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Checks consent, sends a secure upload link" },
          { kind: "person", actor: "Borrower", channel: "Email", text: "", transcript: [
            { who: "agent", text: "Hi Dana — your file is two pay stubs from complete. Secure upload link inside." },
            { who: "person", text: "They’re on my work computer. Can someone call after 6?" },
          ] },
        ],
      },
      {
        when: "Day 1",
        time: "6:05 pm",
        system: "Phone",
        signal: "Scheduled call with Dana",
        memory: "Dana is reachable after 6 pm.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Calls at 6, stays on for the upload" },
          { kind: "person", actor: "Borrower", channel: "Phone", text: "", transcript: [
            { who: "agent", text: "I’ll stay on while you upload — the two most recent stubs." },
            { who: "person", text: "Done. What rate am I looking at?" },
            { who: "agent", text: "I can read you the approved rate and disclosure already on your file — sending them to your email now, exactly as recorded." },
          ] },
          { kind: "system", actor: "LOS", channel: "Workflow", text: "Marks the documents received" },
        ],
      },
      {
        when: "Day 8",
        time: "11:20 am",
        system: "LOS",
        signal: "Clear to close",
        memory: "Dana prefers evenings.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Confirms closing time and what to bring" },
          { kind: "person", actor: "Borrower", channel: "Phone", text: "", transcript: [
            { who: "agent", text: "You’re clear to close. Thursday at 5:30? Bring your ID." },
            { who: "person", text: "Yes, that works." },
          ] },
        ],
      },
      {
        when: "Day 10",
        time: "5:45 pm",
        system: "LOS",
        signal: "Loan funded",
        memory: "Dana is reachable after 6 pm; closing details stay on file.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Verifies funding against the file" },
          { kind: "system", actor: "LOS", channel: "Workflow", text: "Records the funding" },
        ],
        outcome: { system: "LOS", label: "Funded loan" },
      },
    ],
  },
];


export const hero = {
  heading: "Unfinished work is unrealized revenue.",
  body:
    "Primary Logic autonomously handles the leads, bookings, and balances your team can’t get to — in your existing systems, within your rules, until the revenue is won.",
  primaryCta: { label: "Design a pilot", href: PILOT_MAILTO },
  secondaryCta: { label: "See how it works", href: "#how" },
  form: { button: "Design a pilot", placeholder: "Work email" },
  caseLabel: "Example",
};

export const leak = {
  eyebrow: "Stop losing revenue",
  heading: "Most lost revenue isn’t lost. It’s unfinished.",
  body:
    "Patients say yes, claimants call, borrowers apply — then a lot of them go quiet. Not because they changed their mind. Because nobody’s job is to finish the follow-through.",
  moments: [
    { title: "It arrives at the wrong moment", body: "The 6:40 pm call, the 11 pm application, “let me think about it.” Everyone’s busy, so it waits." },
    { title: "Follow-up stops after two tries", body: "One call, one voicemail, a note in the system. Then something newer comes in." },
    { title: "Nobody notices it never finished", body: "No confirmed visit, no signed retainer, no funded loan — and no line item for the loss." },
  ],
  stats: [
    { figure: "30–60%", label: "of diagnosed dental treatment is never scheduled", source: "Practice-management case-acceptance benchmarks" },
    { figure: "40%", label: "of law firms answered a prospective client’s call", source: "Clio Legal Trends Report, 2024 secret-shopper study" },
    { figure: "10×", label: "more likely to reach a lead within 5 minutes than after 30", source: "Lead Response Management study, MIT / InsideSales" },
  ],
};

export const how = {
  eyebrow: "How it works",
  heading: "Customer coordination, owned until the revenue is won.",
  body:
    "Primary Logic picks up the lead, application, or booking your team can’t get to and completes it — in your name, in your systems, within the rules you set — until the outcome is recorded.",
  steps: [
    { title: "Answers at the right moment", body: "Minutes after the 11 pm form; the 6:05 pm callback because that’s when they said." },
    { title: "Never drops the follow-up", body: "Call, text, and email on their schedule, for days or weeks, remembering every touch." },
    { title: "Resolves it end to end", body: "Answers from your approved policies and pricing — nothing routed back to your team." },
    { title: "Finishes in your system", body: "Confirmed in your schedule, CMS, or LOS — that’s when it counts." },
  ],
  visual: {
    title: "One job, across channels",
    person: "Luis · dental implant consult",
    memory: ["Prefers SMS", "Evenings", "Downtown office"],
    nodes: [
      { channel: "SMS", label: "Two times offered", when: "Day 1 · 9:40 am" },
      { channel: "SMS", label: "Picks Thursday", when: "6:12 pm" },
      { channel: "SMS", label: "Financing options sent", when: "6:14 pm" },
      { channel: "SMS", label: "Reminder + intake", when: "Day 2 · 9:00 am" },
      { channel: "Outcome", label: "Visit confirmed", when: "7:48 pm" },
    ],
  },
  contrast: {
    heading: "Not a chatbot. Not an AI receptionist.",
    columns: { a: "An assistant", b: "Primary Logic" },
    rows: [
      { a: "Handles one conversation, then hands off", b: "Owns the job for days or weeks, across phone, text, and email" },
      { a: "Waits for someone to ask", b: "Acts when something changes — or when nothing does" },
      { a: "Measured on activity", b: "Measured on outcomes: visits confirmed, retainers signed, loans funded" },
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
  eyebrow: "Outcome-based pricing",
  heading: "Only pay for verified outcomes.",
  body: "Before launch, we agree on the billable event, the system that verifies it, and the fixed fee.",
  steps: [
    { key: "Define", body: "Choose the billable event — a confirmed visit, a signed retainer, a funded loan." },
    { key: "Verify", body: "Your system records completion — schedule, case system, or LOS." },
    { key: "Invoice", body: "Verified outcomes × fixed fee.", emphasized: true },
  ],
  trust: "Your system is the source of truth.",
  cta: { label: "Design a pilot", href: PILOT_MAILTO },
};

export const controls = {
  eyebrow: "Operating authority",
  heading: "Autonomous, within your rules.",
  body:
    "Before launch, we define the outcome, the operating authority, the approved knowledge, the prohibited actions, and the system of record.",
  principles: [
    {
      title: "Bounded",
      body: "Acts only on approved knowledge, permissions, policies, and consent. Nothing is improvised.",
      tags: [
        { label: "HIPAA", detail: "Signed BAA, minimum-necessary PHI access" },
        { label: "TCPA & consent", detail: "Consent on file; quiet hours and opt-outs enforced" },
        { label: "Licensed-activity rules", detail: "No clinical, legal, or financial advice" },
      ],
    },
    {
      title: "Auditable",
      body: "Every message, action, and system write sits on one record, readable any time.",
      tags: [
        { label: "Full audit trail", detail: "Calls, texts, emails, and writes, timestamped" },
        { label: "Access logging", detail: "Who saw what, and when" },
        { label: "Compliance review", detail: "Any case, readable by your team, any time" },
      ],
    },
    {
      title: "Accountable",
      body: "Work outside its authority closes uncompleted, with its history. Only verified outcomes are billed.",
      tags: [
        { label: "System of record", detail: "Your schedule, CMS, or LOS decides completion" },
        { label: "Closed, not improvised", detail: "Out-of-authority cases end with a record" },
        { label: "Never billed", detail: "No verified outcome, no fee" },
      ],
    },
  ],
};

export const lanes = {
  eyebrow: "Where we run",
  heading: "Same approach, three industries.",
  cards: [
    { key: "dental" as VerticalKey, title: "Dental groups & DSOs", outcome: "Confirmed treatment visit", body: "Patients who were diagnosed but never scheduled, worked through to a booked, confirmed visit.", href: "/healthcare", action: "See dental" },
    { key: "legal" as VerticalKey, title: "Personal injury & mass tort", outcome: "Signed retainer", body: "After-hours and overflow claimants, worked from first contact to signature. Legal judgment stays with the lawyer.", href: "/legal", action: "See legal" },
    { key: "lending" as VerticalKey, title: "Consumer lending", outcome: "Funded loan", body: "Home-equity, home-improvement, personal, and auto-refi files, chased to funding. Quoting stays with your licensed officers.", href: "/lending", action: "See lending" },
  ],
};

export const pilot = {
  eyebrow: "The pilot",
  heading: "Recapture the revenue you’re losing.",
  body:
    "Give Primary Logic one overlooked queue, one operating policy, and one verifiable outcome. It runs the workflow inside your systems; you pay only when that outcome is recorded.",
  steps: [
    { title: "Pick one queue", body: "One you already measure and already lose. Your current process keeps running." },
    { title: "We learn how you work", body: "About two weeks: we listen to your calls, learn your scripts and rules, and agree on what goes to your team." },
    { title: "Run it side by side", body: "We work part of the queue, you keep the rest. Compare on your own dashboard." },
    { title: "Pay per completion", body: "Only outcomes your system confirms are billed. If nothing completes, the pilot cost you nothing." },
  ],
  form: { button: "Design a pilot", placeholder: "Work email" },
};
