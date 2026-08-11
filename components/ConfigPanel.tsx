import { Section } from "./Section";
import { config } from "@/lib/content";

/** Syntax-colored by hand — this is an illustration, not a real editor. */
const line = {
  key: "text-[#9cdcfe]",
  str: "text-[#ce9178]",
  kw: "text-[#c586c0]",
  com: "text-[#6a7a6a]",
  punc: "text-[#8b8b8b]",
};

export default function ConfigPanel() {
  return (
    <Section>
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="overflow-hidden rounded-panel bg-[#16120f] shadow-card lg:col-span-3">
          <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[13px] text-white/45">
              {config.filename}
            </span>
          </div>

          <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-[1.85] text-white/85">
            <code>
              <span className={line.kw}>export const</span> coordinator ={" "}
              <span className={line.punc}>{"{"}</span>
              {"\n"}
              {"  "}
              <span className={line.key}>trigger</span>
              <span className={line.punc}>:</span>{" "}
              <span className={line.str}>&quot;referral.created&quot;</span>,{"\n"}
              {"  "}
              <span className={line.key}>channels</span>
              <span className={line.punc}>:</span> [
              <span className={line.str}>&quot;voice&quot;</span>,{" "}
              <span className={line.str}>&quot;sms&quot;</span>,{" "}
              <span className={line.str}>&quot;email&quot;</span>],{"\n"}
              {"\n"}
              {"  "}
              <span className={line.com}>
                {"// tone is per-agent, not per-message"}
              </span>
              {"\n"}
              {"  "}
              <span className={line.key}>voice</span>
              <span className={line.punc}>:</span>{" "}
              <span className={line.punc}>{"{"}</span>{"\n"}
              {"    "}
              <span className={line.key}>style</span>
              <span className={line.punc}>:</span>{" "}
              <span className={line.str}>&quot;empathetic&quot;</span>,{"\n"}
              {"    "}
              <span className={line.key}>pace</span>
              <span className={line.punc}>:</span>{" "}
              <span className={line.str}>&quot;patient&quot;</span>,{"\n"}
              {"    "}
              <span className={line.key}>language</span>
              <span className={line.punc}>:</span>{" "}
              <span className={line.str}>&quot;auto&quot;</span>,{"\n"}
              {"  "}
              <span className={line.punc}>{"}"}</span>,{"\n"}
              {"\n"}
              {"  "}
              <span className={line.key}>memory</span>
              <span className={line.punc}>:</span>{" "}
              <span className={line.punc}>{"{"}</span>{"\n"}
              {"    "}
              <span className={line.key}>scope</span>
              <span className={line.punc}>:</span>{" "}
              <span className={line.str}>&quot;patient&quot;</span>,{"\n"}
              {"    "}
              <span className={line.key}>crossChannel</span>
              <span className={line.punc}>:</span>{" "}
              <span className={line.kw}>true</span>,{"\n"}
              {"  "}
              <span className={line.punc}>{"}"}</span>,{"\n"}
              {"\n"}
              {"  "}
              <span className={line.key}>escalate</span>
              <span className={line.punc}>:</span> [
              <span className={line.str}>&quot;clinical&quot;</span>,{" "}
              <span className={line.str}>&quot;billing.dispute&quot;</span>],{"\n"}
              <span className={line.punc}>{"}"}</span>
            </code>
          </pre>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          {config.metrics.map((m) => (
            <div
              key={m.label}
              className="flex flex-1 flex-col justify-center rounded-panel bg-surface p-7 shadow-card"
            >
              <span className="display text-[44px] text-accent">{m.value}</span>
              <span className="mt-1 text-[15px] text-muted">{m.label}</span>
            </div>
          ))}
          <p className="text-[13px] leading-[1.6] text-faint">{config.caption}</p>
        </div>
      </div>
    </Section>
  );
}
