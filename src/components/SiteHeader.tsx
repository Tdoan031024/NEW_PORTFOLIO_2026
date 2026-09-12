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
];
const guideVersion = "portfolio-guides-2026-05-22-v3";
const guideAnimationDuration = 6800;
const guideFadeDuration = 700;
const AUTO_SHOW_GUIDES = false; // Tạm thời ẩn gợi ý

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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default function SiteHeader() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [sidebarGuideMounted, setSidebarGuideMounted] = useState(false);
  const [sidebarGuideVisible, setSidebarGuideVisible] = useState(false);
  const [isEditingGuides, setIsEditingGuides] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ editing: boolean }>;
      if (custom.detail !== undefined) {
        setIsEditingGuides(custom.detail.editing);
        if (custom.detail.editing) {
          setSidebarGuideMounted(true);
          setSidebarGuideVisible(true);
        }
      }
    };
    window.addEventListener("guide-edit-mode-toggle", handler);
    return () => window.removeEventListener("guide-edit-mode-toggle", handler);
  }, []);

  useEffect(() => {
    setMounted(true);

    const onComplete = () => {
      window.setTimeout(() => setVisible(true), 200);
    };
    window.addEventListener("intro-preloader-complete", onComplete);

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 3800);

    return () => {
      window.removeEventListener("intro-preloader-complete", onComplete);
      window.clearTimeout(timer);
    };
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
    if (isEditingGuides) {
      setSidebarGuideMounted(true);
      setSidebarGuideVisible(true);
      return;
    }

    if (!AUTO_SHOW_GUIDES) {
      setSidebarGuideMounted(false);
      setSidebarGuideVisible(false);
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
        className={`fixed left-0 top-0 w-full !z-[100] border-b border-transparent bg-transparent transition-all duration-1000 ease-out ${
          entered ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex w-full items-center px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:pr-16 lg:px-12 lg:pr-20">
          <a
            href="#hero"
            aria-label="Tuyen Doan Portfolio Homepage"
            className="group flex items-center transition-opacity hover:opacity-90"
          >
            <img
              src="/assets/logo/signature-white.png"
              alt="Tuyen Doan Signature Logo"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]"
            />
          </a>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <GoogleTranslate />
            {/* Tạm thời ẩn nút chuyển theme, mặc định dùng dark mode */}
            {/* <ThemeToggle /> */}
            <a
              href="/assets/file/Fullstack_Developer-Do_Van_Tuyen_Doan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Fullstack_Developer-Do_Van_Tuyen_Doan.pdf"
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/55 bg-cyan-300/18 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.22)] transition hover:bg-cyan-300/28 hover:scale-[1.02] active:scale-95"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t("downloadCv")}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar Quick Links */}
      <nav
        aria-label="Desktop navigation"
        className={`fixed right-4 top-1/2 !z-[220] hidden -translate-y-1/2 flex-col gap-2 transition-all duration-500 ease-out md:flex ${
          hasScrolled
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0"
        }`}
      >
        {quickLinks.map((item) => {
          const label =
            item.label === "About"
              ? language === "vi" ? "Giới thiệu" : "About"
              : item.label === "Skills"
              ? language === "vi" ? "Kỹ năng" : "Skills"
              : item.label === "Works"
              ? language === "vi" ? "Kinh nghiệm" : "Works"
              : language === "vi" ? "Liên hệ" : "Contact";

          return (
            <a
              key={item.label}
              href={item.href}
              title={label}
              aria-label={label}
              className="group relative grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-[#050b18]/65 text-white/80 backdrop-blur-md transition hover:border-cyan-300/45 hover:text-cyan-200"
            >
              <SidebarIcon type={item.icon} />
              <span className="pointer-events-none absolute right-[calc(100%+10px)] rounded-md border border-white/10 bg-[#050b18]/95 px-2 py-1 text-[11px] text-white/85 opacity-0 transition group-hover:opacity-100">
                {label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile Floating Bottom Dock */}
      <nav
        aria-label="Mobile navigation"
        className={`fixed bottom-4 left-1/2 !z-[220] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-[#050b18]/85 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-500 ease-out md:hidden ${
          hasScrolled
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0"
        }`}
      >
        {quickLinks.map((item) => {
          const label =
            item.label === "About"
              ? language === "vi" ? "Giới thiệu" : "About"
              : item.label === "Skills"
              ? language === "vi" ? "Kỹ năng" : "Skills"
              : item.label === "Works"
              ? language === "vi" ? "Kinh nghiệm" : "Works"
              : language === "vi" ? "Liên hệ" : "Contact";

          return (
            <a
              key={item.label}
              href={item.href}
              title={label}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/85 transition active:scale-90 active:border-cyan-300/50 active:text-cyan-200"
            >
              <SidebarIcon type={item.icon} />
            </a>
          );
        })}
      </nav>

      {(sidebarGuideMounted || isEditingGuides) && (
        <GuideCallout
          label="Use sidebar icons for quick jump"
          className={`fixed right-[68px] top-1/2 !z-[350] hidden h-[180px] w-[360px] -translate-y-1/2 transition-opacity duration-700 md:block ${
            isEditingGuides || sidebarGuideVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          viewBox="0 0 360 180"
          initialOffset={{ x: 0, y: 0 }}
          start={{ x: 265, y: 88 }}
          end={{ x: 352, y: 90 }}
          labelBox={{ x: 10, y: 65, width: 250, height: 46 }}
          storageKey="guide-sidebar"
          storageVersion={guideVersion}
          editable={isEditingGuides}
          showDebug={isEditingGuides}
        />
      )}
    </>
    ,
    document.body,
  );
}
