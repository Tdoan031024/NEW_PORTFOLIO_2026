"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  live: string;
};

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="glass w-full max-w-2xl rounded-3xl p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-60 overflow-hidden rounded-2xl">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
          <p className="mt-3 text-white/70">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="neon-ring rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white"
            >
              {t("modalOpenDemo")}
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/70"
            >
              {t("modalClose")}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
