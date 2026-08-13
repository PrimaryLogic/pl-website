import Link from "next/link";
import { lanes } from "@/lib/content/home";
import { Eyebrow, Heading, Section } from "../Section";

export default function LanesSection() {
  return (
    <Section id="lanes" className="sm:!py-8 lg:!py-12">
      <Eyebrow>{lanes.eyebrow}</Eyebrow>
      <Heading className="max-w-[560px] !text-[30px] lg:!text-[38px]">{lanes.heading}</Heading>
      <p className="mt-4 max-w-[560px] text-[13px] leading-[1.6] text-body lg:text-[15px] lg:leading-[1.7]">
        {lanes.intro}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {lanes.cards.map((card) => {
          const live = card.status === "Live";
          const internal = card.link.href.startsWith("/");
          const linkClass =
            "mt-4 inline-flex min-h-8 items-center text-[13px] font-semibold text-accent-deep transition-colors hover:text-accent";

          return (
            <article
              key={card.title}
              className={`flex flex-col rounded-2xl border bg-white p-5 shadow-[0_8px_24px_rgba(18,20,16,0.04)] ${
                live ? "border-accent/40" : "border-rule"
              }`}
            >
              <span
                className={`label self-start rounded-full px-2.5 py-1 !text-[9px] ${
                  live
                    ? "bg-accent-soft text-accent-deep"
                    : "bg-band text-mute"
                }`}
              >
                {card.status}
              </span>
              <h3 className="mt-3.5 text-[16px] font-semibold leading-[1.3] text-ink">{card.title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-[1.65] text-body">{card.body}</p>
              {internal ? (
                <Link href={card.link.href} data-analytics={card.analyticsId} className={linkClass}>
                  {card.link.label}
                </Link>
              ) : (
                <a href={card.link.href} data-analytics={card.analyticsId} className={linkClass}>
                  {card.link.label}
                </a>
              )}
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-[12px] text-mute">{lanes.next}</p>
    </Section>
  );
}
