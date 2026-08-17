"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { ChatCircleText } from "@phosphor-icons/react/dist/csr/ChatCircleText";
import { Phone } from "@phosphor-icons/react/dist/csr/Phone";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { Database } from "@phosphor-icons/react/dist/csr/Database";
import { Globe } from "@phosphor-icons/react/dist/csr/Globe";
import { Sparkle } from "@phosphor-icons/react/dist/csr/Sparkle";
import { Robot } from "@phosphor-icons/react/dist/csr/Robot";
import { UserCircle } from "@phosphor-icons/react/dist/csr/UserCircle";
import type { CaseAction, VerticalStory } from "@/lib/content/positioning";

function ActionCard({ action, person }: { action: CaseAction; person: string }) {
  return (
    <li className={`pl-action pl-action--${action.kind}`}>
      <div className="pl-action__head">
        <span className="pl-action__pill">{action.actor}</span>
        {action.channel ? <span className="pl-action__channel">{action.channel}</span> : null}
      </div>
      {action.text ? <p className="pl-action__text">{action.text}</p> : null}
      {action.transcript ? (
        <div className="pl-transcript">
          {action.transcript.map((line, i) => (
            <div key={i} className={`pl-bubble pl-bubble--${line.who}`}>
              <span className="pl-bubble__who">{line.who === "agent" ? <Robot aria-hidden="true" size={13} /> : <UserCircle aria-hidden="true" size={13} />} {line.who === "agent" ? "Agent" : person}</span>
              <p>{line.text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </li>
  );
}

/**
 * One example job, laid out as columns: each column is a signal from the
 * customer's system, what we remember, and the actions that follow — ending in
 * the verified outcome. Columns reveal one at a time on mount.
 */
export default function CaseTimeline({
  story,
  id,
  labelledBy,
  tabs,
  hideLabel,
}: {
  story: VerticalStory;
  id?: string;
  labelledBy?: string;
  /** Optional switcher rendered inside the panel header. */
  tabs?: ReactNode;
  /** Hide the audience label (lane pages already say it in the hero). */
  hideLabel?: boolean;
}) {
  const [shown, setShown] = useState(0);
  const total = story.steps.length;

  // Reveals one column per tick, then holds. Parents remount (via `key`) to replay.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const once = window.setTimeout(() => setShown(total), 0);
      return () => window.clearTimeout(once);
    }
    let i = 0;
    const tick = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= total) window.clearInterval(tick);
    }, 650);
    return () => window.clearInterval(tick);
  }, [story, total]);

  return (
    <div id={id} role={labelledBy ? "tabpanel" : undefined} aria-labelledby={labelledBy} className="pl-case pl-case--wide">
      {tabs ? <div className="pl-case__tabs">{tabs}</div> : null}
      <div className="pl-case__head">
        <div>
          {hideLabel ? null : <p className="pl-case__label">{story.forLabel}</p>}
          <p className="pl-case__goal"><span className="pl-case__goal-label">Goal:</span> {story.exampleTitle}</p>
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

      <ol className="pl-steps-grid" style={{ ["--cols" as string]: total }}>
        {story.steps.map((step, i) => {
          const visible = i < shown;
          const current = i === shown - 1;
          return (
            <li key={`${story.key}-${i}`} className={`pl-col${visible ? " is-visible" : ""}${current ? " is-current" : ""}`}>
              <div className="pl-col__when">
                <span className="pl-col__day">{step.when}</span>
                {step.time ? <span className="pl-col__time">{step.time}</span> : null}
              </div>
              <div className="pl-col__rail" aria-hidden="true"><i /></div>

              <div className="pl-signal">
                <div className="pl-signal__top">
                  <span className="pl-signal__label">Signal</span>
                  {step.system ? <span className="pl-signal__system"><Database aria-hidden="true" size={12} /> {step.system}</span> : null}
                </div>
                <p className="pl-signal__title">{step.signal}</p>
                {step.memory ? (
                  <div className="pl-signal__memory">
                    <span className="pl-signal__memory-label"><Sparkle aria-hidden="true" size={13} weight="fill" /> Memory</span>
                    <p>{step.memory}</p>
                  </div>
                ) : null}
              </div>

              <ul className="pl-actions">
                {step.actions.map((a, j) => (
                  <ActionCard key={j} action={a} person={story.person} />
                ))}
                {step.outcome ? (
                  <li className={`pl-action pl-action--outcome${i === total - 1 ? " is-final" : ""}`}>
                    <div className="pl-action__head">
                      <span className="pl-action__pill"><CheckCircle aria-hidden="true" size={13} weight="fill" /> Outcome</span>
                      <span className="pl-action__channel">{step.outcome.system}</span>
                    </div>
                    <p className="pl-action__text">{step.outcome.label}</p>
                  </li>
                ) : null}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
