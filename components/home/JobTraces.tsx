"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { Circle } from "@phosphor-icons/react/dist/csr/Circle";
import { Diamond } from "@phosphor-icons/react/dist/csr/Diamond";
import { Pause } from "@phosphor-icons/react/dist/csr/Pause";
import { Play } from "@phosphor-icons/react/dist/csr/Play";
import { Square } from "@phosphor-icons/react/dist/csr/Square";
import { traces, type TraceEvent } from "@/lib/content/home";

const CHART_WIDTH = 1180;
const CHART_HEIGHT = 250;
const LABEL_WIDTH = 112;
const RIGHT_PAD = 24;
const PLOT_WIDTH = CHART_WIDTH - LABEL_WIDTH - RIGHT_PAD;

const rowY: Record<TraceEvent["phase"], number> = {
  signal: 72,
  decision: 120,
  task: 168,
  interaction: 216,
};

const phaseLabel: Record<TraceEvent["phase"], string> = {
  signal: "Signal",
  decision: "Decision",
  task: "Task",
  interaction: "Interaction",
};

function xPosition(value: number) {
  return LABEL_WIDTH + (value / 100) * PLOT_WIDTH;
}

function xPercent(value: number) {
  return `${(xPosition(value) / CHART_WIDTH) * 100}%`;
}

function connectionPath(start: TraceEvent, end: TraceEvent) {
  const x1 = xPosition(start.x);
  const x2 = xPosition(end.x);
  const y1 = rowY[start.phase];
  const y2 = rowY[end.phase];
  const bend = Math.max(10, (x2 - x1) * 0.45);

  return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
}

function PhaseIcon({ event, selected }: { event: TraceEvent; selected: boolean }) {
  const props = {
    "aria-hidden": true,
    className: "text-accent",
    size: selected ? 23 : 19,
    weight: selected || event.terminal ? ("fill" as const) : ("regular" as const),
  };

  if (event.phase === "signal") return <Diamond {...props} />;
  if (event.phase === "decision") return <Square {...props} />;
  if (event.phase === "task") return <Circle {...props} />;
  return <Play {...props} />;
}

export default function JobTraces() {
  const [activeLane, setActiveLane] = useState(0);
  const [activeStep, setActiveStep] = useState(traces.items[0].initialStep);
  const [playing, setPlaying] = useState(true);
  const trace = traces.items[activeLane];
  const event = trace.events[activeStep];

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % trace.events.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [playing, trace.events.length]);

  const coordinates = useMemo(
    () => trace.events.map((item) => ({ x: xPosition(item.x), y: rowY[item.phase] })),
    [trace],
  );

  function chooseLane(index: number) {
    const nextTrace = traces.items[index];
    setActiveLane(index);
    setActiveStep(nextTrace.initialStep);
    setPlaying(true);
  }

  function chooseStep(index: number) {
    setActiveStep(index);
    setPlaying(false);
  }

  function move(direction: -1 | 1) {
    setPlaying(false);
    setActiveStep((current) => (current + direction + trace.events.length) % trace.events.length);
  }

  function togglePlaying() {
    if (!playing && activeStep === trace.events.length - 1) setActiveStep(0);
    setPlaying((current) => !current);
  }

  return (
    <section id="work" className="scroll-mt-6 bg-white px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1392px] overflow-hidden rounded-[20px] bg-[#f5f4f2] px-6 py-8 sm:px-10 sm:py-10 lg:py-9">
        <div className="grid gap-4 lg:grid-cols-[1.18fr_.82fr] lg:gap-16">
          <h2 className="display max-w-[720px] text-[28px] leading-[1.04] text-ink sm:text-[33px]">
            {traces.heading}
          </h2>
          <p className="max-w-[545px] text-[13.5px] leading-[1.6] text-body sm:text-[14px] lg:pt-1">
            {traces.intro}
          </p>
        </div>

        <div className="outcome-rail -mx-2 mt-7 flex gap-1 overflow-x-auto px-2 pb-1 lg:mt-5" role="tablist" aria-label="Illustrative outcome lanes">
          {traces.items.map((item, index) => (
            <button
              key={item.chip}
              type="button"
              role="tab"
              aria-selected={index === activeLane}
              aria-controls="long-horizon-trace"
              onClick={() => chooseLane(index)}
              className={`min-h-9 shrink-0 rounded-[7px] px-4 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                index === activeLane ? "bg-ink text-white" : "text-ink hover:bg-white"
              }`}
            >
              {item.chip}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-4">
          <p className="display max-w-[900px] text-[19px] leading-[1.15] text-ink sm:text-[22px]">
            <span className="text-mute">Goal:</span> {trace.goal}
          </p>
          <div className="flex shrink-0 items-center gap-2" role="group" aria-label="Timeline controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous event" className="timeline-control">
              <ArrowLeft aria-hidden="true" size={18} weight="bold" />
            </button>
            <button
              type="button"
              onClick={togglePlaying}
              aria-label={playing ? "Pause timeline" : "Play timeline"}
              aria-pressed={playing}
              className="timeline-control timeline-control--primary"
            >
              {playing ? <Pause aria-hidden="true" size={17} weight="fill" /> : <Play aria-hidden="true" size={17} weight="fill" />}
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next event" className="timeline-control">
              <ArrowRight aria-hidden="true" size={18} weight="bold" />
            </button>
          </div>
        </div>

        <div
          id="long-horizon-trace"
          role="tabpanel"
          aria-label={`${trace.chip}: ${trace.goal}`}
          className="mt-3 w-full overflow-hidden lg:mt-2"
        >
          <div className="relative h-[250px] w-full" data-testid="long-horizon-chart">
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
              preserveAspectRatio="none"
            >
              <line x1={LABEL_WIDTH} y1="39" x2={CHART_WIDTH - RIGHT_PAD} y2="39" stroke="#dcded9" strokeWidth="1" />

              {trace.dayLabels.map((_, index) => {
                const x = LABEL_WIDTH + (index / Math.max(1, trace.dayLabels.length - 1)) * PLOT_WIDTH;
                return <line key={`day-line-${index}`} x1={x} y1="39" x2={x} y2="236" stroke="#e6e7e3" strokeDasharray="2 6" strokeWidth="1" />;
              })}

              {Object.values(rowY).map((y) => (
                <line key={`row-line-${y}`} x1={LABEL_WIDTH} y1={y} x2={CHART_WIDTH - RIGHT_PAD} y2={y} stroke="#e2e4df" strokeDasharray="3 6" strokeWidth="1" />
              ))}

              {trace.events.slice(0, -1).map((item, index) => {
                const next = trace.events[index + 1];
                const isComplete = index < activeStep;
                const dashed = item.phase === "task" || item.phase === "interaction";
                return (
                  <path
                    key={`path-${item.id}`}
                    d={connectionPath(item, next)}
                    fill="none"
                    stroke={isComplete ? "#777d76" : "#a8ada6"}
                    strokeDasharray={dashed ? "4 5" : undefined}
                    strokeLinecap="round"
                    strokeWidth={isComplete ? "1.4" : "1.2"}
                  />
                );
              })}

              <line
                x1={coordinates[activeStep].x}
                x2={coordinates[activeStep].x}
                y1="39"
                y2="236"
                stroke="#087747"
                strokeWidth="1.25"
              />
              <circle cx={coordinates[activeStep].x} cy="39" r="5.5" fill="#087747" stroke="#f5f4f2" strokeWidth="2" />
            </svg>

            <div className="absolute top-0 left-0 h-12 w-full" aria-hidden="true">
              {trace.dayLabels.map((label, index) => {
                const x = LABEL_WIDTH + (index / Math.max(1, trace.dayLabels.length - 1)) * PLOT_WIDTH;
                return (
                  <span
                    key={label}
                    className="figure-num absolute top-0 -translate-x-1/2 text-[8px] font-medium tracking-[0.1em] whitespace-nowrap text-body uppercase sm:text-[9px] sm:tracking-[0.12em] lg:text-[10px] lg:tracking-[0.14em]"
                    style={{ left: `${(x / CHART_WIDTH) * 100}%` }}
                  >
                    {label}
                  </span>
                );
              })}
            </div>

            {Object.entries(rowY).map(([phase, y]) => (
              <span
                key={phase}
                aria-hidden="true"
                className="figure-num absolute left-0 -translate-y-1/2 text-[7px] font-medium tracking-[0.08em] text-ink uppercase sm:text-[8px] sm:tracking-[0.1em] lg:text-[10px] lg:tracking-[0.15em]"
                style={{ top: y }}
              >
                {phaseLabel[phase as TraceEvent["phase"]]}
              </span>
            ))}

            {trace.events.map((item, index) => {
              const selected = index === activeStep;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => chooseStep(index)}
                  aria-label={`${item.day}, ${item.time}: ${phaseLabel[item.phase]} — ${item.title}`}
                  aria-pressed={selected}
                  title={item.title}
                  className={`absolute z-10 inline-flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f5f4f2] transition-[box-shadow,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:size-8 ${
                    selected ? "scale-110 shadow-[0_0_0_3px_#f5f4f2,0_0_0_5px_rgba(8,119,71,0.28)]" : "hover:scale-110"
                  }`}
                  style={{ left: xPercent(item.x), top: coordinates[index].y }}
                >
                  <PhaseIcon event={item} selected={selected} />
                </button>
              );
            })}
          </div>
        </div>

        <div aria-live="polite" className="mt-3 grid min-h-[140px] gap-4 rounded-[12px] border border-rule bg-white p-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:p-5 lg:grid-cols-[185px_minmax(0,1fr)_230px] lg:gap-6">
          <div>
            <p className="label !text-[9.5px] text-accent">{phaseLabel[event.phase]}</p>
            <p className="figure-num mt-2.5 text-[10.5px] tracking-[0.12em] text-mute uppercase">{event.day}</p>
            <p className="figure-num mt-1 text-[20px] font-semibold tracking-[-0.03em] text-ink">{event.time}</p>
          </div>
          <div>
            <p className="display text-[17px] leading-[1.18] text-ink sm:text-[18px]">{event.title}</p>
            <p className="figure-num mt-2.5 text-[9.5px] font-medium tracking-[0.1em] text-mute uppercase">{event.meta}</p>
            <p className="mt-2.5 max-w-[700px] text-[13px] leading-[1.6] text-body">{event.text}</p>
          </div>
          <div className="border-t border-rule pt-3.5 sm:col-span-2 lg:col-span-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            <p className="figure-num text-[9.5px] tracking-[0.12em] text-mute uppercase">Case state</p>
            <p className={`mt-2.5 text-[12.5px] font-semibold leading-[1.5] ${event.terminal ? "text-accent-deep" : "text-ink"}`}>
              {event.terminal ? trace.outcome : `Open · event ${activeStep + 1} of ${trace.events.length}`}
            </p>
            <p className="mt-1.5 text-[11.5px] leading-[1.5] text-mute">
              {event.terminal ? "Customer-side evidence closes the case." : "The next promise remains owned by the agent."}
            </p>
          </div>
        </div>

        <p className="mt-3.5 text-[10px] text-mute">{traces.footnote}</p>
      </div>
    </section>
  );
}
