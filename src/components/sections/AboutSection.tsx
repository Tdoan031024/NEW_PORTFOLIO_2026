"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { timeline } from "@/lib/data";
import { useLanguage } from "@/components/LanguageProvider";

export default function AboutSection() {
  const { t } = useLanguage();
  const cardsRef = useRef<HTMLDivElement>(null);
  const [canTilt] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches,
  );
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let isActive = true;

    import("gsap").then((gsapModule) => {
      if (!isActive || !cardsRef.current) return;
      gsapModule.gsap.from(cardsRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
      });
    });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section id="about" className="px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="section-title">{t("aboutKicker")}</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8"
          >
            <motion.div
              className="mx-auto mb-8 w-fit [perspective:1000px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.4, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.div
                className="relative rounded-[28px] p-[2px] tech-avatar-ring"
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.6 }}
                onMouseMove={(event) => {
                  if (!canTilt) return;
                  const rect = event.currentTarget.getBoundingClientRect();
                  const px = (event.clientX - rect.left) / rect.width;
                  const py = (event.clientY - rect.top) / rect.height;
                  const max = 7;
                  setTilt({
                    x: (0.5 - py) * max * 2,
                    y: (px - 0.5) * max * 2,
                  });
                }}
                onMouseLeave={() => {
                  setTilt({ x: 0, y: 0 });
                }}
              >
                <div className="tech-avatar-glow" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-[26px] border border-white/15 bg-black/35 p-1">
                  <Image
                    src="/assets/anhdoanprofile.png"
                    alt="Doan profile"
                    width={220}
                    height={220}
                    className="h-[180px] w-[180px] rounded-3xl object-cover md:h-[220px] md:w-[220px]"
                    priority={false}
                  />
                </div>
              </motion.div>
            </motion.div>

            <h2 className="text-3xl font-semibold text-white">{t("aboutTitle")}</h2>
            <p className="mt-4 text-white/70">
              {t("aboutDesc")}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                t("aboutCard1"),
                t("aboutCard2"),
                t("aboutCard3"),
                t("aboutCard4"),
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 p-4">
                  <p className="text-sm text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div ref={cardsRef} className="space-y-4">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/60">{item.year}</p>
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
