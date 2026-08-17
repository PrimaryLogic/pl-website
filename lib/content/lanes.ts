/**
 * Copy for the three lane pages (/healthcare, /legal, /lending).
 *
 * Each lane page mirrors the homepage's sections and voice for a single buyer:
 * hero + pilot brief, the problem in their queue, how the work runs (with a
 * compact one-job example), operating authority, outcome-based pricing,
 * onboarding, and a closing CTA.
 *
 * Positioning: Primary Logic completes the workflow autonomously inside the
 * customer's systems and rules. No staff hand-offs; anything outside its
 * authority closes uncompleted and is never billed. It answers only from
 * approved knowledge already recorded in the customer's systems.
 *
 * CLAIM RULE: no metrics about our own results; competitors never named;
 * industry stats carry a source; illustrative examples say so.
 */

import type { NavContent } from "./shared";
import { WORDMARK } from "./shared";

export type LaneKey = "dental" | "legal" | "lending";
export type LaneSlug = "healthcare" | "legal" | "lending";

export type LaneContent = {
  key: LaneKey;
  slug: LaneSlug;
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    form: { button: string; placeholder: string };
    brief: { title: string; rows: Array<{ label: string; value: string }> };
  };
  problem: {
    eyebrow: string;
    heading: string;
    body: string;
    moments: Array<{ title: string; body: string }>;
    stats: Array<{ figure: string; label: string; source: string }>;
  };
  how: {
    eyebrow: string;
    heading: string;
    body: string;
    principles: Array<{ title: string; body: string }>;
    example: {
      title: string;
      person: string;
      memory: string[];
      nodes: Array<{ channel: "SMS" | "Phone" | "Email" | "System" | "Outcome"; label: string; when: string }>;
    };
  };
  authority: {
    eyebrow: string;
    heading: string;
    body: string;
    tenets: Array<{ title: string; body: string; tags: Array<{ label: string; detail: string }> }>;
  };
  pricing: {
    eyebrow: string;
    heading: string;
    body: string;
    steps: Array<{ key: string; body: string; emphasized?: boolean }>;
    trust: string;
    cta: { label: string; href: string };
  };
  onboarding: {
    eyebrow: string;
    heading: string;
    body: string;
    steps: Array<{ title: string; body: string; meta: string }>;
  };
  pilot: {
    heading: string;
    body: string;
    form: { button: string; placeholder: string };
  };
};

export const laneNav: NavContent = {
  wordmark: WORDMARK,
  links: [],
  cta: { label: "Design a pilot", href: "#pilot" },
};

export const lanes: LaneContent[] = [
  // ── Healthcare
  {
  key: "dental",
  slug: "healthcare",
  title: "Primary Logic for dental groups & DSOs | Confirmed treatment visits, paid per verified visit",
  description:
    "Primary Logic autonomously works diagnosed-but-unscheduled treatment until a confirmed visit is recorded in your PMS. Pay per confirmed treatment visit.",
  hero: {
    eyebrow: "For dental groups, DSOs, and elective healthcare",
    heading: "Turn accepted treatment into confirmed visits.",
    body:
      "Primary Logic autonomously works the patients who said yes but never scheduled — in your PMS, within your rules — until the confirmed visit is recorded in your schedule.",
    form: { button: "Design a pilot", placeholder: "Work email" },
    brief: {
      title: "The pilot, in one card",
      rows: [
        { label: "We take", value: "Diagnosed treatment that never got scheduled" },
        { label: "You send", value: "An unscheduled-treatment export from your PMS" },
        { label: "Verified in", value: "Your practice schedule — Dentrix, Eaglesoft, Open Dental" },
        { label: "You pay", value: "A fixed fee per confirmed treatment visit" },
      ],
    },
  },
  problem: {
    eyebrow: "Stop losing revenue",
    heading: "The patient said yes. Then nothing.",
    body:
      "Implants, full-arch, aligners, fertility, medspa — the plan is accepted and the fee is quoted. Then the patient walks out without a date, and the plan ages in the PMS.",
    moments: [
      { title: "Leaves without a date", body: "The plan is presented, the fee is quoted, and the patient leaves to “think about it.” Nobody calls back." },
      { title: "The financing question waits", body: "“Do you offer payment plans?” arrives at 6:40 pm. By morning the front desk has a full waiting room." },
      { title: "Nobody notices the loss", body: "The plan ages in the PMS. Two touches, then a newer patient — and no line item for what never happened." },
    ],
    stats: [
      { figure: "30–60%", label: "of diagnosed dental treatment is never scheduled", source: "Practice-management case-acceptance benchmarks" },
      { figure: "~45%", label: "average case acceptance, versus ~75% at top-performing practices", source: "Industry case-acceptance benchmarks" },
      { figure: "20–35%", label: "of calls to dental practices go unanswered", source: "Dental call-tracking industry benchmarks" },
    ],
  },
  how: {
    eyebrow: "How it works",
    heading: "From treatment plan to confirmed visit, owned.",
    body:
      "Primary Logic autonomously takes each unscheduled plan and works it — patient, financing options, scheduling, intake, reminders — until the visit is confirmed. Nothing routes back to your front desk.",
    principles: [
      { title: "Answers at the right moment", body: "The 6:40 pm payment-plan text gets a reply in minutes, from the plans on file." },
      { title: "Never drops the follow-up", body: "Text, call, and email on the patient’s schedule, for days or weeks, remembering every touch." },
      { title: "Resolves it end to end", body: "Books the visit, sends intake, and reschedules if it moves — from your approved availability." },
      { title: "Finishes in your schedule", body: "Booked and marked confirmed in your PMS. That is when it counts." },
    ],
    example: {
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
  },
  authority: {
    eyebrow: "Operating authority",
    heading: "Autonomous, within your rules.",
    body:
      "Before launch, we define the outcome, what it may say and do, the approved knowledge, the prohibited actions, and the system of record. It answers only from what your practice has already recorded.",
    tenets: [
      {
        title: "Bounded",
        body: "Acts only on approved knowledge and consent. Priced on your own patients — never per referred patient.",
        tags: [
          { label: "HIPAA", detail: "Signed BAA, minimum-necessary PHI access" },
          { label: "TCPA & consent", detail: "Consent on file; quiet hours, opt-outs enforced" },
          { label: "Licensed-activity rules", detail: "No clinical advice; no treatment-plan changes" },
        ],
      },
      {
        title: "Auditable",
        body: "Every message, action, and PMS write sits on one patient record, readable any time.",
        tags: [
          { label: "Full audit trail", detail: "Calls, texts, emails, and PMS writes, timestamped" },
          { label: "Access logging", detail: "Who saw which patient record, and when" },
          { label: "Compliance review", detail: "Any case, readable by your team, any time" },
        ],
      },
      {
        title: "Accountable",
        body: "Work outside its authority closes uncompleted, with its history. Only confirmed visits are billed.",
        tags: [
          { label: "System of record", detail: "Your PMS schedule decides completion" },
          { label: "Closed, not improvised", detail: "A clinical question ends the case, with a record" },
          { label: "Never billed", detail: "No confirmed visit in the PMS, no fee" },
        ],
      },
    ],
  },
  pricing: {
    eyebrow: "Outcome-based pricing",
    heading: "Only pay for confirmed visits.",
    body: "Before launch, we agree on the billable event, the system that verifies it, and the fixed fee.",
    steps: [
      { key: "Define", body: "The billable event: a treatment visit booked and marked confirmed in your PMS." },
      { key: "Verify", body: "Your practice schedule records the confirmation — Dentrix, Eaglesoft, or Open Dental." },
      { key: "Invoice", body: "Confirmed visits × fixed fee.", emphasized: true },
    ],
    trust: "Your system is the source of truth.",
    cta: { label: "Design a pilot", href: "#pilot" },
  },
  onboarding: {
    eyebrow: "Getting started",
    heading: "Live in about two weeks. Nothing to install.",
    body:
      "Your PMS already knows how to export a report. That is all we need to start. Progress and the confirmed visit are written back where your team already looks.",
    steps: [
      { title: "Send us the queue", body: "A PMS unscheduled-treatment export — treatment plan, provider, quoted fee, and contact consent.", meta: "About an hour" },
      { title: "Approve the rules", body: "What we may say and do, what we must never do, consent and quiet hours, and the billable event.", meta: "Two weeks" },
      { title: "Go live beside your team", body: "We work the unscheduled plans; your front desk keeps the patients in front of it. Compare on your own dashboard.", meta: "Day 1" },
    ],
  },
  pilot: {
    heading: "Recapture the treatment you’re losing.",
    body: "Give Primary Logic one unscheduled-treatment queue and one confirmed-visit event. It runs the work in your PMS; you pay only when the visit is confirmed.",
    form: { button: "Design a pilot", placeholder: "Work email" },
  },
},
  // ── Legal
  {
  key: "legal",
  slug: "legal",
  title: "Primary Logic for law firms | Signed retainers, paid per verified retainer",
  description:
    "Primary Logic works after-hours calls, unsigned retainers, and aged leads within your intake rules until a signed retainer is recorded in your case system.",
  hero: {
    eyebrow: "For personal-injury and mass-tort firms",
    heading: "Turn unsigned intake into signed retainers.",
    body:
      "Primary Logic autonomously works the claimants your team can’t keep chasing — phone, text, and email, within your rules — until the signed retainer is recorded in your case system.",
    form: { button: "Design a pilot", placeholder: "Work email" },
    brief: {
      title: "The pilot, in one card",
      rows: [
        { label: "We take", value: "After-hours calls, unsigned retainers, aged qualified leads" },
        { label: "You send", value: "A copy of the queue from Filevine, Lead Docket, or Litify" },
        { label: "Verified in", value: "Your case management system — signed retainer on the matter" },
        { label: "You pay", value: "A flat fee per signed retainer, never a share of fees" },
      ],
    },
  },
  problem: {
    eyebrow: "Stop losing revenue",
    heading: "The claimant qualified. Nobody finished the signing.",
    body:
      "Injured people call after hours and dial the next firm when nobody answers. The ones who get through often go quiet before signature — not because they changed their mind, but because nobody’s job is to finish it.",
    moments: [
      { title: "The call comes after hours", body: "The 9 pm call from the ER waiting room rings out. By morning they’ve signed with the firm that answered." },
      { title: "Retainer opened, never signed", body: "The agreement went out, got opened, and stalled on one fee question. Two reminders, then a newer lead." },
      { title: "Aged leads go untouched", body: "Qualified claimants from last quarter sit in Lead Docket with no next step and no owner." },
    ],
    stats: [
      { figure: "40%", label: "of law firms answered a prospective client’s call", source: "Clio Legal Trends Report, 2024 secret-shopper study" },
      { figure: "20%", label: "of missed calls got a return call", source: "Clio Legal Trends Report, 2024 secret-shopper study" },
      { figure: "~48%", label: "of firms were unreachable by phone", source: "Clio Legal Trends Report, 2024 secret-shopper study" },
    ],
  },
  how: {
    eyebrow: "How it works",
    heading: "Intake follow-through, owned until it’s signed.",
    body:
      "Primary Logic autonomously picks up the claimant your team can’t get to and works the signature through — in your firm’s name, within your intake rules — with nothing routed back to your intake desk.",
    principles: [
      { title: "Answers the after-hours call", body: "Picks up at 9 pm from the ER waiting room, gathers the intake facts, checks conflicts and consent." },
      { title: "Never drops the signature chase", body: "Retainer sent, reminder text, “saw you opened it” call — on the claimant’s schedule, for weeks." },
      { title: "Explains the fee, never advises", body: "Relays your approved fee summary, word for word. A merits question closes the job uncompleted." },
      { title: "Signed in your case system", body: "Signature verified with e-sign, filed to the matter in Filevine or Litify — that’s when it counts." },
    ],
    example: {
      title: "One job, across channels",
      person: "Cameron · injury-case retainer",
      memory: ["Prefers SMS", "Evenings", "Fee summary sent"],
      nodes: [
        { channel: "Phone", label: "Fee question answered", when: "Day 1 · 10:05 am" },
        { channel: "Email", label: "Fee summary + sign link", when: "12:30 pm" },
        { channel: "SMS", label: "Evening reminder", when: "Day 2 · 7:15 pm" },
        { channel: "System", label: "Signature verified", when: "7:32 pm" },
        { channel: "Outcome", label: "Signed retainer recorded", when: "7:34 pm" },
      ],
    },
  },
  authority: {
    eyebrow: "Operating authority",
    heading: "Autonomous, within your firm’s rules.",
    body:
      "Before launch, the firm and its counsel define the outcome, the operating authority, the approved fee and process language, the prohibited actions, and the system of record.",
    tenets: [
      {
        title: "Bounded",
        body: "Acts only on the firm’s approved intake, fee, and process language, permissions, and consent. Nothing is improvised.",
        tags: [
          { label: "No legal advice (UPL)", detail: "No merits, strategy, or value opinions — by rule" },
          { label: "No fee sharing", detail: "Flat fee per retainer, never a % of contingency" },
          { label: "TCPA & consent", detail: "Consent on file; quiet hours, opt-outs enforced" },
        ],
      },
      {
        title: "Auditable",
        body: "Every call, text, email, and case-system write sits on one matter record, readable by the firm any time.",
        tags: [
          { label: "Full audit trail", detail: "Calls, texts, emails, and writes, timestamped" },
          { label: "Access logging", detail: "Who saw which matter, and when" },
          { label: "Compliance review", detail: "Any matter, readable by counsel, any time" },
        ],
      },
      {
        title: "Accountable",
        body: "Work outside its authority closes uncompleted, with its history. Only signed retainers are billed.",
        tags: [
          { label: "System of record", detail: "Your case management system decides completion" },
          { label: "Closed, not improvised", detail: "A merits question ends the job with a record" },
          { label: "Never billed", detail: "No signed retainer on file, no fee" },
        ],
      },
    ],
  },
  pricing: {
    eyebrow: "Outcome-based pricing",
    heading: "Only pay for signed retainers.",
    body: "Before launch, the firm and its counsel agree the billable event, the case system that verifies it, and the flat fee.",
    steps: [
      { key: "Define", body: "The billable event: a signed retainer from your own queue, recorded in your case system." },
      { key: "Verify", body: "Filevine, Lead Docket, Litify, or CASEpeer records the signed retainer on the matter." },
      { key: "Invoice", body: "Signed retainers × flat fee.", emphasized: true },
    ],
    trust: "Your system is the source of truth.",
    cta: { label: "Design a pilot", href: "#pilot" },
  },
  onboarding: {
    eyebrow: "Getting started",
    heading: "Live in about two weeks. Nothing to install.",
    body:
      "Your case system already knows how to send leads to a vendor. Progress and the signed retainer are written back where your intake team already looks.",
    steps: [
      { title: "Send us a copy of the queue", body: "Route after-hours or overflow to us, or export the unsigned-retainer and aged-lead lists from your case system.", meta: "About an hour" },
      { title: "Approve the rules", body: "The intake script, the approved fee summary, conflict and consent rules, what we must never say, and the billable event.", meta: "Two weeks" },
      { title: "Go live beside your team", body: "We work the after-hours, overflow, and aged slice; your intake team keeps the rest. Compare on your own dashboard.", meta: "Day 1" },
    ],
  },
  pilot: {
    heading: "Recapture the retainers you’re losing.",
    body:
      "Give Primary Logic one overlooked queue — after-hours, overflow, or aged leads — one operating policy, and one case-system event. You pay only when the signed retainer is recorded.",
    form: { button: "Design a pilot", placeholder: "Work email" },
  },
},
  // ── Lending
  {
  key: "lending",
  slug: "lending",
  title: "Primary Logic for lenders | Funded loans, verified in your LOS",
  description:
    "Primary Logic autonomously works stalled applications, promised callbacks, and aged leads — within your rules — until a funded loan is recorded in your LOS.",
  hero: {
    eyebrow: "For credit unions, fintech lenders, and home-improvement finance",
    heading: "Turn stalled applications into funded loans.",
    body:
      "Primary Logic autonomously works the applications your loan officers can’t keep chasing — inside your LOS and CRM, within your rules — until the funded loan is recorded.",
    form: { button: "Design a pilot", placeholder: "Work email" },
    brief: {
      title: "The pilot, in one card",
      rows: [
        { label: "We take", value: "Stalled applications, promised callbacks, aged leads" },
        { label: "You send", value: "A scheduled export from your LOS or CRM" },
        { label: "Verified in", value: "The funding record in your LOS" },
        { label: "You pay", value: "A fixed fee per funded loan. Nothing otherwise." },
      ],
    },
  },
  problem: {
    eyebrow: "Stop losing revenue",
    heading: "The application came in. The file went quiet.",
    body:
      "Borrowers apply for HELOCs, home-improvement, personal, and auto-refi loans — then stall on a document, a callback, or a portal step. Your loan officers work the files in front of them; the rest age.",
    moments: [
      { title: "The documents never arrive", body: "Two pay stubs on a work computer. A 10 am reminder to someone who’s free after 6. The file ages." },
      { title: "The callback never happens", body: "“Call me after 6.” The note goes in the CRM. The evening comes and goes, and so does the borrower." },
      { title: "The web lead waits overnight", body: "A 9 pm application gets a next-morning callback. By then the borrower has heard from someone else." },
    ],
    stats: [
      { figure: "10×", label: "more likely to reach a lead within 5 minutes than after 30", source: "Lead Response Management study, MIT / InsideSales" },
      { figure: "45 days", label: "a typical origination, with dozens of points where a file can stall", source: "Industry origination timelines; illustrative" },
    ],
  },
  how: {
    eyebrow: "How it works",
    heading: "Every stalled file, worked until it funds.",
    body:
      "Primary Logic picks up the file your team can’t get to and completes it autonomously — in your name, in your LOS, within the rules you set. Nothing is routed back to your loan officers.",
    principles: [
      { title: "Answers when the borrower can", body: "Two minutes after the 9 pm application; the 6:05 pm call because that’s when they said." },
      { title: "Never drops the follow-up", body: "Missing items chased by phone, text, and email, on their schedule, for the life of the file." },
      { title: "Reads the file, end to end", body: "Answers only from what’s recorded — approved rate, disclosure, next step. Nothing routed back." },
      { title: "Finishes in your LOS", body: "Documents marked received, closing set, funding recorded — that’s when it counts." },
    ],
    example: {
      title: "One file, across channels",
      person: "Dana · stalled home-equity loan",
      memory: ["After 6 pm", "Prefers phone", "Closing Thursday"],
      nodes: [
        { channel: "Email", label: "Secure upload link sent", when: "Day 1 · 9:15 am" },
        { channel: "Phone", label: "Stays on for the upload", when: "6:05 pm" },
        { channel: "Email", label: "Rate + disclosure sent", when: "6:14 pm" },
        { channel: "Phone", label: "Clear to close, time set", when: "Day 8 · 11:20 am" },
        { channel: "Outcome", label: "Loan funded", when: "Day 10 · 5:45 pm" },
      ],
    },
  },
  authority: {
    eyebrow: "Operating authority",
    heading: "Autonomous, within your rules.",
    body:
      "Before launch we define what it may do, what it may read to a borrower, and what it must never say. Anything outside that authority closes uncompleted, with its history — never improvised, never billed.",
    tenets: [
      {
        title: "Bounded",
        body: "Reads only what is already recorded on the borrower’s file. It never quotes, negotiates, or advises.",
        tags: [
          { label: "SAFE Act boundary", detail: "Reads the approved rate on file; never quotes" },
          { label: "TCPA & consent", detail: "Consent on file; quiet hours, stops enforced" },
          { label: "Programs outside RESPA", detail: "HELOC, home-improvement, personal, auto-refi" },
        ],
      },
      {
        title: "Auditable",
        body: "Every call, text, email, and LOS write sits on one file record, readable any time.",
        tags: [
          { label: "Full audit trail", detail: "Calls, texts, emails, and LOS writes, timestamped" },
          { label: "Source and timestamp", detail: "Every rate read carries where it came from" },
          { label: "Compliance review", detail: "Any file, readable by your team, any time" },
        ],
      },
      {
        title: "Accountable",
        body: "Suitability and credit decisions are outside its authority. Those files close with a record; only funded loans are billed.",
        tags: [
          { label: "System of record", detail: "Your LOS decides when a loan is funded" },
          { label: "Closed, not improvised", detail: "Advice or credit questions end with a record" },
          { label: "Never billed", detail: "No funded loan, no fee" },
        ],
      },
    ],
  },
  pricing: {
    eyebrow: "Outcome-based pricing",
    heading: "Only pay for funded loans.",
    body: "Before launch, we agree on the billable event — a funded loan — the LOS report that verifies it, and the fixed fee.",
    steps: [
      { key: "Define", body: "The billable event is a funded loan — an eligible file from the agreed queue." },
      { key: "Verify", body: "Your LOS records the funding. Its report — not our call log — is the source." },
      { key: "Invoice", body: "Funded loans × fixed fee.", emphasized: true },
    ],
    trust: "Your system is the source of truth.",
    cta: { label: "Design a pilot", href: "#pilot" },
  },
  onboarding: {
    eyebrow: "Getting started",
    heading: "Live in about two weeks. Nothing to install.",
    body:
      "Your LOS or CRM already knows how to send files to a vendor. That’s all we need; progress and the funding are written back where your team already looks.",
    steps: [
      { title: "Send us the queue", body: "A scheduled LOS or CRM export: files open 14+ days with missing items, or an approved recapture list.", meta: "About an hour" },
      { title: "Approve the rules", body: "What it may read from the file, what it must never say, consent and quiet hours, and the funding event that bills.", meta: "Two weeks" },
      { title: "Go live beside your team", body: "It works its slice of the queue; your loan officers keep theirs. Compare on your own dashboard.", meta: "Day 1" },
    ],
  },
  pilot: {
    heading: "Fund the loans you’re losing.",
    body: "Give Primary Logic one stalled queue, one set of rules, and one funding report. It works the files inside your LOS; you pay only when a loan funds.",
    form: { button: "Design a pilot", placeholder: "Work email" },
  },
},
];

export function getLane(slug: LaneSlug): LaneContent {
  return lanes.find((l) => l.slug === slug)!;
}
