"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/csr/CaretDown";
import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { hero, verticals, type VerticalKey } from "@/lib/content/positioning";
import { track } from "@/lib/analytics";
import CaseTimeline from "./CaseTimeline";

import EmailCapture from "../EmailCapture";

/**
 * Hero: one fixed headline and CTA, then an industry dropdown that replays one
 * illustrative case for the chosen industry.
 */
export default function CaseSwitcher() {
  const [active, setActive] = useState<VerticalKey>("dental");
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const story = verticals.find((v) => v.key === active) ?? verticals[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="pl-hero__stack">
      <div className="pl-hero__center">
        <h1 className="pl-hero__title">{hero.heading}</h1>
        <p className="pl-hero__body">{hero.body}</p>
        <div className="pl-hero__form">
          <EmailCapture id="hero-pilot" variant="landing" buttonLabel={hero.form.button} emailPlaceholder={hero.form.placeholder} lane="homepage-hero" />
        </div>
      </div>

      <div className="pl-case-wrap">
        <CaseTimeline
          key={story.key}
          story={story}
          id={`${id}-panel`}
          tabs={
            <div ref={rootRef} className={`pl-select${open ? " is-open" : ""}`}>
              <button
                type="button"
                className="pl-select__button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={`${id}-menu`}
                onClick={() => setOpen((o) => !o)}
              >
                <span className="pl-select__value">{story.tab}</span>
                <CaretDown aria-hidden="true" size={14} weight="bold" />
              </button>
              {open ? (
                <ul id={`${id}-menu`} role="listbox" aria-label="Choose an example" className="pl-select__menu">
                  {verticals.map((v) => {
                    const selected = v.key === active;
                    return (
                      <li key={v.key} role="option" aria-selected={selected}>
                        <button
                          type="button"
                          className={`pl-select__option${selected ? " is-selected" : ""}`}
                          onClick={() => {
                            setActive(v.key);
                            setOpen(false);
                            track("hero_vertical_selected", { vertical: v.key });
                          }}
                        >
                          <span>{v.tab}</span>
                          {selected ? <Check aria-hidden="true" size={14} weight="bold" /> : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          }
        />
      </div>
    </div>
  );
}
