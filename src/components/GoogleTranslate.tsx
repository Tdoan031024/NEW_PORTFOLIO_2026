"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

type LanguageItem = {
  code: "vi" | "en";
  label: string;
  native: string;
  short: string;
};

const LANGUAGES: readonly LanguageItem[] = [
  { code: "en", label: "English", native: "United States", short: "ENG" },
  { code: "vi", label: "Tiếng Việt", native: "Việt Nam", short: "VIE" },
] as const;

function FlagIcon({ code, className = "w-5 h-3.5" }: { code: string; className?: string }) {
  const baseCls = `${className} rounded-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.35)] border border-white/20 object-cover flex-shrink-0 inline-block overflow-hidden`;

  if (code === "vi") {
    return (
      <svg viewBox="0 0 640 480" className={baseCls} aria-hidden="true">
        <rect width="640" height="480" fill="#da251d" />
        <polygon
          points="320,105 357,219 477,219 380,290 417,404 320,333 223,404 260,290 163,219 283,219"
          fill="#ff0"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 640 480" className={baseCls} aria-hidden="true">
      <rect width="640" height="480" fill="#bd3d44" />
      <path
        d="M0,37h640v37H0zM0,111h640v37H0zM0,185h640v37H0zM0,258h640v37H0zM0,332h640v37H0zM0,406h640v37H0z"
        fill="#fff"
      />
      <rect width="260" height="259" fill="#192f5d" />
      <g fill="#fff">
        <circle cx="35" cy="35" r="9" />
        <circle cx="85" cy="35" r="9" />
        <circle cx="135" cy="35" r="9" />
        <circle cx="185" cy="35" r="9" />
        <circle cx="230" cy="35" r="9" />
        <circle cx="60" cy="72" r="9" />
        <circle cx="110" cy="72" r="9" />
        <circle cx="160" cy="72" r="9" />
        <circle cx="210" cy="72" r="9" />
        <circle cx="35" cy="110" r="9" />
        <circle cx="85" cy="110" r="9" />
        <circle cx="135" cy="110" r="9" />
        <circle cx="185" cy="110" r="9" />
        <circle cx="230" cy="110" r="9" />
        <circle cx="60" cy="148" r="9" />
        <circle cx="110" cy="148" r="9" />
        <circle cx="160" cy="148" r="9" />
        <circle cx="210" cy="148" r="9" />
        <circle cx="35" cy="185" r="9" />
        <circle cx="85" cy="185" r="9" />
        <circle cx="135" cy="185" r="9" />
        <circle cx="185" cy="185" r="9" />
        <circle cx="230" cy="185" r="9" />
        <circle cx="60" cy="222" r="9" />
        <circle cx="110" cy="222" r="9" />
        <circle cx="160" cy="222" r="9" />
        <circle cx="210" cy="222" r="9" />
      </g>
    </svg>
  );
}

export default function GoogleTranslate() {
  const { language: appLanguage, setLanguage: setAppLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<"vi" | "en">(appLanguage ?? "en");
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Keep in sync with appLanguage
  useEffect(() => {
    if (appLanguage === "vi" || appLanguage === "en") {
      setSelected(appLanguage);
    }
  }, [appLanguage]);

  const selectedItem = useMemo(
    () => LANGUAGES.find((x) => x.code === selected) ?? LANGUAGES[0],
    [selected],
  );

  const applyLanguage = (code: "vi" | "en") => {
    // 1. Sync React context dictionary & LocalStorage
    setAppLanguage(code);
    try {
      window.localStorage.setItem("language", code);
    } catch (_) {}

    // 2. Sync Google Translate widget
    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
    }

    // 3. Set persistent cookie
    try {
      if (code === "vi") {
        document.cookie = `googtrans=/vi/vi; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=/vi/vi; path=/;`;
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      } else {
        document.cookie = `googtrans=/vi/en; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=/vi/en; path=/;`;
      }
    } catch (_) {}

    setSelected(code);
    setOpen(false);
  };

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Read existing language on mount or default to English
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("language") : null;
    if (saved === "vi" || saved === "en") {
      setSelected(saved as "vi" | "en");
      setAppLanguage(saved as "vi" | "en");
      return;
    }

    const match = document.cookie.match(/googtrans=\/([^/]+)\/([^;]+)/);
    if (match && (match[2] === "vi" || match[2] === "en")) {
      const code = match[2] as "vi" | "en";
      setSelected(code);
      setAppLanguage(code);
      return;
    }

    // Mặc định vào web lần đầu là tiếng Anh ("en")
    setSelected("en");
    setAppLanguage("en");
    try {
      window.localStorage.setItem("language", "en");
      document.cookie = `googtrans=/vi/en; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/vi/en; path=/;`;
    } catch (_) {}
  }, [setAppLanguage]);

  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (!window.google?.translate?.TranslateElement) return;
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "vi",
            includedLanguages: "en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element",
        );
      };
    }

    const existingScript = document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit?.();
    }
  }, []);

  return (
    <div ref={wrapRef} className="gt-wrap relative inline-flex items-center">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`group relative flex items-center gap-2 rounded-full border px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
          open
            ? "border-cyan-400/70 bg-cyan-500/15 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
            : "border-white/15 bg-white/[0.06] text-slate-200 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:border-cyan-400/40 hover:bg-white/[0.12] hover:text-white"
        }`}
      >
        <FlagIcon code={selectedItem.code} className="w-[18px] h-[13px]" />
        <span className="tracking-wide hidden xs:inline">{selectedItem.label}</span>
        <span className="tracking-wide xs:hidden">{selectedItem.short}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180 text-cyan-400" : "text-white/50 group-hover:text-cyan-300"
          }`}
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+10px)] z-[300] w-[200px] origin-top-right rounded-2xl border border-white/15 bg-[#091122]/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.75),0_0_30px_rgba(34,211,238,0.1)] backdrop-blur-2xl transition-all animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
        >
          {/* Top cyan neon ambient line */}
          <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between px-2.5 py-1.5 pb-2 border-b border-white/[0.08] mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/90 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              Ngôn ngữ / Language
            </span>
          </div>

          {/* List */}
          <div className="space-y-1 pr-0.5">
            {LANGUAGES.map((lang) => {
              const isCurrent = selected === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  className={`group flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                    isCurrent
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 text-cyan-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                      : "border border-transparent text-slate-300 hover:bg-white/[0.08] hover:text-white"
                  }`}
                  onClick={() => applyLanguage(lang.code)}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon code={lang.code} className="w-5 h-3.5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="font-semibold text-[12px] text-left">{lang.label}</span>
                      <span className="text-[10px] text-white/40 group-hover:text-white/60">
                        {lang.native}
                      </span>
                    </div>
                  </div>

                  {isCurrent && (
                    <svg
                      className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hidden container required by Google Translate SDK */}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}
