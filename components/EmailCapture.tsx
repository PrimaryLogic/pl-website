"use client";

import { useRef, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { PILOT_EMAIL, PILOT_SUBJECT } from "@/lib/content/shared";
import { track } from "@/lib/analytics";

export default function EmailCapture({
  id,
  variant = "full",
  buttonLabel = "Design a pilot",
  emailPlaceholder = "name@company.com",
  orgLabel = "Organization",
  orgPlaceholder = "Your organization",
  helperText,
  lane,
}: {
  id?: string;
  variant?: "compact" | "full" | "landing";
  buttonLabel?: string;
  emailPlaceholder?: string;
  orgLabel?: string;
  orgPlaceholder?: string;
  helperText?: string;
  lane?: string;
}) {
  const started = useRef(false);
  const emailId = `${id ?? "demo"}-email`;
  const orgId = `${id ?? "demo"}-organization`;
  const compact = variant !== "full";
  const landing = variant === "landing";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const organization = String(formData.get("organization") ?? "").trim();
    const body = [
      email && `Work email: ${email}`,
      organization && `Organization: ${organization}`,
    ].filter(Boolean).join("\n");
    const mailto = `mailto:${PILOT_EMAIL}?subject=${encodeURIComponent(PILOT_SUBJECT)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

    track("demo_mailto_opened", { placement: id ?? "demo", lane });
    window.location.href = mailto;
  }

  return (
    <form
      id={id}
      className={compact ? (landing ? "w-full max-w-[520px]" : "max-w-[460px]") : "w-full"}
      onSubmit={submit}
      onFocus={() => {
        if (started.current) return;
        started.current = true;
        track("demo_form_started", { placement: id ?? "demo", lane });
      }}
    >
      <div className={compact ? `contact-join ${landing ? "contact-join--landing" : ""}` : "grid gap-4 sm:grid-cols-2"}>
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
              ? "min-h-[50px] w-full border-0 bg-white px-5 text-[14px] text-ink placeholder:text-mute focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
              : "min-h-10 w-full rounded-[5px] border border-rule bg-white px-3.5 py-2 text-[13px] text-ink placeholder:text-mute focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"}
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
            className="min-h-10 w-full rounded-[5px] border border-rule bg-white px-3.5 py-2 text-[13px] text-ink placeholder:text-mute focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </div>}

        {compact && (
          <button
            type="submit"
            className={`min-h-[50px] shrink-0 bg-accent px-6 text-[13px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-accent-deep sm:min-w-[150px] sm:px-6 sm:text-[14px] ${landing ? "inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full" : ""}`}
          >
            <span>{buttonLabel}</span>
            {landing && <ArrowRight aria-hidden="true" size={16} weight="bold" />}
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
          className="inline-flex min-h-10 w-full items-center justify-center rounded-[5px] bg-accent px-5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-accent-deep"
        >
          {buttonLabel}
        </button>
      </div>}

      {helperText ? (
        <p className="mt-2 pl-1 text-[11px] leading-[1.5] text-mute">{helperText}</p>
      ) : null}
    </form>
  );
}
