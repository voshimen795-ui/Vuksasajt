"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type Segment = { text: string; accent?: boolean };

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const word: Variants = {
  hidden: { y: "110%", rotate: 3 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Reči izranjaju iz maske, red po red, pri ulasku naslova u vidno polje. */
export function TextReveal({
  segments,
  className,
  as: Tag = "h2",
  delay = 0,
}: {
  segments: Segment[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag className={className}>
        {segments.map((segment, index) => (
          <span key={index} className={segment.accent ? "text-gradient-volt" : undefined}>
            {index > 0 ? " " : ""}
            {segment.text}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delayChildren: delay }}
        className="inline"
      >
        {segments.map((segment, segmentIndex) =>
          segment.text.split(" ").map((token, tokenIndex) => (
            // razmak stoji van maske kao pravi tekst, da naslov ostane čitljiv
            // čitačima ekrana i pretraživačima
            <React.Fragment key={`${segmentIndex}-${tokenIndex}`}>
              <span className="inline-block overflow-hidden py-[0.06em] align-bottom">
                <motion.span
                  variants={word}
                  className={cn("inline-block", segment.accent && "text-gradient-volt")}
                >
                  {token}
                </motion.span>
              </span>{" "}
            </React.Fragment>
          )),
        )}
      </motion.span>
    </Tag>
  );
}
