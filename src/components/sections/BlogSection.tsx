"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

const posts = [
  {
    title: "Xây dựng hệ thống 3D có hiệu năng cao",
    tag: "Technical Docs",
    date: "Apr 2026",
  },
  {
    title: "Tối ưu animation với GSAP + Framer Motion",
    tag: "Blog",
    date: "Mar 2026",
  },
  {
    title: "Case study: thiết kế hệ thống design language",
    tag: "Case Study",
    date: "Feb 2026",
  },
];

export default function BlogSection() {
  const { t } = useLanguage();
  return (
    <section id="blog" className="px-6 py-24 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-title">{t("blogKicker")}</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{t("blogTitle")}</h2>
          </div>
          <button className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/70">
            {t("blogViewAll")}
          </button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-3xl p-6"
            >
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{post.tag}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{post.title}</h3>
              <button className="mt-6 text-xs uppercase tracking-[0.2em] text-cyan-300">
                {t("blogReadMore")}
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
