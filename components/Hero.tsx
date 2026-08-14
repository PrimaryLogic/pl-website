import { hero } from "@/lib/content";
import EmailCapture from "./EmailCapture";

export default function Hero() {
  return (
    <section className="px-5 pb-9 pt-8 sm:px-10 sm:pb-8 sm:pt-8 lg:pb-12 lg:pt-11">
      <div className="mx-auto max-w-[1180px]">
        <h1 className="display max-w-[820px] text-[36px] leading-[1] text-ink sm:text-[44px] lg:text-[52px]">
          {hero.headingLead}
          <br />
          <span className="text-accent">{hero.headingAccent}</span>
        </h1>
        <p className="mt-5 max-w-[560px] text-[14.5px] leading-[1.65] text-body">
          {hero.body}
        </p>
        <p className="mt-3.5 text-[14px] font-semibold text-accent-deep">
          {hero.outcome}
        </p>
        <div className="mt-6">
          <EmailCapture id="hero-contact" variant="compact" emailPlaceholder="name@practice.com" lane="healthcare" />
        </div>
      </div>
    </section>
  );
}
