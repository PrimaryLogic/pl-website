"use client";

import { useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { Clock } from "@phosphor-icons/react/dist/csr/Clock";
import { FileText } from "@phosphor-icons/react/dist/csr/FileText";
import { healthcareLanding } from "@/lib/content/healthcare";

const { steps, caseLabel } = healthcareLanding.workflow;

export default function ReferralTrace() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const atEnd = active === steps.length - 1;

  function move(delta: -1 | 1) {
    setActive((current) => Math.max(0, Math.min(steps.length - 1, current + delta)));
  }

  return (
    <div className="overflow-hidden rounded-[14px] border border-black/8 bg-white text-ink shadow-[0_24px_70px_rgba(18,20,16,0.08)]">
      <div className="flex flex-col gap-4 border-b border-rule bg-[#f5f4f2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="label !text-[9px] text-mute">{caseLabel}</p>
          <p className="mt-1.5 text-[14px] font-semibold text-ink">Referral HC–0047 · Dermatology</p>
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="Referral trace controls">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={active === 0}
            aria-label="Previous case event"
            className="inline-flex size-10 items-center justify-center rounded-full border border-rule bg-white text-ink transition-colors hover:border-accent disabled:cursor-not-allowed disabled:text-rule-mid"
          >
            <ArrowLeft aria-hidden="true" size={17} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={atEnd}
            aria-label="Next case event"
            className="inline-flex size-10 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:bg-rule-mid"
          >
            <ArrowRight aria-hidden="true" size={17} weight="bold" />
          </button>
        </div>
      </div>

      <div className="hidden px-3 pt-6 sm:block sm:px-6">
        <ol className="relative grid grid-cols-3" aria-label="Illustrative referral case events">
          <span className="absolute top-[19px] right-[16%] left-[16%] h-px bg-rule" aria-hidden="true" />
          {steps.map((entry, index) => {
            const selected = index === active;
            const complete = index < active;
            return (
              <li key={`${entry.day}-${entry.title}`} className="relative text-center">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show ${entry.day}: ${entry.title}`}
                  aria-pressed={selected}
                  className="group inline-flex min-h-[76px] w-full flex-col items-center px-1 focus-visible:rounded-[8px] sm:px-2"
                >
                  <span className={`relative z-10 inline-flex size-10 items-center justify-center rounded-full border text-[12px] font-semibold transition-colors ${
                    selected
                      ? "border-accent bg-accent text-white"
                      : complete
                        ? "border-accent bg-white text-accent"
                        : "border-rule-mid bg-white text-mute group-hover:border-accent"
                  }`}>
                    {complete ? <CheckCircle aria-hidden="true" size={18} weight="fill" /> : index + 1}
                  </span>
                  <span className="figure-num mt-3 text-[9px] tracking-[0.08em] text-mute uppercase">{entry.day}</span>
                  <span className={`mt-1 text-center text-[10.5px] font-medium sm:text-[11px] ${selected ? "text-accent-deep" : "text-body"}`}>{entry.channel}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="m-4 mt-6 grid gap-0 overflow-hidden rounded-[10px] border border-rule sm:m-6 sm:mt-7 lg:grid-cols-[.78fr_1.22fr]">
        <div className="bg-[#f5f4f2] p-5 sm:p-6">
          <p className="figure-num text-[10px] font-semibold tracking-[0.1em] text-accent uppercase">Event {active + 1} of {steps.length}</p>
          <h3 className="display mt-3 text-[20px] leading-[1.1] text-ink sm:text-[23px]">{step.title}</h3>
          <p className="mt-4 text-[13px] leading-[1.6] text-body">{step.signal}</p>
        </div>
        <dl className="divide-y divide-rule bg-white">
          <div className="grid gap-2 p-4 sm:grid-cols-[115px_minmax(0,1fr)] sm:p-5">
            <dt className="flex items-center gap-2 text-[11px] font-semibold text-ink"><Clock aria-hidden="true" size={15} className="text-accent" /> Agent action</dt>
            <dd className="text-[12.5px] leading-[1.55] text-body">{step.action}</dd>
          </div>
          <div className="grid gap-2 p-4 sm:grid-cols-[115px_minmax(0,1fr)] sm:p-5">
            <dt className="flex items-center gap-2 text-[11px] font-semibold text-ink"><ArrowRight aria-hidden="true" size={15} className="text-accent" /> Next action</dt>
            <dd className="text-[12.5px] leading-[1.55] text-body">{step.next}</dd>
          </div>
          <div className="grid gap-2 p-4 sm:grid-cols-[115px_minmax(0,1fr)] sm:p-5">
            <dt className="flex items-center gap-2 text-[11px] font-semibold text-ink"><FileText aria-hidden="true" size={15} className="text-accent" /> Evidence</dt>
            <dd className="text-[12.5px] leading-[1.55] text-body">{step.evidence}</dd>
          </div>
        </dl>
      </div>

      <p className="border-t border-rule px-5 py-3 text-[10.5px] leading-[1.5] text-mute sm:px-6">
        Illustrative operating model, not patient data or a measured result. Product remains in the design-partner build phase; customer-side records stay authoritative.
      </p>
    </div>
  );
}
