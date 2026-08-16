"use client";

import { useId, useState } from "react";
import { hero, verticals, type VerticalKey } from "@/lib/content/positioning";
import { track } from "@/lib/analytics";
import CaseTimeline from "./CaseTimeline";
import EmailCapture from "../EmailCapture";

/**
 * Hero: one fixed headline and CTA, then an industry switcher that replays one
 * illustrative case for the chosen industry.
 */
export default function CaseSwitcher() {
  const [active, setActive] = useState<VerticalKey>("dental");
  const tabsId = useId();
  const story = verticals.find((v) => v.key === active) ?? verticals[0];

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
        <div className="pl-case__tabs">
          <div className="pl-tabs pl-tabs--bar" role="tablist" aria-label="Choose an example">
            {verticals.map((v) => (
              <button
                key={v.key}
                id={`${tabsId}-${v.key}`}
                role="tab"
                type="button"
                aria-selected={v.key === active}
                aria-controls={`${tabsId}-panel`}
                className="pl-tab"
                onClick={() => {
                  setActive(v.key);
                  track("hero_vertical_selected", { vertical: v.key });
                }}
              >
                {v.tab}
              </button>
            ))}
          </div>
        </div>
        <CaseTimeline key={story.key} story={story} id={`${tabsId}-panel`} labelledBy={`${tabsId}-${story.key}`} />
      </div>
    </div>
  );
}
