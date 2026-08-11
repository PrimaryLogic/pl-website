"use client";

import { useState, type ReactNode } from "react";
import { ledger } from "@/lib/content";

const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const count = (n: number) => Math.round(n).toLocaleString("en-US");

/** Numeric field kept as a string so the input can be cleared while typing. */
function useNumberField(initial: number) {
  const [raw, setRaw] = useState(String(initial));
  const value = Number(raw.replace(/[^0-9.]/g, "")) || 0;
  return { raw, setRaw, value };
}

function Field({
  id,
  label,
  hint,
  prefix,
  suffix,
  field,
}: {
  id: string;
  label: string;
  hint: string;
  prefix?: string;
  suffix?: string;
  field: ReturnType<typeof useNumberField>;
}) {
  return (
    <div className="flex flex-col gap-1.5 py-4">
      <label htmlFor={id} className="text-[14px] leading-snug font-medium text-ink">
        {label}
      </label>
      <div className="flex items-center gap-1.5 border-b border-rule-mid pb-1 focus-within:border-accent">
        {prefix && <span className="figure-num text-[15px] text-mute">{prefix}</span>}
        <input
          id={id}
          inputMode="decimal"
          value={field.raw}
          onChange={(e) => field.setRaw(e.target.value)}
          className="figure-num w-full min-w-0 bg-transparent text-[17px] font-medium text-ink outline-none"
        />
        {suffix && <span className="figure-num text-[15px] text-mute">{suffix}</span>}
      </div>
      <p className="text-[12px] leading-snug text-mute">{hint}</p>
    </div>
  );
}

function Row({
  label,
  value,
  band,
  emphasis,
}: {
  label: string;
  value: ReactNode;
  band?: boolean;
  emphasis?: "sub" | "total";
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 px-4 py-2.5 sm:px-5 ${
        band ? "bg-band" : ""
      } ${emphasis === "sub" ? "border-t border-rule-mid" : ""} ${
        emphasis === "total"
          ? "border-t-4 border-double border-t-ink bg-accent-soft"
          : ""
      }`}
    >
      <span
        className={`text-[14px] leading-snug ${
          emphasis === "total" ? "font-semibold text-ink" : "text-body"
        }`}
      >
        {label}
      </span>
      <span
        className={`figure-num shrink-0 tabular-nums ${
          emphasis === "total"
            ? "text-[22px] font-semibold text-accent-deep sm:text-[26px]"
            : emphasis === "sub"
              ? "text-[17px] font-medium text-ink"
              : "text-[15px] text-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function Ledger() {
  const { defaults, fields, rows } = ledger;

  const inbound = useNumberField(defaults.inbound);
  const dropRate = useNumberField(defaults.dropRate);
  const revenuePerPatient = useNumberField(defaults.revenuePerPatient);
  const acquisitionCost = useNumberField(defaults.acquisitionCost);
  const recoveryRate = useNumberField(defaults.recoveryRate);

  const lostPerMonth = inbound.value * (dropRate.value / 100);
  const monthlyLoss = lostPerMonth * revenuePerPatient.value;
  const annualLoss = monthlyLoss * 12;
  const recoverable = annualLoss * (recoveryRate.value / 100);
  const sunkMonthly = lostPerMonth * acquisitionCost.value;

  return (
    <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      {/* Inputs */}
      <div>
        <p className="label text-accent">Your numbers</p>
        <div className="mt-2 divide-y divide-rule">
          <Field
            id="inbound"
            {...fields.inbound}
            field={inbound}
          />
          <Field
            id="drop-rate"
            {...fields.dropRate}
            suffix="%"
            field={dropRate}
          />
          <Field
            id="revenue"
            {...fields.revenuePerPatient}
            prefix="$"
            field={revenuePerPatient}
          />
          <Field
            id="acquisition"
            {...fields.acquisitionCost}
            prefix="$"
            field={acquisitionCost}
          />
          <Field
            id="recovery"
            {...fields.recoveryRate}
            suffix="%"
            field={recoveryRate}
          />
        </div>
      </div>

      {/* Ledger */}
      <div>
        <p className="label text-accent">What it adds up to</p>

        <div className="mt-2 overflow-hidden rounded-sm border border-rule-mid bg-card">
          <Row label={fields.inbound.label} value={count(inbound.value)} band />
          <Row label={fields.dropRate.label} value={`${count(dropRate.value)}%`} />
          <Row label={rows.lost} value={count(lostPerMonth)} emphasis="sub" />

          <Row
            label={fields.revenuePerPatient.label}
            value={money(revenuePerPatient.value)}
            band
          />
          <Row label={rows.monthly} value={money(monthlyLoss)} />
          <Row label={rows.annual} value={money(annualLoss)} emphasis="sub" />

          <Row
            label={`${fields.recoveryRate.label} — your assumption`}
            value={`× ${count(recoveryRate.value)}%`}
            band
          />
          <Row label={rows.total} value={money(recoverable)} emphasis="total" />
        </div>

        {/* Sunk acquisition sits outside the summing column on purpose —
            recovering a patient realizes their revenue, it does not refund
            what was spent acquiring them. */}
        <aside className="mt-4 flex flex-col gap-2 border-l-2 border-loss/40 pl-4 sm:flex-row sm:items-baseline sm:gap-5">
          <span className="figure-num shrink-0 text-[17px] font-medium text-loss">
            {money(sunkMonthly)}
          </span>
          <span className="text-[13px] leading-relaxed text-body">
            <span className="font-medium text-ink">{ledger.sunkLabel}.</span>{" "}
            {ledger.sunkNote}
          </span>
        </aside>
      </div>
    </div>
  );
}
