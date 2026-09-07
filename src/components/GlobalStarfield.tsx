"use client";

import { useEffect, useRef } from "react";

type CanvasStar = {
  x: number;
  y: number;
  radius: number;
  color: string;
  phase: number;
  speed: number;
};

const STAR_COLORS = [
  "#ffffff",
  "#55e7ff",
  "#bf7fff",
  "#ff7ad9",
  "#7dfcb9",
  "#7aa9ff",
  "#ffd98a",
];

export default function GlobalStarfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      (((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4) ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    const maxDpr = lowPower ? 1 : 1.25;
    const starCount = reducedMotion ? 45 : lowPower ? 85 : 125;
    const stars: CanvasStar[] = [];
    let width = 0;
    let height = 0;
    let rafId = 0;
    let visible = true;

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.6 + Math.random() * 1.8,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          phase: Math.random() * Math.PI * 2,
          speed: 0.0012 + Math.random() * 0.0022,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    };

    const draw = (time: number) => {
      if (!visible) {
        rafId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const pulse = reducedMotion ? 0.75 : 0.45 + Math.sin(time * star.speed + star.phase) * 0.35;
        const alpha = Math.max(0.18, Math.min(0.95, pulse));
        ctx.globalAlpha = alpha;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(draw);
      } else {
        rafId = 0;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !rafId && !reducedMotion) {
          rafId = window.requestAnimationFrame(draw);
        }
      },
      { threshold: 0.01 },
    );

    resize();
    observer.observe(canvas);
    if (reducedMotion) {
      draw(0);
    } else {
      rafId = window.requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-starfield" aria-hidden="true" />;
}
