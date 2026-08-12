"use client";

import { useState } from "react";
import SliderField from "./SliderField";
import { useEconomics } from "./EconomicsProvider";
import { money, count } from "./Ledger";
import { comparison } from "@/lib/content";

type Key = (typeof comparison.options)[number]["key"];

const tone: Record<Key, { bar: string; text: string }> = {
  paid: { bar: "bg-loss", text: "text-loss" },
  team: { bar: "bg-mute", text: "text-body" },
  coverage: { bar: "bg-accent", text: "text-accent-deep" },
};

export default function Comparison() {
  const { inputs, set, model } = useEconomics();
  const [selected, setSelected] = useState<Key>("coverage");

  const perPatient = model.perPatient;
  const active = comparison.options.find((o) => o.key === selected)!;

  /** Cost of adding this month's recovered cohort, each way. */
  const monthly: Record<Key, number | null> = {
    paid:
      perPatient.paid === null ? null : perPatient.paid * model.recoveredPerMonth,
    team: perPatient.team === null ? null : model.teamMonthlyCost,
    coverage: perPatient.coverage === null ? null : inputs.platformCost,
  };

  const values = comparison.options
    .map((o) => perPatient[o.key])
    .filter((v): v is number => v !== null);
  const max = values.length ? Math.max(...values) : 0;

  return (
    <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <div>
        <p className="label text-accent">Your numbers</p>
        <div className="mt-2 divide-y divide-rule">
          <SliderField
            {...comparison.fields.coordinatorCost}
            value={inputs.coordinatorCost}
            onChange={(v) => set("coordinatorCost", v)}
            min={2000}
            max={15000}
            step={100}
            prefix="$"
          />
          <SliderField
            {...comparison.fields.coordinatorCapacity}
            value={inputs.coordinatorCapacity}
            onChange={(v) => set("coordinatorCapacity", v)}
            min={25}
            max={500}
            step={5}
          />
          <SliderField
            {...comparison.fields.platformCost}
            value={inputs.platformCost}
            onChange={(v) => set("platformCost", v)}
            min={0}
            max={40000}
            step={250}
            prefix="$"
          />
        </div>
      </div>

      <div>
        {/* Selected option, in detail */}
        <div className="rounded-sm border border-rule-mid bg-card">
          <div className="flex flex-wrap items-center gap-2 border-b border-rule px-5 py-4">
            {comparison.options.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelected(option.key)}
                aria-pressed={option.key === selected}
                className={`rounded-sm px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  option.key === selected
                    ? "bg-ink text-paper"
                    : "text-body hover:bg-band"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="px-5 py-7">
            <p className="label text-mute">{comparison.rows.perPatient}</p>
            <p
              className={`figure-num mt-2 text-[46px] leading-none font-semibold sm:text-[60px] ${tone[selected].text}`}
            >
              {perPatient[selected] === null ? "—" : money(perPatient[selected]!)}
            </p>
            <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-body">
              {active.body}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-px border-t border-rule bg-rule sm:grid-cols-4">
            {[
              {
                t: comparison.rows.monthly,
                v: monthly[selected] === null ? "—" : money(monthly[selected]!),
              },
              { t: comparison.rows.reach, v: active.reach },
              { t: comparison.rows.scale, v: active.scale },
              { t: comparison.rows.risk, v: active.risk },
            ].map((cell) => (
              <div key={cell.t} className="bg-card px-5 py-4">
                <dt className="label text-mute">{cell.t}</dt>
                <dd className="mt-1.5 text-[14px] leading-snug font-medium text-ink">
                  {cell.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* All three, side by side */}
        <div className="mt-6 flex flex-col gap-4">
          {comparison.options.map((option) => {
            const v = perPatient[option.key];
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelected(option.key)}
                className="group block text-left"
                aria-label={`Show ${option.label}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    className={`text-[14px] ${
                      option.key === selected ? "font-medium text-ink" : "text-body"
                    }`}
                  >
                    {option.label}
                  </span>
                  <span
                    className={`figure-num text-[15px] font-medium ${tone[option.key].text}`}
                  >
                    {v === null ? "—" : money(v)}
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-sm bg-band">
                  <div
                    className={`h-full rounded-sm transition-[width] duration-300 ease-out ${tone[option.key].bar}`}
                    style={{ width: max > 0 && v !== null ? `${(v / max) * 100}%` : "0%" }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {model.coordinatorsNeeded > 0 && (
          <p className="mt-5 text-[13px] leading-relaxed text-body">
            At this volume a team means{" "}
            <span className="figure-num font-medium text-ink">
              {count(model.coordinatorsNeeded)}
            </span>{" "}
            {model.coordinatorsNeeded === 1 ? "coordinator" : "coordinators"} working{" "}
            <span className="figure-num font-medium text-ink">
              {count(model.lostPerMonth)}
            </span>{" "}
            patients a month. Drag your inbound volume up and watch which of these
            three numbers moves.
          </p>
        )}

        <p className="mt-4 text-[12px] leading-relaxed text-mute">
          {comparison.caption}
        </p>
      </div>
    </div>
  );
}
