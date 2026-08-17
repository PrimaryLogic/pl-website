/**
 * Copy for the three lane pages (/healthcare, /legal, /lending).
 *
 * The homepage tells the general story (missed demand → completed outcome,
 * how it works, pricing model). A lane page is for a buyer who already knows
 * that and wants specifics: which queues we take, what we do at each moment,
 * where the licensed line sits, how a case can end, what exactly is billed,
 * and what a pilot looks like for them. Nothing here repeats the homepage's
 * generic "how it works" block.
 *
 * Vocabulary: demand → job → outcome. Plain buyer language, no internal terms.
 *
 * CLAIM RULE: no metrics about our own results; competitors are never named;
 * industry stats carry a source; illustrative figures say so.
 */

import type { NavContent } from "./shared";
import { WORDMARK } from "./shared";

export type LaneKey = "dental" | "legal" | "lending";

export type LaneContent = {
  key: LaneKey;
  slug: "healthcare" | "legal" | "lending";
  title: string;
  description: string;
  nav: NavContent;
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    form: { button: string; placeholder: string };
    /** The "brief" card beside the hero copy. */
    brief: {
      title: string;
      rows: Array<{ label: string; value: string }>;
      note?: string;
    };
  };
  queues: {
    eyebrow: string;
    heading: string;
    body: string;
    items: Array<{ title: string; body: string }>;
  };
  leak: {
    eyebrow: string;
    heading: string;
    body: string;
    /** Each moment: where it breaks and what we do about it. */
    moments: Array<{ title: string; breaks: string; weDo: string }>;
    stats: Array<{ figure: string; label: string; source: string }>;
  };
  split: {
    eyebrow: string;
    heading: string;
    body: string;
    ours: { title: string; tag: string; items: string[] };
    yours: { title: string; tag: string; items: string[] };
    note?: string;
  };
  endings: {
    eyebrow: string;
    heading: string;
    body: string;
    items: Array<{ label: string; body: string; billable?: boolean }>;
    note: string;
  };
  pricing: {
    eyebrow: string;
    heading: string;
    body: string;
    billable: { title: string; body: string };
    free: { title: string; items: string[] };
    note: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: Array<{ q: string; a: string }>;
  };
  pilot: {
    eyebrow: string;
    heading: string;
    body: string;
    steps: Array<{ title: string; body: string }>;
    close: string;
    form: { button: string; placeholder: string };
  };
};

const laneNav: NavContent = {
  wordmark: WORDMARK,
  links: [],
  cta: { label: "Start a pilot", href: "#pilot" },
};

export const lanes: LaneContent[] = [
  // ───────────────────────────────────────────────────────────── Healthcare
  {
    key: "dental",
    slug: "healthcare",
    title: "Primary Logic for healthcare providers | Kept treatment visits, paid per visit",
    description:
      "Primary Logic works diagnosed-but-unscheduled treatment by phone, text, email, and web chat until the visit is booked, confirmed, and kept in your practice schedule. Priced per kept visit.",
    nav: laneNav,
    hero: {
      eyebrow: "For dental groups, DSOs, and elective healthcare",
      heading: "Turn unscheduled treatment into kept visits.",
      body:
        "Primary Logic works the patients who were diagnosed and never booked — the ones your front desk can’t get back to — by phone, text, email, and web chat, until the visit is on your schedule and kept. Clinical judgment stays with your team.",
      form: { button: "Start a pilot", placeholder: "Work email" },
      brief: {
        title: "The pilot, in one card",
        rows: [
          { label: "Best fit", value: "Dental, DSO, fertility, LASIK, and medspa groups" },
          { label: "We take", value: "Diagnosed treatment and consults that never reached the calendar" },
          { label: "You send", value: "Your unscheduled-treatment report — export, scheduled report, or inbox feed" },
          { label: "Verified in", value: "Your practice schedule or production report" },
          { label: "You pay", value: "A fixed fee per kept treatment visit. $0 otherwise." },
        ],
        note: "Data handling, consent, and pricing are reviewed with your compliance lead and counsel before any live program.",
      },
    },
    queues: {
      eyebrow: "What we take",
      heading: "The work your front desk can’t get back to.",
      body: "You keep the team and software that make the first attempt. We take what’s left after it — the queue nobody is paid to finish.",
      items: [
        { title: "Diagnosed, unscheduled treatment", body: "Implants, full-arch, aligners, crowns — presented in the chair, never booked. Often 30–60% of everything you diagnose." },
        { title: "Consults that went quiet", body: "The patient wanted to think about it, check financing, or call back after work. Then nobody called." },
        { title: "Financing left open", body: "The payment-plan link was opened and never finished. The plan sits in the chart." },
        { title: "Intake never completed", body: "Forms sent, half filled, appointment at risk. We finish the paperwork before the visit." },
        { title: "Missed and after-hours calls", body: "The 6:40 pm voicemail from a patient ready to book. We call back that evening, in your name." },
        { title: "Reschedules and no-shows", body: "A cancelled visit becomes a new job, not a lost one — we get it back on the schedule." },
      ],
    },
    leak: {
      eyebrow: "Where it breaks",
      heading: "Treatment gets diagnosed. Then it waits.",
      body: "Your team books what it can while the phones ring. The patient who wanted to think about it slips into a queue nobody owns.",
      moments: [
        {
          title: "The consult ends without a booking",
          breaks: "The patient says yes in the chair and leaves without a date. The plan sits in the practice-management system.",
          weDo: "We pick it up from your report the same day, check consent, and offer two open times on the channel the patient answers.",
        },
        {
          title: "The follow-up stops",
          breaks: "Two calls, one voicemail, a note in the chart. Then the next patient walks in.",
          weDo: "We keep going on the patient’s schedule — evenings, weekends, days later — and hand financing or clinical questions to the right person on your team.",
        },
        {
          title: "The visit never happens",
          breaks: "Booked but not confirmed. Intake never finished. No one is paid to notice the empty chair.",
          weDo: "We confirm, send intake and directions, remind the day before, and reschedule the moment a visit falls through.",
        },
      ],
      stats: [
        { figure: "30–60%", label: "of diagnosed dental treatment is never scheduled", source: "Practice-management case-acceptance benchmarks" },
        { figure: "~45% vs ~75%", label: "case acceptance at a typical practice vs. top performers", source: "Dental industry case-acceptance benchmarks" },
        { figure: "10×", label: "more likely to reach someone within 5 minutes than after 30", source: "Lead Response Management study, MIT / InsideSales" },
      ],
    },
    split: {
      eyebrow: "The line we don’t cross",
      heading: "Persistent on logistics. Strict about clinical judgment.",
      body: "We pursue an administrative outcome — a kept visit. We do not practice medicine, change a treatment plan, or invent a fact that isn’t in the record.",
      ours: {
        title: "We handle",
        tag: "In your name",
        items: [
          "Calls, texts, emails, and web chat with the patient, in your practice’s name and scripts",
          "Offering open times, holding slots, and booking into your practice-management system",
          "Confirmations, intake forms, directions, day-before reminders, and rescheduling",
          "Routing financing questions to your coordinator with the patient’s context attached",
          "A full record of every touch, written back where your team already looks",
        ],
      },
      yours: {
        title: "Your team keeps",
        tag: "Always",
        items: [
          "Anything about the treatment itself — symptoms, alternatives, changes to the plan",
          "Financing approvals and pricing decisions",
          "A patient in distress, or one whose identity we can’t confirm",
          "Policy exceptions and anything outside the rules you approved before launch",
        ],
      },
      note: "BAA before PHI: security review, a signed BAA, minimum-necessary data, and access logging come before the first patient record.",
    },
    endings: {
      eyebrow: "How a case ends",
      heading: "Every patient we take ends in a known state.",
      body: "Nothing is left in a queue. Each job closes one of these ways, with its history attached — and only one of them is billed.",
      items: [
        { label: "Kept visit", body: "Marked arrived or completed in your schedule.", billable: true },
        { label: "Booked, not kept", body: "On the calendar, then missed. We reschedule; nothing is billed until it’s kept." },
        { label: "Declined", body: "The patient said no. We record it and stop." },
        { label: "Opted out", body: "A stop on any channel ends outreach on every channel." },
        { label: "Unreachable", body: "The agreed contact sequence ran out." },
        { label: "Handed to your team", body: "A clinical, financing, or identity question your team owns." },
        { label: "Ineligible or withdrawn", body: "Outside the frame, blocked, or pulled by the practice." },
      ],
      note: "Your schedule report — not our call log — decides which ending each case reached.",
    },
    pricing: {
      eyebrow: "Pricing",
      heading: "Per kept visit. Nothing else.",
      body: "A fixed fee per kept treatment visit, plus the direct cost of calls and messages. Because we only take patients after your first attempt, every visit we bill is one you were otherwise losing.",
      billable: { title: "Kept treatment visit", body: "An eligible patient from your own queue, marked arrived, checked in, or completed in your practice schedule inside the agreed window." },
      free: {
        title: "$0",
        items: ["Consult booked but not kept", "Patient declined or opted out", "Unreachable after the agreed sequence", "Handed to your team, ineligible, or withdrawn"],
      },
      note: "The fee per visit is fixed before launch, based on what a kept visit is worth to you. Priced per visit on your own patients — never per referred patient. Healthcare pricing and contract structure are reviewed with counsel before any live program.",
    },
    faq: {
      eyebrow: "Straight answers",
      heading: "Before you share a queue.",
      items: [
        { q: "Is this a replacement for our front desk or our scheduling AI?", a: "No. Keep the people and tools that make the first attempt. We take the treatment they couldn’t get back to, and we’re paid only when a visit is kept." },
        { q: "Do we need a deep EHR or PMS integration?", a: "No. A pilot starts from a copy of the report you already run — an export, a scheduled report, or a forwarded inbox. Verification uses your own schedule report. Progress and the result are written back where your team already looks." },
        { q: "Who talks to our patients?", a: "Primary Logic does — by phone, text, email, and web chat, in your practice’s name, with your scripts, under the consent your patients already gave you. Every conversation is on the record." },
        { q: "What about patient data?", a: "Security review and a signed BAA come before any PHI. Access is limited to the approved workflow, minimum-necessary, and logged." },
        { q: "Who handles clinical questions?", a: "Your designated staff. We handle scheduling and logistics; anything clinical, a distressed patient, or an identity we can’t confirm goes to your team with full context." },
        { q: "Is paying per visit a referral fee?", a: "No. We’re paid to convert your own diagnosed patients — a service on your queue, priced per visit kept. We never pay or get paid per patient steered between providers." },
      ],
    },
    pilot: {
      eyebrow: "The pilot",
      heading: "Start with the treatment your team can’t get back to.",
      body: "Diagnosed, unscheduled treatment from the last 90 days, worked beside your current process. No migration, no exclusivity, no seat purchase.",
      steps: [
        { title: "Define the frame", body: "Which treatment types, what we may say and promise, when we hand off, and what counts as a kept visit in your report." },
        { title: "Send the report", body: "A copy of the unscheduled-treatment report — export, scheduled report, or forwarded inbox. Your systems stay in place." },
        { title: "Run beside your team", body: "We own follow-through on the pilot slice; your front desk keeps working exactly as it does today." },
        { title: "Reconcile kept visits", body: "Your schedule report against our case history, inside the agreed window. Only matches are billed." },
      ],
      close: "If the visits aren’t kept, the invoice isn’t there either.",
      form: { button: "Start a pilot", placeholder: "Work email" },
    },
  },

  // ───────────────────────────────────────────────────────────────── Legal
  {
    key: "legal",
    slug: "legal",
    title: "Primary Logic for law firms | Signed retainers, paid per case",
    description:
      "Primary Logic answers after-hours and overflow calls, gathers the facts your intake team would, and stays on every qualified claimant until the retainer is signed in your case system. Priced per signed retainer, never a share of fees.",
    nav: laneNav,
    hero: {
      eyebrow: "For personal-injury and mass-tort firms",
      heading: "Injured people call. Half never reach a lawyer.",
      body:
        "Primary Logic answers the after-hours and overflow calls, gathers the facts your intake team would, and stays on every qualified claimant — by phone, text, and email — until the retainer is signed in your case system. Legal judgment stays with your attorneys.",
      form: { button: "Start a pilot", placeholder: "Work email" },
      brief: {
        title: "The pilot, in one card",
        rows: [
          { label: "Best fit", value: "PI firms with after-hours or overflow volume; mass-tort dockets that need thousands of signatures" },
          { label: "We take", value: "Missed and after-hours calls, unsigned retainers, and last quarter’s qualified claimants" },
          { label: "You send", value: "Call overflow, a copy of the unsigned-retainer list, or your aged-lead export" },
          { label: "Verified in", value: "Your case management system — the signed retainer, timestamped" },
          { label: "You pay", value: "A flat fee per signed retainer. Never a share of fees. $0 if it doesn’t sign." },
        ],
        note: "Fee structure and intake boundaries are reviewed with your firm’s counsel before any live program.",
      },
    },
    queues: {
      eyebrow: "What we take",
      heading: "The intake your team can’t cover.",
      body: "Your intake team handles the day. We take what happens outside it, and everything that stalls between qualified and signed.",
      items: [
        { title: "After-hours and weekend calls", body: "The 11 pm call from the ER waiting room. We answer, gather the facts you specify, and run your conflict check." },
        { title: "Overflow during the day", body: "When every intake seat is busy, the next call rolls to us instead of voicemail." },
        { title: "Retainers sent, never signed", body: "Opened, not signed. A fee question nobody answered. We chase the signature on the claimant’s schedule." },
        { title: "Web forms and chat leads", body: "A form at 2 am gets a call in minutes, not a callback the next afternoon." },
        { title: "Aged, qualified leads", body: "Last quarter’s unsigned claimants, re-entered with your script and a clean window for attribution." },
        { title: "Mass-tort signing", body: "Thousands of claimants who need documents explained, questions routed, and agreements signed on a deadline." },
      ],
    },
    leak: {
      eyebrow: "Where it breaks",
      heading: "A missed call isn’t a lead problem. It’s an unfinished case.",
      body: "Accidents happen at night. Retainers get opened and forgotten. A claimant says “send it again” and the queue records a note instead of a next move.",
      moments: [
        {
          title: "The after-hours call",
          breaks: "It rings through to voicemail. By morning the claimant has called two other firms.",
          weDo: "We answer, capture the approved facts, run the conflict check you define, and route anything that needs a lawyer.",
        },
        {
          title: "The retainer in limbo",
          breaks: "Sent, opened, unsigned. A fee question nobody answered, or an evening reader with a daytime reminder.",
          weDo: "We watch the signature, send the agreed reminder at the agreed time, and pick the case back up when the claimant replies days later.",
        },
        {
          title: "The aged lead",
          breaks: "Last quarter’s qualified claimants, still unsigned, still in the CRM, still yours if someone finished the job.",
          weDo: "We re-enter them with your script, one at a time, and stop the moment they decline or opt out.",
        },
      ],
      stats: [
        { figure: "40%", label: "of law firms answered a prospective client’s call", source: "Clio Legal Trends Report, 2024 secret-shopper study" },
        { figure: "20%", label: "of missed calls got a return call", source: "Clio Legal Trends Report, 2024 secret-shopper study" },
      ],
    },
    split: {
      eyebrow: "The line we don’t cross",
      heading: "Persistent on logistics. Strict about judgment.",
      body: "We gather facts and move paperwork. Case merits, representation decisions, and any legal question go to your attorney — by rule, before launch.",
      ours: {
        title: "We handle",
        tag: "In your firm’s name",
        items: [
          "Answering after-hours and overflow calls as your firm’s service provider",
          "Gathering the intake facts you specify and running the conflict check you define",
          "Sending the retainer, watching the signature, and following up on the claimant’s schedule",
          "Relaying an attorney’s answer in the attorney’s exact words",
          "Writing every call, text, and email back to your case system",
        ],
      },
      yours: {
        title: "Your attorneys keep",
        tag: "Always",
        items: [
          "Whether to take the case, and every question about its merits",
          "Fee explanations beyond the approved script — “the attorney will discuss that”",
          "Any claimant who is distressed, confused, or asking for legal advice",
          "Anything outside the intake frame agreed before launch",
        ],
      },
    },
    endings: {
      eyebrow: "How a case ends",
      heading: "Every claimant we take ends in a known state.",
      body: "Nothing is left in a queue. Each job closes one of these ways, with its history attached — and only one of them is billed.",
      items: [
        { label: "Signed retainer", body: "The signed agreement lands in your case management system.", billable: true },
        { label: "Declined", body: "The claimant chose another firm or chose not to proceed." },
        { label: "Not qualified", body: "Failed your intake criteria or the conflict check." },
        { label: "Opted out", body: "A stop on any channel ends outreach on every channel." },
        { label: "Unreachable", body: "The agreed contact sequence ran out." },
        { label: "Handed to your attorney", body: "A merits, representation, or advice question your firm owns." },
      ],
      note: "Your case system — not our call log — decides which ending each case reached.",
    },
    pricing: {
      eyebrow: "Pricing",
      heading: "Per signed retainer. Never a share of fees.",
      body: "A flat fee per qualified, signed retainer, plus the direct cost of calls and messages. Firms already pay per signed case; this is the same shape, without paying for cases that don’t sign.",
      billable: { title: "Signed retainer", body: "A qualified claimant from your own queue whose signed agreement is recorded in your case management system inside the agreed window." },
      free: {
        title: "$0",
        items: ["Declined or chose another firm", "Not qualified or conflicted out", "Unreachable or opted out", "Handed to your attorney"],
      },
      note: "A fixed service fee per signed retainer — never a percentage of a contingency fee, in line with the rules on fee sharing. The fee is set before launch with your firm’s counsel.",
    },
    faq: {
      eyebrow: "Straight answers",
      heading: "Before you route a call.",
      items: [
        { q: "Is this fee sharing?", a: "No. A flat service fee per signed retainer, never a percentage of a contingency fee — the same way firms already pay intake and lead vendors." },
        { q: "Will it give legal advice?", a: "No. Any question about the case, its merits, or representation gets “the attorney will discuss that” and a hand-off with context. Your attorney makes the representation decision." },
        { q: "We have an answering service and an intake team. Why this?", a: "Keep them. An answering service takes a message; we take the job — from first contact through the signed retainer — and we’re paid only when it signs. Nothing cannibalizes the intake team sitting twenty feet from the partner." },
        { q: "Does it work with our case management system?", a: "Yes. Filevine, Lead Docket, Litify, CASEpeer, and similar systems already route leads to outside vendors. A pilot starts by pointing overflow or a list at us; the signed retainer in your system is what we bill against." },
        { q: "How fast can a mass-tort docket move?", a: "As fast as claimants answer. We work thousands of files in parallel on the claimant’s channel and schedule, route every legal question to your team, and report signatures against your docket daily." },
      ],
    },
    pilot: {
      eyebrow: "The pilot",
      heading: "Start with the calls your team can’t cover.",
      body: "After-hours, overflow, or last quarter’s unsigned claimants. Your daytime team and current systems stay exactly as they are — and last quarter’s missed-call log is your control group.",
      steps: [
        { title: "Define the intake frame", body: "The facts we gather, the conflict check, when we escalate, and the signature event that counts." },
        { title: "Route the overflow", body: "After-hours calls, aged leads, or unsigned retainers — a copy of the queue, not a migration." },
        { title: "Run beside your intake team", body: "We own follow-through on the pilot slice; your team keeps working exactly as it does today." },
        { title: "Reconcile signed cases", body: "Your signed-case log against our case history, inside the agreed window. Only matches are billed." },
      ],
      close: "If it doesn’t sign, there’s no invoice.",
      form: { button: "Start a pilot", placeholder: "Work email" },
    },
  },

  // ─────────────────────────────────────────────────────────────── Lending
  {
    key: "lending",
    slug: "lending",
    title: "Primary Logic for lenders | Funded loans, paid per funding",
    description:
      "Primary Logic works applications that stalled mid-file — missing documents, unreturned calls, unsigned disclosures — by phone, text, and email until the loan funds in your LOS. Priced per funded loan.",
    nav: laneNav,
    hero: {
      eyebrow: "For credit unions, fintech lenders, and home-improvement finance",
      heading: "Turn stalled applications into funded loans.",
      body:
        "Primary Logic works the applications that stalled mid-file — missing pay stubs, unreturned calls, unsigned disclosures — by phone, text, and email, on the borrower’s schedule, until the loan funds in your LOS. Rates and advice stay with your licensed team.",
      form: { button: "Start a pilot", placeholder: "Work email" },
      brief: {
        title: "The pilot, in one card",
        rows: [
          { label: "Best fit", value: "HELOC, home-improvement, personal-loan, and auto-refi programs" },
          { label: "We take", value: "Stalled applications, payoff-triggered recapture lists, and low-priority or aged leads" },
          { label: "You send", value: "A scheduled export or CSV from your LOS or CRM" },
          { label: "Verified in", value: "Your loan origination system — the funding record" },
          { label: "You pay", value: "A fixed fee per funded loan. $0 for files that don’t fund." },
        ],
        note: "Outreach rules, the licensed hand-off, and the billable event are reviewed with your compliance team before any live program.",
      },
    },
    queues: {
      eyebrow: "What we take",
      heading: "The files your loan officers can’t keep chasing.",
      body: "Your team sources the demand and closes what it can. We take the applications that stall between steps — and the leads nobody has time to work.",
      items: [
        { title: "Abandoned applications", body: "Started, then stopped at income, identity, asset, or disclosure steps. We chase the exact missing item, on the borrower’s schedule." },
        { title: "Promises without a next move", body: "“I can send both on Friday.” The CRM gets a note. We call Friday, at the time they said." },
        { title: "After-hours and web leads", body: "A 9 pm application gets a two-minute response, not a next-morning callback." },
        { title: "Payoff-triggered recapture", body: "A past customer enters your approved outreach list. We work it consistently while your team works live production." },
        { title: "Low-priority and aged leads", body: "The bottom of the queue — leads no human team can be paid to work — worked one at a time until they fund or end." },
        { title: "Third-party coordination", body: "Documents, e-notaries, and portal steps that stall a clear-to-close. We keep the file moving between calls." },
      ],
    },
    leak: {
      eyebrow: "Where it breaks",
      heading: "Applications don’t get rejected. They stall.",
      body: "The borrower started. Your team sourced the opportunity. The file didn’t die from a clean decline — it stalled between documents, callbacks, and portals nobody had time to keep owning.",
      moments: [
        {
          title: "The documents never arrive",
          breaks: "Two pay stubs on a work computer. A reminder sent at 10 am to someone who’s free after 6.",
          weDo: "We send the secure upload link, ask when they’re free, and stay on the line at 6:05 pm while the stubs go up.",
        },
        {
          title: "The callback never happens",
          breaks: "The borrower asks for an evening call. The note goes in the CRM. The evening comes and goes.",
          weDo: "We call at the promised time, every time — and route the rate question to your loan officer with the file attached.",
        },
        {
          title: "The file ages out",
          breaks: "Conditions expire, the rate lock lapses, and a funded loan becomes a withdrawn application.",
          weDo: "We confirm closing time and what to bring, chase the last condition, and watch the funding report until the loan funds.",
        },
      ],
      stats: [
        { figure: "10×", label: "more likely to reach a lead within 5 minutes than after 30", source: "Lead Response Management study, MIT / InsideSales" },
        { figure: "45 days", label: "a typical origination, with dozens of decision points where a file can stall", source: "Industry origination timelines; illustrative" },
      ],
    },
    split: {
      eyebrow: "The line we don’t cross",
      heading: "We advance the file. Your licensed team owns the advice.",
      body: "We market, gather facts, and chase documents. The moment a borrower asks about rate, terms, or suitability, a licensed human takes over — that hand-off is built into the rules before launch.",
      ours: {
        title: "We handle",
        tag: "In your name",
        items: [
          "Speed-to-lead on new applications, including nights and weekends",
          "Chasing the specific missing documents and disclosures, by phone, text, and email",
          "Calling back at the exact time the borrower asked for",
          "Coordinating portal steps and third parties so the file keeps moving between calls",
          "Writing progress and the result back into your CRM or LOS",
        ],
      },
      yours: {
        title: "Your licensed team keeps",
        tag: "Always",
        items: [
          "Every question about rate, terms, eligibility, or suitability — the quoting moment",
          "Credit decisions and conditions",
          "Any borrower who is distressed or asking for financial advice",
          "Anything outside the frame agreed before launch",
        ],
      },
      note: "Consent is a gate: every borrower carries a contact-permission basis, quiet hours and frequency limits are checked at send time, and a stop on any channel ends outreach everywhere — and survives re-import.",
    },
    endings: {
      eyebrow: "How a case ends",
      heading: "Every file we take ends in a known state.",
      body: "Nothing is left in a queue. Each job closes one of these ways, with its history attached — and only one of them is billed.",
      items: [
        { label: "Funded", body: "The funding record appears in your LOS.", billable: true },
        { label: "Complete, not funded", body: "Application finished; underwriting or the borrower ended it. Not billed unless separately agreed." },
        { label: "Withdrawn or declined", body: "The borrower stopped, or credit said no." },
        { label: "Opted out", body: "A stop on any channel ends outreach on every channel." },
        { label: "Unreachable", body: "The agreed contact sequence ran out." },
        { label: "Handed to your loan officer", body: "A rate, terms, or advice question your licensed team owns." },
      ],
      note: "Your funding report — not our call log — decides which ending each file reached.",
    },
    pricing: {
      eyebrow: "Pricing",
      heading: "Per funded loan. Nothing for stalled files.",
      body: "A fixed fee per funded loan, plus the direct cost of calls and messages. Because we take files after your team’s first attempt, every funding we bill is one that was headed for withdrawal.",
      billable: { title: "Funded loan", body: "An eligible application from your own pipeline that funds in your LOS inside the agreed attribution window." },
      free: {
        title: "$0",
        items: ["Contact attempts, replies, or appointments", "A file that stays incomplete, declines, or withdraws", "Unreachable, opted out, or handed to your loan officer", "A completed application — unless separately agreed as an intermediate outcome"],
      },
      note: "The fee per funded loan is fixed before launch. Per-funding pricing is used for HELOC, home-improvement, personal, and auto-refi programs; anywhere a product touches a residential mortgage, the licensed-MLO hand-off and fee structure are reviewed with counsel first.",
    },
    faq: {
      eyebrow: "Straight answers",
      heading: "Before you send a file.",
      items: [
        { q: "Can it quote rates?", a: "No. Rates, terms, and suitability go to your licensed loan officer with the file attached. Where a program is mortgage-adjacent, that warm hand-off is written into the rules from day one." },
        { q: "Is paying per funded loan allowed?", a: "For HELOC, home-improvement, personal, and auto-refi programs, per-funding service fees are the norm. Anywhere a product touches a residential mortgage, we structure fees with your counsel before launch." },
        { q: "Do we need an LOS integration?", a: "No. A pilot starts from the scheduled export or CSV you already run. We reconcile against your funding report; nothing has to be written into the LOS for the pilot to work." },
        { q: "How do we know it’s working?", a: "The way you already test: a split on your own funnel, read on your own dashboard. Contact rate and application-started rate show up in days; funded loans follow." },
        { q: "What about consent and opt-outs?", a: "Every borrower carries a contact-permission basis or we don’t reach out. Quiet hours and frequency limits are enforced at send time. A stop on any channel ends outreach on every channel and survives re-import." },
      ],
    },
    pilot: {
      eyebrow: "The pilot",
      heading: "Give us a slice of the queue. Keep your process running.",
      body: "Applications open more than 14 days with missing items or no borrower response, or an approved recapture list. No replacement project, no exclusivity, no software rollout.",
      steps: [
        { title: "Define the finish line", body: "Eligible files, contact basis, the funding event that counts, the attribution window, and the fee." },
        { title: "Send a copy", body: "A scheduled export or CSV from your LOS or CRM. Your source systems stay in place." },
        { title: "Run beside your team", body: "We own follow-through on the pilot slice; your loan officers keep working exactly as they do today." },
        { title: "Reconcile in the LOS", body: "Your funding report against our case history. Only matched funded loans are billed." },
      ],
      close: "If the funded loans aren’t there, the invoice isn’t there either.",
      form: { button: "Start a pilot", placeholder: "Work email" },
    },
  },
];

export function getLane(slug: LaneContent["slug"]): LaneContent {
  return lanes.find((l) => l.slug === slug)!;
}
