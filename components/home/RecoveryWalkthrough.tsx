"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { VerticalStory } from "@/lib/content/positioning";
import "./RecoveryWalkthrough.css";

const chapters = ["Find the work", "Understand it", "Talk to Maya", "Close the loop"];
const starts = [0, 3, 6, 14];
const actions = [
  { chapter: 0, title: "A balance that needs a little follow-through.", next: "Find Maya", screen: "queue", x: 72, y: 58, mx: 67, my: 61, duration: 3000, thought: "Let’s find the unfinished work." },
  { chapter: 0, title: "Maya’s $186 balance has been waiting for 74 days.", next: "Open account", screen: "queue", x: 40, y: 48, mx: 48, my: 49, duration: 2700, thought: "This one needs a closer look." },
  { chapter: 0, title: "Three reminders. No reply. I’ll check the source record.", next: "Read statement", screen: "account", x: 36, y: 31, mx: 43, my: 34, duration: 3200, thought: "What’s behind the balance?" },
  { chapter: 1, title: "Opening Maya’s statement in ModMed.", next: "Check deductible", screen: "statement", x: 74, y: 32, mx: 69, my: 35, duration: 2400, thought: "Reading the statement…" },
  { chapter: 1, title: "$186 applied to her deductible. Insurance paid $0.", next: "Check contact permission", screen: "statement", x: 74, y: 64, mx: 70, my: 62, duration: 3600, thought: "Found it. Her deductible." },
  { chapter: 1, title: "Calls permitted. It’s within Maya’s preferred contact window.", next: "Call Maya", screen: "account", x: 69, y: 66, mx: 67, my: 62, duration: 3100, thought: "Okay to call. Let’s talk." },
  { chapter: 2, title: "Calling Maya in this simulated conversation.", next: "Maya answers", screen: "call", x: 51, y: 56, mx: 12, my: 49, duration: 3200, thought: "Hello, Maya?" },
  { chapter: 2, title: "Maya explains what the reminders couldn’t tell me.", next: "Explain the statement", screen: "call", x: 50, y: 60, mx: 12, my: 51, duration: 4400, thought: "Listening…" },
  { chapter: 2, title: "I explain what the statement actually says.", next: "Hear Maya’s response", screen: "call", x: 38, y: 49, mx: 12, my: 51, duration: 5400, thought: "No jargon. Just the facts." },
  { chapter: 2, title: "Now the real blocker: timing, not understanding.", next: "Check approved terms", screen: "call", x: 50, y: 61, mx: 12, my: 51, duration: 3800, thought: "Let me check what’s allowed." },
  { chapter: 2, title: "The practice allows two installments, two weeks apart.", next: "Offer the plan", screen: "call", x: 34, y: 67, mx: 65, my: 28, duration: 3300, thought: "Two payments. Within your rules." },
  { chapter: 2, title: "An approved option Maya can act on.", next: "Confirm with Maya", screen: "call", x: 51, y: 57, mx: 12, my: 51, duration: 4500, thought: "Here’s what we can do." },
  { chapter: 2, title: "Maya agrees. I’ll record the plan and schedule follow-up.", next: "Save the plan", screen: "call", x: 51, y: 60, mx: 12, my: 51, duration: 3500, thought: "We have a plan!" },
  { chapter: 2, title: "Plan saved in ModMed. Follow-up scheduled for the second payment.", next: "Check first payment", screen: "note", x: 73, y: 69, mx: 69, my: 66, duration: 3500, thought: "Writing it back to the record." },
  { chapter: 3, title: "Day 2. The first $93 has posted. $93 still to go.", next: "Check second payment", screen: "ledger", x: 72, y: 48, mx: 69, my: 49, duration: 3500, thought: "One down. Still following through." },
  { chapter: 3, title: "Day 16. The second $93 has posted. Balance: zero.", next: "Close the recovery", screen: "ledger", x: 72, y: 58, mx: 69, my: 59, duration: 3500, thought: "Both payments verified." },
  { chapter: 3, title: "$186 recovered. Receipt sent. Recovery recorded in ModMed.", next: "Start over", screen: "complete", x: 71, y: 60, mx: 68, my: 66, duration: 3500, thought: "Finished and verified!" },
] as const;
const targets = [
  ".sw-filter > button", "button.sw-patientrow > span:first-child", ".sw-recordtabs button:nth-child(2)",
  ".sw-paper-title > strong", ".sw-deductible", ".sw-calllaunch", ".sw-phone-top",
  ".sw-call-person", ".sw-dialogue", ".sw-call-person", ".sw-approved",
  ".sw-dialogue", ".sw-call-person", ".sw-note", ".sw-payment:nth-child(2)",
  ".sw-payment:nth-child(3)", ".sw-success",
];
const dialogue: Record<number, { name: string; words: string }> = {
  6: { name: "Sprout", words: "Hi Maya, I’m Sprout, the practice’s automated assistant. Is now a good time to talk about your balance?" },
  7: { name: "Maya", words: "Yes, but… I thought my insurance covered that visit?" },
  8: { name: "Sprout", words: "Your insurance processed the claim. The remaining $186 was applied to your deductible, so that amount is your responsibility." },
  9: { name: "Maya", words: "Oh, okay. Could I split that into two payments?" },
  10: { name: "Sprout", words: "Let me check the payment options the practice has approved." },
  11: { name: "Sprout", words: "We can do $93 now and $93 in two weeks. Would that work for you?" },
  12: { name: "Maya", words: "Yes, that works. Thank you for explaining it!" },
};
const context = [
  "The practice defines the eligible queue. Sprout checks the balance, account history, and source records before contacting anyone.",
  "This fictional statement shows $598 billed, a $412 adjustment, and $186 applied to deductible. Sprout explains the recorded reason; it does not decide coverage.",
  "This conversation is simulated. Sprout uses approved terms, contact permission, and contact windows. Exceptions go to the team with their history.",
  "Time advances in this example. A promise does not count as payment: both installments must post in the ledger. This illustrates a successful recovery, not a guaranteed outcome.",
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

export default function RecoveryWalkthrough({ tabs, id }: { tabs?: ReactNode; id?: string; story: VerticalStory }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [showContext, setShowContext] = useState(false);
  const [speed, setSpeed] = useState(1);
  const root = useRef<HTMLElement>(null);
  const contextId = useId();
  const world = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const action = actions[index];
  const finished = index === actions.length - 1;
  const running = playing;
  const calling = action.screen === "call";
  const paid = index >= 15;
  const jump = (next: number) => { setIndex(next); setPlaying(false); setShowContext(false); };
  const focusStage = () => {
    requestAnimationFrame(() => {
      const target = window.matchMedia("(min-width: 701px)").matches ? root.current?.parentElement : world.current;
      target?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  };
  const advance = () => { jump(finished ? 0 : index + 1); focusStage(); };

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setIndex(n => (n + 1) % actions.length), action.duration / speed);
    return () => window.clearTimeout(timer);
  }, [index, running, action.duration, speed]);

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

  return (
    <section className="rw sw" id={id} ref={root} aria-label="Sprout interactive recovery simulation">
      <header className="rw-header"><div><h2>Get Maya’s 74-day-old balance explained and paid</h2><p>Watch Sprout work. Pause or advance at any time.</p></div>{tabs}</header>
      <ol ref={stepsRef} className="rw-steps" aria-label="Recovery chapters">{chapters.map((chapter, n) => <li key={chapter}><button type="button" aria-pressed={action.chapter === n} onClick={() => jump(starts[n])}><span>{action.chapter > n ? <Glyph kind="check" /> : n + 1}</span>{chapter}</button></li>)}</ol>
      <div ref={world} data-action={index} data-click={[1, 2, 5, 6, 13, 16].includes(index)} className={`sw-world ${calling ? "sw-world--calling" : ""} ${running ? "sw-world--running" : ""}`}>
        <div className="sw-computer">
          <div className="sw-windowbar"><div className="sw-windowdots" aria-hidden="true"><i /><i /><i /></div><span>ModMed / Patient Financials</span><span className="sw-sandbox">Demo workspace</span></div>
          <div className="sw-appbar"><strong>ModMed</strong><nav aria-label="Simulated application"><span>Patients</span><span>Scheduling</span><b>Financials</b></nav><span className="sw-user">PL</span></div>
          <div className="sw-desktop">
            <aside className="sw-apprail" aria-hidden="true"><span className={action.screen === "queue" ? "selected" : ""}>▤<small>Worklist</small></span><span className={action.screen !== "queue" ? "selected" : ""}>◎<small>Patient</small></span><span>▧<small>Reports</small></span></aside>
            <div className="sw-appcontent">
              {action.screen === "queue" ? <div className="sw-screen" key="queue">
                <div className="sw-page-title"><div><small>Financials / Recovery</small><h3>Patient balance worklist</h3></div><span className="sw-counter">3 accounts</span></div>
                <div className="sw-filter"><button type="button" onClick={() => jump(1)}>Outstanding balances</button><span>Contact permitted <Glyph kind="check" /></span></div>
                <div className="sw-worklist"><div className="sw-listhead"><span>Patient</span><span>Age</span><span>Balance</span><span>Last activity</span></div>
                  <button type="button" className={`sw-patientrow ${index === 1 ? "sw-target" : ""}`} onClick={() => jump(index === 0 ? 1 : 2)}><span><b className="sw-initial">MR</b><strong>Maya R.</strong></span><span>74 days</span><strong>$186.00</strong><span>3 reminders · No reply <Glyph kind="next" /></span></button>
                  <div className="sw-patientrow sw-mutedrow"><span><b className="sw-initial">JL</b>Jordan L.</span><span>32 days</span><span>$72.00</span><span>Follow-up scheduled</span></div>
                  <div className="sw-patientrow sw-mutedrow"><span><b className="sw-initial">AT</b>Alex T.</span><span>18 days</span><span>$240.00</span><span>Payment pending</span></div>
                </div><p className="sw-record-foot">Eligible queue · Approved outreach only</p>
              </div> : <div className="sw-screen" key="patient">
                <div className="sw-patientbanner"><b className="sw-initial">MR</b><div><strong>Maya R.</strong><small>DEMO-0186</small></div><span className={paid ? "sw-paid" : "sw-balance"}>{paid ? "Paid in full" : "$186 patient balance"}</span></div>
                <div className="sw-recordtabs"><button type="button" aria-pressed={action.screen !== "statement"} onClick={() => jump(2)}>Overview</button><button className={index === 2 ? "sw-target" : ""} type="button" aria-pressed={action.screen === "statement"} onClick={() => jump(3)}>Statement</button><span>Contact history</span></div>
                {action.screen === "statement" ? <div className="sw-statement" key="statement"><div className="sw-paper-title"><strong>Patient statement</strong><span>Service date · March 3</span></div><div className="sw-statementline"><span>Charges</span><strong>$598.00</strong></div><div className="sw-statementline"><span>Insurance adjustment</span><strong>−$412.00</strong></div><div className="sw-statementline"><span>Insurance paid</span><strong>$0.00</strong></div><button type="button" className={`sw-statementline sw-deductible ${index === 4 ? "sw-target" : ""}`} onClick={() => jump(index === 3 ? 4 : 5)}><span>Applied to deductible</span><strong>$186.00</strong></button><div className={`sw-found ${index >= 4 ? "is-visible" : ""}`}><Glyph kind="check" /> Claim processed. Remaining amount is patient responsibility.</div></div>
                : <>
                  <div className="sw-accounttotals"><div><small>Patient balance</small><strong key={index >= 14 ? index : "unpaid"}>{paid ? "$0.00" : index === 14 ? "$93.00" : "$186.00"}</strong></div><div><small>Insurance balance</small><strong>$0.00</strong></div><div><small>Status</small><span>{paid ? "Paid in full" : index >= 13 ? "Payment plan" : "Outstanding"}</span></div></div>
                  {index < 13 ? <>
                    <div className="sw-accountalert"><span>!</span><div><strong>74 days outstanding</strong><p>Three reminders sent. No response recorded.</p></div></div>
                    <div className={`sw-permissions ${index === 5 ? "sw-target" : ""}`}><span><Glyph kind="check" /> Calls permitted</span><span><Glyph kind="check" /> Preferred window: 5–7 pm</span></div>
                    {index >= 5 && index < 10 && <button className="sw-calllaunch" type="button" onClick={() => jump(6)} disabled={calling}><Glyph kind="phone" />{calling ? "Call in progress" : "Call Maya"}</button>}
                    {index >= 10 && <div className={`sw-approved ${index === 10 ? "sw-target" : ""}`}><small>Practice-approved terms</small><strong>2 payments × $93</strong><span>Two weeks apart · No added fee</span><Glyph kind="check" /></div>}
                  </> : index === 13 ? <div className="sw-note"><div><span className="sw-note-dot" /> Account note <small>Saved</small></div><p><Typed key="note" text="Spoke with Maya. Explained deductible. Patient agreed to two $93 installments, two weeks apart. Follow-up scheduled before the second payment." /></p><div className="sw-note-reminder"><Glyph kind="check" /> Payment follow-up scheduled</div></div>
                  : <div className="sw-ledger"><div className="sw-ledgerhead"><strong>Posted payments</strong><span className="sw-timejump">{index === 14 ? "Day 2" : "Day 16"}</span></div><div className={`sw-payment ${index === 14 ? "sw-target" : ""}`}><span>Day 2</span><strong>$93.00</strong><span><Glyph kind="check" /> Posted</span></div><div className={`sw-payment ${index === 15 ? "sw-target" : ""} ${index < 15 ? "sw-pending" : ""}`}><span>Day 16</span><strong>$93.00</strong><span>{index < 15 ? "Scheduled" : <><Glyph kind="check" /> Posted</>}</span></div>{finished && <div className="sw-success"><span className="sw-success-check"><Glyph kind="check" /></span><div><strong>$186 recovered.</strong><p>Ledger verified. Receipt sent. Job closed.</p></div><span className="sw-confetti" aria-hidden="true">✦</span></div>}</div>}
                </>}
              </div>}
            </div>
          </div>
          <div className="sw-systemstatus"><span><i />{index === 13 ? "Account note saved" : finished ? "Recovery complete" : "All changes recorded in the demo"}</span><span>{index >= 14 ? `Day ${index === 14 ? "2" : "16"}` : "Day 1 · 6:05 pm"}</span></div>
        </div>
        {calling && <div className={`sw-phone ${index === 6 ? "sw-phone--ringing" : ""}`}>
          <div className="sw-phone-top"><span><i /> Simulated call</span><span>{index === 6 ? "Connecting…" : "Connected"}</span></div>
          <div className="sw-call-person"><span className="sw-call-avatar">M</span><div><strong>Maya R.</strong><span>Patient · Outbound call</span></div><Glyph kind="phone" /></div>
          <div className={`sw-wave ${dialogue[index]?.name === "Maya" ? "sw-wave--maya" : ""}`} aria-hidden="true">{Array.from({ length: 23 }, (_, n) => <i key={n} style={{ "--bar": `${10 + ((n * 17) % 30)}px`, "--delay": `${n * -0.11}s` } as CSSProperties} />)}</div>
          <div className="sw-dialogue" key={index} aria-live="polite" aria-atomic="true"><span>{dialogue[index]?.name === "Sprout" ? "Sprout says" : "Maya says"}</span><p><Typed text={dialogue[index]?.words ?? ""} /></p></div>
          <div className="sw-callfooter"><span>Captioned conversation</span><span className="sw-phone-end"><Glyph kind="phone" /></span></div>
        </div>}
        <button type="button" className={`sw-sprout ${finished ? "sw-sprout--celebrate" : ""}`} aria-label="Sprout: explain this action" aria-expanded={showContext} aria-controls={contextId} onClick={() => { setShowContext(!showContext); setPlaying(false); }}>
          <span className="sw-thought" key={`thought-${index}`}>{action.thought}</span>
          <span className="sw-sprout-body" key={`sprout-${index}`}><Image src="/avatars/sprout.png" alt="" width={100} height={100} sizes="100px" /></span>
        </button>
        <span className="sw-pointer" aria-hidden="true"><svg width="22" height="26" viewBox="0 0 22 26"><path d="M2 2v19l5-5 4 8 4-2-4-8h8Z" fill="#315f3d" stroke="white" strokeWidth="1.5" /></svg><i key={index} /></span>
        {showContext && <div className="sw-context" id={contextId}><div><strong>Behind this move</strong><button type="button" aria-label="Close Sprout’s explanation" onClick={() => setShowContext(false)}>×</button></div><p>{context[action.chapter]}</p></div>}
      </div>
      <div className="sw-director">
        <div className="sw-captionline"><span className={`sw-live-dot ${running ? "is-running" : ""}`} /><p aria-live="polite" aria-atomic="true">{action.title}</p><span className="sw-actioncount">{String(index + 1).padStart(2, "0")} / {actions.length}</span></div>
        <div className="sw-controls"><button type="button" className="sw-play" onClick={() => { if (finished) setIndex(0); setPlaying(!running); setShowContext(false); }}><Glyph kind={running ? "pause" : finished ? "restart" : "play"} />{running ? "Pause" : finished ? "Replay" : "Play"}</button><input className="sw-mobile-scrub" type="range" min={0} max={actions.length - 1} value={index} onChange={event => jump(Number(event.target.value))} aria-label="Action timeline" aria-valuetext={`Action ${index + 1} of ${actions.length}: ${action.title}`} /><div className="sw-progress" aria-label="Choose an action">{actions.map((item, n) => <button key={n} type="button" className={`${n <= index ? "is-done" : ""} ${n === index ? "is-current" : ""}`} aria-label={`Action ${n + 1}: ${item.title}`} aria-current={index === n ? "step" : undefined} onClick={() => jump(n)}><span /></button>)}</div><button type="button" className="sw-speed" onClick={() => setSpeed(speed === 1 ? 1.5 : 1)} aria-label={`Playback speed ${speed} times. Change speed.`}>{speed}×</button><button type="button" className="sw-back" onClick={() => jump(Math.max(0, index - 1))} disabled={index === 0} aria-label="Previous action"><Glyph kind="back" /></button><button type="button" className="sw-next" onClick={advance} aria-label={action.next}><span className="sw-next-full">{action.next}</span><span className="sw-next-short" aria-hidden="true">{finished ? "Start over" : "Next action"}</span><Glyph kind={finished ? "restart" : "next"} /></button></div>
      </div>
    </section>
  );
}
