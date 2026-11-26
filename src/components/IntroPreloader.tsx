"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Star = { x: number; y: number; z: number; color: string; size: number };
type Phase = "welcome" | "warp" | "reveal" | "done";
const COLORS = ["#ffffff", "#e9f4ff", "#89bfff", "#ffb57d", "#b0a4ff"];

export default function IntroPreloader() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("welcome");
  const phaseRef = useRef<Phase>("welcome");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const startRef = useRef<(() => void) | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    const shell = document.querySelector<HTMLElement>(".page-shell");
    const previousInert = shell?.inert ?? false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers: number[] = [];
    let warpAt = 0;
    let raf = 0;
    document.body.style.overflow = "hidden";
    if (shell) shell.inert = true;
    buttonRef.current?.focus({ preventScroll: true });

    const unlock = () => {
      if (shell) shell.inert = previousInert;
      document.body.style.overflow = previousOverflow;
    };
    const finish = (skip = false) => {
      if (phaseRef.current !== "welcome") return;
      const instant = skip || motion.matches;
      phaseRef.current = "warp";
      warpAt = performance.now();
      setPhase("warp");
      timers.push(window.setTimeout(() => {
        phaseRef.current = "reveal";
        setPhase("reveal");
        window.dispatchEvent(new CustomEvent("intro-preloader-complete"));
        unlock();
        timers.push(window.setTimeout(() => {
          phaseRef.current = "done";
          setPhase("done");
          window.cancelAnimationFrame(raf);
          window.removeEventListener("keydown", onKey);
          window.removeEventListener("resize", resize);
          const main = shell?.querySelector<HTMLElement>("main");
          if (main && !previousInert) {
            main.setAttribute("tabindex", "-1");
            main.focus({ preventScroll: true });
          }
        }, instant ? 0 : 500));
      }, instant ? 0 : 1250));
    };
    const onKey = (event: KeyboardEvent) => {
      if (phaseRef.current !== "welcome") return;
      if (event.key === "Escape") { event.preventDefault(); finish(true); }
      if (event.key === "Tab") { event.preventDefault(); buttonRef.current?.focus(); }
    };
    startRef.current = () => finish();
    window.addEventListener("keydown", onKey);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let w = 1, h = 1, depth = 1, focal = 1, last = 0;
    let stars: Star[] = [];
    const spawn = (initial: boolean): Star => ({
      x: (Math.random() - 0.5) * w * 2,
      y: (Math.random() - 0.5) * h * 2,
      z: initial ? 30 + Math.random() * depth : depth,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 0.45 + Math.random() * 1.1,
    });
    function resize() {
      if (!canvas || !ctx) return;
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      depth = Math.max(w, h);
      focal = depth * 0.55;
      stars = Array.from({ length: Math.min(1050, Math.max(240, Math.floor(w * h / 1250))) }, () => spawn(true));
    }
    function frame(now: number) {
      if (!ctx || phaseRef.current === "done") return;
      const dt = last ? Math.min((now - last) / 16.667, 2) : 1;
      last = now;
      const warping = phaseRef.current === "warp" && !motion.matches;
      const p = warping ? Math.min(1, (now - warpAt) / 1250) : 0;
      const speed = motion.matches ? 0 : warping ? 0.7 + Math.pow(p, 2.3) * 95 : 0.65;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.z -= speed * dt;
        if (star.z < 12) star = stars[i] = spawn(false);
        const x = w / 2 + star.x * focal / star.z;
        const y = h / 2 + star.y * focal / star.z;
        if (x < -80 || x > w + 80 || y < -80 || y > h + 80) {
          stars[i] = spawn(false);
          continue;
        }
        const tailZ = star.z + (warping ? 8 + p * p * 380 : 0);
        const tx = w / 2 + star.x * focal / tailZ;
        const ty = h / 2 + star.y * focal / tailZ;
        const radius = Math.min(2.1, star.size * (0.55 + (1 - star.z / depth)));
        ctx.globalAlpha = Math.max(0.2, Math.min(0.95, 0.28 + (1 - star.z / depth) * 0.68));
        ctx.fillStyle = star.color;
        ctx.strokeStyle = star.color;
        ctx.lineWidth = radius;
        ctx.beginPath();
        if (warping) {
          ctx.moveTo(tx, ty);
          ctx.lineTo(x, y);
          ctx.stroke();
        } else {
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = window.requestAnimationFrame(frame);
    }
    resize();
    if (ctx) raf = window.requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(raf);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
      startRef.current = null;
      if (phaseRef.current !== "done") unlock();
    };
  }, [mounted]);

  if (!mounted || phase === "done") return null;

  return createPortal(
    <div className="portfolio-warp-intro" data-phase={phase} role="dialog" aria-modal={phase === "welcome"} aria-labelledby="warp-title">
      <canvas ref={canvasRef} aria-hidden="true" className="warp-canvas" />
      <div className="warp-floats" aria-hidden="true">
        <div className="warp-tile tile-one"><small>01 / ABOUT</small><strong>Hi, I&apos;m<br />Tuyen Doan.</strong><span>HELLO WORLD</span></div>
        <div className="warp-tile tile-two"><small>02 / STACK</small><strong>Build.<br />Ship. Repeat.</strong><span>Next.js &middot; TypeScript</span></div>
        <div className="warp-tile tile-three"><small>03 / PROJECTS</small><strong>Ideas into<br />reality.</strong><span>SELECTED WORK</span></div>
        <div className="warp-tile tile-four"><small>04 / 3D LAB</small><div className="warp-orbit">&#10023;</div><span>INTERACTIVE SPACE</span></div>
      </div>
      <div className="warp-content">
        <div className="warp-eyebrow">PORTFOLIO / 2026</div>
        <h1 id="warp-title">Welcome to my universe.</h1>
        <p>Tuyen Doan &middot; Full-Stack Software Engineer</p>
        <button ref={buttonRef} type="button" onClick={() => startRef.current?.()} disabled={phase !== "welcome"} className="warp-enter">Enter portfolio <span aria-hidden="true">&#8599;</span></button>
        <div className="warp-hint">Press Esc to skip</div>
      </div>
      <style>{`
        .portfolio-warp-intro{position:fixed;inset:0;z-index:999999;background:#020306;color:#f7f8fc;display:grid;place-items:center;overflow:hidden;isolation:isolate;transition:opacity 500ms ease;cursor:auto!important}
        body.custom-star-cursor-active .portfolio-warp-intro *{cursor:auto!important}
        body.custom-star-cursor-active .portfolio-warp-intro button{cursor:pointer!important}
        .portfolio-warp-intro[data-phase="reveal"]{opacity:0;pointer-events:none}
        .warp-canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
        .warp-content{position:relative;z-index:2;max-width:90vw;text-align:center;transition:opacity 300ms,transform 550ms cubic-bezier(.2,.7,.3,1)}
        .warp-eyebrow{font:500 11px var(--font-mono),monospace;letter-spacing:.28em;color:#9fb4d2;margin-bottom:18px}
        .warp-content h1{font-size:clamp(27px,4.4vw,64px);font-weight:500;letter-spacing:-.055em;line-height:1.12;margin:0 0 13px;color:#fff}
        .warp-content p{font-size:clamp(12px,1.4vw,16px);color:#b1b6c3;margin:0 0 26px}
        .warp-enter{border:0;border-radius:999px;background:#fff;color:#0b0e15;padding:12px 21px;font-size:14px;font-weight:600;display:inline-flex;align-items:center;gap:15px;transition:background 150ms,transform 150ms;cursor:pointer}
        .warp-enter:hover{background:#c8f1ff;transform:translateY(-2px)}
        .warp-enter:focus-visible{outline:2px solid #79d5ff;outline-offset:5px}
        .warp-hint{margin-top:16px;font-size:10px;color:#9da3b2;letter-spacing:.08em}
        .warp-floats{position:absolute;inset:0;pointer-events:none;transition:opacity 320ms,transform 650ms}
        .warp-tile{position:absolute;width:clamp(120px,15vw,218px);aspect-ratio:1.48;padding:clamp(12px,1.4vw,23px);display:flex;flex-direction:column;justify-content:space-between;border-radius:8px;box-shadow:0 16px 45px #0007;animation:warp-float 6s ease-in-out infinite alternate}
        .warp-tile small,.warp-tile span{font:600 clamp(8px,.7vw,11px) var(--font-mono),monospace;letter-spacing:.08em}
        .warp-tile strong{font-size:clamp(17px,2.3vw,34px);font-weight:600;letter-spacing:-.055em;line-height:1}
        .tile-one{top:10%;left:12%;background:#ff795c;color:#221510;--tilt:-8deg}
        .tile-two{top:9%;right:13%;background:#e9edf5;color:#182437;--tilt:8deg;animation-delay:-2s}
        .tile-three{bottom:11%;left:17%;background:#e4d5bb;color:#34291d;--tilt:5deg;animation-delay:-3s}
        .tile-four{bottom:9%;right:12%;background:#163c92;color:#dceaff;--tilt:13deg;animation-delay:-1s}
        .warp-orbit{font-size:clamp(30px,4vw,65px);text-align:center;line-height:1}
        @keyframes warp-float{from{transform:translateY(-7px) rotate(var(--tilt))}to{transform:translateY(9px) rotate(calc(var(--tilt) + 3deg))}}
        .portfolio-warp-intro:not([data-phase="welcome"]) .warp-content{opacity:0;transform:scale(.82);pointer-events:none}
        .portfolio-warp-intro:not([data-phase="welcome"]) .warp-floats{opacity:0;transform:scale(1.65)}
        @media(max-width:650px){.warp-tile{width:108px;padding:10px}.warp-tile strong{font-size:17px}.tile-one{top:9%;left:5%}.tile-two{top:12%;right:5%}.tile-three{bottom:12%;left:5%}.tile-four{bottom:8%;right:5%}}
        @media(max-height:490px){.warp-floats{display:none}}
        @media(prefers-reduced-motion:reduce){.portfolio-warp-intro,.warp-content,.warp-floats,.warp-enter{transition:none}.warp-tile{animation:none;transform:rotate(var(--tilt))}}
      `}</style>
    </div>,
    document.body,
  );
}