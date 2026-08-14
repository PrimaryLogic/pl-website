import { ImageResponse } from "next/og";

export const alt = "Primary Logic | Recover the referrals your first pass could not finish";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>PRIMARY LOGIC</div>
        <div style={{ fontSize: 18, color: "#0a5c37" }}>HEALTHCARE LANE</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "88%" }}>
        <div style={{ fontSize: 68, lineHeight: 1.04, fontWeight: 700, letterSpacing: "-0.035em" }}>
          Recover the referrals your first pass couldn’t finish
        </div>
        <div style={{ marginTop: 28, fontSize: 25, lineHeight: 1.45, color: "#4a554e" }}>
          Design-partner pilots for multi-site specialty groups.
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 18, borderTop: "2px solid #101a15", fontSize: 18, color: "#4a554e" }}>
        <div>ONE AGED COHORT</div>
        <div>NO REPLACEMENT</div>
        <div>CUSTOMER-SIDE EVIDENCE</div>
      </div>
    </div>,
    size,
  );
}
