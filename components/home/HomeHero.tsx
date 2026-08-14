import { hero } from "@/lib/content/home";
import EmailCapture from "../EmailCapture";
import OutcomeJourney from "./OutcomeJourney";

export default function HomeHero() {
  return (
    <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:pt-14">
      <div className="mx-auto max-w-[1392px]">
        <h1 className="display max-w-[980px] text-[36px] leading-[0.98] tracking-[-0.045em] text-ink sm:text-[46px] lg:text-[52px]">
          {hero.headingLead} {hero.headingAccent}
        </h1>
        <p className="display mt-5 max-w-[820px] text-[18px] leading-[1.32] tracking-[-0.02em] text-mute sm:text-[21px] lg:text-[23px]">
          {hero.body}
        </p>
        <div className="mt-7">
          <EmailCapture
            id="hero-contact"
            variant="landing"
            buttonLabel="Start a pilot"
            emailPlaceholder="Enter your work email"
          />
        </div>

        <OutcomeJourney />
      </div>
    </section>
  );
}
