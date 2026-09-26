"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import GoogleTranslate from "@/components/GoogleTranslate";
import { useLanguage } from "@/components/LanguageProvider";
import GuideCallout from "@/components/GuideCallout";
import LanguageToggle from "@/components/LanguageToggle";

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

function DownloadIcon() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v12m0 0 4-4m-4 4-4-4m-1 9h10a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

function MenuIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

function CloseIcon() {
  return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" /></svg>;
}

export default function SiteHeader() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

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
            <div className="hidden items-center gap-2 sm:gap-3 md:flex">
              <GoogleTranslate />
              <a href="/assets/file/Fullstack_Developer-Do_Van_Tuyen_Doan.pdf" target="_blank" rel="noopener noreferrer" download="Fullstack_Developer-Do_Van_Tuyen_Doan.pdf" className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/55 bg-cyan-300/18 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.22)] transition hover:bg-cyan-300/28 hover:scale-[1.02] active:scale-95">
                <DownloadIcon /><span>{t("downloadCv")}</span>
              </a>
            </div>
            <button type="button" aria-label={mobileMenuOpen ? (language === "vi" ? "Đóng menu" : "Close menu") : (language === "vi" ? "Mở menu" : "Open menu")} aria-expanded={mobileMenuOpen} aria-controls="mobile-header-panel" onClick={() => setMobileMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-full border border-cyan-200/35 bg-[#071326]/80 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,.12)] backdrop-blur-md transition hover:border-cyan-200/70 md:hidden">
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <button type="button" aria-label={language === "vi" ? "Đóng menu" : "Close menu"} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 !z-[280] bg-black/35 backdrop-blur-[2px] md:hidden" />
          <aside id="mobile-header-panel" aria-label={language === "vi" ? "Menu nhanh" : "Quick menu"} className="fixed right-3 top-[4.5rem] !z-[300] w-[min(19rem,calc(100vw-1.5rem))] rounded-2xl border border-white/15 bg-[#071326]/95 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,.65),0_0_28px_rgba(34,211,238,.12)] backdrop-blur-2xl md:hidden">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-cyan-200">{language === "vi" ? "Truy cập nhanh" : "Quick access"}</span>
              <button type="button" aria-label={language === "vi" ? "Đóng menu" : "Close menu"} onClick={() => setMobileMenuOpen(false)} className="grid h-8 w-8 place-items-center rounded-full text-white/65 hover:bg-white/10 hover:text-white"><CloseIcon /></button>
            </div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="text-sm text-white/65">{language === "vi" ? "Ngôn ngữ" : "Language"}</span>
              <LanguageToggle />
            </div>
            <a href="/assets/file/Fullstack_Developer-Do_Van_Tuyen_Doan.pdf" target="_blank" rel="noopener noreferrer" download="Fullstack_Developer-Do_Van_Tuyen_Doan.pdf" onClick={() => setMobileMenuOpen(false)} className="mb-3 flex w-full items-center gap-3 rounded-xl border border-cyan-200/25 bg-cyan-300/10 px-3.5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20">
              <DownloadIcon />{t("downloadCv")}
            </a>
            <nav aria-label={language === "vi" ? "Điều hướng" : "Navigation"} className="grid gap-1">
              {quickLinks.map((item) => {
                const label = item.label === "About" ? (language === "vi" ? "Giới thiệu" : "About") : item.label === "Skills" ? (language === "vi" ? "Kỹ năng" : "Skills") : item.label === "Works" ? (language === "vi" ? "Kinh nghiệm" : "Works") : (language === "vi" ? "Liên hệ" : "Contact");
                return <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-white/75 transition hover:bg-white/[.07] hover:text-cyan-100"><SidebarIcon type={item.icon} />{label}</a>;
              })}
            </nav>
          </aside>
        </>
      )}

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
