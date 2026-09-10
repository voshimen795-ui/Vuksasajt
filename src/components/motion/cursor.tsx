"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, [data-cursor="hover"]';

export function Cursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setActive(Boolean(target?.closest?.(INTERACTIVE)));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[60] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-volt mix-blend-screen"
      />
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        animate={{ scale: active ? 1.9 : 1, opacity: active ? 1 : 0.55 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[60] -ml-4 -mt-4 h-8 w-8 rounded-full border border-volt/70 bg-volt/[0.06] backdrop-blur-[1px]"
      />
    </>
  );
}
