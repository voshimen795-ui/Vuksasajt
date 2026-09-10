"use client";

import * as React from "react";

type Node = { x: number; y: number; vx: number; vy: number };

const LINK_DISTANCE = 148;
const MAX_DPR = 2;

export function PowerGrid({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let running = true;

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(58, Math.round((width * height) / 22000));
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];

        if (!reduced) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance > LINK_DISTANCE) continue;

          const strength = 1 - distance / LINK_DISTANCE;
          ctx.strokeStyle = `rgba(255, 108, 30, ${strength * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }

        const pulse = reduced ? 0.5 : 0.5 + 0.5 * Math.sin(frame * 0.02 + i);
        ctx.fillStyle = `rgba(255, 140, 60, ${0.22 + pulse * 0.32})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      frame += 1;
    };

    let animationId = 0;
    const loop = () => {
      if (running) draw();
      animationId = window.requestAnimationFrame(loop);
    };

    seed();
    draw();
    if (!reduced) loop();

    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        seed();
        draw();
      }, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
