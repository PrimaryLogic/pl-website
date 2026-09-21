import { PILOT_EMAIL } from "./shared";

export const outcomePositioning = {
  heading: "AGI at work in every business.",
  description: "Primary Logic is building for the future where AGI does the work of running a business, so the focus is on your customers.",
  email: PILOT_EMAIL,
  contactHref: `mailto:${PILOT_EMAIL}?subject=${encodeURIComponent("Building with Primary Logic")}&body=${encodeURIComponent("Hi Primary Logic,\n\nHere’s what we’re building:\n\nHere’s where we’d like agents to take on the work:\n\nLet’s talk.")}`,
};
