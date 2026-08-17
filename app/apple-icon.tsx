import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0e6b47", borderRadius: 40 }}>
      <svg width="120" height="120" viewBox="0 0 32 32"><path d="M9 9h14v5.6H14.6V23H9z" fill="#fff" /></svg>
    </div>,
    size,
  );
}
