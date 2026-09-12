"use client";

import { useEffect, useRef } from "react";

interface StardustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  spin: number;
  isStar: boolean;
}

const CELESTIAL_COLORS = [
  "#ffffff",
  "#7dfaff",
  "#35eaff",
  "#c084fc",
  "#ffd35c",
  "#f472b6",
  "#38bdf8",
];

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only disable on pure mobile touch screens with no mouse pointer
    const isTouchOnly =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches &&
      !window.matchMedia("(any-pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchOnly || prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    // Enable custom star cursor on body
    document.body.classList.add("custom-star-cursor-active");

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: StardustParticle[] = [];
    let mouseX = -100;
    let mouseY = -100;
    let lastX = -100;
    let lastY = -100;
    let isMouseDown = false;
    let isHovering = false;
    let rafId = 0;
    let active = true;

    // Helper to spawn a star or micro photon
    const spawnParticle = (
      originX: number,
      originY: number,
      extraSpeed = 1,
      forceStar = false,
    ) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.4 + Math.random() * 1.6) * extraSpeed;
      const size = Math.random() < 0.7 || forceStar ? 4 + Math.random() * 7 : 2 + Math.random() * 3;
      const color = CELESTIAL_COLORS[Math.floor(Math.random() * CELESTIAL_COLORS.length)];

      particles.push({
        x: originX + (Math.random() - 0.5) * 8,
        y: originY + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.5,
        size,
        color,
        alpha: 0.95 + Math.random() * 0.05,
        decay: 0.018 + Math.random() * 0.02,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.14,
        isStar: forceStar || Math.random() < 0.75,
      });

      if (particles.length > 80) {
        particles.shift();
      }
    };

    // Draw a single sparkling 4-pointed celestial star on canvas
    const drawStar = (
      pCtx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      rotation: number,
      color: string,
      alpha: number,
    ) => {
      pCtx.save();
      pCtx.translate(cx, cy);
      pCtx.rotate(rotation);
      pCtx.globalAlpha = alpha;
      pCtx.fillStyle = color;
      pCtx.shadowColor = color;
      pCtx.shadowBlur = size * 1.5;

      pCtx.beginPath();
      const rOuter = size;
      const rInner = size * 0.22;
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        const ia = a + Math.PI / 4;
        if (i === 0) {
          pCtx.moveTo(Math.cos(a) * rOuter, Math.sin(a) * rOuter);
        } else {
          pCtx.lineTo(Math.cos(a) * rOuter, Math.sin(a) * rOuter);
        }
        pCtx.lineTo(Math.cos(ia) * rInner, Math.sin(ia) * rInner);
      }
      pCtx.closePath();
      pCtx.fill();

      // Brilliant white center sparkle
      pCtx.fillStyle = "#ffffff";
      pCtx.beginPath();
      pCtx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
      pCtx.fill();

      pCtx.restore();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.opacity = "1";
      // Position the star cursor tip directly on the mouse coordinates
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      if (lastX === -100) {
        lastX = mouseX;
        lastY = mouseY;
        return;
      }

      const dist = Math.hypot(mouseX - lastX, mouseY - lastY);

      // When moving/dragging, scatter sparkling tiny stars along the trajectory
      if (dist >= 6) {
        const count = isMouseDown ? 3 : dist > 24 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          const lerpX = lastX + (mouseX - lastX) * (i / count);
          const lerpY = lastY + (mouseY - lastY) * (i / count);
          spawnParticle(lerpX, lerpY, isMouseDown ? 1.4 : 0.9);
        }
        lastX = mouseX;
        lastY = mouseY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      cursor.classList.add("is-active");

      // Burst 8 scattered sparkling stars on click/drag start
      for (let i = 0; i < 8; i++) {
        spawnParticle(e.clientX, e.clientY, 2.4, true);
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      cursor.classList.remove("is-active");
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
      document.body.classList.remove("custom-star-cursor-active");
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
      document.body.classList.add("custom-star-cursor-active");
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest(
          "a, button, input, textarea, select, [role='button'], .group-label, .tech-node, .cursor-pointer",
        ),
      );

      if (isInteractive !== isHovering) {
        isHovering = isInteractive;
        cursor.classList.toggle("is-hover", isHovering);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    // Main animation loop for stardust canvas
    const loop = () => {
      if (!active) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.spin;
        p.alpha -= p.decay;
        p.size *= 0.978;

        if (p.alpha <= 0.02 || p.size <= 0.6) {
          particles.splice(i, 1);
          continue;
        }

        if (p.isStar) {
          drawStar(ctx, p.x, p.y, p.size, p.rotation, p.color, p.alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.size * 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      active = false;
      document.body.classList.remove("custom-star-cursor-active");
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="star-cursor-trail-canvas" aria-hidden="true" />
      <div
        ref={cursorRef}
        className="star-cursor-main"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="star-cursor-svg"
        >
          <defs>
            <linearGradient id="starCoreGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#7dfaff" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          {/* Subtle outer glow star */}
          <path
            d="M12 0 C12 6.8, 6.8 12, 0 12 C6.8 12, 12 17.2, 12 24 C12 17.2, 17.2 12, 24 12 C17.2 12, 12 6.8, 12 0 Z"
            fill="#35eaff"
            opacity="0.4"
          />
          {/* Main 4-point celestial star */}
          <path
            d="M12 1 C12 7.2, 7.2 12, 1 12 C7.2 12, 12 16.8, 12 23 C12 16.8, 16.8 12, 23 12 C16.8 12, 12 7.2, 12 1 Z"
            fill="url(#starCoreGrad)"
          />
          {/* Brilliant diamond center */}
          <circle cx="12" cy="12" r="2.2" fill="#ffffff" />
        </svg>
      </div>
    </>
  );
}
