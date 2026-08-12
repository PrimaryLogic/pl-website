import Ledger from "./economics/Ledger";
import { hero } from "@/lib/content";

/**
 * The hero is the argument, not a slogan: the reader's own numbers, computed
 * on first paint. Nothing here is a Primary Logic performance claim.
 */
export default function Hero() {
  return (
    <section id="ledger" className="px-5 pt-14 pb-20 sm:px-8 sm:pt-20 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <p className="label text-accent">{hero.eyebrow}</p>

        <h1 className="display mt-6 max-w-4xl text-[38px] text-ink sm:text-[54px] lg:text-[62px]">
          {hero.heading.lead}
          <span className="text-loss">{hero.heading.emphasis}</span>
          {hero.heading.tail}
        </h1>

        <p className="mt-7 max-w-2xl text-[16px] leading-[1.7] text-body sm:text-[17px]">
          {hero.body}
        </p>

        <div className="mt-14 border-t-2 border-ink pt-10">
          <p className="max-w-2xl text-[15px] leading-relaxed text-body">
            {hero.ledgerLead}
          </p>
          <div className="mt-8">
            <Ledger />
          </div>
        </div>
      </div>
    </section>
  );
}
