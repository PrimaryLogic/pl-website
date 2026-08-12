"use client";

import { useRef, useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/content";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export default function EmailCapture({ id }: { id?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const started = useRef(false);
  const emailId = `${id ?? "demo"}-email`;
  const practiceId = `${id ?? "demo"}-practice`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");
    setMessage("Sending your request…");
    track("demo_form_submitted", { placement: id ?? "demo" });

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          practice: formData.get("practice"),
          website: formData.get("website"),
          source: id ?? "homepage",
        }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Request could not be delivered.");

      form.reset();
      setStatus("success");
      setMessage("Request received. We’ll reply with a one-workflow mapping agenda.");
      track("demo_form_succeeded", { placement: id ?? "demo" });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Request could not be delivered.");
      track("demo_form_failed", { placement: id ?? "demo" });
    }
  }

  return (
    <form
      id={id}
      className="max-w-xl"
      onSubmit={submit}
      onFocus={() => {
        if (started.current) return;
        started.current = true;
        track("demo_form_started", { placement: id ?? "demo" });
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={emailId} className="label text-body">Work email</label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@practice.com"
            className="mt-2 min-h-12 w-full rounded-sm border border-rule-mid bg-card px-3.5 py-2.5 text-[15px] text-ink outline-none placeholder:text-mute focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor={practiceId} className="label text-body">Practice or organization</label>
          <input
            id={practiceId}
            name="practice"
            type="text"
            autoComplete="organization"
            required
            maxLength={120}
            placeholder="Practice name"
            className="mt-2 min-h-12 w-full rounded-sm border border-rule-mid bg-card px-3.5 py-2.5 text-[15px] text-ink outline-none placeholder:text-mute focus:border-accent"
          />
        </div>
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id ?? "demo"}-website`}>Website</label>
        <input id={`${id ?? "demo"}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-sm bg-accent px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-accent-deep disabled:cursor-wait disabled:opacity-65"
        >
          {status === "submitting" ? "Sending…" : "Map one workflow"}
        </button>
        <p className="text-[13px] leading-[1.55] text-mute">No patient data. No generic sales deck.</p>
      </div>

      <div className="mt-4 min-h-6 text-[13px] leading-[1.55]" role="status" aria-live="polite">
        {message && (
          <p className={status === "error" ? "text-loss" : status === "success" ? "font-medium text-accent-deep" : "text-body"}>
            {message}{" "}
            {status === "error" && (
              <a className="font-medium underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Workflow mapping request")}`}>
                Email us directly.
              </a>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
