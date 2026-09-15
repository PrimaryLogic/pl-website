"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import "./RecoveryWalkthrough.css";
import "./HomeHealthWalkthrough.css";

const chapters = ["See the work", "Recover payment", "Check the visit", "Verify outcomes"];
const starts = [0, 3, 17, 20];
const actions = [
  {
    "chapter": 0,
    "title": "Bubbles works across HHAeXchange and the agency’s existing tools.",
    "next": "See revenue at risk",
    "screen": "dashboard",
    "duration": 3000,
    "thought": "Your systems. One employee following through."
  },
  {
    "chapter": 0,
    "title": "$1,240 overdue. One visit blocked. Bubbles owns the next action on each.",
    "next": "See current activity",
    "screen": "dashboard",
    "duration": 3000,
    "thought": "Here’s the work waiting."
  },
  {
    "chapter": 0,
    "title": "Two active cases, with status, next steps, and a record of every action.",
    "next": "Open Margaret’s account",
    "screen": "dashboard",
    "duration": 2400,
    "thought": "Let’s start with the overdue balance."
  },
  {
    "chapter": 1,
    "title": "Margaret Thompson owes $1,240 across two private-pay invoices.",
    "next": "Send Daniel a text",
    "screen": "account",
    "duration": 3200,
    "thought": "Two invoices. Let’s check the history."
  },
  {
    "chapter": 1,
    "title": "Bubbles texts Daniel, Margaret’s authorized billing contact.",
    "next": "Check for a reply",
    "screen": "outreach",
    "duration": 5000,
    "thought": "A specific message, in the agency’s voice."
  },
  {
    "chapter": 1,
    "title": "No reply by the next day. Bubbles follows the approved contact schedule.",
    "next": "Call Daniel",
    "screen": "outreach",
    "duration": 2800,
    "thought": "Still open. Time to follow up."
  },
  {
    "chapter": 1,
    "title": "Bubbles calls Daniel during his approved contact window.",
    "next": "Hear Daniel’s question",
    "screen": "call",
    "duration": 6500,
    "thought": "Hi Daniel, is now a good time?"
  },
  {
    "chapter": 1,
    "title": "Daniel wants to know which dates of care the invoices cover.",
    "next": "Read the invoices",
    "screen": "call",
    "duration": 4000,
    "thought": "Let me check the service dates."
  },
  {
    "chapter": 1,
    "title": "Two weeks of care, August 3–9 and August 10–16. $620 each.",
    "next": "Hear Daniel’s response",
    "screen": "call",
    "duration": 5800,
    "thought": "The answer is in the billing record."
  },
  {
    "chapter": 1,
    "title": "Daniel understands the charges. Bubbles confirms the next step.",
    "next": "Check the payment path",
    "screen": "call",
    "duration": 3400,
    "thought": "Question resolved. Let’s finish the payment."
  },
  {
    "chapter": 1,
    "title": "The agency’s existing payment link is available. Bubbles does not process payments.",
    "next": "Send the payment link",
    "screen": "call",
    "duration": 4200,
    "thought": "Using your existing payment process."
  },
  {
    "chapter": 1,
    "title": "Bubbles sends the agency’s secure payment link to Daniel.",
    "next": "Confirm next step",
    "screen": "call",
    "duration": 4800,
    "thought": "The link is on its way."
  },
  {
    "chapter": 1,
    "title": "Daniel plans to pay tonight. Bubbles keeps the case open.",
    "next": "Record the conversation",
    "screen": "call",
    "duration": 3000,
    "thought": "A promise is not a posted payment."
  },
  {
    "chapter": 1,
    "title": "Bubbles saves the conversation and schedules a payment check.",
    "next": "Check payment status",
    "screen": "note",
    "duration": 5000,
    "thought": "Follow-up is on the calendar."
  },
  {
    "chapter": 1,
    "title": "Payment is processing. Bubbles waits for the billing record to confirm it.",
    "next": "Verify the posted payment",
    "screen": "ledger",
    "duration": 2800,
    "thought": "Not closing this yet."
  },
  {
    "chapter": 1,
    "title": "$1,240 posts in the existing billing system. Remaining balance: $0.",
    "next": "Update the work queue",
    "screen": "ledger",
    "duration": 3200,
    "thought": "Payment posted. Balance verified."
  },
  {
    "chapter": 1,
    "title": "The private-pay case is resolved. Bubbles turns to the blocked visit.",
    "next": "Open the EVV exception",
    "screen": "dashboard",
    "duration": 2500,
    "thought": "One resolved. One still needs attention."
  },
  {
    "chapter": 2,
    "title": "HHAeXchange shows a missing clock-out for Evelyn’s completed visit.",
    "next": "Request the missing detail",
    "screen": "evv",
    "duration": 4000,
    "thought": "The visit has no recorded end time."
  },
  {
    "chapter": 2,
    "title": "Bubbles contacts the caregiver, requests documentation, and prepares the correction.",
    "next": "Apply the documented correction",
    "screen": "evv",
    "duration": 6000,
    "thought": "Gathering evidence, not guessing the time."
  },
  {
    "chapter": 2,
    "title": "Bubbles applies the documented correction under the agency’s approved rules. The system clears the hold.",
    "next": "Review outcomes",
    "screen": "evv",
    "duration": 6000,
    "thought": "Correction saved. Billing hold cleared."
  },
  {
    "chapter": 3,
    "title": "$1,240 paid and verified. The visit correction is saved and the billing hold is cleared.",
    "next": "Start over",
    "screen": "complete",
    "duration": 5000,
    "thought": "Both cases resolved and verified."
  }
] as const;
const targets = [".sw-page-title", ".hh-metrics", ".hh-case:first-of-type", ".hh-invoices", ".hh-message", ".hh-followup", ".sw-phone-top", ".sw-call-person", ".hh-invoices", ".hh-guardrail", ".hh-payment-path", ".sw-dialogue", ".sw-call-person", ".sw-note", ".hh-posting", ".hh-posting", ".hh-case:last-child", ".hh-evv-details", ".hh-evidence", ".hh-review", ".hh-outcomes"];
const dialogue: Record<number, { name: string; words: string }> = {
  6: { name: "Bubbles", words: "Hi Daniel, I’m Bubbles, your home care agency’s automated assistant. Is now a good time to discuss Margaret’s two outstanding invoices?" },
  7: { name: "Daniel", words: "Yes. I saw the balance, but which dates of care are those invoices for?" },
  8: { name: "Bubbles", words: "The first covers August 3 through 9, and the second August 10 through 16. Each is $620, for a total of $1,240." },
  9: { name: "Daniel", words: "That clears it up. Can you send me the payment link again?" },
  10: { name: "Bubbles", words: "Of course. I’ll use the secure payment link from the agency’s billing system." },
  11: { name: "Bubbles", words: "I’ve sent the link to your preferred number. You can pay the agency directly using that link." },
  12: { name: "Daniel", words: "Thanks. I’ll take care of it tonight." },
};
const disputeActions: Record<number, { title: string; thought: string; next: string; duration: number }> = {
  9: { title: "Daniel thinks the two identical amounts are a duplicate charge.", thought: "Let’s check both service records.", next: "Compare the service records", duration: 4000 },
  10: { title: "Bubbles checks the visit records: two separate weeks of care, each billed once.", thought: "Same amount. Different weeks of care.", next: "Confirm the explanation", duration: 8000 },
  11: { title: "Daniel confirms the charges are clear. Bubbles sends the existing payment link.", thought: "Dispute resolved. Payment link sent.", next: "Confirm next step", duration: 5000 },
};
const disputeDialogue: Record<number, { name: string; words: string }> = {
  9: { name: "Daniel", words: "These are both $620. I think you charged us twice for the same care." },
  10: { name: "Bubbles", words: "I checked the visit records against both invoices. One covers August 3–9, the other August 10–16. Each week appears once; the totals match because the care hours were the same." },
  11: { name: "Daniel", words: "I see the two different weeks now. That answers my question—thanks for sending the link." },
};
const context = [
  "This fictional non-skilled home care agency serves Medicaid/CCP and private-pay clients. Bubbles works across its existing tools. All records shown are demo data.",
  "Bubbles uses the recorded billing contact, service dates, approved outreach cadence, and existing payment path. In the alternate path, Daniel questions a possible duplicate. Bubbles checks the service records, explains the distinct weeks, and confirms his agreement before continuing. Payment is verified in the billing system before closure.",
  "This is an illustrative HHAeXchange workflow, not a live integration. Bubbles gathers the visit, caregiver, authorization, and supporting documentation. In this fictional scenario, the agency has authorized documented missed-clock-out corrections when the signed visit record matches the active authorization. Bubbles checks those conditions, saves the correction with its source and reason, and verifies that the system clears the hold.",
  "The private-pay payment is verified and the visit correction is saved. Bubbles confirms the billing hold is cleared in the source system. Clearing a hold is not a paid claim; only the $1,240 posted payment is counted as recovered.",
];

function Glyph({ kind }: { kind: "play" | "pause" | "next" | "back" | "restart" | "phone" | "check" }) {
  const paths = { play: "m9 5 11 7-11 7Z", pause: "M9 5v14M16 5v14", next: "m9 5 7 7-7 7", back: "m15 5-7 7 7 7", restart: "M4 10a8 8 0 1 1 1 8M4 4v6h6", phone: "m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c-1 4-4 5-7 3C8 17 4 13 3 7 2 4 4 2 7 3Z", check: "m5 12 4 4L19 6" };
  return <svg width="18" height="18" viewBox="0 0 24 24" fill={kind === "play" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

function Typed({ text }: { text: string }) {
  const [length, setLength] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let revealed = 0;
    const timer = window.setInterval(() => {
      revealed = Math.min(text.length, revealed + 3);
      setLength(revealed);
      if (revealed === text.length) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [text]);
  return <><span className="sw-typed" aria-hidden="true"><span>{text.slice(0, length)}</span><span className="sw-untyped">{text.slice(length)}</span></span><span className="sw-reduced-text">{text}</span><span className="sw-sr">{text}</span></>;
}

export default function HomeHealthWalkthrough({ tabs, id, job = "invoices" }: { tabs?: ReactNode; id?: string; job?: "invoices" | "billing-hold" }) {
  const visitOnly = job === "billing-hold";
  const firstIndex = visitOnly ? 17 : 0;
  const activeChapters = visitOnly ? ["Find the blocker", "Gather evidence", "Correct the record", "Verify completion"] : chapters;
  const chapterStarts = visitOnly ? [17, 18, 19, 20] : starts;
  const [index, setIndex] = useState(firstIndex);
  const [playing, setPlaying] = useState(true);
  const [showContext, setShowContext] = useState(false);
  const [speed, setSpeed] = useState(1);
  const root = useRef<HTMLElement>(null);
  const contextId = useId();
  const world = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const [disputed, setDisputed] = useState(false);
  const storyActions = actions.map((item, n) => {
    const step = disputed && disputeActions[n] ? { ...item, ...disputeActions[n] } : item;
    if (!visitOnly) return step;
    return { ...step, chapter: Math.max(0, n - firstIndex), ...(n === 20 ? { title: "Evelyn’s visit correction is saved. The billing hold is cleared and verified.", thought: "Visit corrected. Hold cleared." } : {}) };
  });
  const action = storyActions[index];
  const finished = index === actions.length - 1;
  const running = playing;
  const calling = action.screen === "call";
  const paid = !visitOnly && index >= 15;
  const visitResolved = index >= 19;
  const jump = (next: number) => { setIndex(Math.max(firstIndex, next)); setPlaying(false); setShowContext(false); if (next === 0) setDisputed(false); };
  const focusStage = () => {
    requestAnimationFrame(() => {
      const target = window.matchMedia("(min-width: 701px)").matches ? root.current?.parentElement : world.current;
      target?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  };
  const advance = () => { jump(finished ? firstIndex : index + 1); focusStage(); };

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => { if (finished) setDisputed(false); setIndex(n => n === actions.length - 1 ? firstIndex : n + 1); }, action.duration / speed);
    return () => window.clearTimeout(timer);
  }, [index, running, action.duration, speed, finished, firstIndex]);

  useEffect(() => {
    const rail = stepsRef.current;
    const active = rail?.children[action.chapter] as HTMLElement | undefined;
    if (!rail || !active) return;
    rail.scrollTo({ left: rail.scrollLeft + active.getBoundingClientRect().left - rail.getBoundingClientRect().left - (rail.clientWidth - active.offsetWidth) / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [action.chapter]);

  useLayoutEffect(() => {
    const stage = world.current;
    const target = stage?.querySelector<HTMLElement>(targets[index]);
    if (!stage || !target) return;
    if (!target.closest(".sw-target")) target.dataset.sproutTarget = "true";
    const position = () => {
      const physicalBounds = stage.getBoundingClientRect();
      const scale = physicalBounds.width / stage.offsetWidth || 1;
      // Element rectangles include the player's fit scale; animation coordinates do not.
      const unscale = (r: DOMRect) => ({
        left: physicalBounds.left + (r.left - physicalBounds.left) / scale,
        right: physicalBounds.left + (r.right - physicalBounds.left) / scale,
        top: physicalBounds.top + (r.top - physicalBounds.top) / scale,
        bottom: physicalBounds.top + (r.bottom - physicalBounds.top) / scale,
        width: r.width / scale, height: r.height / scale,
      });
      const bounds = unscale(physicalBounds);
      const rect = unscale(target.getBoundingClientRect());
      const mobile = window.matchMedia("(max-width: 700px)").matches;
      const size = mobile ? 56 : 76;
      let x = rect.left - bounds.left + Math.min(rect.width * .65, 160);
      let y = rect.top - bounds.top + Math.min(rect.height * .65, 28);
      let mascotX = x + size + 18 < bounds.width ? x + 10 : x - size + 6;
      let mascotY = Math.max(48, Math.min(y - 12, bounds.height - size - 12));
      if (mobile && index === actions.length - 1) {
        mascotX = rect.right - bounds.left - size - 8;
        x = mascotX - 6;
      }
      const phone = stage.querySelector<HTMLElement>(".sw-phone");
      if (phone) {
        const call = unscale(phone.getBoundingClientRect());
        mascotX = mobile ? call.left - bounds.left + 8 : call.left - bounds.left - size - 14;
        mascotY = mobile ? call.top - bounds.top + 10 : call.top - bounds.top + 68;
        x = mascotX - 6;
        y = mascotY + 12;
      }
      stage.style.setProperty("--pointer-x", `${x}px`);
      stage.style.setProperty("--pointer-y", `${y}px`);
      stage.style.setProperty("--mascot-x", `${mascotX}px`);
      stage.style.setProperty("--mascot-y", `${mascotY}px`);
      const bubble = stage.querySelector<HTMLElement>(".sw-thought");
      if (!bubble) return;
      const width = bubble.offsetWidth;
      const height = bubble.offsetHeight;
      const occupied: { left: number; top: number; right: number; bottom: number }[] = [];
      const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent?.trim() || node.parentElement?.closest(".sw-thought, .sw-sprout, .sw-context, .sw-sr")) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const physicalRect of range.getClientRects()) {
          const r = unscale(physicalRect);
          if (r.width && r.height) occupied.push({ left: r.left - bounds.left - 5, right: r.right - bounds.left + 5, top: r.top - bounds.top - 5, bottom: r.bottom - bounds.top + 5 });
        }
      }
      // Only nearby placements: the bubble must still read as Sprout speaking.
      const candidates = [
        [mascotX + size + 8, mascotY - 4],
        [mascotX + size / 2 - width / 2, mascotY - height - 10],
        [mascotX - width - 8, mascotY - 4],
        [mascotX + size / 2 - width / 2, mascotY + size + 8],
        [mascotX + size + 8, mascotY - height / 2],
        [mascotX - width - 8, mascotY - height / 2],
      ].map(([left, top]) => ({ left: Math.max(12, Math.min(left, bounds.width - width - 12)), top: Math.max(76, Math.min(top, bounds.height - height - 12)) }));
      const overlap = (left: number, top: number, r: typeof occupied[number]) => Math.max(0, Math.min(left + width, r.right) - Math.max(left, r.left)) * Math.max(0, Math.min(top + height, r.bottom) - Math.max(top, r.top));
      const mascot = { left: mascotX, top: mascotY, right: mascotX + size, bottom: mascotY + size };
      const score = (candidate: typeof candidates[number]) => occupied.reduce((sum, r) => sum + overlap(candidate.left, candidate.top, r), 0) + overlap(candidate.left, candidate.top, mascot) * 3;
      const best = mobile && phone
        ? { left: mascotX + size + 8, top: mascotY + 3 }
        : candidates.reduce((best, candidate) => score(candidate) < score(best) ? candidate : best);
      const towardX = mascotX + size / 2 - (best.left + width / 2);
      const towardY = mascotY + size / 2 - (best.top + height / 2);
      bubble.dataset.tail = Math.abs(towardX) / width > Math.abs(towardY) / height
        ? (towardX < 0 ? "left" : "right") : (towardY < 0 ? "top" : "bottom");
      bubble.style.setProperty("--tail-x", `${Math.max(14, Math.min(width - 14, mascotX + size / 2 - best.left))}px`);
      bubble.style.setProperty("--tail-y", `${Math.max(14, Math.min(height - 14, mascotY + size / 2 - best.top))}px`);
      stage.style.setProperty("--bubble-x", `${best.left - mascotX}px`);
      stage.style.setProperty("--bubble-y", `${best.top - mascotY}px`);
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(stage);
    observer.observe(target);
    const bubble = stage.querySelector<HTMLElement>(".sw-thought");
    if (bubble) observer.observe(bubble);
    window.addEventListener("resize", position);
    window.addEventListener("demo-fit", position);
    return () => { observer.disconnect(); window.removeEventListener("resize", position); window.removeEventListener("demo-fit", position); delete target.dataset.sproutTarget; };
  }, [index]);

  const dashboard = action.screen === "dashboard" || finished;
  const evv = action.screen === "evv";
  const resolveDispute = () => { setDisputed(true); setPlaying(false); setIndex(9); setShowContext(false); };

  return (
    <section className="rw sw hh" id={id} ref={root} aria-label="Bubbles home health revenue walkthrough">
      <header className="rw-header"><div><h2>{visitOnly ? "Clear Evelyn’s visit billing hold" : "Get Margaret’s $1,240 in overdue invoices paid"}</h2><p>Watch Bubbles work. Pause or advance at any time.</p></div>{tabs}</header>
      <ol ref={stepsRef} className="rw-steps" aria-label="Home health chapters">{activeChapters.map((chapter, n) => <li key={chapter}><button type="button" aria-pressed={action.chapter === n} onClick={() => jump(chapterStarts[n])}><span>{action.chapter > n ? <Glyph kind="check" /> : n + 1}</span>{chapter}</button></li>)}</ol>
      <div ref={world} data-action={index} data-click={[2,3,4,6,11,13,16,19].includes(index)} className={`sw-world ${calling ? "sw-world--calling" : ""} ${running ? "sw-world--running" : ""}`}>
        <div className="sw-computer">
          <div className="sw-windowbar"><div className="sw-windowdots" aria-hidden="true"><i /><i /><i /></div><span>{evv ? "HHAeXchange / Visit exception" : dashboard ? "HHAeXchange / Revenue operations" : "HHAeXchange / Billing record"}</span><span className="sw-sandbox">Demo data</span></div>
          <div className="sw-appbar"><strong>HHAeXchange</strong><nav aria-label="Simulated workspace"><span>Patients</span><b>{evv ? "Visit maintenance" : "Revenue operations"}</b></nav><span className="sw-user">Demo data</span></div>
          <div className="sw-desktop">
            <nav className="sw-apprail hh-rail" aria-label="HHAeXchange demo navigation">
              <button type="button" className={dashboard ? "selected" : ""} onClick={() => jump(firstIndex)} aria-label="Open worklist"><span aria-hidden="true">▤</span><small>Worklist</small></button>
              {!visitOnly && <button type="button" className={!dashboard && !evv ? "selected" : ""} onClick={() => jump(3)} aria-label="Open Margaret’s record"><span aria-hidden="true">◎</span><small>Patient</small></button>}
              <button type="button" className={evv ? "selected" : ""} onClick={() => jump(17)} aria-label="Open visit exception"><span aria-hidden="true">▧</span><small>Visits</small></button>
            </nav>
            <div className="sw-appcontent hh-content">
            {dashboard ? <div className="sw-screen">
              <div className="sw-page-title"><div><small>Billing / Revenue worklist</small><h3>{finished ? "Verified outcomes" : "Revenue worklist"}</h3></div><span className="hh-live">{finished ? "Updated just now" : "Working"}</span></div>
              <div className="hh-metrics">{!visitOnly && <><div><small>Overdue private pay</small><strong>{paid ? "$0" : "$1,240"}</strong></div><div><small>Recovered · verified</small><strong>{paid ? "$1,240" : "$0"}</strong></div></>}<div><small>EVV billing holds</small><strong>{visitResolved ? "0 visits" : "1 visit"}</strong></div></div>
              <div className="hh-cases">
                <div className="hh-listhead"><span>Patient</span><span>Work item</span><span>Amount</span><span>Status</span></div>
                {!visitOnly && <button type="button" className="hh-case" onClick={() => jump(paid ? 15 : 3)}><span className="hh-person"><b className="sw-initial">MT</b><strong>Margaret Thompson</strong></span><span>{paid ? "2 invoices paid" : "2 unpaid invoices"}</span><strong>{paid ? "$0.00" : "$1,240.00"}</strong><span className={`hh-status ${paid ? "is-done" : ""}`}>{paid ? "Resolved" : index === 0 ? "New" : "In progress"}<Glyph kind="next" /></span></button>}
                <button type="button" className="hh-case" onClick={() => jump(17)}><span className="hh-person"><b className="sw-initial">EB</b><strong>Evelyn Brooks</strong></span><span>{visitResolved ? "Clock-out corrected" : "Missing clock-out"}</span><span>{visitResolved ? "Hold cleared" : "Billing hold"}</span><span className={`hh-status ${visitResolved ? "is-done" : ""}`}>{visitResolved ? "Resolved" : "New"}<Glyph kind="next" /></span></button>
              </div>
              {finished ? <div className="hh-outcomes"><strong>{visitOnly ? "Visit corrected. Billing hold cleared." : "$1,240 paid. Visit correction verified."}</strong><p>{visitOnly ? "Bubbles saved the documented clock-out correction and verified that the visit system cleared the billing hold." : "Bubbles verified the posted payment, saved the documented clock-out correction, and confirmed that the billing hold cleared."}</p><span>{visitOnly ? "Case closed. Hold clearance is not counted as collected revenue." : "Both cases closed. Hold clearance is not counted as collected revenue."}</span></div> : <div className="hh-activity"><span className="sw-note-dot" /><p>{index >= 16 ? "Bubbles verified the payment and closed the collection case. Next: inspect the visit exception." : index >= 2 ? "Bubbles checked the invoices and contact permissions. Next: reach Daniel about the unpaid balance." : "Bubbles found the overdue balance and a visit that cannot move to billing."}</p></div>}
            </div> : evv ? <div className="sw-screen">
              <div className="sw-page-title"><div><small>Call Dashboard / Missed Out</small><h3>{visitResolved ? "Visit corrected, billing hold cleared" : "A delivered visit, held from billing"}</h3></div><span className={`hh-status ${visitResolved ? "is-done" : ""}`}>{visitResolved ? "Resolved" : "Open exception"}</span></div>
              <div className="hh-evv-details"><div><small>Client</small><strong>Evelyn Brooks</strong></div><div><small>Caregiver</small><strong>Rosa Martinez</strong></div><div><small>Scheduled · Aug 18</small><strong>9:00 am–1:00 pm</strong></div><div><small>Authorization on file</small><strong>4 hours · Active</strong></div><div><small>Recorded clock-in</small><strong>9:02 am</strong></div><div className="hh-missing"><small>Recorded clock-out</small><strong>{visitResolved ? "1:00 pm · Corrected" : "Missing"}</strong></div></div>
              {index === 17 ? <div className="hh-explanation"><strong>The end time was never recorded.</strong><p>Bubbles collects the visit, caregiver, and authorization details. The scheduled end time is not evidence of when care ended.</p><button type="button" className="hh-action" onClick={() => jump(18)}>Contact Rosa <Glyph kind="phone" /></button></div> : <div className="hh-evidence"><small>Caregiver follow-up · Simulated call</small><p><b>Bubbles:</b> “Hi Rosa. Are you safely parked and available to talk about Evelyn’s visit?”</p><p><b>Rosa:</b> “Yes. I left at 1:00 pm, but missed the clock-out. I’ll send the signed visit record.”</p><span><Glyph kind="check" /> Supporting visit record received in this example</span></div>}
              {index >= 19 && <div className="hh-review"><strong>Correction saved · System checks passed</strong><p>End time: 1:00 pm. Bubbles matched the signed visit record to the authorization, applied the preapproved missed-clock-out correction, and saved the source and reason. The system rechecked the visit and cleared the billing hold.</p><span>Verified in the visit record · Billing hold cleared</span></div>}
              <p className="hh-scope">Illustrative workflow. HHAeXchange remains the visit system of record.</p>
            </div> : <div className="sw-screen">
              <div className="sw-patientbanner"><b className="sw-initial">MT</b><div><strong>Margaret Thompson</strong><small>Private pay · Daniel Thompson, authorized son</small></div><span className={paid ? "sw-paid" : "sw-balance"}>{paid ? "$0 balance" : "$1,240 overdue"}</span></div>
              <div className="sw-recordtabs hh-recordtabs"><button type="button" aria-pressed={action.screen === "account" || index === 8} onClick={() => jump(3)}>Invoices</button><button type="button" aria-pressed={action.screen === "outreach" || action.screen === "note" || (calling && index !== 8)} onClick={() => jump(4)}>Contact history</button><button type="button" aria-pressed={action.screen === "ledger"} onClick={() => jump(15)}>Payments</button></div>
              <div className="sw-accounttotals"><div><small>Patient balance</small><strong>{paid ? "$0.00" : "$1,240.00"}</strong></div><div><small>Unpaid invoices</small><strong>{paid ? "0" : "2"}</strong></div><div><small>Status</small><span>{paid ? "Paid in full" : index >= 13 ? "Awaiting payment" : "Outstanding"}</span></div></div>
              {(index === 3 || index === 7 || index === 8 || (disputed && index === 10)) && <div className="hh-invoices"><div><span>Invoice</span><span>Dates of service</span><span>Amount</span></div><div><strong>PP-1041</strong><span>Aug 3–9</span><strong>$620</strong></div><div><strong>PP-1042</strong><span>Aug 10–16</span><strong>$620</strong></div></div>}
              {action.screen === "account" && <><div className="hh-explanation"><strong>Invoices sent. Manual follow-up unfinished.</strong><p>Daniel handles billing. Text first, then call between 5–7 pm. Contact permission is recorded.</p></div><button type="button" className="hh-action" onClick={() => jump(4)}>Text Daniel <Glyph kind="next" /></button></>}
              {action.screen === "outreach" && <><div className="hh-message"><small>Bubbles → Daniel · SMS · Day 1, 5:10 pm</small><p>Hi Daniel, this is Bubbles, your home care agency’s automated assistant. Margaret has two unpaid invoices totaling $1,240. Can I help with any questions before you pay?</p><span>Delivered</span></div>{index === 5 && <div className="hh-followup"><strong>Day 2 · No response</strong><p>The case stays active. Next approved action: call Daniel at 5:30 pm.</p><button type="button" className="hh-action" onClick={() => jump(6)}>Place follow-up call <Glyph kind="phone" /></button></div>}</>}
              {calling && <><div className="hh-guardrail"><small>Agency-approved boundaries</small><p>Check invoices and service records. Resolve questions before requesting payment.</p>{index >= 9 && !disputed && <button type="button" onClick={resolveDispute}>Try the dispute path <Glyph kind="next" /></button>}</div>{index >= 10 && <div className="hh-payment-path"><strong>Agency’s existing payment link</strong><span>{index >= 11 ? "Sent by SMS · Delivered" : "Retrieved from the connected billing record"}</span><small>Payment goes directly to the agency.</small></div>}</>}
              {action.screen === "note" && <div className="sw-note"><div><span className="sw-note-dot" /> Case note <small>Saved</small></div><p><Typed text={disputed ? "Resolved Daniel’s duplicate-charge concern by matching both invoices to distinct weeks of visit records. Daniel confirmed the explanation. Sent the agency’s payment link; check for a posted payment tomorrow and follow up if unpaid." : "Answered Daniel’s service-date question from invoices PP-1041 and PP-1042. Sent the agency’s existing payment link. Daniel plans to pay tonight. Check for a posted payment tomorrow; follow up if still unpaid."} /></p><div className="sw-note-reminder"><Glyph kind="check" /> Next payment check scheduled</div></div>}
              {action.screen === "ledger" && <div className="hh-posting"><div><small>Existing billing system · Day 3</small><span className={`hh-status ${paid ? "is-done" : ""}`}>{paid ? "Posted" : "Processing"}</span></div><strong>$1,240.00</strong><p>{paid ? "Payment applied to PP-1041 and PP-1042." : "A payment has been initiated. It is not posted to the account yet."}</p><div className="hh-balance"><span>Remaining balance</span><b>{paid ? "$0.00" : "$1,240.00"}</b></div><span>{paid ? "Bubbles verified the record and marked the case resolved." : "Case remains open until the billing record confirms payment."}</span></div>}
            </div>}
            </div>
          </div>
          <div className="sw-systemstatus"><span><i />{paid ? "Private-pay recovery verified" : "Demo records · Fictional people and agency"}</span><span>{index >= 14 ? "Day 3" : index >= 5 ? "Day 2" : "Day 1"}</span></div>
        </div>
        {calling && <div className={`sw-phone ${index === 6 ? "sw-phone--ringing" : ""}`}><div className="sw-phone-top"><span><i /> Simulated call</span><span>{index === 6 ? "Connecting…" : "Connected"}</span></div><div className="sw-call-person"><span className="sw-call-avatar">D</span><div><strong>Daniel Thompson</strong><span>Margaret’s son · Billing contact</span></div><Glyph kind="phone" /></div><div className="sw-wave" aria-hidden="true">{Array.from({length:23},(_,n)=><i key={n} style={{"--bar":`${10+((n*17)%30)}px`,"--delay":`${n*-.11}s`} as CSSProperties}/>)}</div><div className="sw-dialogue" key={`${index}-${disputed}`} aria-live="polite" aria-atomic="true"><span>{(disputed ? disputeDialogue[index] ?? dialogue[index] : dialogue[index])?.name} says</span><p><Typed text={(disputed ? disputeDialogue[index] ?? dialogue[index] : dialogue[index])?.words ?? ""}/></p></div><div className="sw-callfooter"><span>Captioned conversation</span><span className="sw-phone-end"><Glyph kind="phone"/></span></div></div>}
        <button type="button" className={`sw-sprout hh-mira ${finished ? "sw-sprout--celebrate" : ""}`} aria-label="Bubbles: explain this action" aria-expanded={showContext} aria-controls={contextId} onClick={()=>{setShowContext(!showContext);setPlaying(false);}}><span className="sw-thought" key={`thought-${index}`}>{action.thought}</span><span className="sw-sprout-body" key={`mira-${index}`}><Image src="/avatars/bubbles.png" alt="" width={100} height={100} sizes="100px" /></span></button>
        <span className="sw-pointer" aria-hidden="true"><svg width="22" height="26" viewBox="0 0 22 26"><path d="M2 2v19l5-5 4 8 4-2-4-8h8Z" fill="#315f3d" stroke="white" strokeWidth="1.5"/></svg><i key={index}/></span>
        {showContext && <div className="sw-context" id={contextId}><div><strong>Behind this move</strong><button type="button" aria-label="Close Bubbles’s explanation" onClick={()=>setShowContext(false)}>×</button></div><p>{visitOnly ? (finished ? "Bubbles verified the documented correction and confirmed the billing hold cleared. This fictional example shows a visit ready for billing, not a collected payment." : context[2]) : context[action.chapter]}</p></div>}
      </div>
      <div className="sw-director"><div className="sw-captionline"><span className={`sw-live-dot ${running ? "is-running" : ""}`}/><p aria-live="polite" aria-atomic="true">{action.title}</p><span className="sw-actioncount">{String(index-firstIndex+1).padStart(2,"0")} / {actions.length-firstIndex}</span></div><div className="sw-controls"><button type="button" className="sw-play" onClick={()=>{if(finished){setIndex(firstIndex);setDisputed(false);}setPlaying(!running);setShowContext(false);}}><Glyph kind={running?"pause":finished?"restart":"play"}/>{running?"Pause":finished?"Replay":"Play"}</button><input className="sw-mobile-scrub" type="range" min={firstIndex} max={actions.length-1} value={index} onChange={e=>jump(Number(e.target.value))} aria-label="Action timeline" aria-valuetext={`Action ${index-firstIndex+1} of ${actions.length-firstIndex}: ${action.title}`}/><div className="sw-progress" aria-label="Choose an action">{storyActions.slice(firstIndex).map((item,offset)=>{const n = offset + firstIndex; return <button key={n} type="button" className={`${n<=index?"is-done":""} ${n===index?"is-current":""}`} aria-label={`Action ${offset+1}: ${item.title}`} aria-current={index===n?"step":undefined} onClick={()=>jump(n)}><span/></button>;})}</div><button type="button" className="sw-speed" onClick={()=>setSpeed(speed===1?1.5:1)} aria-label={`Playback speed ${speed} times. Change speed.`}>{speed}×</button><button type="button" className="sw-back" onClick={()=>jump(Math.max(firstIndex,index-1))} disabled={index===firstIndex} aria-label="Previous action"><Glyph kind="back"/></button><button type="button" className="sw-next" onClick={advance} aria-label={action.next}><span className="sw-next-full">{action.next}</span><span className="sw-next-short" aria-hidden="true">{finished?"Start over":"Next action"}</span><Glyph kind={finished?"restart":"next"}/></button></div></div>
    </section>
  );
}
