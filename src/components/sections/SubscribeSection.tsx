"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function SubscribeSection() {
  const { t } = useLanguage();
  return (
    <section id="subscribe" className="px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="section-title">{t("subscribeKicker")}</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-white">{t("subscribeTitle")}</h2>
            <p className="mt-4 text-white/70">{t("subscribeDesc")}</p>
          </div>
          <motion.form
            className="glass rounded-3xl p-6"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <input
                type="email"
                placeholder={t("subscribePlaceholder")}
                className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80 focus:border-cyan-400/60 focus:outline-none"
              />
              <button
                type="button"
                className="neon-ring rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {t("subscribeButton")}
              </button>
            </div>
            <p className="mt-3 text-xs text-white/60">
              {t("subscribeNote")}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
