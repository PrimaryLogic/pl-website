"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { ChatCircleText } from "@phosphor-icons/react/dist/csr/ChatCircleText";
import { Phone } from "@phosphor-icons/react/dist/csr/Phone";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { Database } from "@phosphor-icons/react/dist/csr/Database";
import { Globe } from "@phosphor-icons/react/dist/csr/Globe";
import type { CaseBeat, VerticalStory } from "@/lib/content/positioning";

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
  tabs,
}: {
  story: VerticalStory;
  id?: string;
  labelledBy?: string;
  /** "wide" lays the beats out left-to-right on large screens. */
  layout?: "column" | "wide";
  /** Optional switcher rendered inside the panel header. */
  tabs?: ReactNode;
}) {
  const [shown, setShown] = useState(0);

  // Reveals one beat per tick, then holds. Parents remount (via `key`) to replay.
  useEffect(() => {
    const total = story.beats.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const once = window.setTimeout(() => setShown(total), 0);
      return () => window.clearTimeout(once);
    }
    let i = 0;
    const tick = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= total) window.clearInterval(tick);
    }, 420);
    return () => window.clearInterval(tick);
  }, [story]);

  return (
    <div id={id} role={labelledBy ? "tabpanel" : undefined} aria-labelledby={labelledBy} className={`pl-case${layout === "wide" ? " pl-case--wide" : ""}`}>
      {tabs ? <div className="pl-case__tabs">{tabs}</div> : null}
      <div className="pl-case__head">
        <div>
          <p className="pl-case__label">{story.forLabel}</p>
          <p className="pl-case__goal">{story.exampleTitle}</p>
          <p className="pl-case__sub">{story.exampleBody}</p>
        </div>
      </div>

      <div className="pl-case__meta">
        <span className="pl-case__meta-label">Reaches by:</span>
        {story.channels.map((c) => {
          const Ico = c === "Phone" ? Phone : c === "Email" ? EnvelopeSimple : c === "Web chat" ? Globe : ChatCircleText;
          return <span key={c} className="pl-case__meta-item"><Ico aria-hidden="true" size={14} /> {c}</span>;
        })}
        <span className="pl-case__meta-divider" aria-hidden="true" />
        <span className="pl-case__meta-label">Works in:</span>
        {story.systems.map((sys) => (
          <span key={sys} className="pl-case__meta-item"><Database aria-hidden="true" size={14} /> {sys}</span>
        ))}
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
                    {beat.actor === "us"
                      ? `We ${beat.channel === "Call" ? "call" : beat.channel === "Email" ? "email" : "text"} ${story.person}`
                      : beat.actor === "them"
                        ? `${story.person} replies`
                        : story.systemLabel}
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
          <span>Verified in {story.verifiedIn}. The only thing you pay for.</span>
        </div>
      </div>
    </div>
  );
}
