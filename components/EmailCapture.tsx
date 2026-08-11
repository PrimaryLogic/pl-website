"use client";

import { useState } from "react";

/**
 * Inline email capture. There is no backend yet — submitting opens the
 * visitor's mail client. Swap the handler for a real endpoint when one exists.
 */
export default function EmailCapture({
  placeholder = "you@practice.com",
  label = "Book a demo",
  id,
}: {
  placeholder?: string;
  label?: string;
  /** Set on one instance only — the nav CTA anchors to it. */
  id?: string;
}) {
  const [email, setEmail] = useState("");
  const inputId = id ? `${id}-email` : "email";

  return (
    <form
      id={id}
      className="flex w-full max-w-md items-center gap-1 rounded-full bg-bg p-1.5 pl-2"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `mailto:hello@primarylogic.com?subject=${encodeURIComponent(
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
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[15px] text-ink outline-none placeholder:text-faint"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        {label}
      </button>
    </form>
  );
}
