"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export function CountUp({
  to,
  duration = 1.8,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (reduced) {
      node.textContent = String(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        node.textContent = String(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
