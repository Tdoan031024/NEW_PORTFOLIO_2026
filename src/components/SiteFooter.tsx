"use client";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-transparent px-6 pb-10 pt-6 md:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] text-white">DOAN</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/62">
            Fullstack Developer focused on building scalable products with clean architecture and strong UX.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Connect</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/75">
            <a
              href="https://github.com/Tdoan031024"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 transition hover:border-cyan-300/45 hover:text-cyan-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/dvtd/"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 transition hover:border-cyan-300/45 hover:text-cyan-200"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 transition hover:border-cyan-300/45 hover:text-cyan-200"
            >
              Facebook
            </a>
            <a
              href="https://t.me/"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 transition hover:border-cyan-300/45 hover:text-cyan-200"
            >
              Telegram
            </a>
            <a
              href="https://www.tiktok.com/"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 transition hover:border-cyan-300/45 hover:text-cyan-200"
            >
              TikTok
            </a>
          </div>
          <div className="mt-3 space-y-1 text-sm text-white/70">
            <p>Phone: 09xx xxx xxx</p>
            <p>Email: hello@doan.tech</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/50">
        © {new Date().getFullYear()} Doan Tuyen. All rights reserved.
      </div>
    </footer>
  );
}
