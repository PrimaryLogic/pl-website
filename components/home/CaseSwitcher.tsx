"use client";

import { useEffect, useId, useRef, useState, Suspense, type KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CaretDown } from "@phosphor-icons/react/dist/csr/CaretDown";
import { hero } from "@/lib/content/positioning";
import { track } from "@/lib/analytics";
import RecoveryWalkthrough from "./RecoveryWalkthrough";
import HomeHealthWalkthrough from "./HomeHealthWalkthrough";
import AgentGuide from "./AgentGuide";
import DemoViewport from "./DemoViewport";

import EmailCapture from "../EmailCapture";

const availableDemos = [
  { key: "dermatology", label: "Dermatology" },
  { key: "home-care", label: "Home Care" },
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
 * Hero: one fixed headline and CTA, then an industry demo dropdown.
 */
export default function CaseSwitcher() {
  return <Suspense fallback={<CaseSwitcherContent active="dermatology" />}><LinkedCaseSwitcher /></Suspense>;
}

function LinkedCaseSwitcher() {
  const params = useSearchParams();
  const demo = params.get("demo");
  const active = availableDemos.find(({ key }) => key === demo)?.key ?? "dermatology";
  return <CaseSwitcherContent active={active} />;
}

function CaseSwitcherContent({ active }: { active: DemoKey }) {
  const id = useId();
  const selectRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const restoreFocus = useRef(false);
  const Example = active === "dermatology" ? RecoveryWalkthrough : HomeHealthWalkthrough;
  const story = availableDemos.find((v) => v.key === active) ?? availableDemos[0];

  useEffect(() => {
    if (restoreFocus.current) {
      selectRef.current?.focus({ preventScroll: true });
      restoreFocus.current = false;
    }
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const initial = selectRef.current?.getBoundingClientRect();
    const dismiss = () => menuRef.current?.hidePopover();
    const onScroll = () => {
      const current = selectRef.current?.getBoundingClientRect();
      if (initial && current && (Math.abs(current.top - initial.top) > 1 || Math.abs(current.left - initial.left) > 1)) dismiss();
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", dismiss);
    window.addEventListener("demo-fit", dismiss);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", dismiss);
      window.removeEventListener("demo-fit", dismiss);
    };
  }, [open]);

  function openMenu() {
    const button = selectRef.current;
    const menu = menuRef.current;
    if (!button || !menu) return;
    const rect = button.getBoundingClientRect();
    const scale = rect.width / button.offsetWidth || 1;
    menu.style.zoom = String(1 / scale);
    menu.style.left = `${Math.max(12, Math.min(rect.right - Math.min(208, window.innerWidth - 24), window.innerWidth - Math.min(208, window.innerWidth - 24) - 12))}px`;
    menu.style.top = `${rect.bottom + 8}px`;
    menu.showPopover();
    menu.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus({ preventScroll: true });
  }

  function menuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const options = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'));
    const current = options.indexOf(document.activeElement as HTMLButtonElement);
    let next = current;
    if (event.key === "ArrowDown") next = (current + 1) % options.length;
    else if (event.key === "ArrowUp") next = (current - 1 + options.length) % options.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;
    else if (event.key === "Escape" || event.key === "Tab") {
      menuRef.current?.hidePopover();
      selectRef.current?.focus({ preventScroll: true });
      if (event.key === "Escape") event.preventDefault();
      return;
    } else {
      const match = options.findIndex((option) => option.textContent?.toLowerCase().startsWith(event.key.toLowerCase()));
      if (event.key.length !== 1 || match < 0) return;
      next = match;
    }
    event.preventDefault();
    options[next]?.focus();
  }

  return (
    <div className="pl-hero__stack">
      <div className="pl-hero__center">
        <div className="pl-guide-welcome"><AgentGuide agent="sprout" /></div>
        <h1 className="pl-hero__title">{hero.heading}</h1>
        <p className="pl-hero__body">{hero.body}</p>
        <div className="pl-hero__form">
          <EmailCapture id="hero-pilot" variant="landing" buttonLabel={hero.form.button} emailPlaceholder={hero.form.placeholder} lane="homepage-hero" />
        </div>
      </div>

      <div className="pl-case-wrap">
        <DemoViewport key={story.key}><Example
          key={story.key}
          id={`${id}-panel`}
          tabs={
            <div className="pl-select">
              <button
                ref={selectRef}
                type="button"
                className="pl-select__trigger"
                aria-label={`Choose a demo: ${story.label}`}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={`${id}-jobs`}
                onClick={() => menuRef.current?.matches(":popover-open") ? menuRef.current.hidePopover() : openMenu()}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    openMenu();
                  }
                }}
              >
                <span className="pl-select__copy"><span>{story.label}</span></span>
                <CaretDown aria-hidden="true" size={15} weight="bold" />
              </button>
              <div
                ref={menuRef}
                id={`${id}-jobs`}
                className="pl-select__menu"
                popover="auto"
                role="menu"
                aria-label="Demo"
                onToggle={(event) => setOpen(event.newState === "open")}
                onKeyDown={menuKeyDown}
              >
                {availableDemos.map((vertical) => (
                  <button
                    key={vertical.key}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active === vertical.key}
                    tabIndex={-1}
                    onClick={() => {
                      menuRef.current?.hidePopover();
                      setOpen(false);
                      if (active === vertical.key) {
                        selectDemo(vertical.key);
                        selectRef.current?.focus({ preventScroll: true });
                        return;
                      }
                      restoreFocus.current = true;
                      selectDemo(vertical.key);
                      track("demo_job_selected", { job: vertical.key });
                    }}
                  >
                    <span className="pl-select__copy"><span>{vertical.label}</span></span>
                    {active === vertical.key && <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m3 8 3.2 3.2L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </button>
                ))}
              </div>
            </div>
          }
        /></DemoViewport>
      </div>
    </div>
  );
}
