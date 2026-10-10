"use client";

import dynamic from "next/dynamic";

// Client-only and code-split so the canvas never blocks first paint.
export const SnowfallLazy = dynamic(() => import("@/components/winter/snowfall"), { ssr: false });
