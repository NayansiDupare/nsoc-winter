"use client";

import { useEffect, useRef } from "react";
import { useUIStore } from "@/store/ui-store";

type Flake = { x: number; y: number; r: number; vy: number; drift: number; phase: number; alpha: number };

/** Lightweight canvas snowfall, fixed over the whole viewport so it falls on every section. */
export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enabled = useUIStore((s) => s.snowEnabled);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let color = getComputedStyle(canvas).color;
    let width = 0;
    let height = 0;
    const flakes: Flake[] = [];
    let raf = 0;
    let last = performance.now();

    const makeFlake = (y?: number): Flake => ({
      x: Math.random() * width,
      y: y ?? Math.random() * height,
      r: Math.random() * 2.2 + 0.6,
      vy: Math.random() * 25 + 18,
      drift: Math.random() * 18 + 6,
      phase: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.5 + 0.35,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = window.innerWidth < 768 ? 40 : 120;
      if (flakes.length > target) flakes.length = target;
      while (flakes.length < target) flakes.push(makeFlake());
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      for (const f of flakes) {
        f.phase += dt;
        f.y += f.vy * dt;
        f.x += Math.sin(f.phase) * f.drift * dt;
        if (f.y - f.r > height) Object.assign(f, makeFlake(-f.r));
        if (f.x > width + 5) f.x = -5;
        else if (f.x < -5) f.x = width + 5;
        ctx.globalAlpha = f.alpha;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => cancelAnimationFrame(raf);
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onMotionChange = () => {
      if (!reduce.matches) return start();
      stop();
      ctx.clearRect(0, 0, width, height);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    // Theme switches change the --snow colour.
    const themeObserver = new MutationObserver(() => {
      color = getComputedStyle(canvas).color;
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    resize();
    // Start once the page has loaded and the browser is idle, so the snow never
    // competes with first paint and hydration.
    let idle = 0;
    const begin = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(start, { timeout: 2000 })
        : window.setTimeout(start, 200);
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("load", begin);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      stop();
      observer.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onMotionChange);
      ctx.clearRect(0, 0, width, height);
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 size-full text-(--snow)"
    />
  );
}
