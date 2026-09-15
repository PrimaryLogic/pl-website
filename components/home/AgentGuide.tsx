"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";

const guides = {
  sunny: {
    name: "Sunny", question: "Where does the work get stuck?", title: "Small blockers. Unfinished jobs.",
    body: "A missing document, an unclear charge, a callback that never happened. Each leaves a next step for someone to remember and finish.",
    example: "A loan file needs a bank statement. The borrower promises it tomorrow. Someone still has to follow up, check what arrives, and get the complete file submitted.",
    note: "This is work your team already spends hours on, as well as work still waiting.",
  },
  sprout: {
    name: "Sprout", question: "What happens after hello?", title: "One job. All the way through.",
    body: "Primary Logic takes responsibility for the job: conversations, paperwork, system updates, and follow-ups over days or weeks until the work is done.",
    example: "In Maya’s demo, explaining the balance is only the start. I record her payment plan, check the first installment, and return two weeks later to verify the rest.",
    note: "The job stays open until the result is confirmed.",
  },
  bubbles: {
    name: "Bubbles", question: "What if they go quiet?", title: "Waiting is part of the job.",
    body: "Primary Logic remembers what was promised and when to act again. A reply, a document, or a system update determines the next step.",
    example: "“I’ll send it Friday.” Check that it arrived. “I’ll pay next week.” Check that it posted. If it hasn’t, follow up through the business’s existing channels.",
    note: "Every follow-up stays within the agreed contact rules.",
  },
  lilac: {
    name: "Lilac", question: "Who sets the boundaries?", title: "Your rules, carried through.",
    body: "You define the outcome, the information and systems the agent can use, and the actions it can take. The agent handles the job within those rules and records its work.",
    example: "Maya needs more time to pay. The practice already permits two installments. Sprout offers those terms, records the agreement, and verifies both payments.",
    note: "Your team can review the actions and result of each case.",
  },
  cocoa: {
    name: "Cocoa", question: "What actually counts?", title: "A result your system can prove.",
    body: "Before work begins, we agree on the outcome, where it will be verified, and its fixed fee. Calls made and messages sent aren’t the billable event.",
    example: "For a document-collection job, the agreed result could be a complete file submitted in your system. For payment recovery, the money must be posted in your ledger.",
    note: "Verified outcomes × agreed fee. No verified outcome, no outcome fee.",
  },
  peach: {
    name: "Peach", question: "Where would we start?", title: "Start with one job.",
    body: "Pick work that keeps coming back to your team: chasing documents, completing intake, or resolving unpaid balances. We agree on the rules and what done means.",
    example: "Start with one workflow in your existing systems. Check the completed results before deciding what else to hand over.",
    note: "Click “Design a pilot” below to open an email to us.",
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
