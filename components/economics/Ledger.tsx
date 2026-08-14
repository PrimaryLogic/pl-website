"use client";

import type { ReactNode } from "react";
import { economics } from "@/lib/content";
import { useEconomics } from "./EconomicsProvider";
import SliderField from "./SliderField";

const money = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const count = (value: number) => Math.round(value).toLocaleString("en-US");

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
      className={`flex items-baseline justify-between gap-6 px-4 py-3 sm:px-5 ${
        band ? "bg-band" : ""
      } ${emphasis === "sub" ? "border-t border-rule-mid" : ""} ${
        emphasis === "total"
          ? "border-t-4 border-double border-t-ink bg-accent-soft"
          : ""
      }`}
    >
      <span
        className={`text-[13px] leading-snug ${
          emphasis === "total" ? "font-semibold text-ink" : "text-body"
        }`}
      >
        {label}
      </span>
      <span
        className={`figure-num shrink-0 ${
          emphasis === "total"
            ? "text-[18px] font-semibold text-accent-deep sm:text-[22px]"
            : emphasis === "sub"
              ? "text-[15.5px] font-medium text-ink"
              : "text-[14px] text-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function Ledger() {
  const { inputs, set, model } = useEconomics();
  const { fields, rows } = economics;

  function setReferralCount(value: number) {
    set("monthlyReferrals", value);
    if (inputs.currentBooked > value) set("currentBooked", value);
    if (inputs.modeledBooked > value) set("modeledBooked", value);
  }

  return (
    <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)]">
      <div>
        <p className="label text-accent">Your referral cohort</p>
        <div className="mt-2 divide-y divide-rule">
          <SliderField
            {...fields.monthlyReferrals}
            value={inputs.monthlyReferrals}
            onChange={setReferralCount}
            min={50}
            max={5000}
            step={25}
          />
          <SliderField
            {...fields.currentBooked}
            value={inputs.currentBooked}
            onChange={(value) => {
              const next = Math.min(value, inputs.monthlyReferrals);
              set("currentBooked", next);
              if (inputs.modeledBooked < next) set("modeledBooked", next);
            }}
            min={0}
            max={Math.max(inputs.monthlyReferrals, 1)}
            step={1}
          />
          <SliderField
            {...fields.modeledBooked}
            value={inputs.modeledBooked}
            onChange={(value) => set("modeledBooked", Math.min(value, inputs.monthlyReferrals))}
            min={Math.min(inputs.currentBooked, inputs.monthlyReferrals)}
            max={Math.max(inputs.monthlyReferrals, 1)}
            step={1}
          />
          <SliderField
            {...fields.monthlyCoordinationCost}
            value={inputs.monthlyCoordinationCost}
            onChange={(value) => set("monthlyCoordinationCost", value)}
            min={0}
            max={250000}
            step={1000}
            prefix="$"
          />
          <SliderField
            {...fields.contributionPerBooking}
            value={inputs.contributionPerBooking}
            onChange={(value) => set("contributionPerBooking", value)}
            min={0}
            max={2000}
            step={25}
            prefix="$"
          />
          <SliderField
            {...fields.outcomeFee}
            value={inputs.outcomeFee}
            onChange={(value) => set("outcomeFee", value)}
            min={0}
            max={500}
            step={5}
            prefix="$"
          />
        </div>
      </div>

      <div>
        <p className="label text-accent">What the inputs imply</p>
        <div className="mt-2 overflow-hidden rounded-md border border-rule-mid bg-card">
          <div className="border-b-2 border-ink px-4 py-4 sm:px-5">
            <p className="label text-mute">Current operation</p>
          </div>
          <Row label={fields.monthlyReferrals.label} value={count(inputs.monthlyReferrals)} band />
          <Row label={fields.currentBooked.label} value={count(model.currentBooked)} />
          <Row label={rows.currentRate} value={`${model.currentBookingRate.toFixed(1)}%`} />
          <Row label={rows.unbooked} value={count(model.unbookedReferrals)} band />
          <Row
            label={rows.costPerBooking}
            value={model.currentCostPerBooking === null ? "N/A" : money(model.currentCostPerBooking)}
            emphasis="sub"
          />

          <div className="border-y-2 border-ink bg-ink px-4 py-3 sm:px-5">
            <p className="label text-paper">Modeled conversion scenario</p>
          </div>
          <Row label={rows.modeledRate} value={`${model.modeledBookingRate.toFixed(1)}%`} band />
          <Row label={rows.additionalBooked} value={`+${count(model.additionalBooked)}`} />
          <Row
            label={rows.monthlyOpportunity}
            value={money(model.monthlyContributionOpportunity)}
            emphasis="sub"
          />
          <Row label={rows.annualOpportunity} value={money(model.annualContributionOpportunity)} />

          <div className="border-y-2 border-ink bg-ink px-4 py-3 sm:px-5">
            <p className="label text-paper">The deal, annualized</p>
          </div>
          <Row label={rows.annualOperatingValue} value={money(model.annualOperatingValue)} band />
          <Row label={rows.annualGrossSwitchingValue} value={money(model.annualGrossSwitchingValue)} emphasis="sub" />
          <Row label={rows.annualOutcomeFee} value={`− ${money(model.annualOutcomeFee)}`} />
          <div aria-live="polite" aria-atomic="true">
            <Row
              label={rows.annualCustomerRetained}
              value={<output>{money(model.annualCustomerRetained)}</output>}
              emphasis="total"
            />
          </div>
        </div>

        <p className="mt-3 text-[12px] font-medium text-accent-deep">
          {model.annualGrossSwitchingValue > 0
            ? `You keep ${model.customerRetainedPct.toFixed(0)}% of the modeled gross value${model.grossValueToFee ? ` — ${model.grossValueToFee.toFixed(1)}× the fee` : ""}.`
            : "Set the inputs above to model your cohort."}
        </p>

        <p className="mt-4 border-l-2 border-rule-mid pl-4 text-[12px] leading-[1.65] text-mute">
          {economics.note}
        </p>
      </div>
    </div>
  );
}
