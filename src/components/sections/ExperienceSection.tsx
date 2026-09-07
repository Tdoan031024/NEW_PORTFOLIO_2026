"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Experience = {
  logo: "iec" | "huitMedia" | "sof" | "google" | "publication" | "education";
  title: string;
  company: string;
  shortName?: string;
  website?: string;
  websiteLabel?: string;
  date: string;
  description: string;
  tags?: string[];
};

const experiences: Experience[] = [
  {
    logo: "sof",
    title: "Full-stack Developer / Software Developer",
    company: "Cong ty TNHH SOF",
    shortName: "SOF",
    website: "https://sof.com.vn",
    websiteLabel: "sof.com.vn",
    date: "Jan 2026 - Now",
    description:
      "Contributing to enterprise software systems such as ERP, HRM, POS, and business management platforms, focusing on feature development, backend workflows, database operations, and user interface improvements.",
    tags: ["Enterprise Software", "ERP", "HRM", "POS", "Digital Transformation"],
  },
  {
    logo: "huitMedia",
    title: "Full-stack Developer / Web Developer",
    company:
      "HUIT MEDIA - Kenh Thong tin va Truyen thong Truong Dai hoc Cong Thuong TP. Ho Chi Minh",
    shortName: "HUIT MEDIA",
    website: "https://huit.edu.vn",
    websiteLabel: "huit.edu.vn",
    date: "Oct 2025 - Now",
    description:
      "Developed event-based web platforms including registration systems, admin dashboards, QR ticketing, CMS modules, reporting tools, and an AI-powered career recommendation system for university events.",
  },
  {
    logo: "iec",
    title: "Full-stack developer",
    company: "CENTER OF INNOVATION AND ENTREPRENEURSHIP",
    shortName: "IEC",
    website: "https://iec.huit.edu.vn/",
    websiteLabel: "iec.huit.edu.vn",
    date: "May 2025 - Sept 2025",
    description:
      "Improved the center's website, refactored the .NET MVC system, and developed a Career Fair platform supporting companies, students, administrators, and real event operations.",
  },
];

function SkillTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-semibold text-cyan-200">
      {children}
    </span>
  );
}

function LogoMarker({ type }: { type: Experience["logo"] }) {
  if (type === "iec") {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white p-1">
        <Image
          src="/assets/logos/logoiec.jpg"
          alt="IEC logo"
          width={44}
          height={32}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  if (type === "huitMedia") {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white p-1">
        <Image
          src="/assets/logos/logohuitmedia.jpg"
          alt="HUIT Media logo"
          width={44}
          height={32}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  if (type === "sof") {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white p-1">
        <Image
          src="/assets/logos/logosof.avif"
          alt="SOF logo"
          width={44}
          height={32}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  if (type === "google") {
    return (
      <div className="flex h-full w-full items-center justify-center text-[25px] font-bold tracking-[-2px]">
        <span className="text-blue-400">G</span>
      </div>
    );
  }

  if (type === "publication") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative h-5 w-5 rounded-full border border-white/35">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[54%] text-[9px] font-bold text-white/80">
            G
          </span>
          <span className="absolute -bottom-1 left-1/2 h-1.5 w-4 -translate-x-1/2 rounded-full bg-white/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-6 w-6">
        <span className="absolute bottom-1 left-1 h-3.5 w-4 rotate-[-12deg] rounded-[3px] border border-emerald-300/35 bg-emerald-200/25" />
        <span className="absolute left-2 top-1 h-2.5 w-2.5 rounded-full bg-sky-200/75" />
        <span className="absolute bottom-1.5 right-0 h-2 w-2 rounded-full bg-lime-200/80" />
      </div>
    </div>
  );
}

function ExperienceCard({
  item,
  isPrimary = false,
}: {
  item: Experience;
  isPrimary?: boolean;
}) {
  return (
    <article
      className={`group w-full rounded-[16px] border px-7 py-7 shadow-[0_12px_35px_rgba(0,0,0,0.28)] transition-all duration-300 sm:px-8 sm:py-8 ${
        isPrimary
          ? "border-cyan-300/35 shadow-[0_0_0_1px_rgba(103,232,249,0.14),0_14px_38px_rgba(34,211,238,0.13)]"
          : "border-white/10"
      } bg-[linear-gradient(165deg,rgba(12,20,40,0.92),rgba(8,14,30,0.9)_55%,rgba(6,12,26,0.9))] hover:-translate-y-1.5 hover:border-cyan-300/45 hover:shadow-[0_20px_48px_rgba(34,211,238,0.16)]`}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-extrabold leading-6 text-cyan-300 sm:text-[16px]">
              {item.company}
            </h3>
            {item.shortName ? (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-bold uppercase text-white/55">
                {item.shortName}
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-[13px] font-bold leading-6 text-white sm:text-[14px]">
            {item.title}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-1 pt-0.5 text-left sm:text-right">
          <p className="text-[11px] font-bold tracking-wide text-white/50 sm:text-[12px]">
            {item.date}
          </p>
          {item.website ? (
            <a
              href={item.website}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-semibold text-cyan-200/75 transition hover:text-cyan-200"
            >
              {item.websiteLabel ?? item.website}
            </a>
          ) : null}
        </div>
      </div>

      <p className="mt-5 max-w-[610px] text-[13px] font-medium leading-7 text-white/78 sm:text-[14px]">
        {item.description}
      </p>

      {item.tags?.length ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {item.tags.map((tag) => (
            <SkillTag key={tag}>{tag}</SkillTag>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function TimelineItem() {
  return (
    <div>
      <div className="mx-auto mt-10 max-w-[780px] sm:mt-14">
        {experiences.map((timelineItem, index) => {
          const isSegmentActive = index < experiences.length - 1;
          const isItemLast = index === experiences.length - 1;

          return (
            <div
              key={`${timelineItem.title}-${timelineItem.company}`}
              className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-3 sm:grid-cols-[62px_minmax(0,1fr)] sm:gap-5"
            >
              {!isItemLast ? (
                <span className="absolute left-[23px] top-11 h-[calc(100%+30px)] w-px bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(103,232,249,0.35),rgba(255,255,255,0.04))] sm:left-[30px]">
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
                className="relative z-10 flex justify-center pt-1"
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                {timelineItem.website ? (
                  <a
                    href={timelineItem.website}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${timelineItem.company} website`}
                    className="block h-11 w-11 overflow-hidden rounded-[14px] border border-white/20 bg-[#081124] shadow-[0_8px_20px_rgba(0,0,0,0.28)] ring-4 ring-[#020817] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-300/45 hover:shadow-[0_18px_38px_rgba(34,211,238,0.22)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/40 sm:h-12 sm:w-12"
                  >
                    <LogoMarker type={timelineItem.logo} />
                  </a>
                ) : (
                  <div className="h-11 w-11 overflow-hidden rounded-[14px] border border-white/20 bg-[#081124] shadow-[0_8px_20px_rgba(0,0,0,0.28)] ring-4 ring-[#020817] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-300/45 hover:shadow-[0_18px_38px_rgba(34,211,238,0.22)] sm:h-12 sm:w-12">
                    <LogoMarker type={timelineItem.logo} />
                  </div>
                )}
              </motion.div>

              <motion.div
                className="pb-8 sm:pb-9"
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.38,
                  ease: "easeOut",
                  delay: index > 0 ? 0.12 : 0,
                }}
              >
                <ExperienceCard item={timelineItem} isPrimary={index === 0} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="bg-transparent px-5 pb-16 pt-6 text-white sm:px-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12"
    >
      <div className="mx-auto max-w-[920px]">
        <div className="text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-white/40">
            WHERE I&apos;VE WORKED
          </p>
          <h2 className="mt-5 text-[44px] font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-[56px] md:text-[64px]">
            Experience
          </h2>
        </div>

        <TimelineItem />
      </div>
    </section>
  );
}
