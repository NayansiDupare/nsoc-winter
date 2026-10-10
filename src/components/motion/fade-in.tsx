"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type FadeInProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Fades and lifts its children in once they scroll into view. */
export function FadeIn({ delay = 0, y = 24, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}
