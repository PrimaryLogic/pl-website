import { Eyebrow, Heading, Section } from "./Section";
import { economics } from "@/lib/content";

const barTone = {
  faint: "bg-faint/35",
  amber: "bg-amber",
  accent: "bg-accent",
} as const;

export default function Economics() {
  return (
    <Section className="bg-warm/50">
      <div className="max-w-3xl">
        <Eyebrow>{economics.eyebrow}</Eyebrow>
        <Heading>{economics.heading}</Heading>
        <p className="mt-6 text-[17px] leading-[1.75] text-muted">{economics.intro}</p>
      </div>

      <div className="mt-14 rounded-panel bg-surface p-7 shadow-card sm:p-10">
        <div className="flex flex-col gap-9">
          {economics.rows.map((row) => (
            <div key={row.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="display text-xl text-ink">{row.label}</h3>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[13px] text-faint">{row.trend}</span>
                  <span className="display text-[26px] text-ink">{row.cost}</span>
                </div>
              </div>

              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-bg">
                <div
                  className={`h-full rounded-full ${barTone[row.tone]}`}
                  style={{ width: row.width }}
                />
              </div>

              <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-muted">
                {row.note}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-9 border-t border-bg pt-5 text-[13px] text-faint">
          {economics.caption}
        </p>
      </div>
    </Section>
  );
}
