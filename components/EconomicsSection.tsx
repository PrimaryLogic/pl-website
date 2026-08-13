import { economics } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";
import { EconomicsProvider } from "./economics/EconomicsProvider";
import Ledger from "./economics/Ledger";
import OperatingComparison from "./economics/OperatingComparison";

export default function EconomicsSection() {
  return (
    <Section id="economics" className="sm:!py-10 lg:!py-14">
      <div className="grid gap-7 lg:grid-cols-[minmax(250px,.48fr)_minmax(0,1.52fr)] lg:items-start lg:gap-10">
        <div className="max-w-[360px] lg:pt-2">
          <Eyebrow>{economics.alternatives.eyebrow}</Eyebrow>
          <Heading className="!text-[31px] lg:!text-[37px]">{economics.alternatives.heading}</Heading>
          <p className="mt-5 text-[14px] leading-[1.65] text-body">{economics.alternatives.intro}</p>
        </div>
        <OperatingComparison />
      </div>

      <div className="mt-10 border-t border-rule pt-10 lg:pt-12">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,.9fr)_minmax(360px,1.1fr)] lg:items-end lg:gap-14">
          <div>
          <Eyebrow>{economics.eyebrow}</Eyebrow>
            <Heading className="max-w-[650px] !text-[32px] sm:!text-[36px] lg:!text-[40px]">{economics.heading}</Heading>
          </div>
          <p className="max-w-[650px] text-[14px] leading-[1.65] text-body lg:pb-0.5">{economics.intro}</p>
        </div>

        <dl className="mt-7 grid overflow-hidden border-y border-rule sm:grid-cols-3">
          {economics.rules.map((rule, index) => (
            <div
              key={rule.label}
              className={`py-4 sm:px-5 sm:py-5 ${index > 0 ? "border-t border-rule sm:border-t-0 sm:border-l" : ""} ${index === 0 ? "sm:pl-0" : ""}`}
            >
              <dt className="label !text-[10px] text-accent">{rule.label}</dt>
              <dd className="mt-2 max-w-[320px] text-[12.5px] leading-[1.55] text-body">{rule.body}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <Eyebrow>{economics.calculator.eyebrow}</Eyebrow>
          <Heading className="max-w-[560px] !text-[26px] lg:!text-[32px]">{economics.calculator.heading}</Heading>
          <p className="mt-4 max-w-[560px] text-[13.5px] leading-[1.65] text-body">{economics.calculator.intro}</p>
          <div className="mt-7">
            <EconomicsProvider>
              <Ledger />
            </EconomicsProvider>
          </div>
        </div>
      </div>
    </Section>
  );
}
