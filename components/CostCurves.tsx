import { Eyebrow, Heading, Section } from "./Section";
import { curves } from "@/lib/content";

/**
 * Shape-only small multiples. The vertical axis carries no scale on purpose —
 * the claim is about the direction of each cost curve, which is structural,
 * not about magnitudes we would have to invent.
 */
const shapes = {
  rising: { d: "M2,74 C60,71 120,52 198,8", stroke: "var(--color-loss)" },
  flat: { d: "M2,44 L198,44", stroke: "var(--color-mute)" },
  falling: { d: "M2,14 C60,44 120,62 198,74", stroke: "var(--color-accent)" },
} as const;

function Curve({ shape }: { shape: keyof typeof shapes }) {
  const { d, stroke } = shapes[shape];
  return (
    <svg
      viewBox="0 0 200 88"
      className="h-auto w-full"
      role="img"
      aria-label={`Cost per patient ${shape === "flat" ? "stays level" : shape} as volume increases`}
    >
      <line
        x1="2"
        y1="84"
        x2="198"
        y2="84"
        stroke="var(--color-rule-mid)"
        strokeWidth="1"
      />
      <path d={d} fill="none" stroke={stroke} strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  );
}

export default function CostCurves() {
  return (
    <Section>
      <div className="max-w-2xl">
        <Eyebrow>{curves.eyebrow}</Eyebrow>
        <Heading>{curves.heading}</Heading>
        <p className="mt-6 text-[16px] leading-[1.7] text-body">{curves.intro}</p>
      </div>

      <div className="mt-14 grid gap-px border border-rule-mid bg-rule sm:grid-cols-3">
        {curves.options.map((option) => (
          <div key={option.label} className="flex flex-col bg-card p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="display text-[18px] text-ink">{option.label}</h3>
            </div>

            <div className="mt-6">
              <Curve shape={option.shape} />
              <div className="mt-2 flex items-baseline justify-between">
                <span className="label text-mute">Volume →</span>
                <span className="figure-num text-[12px] text-body">{option.trend}</span>
              </div>
            </div>

            <p className="mt-6 text-[14px] leading-[1.65] text-body">{option.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 max-w-2xl text-[12px] leading-relaxed text-mute">
        {curves.caption}
      </p>
    </Section>
  );
}
