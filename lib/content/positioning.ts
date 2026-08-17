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

export type ActorKind = "us" | "person" | "team" | "system";

export type CaseAction = {
  /** Who acts. "us" = Primary Logic, "person" = the patient/claimant/borrower,
   *  "team" = the customer's staff (hand-offs), "system" = the customer's software. */
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
    audience: "Dental groups and DSOs",
    outcome: "Kept treatment visit",
    outcomeShort: "kept visit",
    verifiedIn: "your practice schedule",
    queue: "diagnosed treatment that never got scheduled",
    headline: { lead: "Patients who said yes to treatment", accent: "and never came back." },
    forLabel: "For healthcare providers",
    channels: ["Phone", "SMS", "Email", "Web chat"],
    systems: ["EHR", "PMS"],
    exampleTitle: "Get Luis’s dental implant consult booked and confirmed.",
    exampleBody: "Primary Logic coordinates the patient, your front desk, and financing until the visit is confirmed.",
    person: "Luis",
    personLabel: "a dental patient",
    span: "Day 1 to Day 2",
    href: "/healthcare",
    steps: [
      {
        when: "Day 1",
        time: "9:40 am",
        system: "PMS",
        signal: "Implant consult diagnosed 30 days ago, never scheduled",
        memory: "Treatment plan, provider, and quoted fee attached.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Checks consent, pulls two open consult times" },
          { kind: "person", actor: "Patient", channel: "SMS", text: "", transcript: [
            { who: "agent", text: "Hi Luis — Dr. Patel’s office. Tuesday 9:30 or Thursday 2:00 for your implant consult?" },
            { who: "person", text: "Can I get back to you tonight?" },
          ] },
        ],
      },
      {
        when: "Day 1",
        time: "6:12 pm",
        system: "SMS",
        signal: "Luis replies after work",
        memory: "Luis answers in the evening.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Holds Thursday 2:00, routes the financing question" },
          { kind: "person", actor: "Patient", channel: "SMS", text: "", transcript: [
            { who: "person", text: "Thursday works. Do you offer payment plans?" },
            { who: "agent", text: "We do — our coordinator will send the options. Holding Thursday at 2:00 for you." },
          ] },
          { kind: "team", actor: "Coordinator", channel: "Hand-off", text: "Sends the financing options" },
          { kind: "system", actor: "PMS", channel: "Workflow", text: "Books Thursday 2:00 pm" },
        ],
      },
      {
        when: "Day 2",
        time: "9:00 am",
        system: "PMS",
        signal: "Visit is tomorrow; intake forms still open",
        memory: "Luis answers texts in the evening.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Sends the reminder, intake link, and directions" },
          { kind: "person", actor: "Patient", channel: "SMS", text: "", transcript: [
            { who: "agent", text: "See you tomorrow at 2:00 — intake form and directions below. Reply YES to confirm." },
            { who: "person", text: "Will do after work." },
          ] },
        ],
      },
      {
        when: "Day 2",
        time: "7:48 pm",
        system: "SMS",
        signal: "Intake complete, Luis confirms",
        memory: "Luis prefers SMS, evenings, and the downtown office — saved for next time.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Verifies intake and the confirmation" },
          { kind: "person", actor: "Patient", channel: "SMS", text: "", transcript: [
            { who: "person", text: "YES — form’s done." },
            { who: "agent", text: "You’re all set, Luis. See you Thursday at 2:00." },
          ] },
          { kind: "system", actor: "PMS", channel: "Workflow", text: "Marks the visit confirmed" },
        ],
        outcome: { system: "PMS", label: "Visit booked and confirmed" },
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
    exampleBody: "Primary Logic coordinates the claimant, your attorney, and e-sign until the retainer is signed.",
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
          ] },
          { kind: "team", actor: "Intake attorney", channel: "Hand-off", text: "Answers the fee question" },
        ],
      },
      {
        when: "Day 1",
        time: "12:30 pm",
        system: "CMS",
        signal: "Attorney’s answer received",
        memory: "The attorney’s exact wording is on file.",
        actions: [
          { kind: "us", actor: "Primary Logic", channel: "", text: "Sends the answer in the attorney’s words" },
          { kind: "person", actor: "Claimant", channel: "Email", text: "", transcript: [
            { who: "agent", text: "Here’s the fee answer from Attorney Ruiz, in her words — and a fresh link to sign." },
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
          { kind: "us", actor: "Primary Logic", channel: "", text: "Verifies the signature, notifies the attorney" },
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
    exampleBody: "Primary Logic coordinates the borrower, documents, and your loan officer until the loan funds.",
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
          ] },
          { kind: "team", actor: "Loan officer", channel: "Hand-off", text: "Answers the rate question" },
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
