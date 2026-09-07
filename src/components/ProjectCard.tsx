"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  live: string;
};

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -6 }}
      onClick={() => onOpen(project)}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
      <div className="relative h-44">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-white/70">{project.description}</p>
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
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-pink-500/10" />
      </div>
    </motion.button>
  );
}
