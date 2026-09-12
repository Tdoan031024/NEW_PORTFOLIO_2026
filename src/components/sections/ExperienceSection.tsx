"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export type Experience = {
  id: string;
  logo: "iec" | "huitMedia" | "sof" | "cluega" | "google" | "publication" | "education";
  title: string;
  company: string;
  shortName?: string;
  website?: string;
  websiteLabel?: string;
  date: string;
  description: string;
  tags?: string[];
  fullOverview: string;
  highlights: string[];
  keyProjects?: { name: string; desc: string; link?: string }[];
  location: string;
  teamSize?: string;
};

const experiences: Experience[] = [
  {
    id: "cluega",
    logo: "cluega",
    title: "Full-Stack Engineer",
    company: "Cluega | Full-Lifecycle AI Work Assistant",
    shortName: "CLUEGA",
    website: "https://cluega.com",
    websiteLabel: "cluega.com",
    date: "Sept 2026 - Present",
    description:
      "Contributing to the development of Cluega's Full-Lifecycle AI Work Assistant and marketing automation ecosystem. Building scalable web interfaces, autonomous workflow pipelines, LLM tool integrations, and cross-platform campaign synchronizations.",
    tags: ["Full-Lifecycle AI", "Workflow Automation", "LLM Integration", "Full-stack Development", "CDP & Analytics"],
    fullOverview:
      "Cluega là nền tảng trợ lý thông minh hỗ trợ toàn diện vòng đời công việc của doanh nghiệp (Full-Lifecycle AI Work Assistant). Hệ thống kết hợp Generative AI, các pipeline tự động hóa quy trình làm việc tự chủ (Autonomous workflow pipelines) và Customer Data Platform (CDP) giúp các tổ chức tối ưu hóa chiến dịch tiếp thị, quản trị dữ liệu tập trung và tăng năng suất vận hành.",
    highlights: [
      "Kiến trúc và phát triển giao diện người dùng Next.js / React tốc độ cao với trải nghiệm mượt mà và khả năng mở rộng linh hoạt.",
      "Xây dựng và tích hợp các pipeline tự động hóa quy trình làm việc sử dụng AI Agent & Large Language Models (LLMs).",
      "Triển khai cơ chế đồng bộ hóa chiến dịch tiếp thị và quản trị dữ liệu khách hàng theo thời gian thực (Real-time CDP).",
      "Tối ưu hóa hiệu năng, bảo mật API microservices và thiết lập quy trình kiểm thử tự động CI/CD.",
    ],
    keyProjects: [
      {
        name: "Cluega AI Workspace",
        desc: "Không gian làm việc số tích hợp AI tự động hóa workflow & tương tác dữ liệu thông minh.",
        link: "https://cluega.com",
      },
      {
        name: "Autonomous Marketing Pipeline",
        desc: "Hệ thống tự động hóa chiến dịch quảng bá và tối ưu chuyển đổi đa kênh.",
        link: "https://cluega.com",
      },
    ],
    location: "TP. Hồ Chí Minh · Hybrid",
    teamSize: "AI & Platform Engineering Team",
  },
  {
    id: "sof",
    logo: "sof",
    title: "Full-stack Developer",
    company: "SOF | Phần mềm quản trị doanh nghiệp & chuyển đổi số",
    shortName: "SOF",
    website: "https://sof.com.vn",
    websiteLabel: "sof.com.vn",
    date: "Jan 2026 - Aug 2026",
    description:
      "Contributing to enterprise software systems such as ERP, HRM, POS, and business management platforms, focusing on feature development, backend workflows, database operations, and user interface improvements.",
    tags: ["Enterprise Software", "ERP", "HRM", "POS", "Digital Transformation"],
    fullOverview:
      "Công ty TNHH SOF là đơn vị công nghệ tiên phong cung cấp giải pháp chuyển đổi số toàn diện cho doanh nghiệp, chuỗi bán lẻ, nhà hàng khách sạn (F&B), kho bãi và bãi đỗ xe thông minh. SOF phát triển cả nền tảng Web SaaS quản trị ERP và hệ sinh thái ứng dụng di động chuyên sâu trên Google Play.",
    highlights: [
      "Xây dựng nền tảng Web SaaS ERP đa chi nhánh, quản trị dòng tiền, xuất hóa đơn điện tử kết nối thuế và tích hợp cổng thanh toán VNPay, MoMo, VietQR.",
      "Phát triển và triển khai hệ sinh thái 6+ ứng dụng Android trên Google Play: SOF F&B, SOF HRM (quản lý nhân sự), SOF FACE AI (chấm công khuôn mặt), SOF WMS & WMS PRO (quản lý kho mã vạch), SOF PARKING & PARKING PRO (bãi đỗ xe thông minh IoT) và SOF POS.",
      "Tích hợp phần cứng IoT (máy in nhiệt Bluetooth/LAN, camera AI nhận diện biển số, máy quét mã vạch Honeywell/Zebra).",
      "Tối ưu hóa truy vấn SQL Server, MongoDB và đảm bảo vận hành ổn định 99.9% cho hàng trăm khách hàng doanh nghiệp.",
    ],
    keyProjects: [
      {
        name: "SOF Mobile Ecosystem",
        desc: "Hệ sinh thái ứng dụng Android doanh nghiệp phát hành trên Google Play.",
        link: "https://play.google.com/store/apps/developer?id=SOF+Company+Limited&hl=vi",
      },
      {
        name: "SOF SaaS Platform",
        desc: "Nền tảng ERP & chuyển đổi số quản trị dòng tiền, đơn hàng và nhân sự toàn diện.",
        link: "https://sof.com.vn/",
      },
    ],
    location: "Tân Bình, TP. Hồ Chí Minh",
    teamSize: "Core Development & Mobile Team",
  },
  {
    id: "huitMedia",
    logo: "huitMedia",
    title: "Full-stack Developer",
    company:
      "HUIT MEDIA - Kênh Thông tin và Truyền thông Trường ĐH Công Thương TP.HCM",
    shortName: "HUIT MEDIA",
    website: "https://huit.edu.vn",
    websiteLabel: "huit.edu.vn",
    date: "Oct 2025 - Now",
    description:
      "Developed event-based web platforms including registration systems, admin dashboards, QR ticketing, CMS modules, reporting tools, and an AI-powered career recommendation system for university events.",
    tags: ["Event Platforms", "Next.js", "QR Ticketing", "Realtime Voting", "High Concurrency"],
    fullOverview:
      "HUIT MEDIA là đơn vị truyền thông và công nghệ chính thức của Trường Đại học Công Thương TP.HCM, chịu trách nhiệm xây dựng các giải pháp số hóa sự kiện cấp trường và cấp thành phố với quy mô phục vụ hàng chục ngàn sinh viên truy cập đồng thời.",
    highlights: [
      "Phát triển nền tảng đại nhạc hội HUIT FEST 2026, hỗ trợ kết nối hơn 10 nghệ sĩ nổi tiếng và phục vụ đăng ký hơn 5.000 vé online an toàn, không nghẽn mạng.",
      "Xây dựng Cổng thông tin & Bình chọn thời gian thực cho Cuộc thi Khởi nghiệp HUIT STARTUP lần thứ VII (240+ dự án) và Cuộc thi Đại sứ HUIT'S ICONIC 2026 với cơ chế chống gian lận vote chặt chẽ.",
      "Thiết kế hệ thống vé điện tử QR Code check-in thời gian thực tại cửa soát vé với độ trễ phản hồi dưới 0.2 giây.",
      "Xây dựng Dashboard quản trị tập trung, xuất dữ liệu thống kê tự động và phân quyền ban tổ chức.",
    ],
    keyProjects: [
      {
        name: "HUIT FEST 2026",
        desc: "Nền tảng sự kiện âm nhạc quy mô lớn & đăng ký vé online tiện lợi.",
        link: "https://huitfest.huitmedia.edu.vn/",
      },
      {
        name: "HUIT STARTUP 2026",
        desc: "Cổng thi khởi nghiệp & bình chọn realtime cấp Thành phố cho 240+ dự án.",
        link: "https://startup.huitmedia.edu.vn/",
      },
      {
        name: "HUIT's ICONIC 2026",
        desc: "Hệ thống bình chọn thí sinh đại sứ truyền thông đa ngôn ngữ (VI/EN).",
        link: "https://iconic.huitmedia.edu.vn/",
      },
    ],
    location: "Tân Phú, TP. Hồ Chí Minh",
    teamSize: "Technical & Multimedia Committee",
  },
  {
    id: "iec",
    logo: "iec",
    title: "Full-stack Developer",
    company: "CENTER OF INNOVATION AND ENTREPRENEURSHIP (IEC - HUIT)",
    shortName: "IEC",
    website: "https://iec.huit.edu.vn/",
    websiteLabel: "iec.huit.edu.vn",
    date: "May 2025 - Sept 2025",
    description:
      "Improved the center's website, refactored the .NET MVC system, and developed a Career Fair platform supporting companies, students, administrators, and real event operations.",
    tags: ["ASP.NET MVC", "SQL Server", "Job Fair Portal", "CV Management", "Career Network"],
    fullOverview:
      "Trung tâm Đổi mới Sáng tạo và Khởi nghiệp (IEC - HUIT) là đơn vị hỗ trợ ươm tạo dự án khởi nghiệp, kết nối doanh nghiệp và nâng cao năng lực việc làm cho sinh viên Trường Đại học Công Thương TP.HCM.",
    highlights: [
      "Nâng cấp, bảo trì và tái cấu trúc hệ thống portal chính thức của Trung tâm IEC trên nền tảng .NET MVC và SQL Server.",
      "Phát triển Cổng thông tin Ngày hội Việc làm trực tuyến (Job Fair Portal), kết nối hơn 60 doanh nghiệp tuyển dụng với hàng ngàn sinh viên nộp hồ sơ CV trực tiếp.",
      "Xây dựng quy trình quản trị ứng viên, kiểm duyệt tin tuyển dụng và báo cáo tỷ lệ phỏng vấn thành công cho Ban Giám hiệu.",
      "Tối ưu hóa bảo mật và tốc độ truy vấn cơ sở dữ liệu khi lượng sinh viên ứng tuyển tăng đột biến.",
    ],
    keyProjects: [
      {
        name: "Job Fair Portal",
        desc: "Cổng thông tin Ngày hội Việc làm trực tuyến kết nối doanh nghiệp & sinh viên.",
      },
      {
        name: "IEC Innovation Portal",
        desc: "Trang thông tin ươm tạo khởi nghiệp và sáng tạo sinh viên HUIT.",
        link: "https://iec.huit.edu.vn/",
      },
    ],
    location: "Tân Phú, TP. Hồ Chí Minh",
    teamSize: "IEC Software Development Team",
  },
];

function SkillTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3.5 py-1 text-[11px] font-semibold text-cyan-200">
      {children}
    </span>
  );
}

function LogoMarker({ type }: { type: Experience["logo"] }) {
  if (type === "cluega") {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white p-1">
        <Image
          src="/assets/logos/cluega.png"
          alt="Cluega logo"
          width={44}
          height={32}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

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
  isSelected = false,
  onSelect,
}: {
  item: Experience;
  isSelected?: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      onClick={onSelect}
      className={`group relative w-full cursor-pointer rounded-[18px] border p-5 sm:p-7 transition-all duration-300 ${
        isSelected
          ? "border-cyan-400 bg-[linear-gradient(165deg,rgba(14,35,70,0.95),rgba(9,22,48,0.92)_55%,rgba(7,16,36,0.92))] shadow-[0_0_0_1px_rgba(34,211,238,0.4),0_18px_45px_rgba(34,211,238,0.22)] -translate-y-1"
          : "border-white/10 bg-[linear-gradient(165deg,rgba(12,20,40,0.92),rgba(8,14,30,0.9)_55%,rgba(6,12,26,0.9))] hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_16px_40px_rgba(34,211,238,0.14)]"
      }`}
    >
      {/* Indicator góc khi được chọn */}
      {isSelected && (
        <div className="absolute -top-2.5 right-4 z-10 flex items-center gap-1.5 rounded-full border border-cyan-300/60 bg-cyan-400 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.8)]">
          <span>●</span> Đang xem chi tiết
        </div>
      )}

      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 pr-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Khi click vào tên công ty: Mở website trong tab mới */}
            {item.website ? (
              <a
                href={item.website}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group/link inline-flex items-center gap-1.5 text-[15px] font-black leading-6 text-cyan-300 hover:text-cyan-100 hover:underline transition sm:text-[16.5px]"
                title={`Mở website chính thức của ${item.company}`}
              >
                <span>{item.company}</span>
                <svg
                  className="h-3.5 w-3.5 opacity-60 transition-transform group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 text-cyan-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ) : (
              <h3 className="text-[15px] font-black leading-6 text-cyan-300 sm:text-[16.5px]">
                {item.company}
              </h3>
            )}

            {item.shortName ? (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-bold uppercase text-white/55">
                {item.shortName}
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-[13.5px] font-bold leading-6 text-white sm:text-[14.5px]">
            {item.title}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-1 pt-0.5 text-left sm:text-right">
          <p className="text-[11.5px] font-bold tracking-wide text-white/55 sm:text-[12.5px]">
            {item.date}
          </p>
          {item.website ? (
            <a
              href={item.website}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-semibold text-cyan-200/75 transition hover:text-cyan-200 hover:underline flex items-center sm:justify-end gap-1"
            >
              <span>{item.websiteLabel ?? item.website}</span>
              <span>↗</span>
            </a>
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-[13px] font-medium leading-relaxed text-white/75 sm:text-[13.5px]">
        {item.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
        {item.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <SkillTag key={tag}>{tag}</SkillTag>
            ))}
          </div>
        ) : <div />}

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-300/80 group-hover:text-cyan-200 transition">
          <span>Xem mô tả đầy đủ</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </article>
  );
}

// Panel hiển thị chi tiết công ty ở khoảng không gian bên phải
function CompanyDetailShowcase({
  experience,
  onClose,
}: {
  experience: Experience;
  onClose?: () => void;
}) {
  return (
    <motion.div
      key={experience.id}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative flex flex-col rounded-2xl border border-cyan-400/40 bg-[#071328]/95 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(34,211,238,0.18)] text-white"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-[#081124] p-1.5 shadow-md ring-2 ring-cyan-400/30">
            <LogoMarker type={experience.logo} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Company Spotlight
              </span>
              {experience.shortName && (
                <span className="text-[10px] font-bold text-white/50 bg-white/5 px-2 py-0.5 rounded">
                  {experience.shortName}
                </span>
              )}
            </div>
            <h3 className="mt-1 text-base font-black text-white sm:text-lg leading-snug">
              {experience.company}
            </h3>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 hover:text-white p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer text-xs"
            title="Đóng panel"
          >
            ✕
          </button>
        )}
      </div>

      {/* Meta thông tin */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-medium">
        <div className="rounded-xl bg-white/[0.04] p-2.5 border border-white/5">
          <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Vai trò</div>
          <div className="mt-0.5 font-bold text-cyan-300">{experience.title}</div>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-2.5 border border-white/5">
          <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Thời gian</div>
          <div className="mt-0.5 font-bold text-white/90">{experience.date}</div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-white/60 px-1">
        <span>📍 {experience.location}</span>
        {experience.teamSize && <span>👥 {experience.teamSize}</span>}
      </div>

      {/* Mô tả tổng quan đầy đủ */}
      <div className="mt-5 space-y-2">
        <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
          <span>🏢</span> Giới thiệu về công ty
        </h4>
        <p className="text-xs leading-relaxed text-white/80 font-normal bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
          {experience.fullOverview}
        </p>
      </div>

      {/* Điểm sáng & Trách nhiệm chính */}
      <div className="mt-5 space-y-2.5">
        <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
          <span>⚡</span> Đóng góp & Trách nhiệm công nghệ
        </h4>
        <ul className="space-y-2 text-xs text-white/80">
          {experience.highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
              <span className="text-cyan-400 font-bold mt-0.5">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Các dự án liên quan */}
      {experience.keyProjects && experience.keyProjects.length > 0 && (
        <div className="mt-5 space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
            <span>🚀</span> Dự án tiêu biểu đã triển khai
          </h4>
          <div className="space-y-2">
            {experience.keyProjects.map((proj, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-2 rounded-xl bg-cyan-950/20 p-3 border border-cyan-400/20"
              >
                <div>
                  <h5 className="text-xs font-bold text-cyan-200">{proj.name}</h5>
                  <p className="text-[11px] text-white/70 mt-0.5">{proj.desc}</p>
                </div>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-[11px] font-semibold text-cyan-300 hover:text-cyan-100 hover:underline px-2 py-1 rounded bg-cyan-400/10 border border-cyan-400/30 transition"
                  >
                    Mở ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nút hành động */}
      {experience.website && (
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <span className="text-[11px] text-white/50">Trang chủ doanh nghiệp:</span>
          <a
            href={experience.website}
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition active:scale-95"
          >
            <span>Truy cập {experience.websiteLabel ?? "Website"}</span>
            <span>↗</span>
          </a>
        </div>
      )}
    </motion.div>
  );
}

export default function ExperienceSection() {
  const [selectedExp, setSelectedExp] = useState<Experience>(experiences[0]);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const handleSelect = (item: Experience) => {
    setSelectedExp(item);
    // Nếu màn hình di động/tablet, mở modal popup
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsMobileModalOpen(true);
    }
  };

  return (
    <section
      id="experience"
      className="bg-transparent px-4 pb-16 pt-6 text-white sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24 lg:pt-12"
    >
      <div className="mx-auto max-w-[1360px]">
        <div className="text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-white/40">
            WHERE I&apos;VE WORKED
          </p>
          <h2 className="mt-4 text-[42px] font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-[54px] md:text-[62px]">
            Experience
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-cyan-200/70 max-w-xl mx-auto">
            Hành trình kỹ thuật thực tế qua các doanh nghiệp công nghệ, dự án SaaS quy mô lớn và hệ sinh thái ứng dụng di động.
          </p>
        </div>

        {/* Layout chia 2 cột: Cột trái là Timeline Cards, Cột phải là Panel Chi Tiết Công Ty ở khoảng trống */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột trái: Trục Timeline và các thẻ kinh nghiệm (chiếm 7/12) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="relative">
              {experiences.map((timelineItem, index) => {
                const isItemLast = index === experiences.length - 1;
                const isSelected = selectedExp.id === timelineItem.id;

                return (
                  <div
                    key={timelineItem.id}
                    className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-2.5 sm:grid-cols-[62px_minmax(0,1fr)] sm:gap-5"
                  >
                    {!isItemLast && (
                      <span className="absolute left-[19px] top-11 h-[calc(100%-24px)] w-px bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(103,232,249,0.35),rgba(255,255,255,0.04))] sm:left-[30px] sm:top-[52px] sm:h-[calc(100%-28px)]">
                        <span className="absolute left-0 top-0 block w-[2px] h-full bg-cyan-200/50 shadow-[0_0_15px_rgba(103,232,249,0.8)]" />
                      </span>
                    )}

                    {/* Logo marker bên trái - Bấm logo cũng dẫn đến web */}
                    <div className="relative z-10 flex justify-center pt-1">
                      {timelineItem.website ? (
                        <a
                          href={timelineItem.website}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Mở website của ${timelineItem.company}`}
                          title={`Mở website của ${timelineItem.company}`}
                          className="block h-10 w-10 overflow-hidden rounded-[12px] border border-white/20 bg-[#081124] shadow-[0_8px_20px_rgba(0,0,0,0.28)] ring-2 ring-[#020817] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-300/60 hover:shadow-[0_18px_38px_rgba(34,211,238,0.3)] sm:h-12 sm:w-12 sm:rounded-[14px] sm:ring-4"
                        >
                          <LogoMarker type={timelineItem.logo} />
                        </a>
                      ) : (
                        <div className="h-10 w-10 overflow-hidden rounded-[12px] border border-white/20 bg-[#081124] shadow-[0_8px_20px_rgba(0,0,0,0.28)] ring-2 ring-[#020817] sm:h-12 sm:w-12 sm:rounded-[14px] sm:ring-4">
                          <LogoMarker type={timelineItem.logo} />
                        </div>
                      )}
                    </div>

                    {/* Thẻ Card nội dung */}
                    <div className="pb-8 sm:pb-9">
                      <ExperienceCard
                        item={timelineItem}
                        isSelected={isSelected}
                        onSelect={() => handleSelect(timelineItem)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cột phải trên Desktop: Panel mô tả chi tiết công ty ở khoảng trống (chiếm 5/12) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 sticky top-28">
            <div className="mb-2 flex items-center justify-between text-xs text-white/50 px-1">
              <span className="flex items-center gap-1.5 font-mono">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                HỒ SƠ NĂNG LỰC DOANH NGHIỆP
              </span>
              <span className="text-[11px] text-cyan-300/70">Bấm thẻ bên trái để chuyển</span>
            </div>

            <AnimatePresence mode="wait">
              <CompanyDetailShowcase
                key={selectedExp.id}
                experience={selectedExp}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Popup Modal chi tiết cho màn hình Di động & Tablet (lg:hidden) */}
      <AnimatePresence>
        {isMobileModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="max-h-[85vh] w-full sm:max-w-xl overflow-y-auto rounded-t-3xl sm:rounded-2xl"
            >
              <CompanyDetailShowcase
                experience={selectedExp}
                onClose={() => setIsMobileModalOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
