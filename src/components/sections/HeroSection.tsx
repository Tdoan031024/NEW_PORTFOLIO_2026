"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import GuideCallout from "@/components/GuideCallout";
import { type ReactNode, useEffect, useState } from "react";

type TechNode = {
  label: string;
  angle: number;
  color: string;
  icon: ReactNode;
};

const TECH_NODES: TechNode[] = [
  {
    label: "React",
    angle: 0,
    color: "#61dafb",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="9" ry="3.7" />
        <ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.7" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    label: "Next.js",
    angle: 45,
    color: "#f8fafc",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 16V8h1.7l5.1 8H13l-3.4-5.3V16H8Zm7.2-8H17v8h-1.8V8Z" />
      </svg>
    ),
  },
  {
    label: "Node.js",
    angle: 90,
    color: "#7cc327",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 2.8 20 7.4v9.2l-8 4.6-8-4.6V7.4L12 2.8Z" />
        <path d="M8.2 15.4V8.6h1.7l4.3 6.8V8.6h1.6v6.8h-1.7L9.8 8.7v6.7H8.2Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "NestJS",
    angle: 135,
    color: "#e0234e",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 3 19 6.4v6.5c0 4.1-2.8 6.5-7 8.1-4.2-1.6-7-4-7-8.1V6.4L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 16V8h1.9l4.2 5.1V8H16v8h-1.8L9.9 10.8V16H8Z" />
      </svg>
    ),
  },
  {
    label: "Laravel",
    angle: 180,
    color: "#ff2d20",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M4 7.2 8.8 4.5l4.8 2.7v5.6l-4.8 2.7L4 12.8V7.2Z" />
        <path d="M13.6 7.2 18.4 4.5 22 6.5v5.6l-4.8 2.7-3.6-2" />
        <path d="M8.8 15.5v4l4.8 2.7 4.8-2.7v-4.7" />
      </svg>
    ),
  },
  {
    label: "Tailwind CSS",
    angle: 225,
    color: "#38bdf8",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M6.5 10.5c1.2-4 3.7-6 7.5-6 2.3 0 4 .8 5.2 2.5.7 1 1.5 1.5 2.3 1.5-1.2 4-3.7 6-7.5 6-2.3 0-4-.8-5.2-2.5-.7-1-1.5-1.5-2.3-1.5Zm-4 5c1.2-4 3.7-6 7.5-6 2.3 0 4 .8 5.2 2.5.7 1 1.5 1.5 2.3 1.5-1.2 4-3.7 6-7.5 6-2.3 0-4-.8-5.2-2.5-.7-1-1.5-1.5-2.3-1.5Z" />
      </svg>
    ),
  },
  {
    label: "MongoDB",
    angle: 270,
    color: "#47a248",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12.5 2.5c3.3 3 5 6.1 5 9.5 0 4.1-2.1 7.1-5.5 9.5-3.2-2.2-5-5.2-5-9.2 0-3.7 1.9-6.9 5.5-9.8Z" />
        <path d="M12 7.5v13.3" stroke="#071124" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Docker",
    angle: 315,
    color: "#2496ed",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M4 12h3v-2H4v2Zm4 0h3v-2H8v2Zm4 0h3v-2h-3v2ZM8 9h3V7H8v2Zm4 0h3V7h-3v2Zm4 3h3v-2h-3v2Z" />
        <path d="M3 13h17.5c-.6 3.8-3.6 6-8.8 6H8.5C5.3 19 3 16.9 3 13Z" />
        <path d="M20 11.6c.6-.9 1.5-1.4 2.7-1.4-.2 1.2-.8 2-1.8 2.5" />
      </svg>
    ),
  },
];

const guideVersion = "portfolio-guides-2026-05-22-6";
const guideAnimationDuration = 6800;
const guideFadeDuration = 700;

function clampTilt(value: number, max = 7) {
  return Math.max(-max, Math.min(max, value));
}

export default function HeroSection() {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [modelGuideMounted, setModelGuideMounted] = useState(false);
  const [modelGuideVisible, setModelGuideVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [canTilt] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches,
  );
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    let hasShown = false;
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasShown) return;
        hasShown = true;
        setModelGuideMounted(true);
        window.requestAnimationFrame(() => setModelGuideVisible(true));
        timers.push(
          window.setTimeout(() => {
            setModelGuideVisible(false);
          }, guideAnimationDuration),
          window.setTimeout(() => {
            setModelGuideMounted(false);
          }, guideAnimationDuration + guideFadeDuration),
        );
        observer.disconnect();
      },
      { threshold: 0.22 },
    );

    observer.observe(hero);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: clampTilt(((y - centerY) / centerY) * -7),
      y: clampTilt(((x - centerX) / centerX) * 7),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHoveringAvatar(false);
  };

  useEffect(() => {
    const titles = [t("heroTitle"), "Hi! I'm Full-Stack Developer", "Hi! I'm Mobile Developer"];

    const handleTyping = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1),
      );
      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(400);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, t]);

  return (
    <section
      id="hero"
      className="relative z-[260] -mt-24 overflow-visible bg-transparent px-6 pb-28 pt-0 md:-mt-32 md:px-16"
    >
      {modelGuideMounted && (
        <GuideCallout
          label="Use these panels to navigate"
          className={`absolute inset-0 z-[620] hidden h-full w-full transition-opacity duration-700 lg:block ${
            modelGuideVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          viewBox="0 0 1920 720"
          initialOffset={{ x: 3, y: 47 }}
          start={{ x: 1100, y: 14 }}
          end={{ x: 1276, y: 171 }}
          labelBox={{ x: 993, y: -38, width: 310, height: 56 }}
          storageKey="guide-model-about"
          storageVersion={guideVersion}
        />
      )}
      <div className="relative z-0 mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1 lg:flex-[1.18]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-white/[0.035] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/85 shadow-[0_0_34px_rgba(34,211,238,.08)] backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,.8)]" />
            Fullstack Developer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-5 whitespace-nowrap text-[clamp(1.42rem,5vw,2.65rem)] font-semibold leading-[1.05] text-ink lg:text-[clamp(2.15rem,3.35vw,3rem)]"
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="typing-cursor" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl border-l border-cyan-300/25 pl-5 text-left text-[15px] leading-8 text-white/72 md:text-[16px]"
          >
            {t("heroDesc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_14px_34px_rgba(34,211,238,.18)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-white/82 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-200/45 hover:text-cyan-100"
            >
              Contact Me
            </a>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 flex justify-center lg:mt-0 lg:flex-[0.92] lg:justify-end"
        >
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringAvatar(true)}
            onMouseLeave={handleMouseLeave}
            className="relative h-[360px] w-[min(92vw,430px)] md:h-[460px] md:w-[460px]"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              animate={{ rotateX: canTilt ? tilt.x * 0.25 : 0, rotateY: canTilt ? tilt.y * 0.25 : 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 24, mass: 1.2 }}
              className="group relative flex h-full w-full translate-y-5 items-center justify-center md:translate-y-6"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 34, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-[18px] rounded-full border border-dashed border-cyan-300/14"
              />
              <div className="absolute inset-[2px] rounded-full border border-cyan-300/10" />
              <div className="absolute inset-[48px] rounded-full border border-white/10" />
              <div className="absolute inset-[-18px] rounded-full border border-cyan-300/12 animate-soft-pulse transition-all duration-500 group-hover:border-cyan-200/32 group-hover:shadow-[0_0_110px_rgba(34,211,238,.18)]" />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[292px] w-[292px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/18 shadow-[0_0_42px_rgba(34,211,238,0.14)] md:h-[354px] md:w-[354px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
                <span className="absolute bottom-[15%] right-[8%] h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_16px_rgba(147,197,253,0.85)]" />
              </motion.div>
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[326px] w-[326px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-100/12 md:h-[392px] md:w-[392px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="absolute left-[13%] top-[20%] h-1.5 w-1.5 rounded-full bg-violet-200 shadow-[0_0_14px_rgba(196,181,253,0.8)]" />
                <span className="absolute bottom-[7%] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-200 shadow-[0_0_16px_rgba(110,231,183,0.75)]" />
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 26, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-[-14px] md:inset-[-24px]"
              >
                {TECH_NODES.map((item) => (
                  <div
                    key={item.angle}
                    className="absolute left-1/2 top-1/2"
                    style={{ transform: `rotate(${item.angle}deg) translateX(clamp(138px, 34vw, 198px)) rotate(-${item.angle}deg)` }}
                  >
                    <div
                      aria-label={item.label}
                      title={item.label}
                      className="flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-[#071124d9] shadow-[0_0_24px_rgba(34,211,238,0.16)] backdrop-blur-md transition duration-300 group-hover:border-white/18 group-hover:bg-[#0a1630f0] md:h-11 md:w-11"
                      style={{ color: item.color }}
                    >
                      {item.icon}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -12, 0],
                  scale: [1, 1.012, 1],
                  rotateX: canTilt ? tilt.x * 1.2 : 0,
                  rotateY: canTilt ? tilt.y * 1.2 : 0,
                }}
                whileHover={{ scale: 1.035 }}
                transition={{
                  y: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  scale: { duration: 0.35, ease: "easeOut" },
                  rotateX: { type: "spring", stiffness: 90, damping: 22 },
                  rotateY: { type: "spring", stiffness: 90, damping: 22 },
                }}
                className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/18 bg-gradient-to-br from-white/20 via-white/5 to-cyan-500/10 shadow-[0_38px_120px_rgba(0,0,0,0.62),0_0_80px_rgba(34,211,238,.16)] transition-shadow duration-500 group-hover:shadow-[0_48px_150px_rgba(0,0,0,0.78),0_0_130px_rgba(34,211,238,.26)] md:h-[330px] md:w-[330px]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(45px)",
                }}
              >
                <div className="absolute inset-0 z-30 rounded-full ring-1 ring-inset ring-white/25" />
                <div className="absolute inset-[8px] z-30 rounded-full ring-1 ring-inset ring-cyan-200/16" />
                <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_45%_18%,rgba(255,255,255,0.2),transparent_42%)]" />
                <motion.div
                  className="absolute inset-0 z-10"
                  animate={{ x: canTilt ? tilt.y * -1.3 : 0, y: canTilt ? tilt.x * -1.3 : 0 }}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                >
                  <Image
                    src="/assets/anhdoanprofile.png"
                    alt="Portrait"
                    fill
                    className="object-cover scale-[1.08] -translate-x-[6%] translate-y-[2%]"
                    sizes="(max-width: 768px) 250px, 300px"
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 z-30 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  animate={{ x: canTilt ? tilt.y * 2 : 0, y: canTilt ? tilt.x * 2 : 0 }}
                  transition={{ type: "spring", stiffness: 90, damping: 24 }}
                  style={{ background: "radial-gradient(circle at 50% 35%,rgba(255,255,255,.20),transparent 58%)" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
