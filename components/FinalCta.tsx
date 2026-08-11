import EmailCapture from "./EmailCapture";
import { finalCta } from "@/lib/content";

export default function FinalCta() {
  return (
    <section className="border-t-2 border-ink px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-8 lg:grid-cols-2">
        <h2 className="display text-[30px] text-ink sm:text-[40px]">
          {finalCta.heading}
        </h2>
        <div>
          <p className="max-w-xl text-[16px] leading-[1.7] text-body">{finalCta.body}</p>
          <div className="mt-8">
            <EmailCapture id="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
