"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";

const guides = {
  sunny: {
    name: "Sunny", question: "Where is the revenue hiding?", title: "Start with the work already waiting.",
    body: "An unanswered question, an incomplete application, or an unbooked visit can leave an interested person stuck. Primary Logic works that unfinished queue and follows through to the agreed outcome.",
    example: "For example: a patient accepted treatment but never booked. Primary Logic answers from your approved policies, coordinates a time, and checks that the visit is confirmed in your schedule.",
    note: "A quiet customer isn’t a guaranteed win. Only a verified outcome counts.",
  },
  sprout: {
    name: "Sprout", question: "What happens after hello?", title: "One job. All the way through.",
    body: "Primary Logic picks up an unfinished job, talks with the person, and takes the next step in your existing systems. The conversation is only part of the work.",
    example: "In the dermatology example, explaining Maya’s balance is the start. Confirming both payments in the ledger is the finish.",
    note: "Follow the example below to see each step.",
  },
  bubbles: {
    name: "Bubbles", question: "What if they go quiet?", title: "The next step stays on the calendar.",
    body: "Primary Logic remembers the conversation across phone, text, and email. It follows up at the agreed time, within your contact rules, without asking the person to start over.",
    example: "For example: “Call after six” becomes a callback after six. A promised document becomes a follow-up if it hasn’t arrived.",
    note: "Preferences, quiet hours, and opt-outs still apply.",
  },
  lilac: {
    name: "Lilac", question: "Who sets the boundaries?", title: "You decide what’s allowed.",
    body: "Before launch, you approve the knowledge, permissions, and actions for the workflow. Every message and system update leaves a record your team can review.",
    example: "For example: an approved payment plan can be explained. A request outside the agreed policy closes uncompleted, with its history for your team.",
    note: "No verified outcome means no outcome fee.",
  },
  cocoa: {
    name: "Cocoa", question: "What actually counts?", title: "A result your system can prove.",
    body: "Together, we define the completed outcome, where it will be verified, and its fixed fee before work begins. Calls made and messages sent aren’t the billable event.",
    example: "For example: a promise to pay isn’t a paid balance. The payment must be recorded in your ledger before that outcome counts.",
    note: "The invoice is verified outcomes × the agreed fee.",
  },
  peach: {
    name: "Peach", question: "Where would we start?", title: "One queue is plenty to begin.",
    body: "Choose a queue of unfinished work, share the operating policy, and agree on a verifiable outcome. The pilot works part of that queue alongside your existing process.",
    example: "For example: start with outstanding patient balances. Compare the results in your own system before deciding what to expand.",
    note: "Use the form below to design your pilot with us.",
  },
};

export default function AgentGuide({ agent }: { agent: keyof typeof guides }) {
  const guide = guides[agent];
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  function positionPanel() {
    if (!trigger.current || !panel.current) return;
    const rect = trigger.current.getBoundingClientRect();
    const bubble = panel.current;
    const gap = 14;
    const left = Math.max(gap, Math.min(rect.right - bubble.offsetWidth, window.innerWidth - bubble.offsetWidth - gap));
    const below = rect.bottom + gap;
    const top = below + bubble.offsetHeight <= window.innerHeight - gap
      ? below
      : Math.max(gap, rect.top - bubble.offsetHeight - gap);
    bubble.style.left = `${left}px`;
    bubble.style.top = `${top}px`;
  }

  useEffect(() => {
    const dismiss = () => panel.current?.hidePopover();
    window.addEventListener("scroll", dismiss);
    window.addEventListener("resize", dismiss);
    return () => {
      window.removeEventListener("scroll", dismiss);
      window.removeEventListener("resize", dismiss);
    };
  }, []);
  return (
    <div className={`pl-guide pl-guide--${agent}`}>
      <button ref={trigger} type="button" className="pl-guide__trigger" popoverTarget={id} aria-label={`${guide.name}: ${guide.question}`}>
        <Image className="pl-guide__avatar" src={`/avatars/${agent}.png`} alt="" width={112} height={112} sizes="112px" />
        <span className="pl-guide__badge" aria-hidden="true">?</span>
        <span className="pl-guide__prompt">
          <span className="pl-guide__name">{guide.name}</span>
          <span className="pl-guide__question">{guide.question}</span>
          <span className="pl-guide__hint"><span className="pl-guide__closed">Click to explore</span><span className="pl-guide__opened">Click to close</span><span className="pl-guide__plus" aria-hidden="true">+</span></span>
        </span>
      </button>
      <div ref={panel} id={id} popover="auto" role="dialog" aria-label={`${guide.name} explains`} className={`pl-guide__answer pl-guide--${agent}`} onToggle={(event) => { if (event.newState === "open") positionPanel(); }}>
        <div className="pl-guide__greeting">
          <Image src={`/avatars/${agent}.png`} alt="" width={76} height={76} sizes="76px" />
          <span>A little clarity from {guide.name}</span>
          <button type="button" className="pl-guide__dismiss" popoverTarget={id} popoverTargetAction="hide" aria-label={`Close ${guide.name}’s explanation`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <h3>{guide.title}</h3>
        <p>{guide.body}</p>
        <p className="pl-guide__example">{guide.example}</p>
        <p className="pl-guide__note">{guide.note}</p>
      </div>
    </div>
  );
}
