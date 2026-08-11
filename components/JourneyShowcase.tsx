import { Eyebrow, Heading, Section } from "./Section";
import { journey } from "@/lib/content";

const toneStyles = {
  accent: "bg-accent-soft text-accent",
  green: "bg-green/12 text-green",
  amber: "bg-amber/18 text-[#8a6512]",
} as const;

const toneDot = {
  accent: "bg-accent",
  green: "bg-green",
  amber: "bg-amber",
} as const;

export default function JourneyShowcase() {
  return (
    <Section className="bg-warm/50">
      <div className="max-w-3xl">
        <Eyebrow>{journey.eyebrow}</Eyebrow>
        <Heading>{journey.heading}</Heading>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {journey.patients.map((p) => (
          <article
            key={p.name}
            className="flex flex-col rounded-panel bg-surface p-6 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-bg font-medium text-dim">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{p.name}</p>
                <p className="truncate text-[13px] text-faint">{p.detail}</p>
              </div>
            </div>

            <p className="mt-6 text-[13px] font-medium tracking-[0.02em] text-faint uppercase">
              {p.track}
            </p>

            <span
              className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium ${toneStyles[p.tone]}`}
            >
              <span className={`size-1.5 rounded-full ${toneDot[p.tone]}`} />
              {p.status}
            </span>

            <p className="mt-6 border-t border-bg pt-4 text-[13px] text-muted">
              {p.agent}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
