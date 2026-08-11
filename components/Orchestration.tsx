import { Eyebrow, Heading, Section } from "./Section";
import { orchestration } from "@/lib/content";

const channelStyle: Record<string, string> = {
  Email: "border-accent/45 text-accent-deep",
  SMS: "border-ink/25 text-ink",
  Voice: "border-loss/45 text-loss",
};

export default function Orchestration() {
  const { patient, timeline } = orchestration;

  return (
    <Section>
      <div className="max-w-2xl">
        <Eyebrow>{orchestration.eyebrow}</Eyebrow>
        <Heading>{orchestration.heading}</Heading>
      </div>

      <div className="mt-14 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
        <div className="border-t-2 border-ink pt-5">
          <p className="label text-mute">Patient</p>
          <p className="display mt-3 text-[22px] text-ink">{patient.name}</p>
          <p className="figure-num mt-1 text-[13px] text-mute">{patient.detail}</p>
          <ul className="mt-5 flex flex-col gap-1.5">
            {patient.tags.map((tag) => (
              <li key={tag} className="text-[14px] text-body">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ol className="border-t border-rule-mid">
            {timeline.map((step) => (
              <li
                key={step.at}
                className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-rule py-4"
              >
                <span
                  className={`label w-[72px] shrink-0 border-l-2 pl-2.5 ${
                    channelStyle[step.channel] ?? "border-rule-mid text-body"
                  }`}
                >
                  {step.channel}
                </span>
                <span className="min-w-0 flex-1 text-[15px] text-ink">
                  {step.action}
                </span>
                <span className="figure-num shrink-0 text-[13px] text-mute">
                  {step.at}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[12px] text-mute">{orchestration.note}</p>
        </div>
      </div>
    </Section>
  );
}
