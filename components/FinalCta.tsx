import EmailCapture from "./EmailCapture";
import { finalCta } from "@/lib/content";

export default function FinalCta({
  heading = finalCta.heading,
  body = finalCta.body,
  emailPlaceholder,
  buttonLabel,
  helperText,
  lane,
  variant = "default",
}: {
  heading?: string;
  body?: string;
  emailPlaceholder?: string;
  buttonLabel?: string;
  helperText?: string;
  lane?: string;
  variant?: "default" | "landing";
}) {
  const landing = variant === "landing";

  return (
    <section id="contact" className={landing ? "scroll-mt-6 bg-white px-4 py-12 sm:px-6 sm:py-16" : "scroll-mt-20 border-t border-rule bg-white/45 px-5 py-12 sm:px-10 sm:py-16"}>
      <div className={`mx-auto text-center ${landing ? "max-w-[920px]" : "max-w-[820px]"}`}>
        <h2 className={`display text-ink ${landing ? "text-[32px] leading-[1.02] sm:text-[40px] lg:text-[46px]" : "text-[28px] leading-[1.06] sm:text-[34px] lg:text-[40px]"}`}>
          {heading}
        </h2>
        <p className={`mx-auto mt-4 max-w-[640px] leading-[1.65] text-body ${landing ? "text-[14px] sm:text-[15px]" : "text-[13.5px] sm:text-[14.5px]"}`}>
          {body}
        </p>
        <div className="mt-8 flex justify-center">
          <EmailCapture
            id="contact-form"
            variant={landing ? "landing" : "compact"}
            buttonLabel={buttonLabel ?? (landing ? "Start a pilot" : undefined)}
            emailPlaceholder={emailPlaceholder ?? (landing ? "Enter your work email" : undefined)}
            helperText={helperText}
            lane={lane}
          />
        </div>
      </div>
    </section>
  );
}
