import EmailCapture from "./EmailCapture";
import { finalCta } from "@/lib/content";

export default function FinalCta() {
  return (
    <section id="contact" className="border-t-4 border-double border-ink px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div>
          <p className="label text-accent">{finalCta.eyebrow}</p>
          <h2 className="display mt-4 text-[28px] text-ink sm:text-[36px]">{finalCta.heading}</h2>
        </div>
        <div>
          <p className="max-w-xl text-[15px] leading-[1.6] text-body">{finalCta.body}</p>
          <p className="mt-3 text-[13px] leading-[1.6] text-mute">{finalCta.formNote}</p>
          <div className="mt-6 border-t border-rule-mid pt-5">
            <EmailCapture id="contact-form" />
          </div>
        </div>
      </div>
    </section>
  );
}
