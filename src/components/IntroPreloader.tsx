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
  const pointerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
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
    document.documentElement.dataset.portfolioIntro = "active";
    window.dispatchEvent(new Event("intro-preloader-start"));
    if (shell) shell.inert = true;
    buttonRef.current?.focus({ preventScroll: true });

    const unlock = () => {
      if (document.documentElement.dataset.portfolioIntro === "active") {
        delete document.documentElement.dataset.portfolioIntro;
        window.dispatchEvent(new Event("intro-preloader-resume"));
      }
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
        unlock();
        window.dispatchEvent(new CustomEvent("intro-preloader-complete"));
        timers.push(window.setTimeout(() => {
          phaseRef.current = "done";
          setPhase("done");
          window.cancelAnimationFrame(raf);
          window.removeEventListener("keydown", onKey);
          window.removeEventListener("resize", onResize);
          document.removeEventListener("visibilitychange", onVisibility);
          motion.removeEventListener("change", onResize);
          const main = shell?.querySelector<HTMLElement>("main");
          if (main && !previousInert) {
            main.setAttribute("tabindex", "-1");
            main.focus({ preventScroll: true });
          }
        }, instant ? 0 : 500));
      }, instant ? 0 : 1250));
    };
    const onKey = (event: KeyboardEvent) => {
      if (phaseRef.current !== "welcome" || event.repeat || event.isComposing) return;
      // Keep browser/OS shortcuts and keyboard accessibility intact.
      if (event.ctrlKey || event.metaKey || event.altKey ||
          ["Shift", "Control", "Alt", "Meta", "CapsLock", "NumLock", "ScrollLock", "Fn", "AltGraph", "Dead", "Process", "Unidentified"].includes(event.key) ||
          /^F\d+$/.test(event.key)) return;
      if (event.key === "Tab") {
        event.preventDefault();
        buttonRef.current?.focus();
        return;
      }
      event.preventDefault();
      finish();
    };
    startRef.current = () => finish();
    window.addEventListener("keydown", onKey);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let w = 1, h = 1, depth = 1, focal = 1, last = 0;
    const lowPower = window.matchMedia("(pointer: coarse)").matches ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4 ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    let quality = lowPower ? 0.65 : 1;
    let starLimit = 0;
    let sampleTime = 0, sampleFrames = 0;
    let glowSprite: HTMLCanvasElement | null = null;
    let stars: Star[] = [];
    const pointer = { x: 0, y: 0, active: false };
    const trail: { x: number; y: number; vx: number; vy: number; life: number; size: number; color: string }[] = [];
    let previousX = 0, previousY = 0, lastParticle = 0;
    const overlay = overlayRef.current;
    const pointerEl = pointerRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hidePointer = () => {
      pointer.active = false;
      if (pointerEl) pointerEl.style.opacity = "0";
      overlay?.removeAttribute("data-pointer");
    };
    const onPointerMove = (event: PointerEvent) => {
      if (phaseRef.current !== "welcome" || motion.matches || !finePointer.matches || event.pointerType === "touch") {
        hidePointer();
        return;
      }
      const x = event.clientX, y = event.clientY;
      const dx = pointer.active ? x - previousX : 0;
      const dy = pointer.active ? y - previousY : 0;
      pointer.x = x; pointer.y = y; pointer.active = true;
      previousX = x; previousY = y;
      if (pointerEl) {
        pointerEl.style.transform = `translate3d(${x}px,${y}px,0)`;
        pointerEl.style.opacity = "1";
      }
      overlay?.setAttribute("data-pointer", "active");
      const now = performance.now();
      if (now - lastParticle < 12) return;
      lastParticle = now;
      const count = Math.min(5, Math.max(1, Math.ceil(Math.hypot(dx, dy) / 10)));
      for (let i = 0; i < count; i++) {
        const t = (i + 1) / count;
        trail.push({
          x: x - dx * (1 - t), y: y - dy * (1 - t),
          vx: (Math.random() - 0.5) * 1.7, vy: (Math.random() - 0.5) * 1.7,
          life: 1, size: 0.9 + Math.random() * 2.3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      if (trail.length > 120) trail.splice(0, trail.length - 120);
    };
    const onMotionChange = () => { if (motion.matches || !finePointer.matches) { hidePointer(); trail.length = 0; } };
    overlay?.addEventListener("pointermove", onPointerMove);
    overlay?.addEventListener("pointerleave", hidePointer);
    window.addEventListener("blur", hidePointer);
    motion.addEventListener("change", onMotionChange);
    finePointer.addEventListener("change", onMotionChange);
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
      const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      depth = Math.max(w, h);
      focal = depth * 0.55;
      const count = motion.matches ? 80 : Math.min(lowPower ? 460 : 1050, Math.max(240, Math.floor(w * h / 1250)));
      stars = Array.from({ length: count }, () => spawn(true));
      starLimit = Math.max(1, Math.floor(count * quality));
      if (!glowSprite) {
        glowSprite = document.createElement("canvas");
        glowSprite.width = glowSprite.height = 250;
        const glowCtx = glowSprite.getContext("2d");
        if (glowCtx) {
          const glow = glowCtx.createRadialGradient(125, 125, 0, 125, 125, 125);
          glow.addColorStop(0, "rgba(117, 195, 255, .13)");
          glow.addColorStop(0.45, "rgba(94, 118, 255, .055)");
          glow.addColorStop(1, "rgba(94, 118, 255, 0)");
          glowCtx.fillStyle = glow;
          glowCtx.fillRect(0, 0, 250, 250);
        }
      }
    }
    function frame(now: number) {
      raf = 0;
      if (!ctx || phaseRef.current === "done" || document.hidden) { last = 0; return; }
      const elapsed = last ? now - last : 16.667;
      const dt = Math.min(elapsed / 16.667, 3);
      last = now;
      // Reduce particle load only after sustained slow frames; recover gradually.
      if (!motion.matches && phaseRef.current === "welcome") {
        sampleTime += elapsed;
        sampleFrames++;
        if (sampleTime >= 1800) {
          const average = sampleTime / sampleFrames;
          if (average > 23) quality = Math.max(0.38, quality * 0.8);
          else if (average < 18) quality = Math.min(lowPower ? 0.75 : 1, quality + 0.08);
          starLimit = Math.max(1, Math.floor(stars.length * quality));
          sampleTime = sampleFrames = 0;
        }
      }
      const warping = phaseRef.current === "warp" && !motion.matches;
      const p = warping ? Math.min(1, (now - warpAt) / 1250) : 0;
      const speed = motion.matches ? 0 : warping ? 0.7 + Math.pow(p, 2.3) * 95 : 0.65;
      ctx.clearRect(0, 0, w, h);
      if (phaseRef.current === "welcome" && pointer.active && !motion.matches) {
        if (glowSprite) ctx.drawImage(glowSprite, pointer.x - 125, pointer.y - 125);
      }
      for (let i = 0; i < starLimit; i++) {
        let star = stars[i];
        star.z -= speed * dt;
        if (star.z < 12) Object.assign(star, spawn(false));
        const x = w / 2 + star.x * focal / star.z;
        const y = h / 2 + star.y * focal / star.z;
        if (x < -80 || x > w + 80 || y < -80 || y > h + 80) {
          Object.assign(star, spawn(false));
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
      if (phaseRef.current === "welcome" && !motion.matches) {
        for (let i = trail.length - 1; i >= 0; i--) {
          const particle = trail[i];
          particle.life -= 0.035 * dt;
          if (particle.life <= 0) { trail.splice(i, 1); continue; }
          particle.x += particle.vx * dt;
          particle.y += particle.vy * dt;
          ctx.globalAlpha = particle.life * 0.85;
          ctx.fillStyle = particle.color;
          const size = particle.size * particle.life;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - size * 1.8);
          ctx.lineTo(particle.x + size * 0.45, particle.y - size * 0.45);
          ctx.lineTo(particle.x + size * 1.8, particle.y);
          ctx.lineTo(particle.x + size * 0.45, particle.y + size * 0.45);
          ctx.lineTo(particle.x, particle.y + size * 1.8);
          ctx.lineTo(particle.x - size * 0.45, particle.y + size * 0.45);
          ctx.lineTo(particle.x - size * 1.8, particle.y);
          ctx.lineTo(particle.x - size * 0.45, particle.y - size * 0.45);
          ctx.closePath();
          ctx.fill();
        }
      } else if (trail.length || pointer.active) {
        trail.length = 0;
        hidePointer();
      }
      ctx.globalAlpha = 1;
      if (!motion.matches && !document.hidden) raf = window.requestAnimationFrame(frame);
    }
    const wake = () => {
      if (ctx && !raf && !document.hidden && phaseRef.current !== "done") {
        last = 0; sampleTime = sampleFrames = 0;
        raf = window.requestAnimationFrame(frame);
      }
    };
    const onVisibility = () => {
      if (document.hidden) { window.cancelAnimationFrame(raf); raf = 0; last = 0; hidePointer(); trail.length = 0; }
      else wake();
    };
    const onResize = () => { resize(); wake(); };
    resize();
    wake();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onResize);
    return () => {
      window.cancelAnimationFrame(raf);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onResize);
      overlay?.removeEventListener("pointermove", onPointerMove);
      overlay?.removeEventListener("pointerleave", hidePointer);
      window.removeEventListener("blur", hidePointer);
      motion.removeEventListener("change", onMotionChange);
      finePointer.removeEventListener("change", onMotionChange);
      hidePointer();
      startRef.current = null;
      if (phaseRef.current !== "done") unlock();
    };
  }, [mounted]);

  if (!mounted || phase === "done") return null;

  return createPortal(
    <div ref={overlayRef} className="portfolio-warp-intro" data-phase={phase} role="dialog" aria-modal={phase === "welcome"} aria-labelledby="warp-title">
      <canvas ref={canvasRef} aria-hidden="true" className="warp-canvas" />
      <div ref={pointerRef} className="warp-pointer" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M16 2 L19.2 12.8 L30 16 L19.2 19.2 L16 30 L12.8 19.2 L2 16 L12.8 12.8 Z" fill="#f0faff" stroke="#9de7ff" strokeWidth=".7" />
          <circle cx="16" cy="16" r="2.2" fill="white" />
        </svg>
      </div>
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
        <div className="warp-hint">Press any key to enter</div>
      </div>
      <style>{`
        .portfolio-warp-intro{position:fixed;inset:0;z-index:999999;background:#020306;color:#f7f8fc;display:grid;place-items:center;overflow:hidden;isolation:isolate;transition:opacity 500ms ease;cursor:auto!important}
        body.custom-star-cursor-active .portfolio-warp-intro *{cursor:auto!important}
        body.custom-star-cursor-active .portfolio-warp-intro button{cursor:pointer!important}
        .portfolio-warp-intro[data-phase="reveal"]{opacity:0;pointer-events:none}
        .warp-canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
        .warp-pointer{position:absolute;top:0;left:0;width:0;height:0;z-index:5;pointer-events:none;opacity:0;will-change:transform;transition:opacity 150ms}
        .warp-pointer svg{position:absolute;left:-15px;top:-15px;filter:drop-shadow(0 0 5px #fff) drop-shadow(0 0 12px #67dfff) drop-shadow(0 0 18px #9f7cff)}
        .portfolio-warp-intro:not([data-phase="welcome"]) .warp-pointer{opacity:0!important}
        @media(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){
          .portfolio-warp-intro[data-phase="welcome"][data-pointer="active"],
          .portfolio-warp-intro[data-phase="welcome"][data-pointer="active"] *,
          body.custom-star-cursor-active .portfolio-warp-intro[data-phase="welcome"][data-pointer="active"] *,
          body.custom-star-cursor-active .portfolio-warp-intro[data-phase="welcome"][data-pointer="active"] button{cursor:none!important}
        }
        @media(prefers-reduced-motion:reduce),(pointer:coarse){.warp-pointer{display:none}}
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