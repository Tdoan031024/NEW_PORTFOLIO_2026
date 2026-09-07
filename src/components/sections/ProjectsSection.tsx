"use client";
import { motion } from "framer-motion";
import { projects, type ProjectItem } from "@/data/projects";

function TechBadge({ children }: { children: string }) {
  return (
    <span className="rounded-[6px] bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-200 ring-1 ring-cyan-300/20">
      {children}
    </span>
  );
}

function HuitPreview() {
  return (
    <div className="relative h-full min-h-[124px] overflow-hidden rounded-xl bg-[#09081d] shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_48%,rgba(124,58,237,0.48),transparent_12%),radial-gradient(circle_at_82%_22%,rgba(59,130,246,0.38),transparent_15%),linear-gradient(135deg,rgba(24,24,68,0.8),rgba(7,7,22,1))]" />
      <div className="absolute left-4 right-4 top-3 flex items-center justify-between text-[5px] text-white/70">
        <span className="font-bold text-white">DT HUIT FEST</span>
        <span className="rounded bg-violet-500 px-1.5 py-0.5 text-white">Project</span>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <p className="text-xl font-black tracking-tight text-white">HUIT FEST 2024</p>
        <p className="mt-1 text-[8px] text-white/60">Professional event showcase website</p>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="flex h-full min-h-[124px] overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="w-[58px] bg-slate-900 p-3">
        <div className="mb-5 h-4 w-4 rounded bg-blue-500" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="mb-3 h-1.5 w-8 rounded bg-white/20" />
        ))}
      </div>
      <div className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="h-2.5 w-24 rounded bg-slate-800" />
            <div className="mt-2 h-1.5 w-16 rounded bg-slate-200" />
          </div>
          <div className="h-7 w-7 rounded-full bg-slate-200" />
        </div>
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="grid grid-cols-5 items-center gap-3 border-t border-slate-100 py-2">
            <div className="col-span-2 h-2 rounded bg-slate-200" />
            <div className="h-2 rounded bg-slate-100" />
            <div className="h-2 rounded bg-slate-100" />
            <div className="h-4 w-11 rounded-full bg-emerald-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobilePreview() {
  return (
    <div className="flex h-full min-h-[124px] items-end justify-center gap-4 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 px-4 pt-3">
      {["left", "center", "right"].map((phone, idx) => (
        <div
          key={phone}
          className={`h-[118px] w-[58px] rounded-t-[18px] border-[3px] border-slate-900 bg-white p-1 shadow-lg ${idx === 1 ? "h-[128px]" : ""}`}
        >
          <div className="h-9 rounded-xl bg-blue-500 p-2">
            <div className="h-1.5 w-7 rounded bg-white/90" />
            <div className="mt-1 h-1 w-10 rounded bg-white/50" />
          </div>
          {idx === 1 ? (
            <div className="mx-auto mt-3 grid h-10 w-10 place-items-center rounded-full border-[7px] border-blue-400 border-r-orange-300 text-[7px] font-bold text-slate-600">
              68%
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {[1, 2, 3].map((line) => (
                <div key={line} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="h-1.5 flex-1 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PortfolioPreview() {
  return (
    <div className="relative h-full min-h-[124px] overflow-hidden rounded-xl bg-[#060b10] p-5 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_52%,rgba(148,163,184,0.22),transparent_26%)]" />
      <div className="relative z-10 grid h-full grid-cols-[1fr_120px] items-center gap-3">
        <div>
          <p className="text-[10px] text-white/65">Hello, I'm</p>
          <p className="text-xl font-black leading-tight">Doan Tuyen</p>
          <div className="mt-3 h-1.5 w-24 rounded bg-white/25" />
          <div className="mt-2 h-1.5 w-16 rounded bg-white/15" />
        </div>
        <div className="relative h-24 w-24 rotate-12 border border-cyan-200/60 shadow-[0_0_28px_rgba(125,211,252,0.18)]">
          <div className="absolute inset-4 border border-cyan-200/35" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-cyan-200/35" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-cyan-200/35" />
        </div>
      </div>
    </div>
  );
}

function AiPreview() {
  return (
    <div className="grid h-full min-h-[124px] grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2">
      <div className="relative overflow-hidden rounded-lg bg-slate-300 grayscale">
        <span className="absolute left-2 top-2 z-10 rounded bg-slate-900 px-2 py-1 text-[8px] font-bold text-white">
          Before
        </span>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#f8fafc_0_8%,transparent_9%),linear-gradient(150deg,#475569,#cbd5e1)]" />
      </div>
      <div className="relative overflow-hidden rounded-lg bg-blue-100">
        <span className="absolute left-2 top-2 z-10 rounded bg-slate-900 px-2 py-1 text-[8px] font-bold text-white">
          After
        </span>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-emerald-50 to-lime-200" />
      </div>
    </div>
  );
}

function ComingSoonPreview() {
  return (
    <div className="relative grid h-full min-h-[124px] place-items-center overflow-hidden rounded-xl border border-cyan-300/15 bg-[#050d1b] text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.16),transparent_30%),linear-gradient(135deg,rgba(8,18,40,0.92),rgba(3,7,18,1))]" />
      <div className="relative z-10 px-6">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-cyan-200/55">
          Preview
        </p>
        <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-white">
          Coming soon...
        </p>
        <p className="mt-2 text-[10px] font-medium text-white/45">
          Project screenshots will be updated later
        </p>
      </div>
    </div>
  );
}

function PreviewMockup({ type }: { type: ProjectItem["preview"] }) {
  if (type === "comingSoon") return <ComingSoonPreview />;
  if (type === "huit") return <HuitPreview />;
  if (type === "dashboard") return <DashboardPreview />;
  if (type === "mobile") return <MobilePreview />;
  if (type === "portfolio") return <PortfolioPreview />;
  return <AiPreview />;
}

function GeneratedLongPreview({ project }: { project: ProjectItem }) {
  return (
    <div className="min-h-[560px] bg-[#06101f] text-white">
      <div className="relative min-h-[190px] overflow-hidden bg-[radial-gradient(circle_at_74%_28%,rgba(34,211,238,0.2),transparent_24%),linear-gradient(135deg,rgba(8,18,40,1),rgba(3,7,18,1))] p-5">
        <div className="mb-10 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.25em] text-white/45">
          <span>Doan Project</span>
          <span>{project.year}</span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-cyan-200/70">{project.role}</p>
        <h4 className="mt-2 text-2xl font-black leading-tight tracking-[-0.06em]">{project.title}</h4>
        <p className="mt-3 max-w-[260px] text-[11px] leading-5 text-white/60">{project.description}</p>
      </div>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-3 gap-3">
          {project.techs.slice(0, 3).map((tech) => (
            <div key={tech} className="rounded-lg border border-cyan-300/15 bg-cyan-300/5 p-3">
              <div className="h-1.5 w-8 rounded-full bg-cyan-200/45" />
              <p className="mt-4 text-[9px] font-bold text-cyan-100/80">{tech}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-4 h-2 w-28 rounded-full bg-white/25" />
          {[1, 2, 3, 4].map((row) => (
            <div key={row} className="mb-3 grid grid-cols-[1fr_0.7fr_42px] gap-3">
              <div className="h-2 rounded-full bg-white/12" />
              <div className="h-2 rounded-full bg-white/8" />
              <div className="h-2 rounded-full bg-cyan-200/25" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-28 rounded-xl bg-[linear-gradient(135deg,rgba(34,211,238,0.2),rgba(255,255,255,0.04))]" />
          <div className="h-28 rounded-xl bg-[linear-gradient(135deg,rgba(59,130,246,0.22),rgba(255,255,255,0.04))]" />
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <div className="h-2 w-32 rounded-full bg-white/18" />
          <div className="mt-4 space-y-2">
            {[1, 2, 3, 4, 5, 6].map((line) => (
              <div key={line} className="h-1.5 rounded-full bg-white/10" style={{ width: `${96 - line * 7}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AutoScrollPreviewPopup({ project }: { project: ProjectItem }) {
  return (
    <div className="pointer-events-none absolute right-[-42px] top-1/2 z-30 hidden w-[280px] -translate-y-1/2 translate-x-full opacity-0 transition-all duration-300 group-hover/preview:translate-x-[calc(100%+36px)] group-hover/preview:opacity-100 lg:block">
      <div className="overflow-hidden rounded-2xl border border-cyan-300/25 bg-[#030b1a] p-2 shadow-[0_22px_70px_rgba(0,0,0,0.55),0_0_38px_rgba(34,211,238,0.12)]">
        <div className="mb-2 flex items-center gap-1.5 px-1">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
          <span className="ml-2 truncate text-[9px] font-semibold text-white/40">Auto scrolling preview</span>
        </div>
        <div className="h-[230px] overflow-hidden rounded-xl bg-[#06101f]">
          <div className="preview-scroll-content">
            {project.fullPreviewImage ? (
              <img src={project.fullPreviewImage} alt={`${project.title} full page preview`} className="w-full max-w-none" />
            ) : (
              <GeneratedLongPreview project={project} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectPreviewFrame({ project }: { project: ProjectItem }) {
  return (
    <a
      href={`/projects/${project.slug}`}
      aria-label={`View details for ${project.title}`}
      className="group/preview relative block h-full min-h-[190px] cursor-pointer md:min-h-[210px]"
    >
      {project.previewImage ? (
        <div className="h-full min-h-[190px] overflow-hidden rounded-xl border border-cyan-300/15 bg-[#06101f] md:min-h-[210px]">
          <img
            src={project.previewImage}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover object-top"
          />
        </div>
      ) : (
        <PreviewMockup type={project.preview} />
      )}
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition group-hover/preview:border-cyan-300/45 group-hover/preview:shadow-[0_0_34px_rgba(34,211,238,0.16)]" />
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-bold text-white/70 opacity-0 backdrop-blur-md transition group-hover/preview:opacity-100">
        View detail
      </div>
      <AutoScrollPreviewPopup project={project} />
    </a>
  );
}

function TimelineInfo({ project }: { project: ProjectItem }) {
  return (
    <div className="relative flex min-h-[154px] gap-4 lg:block lg:pl-[70px]">
      <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan-300/25 bg-[#071326] shadow-[0_0_0_5px_rgba(34,211,238,0.04),0_0_24px_rgba(34,211,238,0.12)] lg:absolute lg:left-0 lg:top-3">
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-200/80 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
      </div>
      <div className="pt-1 lg:pt-4">
        <p className="text-sm font-bold text-cyan-300">{project.year}</p>
        <p className="mt-1 text-sm font-medium text-white/55">{project.date}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <article
      className="project-entry group relative min-h-[154px] rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,36,0.92),rgba(6,12,28,0.92))] p-4 shadow-[0_14px_34px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_20px_44px_rgba(34,211,238,0.16)]"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="grid gap-4 md:grid-cols-[1.12fr_0.88fr_22px] md:items-center">
        <div className="px-1 py-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold tracking-[-0.03em] text-white">{project.title}</h3>
          </div>
          <p className="mt-1 text-sm font-semibold text-cyan-300">{project.role}</p>
          <p className="mt-2 max-w-[560px] text-[15px] leading-6 text-white/65">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {project.techs.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </div>
        </div>

        <ProjectPreviewFrame project={project} />

        <a
          href={`/projects/${project.slug}`}
          aria-label={`View details for ${project.title}`}
          className="hidden h-10 w-10 items-center justify-center justify-self-end rounded-full border border-white/10 bg-white/[0.04] text-xl text-white/45 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-cyan-200 hover:shadow-[0_12px_28px_rgba(34,211,238,0.18)] group-hover:translate-x-1 md:flex"
        >
          <span aria-hidden="true">›</span>
        </a>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden bg-transparent pb-16 pt-0 font-sans text-white sm:pt-0">
      <div className="pointer-events-none absolute bottom-8 right-10 hidden h-32 w-24 opacity-25 [background-image:radial-gradient(rgba(148,163,184,0.55)_1.2px,transparent_1.2px)] [background-size:15px_15px] md:block" />

      <section className="relative z-10 mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-0">
        <div className="text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-white/40">WHAT I&apos;VE BUILT</p>
          <h2 className="mt-5 text-[44px] font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-[56px] md:text-[64px]">
            Feature Project
          </h2>
        </div>

        <div className="relative mt-16 space-y-4">
          <div className="pointer-events-none absolute left-5 top-4 hidden h-[calc(100%-42px)] w-px bg-white/12 lg:block" />

          {projects.map((project, index) => {
            const isSegmentActive = index < projects.length - 1;
            const isItemLast = index === projects.length - 1;

            return (
              <div key={project.number} className="relative grid gap-4 lg:grid-cols-[200px_1fr] lg:gap-10">
                {!isItemLast ? (
                  <span className="pointer-events-none absolute left-5 top-12 hidden h-[calc(100%-8px)] w-px lg:block">
                    <motion.span
                      initial={false}
                      className="absolute left-0 top-0 block w-[2px] bg-cyan-200 shadow-[0_0_20px_rgba(103,232,249,1),0_0_36px_rgba(34,211,238,0.95),0_0_54px_rgba(34,211,238,0.8)]"
                      animate={
                        isSegmentActive
                          ? { height: "100%", opacity: [0.4, 1, 0.28] }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.72, ease: "easeInOut" }}
                    />
                  </span>
                ) : null}

                <motion.div
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative"
                >
                  <TimelineInfo project={project} />
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: index > 0 ? 0.12 : 0 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        @keyframes softFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .project-entry {
          animation: softFadeUp 0.65s ease both;
        }
        .preview-scroll-content {
          animation: autoProjectPreviewScroll 8s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes autoProjectPreviewScroll {
          0%, 12% { transform: translateY(0); }
          88%, 100% { transform: translateY(calc(-100% + 230px)); }
        }
      `}</style>
    </section>
  );
}

