"use client";

import { useEffect, useRef, useState } from "react";
import { playAiChimeSound } from "@/utils/audioEffects";
import { useLanguage } from "@/components/LanguageProvider";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
};

const SUGGESTED_PROMPTS_VI = [
  "💼 Kinh nghiệm làm việc của Tuyến Đoàn?",
  "🚀 Các dự án nổi bật nhất gần đây?",
  "🛠️ Kỹ năng công nghệ & Tech Stack?",
  "📬 Cách thức liên hệ phỏng vấn hoặc hợp tác?",
];

const SUGGESTED_PROMPTS_EN = [
  "💼 What is Tuyen Doan's work experience?",
  "🚀 What are the featured projects?",
  "🛠️ Core tech stack and technical skills?",
  "📬 How to get in touch for interviews or collaboration?",
];

function generateAiResponse(query: string, lang: "vi" | "en" = "en"): string {
  const lower = query.toLowerCase();

  if (
    lower.includes("kinh nghiệm") ||
    lower.includes("kinh nghiem") ||
    lower.includes("experience") ||
    lower.includes("work") ||
    lower.includes("làm việc")
  ) {
    if (lang === "en") {
      return `**Tuyen Doan's Professional Experience:**\n\n1. **Full-Stack Engineer at Cluega (09/2026 - Present):**\n   - Contributing to Cluega's Full-Lifecycle AI Work Assistant and marketing automation ecosystem.\n   - Building scalable web interfaces, autonomous workflow pipelines, LLM tool integrations, and real-time CDP synchronizations.\n\n2. **Full-Stack Developer at SOF Company Limited (01/2026 - 08/2026):**\n   - Developed Android apps published on Google Play: SOF F&B, SOF FACE AI (facial recognition attendance), SOF WMS (barcode warehouse), and SOF POS.\n   - Built multi-branch Web SaaS ERP platforms with automated electronic invoice tax integrations and VNPay, MoMo, VietQR payment gateways.\n\n3. **Full-Stack Developer Intern at IEC Center - HUIT (06/2025 - 09/2025):**\n   - Developed the Job Fair Portal with ASP.NET 8.0 MVC and SQL Server.`;
    }
    return `**Kinh nghiệm làm việc của Đỗ Văn Tuyến Đoàn:**\n\n1. **Full-Stack Engineer tại Cluega (09/2026 - Hiện tại):**\n   - Phát triển hệ thống trợ lý công việc AI (Full-Lifecycle AI Work Assistant) và pipeline tự động hóa quy trình làm việc.\n   - Tích hợp công cụ LLM, đồng bộ chiến dịch marketing đa kênh và nền tảng dữ liệu khách hàng (CDP).\n\n2. **Full-Stack Developer tại Công ty TNHH SOF (01/2026 - 08/2026):**\n   - Phát triển hệ sinh thái 6+ ứng dụng Android trên Google Play: SOF F&B, SOF FACE AI chấm công, SOF WMS quản lý kho, SOF Parking.\n   - Xây dựng nền tảng Web SaaS ERP quản trị doanh nghiệp đa chi nhánh, tích hợp VNPay, Momo, VietQR.\n\n3. **Full-Stack Developer Intern tại Trung tâm IEC - HUIT (06/2025 - 09/2025):**\n   - Phát triển Cổng thông tin Ngày hội việc làm với ASP.NET 8.0 MVC và SQL Server.`;
  }

  if (
    lower.includes("dự án") ||
    lower.includes("du an") ||
    lower.includes("project") ||
    lower.includes("huit fest") ||
    lower.includes("startup") ||
    lower.includes("sof") ||
    lower.includes("iconic") ||
    lower.includes("elh")
  ) {
    if (lang === "en") {
      return `**Featured Projects:**\n\n- 🎵 **HUIT FEST 2026:** Concert platform for Ho Chi Minh City University of Industry and Trade, hosting 10+ celebrity artists and 5,000+ online ticket registrations.\n- 🏆 **HUIT STARTUP 2026:** City-wide startup contest portal with 240+ submissions, realtime fraud-proof voting and leaderboard.\n- 🤖 **SOF Mobile Ecosystem:** 6+ published Android enterprise apps on Google Play (Face AI, Barcode WMS, POS, Parking).\n- ☁️ **SOF SaaS Platform:** Cloud ERP & digital transformation platform with cash-flow management and electronic invoices.\n- ⚡ **ELH E-Commerce:** Industrial electrical equipment and automation platform (Siemens, ABB, MPE).\n- 👑 **HUIT's ICONIC 2026:** Student Ambassador contest with bilingual voting (VI/EN).\n\n👉 You can check out interactive case studies under the **Featured Projects** section!`;
    }
    return `**Các dự án nổi bật nhất:**\n\n- 🎵 **HUIT FEST 2026:** Nền tảng đại nhạc hội sinh viên Trường ĐH Công Thương TP.HCM, kết nối 10+ nghệ sĩ khách mời và phục vụ đăng ký hơn 5.000 vé online.\n- 🏆 **HUIT STARTUP 2026:** Cổng cuộc thi khởi nghiệp cấp Thành phố với 240+ đề tài, bình chọn realtime chống gian lận vote.\n- 🤖 **SOF Mobile Ecosystem:** Hệ sinh thái 6+ ứng dụng Android doanh nghiệp trên Google Play (Face AI, Barcode WMS, POS, Parking).\n- ☁️ **SOF SaaS Platform:** Nền tảng ERP & chuyển đổi số quản trị dòng tiền, hóa đơn điện tử kết nối thuế.\n- ⚡ **ELH E-Commerce:** Website thương mại điện tử thiết bị điện công nghiệp và giải pháp tự động hóa chính hãng (Siemens, ABB, MPE).\n- 👑 **HUIT's ICONIC 2026:** Hệ thống bình chọn Đại sứ Truyền thông sinh viên HUIT hỗ trợ đa ngôn ngữ.\n\n👉 Bạn có thể xem chi tiết từng dự án tại mục **Dự án Nổi bật** trên website!`;
  }

  if (
    lower.includes("kỹ năng") ||
    lower.includes("ky nang") ||
    lower.includes("skill") ||
    lower.includes("tech stack") ||
    lower.includes("công nghệ") ||
    lower.includes("technology")
  ) {
    if (lang === "en") {
      return `**Core Technical Skills:**\n\n- **Frontend:** Next.js (App Router, Server Components), React, TypeScript, Tailwind CSS, Three.js / WebGL, Framer Motion, GSAP.\n- **Mobile:** React Native, Expo, Android Native, Face AI, Barcode/QR Scanning, Bluetooth Thermal Printing.\n- **Backend:** Node.js, Express, NestJS, Go (Gin), ASP.NET Core, RESTful APIs, WebSockets / Socket.IO, WebRTC.\n- **Databases:** PostgreSQL, MySQL, SQL Server, MongoDB, Redis.\n- **Cloud & DevOps:** Docker, Docker Compose, GitHub Actions CI/CD, Cloudflare, OCI, Vercel.`;
    }
    return `**Kỹ năng công nghệ chính của Tuyến Đoàn:**\n\n- **Frontend:** React, Next.js (App Router, Server Components), TypeScript, Tailwind CSS, Three.js / WebGL, Framer Motion, GSAP.\n- **Mobile:** React Native, Expo, Android Native, Face AI, Scanner Barcode/QR, Bluetooth Thermal Printing.\n- **Backend:** Node.js, Express, NestJS, ASP.NET Core, Go, RESTful API, WebSockets / Socket.IO, WebRTC.\n- **Database:** MySQL, PostgreSQL, SQL Server, MongoDB, Redis.\n- **Cloud & DevOps:** Docker, GitHub Actions, Cloudflare, Git, CI/CD, Vercel.`;
  }

  if (
    lower.includes("liên hệ") ||
    lower.includes("lien he") ||
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("sđt") ||
    lower.includes("phone") ||
    lower.includes("phỏng vấn") ||
    lower.includes("interview") ||
    lower.includes("hire")
  ) {
    if (lang === "en") {
      return `**Contact & Collaboration Info:**\n\n- 📧 **Email:** [dovantuyendoan14@gmail.com](mailto:dovantuyendoan14@gmail.com)\n- 📱 **Phone/Zalo:** 0888854212\n- 💻 **GitHub:** [github.com/Tdoan031024](https://github.com/Tdoan031024)\n- 💼 **LinkedIn:** [linkedin.com/in/dvtd](https://www.linkedin.com/in/dvtd/)\n- 📍 **Location:** Ho Chi Minh City, Vietnam\n\nFeel free to scroll down to the Contact section to send a direct message!`;
    }
    return `**Thông tin kết nối trực tiếp với Đỗ Văn Tuyến Đoàn:**\n\n- 📧 **Email:** [dovantuyendoan14@gmail.com](mailto:dovantuyendoan14@gmail.com)\n- 📱 **Điện thoại:** 0888854212\n- 💻 **GitHub:** [github.com/Tdoan031024](https://github.com/Tdoan031024)\n- 💼 **LinkedIn:** [linkedin.com/in/dvtd](https://www.linkedin.com/in/dvtd/)\n- 📍 **Địa chỉ:** TP. Hồ Chí Minh, Việt Nam\n\nBạn cũng có thể cuộn xuống cuối trang để gửi tin nhắn trực tiếp qua form liên hệ!`;
  }

  if (
    lower.includes("mèo") ||
    lower.includes("meo") ||
    lower.includes("cat") ||
    lower.includes("phòng") ||
    lower.includes("3d") ||
    lower.includes("robot") ||
    lower.includes("room")
  ) {
    if (lang === "en") {
      return `**Easter Eggs in this 3D Room!** 🎮\n\nBuilt with **Three.js & WebGL**, simulating a modern developer's setup:\n- 🐱 **Click the Cat:** Bounces happily and meows!\n- 💀 **Click the Skeleton:** Wiggles humorously symbolizing late-night dev sessions!\n- 🤖 **Click the Robot/Pedestal:** Spins 360° and glows neon!\n- 💺 **Click the Chair:** Ergonomic chair completes a full 360° rotation!\n- 🕹️ **Click the Computers / Arcade:** Launches the **Cyber Bug Hunter** retro arcade game!\n- 🤖 **Click Me (White AI Robot):** Opens this interactive AI assistant!`;
    }
    return `**Bật mí về Căn phòng IT 3D này!** 🎮\n\nCăn phòng được xây dựng bằng **Three.js & WebGL**, mô phỏng không gian làm việc của một Full-Stack Developer:\n- 🐱 **Bấm vào chú mèo:** Chú mèo sẽ nảy tưng tưng và kêu 'Meowww~'\n- 💀 **Bấm vào bộ xương:** Lắc lư hài hước biểu tượng dev cày cuốc đêm!\n- 🤖 **Bấm vào Robot / Trụ:** Robot nhảy và xoay 360 độ phát sáng!\n- 💺 **Bấm vào ghế:** Ghế công thái học xoay tròn 360 độ!\n- 🕹️ **Bấm vào máy tính / máy game:** Mở ngay tựa game **Cyber Bug Hunter** để giải trí!\n- 🤖 **Và bấm vào tôi (Robot AI màu trắng):** Mở hộp thoại trò chuyện thông minh này!`;
  }

  if (lang === "en") {
    return `Thank you for your question about **"${query}"**! Tuyen Doan is a dedicated Full-Stack Software Engineer with proven experience across Next.js, React Native, Node.js, and interactive 3D WebGL systems. Would you like to explore his featured projects or get in touch for collaboration?`;
  }
  return `Cảm ơn câu hỏi của bạn về **"${query}"**! Đỗ Văn Tuyến Đoàn là một Full-stack Developer tận tâm, giàu kinh nghiệm thực chiến với Next.js, React Native, Node.js và hệ thống 3D WebGL. Bạn có muốn xem thêm về các dự án thực tế hay thông tin liên hệ không?`;
}

export default function AIChatModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize or reset welcome message when language or modal opens
  useEffect(() => {
    if (isOpen) {
      playAiChimeSound();
      const welcomeText =
        language === "en"
          ? "Hello! 👋 I'm **Doan AI Assistant** - connected directly to the 3D Room Robot of **Tuyen Doan**.\n\nI can share insights on **work experience**, **featured projects** (HUIT Fest, HUIT Startup, SOF SaaS, ELH E-Commerce...), **technical skills**, or **how to connect for opportunities**. What would you like to know?"
          : "Xin chào! 👋 Tôi là **Doan AI Assistant** - Trợ lý thông minh được kết nối trực tiếp từ Robot trong không gian 3D của **Đỗ Văn Tuyến Đoàn**.\n\nTôi có thể cung cấp chi tiết về **kinh nghiệm làm việc**, **các dự án tiêu biểu** (HUIT Fest, HUIT Startup, SOF SaaS, ELH E-Commerce...), **kỹ năng công nghệ** hoặc **kết nối phỏng vấn**. Bạn muốn tìm hiểu điều gì?";

      setMessages([
        {
          id: "welcome-1",
          sender: "ai",
          text: welcomeText,
          time: language === "en" ? "Just now" : "Vừa xong",
        },
      ]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      time: language === "en" ? "Just now" : "Vừa xong",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking and streaming response
    setTimeout(() => {
      const reply = generateAiResponse(text, language);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
        time: language === "en" ? "Just now" : "Vừa xong",
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  const prompts = language === "en" ? SUGGESTED_PROMPTS_EN : SUGGESTED_PROMPTS_VI;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center sm:justify-end bg-black/75 backdrop-blur-md p-3 sm:p-6">
      <div className="relative flex flex-col h-[640px] max-h-[92vh] w-full max-w-[480px] overflow-hidden rounded-[28px] border border-cyan-400/35 bg-[linear-gradient(165deg,rgba(10,20,42,0.96),rgba(6,12,28,0.98))] shadow-[0_0_80px_rgba(34,211,238,0.3)] text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0c1833]/90 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-[0_0_18px_rgba(34,211,238,0.6)]">
              <span className="text-xl">🤖</span>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0c1833] bg-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black tracking-wide text-white">Doan AI Assistant</h3>
                <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[9px] font-bold text-cyan-200 border border-cyan-400/30">
                  Robot 3D
                </span>
              </div>
              <p className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {language === "en" ? "Online · Ready to assist" : "Trực tuyến · Sẵn sàng giải đáp"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white transition"
            title={language === "en" ? "Close (ESC)" : "Đóng (ESC)"}
          >
            ✕
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/15">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "ai" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-400/30 text-xs">
                  🤖
                </div>
              )}

              <div
                className={`max-w-[84%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-md ${
                  msg.sender === "user"
                    ? "rounded-tr-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-[0_4px_16px_rgba(6,182,212,0.3)]"
                    : "rounded-tl-xs border border-white/10 bg-white/[0.05] text-white/90 whitespace-pre-line"
                }`}
              >
                {msg.text}
                <div
                  className={`mt-1.5 text-[10px] font-mono ${
                    msg.sender === "user" ? "text-cyan-100/70 text-right" : "text-white/40"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-cyan-300 font-mono pl-10">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-bounce" />
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-white/50">
                {language === "en" ? "AI is typing..." : "AI đang gõ..."}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="border-t border-white/10 bg-[#071328]/95 px-4 py-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
            {language === "en" ? "Suggested Questions:" : "Gợi ý câu hỏi:"}
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-[72px] overflow-y-auto">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt.replace(/^[^\s]+\s/, ""))}
                className="cursor-pointer rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-200 transition hover:bg-cyan-400/20 hover:border-cyan-300 active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 border-t border-white/10 bg-[#09152e] p-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              language === "en"
                ? "Ask AI about experience, projects, tech stack..."
                : "Hỏi AI về kinh nghiệm, dự án, tech stack..."
            }
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-400/60 focus:bg-white/[0.08] transition"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_16px_rgba(6,182,212,0.4)] transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            {language === "en" ? "Send ✈" : "Gửi ✈"}
          </button>
        </form>
      </div>
    </div>
  );
}
