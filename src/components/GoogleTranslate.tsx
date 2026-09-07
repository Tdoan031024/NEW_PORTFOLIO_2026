"use client";

import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "th", label: "Thai" },
  { code: "id", label: "Indonesian" },
] as const;

export default function GoogleTranslate() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("vi");

  const selectedLabel = useMemo(
    () => LANGUAGES.find((x) => x.code === selected)?.label ?? "Language",
    [selected],
  );

  const applyLanguage = (code: string) => {
    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (!combo) return;
    combo.value = code;
    combo.dispatchEvent(new Event("change"));
    setSelected(code);
    setOpen(false);
  };

  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (!window.google?.translate?.TranslateElement) return;
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "vi",
            includedLanguages: "en,ja,ko,zh-CN,fr,de,th,id",
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
    <div className="gt-wrap">
      <button
        type="button"
        className="gt-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {selectedLabel}
      </button>
      {open ? (
        <div className="gt-menu" role="listbox">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`gt-item ${selected === lang.code ? "is-active" : ""}`}
              onClick={() => applyLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      ) : null}
      <div id="google_translate_element" />
    </div>
  );
}
