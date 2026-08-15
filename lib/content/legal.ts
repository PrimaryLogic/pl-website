import type { NavContent } from "./shared";

export const legalNav: NavContent = {
  wordmark: "Primary Logic",
  links: [
    { label: "How it works", href: "/#how" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Dental", href: "/healthcare" },
    { label: "Lending", href: "/lending" },
  ],
  cta: { label: "Start a pilot", href: "#pilot" },
};

export const legalLane = {
  eyebrow: "For personal-injury and mass-tort firms",
  heading: { lead: "Injured people call.", accent: "Half of them never reach a lawyer." },
  body:
    "Primary Logic answers the after-hours and overflow calls, gathers the facts your intake team would, and stays on every qualified claimant — by phone, text, and email — until the retainer is signed in your case system. Legal judgment stays with your attorneys.",
  proof: ["Flat fee per signed retainer", "Never a share of fees", "$0 if it doesn’t sign"],
  leak: {
    eyebrow: "The problem",
    heading: "A missed call isn’t a lead problem. It’s an unfinished case.",
    body:
      "Accidents happen at night. Retainers get opened and forgotten. A claimant says “send it again” and the queue records a note instead of a next move. You paid for the demand; the work still needs an owner.",
    stat: { figure: "40%", label: "of law firms answered a prospective client’s call", source: "Clio Legal Trends Report, 2024 secret-shopper study" },
    cards: [
      { title: "The after-hours call", body: "We answer, capture the approved facts, run the conflict check you define, and route anything that needs a lawyer." },
      { title: "The retainer in limbo", body: "We watch the signature, send the agreed reminder at the agreed time, and pick the case back up when the claimant replies days later." },
      { title: "The aged lead", body: "We re-enter last quarter’s unsigned claimants with your script and a clean attribution window." },
    ],
  },
  guardrails: {
    eyebrow: "The line we don’t cross",
    heading: "Persistent on logistics. Strict about judgment.",
    items: [
      { title: "No legal advice", body: "We gather facts and handle logistics. Case merits, representation decisions, and any legal question go to your attorney — by rule, before launch." },
      { title: "No fee sharing", body: "A fixed service fee per qualified, signed retainer. Never a percentage of a contingency fee." },
      { title: "Your record is the record", body: "The signed retainer in your case system is the finish line. We never bill from our own call log." },
      { title: "Your name on the call", body: "We reach out as your firm’s service provider, under the consent your claimants gave you." },
    ],
    note: "Pricing and intake boundaries are reviewed with your firm’s counsel before any live program.",
  },
  pilot: {
    eyebrow: "The pilot",
    heading: "Start with the calls your team can’t cover.",
    body: "After-hours, overflow, or last quarter’s unsigned claimants. Your daytime team and current systems stay exactly as they are.",
    steps: [
      { title: "Define the intake frame", body: "The facts we gather, the conflict check, when we escalate, and the signature event that counts." },
      { title: "Give us the overflow", body: "After-hours calls, aged leads, or unopened retainers — a copy of the queue, not a migration." },
      { title: "Reconcile signed cases", body: "Your signed-case log against our case history, inside the agreed attribution window. Only matches are billed." },
    ],
  },
};
