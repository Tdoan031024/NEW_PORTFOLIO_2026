"use client";

import Link from "next/link";

const navLinks = [
  { label: "About Me", href: "#hero" },
  { label: "Tech Stack", href: "#skills" },
  { label: "Featured Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Get in Touch", href: "#contact" },
  { label: "Download CV (PDF)", href: "/assets/file/Fullstack_Developer-Do_Van_Tuyen_Doan.pdf", isDownload: true },
];

const featuredProjects = [
  { label: "HUIT FEST 2026", href: "https://huitfest.huitmedia.edu.vn/", isExternal: true },
  { label: "HUIT STARTUP 2026", href: "https://startup.huitmedia.edu.vn/", isExternal: true },
  { label: "SOF Apps (Google Play)", href: "https://play.google.com/store/apps/developer?id=SOF+Company+Limited&hl=vi", isExternal: true },
  { label: "SOF SaaS Platform", href: "https://sof.com.vn/", isExternal: true },
  { label: "ELH E-Commerce", href: "https://elh.com.vn/", isExternal: true },
  { label: "HUIT's ICONIC 2026", href: "https://iconic.huitmedia.edu.vn/", isExternal: true },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Tdoan031024",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/dvtd/",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/doans.310",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-white/10 bg-[#020714] text-white">
      {/* Top glowing ambient line */}
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

      {/* Subtle radial backdrop glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(34,211,238,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-8 md:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Identity (Col 1: span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#hero"
              aria-label="Tuyen Doan Portfolio Homepage"
              className="inline-block transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/assets/logo/signature-white.png"
                alt="Tuyen Doan Signature Logo"
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]"
              />
            </a>

            <p className="max-w-sm text-sm leading-6 text-white/65">
              Full-Stack Software Engineer focused on crafting scalable products, modern architectures, and engaging interactive experiences.
            </p>

            <div className="pt-1 text-xs text-white/50 space-y-1.5">
              <p className="flex items-center gap-2">
                <span>📍</span> Ho Chi Minh City, Vietnam
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:0888854212" className="text-cyan-300/80 hover:text-cyan-200 transition font-medium">
                  0888854212
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:dovantuyendoan14@gmail.com" className="text-cyan-300/80 hover:text-cyan-200 transition font-medium">
                  dovantuyendoan14@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Navigation Links (Col 2: span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.isDownload ? "_blank" : undefined}
                    rel={item.isDownload ? "noopener noreferrer" : undefined}
                    download={item.isDownload ? "Fullstack_Developer-Do_Van_Tuyen_Doan.pdf" : undefined}
                    className="group inline-flex items-center gap-1.5 text-white/60 transition-colors duration-200 hover:text-cyan-200"
                  >
                    <span className="h-1 w-1 rounded-full bg-transparent transition-all group-hover:w-2 group-hover:bg-cyan-400" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Projects (Col 3: span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">
              Featured Work
            </p>
            <ul className="space-y-2.5 text-sm">
              {featuredProjects.map((item) => (
                <li key={item.label}>
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-white/60 transition-colors duration-200 hover:text-cyan-200"
                    >
                      <span className="truncate">{item.label}</span>
                      <svg className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 text-white/60 transition-colors duration-200 hover:text-cyan-200"
                    >
                      <span className="truncate">{item.label}</span>
                      <span className="opacity-0 transition-opacity group-hover:opacity-100 text-cyan-400">→</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Socials (Col 4: span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">
              Connect
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-500/15 hover:text-cyan-200 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <div className="pt-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-200 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
              >
                <span>Let&apos;s Connect</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-white/45">
          <p>© {new Date().getFullYear()} Tuyen Doan. All rights reserved.</p>

          {/* Smooth Back to Top button */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            <span>Back to top</span>
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
