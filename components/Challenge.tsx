import { Eyebrow, Heading, Section } from "./Section";
import { challenge } from "@/lib/content";

export default function Challenge() {
  return (
    <Section>
      <div className="max-w-3xl">
        <Eyebrow>{challenge.eyebrow}</Eyebrow>
        <Heading>{challenge.heading}</Heading>
        <p className="mt-6 text-[17px] leading-[1.75] text-muted">{challenge.intro}</p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {challenge.items.map((item, i) => (
          <div
            key={item.title}
            className="rounded-panel bg-surface p-7 shadow-card"
          >
            <span className="font-mono text-xs text-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="display mt-4 text-xl text-ink">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-muted">{item.body}</p>
          </div>
        ))}
      </div>

      <p className="display mt-12 max-w-3xl text-[22px] leading-[1.35] text-ink sm:text-[26px]">
        {challenge.closing}
      </p>
    </Section>
  );
}
