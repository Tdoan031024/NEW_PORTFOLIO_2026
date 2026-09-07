"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const coreRef = useRef<HTMLDivElement | null>(null);
  const ringARef = useRef<HTMLDivElement | null>(null);
  const ringBRef = useRef<HTMLDivElement | null>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      (((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4) ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    if (coarse || reducedMotion || lowPower) return;

    document.body.classList.add("custom-cursor-enabled");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let aX = mouseX;
    let aY = mouseY;
    let bX = mouseX;
    let bY = mouseY;
    let rafId = 0;
    let rid = 0;

    const setHoverState = (hover: boolean) => {
      coreRef.current?.classList.toggle("is-hover", hover);
      ringARef.current?.classList.toggle("is-hover", hover);
      ringBRef.current?.classList.toggle("is-hover", hover);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      coreRef.current?.style.setProperty("transform", `translate3d(${mouseX}px, ${mouseY}px, 0)`);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor='hover']",
      );
      setHoverState(Boolean(interactive));
    };

    const onDown = (e: MouseEvent) => {
      const id = ++rid;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 520);
    };

    const tick = () => {
      aX += (mouseX - aX) * 0.2;
      aY += (mouseY - aY) * 0.2;
      bX += (mouseX - bX) * 0.1;
      bY += (mouseY - bY) * 0.1;

      ringARef.current?.style.setProperty("transform", `translate3d(${aX}px, ${aY}px, 0)`);
      ringBRef.current?.style.setProperty("transform", `translate3d(${bX}px, ${bY}px, 0)`);
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={ringBRef} className="custom-cursor-ring-b" aria-hidden="true" />
      <div ref={ringARef} className="custom-cursor-ring-a" aria-hidden="true" />
      <div ref={coreRef} className="custom-cursor-core" aria-hidden="true" />
      {ripples.map((r) => (
        <span
          key={r.id}
          className="custom-cursor-ripple"
          style={{ left: r.x, top: r.y }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
