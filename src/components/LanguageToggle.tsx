"use client";

import { useLanguage } from "@/components/LanguageProvider";

const options = ["vi", "en"] as const;

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs text-white/70">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setLanguage(option)}
          className={`rounded-full px-3 py-1 uppercase transition ${
            language === option ? "bg-white/20 text-white" : "hover:text-white"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
