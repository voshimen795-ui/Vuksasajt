"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/** Kartica se blago naginje ka kursoru, uz odsjaj koji prati istu tačku. */
export function TiltCard({
  children,
  className,
  intensity = 7,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), SPRING);
  const shine = useTransform(
    [px, py],
    ([sx, sy]: number[]) =>
      `radial-gradient(260px circle at ${sx * 100}% ${sy * 100}%, rgba(255,255,255,0.10), transparent 60%)`,
  );

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || reduced) return;
    const rect = node.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("group/tilt relative [transform-style:preserve-3d]", className)}
    >
      {children}
      <motion.span
        aria-hidden
        style={{ background: shine }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
      />
    </motion.div>
  );
}
