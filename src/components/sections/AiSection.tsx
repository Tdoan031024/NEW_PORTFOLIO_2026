"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function AiSection() {
  const { t } = useLanguage();
  const features = [
    {
      title: t("aiFeature1Title"),
      detail: t("aiFeature1Detail"),
    },
    {
      title: t("aiFeature2Title"),
      detail: t("aiFeature2Detail"),
    },
    {
      title: t("aiFeature3Title"),
      detail: t("aiFeature3Detail"),
    },
  ];

  return (
    <section id="ai" className="px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="section-title">{t("aiKicker")}</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{t("aiTitle")}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-3xl p-6"
            >
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-white/70">{feature.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
