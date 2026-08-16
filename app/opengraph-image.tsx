import { ImageResponse } from "next/og";

export const alt = "Primary Logic | Turn missed demand into completed outcomes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const green = "#0e6b47";
const greenInk = "#0b3d2b";
const greenSoft = "#e4f1ea";
const blueSoft = "#eaeef7";
const blue = "#3d4f8a";
const ink = "#14201b";
const body = "#46524c";
const mute = "#7b867f";
const line = "#e3e6e0";

/** Best-effort: load the site's display face so the card matches the page. */
async function loadFont(family: string, weight: number) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
      // No browser UA → Google serves TTF, which Satori can read.
      { headers: { "User-Agent": "curl/8" } },
    ).then((r) => r.text());
    const url = css.match(/url\((https:[^)]+\.(?:ttf|otf|woff))\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

const beats: Array<{ day: string; who: string; text: string; tone: "us" | "them" | "system" }> = [
  { day: "Day 1", who: "Your system", text: "Diagnosed 34 days ago. Still unscheduled.", tone: "system" },
  { day: "Day 1", who: "Text → Luis", text: "Tuesday 9:40 or Thursday 2:15? Reply 1 or 2.", tone: "us" },
  { day: "Day 1", who: "Luis", text: "Thursday works. Which office?", tone: "them" },
  { day: "Day 4", who: "Call → Luis", text: "Booked. Financing question → your coordinator.", tone: "us" },
  { day: "Day 9", who: "Your system", text: "Appointment marked arrived.", tone: "system" },
];

export default async function OpenGraphImage() {
  const [display, text] = await Promise.all([loadFont("Schibsted Grotesk", 600), loadFont("Inter", 500)]);
  const fonts = [
    ...(display ? [{ name: "Display", data: display, weight: 600 as const, style: "normal" as const }] : []),
    ...(text ? [{ name: "Text", data: text, weight: 500 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#f7f7f4",
        color: ink,
        padding: "44px 60px 40px",
        fontFamily: text ? "Text" : "sans-serif",
      }}
    >
      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative", width: 30, height: 30, borderRadius: 8, background: green, display: "flex" }}>
          <div style={{ position: "absolute", left: 8, top: 8, width: 14, height: 14, borderRadius: 2, background: "#fff", display: "flex" }}>
            <div style={{ position: "absolute", left: 6, top: 6, width: 8, height: 8, background: green, display: "flex" }} />
          </div>
        </div>
        <div style={{ fontFamily: display ? "Display" : "sans-serif", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>Primary Logic</div>
      </div>

      {/* Headline */}
      <div style={{ display: "flex", flexDirection: "column", marginTop: 32 }}>
        <div style={{ fontFamily: display ? "Display" : "sans-serif", fontSize: 60, lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.03em", width: 900 }}>
          Turn missed demand into completed outcomes.
        </div>
        <div style={{ marginTop: 14, fontSize: 22, lineHeight: 1.4, color: body, width: 860 }}>
          Primary Logic completes jobs end to end — staying with the work until it’s done, across days or months. Pay per completed outcome.
        </div>
      </div>

      {/* Mini case storyboard */}
      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", background: "#fff", border: `1px solid ${line}`, borderRadius: 14, padding: "18px 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 15, color: mute }}>
          <div style={{ display: "flex" }}>One case, illustrative · <span style={{ color: ink, marginLeft: 6 }}>Get Luis to a</span><span style={{ color: green, marginLeft: 6, fontWeight: 600 }}>kept visit</span></div>
          <div style={{ display: "flex", padding: "3px 9px", borderRadius: 6, background: "#f1f3ef", color: body, fontSize: 13 }}>Day 1 → Day 9</div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          {beats.map((b, i) => {
            const bg = b.tone === "us" ? greenSoft : b.tone === "them" ? blueSoft : "transparent";
            const metaColor = b.tone === "us" ? green : b.tone === "them" ? blue : mute;
            const last = i === beats.length - 1;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: b.tone === "us" || last ? green : "#fff", border: `2px solid ${b.tone === "them" ? blue : last || b.tone === "us" ? green : "#cfd5cd"}`, display: "flex" }} />
                  <div style={{ fontSize: 13, color: mute }}>{b.day}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginTop: 10, padding: b.tone === "system" ? "0" : "10px 12px", borderRadius: 10, background: bg, minHeight: 78 }}>
                  <div style={{ fontSize: 12, color: metaColor }}>{b.who}</div>
                  <div style={{ marginTop: 4, fontSize: 15, lineHeight: 1.35, color: last ? greenInk : ink, fontWeight: last ? 600 : 500 }}>{b.text}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, padding: "12px 16px", borderRadius: 10, background: greenInk, color: "#fff", fontSize: 16 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#9fdcbd", display: "flex" }} />
          <div style={{ fontWeight: 600 }}>Kept treatment visit</div>
          <div style={{ color: "rgba(255,255,255,0.75)" }}>· Verified in your practice schedule. The only thing you’re billed for.</div>
        </div>
      </div>
    </div>,
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
