"use client";

import { useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ChatsCircle } from "@phosphor-icons/react/dist/csr/ChatsCircle";
import { Database } from "@phosphor-icons/react/dist/csr/Database";
import { Phone } from "@phosphor-icons/react/dist/csr/Phone";
import { UploadSimple } from "@phosphor-icons/react/dist/csr/UploadSimple";
import { journey, type JourneyStep } from "@/lib/content/lending";

function StepIcon({ step, size = 18 }: { step: JourneyStep; size?: number }) {
  if (step.channel === "SMS") return <ChatsCircle aria-hidden="true" size={size} weight="fill" />;
  if (step.channel === "Voice") return <Phone aria-hidden="true" size={size} weight="fill" />;
  if (step.channel === "Portal") return <UploadSimple aria-hidden="true" size={size} weight="bold" />;
  return <Database aria-hidden="true" size={size} weight="fill" />;
}

export default function BorrowerJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const step = journey.steps[activeStep];

  function move(direction: -1 | 1) {
    setActiveStep((current) => (current + direction + journey.steps.length) % journey.steps.length);
  }

  return (
    <div className="mt-9 overflow-hidden rounded-[16px] border border-rule bg-white">
      <div className="flex flex-col gap-4 border-b border-rule bg-[#f7f7f4] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[13px] font-semibold text-accent-deep">B</span>
          <div>
            <p className="text-[14px] font-semibold text-ink">{journey.borrower}</p>
            <p className="mt-0.5 text-[11px] text-mute">{journey.file}</p>
          </div>
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="Borrower journey controls">
          <button
            type="button"
            aria-label="Previous event"
            onClick={() => move(-1)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-rule-mid text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeft aria-hidden="true" size={17} weight="bold" />
          </button>
          <span className="figure-num min-w-[62px] text-center text-[10px] text-mute">{activeStep + 1} / {journey.steps.length}</span>
          <button
            type="button"
            aria-label="Next event"
            onClick={() => move(1)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-ink bg-ink text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowRight aria-hidden="true" size={17} weight="bold" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto px-5 pt-7 sm:px-7">
        <ol className="relative grid min-w-[740px] grid-cols-5" aria-label="Illustrative recovery events">
          <span className="absolute top-[35px] right-[8%] left-[8%] h-px bg-rule" aria-hidden="true" />
          {journey.steps.map((item, index) => {
            const selected = activeStep === index;
            const past = index < activeStep;
            return (
              <li key={`${item.day}-${item.channel}`} className="relative text-center">
                <button
                  type="button"
                  onClick={() => setActiveStep(index)}
                  aria-pressed={selected}
                  aria-label={`Show ${item.day}: ${item.title}`}
                  className="group inline-flex w-full flex-col items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span className="figure-num text-[9px] tracking-[0.12em] text-mute uppercase">{item.day}</span>
                  <span className={`relative z-10 mt-3 inline-flex size-11 items-center justify-center rounded-full border transition-colors ${selected ? "border-accent bg-accent text-white" : past ? "border-accent bg-white text-accent" : "border-rule-mid bg-white text-body group-hover:border-accent"}`}>
                    <StepIcon step={item} />
                  </span>
                  <span className={`mt-3 text-[11px] font-medium ${selected ? "text-ink" : "text-mute"}`}>{item.channel}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mx-5 mb-5 mt-7 grid gap-5 rounded-[11px] border border-rule bg-[#fbfbf9] p-5 sm:mx-7 sm:mb-7 sm:grid-cols-[140px_minmax(0,1fr)] sm:p-6 lg:grid-cols-[160px_minmax(0,1.4fr)_minmax(230px,.7fr)]">
        <div>
          <p className="label !text-[9px] text-accent">{step.channel}</p>
          <p className="figure-num mt-2 text-[15px] text-mute">{step.day}</p>
          <p className="figure-num mt-5 text-[9px] tracking-[0.08em] text-mute uppercase">State</p>
          <p className="figure-num mt-1 text-[10px] leading-[1.5] text-ink">{step.state}</p>
        </div>
        <div>
          <h3 className="display text-[24px] leading-[1.08] text-ink">{step.title}</h3>
          <p className="mt-3 text-[13.5px] leading-[1.65] text-body">{step.body}</p>
        </div>
        <div className="border-t border-rule pt-5 sm:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p className="label !text-[9px] text-mute">Policy evidence</p>
          <p className="mt-3 text-[12.5px] font-medium leading-[1.6] text-accent-deep">{step.policy}</p>
        </div>
      </div>
    </div>
  );
}
