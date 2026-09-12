"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "vi" | "en";

type Dictionary = {
  navHero: string;
  navSkills: string;
  navProjects: string;
  navAbout: string;
  navContact: string;
  navSubscribe: string;
  navDocs: string;
  downloadCv: string;
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  heroCtaProjects: string;
  heroCtaContact: string;
  skillsKicker: string;
  skillsTitle: string;
  skillsDesc: string;
  projectsKicker: string;
  projectsTitle: string;
  projectsCount: string;
  aboutKicker: string;
  aboutTitle: string;
  aboutDesc: string;
  aboutCard1: string;
  aboutCard2: string;
  aboutCard3: string;
  aboutCard4: string;
  aiKicker: string;
  aiTitle: string;
  aiFeature1Title: string;
  aiFeature1Detail: string;
  aiFeature2Title: string;
  aiFeature2Detail: string;
  aiFeature3Title: string;
  aiFeature3Detail: string;
  blogKicker: string;
  blogTitle: string;
  blogViewAll: string;
  blogReadMore: string;
  subscribeKicker: string;
  subscribeTitle: string;
  subscribeDesc: string;
  subscribePlaceholder: string;
  subscribeButton: string;
  subscribeNote: string;
  contactKicker: string;
  contactTitle: string;
  contactDesc: string;
  contactLocation: string;
  contactOpen: string;
  formName: string;
  formEmail: string;
  formSubject: string;
  formMessage: string;
  formSend: string;
  formSending: string;
  formSuccess: string;
  formError: string;
  liveChatTitle: string;
  liveChatHint: string;
  liveChatPlaceholder: string;
  liveChatToggleOpen: string;
  liveChatToggleClose: string;
  modalOpenDemo: string;
  modalClose: string;
  footerRights: string;
};

const dictionary: Record<Language, Dictionary> = {
  vi: {
    navHero: "Trang chủ",
    navSkills: "Kỹ năng",
    navProjects: "Dự án",
    navAbout: "Giới thiệu",
    navContact: "Liên hệ",
    navSubscribe: "Đăng ký",
    navDocs: "Tài liệu",
    downloadCv: "Tải CV",
    heroKicker: "Kỹ sư Full-Stack",
    heroTitle: "Xin chào! Tôi là Tuyến Đoàn",
    heroDesc:
      "Tôi là một lập trình viên Fullstack, tập trung xây dựng các ứng dụng web hiện đại, tối ưu hiệu năng và mang lại trải nghiệm người dùng tốt. Tôi làm việc cả frontend lẫn backend, từ thiết kế giao diện đến xây dựng hệ thống và cơ sở dữ liệu, đảm bảo tính ổn định và khả năng mở rộng. Bên cạnh đó, tôi có kinh nghiệm với DevOps, ORM và các công cụ hỗ trợ AI để tối ưu quy trình phát triển. Tôi luôn hướng đến việc tạo ra những sản phẩm chất lượng và không ngừng học hỏi công nghệ mới.",
    heroCtaProjects: "Xem dự án",
    heroCtaContact: "Liên hệ",
    skillsKicker: "Kỹ năng & Công nghệ",
    skillsTitle: "Kiến trúc hệ thống & Công nghệ cốt lõi",
    skillsDesc:
      "Tôi tập trung vào stack hiện đại, lưu ý tối ưu hiệu năng, kiến trúc rõ ràng và tính tương tác của giao diện.",
    projectsKicker: "Dự án",
    projectsTitle: "Dự án tiêu biểu",
    projectsCount: "08 case study",
    aboutKicker: "Giới thiệu",
    aboutTitle: "Xây dựng sản phẩm bằng chiều sâu kỹ thuật & đam mê.",
    aboutDesc:
      "Nhiều năm làm việc với sản phẩm số, tôi kết hợp thiết kế giao diện, kỹ thuật 3D trực quan và backend mạnh mẽ để đưa ý tưởng thành hệ thống sẵn sàng vận hành thực tế.",
    aboutCard1: "Kiến trúc hệ thống mở rộng",
    aboutCard2: "Trải nghiệm UX/UI tinh tế",
    aboutCard3: "3D WebGL + Motion mượt mà",
    aboutCard4: "Backend & Cloud ổn định",
    aiKicker: "AI Studio",
    aiTitle: "AI hỗ trợ kể chuyện",
    aiFeature1Title: "AI Project Narratives",
    aiFeature1Detail: "Tự động tạo mô tả dự án bằng tone giọng thương hiệu cá nhân.",
    aiFeature2Title: "Smart Content Suggestions",
    aiFeature2Detail: "Gợi ý case study, hình ảnh và CTA dựa trên hành vi truy cập.",
    aiFeature3Title: "Portfolio Chatbot",
    aiFeature3Detail: "Bot giới thiệu bản thân, trả lời nhanh và điều hướng người xem.",
    blogKicker: "Tài liệu & Blog",
    blogTitle: "Bài viết kỹ thuật",
    blogViewAll: "Xem tất cả",
    blogReadMore: "Đọc thêm",
    subscribeKicker: "Đăng ký",
    subscribeTitle: "Nhận bản tin về case study mới",
    subscribeDesc: "Cập nhật nhanh về dự án, bài viết kỹ thuật và những thử nghiệm 3D mới.",
    subscribePlaceholder: "Email của bạn",
    subscribeButton: "Đăng ký",
    subscribeNote: "Chưa gửi thật, đây là khung giao diện để bạn tùy biến.",
    contactKicker: "Liên hệ",
    contactTitle: "Hợp tác cùng tôi",
    contactDesc:
      "Gửi thông tin dự án hoặc cơ hội hợp tác, tôi sẽ phản hồi trong 24 giờ. Hệ thống kết nối trực tiếp với backend ổn định.",
    contactLocation: "TP. Hồ Chí Minh, Việt Nam",
    contactOpen: "Sẵn sàng hợp tác toàn cầu & Remote",
    formName: "Họ và tên của bạn",
    formEmail: "Địa chỉ Email",
    formSubject: "Chủ đề / Lời nhắn",
    formMessage: "Nội dung chi tiết",
    formSend: "Gửi tin nhắn",
    formSending: "Đang gửi...",
    formSuccess: "Đã gửi thành công! Cảm ơn bạn.",
    formError: "Có lỗi xảy ra, vui lòng thử lại.",
    liveChatTitle: "Live chat",
    liveChatHint:
      "Xin chào! Đây là trợ lý ảo giới thiệu về kinh nghiệm và kỹ năng của Tuyến Đoàn.",
    liveChatPlaceholder: "Nhập tin nhắn...",
    liveChatToggleOpen: "Live chat",
    liveChatToggleClose: "Thu nhỏ",
    modalOpenDemo: "Mở live demo",
    modalClose: "Đóng lại",
    footerRights: "© 2026 Tuyen Doan. All rights reserved.",
  },
  en: {
    navHero: "Home",
    navSkills: "Skills",
    navProjects: "Projects",
    navAbout: "About",
    navContact: "Contact",
    navSubscribe: "Subscribe",
    navDocs: "Docs",
    downloadCv: "Download CV",
    heroKicker: "Full-Stack Software Engineer",
    heroTitle: "Hi! I'm Tuyen Doan",
    heroDesc:
      "I am a Full-Stack Software Engineer focused on building modern, scalable web applications with strong performance and seamless user experience. I work across both frontend and backend, from crafting responsive interfaces to designing robust systems and databases that ensure reliability and scalability. In addition, I have experience with DevOps practices, ORM tools, and AI-assisted workflows. I am passionate about creating high-quality products while continuously learning and adapting to new technologies.",
    heroCtaProjects: "Explore Projects",
    heroCtaContact: "Get in Touch",
    skillsKicker: "Capabilities & Stack",
    skillsTitle: "Core Technologies & Architecture",
    skillsDesc:
      "I focus on modern tech stacks with high performance, clean architecture, and intuitive user interactions.",
    projectsKicker: "Portfolio",
    projectsTitle: "Featured Projects",
    projectsCount: "08 Case Studies",
    aboutKicker: "About Me",
    aboutTitle: "Engineering with Depth, Precision & Passion.",
    aboutDesc:
      "With extensive hands-on experience in software development, I bridge intuitive UI design, interactive 3D WebGL, and robust backend architectures to turn ideas into reliable production systems.",
    aboutCard1: "Scalable Architecture",
    aboutCard2: "Emotion-led UX/UI",
    aboutCard3: "Refined 3D & Motion",
    aboutCard4: "Robust Backend & Cloud",
    aiKicker: "AI Studio",
    aiTitle: "AI-Powered Development",
    aiFeature1Title: "AI Project Narratives",
    aiFeature1Detail: "Auto-generate project stories with personal brand tone and insights.",
    aiFeature2Title: "Smart Content Suggestions",
    aiFeature2Detail: "Recommend case studies, visuals, and technical architecture based on visitor intent.",
    aiFeature3Title: "Portfolio AI Assistant",
    aiFeature3Detail: "Interactive AI assistant introducing background, skills, and projects.",
    blogKicker: "Docs & Articles",
    blogTitle: "Technical Writing",
    blogViewAll: "View all",
    blogReadMore: "Read more",
    subscribeKicker: "Subscribe",
    subscribeTitle: "Get new case study updates",
    subscribeDesc: "Quick updates on projects, technical notes, and fresh 3D experiments.",
    subscribePlaceholder: "Your email address",
    subscribeButton: "Subscribe",
    subscribeNote: "Stay tuned for new releases and deep-dive technical articles.",
    contactKicker: "Contact",
    contactTitle: "Let's Work Together",
    contactDesc:
      "Share your project details or collaboration opportunities. I will respond within 24 hours.",
    contactLocation: "Ho Chi Minh City, Vietnam",
    contactOpen: "Open for Global & Remote Roles",
    formName: "Your Name",
    formEmail: "Your Email",
    formSubject: "Subject",
    formMessage: "Message",
    formSend: "Send Message",
    formSending: "Sending...",
    formSuccess: "Message sent successfully!",
    formError: "Something went wrong. Please try again.",
    liveChatTitle: "Live Chat",
    liveChatHint: "Hi! This is an interactive assistant introducing Doan's portfolio and skills.",
    liveChatPlaceholder: "Type a message...",
    liveChatToggleOpen: "Live Chat",
    liveChatToggleClose: "Minimize",
    modalOpenDemo: "Open Live Demo",
    modalClose: "Close",
    footerRights: "© 2026 Tuyen Doan. All rights reserved.",
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Dictionary) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Mặc định khi vào trang web là Tiếng Anh
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("language");
    if (stored === "vi" || stored === "en") {
      setLanguage(stored);
    } else {
      setLanguage("en");
      window.localStorage.setItem("language", "en");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("language", language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => dictionary[language][key],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
