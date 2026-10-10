import { cn } from "@/lib/utils";

// Fixed layout (viewBox 1440×240) so server and client render the same scene.
const BASE = 212;

type Tree = { x: number; h: number };
const farTrees: Tree[] = [
  { x: 40, h: 58 },
  { x: 95, h: 72 },
  { x: 150, h: 52 },
  { x: 260, h: 66 },
  { x: 310, h: 50 },
  { x: 540, h: 60 },
  { x: 590, h: 74 },
  { x: 830, h: 56 },
  { x: 880, h: 70 },
  { x: 930, h: 54 },
  { x: 1150, h: 64 },
  { x: 1205, h: 50 },
  { x: 1290, h: 72 },
  { x: 1350, h: 58 },
  { x: 1410, h: 66 },
];
const nearTrees: Tree[] = [
  { x: 30, h: 150 },
  { x: 110, h: 118 },
  { x: 205, h: 136 },
  { x: 330, h: 96 },
  { x: 560, h: 124 },
  { x: 860, h: 110 },
  { x: 935, h: 140 },
  { x: 1170, h: 128 },
  { x: 1255, h: 100 },
  { x: 1340, h: 146 },
  { x: 1425, h: 112 },
];

type House = { x: number; w: number; h: number; roof: number; chimney?: "left" | "right"; smoke?: boolean };
const houses: House[] = [
  { x: 390, w: 120, h: 62, roof: 46, chimney: "right" },
  { x: 650, w: 160, h: 78, roof: 58, chimney: "left", smoke: true },
  { x: 1010, w: 112, h: 58, roof: 42, chimney: "right" },
];

function treePaths({ x, h }: Tree, base: number) {
  const trunkH = h * 0.12;
  const tiers = [0, 1, 2].map((i) => {
    const bottom = base - trunkH - i * h * 0.24;
    const top = bottom - h * 0.42;
    const half = h * 0.32 * (1 - i * 0.25);
    const capH = (bottom - top) * 0.34;
    const capHalf = half * 0.34;
    return {
      body: `M${x - half} ${bottom} L${x} ${top} L${x + half} ${bottom} Z`,
      cap: `M${x - capHalf} ${top + capH} L${x} ${top} L${x + capHalf} ${top + capH} Q${x} ${top + capH * 0.7} ${x - capHalf} ${top + capH} Z`,
      // Snow resting on the tier's lower edge
      ledge: `M${x - half} ${bottom} Q${x} ${bottom - h * 0.05} ${x + half} ${bottom} Q${x} ${bottom - h * 0.015} ${x - half} ${bottom} Z`,
    };
  });
  return { trunk: { x: x - h * 0.035, y: base - trunkH, w: h * 0.07, h: trunkH }, tiers };
}

function TreeShape({ tree, base, near }: { tree: Tree; base: number; near?: boolean }) {
  const t = treePaths(tree, base);
  return (
    <g>
      <rect
        x={t.trunk.x}
        y={t.trunk.y}
        width={t.trunk.w}
        height={t.trunk.h}
        className="fill-(--scene-trunk)"
      />
      {t.tiers.map((tier, i) => (
        <g key={i}>
          <path d={tier.body} className={near ? "fill-(--scene-tree)" : "fill-(--scene-tree-far)"} />
          <path d={tier.ledge} className="fill-(--scene-snowcap)" opacity={near ? 0.9 : 0.6} />
          <path d={tier.cap} className="fill-(--scene-snowcap)" opacity={near ? 1 : 0.7} />
        </g>
      ))}
    </g>
  );
}

function HouseShape({ house, base }: { house: House; base: number }) {
  const { x, w, h, roof } = house;
  const wallTop = base - h;
  const apexX = x + w / 2;
  const apexY = wallTop - roof;
  const eave = 14;
  const chimX = house.chimney === "left" ? x + w * 0.2 : x + w * 0.68;
  const chimW = w * 0.12;
  // Height of the roof line at the chimney's position
  const roofAt = (cx: number) => apexY + (Math.abs(cx - apexX) / (w / 2 + eave)) * roof;
  const chimTop = apexY + roof * 0.1;
  const winW = w * 0.17;
  const winH = h * 0.32;
  const winY = wallTop + h * 0.22;
  const doorW = w * 0.18;
  const doorH = h * 0.5;

  return (
    <g>
      {/* Chimney (behind roof) */}
      <rect
        x={chimX}
        y={chimTop}
        width={chimW}
        height={roofAt(chimX) - chimTop + 6}
        className="fill-(--scene-roof)"
      />
      <rect
        x={chimX - 3}
        y={chimTop - 6}
        width={chimW + 6}
        height={8}
        rx={4}
        className="fill-(--scene-snowcap)"
      />
      {house.smoke && (
        <g className="scene-smoke fill-(--scene-smoke)">
          <circle cx={chimX + chimW / 2} cy={chimTop - 14} r={6} />
          <circle cx={chimX + chimW / 2 + 6} cy={chimTop - 30} r={8} />
          <circle cx={chimX + chimW / 2 + 14} cy={chimTop - 50} r={10} />
        </g>
      )}

      {/* Walls */}
      <rect x={x} y={wallTop} width={w} height={h} className="fill-(--scene-wall)" />

      {/* Snow rim sits just above the roof edges */}
      <path
        d={`M${x - eave - 3} ${wallTop + 3} L${apexX} ${apexY - 9} L${x + w + eave + 3} ${wallTop + 3} Z`}
        className="fill-(--scene-snowcap)"
      />
      <path
        d={`M${x - eave} ${wallTop + 4} L${apexX} ${apexY} L${x + w + eave} ${wallTop + 4} Z`}
        className="fill-(--scene-roof)"
      />
      {/* Icicles under the eaves */}
      {[0.08, 0.2, 0.34, 0.66, 0.8, 0.92].map((p, i) => {
        const ix = x - eave + p * (w + eave * 2);
        return (
          <path
            key={i}
            d={`M${ix - 2.5} ${wallTop + 4} L${ix} ${wallTop + 4 + (i % 2 ? 9 : 6)} L${ix + 2.5} ${wallTop + 4} Z`}
            className="fill-(--scene-snowcap)"
            opacity={0.9}
          />
        );
      })}

      {/* Glowing windows */}
      {[x + w * 0.14, x + w - w * 0.14 - winW].map((wx, i) => (
        <g key={i}>
          <rect
            x={wx}
            y={winY}
            width={winW}
            height={winH}
            rx={2}
            className="scene-window fill-(--scene-window)"
            style={{ animationDelay: `${i * 1.3 + x / 400}s` }}
          />
          <path
            d={`M${wx + winW / 2} ${winY} V${winY + winH} M${wx} ${winY + winH / 2} H${wx + winW}`}
            className="stroke-(--scene-wall)"
            strokeWidth={2}
          />
          <rect
            x={wx - 2}
            y={winY + winH - 1}
            width={winW + 4}
            height={4}
            rx={2}
            className="fill-(--scene-snowcap)"
          />
        </g>
      ))}

      {/* Door */}
      <rect
        x={apexX - doorW / 2}
        y={base - doorH}
        width={doorW}
        height={doorH}
        rx={3}
        className="fill-(--scene-door)"
      />
    </g>
  );
}

/** Snowy village at the foot of the page: hills, pines and lit houses. Decorative. */
export function WinterVillage({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none w-full overflow-hidden", className)}>
      <svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" className="block h-40 w-full md:h-56">
        {/* Distant hills */}
        <path
          d="M0 160 Q180 108 380 146 T780 136 T1140 128 T1440 140 V240 H0 Z"
          className="fill-(--scene-hill)"
        />
        {farTrees.map((t) => (
          <TreeShape key={`f${t.x}`} tree={t} base={BASE - 26} />
        ))}

        {houses.map((h) => (
          <HouseShape key={h.x} house={h} base={BASE} />
        ))}

        {nearTrees.map((t) => (
          <TreeShape key={`n${t.x}`} tree={t} base={BASE + 10} near />
        ))}

        {/* Snow-covered ground with soft drifts */}
        <path
          d="M0 214 Q120 200 260 212 T540 208 Q640 214 720 207 T1000 210 T1260 205 T1440 210 V240 H0 Z"
          className="fill-(--scene-ground)"
        />
        <path
          d="M0 226 Q200 216 420 228 T860 224 T1240 226 T1440 222 V240 H0 Z"
          className="fill-(--scene-ground-shade)"
        />
      </svg>
    </div>
  );
}
