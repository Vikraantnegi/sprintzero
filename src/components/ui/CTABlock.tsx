"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";

type CTABlockProps = {
  line1: string;
  line2Italic: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

export function CTABlock({
  line1,
  line2Italic,
  body,
  ctaLabel = "Start a sprint",
  ctaHref = "#start",
  className,
}: CTABlockProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={["cta", className].filter(Boolean).join(" ")}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
    >
      <h2 className="relative z-[1] mx-auto max-w-xl font-display text-display-l text-text text-balance">
        {line1}
        <br />
        <em className="italic text-accent">{line2Italic}</em>
      </h2>
      <p className="relative z-[1] mx-auto mt-space-5 max-w-lg text-body text-muted">
        {body}
      </p>
      <div className="relative z-[1] mt-space-6 flex justify-center">
        <Button href={ctaHref} trailingArrow>
          {ctaLabel}
        </Button>
      </div>
    </motion.div>
  );
}
