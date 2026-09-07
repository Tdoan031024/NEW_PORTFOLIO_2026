import React from "react";

const experiences = [
  {
    logo: "google",
    title: "Event Scape",
    company: "Google For Developers On Campus",
    date: "Sept 2024 - Oct 2025",
    description:
      "Organized & managed technical events, workshops at GDG on Campus, coordinating teams and logistics to deliver impactful learning experiences for students.",
  },
  {
    logo: "publication",
    title: "Author",
    company: "Guru Shishya Publication",
    date: "Sept 2024 - Nov 2025",
    description:
      "As a Author of several books, I have mastered Microsoft Word for designing, formatting, and refining book manuscripts.",
    tags: ["Computer Architecture", "Java", "IOT"],
  },
  {
    logo: "education",
    title: "Cyber Security intern",
    company: "Edunet Foundation (VI)",
    date: "Mar 2026 – Apr 2026",
    description:
      "Gained practical exposure to Cyber Security concepts including ethical hacking, network security, packet analysis, cryptography, Kali Linux, Wireshark, Nmap, and phishing attack analysis",
  },
];

function SkillTag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-4 py-1.5 text-[11px] font-semibold text-neutral-500">
      {children}
    </span>
  );
}

function LogoMarker({ type }) {
  if (type === "google") {
    return (
      <div className="flex h-full w-full items-center justify-center text-[25px] font-bold tracking-[-2px]">
        <span className="text-blue-500">G</span>
      </div>
    );
  }

  if (type === "publication") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative h-5 w-5 rounded-full border border-neutral-400">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[54%] text-[9px] font-bold text-neutral-500">G</span>
          <span className="absolute -bottom-1 left-1/2 h-1.5 w-4 -translate-x-1/2 rounded-full bg-neutral-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-6 w-6">
        <span className="absolute bottom-1 left-1 h-3.5 w-4 rotate-[-12deg] rounded-[3px] border border-emerald-200 bg-emerald-50" />
        <span className="absolute left-2 top-1 h-2.5 w-2.5 rounded-full bg-sky-100" />
        <span className="absolute bottom-1.5 right-0 h-2 w-2 rounded-full bg-lime-200" />
      </div>
    </div>
  );
}

function ExperienceCard({ item }) {
  return (
    <article className="group w-full rounded-[16px] border border-neutral-200 bg-white px-7 py-7 shadow-[0_12px_35px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)] sm:px-8 sm:py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-[14px] font-extrabold leading-6 text-neutral-900 sm:text-[15px]">
          {item.title}
          <span className="mx-2 text-neutral-400">·</span>
          <span className="font-extrabold text-indigo-600">{item.company}</span>
        </h3>
        <p className="shrink-0 pt-0.5 text-[11px] font-bold tracking-wide text-neutral-400 sm:text-[12px]">
          {item.date}
        </p>
      </div>

      <p className="mt-6 max-w-[610px] text-[13px] font-medium leading-7 text-neutral-500 sm:text-[14px]">
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

function TimelineItem({ item, index, isLast }) {
  return (
    <div className="relative grid grid-cols-[54px_minmax(0,1fr)] gap-4 sm:grid-cols-[70px_minmax(0,1fr)] sm:gap-7">
      {!isLast && (
        <span className="absolute left-[26px] top-11 h-[calc(100%+32px)] w-px bg-neutral-200 sm:left-[34px]" />
      )}

      <div className="relative z-10 flex justify-center pt-1">
        <div className="h-11 w-11 rounded-full border border-neutral-200 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.07)] ring-4 ring-white sm:h-12 sm:w-12">
          <LogoMarker type={item.logo} />
        </div>
      </div>

      <div className="pb-8 sm:pb-9">
        <ExperienceCard item={item} />
      </div>
    </div>
  );
}

export default function WorkExperienceSection() {
  return (
    <main className="min-h-screen bg-white px-5 py-16 text-neutral-950 sm:px-8 sm:py-20 lg:py-24">
      <section className="mx-auto max-w-[920px]">
        <div className="text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-neutral-300">
            WHERE I’VE WORKED
          </p>
          <h1 className="mt-5 text-[44px] font-black leading-[0.95] tracking-[-0.055em] text-neutral-950 sm:text-[56px] md:text-[64px]">
            Work
            <br />
            Experience
          </h1>
        </div>

        <div className="mx-auto mt-16 max-w-[780px] sm:mt-20">
          {experiences.map((item, index) => (
            <TimelineItem
              key={`${item.title}-${item.company}`}
              item={item}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
