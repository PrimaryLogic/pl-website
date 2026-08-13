import { hero } from "@/lib/content/home";
import EmailCapture from "../EmailCapture";

export default function HomeHero() {
  return (
    <section className="px-5 pb-10 pt-10 sm:px-10 sm:pb-9 sm:pt-9 lg:pb-14 lg:pt-14">
      <div className="mx-auto max-w-[1180px]">
        <h1 className="display max-w-[900px] text-[46px] leading-[0.98] text-ink sm:text-[54px] lg:text-[68px]">
          {hero.headingLead}
          <br />
          <span className="text-accent">{hero.headingAccent}</span>
        </h1>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.62] text-body">
          {hero.body}
        </p>
        <p className="mt-4 max-w-[560px] text-[15px] font-semibold text-accent-deep">
          {hero.outcome}
        </p>
        <div className="mt-6">
          <EmailCapture id="hero-contact" variant="compact" />
        </div>
      </div>
    </section>
  );
}
