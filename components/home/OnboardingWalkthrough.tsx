"use client";

import "./DemoChrome.css";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "./OnboardingWalkthrough.css";

const chapters = ["Find the blocker", "Request a correction", "Follow through", "Activate and verify"];
const chapterStarts = [0, 2, 5, 8];

const actions = [
  {
    chapter: 0,
    screen: "queue",
    title: "Jamie’s onboarding is blocked by one missing identity document.",
    thought: "I found the exact item holding this account.",
    next: "Open Jamie’s file",
    duration: 3400,
  },
  {
    chapter: 0,
    screen: "record",
    title: "The profile is complete. A government ID is still required.",
    thought: "One missing requirement. Everything else is ready.",
    next: "Draft the request",
    duration: 3600,
  },
  {
    chapter: 1,
    screen: "request",
    title: "A clear email asks for the missing document and explains how to send it.",
    thought: "The request says what is missing and what good looks like.",
    next: "Send the email",
    duration: 4300,
  },
  {
    chapter: 1,
    screen: "reply",
    title: "Jamie replies, but the ID photo is cropped and the expiration date is unreadable.",
    thought: "A reply arrived. The document still cannot be validated.",
    next: "Review the document",
    duration: 3900,
  },
  {
    chapter: 1,
    screen: "correction",
    title: "The correction names both problems: show all four corners and remove the glare.",
    thought: "Specific feedback makes the next attempt easier.",
    next: "Record the follow-up",
    duration: 4700,
  },
  {
    chapter: 2,
    screen: "promise",
    title: "Jamie promises a replacement tomorrow. The case stays open with a scheduled check.",
    thought: "A promise is a next step, not a completed requirement.",
    next: "Advance to tomorrow",
    duration: 3900,
  },
  {
    chapter: 2,
    screen: "waiting",
    title: "Next day, 10:00 AM. No replacement yet, so Fern sends the scheduled follow-up.",
    thought: "The promised check becomes a brief, useful reminder.",
    next: "Check for a reply",
    duration: 3600,
  },
  {
    chapter: 2,
    screen: "replacement",
    title: "A new image arrives with the full document visible and the expiration date clear.",
    thought: "The replacement is here. I’ll validate it before moving on.",
    next: "Validate the replacement",
    duration: 4300,
  },
  {
    chapter: 3,
    screen: "validation",
    title: "Name, expiration date, document edges, and profile details all pass validation.",
    thought: "The evidence now meets every onboarding rule.",
    next: "Activate the account",
    duration: 4700,
  },
  {
    chapter: 3,
    screen: "activation",
    title: "The account is activated, then read back from the workspace to confirm the status.",
    thought: "Activation is recorded. Now I’m verifying the source status.",
    next: "See the verified result",
    duration: 4100,
  },
  {
    chapter: 3,
    screen: "complete",
    title: "Jamie’s account is active and the required document is verified in the source record.",
    thought: "Onboarding complete, with the evidence and status verified.",
    next: "Replay walkthrough",
    duration: 5000,
  },
] as const;

type Screen = (typeof actions)[number]["screen"];

function Icon({ kind }: { kind: "back" | "check" | "clock" | "document" | "mail" | "next" | "pause" | "play" | "replay" }) {
  const paths = {
    back: "m15 5-7 7 7 7",
    check: "m5 12 4 4L19 6",
    clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    document: "M7 3h7l4 4v14H7V3Zm7 0v5h5M10 12h5M10 16h5",
    mail: "M3 6h18v12H3V6Zm1 1 8 6 8-6",
    next: "m9 5 7 7-7 7",
    pause: "M9 5v14M16 5v14",
    play: "m9 5 11 7-11 7Z",
    replay: "M4 10a8 8 0 1 1 1 8M4 4v6h6",
  };
  return <svg viewBox="0 0 24 24" fill={kind === "play" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

function RequirementList({ replacement = false }: { replacement?: boolean }) {
  return (
    <div className="ob-requirements" aria-label="Onboarding requirements">
      <div><span className="is-complete"><Icon kind="check" /></span><p><strong>Contact details</strong><small>Confirmed by applicant</small></p></div>
      <div><span className="is-complete"><Icon kind="check" /></span><p><strong>Service agreement</strong><small>Signed September 14</small></p></div>
      <div className={replacement ? "is-complete-row" : "is-missing-row"}><span className={replacement ? "is-complete" : "is-missing"}>{replacement ? <Icon kind="check" /> : "!"}</span><p><strong>Government ID</strong><small>{replacement ? "Validated September 16" : "Required before activation"}</small></p><b>{replacement ? "Verified" : "Missing"}</b></div>
    </div>
  );
}

function DocumentPreview({ valid = false }: { valid?: boolean }) {
  return (
    <div className={`ob-document ${valid ? "is-valid" : "is-invalid"}`}>
      <div className="ob-id-card" aria-label={valid ? "Complete identity document preview" : "Incomplete identity document preview"}>
        <span className="ob-id-photo">JL</span>
        <div><b>JAMIE LEE</b><i /><i /><i /></div>
        <small>EXP {valid ? "08/2030" : "••/••••"}</small>
        {!valid && <em>Glare</em>}
      </div>
      <div className="ob-document-status"><span>{valid ? <Icon kind="check" /> : "!"}</span><p><strong>{valid ? "Replacement passes visual checks" : "Needs a new image"}</strong><small>{valid ? "All four corners and expiration date are visible" : "Right edge is cropped · Expiration date obscured"}</small></p></div>
    </div>
  );
}

function EmailCard({ correction = false }: { correction?: boolean }) {
  return (
    <div className="ob-email-card">
      <div className="ob-email-meta"><span>To</span><strong>Jamie L. · jamie@example.test</strong><b>{correction ? "Correction requested" : "Sent"}</b></div>
      <div className="ob-email-subject">{correction ? "One more photo needed to finish your account" : "One document needed to finish your account"}</div>
      <div className="ob-email-body">
        <p>Hi Jamie,</p>
        {correction ? <><p>Thanks for sending your ID. Please upload a new photo that:</p><ul><li>shows all four corners of the document</li><li>has no glare over the expiration date</li></ul><p>We’ll review it as soon as it arrives.</p></> : <><p>We’re ready to complete your Cedarline account. Use the secure link below to upload a photo of your current government-issued ID.</p><p>Place it on a flat surface, show all four corners, and make sure the details are easy to read.</p></>}
        <div className="ob-upload-link"><Icon kind="document" /><span><strong>{correction ? "Upload replacement securely" : "Upload document securely"}</strong><small>cedarline.example.test/secure-upload</small></span><Icon kind="next" /></div>
      </div>
    </div>
  );
}

function WorkspaceScreen({ screen }: { screen: Screen }) {
  if (screen === "queue") return <div className="ob-screen ob-queue"><div className="ob-page-heading"><div><small>Operations / Onboarding</small><h3>Customer onboarding</h3></div><span>4 active</span></div><div className="ob-summary"><div><small>Needs review</small><strong>1</strong></div><div><small>Waiting on customer</small><strong>2</strong></div><div><small>Ready to activate</small><strong>1</strong></div></div><div className="ob-table"><div className="ob-table-head"><span>Customer</span><span>Stage</span><span>Blocker</span><span>Next action</span></div><div className="ob-table-row is-highlighted"><span><b>JL</b><strong>Jamie L.</strong></span><span>Documents</span><span className="ob-warning">Government ID missing</span><span>Request document <Icon kind="next" /></span></div><div className="ob-table-row is-muted"><span><b>SK</b>Sam K.</span><span>Review</span><span>—</span><span>Validate details</span></div></div></div>;

  if (screen === "request" || screen === "correction") return <div className="ob-screen"><div className="ob-page-heading"><div><small>Jamie L. / Communications</small><h3>{screen === "correction" ? "Request a specific correction" : "Request the missing document"}</h3></div><span className="ob-channel"><Icon kind="mail" /> Email</span></div><EmailCard correction={screen === "correction"} /></div>;

  if (screen === "reply" || screen === "replacement") return <div className="ob-screen"><div className="ob-page-heading"><div><small>Jamie L. / Documents</small><h3>{screen === "reply" ? "Review submitted ID" : "Review replacement ID"}</h3></div><span>{screen === "reply" ? "First submission" : "Replacement · 10:04 AM"}</span></div><DocumentPreview valid={screen === "replacement"} /></div>;

  if (screen === "promise" || screen === "waiting") return <div className="ob-screen"><div className="ob-page-heading"><div><small>Jamie L. / Follow-up</small><h3>Open onboarding task</h3></div><span className="ob-open-status">Open</span></div><div className="ob-thread"><div><span className="ob-avatar">JL</span><p><strong>Jamie L.</strong><small>“I’ll take another photo tonight and send it tomorrow morning.”</small></p><time>Sep 15 · 4:18 PM</time></div><div className="ob-followup"><Icon kind="clock" /><p><small>Promised follow-up</small><strong>Check for replacement ID</strong><span>September 16 · 10:00 AM</span></p><b>{screen === "waiting" ? "Completed" : "Scheduled"}</b></div>{screen === "waiting" && <><div className="ob-time-jump"><span>Next day</span><strong>September 16 · 10:00 AM</strong><small>No valid replacement recorded yet</small></div><div className="ob-reminder-sent"><Icon kind="mail" /><p><strong>Follow-up sent</strong><small>Good morning, Jamie. Your secure upload link is still ready when you are.</small></p><time>10:01 AM</time></div></>}</div></div>;

  if (screen === "validation") return <div className="ob-screen"><div className="ob-page-heading"><div><small>Jamie L. / Validation</small><h3>Validate replacement</h3></div><span className="ob-pass"><Icon kind="check" /> All checks pass</span></div><div className="ob-validation"><DocumentPreview valid /><div className="ob-checklist"><div><Icon kind="check" /><span><strong>Name matches profile</strong><small>Jamie Lee</small></span></div><div><Icon kind="check" /><span><strong>Document is current</strong><small>Expires August 2030</small></span></div><div><Icon kind="check" /><span><strong>Image is complete</strong><small>Four edges visible, no glare</small></span></div><div><Icon kind="check" /><span><strong>Requirement updated</strong><small>Government ID · verified</small></span></div></div></div></div>;

  if (screen === "activation" || screen === "complete") return <div className="ob-screen"><div className="ob-page-heading"><div><small>Jamie L. / Account</small><h3>Account status</h3></div><span className="ob-demo-label">Demo record</span></div><div className={`ob-activation ${screen === "complete" ? "is-complete" : ""}`}><div className="ob-account-person"><span>JL</span><p><strong>Jamie Lee</strong><small>CED-DEMO-1042</small></p><b>Active</b></div><RequirementList replacement /><div className="ob-verified"><span><Icon kind="check" /></span><p><strong>{screen === "complete" ? "Onboarding complete" : "Activation verified"}</strong><small>Status read back from Cedarline workspace · Active · September 16, 10:07 AM</small></p></div></div></div>;

  return <div className="ob-screen"><div className="ob-page-heading"><div><small>Jamie L. / Overview</small><h3>Onboarding requirements</h3></div><span className="ob-open-status">Blocked</span></div><div className="ob-profile"><div className="ob-account-person"><span>JL</span><p><strong>Jamie Lee</strong><small>jamie@example.test · CED-DEMO-1042</small></p><b>Pending</b></div><RequirementList /></div></div>;
}

export default function OnboardingWalkthrough({ id, tabs }: { id?: string; tabs?: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const root = useRef<HTMLElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const chapterRail = useRef<HTMLOListElement>(null);
  const action = actions[index];
  const finished = index === actions.length - 1;
  const running = playing;

  const jump = (nextIndex: number) => {
    setIndex(nextIndex);
    setPlaying(false);
  };

  const focusStage = () => {
    requestAnimationFrame(() => {
      const target = window.matchMedia("(min-width: 701px)").matches ? root.current?.parentElement : world.current;
      target?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  };

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % actions.length), finished ? Math.max(action.duration, 4000) : action.duration);
    return () => window.clearTimeout(timer);
  }, [action.duration, finished, index, running]);

  useEffect(() => {
    const rail = chapterRail.current;
    const active = rail?.children[action.chapter] as HTMLElement | undefined;
    if (!rail || !active) return;
    rail.scrollTo({ left: active.offsetLeft - (rail.clientWidth - active.offsetWidth) / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [action.chapter]);

  const advance = () => {
    if (finished) {
      setIndex(0);
      setPlaying(true);
      focusStage();
      return;
    }
    jump(index + 1);
    focusStage();
  };

  const handlePlayback = () => {
    if (finished && !running) {
      setIndex(0);
      setPlaying(true);
      focusStage();
      return;
    }
    if (!running) focusStage();
    setPlaying(current => !current);
  };

  return (
    <section className="sw ob" id={id} ref={root} aria-label="Interactive customer onboarding walkthrough">
      <header className="demo-header"><div className="demo-header-copy"><h2>Turn one missing document into an activated account</h2><p>Verify the missing document, follow up on the correction, then confirm activation.</p><div className="sw-workflow-meta"><span>Cedarline</span><span>Email</span><span>Document review</span><span>2 days</span></div></div>{tabs && <div className="ob-tabs">{tabs}</div>}</header>
      <ol className="demo-chapters" ref={chapterRail} aria-label="Onboarding chapters">{chapters.map((chapter, chapterIndex) => <li key={chapter}><button type="button" aria-pressed={action.chapter === chapterIndex} onClick={() => jump(chapterStarts[chapterIndex])}><span>{action.chapter > chapterIndex ? <Icon kind="check" /> : chapterIndex + 1}</span>{chapter}</button></li>)}</ol>
      <div ref={world} className={`ob-world ${running ? "is-playing" : ""}`}>
        <div className="ob-window">
          <div className="ob-windowbar"><div aria-hidden="true"><i /><i /><i /></div><span>Cedarline / Customer Operations</span><span className="ob-workspace-label">Demo workspace</span></div>
          <div className="ob-appbar"><strong>Cedarline</strong><nav aria-label="Simulated application navigation"><span>Customers</span><b>Onboarding</b><span>Tasks</span><span>Reports</span></nav><i>OP</i></div>
          <div className="ob-desktop">
            <aside className="ob-sidebar" aria-hidden="true"><span className="is-selected">▤<small>Queue</small></span><span>◎<small>People</small></span><span>✓<small>Checks</small></span></aside>
            <div className="ob-content" key={`${action.screen}-${index}`}><WorkspaceScreen screen={action.screen} /></div>
            <aside className="ob-annotation" aria-label="Assistant activity"><div className="ob-agent"><span>F</span><p><strong>Fern</strong><small>Onboarding assistant</small></p><i className={running ? "is-live" : ""} /></div><p>{action.thought}</p><div className="ob-evidence"><small>Current evidence</small><span><Icon kind={action.screen === "request" || action.screen === "correction" ? "mail" : "document"} />{index < 3 ? "Onboarding record" : index < 7 ? "Email thread + task" : "Replacement ID + record"}</span></div><div className="ob-guardrail"><strong>Case rule</strong><p>{index < 5 ? "Activation stays blocked until the required document passes review." : index < 8 ? "A promised reply keeps the case open until evidence arrives." : "Activation counts only after the source status is read back and verified."}</p></div></aside>
          </div>
          <div className="ob-statusbar"><span><i /> Fictional workspace · No live customer data</span><b>{finished ? "Account active · Verified" : `Case CED-DEMO-1042 · ${index < 8 ? "Open" : "Ready"}`}</b></div>
        </div>
      </div>
        <div className="ob-director">
          <div className="ob-caption"><span className={running ? "is-live" : ""} /><p aria-live="polite">{action.title}</p><small>{index + 1} / {actions.length}</small></div>
          <div className="ob-controls">
            <button type="button" className="ob-play" onClick={handlePlayback} aria-label={running ? "Pause walkthrough" : finished ? "Replay walkthrough" : "Play walkthrough"}><Icon kind={running ? "pause" : finished ? "replay" : "play"} />{running ? "Pause" : finished ? "Replay" : "Play"}</button>
            <input className="ob-scrub" type="range" min={0} max={actions.length - 1} value={index} onChange={(event) => jump(Number(event.target.value))} aria-label="Action timeline" aria-valuetext={action.title} />
            <div className="ob-progress" aria-label="Walkthrough progress">{actions.map((step, stepIndex) => <button type="button" key={`${step.screen}-${stepIndex}`} className={stepIndex === index ? "is-current" : stepIndex < index ? "is-done" : ""} onClick={() => jump(stepIndex)} aria-label={`Go to step ${stepIndex + 1}: ${step.title}`} aria-current={stepIndex === index ? "step" : undefined}><span /></button>)}</div>
            <button type="button" className="ob-back" disabled={index === 0} onClick={() => jump(index - 1)} aria-label="Previous step"><Icon kind="back" /></button>
            <button type="button" className="ob-next" onClick={advance}><span>{action.next}</span><Icon kind={finished ? "replay" : "next"} /></button>
          </div>
        </div>
    </section>
  );
}
