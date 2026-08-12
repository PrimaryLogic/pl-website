import { comparison, ledger } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";
import Comparison from "./economics/Comparison";
import Ledger from "./economics/Ledger";

/** Server shell: the models below are the only client-rendered islands. */
export default function ComparisonSection() {
  return (
    <Section id="economics" className="content-auto">
      <div className="max-w-3xl">
        <Eyebrow>{ledger.eyebrow}</Eyebrow>
        <Heading>{ledger.heading}</Heading>
        <p className="mt-4 text-[15px] leading-[1.6] text-body">{ledger.intro}</p>
      </div>

      <div className="mt-8 border-t-2 border-ink pt-6">
        <Ledger />
      </div>

      <details data-analytics="economics-comparison" className="group mt-8 border-y border-rule-mid">
        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 marker:hidden">
          <div>
            <p className="label text-accent">{comparison.eyebrow}</p>
            <h3 className="display mt-2 text-[20px] text-ink sm:text-[24px]">{comparison.heading}</h3>
          </div>
          <span aria-hidden="true" className="figure-num shrink-0 text-[22px] text-accent transition-transform group-open:rotate-45">+</span>
        </summary>
        <p className="max-w-3xl pb-6 text-[14px] leading-[1.65] text-body">{comparison.intro}</p>
        <div className="border-t border-rule py-6">
          <Comparison />
        </div>
      </details>
    </Section>
  );
}
