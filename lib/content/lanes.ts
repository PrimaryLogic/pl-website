/**
 * Copy for the three lane pages (/healthcare, /legal, /lending).
 *
 * Each lane page mirrors the homepage's sections and voice for a single buyer:
 * hero + pilot brief, then a case-study arc: the problem in their queue, the
 * solution (with a compact one-job example), the economics, and a closing CTA.
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
  economics: {
    eyebrow: string;
    heading: string;
    body: string;
    /** One row per way to work the queue; each explains how it charges. The last row is ours. */
    rows: Array<{ label: string; detail: string; ours?: boolean }>;
  };
  pricing: {
    eyebrow: string;
    heading: string;
    body: string;
    steps: Array<{ key: string; body: string; emphasized?: boolean }>;
    trust: string;
    cta: { label: string; href: string };
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
    eyebrow: "The solution",
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
  economics: {
    eyebrow: "The economics",
    heading: "The revenue is already quoted. You pay only when it’s confirmed.",
    body: "Every unscheduled plan in your PMS already has a provider, a fee, and a yes. Recapturing it costs a fixed fee per confirmed visit — nothing else.",
    rows: [
      { label: "New-patient advertising", detail: "Per click or lead. Cost rises with scale, and none of them have sat in your chair." },
      { label: "More front-desk staff", detail: "Salary and training, whether or not a single plan gets scheduled." },
      { label: "Outsourced call center", detail: "Per hour or seat, working a script instead of your PMS." },
      { label: "Primary Logic", detail: "A fixed fee per visit confirmed in your schedule. Nothing otherwise.", ours: true },
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
    eyebrow: "The solution",
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
  economics: {
    eyebrow: "The economics",
    heading: "The claimant already called. You pay only when they sign.",
    body: "Every unsigned retainer in your case system is a qualified claimant you already paid to reach. Finishing it costs a flat fee per signed retainer — never a share of the fee.",
    rows: [
      { label: "Purchased leads", detail: "Per lead, signed or not — and the price per lead keeps rising." },
      { label: "After-hours answering service", detail: "Per call or minute. It takes the message; the signature is still your team’s job." },
      { label: "More intake staff", detail: "Salary and training, whether or not a single retainer gets signed." },
      { label: "Primary Logic", detail: "A flat fee per retainer signed in your case system. Never a percentage.", ours: true },
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
    eyebrow: "The solution",
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
  economics: {
    eyebrow: "The economics",
    heading: "The file is already in your LOS. You pay only when it funds.",
    body: "Every stalled application is a borrower you already paid to acquire. Getting it funded costs a fixed fee per funded loan — nothing else.",
    rows: [
      { label: "Purchased leads", detail: "Per lead, funded or not — a new stranger for every file that stalls." },
      { label: "More processing staff", detail: "Salary and training, whether or not the files fund." },
      { label: "Outsourced call center", detail: "Per hour or seat, working a script instead of your LOS." },
      { label: "Primary Logic", detail: "A fixed fee per loan funded in your LOS. Nothing otherwise.", ours: true },
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
