"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Broadcast,
  CalendarCheck,
  ChatCircleDots,
  ChatsCircle,
  CheckCircle,
  Clock,
  FileText,
  Files,
  FolderOpen,
  Pause,
  Play,
  ShieldCheck,
  Sparkle,
  User,
} from "@phosphor-icons/react";
import { journey } from "@/lib/content";

const { patient, stats, days, steps, statePanel } = journey;

const STEP_MS = 2200;

const stepIcons = {
  folder: FolderOpen,
  shield: ShieldCheck,
  file: FileText,
  records: Files,
  chat: ChatsCircle,
  check: CheckCircle,
} as const;

const involvedIcons = {
  provider: User,
  payer: ShieldCheck,
  ehr: FileText,
  patient: User,
  scheduler: CalendarCheck,
} as const;

const statIcons = {
  active: User,
  owned: CheckCircle,
  review: Clock,
} as const;

const stateIcons = {
  owner: User,
  dependency: ShieldCheck,
  nextAction: Clock,
  writeback: FileText,
} as const;

export default function CoordinationTimeline() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Reduced motion shows the completed journey instead of freezing it on
  // step one; the controls still work from there.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduceMotion(query.matches);
      if (query.matches) {
        setPlaying(false);
        setActive(steps.length - 1);
      }
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!playing || reduceMotion) return;
    const timer = window.setTimeout(() => {
      if (active === steps.length - 1) {
        setPlaying(false);
        return;
      }
      setActive((current) => current + 1);
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [active, playing, reduceMotion]);

  const step = steps[active];
  const atEnd = active === steps.length - 1;

  function select(index: number) {
    setPlaying(false);
    setActive(index);
  }

  function move(delta: number) {
    setPlaying(false);
    setActive((current) => Math.max(0, Math.min(steps.length - 1, current + delta)));
  }

  function togglePlayback() {
    if (!playing && atEnd) {
      setActive(0);
      setPlaying(true);
      return;
    }
    setPlaying((current) => !current);
  }

  const detailRows = [
    { key: "Signal", icon: Broadcast, tone: "", value: step.signal },
    { key: "Agent action", icon: Sparkle, tone: " is-agent", value: step.action },
    { key: "Channel", icon: ChatCircleDots, tone: "", value: step.channel },
    { key: "Outcome", icon: CheckCircle, tone: " is-outcome", value: step.outcome },
  ];
  const stateRows = [
    { key: "Owner", icon: stateIcons.owner, value: step.state.owner },
    { key: "Dependency", icon: stateIcons.dependency, value: step.state.dependency },
    { key: "Next action", icon: stateIcons.nextAction, value: step.state.nextAction },
    { key: "EHR writeback", icon: stateIcons.writeback, value: step.state.writeback },
  ];
  const StatusIcon = atEnd ? CheckCircle : Clock;

  return (
    <div>
      <div className="rj-card">
        <div className="rj-stats" aria-label="Illustrative practice dashboard">
          {stats.map(({ icon, label, value, tone }) => {
            const Icon = statIcons[icon];
            return (
              <div key={label} className="rj-stat">
                <span className={`rj-stat-icon rj-stat-icon--${tone}`}>
                  <Icon aria-hidden="true" size={17} />
                </span>
                <span>
                  <span className="rj-stat-label">{label}</span>
                  <span className="rj-stat-value">{value}</span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="rj-patient">
          <span className="rj-avatar" aria-hidden="true">{patient.initials}</span>
          <p className="rj-patient-copy">
            <strong>{patient.name}</strong>
            <span> · {patient.context}</span>
          </p>
          <span className="rj-mrn">{patient.mrn}</span>
          <div className="rj-controls" aria-label="Journey playback controls">
            <button type="button" aria-label="Previous step" disabled={active === 0} onClick={() => move(-1)}>
              <ArrowLeft aria-hidden="true" size={15} />
            </button>
            <button
              className="is-primary"
              type="button"
              aria-label={playing ? "Pause journey" : "Play journey"}
              aria-pressed={playing}
              onClick={togglePlayback}
            >
              {playing ? <Pause aria-hidden="true" size={14} weight="fill" /> : <Play aria-hidden="true" size={14} weight="fill" />}
            </button>
            <button type="button" aria-label="Next step" disabled={atEnd} onClick={() => move(1)}>
              <ArrowRight aria-hidden="true" size={15} />
            </button>
          </div>
        </div>

        <div className="rj-scroll">
          <div className="rj-track">
            <div
              className="rj-days"
              aria-hidden="true"
              style={{ gridTemplateColumns: days.map((day) => `${day.span}fr`).join(" ") }}
            >
              {days.map((day) => (
                <span key={day.label} className="rj-day">{day.label}</span>
              ))}
            </div>

            <ol className="rj-steps" aria-label="Referral journey steps">
              {steps.map((entry, index) => {
                const Icon = stepIcons[entry.icon];
                const state = `${index < active ? " is-done" : ""}${index === active ? " is-active" : ""}${
                  index === steps.length - 1 ? " is-goal" : ""
                }`;
                return (
                  <li key={entry.id} className={`rj-step${state}`}>
                    <button
                      type="button"
                      className="rj-step-btn"
                      aria-current={index === active ? "step" : undefined}
                      aria-label={`Step ${index + 1} of ${steps.length}: ${entry.title}, ${entry.timestamp}`}
                      onClick={() => select(index)}
                    >
                      <span className="rj-node"><Icon aria-hidden="true" size={22} /></span>
                      <span className="rj-num" aria-hidden="true">{index + 1}</span>
                      <span className="rj-step-title">{entry.title}</span>
                      <span className="rj-step-time">{entry.timestamp}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="rj-involved">
              <span className="rj-involved-label">Who&rsquo;s involved</span>
              <ol className="rj-involved-grid" aria-label="Who is involved at each step">
                {steps.map((entry) => {
                  const Icon = involvedIcons[entry.involved.icon];
                  return (
                    <li key={entry.id} className="rj-involved-cell">
                      <span className={`rj-chip rj-chip--${entry.involved.tone}`}>
                        <Icon aria-hidden="true" size={14} />
                        {entry.involved.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="rj-grid">
        <div className="rj-panel rj-detail" aria-live="polite">
          <div className="rj-detail-head">
            <span className="rj-detail-step">Step {active + 1} of {steps.length}</span>
            <span className="rj-detail-title">{step.title}</span>
            <span className="rj-detail-time">{step.timestamp}</span>
          </div>
          {detailRows.map(({ key, icon: Icon, tone, value }) => (
            <div key={key} className={`rj-detail-row${tone}`}>
              <span className="rj-detail-key">
                <Icon aria-hidden="true" size={16} />
                {key}
              </span>
              <span className="rj-detail-val">{value}</span>
            </div>
          ))}
        </div>

        <div className="rj-panel rj-memory">
          <div className="rj-memory-head">
            <Broadcast aria-hidden="true" size={18} />
            <span className="rj-memory-title">{statePanel.title}</span>
            <span className="rj-memory-tag">{statePanel.tag}</span>
          </div>
          <ul className="rj-memory-items">
            {stateRows.map(({ key, icon: Icon, value }) => {
              return (
                <li key={key} className="rj-memory-item">
                  <Icon aria-hidden="true" size={15} />
                  <span><strong>{key}:</strong> {value}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={`rj-outcome ${atEnd ? "is-complete" : "is-current"}`} aria-live="polite">
          <span className="rj-outcome-icon"><StatusIcon aria-hidden="true" size={26} weight={atEnd ? "fill" : "regular"} /></span>
          <p>
            <strong className="rj-outcome-lead">{step.state.banner.lead}</strong> {step.state.banner.body}{" "}
            <strong className="rj-outcome-strong">{step.state.banner.strong}</strong>
          </p>
        </div>
      </div>

      <p className="rj-note">
        <CheckCircle aria-hidden="true" size={13} />
        {journey.note}
      </p>
    </div>
  );
}
