"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";

const guides = {
  sunny: {
    name: "Sunny", question: "What can I hand off?", title: "The whole job, including the follow-up.",
    body: "Our AI contractors work in your existing systems, make calls, send messages, and handle the next step until the agreed result is verified.",
    example: "A customer is missing a document. The agent requests it, follows up, checks the correction, and confirms the account is active.",
    note: "You define the job and its boundaries. The agent carries it through.",
  },
  sprout: {
    name: "Sprout", question: "What would you hand off?", title: "Hand off the work. Stop chasing it.",
    body: "We build AI contractors around your workflows, systems, and rules. They keep track of what is outstanding and keep working, even when a job takes months.",
    example: "Describe your most time-consuming admin job. We’ll explain how we’d automate it, what access we’d need, and how we’d confirm it is done.",
    note: "Start with one workflow in the systems you already use.",
  },
  bubbles: {
    name: "Bubbles", question: "What does it learn?", title: "Every interaction informs the next.",
    body: "The agent remembers customer history, preferences, commitments, and unresolved questions. New information changes when it follows up, which channel it uses, or how it approaches a blocker.",
    example: "Priya says, “Friday. Text after six.” The agent carries that preference into Friday’s follow-up instead of sending another generic reminder.",
    note: "Its approach adapts. Your boundaries still apply.",
  },
  lilac: {
    name: "Lilac", question: "When does it need me?", title: "Your judgment, where it matters.",
    body: "You approve the systems, information, and actions the agent can use. It records its work and brings you the context when a decision falls outside those boundaries.",
    example: "Two installments are already approved? The agent can offer them. A customer asks for different terms? It requests your approval before proceeding.",
    note: "Review what happened, make the decision, and let the agent resume.",
  },
  cocoa: {
    name: "Cocoa", question: "What am I paying for?", title: "A completed result, verified.",
    body: "Before work begins, we agree on what counts as done, where to verify it, and the fixed fee. Calls, messages, and time spent are not the billable outcome.",
    example: "A balance must be paid in your ledger. An onboarding account must be active. An invoice must reach the agreed payment stage in your system.",
    note: "No verified outcome, no outcome fee.",
  },
  peach: {
    name: "Peach", question: "Can I see customer case studies?", title: "See what our agents have done.",
    body: "Contact us for case studies of how Primary Logic agents have driven outcomes for our customers.",
    example: "Tell us which workflow you’re considering so we can share relevant examples.",
    note: "Ask for case studies in your email — we’ll take it from there.",
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
