import EmailCapture from "./EmailCapture";
import { finalCta } from "@/lib/content";

export default function FinalCta() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-6xl rounded-card bg-ink px-6 py-16 text-white shadow-card sm:px-14 sm:py-24">
        <h2 className="display max-w-3xl text-[34px] sm:text-[46px]">
          {finalCta.heading}
        </h2>
        <p className="mt-6 max-w-2xl text-[17px] leading-[1.75] text-white/65">
          {finalCta.body}
        </p>
        <div className="mt-10">
          <EmailCapture id="contact" />
        </div>
      </div>
    </section>
  );
}
