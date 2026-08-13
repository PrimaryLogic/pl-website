import EmailCapture from "./EmailCapture";
import { finalCta } from "@/lib/content";

export default function FinalCta({
  heading = finalCta.heading,
  body = finalCta.body,
  emailPlaceholder,
  lane,
}: {
  heading?: string;
  body?: string;
  emailPlaceholder?: string;
  lane?: string;
}) {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-rule bg-white/45 px-5 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-[820px] text-center">
        <h2 className="display text-[34px] leading-[1.04] text-ink sm:text-[44px] lg:text-[52px]">
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-[640px] text-[15px] leading-[1.65] text-body sm:text-[17px]">
          {body}
        </p>
        <div className="mt-8 flex justify-center">
          <EmailCapture id="contact-form" variant="compact" emailPlaceholder={emailPlaceholder} lane={lane} />
        </div>
      </div>
    </section>
  );
}
