"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/content";

/**
 * Inline email capture. There is no backend yet — submitting opens the
 * visitor's mail client addressed to CONTACT_EMAIL, which is still unverified.
 * Swap this handler for a real endpoint when one exists.
 */
export default function EmailCapture({
  label = "Book a demo",
  id,
}: {
  label?: string;
  /** Set on one instance only — the nav CTA anchors to it. */
  id?: string;
}) {
  const [email, setEmail] = useState("");
  const inputId = id ? `${id}-email` : "email";

  return (
    <form
      id={id}
      className="flex w-full max-w-lg flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          "Demo request",
        )}&body=${encodeURIComponent(`From: ${email}`)}`;
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        Work email
      </label>
      <input
        id={inputId}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@practice.com"
        className="min-w-0 flex-1 rounded-sm border border-rule-mid bg-card px-3.5 py-2.5 text-[15px] text-ink outline-none placeholder:text-mute focus:border-accent"
      />
      <button
        type="submit"
        className="shrink-0 rounded-sm bg-accent px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-accent-deep"
      >
        {label}
      </button>
    </form>
  );
}
