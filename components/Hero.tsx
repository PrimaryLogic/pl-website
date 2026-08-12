import { hero, operatingPrinciples } from "@/lib/content";

export default function Hero() {
  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-end gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)]">
          <div>
            <p className="label text-accent">{hero.eyebrow}</p>
            <h1 className="display mt-4 max-w-4xl text-[40px] text-ink sm:text-[56px] lg:text-[60px]">
              {hero.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-body">
              {hero.body}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={hero.primaryCta.href}
                data-analytics="hero-primary-cta"
                className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                data-analytics="hero-secondary-cta"
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-rule-mid px-5 py-3 text-[15px] font-medium text-ink transition-colors hover:border-ink hover:bg-card"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <aside className="border-t-2 border-ink" aria-label="Coverage contract">
              <div className="flex items-center justify-between border-b border-rule py-3">
              <p className="label text-mute">Coverage contract</p>
              <span className="figure-num text-[12px] text-accent-deep">Active</span>
            </div>
            <dl>
              {[
                ["Starts when", "A patient step becomes due"],
                ["Owns", "The next permitted action"],
                ["Reads", "Reply, status, and workflow state"],
                ["Stops when", "Complete, declined, or handed off"],
              ].map(([term, detail]) => (
                <div key={term} className="grid grid-cols-[96px_1fr] gap-4 border-b border-rule py-3">
                  <dt className="label text-mute">{term}</dt>
                  <dd className="text-[14px] leading-[1.55] font-medium text-ink">{detail}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <p className="display mt-12 max-w-4xl border-l-4 border-accent pl-5 text-[20px] text-ink sm:mt-16 sm:text-[24px]">
          {hero.thesis}
        </p>

        <dl className="mt-12 grid border-y border-rule-mid sm:grid-cols-3 sm:divide-x sm:divide-rule">
          {operatingPrinciples.map((item) => (
            <div key={item.label} className="border-b border-rule py-4 last:border-b-0 sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <dt className="label text-accent">{item.label}</dt>
              <dd className="mt-2 text-[14px] leading-[1.6] text-body">{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
