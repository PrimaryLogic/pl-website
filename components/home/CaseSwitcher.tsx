"use client";

import { useId, useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { hero } from "@/lib/content/positioning";
import { track } from "@/lib/analytics";
import RecoveryWalkthrough from "./RecoveryWalkthrough";
import OnboardingWalkthrough from "./OnboardingWalkthrough";
import InvoiceWalkthrough from "./InvoiceWalkthrough";
import DemoViewport from "./DemoViewport";
import GettingStarted from "./GettingStarted";
import DemoInvitation from "./DemoInvitation";
import setupStyles from "./GettingStarted.module.css";


const availableDemos = [
  { key: "balance", label: "Resolve an outstanding balance", context: "Patient billing · Phone + software" },
  { key: "onboarding", label: "Complete customer onboarding", context: "Customer operations · Email + software" },
  { key: "invoice", label: "Process an invoice for payment", context: "Accounts payable · Software + approval" },
] as const;
type DemoKey = typeof availableDemos[number]["key"];
function selectDemo(key: DemoKey) {
  const url = new URL(window.location.href);
  url.searchParams.set("demo", key);
  if (url.href !== window.location.href) {
    window.history.pushState(null, "", url);
  }
}

/**
 * Hero and setup panels, with on-demand workflow demos.
 */
export default function CaseSwitcher() {
  return <Suspense fallback={<CaseSwitcherContent active="balance" />}><LinkedCaseSwitcher /></Suspense>;
}

function LinkedCaseSwitcher() {
  const params = useSearchParams();
  const requested = params.get("demo");
  const demo = requested === "dermatology" ? "balance" : requested === "home-care" ? "onboarding" : requested;
  const active = availableDemos.find(({ key }) => key === demo)?.key ?? "balance";
  return <CaseSwitcherContent active={active} />;
}

function CaseSwitcherContent({ active }: { active: DemoKey }) {
  const id = useId();
  const [demoOpen, setDemoOpen] = useState(false);
  const demoPanel = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!demoOpen) return;
    const dialog = demoPanel.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [demoOpen]);
  function closeDemo() {
    setDemoOpen(false);
  }
  const Example = active === "balance" ? RecoveryWalkthrough : active === "onboarding" ? OnboardingWalkthrough : InvoiceWalkthrough;


  return (
    <div className={`pl-hero__stack ${setupStyles.heroStack}`}>
      <div className="pl-hero__center">
        <h1 className="pl-hero__title">{hero.heading}</h1>
        <p className="pl-hero__body">{hero.body}</p>
        <div className="pl-hero__form">
          <a href={hero.primaryCta.href} className="pl-button pl-button--primary" data-analytics="homepage-hero-cta"><span>{hero.primaryCta.label}</span><span aria-hidden="true">→</span></a>
        </div>
      </div>

      <GettingStarted demoControl={
        <DemoInvitation id={`${id}-demo-trigger`} open={demoOpen} controls={`${id}-demos`} onOpen={() => setDemoOpen(true)} />
      } />

      <dialog ref={demoPanel} id={`${id}-demos`} className={setupStyles.demoPanel} aria-label="Interactive demos" onCancel={event => { event.preventDefault(); closeDemo(); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDemo(); } }}>
        {demoOpen && <>
        <div className={setupStyles.demoHeading}>
          <div className={setupStyles.demoSwitcher} role="group" aria-label="Choose a demo">
            {availableDemos.map((workflow) => (
              <button
                key={workflow.key}
                type="button"
                aria-label={workflow.label}
                aria-pressed={active === workflow.key}
                onClick={() => {
                  selectDemo(workflow.key);
                  if (active !== workflow.key) track("demo_job_selected", { job: workflow.key });
                }}
              >
                {workflow.key === "balance" ? "Balances" : workflow.key === "onboarding" ? "Onboarding" : "Invoices"}
              </button>
            ))}
          </div>
          <button type="button" onClick={closeDemo} className={setupStyles.demoClose} aria-label="Close demo"><span aria-hidden="true">×</span></button>
        </div>
        <div className={setupStyles.demoContent} role="region" aria-label={availableDemos.find(workflow => workflow.key === active)?.label}>
          <DemoViewport key={active}><Example key={active} id={`${id}-demo`} /></DemoViewport>
        </div>
        </>}
      </dialog>
    </div>
  );
}
