/**
 * Barrel for the healthcare-lane components, which predate the content split.
 * Shared identity/footer copy lives in lib/content/shared.ts; homepage copy in
 * lib/content/home.ts; healthcare copy in lib/content/healthcare.ts.
 */

export { CONTACT_EMAIL, footer, healthcareNav, homeNav } from "./content/shared";
export type { NavContent, NavLink } from "./content/shared";
export {
  answers,
  challenge,
  economics,
  finalCta,
  hero,
  journey,
  solution,
} from "./content/healthcare";
export type { ChallengeRow, JourneyStep } from "./content/healthcare";
