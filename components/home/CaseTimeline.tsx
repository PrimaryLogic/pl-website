"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { Icon } from "@phosphor-icons/react";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { ChatCircleText } from "@phosphor-icons/react/dist/csr/ChatCircleText";
import { Phone } from "@phosphor-icons/react/dist/csr/Phone";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { Database } from "@phosphor-icons/react/dist/csr/Database";
import { hero, type CaseBeat, type VerticalStory } from "@/lib/content/positioning";

const channelIcon: Record<CaseBeat["channel"], Icon> = {
  Text: ChatCircleText,
  Call: Phone,
  Email: EnvelopeSimple,
  "Your system": Database,
};

/**
 * One illustrative case, replayed beat by beat: what happened, when, on which
 * channel — ending on the customer-side record that makes it billable.
 */
export default function CaseTimeline({
  story,
  id,
  labelledBy,
  layout = "column",
}: {
  story: VerticalStory;
  id?: string;
  labelledBy?: string;
  /** "wide" lays the beats out left-to-right on large screens. */
  layout?: "column" | "wide";
}) {
  const [shown, setShown] = useState(0);

  // Replays on a loop: reveal one beat per tick, hold on the finished case,
  // then blur everything and start again. Parents remount (via `key`) to restart.
  useEffect(() => {
    const total = story.beats.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const once = window.setTimeout(() => setShown(total), 0);
      return () => window.clearTimeout(once);
    }
    const holdTicks = 7; // ~3s on the completed case
    const restTicks = 2; // brief blurred pause before replaying
    let i = 0;
    const tick = window.setInterval(() => {
      i += 1;
      if (i <= total) setShown(i);
      else if (i === total + holdTicks) setShown(0);
      else if (i >= total + holdTicks + restTicks) i = 0;
    }, 420);
    return () => window.clearInterval(tick);
  }, [story]);

  return (
    <div id={id} role={labelledBy ? "tabpanel" : undefined} aria-labelledby={labelledBy} className={`pl-case${layout === "wide" ? " pl-case--wide" : ""}`}>
      <div className="pl-case__head">
        <div>
          <p className="pl-case__label">{hero.caseLabel} · {story.audience}</p>
          <p className="pl-case__goal">
            Get {story.person} to a <strong>{story.outcomeShort}</strong>
          </p>
        </div>
        <span className="pl-case__span">{story.span}</span>
      </div>

      <ol className="pl-case__list" key={story.key} style={{ "--beats": story.beats.length } as CSSProperties}>
        {story.beats.map((beat, i) => {
          const Ico = channelIcon[beat.channel];
          const visible = i < shown;
          const prevDay = i > 0 ? story.beats[i - 1].day : null;
          const newDay = beat.day !== prevDay;
          return (
            <li
              key={`${story.key}-${i}`}
              className={`pl-beat pl-beat--${beat.actor}${beat.terminal ? " pl-beat--terminal" : ""}${visible ? " is-visible" : ""}`}
            >
              <div className="pl-beat__when">
                <span className={`pl-beat__day${newDay ? "" : " is-repeat"}`}>{beat.day}</span>
                <span className="pl-beat__time">{beat.time}</span>
              </div>
              <div className="pl-beat__rail" aria-hidden="true"><i /></div>
              <div className="pl-beat__card">
                <p className="pl-beat__meta">
                  <Ico aria-hidden="true" size={14} weight={beat.terminal ? "fill" : "regular"} />
                  <span>
                    {beat.actor === "us" ? `${beat.channel} → ${story.person}` : beat.actor === "them" ? `${story.person} · ${beat.channel}` : beat.channel}
                  </span>
                </p>
                <p className="pl-beat__text">{beat.text}</p>
                {beat.note ? <p className="pl-beat__note">{beat.note}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>

      <div className={`pl-case__result${shown >= story.beats.length ? " is-visible" : ""}`}>
        <CheckCircle aria-hidden="true" size={20} weight="fill" />
        <div>
          <strong>{story.outcome}</strong>
          <span>Verified in {story.verifiedIn}. This is the only thing you’re billed for.</span>
        </div>
      </div>
    </div>
  );
}
