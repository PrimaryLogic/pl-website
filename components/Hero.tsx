"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import EmailCapture from "./EmailCapture";
import { hero } from "@/lib/content";

const TYPE_MS = 55;
const DELETE_MS = 25;
const HOLD_MS = 1900;

/**
 * Rotating typewriter headline. Each phrase types out `accent` (line one's
 * colored tail) then `second` (line two), holds, deletes, and advances.
 * Under prefers-reduced-motion the first phrase renders statically instead.
 */
function useTypewriter(reduced: boolean) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const phrase = hero.phrases[index];
  const full = phrase.accent + phrase.second;

  useEffect(() => {
    if (reduced) return;

    const atEnd = !deleting && count === full.length;
    const atStart = deleting && count === 0;

    const t = setTimeout(
      () => {
        if (atEnd) {
          setDeleting(true);
        } else if (atStart) {
          setDeleting(false);
          setIndex((i) => (i + 1) % hero.phrases.length);
        } else {
          setCount((c) => c + (deleting ? -1 : 1));
        }
      },
      atEnd ? HOLD_MS : deleting ? DELETE_MS : TYPE_MS,
    );

    return () => clearTimeout(t);
  }, [count, deleting, full.length, reduced]);

  if (reduced) {
    const first = hero.phrases[0];
    return { accent: first.accent, second: first.second, onSecond: true };
  }

  return {
    accent: full.slice(0, Math.min(count, phrase.accent.length)),
    second: count > phrase.accent.length ? full.slice(phrase.accent.length, count) : "",
    onSecond: count > phrase.accent.length,
  };
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function Hero() {
  // Server renders the static phrase; the client opts into motion only if the
  // visitor hasn't asked us not to.
  const reduced = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => true,
  );

  const { accent, second, onSecond } = useTypewriter(reduced);

  return (
    <section className="px-4 pt-6 sm:px-6 sm:pt-10">
      <div className="mx-auto max-w-6xl rounded-card bg-surface px-6 py-14 shadow-card sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <p className="text-sm font-semibold text-accent sm:text-[15px]">{hero.eyebrow}</p>

        <h1 className="display mt-5 text-[40px] text-ink sm:text-[56px] lg:text-[62px]">
          <span className="flex min-h-[1.1em] flex-wrap items-center">
            <span className="whitespace-pre-wrap">{hero.phrases[0].lead}</span>
            <span className="whitespace-pre-wrap text-accent">{accent}</span>
            {!onSecond && <span className="caret" aria-hidden="true" />}
          </span>
          <span className="flex min-h-[1.1em] flex-wrap items-center">
            <span className="whitespace-pre-wrap">{second}</span>
            {onSecond && <span className="caret" aria-hidden="true" />}
          </span>
        </h1>

        <p className="mt-7 max-w-3xl text-[17px] leading-[1.75] text-muted sm:text-lg">
          {hero.body}{" "}
          <span className="mark-accent font-medium text-ink">{hero.highlight}</span>
        </p>

        <div className="mt-10">
          <EmailCapture placeholder={hero.emailPlaceholder} />
        </div>
      </div>
    </section>
  );
}
