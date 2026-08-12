"use client";

import { useState } from "react";
import { comparison } from "@/lib/content";
import { useEconomics } from "./EconomicsProvider";
import { count, money } from "./Ledger";
import SliderField from "./SliderField";
import { track } from "@/lib/analytics";

type Key = (typeof comparison.options)[number]["key"];

const tone: Record<Key, { bar: string; text: string }> = {
  paid: { bar: "bg-loss", text: "text-loss" },
  team: { bar: "bg-mute", text: "text-body" },
  coverage: { bar: "bg-accent", text: "text-accent-deep" },
};

export default function Comparison() {
  const { inputs, set, model } = useEconomics();
  const [selected, setSelected] = useState<Key>("coverage");
  const active = comparison.options.find((option) => option.key === selected)!;
  const values = comparison.options
    .map((option) => model.perPatient[option.key])
    .filter((value): value is number => value !== null);
  const max = values.length ? Math.max(...values) : 0;

  const monthly: Record<Key, number | null> = {
    paid: model.perPatient.paid === null ? null : model.perPatient.paid * model.recoveredPerMonth,
    team: model.perPatient.team === null ? null : model.teamMonthlyCost,
    coverage: model.perPatient.coverage === null ? null : inputs.platformCost,
  };

  return (
    <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.65fr)]">
      <div>
        <div className="flex flex-col gap-5" aria-label="Cost per modelled completion">
          {comparison.options.map((option) => {
            const value = model.perPatient[option.key];
            const selectedOption = option.key === selected;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  setSelected(option.key);
                  track("comparison_selected", { option: option.key });
                }}
                aria-pressed={selectedOption}
                className="group min-h-11 text-left"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className={`text-[14px] ${selectedOption ? "font-semibold text-ink" : "text-body"}`}>{option.label}</span>
                  <span className={`figure-num text-[15px] font-medium ${tone[option.key].text}`}>{value === null ? "—" : money(value)}</span>
                </span>
                <span className="mt-2 block h-2 bg-band">
                  <span
                    className={`block h-full transition-[width] duration-300 ease-out ${tone[option.key].bar}`}
                    style={{ width: max > 0 && value !== null ? `${(value / max) * 100}%` : "0%" }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <details className="group mt-8 border-t border-rule">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-4 text-[13px] font-medium text-body marker:hidden">
            {comparison.assumptionsLabel}
            <span aria-hidden="true" className="figure-num text-[17px] text-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="grid divide-y divide-rule border-t border-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="sm:px-4 sm:first:pl-0">
              <SliderField {...comparison.fields.coordinatorCost} value={inputs.coordinatorCost} onChange={(value) => set("coordinatorCost", value)} min={2000} max={15000} step={100} prefix="$" />
            </div>
            <div className="sm:px-4">
              <SliderField {...comparison.fields.coordinatorCapacity} value={inputs.coordinatorCapacity} onChange={(value) => set("coordinatorCapacity", value)} min={25} max={500} step={5} />
            </div>
            <div className="sm:px-4 sm:last:pr-0">
              <SliderField {...comparison.fields.platformCost} value={inputs.platformCost} onChange={(value) => set("platformCost", value)} min={0} max={40000} step={250} prefix="$" />
            </div>
          </div>
        </details>
      </div>

      <aside className="border-t-2 border-ink pt-5" aria-live="polite">
        <p className="label text-mute">Selected model</p>
        <p className={`figure-num mt-4 text-[36px] font-semibold leading-none ${tone[selected].text}`}>
          {model.perPatient[selected] === null ? "—" : money(model.perPatient[selected]!)}
        </p>
        <p className="label mt-2 text-mute">{comparison.rows.perPatient}</p>
        <p className="mt-5 text-[14px] leading-[1.65] text-body">{active.body}</p>
        <dl className="mt-6 border-t border-rule">
          {[
            [comparison.rows.monthly, monthly[selected] === null ? "—" : money(monthly[selected]!)],
            [comparison.rows.reach, active.reach],
            [comparison.rows.scale, active.scale],
            [comparison.rows.risk, active.risk],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[110px_1fr] gap-4 border-b border-rule py-3">
              <dt className="label text-mute">{label}</dt>
              <dd className="text-[13px] leading-[1.5] font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        {model.coordinatorsNeeded > 0 && (
          <p className="mt-5 text-[12px] leading-[1.65] text-mute">
            The team model sizes {count(model.coordinatorsNeeded)} {model.coordinatorsNeeded === 1 ? "coordinator" : "coordinators"} against {count(model.lostPerMonth)} unfinished cases each month.
          </p>
        )}
      </aside>

      <p className="text-[12px] leading-[1.65] text-mute lg:col-span-2">{comparison.caption}</p>
    </div>
  );
}
