/**
 * Copy shared across every page: identity, navigation defaults, and footer.
 *
 * CLAIM RULE: no lane, customer, metric, or competitor claim ships without
 * evidence; competitors are never named. Product traces and pricing figures
 * are explicitly illustrative.
 */

export const CONTACT_EMAIL = "hello@primarylogic.com";

export const WORDMARK = "Primary Logic";

export type NavLink = { label: string; href: string };
export type NavContent = {
  wordmark: string;
  links: NavLink[];
  cta: { label: string; href: string };
};

export const homeNav: NavContent = {
  wordmark: WORDMARK,
  links: [],
  cta: { label: "Start a pilot", href: "/#pilot" },
};

export const healthcareNav: NavContent = {
  wordmark: WORDMARK,
  links: [
    { label: "All lanes", href: "/" },
    { label: "Treatment tail", href: "#challenge" },
    { label: "Pilot", href: "#pilot" },
    { label: "Boundary & billing", href: "#economics" },
  ],
  cta: { label: "Discuss a pilot", href: "#contact" },
};

export const footer = {
  entity: WORDMARK,
  links: [
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-of-service" },
    { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
  ],
};
