import { Eyebrow, Heading, Section } from "./Section";
import Comparison from "./economics/Comparison";
import { comparison } from "@/lib/content";

/** Server shell — only the interactive part below is a client component. */
export default function ComparisonSection() {
  return (
    <Section id="economics">
      <div className="max-w-2xl">
        <Eyebrow>{comparison.eyebrow}</Eyebrow>
        <Heading>{comparison.heading}</Heading>
        <p className="mt-6 text-[16px] leading-[1.7] text-body">{comparison.intro}</p>
      </div>

      <div className="mt-14">
        <Comparison />
      </div>
    </Section>
  );
}
