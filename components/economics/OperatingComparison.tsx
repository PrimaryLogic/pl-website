import { economics } from "@/lib/content";

const columns = [
  ["customerOwns", economics.alternatives.columns.customerOwns],
  ["billing", economics.alternatives.columns.billing],
] as const;

export default function OperatingComparison() {
  const { alternatives } = economics;

  return (
    <div>
      <div
        className="overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_14px_36px_rgba(18,20,16,0.04)]"
        role="table"
        aria-label="Referral operations alternatives"
      >
        <div className="hidden grid-cols-[1.05fr_1.35fr_1.05fr] gap-5 border-b border-rule bg-band/55 px-5 py-3 md:grid" role="row">
          {[alternatives.columns.model, alternatives.columns.customerOwns, alternatives.columns.billing].map((column) => (
            <div key={column} className="label !text-[10px] text-mute" role="columnheader">
              {column}
            </div>
          ))}
        </div>

        <div role="rowgroup">
          {alternatives.options.map((option) => (
            <div
              key={option.model}
              className={`grid gap-4 border-b border-rule px-5 py-4 last:border-b-0 md:grid-cols-[1.05fr_1.35fr_1.05fr] md:gap-5 md:py-3.5 ${
                option.primary ? "border-l-[3px] border-l-accent bg-accent-soft/60 md:-ml-px" : ""
              }`}
              role="row"
            >
              <div role="cell">
                <span className="label block !text-[10px] text-mute md:hidden">{alternatives.columns.model}</span>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 md:mt-0">
                  <p className={`text-[14px] font-semibold ${option.primary ? "text-accent-deep" : "text-ink"}`}>
                    {option.model}
                  </p>
                  {option.primary && (
                    <span className="label rounded-full bg-white px-2.5 py-1 !text-[9px] text-accent-deep shadow-[inset_0_0_0_1px_rgba(8,119,71,0.18)]">
                      {alternatives.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11.5px] leading-[1.45] text-mute">{option.purchase}</p>
              </div>

              {columns.map(([key, label]) => (
                <div key={key} role="cell">
                  <span className="label block !text-[10px] text-mute md:hidden">{label}</span>
                  <p
                    className={`mt-1.5 text-[12.5px] leading-[1.5] md:mt-0 ${
                      option.primary && key === "billing" ? "font-semibold text-accent-deep" : "text-body"
                    }`}
                  >
                    {option[key]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-[1.6] text-mute">{alternatives.note}</p>
    </div>
  );
}
