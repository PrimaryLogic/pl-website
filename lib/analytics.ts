export type AnalyticsEvent =
  | "cta_click"
  | "detail_toggle"
  | "hero_vertical_selected"
  | "calculator_changed"
  | "demo_form_started"
  | "demo_mailto_opened"
  | "demo_form_submitted"
  | "demo_form_succeeded"
  | "demo_form_failed";

type Properties = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Vendor-neutral event bridge. A production analytics tool can consume either
 * the dataLayer entry or the `primarylogic:analytics` CustomEvent without
 * changing component code.
 */
export function track(event: AnalyticsEvent, properties: Properties = {}) {
  if (typeof window === "undefined") return;

  const payload = { event, ...properties };
  window.dataLayer?.push(payload);
  window.dispatchEvent(
    new CustomEvent("primarylogic:analytics", { detail: payload }),
  );
}
