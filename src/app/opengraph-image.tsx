import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.edition.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fixed positions so the image is identical on every build.
const flakes = [
  [80, 90, 6],
  [210, 520, 4],
  [340, 160, 3],
  [520, 70, 5],
  [640, 560, 4],
  [760, 210, 3],
  [880, 100, 6],
  [1010, 480, 5],
  [1120, 260, 4],
  [150, 330, 3],
  [450, 420, 4],
  [1080, 570, 3],
];

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "src/assets/og-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 80px",
        gap: 56,
        color: "#f1f7ff",
        background:
          "radial-gradient(circle at 15% 20%, rgba(52,211,153,0.35), transparent 45%), radial-gradient(circle at 85% 30%, rgba(139,92,246,0.35), transparent 45%), linear-gradient(160deg, #0b1120 0%, #0f1b33 60%, #0b1120 100%)",
      }}
    >
      {flakes.map(([x, y, r], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: r * 2,
            height: r * 2,
            borderRadius: 999,
            background: "rgba(255,255,255,0.8)",
          }}
        />
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} width={300} height={300} alt="" style={{ borderRadius: 48 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#9fd8ff",
            border: "2px solid rgba(159,216,255,0.4)",
            borderRadius: 999,
            padding: "8px 22px",
            alignSelf: "flex-start",
          }}
        >
          {`${site.edition.name} · ${site.edition.label}`}
        </div>
        <div style={{ display: "flex", fontSize: 78, fontWeight: 700, lineHeight: 1.05, maxWidth: 680 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#b9c7dd" }}>45-Day Open Source Sprint</div>
      </div>
    </div>,
    size,
  );
}
