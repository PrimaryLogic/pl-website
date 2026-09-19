"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";

const guides = {
  sunny: {
    name: "Sunny", question: "What do I need to get started?", title: "Start by telling us the result.",
    body: "Send a job description, a document, or a few lines about the work. We’ll help define what finished means, what the agent needs, and what it can do.",
    example: "“We chase missing onboarding documents. We use a CRM and email. The job is done when the file is complete and the account is active.”",
    note: "You do not need to map out every step. That is part of the job.",
  },
  sprout: {
    name: "Sprout", question: "What can I hand off?", title: "Give us a job to see through.",
    body: "Our agents work in your systems, contact people, and follow up until the job is done, even when it takes months.",
    example: "An unpaid balance needs more than a reminder. The agent checks the record, answers the customer’s questions, follows up, and confirms payment in your system.",
    note: "Tell us the result you need. We’ll take responsibility for the work to get there.",
  },
  bubbles: {
    name: "Bubbles", question: "How does it get better?", title: "Every interaction informs the next.",
    body: "The agent remembers what happened, what someone promised, and what is still unresolved. It uses that context to choose when to follow up, how to reach someone, and what to try next.",
    example: "Priya says, “Friday. Text after six.” The agent remembers and follows up by text at the time she requested.",
    note: "It adapts as it learns more, within the rules you set.",
  },
  lilac: {
    name: "Lilac", question: "When does it need me?", title: "You set the outcome and rules. We manage the work.",
    body: "You decide what the agent can access and do. It works through problems on its own and asks for your input when a decision falls outside those rules. Its actions are recorded for your review.",
    example: "An approved payment plan? The agent can offer it. Different terms? It brings you the request and the context to decide.",
    note: "Make the decision and the agent picks up where it left off.",
  },
  cocoa: {
    name: "Cocoa", question: "What am I paying for?", title: "A completed result, verified.",
    body: "Before work begins, we agree on what counts as done, where to verify it, and the fixed fee. Calls, messages, and time spent are not the billable outcome.",
    example: "A balance must be paid in your ledger. An onboarding account must be active. An invoice must reach the agreed payment stage in your system.",
    note: "No verified outcome, no outcome fee.",
  },
  peach: {
    name: "Peach", question: "Can I see customer case studies?", title: "See what our agents have done.",
    body: "Ask us for case studies showing the work our agents have handled and the results for our customers.",
    example: "Tell us about your task so we can share relevant examples.",
    note: "Ask for case studies in your email. We’ll take it from there.",
  },
};

export default function AgentGuide({ agent, inline = false }: { agent: keyof typeof guides; inline?: boolean }) {
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
    <div className={`pl-guide pl-guide--${agent}${inline ? " pl-guide--inline" : ""}`}>
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
