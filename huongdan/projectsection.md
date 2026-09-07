import React from "react";
import { Moon, Download, ExternalLink, ChevronRight, Grid2X2, ArrowRight } from "lucide-react";

const navItems = ["Giới thiệu", "Kỹ năng", "Dự án", "Kinh nghiệm", "Chứng chỉ", "Liên hệ"];

const projects = [
  {
    number: "1",
    year: "2024 – Nay",
    date: "(05/2024 – Hiện tại)",
    title: "HUIT FEST Website",
    role: "Frontend Developer",
    description:
      "Xây dựng website chính thức cho sự kiện HUIT FEST với giao diện hiện đại, tối ưu trải nghiệm người dùng và hiệu năng.",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    preview: "huit",
  },
  {
    number: "2",
    year: "2023 – 2024",
    date: "(08/2023 – 04/2024)",
    title: "Reviewer Panel System",
    role: "Fullstack Developer",
    description:
      "Hệ thống quản lý và chấm bài cho giảng viên và sinh viên, hỗ trợ quá trình đánh giá đồ án hiệu quả và minh bạch.",
    techs: ["React", "Node.js", "MongoDB", "Material UI"],
    preview: "dashboard",
  },
  {
    number: "3",
    year: "2023",
    date: "(03/2023 – 07/2023)",
    title: "Flutter Expense Manager",
    role: "Mobile Developer",
    description:
      "Ứng dụng quản lý chi tiêu cá nhân trên nền tảng mobile với biểu đồ thống kê trực quan và đồng bộ dữ liệu.",
    techs: ["Flutter", "Dart", "Hive", "Syncfusion"],
    preview: "mobile",
  },
  {
    number: "4",
    year: "2022 – 2023",
    date: "(09/2022 – 02/2023)",
    title: "Portfolio 3D",
    role: "Frontend Developer",
    description:
      "Portfolio cá nhân với hiệu ứng 3D tương tác, thiết kế tối giản và trải nghiệm mượt mà.",
    techs: ["Three.js", "React", "Tailwind CSS", "GSAP"],
    preview: "portfolio",
  },
  {
    number: "5",
    year: "2022",
    date: "(05/2022 – 08/2022)",
    title: "AI Image Colorization",
    role: "Machine Learning Engineer",
    description:
      "Ứng dụng mô hình deep learning để tự động tô màu ảnh đen trắng với độ chính xác cao.",
    techs: ["Python", "TensorFlow", "OpenCV", "NumPy"],
    preview: "ai",
  },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
      <div className="mx-auto flex h-[68px] max-w-[1340px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-black tracking-[-0.08em] text-blue-600">
            <span className="text-slate-900">N</span>T
          </div>
          <div className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            Nguyễn Tấn
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.14)]" />
          </div>
        </div>

        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`relative py-6 text-[15px] transition-colors duration-300 ${
                item === "Kinh nghiệm"
                  ? "font-semibold text-blue-600"
                  : "font-medium text-slate-600 hover:text-slate-950"
              }`}
            >
              {item}
              {item === "Kinh nghiệm" && (
                <span className="absolute bottom-0 left-1/2 h-[3px] w-[86px] -translate-x-1/2 rounded-full bg-blue-600" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="grid h-10 w-10 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
            <Moon size={19} strokeWidth={2} />
          </button>
          <button className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-md sm:flex">
            <Download size={16} />
            Tải CV
          </button>
        </div>
      </div>
    </header>
  );
}

function TechBadge({ children }) {
  return (
    <span className="rounded-[6px] bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 ring-1 ring-blue-100/70">
      {children}
    </span>
  );
}

function HuitPreview() {
  return (
    <div className="relative h-full min-h-[124px] overflow-hidden rounded-xl bg-[#09081d] shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_48%,rgba(124,58,237,0.48),transparent_12%),radial-gradient(circle_at_82%_22%,rgba(59,130,246,0.38),transparent_15%),linear-gradient(135deg,rgba(24,24,68,0.8),rgba(7,7,22,1))]" />
      <div className="absolute left-4 right-4 top-3 flex items-center justify-between text-[5px] text-white/70">
        <span className="font-bold text-white">NT HUIT FEST</span>
        <span className="rounded bg-violet-500 px-1.5 py-0.5 text-white">Kinh nghiệm</span>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <p className="text-xl font-black tracking-tight text-white">HUIT FEST 2024</p>
        <p className="mt-1 text-[8px] text-white/60">Professional event showcase website</p>
        <div className="mt-4 flex gap-2">
          <span className="rounded bg-fuchsia-500/90 px-3 py-1 text-[7px] text-white">Đăng ký ngay</span>
          <span className="rounded border border-white/15 px-3 py-1 text-[7px] text-white/75">Xem thêm</span>
        </div>
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
          <p className="text-xl font-black leading-tight">Nguyễn Tấn</p>
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
        <span className="absolute left-2 top-2 z-10 rounded bg-slate-900 px-2 py-1 text-[8px] font-bold text-white">Before</span>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#f8fafc_0_8%,transparent_9%),linear-gradient(150deg,#475569,#cbd5e1)]" />
        <div className="absolute bottom-0 left-1/2 h-16 w-20 -translate-x-1/2 rounded-t-lg bg-slate-700" />
        <div className="absolute bottom-0 h-8 w-full bg-slate-500" />
      </div>
      <div className="relative overflow-hidden rounded-lg bg-blue-100">
        <span className="absolute left-2 top-2 z-10 rounded bg-slate-900 px-2 py-1 text-[8px] font-bold text-white">After</span>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-emerald-50 to-lime-200" />
        <div className="absolute bottom-0 left-1/2 h-16 w-20 -translate-x-1/2 rounded-t-lg bg-amber-700" />
        <div className="absolute bottom-0 h-8 w-full bg-lime-700" />
      </div>
    </div>
  );
}

function PreviewMockup({ type }) {
  if (type === "huit") return <HuitPreview />;
  if (type === "dashboard") return <DashboardPreview />;
  if (type === "mobile") return <MobilePreview />;
  if (type === "portfolio") return <PortfolioPreview />;
  return <AiPreview />;
}

function TimelineInfo({ project }) {
  return (
    <div className="relative flex min-h-[154px] gap-4 lg:block lg:pl-[70px]">
      <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-blue-500 bg-white text-sm font-bold text-blue-600 shadow-[0_0_0_5px_rgba(59,130,246,0.05)] lg:absolute lg:left-0 lg:top-3">
        {project.number}
      </div>
      <div className="pt-1 lg:pt-4">
        <p className="text-sm font-bold text-blue-500">{project.year}</p>
        <p className="mt-1 text-sm font-medium text-slate-500">{project.date}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article
      className="group relative min-h-[154px] rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_12px_36px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.12)]"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="grid gap-4 md:grid-cols-[1.12fr_0.88fr_22px] md:items-center">
        <div className="px-1 py-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold tracking-[-0.03em] text-slate-950">{project.title}</h3>
            <ExternalLink size={18} className="text-slate-500 transition group-hover:text-blue-600" />
          </div>
          <p className="mt-1 text-sm font-semibold text-blue-600">{project.role}</p>
          <p className="mt-2 max-w-[560px] text-[15px] leading-6 text-slate-500">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {project.techs.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </div>
        </div>

        <PreviewMockup type={project.preview} />

        <div className="hidden justify-self-end text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600 md:block">
          <ChevronRight size={24} />
        </div>
      </div>
    </article>
  );
}

function ExperienceSection() {
  return (
    <main className="relative overflow-hidden bg-[#fbfbfd] pb-16 pt-14 font-sans text-slate-900 sm:pt-20">
      <div className="pointer-events-none absolute left-8 top-32 hidden h-32 w-24 opacity-30 [background-image:radial-gradient(#94a3b8_1.2px,transparent_1.2px)] [background-size:15px_15px] md:block" />
      <div className="pointer-events-none absolute bottom-8 right-10 hidden h-32 w-24 opacity-30 [background-image:radial-gradient(#94a3b8_1.2px,transparent_1.2px)] [background-size:15px_15px] md:block" />

      <section className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_430px] lg:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-600">KINH NGHIỆM</p>
            <h1 className="mt-3 text-5xl font-black tracking-[-0.055em] text-slate-950 sm:text-6xl">Kinh nghiệm</h1>
            <p className="mt-3 text-xl font-medium text-slate-500">Projects & Work Experience</p>
          </div>
          <p className="max-w-[420px] text-[15px] leading-7 text-slate-500 lg:pb-8">
            Những dự án nổi bật tôi đã thực hiện, từ phát triển web, mobile đến các sản phẩm ứng dụng AI.
          </p>
        </div>

        <div className="relative mt-8 grid gap-6 lg:mt-7 lg:grid-cols-[200px_1fr] lg:gap-10">
          <div className="absolute left-5 top-4 h-[calc(100%-120px)] w-px bg-slate-200 lg:left-5 lg:h-[calc(100%-82px)]" />

          <div className="hidden lg:block">
            {projects.map((project) => (
              <TimelineInfo key={project.number} project={project} />
            ))}
          </div>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={project.number} className="grid gap-4 lg:block">
                <div className="lg:hidden">
                  <TimelineInfo project={project} />
                </div>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="group inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-md">
            <Grid2X2 size={17} />
            Xem thêm dự án
            <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#fbfbfd]" style={{ fontFamily: "Inter, Manrope, Plus Jakarta Sans, system-ui, sans-serif" }}>
      <Navbar />
      <ExperienceSection />
      <style>{`
        @keyframes softFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        article {
          animation: softFadeUp 0.65s ease both;
        }
      `}</style>
    </div>
  );
}
