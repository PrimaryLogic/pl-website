"use client";

import { useId } from "react";

/**
 * A slider paired with the value as an editable figure.
 *
 * The slider is for feel; the typed field is for precision, because a practice
 * administrator arrives with exact numbers. The slider's max is a comfortable
 * range, not a cap — typing a larger value is honoured and simply pins the
 * thumb to the end rather than clamping the number.
 */
export default function SliderField({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  const id = useId();

  return (
    <div className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14px] leading-snug font-medium text-ink">
          {label}
        </label>
        <div className="flex shrink-0 items-baseline gap-0.5">
          {prefix && <span className="figure-num text-[14px] text-mute">{prefix}</span>}
          <input
            id={id}
            inputMode="decimal"
            value={value.toLocaleString("en-US")}
            onChange={(e) => {
              const next = Number(e.target.value.replace(/[^0-9.]/g, ""));
              onChange(Number.isFinite(next) ? next : 0);
            }}
            aria-label={label}
            className="figure-num w-[7ch] border-b border-rule-mid bg-transparent pb-0.5 text-right text-[16px] font-medium text-ink outline-none focus:border-accent"
          />
          {suffix && <span className="figure-num text-[14px] text-mute">{suffix}</span>}
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(Math.max(value, min), max)}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label} slider`}
        className="pl-range mt-3 w-full"
      />

      {hint && <p className="mt-1.5 text-[12px] leading-snug text-mute">{hint}</p>}
    </div>
  );
}
