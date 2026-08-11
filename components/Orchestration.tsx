import { Eyebrow, Heading, Section } from "./Section";
import { orchestration } from "@/lib/content";

const channelTone: Record<string, string> = {
  Email: "bg-accent-soft text-accent",
  SMS: "bg-green/12 text-green",
  Voice: "bg-amber/20 text-[#8a6512]",
};

export default function Orchestration() {
  const { patient, agent, timeline } = orchestration;

  return (
    <Section>
      <div className="max-w-3xl">
        <Eyebrow>{orchestration.eyebrow}</Eyebrow>
        <Heading>{orchestration.heading}</Heading>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-panel bg-surface p-7 shadow-card">
            <p className="text-[13px] font-medium tracking-[0.02em] text-faint uppercase">
              Patient
            </p>
            <p className="display mt-3 text-[26px] text-ink">{patient.name}</p>
            <p className="mt-1 text-[15px] text-muted">{patient.detail}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {patient.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-bg px-3 py-1 text-[13px] text-dim"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-panel bg-ink p-7 text-white shadow-card">
            <p className="text-[13px] font-medium tracking-[0.02em] text-white/45 uppercase">
              Matched agent
            </p>
            <p className="display mt-3 text-[26px]">{agent.name}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {agent.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full bg-white/10 px-3 py-1 text-[13px] text-white/80"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ol className="flex flex-col gap-px overflow-hidden rounded-panel bg-bg shadow-card lg:col-span-3">
          {timeline.map((step) => (
            <li
              key={step.at}
              className="flex flex-1 items-center gap-4 bg-surface px-7 py-5"
            >
              <span
                className={`w-16 shrink-0 rounded-full px-3 py-1 text-center text-[12px] font-medium ${
                  channelTone[step.channel] ?? "bg-bg text-dim"
                }`}
              >
                {step.channel}
              </span>
              <span className="flex-1 text-[15px] text-ink">{step.action}</span>
              <span className="shrink-0 font-mono text-[13px] text-faint">
                {step.at}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
