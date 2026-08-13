/**
 * Homepage (/) copy for the horizontal outcome-harness site.
 *
 * CLAIM RULE: no lane, customer, metric, or competitor claim ships without
 * evidence; competitors are never named. All worked examples are labeled
 * illustrative. We have no public case studies; the proof section sells the
 * pilot structure, never invented numbers.
 */

export const hero = {
  headingLead: "Agents that carry a job",
  headingAccent: "to the finish.",
  body:
    "Primary Logic runs autonomous agents that own slow administrative work end to end — every call, text, email, and portal step, across days or weeks — until the job reaches a verified outcome in your own system.",
  outcome:
    "No seats. No subscriptions. A fixed fee per completed outcome, and failed attempts cost you nothing.",
};

export type LeakRow = {
  name: string;
  chip: string;
  chipTone: "loss" | "warn" | "accent";
  line: string;
  state: string;
  note: string;
  age: string;
};

export const leak = {
  eyebrow: "The leak",
  heading: "Every pipeline leaks after the handoff.",
  intro:
    "The first contact usually happens. It’s the fourth follow-up on day eleven that doesn’t. Work that needs weeks of persistence stalls in queues nobody owns — and quietly becomes lost revenue.",
  rows: [
    {
      name: "Refi lead",
      chip: "Lending",
      chipTone: "loss",
      line: "Rate quoted · application started",
      state: "Stalled at income docs",
      note: "Two reminders sent, none since. Nobody owns attempt three.",
      age: "Day 9",
    },
    {
      name: "Injury claimant",
      chip: "Legal intake",
      chipTone: "warn",
      line: "Qualified · retainer sent for signature",
      state: "Unsigned",
      note: "No callback scheduled. Intent is fading by the day.",
      age: "Day 4",
    },
    {
      name: "Referred patient",
      chip: "Healthcare",
      chipTone: "accent",
      line: "Referral received · first pass done",
      state: "Unreached after two attempts",
      note: "Out of the queue, off the report, still unbooked.",
      age: "Day 12",
    },
  ] as LeakRow[],
  footnote: "Illustrative examples, not customer data.",
};

export const loop = {
  eyebrow: "How it runs",
  heading: "One agent owns the job. A loop keeps it moving.",
  intro:
    "A job isn’t a ticket that waits for a human to pick it up. Each one is held by an agent that runs the same loop until the work is finished.",
  steps: [
    {
      title: "Watch",
      body:
        "The agent listens for anything that changes the job: an inbound reply, a portal status flip, a document arriving — or silence past a deadline, which is a signal too.",
    },
    {
      title: "Decide",
      body:
        "It reads the job’s full history and current state, then picks the single next move, checked against the playbook you approved. Anything outside the playbook escalates to your team.",
    },
    {
      title: "Act",
      body:
        "It makes the call, sends the text or email, or works the portal. Multi-party, multi-channel, on schedule — for as many days as the job takes.",
    },
    {
      title: "Record",
      body:
        "Every action and response lands in the job’s auditable history, and completions are verified against your system of record before anything is billable.",
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
  eyebrow: "Proof",
  heading: "No case studies yet. A better offer instead.",
  intro:
    "We’re early, and we won’t dress that up with borrowed logos or invented percentages. What we offer is a pilot structured so the proof shows up in your numbers, not ours.",
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
};

export const finalCta = {
  heading: "Send us what’s leaking.",
  body:
    "A pilot starts with a copy of one feed and changes nothing about how you operate. Completions are verified in your system, billed per outcome — and if nothing completes, you owe nothing.",
};
