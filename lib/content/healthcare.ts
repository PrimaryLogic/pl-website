/**
 * Healthcare lane copy (/healthcare) is centralized here so every product and
 * economic claim can be reviewed without hunting through layout code.
 *
 * CLAIM RULE: product traces and the pricing model are explicitly
 * illustrative. The calculator only derives figures from reader inputs. The
 * page publishes no customer, certification, integration, pricing, or measured
 * performance claim without evidence. Competitors are never named.
 */

export const hero = {
  headingLead: "We convert the referrals",
  headingAccent: "your first pass couldn’t.",
  body:
    "Keep your schedulers and your scheduling software — they take the first pass. Primary Logic takes the second: the unreached patients, the abandoned intakes, the stalled authorizations. We work each one across voice, SMS, email, payer, and EHR until it reaches a kept first visit or another named terminal state.",
  outcome: "You pay per kept first visit, verified in your EHR. Everything else is $0.",
};

export type ChallengeRow = {
  name: string;
  chip: string;
  chipTone: "loss" | "warn" | "accent";
  line: string;
  state: string;
  note: string;
  age: string;
};

export const challenge = {
  eyebrow: "The challenge",
  heading: "The referrals you’ve already paid for are the ones leaking.",
  intro:
    "Your team and your tools make the first attempt. It’s what happens after that first attempt fails that leaks: intake forms that never come back, referrals no one calls a third time, follow-ups with no owner.",
  rows: [
    {
      name: "Robert, 55",
      chip: "Referral",
      chipTone: "loss",
      line: "Plaque psoriasis · referred by PCP",
      state: "Waiting for first callback",
      note: "Intent is highest right now, and fading.",
      age: "2h 14m",
    },
    {
      name: "Jennifer, 42",
      chip: "Intake",
      chipTone: "warn",
      line: "New patient · forms sent",
      state: "Insurance field incomplete",
      note: "Abandoned mid-form. No follow-up queued.",
      age: "18h",
    },
    {
      name: "Marcus, 68",
      chip: "Rx follow-up",
      chipTone: "accent",
      line: "Biologic refill check-in",
      state: "No next action scheduled",
      note: "One voicemail left. Nobody owns the next step.",
      age: "2d",
    },
  ] as ChallengeRow[],
};

export const solution = {
  eyebrow: "AI agent orchestration",
  heading: "One owner, one next action, one auditable outcome for every referral we take.",
  intro:
    "Primary Logic is the administrative system of action across the patient, payer, scheduling system, and EHR. Your EHR remains the system of record. Clinical decisions and policy exceptions route to your team.",
  terminalStates: {
    heading: "Every referral we take ends in a known state.",
    body:
      "Every attempt, response, and handoff is written back to the EHR. Primary Logic closes a referral only as:",
    items: [
      "Kept first appointment",
      "Patient declined",
      "Unreachable after the agreed contact sequence",
      "Clinical escalation required",
      "Operationally blocked or disqualified",
    ],
    note: "The EHR’s kept first appointment status determines billing. Other terminal states are worked but not billed.",
  },
};

/**
 * An illustrative referral, told as a six-step journey. Every figure on the
 * dashboard strip and every timestamp is written copy, not customer data or a
 * measured result.
 */
export type JourneyStep = {
  id: string;
  icon: "folder" | "shield" | "file" | "records" | "chat" | "check";
  title: string;
  timestamp: string;
  involved: {
    icon: "provider" | "payer" | "ehr" | "patient" | "scheduler";
    label: string;
    tone: "neutral" | "payer" | "patient";
  };
  signal: string;
  action: string;
  channel: string;
  outcome: string;
  state: {
    owner: string;
    dependency: string;
    nextAction: string;
    writeback: string;
    banner: {
      lead: string;
      body: string;
      strong: string;
    };
  };
};

export const journey = {
  patient: {
    initials: "EC",
    name: "Ellis Carter",
    context: "Dermatology referral",
    mrn: "MRN 8329471",
  },
  stats: [
    { icon: "active", label: "Active referrals", value: "3,842", tone: "accent" },
    { icon: "owned", label: "Next action owned", value: "99.4%", tone: "voice" },
    { icon: "review", label: "Needs staff review", value: "23", tone: "neutral" },
  ] as { icon: "active" | "owned" | "review"; label: string; value: string; tone: "accent" | "voice" | "neutral" }[],
  days: [
    { label: "Day 1", span: 3 },
    { label: "Day 2", span: 1 },
    { label: "Days 3 and 4", span: 2 },
  ],
  steps: [
    {
      id: "referral",
      icon: "folder",
      title: "Referral received",
      timestamp: "Mon, May 19 · 9:46 AM",
      involved: { icon: "provider", label: "Referring provider", tone: "neutral" },
      signal: "A referral arrives for Ellis with moderate plaque psoriasis.",
      action: "Opens the referral and links the patient chart.",
      channel: "EHR",
      outcome: "Referral logged and owned.",
      state: {
        owner: "Primary Logic",
        dependency: "Coverage confirmation",
        nextAction: "Run eligibility by 10:00 AM",
        writeback: "Referral accepted at 9:46 AM",
        banner: {
          lead: "Current state:",
          body: "referral accepted and owned.",
          strong: "Eligibility check queued.",
        },
      },
    },
    {
      id: "insurance",
      icon: "shield",
      title: "Insurance verified",
      timestamp: "Mon, May 19 · 10:12 AM",
      involved: { icon: "payer", label: "Payer", tone: "payer" },
      signal: "Coverage needs confirmation before any scheduling.",
      action: "Runs eligibility and benefits with the payer.",
      channel: "API",
      outcome: "In network. Coverage confirmed.",
      state: {
        owner: "Primary Logic",
        dependency: "Patient intake",
        nextAction: "Send intake link now",
        writeback: "Coverage verified at 10:12 AM",
        banner: {
          lead: "Current state:",
          body: "coverage confirmed.",
          strong: "Patient intake queued.",
        },
      },
    },
    {
      id: "intake",
      icon: "file",
      title: "Intake completed",
      timestamp: "Mon, May 19 · 1:47 PM",
      involved: { icon: "patient", label: "Patient · Intake", tone: "patient" },
      signal: "History, photos, and consents are still missing.",
      action: "Texts Ellis the intake link and answers questions as they come.",
      channel: "SMS",
      outcome: "Forms, photos, and history returned.",
      state: {
        owner: "Primary Logic",
        dependency: "Payer requirements",
        nextAction: "Prepare prior authorization",
        writeback: "Intake complete at 1:47 PM",
        banner: {
          lead: "Current state:",
          body: "intake complete.",
          strong: "Payer requirements queued.",
        },
      },
    },
    {
      id: "prior-auth",
      icon: "records",
      title: "Prior auth submitted",
      timestamp: "Tue, May 20 · 9:18 AM",
      involved: { icon: "payer", label: "Payer · EHR", tone: "payer" },
      signal: "The payer requires prior authorization before scheduling.",
      action: "Completes approved administrative fields, attaches existing chart evidence, and routes missing clinical information or attestations for staff approval.",
      channel: "EHR + payer portal",
      outcome: "Submitted after required approval. Payer follow-up scheduled.",
      state: {
        owner: "Primary Logic",
        dependency: "Payer response",
        nextAction: "Check status May 21 at 9:00 AM",
        writeback: "Submission reconciled at 9:18 AM",
        banner: {
          lead: "Current state:",
          body: "authorization submitted.",
          strong: "Next payer check is owned.",
        },
      },
    },
    {
      id: "outreach",
      icon: "chat",
      title: "Appointment booked",
      timestamp: "Wed, May 21 · 3:09 PM",
      involved: { icon: "patient", label: "Patient · Scheduler", tone: "patient" },
      signal: "Required approval is recorded; the visit needs a time.",
      action: "Offers times that match Ellis’s saved preferences.",
      channel: "SMS",
      outcome: "Ellis books Thursday at 10:30 AM. Reminder scheduled.",
      state: {
        owner: "Primary Logic",
        dependency: "Patient arrival",
        nextAction: "Send reminder Thu at 8:30 AM",
        writeback: "Appointment booked at 3:09 PM",
        banner: {
          lead: "Current state:",
          body: "appointment booked, not yet billable.",
          strong: "Awaiting kept status.",
        },
      },
    },
    {
      id: "booked",
      icon: "check",
      title: "First visit kept",
      timestamp: "Thu, May 22 · 11:18 AM",
      involved: { icon: "ehr", label: "EHR status", tone: "neutral" },
      signal: "The authoritative EHR status records a completed first visit.",
      action: "Reconciles the kept status to the referral and closes the workflow.",
      channel: "EHR",
      outcome: "Eligible kept first appointment verified for billing.",
      state: {
        owner: "Closed",
        dependency: "None",
        nextAction: "No further referral action",
        writeback: "Kept status reconciled at 11:18 AM",
        banner: {
          lead: "Billable outcome:",
          body: "first visit kept",
          strong: "Thu, May 22 at 10:30 AM.",
        },
      },
    },
  ] as JourneyStep[],
  statePanel: {
    title: "Live referral state",
    tag: "Synchronized",
  },
  note: "Illustrative referral and operating dashboard. Not customer data or a measured result.",
};

export const economics = {
  alternatives: {
    eyebrow: "The operating decision",
    heading: "Keep your stack. Hand off the tail.",
    intro:
      "This isn’t a rip-and-replace decision. Your team and your tools keep the first pass; the question is who owns a referral after that pass fails — and what they’re paid for.",
    columns: {
      model: "Operating choice",
      purchase: "What you buy",
      customerOwns: "What your team still owns",
      billing: "How it is priced",
    },
    options: [
      {
        model: "Existing staff",
        purchase: "In-house labor",
        customerOwns: "Capacity, training, coverage, queues, handoffs, and exceptions",
        billing: "Salary and overhead whether work finishes or not",
        primary: false,
      },
      {
        model: "BPO or call center",
        purchase: "Managed labor capacity",
        customerOwns: "Playbooks, vendor oversight, quality, handoffs, and exceptions",
        billing: "FTEs, hours, contacts, or attempts",
        primary: false,
      },
      {
        model: "Access software or AI",
        purchase: "Tools that answer, schedule, or automate individual steps",
        customerOwns: "Connecting steps, monitoring completion, and resolving work outside the tool",
        billing: "Subscription, usage, or resolved interactions",
        primary: false,
      },
      {
        model: "Primary Logic",
        purchase: "The unconverted tail of your referral queue, worked to a verified terminal state",
        customerOwns: "Clinical decisions, policy, and customer-caused blocks",
        billing: "Kept first visits verified in your EHR; failed work is not billed",
        primary: true,
      },
    ],
    badge: "Second pass",
    note:
      "Paid media is not included: it creates demand; it does not process the referrals already in your queue.",
  },
  eyebrow: "Outcome-based pricing",
  heading: "Every dollar maps to a visit that was headed for a write-off.",
  intro:
    "Because we only take referrals after your first pass, every kept visit we bill is one you were otherwise losing. There is no paying us for conversions you’d have gotten anyway.",
  rules: [
    {
      label: "Billable",
      body: "A kept first visit, verified in your EHR, from a referral handed to us after your first pass.",
    },
    {
      label: "$0 outcome fee",
      body: "Unreachable, declined, escalated, disqualified, or blocked referrals.",
    },
    {
      label: "Fixed first",
      body: "The per-visit fee is set before launch from lane complexity and a conservative, finance-approved value per kept visit.",
    },
  ],
  calculator: {
    eyebrow: "Model your tail",
    heading: "What the written-off referrals are worth.",
    intro:
      "Every figure below is yours to set. The model only derives what your inputs imply — it is a qualification tool, not a forecast.",
  },
  fields: {
    monthlyReferrals: {
      label: "Monthly eligible referrals",
      hint: "One referral cohort your team already works",
    },
    currentBooked: {
      label: "Kept after your first pass",
      hint: "Kept first visits your team and tools already produce",
    },
    modeledBooked: {
      label: "Modeled kept with the tail worked",
      hint: "A scenario input, not a Primary Logic forecast",
    },
    monthlyCoordinationCost: {
      label: "Monthly follow-up cost removed or avoided",
      hint: "Only cost finance expects to remove, avoid, or redeploy",
    },
    contributionPerBooking: {
      label: "Contribution per incremental kept patient",
      hint: "Include downstream care only when finance can defend it",
    },
    outcomeFee: {
      label: "Fee per kept visit we produce",
      hint: "Billed only on recovered visits — never on your first-pass conversions",
    },
  },
  rows: {
    currentRate: "Current kept rate",
    unbooked: "Referrals not kept today",
    costPerBooking: "Current coordination cost per kept patient",
    modeledRate: "Modeled kept rate",
    additionalBooked: "Recovered kept visits per month",
    monthlyOpportunity: "Monthly incremental contribution",
    annualOpportunity: "Annual incremental contribution",
    annualOperatingValue: "Annual follow-up cost removed or avoided",
    annualGrossSwitchingValue: "Gross annual value",
    annualOutcomeFee: "Primary Logic annual fee — recovered visits only",
    annualCustomerRetained: "Annual value you retain",
  },
  note:
    "Model excludes implementation, collections risk, provider-capacity limits, and unsubstantiated downstream value. Illustrative defaults; replace every figure with finance-approved numbers.",
};

export const answers = {
  eyebrow: "Straight answers",
  heading: "The questions every practice asks first.",
  items: [
    {
      q: "Does it work with my EHR?",
      a: "Primary Logic works with the EHR you already run. Your EHR stays the system of record, and every action is written back to it. No migration and no second system for your team to manage.",
    },
    {
      q: "Who talks to my patients?",
      a: "Primary Logic communicates over voice, SMS, and email in your practice’s name. Every conversation and action is logged, so your team can review the complete history at any time.",
    },
    {
      q: "What about patient data?",
      a: "Security review and a signed BAA come before Primary Logic accesses protected health information. Access is limited to the approved workflow, and patient interactions, status changes, and EHR writebacks remain auditable.",
    },
    {
      q: "We already use scheduling software or a scheduling AI. Do we need this?",
      a: "Keep it — it makes the first pass cheaper. Primary Logic takes the second pass: the referrals that didn’t convert on the first. Nothing in your stack changes, and we’re only paid when one of those referrals becomes a kept first visit.",
    },
  ],
};

export const finalCta = {
  heading: "Give us the referrals you’ve written off.",
  body: "A pilot starts with a copy of your referral feed — webhook, email, or CSV — and changes nothing about how your team works today. Kept first visits are verified in your EHR before they’re billable. If none are kept, you pay nothing.",
};
