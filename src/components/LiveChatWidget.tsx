"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function LiveChatWidget() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="glass w-72 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">{t("liveChatTitle")}</p>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-white/60"
            >
              {t("modalClose")}
            </button>
          </div>
          <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-white/70">
            {t("liveChatHint")}
          </div>
          <input
            placeholder={t("liveChatPlaceholder")}
            className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/70"
          />
        </div>
      ) : null}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="neon-ring mt-3 rounded-full bg-white/10 px-4 py-3 text-xs font-semibold text-white"
      >
        {open ? t("liveChatToggleClose") : t("liveChatToggleOpen")}
      </button>
    </div>
  );
}
