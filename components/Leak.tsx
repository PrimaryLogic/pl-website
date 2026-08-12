import { coverageDefinition } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";

export default function Leak() {
  return (
    <Section>
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div className="max-w-xl">
          <Eyebrow>{coverageDefinition.eyebrow}</Eyebrow>
          <Heading>{coverageDefinition.heading}</Heading>
          <p className="mt-4 text-[15px] leading-[1.6] text-body">{coverageDefinition.intro}</p>
        </div>

        <ol className="border-t-2 border-ink">
          {coverageDefinition.stages.map((stage) => (
            <li key={stage.index} className="grid gap-2 border-b border-rule py-4 sm:grid-cols-[48px_160px_1fr] sm:gap-4">
              <span className="figure-num text-[13px] font-medium text-accent">{stage.index}</span>
              <h3 className="display text-[16px] text-ink">{stage.title}</h3>
              <p className="text-[14px] leading-[1.65] text-body">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
