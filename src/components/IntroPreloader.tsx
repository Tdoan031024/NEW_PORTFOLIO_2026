"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface StarParticle {
  x: number;
  y: number;
  speed: number;
  size: number;
  tailLength: number;
  alpha: number;
  color: string;
  twinklePhase: number;
  twinkleSpeed: number;
}

const CELESTIAL_COLORS = [
  "#ffffff",
  "#7dfaff",
  "#38bdf8",
  "#a5b4fc",
  "#c084fc",
  "#fbcfe8",
  "#fef08a",
];

export default function IntroPreloader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Đang khởi tạo không gian số...");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelReadyRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    // Listen for 3D model loaded signal
    const handleModelReady = () => {
      modelReadyRef.current = true;
    };
    window.addEventListener("model-3d-ready", handleModelReady);

    // Canvas Horizontal Flying Stars Animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const getW = () =>
      Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0, 1200);
    const getH = () =>
      Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0, 800);

    let width = (canvas.width = getW());
    let height = (canvas.height = getH());

    const handleResize = () => {
      width = canvas.width = getW();
      height = canvas.height = getH();
    };
    window.addEventListener("resize", handleResize);

    // Generate horizontal flying stars with varying depth
    const starCount = Math.min(180, Math.floor((width * height) / 6000));
    const stars: StarParticle[] = [];

    for (let i = 0; i < starCount; i++) {
      const depth = Math.random(); // 0 (far) to 1 (near)
      const speed = 2 + depth * 14;
      const size = 0.8 + depth * 2.2;
      const tailLength = 4 + depth * 32;
      const color = CELESTIAL_COLORS[Math.floor(Math.random() * CELESTIAL_COLORS.length)];

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed,
        size,
        tailLength,
        alpha: 0.35 + depth * 0.6,
        color,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.03 + Math.random() * 0.05,
      });
    }

    let rafId = 0;
    let animActive = true;
    let currentProgress = 0;

    const renderLoop = () => {
      if (!animActive) return;

      ctx.clearRect(0, 0, width, height);

      // Warp speed acceleration as progress approaches 100%
      const warpFactor = 1 + (currentProgress / 100) * 0.9;

      for (const star of stars) {
        star.x += star.speed * warpFactor;
        star.twinklePhase += star.twinkleSpeed;

        // Wrap around when leaving right edge
        if (star.x - star.tailLength > width) {
          star.x = -star.tailLength - Math.random() * 40;
          star.y = Math.random() * height;
        }

        const twinkle = 0.7 + Math.sin(star.twinklePhase) * 0.3;
        const currentAlpha = Math.min(1, star.alpha * twinkle);

        // Draw horizontal star trail (flying streak)
        ctx.save();
        ctx.globalAlpha = currentAlpha;

        const grad = ctx.createLinearGradient(
          star.x - star.tailLength,
          star.y,
          star.x,
          star.y,
        );
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.7, star.color);
        grad.addColorStop(1, "#ffffff");

        ctx.strokeStyle = grad;
        ctx.lineWidth = star.size * 0.9;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(star.x - star.tailLength, star.y);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        // Draw luminous star head
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.size * 3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.65, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    // Progress counter simulation synced with 3D model
    const startTime = performance.now();
    const minDuration = 2200; // minimum display time for stunning entrance effect
    const maxSafetyDuration = 4000; // safety ceiling

    const progressTimer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const modelReady = modelReadyRef.current;

      let targetProgress = 0;

      if (elapsed < 800) {
        targetProgress = (elapsed / 800) * 38;
        setStatusText("Khởi tạo cấu trúc vũ trụ...");
      } else if (elapsed < 1600) {
        targetProgress = 38 + ((elapsed - 800) / 800) * 44; // up to 82%
        setStatusText("Đang nạp mô hình 3D & Shader...");
      } else {
        // From 82% onwards, await 3D model ready signal or reach min duration
        if (modelReady || elapsed >= minDuration) {
          const finishRatio = Math.min(1, (elapsed - 1600) / (minDuration - 1600 + 400));
          targetProgress = 82 + finishRatio * 18;
          setStatusText(
            targetProgress >= 99 ? "Sẵn sàng khám phá!" : "Đồng bộ không gian hoàn tất...",
          );
        } else {
          // Creep slowly while awaiting model
          targetProgress = Math.min(94, 82 + ((elapsed - 1600) / maxSafetyDuration) * 12);
          setStatusText("Hoàn tất kết cấu phòng 3D...");
        }
      }

      currentProgress += (targetProgress - currentProgress) * 0.28;

      if (currentProgress >= 99.5) {
        currentProgress = 100;
        setProgress(100);
        setStatusText("Sẵn sàng khám phá!");
        clearInterval(progressTimer);

        // Hold briefly at 100% then trigger curtain reveal
        setTimeout(() => {
          setIsLoaded(true);

          // Signal HeroThree to launch its introZoom camera glide
          window.dispatchEvent(new CustomEvent("intro-preloader-complete"));

          // Unlock scrolling
          document.body.style.overflow = "";

          // Clean up and unmount preloader after fade out transition
          setTimeout(() => {
            animActive = false;
            cancelAnimationFrame(rafId);
            setIsUnmounted(true);
          }, 900);
        }, 320);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, 32);

    return () => {
      animActive = false;
      cancelAnimationFrame(rafId);
      clearInterval(progressTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("model-3d-ready", handleModelReady);
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted || isUnmounted) return null;

  return createPortal(
    <div
      aria-hidden="true"
      className={`fixed inset-0 !z-[999999] flex flex-col items-center justify-center bg-[#020617] transition-all duration-700 ease-out select-none ${
        isLoaded ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Canvas for horizontal flying stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />

      {/* Ambient center celestial glow */}
      <div className="pointer-events-none absolute h-[380px] w-[380px] rounded-full bg-gradient-to-r from-cyan-500/15 via-blue-600/10 to-purple-600/15 blur-[90px] animate-pulse" />

      {/* Main Content Card */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Signature Logo with gentle glow */}
        <div className="relative mb-6">
          <div className="absolute -inset-3 rounded-full bg-cyan-400/20 blur-xl opacity-75 animate-pulse" />
          <Image
            src="/assets/logo/signature-white.png"
            alt="Tuyen Doan Signature Logo"
            width={160}
            height={55}
            priority
            className="relative h-11 sm:h-13 w-auto object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]"
          />
        </div>

        {/* Portfolio Label */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/[0.04] px-3.5 py-1 text-[11px] font-semibold tracking-[0.25em] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.12)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          PORTFOLIO 2026
        </div>

        {/* High-Tech Digital Percentage Display */}
        <div className="relative mb-4 flex items-baseline justify-center">
          <span className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-cyan-300 drop-shadow-[0_0_30px_rgba(34,211,238,0.75)]">
            {progress}
          </span>
          <span className="ml-1 text-2xl sm:text-3xl font-bold text-cyan-400/90 font-mono">
            %
          </span>
        </div>

        {/* Sleek Glowing Progress Bar with Sparkling Star Tip */}
        <div className="relative mb-4 h-2.5 w-[min(340px,78vw)] overflow-visible rounded-full border border-cyan-400/30 bg-slate-950/80 p-[2px] shadow-[0_0_25px_rgba(34,211,238,0.2)] backdrop-blur-md">
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-300 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.95)] transition-[width] duration-75 ease-out"
            style={{ width: `${Math.max(2, progress)}%` }}
          >
            {/* Sparkling leading 4-pointed star at the progress tip */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-white drop-shadow-[0_0_8px_#38bdf8] animate-spin"
                style={{ animationDuration: "3s" }}
                fill="currentColor"
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-cyan-200/75">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{statusText}</span>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-7 text-[11px] font-mono tracking-widest text-slate-500 uppercase">
        FULL-STACK SOFTWARE ENGINEER
      </div>
    </div>,
    document.body,
  );
}
