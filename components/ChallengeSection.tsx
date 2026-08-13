import { ArrowRight, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { challenge } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";

const chipTones: Record<string, string> = {
  loss: "bg-loss-soft text-loss",
  warn: "bg-warn-soft text-warn",
  accent: "bg-accent-soft text-accent-deep",
};

const stateTones: Record<string, string> = {
  loss: "text-loss",
  warn: "text-warn",
  accent: "text-accent-deep",
};

export default function ChallengeSection() {
  return (
    <Section id="challenge" className="sm:!py-6 lg:!py-10">
      <div className="grid gap-x-14 gap-y-10 md:grid-cols-[minmax(240px,.68fr)_minmax(0,1.32fr)] md:items-center">
        <div>
          <Eyebrow tone="loss">{challenge.eyebrow}</Eyebrow>
          <Heading className="max-w-[430px] !text-[30px] lg:!text-[38px]">{challenge.heading}</Heading>
          <p className="mt-5 max-w-[430px] text-[14px] leading-[1.7] text-body">{challenge.intro}</p>
        </div>

        <ol aria-label="Illustrative stalled patients" className="grid gap-4">
          {challenge.rows.map((row) => (
            <li
              key={row.name}
              className="grid items-stretch gap-2 sm:grid-cols-[minmax(0,1fr)_34px_minmax(0,1fr)] sm:gap-0"
            >
              <div className="rounded-2xl border border-rule bg-white p-4 shadow-[0_8px_24px_rgba(18,20,16,0.04)]">
                <div className="flex items-start justify-between gap-3">
                  <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                    <UserCircle aria-hidden="true" size={20} className="text-mute" />
                    {row.name}
                  </p>
                  <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${chipTones[row.chipTone]}`}>
                    {row.chip}
                  </span>
                </div>
                <p className="mt-2.5 text-[12.5px] text-body">{row.line}</p>
              </div>

              <div className="flex items-center justify-center" aria-hidden="true">
                <ArrowRight size={18} weight="bold" className="rotate-90 text-loss sm:rotate-0" />
              </div>

              <div className="rounded-2xl border border-rule bg-white p-4 shadow-[0_8px_24px_rgba(18,20,16,0.04)]">
                <div className="flex items-start justify-between gap-3">
                  <p className={`text-[13px] font-semibold ${stateTones[row.chipTone]}`}>{row.state}</p>
                  <span className="figure-num shrink-0 rounded-full bg-band px-2.5 py-1 text-[10.5px] font-medium text-body">
                    {row.age}
                  </span>
                </div>
                <p className="mt-2.5 text-[12.5px] leading-[1.55] text-body">{row.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
