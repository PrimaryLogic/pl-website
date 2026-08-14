import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { pilot } from "@/lib/content/home";

export default function PilotSection() {
  return (
    <section id="proof" className="scroll-mt-6 bg-white px-4 pb-10 sm:px-6 sm:pb-14">
      <div className="mx-auto max-w-[1392px] rounded-[20px] bg-[#f5f4f2] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-11">
        <p className="label !text-[9.5px] text-accent">{pilot.eyebrow}</p>
        <h2 className="display mt-4 max-w-[880px] text-[30px] leading-[1.04] text-ink sm:text-[38px] lg:text-[44px]">
          {pilot.heading}
        </h2>
        <p className="mt-5 max-w-[760px] text-[14px] leading-[1.65] text-body sm:text-[15px]">{pilot.intro}</p>

        <ol className="mt-8 grid overflow-hidden rounded-[12px] border border-rule bg-white lg:grid-cols-4" aria-label="How a Primary Logic pilot works">
          {pilot.steps.map((step, index) => (
            <li key={step.title} className={`p-4 sm:p-5 ${index > 0 ? "border-t border-rule lg:border-t-0 lg:border-l" : ""}`}>
              <div className="flex items-center justify-between gap-4">
                <p className="figure-num text-[10.5px] font-semibold text-accent">{String(index + 1).padStart(2, "0")}</p>
                {index < pilot.steps.length - 1 && <ArrowRight aria-hidden="true" size={14} className="hidden text-rule-mid lg:block" />}
              </div>
              <h3 className="display mt-4 text-[16.5px] leading-[1.15] text-ink">{step.title}</h3>
              <p className="mt-2.5 text-[12.5px] leading-[1.6] text-body">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-5 flex max-w-[840px] items-start gap-2.5 text-[13px] font-medium leading-[1.55] text-accent-deep">
          <CheckCircle aria-hidden="true" size={16} weight="fill" className="mt-0.5 shrink-0" />
          {pilot.closing}
        </p>
      </div>
    </section>
  );
}
