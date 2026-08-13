"use client";

import { useRef, useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/content";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export default function EmailCapture({
  id,
  variant = "full",
  buttonLabel = "Start a pilot",
  emailPlaceholder = "name@company.com",
  orgLabel = "Organization",
  orgPlaceholder = "Your organization",
  lane,
}: {
  id?: string;
  variant?: "compact" | "full";
  buttonLabel?: string;
  emailPlaceholder?: string;
  orgLabel?: string;
  orgPlaceholder?: string;
  lane?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const started = useRef(false);
  const emailId = `${id ?? "demo"}-email`;
  const orgId = `${id ?? "demo"}-organization`;
  const compact = variant === "compact";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");
    setMessage("Sending your request…");
    track("demo_form_submitted", { placement: id ?? "demo", lane });

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          organization: formData.get("organization"),
          website: formData.get("website"),
          source: id ?? "homepage",
          lane,
        }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Request could not be delivered.");

      form.reset();
      setStatus("success");
      setMessage("Request received. We’ll be in touch within one business day.");
      track("demo_form_succeeded", { placement: id ?? "demo", lane });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Request could not be delivered.");
      track("demo_form_failed", { placement: id ?? "demo", lane });
    }
  }

  return (
    <form
      id={id}
      className={compact ? "max-w-[460px]" : "w-full"}
      onSubmit={submit}
      onFocus={() => {
        if (started.current) return;
        started.current = true;
        track("demo_form_started", { placement: id ?? "demo", lane });
      }}
    >
      <div className={compact ? "contact-join" : "grid gap-4 sm:grid-cols-2"}>
        <div className={compact ? "min-w-0 flex-1" : ""}>
          <label htmlFor={emailId} className={compact ? "sr-only" : "mb-1 block text-[11px] font-medium text-ink"}>Work email</label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={emailPlaceholder}
            className={compact
              ? "min-h-[56px] w-full border-0 bg-white px-5 text-[15px] text-ink outline-none placeholder:text-mute"
              : "min-h-10 w-full rounded-[5px] border border-rule bg-white px-3.5 py-2 text-[13px] text-ink outline-none placeholder:text-mute focus:border-accent"}
          />
        </div>
        {!compact && <div>
          <label htmlFor={orgId} className="mb-1 block text-[11px] font-medium text-ink">{orgLabel}</label>
          <input
            id={orgId}
            name="organization"
            type="text"
            autoComplete="organization"
            required
            maxLength={120}
            placeholder={orgPlaceholder}
            className="min-h-10 w-full rounded-[5px] border border-rule bg-white px-3.5 py-2 text-[13px] text-ink outline-none placeholder:text-mute focus:border-accent"
          />
        </div>}

        {compact && (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="min-h-[56px] shrink-0 bg-accent px-7 text-[15px] font-semibold text-white transition-colors hover:bg-accent-deep disabled:cursor-wait disabled:opacity-65 sm:min-w-[168px]"
          >
            {status === "submitting" ? "Sending…" : buttonLabel}
          </button>
        )}
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id ?? "demo"}-website`}>Website</label>
        <input id={`${id ?? "demo"}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {!compact && <div className="mt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-10 w-full items-center justify-center rounded-[5px] bg-accent px-5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-accent-deep disabled:cursor-wait disabled:opacity-65"
        >
          {status === "submitting" ? "Sending…" : buttonLabel}
        </button>
      </div>}

      <div className={`${message ? "mt-3" : ""} min-h-0 text-[13px] leading-[1.55]`} role="status" aria-live="polite">
        {message && (
          <p className={status === "error" ? "text-loss" : status === "success" ? "font-medium text-accent-deep" : "text-body"}>
            {message}{" "}
            {status === "error" && (
              <a className="font-medium underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Primary Logic inquiry")}`}>
                Email us directly.
              </a>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
