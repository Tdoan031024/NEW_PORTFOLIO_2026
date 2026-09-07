"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "@/components/ThemeToggle";
import GoogleTranslate from "@/components/GoogleTranslate";
import { useLanguage } from "@/components/LanguageProvider";
import GuideCallout from "@/components/GuideCallout";

const quickLinks = [
  { label: "About", href: "#hero", icon: "user" },
  { label: "Skills", href: "#skills", icon: "code" },
  { label: "Works", href: "#experience", icon: "briefcase" },
  { label: "Contact", href: "#contact", icon: "send" },
] as const;

const guideVersion = "portfolio-guides-2026-05-22-6";
const guideAnimationDuration = 6800;
const guideFadeDuration = 700;
const guideEditMode = false;

function SidebarIcon({ type }: { type: (typeof quickLinks)[number]["icon"] }) {
  if (type === "user") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.7-3.4 4.4-5 8-5s6.3 1.6 8 5" />
      </svg>
    );
  }
  if (type === "code") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 8 4 12l4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m13 5-2 14" />
      </svg>
    );
  }
  if (type === "briefcase") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        <path d="M3 13h18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 20 21 3" />
      <path d="M21 3 14 21l-3-7-7-3Z" />
    </svg>
  );
}

export default function SiteHeader() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [sidebarGuideMounted, setSidebarGuideMounted] = useState(false);
  const [sidebarGuideVisible, setSidebarGuideVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const raf = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(raf);
  }, [visible]);

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 120);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!mounted || !visible) return;
    if (guideEditMode) {
      setSidebarGuideMounted(true);
      setSidebarGuideVisible(true);
      return;
    }

    const hero = document.getElementById("hero");
    if (!hero) return;

    let hasShown = false;
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasShown) return;
        hasShown = true;
        setSidebarGuideMounted(true);
        window.requestAnimationFrame(() => setSidebarGuideVisible(true));
        timers.push(
          window.setTimeout(() => {
            setSidebarGuideVisible(false);
          }, guideAnimationDuration),
          window.setTimeout(() => {
            setSidebarGuideMounted(false);
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
  }, [mounted, visible]);

  if (!mounted || !visible) {
    return null;
  }

  return createPortal(
    <>
      <header
        className={`fixed left-0 top-0 w-full !z-[100] border-b border-transparent bg-transparent transition-all duration-[1400ms] ease-out ${
          entered ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex w-full items-center px-6 py-4 md:px-10 md:pr-16 lg:px-12 lg:pr-20">
          <span className="text-sm font-semibold tracking-[0.3em] text-white">DOAN</span>
          <div className="ml-auto flex items-center gap-3">
            <GoogleTranslate />
            <ThemeToggle />
            <button className="rounded-full border border-cyan-200/55 bg-cyan-300/18 px-4 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.22)] transition hover:bg-cyan-300/28">
              {t("downloadCv")}
            </button>
          </div>
        </div>
      </header>

      <nav
        className={`fixed right-4 top-1/2 !z-[220] hidden -translate-y-1/2 flex-col gap-2 transition-all duration-500 ease-out md:flex ${
          hasScrolled
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0"
        }`}
      >
        {quickLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            title={item.label}
            aria-label={item.label}
            className="group relative grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-[#050b18]/65 text-white/80 backdrop-blur-md transition hover:border-cyan-300/45 hover:text-cyan-200"
          >
            <SidebarIcon type={item.icon} />
            <span className="pointer-events-none absolute right-[calc(100%+10px)] rounded-md border border-white/10 bg-[#050b18]/95 px-2 py-1 text-[11px] text-white/85 opacity-0 transition group-hover:opacity-100">
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {sidebarGuideMounted && (
        <GuideCallout
          label="Use sidebar icons for quick jump"
          className={`fixed right-[72px] top-1/2 !z-[260] hidden h-[260px] w-[430px] -translate-y-1/2 transition-opacity duration-700 md:block ${
            sidebarGuideVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          viewBox="0 0 430 260"
          initialOffset={{ x: 22, y: -84 }}
          start={{ x: 234, y: 111 }}
          end={{ x: 398, y: 208 }}
          labelBox={{ x: 107, y: 45, width: 285, height: 56 }}
          storageKey="guide-sidebar"
          storageVersion={guideVersion}
        />
      )}
    </>
    ,
    document.body,
  );
}

