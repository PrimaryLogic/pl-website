/**
 * Homepage copy is centralized here so every product claim can be reviewed
 * without hunting through layout code.
 *
 * CLAIM RULE: Primary Logic publishes no customer, performance, integration,
 * certification, or pricing claims on this page. Calculator figures come from
 * the reader. Product traces are explicitly illustrative. Deployment promises
 * describe a review process, not a compliance outcome.
 */

export const CONTACT_EMAIL = "hello@primarylogic.com";

export const nav = {
  wordmark: "Primary Logic",
  links: [
    { label: "Product", href: "#product" },
    { label: "Workflows", href: "#workflows" },
    { label: "Deployment", href: "#trust" },
    { label: "Economics", href: "#economics" },
  ],
  cta: { label: "Map one workflow", href: "#contact" },
};

export const hero = {
  eyebrow: "AI patient coordination for specialty practices",
  heading: "Every referral gets followed through.",
  body: "Primary Logic keeps responsibility for the next patient step across voice, SMS, and email. It continues until that step is complete, the patient declines, or a person needs to take over.",
  thesis:
    "Automation sends the next message. Coverage stays responsible for the outcome.",
  primaryCta: { label: "Map one workflow", href: "#contact" },
  secondaryCta: { label: "See a coverage trace", href: "#product" },
};

export const operatingPrinciples = [
  {
    label: "One history",
    body: "Each channel reads the same workflow state instead of starting over.",
  },
  {
    label: "Explicit finish line",
    body: "Completed, declined, and needs-human are states—not guesses.",
  },
  {
    label: "Context at handoff",
    body: "Staff receive the reason, the thread, and the unresolved next step.",
  },
];

export const coverageDefinition = {
  eyebrow: "The operating model",
  heading: "Coverage is a closed loop, not a cadence.",
  intro:
    "A workflow begins with a signal and ends only at a named stopping condition. Everything between those points stays visible to the practice.",
  stages: [
    {
      index: "01",
      title: "Start from a real signal",
      body: "A referral arrives, an intake remains incomplete, or a follow-up becomes due.",
    },
    {
      index: "02",
      title: "Choose the next permitted action",
      body: "The workflow uses the approved channel, timing, language, and practice rule for that state.",
    },
    {
      index: "03",
      title: "Read what changed",
      body: "A reply, form status, appointment state, opt-out, or question updates the same thread.",
    },
    {
      index: "04",
      title: "Stop with an accountable state",
      body: "The step is complete, the patient declines, or staff receive a contextual handoff.",
    },
  ],
};

export const coverageTrace = {
  eyebrow: "Product in action",
  heading: "One referral. One owner. A visible finish line.",
  intro:
    "This fictional trace shows the control logic, not a measured result. The cadence, channels, data access, and stopping conditions are configured with each practice.",
  caseLabel: "Illustrative workflow · no patient data",
  caseId: "Referral PL–2048",
  objective: "Complete intake or route the unresolved step",
  status: "Completed",
  completion: "Intake received · staff queue cleared",
  rows: [
    {
      at: "09:02",
      kind: "Signal",
      event: "Referral received; mobile number available",
      state: "Needs outreach",
    },
    {
      at: "09:03",
      kind: "Action",
      event: "Consent request sent by SMS in the configured language",
      state: "Waiting on patient",
    },
    {
      at: "09:11",
      kind: "Signal",
      event: "Patient replies and opens the intake link",
      state: "Intake started",
    },
    {
      at: "09:18",
      kind: "Decision",
      event: "Non-clinical question answered from approved practice guidance",
      state: "Intake active",
    },
    {
      at: "09:26",
      kind: "Stop",
      event: "Required fields received; outreach cadence ends",
      state: "Complete",
    },
  ],
  stopConditions: ["Next step completed", "Patient declines or opts out", "Human review required"],
};

export const workflows = {
  eyebrow: "Where coverage begins",
  heading: "Start with one high-friction workflow.",
  intro:
    "Each deployment has a trigger, a finish line, and a named escalation owner. That makes the pilot narrow enough to govern and concrete enough to measure.",
  items: [
    {
      title: "Referral conversion",
      trigger: "New referral enters the agreed queue",
      work: "Confirm intent, collect permitted details, keep the next action moving",
      finish: "Booked, declined, unreachable by policy, or handed to staff",
    },
    {
      title: "Intake completion",
      trigger: "Required paperwork remains incomplete",
      work: "Resume from the missing step across the approved channel mix",
      finish: "Required fields received or the blocking issue is escalated",
    },
    {
      title: "Recall and non-clinical follow-up",
      trigger: "A practice-approved follow-up becomes due",
      work: "Re-engage, capture the response, and route clinical questions untouched",
      finish: "Next step recorded, patient declines, or licensed staff take over",
    },
  ],
};

export const systemFit = {
  eyebrow: "System fit",
  heading: "The workflow sits between a signal and an accountable outcome.",
  intro:
    "We map the exact reads, writes, and human boundaries before anything touches a production workflow. Availability depends on the practice stack and approved integration path.",
  columns: [
    {
      label: "Signal in",
      items: ["Referral received", "Form remains incomplete", "Patient replies", "Follow-up becomes due"],
    },
    {
      label: "Context used",
      items: ["Workflow state", "Approved practice guidance", "Channel consent", "Language and timing rules"],
    },
    {
      label: "Action out",
      items: ["Voice, SMS, or email step", "Status update", "Completed record", "Contextual human handoff"],
    },
  ],
};

export const trust = {
  eyebrow: "Control before scale",
  heading: "The deployment record is part of the product.",
  intro:
    "A workflow should be inspectable before it is automated. We document what can happen, what cannot happen, and who owns the exception.",
  controls: [
    {
      title: "Approved boundaries",
      body: "Channels, cadence, content sources, quiet hours, opt-outs, and forbidden actions are explicit configuration.",
    },
    {
      title: "Human escalation",
      body: "Clinical, billing, identity, and other practice-defined exceptions stop automation and preserve the full context for staff.",
    },
    {
      title: "Technical review",
      body: "Systems touched, data read and written, retention, subprocessors, access, and contracting are resolved before production use.",
    },
    {
      title: "Traceable outcomes",
      body: "Every workflow closes with a reason so the practice can audit completed steps, declines, timeouts, and handoffs.",
    },
  ],
  note:
    "We do not use an unsourced badge as a substitute for your security, privacy, legal, and clinical review.",
};

export const pilot = {
  eyebrow: "Proof without theater",
  heading: "Baseline the workflow. Run it narrowly. Compare the outcomes.",
  intro:
    "The practice defines the cohort and finish line before launch. The pilot report separates patient outcomes, staff workload, and exceptions so a higher message count cannot masquerade as success.",
  metrics: [
    { label: "Time to first permitted action", owner: "Responsiveness" },
    { label: "Patients who complete the named next step", owner: "Outcome" },
    { label: "Declines, opt-outs, and unreachable states", owner: "Disposition" },
    { label: "Cases escalated with sufficient context", owner: "Safety" },
    { label: "Manual touches required per completed case", owner: "Staff load" },
  ],
};

/** Default values live in lib/economics.ts, beside the model that uses them. */
export const ledger = {
  eyebrow: "Your economics",
  heading: "Put a range around the unfinished work.",
  intro:
    "The calculator makes no Primary Logic performance claim. Volume, drop-off, patient value, and the recoverable share are your inputs; change them to match one workflow.",
  fields: {
    inbound: { label: "Inbound patients each month", hint: "Referrals or another defined cohort" },
    dropRate: { label: "Share that misses the next step", hint: "Use your current baseline" },
    revenuePerPatient: {
      label: "Average first-year net revenue",
      hint: "Collections attributable to one patient",
    },
    acquisitionCost: {
      label: "Acquisition cost per patient",
      hint: "Optional: marketing and referral development",
    },
    recoveryRate: {
      label: "Recoverable share to model",
      hint: "Your scenario—not a product promise",
    },
  },
  rows: {
    lost: "Patients missing the next step, monthly",
    monthly: "Revenue exposed, monthly",
    annual: "Revenue exposed, annually",
    total: "Modelled recoverable value, annually",
  },
  sunkNote:
    "This was spent acquiring the unfinished cohort. It is shown separately because recovering a patient does not refund acquisition cost.",
  sunkLabel: "Acquisition already spent, monthly",
  advancedLabel: "Add acquisition cost",
};

export const comparison = {
  eyebrow: "Operating cost",
  heading: "Compare three ways to create one more completed case.",
  intro:
    "The same model can price additional acquisition, added coordinator capacity, or a coverage platform. Expand the assumptions only if this comparison helps your decision.",
  options: [
    {
      key: "paid" as const,
      label: "Buy more demand",
      body: "Acquisition adds another person to the top of the funnel without repairing the unfinished workflow beneath it.",
      reach: "Net-new patients",
      scale: "Tracks media spend",
      risk: "More demand can add more leakage",
    },
    {
      key: "team" as const,
      label: "Add coordinators",
      body: "People bring judgment and flexibility; capacity grows in hiring, training, supervision, and coverage increments.",
      reach: "Assigned worklists",
      scale: "Tracks headcount",
      risk: "Queue and turnover variance",
    },
    {
      key: "coverage" as const,
      label: "Cover the workflow",
      body: "A platform cost is spread across the defined cohort while staff stay responsible for exceptions and judgment.",
      reach: "Configured cohort",
      scale: "Modelled fixed cost",
      risk: "Integration and adoption",
    },
  ],
  fields: {
    coordinatorCost: {
      label: "Monthly loaded cost per coordinator",
      hint: "Salary, benefits, tooling, supervision",
    },
    coordinatorCapacity: {
      label: "Patients one coordinator can work",
      hint: "Per month, across the selected workflow",
    },
    platformCost: {
      label: "Monthly coverage cost to model",
      hint: "Your scenario; Primary Logic pricing is not stated here",
    },
  },
  rows: {
    monthly: "Monthly cost at this volume",
    perPatient: "Cost per modelled completion",
    reach: "Who it reaches",
    scale: "At scale",
    risk: "What can go wrong",
  },
  caption:
    "All three values are derived from your inputs. A coordinator model is sized against the unfinished cohort; platform cost is the scenario you entered.",
  undefinedNote: "Set a recoverable share above zero to price these.",
  assumptionsLabel: "Edit comparison assumptions",
};

export const faq = {
  eyebrow: "Questions worth resolving",
  heading: "What a responsible first conversation should cover.",
  items: [
    {
      question: "Does Primary Logic replace the coordination team?",
      answer:
        "No. The product owns repeatable follow-through inside approved boundaries. Staff keep judgment, exceptions, relationship-sensitive work, and every responsibility the practice chooses not to automate.",
    },
    {
      question: "What counts as a successful workflow?",
      answer:
        "A named patient step reaches one of its agreed stopping conditions: completed, declined or opted out, unreachable under policy, or handed to a person with the unresolved context attached.",
    },
    {
      question: "Which systems does it integrate with?",
      answer:
        "This page does not publish an integration list we cannot substantiate. Workflow mapping identifies the required systems and the approved read/write path; feasibility is confirmed before a pilot is proposed.",
    },
    {
      question: "How is patient data handled?",
      answer:
        "Data scope, access, retention, subprocessors, security controls, and contracting belong in the technical review. Production use should not begin until the practice is satisfied with that record.",
    },
    {
      question: "How do we start without redesigning the operation?",
      answer:
        "Choose one queue with a measurable baseline, define its finish line and escalation owner, map the permitted actions, and pilot only that cohort before expanding scope.",
    },
  ],
};

export const finalCta = {
  eyebrow: "One-workflow pilot",
  heading: "Bring the queue. Leave with a coverage map.",
  body: "In the first working session, we define the trigger, finish line, permitted actions, system touchpoints, escalation owner, and baseline measures for one workflow. If the operating path is not credible, we stop there.",
  formNote: "No patient data. A work email and practice name are enough to start.",
};

export const footer = {
  entity: "Primary Logic",
  statement: "Patient follow-through with an accountable finish line.",
  links: [
    { label: "Product", href: "#product" },
    { label: "Deployment", href: "#trust" },
    { label: "Contact", href: "#contact" },
  ],
};
