"use client";

import { useId, Suspense, type KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import { hero } from "@/lib/content/positioning";
import { track } from "@/lib/analytics";
import RecoveryWalkthrough from "./RecoveryWalkthrough";
import OnboardingWalkthrough from "./OnboardingWalkthrough";
import InvoiceWalkthrough from "./InvoiceWalkthrough";
import AgentGuide from "./AgentGuide";
import DemoViewport from "./DemoViewport";


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
 * Hero: one fixed headline and CTA, then a workflow demo tabs.
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
  const Example = active === "balance" ? RecoveryWalkthrough : active === "onboarding" ? OnboardingWalkthrough : InvoiceWalkthrough;

  function tabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next]?.focus({ preventScroll: true });
    tabs[next]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    tabs[next]?.click();
  }

  return (
    <div className="pl-hero__stack">
      <div className="pl-hero__center">
        <h1 className="pl-hero__title">{hero.heading}</h1>
        <p className="pl-hero__body">{hero.body.split(" — ")[0]}{" — "}<span className="pl-hero__follow-through">{hero.body.split(" — ").slice(1).join(" — ")}</span></p>
        <div className="pl-hero__tagline-row">
          <p className="pl-hero__tagline">{hero.tagline}</p>
          <div className="pl-guide-welcome"><AgentGuide agent="sprout" /></div>
        </div>
        <div className="pl-hero__form">
          <a href={hero.primaryCta.href} className="pl-button pl-button--primary" data-analytics="homepage-hero-cta"><span>{hero.primaryCta.label}</span><span aria-hidden="true">→</span></a>
        </div>
      </div>

      <div className="pl-case-wrap">
        <div className="pl-workflow-tabs" role="tablist" aria-label="Demo workflows" onKeyDown={tabKeyDown}>
          {availableDemos.map((workflow) => (
            <button
              key={workflow.key}
              id={`${id}-tab-${workflow.key}`}
              type="button"
              role="tab"
              aria-label={workflow.label}
              aria-selected={active === workflow.key}
              aria-controls={`${id}-panel-${workflow.key}`}
              tabIndex={active === workflow.key ? 0 : -1}
              onClick={(event) => {
                event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
                selectDemo(workflow.key);
                if (active !== workflow.key) track("demo_job_selected", { job: workflow.key });
              }}
            >
              {workflow.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`${id}-panel-${active}`} aria-labelledby={`${id}-tab-${active}`}>
          <DemoViewport key={active}><Example key={active} id={`${id}-demo`} /></DemoViewport>
        </div>
      </div>
    </div>
  );
}
