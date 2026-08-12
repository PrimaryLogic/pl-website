"use client";

import type { ReactNode } from "react";
import SliderField from "./SliderField";
import { useEconomics } from "./EconomicsProvider";
import { ledger } from "@/lib/content";

export const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export const count = (n: number) => Math.round(n).toLocaleString("en-US");

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
        className={`figure-num shrink-0 ${
          emphasis === "total"
            ? "text-[20px] font-semibold text-accent-deep sm:text-[24px]"
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
  const { inputs, set, model } = useEconomics();
  const { fields, rows } = ledger;

  return (
    <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <div>
        <p className="label text-accent">Your numbers</p>
        <div className="mt-2 divide-y divide-rule">
          <SliderField
            {...fields.inbound}
            value={inputs.inbound}
            onChange={(v) => set("inbound", v)}
            min={50}
            max={3000}
            step={25}
          />
          <SliderField
            {...fields.dropRate}
            value={inputs.dropRate}
            onChange={(v) => set("dropRate", v)}
            min={0}
            max={75}
            suffix="%"
          />
          <SliderField
            {...fields.revenuePerPatient}
            value={inputs.revenuePerPatient}
            onChange={(v) => set("revenuePerPatient", v)}
            min={100}
            max={8000}
            step={50}
            prefix="$"
          />
          <SliderField
            {...fields.recoveryRate}
            value={inputs.recoveryRate}
            onChange={(v) => set("recoveryRate", v)}
            min={0}
            max={80}
            suffix="%"
          />
          <details className="group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-3 text-[13px] font-medium text-body marker:hidden">
              {ledger.advancedLabel}
              <span aria-hidden="true" className="figure-num text-[17px] text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <SliderField
              {...fields.acquisitionCost}
              value={inputs.acquisitionCost}
              onChange={(v) => set("acquisitionCost", v)}
              min={0}
              max={1500}
              step={10}
              prefix="$"
            />
          </details>
        </div>
      </div>

      <div>
        <p className="label text-accent">What it adds up to</p>

        <div className="mt-2 overflow-hidden rounded-sm border border-rule-mid bg-card">
          <Row label={fields.inbound.label} value={count(inputs.inbound)} band />
          <Row label={fields.dropRate.label} value={`${count(inputs.dropRate)}%`} />
          <Row label={rows.lost} value={count(model.lostPerMonth)} emphasis="sub" />

          <Row
            label={fields.revenuePerPatient.label}
            value={money(inputs.revenuePerPatient)}
            band
          />
          <Row label={rows.monthly} value={money(model.monthlyLoss)} />
          <Row label={rows.annual} value={money(model.annualLoss)} emphasis="sub" />

          <Row
            label={`${fields.recoveryRate.label} — your assumption`}
            value={`× ${count(inputs.recoveryRate)}%`}
            band
          />
          <div aria-live="polite" aria-atomic="true">
            <Row label={rows.total} value={<output>{money(model.recoverableAnnual)}</output>} emphasis="total" />
          </div>
        </div>

        {/* Sunk acquisition sits outside the summing column on purpose —
            recovering a patient realizes their revenue, it does not refund
            what was spent acquiring them. */}
        <aside className="mt-4 flex flex-col gap-2 border-l-2 border-loss/40 pl-4 sm:flex-row sm:items-baseline sm:gap-5">
          <span className="figure-num shrink-0 text-[17px] font-medium text-loss">
            {money(model.sunkMonthly)}
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
