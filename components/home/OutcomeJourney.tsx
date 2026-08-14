"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ChatsCircle } from "@phosphor-icons/react/dist/csr/ChatsCircle";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { Database } from "@phosphor-icons/react/dist/csr/Database";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { Pause } from "@phosphor-icons/react/dist/csr/Pause";
import { Phone } from "@phosphor-icons/react/dist/csr/Phone";
import { Play } from "@phosphor-icons/react/dist/csr/Play";
import { Sparkle } from "@phosphor-icons/react/dist/csr/Sparkle";
import { traces, type Trace, type TraceEvent } from "@/lib/content/home";

type JourneyMeta = {
  tab: string;
  audience: string;
  description: string;
  channels: Array<"Voice" | "SMS" | "Email">;
  systems: string[];
  momentStarts: number[];
};

const journeyMeta: JourneyMeta[] = [
  {
    tab: "Healthcare",
    audience: "For referral teams",
    description: "Primary Logic coordinates the patient, staff, and schedule until the first visit is kept.",
    channels: ["Voice", "SMS", "Email"],
    systems: ["EHR", "Scheduling"],
    momentStarts: [0, 4, 12, 20],
  },
  {
    tab: "Lending",
    audience: "For lending teams",
    description: "Primary Logic coordinates the borrower, documents, and lender systems until the loan funds.",
    channels: ["Voice", "SMS", "Email"],
    systems: ["LOS", "Borrower portal"],
    momentStarts: [0, 4, 12, 19],
  },
  {
    tab: "Legal intake",
    audience: "For intake teams",
    description: "Primary Logic coordinates the prospect, counsel, and signature flow until the engagement is signed.",
    channels: ["Voice", "SMS", "Email"],
    systems: ["Case system", "E-sign"],
    momentStarts: [0, 4, 8, 12],
  },
];

const stageTones: Record<TraceEvent["phase"], string> = {
  signal: "border-[#c9d8cf] bg-[#edf5f0] text-[#175e3e]",
  decision: "border-[#cbd7ed] bg-[#eef3fb] text-[#365f9d]",
  task: "border-[#ddcfeb] bg-[#f4eff9] text-[#71469d]",
  interaction: "border-[#ead7bd] bg-[#f8f1e7] text-[#8a5a22]",
};

const evidenceTones: Record<Trace["previewTone"], string> = {
  sage: "bg-[#dcebe1]",
  sand: "bg-[#f1dcc2]",
  blue: "bg-[#dce5f2]",
};

type PreviewScene = Trace["preview"]["scenes"][number];

function channelIcon(channel: JourneyMeta["channels"][number]) {
  if (channel === "Voice") return <Phone aria-hidden="true" size={15} weight="regular" />;
  if (channel === "SMS") return <ChatsCircle aria-hidden="true" size={15} weight="regular" />;
  return <EnvelopeSimple aria-hidden="true" size={15} weight="regular" />;
}

function eventIcon(channel: TraceEvent["channel"], terminal = false) {
  if (terminal) return <CheckCircle aria-hidden="true" size={18} weight="fill" />;
  if (channel === "Voice") return <Phone aria-hidden="true" size={17} weight="fill" />;
  if (channel === "SMS") return <ChatsCircle aria-hidden="true" size={17} weight="fill" />;
  if (channel === "Email") return <EnvelopeSimple aria-hidden="true" size={17} weight="fill" />;
  return <Database aria-hidden="true" size={17} weight="fill" />;
}

function stageLabel(event: TraceEvent) {
  if (event.terminal) return "Verified outcome";
  if (event.phase === "decision") return "Primary Logic · decision";
  if (event.phase === "task") return "Runtime · task";
  if (event.phase === "interaction") return `${event.channel} · interaction`;
  return `${event.channel} · signal`;
}

function momentEvents(trace: Trace, starts: number[], index: number) {
  const start = starts[index];
  const end = starts[index + 1] ?? trace.events.length;
  return trace.events.slice(start, Math.min(end, start + 4));
}

function JourneyMoment({
  active,
  events,
  index,
  onSelect,
}: {
  active: boolean;
  events: TraceEvent[];
  index: number;
  onSelect: () => void;
}) {
  const lead = events[0];

  return (
    <article
      data-journey-moment={index}
      aria-current={active ? "step" : undefined}
      className={`relative z-10 w-[292px] shrink-0 snap-center px-2 pb-2 transition-opacity duration-300 sm:w-[300px] lg:w-[260px] xl:w-[278px] ${
        active ? "opacity-100" : "opacity-55 hover:opacity-80"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        aria-label={`Show ${lead.day}, ${lead.time}: ${lead.title}`}
      >
        <span className={`figure-num block h-8 text-center text-[10px] font-medium tracking-[0.11em] uppercase ${active ? "text-accent" : "text-mute"}`}>
          {lead.day} · {lead.time}
        </span>
        <span className="relative flex h-7 items-start justify-center border-t border-rule">
          <span className="-mt-3 inline-flex size-6 items-center justify-center bg-white text-accent">
            <Sparkle aria-hidden="true" size={active ? 22 : 17} weight={active ? "fill" : "regular"} />
          </span>
        </span>
      </button>

      <div
        className={`rounded-[15px] border bg-white p-5 transition-[border-color,box-shadow,transform] duration-300 ${
          active
            ? "-translate-y-0.5 border-accent/30 shadow-[0_22px_55px_rgba(22,50,35,0.11)]"
            : "border-rule shadow-[0_12px_30px_rgba(18,20,16,0.035)]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="figure-num text-[9.5px] font-medium tracking-[0.12em] text-mute uppercase">Signal</p>
          <span className="figure-num rounded-full bg-band px-2 py-1 text-[8.5px] tracking-[0.08em] text-body uppercase">
            {lead.channel}
          </span>
        </div>
        <h3 className="mt-4 min-h-12 text-[15px] font-medium leading-[1.38] text-ink">{lead.title}</h3>
        <div className="mt-5 border-t border-rule pt-4">
          <p className="flex items-center gap-2 text-[11.5px] font-semibold text-ink">
            <Sparkle aria-hidden="true" size={15} /> Agent memory
          </p>
          <p className="mt-2 line-clamp-3 text-[11.5px] leading-[1.48] text-mute">{lead.text}</p>
        </div>
      </div>

      <div className="mx-5 border-x border-rule px-3 pb-3 pt-4">
        <div className="space-y-3">
          {(events.length > 1 ? events.slice(1) : events).map((event, eventIndex) => (
            <div
              key={event.id}
              className={`rounded-[12px] border px-4 py-3.5 ${stageTones[event.phase]} ${event.terminal ? "!border-accent/25 !bg-accent-soft !text-accent-deep" : ""}`}
            >
              <p className="figure-num flex items-center gap-2 text-[8.5px] font-medium tracking-[0.1em] uppercase opacity-75">
                {event.terminal ? <CheckCircle aria-hidden="true" size={14} weight="fill" /> : <Sparkle aria-hidden="true" size={13} />}
                {stageLabel(event)}
              </p>
              <p className="mt-2 text-[12.5px] font-medium leading-[1.42]">{event.title}</p>
              {eventIndex === 0 && !event.terminal && (
                <p className="figure-num mt-2 text-[8.5px] tracking-[0.06em] uppercase opacity-65">{event.meta}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function EvidenceScene({ scene }: { scene: PreviewScene }) {
  return (
    <div className="mt-4 space-y-2.5">
      {scene.lines.map((line) => (
        <div key={`${line.speaker}-${line.text}`} className={line.reply ? "flex justify-end" : undefined}>
          <p
            className={`max-w-[94%] rounded-[15px] px-3.5 py-2.5 text-[12px] leading-[1.48] ${
              line.reply ? "bg-ink text-white" : "bg-[#f3f2f0] text-ink"
            }`}
          >
            {!line.reply && (
              <span className="figure-num mr-2 text-[8px] font-semibold tracking-[0.1em] text-accent uppercase">
                {line.speaker}
              </span>
            )}
            {line.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function EvidencePanel({
  activeMoment,
  events,
  momentCount,
  trace,
}: {
  activeMoment: number;
  events: TraceEvent[];
  momentCount: number;
  trace: Trace;
}) {
  const lead = events[0];
  const terminalEvent = events.find((event) => event.terminal);
  const isTerminal = Boolean(terminalEvent);
  const matchingScene = isTerminal
    ? undefined
    : trace.preview.scenes.find((scene) => scene.meta.toLowerCase().includes(lead.day.toLowerCase()));
  const displayEvent = terminalEvent ?? events.find((event) => event.phase === "interaction") ?? lead;
  const supportingEvents = events.filter((event) => event.id !== displayEvent.id).slice(0, 3);
  const result = isTerminal ? trace.preview.result : undefined;

  return (
    <aside
      aria-live="polite"
      aria-label={`Evidence for ${lead.day}: ${lead.title}`}
      className={`order-1 rounded-[16px] p-4 sm:p-5 lg:order-2 ${evidenceTones[trace.previewTone]}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="figure-num text-[9px] font-medium tracking-[0.13em] text-accent-deep uppercase">Selected moment</p>
        <p className="figure-num text-[8.5px] tracking-[0.1em] text-body uppercase">
          {String(activeMoment + 1).padStart(2, "0")} / {String(momentCount).padStart(2, "0")}
        </p>
      </div>

      <div className="mt-4 rounded-[13px] border border-black/[0.06] bg-white p-4 shadow-[0_14px_36px_rgba(20,24,20,0.055)] sm:p-5">
        <div className="flex items-start gap-3">
          <span className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full ${isTerminal ? "bg-accent text-white" : "bg-ink text-white"}`}>
            {eventIcon(displayEvent.channel, isTerminal)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
              <p className="text-[13px] font-semibold leading-[1.3] text-ink">
                {result?.title ?? matchingScene?.title ?? displayEvent.title}
              </p>
              <span className="figure-num text-[8px] tracking-[0.11em] text-accent uppercase">
                {result?.badge ?? matchingScene?.badge ?? (isTerminal ? "verified" : displayEvent.channel)}
              </span>
            </div>
            <p className="figure-num mt-1.5 text-[8.5px] tracking-[0.09em] text-mute uppercase">
              {result?.meta ?? matchingScene?.meta ?? `${displayEvent.day} · ${displayEvent.time}`}
            </p>
          </div>
        </div>

        {result ? (
          <div className="mt-5 space-y-2 border-t border-rule pt-4">
            {result.details.map((detail) => (
              <p key={detail} className="flex items-start gap-2 text-[11.5px] leading-[1.45] text-body">
                <CheckCircle aria-hidden="true" size={14} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                {detail}
              </p>
            ))}
          </div>
        ) : matchingScene ? (
          <EvidenceScene scene={matchingScene} />
        ) : (
          <p className="mt-4 rounded-[12px] bg-[#f3f2f0] px-3.5 py-3 text-[12px] leading-[1.52] text-body">
            {displayEvent.text}
          </p>
        )}
      </div>

      <div className="mt-3 rounded-[13px] border border-black/[0.06] bg-white px-4 py-4 shadow-[0_14px_36px_rgba(20,24,20,0.04)] sm:px-5">
        <p className="figure-num text-[8.5px] font-medium tracking-[0.12em] text-mute uppercase">What moved the case</p>
        <div className="mt-3 divide-y divide-rule">
          {(supportingEvents.length > 0 ? supportingEvents : [lead]).map((event) => (
            <div key={event.id} className="grid grid-cols-[82px_minmax(0,1fr)] gap-3 py-2.5 first:pt-0 last:pb-0">
              <p className="figure-num text-[8px] font-medium tracking-[0.09em] text-accent uppercase">
                {event.terminal ? "Outcome" : event.phase}
              </p>
              <p className="text-[11px] font-medium leading-[1.42] text-ink">{event.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex min-h-12 items-center justify-between gap-3 rounded-[11px] border border-black/[0.06] bg-white px-4 py-3 shadow-[0_12px_28px_rgba(20,24,20,0.04)]">
        <p className="figure-num flex items-center gap-2 text-[8.5px] font-semibold tracking-[0.11em] text-ink uppercase">
          <CheckCircle aria-hidden="true" size={15} weight={isTerminal ? "fill" : "regular"} className="text-accent" />
          {isTerminal ? trace.preview.outcome : "Case open"}
        </p>
        <p className="figure-num text-right text-[8px] tracking-[0.09em] text-mute uppercase">
          {isTerminal ? trace.preview.outcomeMeta : `${lead.day} · owned`}
        </p>
      </div>
    </aside>
  );
}

export default function OutcomeJourney() {
  const [activeLane, setActiveLane] = useState(0);
  const [activeMoment, setActiveMoment] = useState(0);
  const [playing, setPlaying] = useState(true);
  const railRef = useRef<HTMLDivElement>(null);
  const trace = traces.items[activeLane];
  const meta = journeyMeta[activeLane];
  const moments = useMemo(
    () => meta.momentStarts.map((_, index) => momentEvents(trace, meta.momentStarts, index)),
    [meta, trace],
  );

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveMoment((current) => (current + 1) % moments.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [moments.length, playing]);

  useEffect(() => {
    const rail = railRef.current;
    const selected = rail?.querySelector<HTMLElement>(`[data-journey-moment="${activeMoment}"]`);
    if (!rail || !selected) return;
    const left = selected.offsetLeft - (rail.clientWidth - selected.clientWidth) / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: playing ? "smooth" : "auto" });
  }, [activeMoment, playing]);

  function chooseLane(index: number) {
    setActiveLane(index);
    setActiveMoment(0);
    setPlaying(true);
  }

  function move(direction: -1 | 1) {
    setPlaying(false);
    setActiveMoment((current) => (current + direction + moments.length) % moments.length);
  }

  function togglePlaying() {
    setPlaying((current) => !current);
  }

  return (
    <div className="mt-11 sm:mt-14" data-testid="outcome-journey">
      <div className="outcome-rail mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-[#f2f2ef] p-1" role="tablist" aria-label="Outcome journeys">
        {journeyMeta.map((item, index) => (
          <button
            key={item.tab}
            type="button"
            role="tab"
            aria-selected={index === activeLane}
            aria-controls="outcome-journey-panel"
            onClick={() => chooseLane(index)}
            className={`min-h-10 shrink-0 rounded-full px-5 text-[12.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-7 sm:text-[13px] ${
              index === activeLane ? "bg-[#d8eadf] text-accent-deep" : "text-mute hover:bg-white hover:text-ink"
            }`}
          >
            {item.tab}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-[20px] bg-[#edf4ef] p-3 sm:p-5 lg:p-8">
        <div
          id="outcome-journey-panel"
          role="tabpanel"
          aria-label={meta.tab}
          className="overflow-hidden rounded-[17px] bg-white px-4 pb-5 pt-7 sm:px-7 sm:pb-7 sm:pt-8 lg:px-10 lg:pb-9 lg:pt-10"
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
            <div>
              <p className="figure-num text-[9.5px] font-medium tracking-[0.12em] text-accent uppercase">{meta.audience}</p>
              <h2 className="display mt-3 max-w-[760px] text-[25px] leading-[1.06] text-ink sm:text-[30px] lg:text-[34px]">
                {trace.heading}
              </h2>
              <p className="mt-4 max-w-[720px] text-[13px] leading-[1.58] text-mute sm:text-[14px]">{meta.description}</p>
            </div>

            <div className="flex items-center gap-2" role="group" aria-label="Journey controls">
              <button type="button" onClick={() => move(-1)} aria-label="Previous moment" className="timeline-control">
                <ArrowLeft aria-hidden="true" size={18} weight="bold" />
              </button>
              <button
                type="button"
                onClick={togglePlaying}
                aria-label={playing ? "Pause journey" : "Play journey"}
                aria-pressed={playing}
                className="timeline-control timeline-control--primary"
              >
                {playing ? <Pause aria-hidden="true" size={16} weight="fill" /> : <Play aria-hidden="true" size={16} weight="fill" />}
              </button>
              <button type="button" onClick={() => move(1)} aria-label="Next moment" className="timeline-control">
                <ArrowRight aria-hidden="true" size={18} weight="bold" />
              </button>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-rule py-3.5 text-[11.5px] text-mute sm:mt-8 sm:py-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium text-ink">Channels:</span>
              {meta.channels.map((channel) => (
                <span key={channel} className="inline-flex items-center gap-1.5">
                  {channelIcon(channel)} {channel}
                </span>
              ))}
            </div>
            <span aria-hidden="true" className="hidden h-5 w-px bg-rule sm:block" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium text-ink">Systems:</span>
              {meta.systems.map((system) => (
                <span key={system} className="inline-flex items-center gap-1.5">
                  <Database aria-hidden="true" size={15} /> {system}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.72fr)] lg:items-start lg:gap-5">
            <div className="order-2 min-w-0 overflow-hidden rounded-[16px] border border-rule bg-[#fbfbf9] py-5 lg:order-1">
              <div className="flex items-center justify-between gap-4 px-5 sm:px-6">
                <p className="figure-num text-[9px] font-medium tracking-[0.13em] text-accent-deep uppercase">Case timeline</p>
                <p className="figure-num text-[8.5px] tracking-[0.1em] text-mute uppercase">{trace.span}</p>
              </div>
              <div ref={railRef} className="outcome-rail mt-5 overflow-x-auto px-3 pb-1 sm:px-4">
                <div className="flex w-max min-w-full snap-x snap-mandatory">
                  {moments.map((events, index) => (
                    <JourneyMoment
                      key={`${trace.chip}-${events[0].id}`}
                      active={index === activeMoment}
                      events={events}
                      index={index}
                      onSelect={() => {
                        setActiveMoment(index);
                        setPlaying(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <EvidencePanel
              activeMoment={activeMoment}
              events={moments[activeMoment]}
              momentCount={moments.length}
              trace={trace}
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-rule pt-4 text-[10.5px] text-mute sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p>Illustrative workflow, not customer data or a performance claim.</p>
              <p className="figure-num mt-1.5 tracking-[0.09em] uppercase">{trace.span} · one owner throughout</p>
            </div>
            <Link
              href={trace.href ?? "/#contact"}
              className="inline-flex min-h-9 w-fit items-center gap-2 border-b border-accent pb-0.5 text-[12px] font-semibold text-accent-deep transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {trace.linkLabel ?? `Start a ${journeyMeta[activeLane].tab.toLowerCase()} pilot`}
              <ArrowRight aria-hidden="true" size={15} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
