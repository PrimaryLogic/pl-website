/**
 * Homepage (/) copy for the horizontal outcome-harness site.
 *
 * CLAIM RULE: no lane, customer, metric, or competitor claim ships without
 * evidence; competitors are never named. All worked examples are labeled
 * illustrative. We have no public case studies; the proof section sells the
 * pilot structure, never invented numbers.
 */

export const hero = {
  eyebrow: "Outcome agents for long-horizon work",
  headingLead: "Outcome agents for",
  headingAccent: "long-horizon work.",
  body:
    "Primary Logic handles the job end to end and directly drives your top line - staying with the work until it's done, across days or months.",
  outcome:
    "Pay only for kept visits, funded loans, and signed retainers. Every other terminal state costs $0.",
  caseCard: {
    tag: "Live case · illustrative",
    jobId: "JOB 4,182",
    chip: "Lending — refi recapture",
    rows: [
      { label: "Owner", value: "Agent 07" },
      { label: "State", value: "Waiting on borrower documents" },
      { label: "Next move", value: "Reminder call · today 6:10 PM" },
      { label: "Last signal", value: "SMS reply · Day 3 — “can I send them Friday?”" },
    ],
    footer: "One owner. One next move. Always.",
  },
};

export type TraceEvent = {
  id: string;
  day: string;
  time: string;
  channel: "SMS" | "Voice" | "Email" | "Portal" | "System";
  phase: "signal" | "decision" | "task" | "interaction";
  /** "agent" renders as an outbound message bubble; "person" as a reply; "system" as a mono event row. */
  kind: "agent" | "person" | "system";
  title: string;
  text: string;
  meta: string;
  /** Horizontal position on the long-horizon trace, from 0–100. */
  x: number;
  terminal?: boolean;
};

export type Trace = {
  chip: string;
  chipTone: "loss" | "warn" | "accent";
  previewTone: "sage" | "sand" | "blue";
  span: string;
  goal: string;
  heading: string;
  body: string;
  href?: string;
  linkLabel?: string;
  dayLabels: string[];
  initialStep: number;
  preview: {
    scenes: Array<{
      channel: "Voice" | "SMS" | "Email";
      title: string;
      meta: string;
      badge?: string;
      style: "transcript" | "message";
      lines: Array<{ speaker: string; text: string; reply?: boolean }>;
    }>;
    result?: {
      title: string;
      meta: string;
      badge: string;
      details: string[];
    };
    outcome: string;
    outcomeMeta: string;
  };
  events: TraceEvent[];
  outcome: string;
};

export const traces = {
  eyebrow: "One case · many interactions",
  heading: "One agent owns every interaction.",
  intro:
    "These are days or weeks of work across voice, SMS, email, portals, and the customer’s system of record — not single-turn tasks.",
  items: [
    {
      chip: "Healthcare referrals",
      chipTone: "accent",
      previewTone: "sage",
      span: "Day 1 → Day 9",
      goal: "Get Luis from an aged referral to a kept first visit.",
      heading: "From aged referral to kept first visit.",
      body:
        "After your team’s first pass, the agent works the unbooked tail — reaches the patient, handles the logistics, books into your real schedule, and stays on the case through the visit itself.",
      href: "/healthcare",
      linkLabel: "Explore healthcare",
      dayLabels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 8", "Day 9"],
      initialStep: 7,
      preview: {
        scenes: [
          {
            channel: "Voice",
            title: "Luis · scheduling call",
            meta: "Day 1 · 4m 08s",
            badge: "connected",
            style: "transcript",
            lines: [
              { speaker: "Agent", text: "I can hold Thursday at 2:15. Does that office work?" },
              { speaker: "Luis", text: "Yes — book that one." },
            ],
          },
        ],
        result: {
          title: "Luis arrived for his visit",
          meta: "Day 9 · practice schedule",
          badge: "verified",
          details: ["Appointment marked arrived", "Referral matched and closed"],
        },
        outcome: "Visit kept",
        outcomeMeta: "Day 9",
      },
      events: [
        { id: "hc-01", day: "Day 1", time: "8:14 am", channel: "System", phase: "signal", kind: "system", title: "Aged referral enters the feed", text: "Luis’s referral is still unbooked after the practice’s first pass. The raw record is retained and a second-pass case opens.", meta: "REFERRAL_FEED → case opened", x: 2 },
        { id: "hc-02", day: "Day 1", time: "8:14 am", channel: "System", phase: "decision", kind: "system", title: "Check the contact frame", text: "The runtime checks consent basis, suppression status, specialty, location, and the approved scheduling playbook before any outreach.", meta: "Policy check · passed", x: 3.5 },
        { id: "hc-03", day: "Day 1", time: "8:16 am", channel: "System", phase: "task", kind: "system", title: "Queue the first outreach", text: "A two-option scheduling text is created as durable work with the practice’s approved language and current openings.", meta: "Scheduled · now", x: 5 },
        { id: "hc-04", day: "Day 1", time: "8:17 am", channel: "SMS", phase: "interaction", kind: "agent", title: "Two appointment options sent", text: "Hi Luis — the practice has Tuesday at 9:40 or Thursday at 2:15. Reply 1 or 2 and I’ll hold it.", meta: "SMS → Luis", x: 6.8 },
        { id: "hc-05", day: "Day 1", time: "12:41 pm", channel: "SMS", phase: "signal", kind: "person", title: "Luis asks about the location", text: "An inbound reply changes the job: Thursday works, but Luis needs to confirm which office is closer to work.", meta: "SMS inbound · intent detected", x: 10.1 },
        { id: "hc-06", day: "Day 1", time: "12:41 pm", channel: "System", phase: "decision", kind: "system", title: "Answer logistics, hold the slot", text: "The playbook permits a location answer and a temporary hold. Clinical questions would route to practice staff.", meta: "Bounded next move selected", x: 11.8 },
        { id: "hc-07", day: "Day 1", time: "12:43 pm", channel: "System", phase: "task", kind: "system", title: "Schedule a confirmation call", text: "The Thursday slot is held and a short call is queued for the time Luis requested.", meta: "Voice task · 4:00 pm", x: 13.4 },
        { id: "hc-08", day: "Day 1", time: "4:00 pm", channel: "Voice", phase: "interaction", kind: "system", title: "Location and timing confirmed", text: "The agent calls at the promised time, resolves the logistics, and books Thursday through the practice’s existing scheduling front door.", meta: "Voice → Luis · 4 min", x: 15.2 },
        { id: "hc-09", day: "Day 2", time: "8:02 am", channel: "System", phase: "signal", kind: "system", title: "Appointment appears in the schedule", text: "The next schedule export confirms the slot. Booked is progress, but it is not the terminal outcome and is never billable.", meta: "SCHEDULE_EXPORT → booked", x: 22.5 },
        { id: "hc-10", day: "Day 2", time: "8:02 am", channel: "System", phase: "decision", kind: "system", title: "Keep the case open", text: "The runtime sees two remaining obligations: intake forms and a kept-visit status from the customer’s schedule.", meta: "Next obligation · intake", x: 24.2 },
        { id: "hc-11", day: "Day 2", time: "8:04 am", channel: "System", phase: "task", kind: "system", title: "Queue the intake link", text: "A secure form reminder is scheduled with the link already associated with Luis’s appointment.", meta: "Email task · now", x: 25.9 },
        { id: "hc-12", day: "Day 2", time: "8:05 am", channel: "Email", phase: "interaction", kind: "agent", title: "Intake link delivered", text: "The appointment details, directions, and secure intake link are sent in one concise message.", meta: "Email → Luis", x: 27.7 },
        { id: "hc-13", day: "Day 4", time: "6:00 pm", channel: "Portal", phase: "signal", kind: "system", title: "Intake is still incomplete", text: "The promised completion window passes without a form submission. Silence becomes a new signal rather than a dropped case.", meta: "FORM_PORTAL → incomplete", x: 43.8 },
        { id: "hc-14", day: "Day 4", time: "6:00 pm", channel: "System", phase: "decision", kind: "system", title: "Use the promised-day reminder", text: "The approved sequence calls for one soft SMS now and a staff escalation only if the form remains blocked.", meta: "Playbook step · reminder", x: 45.5 },
        { id: "hc-15", day: "Day 4", time: "6:02 pm", channel: "System", phase: "task", kind: "system", title: "Schedule a soft check-in", text: "The message is queued for the evening window Luis chose on the call.", meta: "SMS task · 6:10 pm", x: 47.1 },
        { id: "hc-16", day: "Day 4", time: "6:10 pm", channel: "SMS", phase: "interaction", kind: "agent", title: "Intake check-in sent", text: "A short reminder links directly to the unfinished form and offers help with administrative questions.", meta: "SMS → Luis", x: 48.9 },
        { id: "hc-17", day: "Day 6", time: "7:22 pm", channel: "Portal", phase: "signal", kind: "system", title: "Intake form submitted", text: "The form system reports completion. The case advances to the final pre-visit promise instead of closing early.", meta: "FORM_PORTAL → complete", x: 66.2 },
        { id: "hc-18", day: "Day 6", time: "7:22 pm", channel: "System", phase: "decision", kind: "system", title: "Prepare the visit reminder", text: "Directions, arrival time, and the practice’s approved rescheduling path are assembled for the last outreach.", meta: "Next obligation · attendance", x: 68 },
        { id: "hc-19", day: "Day 6", time: "7:24 pm", channel: "System", phase: "task", kind: "system", title: "Schedule the day-before reminder", text: "The reminder becomes durable work and will be superseded if the schedule changes before it sends.", meta: "SMS task · Day 8", x: 69.7 },
        { id: "hc-20", day: "Day 8", time: "9:00 am", channel: "SMS", phase: "interaction", kind: "agent", title: "Visit reminder delivered", text: "Luis receives directions, arrival time, and a reply path for any last administrative issue.", meta: "SMS → Luis", x: 82.8 },
        { id: "hc-21", day: "Day 9", time: "10:18 am", channel: "System", phase: "signal", kind: "system", title: "Kept visit verified", text: "The practice’s own schedule marks the appointment arrived. That customer-side event closes the job and supports the invoice.", meta: "EHR_EXPORT → arrived", x: 97, terminal: true },
      ],
      outcome: "Day 9 · Visit kept — verified in the EHR export. Billable.",
    },
    {
      chip: "Lending recapture",
      chipTone: "loss",
      previewTone: "sand",
      span: "Day 1 → Day 16",
      goal: "Get Dana from a stalled application to a funded loan.",
      heading: "From abandoned application to funded loan.",
      body:
        "The agent picks up applications that stalled mid-file — answers practical process questions, chases the documents, works the portal, and stays on the case until the loan funds or closes in another named state.",
      href: "/lending",
      linkLabel: "Explore lending",
      dayLabels: ["Day 1", "Day 3", "Day 5", "Day 7", "Day 9", "Day 11", "Day 14", "Day 16"],
      initialStep: 6,
      preview: {
        scenes: [
          {
            channel: "Voice",
            title: "Dana · document check",
            meta: "Day 3 · 6m 12s",
            style: "transcript",
            lines: [
              { speaker: "Agent", text: "Your file is two pay stubs short. I can walk you through the secure upload." },
              { speaker: "Dana", text: "Okay, I’m there now." },
            ],
          },
          {
            channel: "SMS",
            title: "Promised-day follow-up",
            meta: "Day 5 · 5:02 pm",
            style: "transcript",
            lines: [
              { speaker: "Agent", text: "Need the upload link again, or should I move our callback?" },
              { speaker: "Dana", text: "Resend it — I’ll finish tonight." },
            ],
          },
        ],
        outcome: "Loan funded",
        outcomeMeta: "Day 16",
      },
      events: [
        { id: "ln-01", day: "Day 1", time: "7:30 am", channel: "System", phase: "signal", kind: "system", title: "Stalled file enters the feed", text: "Dana’s application has been waiting on two pay stubs for 11 days. The raw LOS export is retained with the case.", meta: "LOS_EXPORT → stalled", x: 2 },
        { id: "ln-02", day: "Day 1", time: "7:30 am", channel: "System", phase: "decision", kind: "system", title: "Confirm the approved recapture frame", text: "Consent basis, licensing constraints, suppression status, loan state, and approved administrative topics are checked.", meta: "Policy check · passed", x: 3.6 },
        { id: "ln-03", day: "Day 1", time: "7:32 am", channel: "System", phase: "task", kind: "system", title: "Queue a document reminder", text: "The secure lender upload link and the exact missing-document list are assembled as durable work.", meta: "SMS task · 9:10 am", x: 5.2 },
        { id: "ln-04", day: "Day 1", time: "9:10 am", channel: "SMS", phase: "interaction", kind: "agent", title: "Missing-document note sent", text: "Dana receives the two-item list, secure portal link, and a clear route to the loan officer for financial advice.", meta: "SMS → Dana", x: 7 },
        { id: "ln-05", day: "Day 3", time: "3:46 pm", channel: "SMS", phase: "signal", kind: "person", title: "Dana asks for help uploading", text: "Dana replies that the files are on a work computer and asks for a call after 6 pm.", meta: "SMS inbound · callback requested", x: 17.2 },
        { id: "ln-06", day: "Day 3", time: "3:46 pm", channel: "System", phase: "decision", kind: "system", title: "Honor the requested window", text: "The runtime can explain the portal and documents, but any product or rate question remains reserved for the loan officer.", meta: "Bounded next move · call", x: 18.9 },
        { id: "ln-07", day: "Day 3", time: "3:48 pm", channel: "System", phase: "task", kind: "system", title: "Schedule the evening callback", text: "A call is queued for Dana’s requested time, with the file state and secure portal steps attached.", meta: "Voice task · 6:15 pm", x: 20.5 },
        { id: "ln-08", day: "Day 3", time: "6:15 pm", channel: "Voice", phase: "interaction", kind: "system", title: "Upload process walked through", text: "The agent resolves the administrative steps. A rate question routes to the loan officer, and Dana promises the documents Friday.", meta: "Voice → Dana · 6 min", x: 22.3 },
        { id: "ln-09", day: "Day 5", time: "5:00 pm", channel: "System", phase: "signal", kind: "system", title: "Promised day reaches its deadline", text: "The documents have not arrived by the agreed check-in time. The promise, not a generic cadence, wakes the case.", meta: "PROMISE_DUE → unmet", x: 34.1 },
        { id: "ln-10", day: "Day 5", time: "5:00 pm", channel: "System", phase: "decision", kind: "system", title: "Send one same-day check-in", text: "The approved playbook permits a reminder and preserves the loan officer handoff for all financial questions.", meta: "Playbook step · reminder", x: 35.8 },
        { id: "ln-11", day: "Day 5", time: "5:01 pm", channel: "System", phase: "task", kind: "system", title: "Queue the promised-day SMS", text: "The check-in is scheduled immediately and will cancel if the LOS reports the files first.", meta: "SMS task · now", x: 37.4 },
        { id: "ln-12", day: "Day 5", time: "5:02 pm", channel: "SMS", phase: "interaction", kind: "agent", title: "Promised-day check-in sent", text: "A short note asks whether Dana needs the link again or wants the callback moved.", meta: "SMS → Dana", x: 39.2 },
        { id: "ln-13", day: "Day 6", time: "8:14 am", channel: "Portal", phase: "signal", kind: "system", title: "Documents arrive in the portal", text: "Both pay stubs are present. The earlier reminder plan is superseded and the file returns to the lender’s review queue.", meta: "BORROWER_PORTAL → received", x: 48.8 },
        { id: "ln-14", day: "Day 6", time: "8:14 am", channel: "System", phase: "decision", kind: "system", title: "Close the document obligation", text: "The agent marks the administrative task complete but keeps the outcome case alive for downstream status changes.", meta: "Next obligation · lender review", x: 50.5 },
        { id: "ln-15", day: "Day 6", time: "8:16 am", channel: "System", phase: "task", kind: "system", title: "Schedule a status watch", text: "A durable check is set for the next expected LOS update; no unnecessary borrower touch is sent.", meta: "System task · Day 9", x: 52.1 },
        { id: "ln-16", day: "Day 9", time: "11:31 am", channel: "System", phase: "signal", kind: "system", title: "File clears to close", text: "The LOS export changes the loan status. That signal triggers the lender-approved closing coordination sequence.", meta: "LOS_EXPORT → clear to close", x: 64.5 },
        { id: "ln-17", day: "Day 9", time: "11:31 am", channel: "System", phase: "decision", kind: "system", title: "Confirm closing logistics", text: "The runtime selects the administrative next move and keeps licensed and product guidance with the lender’s team.", meta: "Next move · confirm time", x: 66.2 },
        { id: "ln-18", day: "Day 9", time: "11:33 am", channel: "System", phase: "task", kind: "system", title: "Queue the closing call", text: "The current closing window and document checklist are attached to the call task.", meta: "Voice task · 5:30 pm", x: 67.8 },
        { id: "ln-19", day: "Day 9", time: "5:30 pm", channel: "Voice", phase: "interaction", kind: "system", title: "Closing details confirmed", text: "Dana confirms the appointment and required identification. The case remains open because clear-to-close is not funded.", meta: "Voice → Dana · 3 min", x: 69.6 },
        { id: "ln-20", day: "Day 16", time: "2:09 pm", channel: "System", phase: "signal", kind: "system", title: "Funded loan verified", text: "The customer’s funding report matches the case. This is the agreed terminal outcome and the only default billable event.", meta: "LOS_FUNDING_REPORT → funded", x: 97, terminal: true },
      ],
      outcome: "Day 16 · Funded — verified in the LOS. Billable.",
    },
    {
      chip: "Legal intake",
      chipTone: "warn",
      previewTone: "blue",
      span: "Day 1 → Day 5",
      goal: "Get Cameron from completed consult to signed retainer.",
      heading: "From unsigned retainer to signed engagement.",
      body:
        "Qualified claimants go quiet between the consult and the signature. The agent keeps the administrative steps moving, routes legal questions to counsel, resends the right link, and closes the loop.",
      dayLabels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
      initialStep: 7,
      preview: {
        scenes: [
          {
            channel: "SMS",
            title: "Signature recovery",
            meta: "Day 4 · 5:45 pm",
            badge: "live",
            style: "message",
            lines: [
              { speaker: "Agent", text: "I resent the agreement. Want the secure link here too?" },
              { speaker: "Cameron", text: "Yes please.", reply: true },
            ],
          },
          {
            channel: "Email",
            title: "Counsel-approved answer",
            meta: "Day 4 · 5:47 pm",
            style: "message",
            lines: [
              { speaker: "Agent", text: "The fee answer is in your email with a fresh signature link." },
            ],
          },
        ],
        outcome: "Retainer signed",
        outcomeMeta: "Day 5",
      },
      events: [
        { id: "lg-01", day: "Day 1", time: "8:40 am", channel: "System", phase: "signal", kind: "system", title: "Unsigned retainer enters the feed", text: "Cameron completed the consult four days ago, but the approved agreement is still unsigned in the firm’s case system.", meta: "CASE_FEED → unsigned", x: 2 },
        { id: "lg-02", day: "Day 1", time: "8:40 am", channel: "System", phase: "decision", kind: "system", title: "Check the administrative frame", text: "Identity, contact basis, assigned matter, and the firm-approved follow-up playbook are confirmed before outreach.", meta: "Policy check · passed", x: 4.4 },
        { id: "lg-03", day: "Day 1", time: "8:42 am", channel: "System", phase: "task", kind: "system", title: "Queue a signature check-in", text: "The current signature link and a counsel escalation route are attached to a short call task.", meta: "Voice task · 12:30 pm", x: 6.8 },
        { id: "lg-04", day: "Day 1", time: "12:30 pm", channel: "Voice", phase: "interaction", kind: "system", title: "Cameron answers the call", text: "The link is easy to resolve; a fee question is not. The agent routes that question to intake counsel and promises a fresh link afterward.", meta: "Voice → Cameron · 7 min", x: 10.2 },
        { id: "lg-05", day: "Day 1", time: "1:08 pm", channel: "System", phase: "signal", kind: "system", title: "Counsel response arrives", text: "Intake counsel supplies the approved answer and confirms that the agreement itself has not changed.", meta: "INTERNAL_HANDOFF → answered", x: 14.5 },
        { id: "lg-06", day: "Day 1", time: "1:08 pm", channel: "System", phase: "decision", kind: "system", title: "Send the approved response", text: "The runtime uses counsel’s exact language, resends the current agreement, and records the source of the answer.", meta: "Bounded next move · email", x: 16.9 },
        { id: "lg-07", day: "Day 1", time: "1:10 pm", channel: "System", phase: "task", kind: "system", title: "Queue the counsel-approved email", text: "The agreement summary, answer, and signature link are scheduled together so no context is lost.", meta: "Email task · now", x: 19.3 },
        { id: "lg-08", day: "Day 1", time: "1:11 pm", channel: "Email", phase: "interaction", kind: "agent", title: "Fresh signature link delivered", text: "Cameron receives the firm-approved answer and a new signature link in the same thread.", meta: "Email → Cameron", x: 21.7 },
        { id: "lg-09", day: "Day 2", time: "6:00 pm", channel: "System", phase: "signal", kind: "system", title: "Agreement remains unsigned", text: "The requested review window passes without a signature. Silence becomes a scheduled signal, not an abandoned lead.", meta: "PROMISE_DUE → unsigned", x: 37.5 },
        { id: "lg-10", day: "Day 2", time: "6:00 pm", channel: "System", phase: "decision", kind: "system", title: "Wait until Cameron’s preferred time", text: "The playbook calls for one Friday-evening reminder, then a named unreachable state if the sequence completes.", meta: "Next move · scheduled SMS", x: 39.9 },
        { id: "lg-11", day: "Day 2", time: "6:02 pm", channel: "System", phase: "task", kind: "system", title: "Schedule the Friday nudge", text: "The reminder becomes durable work and will cancel automatically if the case system reports a signature first.", meta: "SMS task · Day 4", x: 42.3 },
        { id: "lg-12", day: "Day 4", time: "5:45 pm", channel: "SMS", phase: "interaction", kind: "agent", title: "Signature reminder sent", text: "A concise reminder repeats the secure link and the firm’s direct contact path for any legal question.", meta: "SMS → Cameron", x: 70.8 },
        { id: "lg-13", day: "Day 5", time: "9:12 am", channel: "System", phase: "signal", kind: "system", title: "Signature event arrives", text: "The firm’s e-sign system reports a completed agreement and returns the signed document identifier.", meta: "ESIGN_WEBHOOK → completed", x: 91.2 },
        { id: "lg-14", day: "Day 5", time: "9:12 am", channel: "System", phase: "decision", kind: "system", title: "Reconcile against the firm’s record", text: "The signed event is matched to the intake case before the runtime closes the work or supports an invoice.", meta: "Evidence check · matched", x: 93.6 },
        { id: "lg-15", day: "Day 5", time: "9:13 am", channel: "System", phase: "task", kind: "system", title: "Close the case as completed", text: "The case history, handoff, approved response, and customer-side evidence are fixed as the terminal record.", meta: "Case task · close", x: 95.5 },
        { id: "lg-16", day: "Day 5", time: "9:14 am", channel: "System", phase: "signal", kind: "system", title: "Signed retainer verified", text: "The firm’s signed-case log is authoritative. The job is complete and the agreed outcome is billable.", meta: "CASE_SYSTEM → signed", x: 97.5, terminal: true },
      ],
      outcome: "Day 5 · Retainer signed — verified in the case system. Billable.",
    },
  ] as Trace[],
  footnote: "Illustrative traces, not customer data or transcripts.",
};

export const loop = {
  eyebrow: "The agent loop",
  heading: "Powered by the Primary Logic runtime.",
  intro:
    "A case is never a process left running in the background. Each signal wakes the runtime, which chooses one bounded next action, executes it, and records what came back.",
  runtime:
    "The same harness powers every lane: durable case memory across weeks of interactions, deterministic policy for predictable behavior, and compliance guardrails checked again when anything sends.",
  caption: "Whatever comes back becomes the next signal. The loop runs until the job is done.",
  steps: [
    {
      title: "Signal",
      body:
        "The agent listens for anything that changes the job: an inbound reply, a portal status flip, a document arriving — or silence past a deadline, which is a signal too.",
    },
    {
      title: "Decision",
      body:
        "It reads the job’s full history and current state, then picks the single next move, checked against the playbook you approved. Anything outside the playbook escalates to your team.",
    },
    {
      title: "Task",
      body:
        "The next move becomes durable scheduled work. A crash loses nothing; a new reply supersedes the old plan before anything sends.",
    },
    {
      title: "Interaction",
      body:
        "The agent calls, texts, emails, or works the portal inside a bounded frame. Whatever comes back is recorded as the next signal.",
    },
  ],
  terminalStates: {
    heading: "Every job ends in a named state.",
    body: "Nothing is abandoned silently. An agent closes a job only as:",
    items: [
      "Completed — verified in your system, the only billable state",
      "Declined — the person said no",
      "Unreachable — after the full agreed contact sequence",
      "Escalated — judgment your team reserved for itself",
      "Blocked or disqualified — the job can’t proceed on your side",
    ],
    note: "Your system’s status determines billing — not our dashboard.",
  },
};

export const jobs = {
  eyebrow: "What we take",
  heading: "A job is ours if it checks five boxes.",
  items: [
    {
      title: "It leaks.",
      body: "The work exists today and measurably dies in a queue — not a new motion you’re hoping to invent.",
    },
    {
      title: "It’s long.",
      body: "Finishing takes days or weeks of sequenced follow-through across several parties, not one call.",
    },
    {
      title: "It’s administrative.",
      body: "Persistence, sequencing, and paperwork. Licensed and policy decisions stay with your team, by design.",
    },
    {
      title: "It ends somewhere you can verify.",
      body: "A funded loan. A signed retainer. A kept first visit. A status in your system, not a claim in ours.",
    },
    {
      title: "It’s worth a fee.",
      body: "Each completion is worth far more to you than we charge for it — or we shouldn’t take the job.",
    },
  ],
  feed: {
    heading: "Change nothing. Send a copy.",
    body:
      "Onboarding is a feed, not an integration project. Give us a copy of the leaking queue — a webhook, a forwarded email, or a nightly CSV — and keep operating exactly as you do today. Most feeds are live within a day.",
  },
};

export const lanes = {
  eyebrow: "Lanes",
  heading: "Same harness. Different finish lines.",
  intro:
    "The loop doesn’t change between industries — only the playbook, the parties, and the outcome we’re paid on.",
  cards: [
    {
      title: "Specialty referral conversion",
      status: "Live",
      body:
        "After your schedulers and scheduling software take their first pass, we work the referrals that didn’t convert — paid only per kept first visit, verified in your EHR.",
      link: { label: "See the healthcare lane →", href: "/healthcare" },
      analyticsId: "lane-healthcare",
    },
    {
      title: "Refi recapture and application rescue",
      status: "In pilot design",
      body:
        "Rate-watch re-engagement and abandoned applications, worked to funded loans — the only outcome we’d bill.",
      link: { label: "Talk to us →", href: "#contact" },
      analyticsId: "lane-lending",
    },
    {
      title: "Signed retainers, not contact attempts",
      status: "In pilot design",
      body:
        "Personal-injury intake followed through to a signed engagement, however many touches that takes.",
      link: { label: "Talk to us →", href: "#contact" },
      analyticsId: "lane-legal",
    },
  ],
  next: "Next up: high-ticket local services, insurance, and enrollment.",
};

export const pricing = {
  eyebrow: "Outcome pricing",
  heading: "You pay when the job completes. That’s the whole model.",
  intro:
    "Every other way of buying this work bills you for inputs — people, hours, licenses, messages — whether or not anything finishes. We can only invoice a completed outcome, so unfinished work is our cost, not yours.",
  columns: {
    model: "How you buy",
    pays: "What you pay for",
    unfinished: "When work doesn’t finish",
  },
  options: [
    {
      model: "Seats",
      pays: "Licenses for your team to do the work in",
      unfinished: "You still pay; the queue is still yours",
      primary: false,
    },
    {
      model: "Hours — staff or BPO",
      pays: "Effort and attempts",
      unfinished: "You still pay; attempts were made",
      primary: false,
    },
    {
      model: "Usage-based AI",
      pays: "Every call, message, or “resolution”",
      unfinished: "You still pay, per attempt",
      primary: false,
    },
    {
      model: "Primary Logic",
      pays: "Completed outcomes, verified in your system",
      unfinished: "You pay $0",
      primary: true,
    },
  ],
  badge: "Per outcome",
  rules: [
    {
      label: "Billable",
      body: "A completion your own system confirms.",
    },
    {
      label: "$0",
      body: "Declined, unreachable, escalated, blocked, or disqualified jobs.",
    },
    {
      label: "Fixed first",
      body: "The per-outcome fee is set before launch, from the lane’s complexity and a conservative estimate of what a completion is worth to you.",
    },
  ],
};

export const pilot = {
  eyebrow: "Proof, not promises",
  heading: "No borrowed logos. A pilot that proves itself in your records.",
  intro:
    "We’re early, and we won’t dress that up with invented percentages. Keep your current process running. Give us a slice of the same leaking inventory. Your system decides what completed and what is billable.",
  steps: [
    {
      title: "Pick one leaking lane.",
      body: "A queue you already measure and already lose.",
    },
    {
      title: "Send a copy of the feed.",
      body: "Webhook, forwarded email, or CSV. Your process doesn’t change; usually live within a day.",
    },
    {
      title: "Run it head-to-head.",
      body: "Keep doing what you do today. We work the same queue alongside — or just the tail you’ve written off.",
    },
    {
      title: "Pay per completion.",
      body: "You verify each one in your own system before it’s billable. If nothing completes, the pilot cost you nothing.",
    },
  ],
  closing: "No seats. No subscription. No charge for declined, unreachable, escalated, blocked, or disqualified cases.",
};

export const finalCta = {
  heading: "Send us what’s leaking.",
  body:
    "A pilot starts with a copy of one feed and changes nothing about how you operate. You verify every completion in your own system before it is billable.",
};
