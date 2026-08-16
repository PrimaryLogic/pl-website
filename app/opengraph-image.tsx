import { ImageResponse } from "next/og";

export const alt = "Primary Logic | Turn missed demand into completed outcomes.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(family: string, weight: number) {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`, { headers: { "User-Agent": "curl/8" } }).then((r) => r.text());
    const url = css.match(/url\((https:[^)]+\.(?:ttf|otf|woff))\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch { return null; }
}

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
        justifyContent: "space-between",
        background: "#f7f8f6",
        color: "#101a15",
        padding: "64px 72px",
        borderTop: "14px solid #0e7c4a",
        fontFamily: text ? "Text" : "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: display ? "Display" : "sans-serif", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>Primary Logic</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ fontFamily: display ? "Display" : "sans-serif", fontSize: 46, lineHeight: 1.06, whiteSpace: "nowrap", fontWeight: 600, letterSpacing: "-0.03em" }}>
          Turn missed demand into completed outcomes.
        </div>
        <div style={{ marginTop: 22, fontSize: 22, lineHeight: 1.45, whiteSpace: "nowrap", color: "#4a554e" }}>
          Primary Logic works after-hours, overflow, and aged leads until the job is complete.
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 18, borderTop: "2px solid #101a15", fontSize: 18, color: "#4a554e" }}>
        <div>PER COMPLETED OUTCOME</div>
        <div>FINISHES THE JOB, ACROSS DAYS OR WEEKS</div>
      </div>
    </div>,
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
