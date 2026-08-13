import { pricing } from "@/lib/content/home";
import { Eyebrow, Heading, Section } from "../Section";

export default function PricingSection() {
  return (
    <Section id="pricing" className="sm:!py-10 lg:!py-14">
      <div className="grid gap-7 lg:grid-cols-[minmax(250px,.48fr)_minmax(0,1.52fr)] lg:items-start lg:gap-10">
        <div className="max-w-[360px] lg:pt-2">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <Heading className="!text-[31px] lg:!text-[37px]">{pricing.heading}</Heading>
          <p className="mt-5 text-[14px] leading-[1.65] text-body">{pricing.intro}</p>
        </div>

        <div
          className="overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_14px_36px_rgba(18,20,16,0.04)]"
          role="table"
          aria-label="How outcome pricing compares to seats, hours, and usage"
        >
          <div className="hidden grid-cols-[1fr_1.4fr_1.1fr] gap-5 border-b border-rule bg-band/55 px-5 py-3 md:grid" role="row">
            {[pricing.columns.model, pricing.columns.pays, pricing.columns.unfinished].map((column) => (
              <div key={column} className="label !text-[10px] text-mute" role="columnheader">
                {column}
              </div>
            ))}
          </div>

          <div role="rowgroup">
            {pricing.options.map((option) => (
              <div
                key={option.model}
                className={`grid gap-4 border-b border-rule px-5 py-4 last:border-b-0 md:grid-cols-[1fr_1.4fr_1.1fr] md:gap-5 md:py-3.5 ${
                  option.primary ? "border-l-[3px] border-l-accent bg-accent-soft/60 md:-ml-px" : ""
                }`}
                role="row"
              >
                <div role="cell">
                  <span className="label block !text-[10px] text-mute md:hidden">{pricing.columns.model}</span>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 md:mt-0">
                    <p className={`text-[14px] font-semibold ${option.primary ? "text-accent-deep" : "text-ink"}`}>
                      {option.model}
                    </p>
                    {option.primary && (
                      <span className="label rounded-full bg-white px-2.5 py-1 !text-[9px] text-accent-deep shadow-[inset_0_0_0_1px_rgba(8,119,71,0.18)]">
                        {pricing.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div role="cell">
                  <span className="label block !text-[10px] text-mute md:hidden">{pricing.columns.pays}</span>
                  <p className="mt-1.5 text-[12.5px] leading-[1.5] text-body md:mt-0">{option.pays}</p>
                </div>

                <div role="cell">
                  <span className="label block !text-[10px] text-mute md:hidden">{pricing.columns.unfinished}</span>
                  <p
                    className={`mt-1.5 text-[12.5px] leading-[1.5] md:mt-0 ${
                      option.primary ? "font-semibold text-accent-deep" : "text-body"
                    }`}
                  >
                    {option.unfinished}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <dl className="mt-9 grid overflow-hidden border-y border-rule sm:grid-cols-3">
        {pricing.rules.map((rule, index) => (
          <div
            key={rule.label}
            className={`py-4 sm:px-5 sm:py-5 ${index > 0 ? "border-t border-rule sm:border-t-0 sm:border-l" : ""} ${index === 0 ? "sm:pl-0" : ""}`}
          >
            <dt className="label !text-[10px] text-accent">{rule.label}</dt>
            <dd className="mt-2 max-w-[320px] text-[12.5px] leading-[1.55] text-body">{rule.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
