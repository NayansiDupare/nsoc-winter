import confetti from "canvas-confetti";

/** Snow-coloured confetti burst. Skipped when the user prefers reduced motion. */
export function snowBurst(origin?: { x: number; y: number }) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  void confetti({
    particleCount: 80,
    spread: 70,
    startVelocity: 35,
    gravity: 0.6,
    ticks: 220,
    origin: origin ?? { x: 0.5, y: 0.6 },
    colors: ["#ffffff", "#e6f4ff", "#bfe3ff", "#7cc4f5", "#f59e3c"],
    shapes: ["circle"],
    scalar: 0.8,
    disableForReducedMotion: true,
  });
}

/** Origin for a burst centred on the given element. */
export function originOf(el: Element) {
  const r = el.getBoundingClientRect();
  return {
    x: (r.left + r.width / 2) / window.innerWidth,
    y: (r.top + r.height / 2) / window.innerHeight,
  };
}
