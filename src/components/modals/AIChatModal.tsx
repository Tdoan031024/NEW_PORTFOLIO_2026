"use client";

import { useEffect, useRef, useState } from "react";
import { playAiChimeSound } from "@/utils/audioEffects";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "ai",
    text: "Xin chào! 👋 Tôi là **Doan AI Assistant** - Trợ lý thông minh được kết nối trực tiếp từ Robot trong không gian 3D của **Đỗ Văn Tuyến Đoàn**.\n\nTôi có thể cung cấp chi tiết về **kinh nghiệm làm việc**, **các dự án tiêu biểu** (HUIT Fest, HUIT Startup, SOF SaaS, ELH E-Commerce...), **kỹ năng công nghệ** hoặc **kết nối phỏng vấn**. Bạn muốn tìm hiểu điều gì?",
    time: "Vừa xong",
  },
];

const SUGGESTED_PROMPTS = [
  "💼 Kinh nghiệm làm việc của Tuyến Đoàn?",
  "🚀 Các dự án nổi bật nhất gần đây?",
  "🛠️ Kỹ năng công nghệ & Tech Stack?",
  "📬 Cách thức liên hệ phỏng vấn hoặc hợp tác?",
];

function generateAiResponse(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes("kinh nghiệm") || lower.includes("kinh nghiem") || lower.includes("experience") || lower.includes("làm việc")) {
    return `**Kinh nghiệm làm việc của Đỗ Văn Tuyến Đoàn:**\n\n1. **Full-stack Engineer tại CLuega (09/2026 - Hiện tại):**\n   - Phát triển hệ thống web quy mô lớn, tối ưu hóa kiến trúc microservices và trải nghiệm người dùng.\n\n2. **Full-stack Developer tại SOF Company Limited (01/2026 - 08/2026):**\n   - Phát triển hệ sinh thái ứng dụng Android trên Google Play: SOF F&B, Face AI chấm công, SOF WMS quản lý kho, SOF Parking.\n   - Xây dựng nền tảng Web SaaS ERP quản trị doanh nghiệp đa chi nhánh, tích hợp VNPay, Momo, VietQR.\n\n3. **Full-stack Developer Intern tại Trung tâm IEC - HUIT (06/2025 - 09/2025):**\n   - Phát triển Cổng thông tin Ngày hội việc làm (Job Fair Portal) với ASP.NET 8.0 MVC và SQL Server.`;
  }

  if (lower.includes("dự án") || lower.includes("du an") || lower.includes("project") || lower.includes("huit fest") || lower.includes("startup") || lower.includes("sof")) {
    return `**Các dự án nổi bật nhất:**\n\n- 🎵 **HUIT FEST 2026:** Nền tảng đại nhạc hội sinh viên Trường ĐH Công Thương TP.HCM, kết nối 10+ nghệ sĩ khách mời và phục vụ đăng ký hơn 5.000 vé online.\n- 🏆 **HUIT STARTUP 2026:** Cổng cuộc thi khởi nghiệp cấp Thành phố với 240+ đề tài, bình chọn realtime chống gian lận vote.\n- 🤖 **SOF Mobile Ecosystem:** Hệ sinh thái 6+ ứng dụng Android doanh nghiệp trên Google Play (Face AI, Barcode WMS, POS, Parking).\n- ☁️ **SOF SaaS Platform:** Nền tảng ERP & chuyển đổi số quản trị dòng tiền, hóa đơn điện tử kết nối thuế.\n- ⚡ **ELH E-Commerce:** Website thương mại điện tử thiết bị điện công nghiệp và giải pháp tự động hóa chính hãng (Siemens, ABB, MPE).\n\n👉 Bạn có thể xem chi tiết từng dự án tại mục **Feature Project** trên website!`;
  }

  if (lower.includes("kỹ năng") || lower.includes("ky nang") || lower.includes("skill") || lower.includes("tech stack") || lower.includes("công nghệ")) {
    return `**Kỹ năng công nghệ chính của Tuyến Đoàn:**\n\n- **Frontend:** React, Next.js (App Router, Server Components), TypeScript, Tailwind CSS, Three.js / WebGL, Framer Motion, GSAP.\n- **Mobile:** React Native, Expo, Android Native, Face AI, Scanner Barcode/QR, Bluetooth Thermal Printing.\n- **Backend:** Node.js, Express, NestJS, ASP.NET Core, RESTful API, WebSockets / Socket.IO, WebRTC.\n- **Database:** MySQL, PostgreSQL, SQL Server, MongoDB, SQLite.\n- **Cloud & DevOps:** Cloudflare, Docker, Git, CI/CD, Vercel, Firebase Cloud Messaging.`;
  }

  if (lower.includes("liên hệ") || lower.includes("lien he") || lower.includes("contact") || lower.includes("email") || lower.includes("sđt") || lower.includes("phỏng vấn")) {
    return `**Thông tin kết nối trực tiếp với Đỗ Văn Tuyến Đoàn:**\n\n- 📧 **Email:** [dovantuyendoan14@gmail.com](mailto:dovantuyendoan14@gmail.com)\n- 📱 **Hotline/Zalo:** 0907 433 149\n- 💻 **GitHub:** [github.com/Tdoan031024](https://github.com/Tdoan031024)\n- 💼 **LinkedIn:** [linkedin.com/in/dvtd](https://www.linkedin.com/in/dvtd/)\n- 📍 **Địa chỉ:** TP. Hồ Chí Minh, Việt Nam\n\nBạn cũng có thể cuộn xuống cuối trang để gửi tin nhắn trực tiếp qua form liên hệ!`;
  }

  if (lower.includes("mèo") || lower.includes("meo") || lower.includes("cat") || lower.includes("phòng") || lower.includes("3d") || lower.includes("robot")) {
    return `**Bật mí về Căn phòng IT 3D này!** 🎮\n\nCăn phòng được xây dựng bằng **Three.js & WebGL**, mô phỏng không gian làm việc của một Full-stack Developer:\n- 🐱 **Bấm vào chú mèo:** Chú mèo sẽ nảy tưng tưng và kêu 'Meowww~'\n- 💀 **Bấm vào bộ xương:** Lắc lư hài hước biểu tượng dev cày cuốc đêm!\n- 🤖 **Bấm vào Robot / Trụ:** Robot nhảy và xoay 360 độ phát sáng!\n- 💺 **Bấm vào ghế:** Ghế công thái học xoay tròn 360 độ!\n- 🕹️ **Bấm vào máy tính / máy game:** Mở ngay tựa game **Cyber Bug Hunter** để bắn bọ giải trí!\n- 🤖 **Và bấm vào tôi (Robot AI màu trắng):** Mở hộp thoại trò chuyện thông minh này!`;
  }

  return `Cảm ơn câu hỏi của bạn về **"${query}"**! Đỗ Văn Tuyến Đoàn là một Full-stack Developer tận tâm, giàu kinh nghiệm thực chiến với Next.js, React Native, Node.js và hệ thống 3D WebGL. Bạn có muốn xem thêm về các dự án thực tế hay thông tin liên hệ phỏng vấn không?`;
}

export default function AIChatModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      playAiChimeSound();
    }
  }, [isOpen]);

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
      time: "Vừa xong",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking and streaming response
    setTimeout(() => {
      const reply = generateAiResponse(text);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
        time: "Vừa xong",
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

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
                Trực tuyến · Sẵn sàng giải đáp
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white transition"
            title="Đóng (ESC)"
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
              <span className="text-[11px] text-white/50">AI đang gõ...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="border-t border-white/10 bg-[#071328]/95 px-4 py-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">Gợi ý câu hỏi:</p>
          <div className="flex flex-wrap gap-1.5 max-h-[72px] overflow-y-auto">
            {SUGGESTED_PROMPTS.map((prompt) => (
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
            placeholder="Hỏi AI về kinh nghiệm, dự án, tech stack..."
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-cyan-400/60 focus:bg-white/[0.08] transition"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_16px_rgba(6,182,212,0.4)] transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            Gửi ✈
          </button>
        </form>
      </div>
    </div>
  );
}
